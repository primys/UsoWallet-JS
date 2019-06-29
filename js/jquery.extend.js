$.fn.extend({
    startLoading: (function () {
        this.data('text', this.html());
        this.html('<i class="fa fa-spinner fa-spin"></i> Please wait...');
        this.prop('disabled', true);
        this.button('loading');
    }),
    stopLoading: (function (disable) {
        const text = this.data('text');
        if(!Validator.isNullOrEmpty(text)) {
            this.html(text);
            this.prop('disabled', ((disable !== undefined && disable)));

        }
    }),
    setHide: (function () {
        this.addClass('hidden');
    }),
    setShow: (function () {
        this.removeClass('hidden');
    }),
    setEnabled: (function() {
        this.prop('disabled', false);
    }),
    setDisabled: (function() {
        this.prop('disabled', true);
    })
});