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

// const TRIP_DATA = {
//     destination: "Bali, Indonesia",
//     duration: "4 days",
//     origin: "Madiun, Indonesia",
//     budget: "Cheap (Budget-conscious)",
//     group_size: "4 people",
//     hotels: [
//         {
//             hotel_name: "The Kemenuh Boutique Villas",
//             hotel_address: "Jl. Raya Andong, Kemenuh, Sukawati, Gianyar",
//             price_per_night: "Rp 450,000/night (Private villa pool access)",
//             hotel_image_url: "https://example.com/hotel1.jpg",
//             geo_coordinates: {
//                 latitude: -8.6081,
//                 longitude: 115.2059,
//             },
//             rating: 4.3,
//             description: "Affordable pool villas near Ubud with breakfast included. 30 mins to beaches.",
//         },
//         {
//             hotel_name: "Pondok Krishna Homestay",
//             hotel_address: "Jalan Pantai Kuta, Kuta",
//             price_per_night: "Rp 300,000/night (AC rooms with private bathroom)",
//             hotel_image_url: "https://example.com/hotel2.jpg",
//             geo_coordinates: {
//                 latitude: -8.7223,
//                 longitude: 115.1717,
//             },
//             rating: 4.1,
//             description: "Simple clean rooms in central Kuta. 5 mins walk to beach.",
//         },
//         {
//             hotel_name: "Artotel Sanur",
//             hotel_address: "Jalan Camplung Tanduk, Sanur",
//             price_per_night: "Rp 550,000/night (Contemporary design rooms)",
//             hotel_image_url: "https://example.com/hotel3.jpg",
//             geo_coordinates: {
//                 latitude: -8.6864,
//                 longitude: 115.2622,
//             },
//             rating: 4.4,
//             description: "Hip budget hotel with pool near Sanur Beach. Includes breakfast.",
//         },
//     ],
//     itinerary: [
//         {
//             day: 1,
//             day_plan: "Arrival + Kuta Exploration",
//             best_time_to_visit_day: "Evening (5-8 PM)",
//             activities: [
//                 {
//                     place_name: "Kuta Beach",
//                     place_details: "Famous sunset beach with surf schools",
//                     place_image_url: "https://example.com/kuta.jpg",
//                     geo_coordinates: {
//                         latitude: -8.7228,
//                         longitude: 115.1725,
//                     },
//                     place_address: "Jalan Pantai Kuta, Kuta",
//                     ticket_pricing: "Free",
//                     time_travel_each_location: "From airport: 20 mins",
//                     best_time_to_visit: "Sunset hours (5:30-6:30 PM)",
//                 },
//                 {
//                     place_name: "Beachwalk Shopping Center",
//                     place_details: "Open-air mall with affordable food court",
//                     place_image_url: "https://example.com/beachwalk.jpg",
//                     geo_coordinates: {
//                         latitude: -8.7214,
//                         longitude: 115.1703,
//                     },
//                     place_address: "Jl. Pantai Kuta, Kuta",
//                     ticket_pricing: "Free entry",
//                     time_travel_each_location: "5 mins walk from Kuta Beach",
//                     best_time_to_visit: "Evening (7-10 PM)",
//                 },
//             ],
//         },
//         {
//             day: 2,
//             day_plan: "Uluwatu Coastal Adventure",
//             best_time_to_visit_day: "Morning (8-11 AM)",
//             activities: [
//                 {
//                     place_name: "Padang Padang Beach",
//                     place_details: "Iconic white-sand beach featured in Eat Pray Love",
//                     place_image_url: "https://example.com/padangpadang.jpg",
//                     geo_coordinates: {
//                         latitude: -8.8422,
//                         longitude: 115.0869,
//                     },
//                     place_address: "Jl. Labuansait, Pecatu",
//                     ticket_pricing: "Rp 15,000/person",
//                     time_travel_each_location: "45 mins from Kuta",
//                     best_time_to_visit: "Morning (before 10 AM)",
//                 },
//                 {
//                     place_name: "Uluwatu Temple",
//                     place_details: "Clifftop Hindu sea temple with Kecak fire dance",
//                     place_image_url: "https://example.com/uluwatu.jpg",
//                     geo_coordinates: {
//                         latitude: -8.8292,
//                         longitude: 115.085,
//                     },
//                     place_address: "Pecatu, South Kuta",
//                     ticket_pricing: "Rp 50,000/person (including sarong rental)",
//                     time_travel_each_location: "10 mins from Padang Padang",
//                     best_time_to_visit: "Sunset (5:30 PM) for Kecak dance",
//                 },
//             ],
//         },
//         {
//             day: 3,
//             day_plan: "Nusa Dua Beach Day",
//             best_time_to_visit_day: "All day beach visit",
//             activities: [
//                 {
//                     place_name: "Geger Beach",
//                     place_details: "Clean white sand beach with calm waters for swimming",
//                     place_image_url: "https://example.com/geger.jpg",
//                     geo_coordinates: {
//                         latitude: -8.7922,
//                         longitude: 115.2325,
//                     },
//                     place_address: "BTDC Area, Nusa Dua",
//                     ticket_pricing: "Free (Rp 5,000 parking)",
//                     time_travel_each_location: "40 mins from Kuta",
//                     best_time_to_visit: "Morning to afternoon",
//                 },
//                 {
//                     place_name: "Warung Bambu",
//                     place_details: "Local seafood restaurant with beachfront dining",
//                     place_image_url: "https://example.com/bambu.jpg",
//                     geo_coordinates: {
//                         latitude: -8.7855,
//                         longitude: 115.2357,
//                     },
//                     place_address: "Jl. Pantai Mengiat, Nusa Dua",
//                     ticket_pricing: "Rp 50,000-100,000/meal",
//                     time_travel_each_location: "5 mins from Geger Beach",
//                     best_time_to_visit: "Lunch (12-2 PM)",
//                 },
//             ],
//         },
//         {
//             day: 4,
//             day_plan: "Sanur & Cultural Experience",
//             best_time_to_visit_day: "Early morning for sunrise",
//             activities: [
//                 {
//                     place_name: "Sanur Beach Sunrise",
//                     place_details: "Famous sunrise spot with long beach promenade",
//                     place_image_url: "https://example.com/sanur.jpg",
//                     geo_coordinates: {
//                         latitude: -8.6833,
//                         longitude: 115.2589,
//                     },
//                     place_address: "Jalan Duyung, Sanur",
//                     ticket_pricing: "Free",
//                     time_travel_each_location: "35 mins from Ubud",
//                     best_time_to_visit: "Sunrise (6 AM)",
//                 },
//                 {
//                     place_name: "Le Mayeur Museum",
//                     place_details: "Former home of Belgian artist Adrian Le Mayeur",
//                     place_image_url: "https://example.com/lemayeur.jpg",
//                     geo_coordinates: {
//                         latitude: -8.6809,
//                         longitude: 115.2628,
//                     },
//                     place_address: "Jl. Hang Tuah, Sanur",
//                     ticket_pricing: "Rp 50,000/person",
//                     time_travel_each_location: "10 mins walk from beach",
//                     best_time_to_visit: "Morning (9 AM - 12 PM)",
//                 },
//             ],
//         },
//         {
//             day: 5,
//             day_plan: "Ubud Cultural Exploration",
//             best_time_to_visit_day: "Morning (cooler temperatures)",
//             activities: [
//                 {
//                     place_name: "Sacred Monkey Forest",
//                     place_details: "Nature reserve with Hindu temples and monkeys",
//                     place_image_url: "https://example.com/monkey.jpg",
//                     geo_coordinates: {
//                         latitude: -8.5189,
//                         longitude: 115.2589,
//                     },
//                     place_address: "Jalan Monkey Forest, Ubud",
//                     ticket_pricing: "Rp 80,000/person",
//                     time_travel_each_location: "1 hour from Sanur",
//                     best_time_to_visit: "Opening hours (8:30 AM)",
//                 },
//                 {
//                     place_name: "Tegalalang Rice Terrace",
//                     place_details: "Iconic layered rice fields with swing photos",
//                     place_image_url: "https://example.com/tegalalang.jpg",
//                     geo_coordinates: {
//                         latitude: -8.4232,
//                         longitude: 115.2989,
//                     },
//                     place_address: "Jalan Raya Tegallalang",
//                     ticket_pricing: "Rp 25,000/person",
//                     time_travel_each_location: "30 mins from Monkey Forest",
//                     best_time_to_visit: "Morning (7-10 AM)",
//                 },
//             ],
//         },
//         {
//             day: 6,
//             day_plan: "Jimbaran Seafood & Relaxation",
//             best_time_to_visit_day: "Evening sunset",
//             activities: [
//                 {
//                     place_name: "Jimbaran Bay Beach",
//                     place_details: "Famous for seafood dinner on the beach",
//                     place_image_url: "https://example.com/jimbaran.jpg",
//                     geo_coordinates: {
//                         latitude: -8.7856,
//                         longitude: 115.1592,
//                     },
//                     place_address: "Jalan Bukit Permai, Jimbaran",
//                     ticket_pricing: "Free beach access",
//                     time_travel_each_location: "40 mins from Ubud",
//                     best_time_to_visit: "Sunset (5:30 PM)",
//                 },
//                 {
//                     place_name: "Warung Made (Local Seafood)",
//                     place_details: "Budget-friendly seafood barbecue on the sand",
//                     place_image_url: "https://example.com/warungmade.jpg",
//                     geo_coordinates: {
//                         latitude: -8.787,
//                         longitude: 115.1598,
//                     },
//                     place_address: "Jimbaran Beach, Kedonganan",
//                     ticket_pricing: "Rp 100,000-150,000/person meal",
//                     time_travel_each_location: "On the beach",
//                     best_time_to_visit: "Dinner time (6-8 PM)",
//                 },
//             ],
//         },
//         {
//             day: 7,
//             day_plan: "Departure + Last Shopping",
//             best_time_to_visit_day: "Morning market visit",
//             activities: [
//                 {
//                     place_name: "Krisna Oleh-Oleh",
//                     place_details: "Best budget souvenir shop with Bali specialties",
//                     place_image_url: "https://example.com/krisna.jpg",
//                     geo_coordinates: {
//                         latitude: -8.7189,
//                         longitude: 115.1725,
//                     },
//                     place_address: "Jl. By Pass Ngurah Rai, Kuta",
//                     ticket_pricing: "Free entry",
//                     time_travel_each_location: "20 mins from Jimbaran",
//                     best_time_to_visit: "Morning (9-11 AM)",
//                 },
//                 {
//                     place_name: "Bali Airport Departures",
//                     place_details: "Ngurah Rai International Airport",
//                     place_image_url: "https://example.com/airport.jpg",
//                     geo_coordinates: {
//                         latitude: -8.7482,
//                         longitude: 115.1671,
//                     },
//                     place_address: "Jl. Airport Ngurah Rai, Tuban",
//                     ticket_pricing: "Airport tax included in ticket",
//                     time_travel_each_location: "15 mins from Kuta",
//                     best_time_to_visit: "3 hours before flight",
//                 },
//             ],
//         },
//     ],
// };

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
                          <p>Best Time: {dayData.best_time_to_visit_day}</p>
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
