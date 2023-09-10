import { useState } from "react"
import IMG from "../../../assets/images/account-page.png"
import Login from "./Login";
import SignUp from "./SignUp";
import VerifyOTP from "./VerifyOTP";

export type validActionHeadings = "Login" | "Sign up" | "Verify OTP"

export interface ActionProps {
    changeHeading: () => void,
    subHeading: React.ReactNode,
    subHeadingAction: () => void,
}

const Account = () => {

    const [actionHeading, setActionHeading] = useState<validActionHeadings>('Login');

    const [changeActionText, setChangeActionText] = useState("create an account");


    const printAction = (actionText: validActionHeadings) => {
        if (actionText === "Login") {
            return (
                <Login
                changeHeading={setActionHeading}
                />
            )
        }
        else if (actionText === "Sign up") {
            return (
                <SignUp />
            )
        }
        else if (actionText === "Verify OTP") {
            return (
                <VerifyOTP />
            )
        }
    }

    return (
        <div className="pb-[50vh]">
            <div className="heading bg-[rgba(211,219,234,.3)] dark:bg-zinc-900 pt-[85px] pb-5 px-4 relative">
                <h1 className="pb-1 uppercase font-bold">{actionHeading}</h1>
                <div className="">
                    <span>or </span>
                    <span className="cursor-pointer text-primary">{changeActionText}</span>
                </div>
                <img className="absolute bottom-0 right-6 h-[134px]" src={IMG} alt="" />
            </div>
            <div className="action py-5 px-4">
                {printAction("Login")}
            </div>
        </div>
    )
}

export default Account