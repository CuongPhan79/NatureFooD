module.exports = {

    friendlyName: 'Add to cart',

    description: 'This helper creates a cart and adds the first product it',
  
    inputs: {
      productId: {
        type: 'string',
        required: true
      },
      productQty: {
        type: 'number',
        required: true
      }
    },
    fn: async function (inputs, exits) {
      var product = await Product.findOne({id: inputs.productId});
      var cart = {
          items: {},
          totalQty: parseInt(inputs.productQty),
          totalPrice: parseInt(product.price)
      }
      cart.items['item'+product.id] = {
          qty: parseInt(inputs.productQty),
          product: product
      }
      return exits.success(cart);
    }
};
  