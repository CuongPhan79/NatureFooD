const moment = require('moment');
module.exports = {
    payment: async (req, res) => {
        var result = '';
        var characters  = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for ( var i = 0; i < 8; i++ ) {
           result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        const params = req.allParams();
        const order = {
            code: result,
            orderDate: moment().format('YYYY-MM-DD'),
            customer: req.me.id,
            informationReceived: {
                shipping: req.session.shipping,
                cart: req.session.cart
            },
            typePayment: parseInt(params.typePayment)
        }
        let orderObj = await OrderService.add(order);
        _.each(req.session.cart.items, async function (item, index) {
            await Order_Product.create({
                order: orderObj.id,
                product: item.product.id,
                quanlity: item.qty
            });
        });
        delete req.session.cart;
        return res.ok()
    },
}