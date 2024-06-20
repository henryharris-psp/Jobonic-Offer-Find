import React from "react";
import Image from "next/image";

export default function PrivilegesPage() {
    return (
        <>
            <div className="p-16 bg-blue-600 text-white flex flex-col items-center justify-center">
                <h1 className="text-3xl font-bold mb-1">Promotion 1 Details</h1>
            </div>
            <div className="m-16 p-8 shadow bg-white flex flex-col justify-center rounded-md">
                <h1 className="text-xl font-bold mb-4">Benefits</h1>
                <h2 className="mb-4">1. 20% discount on all services</h2>
                <h2 className="mb-4">2. Free 1-month subscription</h2>
            </div>
            <div className="m-16 p-8 shadow bg-white flex flex-col justify-center rounded-md">
                <h1 className="text-xl font-bold mb-4">Redemption Steps</h1>
                <h2 className="mb-4">1. Click on the &quot;Redeem&quot; button below</h2>
                <h2 className="mb-4">2. Fill in the required details</h2>
                <h2 className="mb-4">3. Click on the &quot;Submit&quot; button</h2>
            </div>
            <div className="m-16 p-8 shadow bg-white flex flex-col justify-center rounded-md">
                <h1 className="text-xl font-bold mb-4">Terms and Conditions</h1>
                <h2 className="mb-4">1. This promotion is only valid for new users</h2>
                <h2 className="mb-4">2. This promotion is only valid for Mastercard users</h2>
            </div>
        </>
    );
}
