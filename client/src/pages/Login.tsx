import { useState } from "react";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useLoginMutation } from "@/app/api/authApi";
import { useDispatch } from "react-redux";
import { setAuth } from "@/app/Slices/authSlice";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

const loginSchema = z.object({
    email: z.string().email().min(10).max(50),
    password: z.string().min(5),
});

export default function Login() {
    const form = useForm<z.infer<typeof loginSchema>>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });
    const [isLoading, setIsLoading] = useState(false);
    const [loginMutation] = useLoginMutation();
    const dispatch = useDispatch();

    async function onSubmit(values: z.infer<typeof loginSchema>) {
        const { email, password } = values;
        const { data } = await loginMutation({
            email,
            password,
        });
        if (!data) {
            alert("Invalid Credentials");
        }
        console.log(data);
        dispatch(setAuth(data));
    }

    return (
        <Form {...form}>
            <div className="lg:max-w-md sm:w-420 flex-center flex-col">
                <img src="/assets/images/logo.svg" alt="" />

                <h2 className="h3-bold md:h2-bold pt-5 sm:pt-12">
                    Login to your account
                </h2>
                <p className="text-light-3 small-medium md:base-regular mt-2">
                    To use MasterNotes please login
                </p>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="flex flex-col gap-5 w-full mt-4"
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
                    <Button type="submit" className="shad-button_primary">
                        Login
                    </Button>
                    <p className="text-small text-light-2 text-center">
                        New to MasterNotes?
                        <Link
                            to="/signup"
                            className="text-primary-500 text-small-semibold ml-1 hover:underline"
                        >
                            Signup
                        </Link>
                    </p>
                </form>
            </div>
        </Form>
    );
}
