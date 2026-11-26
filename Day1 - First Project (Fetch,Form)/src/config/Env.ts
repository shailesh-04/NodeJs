import { config } from "dotenv";
class Env{
    port:number = 3000;
    MONGODB_URI:string = '';
    constructor(){
        config();
    
    }
    init(){
        this.port = Number(process.env.PORT)||3000; 
        this.MONGODB_URI = String(process.env.MONGODB_URI);
    }
}


export default Env;