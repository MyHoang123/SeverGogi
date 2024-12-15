const Card = require('../models/CardModal')
exports.addCard = async (req, res) => {
    const { IdProduct } = req.body;
    const IdAcc = req.Id
        Card.addCard(IdAcc,IdProduct,(data) => {
            if(data === null ) {
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
exports.showCard = async (req, res) => {
    const IdAcc = req.Id
    Card.showCard(IdAcc,(data) => {
        if(data === null) {
            return res.status(200).json({
                massege: 'That bai',
                })
        }
        else {
            return res.status(200).json({
                data: data,
                massege: 'Thanh Cong',
            })
        }
    })
}
exports.deleteCard = async (req, res) => {
    const { IdProduct } = req.body;
    const IdAcc = req.Id
        Card.deleteCard(IdAcc,IdProduct, (data) => {
            if(data !== null) {
                return res.status(200).json({
                    massege: 'Thanh cong',
                })
            }
            else {
                return res.status(200).json({
                    massege: 'That bai',
                })
            }
        })
}
exports.showLengthCard = async (req, res) => {
    const IdAcc = req.Id
    Card.showLengthCard(IdAcc,(data) => {
        if(data === null) {
            return res.status(200).json({
                massege: 'That bai',
                })
        }
        else {
            return res.status(200).json({
                massege: 'Thanh cong',
                data: data
            })
        }
    })
}