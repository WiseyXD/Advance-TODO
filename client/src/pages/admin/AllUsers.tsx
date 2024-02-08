import { useGetAllUsersQuery } from "@/app/api/adminActionApi";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from "@/components/ui/resizable";
import UsersList from "@/components/admin/UsersList";
import CurrentUserTodo from "@/components/admin/CurrentUserTodo";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store";

export default function AllUsers() {
    const userId = useSelector(
        (state: RootState) => state.root.currentUser._id
    );
    const { data, isFetching } = useGetAllUsersQuery(null);
    if (isFetching) return <p>Loading ...</p>;
    const { users } = data;
    return (
        <>
            <ResizablePanelGroup direction="horizontal" className="flex gap-3 ">
                <ResizablePanel defaultSize={20} minSize={0} maxSize={20}>
                    <ScrollArea className="h-[80%]">
                        <UsersList users={users} />
                    </ScrollArea>
                </ResizablePanel>
                <ResizableHandle withHandle />
                <ResizablePanel>
                    {userId ? <CurrentUserTodo /> : "Select User"}
                </ResizablePanel>
            </ResizablePanelGroup>
        </>
    );
}
