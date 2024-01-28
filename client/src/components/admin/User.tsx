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
        <>
            <CardHeader>
                <CardTitle>{user.email}</CardTitle>
            </CardHeader>
            <CardFooter>
                <p>Normal User</p>
            </CardFooter>
            <Separator />
        </>
    );
}
