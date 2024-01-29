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
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useAdminSignupMutation } from "@/app/api/adminAuthApi";

const registerSchema = z.object({
    email: z.string().email().min(10).max(50),
    password: z.string().min(5),
    rePassword: z.string().min(5),
});

export default function AdminSignup() {
    const form = useForm<z.infer<typeof registerSchema>>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            email: "",
            password: "",
            rePassword: "",
        },
    });

    const [signupMutation] = useAdminSignupMutation();
    const navigate = useNavigate();
    const { toast } = useToast();
    const [isLoading, setIsLoading] = useState(false);

    async function onSubmit(values: z.infer<typeof registerSchema>) {
        setIsLoading(true);
        if (!(values.password == values.rePassword)) {
            alert("Password didnt match");
            return;
        }
        const { email, password } = values;
        const { data } = await signupMutation({ email, password });
        if (!data) {
            toast({
                variant: "destructive",
                title: "Registration Failed",
                description: "UserAlready Exists",
            });
            setIsLoading(false);
            return;
        }
        console.log(data);
        setIsLoading(false);
        form.reset();
        navigate("/login");
    }
    return (
        <div className="min-h-[80vh] flex justify-center items-center">
            <div className=" rounded-lg p-8 max-w-md shadow-md border border-slate-400">
                <Form {...form}>
                    <div className="sm:w-420 flex-center flex-col">
                        <h2 className="text-2xl text-center font-bold">
                            Admin Register
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

                            <Button
                                type="submit"
                                className="shad-button_primary"
                                disabled={isLoading}
                            >
                                Signup
                            </Button>
                            <p className="text-small text-light-2 text-center">
                                Already Have an Account ?
                                <Link
                                    to="/admin/login"
                                    className="text-primary-500 text-small-semibold ml-1 hover:underline"
                                >
                                    Log In
                                </Link>
                            </p>
                        </form>
                    </div>
                </Form>
            </div>
        </div>
    );
}
