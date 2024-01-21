import React from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "./ui/button";

export default function NewTodoCard() {
    return (
        <Card className="bg-gray-200 flex justify-center items-center">
            <Button>Add New Todo</Button>
        </Card>
    );
}
