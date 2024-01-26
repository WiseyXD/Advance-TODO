import React from "react";
import { useGetAllUsersQuery } from "@/app/api/adminActionApi";

export default function AllUsers() {
    const { data, isFetching } = useGetAllUsersQuery();
    if (isFetching) return <p>Loading ...</p>;
    const { users } = data;
    console.log(users);
    return <div>All Users</div>;
}
