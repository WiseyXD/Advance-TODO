import React from "react";
import { Button } from "./ui/button";
import { useDispatch } from "react-redux";
import { unsetAuth } from "@/app/Slices/authSlice";
import { RootState } from "@/app/store";

import { ModeToggle } from "./mode-toggle";

type NavbarProps = {
    isAuthorized: null | string;
};

export default function Navbar({ isAuthorized }: NavbarProps) {
    const dispatch = useDispatch();
    async function handleLogout() {
        dispatch(unsetAuth());
    }
    // Use seprator component for navbar from shadcn
    return (
        <div className="flex justify-between items-center px-2 py-2 transition-opacity bg-opacity-75">
            <div className="text-2xl font-semibold">MasterNotes</div>
            {isAuthorized ? (
                <div className="flex gap-4">
                    <ModeToggle />
                    <Button onClick={handleLogout} variant={"outline"}>
                        Logout
                    </Button>
                </div>
            ) : (
                <div>
                    <Button variant={"outline"}>Signup</Button>
                </div>
            )}
        </div>
    );
}
