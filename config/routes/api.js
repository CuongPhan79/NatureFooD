module.exports.api = {
    'PUT /api/entrance/login': { action: 'backend/entrance/login' },
    'POST /api/customer/register': { controller: 'backend/customer/CustomerController', action: 'register' },
    'POST /api/product/buy': { controller: 'backend/product/ProductController', action: 'buy' },
    'GET /api/addCart/:id': { controller: 'backend/cart/CartController', action: 'add' },
    'GET /api/delCart/:id': { controller: 'backend/cart/CartController', action: 'del' },
    'GET /api/checkCart': { controller: 'backend/cart/CartController', action: 'checkCart' },
    'GET /api/checkoutpaypal': { controller: 'backend/cart/PaymentController', action: 'checkoutPaypal' },
    'POST /api/addShipping': { controller: 'backend/shipping/ShippingController', action: 'add' },
    'POST /api/payment': { controller: 'backend/payment/PaymentController', action: 'payment' },
    'POST /api/evaluate': { controller: 'backend/evaluate/EvaluateController', action: 'add' },
    
    //FACE BOOK
    'GET /api/v1/auth/facebook': {
        controller: 'backend/passport/PassportController',
        action: 'facebookAuth'
    },
    'GET /api/v1/auth/facebook/callback': {
        controller: 'backend/passport/PassportController',
        action: 'facebookCallback'
    },

    //GOOGLE
    'GET /api/v1/auth/google': {
        controller: 'backend/passport/PassportController',
        action: 'googleAuth'
    },
    'GET /api/v1/auth/google/callback': {
        controller: 'backend/passport/PassportController',
        action: 'googleCallback'
    },
    'PATCH /api/v1/backend/customer/edit': { controller: 'backend/customer/CustomerController', action: 'edit' },
    
}