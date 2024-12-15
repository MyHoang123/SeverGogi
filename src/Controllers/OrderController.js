require("dotenv").config()
var jwt = require('jsonwebtoken');
const Order = require('../models/OrderModel')
exports.createQR = async (req, res) => {
    const { IdTable, IdType } = req.body;
    const IdAcc = req.Id
    if(IdAcc === 1) {
        let token = jwt.sign({IdTable: IdTable,IdType: IdType}, process.env.ACCESS_JWT_SECRET);
        if(token) {
            return res.status(200).json({
                massege: 'Thanh cong',
                token: token
             })
        }else {
            return res.status(200).json({
                massege: 'That bai'
             })
        }
    }else {
        return res.status(200).json({
            massege: 'That bai'
         })
    }
}
exports.updateProductOrder = async (Status,IdDetail, callback) => {
    Order.updateProductOrder(Status,IdDetail,(data) => {
        if(data !== null) {
           callback('Thanh cong')
        }
        else {
            callback('That bai')
        }
    })
   
}
exports.createTable = async (req,res) => {
    const {name} = req.body
    const newName = `Bàn Số ${name}`
    Order.createTable(newName,(data) => {
        if(data !== null) {
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
exports.deleteTable = async (req,res) => {
    const { IdTable } = req.body
    Order.deleteTable(parseInt(IdTable),(data) => {
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
exports.getProductOrder = async (req, res) => {
    const IdType = req.type;
    if(parseInt(IdType) !== 39) {
        Order.getProductOrder(IdType,(data) => {
            if(data !== null) {
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
    else {
        Order.getProductOrderAll((data) => {
            if(data !== null) {
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
}
// 
exports.getCateOrder = async (req, res) => {
    const IdType = req.type;
    if(parseInt(IdType) !== 39) {
        Order.getCateOrder(IdType,(data) => {
            if(data !== null) {
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
    else {
        Order.getCateOrderAll((data) => {
            if(data !== null) {
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
}
exports.fillterProductCate = async (req, res) => {
    const { IdCate } = req.body
    const IdType = req.type;
    if(parseInt(IdType) !== 39) {
        Order.fillterProductCate(IdType,IdCate,(data) => {
            if(data !== null) {
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
    else {
        Order.fillterProductCateAll(IdCate,(data) => {
            if(data !== null) {
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
}

exports.updateTable = async (Status,IdTable,callback) => {
    Order.updateTable(Status,IdTable,(data) => {
        if(data!== null) {
             callback('Thanh cong')
        }
        else {
            callback('That bai')
        }
    })
}
exports.checkOut = async (Price,IdTable,callback) => {
    const newPrice = Price + (Price * 0.08)
    Order.updateBillStatus(newPrice,IdTable,(data) => {
        if(data !== null) {
            Order.updateTableStatus(IdTable,(datan) => {
                if(datan !== null) {
                    callback('Thanh cong')
                }
            })
        }
        else {
            Order.updateTableStatus(IdTable,(datan) => {
                if(datan !== null) {
                    callback('Thanh cong')
                }
            })
        }
    })
}
exports.updateBillOrder = async (req, res) => {
    const { Id } = req.body;
    Order.updateBillOrder(Id)
    return res.status(200).json({
        massege: 'thanh cong',
     })
}
// exports.updateProductOrder = async (req, res) => {
//     const { Id, IdTable } = req.body;
//     try {
//         const name = await new Promise((resolve, reject) => {
//             Order.getBillOrderUser(IdTable,function(data) {
//                 resolve(data);
//             })
//         });
//         const newObject = [...JSON.parse(name[0].Data)];
//         for(let i = 0; i < JSON.parse(name[0].Data).length; i++) {
//             if(JSON.parse(name[0].Data)[i].Id === Id) {
//                 newObject[i].Status = 'Đã Giao'
//             }
//         }
//         Order.updateProductOrder(JSON.stringify(newObject),IdTable)
//       } catch (error) {
//           console.error(error);
//         }
//         return res.status(200).json({
//             massege: 'success CreateBill',
//         })
        
// }
exports.deleteProductOrder = async (req, res) => {
    const { Id, IdTable } = req.body;
    try {
        const name = await new Promise((resolve, reject) => {
            Order.getBillOrderUser(IdTable,function(data) {
                resolve(data);
            })
        });
        const newObject = [...JSON.parse(name[0].Data)];
        for(let i = 0; i < JSON.parse(name[0].Data).length; i++) {
            if(JSON.parse(name[0].Data)[i].Id === Id) {
                newObject[i].Status = 'Đã Hủy'
            }
        }
        Order.updateProductOrder(JSON.stringify(newObject),IdTable)
      } catch (error) {
          console.error(error);
        }
        return res.status(200).json({
            massege: 'success CreateBill',
        })
}
exports.createBillOrder = async (req, res) => {
    const { TotalPrice, Data } = req.body;
    const IdTable = req.table
    const IdType = req.type
    const currentDate = new Date()
    const year = currentDate.getFullYear()
    const month = currentDate.getMonth() + 1; // +1 vì tháng bắt đầu từ 0
    const day = currentDate.getDate()
    const hours = currentDate.getHours()
    const minutes = currentDate.getMinutes()
    const secon = currentDate.getSeconds()
    const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${secon}`;
    Order.getBillOrderUser(IdTable,IdType,(Table) => {
        if(Table !== null) {
            const values = Data.map(item => {
                const noteValue = item.Note ? `'${item.Note}'` : "NULL";
                return `(${Table.Id}, ${item.Id}, ${item.quantity},0, ${noteValue})`;
            }).join(',');
            console.log("🚀 ~ values ~ values:", values)
            Order.createbillproductOrder(values,(data) => {
                console.log("🚀 ~ Order.createbillproductOrder ~ data:", data)
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
        else {
                Order.createBillOrder(TotalPrice,IdTable,IdType,formattedDate,async function(databill) {
                    if(databill !== null) {
                        const values = Data.map(item => {
                            const noteValue = item.Note ? `'${item.Note}'` : "NULL";
                            return `(${databill}, ${item.Id}, ${item.quantity},0, ${noteValue})`;
                        }).join(',');
                        Order.createbillproductOrder(values,(data) => {
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
                })
        }
    })
    }
exports.showBillOrderUser = async (req, res) => {
    const { IdTable } = req.body;
    Order.getBillOrderUser(IdTable,async function(data) {
        if(data === null) {
            return res.status(200).json({
                massege: 'Không tìm thấy đơn hàng',
            })
        }
        else {
            const datanew = []
            let AllPrice = 0
            for(let i = 0 ; i < JSON.parse(data[0].Data).length ; i ++ ) {
                    // Get FullName
                    try {
                        const name = await new Promise((resolve, reject) => {
                            Order.getBillProductOrderUser(JSON.parse(data[0].Data)[i].Id,function(data) {
                                resolve(data);
                            })
                        });
                        datanew.push(name[0])
                      } catch (error) {
                          console.error(error);
                        }
               
                    }                
            for(let i = 0 ; i < JSON.parse(data[0].Data).length ; i++) {
                for(let j = 0 ; j < datanew.length; j ++) {
                    if(JSON.parse(data[0].Data)[i].Id === datanew[i].Id) {
                        let sl = JSON.parse(data[0].Data)[i].Price / datanew[i].Price
                        datanew[i].sl = sl
                        datanew[i].Status = `${JSON.parse(data[0].Data)[i].Status}`
                    }
                }
                AllPrice = AllPrice + JSON.parse(data[0].Data)[i].Price
            }
            const productApi = {
                Price: AllPrice,
                Data: JSON.stringify(datanew),
            }
            return res.status(200).json({
                massege: 'thanh cong ',
                data: productApi
                })
        }
    })
}
exports.showProductOrder = async (req, res) => {
    const IdTable = req.table
    Order.getProductBillOrder(IdTable,function(data) {     
        if(data !== null) {
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
exports.showProductOrderAdmin = async (req, res) => {
    const { IdTable } = req.params
    Order.getProductBillOrderAdmin(IdTable,function(data) {     
        if(data !== null) {
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
exports.showBillOrder = async (req, res) => {
    const IdTable = req.table
    const IdType = req.type
    Order.getBillOrder(IdTable,IdType,function(data) {     
        if(data !== null) {
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