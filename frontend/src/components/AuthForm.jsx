import { Button, Input, Spacer, VStack, Text, Link, Card, Center } from "@chakra-ui/react"
import { Field } from "./ui/field"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import api from "../api"
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants"
import LoadingIndicator from "./LoadingIndicator"

const AuthForm = ({ route, method }) => {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const name = method === "login" ? "Login" : "Register"

    async function onClickSubmit(e) {
        setLoading(true);
        e.preventDefault();

        try {
            const res = await api.post(route, { username, password })
            if (method === "login") {
                localStorage.setItem(ACCESS_TOKEN, res.data.access);
                localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
                navigate("/");
            } else {
                navigate("/login")
            }
        } catch (e) {
            alert("Something went wrong!")
            setLoading(false);
        } finally {

        }
        console.log("Form Submitted from " + method + " page")
    }

    return (
        <>
            <Card.Root padding={'30px'} variant={"subtle"}>
                <VStack spaceY={'10px'}>
                    <Field label="Username">
                        <Input value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Enter username here"></Input>
                    </Field>

                    <Field label="Password">
                        <Input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Enter password here"></Input>
                    </Field>
                    {loading && <LoadingIndicator/>}
                    <Button onClick={onClickSubmit}>{method === "login" ? "Log In" : "Sign Up"}</Button>
                </VStack>
            </Card.Root>
        </>
    )
}

export default AuthForm