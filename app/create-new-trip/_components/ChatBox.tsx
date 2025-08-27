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

type Messages = {
    role: string;
    content: string;
    ui?: string;
};

function ChatBox() {
    const [messages, setMessages] = useState<Messages[]>([]);
    const [userInput, setUserInput] = useState<string>("");
    const [loading, setLoading] = useState(false);

    const messagesEndRef = useRef<HTMLDivElement>(null);
    const messagesContainerRef = useRef<HTMLDivElement>(null);

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

        if (!inputToSend?.trim()) return;

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
            });

            setMessages((prev: Messages[]) => [
                ...prev,
                {
                    role: "assistant",
                    content: result?.data?.resp,
                    ui: result?.data?.ui,
                },
            ]);

            console.log(result.data);
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
            return <FinaleUi />;
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

    return (
        <div className="h-[80vh] flex flex-col">
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
