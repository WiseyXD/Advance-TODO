import TodoCard from "../TodoCard";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useGetAllTodosQuery } from "@/app/api/todoApi";
import NewTodoCard from "@/components/NewTodoCard";
import Shimmer from "@/components/Shimmer";

export default function AdminHome() {
    const { data, isFetching } = useGetAllTodosQuery();
    if (isFetching) return <Shimmer />;
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
                    <NewTodoCard />
                </div>
            </ScrollArea>
        </div>
    );
}
