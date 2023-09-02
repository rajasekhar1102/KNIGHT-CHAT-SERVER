const express=require('express');
const http=require('http');
const cors=require('cors');
const {Server}=require('socket.io');

const app=express();

app.use(cors());

const server=http.createServer(app);

const io=new Server(server,{cors:{origin:"http://localhost:3000",},maxHttpBufferSize:1e8,  });


io.on('connection',(socket)=>{

socket.on("join_room",(data)=>{socket.join(data.room)});

socket.on("send_message",(msg)=>{

    
     
    socket.to(msg.room).emit("receive_message",msg);
});


});



server.listen(3001,()=>{
    console.log("SERVER IS RUNNING ON 3001");
})