'use client'
import React, { useRef, useState } from "react";
import axios from "axios";
import httpClient from "@/client/httpClient";
import moment from "moment";
import SearchInput from "@/components/SearchInput";
import { supabase } from "@/config/supabaseClient";

const Payment = () => {
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
          throw new Error("input must be a 32-character string.");
        }
        
        const gg= `${keyword.substring(0, 8)}-${keyword.substring(8, 12)}-${keyword.substring(12, 16)}-${keyword.substring(16, 20)}-${keyword.substring(20)}`;

        setResult(gg);
      }


    const deleteAllPayment = async () => {
        try{
            const allRes = await httpClient.get('payment/get-all-payment');
            const all = allRes.data;
            const allPaymentIds = all.map( payment => payment.id );

            for(const paymentId of allPaymentIds){
                const res = httpClient.delete(`payment/delete/${paymentId}`);
                console.log('deleted', paymentId);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const idRef = useRef(null);
    const statusRef = useRef(null);

    const changeChatRoomStatus = async () => {
        const chatRoomId = idRef?.current.value;
        const status = statusRef?.current.value;

        const { data, error } = await supabase
            .from("chat_rooms")
            .update({ status })
            .eq("id", chatRoomId)
            .select(`*, messages (*)`)
    }
      
    const testAiServer = async () => {
        try {
            const aiUrl = process.env.NEXT_PUBLIC_AI_SERVER_URL;
            console.log(aiUrl);
            if(aiUrl) {
                const res = await axios.get(aiUrl);
                console.log(res.data);
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="flex flex-col space-y-3 items-center justify-center w-screen h-screen">
            <button
                className="rounded-xl h-12 px-4 text-white bg-green-400"
                onClick={pay}
            >
                Pay
            </button>
            
            <input type="text" value={result} />
            <div className="flex justify-center">
                <SearchInput
                    isSearching={false}
                    onAiSearch={(keyword) => convertToGUID(keyword)}
                    onNormalSearch={(keyword) => console.log('normal', keyword)}
                />
            </div>
            <button
                className="rounded-xl h-12 px-4 text-white bg-rose-500"
                onClick={deleteAllPayment}
            >
                Delete all payment
            </button>
            
            <div>
                <input 
                    ref={idRef}
                    type="text"
                    placeholder="id"
                />

                <input 
                    ref={statusRef}
                    type="text"
                    placeholder="status"
                />

                <button 
                    className="p-4 bg-cyan-400"
                    onClick={changeChatRoomStatus}    
                >
                    Submit
                </button>
            </div>

            <button
                className="bg-cyan-500 p-3"
                onClick={testAiServer}
            >
                Test AI server
            </button>
        </div>
    );
};

export default Payment;
