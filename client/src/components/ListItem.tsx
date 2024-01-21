import React from "react";

type TResources = {
    name: string;
    link: string;
};

export default function ListItem({ name, link }: TResources) {
    return (
        <li className="flex gap-3">
            <p>{name}</p>
            <a href={link} className="hover:underline">
                Link
            </a>
        </li>
    );
}
