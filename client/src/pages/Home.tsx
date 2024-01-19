import TodoCard from "@/components/TodoCard";

export default function Home() {
    return (
        <div className="flex flex-col gap-3">
            <h1 className="text-3xl">Todos</h1>
            <div className="grid gap-2 grid-cols-3">
                <TodoCard />
                <TodoCard />
                <TodoCard />
                <TodoCard />
                <TodoCard />
                <TodoCard />
                <TodoCard />
                <TodoCard />
                <TodoCard />
                <TodoCard />
                <TodoCard />
                <TodoCard />
            </div>
        </div>
    );
}
