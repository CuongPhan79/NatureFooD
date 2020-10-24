module.exports = {

    friendlyName: 'Update cart',

    description: 'This helper updates a cart already in session',
  
    inputs: {
        req: {
            type: 'ref',
            description: 'The current incoming request (req).',
            required: true
        }
    },
    fn: async function (inputs, exits) {
        if (inputs.req.param('qty') != undefined && inputs.req.param('qty') >=1 ) {
            var qty = parseInt(inputs.req.param('qty'));
        } else if (inputs.req.body != undefined) {
            var qty = parseInt(inputs.req.body.quantity)
        } else {
            var qty = 1;
        }
        if (inputs.req.param('id')) {
            var product = await Product.findOne({id: inputs.req.param('id')})
        }
        if (inputs.req.body != undefined) {
            var product = await Product.findOne({id: inputs.req.body.productId})
        }
        var currentCart = inputs.req.session.cart
        if('item' + product.id in currentCart.items) {
            var productid = 'item' + product.id;
            let oldQty = currentCart.items[productid].qty;
            let oldPrice = currentCart.items[productid].qty * currentCart.items[productid].product.price
            var updatedCart = currentCart;
            updatedCart.items[productid].qty = parseInt(qty);
            updatedCart.totalQty = +updatedCart.totalQty - oldQty;
            updatedCart.totalPrice = updatedCart.totalPrice - oldPrice;
            updatedCart.totalQty = updatedCart.totalQty + qty;
            updatedCart.totalPrice = updatedCart.totalPrice + updatedCart.items[productid].product.price * qty;
        } else {
            currentCart.items['item' + inputs.req.param('id')] = {
                qty: qty,
                product: product
            }
            currentCart.totalQty = currentCart.totalQty + qty;
            currentCart.totalPrice = currentCart.totalPrice + product.price * qty;
            var updatedCart = currentCart;
        }
        return exits.success(updatedCart);
    }
};
  