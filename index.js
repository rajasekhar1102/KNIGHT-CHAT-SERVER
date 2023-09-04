const express=require('express');
const http=require('http');
const cors=require('cors');
const {Server}=require('socket.io');

const app=express();

app.use(cors());

const server=http.createServer(app);

const io=new Server(server,{cors:{origin:"https://knight-chat.onrender.com",methods:['GET','POST']},maxHttpBufferSize:1e8,  });


io.on('connection',(socket)=>{

socket.on("join_room",(data)=>{socket.join(data.room);});


socket.on("send_message",(msg)=>{
     
    socket.to(msg.room).emit("receive_message",msg);
});


socket.on("callEnded",(data)=>{
    io.to(data.room).emit("callEnd");
})

socket.on("callUser", (data)=>{
    socket.to(data.room).emit("receiveCall");
    setTimeout(() => {
        socket.to(data.room).emit("callUser",{signal:data.signalData ,from:data.from,}) 
    }, 2000);
   

})

socket.on("answerCall",(data)=>{
 
    socket.to(data.room).emit("callAccepted",data.signal);

})



});


const port=process.env.PORT||3001;
server.listen(3001,()=>{
    console.log("SERVER IS RUNNING ON "+String(port));
})