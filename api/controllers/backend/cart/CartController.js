module.exports = {
    add: async (req, res) => {
        let params = req.allParams();
        if(req.session.cart) {
          var updateCart = await sails.helpers.updateToCart(req);
          req.session.cart = updateCart;
        }
        else {
            var cart = await sails.helpers.addToCart(params.id, 1);
            req.session.cart = cart
        }
        return res.ok({cart: cart})
    },
    del: async (req, res) => {
        let params = req.allParams();
        var cart= req.session.cart;
        var id = 'item' + params.id;
        //update total qty
            cart.totalQty = cart.totalQty - cart.items[id].qty;
        //update total price
            cart.totalPrice = cart.totalPrice - cart.items[id].qty * cart.items[id].product.price;
        //delete the item
            delete cart.items[id]
        return res.ok({cart: cart})
    },
    checkCart: async (req, res) => {
        let cart = {
            items: {},
            totalPrice: 0,
            totalQty: 0
        }
        if(req.session.cart) {
            cart = req.session.cart
        }
        return res.ok({cart: cart})
    }
}