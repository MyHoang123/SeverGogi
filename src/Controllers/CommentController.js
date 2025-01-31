const Comment = require('../models/CommentModal')
exports.showComment = (req, res) => {
    const IdProduct  = req.query.IdProduct;
    Comment.getCommentProduct(IdProduct,function(data) {
        if(data === null) {
            return res.status(200).json({
               massege: 'That bai',
            })
        }
        else {
            return res.status(200).json({
                massege: 'Thanh Cong',
                data: data
                })
        }
    })
}
exports.filterComment = async (req, res) => {
    const { IdProduct, Star} = req.body
    Comment.filterComment(IdProduct,Star, function(data) {
        if(data === null) {
            return res.status(200).json({
               massege: 'That bai',
            })
        }else {
            return res.status(200).json({
                massege: 'Thanh cong',
                data: data
             })
        }
     
    })
}
exports.showCommentUser = async (req, res) => {
    const IdBill = req.query.IdBill
    Comment.getCommentUser(IdBill, function(data) {
        if(data === null) {
            return res.status(200).json({
               massege: 'That bai',
            })
        }else {
            return res.status(200).json({
                massege: 'Thanh cong',
                data: data
             })
        }
     
    })
}
exports.createComment = async (req, res) => {
    const { Containt, Star, IdProduct, IdBill } = req.body;
    const IdAcc = req.Id
    Comment.createComment(Containt,Star,IdProduct,IdAcc, IdBill,function(data) {
        if(data === null) {
            return res.status(200).json({
               massege: 'That bai',
            })
        }
        else {
            Comment.updateBillComment(IdBill,(result) => {
                if(result !== null) {
                        return res.status(200).json({
                            massege: 'Thanh cong',
                        })
                }
                else {
                        return res.status(200).json({
                            massege: 'Thanh cong',
                        })
                }
            })
        }
    })
    }
exports.createRepComment = async (req, res) => {
    const { RepComment,Id } = req.body;
    Comment.createRepComment(RepComment,Id,function(data) {
        if(data === null) {
            return res.status(200).json({
                massege: 'That bai',
            })
        }
        else {
            return res.status(200).json({
                massege: 'Thanh cong',
            })
        }
    })
    }
exports.AutoRepComment = async (RepComment,IdProduct, IdAcc, IdBill, Time) => {
    Comment.AutoRepComment(RepComment,IdProduct, IdAcc, IdBill,() => {
        clearTimeout(Time)
    })
    }
exports.showCommentAdmin = (req, res) => {
    Comment.showCommentAdmin(function(data) {
        if(data === null) {
            return res.status(200).json({
                massege: 'That bai',
            })
        }
        else {
            return res.status(200).json({
                massege: 'Thanh Cong',
                data: data
                })
        }
    })
}
