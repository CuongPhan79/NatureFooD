class IndexListCartBackendEKP extends BaseBackendEKP {
	constructor() {
		super();
		this.initialize();
	}

	initialize() {
		//DO NOT LOAD UNNESSESARY CLASS
		//Init form + list if page have BOTH  
		this.list = new ListIndexCartBackendEKP();
	}
}


class ListIndexCartBackendEKP {
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
		$('.quantity').on('change', function (e) {
			let id = $(this).attr('data-id-prod');
			let qty = $(this).val();
			Cloud.addCart.with({ id: id, qty: qty }).protocol('jQuery').exec((err, responseBody, responseObjLikeJqXHR) => {
				if (err) {
					console.log(err);
					return;
				} else if (responseBody) {
					_this.initNumberProductCart();
				}
				//let _data = responseBody;
			})
		})
		$('.remove-row').on('click', function (e) {
			let id = $(this).attr('data-id-prod');
			_this.initSweetAlert(id)
		})
	}
	initSweetAlert(id) {
		swal({
			title: 'Bạn có chắc muốn xóa ?',
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3f51b5',
			cancelButtonColor: '#ff4081',
			confirmButtonText: 'Great ',
			buttons: {
				cancel: {
					text: "Hủy",
					value: null,
					visible: true,
					className: "btn btn-danger",
					closeModal: true,
				},
				confirm: {
					text: "OK",
					value: true,
					visible: true,
					className: "btn btn-primary",
					closeModal: true
				}
			}
		}).then((value) => {
		  if (value) {
			//get AJAX data
			Cloud.delCart.with({ id: id }).protocol('jQuery').exec((err, responseBody, responseObjLikeJqXHR) => {
				if (err) {
					console.log(err);
					return;
				}
				location.reload();
				//let _data = responseBody;
			})
		  }
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
