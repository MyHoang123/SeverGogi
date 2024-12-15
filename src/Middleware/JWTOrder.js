require('dotenv').config()
let jwt = require('jsonwebtoken');

exports.checkTokenOrder = (req, res, next) => {
    let token = ''
    if(req.method === 'POST' || req.method === 'PUT') {
      token = req.body.token
    }
    else if(req.method === 'GET') {
      token = req.query.token
    }
  // Lấy token từ tiêu đề Authorization
    if (token.length === 0) {
      return res.status(403).json({ message: 'Không có token!' });
    }
    // Xác minh token
    jwt.verify(token, process.env.ACCESS_JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: 'Token không hợp lệ!' });
      }
      req.table = decoded.IdTable
      req.type = decoded.IdType
      // Lưu thông tin người dùng vào req.user
      next();
    });
  }