import { VStack, Link, Button, Text, Center } from "@chakra-ui/react"
import AuthForm from "../components/AuthForm"
import BackButton from "../components/BackButton"

function onClickSubmit() {
}


function Register() {
    return (
        <>
        <BackButton/>
            <Center w="100vw" h="70vh" data-state="open"
                _open={{
                    animation: "slide-in-bottom 300ms ease-out",
                }}>
                <VStack>
                    <h1>Register</h1>
                    <AuthForm route="/api/user/register/" method="register" />
                </VStack>
            </Center>

        </>
    )

}

export default Register