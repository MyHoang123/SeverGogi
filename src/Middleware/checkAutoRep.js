const  { AutoRepComment }  = require('../Controllers/CommentController')

const Status = []

exports.checkAutoRep = (req, res, next) => {
    if(Status.length > 0) {
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

exports.OnAutoRep = (req, res, next) => {
    const { status } = req.body
    if(parseInt(status) === 1) {
    const { content } = req.body
        const newStatus = {
            content: content
        }
        Status.push(newStatus)
        if(Status.length > 0) {
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
    else {
        Status.splice(0,1)
        if(Status.length === 0) {
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

exports.AutoRepComment = (req, res, next) => {
    if(Status.length > 0) {
        const IdAcc  = req.Id
        const {  IdProduct, IdBill } = req.body;
        const time =  setTimeout(() => {
            AutoRepComment(Status[0].content, IdProduct, IdAcc,IdBill, time)
        },15000)
    }
        next()
}