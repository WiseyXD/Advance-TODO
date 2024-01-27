import React from "react";
import { useGetAllUsersQuery } from "@/app/api/adminActionApi";
import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from "@/components/ui/resizable";
import UsersList from "@/components/admin/UsersList";
import CurrentUserTodo from "@/components/admin/CurrentUserTodo";

export default function AllUsers() {
    const { data, isFetching } = useGetAllUsersQuery();
    if (isFetching) return <p>Loading ...</p>;
    const { users } = data;
    return (
        <>
            <h1 className="text-3xl">Users</h1>
            <ResizablePanelGroup direction="horizontal">
                <ResizablePanel defaultSize={30} minSize={0} maxSize={35}>
                    <UsersList users={users} />
                </ResizablePanel>
                <ResizableHandle />
                <ResizablePanel>
                    <CurrentUserTodo />
                </ResizablePanel>
            </ResizablePanelGroup>
        </>
    );
}
