
const Product = require('../models/ProductModel')
const fs = require('fs');
const path = require('path');

// Product
exports.showProduct = async (req, res) => {
    const Page = req.query.page
    const newPage = (Page - 1) * 8
    Product.getAllProduct(newPage, function (data) {
        if (data !== null) {
            Product.getLenghtProduct(function (lenght) {
                if (data !== null) {
                    return res.status(200).json({
                        massege: 'Thanh cong',
                        data,
                        lenght
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
            return res.status(200).json({
                massege: 'That bai',
            })
        }
    })
}
exports.showLenghtProduct = async (req, res) => {
    Product.getLenghtProduct(function (data) {
        if (data !== null) {
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
// Product
exports.deleteproduct = async (req, res) => {
    const { IdProduct } = req.body
    Product.deleteproduct(IdProduct, function (data) {
        if (data !== null) {
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
exports.deleteType = async (req, res) => {
    const { IdType } = req.body
    Product.deleteType(IdType, function (data) {
        if (data !== null) {
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
exports.deleteDetailProduct = async (req, res) => {
    const { IdType, IdProduct } = req.body
    Product.deleteDetailProduct(IdType, IdProduct, function (data) {
        if (data !== null) {
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
exports.deleteDetailType = async (req, res) => {
    const { IdType, IdCategoris } = req.body
    Product.deleteDetailType(IdType, IdCategoris, function (data) {
        if (data !== null) {
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
exports.deleteCategoris = async (req, res) => {
    const { IdCategoris } = req.body
    Product.deleteCategoris(IdCategoris, function (data) {
        if (data !== null) {
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
exports.deleteMenu = async (req, res) => {
    const { IdMenu } = req.params
    Product.deleteMenu(IdMenu, function (data) {
        if (data !== null) {
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
exports.deleteVoucher = async (req, res) => {
    const { IdVoucher } = req.params
    Product.deleteVoucher(IdVoucher, function (data) {
        if (data !== null) {
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

// Product
exports.showProductAdmin = async (req, res) => {
    Product.getAllProductAdmin(function (data) {
        if (data !== null) {
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
exports.showProductId = async (req, res) => {
    const { IdProduct } = req.body
    Product.getProductId(IdProduct, function (data) {
        Product.getStarProduct((star) => {
            for (let i = 0; i < data.length; i++) {
                let allstar = 0.0
                let dem = 0
                for (let j = 0; j < star.length; j++) {
                    if (data[i].Id === star[j].IdProduct) {
                        allstar = allstar + star[j].Star
                        dem = dem + 1
                    }
                }
                const totalStar = allstar / dem
                data[i].Star = parseFloat(totalStar.toFixed(1))
            }
            return res.status(200).json({
                massege: 'thanh cong',
                data: data
            })
        })
    })
}
exports.showProductCate = async (req, res) => {
    const { IdType } = req.body
    const dataNew = []
    Product.getAllProductType(IdType, async function (data) {
        for (let i in data) {
            try {
                const name = await new Promise((resolve, reject) => {
                    Product.getAllProductCate(data[i].IdCategoris, (data) => {
                        resolve(data);
                    });
                });
                dataNew.push(name)
            } catch (error) {
                console.error(error);
            }
        }

        return res.status(200).json({
            massege: 'Thanh cong',
            data: dataNew
        })

    })

}
exports.showBestSeller = async (req, res) => {
    Product.getProductBestSeller(function (data) {
        return res.status(200).json({
            massege: 'thanh cong',
            data: data
        })
    })
}
exports.showBestSellerCate = async (req, res) => {
    Product.getBestsellerCate(async function (data) {
        if (data !== null) {
            return res.status(200).json({
                massege: 'Thanh cong',
                data: data
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
exports.showProductType = async (req, res) => {
    const { IdType } = req.body;
    Product.getAllProductTypes(IdType, function (data) {
        return res.status(200).json({
            massege: 'thanh cong',
            data: data
        })
    })
}
exports.showTable = async (req, res) => {
    Product.getTable(function (data) {
        return res.status(200).json({
            massege: 'thanh cong',
            data: data
        })
    })
}
exports.showTableQR = async (req, res) => {
    Product.getTableQr(function (data) {
        return res.status(200).json({
            massege: 'thanh cong',
            data: data
        })
    })
}

exports.createProduct = async (req, res) => {
    const { Name, Price, Dsription, IdCategoris } = req.body;
    const Img = req.file.filename
    const Id = 1
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1; // +1 vì tháng bắt đầu từ 0
    const day = currentDate.getDate();
    const formattedDate = `${year}-${month}/${day}`;
    Product.insertProduct(Name, Price, Img, Dsription, IdCategoris, formattedDate, Id, formattedDate, Id, (data) => {
        if (data !== null) {
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
exports.updateProduct = async (req, res) => {
    const { Name, Price, Dsription, IdCategoris, Id, ImgOld } = req.body;
    const Img = req.file.filename
    fs.unlinkSync(path.join(__dirname, '..', 'public', 'img', `${ImgOld}`));
    Product.updateproduct(Name, Price, Img, Dsription, IdCategoris, Id, (data) => {
        if (data !== null) {
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
exports.editProduct = async (req, res) => {
    const { Name, Price, Dsription, IdCategoris, Id } = req.body;
    Product.editproduct(Name, Price, Dsription, IdCategoris, Id, (data) => {
        if (data !== null) {
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

exports.showDetailProduct = async (req, res) => {
    Product.getAllDetailProducts(function (data) {
        return res.status(200).json({
            massege: 'thanh cong',
            data: data
        })
    })
}
exports.createDetailProduct = async (req, res) => {
    const { IdType, IdProduct } = req.body;
    Product.inserDetailtProduct(parseInt(IdType), parseInt(IdProduct), (data) => {
        if (data !== null) {
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
exports.updateDetailProduct = async (req, res) => {
    const { IdType, IdProduct, Id } = req.body;
    Product.updateDetailProduct(IdType, IdProduct, Id)
    return res.status(200).json({
        massege: 'thanh cong',
    })
}
exports.voucher = async (req, res) => {
    const { voucher } = req.body;
    Product.voucher(voucher, function (data) {
        if (data === null) {
            return res.status(200).json({
                massege: 'That bai',
                data: 0
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
// Type
exports.showType = async (req, res) => {
    const getTypes = new Promise((resolve, reject) => {
        Product.getCategoriType(function (data) {
            if (data !== null) {
                resolve(data)
            }
        })
    })
    const StartPromise = async () => {
        const types = await getTypes
        const resuilt = types.reduce((accumulator, current) => {
            const { NameType, NameCate, IdType, IdCate } = current;
            if (!accumulator[NameType]) {
                accumulator[NameType] = [];
            }
            accumulator[NameType].push({ NameCate, IdType, IdCate });
            return accumulator;
        }, {})
        return res.status(200).json({
            massege: 'thanh cong',
            data: resuilt
        })
    }
    StartPromise()
}
exports.showTypeAdmin = async (req, res) => {
    Product.getAllTypes(function (data) {
        for (let i in data) {
            if (data[i].Name === '') {
                data.splice(i, 1)
            }
        }
        return res.status(200).json({
            massege: 'thanh cong',
            data: data
        })
    })
}
exports.showDetailType = async (req, res) => {
    Product.getAllDetailTypes(function (data) {
        return res.status(200).json({
            massege: 'thanh cong',
            data: data
        })
    })
}
exports.updateDetailType = async (req, res) => {
    const { IdType, IdCategoris, Id } = req.body;
    Product.updateDetailType(IdType, IdCategoris, Id)
    return res.status(200).json({
        massege: 'thanh cong',
    })
}
exports.createType = async (req, res) => {
    const { Name, Price, IdMenu } = req.body;
    const Id = 1
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1; // +1 vì tháng bắt đầu từ 0
    const day = currentDate.getDate();
    const formattedDate = `${year}-${month}/${day}`;
    Product.insertType(Name, Price, IdMenu, formattedDate, Id, formattedDate, Id)
    return res.status(200).json({
        massege: 'thanh cong',
    })
}
exports.createDetailType = async (req, res) => {
    const { IdType, IdCategoris } = req.body;
    Product.inserDetailtType(IdType, IdCategoris)
    return res.status(200).json({
        massege: 'thanh cong',
    })
}
exports.updateType = async (req, res) => {
    const { Name, Price, IdMenu, Id } = req.body;
    Product.updatetype(Name, IdMenu, Price, Id)
    return res.status(200).json({
        massege: 'thanh cong',
    })
}
// Caterogi
exports.updateCategori = async (req, res) => {
    const { Name, IdType, Id } = req.body;
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1; // +1 vì tháng bắt đầu từ 0
    const day = currentDate.getDate();
    const formattedDate = `${year}-${month}/${day}`;
    Product.updatecategori(Name, IdType, formattedDate, Id)
    return res.status(200).json({
        massege: 'thanh cong',
    })
}
exports.showCategori = async (req, res) => {
    Product.getAllCategories(function (data) {
        return res.status(200).json({
            massege: 'thanh cong',
            data: data
        })
    })
}
exports.createCategori = async (req, res) => {
    const { Name } = req.body;
    const Id = 1
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1; // +1 vì tháng bắt đầu từ 0
    const day = currentDate.getDate();
    const formattedDate = `${year}-${month}/${day}`;
    Product.insertctgr(Name, formattedDate, Id, formattedDate, Id)
    return res.status(200).json({
        massege: 'thanh cong',
    })
}
exports.createMenu = async (req, res) => {
    const { Name } = req.body;
    Product.createMenu(Name)
    return res.status(200).json({
        massege: 'thanh cong',
    })
}
exports.filterCategori = async (req, res) => {
    const IdType = JSON.parse(req.query.IdType)
    const Page = req.query.page
    const newPage = (Page - 1) * 8
    const Cate = req.query.IdCate
    if (IdType !== null && Cate !== null) {
        Product.filterCateType(Cate, IdType, newPage, (data) => {
            if (data !== null) {
                Product.getLenghtProductCateType(Cate, IdType, (lenght) => {
                    if (lenght !== null) {
                        return res.status(200).json({
                            massege: 'Thanh cong',
                            data: data,
                            lenght
                        })
                    } else {
                        return res.status(200).json({
                            massege: 'That bai',
                        })
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
    else if (Cate === 'all') {
        Product.getAllProduct(newPage, function (data) {
            if (data !== null) {
                Product.getLenghtProduct(function (lenght) {
                    if (data !== null) {
                        return res.status(200).json({
                            massege: 'Thanh cong',
                            data,
                            lenght
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
                return res.status(200).json({
                    massege: 'That bai',
                })
            }
        })
    }
    else if (Cate !== null && IdType === null) {
        Product.filterCate(Cate, newPage, (data) => {
            if (data !== null) {
                Product.getLenghtProductCate(Cate, (lenght) => {
                    if (lenght !== null) {
                        return res.status(200).json({
                            massege: 'Thanh cong',
                            data: data,
                            lenght
                        })
                    } else {
                        return res.status(200).json({
                            massege: 'That bai',
                        })
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

}

// Menu
exports.showMenu = async (req, res) => {
    Product.getAllMenu(function (data) {
        return res.status(200).json({
            massege: 'thanh cong',
            data: data
        })
    })
}
exports.updateVisible = async (req, res) => {
    const { IdProductV } = req.body
    const { IdProductH } = req.body
    Product.updateVisibleProduct(IdProductV, function (data) {
        Product.updateHidenProduct(IdProductH, function (datan) {
            if (datan !== null && data !== null) {
                return res.status(200).json({
                    massege: 'Thanh cong',
                })
            } else {
                return res.status(200).json({
                    massege: 'That bai',
                })
            }
        })
    })

}
