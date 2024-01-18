import React from "react";
import { Button } from "./ui/button";

type NavbarProps = {
    isAuthorized: boolean;
};

export default function Navbar({ isAuthorized }: NavbarProps) {
    return (
        <div className="flex justify-between items-center px-2 py-2 bg-slate-600">
            <div className="text-2xl font-semibold">MasterNotes</div>
            <div>
                <Button>Signup</Button>
            </div>
        </div>
    );
}
