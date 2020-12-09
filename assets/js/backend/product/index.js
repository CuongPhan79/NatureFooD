class IndexListProductBackendEKP extends BaseBackendEKP {
	constructor() {
		super();
		this.initialize();
	}

	initialize() {
		//DO NOT LOAD UNNESSESARY CLASS
		//Init form + list if page have BOTH  
		this.list = new ListIndexProductBackendEKP();
	}
}


class ListIndexProductBackendEKP {
	constructor(opts) {
		_.extend(this, opts);
		this.initialize();
	}

	initialize() {
		let _this = this;
		_this.initFindBox();
		_this.initNumberProductCart();
	}
	initFindBox(){
		$('#findBox').on("click", (e) => {
			let search = $('#search').val();
			console.log(search);
			// $.ajax({url: `/?search=${search}`, success: {
				
			// }})
			window.location = `/?search=${search}`;
		})
	}
	initNumberProductCart() {
		Cloud.checkCart.with({}).protocol('jQuery').exec((err, responseBody, responseObjLikeJqXHR) => {
			if (err) {
				console.log(err);
				return;
			} else if (responseBody) {
				$('#numberCart').html(responseBody.cart.totalQty);
				$('#priceCart').html(responseBody.cart.totalPrice);
				$('#totalPriceCart').html(responseBody.cart.totalPrice);
			}
			//let _data = responseBody;
		})
	}
}
