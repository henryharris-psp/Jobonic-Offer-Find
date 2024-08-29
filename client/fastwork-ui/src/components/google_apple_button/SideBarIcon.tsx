import React from 'react';

type SideBarIconProps = {
    icon: React.ReactElement;
    onClick?: () => void;
};

const  SideBarIcon: React.FC<SideBarIconProps> = ({ icon,onClick }) => {
    return (
        <div className="sidebar-icon bg-black p-1 rounded-3xl" onClick={onClick}>
            {icon}
        </div>
    );
};

export default SideBarIcon;