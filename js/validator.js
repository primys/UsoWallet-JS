;(function(globalObject) {
    'use strict';

    const Validator = {
        isValidPrivateKey: function (privateKey) {
            //TODO: Add regex check
            if(privateKey.length !== 64) {
                return false;
            }
            try {
                const pk = ethereumjs.Buffer.Buffer(privateKey, 'hex');
                return ethereumjs.Util.isValidPrivate(pk);
            }
            catch (e) {
                return false;
            }
        },
        isValidAmount: function (amount) {
            const pattern = /^\d+(\.\d{1,18})?$/;
            return pattern.test(amount);
        },
        isExistWallet: function () {
            return (localStorage.getItem(globalObject.Values.Ethereum.getWalletName()) !== null);
        },
        isNullOrEmpty: function (s) {
            try {
                return (s == null || s.length === 0 || !s.trim());
            }
            catch (e) {
                return false;
            }
        }
    };

    globalObject.Validator = Validator;
})(window);