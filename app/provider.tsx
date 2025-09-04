import React, { useContext, useEffect, useState } from "react";
import Header from "./_components/Header";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useUser } from "@clerk/nextjs";
import { UserDetailContext } from "@/context/UserDetailContext";
import { TripDetailContext, TripDetailContextType } from "@/context/TripDetailContext";
import { InitialMessageContext, InitialMessageContextType } from "@/context/InitialMessageContext";
import { TripInfo } from "./create-new-trip/_components/ChatBox";
import { TooltipProvider } from "@/components/ui/tooltip";

function Provider({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const CreateUser = useMutation(api.user.CreateNewUser);
    const { user } = useUser();
    const [userDetail, setUserDetail] = useState<any>();
    const [tripDetailInfo, setTripDetailInfo] = useState<TripInfo | null>(null);
    const [initialMessage, setInitialMessage] = useState<string | null>(null);

    useEffect(() => {
        user && CreateNewUser();
    }, [user]);

    const CreateNewUser = async () => {
        // save new user if not exist
        if (user) {
            const result = await CreateUser({
                email: user?.primaryEmailAddress?.emailAddress ?? "",
                imageUrl: user?.imageUrl,
                name: user?.fullName ?? "",
            });
            setUserDetail(result);
        }
    };

    return (
        <UserDetailContext.Provider value={{ userDetail, setUserDetail }}>
            <TripDetailContext.Provider value={{ tripDetailInfo, setTripDetailInfo }}>
                <InitialMessageContext.Provider value={{ initialMessage, setInitialMessage }}>
                    <TooltipProvider>
                        <div>
                            <Header />
                            {children}
                        </div>
                    </TooltipProvider>
                </InitialMessageContext.Provider>
            </TripDetailContext.Provider>
        </UserDetailContext.Provider>
    );
}

export default Provider;

export const useUserDetail = () => {
    return useContext(UserDetailContext);
};

export const useTripDetail = (): TripDetailContextType => {
    const context = useContext(TripDetailContext);
    if (!context) {
        throw new Error("useTripDetail must be used within a TripDetailContext.Provider");
    }
    return context;
};

export const useInitialMessage = (): InitialMessageContextType => {
    const context = useContext(InitialMessageContext);
    if (!context) {
        throw new Error("useInitialMessage must be used within an InitialMessageContext.Provider");
    }
    return context;
};
