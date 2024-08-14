import React from 'react';
import MyGoogleLoginButton from "@/app/button/MyGoogleLoginButton";

interface AppleButtonProps {
    onClick?: () => void;
}

const MyAppleLoginButton: React.FC<AppleButtonProps> = ({onClick}) =>{

    return (
        <button
            onClick={onClick}
            className="flex items-center justify-center w-full px-4 text-black bg-[#FFFFFF] rounded-xl shadow-lg transition duration-150 ease-in-out focus:outline-none focus:ring-4 focus:ring-[#0C2348]/50"
        >
            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="48" height="48" viewBox="8 0 75 65">
                <path
                    d="M54.166,19.783c-0.258,0.162-6.401,3.571-6.401,11.13c0.29,8.621,7.752,11.644,7.88,11.644	c-0.128,0.162-1.127,4.119-4.085,8.267C49.213,54.398,46.607,58,42.65,58c-3.764,0-5.115-2.381-9.458-2.381	c-4.664,0-5.984,2.381-9.555,2.381c-3.957,0-6.756-3.795-9.232-7.335c-3.216-4.633-5.95-11.903-6.047-18.883	c-0.065-3.699,0.644-7.335,2.444-10.423c2.541-4.312,7.077-7.238,12.031-7.335c3.795-0.128,7.173,2.606,9.49,2.606	c2.22,0,6.37-2.606,11.065-2.606C45.415,14.026,50.82,14.636,54.166,19.783z M32.002,13.285c-0.676-3.378,1.19-6.756,2.927-8.911	C37.149,1.769,40.655,0,43.678,0c0.193,3.378-1.03,6.691-3.216,9.104C38.5,11.71,35.122,13.671,32.002,13.285z"></path>
            </svg>
            <b>Sign In With Apple</b>
        </button>
    );
};

export default MyAppleLoginButton;