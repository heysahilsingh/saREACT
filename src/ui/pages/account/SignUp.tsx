import React, { useState, useEffect } from 'react';
import { ActionProps } from './Account';

const SignUp = (props: ActionProps) => {

    useEffect(() => {
        // Define other action
        props.setOtherAction("Login")
        // Define the other action heading
        props.setOtherActionHeading("or login to your account");
    }, [])

    const [isShowingError, setIsShowingError] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>("")

    const [numberInputValue, setNumberInputValue] = useState("")
    const [nameInputValue, setNameInputValue] = useState("")
    const [emailInputValue, setEmailInputValue] = useState("")

    const typingNumberValue = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;

        if (isShowingError) setIsShowingError(false)

        // Check if the input is a valid number or the backspace key
        if (!isNaN(Number(newValue)) || newValue === "") {
            // Check if there are already 10 numbers
            const currentNumbers = newValue.replace(/[^0-9]/g, '');
            if (currentNumbers.length <= 10) {
                setNumberInputValue(newValue);
            }
        }
    };

    const typingNameValue = (e: React.ChangeEvent<HTMLInputElement>) => setNameInputValue(e.target.value)

    const typingEmailValue = (e: React.ChangeEvent<HTMLInputElement>) => setEmailInputValue(e.target.value)

    const handleSignUp = () => {
        if (numberInputValue === "") {
            setErrorMessage("Please enter phone number.")
            setIsShowingError(true)
        }
        else if (numberInputValue.length != 10) {
            setErrorMessage("Phone numbers must consist of 10 digits.")
            setIsShowingError(true)
        }
        else if (nameInputValue === "") {
            setErrorMessage("Please enter your name.")
            setIsShowingError(true)
        }
        else if (emailInputValue === "") {
            setErrorMessage("Please enter your email.")
            setIsShowingError(true)
        }
        else {
            props.setAction("Verify OTP")
        }
    }


    return (
        <div className="flex flex-col gap-2">
            <div className="flex flex-col gap-8">
                {isShowingError && <div className="bg-red-400 text-white pb-3 pt-2.5 px-4">{errorMessage}</div>}
                <div className="flex flex-col gap-6">
                    <div className="flex flex-col">
                        <label htmlFor='mobileNumber' className="uppercase text-xs">Phone Number</label>
                        <div className="flex gap-1 pt-2 pb-2 border-b dark:border-b-zinc-700">
                            <span>+91</span>
                            <span>-</span>
                            <input onChange={typingNumberValue} className="bg-transparent outline-none grow text-zinc-950 dark:text-zinc-300" type="tel" name="mobileNumber" id="mobileNumber" autoComplete="on" value={numberInputValue}
                            />
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor='name' className="uppercase text-xs">Name</label>
                        <div className="flex gap-1 pt-2 pb-2 border-b dark:border-b-zinc-700">
                            <input onChange={typingNameValue} className="bg-transparent outline-none grow text-zinc-950 dark:text-zinc-300" type="text" name="name" id="name" autoComplete="on" value={nameInputValue}
                            />
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor='email' className="uppercase text-xs">Email</label>
                        <div className="flex gap-1 pt-2 pb-2 border-b dark:border-b-zinc-700">
                            <input onChange={typingEmailValue} className="bg-transparent outline-none grow text-zinc-950 dark:text-zinc-300" type="email" name="email" id="email" autoComplete="on" value={emailInputValue}
                            />
                        </div>
                    </div>
                </div>
                <button onClick={handleSignUp} className="p-4 font-bold text-[14px] leading-none uppercase bg-primary text-white">Sign Up</button>
            </div>
            <span className="block text-xs">By creating an account, I accept the <b>Terms & Conditions</b> & <b>Privacy Policy</b></span>
        </div>
    )
}

export default SignUp;
