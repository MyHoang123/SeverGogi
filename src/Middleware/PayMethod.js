require('dotenv').config()
const axios = require('axios');
const CryptoJS = require('crypto-js'); // npm install crypto-js
const qs = require('qs'); // Nếu bạn đang sử dụng Node.js
const moment = require('moment'); // npm install moment
exports.PayMethod = async (req, res, next) => {
  const  { PayMethod, TotalPrice } = req.body;
// APP INFO, STK TEST: 4111 1111 1111 1111
if(PayMethod === '1') {
  const config = {
    app_id: '2553',
    key1: 'PcY4iZIKFCIdgZvA6ueMcMHHUbRLYjPL',
    key2: 'kLtgPl8HHhfvMuDHPwKfgfsY4Ydm9eIz',
    endpoint: 'https://sb-openapi.zalopay.vn/v2/create',
  };
  const embed_data = {
    //sau khi hoàn tất thanh toán sẽ đi vào link này (thường là link web thanh toán thành công của mình)
    redirecturl: 'http://localhost:3000/card',
  };

  const items = [];
  const transID = Math.floor(Math.random() * 1000000);
  const order = {
    app_id: config.app_id,
    app_trans_id: `${moment().format('YYMMDD')}_${transID}`, // translation missing: vi.docs.shared.sample_code.comments.app_trans_id
    app_user: 'user123',
    app_time: Date.now(), // miliseconds
    item: JSON.stringify(items),
    embed_data: JSON.stringify(embed_data),
    amount: TotalPrice,
    //khi thanh toán xong, zalopay server sẽ POST đến url này để thông báo cho server của mình
    //Chú ý: cần dùng ngrok để public url thì Zalopay Server mới call đến được
    callback_url: 'https://1c45-2402-800-6343-8f6a-3cb4-7161-45d8-3d0.ngrok-free.app/api/v12/callback',
    description: `Gogi - Payment for the order #${transID}`,
    bank_code: '',
  };

  // appid|app_trans_id|appuser|amount|apptime|embeddata|item
  const data =
    config.app_id +
    '|' +
    order.app_trans_id +
    '|' +
    order.app_user +
    '|' +
    order.amount +
    '|' +
    order.app_time +
    '|' +
    order.embed_data +
    '|' +
    order.item;
  order.mac = CryptoJS.HmacSHA256(data, config.key1).toString();
  try {
    const result = await axios.post(config.endpoint, null, { params: order });
    if(result.data.return_message === 'Giao dịch thành công') {
      const payment = {
        IdPay: order.app_trans_id,
        UrlPay: result.data.order_url,
        StatusPay: 2
      }
      req.payment = payment
     return next()
    }
    console.log(result)
    return res.status(200).json(result.data);
  } catch (error) {
    console.log(error);
  }
} else if (PayMethod === '3') {
  const payment = {
    IdPay: '',
    UrlPay: null,
    StatusPay: 0
  }
  req.payment = payment
   return next()
}

  }