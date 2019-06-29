$(function() {
    'use strict';

    Clear.clearAll();
    if (Validator.isExistWallet()) {
        Page.changeToDashboard();
    }
    else {
        Page.changeToFirst();
    }

    const Strings = Values.Strings;

    const SAVE_BUTTON = $('#save_button');
    const ADD_BUTTON = $('#add_button');
    const GENERATE_BUTTON = $('#generate_button');
    const NEXT_BUTTON = $('#next_button');
    const TO_FIRST_BUTTON = $('.to_first');

    ADD_BUTTON.on('click', Page.changeToAddAccount);
    GENERATE_BUTTON.on('click', Page.changeToGeneratePrivateKey);
    NEXT_BUTTON.on('click', Page.changeToAddAccount);
    TO_FIRST_BUTTON.on('click', Page.changeToFirst);

    SAVE_BUTTON.on('click', function () {
        const privateKey = $('#add_pk_input').val();
        const password = $('#add_password_input').val();
        const confirm_password = $('#add_repeat_password_input').val();

        const pkWithout0x = ((privateKey.substr(0, Math.min(2, privateKey.length)) === '0x') ? privateKey.substr(2, privateKey.length) : privateKey);

        if (Validator.isNullOrEmpty(pkWithout0x)) {
            toastr.error(Strings.PRIVATE_KEY_REQUIRED);
        }
        else if (Validator.isNullOrEmpty(password)) {
            toastr.error(Strings.PASSWORD_REQUIRED);
        }
        else if (Validator.isNullOrEmpty(confirm_password)) {
            toastr.error(Strings.CONFIRM_PASSWORD_REQUIRED);
        }
        else if (password !== confirm_password) {
            toastr.error(Strings.PASSWORDS_DO_NOT_MATCH);
        }
        else if (!Validator.isValidPrivateKey(pkWithout0x)) {
            toastr.error(Strings.INVALID_PRIVATE_KEY);
        }
        else if (Validator.isExistWallet()) {
            toastr.error(Strings.WALLET_ALREADY_EXIST);
        }
        else {
            SAVE_BUTTON.startLoading();
            setTimeout(
                function () {
                    const pk = ethereumjs.Buffer.Buffer(pkWithout0x, 'hex');
                    const wallet = ethereumjs.Wallet.fromPrivateKey(pk).toV3(password);
                    localStorage.setItem(Values.Ethereum.getWalletName(), JSON.stringify(wallet));
                    toastr.info(Strings.WALLET_SAVED);
                    SAVE_BUTTON.stopLoading(true);
                    Page.changeToDashboard();
                },
                1000
            );
        }
    });

    /*
     * Dashboard
     */
    const SHOW_DEPOSIT_BUTTON = $('#show_deposit_button');
    const SEND_BUTTON = $('#send_button');
    const SEND_DROPDOWN_ITEM = $('.send_dropdown_item');
    const LOGOUT_BUTTON = $('#logout');

    SEND_DROPDOWN_ITEM.on('click', function () {
        const passwordInput = $('#send_password_input');
        const address = $('#send_address_input').val();
        const amount = $('#send_amount_input').val();
        const password = passwordInput.val();

        if (Validator.isNullOrEmpty(address)) {
            toastr.error(Strings.ADDRESS_REQUIRED);
        }
        else if (Validator.isNullOrEmpty(amount)) {
            toastr.error(Strings.AMOUNT_REQUIRED);
        }
        else if (Validator.isNullOrEmpty(password)) {
            toastr.error(Strings.PASSWORD_REQUIRED);
        }
        else if (!ethereumjs.Util.isValidAddress(address)) {
            toastr.error(Strings.INVALID_ADDRESS);
        }
        else if (!Validator.isValidAmount(amount)) {
            toastr.error(Strings.INVALID_AMOUNT_VALUE);
        }
        else {
            SEND_BUTTON.startLoading();
            passwordInput.val('');

            let cb = function(error, hash) {
                if (!error) {
                    toastr.info(Strings.USO_SUCCESS_SENT);
                    Clear.clearSend();
                }
                else {
                    toastr.error(error);
                }
                SEND_BUTTON.stopLoading();

            };

            const itemId = $(this).attr('id');
            setTimeout(
                function () {
                    switch (itemId) {
                        case 'uso_send':
                            Wallet.usoSend(
                                password,
                                address,
                                amount,
                                cb
                            );
                            break;
                        case 'eth_send':
                            Wallet.ethSend(
                                password,
                                address,
                                amount,
                                cb
                            );
                            break;
                        default:
                            SEND_BUTTON.stopLoading(true);
                            toastr.error(Strings.COMMON_ERROR);
                            Clear.clearSend();
                    }
                },
                2000
            );
        }
    });

    SHOW_DEPOSIT_BUTTON.on('click', function () {
        const passwordInput = $('#deposit_password_input');
        const password = passwordInput.val();

        if (Validator.isNullOrEmpty(password)) {
            toastr.error(Strings.PASSWORD_REQUIRED);
        }
        else {
            SHOW_DEPOSIT_BUTTON.startLoading();
            passwordInput.val('');
            setTimeout(
                function () {
                    Wallet.getChecksumAddress(
                        password,
                        function (error, address) {
                            if (!error) {
                                $('#deposit_input_div').setHide();
                                $('#deposit_info_div').setShow();
                                $("#qr_address").qrcode({width: 160, height: 160, text: address});
                                $("#text_address").text(address);
                            }
                            else {
                                toastr.error(error);
                            }
                            SHOW_DEPOSIT_BUTTON.stopLoading();

                        }
                    )
                },
                2000
            );
        }
    });

    LOGOUT_BUTTON.on('click', Page.changeToFirst);

    $(".loader").delay(1500).fadeOut();
});
