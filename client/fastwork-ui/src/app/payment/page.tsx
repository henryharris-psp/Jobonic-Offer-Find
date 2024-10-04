'use client'
import React from "react";
import axios from "axios";

const Payment = () => {
    const data = {
        id: "6fc1bf31-97ab-47ef-bd12-e45aa5cc59f2",
        apiSecret: "jj9QMGrIsGSQTxTvhPNT5yoUXQY4eLDbrzGDU8o3gMU=",
        amount: 5000
    };

    const openNewWindow = (payniUrl: string) => {
        const url = payniUrl;
        const windowName = "_blank";
        const windowFeatures = "width=800,height=600,scrollbars=yes,resizable=yes";

        const newWindow = window.open(url, windowName, windowFeatures);
        if (newWindow) newWindow.opener = window;
    };

    const paymentWithPayni = async () => {
        // (use to accept payment)
        const response = await axios.post(
            "https://api-payni.laconic.co.th/api/external/generate-redirect-url",
            data
        );

        // (use to payout)
        // const response = await axios.post(
        //     "https://api-payni.laconic.co.th/api/external/payout/generate-payout-redirect-url",
        //     data
        // );

        const transId = await response.data.transId; // (you need to use this transId to verify your transaction)

        console.log(transId);
        openNewWindow(response.data.url);
    };

    return (
        <div className="flex items-center justify-center w-screen h-screen">
            <button
                className="rounded-xl h-12 px-4 text-white bg-sky-500"
                onClick={paymentWithPayni}
            >
                Pay with PayNi
            </button>
        </div>
    );
};

export default Payment;
