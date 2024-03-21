import { Button, TextInput } from "@mantine/core"
import { useContext } from "react"
import { useNavigate } from "react-router-dom"
import { JwtContext, UserContext } from "../App"

export default function Profile() {
    const { user } = useContext(UserContext)
    const { setJwt } = useContext(JwtContext)
    const navigate = useNavigate()

    return (
        <div className="main">
            <h1>Profile</h1>
            {
                user ?
                    <div>
                        <p>Logged in as {user.userName}</p>
                        <Button onClick={() => {
                            setJwt('')
                            
                            navigate('/')
                        }}>Logout</Button>
                    </div>
                    :
                    <div>
                        <p>User is not logged in, please provide valid JWT or Register/Login:</p>
                        <Button onClick={() => navigate('/register')}>Register</Button>
                        <TextInput w={300} mt={20} placeholder="Token" onChange={(event) => {
                            setJwt(event.currentTarget.value)
                        }} />
                    </div>
            }
        </div>
    )
}