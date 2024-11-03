import { Input, Textarea, Button, Center, VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Field } from "./ui/field"
import api from "../api";
import { URL_POST } from "../constants";
import { useNavigate } from "react-router-dom";
import { toaster } from "./ui/toaster"


const PostForm = ({ route, post }) => {

    const [title, setTitle] = useState('');
    const [caption, setCaption] = useState('');
    const isUpdate = post ? true : false;
    const navigator = useNavigate();

    const getExistingPostIfExist = () => {
        if (post) {
            setTitle(post.title);
            setCaption(post.caption)
        }
    }

    useEffect(() => {
        getExistingPostIfExist();
    }, [post])

    async function onSubmitPost(e) {
        e.preventDefault()
        try {
            const res = isUpdate ? await api.put(route, { title, caption }) : await api.post(route, { title, caption })
            toaster.create({
                description: "Post saved successfully",
                type: "info",
            });
            navigator("/myposts");
        } catch (e) {
            alert("Failed to create post!: " + e);
        }
    }

    return (
        <>
            <Center maxH={'70vh'} maxW="100vw" spaceY={'10px'} data-state="open"
                _open={{
                    animation: "slide-in-bottom 300ms ease-out",
                }}>
                <VStack minW="50%">
                    <h1>{isUpdate ? "Update" : "Create"} Post</h1>
                    <Field label="Post Title">
                        <Input value={title} onChange={(e) => setTitle(e.target.value)}></Input>
                    </Field>

                    <Field label="Post Caption">
                        <Textarea value={caption} onChange={(e) => setCaption(e.target.value)}></Textarea>
                    </Field>

                    <Button onClick={onSubmitPost}>Submit</Button>
                </VStack>
            </Center>
        </>
    )
}

export default PostForm