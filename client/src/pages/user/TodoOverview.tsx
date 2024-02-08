import { useEffect } from "react";
// import { useParams } from "react-router-dom";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { TrashIcon, Pencil2Icon } from "@radix-ui/react-icons";

export default function TodoOverview() {
    // const { todoId } = useParams();
    // Fetch api for tasks (preload using RTK query)

    useEffect(() => {
        // set the state from api
    }, []);
    return (
        <>
            <div className="flex justify-between my-3">
                <h1 className="text-3xl font-semibold">Todo Overview</h1>
                <div className="flex flex-col gap-2">
                    <h1 className="text-2xl font-semibold">Todo Title</h1>
                    <h3 className="text-xl ">Todo Description</h3>
                </div>
                <div className="flex flex-col gap-2">
                    <div className="flex gap-2">
                        <p>Admin Given</p>
                        <p>Priority</p>
                    </div>
                    Date of Creation
                </div>
            </div>
            <Separator />
            <div className="my-3">
                <div className="flex justify-between">
                    <h3 className="text-xl">Tasks</h3>
                    <Button variant={"default"}>Add New Task</Button>
                </div>
                {/* tasks.map((task))=>accordian */}
                <Accordion type="single" collapsible orientation="vertical">
                    <AccordionItem value="item-1">
                        <AccordionTrigger>
                            <h3 className="text-lg">Task Title</h3>
                        </AccordionTrigger>
                        <AccordionContent>
                            <div className="flex justify-between">
                                <p>Task Desc</p>
                                <div className="flex gap-2">
                                    <Button variant={"outline"}>
                                        <TrashIcon />
                                    </Button>
                                    <Button variant={"outline"}>
                                        <Pencil2Icon />
                                    </Button>
                                </div>
                            </div>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </div>
        </>
    );
}
