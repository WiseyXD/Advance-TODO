import React from "react";
import { useBuyPremiumMutation } from "@/app/api/premiumApi";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

const BuyPremium = () => {
    const { toast } = useToast();
    const [buyPremium] = useBuyPremiumMutation();
    async function handleSubmit() {
        try {
            const { data } = await buyPremium();
            toast({
                title: "Upgraded to Premium Tier",
            });
        } catch (error) {
            toast({
                title: "Error Occured while upgrading to Premium Tier",
                variant: "destructive",
            });
            console.log(error);
        }
    }
    return (
        <div>
            <Button variant="outline" onClick={handleSubmit}>
                <p className="">Buy Premium</p>
            </Button>
        </div>
    );
};

export default BuyPremium;
