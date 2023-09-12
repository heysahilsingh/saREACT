import React, { useContext, useState, useEffect } from 'react';
import { ActionProps } from './Account';
import { useNavigate } from 'react-router-dom';
import { routePaths } from '../../Ui';
import useDeviceDetect from '../../../hooks/useDeviceDetect';
import UserContext from '../../../context/UserContext';

const VerifyOTP = (props: ActionProps) => {

    useEffect(() => {
        // Define other action
        props.setOtherAction(null)
        // Define the other action heading
        props.setOtherActionHeading("We've sent an OTP to your phone number");
    }, [])

    const userInfo = useContext(UserContext);

    const navigate = useNavigate();

    const device = useDeviceDetect();

    const [inputValue, setInputValue] = useState("")
    const [isShowingError, setIsShowingError] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>("sasasa")

    const typingInputValue = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;

        if (isShowingError) setIsShowingError(false)

        // Check if the input is a valid number or the backspace key
        if (!isNaN(Number(newValue)) || newValue === "") {
            // Check if there are already 10 numbers
            const currentNumbers = newValue.replace(/[^0-9]/g, '');
            if (currentNumbers.length <= 6) {
                setInputValue(newValue);
            }
        }
    };

    const verifyOTPHandler = () => {
        if (inputValue !== "") {
            if (inputValue === "123456") {
                userInfo.updateUserInfo({
                    ...userInfo.userInfo,
                    isLoggedIn: true
                })

                navigate(device.isDesk ? routePaths.restaurants : routePaths.home)
            } else {
                setErrorMessage("Invalid OTP, Please try again. ( Use 123456 )")
                setIsShowingError(true)
            }
        }
        else {
            setErrorMessage("Please enter OTP.")
            setIsShowingError(true)
        }
    }

    return (
        <div className="flex flex-col gap-2">
            <div className="flex flex-col gap-8">
                {isShowingError && <div className="bg-red-400 text-white pb-3 pt-2.5 px-4">{errorMessage}</div>}
                <div className="flex flex-col">
                    <span className="uppercase text-xs">Enter OTP</span>
                    <div className="flex gap-1 pt-2 pb-3 border-b dark:border-b-zinc-700">
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
                <button onClick={verifyOTPHandler} className="p-4 font-bold text-[14px] leading-none uppercase bg-primary text-white">Verify</button>
            </div>
        </div>
    )
}

export default VerifyOTP;
