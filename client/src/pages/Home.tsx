import { CabinSilhouette } from "@/components/ui/CabinSilhouette";
import { SubscriptionForm } from "@/components/SubscriptionForm";
import { Toaster } from "@/components/ui/toaster";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#F9F5F0] flex flex-col items-center justify-center relative overflow-hidden">
      <main className="container mx-auto px-4 text-center animate-fadeIn">
        {/* Cabin Silhouette with floating animation */}
        <div className="mb-8 animate-float">
          <CabinSilhouette />
        </div>

        {/* Main Title */}
        <h1 className="font-['Cabin_Sketch',_cursive] text-5xl md:text-6xl font-bold text-[#8B4513] mb-2">
          familycabin.io
        </h1>
        
        {/* Subtitle */}
        <p className="font-['Roboto',_sans-serif] text-lg text-[#333333] opacity-80 mb-8">
          building...
        </p>
        
        {/* Subscription Form */}
        <div className="max-w-md mx-auto">
          <div className="bg-white/50 backdrop-blur-sm rounded-lg p-6 shadow-sm border border-[#D2B48C]/30">
            <SubscriptionForm />
          </div>
        </div>
      </main>

      {/* Nature Accent at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-16 overflow-hidden opacity-20">
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 1440 320" 
          preserveAspectRatio="none" 
          className="h-full w-full"
        >
          <path 
            fill="#2E5A35" 
            fillOpacity="1" 
            d="M0,128L48,144C96,160,192,192,288,197.3C384,203,480,181,576,165.3C672,149,768,139,864,149.3C960,160,1056,192,1152,197.3C1248,203,1344,181,1392,170.7L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
      </div>
      
      {/* Toast notifications */}
      <Toaster />

      {/* Add the animation keyframes using style tag */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Cabin+Sketch:wght@400;700&family=Roboto:wght@300;400;500&display=swap');
        
        @keyframes fadeIn {
          0% { opacity: 0; }
          100% { opacity: 1; }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        
        .animate-fadeIn {
          animation: fadeIn 1.5s ease-in;
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
