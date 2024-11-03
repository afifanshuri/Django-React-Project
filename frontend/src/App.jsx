import react, { useState } from "react"
import { BrowserRouter, Navigate, Routes, RouterProvider, Route } from "react-router-dom"
import Login from "./pages/Login"
import Register from "./pages/Register"
import NotFound from "./pages/NotFound"
import ProtectedRoute from "./components/ProtectedRoute"
import Home from "./pages/Home"
import { Provider } from "./components/ui/provider"
import Header from "./components/Header"
import Profile from "./pages/ProfilePage"
import CreatePostPage from "./pages/CreatePostPage"
import UpdatePostPage from "./pages/UpdatePostPage"
import './App.css';

function Logout() {
  localStorage.clear()
  return <Navigate to="/login"></Navigate>
}

function RegisterAndLogout() {
  localStorage.clear()
  return <Register></Register>
}

function App() {
  return (
    <>
      <Provider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={
              <ProtectedRoute>
                <Home></Home>
              </ProtectedRoute>}>
            </Route>
            <Route path="/login" element={<Login></Login>}></Route>
            <Route path="/register" element={<Register></Register>}></Route>
            <Route path="/myposts" element={<Profile/>}></Route>
            <Route path="/post/new" element={<CreatePostPage/>}></Route>
            <Route path="/post/update/:id" element={<UpdatePostPage/>}></Route>
            <Route path="*" element={<NotFound></NotFound>}></Route>
            <Route path="/logout" element={<Login></Login>}></Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  )
}

export default App
