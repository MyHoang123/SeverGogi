const bestSeller = [
    {
        "Id": 85,
        "Name": "Salad cải bó xôi",
        "Img": "60000016_Salad_cai_bo_xoi_1_1.png",
        "Dsription": "Salad cải bó xôi là một món ăn gồm những chiếc lá cải bó xôi tươi xanh mướt, được trộn với các nguyên liệu như thịt bò, hành tây, tỏi, nước tương và gia vị. Các thành phần này thường được nướng lên để tạo ra hương vị đậm đà, ngọt bùi. Khi ăn, salad được cuốn cùng với các loại rau sống như xà lách, rau mùi và chan thêm nước sốt đặc trưng. Sự kết hợp giữa vị ngọt của thịt nướng, vị chua của nước sốt và sự giòn mềm của các loại rau tạo nên một món ăn đầy hương vị và cân bằng dinh dưỡng.",
        "Price": 69000,
        "Sales": 1001,
        "Star": 4
    },
    {
        "Id": 41,
        "Name": "Má heo Mỹ tươi/Sốt obathan",
        "Img": "60000046_nac_vai_cay_1_1.png",
        "Dsription": "Má heo Mỹ tươi với sốt obathan gogi là một món ăn truyền thống của Hàn Quốc. Thịt lợn được ướp gia vị đậm đà, xào cùng với sốt obathan gogi cân bằng ngọt, mặn và cay. Món ăn này thường được ăn kèm với cơm trắng hoặc rau sống để tạo nên một bữa ăn hoàn chỉnh.",
        "Price": 109000,
        "Sales": 1000,
        "Star": null
    },
    {
        "Id": 56,
        "Name": "Lẩu bull gogi ",
        "Img": "60000114_lau_bulgogi_1.png",
        "Dsription": "Lẩu Bulgogi là món ăn truyền thống của Hàn Quốc, được tạo nên từ các loại thịt bò được ướp trong nước sốt đậm đà và nấu trong nồi lẩu sôi sùng sục. Thịt bò mềm ngọt hòa quyện cùng các loại rau củ tươi ngon như nấm, bắp cải và hành lá, tạo ra hương vị đậm đà và hấp dẫn. Món lẩu này được thưởng thức nóng hổi, giúp ấm áp cơ thể và khơi dậy vị giác. Lẩu Bulgogi là sự lựa chọn hoàn hảo cho bữa ăn gia đình hay tụ họp bạn bè, mang đến trải nghiệm ẩm thực đầy thú vị.",
        "Price": 309000,
        "Sales": 1000,
        "Star": 4
    },
    {
        "Id": 38,
        "Name": "Sườn non bò Mỹ tươi/ Obathan/gabi",
        "Img": "60000076_suon_la_xot_obathan_1.png",
        "Dsription": "Thịt bò nướng Gogi là món ăn truyền thống của Hàn Quốc, với thịt bò tẩm gia vị đậm đà như nước tương, tỏi, hành và đường, sau đó được nướng trên than hoa hoặc bếp nướng điện cho vẻ ngoài giòn rụm và bên trong vẫn giữ được độ mềm, ngậy và thơm lừng. Món ăn này thường được ăn cuốn cùng với rau sống và các gia vị như nước tương hoặc tương ớt.",
        "Price": 439000,
        "Sales": 999,
        "Star": 5
    },
    {
        "Id": 59,
        "Name": "Tôm nướng Gogi (ALC)",
        "Img": "60012739_tom_alc_1.png",
        "Dsription": "Tôm Nướng Gogi là một món ăn hấp dẫn trong ẩm thực Hàn Quốc, kết hợp hương vị ngọt của tôm với vị cay, thơm của nước sốt gogi. Những con tôm tươi ngon được nướng vàng ươm trên ngọn lửa, tạo ra lớp vỏ giòn bên ngoài và thịt tôm mềm ngọt bên trong. Món ăn được chan đều nước sốt gogi chua cay, mang lại sự hoà quyện đầy thú vị giữa các hương vị. Tôm Nướng Gogi thường được thưởng thức cùng các món ăn khác như cơm, rau sống và kim chi, tạo nên một bữa ăn Hàn Quốc đậm đà và đầy hấp dẫn.",
        "Price": 229000,
        "Sales": 999,
        "Star": null
    },
    {
        "Id": 49,
        "Name": "Canh kim chi",
        "Img": "60003801_Canh_kim_chi_1.png",
        "Dsription": "Canh Kim Chi là món canh truyền thống của Hàn Quốc, mang hương vị đặc trưng của kim chi chua cay, kết hợp cùng các nguyên liệu tươi ngon khác. Lớp nước canh trong veo được nêm nếm vừa vặn, tôn lên vị chua của kim chi và vị ngọt tự nhiên của các thành phần khác như tôm, thịt, nấm và rau củ. Sự hòa quyện của những hương vị này tạo nên một món canh đầy dinh dưỡng và hấp dẫn, vừa ấm áp dễ uống lại vừa kích thích vị giác. Canh Kim Chi là một lựa chọn hoàn hảo để bắt đầu hoặc kết thúc bữa ăn truyền thống Hàn Quốc.",
        "Price": 99000,
        "Sales": 999,
        "Star": 4
    }
]
exports.getBestSeller = (req, res, next) => {
    if (bestSeller.length > 0) {
        return res.status(200).json({
            massege: 'Thanh cong',
            data: bestSeller
        })
    }
    else {
      next()
    }
}