import { useState } from "react";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { useLoginMutation } from "@/app/api/authApi";
import { useDispatch } from "react-redux";
import { setAuth } from "@/app/Slices/authSlice";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

const loginSchema = z.object({
    email: z.string().email().min(10).max(50),
    password: z
        .string()
        .min(5, { message: "Must be 5 or more characters long" }),
});

export default function Login() {
    const form = useForm<z.infer<typeof loginSchema>>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });
    const { toast } = useToast();
    const [isLoading, setIsLoading] = useState(false);
    const [loginMutation] = useLoginMutation();
    const dispatch = useDispatch();

    async function onSubmit(values: z.infer<typeof loginSchema>) {
        setIsLoading(true);
        const { email, password } = values;
        // @ts-ignore
        const { data } = await loginMutation({
            email,
            password,
        });
        console.log(data);
        if (!data) {
            toast({
                variant: "destructive",
                title: "Login Failed",
                description: "Invalid Credentials",
            });
            setIsLoading(false);
            return;
        }
        console.log(data);
        setIsLoading(false);
        form.reset();
        dispatch(setAuth(data));
    }

    return (
        <div className="min-h-[80vh] flex justify-center items-center">
            <div className="rounded-lg p-8 max-w-md shadow-md border border-slate-400">
                <Form {...form}>
                    <div className="flex flex-col">
                        <h2 className="text-2xl text-center font-bold">
                            Login
                        </h2>
                        <p className="text-light-3 small-medium md:base-regular my-2">
                            To use MasterNotes please login
                        </p>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="flex flex-col gap-5"
                        >
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="email"
                                                className="shad-input"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Password</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="password"
                                                className="shad-input"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button
                                type="submit"
                                className="shad-button_primary"
                                disabled={isLoading}
                            >
                                Login
                            </Button>
                        </form>
                        <p className="text-small text-light-2 text-center mt-3">
                            New to MasterNotes?{" "}
                            <Link
                                to="/signup"
                                className="text-primary-500 text-small-semibold ml-1 hover:underline"
                            >
                                Signup
                            </Link>
                        </p>
                    </div>
                </Form>
            </div>
        </div>
    );
}
