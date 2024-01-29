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
                <CardTitle>{user.email}</CardTitle>
            </CardHeader>
            <CardFooter>
                <p>Normal User</p>
            </CardFooter>
            <Separator />
        </div>
    );
}
