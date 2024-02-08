import TodoCard from "../../components/TodoCard";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store";
import Shimmer from "@/components/Shimmer";
import { useGetCurrentUserTodosQuery } from "@/app/api/adminActionApi";
import AdminNewTodoCard from "./AdminNewTodoCard";
import { useEffect, useState } from "react";
import Filter from "../Filter";

type Todos = [] | null;

type Todo = {
    adminGiven: boolean;
    title: string;
    description: string;
    _id: string;
    resources: [name: string, link: string];
    completed: boolean;
    priority: "high" | "mid" | "low";
    createdAt?: Date | null;
};

export default function Home() {
    const userId = useSelector(
        (state: RootState) => state.root.currentUser._id
    );
    const [ztodos, zSetTodos] = useState<Todos>(null);

    const { data, isFetching } = useGetCurrentUserTodosQuery(userId);
    useEffect(() => {
        if (!isFetching) {
            const { todos } = data;
            zSetTodos(todos);
        }
    }, [data, isFetching]);

    if (isFetching || ztodos == null) return <Shimmer />;

    return (
        <div className="flex flex-col gap-3">
            <div className="flex justify-between">
                <h1 className="text-3xl">Todos</h1>
                <Filter todos={data.todos} setTodos={zSetTodos} />
            </div>
            <ScrollArea className="h-[50rem] w-full">
                <div className="grid gap-2 md:grid-cols-2 xl:grid-cols-3">
                    {ztodos.map((todo: Todo) => {
                        return (
                            <TodoCard
                                key={todo._id}
                                adminGiven={todo.adminGiven}
                                title={todo.title}
                                description={todo.description}
                                _id={todo._id}
                                resources={todo.resources}
                                completed={todo.completed}
                                priority={todo.priority}
                                createdAt={
                                    todo.createdAt ? todo.createdAt : null
                                }
                            />
                        );
                    })}
                    <AdminNewTodoCard />
                </div>
            </ScrollArea>
        </div>
    );
}
