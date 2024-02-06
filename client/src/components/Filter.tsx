import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

type Todos = [] | null;

type TFilterProps = {
    todos: Todos;
    setTodos: React.Dispatch<React.SetStateAction<Todos>>;
};

type Todo = {
    adminGiven: boolean;
    title: string;
    description: string;
    _id: string;
    resources: [name: string, link: string];
    completed: boolean;
    priority: "high" | "mid" | "low";
};
export default function Filter({ todos, setTodos }: TFilterProps) {
    const filteredTodos = (type: string) => {
        if (type === "all") return todos;
        return todos?.filter(
            (todo: Todo) => todo.completed === (type === "true")
        );
    };
    function setFilteredTodos(type: string) {
        const newTodos: any = filteredTodos(type);
        setTodos(newTodos);
    }
    return (
        <div className="flex gap-3">
            <Select
                onValueChange={(value) => {
                    setFilteredTodos(value);
                }}
            >
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="All" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="true">Completed</SelectItem>
                    <SelectItem value="false">Incompleted</SelectItem>
                </SelectContent>
            </Select>
        </div>
    );
}
