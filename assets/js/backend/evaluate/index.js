class IndexFormEvaluateBackendEKP extends BaseBackendEKP {
	constructor() {
		super();
		this.initialize();
	}

	initialize() {
		//DO NOT LOAD UNNESSESARY CLASS
		//Init form + list if page have BOTH
		this.list = new ListIndexEvaluategBackendEKP();
	}
}

class ListIndexEvaluategBackendEKP {
	constructor(opts) {
        _.extend(this, opts);
        this.btnEvaluate = $('#btnEvaluate');
		this.initialize();
	}
	initialize() {
    let _this = this;
	_this.handleItemActions();
	_this.initNumberProductCart();
  }
  handleItemActions() {
    let _this = this;
    //ONCLICK ADD
    _this.btnEvaluate.click(async function () {
        let rate = $("input[name=rate]:checked").val();
        let idProduct = _this.btnEvaluate.attr('data-idProduct');
        let idCustomer = _this.btnEvaluate.attr('data-idCustomer');
        await $.ajax({type: "POST", url: "/api/evaluate",data: {
            rate: rate,
            idProduct: idProduct,
            idCustomer: idCustomer
        },
        success: async function(result){
          if (result) {
						swal({
							title: 'Đánh giá thành công !',
							icon: 'success',
							button: {
								text: "OK",
								value: true,
								visible: true,
								className: "btn btn-primary"
							}
						}).then((value) => {
							//THEN RELOAD PAGE IF NEEDED
							location.reload();
						})
					}
        }});
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

