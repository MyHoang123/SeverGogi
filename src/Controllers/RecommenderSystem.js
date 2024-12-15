
const Bill = require('../models/BillModel')


// Product
exports.RecommenderSystem = async (req, res) => {
    const IdAcc = req.Id
    let ProductsRecmst = []
    let Lengths = 0 
    Bill.rmstUserSendHistory(IdAcc,(userSend) =>  {
        // Sản phẩm đã xem không tồn tại trong giỏ hàng thì gợi ý
        if(userSend !== null) {
            Lengths = Lengths + userSend.length
                userSend.forEach(element => {
                    ProductsRecmst.push(element.IdProduct)
                });
            // Tiếp theo là tìm những người có sở thích dống nhau và lấy sản phẩm mà người đó thích bằng cách kiểm tra đánh giá gần nhất
            Bill.rmstUserBaseLike(IdAcc,ProductsRecmst,(UserBaseLike) => {
                if(UserBaseLike !== null) {
                    Lengths = Lengths + UserBaseLike.length
                        UserBaseLike.forEach(element => {
                            ProductsRecmst.push(element.IdProduct)
                        });
                    // Tiếp theo la tìm kiếm những người có chung sở thích xem họ mua gì gần đây
                    Bill.rmstUseBaseBuys(IdAcc,ProductsRecmst,(UserBaseBuy) => {
                        if(UserBaseBuy !== null) {
                            Lengths = Lengths + UserBaseLike.length
                                UserBaseBuy.forEach(element => {
                                    ProductsRecmst.push(element.IdProduct)
                                });
                                const newLength = Math.ceil((12-Lengths)/2)
                            // Kiểm tra giỏ hàng của người dùng xem thiếu loại nào thì gợi ý những sản phẩm bán chạy nhất của loại đó
                                Bill.rmstCard(IdAcc,ProductsRecmst,newLength,(ProductCard) => {
                                    if(ProductCard !== null) {
                                        Lengths = Lengths + ProductCard.length
                                        ProductCard.forEach(element => {
                                                ProductsRecmst.push(element.Id)
                                            });
                                        // Nếu có sản phẩm trong giỏ hàng thì đến bước tiếp theo là gợi ý theo những món trending
                                        const newLengthTrend = 12-Lengths
                                        Bill.rcmstHottrend(ProductsRecmst,newLengthTrend,IdAcc,(ProductTrending) => {
                                            if(ProductTrending !== null) {
                                                ProductTrending.forEach(element => {
                                                        ProductsRecmst.push(element.IdProduct)
                                                    });
                                                    Bill.rmstGetAllProduct(ProductsRecmst,(data) => {
                                                        if(data !== null) {
                                                            return res.status(200).json({
                                                                massege: 'Thanh cong 1',
                                                                data:data,
                                                            })
                                                        }
                                                        else {
                                                            // Lõi
                                                            return res.status(200).json({
                                                                massege: 'That bai',
                                                            })
                                                        }
                                                    })
                                            }
                                            else {
                                                // Lõi
                                                return res.status(200).json({
                                                    massege: 'That bai',
                                                })
                                            }
                                        })
                                    }
                                    // Trường hợp không có sản phẩm trong giỏ hàng thì gợi ý món hot trend
                                    else {
                                        const newLength = 12-Lengths
                                        Bill.rcmstHottrend(ProductsRecmst,newLength,IdAcc,(ProductTrending) => {
                                            if(ProductTrending !== null) {
                                                ProductTrending.forEach(element => {
                                                    ProductsRecmst.push(element.IdProduct)
                                                });
                                                Bill.rmstGetAllProduct(ProductsRecmst,(data) => {
                                                    if(data !== null) {
                                                        return res.status(200).json({
                                                            massege: 'Thanh cong 2',
                                                            data:data,
                                                        })
                                                    }
                                                    else {
                                                        // Lõi
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
                                })
                        } else {
                            return res.status(200).json({
                                massege: 'That bai',
                            })
                        }
                    })
                }
                // Trường hợp k có người cùng sở thích thì đến bước gợi ý tiếp theo
                else {
                    // Kiểm tra giỏ hàng của người dùng xem thiếu loại nào thì gợi ý những sản phẩm bán chạy nhất của loại đó
                    const newLength = Math.ceil((12-Lengths)/2)
                    Bill.rmstCard(IdAcc,ProductsRecmst,newLength,(ProductCard) => {
                        if(ProductCard !== null) {
                            Lengths = Lengths + ProductCard.length
                            ProductCard.forEach(element => {
                                ProductsRecmst.push(element.Id)
                            });
                            // Nếu có sản phẩm trong giỏ hàng thì đến bước tiếp theo là gợi ý theo những món trending
                            const newLengthTrend = 12-Lengths       
                            Bill.rcmstHottrend(ProductsRecmst,newLengthTrend,IdAcc,(ProductTrending) => {
                                if(ProductTrending !== null) {
                                    ProductTrending.forEach(element => {
                                        ProductsRecmst.push(element.IdProduct)
                                    });
                                    Bill.rmstGetAllProduct(ProductsRecmst,(data) => {
                                        if(data !== null) {
                                            return res.status(200).json({
                                                massege: 'Thanh cong 3',
                                                data:data,
                                            })
                                        }
                                        else {
                                            // Lõi
                                            return res.status(200).json({
                                                massege: 'That bai 3',
                                            })
                                        }
                                    })
                                }
                                else {
                                    return res.status(200).json({
                                        massege: 'That bai 3',
                                    })
                                }
                            })
                        }
                        // Trường hợp không có sản phẩm trong giỏ hàng
                        else {
                            const newLengthTrend = 12-Lengths  
                            Bill.rcmstHottrend(ProductsRecmst,newLengthTrend,IdAcc,(ProductTrending) => {
                                if(ProductTrending !== null) {
                                    ProductTrending.forEach(element => {
                                        ProductsRecmst.push(element.IdProduct)
                                    });
                                    Bill.rmstGetAllProduct(ProductsRecmst,(data) => {
                                        if(data !== null) {
                                            return res.status(200).json({
                                                massege: 'Thanh cong 4',
                                                data:data,
                                            })
                                        }
                                        else {
                                            // Lõi
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
                    })
                }
            })
        }
        // Sản phẩm đã xem đã tồn tại trong giỏ hàng hoặc không có sản phẩm đã xem
        else {
            Bill.rmstGetItemUserSend(IdAcc,async (ItemSend) => {
                // Sản phẩm đã xem có trong giỏ hàng thì gợi ý các sản phẩm được bán cùng với sản phẩm đã xem
                if(ItemSend !== null) {
                    for(let i in ItemSend) {
                        try {
                            const Item = await new Promise((resolve, reject) => {
                                Bill.rmstBuyTogether(ItemSend[i].IdProduct,IdAcc, (data) => {
                                    resolve(data);
                                });
                            });
                            // Điều kiện phải tìm được sản phẩm mua cùng
                            if(Item !== null) {
                                Lengths = Lengths + 1
                                ProductsRecmst.push(Item[i].IdProduct)
                            }
                          } catch (error) {
                              console.error(error);
                            }
                        }
                        // Tiếp theo là tìm những người có sở thích dống nhau và lấy sản phẩm mà người đó thích bằng cách kiểm tra đánh giá gần nhất
                            Bill.rmstUserBaseLike(IdAcc,ProductsRecmst,(UserBaseLike) => {
                                if(UserBaseLike !== null) {
                                    Lengths = Lengths + UserBaseLike.length
                                        UserBaseLike.forEach(element => {
                                            ProductsRecmst.push(element.IdProduct)
                                        });
                                    // Tiếp theo la tìm kiếm những người có chung sở thích xem họ mua gì gần đây
                                    Bill.rmstUseBaseBuys(IdAcc,ProductsRecmst,(UserBaseBuy) => {
                                        if(UserBaseBuy !== null) {
                                            Lengths = Lengths + UserBaseLike.length
                                                UserBaseBuy.forEach(element => {
                                                    ProductsRecmst.push(element.IdProduct)
                                                });
                                        // Kiểm tra giỏ hàng của người dùng xem thiếu loại nào thì gợi ý những sản phẩm bán chạy nhất của loại đó
                                                const newLength = Math.ceil((12-Lengths)/2)           
                                                Bill.rmstCard(IdAcc,ProductsRecmst,newLength,(ProductCard) => {
                                                    if(ProductCard !== null) {
                                                        Lengths = Lengths + ProductCard.length
                                                        ProductCard.forEach(element => {
                                                                ProductsRecmst.push(element.Id)
                                                            });
                                                        // Nếu có sản phẩm trong giỏ hàng thì đến bước tiếp theo là gợi ý theo những món trending
                                                        const newLengthTrend = 12-Lengths                                  
                                                        Bill.rcmstHottrend(ProductsRecmst,newLengthTrend,IdAcc,(ProductTrending) => {
                                                            if(ProductTrending !== null) {
                                                                ProductTrending.forEach(element => {
                                                                        ProductsRecmst.push(element.IdProduct)
                                                                    });
                                                                    Bill.rmstGetAllProduct(ProductsRecmst,(data) => {
                                                                        if(data !== null) {
                                                                            return res.status(200).json({
                                                                                massege: 'Thanh cong 5',
                                                                                data:data,
                                                                            })
                                                                        }
                                                                        else {
                                                                            // Lõi
                                                                            return res.status(200).json({
                                                                                massege: 'That bai 5',
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
                                                    // Trường hợp không có sản phẩm trong giỏ hàng thì gợi ý món hot trend
                                                    else {
                                                    const newLengthTrend = 12-Lengths                                     
                                                        Bill.rcmstHottrend(ProductsRecmst,newLengthTrend,IdAcc,(ProductTrending) => {
                                                            if(ProductTrending !== null) {
                                                                ProductTrending.forEach(element => {
                                                                    ProductsRecmst.push(element.IdProduct)
                                                                });
                                                                Bill.rmstGetAllProduct(ProductsRecmst,(data) => {
                                                                    if(data !== null) {
                                                                        return res.status(200).json({
                                                                            massege: 'Thanh cong 6',
                                                                            data:data,
                                                                        })
                                                                    }
                                                                    else {
                                                                        // Lõi
                                                                        return res.status(200).json({
                                                                            massege: 'That bai 6',
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
                                                })
                                        } else {
                                            return res.status(200).json({
                                                massege: 'That bai',
                                            })
                                        }
                                    })
                                }
                                // Trường hợp k có người cùng sở thích thì đến bước gợi ý tiếp theo
                                else {
                                    // Kiểm tra giỏ hàng của người dùng xem thiếu loại nào thì gợi ý những sản phẩm bán chạy nhất của loại đó
                                    const newLength = Math.ceil((12-Lengths)/2)           
                                    Bill.rmstCard(IdAcc,ProductsRecmst,newLength,(ProductCard) => {
                                        if(ProductCard !== null) {
                                            Lengths = Lengths + ProductCard.length
                                            ProductCard.forEach(element => {
                                                ProductsRecmst.push(element.Id)
                                            });
                                            // Nếu có sản phẩm trong giỏ hàng thì đến bước tiếp theo là gợi ý theo những món trending
                                            const newLengthTrend = 12-Lengths    
                                            Bill.rcmstHottrend(ProductsRecmst,newLengthTrend,IdAcc,(ProductTrending) => {
                                                if(ProductTrending !== null) {
                                                    ProductTrending.forEach(element => {
                                                        ProductsRecmst.push(element.IdProduct)
                                                    })
                                                    Bill.rmstGetAllProduct(ProductsRecmst,(data) => {
                                                        if(data !== null) {
                                                            return res.status(200).json({
                                                                massege: 'Thanh cong 7',
                                                                data:data,
                                                            })
                                                        }
                                                        else {
                                                            // Lõi
                                                            return res.status(200).json({
                                                                massege: 'That bai 7',
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
                                        // Trường hợp không có sản phẩm trong giỏ hàng
                                        else {
                                            const newLengthTrend = 12-Lengths       
                                            Bill.rcmstHottrend(ProductsRecmst,newLengthTrend,IdAcc,(ProductTrending) => {
                                                if(ProductTrending !== null) {
                                                    ProductTrending.forEach(element => {
                                                        ProductsRecmst.push(element.IdProduct)
                                                    });
                                                    Bill.rmstGetAllProduct(ProductsRecmst,(data) => {
                                                        if(data !== null) {
                                                            return res.status(200).json({
                                                                massege: 'Thanh cong 8',
                                                                data:data,
                                                            })
                                                        }
                                                        else {
                                                            // Lõi
                                                            return res.status(200).json({
                                                                massege: 'That bai 8',
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
                                    })
                                }
                            })
                }   
                else {
                        // Tiếp theo là tìm những người có sở thích dống nhau và lấy sản phẩm mà người đó thích bằng cách kiểm tra đánh giá gần nhất
                        Bill.rmstUserBaseLike(IdAcc,ProductsRecmst,(UserBaseLike) => {
                        if(UserBaseLike !== null) {
                            Lengths = Lengths + UserBaseLike.length
                                UserBaseLike.forEach(element => {
                                    ProductsRecmst.push(element.IdProduct)
                                });
                            // Tiếp theo la tìm kiếm những người có chung sở thích xem họ mua gì gần đây
                            Bill.rmstUseBaseBuys(IdAcc,ProductsRecmst,(UserBaseBuy) => {
                                if(UserBaseBuy !== null) {
                                    Lengths = Lengths + UserBaseLike.length
                                        UserBaseBuy.forEach(element => {
                                            ProductsRecmst.push(element.IdProduct)
                                        });
                                // Kiểm tra giỏ hàng của người dùng xem thiếu loại nào thì gợi ý những sản phẩm bán chạy nhất của loại đó
                                const newLength = Math.ceil((12-Lengths)/2)                                        
                                Bill.rmstCard(IdAcc,ProductsRecmst,newLength,(ProductCard) => {
                                            if(ProductCard !== null) {
                                                Lengths = Lengths + ProductCard.length
                                                ProductCard.forEach(element => {
                                                        ProductsRecmst.push(element.Id)
                                                    });
                                                // Nếu có sản phẩm trong giỏ hàng thì đến bước tiếp theo là gợi ý theo những món trending
                                                const newLengthTrend = 12-Lengths                                                                                
                                                Bill.rcmstHottrend(ProductsRecmst,newLengthTrend,IdAcc,(ProductTrending) => {
                                                    if(ProductTrending !== null) {
                                                        ProductTrending.forEach(element => {
                                                                ProductsRecmst.push(element.IdProduct)
                                                            });
                                                            Bill.rmstGetAllProduct(ProductsRecmst,(data) => {
                                                                if(data !== null) {
                                                                    return res.status(200).json({
                                                                        massege: 'Thanh cong 9',
                                                                        data:data,
                                                                    })
                                                                }
                                                                else {
                                                                    // Lõi
                                                                    return res.status(200).json({
                                                                        massege: 'That bai 9',
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
                                            // Trường hợp không có sản phẩm trong giỏ hàng thì gợi ý món hot trend
                                            else {
                                                const newLengthTrend = 12-Lengths                                                                                  
                                                Bill.rcmstHottrend(ProductsRecmst,newLengthTrend,IdAcc,(ProductTrending) => {
                                                    if(ProductTrending !== null) {
                                                        ProductTrending.forEach(element => {
                                                            ProductsRecmst.push(element.IdProduct)
                                                        });
                                                        Bill.rmstGetAllProduct(ProductsRecmst,(data) => {
                                                            if(data !== null) {
                                                                return res.status(200).json({
                                                                    massege: 'Thanh cong 10',
                                                                    data:data,
                                                                })
                                                            }
                                                            else {
                                                                // Lõi
                                                                return res.status(200).json({
                                                                    massege: 'That bai 10',
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
                                        })
                                } else {
                                    return res.status(200).json({
                                        massege: 'That bai',
                                    })
                                }
                            })
                        }
                        // Trường hợp k có người cùng sở thích không xem sản phẩm 
                        else {
                            // Kiểm tra giỏ hàng của người dùng xem thiếu loại nào thì gợi ý những sản phẩm bán chạy nhất của loại đó
                            const newLength = Math.ceil((12-Lengths)/2)                                        
                            Bill.rmstCard(IdAcc,ProductsRecmst,newLength,(ProductCard) => {
                                if(ProductCard !== null) {
                                    Lengths = Lengths + ProductCard.length
                                    ProductCard.forEach(element => {
                                        ProductsRecmst.push(element.Id)
                                    });
                                    // Nếu có sản phẩm trong giỏ hàng thì đến bước tiếp theo là gợi ý theo những món trending
                                    const newLengthTrend = 12-Lengths                                  
                                    Bill.rcmstHottrend(ProductsRecmst,newLengthTrend,IdAcc,(ProductTrending) => {
                                        if(ProductTrending !== null) {
                                            ProductTrending.forEach(element => {
                                                ProductsRecmst.push(element.IdProduct)
                                            });
                                            Bill.rmstGetAllProduct(ProductsRecmst,(data) => {
                                                if(data !== null) {
                                                    return res.status(200).json({
                                                        massege: 'Thanh cong 11',
                                                        data:data,
                                                    })
                                                }
                                                else {
                                                    // Lõi
                                                    return res.status(200).json({
                                                        massege: 'That bai 3',
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
                                // Trường hợp không có sản phẩm trong giỏ hàng
                                else {
                                    const newLengthTrend = 12-Lengths                                      
                                    Bill.rcmstHottrend(ProductsRecmst,newLengthTrend,IdAcc,(ProductTrending) => {
                                        if(ProductTrending !== null) {
                                            ProductTrending.forEach(element => {
                                                ProductsRecmst.push(element.IdProduct)
                                            });
                                            Bill.rmstGetAllProduct(ProductsRecmst,(data) => {
                                                if(data !== null) {
                                                    return res.status(200).json({
                                                        massege: 'Thanh cong 12',
                                                        data:data,
                                                    })
                                                }
                                                else {
                                                    // Lõi
                                                    return res.status(200).json({
                                                        massege: 'That bai 12',
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
                            })
                        }
                    })
                }
            })
        }
    })
}
