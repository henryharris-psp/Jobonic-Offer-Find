'use client';

import React, { useState, useEffect } from "react";
import { Card } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function PrivilegesPage(): React.ReactNode {
    const [couponStorage, setCouponStorage] = useState({});
    const router = useRouter();
      
    useEffect(() => {
        const tabs = document.querySelectorAll('[role="tab"]') as NodeListOf<HTMLElement>;
        const tabPanels = document.querySelectorAll('[role="tabpanel"]') as NodeListOf<HTMLElement>;

        const handleTabClick = (event: Event) => {
            const tab = event.currentTarget as HTMLElement;

            tabs.forEach(t => {
                t.setAttribute('aria-selected', 'false');
                const targetSelector = t.getAttribute('data-tabs-target');
                if (targetSelector) {
                    const targetPanel = document.querySelector(targetSelector) as HTMLElement;
                    targetPanel.classList.add('hidden');
                }
            });

            tab.setAttribute('aria-selected', 'true');
            const targetSelector = tab.getAttribute('data-tabs-target');
            if (targetSelector) {
                const targetPanel = document.querySelector(targetSelector) as HTMLElement;
                targetPanel.classList.remove('hidden');
            }
        };

        tabs.forEach(tab => {
            tab.addEventListener('click', handleTabClick);
        });

        return () => {
            tabs.forEach(tab => {
                tab.removeEventListener('click', handleTabClick);
            });
        };
    }, []);
      
    return (
        <>
            <div className="p-16" style={{ backgroundColor: '#CFEDF4', color: 'black' }} >
                <h1 className="text-3xl font-bold mb-1">Special Privileges and Promotions</h1>
                <h2>From Jobonic and participating partners</h2>
            </div>
            <div className="m-16">
                <div className="text-black flex flex-col justify-center h-48">
                    <h1 className="text-3xl font-bold mb-1">Your discount coupon</h1>
                    <h2 className="mb-16">You can choose to use various coupons when hiring and paying.</h2>
                    {Object.keys(couponStorage).length === 0 ? (
                        <div className="mx-16 text-gray-400 flex flex-col items-center justify-center">
                            <svg className="w-6 h-6 text-gray-400 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M18.045 3.007 12.31 3a1.965 1.965 0 0 0-1.4.585l-7.33 7.394a2 2 0 0 0 0 2.805l6.573 6.631a1.957 1.957 0 0 0 1.4.585 1.965 1.965 0 0 0 1.4-.585l7.409-7.477A2 2 0 0 0 21 11.479v-5.5a2.972 2.972 0 0 0-2.955-2.972Zm-2.452 6.438a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z"/>
                            </svg>
                            <h2>You don't have a discount coupon yet.</h2>
                        </div>
                    ) : null}
                </div>
                <div className="text-black flex flex-col justify-center mt-16">
                    <h1 className="text-3xl font-bold mb-1">Interesting privileges</h1>
                    <h2 className="mb-4">Special privileges and discounts from partners</h2>

                    <ul className="w-1/2 hidden text-sm font-medium text-center text-gray-500 sm:flex"
                        id="default-tab" data-tabs-toggle="#default-tab-content" role="tablist">
                        <li className="w-1/2 focus-within:z-10" role="presentation">
                            <button id="employer-tab" data-tabs-target="#employer" type="button" role="tab" aria-controls="employer" aria-selected="true"
                                className="inline-block w-full p-4 text-gray-900 bg-gray-100 
                                border-r border-gray-200 dark:border-gray-700 
                                rounded-tl-lg focus:ring-4 focus:ring-blue-300 active focus:outline-none 
                                dark:bg-gray-700 dark:text-white" aria-current="page">For employers</button>
                        </li>
                        <li className="w-1/2 focus-within:z-10" role="presentation">
                            <button id="freelancer-tab" data-tabs-target="#freelancer" type="button" role="tab" aria-controls="freelancer" aria-selected="false"
                            className="inline-block w-full p-4 bg-white 
                            border-r border-gray-200 dark:border-gray-700 hover:text-gray-700 hover:bg-gray-50 
                            focus:ring-4 focus:ring-blue-300 focus:outline-none 
                            dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700 rounded-r-lg">For freelancers</button>
                        </li>
                    </ul>

                    <div id="default-tab-content">
                        <div className="bg-white border rounded-tl-none rounded-lg" id="employer" role="tabpanel" aria-labelledby="employer-tab">
                            <div className="card-wrapper flex justify-center h-48 space-x-4">
                                <Card className="flex justify-center cursor-pointer">
                                    <Link href="/promotionDetails">
                                        Promotion 1
                                    </Link>
                                </Card>
                                <Card className="flex justify-center cursor-pointer">
                                    <Link href="/">
                                        Promotion 1
                                    </Link>
                                </Card>
                                <Card className="flex justify-center cursor-pointer">
                                    <Link href="/">
                                        Promotion 1
                                    </Link>
                                </Card>
                            </div>
                        </div>
                        <div className="hidden bg-white border rounded-b-md" id="freelancer" role="tabpanel" aria-labelledby="freelancer-tab">
                            <div className="card-wrapper flex justify-center h-48 space-x-4">
                                <Card className="flex justify-center cursor-pointer">
                                    <Link href="/">
                                        Promotion 2
                                    </Link>
                                </Card>
                                <Card className="flex justify-center cursor-pointer">
                                    <Link href="/">
                                        Promotion 2
                                    </Link>
                                </Card>
                                <Card className="flex justify-center cursor-pointer">
                                    <Link href="/">
                                        Promotion 2
                                    </Link>
                                </Card>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
