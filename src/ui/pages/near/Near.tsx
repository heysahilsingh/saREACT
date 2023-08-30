
import { useContext } from 'react';
import UserContext from '../../../context/UserContext';
const Near = () => {
    const {userInfo} = useContext(UserContext);

    return (
        <>
        <div>Near me Page</div>
        <div>User Main text: {userInfo.location.cityInfo.main_text}</div>
        <div>User Secondary text: {userInfo.location.cityInfo.secondary_text}</div>
        </>
    )
}

export default Near