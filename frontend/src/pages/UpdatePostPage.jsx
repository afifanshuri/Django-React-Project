import { useEffect, useState } from "react"
import PostForm from "../components/PostForm"
import api from "../api"
import { useParams } from "react-router-dom"
import Header from "../components/Header"
import BackButton from "../components/BackButton"
const UpdatePostPage = () => {

    const [post,setPost] = useState()
    const {id} = useParams();

    useEffect(()=>{
        api.get(`/api/posts/view/${id}/`)
        .then((res) => res.data)
        .then((data) => setPost(data))
        .catch((e) => alert("Post Cannot Be Updated!"))
    },[])
    return (
        <>
            <Header></Header>
            <BackButton/>
            <PostForm route={`/api/posts/update/${id}/`} post={post}></PostForm>
        </>
    )
}

export default UpdatePostPage