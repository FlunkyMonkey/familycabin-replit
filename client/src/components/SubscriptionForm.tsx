import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { subscriberFormSchema } from "@shared/schema";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";

type FormData = z.infer<typeof subscriberFormSchema>;

export function SubscriptionForm() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<FormData>({
    resolver: zodResolver(subscriberFormSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data: FormData) => {
    try {
      setIsSubmitting(true);
      
      const response = await apiRequest("POST", "/api/subscribers", data);
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to subscribe. Please try again.");
      }
      
      setIsSuccess(true);
      toast({
        title: "Success!",
        description: "You've been added to our newsletter.",
      });
      reset();
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setIsSuccess(false);
      }, 5000);
      
    } catch (error) {
      let message = "An error occurred. Please try again.";
      
      if (error instanceof Error) {
        message = error.message;
      }
      
      toast({
        title: "Subscription failed",
        description: message,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto mt-6">
      {isSuccess ? (
        <div className="bg-green-50 border border-green-200 text-green-800 rounded-lg p-4 text-center animate-fadeIn">
          <p className="font-medium">Thank you for subscribing!</p>
          <p className="text-sm mt-1">We'll keep you updated on our progress.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="text-center mb-4">
            <h2 className="text-xl text-[#8B4513] font-medium">Stay Updated</h2>
            <p className="text-sm text-[#333333] opacity-80 mt-1">
              Subscribe to get notified when we launch.
            </p>
          </div>
          
          <div className="flex gap-2">
            <div className="flex-1">
              <Input
                type="email"
                placeholder="Enter your email"
                className={`border-[#D2B48C] bg-white/80 focus:border-[#8B4513] ${
                  errors.email ? "border-red-500" : ""
                }`}
                {...register("email")}
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
              )}
            </div>
            <Button 
              type="submit" 
              disabled={isSubmitting}
              className="bg-[#8B4513] hover:bg-[#734228] text-white"
            >
              {isSubmitting ? "Subscribing..." : "Subscribe"}
            </Button>
          </div>
        </form>
      )}
    </div>
  );
}