import React from "react";
import { Button } from "./ui/button";
import { useDispatch } from "react-redux";
import { unsetAuth } from "@/app/Slices/authSlice";
import { RootState } from "@/app/store";

type NavbarProps = {
    isAuthorized: null | string;
};

export default function Navbar({ isAuthorized }: NavbarProps) {
    const dispatch = useDispatch();
    async function handleLogout() {
        dispatch(unsetAuth());
    }
    return (
        <div className="flex justify-between items-center px-2 py-2 bg-slate-600">
            <div className="text-2xl font-semibold">MasterNotes</div>
            {isAuthorized ? (
                <div>
                    <Button onClick={handleLogout}>Logout</Button>
                </div>
            ) : (
                <div>
                    <Button>Signup</Button>
                </div>
            )}
        </div>
    );
}
