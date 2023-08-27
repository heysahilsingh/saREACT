import CONFIG from "../../config"
import CONSTANTS from "../../constants"
import Logo from "../../theme/Logo"
import InfoCardSection from "./InfoCardSection";

const Footer = () => {

    return (
        <footer className="footer mt-12">
            {/* Footer User Specific */}
            <div className="">
                <div className="pt-10 pb-16 px-4 lg:px-0 lg:pb-24 lg:pt-16 sa-container flex flex-col gap-10 lg:gap-16 items-center justify-center border-t border-zinc-300 dark:border-zinc-800">
                    <InfoCardSection title="Cuisine Restaurants Near Me" cardArray={CONFIG.CUISINE_RESTRO_NEAR_ME}/>
                    <InfoCardSection title="Restaurants Near Me" cardArray={CONFIG.RESTRO_NEAR_ME}/>
                </div>
            </div>
            {/* Download App */}
            <div className="bg-slate-100 dark:bg-zinc-800">
                <div className="px-10 py-7 lg:py-8 lg:px-[12%] flex gap-3 items-center justify-between sa-container">
                    <p className="hidden font-bold text-3xl min-w-[60%] lg:inline-block dark:text-zinc-100">For better experience,download the Swiggy app now</p>
                    <div className="flex items-center justify-center gap-4  lg:gap-5">
                        <a href="#">
                            <img src={CONSTANTS.CLOUDINAY_IMG + "portal/m/play_store.png"} alt="Download Android App" />
                        </a>
                        <a href="#">
                            <img src={CONSTANTS.CLOUDINAY_IMG + "portal/m/app_store.png"} alt="Download iOS App" />
                        </a>
                    </div>
                </div>
            </div>
            {/* Footer Links */}
            <div className="text-zinc-400 bg-zinc-950">
                <div className="px-5 pt-8 pb-40 grid grid-cols-2 gap-x-[10%] gap-y-[6%] lg:px-0 lg:pt-12 lg:pb-28 lg:grid-cols-4 lg:gap-x-[5%] lg:gap-y-[0] sa-container">
                    <div className="col-start-1 col-end-3 lg:col-span-1 lg:row-start-1 lg:row-end-5 lg:col-start-1 lg:col-end-auto">
                        <div className="flex w-fit items-center justify-start gap-2 lg:gap-3 text-white">
                            <Logo className=" w-6 lg:w-6" />
                            <span className="font-bold leading-none text-xl">Swiggy</span>
                        </div>
                        <p className="w-full my-2 lg:mb-0 lg:mt-3">© 2023 Bundl Technologies Pvt. Ltd</p>
                    </div>
                    <div className="">
                        <p className="text-white mb-4 font-medium text-[17px]">Company</p>
                        <ul className="flex flex-col gap-3">
                            <li>About</li>
                            <li>Career</li>
                            <li>Team</li>
                            <li>Swiggy One</li>
                            <li>Swiggy Instamart</li>
                            <li>Swiggy Genie</li>
                        </ul>
                    </div>
                    <div className="">
                        <p className="text-white mb-4 font-medium text-[17px]">Contact us</p>
                        <ul className="flex flex-col gap-3">
                            <li>Help & Support</li>
                            <li>Partner with us</li>
                            <li>Ride with us</li>
                        </ul>
                    </div>
                    <div className="lg:col-start-3 lg:mt-[calc(-6rem+2px)]">
                        <p className="text-white mb-4 font-medium text-[17px]">Legal</p>
                        <ul className="flex flex-col gap-3">
                            <li>Terms & Conditions</li>
                            <li>Cookie Policy</li>
                            <li>Privacy Policy</li>
                        </ul>
                    </div>
                    <div className="mt-[calc(-7rem+6px)] lg:mt-0 lg:col-start-4 lg:row-start-1">
                        <p className="text-white mb-4 font-medium text-[17px]">We deliver to:</p>
                        <ul className="flex flex-col gap-3">
                            <li>Bangalore</li>
                            <li>Gurgaon</li>
                            <li>Hyderabad</li>
                            <li>Delhi</li>
                            <li>Mumbai</li>
                            <li>Pune</li>
                            <li>588+ cities more</li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer