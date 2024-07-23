const {GoogleGenerativeAI,HarmCategory,HarmBlockThreshold} = require("@google/generative-ai");
const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 3000;
const path = require('path');
const GEMINI_API_KEY = "AIzaSyB-EcbocK23rHIWJHqnU3sinl6q8TTcotQ";
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
const conn = mysql.createConnection({
  host:'localhost',
  use:'root',
  password:'',
  database:'test',
  port:3306
});
conn.connect((err)=>{
  if(err)
    console.log("Not Connected");
  else
    console.log('DONE');
});
app.get('/',(req,res)=>{
  res.sendfile('./index.html');
});

app.post('/', (req, res) => {
  let {chat} = req.body;
  console.log(`CHAT : ${chat}`);
  const apiKey = GEMINI_API_KEY;
  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
  });
  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
  };
  async function run() {
    const chatSession = model.startChat({
      generationConfig,
      history: [
      ],
    });
    const result = await chatSession.sendMessage(`${chat} in sql and give only query i not need to explanation and this promt [${chat}] is not related to mysql query that time give this massage===============ERROR================(nextline)Here Input Prompt Only sql Related (nextline) For Ex. (nextline) 1. show all data from table_name (nextline) 2. the id 2 data delete from users (nextline) 3. show infomation of id 3 from table_Name `);
      var text = result.response.text();
      if(text.search("====ERROR====")==-1){
        text = text.split("\`\`\`")[1].replace('sql','');
        conn.query(text,(err,data)=>{
          if(err){
            console.log(err);
            res.json({
              error:err.sqlMessage
            });
          }
        else
          res.json({
            message:"gimini ai is send the data",
            data:data
          });  
      });
    }else{
      res.json({
        error:text
      });  
    }
  }
  run();
});
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});