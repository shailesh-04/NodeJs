import { EventEmitter } from "events";
const eventEmitter = new EventEmitter();
const users = {};
const TODO = {};

eventEmitter.on("check:users",()=>{
    console.log(Object.values(users))
});
eventEmitter.on("check:TODO",()=>{
    console.log(Object.values(TODO))
});

eventEmitter.on("add:users",(name)=>{
    users[new Date().getTime()] = name;
    eventEmitter.emit("check:users");
});
eventEmitter.on("add:TODO",(todo,uId)=>{
    TODO[`${uId}_${new Date().getTime()}`] = {
        todo,
        done:false,
    };
    eventEmitter.emit("check:TODO");
});
eventEmitter.on("chenge:done",(uId,tId)=>{
    TODO[`${uId}_${tId}`].done = !TODO[`${uId}_${tId}`].done;
    eventEmitter.emit("check:TODO");
});
eventEmitter.on("delete:TODO",(uId,tId)=>{
    delete TODO[`${uId}_${tId}`];
    eventEmitter.emit("check:TODO");
});
eventEmitter.on("delete:users",(uId)=>{
    delete users[uId];
    eventEmitter.emit("check:users");
});
eventEmitter.on("get:uId",(name)=>{
    new Error("error occured");
    console.log(Object.keys(users).find((value) => (users[value] === name) ))
});
eventEmitter.on("error",()=>console.log("error occured"));
export default eventEmitter;

