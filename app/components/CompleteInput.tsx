import React, { ChangeEvent, useState } from 'react';

interface InputTextProps {
    label: {
        className?: string;
        forInput?: string;
        name: string;
    }
    type: string;
    value: string;
    className?: string;
    placeholder?: string;
    onChange: (value: string) => void;
}

const InputText: React.FC<InputTextProps> = ({ 
    type = 'text',
    label, 
    value, 
    placeholder,
    onChange, 
    className = '' 
}) => {

    const [error , setError] = useState<string>('');

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const inputValue = event.target.value;

        // Check if the entered value is empty
        if (inputValue.length < 1) {
            setError(''); // Set emailError to an empty string when the input is empty
        } else {

            switch (type) {
                case 'email':
                    handleEmail(inputValue);
                    break;
                case 'password':
                    handlePassword(inputValue);
                    break;
                default:
                    break;
            }
        }

        // Call the onChange callback with the input value
        onChange(inputValue);
    };

    const handlePassword = ( input : string ) => {
        // make regex password 8 minimal character ,  1 uppercase, 1 lowercase, 1 number, 1 special character ( !@#$%^&*()_+-= ) ex : Viky2311@
        // const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+-=])[A-Za-z\d!@#$%^&*()_+-=]{8,}$/;


        // if ( !passwordRegex.test(input) ) {
        //     setError('Password must contain at least 8 characters, one uppercase, one lowercase and one number');
        // } else {
        //     setError('');
        // }

    }

    const handleEmail = ( input : string ) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if ( !emailRegex.test(input) ) {
            setError('Invalid email address');
        } else {
            setError('');
        }
    }

    return (
        <>
            <label className={"" + label.className}  htmlFor={label.forInput}>

                <div className="label">
                    <span className="label-text">{label.name}</span>
                    <span className="label-text-alt"></span>
                </div>

                <input 
                    type={type} 
                    value={value} 
                    onChange={handleInputChange} 
                    placeholder={placeholder}
                    autoComplete={type === 'password' ? 'current-password' : 'username'} 
                    className={'input input-bordered w-full ' + className } 
                />

                <div className="label">
                    <span className="label-text-alt text-red-500">{error}</span>
                    <span className="label-text-alt"></span>
                </div>

            </label>
           
        </>
    );
};

export default InputText;
