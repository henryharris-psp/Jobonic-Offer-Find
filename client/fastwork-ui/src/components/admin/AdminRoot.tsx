'use client'
import React, { ReactNode } from 'react';
import AdminNavDrawer from './AdminNavDrawer';

interface AdminRootProps {
    children: ReactNode;
}

const AdminRoot = ({
    children
}: AdminRootProps) => {
    return (
        <div 
            className="flex w-screen" 
            style={{
                height: "91vh",
            }}
        >
            <div className="flex-1 flex flex-row">
                <AdminNavDrawer/>
                <div className="flex-1">
                    {children}
                </div>
            </div>
        </div>
  )
}

export default AdminRoot;