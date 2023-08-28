import { createContext, useContext, useState } from "react"

// const UserContext = createContext({
//     isLoggedIn: true,
//     cart: {
//         count: 2,
//         items: []
//     },
//     location: {
//         place_id: "12345"
//     }
// })

const UserContext = createContext({
    name: "Sahil"
})

UserContext.displayName = "UserContext";

export const Sahil = (props: React.PropsWithChildren<object>) => {
    const sa = useContext(UserContext);

    const [user] = useState(sa)

    console.log(user);

    return (
        <UserContext.Provider value={user}>
            {props.children}
        </UserContext.Provider>
    )
}

export default UserContext