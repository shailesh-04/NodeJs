const {GoogleGenerativeAI,HarmCategory,HarmBlockThreshold} = require("@google/generative-ai");
const fs = require('fs');
const readline = require('readline');
const apiKey =  "rj4idneieneo2n9rb50eh59db3udnejrktojeu4kehkrkdbthkekdb4iekti4n0djth3isnri4ndibr39ejr4j2isn3i3bej4b4ienrbi3eke9dj4jei93n4rj4jeirj4j4i3ke9rj4j3kekej";
const genAI = new GoogleGenerativeAI(apiKey);
const rl = readline.createInterface({input: process.stdin,output: process.stdout});
const model = genAI.getGenerativeModel({model: "gemini-1.5-flash",});

const lang = {"python": ".py","javascript": ".js","java": ".java","c": ".c","cpp": ".cpp","csharp": ".cs","ruby": ".rb","php": ".php","html": ".html","css": ".css","swift": ".swift","kotlin": ".kt","go": ".go","r": ".r","typescript": ".ts","perl": ".pl","lua": ".lua","matlab": ".m","scala": ".scala","shell": ".sh","dart": ".dart","haskell": ".hs","objective-c": ".m","rust": ".rs","sql": ".sql","vb": ".vb","groovy": ".groovy","julia": ".jl","elixir": ".ex","erlang": ".erl","fortran": ".f90","assembly": ".asm"};
const generationConfig = {temperature: 1,topP: 0.95,topK: 64,maxOutputTokens: 8192,responseMimeType:"text/plain",};

async function run(chat) {const chatSession = model.startChat({generationConfig,history: [],});
  const result = await chatSession.sendMessage(`[${chat}] and I not neet to another text , comment , code explanation and i not need comment and i need only code in simple way for bigner essy to undustand and give only code and in this prompt ([${chat}]) in not give any specific programing language to give this message=[===========INVALID PROMT==========`);
  var text = result.response.text();
  if(text.search("=====INVALID PROMT====") == -1){
    text = text.split("\n").filter((element) => element !== "");
    text = text.join("\n").split("\`\`\`").filter((element) => element !== "\n");
    text = text.filter((element) => element !== ""); 
    text = text.filter((element) => element !== " "); 
    text.forEach((el)=>{
      var ex = el.split('\n')[0];
      var code = el.split('\n').slice(1).join('\n');
      if(lang[ex]){
        const extention = lang[ex];
        var name = Date.now();
        console.log("EX : "+ extention);
        console.log("CODE : "+code);
        fs.writeFile(`./${name}${extention}`, code, err => {
          if (err) {
            console.error(err);
          } else {
            console.log(`File Is Created successfully! => ${Date.now()}${lang[ex]}`);
          }
        });
      }else
        console.log("Extention Is Not Found..");
      
    });
  }else
    console.log("ERORR : " +text);
}
rl.question('Enter Prompt For Create Code File :-  ', (answer) => {
    run(answer);
    rl.close();
  });
