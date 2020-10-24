module.exports = {
    inputs: {},
    exits: {
      success: {
        viewTemplatePath: 'backend/pages/cart/index',
      },
      redirect: {
        responseType: 'redirect'
      }
    },
    fn: async function (inputs, exits) {
      let _default = await sails.helpers.getDefaultData(this.req);
      let productTypeObj = await ProductTypeService.find({status: sails.config.custom.STATUS.ACTIVE});
      _default.productTypeObj = productTypeObj;
      var cart = this.req.session.cart
      if (cart != undefined) {
      var items = cart.items
      } else {
      var items = 0
      }
      _default.items = items
      return exits.success(_default);
    }
  };