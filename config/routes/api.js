const CartController = require("../../api/controllers/backend/cart/CartController");

module.exports.api = {
    'PUT /api/entrance/login': { action: 'backend/entrance/login' },
    'POST /api/product/buy': { controller: 'backend/product/ProductController', action: 'buy' },
    'GET /api/addCart/:id': { controller: 'backend/cart/CartController', action: 'add' },
    'GET /api/delCart/:id': { controller: 'backend/cart/CartController', action: 'del' },
    'GET /api/checkCart': { controller: 'backend/cart/CartController', action: 'checkCart' },
    
}