import { useState } from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "./ui/button";
import { useToast } from "./ui/use-toast";
import { TrashIcon, PersonIcon } from "@radix-ui/react-icons";
import {
    useCompletedTodoMutation,
    useDeleteTodoMutation,
} from "@/app/api/todoApi";
import UpdateTodoSheet from "./UpdateTodoSheet";
import Resources from "./Resources";
import { useGetCurrentUserTodosQuery } from "@/app/api/adminActionApi";
import { useSelector } from "react-redux";

export type TTodoCardProps = {
    adminGiven: boolean;
    description: string;
    title: string;
    resources: [name: string, link: string];
    _id: string;
    completed: boolean;
    priority: string;
};

export default function TodoCard({
    adminGiven,
    description,
    title,
    resources,
    _id,
    completed,
    priority,
}: TTodoCardProps) {
    const userId = useSelector((state) => state.root.currentUser._id);
    const [isCompleted, setIsCompleted] = useState(completed);
    const { toast } = useToast();
    const [completedMutation] = useCompletedTodoMutation();
    const [deleteMutation] = useDeleteTodoMutation();
    const { refetch } = useGetCurrentUserTodosQuery(userId);
    async function handleDelete() {
        const { data } = await deleteMutation(_id);
        refetch();
        toast({
            title: "Todo Deleted",
        });
    }

    async function handleCompleted() {
        try {
            const { data } = await completedMutation(_id);
            setIsCompleted(data.completed);
            !isCompleted
                ? toast({
                      title: `${title} Completed Wohh!`,
                  })
                : toast({
                      title: `${title} to be done.`,
                  });
            refetch();
        } catch (error) {
            toast({
                title: "Updation Failed due to Server error.",
            });
        }
    }

    return (
        <TooltipProvider>
            <Card className="transition duration-100 ease-in-out ">
                <CardHeader className="flex flex-row justify-between">
                    <div className="flex flex-col gap-1">
                        <CardTitle>{title}</CardTitle>
                        <CardDescription>{description}</CardDescription>
                    </div>
                    <div className="flex justify-center items-center gap-4">
                        {adminGiven && (
                            <Tooltip>
                                <TooltipTrigger>
                                    <PersonIcon width={18} height={18} />
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Admin Given Todo</p>
                                </TooltipContent>
                            </Tooltip>
                        )}
                        <Checkbox
                            onCheckedChange={handleCompleted}
                            checked={isCompleted}
                        />
                    </div>
                </CardHeader>
                <CardContent>
                    <Resources title={title} _id={_id} resources={resources} />
                </CardContent>
                <CardFooter className="flex justify-end gap-3">
                    <UpdateTodoSheet
                        title={title}
                        description={description}
                        priority={priority}
                        _id={_id}
                    />
                    <Button onClick={handleDelete} variant={"outline"}>
                        <TrashIcon width="30" height="20" />
                    </Button>
                </CardFooter>
            </Card>
        </TooltipProvider>
    );
}
