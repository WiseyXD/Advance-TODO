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
import { useLoginMutation } from "@/app/api/authApi";
import { useDispatch } from "react-redux";
import { setAuth } from "@/app/Slices/authSlice";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [loginMutation] = useLoginMutation();
    const dispatch = useDispatch();

    async function handleSubmit(e: React.SyntheticEvent) {
        e.preventDefault();
        const { data } = await loginMutation({
            email,
            password,
        });
        if (!data) {
            alert("Invalid Credentials");
        }
        dispatch(setAuth(data));
        setEmail("");
        setPassword("");
    }

    return (
        <Card className="mx-auto md:max-w-lg">
            <CardHeader>
                <CardTitle>Login</CardTitle>
                <CardDescription>Basic Login Page</CardDescription>
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
                            disabled={isLoading}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                </form>
            </CardContent>
            <CardFooter>
                <Button onClick={handleSubmit}>Login</Button>
            </CardFooter>
        </Card>
    );
}
