import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
export default function SkeletonCard() {
    return (
        <Card className="hover:bg-gray-300 transition duration-100 ease-in-out ">
            <CardHeader className="flex flex-row justify-between">
                <div className="flex flex-col gap-1">
                    <CardTitle>
                        <Skeleton className="w-[250px] h-10" />
                    </CardTitle>
                    <CardDescription>
                        <Skeleton className="w-[150px] h-5" />
                    </CardDescription>
                </div>
            </CardHeader>
            <CardContent>
                <Skeleton className="w-[100px] h-8" />
            </CardContent>
            <CardFooter className="flex justify-end gap-3">
                <Skeleton className="w-[80px] h-10" />
                <Skeleton className="w-[80px] h-10" />
            </CardFooter>
        </Card>
    );
}
