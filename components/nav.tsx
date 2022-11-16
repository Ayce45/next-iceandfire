import React from "react";
import Link from "next/link";

export default function Navigation() {
    return (
        <nav className="relative bg-white z-40">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
                <div className=" flex justify-between items-center  border-gray-100 py-6  md:space-x-10">
                    <div className="flex justify-start items-center gap-12"><Link
                        className="flex items-center"
                        href='/'><span
                        className="ml-2 text-2xl font-bold">Next <span className="text-indigo-600">Ice And Fire</span></span></Link>
                    </div>
                </div>
            </div>
        </nav>
    )
}

