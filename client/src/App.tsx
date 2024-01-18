import { Routes, Route, Navigate } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";

function App() {
    const isAuthorized = false;

    return (
        <>
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
        </>
    );
}

export default App;
