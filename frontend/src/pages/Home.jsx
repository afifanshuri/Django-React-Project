import { useState, useEffect, useRef } from "react"
import api from "../api"
import Header from "../components/Header";
import { Card, Center, Collapsible, Heading, VStack, Editable, Button, HStack, Input, EditableInput, Text, Container, Spacer, DialogRoot, DialogTrigger, DialogContent, DialogHeader, DialogBody, Stack, DialogFooter, DialogActionTrigger, DialogTitle, Field, DialogDescription, DialogCloseTrigger, Spinner } from "@chakra-ui/react";
import { IoMdSend } from "react-icons/io";
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { getCurrentUser } from "../userService";
import { dateFormatter } from "../commonService";

function Home() {
    const [postList, setPostList] = useState([]);
    const [usersList, setUsersList] = useState([]);
    const [authorsList, setAuthorsList] = useState([]);
    const [commentsList, setCommentsList] = useState([]);
    const [commentToSubmit, setCommentToSubmit] = useState({});
    const [commentToEdit, setCommentToEdit] = useState({});
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const getPostList = async () => {
        await api
            .get("/api/posts/")
            .then((res) => res.data)
            .then((data) => { setPostList(data) })
            .catch((e) => alert(e));
    }

    const getUsersList = async () => {
        await api
            .get("/api/users/view/")
            .then((res) => res.data)
            .then((data) => { setUsersList(data) })
            .catch((e) => alert(e));
    }

    const getUsersWhoPosted = async () => {
        try {
            const authorsId = [...new Set(postList.map(post => post.author))];
            const queryString = `?ids=${authorsId.join(',')}`;
            await api.get(`/api/posts/getAffiliatedUsers/${queryString}`)
                .then((res) => res.data)
                .then((data) => setAuthorsList(data))
                .catch((e) => alert("Cant get users from posts! " + e));
        } catch (e) {
            alert("Cannot retrieve users of posts!")
        }
    }

    const getCommentsListByPost = async () => {
        const postsId = [... new Set(postList.map(post => post.id))]
        const queryParams = `?ids=${postsId.join(',')}`;
        await api.get(`/api/posts/view/comment/${queryParams}`)
            .then((res) => res.data)
            .then((data) => setCommentsList(data))
            .catch((e) => alert("in try catch"))
    }

    const onClickSendComment = async (postId) => {
        const comment = { id: postId, content: commentToSubmit[postId] };
        await api.post(`/api/comment/create/`, comment)
            .then((res) => {
                if (res.status === 201 || res.status === 200) {
                    getCommentsListByPost();
                    setCommentToSubmit({});
                } else {
                    alert("Failed to submit comment")
                }
            }).catch((e) => alert(e))
    }

    const onClickDeleteComment = async (commentId) => {
        await api.delete(`/api/comment/delete/${commentId}/`)
            .then((res) => {
                if (res.status === 204) {
                    alert("Succesfully deleted comment")
                } else {
                    alert("Failed to delete comment")
                }
                getCommentsListByPost();
            }).catch((e) => alert(e));
    }

    const onClickEditComment = async (commentId) => {
        const comment = { id: commentId, content: commentToEdit[commentId] };
        await api.put(`/api/comment/update/${commentId}/`, comment)
            .then((res) => {
                if (res.status === 201 || res.status === 200) {
                    getCommentsListByPost();
                    setCommentToEdit({});
                } else {
                    alert("Failed to submit comment")
                }
            }).catch((e) => alert(e))
    }

    useEffect(() => {
        const fetchCurrentUser = async () => {
            try {
                const response = await getCurrentUser();
                setCurrentUser(response.data);  // Update currentUser state with the fetched data
            } catch (error) {
                console.error("Failed to fetch current user:", error);
            }
        };

        fetchCurrentUser();
    }, []);

    useEffect(() => {
        getUsersList();
        getPostList();
    }, [])

    useEffect(() => {
        if (postList && postList.length !== 0) {
            getUsersWhoPosted();
            getCommentsListByPost();  
        }

        setLoading(false);
    }, [postList]);

    return (
        <>
            <Header></Header>
            <Center>
                {loading ? (<Spinner size="xl" color="white" thickness="4px" speed="0.65s" emptyColor="gray.200" />)
                    : (postList.length === 0 ?
                        (<Heading size={'4xl'}>No Posts Yet</Heading>) :
                        (<VStack>
                            {postList.map(post => {
                                const author = authorsList.find(author => author.id === post.author);
                                const authorIsCurrentUser = post.author === currentUser.id;
                                const authorName = author ? (authorIsCurrentUser ? "You" : author.username) : "Unknown";
                                const postComments = commentsList.filter(comment => comment.post === post.id);
                                return (
                                    <Card.Root key={post.id} minW={'500px'} minH={'100px'} maxW={'300px'} margin={'10px'} padding={'10px'} variant={'subtle'}
                                        data-state="open"
                                        _open={{
                                            animation: "slide-in-bottom 300ms ease-out",
                                        }}>
                                        <Card.Body gap="2">
                                            <Card.Title>{post.title}</Card.Title>
                                            <Text textStyle={'xs'} color={'whiteAlpha.400'}>Posted By: {authorName} | {dateFormatter(post.created_at)}</Text>
                                            <Card.Description marginTop={'20px'}>{post.caption}</Card.Description>
                                            <Center w="100%" marginTop={'10px'}>
                                                <Collapsible.Root unmountOnExit w={'100%'} textAlign={'center'}>
                                                    <Collapsible.Trigger className="collapsible">View Comments</Collapsible.Trigger>
                                                    <Collapsible.Content maxH={'100%'}>
                                                        {
                                                            postComments.map(comment => {
                                                                const commenter = usersList.find(user => user.id === comment.commenter);
                                                                const authorIsCommenter = comment.commenter === currentUser.id;

                                                                return (
                                                                    <Container style={{ textAlign: "left", marginBottom: '10px' }} key={comment.id} w={'100%'}>
                                                                        <Text>{commenter ? (authorIsCommenter ? "You" : commenter.username) + ": " : "Anon: "} </Text>
                                                                        <Text  py={2} px={4}  w={'100%'} flexWrap={"wrap"} border={'solid 0.5px rgb(39, 39, 42)'}>{comment.content}</Text>


                                                                        <div style={{ display: authorIsCommenter ? "inline-flex" : "none", marginTop: '10px' }}>
                                                                            <DialogRoot placement="center" motionPreset="slide-in-bottom">
                                                                                <DialogTrigger asChild>
                                                                                    <FaRegEdit className="textLink" style={{ marginRight: '5px' }} />
                                                                                </DialogTrigger>
                                                                                <DialogContent
                                                                                    style={{
                                                                                        position: "fixed",
                                                                                        top: "50%",
                                                                                        left: "50%",
                                                                                        transform: "translate(-50%, -50%)",
                                                                                        zIndex: 1000
                                                                                    }}
                                                                                >
                                                                                    <DialogBody pt="4">
                                                                                        <DialogTitle>Edit Comment</DialogTitle>
                                                                                        <Input
                                                                                            value={commentToEdit[comment.id] || ''}
                                                                                            onChange={(e) => setCommentToEdit(prev => ({ ...prev, [comment.id]: e.target.value }))}
                                                                                        />
                                                                                    </DialogBody>
                                                                                    <DialogFooter>
                                                                                        <DialogActionTrigger asChild>
                                                                                            <Button variant="outline">Cancel</Button>
                                                                                        </DialogActionTrigger>
                                                                                        <DialogActionTrigger asChild>
                                                                                            <Button onClick={(e) => onClickEditComment(comment.id)} colorPalette="blue">Save Changes</Button>
                                                                                        </DialogActionTrigger>
                                                                                    </DialogFooter>
                                                                                    <DialogCloseTrigger />
                                                                                </DialogContent>
                                                                            </DialogRoot>
                                                                            <MdDelete onClick={(e) => onClickDeleteComment(comment.id)} className="textLink" color={"whiteAlpha.500"}></MdDelete>
                                                                        </div>
                                                                    </Container>
                                                                )
                                                            })
                                                        }
                                                        <Container marginTop={'30px'}>
                                                            <Editable.Root textAlign="start" w={'100%'} className="editables">
                                                                <Input py={2} px={4} as={EditableInput} placeholder="Add A Comment" w={'100%'} value={commentToSubmit[post.id] || ''} onChange={(e) => setCommentToSubmit(prev => ({ ...prev, [post.id]: e.target.value }))} />
                                                                <Button className="send-button" onClick={(e) => onClickSendComment(post.id)}><IoMdSend /></Button>
                                                            </Editable.Root>
                                                        </Container>
                                                    </Collapsible.Content>
                                                </Collapsible.Root>
                                            </Center>
                                        </Card.Body>
                                    </Card.Root>
                                )
                            })}
                        </VStack>
                        )
                    )
                }
            </Center>
        </>
    )
}

export default Home