import { VStack, Center, Heading, Button, Text, MenuItem, MenuContent, MenuTrigger, MenuRoot, Table, TableHeader, TableColumnHeader, TableColumn } from "@chakra-ui/react"
import Header from "../components/Header"
import { useNavigate } from "react-router-dom"
import { URL_CREATE, URL_POST, URL_UPDATE } from "../constants"
import { useEffect, useState } from "react"
import api from "../api"
import { dateFormatter } from "../commonService"

const Profile = () => {
    const navigator = useNavigate();
    const [postList, setPostList] = useState([]);

    const getPostList = () => {
        api
            .get("/api/posts/users/")
            .then((res) => res.data)
            .then((data) => { setPostList(data); console.log(data) })
            .catch((e) => alert(e));
    }

    useEffect(() => {
        getPostList();
    }, [])

    const onClickCreatePost = () => {
        navigator(URL_POST + URL_CREATE)
    }

    const onClickEditPost = (id) => {
        navigator(URL_POST + URL_UPDATE + `/${id}`)
    }

    const onClickDeletePost = (id) => {
        if (id) {
            api
                .delete(`/api/posts/delete/${id}/`)
                .then((res) => {
                    if (res.status === 204) {
                        alert("Succesfully deleted")
                    } else {
                        alert("Failed to delete note")
                    }
                    getPostList();
                }).catch((e) => alert(e));
        }
    }

    return (
        <>
            <Header />
            <VStack data-state="open"
                _open={{
                    animation: "slide-in-bottom 300ms ease-out",
                }}>
                <Heading size={'4xl'}>My Posts</Heading>

                {
                    postList.length === 0 ?
                        (<VStack>
                            <Heading>You haven't posted anything yet</Heading>
                            <Text>Create a new post today by clicking on the "Create a post" button</Text>
                            <Button onClick={onClickCreatePost}>Create a post</Button>
                        </VStack>
                        )
                        : (
                            <>
                                <Table.Root size="xl" width="50%">
                                    <Table.Header bg="teal.500">
                                        <Table.Row>
                                            <TableColumnHeader color="white" fontSize="lg" textAlign="center">Post Name</TableColumnHeader>
                                            <TableColumnHeader color="white" fontSize="lg" textAlign="center">Date Created</TableColumnHeader>
                                            <TableColumnHeader color="white" fontSize="lg" textAlign="center">Action</TableColumnHeader>
                                        </Table.Row>
                                    </Table.Header>
                                    <Table.Body>
                                        {
                                            postList.map((post) => (
                                                <Table.Row key={post.id}>
                                                    <Table.Cell fontWeight="bold" className="table_body_cell">{post.title}</Table.Cell>
                                                    <Table.Cell className="table_body_cell">{dateFormatter(post.created_at)}</Table.Cell>
                                                    <Table.Cell className="table_body_cell">
                                                        <MenuRoot>
                                                            <MenuTrigger asChild>
                                                                <Button variant="outline" size="sm">
                                                                    Modify
                                                                </Button>
                                                            </MenuTrigger>
                                                            <MenuContent position={'fixed'} zIndex={1000}>
                                                                <MenuItem onClick={() => onClickEditPost(post.id)} value="new-txt" cursor={'pointer'}>Edit</MenuItem>
                                                                <MenuItem onClick={() => onClickDeletePost(post.id)} value="new-file" cursor={'pointer'}>Delete</MenuItem>
                                                            </MenuContent>
                                                        </MenuRoot>
                                                    </Table.Cell>
                                                </Table.Row>
                                            ))
                                        }
                                    </Table.Body>
                                </Table.Root>
                                <Button onClick={onClickCreatePost}>Create a post</Button>
                            </>
                        )
                }
            </VStack>
        </>
    )
}

export default Profile