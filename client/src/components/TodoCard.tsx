import React, { useState } from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
    SheetFooter,
    SheetClose,
    SheetOverlay,
    SheetPortal,
} from "@/components/ui/sheet";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "./ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "./ui/use-toast";
import { TrashIcon, Pencil2Icon } from "@radix-ui/react-icons";
import ListItem from "./ListItem";
import { useCompletedTodoMutation } from "@/app/api/todoApi";

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
    function handleDelete() {
        toast({
            title: "Todo Deleted",
        });
    }

    function handleUpdate() {
        toast({
            title: "Todo Updated",
            description: "Update all the changes",
        });
    }

    async function handleCompleted() {
        try {
            const { data } = await completedMutation(_id);
            console.log(data);
            setIsCompleted(data.completed);
            toast({
                title: isCompleted
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
        <Card className="hover:bg-gray-300 transition duration-100 ease-in-out ">
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
                <Dialog>
                    <DialogTrigger>
                        <Button>Check Resources</Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>{title}</DialogTitle>
                            <DialogDescription>
                                {resources && (
                                    <ul className="flex flex-col">
                                        {resources.map(({ name, link }, i) => {
                                            return (
                                                <ListItem
                                                    key={i}
                                                    name={name}
                                                    link={link}
                                                />
                                            );
                                        })}
                                    </ul>
                                )}
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button variant="outline">
                                            Add Resource
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-80">
                                        <div className="grid gap-4">
                                            <div className="space-y-2">
                                                <h4 className="font-medium leading-none">
                                                    New Resource
                                                </h4>
                                                <p className="text-sm text-muted-foreground">
                                                    Add a new resource link
                                                </p>
                                            </div>
                                            <div className="grid gap-2">
                                                <div className="grid grid-cols-3 items-center gap-4">
                                                    <Label htmlFor="name">
                                                        Name
                                                    </Label>
                                                    <Input
                                                        id="name"
                                                        placeholder="Resource Name"
                                                        className="col-span-2 h-8"
                                                    />
                                                </div>
                                                <div className="grid grid-cols-3 items-center gap-4">
                                                    <Label htmlFor="link">
                                                        Link
                                                    </Label>
                                                    <Input
                                                        id="link"
                                                        placeholder="Resource Link"
                                                        className="col-span-2 h-8"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </PopoverContent>
                                </Popover>
                            </DialogDescription>
                        </DialogHeader>
                    </DialogContent>
                </Dialog>
            </CardContent>
            <CardFooter className="flex justify-end gap-3">
                {/* <Button>
                    <Pencil2Icon width="30" height="20" />
                </Button> */}
                <Sheet>
                    <SheetTrigger asChild>
                        <Button>
                            {" "}
                            <Pencil2Icon width="30" height="20" />
                        </Button>
                    </SheetTrigger>
                    <SheetContent>
                        <SheetHeader>
                            <SheetTitle>Edit Todo</SheetTitle>
                            <SheetDescription>
                                Make changes to your Todo here. Click save when
                                you're done.
                            </SheetDescription>
                        </SheetHeader>
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="title" className="text-right">
                                    Title
                                </Label>
                                <Input
                                    id="title"
                                    value="TodoTitle"
                                    className="col-span-3"
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label
                                    htmlFor="description"
                                    className="text-right"
                                >
                                    Description
                                </Label>
                                <Input
                                    id="description"
                                    value="tododeascription"
                                    className="col-span-3"
                                />
                            </div>
                        </div>
                        <SheetFooter>
                            <SheetClose asChild>
                                <Button type="submit" onClick={handleUpdate}>
                                    Save changes
                                </Button>
                            </SheetClose>
                        </SheetFooter>
                    </SheetContent>
                </Sheet>
                <Button onClick={handleDelete}>
                    <TrashIcon width="30" height="20" />
                </Button>
            </CardFooter>
        </Card>
    );
}
