import { useEffect } from "react";
import TodoCard from "../../components/TodoCard";
import { useToast } from "@/components/ui/use-toast";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store";
import { useGetAllTodosQuery } from "@/app/api/todoApi";
import NewTodoCard from "@/components/NewTodoCard";
import Shimmer from "@/components/Shimmer";

export default function Home() {
    const email = useSelector((state: RootState) => state.root.auth.email);
    const { toast } = useToast();
    useEffect(() => {
        toast({
            title: `Welcome Back ${email}`,
        });
    }, []);
    const { data, isFetching } = useGetAllTodosQuery();
    if (isFetching) return <Shimmer />;
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
