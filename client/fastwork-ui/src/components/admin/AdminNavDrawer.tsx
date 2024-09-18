import React from "react";
import { ChatBubbleLeftRightIcon, PresentationChartLineIcon, PuzzlePieceIcon, RectangleGroupIcon, SparklesIcon } from '@heroicons/react/24/solid';
import Link from "next/link";
import { v4 as uuid } from "uuid";
import { usePathname } from "next/navigation";

const adminRoutes = [
    {
        id: uuid(),
        path: "/admin",
        name: "Dashboard",
        icon: <PresentationChartLineIcon className="size-5" />
    },
    {
        id: uuid(),
        path: "/admin/category",
        name: "Category Management",
        icon: <RectangleGroupIcon className="size-5" />
    },
    {
        id: uuid(),
        path: "/admin/skill",
        name: "Skill Management",
        icon: <PuzzlePieceIcon className="size-5" />
    },
    {
        id: uuid(),
        path: "/admin/chat",
        name: "Customer Support",
        icon: <ChatBubbleLeftRightIcon className="size-5" />
    },
]

const AdminNavDrawer = () => {
    const currentPath = usePathname();

    return (
        <div className="flex flex-col w-64 bg-gray-800">
            <div className="h-16 flex items-center justify-center shadow border-b border-b-gray-900">
                <h2 className="text-xl font-bold text-gray-200">Admin Panel</h2>
            </div>

            <div className="flex-1 overflow-auto">
                <div className="flex flex-col text-gray-200">
                    { adminRoutes.map( route => 
                        <Link 
                            key={route.id}
                            href={route.path} 
                            className={`flex items-center space-x-3 p-4 hover:bg-gray-600 cursor-pointer ${
                                currentPath === route.path ? 'bg-gray-700' : ''
                            }`}
                        >
                            { route.icon }
                            <span className="block">{route.name}</span>
                        </Link>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdminNavDrawer;
