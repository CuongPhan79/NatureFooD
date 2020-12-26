class IndexListShippingBackendEKP extends BaseBackendEKP {
	constructor() {
		super();
		this.initialize();
	}

	initialize() {
		//DO NOT LOAD UNNESSESARY CLASS
		//Init form + list if page have BOTH  
		this.list = new ListIndexShippingBackendEKP();
	}
}

class ListIndexShippingBackendEKP {
	constructor(opts) {
        _.extend(this, opts);
        this.formId = 'formShipping';
        this.formObj = $('#' + this.formId);
		this.initialize();
	}

	initialize() {
    let _this = this;
    _this.initValidation();
    _this.initNumberProductCart();
  }
  initValidation() {
    let _this = this;

    _this.formObj.formValidation({
      button: {
        selector: '#btnShipping',
        disabled: 'disabled',
      },
      fields: {
        //Can combine both html5 mode and js mode
        //Refer: http://formvalidation.io/examples/attribute/
        /*alias: {
          validators: {
            notEmpty: {
              message: 'The title is required and cannot be empty'
            }
          }
        },*/
      },
      err: {
        clazz: 'invalid-feedback'
      },
      control: {
        // The CSS class for valid control
        valid: 'is-valid',

        // The CSS class for invalid control
        invalid: 'is-invalid'
      },
      row: {
        invalid: 'has-danger'
      },
      onSuccess: function (e) {
        //e.preventDefault();
        //console.log('FORM can submit OK');
      }
    })
    .on('success.form.fv', function (e) {
      // Prevent form submission
      e.preventDefault();
      console.log('----- FORM ROLE ----- [SUBMIT][START]');
      let $form = $(e.target);
      let formData = $form.serializeArray();
      let tmpData = {};
      _.each(formData, (item) => {
        tmpData[item.name] = item.value;
      });
      Cloud.addShipping.with(tmpData).protocol('jQuery').exec((err, responseBody, responseObjLikeJqXHR) => {
        if (err) {
          if (responseBody.message) {
            _this.alert.removeClass('d-none').addClass("alert-warning").html(responseBody.message);
            setTimeout(function () {
              _this.alert.removeClass('alert-warning').addClass("d-none");
            }, 3000);
            return;
          } else {
            _this.alert.removeClass('d-none').addClass("alert-danger").html(_this.messages.error);
            setTimeout(function () {
              _this.alert.removeClass('alert-danger').addClass("d-none");
            }, 3000);
          }
          return;
        } else {
          window.location = `/payment`;
        }
        //cloud success
      });
      console.log('----- FORM ROLE ----- [SUBMIT][END]');
    });
  }
  initNumberProductCart() {
		Cloud.checkCart.with({}).protocol('jQuery').exec((err, responseBody, responseObjLikeJqXHR) => {
			if (err) {
				console.log(err);
				return;
			} else if (responseBody) {
				$('#numberCart').html(responseBody.cart.totalQty)
			}
			//let _data = responseBody;
		})
	}
}

