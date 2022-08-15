import React from 'react';

const SubmitButton:React.FC<IInputProps> = ({disable, type, className, value}) =>  (
    <input
        className={className}
        type={type}
        value={value}
        disabled={disable}
    />
);

export default SubmitButton;

export interface IInputProps {
    disable: boolean
    type: string
    className: string
    value: string
}