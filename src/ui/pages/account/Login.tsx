import React, { useState, useEffect } from 'react';
import { ActionProps } from './Account';

const Login = (props: ActionProps) => {

    useEffect(() => {
        // Define other action
        props.setOtherAction("Sign up")
        // Define the other action heading
        props.setOtherActionHeading("or create an account");
    }, []);

    const [inputValue, setInputValue] = useState("");
    const [isShowingError, setIsShowingError] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>("")

    const typingInputValue = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;

        if (isShowingError) setIsShowingError(false)

        // Check if the input is a valid number or the backspace key
        if (!isNaN(Number(newValue)) || newValue === "") {
            // Check if there are already 10 numbers
            const currentNumbers = newValue.replace(/[^0-9]/g, '');
            if (currentNumbers.length <= 10) {
                setInputValue(newValue);
            }
        }
    };

    const loginHandler = () => {
        if (inputValue !== "") {
            if (inputValue === "1234567890") {
                props.setAction("Verify OTP")
            } else {
                setErrorMessage("Account not found for this number. Verify or create an account. ( Use 1234567890 )")
                setIsShowingError(true)
            }
        }
        else {
            setErrorMessage("Please enter phone number.")
            setIsShowingError(true)
        }
    }

    return (
        <div className="flex flex-col gap-2">
            <div className="flex flex-col gap-8">
                {isShowingError && <div className="bg-red-400 text-white pb-3 pt-2.5 px-4">{errorMessage}</div>}
                <div className="flex flex-col">
                    <label htmlFor='mobileNumber' className="uppercase text-xs">Phone Number</label>
                    <div className="flex gap-1 pt-2 pb-3 border-b dark:border-b-zinc-700">
                        <span>+91</span>
                        <span>-</span>
                        <input
                            onChange={typingInputValue}
                            className="bg-transparent outline-none grow text-zinc-950 dark:text-zinc-300"
                            type="tel"
                            name="mobileNumber"
                            id="mobileNumber"
                            autoComplete="on"
                            value={inputValue}
                        />
                    </div>
                </div>
                <button onClick={loginHandler} className="p-4 font-bold text-[14px] leading-none uppercase bg-primary text-white">Login</button>
            </div>
            <span className="block text-xs">By clicking, I accept the <b>Terms & Conditions</b> & <b>Privacy Policy</b></span>
        </div>
    )
}

export default Login;