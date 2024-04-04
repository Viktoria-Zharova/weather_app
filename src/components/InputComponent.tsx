import React from "react";
interface InputProps {
    value: string;
    onChange: (value: string) => void;
}

const InputComponent: React.FC<InputProps> = ({ value, onChange }) => {
    return (
        <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Enter city name"
            className="input"
        />
    );
};

export default InputComponent;
