require('dotenv').config()
let jwt = require('jsonwebtoken');

exports.checkPhone = (req, res, next) => {
  const { token } = req.body
  // Lấy token từ tiêu đề Authorization
    if (!token) {
      return res.status(403).json({ message: 'Không có token!' });
    }
    // Xác minh token
    jwt.verify(token, process.env.ACCESS_JWT_REGISTER, (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: 'Token không hợp lệ!' });
      }
      req.phone = decoded.Phone
      // Lưu thông tin người dùng vào req.user
      next();
    });
  }
  exports.checkInfoBill = (req, res, next) => {
    const { Destination, Sdt } = req.body
    const regex = /^\d{9}$/;
    if(Destination !== '' && regex.test(Sdt)) {
      next()
    }
    else  if(Destination === '' && regex.test(Sdt)) {
      return res.status(200).json({ massege: 'Vi tri sai' });
    }
    else {
      return res.status(200).json({ massege: 'Sai so dien thoai' });
    }
    }