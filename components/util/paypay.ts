"use strict";

import { v4 as uuidv4 } from "uuid";

export const createQR = async () => {
    const PAYPAY = require("@paypayopa/paypayopa-sdk-node");
    PAYPAY.Configure({
        clientId: "a_fsmZNYh3RH_4HJR",
        clientSecret: "wqU67SfaxjaILeEuJtpcrWzONLSB23Re9r7Vjhd6VPE=",
        merchantId: "720008245077803008",
        productionMode: false,
    });

    const merchandId = uuidv4();

    let payload = {
        merchantPaymentId: merchandId,
        amount: {
            amount: 1,
            currency: "JPY",
        },
        codeType: "ORDER_QR",
        orderDescription: "Mune's Favourite Cake",
        isAuthorization: false,
        redirectUrl: "https://paypay.ne.jp/",
        redirectType: "WEB_LINK",
        userAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 10_3 like Mac OS X) AppleWebKit/602.1.50 (KHTML, like Gecko) CriOS/56.0.2924.75 Mobile/14E5239e Safari/602.1",
    };
    // Calling the method to create a qr code
    PAYPAY.QRCodeCreate(payload, (response: any) => {
        // Printing if the method call was SUCCESS
        console.log(response.BODY.resultInfo.code);
    });
};
