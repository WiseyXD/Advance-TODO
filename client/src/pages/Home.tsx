import { useEffect } from "react";
import TodoCard from "../components/TodoCard";
import { useToast } from "@/components/ui/use-toast";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store";
import { useGetAllTodosQuery } from "@/app/api/todoApi";

export default function Home() {
    const email = useSelector((state: RootState) => state.root.auth.email);
    const { toast } = useToast();
    useEffect(() => {
        toast({
            title: `Welcome Back ${email}`,
        });
    }, []);
    const { data, isFetching } = useGetAllTodosQuery();
    if (isFetching) return <p>Loading</p>;
    const { todos } = data;

    return (
        <div className="flex flex-col gap-3">
            <h1 className="text-3xl">Todos</h1>
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
            </div>
        </div>
    );
}
