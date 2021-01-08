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
	_this.initPaypal();
	$('#paypal-button-container').hide();
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
	initPaypal(){
		let totalPrice = 0;
		Cloud.checkCart.with({}).protocol('jQuery').exec((err, responseBody, responseObjLikeJqXHR) => {
		  if (err) {
			  console.log(err);
			  return;
		  } else if (responseBody) {
			  totalPrice = responseBody.cart.totalPrice
		  }
		  //let _data = responseBody;
		  })
		paypal.Buttons({
			createOrder: function(data, actions) {
			  // This function sets up the details of the transaction, including the amount and line item details.
			 
			  return actions.order.create({
				purchase_units: [{
				  amount: {
					value: totalPrice
				  }
				}]
			  });
			},
			onApprove: function(data, actions) {
			  // This function captures the funds from the transaction.
			  return actions.order.capture().then(async function(details) {
				// This function shows a transaction success message to your buyer.
				if (details) {
					let typePayment = $('.form-check-input').val();
			await $.ajax({type: "POST", url: "/api/payment",data: {
				typePayment: '1'
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
				}
			  });
			}
		  }).render('#paypal-button-container');
	}
}

