import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import Link from "next/link";
import { unAuthenticate } from "@/store/reducers/authReducer";
import Image from "next/image";

const AuthUserAvatarDropDown = () => {
    const { authUser } = useSelector( (state: RootState) => state.auth );
    const [isHover, setIsHover] = useState(false);
    const dispatch = useDispatch();

    const handleLogOut = () => {
        dispatch(unAuthenticate());
        localStorage.clear();
        window.location.href = '/';
    }

    return (
        <div
            className="relative"
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
        >
            <button className="flex items-center space-x-1 text-black rounded">
                <Image
                    height={40}
                    width={40}
                    src="/group-image.jpg"
                    alt="User Avatar"
                    className="rounded-full border border-white"
                />
            </button>
            {isHover && (
                <ul className="text-black absolute right-0 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-10">
                    <li className="px-4 py-3 text-sm hover:bg-gray-100 hover:rounded-t-md cursor-pointer">
                        <label htmlFor="">{authUser?.email}</label>
                    </li>
                    <hr />
                    <li className="px-4 py-3 text-sm hover:bg-gray-100 hover:rounded-t-md cusor-pointer">
                        <Link href="/myDashboard">My Dashboard</Link>
                    </li>
                    <li className="px-4 py-3 text-sm hover:bg-gray-100 text-black cursor-pointer">
                        <Link href="/myProfile">My Profile</Link>
                    </li>
                    <li className="px-4 py-3 text-sm hover:bg-gray-100 text-black cursor-pointer">
                        <Link href="/myRewardsEmployer">My Rewards</Link>
                    </li>
                    <li
                        className="px-4 py-3 text-sm hover:bg-gray-100 hover:rounded-b-md cursor-pointer"
                        onClick={handleLogOut}
                    >
                        Sign Out
                    </li>
                </ul>
            )}
        </div>
    );
};

export default AuthUserAvatarDropDown;