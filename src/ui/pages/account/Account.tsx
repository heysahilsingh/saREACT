import { useState } from "react";
import IMG from "../../../assets/images/account-page.png";
import Login from "./Login";
import SignUp from "./SignUp";
import VerifyOTP from "./VerifyOTP";
import useDeviceDetect from "../../../hooks/useDeviceDetect";
import LightBox from "../../components/LightBox";
import { useNavigate } from "react-router-dom";
import { routePaths } from "../../Ui";

export type validActions = "Login" | "Sign up" | "Verify OTP" | null;

export interface ActionProps {
    setAction: (otherAction: validActions) => void;
    setOtherAction: (otherAction: validActions) => void;
    otherActionHeading: string,
    setOtherActionHeading: (newHeading: string) => void;
}

const Account = () => {
    const device = useDeviceDetect();

    const [isLightBoxOpen, setIsLightBoxOpen] = useState<boolean>(true);

    const navigate = useNavigate()

    const [action, setAction] = useState<validActions>("Login");
    const [otherAction, setOtherAction] = useState<validActions>("Sign up");
    const [otherActionHeading, setOtherActionHeading] = useState<string>("");

    const printAction = (actionText: validActions, newHeading: string) => {
        if (actionText === "Login") {
            return (
                <Login
                    setAction={setAction}
                    setOtherAction={setOtherAction}
                    setOtherActionHeading={setOtherActionHeading}
                    otherActionHeading={newHeading}
                />
            );
        } else if (actionText === "Sign up") {
            return (
                <SignUp
                    setAction={setAction}
                    setOtherAction={setOtherAction}
                    setOtherActionHeading={setOtherActionHeading}
                    otherActionHeading={newHeading}
                />
            );
        } else if (actionText === "Verify OTP") {
            return (
                <VerifyOTP
                    setAction={setAction}
                    setOtherAction={setOtherAction}
                    setOtherActionHeading={setOtherActionHeading}
                    otherActionHeading={newHeading}
                />
            );
        }
    };

    const form = () => {
        return (
            <div className="pb-[50vh]">
                <div className="heading bg-[rgba(211,219,234,.3)] dark:bg-zinc-900 pt-[85px] pb-5 pl-4 pr-28 relative">
                    <h1 className="pb-1 uppercase font-bold">{action}</h1>
                    <span onClick={() => setAction(otherAction)} className={otherAction ? "cursor-pointer text-primary" : ""}>{otherActionHeading}</span>
                    <img className="absolute bottom-0 right-6 h-[134px]" src={IMG} alt="" />
                </div>
                <div className="action py-5 px-4">
                    {printAction(action, otherActionHeading)}
                </div>
            </div>
        );
    }

    if (device.isDesk && isLightBoxOpen) {
        return (
            <LightBox
                wrapperClasses="h-full w-[25%] max-w-[450px] ml-auto top-0 bg-white"
                closeBtnClasses="right-4 top-4 text-black"
                onCLose={() => {
                    navigate(device.isDesk ? routePaths.restaurants : routePaths.home)
                    setIsLightBoxOpen(false)
                }}
            >
                {form()}
            </LightBox>
        )
    }

    else {
        return form()
    }

};

export default Account;
