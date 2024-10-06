'use client'
import React, { useRef, useState } from "react";
import axios from "axios";
import httpClient from "@/client/httpClient";
import moment from "moment";
import SearchInput from "@/components/SearchInput";

const PaymentVerification = () => {
    const openNewWindow = (payniUrl: string): void => {
        if (typeof window !== 'undefined') {
            const windowName = "_blank";
            const windowFeatures = "width=800,height=600,scrollbars=yes,resizable=yes";
            const newWindow = window.open(payniUrl, windowName, windowFeatures);
            if (newWindow) newWindow.opener = window;
        }
    };
      
    const pay = async () => {
        try {
            const res = await httpClient.post('payment', {
                paymentMethod: 'payni',
                amount: 34.22,
                paymentDate: moment().format('YYYY-MM-DD'),//today
                payableType: 'CONTRACT',
                payableId: '40cec510-655d-471f-96ef-60ca18b5bdf5',
                remarks: 'testing',
                senderId: 2,
                receiverId: 1
            });
    
            const { paymentId, payni } = res.data.body;
            const jsonString = payni.toString();
            const data = JSON.parse(jsonString);
            const url = data.url;
    
            console.log('paymentId', paymentId);
            console.log('payni', payni);
            console.log('url', url);

            openNewWindow(url);

        } catch (error) {
            console.log(error);
        }
    }

    const [result, setResult] = useState('');


    const convertToGUID = (keyword) => {
        if(!keyword) return '';

        console.log(keyword);

        if (keyword.length !== 32) {
          throw new Error("Input must be a 32-character keywordadecimal string.");
        }
        
        const gg= `${keyword.substring(0, 8)}-${keyword.substring(8, 12)}-${keyword.substring(12, 16)}-${keyword.substring(16, 20)}-${keyword.substring(20)}`;

        setResult(gg);
      }
      

    return (
        <div className="flex items-center justify-center w-screen h-screen">
            <button
                className="rounded-xl h-12 px-4 text-white bg-green-400"
                onClick={pay}
            >
                Pay
            </button>
            
            <input type="text" value={result} />
            <div className="flex justify-center w-screen h-screen">
                <SearchInput
                    isSearching={false}
                    onAiSearch={(keyword) => convertToGUID(keyword)}
                    onNormalSearch={(keyword) => console.log('normal', keyword)}
                />
            </div>
        </div>
    );
};

export default PaymentVerification;
