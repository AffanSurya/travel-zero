"use client";
import { Button } from "@/components/ui/button";
import { Star, Wallet, MapPin, ExternalLink } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Hotel } from "./ChatBox";
import axios from "axios";

type Props = {
    hotel: Hotel;
};

function HotelCardItem({ hotel }: Props) {
    const [photoUrl, setPhotoUrl] = useState<string>();
    useEffect(() => {
        hotel && GetGooglePlaceDetail();
    }, [hotel]);

    const GetGooglePlaceDetail = async () => {
        const result = await axios.post("/api/google-place-detail", {
            placeName: hotel.hotel_name + ":" + hotel.hotel_address,
        });

        if (result.data.error) {
            return;
        }
        setPhotoUrl(result?.data);
    };

    return (
        <div className="flex flex-col gap-1 max-w-xs w-full bg-white border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.01] rounded-2xl">
            {/* Image container */}
            <div className="relative w-full h-48 overflow-hidden rounded-t-2xl">
                <Image
                    src={photoUrl ? photoUrl : "/placeholder.jpg"}
                    alt={hotel ? hotel.hotel_name : "hotel-image"}
                    fill
                    className="shadow object-cover transition-transform duration-300 hover:scale-105"
                />

                {/* Rating Badge */}
                <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm px-2 py-1 rounded-full shadow-md">
                    <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        <span className="text-sm font-semibold text-gray-800">{hotel?.rating}</span>
                    </div>
                </div>
            </div>

            {/* Content container */}
            <div className="p-4">
                <h2 className="font-semibold text-lg line-clamp-2 ">{hotel?.hotel_name}</h2>

                <h2 className="text-gray-500 text-sm line-clamp-2 min-h-[2.5rem]">{hotel?.hotel_address}</h2>

                <p className="flex gap-2 text-green-600 text-sm line-clamp-2">
                    <Wallet /> {hotel?.price_per_night}
                </p>

                <Link
                    href={"https://www.google.com/maps/search/?api=1&query=" + hotel.hotel_name}
                    target="_blank"
                >
                    <Button variant={"outline"} className="mt-1 w-full cursor-pointer">
                        View <ExternalLink />
                    </Button>
                </Link>
            </div>
            {/* <p className="line-clamp-2 text-gray-500 text-sm">{hotel.description}</p> */}
        </div>
    );
}

export default HotelCardItem;
