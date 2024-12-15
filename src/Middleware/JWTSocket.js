require('dotenv').config()
let jwt = require('jsonwebtoken');

const SoketJWT = (socket, next) => {
    const token = socket.handshake.auth.token; // Lấy token từ handshake
    if (!token) {
        return next(new Error('Thiếu token')); // Ngăn kết nối nếu không có token
    }
    // Xác thực token
    jwt.verify(token, process.env.ACCESS_JWT_SECRET, (err, decoded) => {
        if (err) {
            return next(new Error('Token không hợp lệ')); // Ngăn kết nối nếu token không hợp lệ
        }
        socket.Id = token
        socket.user = decoded; // Lưu thông tin người dùng vào socket
        next(); // Cho phép kết nối
    });
};

module.exports = SoketJWT;