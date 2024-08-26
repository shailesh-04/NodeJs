const mysql = require("mysql");
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "test",
  post:"3306",
});
try{
  db.connect((err) => {
    if (err) {
      console.error("Database Connection Erorr");
      return;
    }
    console.log("Connected to MySQL database.");
  });
}catch(error){
  console.log(error);
}
module.exports = db;
