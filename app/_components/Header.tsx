"use client";
import { Button } from "@/components/ui/button";
import { SignInButton, UserButton, useUser } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const menuOptions = [
    {
        name: "Home",
        path: "/",
    },
    {
        name: "Pricing",
        path: "/pricing",
    },
    {
        name: "Contact us",
        path: "/contact-us",
    },
];

function Header() {
    const { user } = useUser();
    return (
        <div className="flex justify-between items-center p-4 shadow">
            {/* Logo */}
            <div className="flex gap-2 items-center">
                <Image src={"/logo.svg"} alt="Logo" width={30} height={30} />
                <h2 className="font-bold text-2xl ">TravelZero</h2>
            </div>
            {/* Menu Options */}
            <div className="flex gap-8 items-center">
                {menuOptions.map((menu, index) => (
                    <Link href={menu.path} key={index}>
                        <h2 className="font-lg hover:scale-105 transition-all hover:text-primary">
                            {menu.name}
                        </h2>
                    </Link>
                ))}
            </div>
            {/* Get Started Button */}
            <div className="flex items-center gap-5">
                {!user ? (
                    <SignInButton mode="modal">
                        <Button className="cursor-pointer">Get Started</Button>
                    </SignInButton>
                ) : (
                    <Link href={"/create-new-trip"}>
                        <Button className="cursor-pointer">Create New Trip</Button>
                    </Link>
                )}
                <UserButton />
            </div>
        </div>
    );
}

export default Header;
