const SocketJWT = require('../Middleware/JWTSocket')

const OrderController = require('../Controllers/OrderController')
const { updateBill } = require('../Controllers/BillController')
require('dotenv').config()
const socket = (server) => {
const clients = [];
    // web SOCKet
const io = require('socket.io')(server, {
    cors: {
      origin: [process.env.IP_CLIENT, 'http://localhost:3000'],
      methods: ['GET', 'POST'],
    },
  });
  io.use(SocketJWT)
  io.on('connection', (socket) => {
    if(socket.user.Id === 1) {
      const IdClient = {
        Client: socket.user.Id,
        ClientId: socket.id
      }
      clients.push(IdClient)
    }else {
      const IdClient = {
        Client: socket.user.IdTable,
        ClientId: socket.id
      }
      clients.push(IdClient)
      OrderController.updateTable('Đang Dùng',socket.user.IdTable,(data) => {
        if(data === 'Thanh cong') {
          for(let i = 0 ; i < clients.length; i++) {
            if(clients[i].Client === 1) {
              io.to(clients[i].ClientId).emit('connectuser', socket.user.IdTable);
            }
          }
        }
      })
    }
    // Lưu trữ thêm thông tin của client nếu cần
    console.log(2,'ConnectServer')
    console.log(clients)
      // Xử lý các sự kiện từ client
      socket.on('createbill', (message) => {
        // Gửi tin nhắn đến tất cả các client kết nối
        io.emit('repbill', message);
      });
      // Xử lý các sự kiện từ client
      socket.on('confirm', (id,user) => {
        for(let i = 0 ; i < clients.length; i++) {
          if(clients[i].Client === user) {
            io.to(clients[i].ClientId).emit('repConfirm', id);
          }
        }
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
      socket.on('updatebill', (Id,IdAcc,Status,callback) => {
        updateBill(Id,IdAcc,Status, (data) => {
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
      socket.on('createProductTable', (data) => {
        // Gửi tin nhắn đến tất cả các client kết nối
        for(let i = 0 ; i < clients.length; i++) {
            if(clients[i].Client === 1) {
              io.to(clients[i].ClientId).emit('notiBillTable', data , 'Có Đơn Hàng Mới');
            }
          }
      });
      // Xử lý các sự kiện từ client
      socket.on('checkoutuser', () => {
        for(let i = 0 ; i < clients.length; i++) {
          if(clients[i].Client === 1) {
            io.to(clients[i].ClientId).emit('checkoutuser',socket.user.IdTable);
          }
        }
        // Gửi tin nhắn đến tất cả các client kết nối
        // io.emit('repcheckout', data, 'Gọi Thanh Toán');
      });
      // Xử lý các sự kiện từ client
      socket.on('updateProduct', (IdDetail,table,Status) => {
        OrderController.updateProductOrder(Status,IdDetail,(data) => {
          if(data === 'Thanh cong') {
            for(let i = 0 ; i < clients.length; i++) {
              if(clients[i].Client === `${table}`) {
                io.to(clients[i].ClientId).emit('updateProduct', {IdDetail: IdDetail,Status: Status});
              }
            }
          }
        })
        // Gửi tin nhắn đến tất cả các client kết nối
      });
      // Xử lý các sự kiện từ client
      socket.on('checkoutsuccess', (Price,table,callback) => {
        OrderController.checkOut(Price,table,(data) => {
          if(data === 'Thanh cong') {
            for(let i = 0 ; i < clients.length; i++) {
              if(clients[i].Client === `${table}`) {
                io.to(clients[i].ClientId).emit('repcheckoutsuccess');
                callback('Thanh cong')
              }
            }
          }
        })
        // Gửi tin nhắn đến tất cả các client kết nối
      });
      // Xử lý các sự kiện từ client
      socket.on('newBill', () => {
        for(let i = 0 ; i < clients.length; i++) {
          if(clients[i].Client === 1) {
            io.to(clients[i].ClientId).emit('repNewbill',socket.user.IdTable);
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