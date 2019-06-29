;(function(globalObject) {
    'use strict';

    const ETH_VALUES = globalObject.Values.Ethereum;
    const CONTRACT_ABI = ETH_VALUES.getContractAbi();
    const CONTRACT_ADDRESS = ETH_VALUES.getContractAddress();

    const web3 = new Web3(new Web3.providers.HttpProvider(ETH_VALUES.getNode()));
    const contract = web3.eth.contract(JSON.parse(CONTRACT_ABI)).at(CONTRACT_ADDRESS);

    const Wallet = {
        getAddress: function () {
            return '0x' + getWallet().address;
        },
        getChecksumAddress: function (password, cb) {
            try {
                const address = getWalletV3(password).getChecksumAddressString();
                cb(null, address);
            }
            catch (e) {
                cb(e.message);
            }
        },
        getEthBalance: function (cb) {
            web3.eth.getBalance(
                this.getAddress(),
                (error, balance) => {
                    if (!error) {
                        const ether = new Web3().fromWei(balance, 'ether');
                        cb(Convert.toBalance(ether));
                    }
                    else {
                        alert(error);
                    }

                }
            );
        },
        getHeight: function (cb) {
            web3.eth.getBlockNumber(
                (error, height) => {
                    if (!error) {
                        cb(height);
                    }
                    else {
                        alert(error);
                    }
                }
            );
        },
        getUsoBalance: function (cb) {
            contract.balanceOf.call(
                this.getAddress(),
                (error, balance) => {
                    if (!error) {
                        const coins = Convert.toCoin(balance);
                        cb(Convert.toBalance(coins));
                    }
                    else {
                        alert(error);
                    }
                }
            );
        },
        getSupply: function (cb) {
            contract.totalSupply.call(
                (error, supply) => {
                    if (!error) {
                        cb(Convert.toMillion(supply));
                    }
                    else {
                        alert(error);
                    }
                }
            );
        },
        usoSend: function (password, to, value, cb) {
            const sat = Convert.toSatoshi(value);
            if(sat.isGreaterThan(ETH_VALUES.getMaxUsoTxLimit())) {
                cb(globalObject.Values.Strings.MAX_USO_TX_LIMIT_EXCEEDED);
            }
            else {
                const data = contract.transfer.getData(to, sat.toString());
                sendEthTransaction(
                    password,
                    CONTRACT_ADDRESS,
                    0,
                    data,
                    cb
                );
            }
        },
        ethSend: function (password, to, value, cb) {
            const wei = web3.toWei(value, 'ether');
            sendEthTransaction(
                password,
                to,
                web3.toHex(wei),
                null,
                cb
            )
        }
    };

    function getWallet() {
        return JSON.parse(localStorage.getItem(ETH_VALUES.getWalletName()));
    }

    function getWalletV3(password) {
        return ethereumjs.Wallet.fromV3(getWallet(), password);
    }

    function sendEthTransaction(password, to, value, data, cb) {
        try {
            data = data || '';
            const walletV3 = getWalletV3(password);
            const pk = walletV3.getPrivateKey();
            const nonce = web3.eth.getTransactionCount(walletV3.getChecksumAddressString());
            const estimateGas = web3.eth.estimateGas({
                to: to,
                data: data
            });
            const gasLimit = parseInt(estimateGas) + parseInt(ETH_VALUES.getExtraGasLimit());

            const rawTx = {
                nonce: nonce,
                gasPrice: ETH_VALUES.getGasPrice(),
                gasLimit: gasLimit,
                to: to,
                value: value,
                data: data
            };

            const tx = new ethereumjs.Tx(rawTx);
            tx.sign(pk);

            const serializedTx = tx.serialize();

            web3.eth.sendRawTransaction('0x' + serializedTx.toString('hex'), function (error, hash) {
                cb(error, hash);
            });
        }
        catch (e) {
            cb(e.message || 'Error');
        }
    }

    globalObject.Wallet = Wallet;
})(window);


