// "use client";
import { Button } from "@/components/ui/button";
import { Minus, Plus } from "lucide-react";
import React, { useState } from "react";

function SelectDaysUi({ onSelectedOption }: any) {
    const [count, setCount] = useState(1);

    const incrementCount = () => {
        if (count < 30) setCount(count + 1);
    };

    const decrementCount = () => {
        if (count > 1) setCount(count - 1);
    };

    const handleConfirm = () => {
        onSelectedOption(`${count} ${count === 1 ? "day" : "days"}`);
    };

    return (
        <div className="flex flex-col items-center space-y-6 mt-4 bg-white rounded-2xl p-4">
            <div className="text-center">
                <h2 className="text-lg font-semibold text-gray-800 mb-2">
                    How many days do you want to travel?
                </h2>
            </div>

            <div className="flex items-center gap-4">
                <Button
                    variant="outline"
                    size="icon"
                    onClick={decrementCount}
                    disabled={count <= 1}
                    className="h-12 w-12 rounded-full cursor-pointer border-gray-300 hover:border-primary hover:bg-primary hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <Minus className="h-4 w-4" />
                </Button>

                <div className="flex flex-col items-center min-w-[100px]">
                    <span className="text-3xl font-bold text-primary">{count}</span>
                    <span className="text-sm text-gray-600 font-medium">{count === 1 ? "Day" : "Days"}</span>
                </div>

                <Button
                    variant="outline"
                    size="icon"
                    onClick={incrementCount}
                    disabled={count >= 30}
                    className="h-12 w-12 rounded-full border-gray-300 hover:border-primary hover:bg-primary hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <Plus className="h-4 w-4" />
                </Button>
            </div>

            <div className="text-center">
                <Button
                    onClick={handleConfirm}
                    className="px-8 py-2 bg-primary hover:bg-primary/90 text-white rounded-xl transition-colors duration-200"
                >
                    Continue with {count} {count === 1 ? "day" : "days"}
                </Button>
            </div>
        </div>
    );
}

export default SelectDaysUi;
