import TodoCard from "../../components/TodoCard";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store";
import NewTodoCard from "@/components/NewTodoCard";
import Shimmer from "@/components/Shimmer";
import {
    useCreateAdminTodoMutation,
    useGetCurrentUserTodosQuery,
} from "@/app/api/adminActionApi";
import AdminNewTodoCard from "./AdminNewTodoCard";

export default function Home() {
    const userId = useSelector((state) => state.root.currentUser._id);
    const { data, isFetching } = useGetCurrentUserTodosQuery(userId);
    if (isFetching) return <Shimmer />;
    console.log(data);
    if (!data) return <Shimmer />;
    const { todos } = data;

    return (
        <div className="flex flex-col gap-3">
            <h1 className="text-3xl">Todos</h1>
            <ScrollArea className="h-[50rem] w-full">
                <div className="grid gap-2 md:grid-cols-2 xl:grid-cols-3">
                    {todos.map((todo) => {
                        return (
                            <TodoCard
                                key={todo._id}
                                title={todo.title}
                                description={todo.description}
                                _id={todo._id}
                                resources={todo.resources}
                                completed={todo.completed}
                            />
                        );
                    })}
                    <AdminNewTodoCard />
                </div>
            </ScrollArea>
        </div>
    );
}
