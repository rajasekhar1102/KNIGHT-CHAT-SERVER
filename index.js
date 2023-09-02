const express=require('express');
const http=require('http');
const cors=require('cors');
const {Server}=require('socket.io');

const app=express();

app.use(cors());

const server=http.createServer(app);

const io=new Server(server,{cors:{origin:"https://knight-chat.onrender.com",},maxHttpBufferSize:1e8,  });


io.on('connection',(socket)=>{

socket.on("join_room",(data)=>{socket.join(data.room)});

socket.on("send_message",(msg)=>{

    
     
    socket.to(msg.room).emit("receive_message",msg);
});


});


const port=process.env.PORT||3001;
server.listen(3001,()=>{
    console.log("SERVER IS RUNNING ON "+String(port));
})