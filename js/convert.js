;(function(globalObject) {
    'use strict';
    
    BigNumber.config({ROUNDING_MODE: BigNumber.ROUND_DOWN});

    const COIN_VALUE = 100000000;

    function Convert() { }

    Convert.toSatoshi = function (value) {
        return new BigNumber(value).times(COIN_VALUE);
    };

    Convert.toMillion = function (value) {
        return (new BigNumber(this.toCoin(value)).dividedBy(1e6).decimalPlaces(2)) + 'M';
    };

    Convert.toCoin = function (value) {
        return new BigNumber(value).dividedBy(COIN_VALUE);
    };

    Convert.toBalance = function (value) {
        if (!(value instanceof BigNumber)) {
            value = new BigNumber(value);
        }
        const integersCount = countIntegers(value);
        const decimalsCount = Math.floor(8 / integersCount) - 1;
        //https://stackoverflow.com/questions/18719775/parsing-and-converting-exponential-values-to-decimal-in-javascript
        const data = value.decimalPlaces(Math.min(decimalsCount, 4)).toString().split(/[eE]/);

        if (data.length === 1) return data[0];

        let z = '',
            sign = this < 0 ? '-' : '',
            str = data[0].replace('.', ''),
            mag = Number(data[1]) + 1;

        if (mag < 0) {
            z = sign + '0.';
            while (mag++) z += '0';
            return z + str.replace(/^\-/, '');
        }
        mag -= str.length;
        while (mag--) z += '0';
        return str + z;
    };

    function countIntegers(value) {
        //Based on https://stackoverflow.com/questions/17369098/simplest-way-of-getting-the-number-of-decimals-in-a-number-in-javascript
        return value.toString().split(".")[0].length || 0;
    }

    globalObject.Convert = Convert;
})(window);