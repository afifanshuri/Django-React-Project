import { VStack, Text, Center } from "@chakra-ui/react"
import AuthForm from "../components/AuthForm"
import { Link } from "react-router-dom"



function Login() {
    return (
        <>
            <Center w="100vw" h="70vh" data-state="open"
                _open={{
                    animation: "slide-in-bottom 300ms ease-out",
                }}>
                <VStack>
                    <h1>Login</h1>
                    <AuthForm route="/api/token/" method="login" />
                    <Text fontSize={'10px'} color={'whiteAlpha.400'}>Don't have an account? Register <Link to={"/register"} style={{ color: "white", textDecoration: "underline" }}>here</Link></Text>
                </VStack>
            </Center>
        </>
    )

}

export default Login