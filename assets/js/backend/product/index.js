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
		_this.handleItemActions();
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
	handleItemActions() {
		let _this =  this;
		// ONCLICK BUTTON ADD CART
		$('.cart-row').on('click', function (e) {
			let id = $(this).attr('data-id');
			Cloud.addCart.with({ id: id }).protocol('jQuery').exec((err, responseBody, responseObjLikeJqXHR) => {
				if (err) {
					console.log(err);
					$.toast({
						heading: 'Error',
						text: 'Thêm sản phẩm vào giỏ hàng lỗi!!!',
						position: 'top-right',
						loaderBg:'#ff6849',
						icon: 'error',
						hideAfter: 3000
					  });
					return;
				} else {
					_this.initNumberProductCart();
					$.toast({
						heading: 'Successfully',
						text: 'Đã thêm sản phẩm vào giỏ hàng',
						position: 'top-right',
						loaderBg:'#ff6849',
						icon: 'success',
						hideAfter: 3000
					});
				}
				//let _data = responseBody;
			})
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
