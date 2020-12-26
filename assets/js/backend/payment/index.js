class IndexListPaymentBackendEKP extends BaseBackendEKP {
	constructor() {
		super();
		this.initialize();
	}

	initialize() {
		//DO NOT LOAD UNNESSESARY CLASS
		//Init form + list if page have BOTH
		this.list = new ListIndexPaymentgBackendEKP();
	}
}

class ListIndexPaymentgBackendEKP {
	constructor(opts) {
        _.extend(this, opts);
        this.btnPayment = $('#btnPayment');
		this.initialize();
	}
	initialize() {
    let _this = this;
	_this.handleItemActions();
	_this. initNumberProductCart();
  }
  handleItemActions() {
		let _this = this;
		//ONCLICK ADD
		_this.btnPayment.click(async function () {
			let typePayment = $('#typePayment').val();
			await $.ajax({type: "POST", url: "/api/payment",data: {
				typePayment: typePayment
			},
			success: async function(result){
			if (result) {
							swal({
								title: 'Đặt hàng thành công !',
								icon: 'success',
								button: {
									text: "Đến đơn hàng của tôi",
									value: true,
									visible: true,
									className: "btn btn-primary"
								}
							}).then((value) => {
								//THEN RELOAD PAGE IF NEEDED
								window.location = `/order`;
							})
						}
			}});
		});
		$('#typePayment1').on('click', function (e) {
			$('#paypal-button-container').show();
		})
		$('#typePayment').on('click', function (e) {
			$('#paypal-button-container').hide();
		})

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

