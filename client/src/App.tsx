import { Routes, Route, Navigate } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import { useSelector } from "react-redux";
import { RootState } from "./app/store";
import { Toaster } from "./components/ui/toaster";

function App() {
    const isAuthorized = useSelector(
        (state: RootState) => state.root.auth.token
    );

    return (
        <>
            <Toaster />
            <Navbar isAuthorized={isAuthorized} />
            <div className="max-w-[90%] w-full mx-auto mt-4">
                <Routes>
                    <Route
                        path="/signup"
                        element={
                            !isAuthorized ? <Register /> : <Navigate to={"/"} />
                        }
                    />
                    <Route
                        path="/login"
                        element={
                            !isAuthorized ? <Login /> : <Navigate to={"/"} />
                        }
                    />
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
