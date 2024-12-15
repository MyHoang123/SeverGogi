require('dotenv').config()
let jwt = require('jsonwebtoken');

exports.checkToken = (req, res, next) => {
  let token = undefined
  if(Object.keys(req.body).length === 0) {
    token = req.headers['authorization']
  }
  else {
    if(req.method === 'POST' || req.method === 'PUT') {
      token = req.body.token
    }
    else if(req.method === 'GET') {
      token = req.query.token
    }
  }
  // Lấy token từ tiêu đề Authorization
    if (!token) {
      return res.status(403).json({ message: 'Không có token!' });
    }
    // Xác minh token
    jwt.verify(token, process.env.ACCESS_JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: 'Token không hợp lệ!' });
      }
      req.Id = decoded.Id
      // Lưu thông tin người dùng vào req.user
      next();
    });
  }