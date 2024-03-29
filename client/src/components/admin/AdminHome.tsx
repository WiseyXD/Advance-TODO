import TodoCard from "../TodoCard";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useGetAllTodosQuery } from "@/app/api/todoApi";
import NewTodoCard from "@/components/NewTodoCard";
import Shimmer from "@/components/Shimmer";
import Filter from "../Filter";
import { useEffect, useState } from "react";

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

export default function AdminHome() {
    const [ztodos, zSetTodos] = useState<Todos>(null);
    const { data, isFetching } = useGetAllTodosQuery(null);
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
                    <NewTodoCard />
                </div>
            </ScrollArea>
        </div>
    );
}
