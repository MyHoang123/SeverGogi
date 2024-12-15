let Status = 0

exports.checkStatus = (req, res, next) => {
    if(Status === 1) {
        return res.status(200).json({
            massege: 'Thanh cong',
         })
    }
    else {
        return res.status(200).json({
            massege: 'That bai',
         })
    }
  }
  exports.OnOpen = (req, res, next) => {
    const { status } = req.body
    if(status === 1) {
        Status = status
        if(Status === 1) {
            return res.status(200).json({
                massege: 'Thanh cong',
             })
        }
        else {
            return res.status(200).json({
                massege: 'That bai',
             })
        }
    }
    else if(status === 0) {
        Status = status
        if(Status === 0) {
            return res.status(200).json({
                massege: 'Thanh cong',
             })
        }
        else {
            return res.status(200).json({
                massege: 'That bai',
             })
        }
    }
   
  }
  exports.checkOpen = (req, res, next) => {
   if(Status === 1) {
    next()
   }
   else {
    return res.status(200).json({
        massege: 'OFF',
     })
   }
  }