// Avoid `console` errors in browsers that lack a console.
(function ($) {
    var method;
    var noop = function () { };
    var methods = [
      'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
      'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
      'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
      'timeStamp', 'trace', 'warn'
    ];
    var length = methods.length;
    var console = (window.console = window.console || {});
  
    while (length--) {
      method = methods[length];
  
      // Only stub undefined methods.
      if (!console[method]) {
        console[method] = noop;
      }
    }
  
}(jQuery));
  var ESTOREPRO = ESTOREPRO || {};
  //global variable for current backend instance 
var curBackendEKP;

$(document).ready(function () {
    ESTOREPRO.login();
    ESTOREPRO.initialize();
});
ESTOREPRO.login = function () {
    if ($('#frmLogin').length) {
        $('#frmLogin').validator().on('submit', (e) => {
            if (e.isDefaultPrevented()) {
                //nothing
            } else {
                e.preventDefault();
                //looks good
                console.log('[SUBMIT][START] ----- frmLogin -----');
                //prepare data
                let formData = $('#frmLogin').serializeArray();
                let tmpData = {};
                _.each(formData, (item) => {
                tmpData[item.name] = item.value;
                });
                //sign up start
                Cloud.login.with(tmpData).protocol('jQuery').exec((err, responseBody, responseObjLikeJqXHR) => {
                if (err) {
                    //err from server responde
                    if (err.code == 'badCombo') {
                    $('.alert').removeClass('hidden');
                    } else if (err.code == 'accountNotReady') {
                    $('#accountNotActive').removeClass('hidden');
                    } else {
                    $('#loginFail').addClass('hidden');
                    $('#otherError').removeClass('hidden');
                    $('#accountNotActive').addClass('hidden');
                    }
                    return;
                }
                //cloud success
                console.log('----- frmLogin ----- [SUBMIT][END]');
                window.location = '/';
                });
            }
        });
    }
    if ($('#frmRegister').length) {
        $('#frmRegister').validator().on('submit', (e) => {
            if (e.isDefaultPrevented()) {
                //nothing
            } else {
                e.preventDefault();
                //looks good
                console.log('[SUBMIT][START] ----- frmRegister -----');
                //prepare data
                let formData = $('#frmRegister').serializeArray();
                let tmpData = {};
                _.each(formData, (item) => {
                tmpData[item.name] = item.value;
                });
                //sign up start
                Cloud.register.with(tmpData).protocol('jQuery').exec((err, responseBody, responseObjLikeJqXHR) => {
                    if (err) {
						if(err.code){
                            $('#frmRegister').removeClass('d-none').addClass("alert-danger").html('Đã xảy ra lỗi');
                            setTimeout(function () {
                              $('#frmRegister').removeClass('alert-danger').addClass("d-none");
                            }, 3000);
                        }
						return;
					} else if (responseBody) {
                        if(responseBody.code){
                            $('.alert').removeClass('d-none').addClass("alert-danger").html(responseBody.message);
                            setTimeout(function () {
                              $('.alert').removeClass('alert-danger').addClass("d-none");
                            }, 3000);
                        }else {
                            swal({
                                title: 'Đăng ký thành công !',
                                icon: 'success',
                                button: {
                                    text: "Tiếp tục",
                                    value: true,
                                    visible: true,
                                    className: "btn btn-primary"
                                }
                            }).then((value) => {
                                //THEN RELOAD PAGE IF NEEDED 
                                window.location = '/';
                            })
                        }
					}
                });
            }
        });
    }
    // $('#btnFacebook').on('click', async function (e) {
    //     await $.ajax({type: "GET", url: "/api/v1/auth/facebook",
    //     success:  function(){
    //         window.location = '/';
    //     }});
    // });
    // $('#btnGoogle').on('click', async function (e) {
    //     await $.ajax({type: "GET", url: "/api/v1/auth/google",
    //     success:  function(){
    //         window.location = '/';
    //     }});
    // });
};

ESTOREPRO.initialize = function () {
    console.log(EKPAction);
    var pathName = EKPAction;
    switch (pathName) {
        case 'backend/product/index':
            curBackendEKP = new IndexListProductBackendEKP();
            break;
        //------------------------------------------------
        case 'backend/product/form':
            curBackendEKP = new IndexFormProductBackendEKP();
            break;
        //------------------------------------------------
        case 'backend/cart/index':
            curBackendEKP = new IndexListCartBackendEKP();
            break;
        //------------------------------------------------
        case 'backend/shipping/index':
            curBackendEKP = new IndexListShippingBackendEKP();
            break;
        //------------------------------------------------
        case 'backend/payment/index':
            curBackendEKP = new IndexListPaymentBackendEKP();
            break;
        //------------------------------------------------
        case 'backend/order/index':
            curBackendEKP = new IndexListCartBackendEKP();
            break;
        //------------------------------------------------
        case 'backend/order/detail':
            curBackendEKP = new IndexListCartBackendEKP();
            break;
        //------------------------------------------------
        case 'backend/entrance/view-edit-profile':
            curBackendEKP = new IndexFormAccountBackendEKP();
            break;
        //------------------------------------------------
        case 'backend/evaluate/index':
            curBackendEKP = new IndexFormEvaluateBackendEKP();
            break;
        //------------------------------------------------
    }
}