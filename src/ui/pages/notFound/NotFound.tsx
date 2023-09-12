import { useNavigate } from "react-router-dom";
import img from "../../../assets/images/404.png"
import Page from "../Page"
import { routePaths } from "../../Ui";

const NotFound = () => {

    const navigate = useNavigate();

    const handleGoBack = () => {
        if (window.history.state && window.history.state.idx > 0) {
            navigate(-1);
        } else {
            navigate(routePaths.home, { replace: true });
        }
    }

    return (
        <Page pageName="404 not-found">
            <div className="flex flex-col px-10 py-16 text-center items-center justify-center">
                <img className="max-w-[450px] px-16 pb-8" src={img} alt="" />
                <h1 className="font-bold text-[32px]">We'll be back shortly</h1>
                <p className="leading-[130%] pt-3 pb-6">We are fixing a temporary glitch. Sorry for the inconvenience.</p>
                <button onClick={handleGoBack} className="py-4 px-6 font-bold text-[14px] leading-none uppercase bg-primary text-white">Go Back</button>
            </div>
        </Page>
    )
}

export default NotFound