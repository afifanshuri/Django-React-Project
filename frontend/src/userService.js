import api from "./api"

const getCurrentUser = async () => {
    const currentUser = await api.get("/api/users/view/current/");
    return currentUser;
}

export {getCurrentUser};