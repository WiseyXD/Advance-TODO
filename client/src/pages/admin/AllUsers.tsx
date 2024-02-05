import { useGetAllUsersQuery } from "@/app/api/adminActionApi";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from "@/components/ui/resizable";
import UsersList from "@/components/admin/UsersList";
import CurrentUserTodo from "@/components/admin/CurrentUserTodo";

export default function AllUsers() {
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
                    <CurrentUserTodo />
                </ResizablePanel>
            </ResizablePanelGroup>
        </>
    );
}
