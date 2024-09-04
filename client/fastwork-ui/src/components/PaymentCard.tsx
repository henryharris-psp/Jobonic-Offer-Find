import React, { ChangeEvent, useState } from "react";
import Button from "./Button";
import { CheckCircleIcon } from "@heroicons/react/24/solid";

const PaymentCard = () => {
    const [inputs, setInputs] = useState({
        amount: '',
        description: ''
    });

    const [isLoading, setIsLoading] = useState(false);

    const [isPaid, setIsPaid] = useState(false);
    
    //methods
        const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
            const { name, value } = e.target;
            setInputs(prev => ({
                ...prev,
                [name]: value
            }));
        }

        const submit = () => {
            setIsLoading(true);
            setTimeout(() => {
                setIsLoading(false)
                setIsPaid(true)
            }, 2000);
        }

    return (
        <div className="flex flex-col bg-white rounded-xl">
            <div className="flex flex-col p-5 space-y-3">

                <div className="flex justify-center items-center space-x-2">
                    { isPaid ? (
                        <CheckCircleIcon className="size-9 text-green-500"/>
                    ) : ''}
                    <span className="font-bold text-xl">
                        {isPaid ? 'Payment Successful' : 'Please make a payment'}
                    </span>
                </div>
                <div className="flex flex-col space-y-1">
                    <span>
                        Amount to pay
                    </span>
                    <input
                        type="number"
                        step={2}
                        placeholder="Price"
                        name="amount"
                        value={inputs.amount}
                        onChange={handleInputChange}
                        className="border border-gray-300 rounded-lg h-12 w-96 disabled:opacity-30"

                    />

                </div>

                <div className="flex flex-col">
                    <span>
                        Description
                    </span>
                    <textarea
                        placeholder="Write Description"
                        name="description"
                        value={inputs.description}
                        onChange={handleInputChange}
                        className="border h-32 border-gray-300 p-2 rounded-lg w-96"
                    />
                </div>

                    <Button
                        title={ isLoading ? 'Payment Processing...' : 'Pay Now'}
                        onClick={submit}
                        disabled={isLoading || isPaid}
                    />
            </div>
        </div>
    );
};

export default PaymentCard;
