

exports.checkAuth = (req, res, next) => {
    // Lấy token từ tiêu đề Authorization
    const  { Phone } = req.body;
    if (!Phone) {
      return res.status(403).json({ message: 'Không có sdt!' });
    }
    else {
        const regex = /^0[0-9]+$/
        const isvalidSdt = regex.test(Phone)
        if(isvalidSdt) {
            if(Phone[0] === '0') {
               const newPhone = Phone.slice(1)
                req.Phone = newPhone
                next()
            }
            else {
                return res.status(403).json({ message: 'Sai sdt' });
            }
        }
        else {
            return res.status(403).json({ message: 'Sai sdt' });
        }
    }
    // Xác minh sdt
  }