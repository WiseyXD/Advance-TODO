import React, { useState } from "react";
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
    const userId = useSelector((state) => state.root.currentUser._id);
    const [selectedUserId, setSelectedUserId] = useState<string | null>(userId);
    const dispatch = useDispatch();
    function selectUser(user) {
        dispatch(setUser(user));
        setSelectedUserId(user._id);
    }

    return (
        <div className="pr-3">
            <h1 className="text-3xl">Users</h1>
            <ScrollArea>
                {users.map((user) => (
                    <div
                        onClick={() => selectUser(user)}
                        className={user._id === selectedUserId && "underline"}
                        role="button"
                    >
                        <User user={user} />
                    </div>
                ))}
            </ScrollArea>
        </div>
    );
}
