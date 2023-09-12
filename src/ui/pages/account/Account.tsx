import { useState, useContext } from "react";
import IMG from "../../../assets/images/account-page.png";
import Login from "./Login";
import SignUp from "./SignUp";
import VerifyOTP from "./VerifyOTP";
import useDeviceDetect from "../../../hooks/useDeviceDetect";
import LightBox from "../../components/LightBox";
import { useNavigate } from "react-router-dom";
import { routePaths } from "../../Ui";
import UserContext from "../../../context/UserContext";
import Page from "../Page";

export type validActions = "Login" | "Sign up" | "Verify OTP" | null;

export interface ActionProps {
    setAction: (otherAction: validActions) => void;
    setOtherAction: (otherAction: validActions) => void;
    otherActionHeading: string,
    setOtherActionHeading: (newHeading: string) => void;
}

const Account = () => {
    const device = useDeviceDetect();

    const userInfo = useContext(UserContext);

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

    // Return JSX
    if (userInfo.userInfo.isLoggedIn) {
        return (
            <Page pageName="my-account">
                <div className="flex items-center justify-center p-8">
                    <button
                        onClick={() => {
                            userInfo.updateUserInfo({ ...userInfo.userInfo, isLoggedIn: false });
                            navigate(device.isDesk ? routePaths.restaurants : routePaths.home)
                        }}
                        className="p-4 font-bold text-[14px] leading-none uppercase bg-primary text-white">Logout</button>
                </div>
            </Page>
        )
    }
    else {
        return (
            <Page pageName="my-account">
                {
                    device.isDesk && isLightBoxOpen ? (
                        <LightBox
                            wrapperClasses="h-full w-[25%] max-w-[450px] ml-auto top-0 bg-white"
                            closeBtnClasses="right-4 top-4 text-black"
                            onClose={() => {
                                navigate(device.isDesk ? routePaths.restaurants : routePaths.home);
                                setIsLightBoxOpen(false);
                            }}
                        >
                            {form()}
                        </LightBox>
                    ) : form()
                }
            </Page>
        )
    }
};

export default Account;
