import { Button } from "./ui/button";
import { Heart } from "lucide-react";
import couplePhoto from 'figma:asset/808018ce38e8384ca3a67e13f513d92a51124a3a.png';

interface HomePageProps {
  onNext: () => void;
}

export default function HomePage({ onNext }: HomePageProps) {
  return (
    <div className="min-h-screen bg-[#F5F3EE] flex flex-col">
      {/* Hero Section */}
      <div className="flex-1 relative">
        <div className="absolute inset-0">
          <img
            src={couplePhoto}
            alt="Casal"
            className="w-full h-full object-cover brightness-75"
          />
        </div>
        
        <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-6 sm:space-y-8 max-w-3xl mx-auto">
            {/* Decorative Element */}
            <div className="flex items-center justify-center gap-3 sm:gap-4">
              <div className="h-px w-12 sm:w-20 bg-white/40"></div>
              <Heart className="w-6 h-6 sm:w-8 sm:h-8 text-white fill-white" />
              <div className="h-px w-12 sm:w-20 bg-white/40"></div>
            </div>

            {/* Title */}
            <div className="space-y-2 sm:space-y-3">
              <h1 className="text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl tracking-wide">
                Chá de Panela
              </h1>
              <p className="text-white/90 text-lg sm:text-xl md:text-2xl italic">
                Luyzie & Higor
              </p>
            </div>

            {/* Date */}
            <div className="inline-block px-6 sm:px-8 py-3 sm:py-4 bg-[#9E630D]/80 backdrop-blur-sm rounded-lg">
              <p className="text-white text-base sm:text-lg">
                29 de Novembro de 2025
              </p>
            </div>

            {/* Description */}
            <p className="text-white/90 max-w-xl mx-auto px-4 text-sm sm:text-base">
              Estamos muito felizes em compartilhar este momento especial com vocês. 
              Sua presença é nosso maior presente, mas se quiserem nos presentear, 
              preparamos uma lista com muito carinho.
            </p>

            {/* CTA Button */}
            <div className="pt-4 sm:pt-6">
              <Button
                onClick={onNext}
                size="lg"
                className="bg-[#9E630D] hover:bg-[#8A5609] text-white px-8 sm:px-12 py-4 sm:py-6 rounded-full shadow-2xl transition-all duration-300 hover:scale-105"
              >
                Ver Lista de Presentes
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom Decoration */}
        <div className="absolute bottom-0 left-0 right-0 h-24 sm:h-32 bg-gradient-to-t from-[#F5F3EE] to-transparent"></div>
      </div>
    </div>
  );
}
