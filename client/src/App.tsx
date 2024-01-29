import { ThemeProvider } from "@/components/theme-provider";
import { Routes, Route, Navigate } from "react-router-dom";
import Register from "./pages/user/Register";
import Login from "./pages/user/Login";
import Home from "./pages/user/Home";
import Navbar from "./components/Navbar";
import { useSelector } from "react-redux";
import { RootState } from "./app/store";
import { Toaster } from "./components/ui/toaster";
import { Separator } from "@/components/ui/separator";
import BuyPremium from "./pages/user/BuyPremium";
import AdminSignup from "./pages/admin/AdminSignup";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
function App() {
    const isAuthorized = useSelector(
        (state: RootState) => state.root.auth.token
    );
    const isAdmin = useSelector((state: RootState) => state.root.auth.admin);

    return (
        <>
            <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
                <Toaster />
                <Navbar isAuthorized={isAuthorized} />
                <Separator />
                <div className="max-w-[90%] w-full mx-auto mt-4">
                    <Routes>
                        <Route
                            path="/signup"
                            element={
                                !isAuthorized ? (
                                    <Register />
                                ) : (
                                    <Navigate to={"/"} />
                                )
                            }
                        />
                        <Route
                            path="/login"
                            element={
                                !isAuthorized ? (
                                    <Login />
                                ) : (
                                    <Navigate to={"/"} />
                                )
                            }
                        />
                        <Route
                            path="/"
                            element={
                                isAuthorized ? (
                                    isAdmin ? (
                                        <Navigate to={"/admin"} />
                                    ) : (
                                        <Home />
                                    )
                                ) : (
                                    <Navigate to={"/login"} />
                                )
                            }
                        />
                        <Route
                            path="/premium"
                            element={
                                isAuthorized ? (
                                    isAdmin ? (
                                        <Navigate to={"/admin"} />
                                    ) : (
                                        <BuyPremium />
                                    )
                                ) : (
                                    <Navigate to={"/login"} />
                                )
                            }
                        />
                        {/* Admin Routes */}
                        <Route
                            path="/admin/signup"
                            element={
                                !isAuthorized ? (
                                    <AdminSignup />
                                ) : (
                                    <Navigate to={"/admin"} />
                                )
                            }
                        />
                        <Route
                            path="/admin/login"
                            element={
                                !isAuthorized ? (
                                    <AdminLogin />
                                ) : (
                                    <Navigate to={"/admin"} />
                                )
                            }
                        />
                        <Route
                            path="/admin"
                            element={
                                isAuthorized ? (
                                    isAdmin ? (
                                        <AdminDashboard />
                                    ) : (
                                        <Navigate to={"/"} />
                                    )
                                ) : (
                                    <Navigate to={"/admin/login"} />
                                )
                            }
                        />
                        {/* wildcard*/}
                        <Route
                            path="/*"
                            element={
                                isAuthorized ? (
                                    isAdmin ? (
                                        <AdminDashboard />
                                    ) : (
                                        <Navigate to={"/"} />
                                    )
                                ) : (
                                    <Navigate to={"/login"} />
                                )
                            }
                        />
                    </Routes>
                </div>
            </ThemeProvider>
        </>
    );
}

export default App;
