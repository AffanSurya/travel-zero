"use client";
import { Button } from "@/components/ui/button";
import { Timeline } from "@/components/ui/timeline";
import { ArrowLeft, Clock, ExternalLink, Star, Ticket, Wallet } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import HotelCardItem from "./HotelCardItem";
import PlaceCardItem from "./PlaceCardItem";
import { useTripDetail } from "@/app/provider";
import { TripInfo } from "./ChatBox";

function Itinerary() {
    const { tripDetailInfo, setTripDetailInfo } = useTripDetail();
    const [tripData, setTripData] = useState<TripInfo | null>(null);

    useEffect(() => {
        tripDetailInfo && setTripData(tripDetailInfo);
    }, [tripDetailInfo]);

    const data = tripData
        ? [
              {
                  title: "Hotels",
                  content: (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {tripData?.hotels.map((hotel, index) => (
                              <HotelCardItem key={index} hotel={hotel} />
                          ))}
                      </div>
                  ),
              },
              ...tripData?.itinerary.map((dayData, index) => ({
                  title: `Day ${dayData.day}`,
                  content: (
                      <div key={index}>
                          <p className="font-bold text-primary text-xl mb-2">
                              Best Time: {dayData.best_time_to_visit_day}
                          </p>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              {dayData?.activities.map((activity, index) => (
                                  <PlaceCardItem key={index} activity={activity} />
                              ))}
                          </div>
                      </div>
                  ),
              })),
          ]
        : [];

    return (
        <div className="relative w-full h-[83vh] overflow-auto">
            {tripData ? (
                <Timeline data={data} tripData={tripData} />
            ) : (
                <div>
                    <h2 className="flex gap-2 items-center absolute text-3xl bottom-20 left-20 text-white">
                        <ArrowLeft />
                        Getting to know you to build perfect trip here...
                    </h2>
                    <Image
                        src={"/trip.jpg"}
                        alt="trip"
                        width={"800"}
                        height={"400"}
                        className="w-full h-full object-cover rounded-3xl"
                    />
                </div>
            )}
        </div>
    );
}

export default Itinerary;
