import { useState } from "react"
import PostForm from "../components/PostForm"
import Header from "../components/Header"
import BackButton from "../components/BackButton"

const CreatePostPage = () => {
    
    return (
        <>
        <Header></Header>

        <BackButton/>
        <PostForm route="/api/posts/create/"></PostForm>
        </>
    )
}

export default CreatePostPage