import { useState } from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
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
import { useDispatch } from "react-redux";
import { useSignupMutation } from "@/app/api/authApi";
import { Link, useNavigate } from "react-router-dom";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

const registerSchema = z.object({
    email: z.string().email().min(10).max(50),
    password: z.string().min(5),
    rePassword: z.string().min(5),
});

export default function Register() {
    const form = useForm<z.infer<typeof registerSchema>>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            email: "",
            password: "",
            rePassword: "",
        },
    });

    const [signupMutation] = useSignupMutation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    async function onSubmit(values: z.infer<typeof formSchema>) {
        if (!(values.password == values.rePassword)) {
            alert("Password didnt match");
            return;
        }
        const { email, password } = values;
        const { data } = await signupMutation({ email, password });
        if (!data) {
            alert("User Already Exists please login");
            return;
        }
        console.log(data);
        navigate("/login");
    }
    return (
        <Form {...form}>
            <div className="lg:max-w-md sm:w-420 flex-center flex-col">
                <img src="/assets/images/logo.svg" alt="" />

                <h2 className="h3-bold md:h2-bold pt-5 sm:pt-12">
                    Create a new Account
                </h2>
                <p className="text-light-3 small-medium md:base-regular mt-2">
                    To use MasterNotes please register
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
                                <FormLabel>Confirm Password</FormLabel>
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
                    <FormField
                        control={form.control}
                        name="rePassword"
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
                        Signup
                    </Button>
                    <p className="text-small text-light-2 text-center">
                        Already Have an Account ?
                        <Link
                            to="/sign-in"
                            className="text-primary-500 text-small-semibold ml-1 hover:underline"
                        >
                            Log In
                        </Link>
                    </p>
                </form>
            </div>
        </Form>
    );
}
