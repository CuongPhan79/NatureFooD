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
  }
  handleItemActions() {
    let _this = this;
    //ONCLICK ADD
    let typePayment = $('#typePayment').val();
    _this.btnPayment.click(async function () {
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
    })
    //END ONCLICK ADD
  }
}

