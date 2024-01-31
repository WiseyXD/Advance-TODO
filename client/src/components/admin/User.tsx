import React from "react";

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

type TUserProps = {
    admin: boolean;
    email: string;
    id?: string;
    password: string;
    premium: boolean;
    __v: number;
    _id: string;
};

export default function User({ user }: TUserProps) {
    return (
        <div className="hover:bg-slate-500 hover:ease-in-out hover:duration-300">
            <CardHeader>
                <CardTitle>{user?.username}</CardTitle>
            </CardHeader>
            <CardFooter className="flex flex-col gap-2 items-start">
                <p>{user.email}</p>
                <p>Normal User</p>
            </CardFooter>
            <Separator />
        </div>
    );
}
