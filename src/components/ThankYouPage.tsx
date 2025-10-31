import { Button } from "./ui/button";
import { Heart, Check } from "lucide-react";

interface ThankYouPageProps {
  userName: string;
  onRestart: () => void;
}

export default function ThankYouPage({ userName, onRestart }: ThankYouPageProps) {
  return (
    <div className="min-h-screen bg-[#F5F3EE] flex flex-col items-center justify-center px-4 py-8 sm:py-12">
      <div className="max-w-2xl mx-auto text-center space-y-6 sm:space-y-8">
        {/* Success Icon */}
        <div className="flex justify-center">
          <div className="relative">
            <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-[#9E630D] flex items-center justify-center shadow-2xl">
              <Check className="w-12 h-12 sm:w-16 sm:h-16 text-white" strokeWidth={3} />
            </div>
            <div className="absolute -top-2 -right-2">
              <Heart className="w-8 h-8 sm:w-10 sm:h-10 text-[#9E630D] fill-[#9E630D] animate-pulse" />
            </div>
          </div>
        </div>

        {/* Thank You Message */}
        <div className="space-y-3 sm:space-y-4">
          <h1 className="text-[#9E630D] text-4xl sm:text-5xl md:text-6xl">
            Muito Obrigado!
          </h1>
          <p className="text-[#9E630D] text-xl sm:text-2xl">
            {userName}
          </p>
        </div>

        {/* Message */}
        <div className="space-y-4 sm:space-y-5 max-w-xl mx-auto">
          <div className="flex items-center justify-center gap-3">
            <div className="h-px w-12 sm:w-16 bg-[#9E630D]/30"></div>
            <Heart className="w-5 h-5 text-[#9E630D] fill-[#9E630D]" />
            <div className="h-px w-12 sm:w-16 bg-[#9E630D]/30"></div>
          </div>

          <p className="text-[#9E630D]/80 text-base sm:text-lg leading-relaxed">
            Sua contribuição foi registrada com sucesso! Ficamos muito felizes com sua generosidade 
            e carinho. Em breve você receberá um e-mail com as instruções para finalizar o presente.
          </p>

          <div className="bg-white border border-[#9E630D]/20 rounded-lg p-5 sm:p-6 shadow-lg">
            <p className="text-[#9E630D]/70 text-sm sm:text-base">
              <strong className="text-[#9E630D]">Luyzie & Higor</strong> agradecem imensamente 
              por fazer parte deste momento tão especial em suas vidas. Sua presença e presente 
              significam muito para nós! 🧡
            </p>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="flex items-center justify-center gap-2 opacity-40 pt-4">
          <div className="w-2 h-2 rounded-full bg-[#9E630D] animate-pulse"></div>
          <div className="w-2 h-2 rounded-full bg-[#B8762A] animate-pulse" style={{ animationDelay: "0.2s" }}></div>
          <div className="w-2 h-2 rounded-full bg-[#D28A47] animate-pulse" style={{ animationDelay: "0.4s" }}></div>
        </div>

        {/* Restart Button */}
        <div className="pt-4">
          <Button
            onClick={onRestart}
            variant="outline"
            className="border-[#9E630D]/30 text-[#9E630D] hover:bg-[#9E630D]/10 px-8"
          >
            Voltar ao Início
          </Button>
        </div>

        {/* Bottom Decoration */}
        <div className="pt-8">
          <div className="flex items-center justify-center gap-4">
            <Heart className="w-4 h-4 text-[#9E630D]/30 fill-[#9E630D]/30" />
            <Heart className="w-5 h-5 text-[#9E630D]/40 fill-[#9E630D]/40" />
            <Heart className="w-6 h-6 text-[#9E630D]/50 fill-[#9E630D]/50" />
            <Heart className="w-5 h-5 text-[#9E630D]/40 fill-[#9E630D]/40" />
            <Heart className="w-4 h-4 text-[#9E630D]/30 fill-[#9E630D]/30" />
          </div>
        </div>
      </div>
    </div>
  );
}
