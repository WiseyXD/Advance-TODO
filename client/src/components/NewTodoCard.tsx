import { useState } from "react";
import { Card } from "@/components/ui/card";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import { useToast } from "./ui/use-toast";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "@radix-ui/react-label";
import { useCreateTodoMutation } from "@/app/api/todoApi";

export default function NewTodoCard() {
    const [newTodoData, setNewTodoData] = useState({
        title: "",
        description: "",
        priority: "mid",
    });
    const [resourceData, setResourceData] = useState({
        name: "",
        link: "",
    });
    const [createMutation] = useCreateTodoMutation();
    const { toast } = useToast();
    async function handleSubmit() {
        try {
            if (
                newTodoData.title === "" ||
                newTodoData.description === "" ||
                newTodoData.priority === "" ||
                resourceData.link === "" ||
                resourceData.name === ""
            ) {
                toast({
                    title: "Please fill all the fields",
                    variant: "destructive",
                });
                return;
            }
            const newTodo = {
                title: newTodoData.title,
                description: newTodoData.description,
                priority: newTodoData.priority,
                resource: resourceData,
            };
            // @ts-ignore
            const { data } = await createMutation(newTodo);
            console.log(data);
            if (typeof data.response === "string") {
                throw Error("Free tier users can only create 10 Todos");
            }
            toast({
                title: "Todo Created",
                description: newTodoData.title,
            });
        } catch (error) {
            toast({
                title: "Error Occured while creating a new Todo , only 10 Todo can be created in free tier",
                variant: "destructive",
            });
        }
    }
    return (
        <Card className="flex justify-center items-center h-[230px]">
            <Dialog>
                <DialogTrigger asChild>
                    <Button>Add New Todo</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>New Todo</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="Title" className="text-right">
                                Title
                            </Label>
                            <Input
                                id="title"
                                className="col-span-3"
                                defaultValue={newTodoData.title}
                                onChange={(e) => {
                                    setNewTodoData((prevData) => ({
                                        ...prevData,
                                        title: e.target.value,
                                    }));
                                }}
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="description" className="text-right">
                                Description
                            </Label>
                            <Input
                                id="description"
                                className="col-span-3"
                                defaultValue={newTodoData.description}
                                onChange={(e) => {
                                    setNewTodoData((prevData) => ({
                                        ...prevData,
                                        description: e.target.value,
                                    }));
                                }}
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="resource" className="text-right">
                                Resource Name
                            </Label>

                            <Input
                                id="resource-name"
                                className="col-span-3"
                                defaultValue={resourceData.name}
                                onChange={(e) => {
                                    setResourceData((prevData) => ({
                                        ...prevData,
                                        name: e.target.value,
                                    }));
                                }}
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label
                                htmlFor="resource-link"
                                className="text-right"
                            >
                                Resource Link
                            </Label>
                            <Input
                                id="resource-link"
                                className="col-span-3"
                                defaultValue={resourceData.link}
                                onChange={(e) => {
                                    setResourceData((prevData) => ({
                                        ...prevData,
                                        link: e.target.value,
                                    }));
                                }}
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="priority" className="text-right">
                                Priority
                            </Label>
                            <Select
                                onValueChange={(value) => {
                                    setNewTodoData((prevData) => ({
                                        ...prevData,
                                        priority: value,
                                    }));
                                }}
                                defaultValue={newTodoData.priority}
                            >
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Mid" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="high">High</SelectItem>
                                    <SelectItem value="mid">Mid</SelectItem>
                                    <SelectItem value="low">Low</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button
                            type="submit"
                            onClick={handleSubmit}
                            variant={"outline"}
                        >
                            Add
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </Card>
    );
}
