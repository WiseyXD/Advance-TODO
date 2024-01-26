import React, { useEffect } from "react";
import AdminHome from "./AdminHome";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store";
import { useToast } from "@/components/ui/use-toast";
export default function AdminDashboard() {
    const email = useSelector((state: RootState) => state.root.auth.email);
    const { toast } = useToast();
    useEffect(() => {
        toast({
            title: `Welcome Back ${email}`,
        });
    }, []);
    return (
        <>
            <Tabs defaultValue="todos" className="">
                <TabsList>
                    <TabsTrigger value="todos">Todos</TabsTrigger>
                    <TabsTrigger value="users">Users</TabsTrigger>
                </TabsList>
                <TabsContent value="todos">
                    <AdminHome />
                </TabsContent>
                <TabsContent value="users">All uSers</TabsContent>
            </Tabs>
        </>
    );
}
