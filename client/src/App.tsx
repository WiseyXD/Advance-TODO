import { Routes, Route, Navigate } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";

function App() {
    const isAuthorized = false;

    return (
        <>
            <Navbar isAuthorized={isAuthorized} />
            <div className="w-full max-w-[90%] mx-auto mt-4">
                <Routes>
                    <Route path="/signup" element={<Register />} />
                    <Route path="/login" element={<Login />} />
                    <Route
                        path="/"
                        element={
                            isAuthorized ? <Home /> : <Navigate to={"/login"} />
                        }
                    />
                </Routes>
            </div>
        </>
    );
}

export default App;
