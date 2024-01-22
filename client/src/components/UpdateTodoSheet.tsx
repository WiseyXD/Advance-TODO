import React, { useState } from "react";
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
import { Button } from "./ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "./ui/use-toast";
import { Pencil2Icon } from "@radix-ui/react-icons";
import { useUpdateTodoMutation } from "@/app/api/todoApi";

export type TUpdateTodoSheetProps = {
    title: string;
    description: string;
    _id: string;
};

export default function UpdateTodoSheet({
    title: existingTitle,
    description: existingDescription,
    _id,
}: TUpdateTodoSheetProps) {
    const [updateData, setUpdateData] = useState({
        title: existingTitle,
        description: existingDescription,
    });
    const { toast } = useToast();
    const [updateMutation] = useUpdateTodoMutation();
    async function handleUpdate() {
        try {
            if (updateData.description === "" || updateData.title === "") {
                throw Error("Please fill the value");
                return;
            }
            console.log(updateData);
            const { data } = await updateMutation({ _id, updateData });
            // console.log(data);
            toast({
                title: "Todo Updated",
                description: "Update all the changes",
            });
        } catch (error) {
            toast({
                title: "Updation Failed due " + error.message,
            });
        }
    }
    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant={"outline"}>
                    {" "}
                    <Pencil2Icon width="30" height="20" />
                </Button>
            </SheetTrigger>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>Edit Todo</SheetTitle>
                    <SheetDescription>
                        Make changes to your Todo here. Click save when you're
                        done.
                    </SheetDescription>
                </SheetHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="title" className="text-right">
                            Title
                        </Label>
                        <Input
                            id="title"
                            defaultValue={existingTitle}
                            className="col-span-3"
                            onChange={(e) =>
                                setUpdateData((prevData) => ({
                                    ...prevData,
                                    title: e.target.value,
                                }))
                            }
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="description" className="text-right">
                            Description
                        </Label>
                        <Input
                            id="description"
                            defaultValue={existingDescription}
                            className="col-span-3"
                            onChange={(e) =>
                                setUpdateData((prevData) => ({
                                    ...prevData,
                                    description: e.target.value,
                                }))
                            }
                        />
                    </div>
                </div>
                <SheetFooter>
                    <SheetClose asChild>
                        <Button
                            type="submit"
                            onClick={handleUpdate}
                            variant={"outline"}
                        >
                            Save changes
                        </Button>
                    </SheetClose>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    );
}
