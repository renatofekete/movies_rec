import React, { useEffect } from "react";

type RatingProps = {
    myRating: number;
    max: number;
    handleRating: (value: number) => void;
};

const Rating = ({ myRating = 0, max = 10, handleRating }: RatingProps) => {
    const [rating, setRating] = React.useState(myRating);
    const [temporaryRating, setTemporaryRating] = React.useState(rating);
    const icon = "★";

    useEffect(() => {
        setRating(myRating);
        setTemporaryRating(myRating);
    }, [myRating]);

    function handleClick(value: number) {
        setRating(value);
        handleRating(value);
    }

    const stars = Array.from({ length: max }, (_, index) => {
        const value = index + 1;
        return (
            <span
                onClick={() => handleClick(value)}
                onMouseEnter={() => setTemporaryRating(value)}
                onMouseLeave={() => setTemporaryRating(rating)}
                key={value}
                style={{
                    color: value <= temporaryRating ? "#faaf00" : "gray",
                    fontSize: "2rem",
                    cursor: "pointer",
                }}
            >
                {icon}
            </span>
        );
    });
    return (
        <div>
            <p>temp: {temporaryRating}</p>
            <p>rating: {rating}</p>
            {stars}
        </div>
    );
};

export default Rating;
