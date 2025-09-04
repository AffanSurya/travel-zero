"use client";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";
import { Loader, Send } from "lucide-react";
import React, { useState, useRef, useEffect } from "react";
import EmptyBoxState from "./EmptyBoxState";
import GroupSizeUi from "./GroupSizeUi";
import BudgetUi from "./BudgetUi";
import SelectDaysUi from "./SelectDaysUi";
import FinaleUi from "./FinaleUi";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useTripDetail, useUserDetail } from "@/app/provider";
import { v4 as uuidv4 } from "uuid";
import { useSearchParams } from "next/navigation";

type Messages = {
    role: string;
    content: string;
    ui?: string;
};

export type TripInfo = {
    budget: string;
    destination: string;
    duration: string;
    group_size: string;
    hotels: Hotel[];
    itinerary: Itinerary[];
    origin: string;
};

export type Hotel = {
    hotel_name: string;
    hotel_address: string;
    price_per_night: string;
    hotel_image_url: string;
    geo_coordinates: {
        latitude: number;
        longitude: number;
    };
    rating: number;
    description: string;
};

export type Activity = {
    place_name: string;
    place_details: string;
    place_image_url: string;
    geo_coordinates: {
        latitude: number;
        longitude: number;
    };
    place_address: string;
    ticket_pricing: string;
    time_travel_each_location: string;
    best_time_to_visit: string;
};

export type Itinerary = {
    day: number;
    day_plan: string;
    best_time_to_visit_day: string;
    activities: Activity[];
};

function ChatBox() {
    const [messages, setMessages] = useState<Messages[]>([]);
    const [userInput, setUserInput] = useState<string>("");
    const [loading, setLoading] = useState(false);
    const [isFinal, setIsFinal] = useState(false);
    const [tripDetail, setTripDetail] = useState<TripInfo>();
    const SaveTripDetail = useMutation(api.tripDetail.CreateTripDetail);
    const { userDetail, setUserDetail } = useUserDetail();
    const { tripDetailInfo, setTripDetailInfo } = useTripDetail();
    const searchParams = useSearchParams();
    const initialSearchParam = searchParams.get("message");
    console.log(initialSearchParam);

    const messagesEndRef = useRef<HTMLDivElement>(null);
    const messagesContainerRef = useRef<HTMLDivElement>(null);
    const hasProcessedSearchParam = useRef(false);

    useEffect(() => {
        if (initialSearchParam && !hasProcessedSearchParam.current) {
            hasProcessedSearchParam.current = true;
            onSend(initialSearchParam);
        }
    }, [initialSearchParam]);

    useEffect(() => {
        scrollToBottom();
    }, [messages, loading]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({
            behavior: "smooth",
            block: "end",
        });
    };

    const onSend = async (directInput?: string) => {
        const inputToSend = directInput || userInput;

        // if (!inputToSend?.trim()) return;

        setLoading(true);
        const newMsg: Messages = {
            role: "user",
            content: inputToSend,
        };

        if (!directInput) {
            setUserInput("");
        }

        setMessages((prev: Messages[]) => [...prev, newMsg]);

        try {
            const result = await axios.post("/api/aimodel", {
                messages: [...messages, newMsg],
                isFinal: isFinal,
            });

            console.log("trip", result.data);
            !isFinal &&
                setMessages((prev: Messages[]) => [
                    ...prev,
                    {
                        role: "assistant",
                        content: result?.data?.resp,
                        ui: result?.data?.ui,
                    },
                ]);

            if (isFinal) {
                setTripDetail(result?.data?.trip_plan);
                setTripDetailInfo(result?.data?.trip_plan);

                const tripId = uuidv4();
                await SaveTripDetail({
                    tripDetail: result?.data?.trip_plan,
                    tripId: tripId,
                    uid: userDetail._id,
                });
            }
        } catch (error) {
            console.error("Error sending message:", error);
        } finally {
            setLoading(false);
        }
    };

    const RenderGenerativeUi = (ui: string) => {
        if (ui == "budget") {
            // Budget ui component
            return (
                <BudgetUi
                    onSelectedOption={(v: string) => {
                        onSend(v);
                    }}
                />
            );
        } else if (ui == "groupSize") {
            // Group size ui component
            return (
                <GroupSizeUi
                    onSelectedOption={(v: string) => {
                        onSend(v);
                    }}
                />
            );
        } else if (ui == "tripDuration") {
            return (
                <SelectDaysUi
                    onSelectedOption={(v: string) => {
                        onSend(v);
                    }}
                />
            );
        } else if (ui == "final") {
            return <FinaleUi viewTrip={() => console.log()} disable={!tripDetail} />;
        }
        return null;
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === "Enter") {
            if (e.shiftKey) {
                // Shift+Enter: Allow new line (default behavior)
                return;
            } else {
                // Enter only: Send message
                e.preventDefault(); // Prevent new line
                onSend();
            }
        }
    };

    useEffect(() => {
        const lastMsg = messages[messages.length - 1];

        if (lastMsg?.ui == "final") {
            setIsFinal(true);
            setUserInput("Ok, Great!");
        }
    }, [messages]);

    useEffect(() => {
        if (isFinal && userInput) {
            onSend();
        }
    }, [isFinal]);

    return (
        <div className="h-[83vh] flex flex-col border shadow rounded-2xl p-4">
            {messages.length == 0 && (
                <EmptyBoxState
                    onSelectOption={(v: string) => {
                        onSend(v);
                    }}
                />
            )}
            {/* display messages */}
            <section ref={messagesContainerRef} className="flex-1 overflow-y-auto p-4 scroll-smooth">
                {messages.map((msg: Messages, index) =>
                    msg.role == "user" ? (
                        <div className="flex justify-end mt-2" key={index}>
                            <div className="max-w-lg bg-primary text-white px-4 py-2 rounded-lg">
                                {msg.content}
                            </div>
                        </div>
                    ) : (
                        <div className="flex justify-start mt-2" key={index}>
                            <div className="max-w-lg bg-gray-100 text-black px-4 py-2 rounded-lg">
                                {msg.content}
                                {RenderGenerativeUi(msg.ui ?? "")}
                            </div>
                        </div>
                    )
                )}

                {loading && (
                    <div className="flex justify-start mt-2">
                        <div className="max-w-lg bg-gray-100 text-black px-4 py-2 rounded-lg flex items-center gap-2">
                            <Loader className="animate-spin h-4 w-4" />
                            <span className="text-sm text-gray-500">AI is thinking...</span>
                        </div>
                    </div>
                )}

                {/* Element untuk auto scroll */}
                <div ref={messagesEndRef} />
            </section>
            {/* user input */}
            <section>
                <div className="border rounded-2xl p-4 relative">
                    <Textarea
                        placeholder="Start typing here..."
                        className="w-full h-28 bg-transparent border-none focus-visible:ring-0 shadow-none resize-none"
                        onChange={(event) => setUserInput(event.target.value)}
                        value={userInput}
                        onKeyDown={handleKeyDown}
                        disabled={loading}
                    />
                    <Button
                        size={"icon"}
                        className="absolute bottom-6 right-6 cursor-pointer"
                        onClick={() => onSend()}
                        disabled={loading || !userInput?.trim()}
                    >
                        <Send className="h-4 w-4" />
                    </Button>
                </div>
            </section>
        </div>
    );
}

export default ChatBox;
