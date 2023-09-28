import LightBox from "../../components/LightBox"
import img from "../../../assets/images/no_instamart.png"
import { useNavigate } from "react-router-dom";
import { routePaths } from "../../Ui";

const Instamart = () => {

    const navigate = useNavigate();

    return (
        <LightBox wrapperClasses="w-full h-full" closeBtnClasses="hidden">
            <div className="flex bg-white h-[100vh] w-full relative">
                <img className="w-full h-full lg:object-contain" src={img} alt="Instamart not available" />
                <button onClick={() => navigate(routePaths.home)} className="absolute bottom-[40px] left-2/4 -translate-x-2/4 rounded-xl py-2 px-5 bg-[#9e1e62] text-white">Go To Home</button>
            </div>
        </LightBox>
    )
}

export default Instamart