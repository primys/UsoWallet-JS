;(function(globalObject) {
    'use strict';

    const HTML = $('html');
    const TITLE = $('title');

    const FIRST_PAGE = $('#first_page');
    const GENERATE_PK_PAGE = $('#generate_pk_page');
    const ADD_ACCOUNT_PAGE = $('#add_account_page');
    const DASHBOARD_PAGE = $('#dashboard_page');

    const NEXT_BUTTON = $('#next_button');
    const SAVE_BUTTON = $('#save_button');

    const DIV_DEPOSIT_INPUT = $('#deposit_input_div');
    const DIV_DEPOSIT_INFO = $('#deposit_info_div');

    const Strings = globalObject.Values.Strings;
    const Pages = globalObject.Values.Pages;

    let prevPage = null;
    let dsInterval = null;

    const Page = {
        changeToFirst: function () {
            setTitle(Pages.FIRST);
            changeTo(FIRST_PAGE);
        },
        changeToGeneratePrivateKey: function () {
            setTitle(Pages.GENERATE);
            changeTo(GENERATE_PK_PAGE);
        },
        changeToAddAccount: function () {
            setTitle(Pages.ADD);
            changeTo(ADD_ACCOUNT_PAGE);
        },
        changeToDashboard: function () {
            setTitle(Pages.DASHBOARD);
            changeTo(DASHBOARD_PAGE);
        }
    };

    function changeTo(page) {
        switch (prevPage) {
            case ADD_ACCOUNT_PAGE:
                Clear.clearAdd();
                break;
            case GENERATE_PK_PAGE:
                Clear.clearGenerate();
                NEXT_BUTTON.setHide();
                break;
            case DASHBOARD_PAGE:
                Clear.clearDashboard();
                DIV_DEPOSIT_INPUT.setShow();
                DIV_DEPOSIT_INFO.setHide();
                localStorage.removeItem(globalObject.Values.Ethereum.getWalletName());
                if(dsInterval != null) {
                    clearInterval(dsInterval);
                    dsInterval = null;
                }
                break;
        }

        switch (page) {
            case ADD_ACCOUNT_PAGE:
                SAVE_BUTTON.setEnabled();
                break;
            case GENERATE_PK_PAGE:
                generatePrivateKey();
                break;
            case DASHBOARD_PAGE:
                refreshSummaryValues();
                dsInterval = setInterval(refreshSummaryValues, 5000);
                break;
        }

        if (page === DASHBOARD_PAGE) {
            HTML.removeClass('login_page');
        }
        else {
            HTML.addClass('login_page');
        }
        page.setShow();
        if (prevPage != null) {
            prevPage.setHide();
        }
        prevPage = page;
    }

    function setTitle(title) {
        TITLE.text('Usoamic Wallet - ' + title);
    }

    function generatePrivateKey() {
        const GENERATE_PK_DIV = $('#generate_pk_div');
        GENERATE_PK_DIV.text(Strings.GENERATING_PRIVATE_KEY);
        setTimeout(
            function () {
                const privateKey = ethereumjs.Wallet.generate().getPrivateKeyString();
                GENERATE_PK_DIV.text(privateKey);
                NEXT_BUTTON.setShow();
            },
            1000
        );
    }

    function refreshSummaryValues() {
        Wallet.getEthBalance(
            (balance) => {
                $('#eth_balance').text(balance);
            }
        );
        Wallet.getUsoBalance(
            (balance) => {
                $('#uso_balance').text(balance);
            }
        );
        Wallet.getSupply(
            (supply) => {
                $('#uso_supply').text(supply);
            }
        );
        Wallet.getHeight(
            (height) => {
                $('#eth_height').text(height);
            }
        );
    }

    globalObject.Page = Page;
})(window);