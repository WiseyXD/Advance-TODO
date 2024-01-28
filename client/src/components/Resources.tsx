import React, { useState } from "react";
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
import { Button } from "./ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast, useToast } from "./ui/use-toast";
import ListItem from "./ListItem";
import { useUpdateResourceTodoMutation } from "@/app/api/todoApi";
import { useGetCurrentUserTodosQuery } from "@/app/api/adminActionApi";
import { useSelector } from "react-redux";

type TResourceProps = {
    title: string;
    _id: string;
    resources: [
        {
            name: string;
            link: string;
        }
    ];
};

export default function Resources({ title, _id, resources }: TResourceProps) {
    const userId = useSelector((state) => state.root.currentUser._id);
    const [resource, setResource] = useState({
        name: "",
        link: "",
    });

    const [resourceMutation] = useUpdateResourceTodoMutation();
    const { refetch } = useGetCurrentUserTodosQuery(userId);
    async function handleSubmit() {
        try {
            if (resource.name === "" || resource.link === "") {
                toast({
                    title: "Please fill in all the fields",
                    variant: "destructive",
                });
                return;
            }
            const { data } = await resourceMutation({ _id, resource });
            console.log(data);
            toast({
                title: resource.name + "resource Added Successfully",
            });
            refetch();
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Dialog>
            <DialogTrigger>
                <Button variant={"outline"}>Check Resources</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    <DialogDescription>
                        {resources && (
                            <ul className="flex flex-col pt-1 pb-2">
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
                                <Button variant="outline">Add Resource</Button>
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
                                            <Label htmlFor="name">Name</Label>
                                            <Input
                                                id="name"
                                                placeholder="Resource Name"
                                                className="col-span-2 h-8"
                                                defaultValue={resource.name}
                                                onChange={(e) => {
                                                    setResource((prevData) => ({
                                                        ...prevData,
                                                        name: e.target.value,
                                                    }));
                                                }}
                                            />
                                        </div>
                                        <div className="grid grid-cols-3 items-center gap-4">
                                            <Label htmlFor="link">Link</Label>
                                            <Input
                                                id="link"
                                                placeholder="Resource Link"
                                                className="col-span-2 h-8"
                                                defaultValue={resource.link}
                                                onChange={(e) => {
                                                    setResource((prevData) => ({
                                                        ...prevData,
                                                        link: e.target.value,
                                                    }));
                                                }}
                                            />
                                        </div>
                                        <div className="grid grid-cols-1 items-center">
                                            <Button
                                                onClick={handleSubmit}
                                                variant={"outline"}
                                            >
                                                Add
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </PopoverContent>
                        </Popover>
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
}
