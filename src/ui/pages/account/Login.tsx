import { useState } from 'react';
import { ActionProps } from './Account';

const Login = (props: ActionProps) => {

    props.changeHeading("Sign up")

    const [inputValue, setInputValue] = useState("")

    const typingInputValue = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;

        // Check if the input is a valid number or the backspace key
        if (!isNaN(Number(newValue)) || newValue === "") {
            // Check if there are already 10 numbers
            const currentNumbers = newValue.replace(/[^0-9]/g, '');
            if (currentNumbers.length <= 10) {
                setInputValue(newValue);
            }
        }
    };

    return (
        <div className="flex flex-col gap-2">
            <div className="flex flex-col gap-8">
                <div className="flex flex-col">
                    <span className="uppercase text-xs">Phone Number</span>
                    <div className="flex gap-1 pt-2 pb-3 border-b dark:border-b-zinc-700">
                        <span>+91</span>
                        <span>-</span>
                        <input onChange={typingInputValue} className="bg-transparent outline-none grow text-zinc-950 dark:text-zinc-300" type="tel" name="mobileNumber" id="mobileNumber" autoComplete="on" value={inputValue} />
                    </div>
                </div>
                <button className="p-4 font-bold text-[14px] leading-none uppercase bg-primary text-white">Login</button>
            </div>
            <span className="block text-xs">By clicking, I accept the <b>Terms & Conditions</b> & <b>Privacy Policy</b></span>
        </div>
    )
}

export default Login