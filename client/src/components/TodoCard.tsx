import { useState } from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "./ui/button";
import { useToast } from "./ui/use-toast";
import { TrashIcon } from "@radix-ui/react-icons";
import {
    useCompletedTodoMutation,
    useDeleteTodoMutation,
} from "@/app/api/todoApi";
import UpdateTodoSheet from "./UpdateTodoSheet";
import Resources from "./Resources";

export type TTodoCardProps = {
    description: string;
    title: string;
    resources: [name: string, link: string];
    _id: string;
    completed: boolean;
};

export default function TodoCard({
    description,
    title,
    resources,
    _id,
    completed,
}: TTodoCardProps) {
    const [isCompleted, setIsCompleted] = useState(completed);
    const { toast } = useToast();
    const [completedMutation] = useCompletedTodoMutation();
    const [deleteMutation] = useDeleteTodoMutation();
    async function handleDelete() {
        const { data } = await deleteMutation(_id);
        toast({
            title: "Todo Deleted",
        });
    }

    async function handleCompleted() {
        try {
            const { data } = await completedMutation(_id);
            await setIsCompleted(data.completed);
            toast({
                title: data.completed
                    ? `${title} Completed Wohh!`
                    : `${title} to be done.`,
            });
        } catch (error) {
            toast({
                title: "Updation Failed due to Server error.",
            });
        }
    }

    return (
        <Card className="transition duration-100 ease-in-out ">
            <CardHeader className="flex flex-row justify-between">
                <div className="flex flex-col gap-1">
                    <CardTitle>{title}</CardTitle>
                    <CardDescription>{description}</CardDescription>
                </div>
                <Checkbox
                    onCheckedChange={handleCompleted}
                    checked={isCompleted}
                />
            </CardHeader>
            <CardContent>
                <Resources title={title} _id={_id} resources={resources} />
            </CardContent>
            <CardFooter className="flex justify-end gap-3">
                <UpdateTodoSheet
                    title={title}
                    description={description}
                    _id={_id}
                />
                <Button onClick={handleDelete} variant={"outline"}>
                    <TrashIcon width="30" height="20" />
                </Button>
            </CardFooter>
        </Card>
    );
}
