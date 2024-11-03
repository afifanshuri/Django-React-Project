import { Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";

function BackButton() {
    const navigate = useNavigate();

    return (
        <IoArrowBack size={'30px'} onClick={() => navigate(-1)} colorScheme="blue" cursor={'pointer'} style={{marginLeft:'10px'}}/>
    );
}

export default BackButton