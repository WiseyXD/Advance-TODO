import { useEffect } from "react";
import AdminHome from "../../components/admin/AdminHome";
import AllUsers from "./AllUsers";
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
        <div className="">
            <h1 className="text-3xl font-semibold">Dashboard</h1>
            <Tabs defaultValue="todos">
                <TabsList>
                    <TabsTrigger value="todos">Todos</TabsTrigger>
                    <TabsTrigger value="users">Users</TabsTrigger>
                </TabsList>
                <TabsContent value="todos">
                    <AdminHome />
                </TabsContent>
                <TabsContent value="users">
                    <AllUsers />
                </TabsContent>
            </Tabs>
        </div>
    );
}
