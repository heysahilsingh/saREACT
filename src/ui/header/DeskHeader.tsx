import { Link } from "react-router-dom"
import Logo from "../../theme/Logo"

const DeskHeader = () => {
    return (
        <div className="sa-container mx-auto flex gap-10 items-center p-4">
            <Link to="/" className="logo">
                <Logo />
            </Link>
            <div className="location flex gap-2 items-center justify-start">
                <span className="font-bold">Kirti Nagar</span>
                <span className="w-60 overflow-hidden whitespace-nowrap text-ellipsis">G-80, Block G, Kirti Nagar, New Delhi, Delhi, 110015, India</span>
            </div>
        </div>
    )
}

export default DeskHeader