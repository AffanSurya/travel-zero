"use client";
import React, { useEffect, useRef } from "react";
import maplibregl, { Marker, Popup } from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { useTripDetail } from "@/app/provider";
import { Activity, Itinerary } from "./ChatBox";

function GlobalMap() {
    const mapContainer = useRef<HTMLDivElement | null>(null);
    const mapref = useRef<maplibregl.Map | null>(null);
    const markersRef = useRef<Marker[]>([]); // Track markers for cleanup
    const { tripDetailInfo, setTripDetailInfo } = useTripDetail();

    // Initialize map once
    useEffect(() => {
        if (mapref.current || !mapContainer.current) {
            return;
        }

        mapref.current = new maplibregl.Map({
            container: mapContainer.current,
            style: "https://demotiles.maplibre.org/globe.json",
            center: [0, 0],
            zoom: 2,
        });

        mapref.current.addControl(new maplibregl.NavigationControl(), "top-right");

        return () => {
            markersRef.current.forEach((marker) => marker.remove());
            markersRef.current = [];
            mapref.current?.remove();
            mapref.current = null;
        };
    }, []);

    // Update markers when tripDetailInfo changes
    useEffect(() => {
        if (!mapref.current || !tripDetailInfo?.itinerary) {
            return;
        }

        // Clear existing markers
        markersRef.current.forEach((marker) => marker.remove());
        markersRef.current = [];

        // Add new markers
        tripDetailInfo.itinerary.forEach((itinerary: Itinerary, dayIndex: number) => {
            itinerary.activities.forEach((activity: Activity, activityIndex: number) => {
                // Create popup with rich content
                const popup = new Popup({ offset: 25 }).setHTML(`
                       <div class="p-2">
                                    <h3 class="font-semibold text-sm">${activity.place_name}</h3>
                                    <p class="text-xs text-gray-600">${activity.place_details}</p>
                                    <div class="mt-2 text-xs bg-blue-50 px-2 py-1 rounded">
                            Day ${itinerary.day} Activity ${activityIndex + 1}
                        </div>
                                </div>
                `);

                // Create marker with different colors for different days
                const markerColor = [
                    "#FF6B6B",
                    "#4ECDC4",
                    "#45B7D1",
                    "#96CEB4",
                    "#FFEAA7",
                    "#DDA0DD",
                    "#98D8C8",
                    "#F7DC6F",
                    "#BB8FCE",
                    "#85C1E9",
                ][dayIndex % 10];

                const marker = new Marker({ color: markerColor })
                    .setLngLat([activity.geo_coordinates.longitude, activity.geo_coordinates.latitude])
                    .setPopup(popup)
                    .addTo(mapref.current!);

                markersRef.current.push(marker);
            });
        });

        // Fit map to show all markers
        if (markersRef.current.length > 0) {
            const bounds = new maplibregl.LngLatBounds();
            markersRef.current.forEach((marker) => {
                bounds.extend(marker.getLngLat());
            });
            mapref.current.fitBounds(bounds, {
                padding: { top: 50, bottom: 50, left: 50, right: 50 },
                maxZoom: 15,
            });
        }
    }, [tripDetailInfo]);

    return <div ref={mapContainer} className="w-full h-[83vh] rounded-2xl"></div>;
}

export default GlobalMap;
