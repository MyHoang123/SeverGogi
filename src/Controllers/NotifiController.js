const Noti = require('../models/NotifiModal')
exports.ShowNotifi = async (req, res) => {
    const IdAcc = req.Id
    Noti.getNotifi(IdAcc,function(data) {
        if(data !== null) {
            const dataNew = []
            let lenght = 0
            for(let i in data) {
                const targetDate = new Date(data[i].Date); // Chuyển đổi thành đối tượng Date
                const now = new Date(); // Thời gian hiện tại
                const diffInMilliseconds = now - targetDate; // Sự chênh lệch theo mili giây
                // Tính toán các khoảng thời gian
                const diffInSecond = Math.floor(diffInMilliseconds / 1000); // Chênh lệch phút
                const diffInMinutes = Math.floor(diffInMilliseconds / 1000 / 60); // Chênh lệch phút
                const diffInHours = Math.floor(diffInMilliseconds / 1000 / 60 / 60); // Chênh lệch giờ
                let result;
                if (diffInMilliseconds < 1000 * 60) {
                    result = `${diffInSecond} giây trước`;

                }else if(diffInMilliseconds < 1000 * 60 * 60) {
                    result = `${diffInMinutes} phút trước`;
                }
                else {
                    result = `${diffInHours} giờ trước`;
                }
                if(data[i].Status === 0) {
                    lenght = lenght + 1
                }
                const temp = {
                    // Id: data[i].Id,
                    Containt: data[i].Containt,
                    Time: result,
                    Status: data[i].Status,
                    IdBill: data[i].IdBill
                }
                dataNew.push(temp)
            }
            return res.status(200).json({
                massege: 'Thanh cong',
                data: dataNew,
                lenght: lenght
             })
        }
        else {
            return res.status(200).json({
                massege: 'That bai',
                data: data
             })
        }
    })
}
exports.updateNoti = async (req, res) => {
    const IdAcc = req.Id
    Noti.updateNoti(IdAcc,(data) => {
        if(data !== null) {
            return res.status(200).json({
                massege: 'thanh cong',
             })
        }
        else {
            return res.status(200).json({
                massege: 'that bai',
             })
        }
    })
}
exports.deleteNoti = async (req, res) => {
    const IdAcc = req.Id
    Noti.deleteNoti(IdAcc,(data) => {
        if(data !== null) {
            return res.status(200).json({
                massege: 'thanh cong',
             })
        }
        else {
            return res.status(200).json({
                massege: 'that bai',
             })
        }
    })
}