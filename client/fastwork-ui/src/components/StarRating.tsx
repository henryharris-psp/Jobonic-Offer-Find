import { TailwindSizes } from "@/types/general";
import { useState } from "react";

interface StarRatingProps {
    size?: TailwindSizes;
    totalStars?: number;
    value?: number,
    onChange?: (starValue: number) => void
}
const StarRating = ({
    size = "",
    totalStars = 5,
    value = 0,
    onChange
}: StarRatingProps) => {
    const [hoverValue, setHoverValue] = useState<number | null>(null);

    const handleOnMouseEnter = (starValue: number) => {
        if(onChange){
            setHoverValue(starValue);
        }
    } 

    const handleOnMouseLeave = () => {
        if(onChange){
            setHoverValue(null);
        }
    } 

    const handleOnClick = (starValue: number) => {
        onChange?.(starValue);
    }

    return (
        <div className="flex space-x-1">
            {Array.from({ length: totalStars }, (_, index) => {
                const starValue = index + 1;

                return (
                    <button
                        key={index}
                        type="button"
                        className={`
                            ${
                                starValue <= (hoverValue || value)
                                ? "text-orange-400"
                                : "text-gray-300"
                            }
                            text-${size} 
                            ${ onChange ? 'cursor-pointer' : 'cursor-default' }
                        `}
                        onClick={() => handleOnClick(starValue)}
                        onMouseEnter={() => handleOnMouseEnter(starValue)}
                        onMouseLeave={() => handleOnMouseLeave()}
                    >
                        ★
                    </button>
                );
            })}
        </div>
    );
};

export default StarRating;
