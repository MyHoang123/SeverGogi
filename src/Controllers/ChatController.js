const Chat = require('../models/ChatModal')

exports.addChat = (Data, result) => {
    if(Data !== null) {
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth() + 1; // +1 vì tháng bắt đầu từ 0
        const day = currentDate.getDate();
        const formattedDate = `${year}-${month}/${day}`;
        Chat.addChat(Data.IdSend,Data.IdReceiver,Data.time,Data.containt,formattedDate, (data) => {
            if(data !== null) {
                result (data)
            }
            else {
                result (null)
            }
        })
    }
}

exports.getAlUserChat = (req,res) => {
    const IdAcc = req.Id
    Chat.getUserChat(IdAcc,async (data) => {
        if(data !== null) {
            for(let i in data) {
                try {
                    const Count = await new Promise((resolve, reject) => {
                            Chat.CountChat(data[i].IdSend,IdAcc,(data) => {
                            resolve(data);
                            });
                    });
                    data[i].Count = Count[0].Count
                  } catch (error) {
                      console.error(error);
                    }
            }
            return res.status(200).json({
                massege: 'Thanh cong',
                data: data
             })
        }
        else {
            return res.status(200).json({
                massege: 'That bai',
             })
        }
    })
}
exports.getChat = (user,result) => {
    Chat.getChat(user.IdSend,user.IdReceiver,(data) => {
        if(data !== null) {
            Chat.updateChat(user.IdReceiver,() => {
                if(data !== null ) {
                    result(data)
                }
                else {
                    result(null)
                }
            })
        }
        else {
            result(null)
        }
    })
}