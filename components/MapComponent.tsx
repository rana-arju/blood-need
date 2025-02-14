"use client";

import { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useTheme } from "next-themes";

// Fix Leaflet default icon paths
const iconUrl = "/leaflet/marker-icon.png";
const iconRetinaUrl = "/leaflet/marker-icon-2x.png";
const shadowUrl = "/leaflet/marker-shadow.png";

// Define default icon once
const DefaultIcon = L.icon({
  iconUrl,
  iconRetinaUrl,
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

// Set default icon globally
L.Marker.prototype.options.icon = DefaultIcon;

interface BloodDrive {
  id: string;
  name: string;
  date: string;
  location: string;
  coordinates: [number, number];
}

interface MapComponentProps {
  bloodDrives: BloodDrive[];
}

export default function MapComponent({ bloodDrives }: MapComponentProps) {
  const mapRef = useRef<L.Map | null>(null);
  const markersRef = useRef<L.Marker[]>([]);
  const [isMounted, setIsMounted] = useState(false);
  const { theme } = useTheme();

  // Handle map tile layer based on theme
  const getTileLayer = () => {
    return theme === "dark"
      ? "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
      : "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
  };

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    // Initialize map if it doesn't exist
    if (!mapRef.current) {
      mapRef.current = L.map("map", {
        center: [40.7128, -74.006],
        zoom: 10,
        layers: [
          L.tileLayer(getTileLayer(), {
            attribution:
              '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
          }),
        ],
      });
    }

    // Clear existing markers
    markersRef.current.forEach((marker) => marker.remove());
    markersRef.current = [];

    // Add new markers
    bloodDrives.forEach((drive) => {
      const marker = L.marker(drive.coordinates)
        .bindPopup(
          `
          <strong>${drive.name}</strong><br>
          Date: ${drive.date}<br>
          Location: ${drive.location}
        `,
          { closeButton: false }
        )
        .addTo(mapRef.current!);

      markersRef.current.push(marker);
    });

    // Update map view to fit all markers
    if (bloodDrives.length > 0) {
      const group = L.featureGroup(markersRef.current);
      mapRef.current.fitBounds(group.getBounds().pad(0.1));
    }

    // Cleanup function
    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [bloodDrives, isMounted, theme, getTileLayer]);

  // Add resize handler
  useEffect(() => {
    if (!mapRef.current) return;

    const handleResize = () => {
      mapRef.current?.invalidateSize();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  if (!isMounted) {
    return (
      <div className="h-full w-full bg-gray-100 dark:bg-gray-800 animate-pulse" />
    );
  }

  return <div id="map" className="h-full w-full z-0" />;
}
