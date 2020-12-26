/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

var routes_api = require('./routes/api');

module.exports.routes = Object.assign(routes_api.api, {

  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` your home page.            *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/

  'GET /login': { action: 'backend/entrance/view-login', locals: { layout: 'backend/layouts/layout-guest' } },
  'GET /register': { action: 'backend/entrance/view-register', locals: { layout: 'backend/layouts/layout-guest' } },
  'GET /': { action: 'backend/product/index'},
  'GET /product/:id': { action: 'backend/product/form'},
  'GET /:productType': { action: 'backend/product/index'},
  'GET /cart':{ action: 'backend/cart/index'},
  'GET /shipping':{ action: 'backend/shipping/index'},
  'GET /payment':{ action: 'backend/payment/index'},
  'GET /order':{ action: 'backend/order/index'},
  'GET /order/detail/:id': { action: 'backend/order/detail'},
  'GET /backend/logout': { action: 'backend/entrance/logout' },
  'GET /evaluate/:id': { action: 'backend/evaluate/index' },
  'GET /profile': { action: 'backend/entrance/view-edit-profile' },
});
