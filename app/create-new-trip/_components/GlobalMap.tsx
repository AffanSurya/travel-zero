"use client";
import React, { useEffect, useRef } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";

function GlobalMap() {
    const mapContainer = useRef<HTMLDivElement | null>(null);
    const mapref = useRef<maplibregl.Map | null>(null);

    useEffect(() => {
        if (mapref.current) {
            return;
        }

        mapref.current = new maplibregl.Map({
            container: mapContainer.current ?? "", // container id
            style: "https://demotiles.maplibre.org/globe.json", // style URL
            center: [0, 0], // starting position [lng, lat]
            zoom: 2, // starting zoom
        });

        mapref.current.addControl(new maplibregl.NavigationControl(), "top-right");

        return () => {
            mapref.current?.remove();
            mapref.current = null;
        };
    }, []);

    return <div ref={mapContainer} className="w-full h-[83vh] rounded-2xl"></div>;
}

export default GlobalMap;
