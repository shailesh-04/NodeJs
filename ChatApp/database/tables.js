const db =  require("../config/db.config");

db.query(`
CREATE TABLE users (
    id INT(11) NOT NULL AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    PRIMARY KEY (id)
);
`,(err)=>{
  if(err){
    console.error("Found Following ERROR :--",err);
  }else
    console.log("\n -> users TABLE IS CREATED....");
  
});

db.end((err) => {
    if (err) {
        console.error('Error ending the connection: ' + err.stack);
        return;
    }
    console.log('Connection closed.');
});