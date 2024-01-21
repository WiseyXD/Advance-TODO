import React from "react";
import SkeletonCard from "./SkeletonCard";

export default function Shimmer() {
    return (
        <div className="flex flex-col gap-3">
            <h1 className="text-3xl">Todos</h1>
            <div className="grid gap-2 md:grid-cols-2 xl:grid-cols-3">
                <SkeletonCard />
                <SkeletonCard />
                <SkeletonCard />
                <SkeletonCard />
                <SkeletonCard />
                <SkeletonCard />
                <SkeletonCard />
                <SkeletonCard />
                <SkeletonCard />
            </div>
        </div>
    );
}
