import { useAuth } from "../../Context/AuthContext"
import { Route, Redirect } from "react-router-dom"

export default function Logout() {
    const { currentUser } = useAuth()
    const {logout} = useAuth()

    if (currentUser) logout();
    return <Redirect to="/" />

}
