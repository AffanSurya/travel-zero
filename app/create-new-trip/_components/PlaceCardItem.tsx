"use client";
import { Button } from "@/components/ui/button";
import { Clock, ExternalLink, Ticket } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Activity } from "./ChatBox";
import axios from "axios";

type Props = {
    activity: Activity;
};
function PlaceCardItem({ activity }: Props) {
    const [photoUrl, setPhotoUrl] = useState<string>();
    useEffect(() => {
        activity && GetGooglePlaceDetail();
    }, [activity]);

    const GetGooglePlaceDetail = async () => {
        const result = await axios.post("/api/google-place-detail", {
            placeName: activity.place_name + ":" + activity.place_address,
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
                    alt={activity ? activity.place_name : "activity-image"}
                    fill
                    className="shadow object-cover transition-transform duration-300 hover:scale-105"
                />
            </div>

            <div className="p-4">
                <h2 className="font-semibold text-lg line-clamp-2 ">{activity.place_name}</h2>
                <p className="text-gray-500 line-clamp-2">{activity.place_details}</p>
                <h2 className="flex items-center gap-2 text-blue-500 line-clamp-1 text-sm">
                    <Ticket /> {activity.ticket_pricing}
                </h2>
                <p className="flex gap-2 text-orange-400 line-clamp-1 text-sm">
                    <Clock /> {activity.best_time_to_visit}
                </p>

                <Link
                    href={"https://www.google.com/maps/search/?api=1&query=" + activity.place_name}
                    target="_blank"
                >
                    <Button size={"sm"} variant={"outline"} className="w-full mt-2 cursor-pointer">
                        View <ExternalLink />
                    </Button>
                </Link>
            </div>
        </div>
    );
}

export default PlaceCardItem;
