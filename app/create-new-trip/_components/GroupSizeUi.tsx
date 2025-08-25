import { div } from "motion/react-client";
import React from "react";

export const SelectTravelesList = [
    {
        id: 1,
        title: "Just Me",
        desc: "A solo traveler in exploration",
        icon: "✈️",
        people: "1",
        color: "bg-blue-100 text-blue-600",
    },
    {
        id: 2,
        title: "A Couple",
        desc: "Two travelers in tandem",
        icon: "🥂",
        people: "2 People",
        color: "bg-pink-100 text-pink-600",
    },
    {
        id: 3,
        title: "Family",
        desc: "A group of fun loving adventurers",
        icon: "🏡",
        people: "3 to 5 People",
        color: "bg-orange-100 text-orange-600",
    },
    {
        id: 4,
        title: "Friends",
        desc: "A bunch of thrill-seekers",
        icon: "⛵",
        people: "5 to 10 People",
        color: "bg-teal-100 text-teal-600",
    },
];

function GroupSizeUi({ onSelectedOption }: any) {
    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 items-center mt-1">
            {SelectTravelesList.map((item, index) => (
                <div
                    key={index}
                    className="p-3 border rounded-2xl bg-white hover:border-primary cursor-pointer flex flex-col items-center text-center"
                    onClick={() => onSelectedOption(item.title + ": " + item.people)}
                >
                    <div className={`text-3xl p-3 rounded-full ${item.color}`}>{item.icon}</div>
                    <h2 className="text-lg font-semibold mt-2">{item.title}</h2>
                    <p className="text-sm text-gray-500 mt-1">{item.people}</p>
                </div>
            ))}
        </div>
    );
}

export default GroupSizeUi;
