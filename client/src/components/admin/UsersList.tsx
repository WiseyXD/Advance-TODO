import React from "react";
import User from "./User";
import { ScrollArea } from "../ui/scroll-area";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "@/app/Slices/currentUserSlice";

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
    const dispatch = useDispatch();
    function selectUser(user) {
        dispatch(setUser(user));
    }

    return (
        <div className="pr-3">
            <ScrollArea>
                {users.map((user) => (
                    <div onClick={() => selectUser(user)} role="button">
                        <User user={user} />
                    </div>
                ))}
            </ScrollArea>
        </div>
    );
}
