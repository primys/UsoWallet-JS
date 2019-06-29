;(function(globalObject) {
    'use strict';

    const Clear = {
        clearAdd: function () {
            clearInputList([
                'add_pk_input',
                'add_password_input',
                'add_repeat_password_input'
            ]);
        },
        clearGenerate: function () {
            clearDivList([
                'generate_pk_div'
            ]);
        },
        clearSummary: function () {
            clearDivList([
                'eth_balance',
                'uso_balance',
                'eth_height',
                'uso_supply'
            ]);
        },
        clearDeposit: function () {
            clearInputList(['deposit_password_input']);
            clearDivList([
                'qr_address',
                'text_address'
            ]);
        },
        clearSend: function () {
            clearInputList([
                'send_address_input',
                'send_amount_input',
                'send_password_input'
            ]);
        },
        clearDashboard: function () {
            this.clearSummary();
            this.clearDeposit();
            this.clearSend();
        },
        clearAll: function () {
            this.clearAdd();
            this.clearGenerate();
            this.clearSummary();
            this.clearDeposit();
            this.clearSend();
        }
    };


    function clearInputList(list) {
        list.forEach(function (item) {
            const obj = $('#' + item);
            obj.val('');
        });
    }

    function clearDivList(list) {
        list.forEach(function (item) {
            const obj = $('#' + item);
            obj.text('');
        });
    }

    globalObject.Clear = Clear;
})(window);