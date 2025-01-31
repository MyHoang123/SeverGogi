const SocketJWT = require('../Middleware/JWTSocket')
const ChatController = require('../Controllers/ChatController')
const { updateBill } = require('../Controllers/BillController')
require('dotenv').config()
const socket = (server) => {
const clients = [];
const io = require('socket.io')(server, {
    cors: {
      origin: [process.env.IP_CLIENT, 'http://localhost:3000'],
      methods: ['GET', 'POST'],
    },
  });
  io.use(SocketJWT)
  io.on('connection', (socket) => {
    const IdClient = {
      Client: socket.user.Id,
      ClientId: socket.id
    }
    clients.push(IdClient)
    console.log(socket.user.Id,'ConnectServer')
    console.log(clients)
      socket.on('createbill', (message) => {
        io.emit('repbill', message);
      });
      socket.on('ship', (user) => {
        for(let i = 0 ; i < clients.length; i++) {
          if(clients[i].Client === user) {
            io.to(clients[i].ClientId).emit('repship');
          }
        }
      });
      socket.on('updatebill', (Id,IdAcc,Status,Data,callback) => {
        updateBill(Id,IdAcc,Status,Data, (data) => {
          if(data !== null) {
            if(data === 'Thanh Cong') {
              for(let i = 0 ; i < clients.length; i++) {
                if(clients[i].Client === IdAcc) {
                  io.to(clients[i].ClientId).emit('repUpdateBill',{IdBill:Id,Status:Status});
                }
              }
              callback(Id)
            }
          }
          else {
            callback(null)
            return new Error('Đã xảy ra lõi vui lòng load lại trang')
          }
        })
      });
      socket.on('chat',(data,callback) => {
        for(let i = 0 ; i < clients.length; i++) {
          if(clients[i].ClientId === socket.id) {
            data.IdSend = clients[i].Client
              ChatController.addChat(data,(response)=>{
                if(response !== null) {
                    for(let i = 0 ; i < clients.length; i++) {
                      if(clients[i].Client === data.IdReceiver) {
                        data.Status = 0
                        io.to(clients[i].ClientId).emit('chat',data);
                      }
                    }
                    callback('Thanh cong')
                }
                else {
                  return new Error('Đã xảy ra lõi vui lòng thử lại')
                }
              })
          }
        }
      
      });
      socket.on('repchat', (data) => {
        for(let i = 0 ; i < clients.length; i++) {
          if(clients[i].Client === data.IdSend) {
            io.to(clients[i].ClientId).emit('repchat',data);
          }
        }
      });
    
      socket.on('sendMessage', (data,callback) => {
          for(let i = 0 ; i < clients.length; i++) {
            if(clients[i].ClientId === socket.id) {
              data.IdReceiver = clients[i].Client
                ChatController.getChat(data,(response)=>{
                  if(response !== null) {
                      for(let i = 0 ; i < clients.length; i++) {
                        if(clients[i].Client === data.IdSend) {
                          io.to(clients[i].ClientId).emit('sendMessage',data.IdReceiver);
                        }
                      }
                      callback({
                       message: 'Thanh Cong',
                       Data: response
                      })
                  }
                  else {
                    callback({
                      message: 'That bai',
                     })
                    return new Error('Đã xảy ra lõi vui lòng thử lại')
                  }
                })
            }
          }
      });

      socket.on('createProductTable', (data) => {
        io.emit('notiBillTable', data , 'Có Đơn Hàng Mới');
      });
      socket.on('checkout', (data) => {
        io.emit('repcheckout', data, 'Gọi Thanh Toán');
      });
      socket.on('successproduct', (table,product) => {
        for(let i = 0 ; i < clients.length; i++) {
          if(clients[i].Client === table) {
            io.to(clients[i].ClientId).emit('repsuccessproduct', { data: product });
          }
        }
      });
      socket.on('checkoutsuccess', (table) => {
        for(let i = 0 ; i < clients.length; i++) {
          if(clients[i].Client === table) {
            io.to(clients[i].ClientId).emit('repcheckoutsuccess');
          }
        }
      });
      socket.on('newBill', () => {
        for(let i = 0 ; i < clients.length; i++) {
          if(clients[i].Client === 1) {
            io.to(clients[i].ClientId).emit('repNewbill');
          }
        }
      });
      socket.on('disconnection', (data) => {
        for(let i = 0; i < clients.length; i ++) {
          if(clients[i].Client === data) {
            clients.splice(i,1)
          }
        }
        console.log('disconnect',(data))
        console.log(clients)
      });
      socket.on('disconnect', () => {
        for(let i = 0; i < clients.length; i ++) {
          if(clients[i].ClientId === socket.id) {
            clients.splice(i,1)
          }
        }
        console.log('disconnect',(socket.id))
        console.log(clients)
      });
    });
    return io;
}
module.exports = socket