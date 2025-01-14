

const Bill = require('../models/BillModel')
exports.CountBill = async (req, res) => {
    Bill.CountBill(function(data) {
        return res.status(200).json({
            massege: 'thanh cong',
            data: data[0]['COUNT(Id)']
         })
    })
}
exports.UpdatePayBill = async (req, res) => {
    const {IdPay,result} = req.pay
    Bill.updatePayBill(IdPay,function(data) {
        if(data !== null) {
            return res.status(200).json({result})
        }
        else {
            return res.status(200).json({result})
        }
    })
}
exports.updateBill = async (IdBill, IdAcc, Status,Product, callback) => {
    const currentDate = new Date()
    const year = currentDate.getFullYear()
    const month = currentDate.getMonth() + 1; // +1 vì tháng bắt đầu từ 0
    const day = currentDate.getDate()
    const hours = currentDate.getHours()
    const minutes = currentDate.getMinutes()
    const secon = currentDate.getSeconds()
    const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${secon}`
    Bill.updateBill(Status,IdBill,(data) => {
        if(data !== null) {
            let Containt = ''
            if(Status === 1) {
                Containt = 'Đơn hàng của bạn đã được duyệt'
            }else if(Status === 2) {
                Containt = 'Đơn hàng đang được giao đến bạn'
            }
            else if(Status === 3) {
                Containt = 'Giao hàng thành công'
            }
            else if(Status === 5) {
                Containt = 'Đơn hàng của bạn đã bị hủy'
            }
            if(Product !== null) {
                Product.forEach(element => {
                    Bill.updateSale(element.Id,element.Sl)
                });
            }
            Bill.CreateNotifi(IdAcc,Containt,formattedDate,IdBill,(datan) => {
                if(datan !== null) {
                    callback('Thanh Cong')
                }
                else {
                    callback('That Bai')
                }
        })
    }
        else {
            callback('That Bai')
        }
    })
}

exports.TotalPrice = async (req, res) => {
    Bill.CountTotalPrice(function(data) {
        return res.status(200).json({
            massege: 'thanh cong',
            data: data[0]['SUM(TotalPrice)']/24000
         })
    })
}
exports.showAllBill = async (req, res) => {
    Bill.getAllBill(async function(data) {
    if(data !== null) {
        return res.status(200).json({
            massege: 'Thanh cong',
            data: data,
            })
    }
    else {
        return res.status(200).json({
            massege: 'That bai',
            })
    }
    })
}
exports.showProductBill = async (req, res) => {
    const {IdProduct} = req.body
        IdProduct.join(',')
        Bill.showProductBill(IdProduct,(data) => {
            if(data !== null) {
                return res.status(200).json({
                    massege: 'Thanh cong',
                    data: data
                 })
            }else {
                return res.status(200).json({
                    massege: 'That bai',
                 })
            }

        })
    }
exports.showBill = async (req, res) => {
    const  IdAcc  = req.Id;
    Bill.getBill(IdAcc,function(data) {
        console.log("🚀 ~ Bill.getBill ~ data:", data)
        console.log("🚀 ~ Bill.getBill ~ IdAcc:", IdAcc)
        if(data === null) {
            return res.status(200).json({
                massege: 'Không tìm thấy đơn hàng',
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
exports.getProductHottrend = (req, res) => {
    Bill.getProductHottrend(function(data) {
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
exports.AllBIll = (req, res) => {
    let AllBill = 0
    let AllBillOrder = 0
    let PriceBill = 0
    let PriceBillOrder = 0
    const getAllBill = new Promise((resolve,reject) => {
        Bill.getAmountBill(((data) => {
           if(data !== null) {
            resolve(data[0])
             }
         }))
    })
    const getAllBillOrder = new Promise((resolve,reject) => {
        Bill.getAmountBillOrder(((data) => {
           if(data !== null) {
            resolve(data[0])
             }
         }))
    })
    const getPriceBill = new Promise((resolve,reject) => {
        Bill.getAllPriceBill(((data) => {
           if(data !== null) {
            resolve(data[0])
             }
         }))
    })
    const getPriceBillOrder = new Promise((resolve,reject) => {
        Bill.getAllPriceBillOrder(((data) => {
           if(data !== null) {
            resolve(data[0].total_amount)
             }
         }))
    })
    // Hàm thực thi promise
   const StartPromise = async () => {
    AllBill = await getAllBill
    AllBillOrder = await getAllBillOrder
    PriceBill = await getPriceBill
    // PriceBillOrder = await getPriceBillOrder
    const All = {
        AllCount: AllBill.AllCount + AllBillOrder.AllCount,
        Since_last_week: ((((AllBill.AllCount + AllBillOrder.AllCount) - (AllBill.AllCountl + AllBillOrder.AllCountl)) / (AllBill.AllCountl + AllBillOrder.AllCountl)) * 100).toFixed(1)
    }
    delete AllBill.AllCountl
    delete AllBillOrder.AllCountl
        return res.status(200).json({
            massege: 'Thanh cong',
            All: All,
            AllBill: AllBill,
            AllBillOrder: AllBillOrder,
            TotalAll: PriceBill
            // TotalPrice: PriceBill + PriceBillOrder,
        })
   }
   StartPromise()
}
exports.showBillUser = async (req, res) => {
    const {Status} = req.body
    const  IdAcc  = req.Id;
    Bill.getBillUser(IdAcc,Status,async function(data) {
        if(data === null) {
            return res.status(200).json({
                massege: 'Không tìm thấy đơn hàng',
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
exports.getPriceBillDate = async (req, res) => {
    Bill.getAllPriceDate(function(data) {
        if(data === null) {
            return res.status(200).json({
               massege: 'That bai',
            })
        }
        else {
            const result = data.reduce((acc,curr) => {
                return [...acc,curr.total_price]
            },[])
            return res.status(200).json({
                massege: 'Thanh cong',
                data: result
            })
        }
    })
}
exports.getAllBillDate = async (req, res) => {
    Bill.getAllBillDate(function(data) {
        if(data === null) {
            return res.status(200).json({
               massege: 'That bai',
            })
        }
        else {
            const result = data.reduce((acc,curr) => {
                return [...acc,curr.total_bills ]
            },[])
            return res.status(200).json({
                massege: 'Thanh cong',
                data: result
            })
        }
    })
}
exports.getBill = async (req, res) => {
    const {IdBill} = req.body
    Bill.getBillDetail(IdBill,async function(data) {
        if(data === null) {
            return res.status(200).json({
               massege: 'Không tìm thấy đơn hàng',
            })
        }
        else {
            const newDes = data[0].Destination
            const Des = newDes.split(',').map(Number)
            data[0].Destination = Des
            return res.status(200).json({
                massege: 'Thanh cong',
                data: data
            })
        }
    })
}
exports.createBill = async (req, res) => {
    const { TotalPrice, Name, Sdt, Data, Address, Destination, Note } = req.body;
    const { IdPay, UrlPay, StatusPay } = req.payment
    const  IdAcc  = req.Id;
    const currentDate = new Date()
    const year = currentDate.getFullYear()
    const month = currentDate.getMonth() + 1; // +1 vì tháng bắt đầu từ 0
    const day = currentDate.getDate()
    const hours = currentDate.getHours()
    const minutes = currentDate.getMinutes()
    const secon = currentDate.getSeconds()
    const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${secon}`
        Bill.createBill(IdAcc,Name,Sdt,TotalPrice,Address,Destination,formattedDate,Note,IdPay,StatusPay,(data) => {
            if(data === null) {
                return res.status(200).json({
                        massege: 'That bai',
                    })
            }
            else {
                const values = Data.map(item => {
                    const noteValue = item.Note ? `'${item.Note}'` : "NULL";
                    return `(${data}, ${item.Id}, ${item.Price}, ${noteValue})`;
                }).join(',');
                Bill.createbillproduct(values,(result) => {
                    if(result !== null) {
                        const IdAdmin = 1
                        const Containt = 'Bạn nhận được một đơn hoàng mới'
                            Bill.CreateNotifi(IdAdmin,Containt,formattedDate,data,(data) => {
                                if(data !== null) {
                                    if(UrlPay !== null) {
                                        return res.status(200).json({
                                            massege: 'Thanh Toan',
                                            data: data,
                                            url: UrlPay
                                        })
                                    }else {
                                        return res.status(200).json({
                                            massege: 'Thanh cong',
                                            data: data
                                        })
                                    }
                                }
                        }) 
                    }
                    else {
                        return res.status(200).json({
                            massege: 'That bai',
                            })
                    }
                })
            }
        })
    }