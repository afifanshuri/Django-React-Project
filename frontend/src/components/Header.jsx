import { Center, HStack, IconButton, Spacer, Tabs, TabsList } from "@chakra-ui/react"
import Home from "../pages/Home"
import Profile from "../pages/ProfilePage"
import { Link } from "react-router-dom"
import { SlLogout } from "react-icons/sl";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import { useNavigate } from "react-router-dom";

const Header = () => {
    const navigator = useNavigate();
    const onClickLogout = (e) => {
        e.preventDefault();
        console.log('loggedout!');
        localStorage.removeItem(ACCESS_TOKEN);
        localStorage.removeItem(REFRESH_TOKEN);
        navigator('/login');
    }

    return (
        <>
            <HStack spacing={'30px'} marginTop={'10px'} marginBottom={'50px'} padding={'20px'}>
                <Center>
                    <Link to={"/"} className="nav_link">Home</Link>
                    <Link to={"/myposts"} className="nav_link">My Posts</Link>
                </Center>
                <Spacer />
                <HStack as={"button"} cursor={'pointer'} onClick={(e) => onClickLogout(e)}><SlLogout></SlLogout> Log Out</HStack>
            </HStack>
        </>
    )
}

export default Header