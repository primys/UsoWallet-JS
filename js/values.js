;(function(globalObject) {
    'use strict';

    const Values = {
        Pages: {
            FIRST: 'First',
            GENERATE: 'Generate a new',
            ADD: 'Add account',
            DASHBOARD: 'Dashboard'
        },
        Strings: {
            ADDRESS_REQUIRED: 'Address required',
            AMOUNT_REQUIRED: 'Amount required',
            INVALID_AMOUNT_VALUE: 'Invalid amount value',
            PRIVATE_KEY_REQUIRED: 'Private key required',
            PASSWORD_REQUIRED: 'Password required',
            CONFIRM_PASSWORD_REQUIRED: 'Confirm password required',
            PASSWORDS_DO_NOT_MATCH: 'Passwords do not match',
            WALLET_SAVED: 'Wallet saved',
            WALLET_ALREADY_EXIST: 'Wallet already exist',
            USO_SUCCESS_SENT: 'A transfer request is sent',
            ETH_SUCCESS_SENT: 'Ethereum transfer is completed',
            INVALID_PRIVATE_KEY: 'Invalid private key',
            INVALID_ADDRESS: 'Invalid address',
            GENERATING_PRIVATE_KEY: 'Generating private key. Please wait...',
            COMMON_ERROR: 'Error',
            MAX_USO_TX_LIMIT_EXCEEDED: 'Max USO tx limit exceeded',
        },
        Ethereum: {
            getNode: function() {
                return 'http://159.89.10.159:8545';
            },
            getContractAddress: function() {
                return '0x6A7a3e04de8CAc3005B05f25d710F1436b66638d';
            },
            getContractAbi: function() {
                return '[{"constant":true,"inputs":[],"name":"frozen","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_value","type":"uint256"}],"name":"approve","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"ideaId","type":"uint256"},{"name":"status","type":"uint256"}],"name":"setIdeaStatus","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"description","type":"string"}],"name":"addIdea","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"id","type":"uint256"},{"name":"comment","type":"string"}],"name":"againstIdea","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"newOwner","type":"address"}],"name":"setOwner","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"id","type":"uint256"},{"name":"comment","type":"string"}],"name":"abstainIdea","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"id","type":"uint256"},{"name":"comment","type":"string"}],"name":"supportIdea","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"coinSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_value","type":"uint256"}],"name":"burn","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"ideaId","type":"uint256"}],"name":"getIdea","outputs":[{"name":"exist","type":"bool"},{"name":"idOfIdea","type":"uint256"},{"name":"author","type":"address"},{"name":"description","type":"string"},{"name":"idOfStatus","type":"uint256"},{"name":"timestamp","type":"uint256"},{"name":"numberOfSupporters","type":"uint256"},{"name":"numberOfAbstained","type":"uint256"},{"name":"numberOfVotedAgainst","type":"uint256"},{"name":"numberOfParticipants","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"ideaId","type":"uint256"},{"name":"voteId","type":"uint256"}],"name":"getVote","outputs":[{"name":"exist","type":"bool"},{"name":"idOfIdea","type":"uint256"},{"name":"idOfVote","type":"uint256"},{"name":"voter","type":"address"},{"name":"idOfType","type":"uint256"},{"name":"comment","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"contractFrozen","type":"bool"}],"name":"setFronzen","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"version","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"balanceOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_value","type":"uint256"}],"name":"burnFrom","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transfer","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_value","type":"uint256"},{"name":"_extraData","type":"bytes"}],"name":"approveAndCall","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"},{"name":"","type":"address"}],"name":"allowance","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Burn","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"author","type":"address"},{"indexed":false,"name":"description","type":"string"},{"indexed":false,"name":"ideaId","type":"uint256"}],"name":"AddIdea","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"voter","type":"address"},{"indexed":false,"name":"voteId","type":"uint256"},{"indexed":false,"name":"ideaId","type":"uint256"},{"indexed":false,"name":"typeId","type":"uint256"},{"indexed":false,"name":"comment","type":"string"}],"name":"VoteForIdea","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"ideaId","type":"uint256"},{"indexed":false,"name":"status","type":"uint256"}],"name":"SetIdeaStatus","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"contractFrozen","type":"bool"}],"name":"SetFrozen","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"newOwner","type":"address"}],"name":"SetOwner","type":"event"}]';
            },
            getWalletName: function () {
                return 'wallet';
            },
            getGasPrice: function () {
                return '0x4a817c800';
            },
            getExtraGasLimit: function () {
                return 100000;
            },
            getMaxUsoTxLimit: function () {
                return 5000000000000;
            }
        }
    };

    globalObject.Values = Values;
})(window);