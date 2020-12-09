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
		this.initialize();
	}

	initialize() {
        let _this = this;
        _this.initWizard();
    }
    initWizard() {
        var form = $("#example-form");
        form.children("div").steps({
        headerTag: "h3",
        bodyTag: "section",
        transitionEffect: "slideLeft",
        onFinished: function(event, currentIndex) {
            alert("Submitted!");
        }
        });
        var validationForm = $("#example-validation-form");
        validationForm.val({
        errorPlacement: function errorPlacement(error, element) {
            element.before(error);
        },
        rules: {
            confirm: {
            equalTo: "#password"
            }
        }
        });
        validationForm.children("div").steps({
        headerTag: "h3",
        bodyTag: "section",
        transitionEffect: "slideLeft",
        onStepChanging: function(event, currentIndex, newIndex) {
            validationForm.val({
            ignore: [":disabled", ":hidden"]
            })
            return validationForm.val();
        },
        onFinishing: function(event, currentIndex) {
            validationForm.val({
            ignore: [':disabled']
            })
            return validationForm.val();
        },
        onFinished: function(event, currentIndex) {
            alert("Submitted!");
        }
        });
        var verticalForm = $("#example-vertical-wizard");
        verticalForm.children("div").steps({
        headerTag: "h3",
        bodyTag: "section",
        transitionEffect: "slideLeft",
        stepsOrientation: "vertical",
        onFinished: function(event, currentIndex) {
            alert("Submitted!");
        }
        });
    }
}

