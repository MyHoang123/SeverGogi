const SocketJWT = require('../Middleware/JWTSocket')
const ChatController = require('../Controllers/ChatController')
const { updateBill } = require('../Controllers/BillController')
require('dotenv').config()
const socket = (server) => {
const clients = [];
    // web SOCKet
const io = require('socket.io')(server, {
    cors: {
      origin: [process.env.IP_CLIENT, 'https://59d7-2402-800-6343-85f1-804f-e482-d0f0-9f2d.ngrok-free.app'],
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
    // Lưu trữ thêm thông tin của client nếu cần
    console.log(socket.user.Id,'ConnectServer')
    console.log(clients)
      // Xử lý các sự kiện từ client
      socket.on('createbill', (message) => {
        // Gửi tin nhắn đến tất cả các client kết nối
        io.emit('repbill', message);
      });
      // Xử lý các sự kiện từ client
      socket.on('ship', (user) => {
        for(let i = 0 ; i < clients.length; i++) {
          if(clients[i].Client === user) {
            io.to(clients[i].ClientId).emit('repship');
          }
        }
      });
      // Xử lý các sự kiện từ client
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
        // for(let i = 0 ; i < clients.length; i++) {
        //   if(clients[i].Client === user) {
        //     io.to(clients[i].ClientId).emit('repship');
        //   }
        // }
      });
      // Xử lý các sự kiện từ client
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
      // Xử lý các sự kiện từ client
      socket.on('repchat', (data) => {
        for(let i = 0 ; i < clients.length; i++) {
          if(clients[i].Client === data.IdSend) {
            io.to(clients[i].ClientId).emit('repchat',data);
          }
        }
      });
            // Xử lý các sự kiện từ client
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

      // Xử lý các sự kiện từ client
      socket.on('createProductTable', (data) => {
        // Gửi tin nhắn đến tất cả các client kết nối
        io.emit('notiBillTable', data , 'Có Đơn Hàng Mới');
      });
      // Xử lý các sự kiện từ client
      socket.on('checkout', (data) => {
        // Gửi tin nhắn đến tất cả các client kết nối
        io.emit('repcheckout', data, 'Gọi Thanh Toán');
      });
      // Xử lý các sự kiện từ client
      socket.on('successproduct', (table,product) => {
        for(let i = 0 ; i < clients.length; i++) {
          if(clients[i].Client === table) {
            io.to(clients[i].ClientId).emit('repsuccessproduct', { data: product });
          }
        }
        // Gửi tin nhắn đến tất cả các client kết nối
      });
      // Xử lý các sự kiện từ client
      socket.on('checkoutsuccess', (table) => {
        for(let i = 0 ; i < clients.length; i++) {
          if(clients[i].Client === table) {
            io.to(clients[i].ClientId).emit('repcheckoutsuccess');
          }
        }
        // Gửi tin nhắn đến tất cả các client kết nối
      });
      // Xử lý các sự kiện từ client
      socket.on('newBill', () => {
        for(let i = 0 ; i < clients.length; i++) {
          if(clients[i].Client === 1) {
            io.to(clients[i].ClientId).emit('repNewbill');
          }
        }
        // Gửi tin nhắn đến tất cả các client kết nối
      });
      // Xử lý các sự kiện từ  
      socket.on('disconnection', (data) => {
        for(let i = 0; i < clients.length; i ++) {
          if(clients[i].Client === data) {
            clients.splice(i,1)
          }
        }
        console.log('disconnect',(data))
        console.log(clients)
        // Gửi tin nhắn đến tất cả các client kết nối
      });
      // Xử lý các sự kiện từ  
      socket.on('disconnect', () => {
        for(let i = 0; i < clients.length; i ++) {
          if(clients[i].ClientId === socket.id) {
            clients.splice(i,1)
          }
        }
        console.log('disconnect',(socket.id))
        console.log(clients)
        // Gửi tin nhắn đến tất cả các client kết nối
      });
        // Listen for the 'disconnect' event when the client disconnects
    });
    return io;
}
module.exports = socket