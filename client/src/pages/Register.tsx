import { useState } from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useDispatch } from "react-redux";
import { useSignupMutation } from "@/app/api/authApi";
import { setAuth } from "@/app/Slices/authSlice";
import { useNavigate } from "react-router-dom";

export default function Register() {
    const [signupMutattion] = useSignupMutation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rePassword, setRePassword] = useState("");

    const [isLoading, setIsLoading] = useState(false);

    async function handleSubmit(e: React.SyntheticEvent) {
        e.preventDefault();
        if (!(password == rePassword)) {
            alert("Password didnt match");
            return;
        }
        const { data } = await signupMutattion({ email, password });
        if (!data) {
            alert("User Already Exists please login");
            return;
        }
        setEmail("");
        setPassword("");
        setRePassword("");
        navigate("/login");
    }
    return (
        <Card className="mx-auto md:max-w-lg">
            <CardHeader>
                <CardTitle>Signup</CardTitle>
                <CardDescription>Basic Signup Page</CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            placeholder="name@example.com"
                            type="email"
                            autoCapitalize="none"
                            autoComplete="email"
                            autoCorrect="off"
                            disabled={isLoading}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="password">Password</Label>
                        <Input
                            id="password"
                            placeholder="password"
                            type="password"
                            autoCapitalize="none"
                            autoComplete="password"
                            autoCorrect="off"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            disabled={isLoading}
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="password">Confirm Password</Label>
                        <Input
                            id="confirm-password"
                            placeholder="confirm-password"
                            type="password"
                            autoCapitalize="none"
                            autoComplete="password"
                            autoCorrect="off"
                            value={rePassword}
                            onChange={(e) => setRePassword(e.target.value)}
                            disabled={isLoading}
                        />
                    </div>
                </form>
            </CardContent>
            <CardFooter>
                <Button onClick={handleSubmit}>Submit</Button>
            </CardFooter>
        </Card>
    );
}
