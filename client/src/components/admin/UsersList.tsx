import { useState } from "react";
import User from "./User";
import { ScrollArea } from "../ui/scroll-area";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "@/app/Slices/currentUserSlice";
import { RootState } from "@/app/store";

type TUser = {
    admin: boolean;
    email: string;
    password: string;
    premium: boolean;
    __v: number;
    _id: string;
    id?: string;
};

type TUserListProps = TUser[];

export default function UsersList({ users }: { users: TUserListProps }) {
    const userId = useSelector(
        (state: RootState) => state.root.currentUser._id
    );
    const [selectedUserId, setSelectedUserId] = useState<string | null>(userId);
    const dispatch = useDispatch();
    function selectUser(user: TUser) {
        dispatch(setUser(user));
        setSelectedUserId(user._id);
    }

    return (
        <div className="pr-3">
            <h1 className="text-3xl">Users</h1>
            <ScrollArea>
                {users.map((user) => (
                    <div
                        onClick={() => {
                            selectUser(user);
                        }}
                        // @ts-ignore
                        className={user._id === selectedUserId && "underline"}
                        role="button"
                    >
                        <User
                            // @ts-ignore
                            user={user}
                        />
                    </div>
                ))}
            </ScrollArea>
        </div>
    );
}
