import { CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function User({
    // @ts-ignore
    user,
}) {
    return (
        <div className="hover:bg-slate-500 hover:ease-in-out hover:duration-300">
            <CardHeader>
                <CardTitle>{user?.username}</CardTitle>
            </CardHeader>
            <CardFooter className="flex flex-col gap-2 items-start">
                <p>{user.email}</p>
                <p>Normal User</p>
            </CardFooter>
            <Separator />
        </div>
    );
}
