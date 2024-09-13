import React from 'react';

interface MarqueeProps {
    text: string;
}

const Marquee: React.FC<MarqueeProps> = ({ text }) => {
    return (
        <div className="relative overflow-hidden whitespace-nowrap w-full">
            <div
                className="inline-block whitespace-nowrap animate-marquee"
                style={{
                    animation: 'marquee 5s linear infinite',
                }}
            >
                {text}
            </div>
        </div>
    );
};

export default Marquee;
