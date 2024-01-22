import React from "react";

type TResources = {
    name: string;
    link: string;
};

export default function ListItem({ name, link }: TResources) {
    return (
        <li className="flex justify-between">
            <p className="text-md font-semibold">{name}</p>
            <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
            >
                Link
            </a>
        </li>
    );
}
