

exports.checkPayMethod = (req, res, next) => {
  // Lấy token từ tiêu đề Authorization
  const  { PayMethod } = req.body;
  if (!PayMethod) {
    return res.status(403).json({ message: 'Sai đinh dạng hóa đơn' });
  }
  else {
      if(PayMethod === '1') {
           next()
      }
      else {
          return res.status(403).json({ message: 'Sai sdt' });
      }
  }
  // Xác minh sdt
}
