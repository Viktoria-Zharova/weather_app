import React from 'react';

interface ButtonProps {
    onClick: () => void;
}

const ButtonComponent: React.FC<ButtonProps> = ({ onClick }) => {
    return (
        <button onClick={onClick} className="button">Search</button>
    );
};

export default ButtonComponent;
