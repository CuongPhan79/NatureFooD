module.exports = {
  inputs: {},
  exits: {
    success: {
      viewTemplatePath: 'backend/pages/product/form',
    },
    redirect: {
      responseType: 'redirect'
    }
  },
  fn: async function (inputs, exits) {
    let totalActive = await ProductService.count({ status: sails.config.custom.STATUS.ACTIVE });
    let totalDraft = await ProductService.count({ status: sails.config.custom.STATUS.DRAFT});
    let totalTrash = await ProductService.count({ status: sails.config.custom.STATUS.TRASH});
    let params = this.req.allParams();
    let productId = params.id;
    let listProductRate = await EvaluateService.find({product: productId});
    let listRate = [];
    for(item of listProductRate) {
      listRate.push(item.rate)
    } 
    let sum = 0;
    for( let i = 0; i < listRate.length; i++ ){
        sum += parseInt( listRate[i], 10 ); //don't forget to add the base
    }
    let rateAvg = (sum!=0) ? sum/listRate.length : 0;
    rateAvg = rateAvg.toFixed(2)
    let _default = await sails.helpers.getDefaultData(this.req);
    let productObj = {};
      productObj = await ProductService.get(productId);
    let productTypeObj = await ProductTypeService.find({status: sails.config.custom.STATUS.ACTIVE});
    _default.productTypeObj = productTypeObj;
    _default.totalTrash = totalTrash;
    _default.totalActive = totalActive;
    _default.totalDraft = totalDraft;
    let imageObj = productObj.image.split("_");
    let type = imageObj[1].split(".");
    productObj.img = imageObj[0] + "_origin." + type[1];
    _default.productObj = productObj;
    _default.link = {
      arrlink: [{
        name: "Danh sách sản phẩm",
        link: "/"
      }],
      linkAcctive: {
        name: "Chi tiết sản phẩm",
        link: `/product/${productId}`
      }
    }
    _default.rateAvg = rateAvg;
    return exits.success(_default);
  }
};