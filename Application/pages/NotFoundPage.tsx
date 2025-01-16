import { Link } from "react-router-dom";
import React from "react";

export default function NotFoundPage() {
    return (
        <div className="flex flex-col gap-2">
            <h1>
                you've stumbled in a weird area....
            </h1>
            <h2>
                <Link to="/">come back...</Link>
            </h2>
        </div>
    );
}