import React from "react";
import User from "./User";
import { ScrollArea } from "../ui/scroll-area";

type TUserListProps = [
    {
        admin: boolean;
        email: string;
        id?: string;
        password: string;
        premium: boolean;
        __v: number;
        _id: string;
    }
];

export default function UsersList({ users }: TUserListProps) {
    return (
        <div className="pr-3">
            <ScrollArea>
                {users.map((user) => {
                    return <User user={user} />;
                })}
            </ScrollArea>
        </div>
    );
}
