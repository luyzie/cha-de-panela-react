import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Heart, Check } from "lucide-react";

interface SelectedGift {
  id: number;
  name: string;
}

interface SummaryPageProps {
  userName: string;
  userEmail: string;
  selectedGifts: SelectedGift[];
  onNext: () => void;
  onBack: () => void;
}

export default function SummaryPage({
  userName,
  userEmail,
  selectedGifts,
  onNext,
  onBack,
}: SummaryPageProps) {
  return (
    <div className="min-h-screen bg-[#F5F3EE] py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto space-y-6 sm:space-y-8">
        {/* Header */}
        <div className="text-center space-y-3 sm:space-y-4">
          <div className="flex items-center justify-center gap-3">
            <div className="h-px w-12 bg-[#9E630D]/30"></div>
            <Heart className="w-6 h-6 text-[#9E630D] fill-[#9E630D]" />
            <div className="h-px w-12 bg-[#9E630D]/30"></div>
          </div>
          
          <h1 className="text-[#9E630D] text-3xl sm:text-4xl">Resumo do Pedido</h1>
          <p className="text-[#9E630D]/70">
            Confira os detalhes antes de confirmar
          </p>
        </div>

        {/* User Info Card */}
        <Card className="bg-white border-[#9E630D]/20 shadow-lg p-5 sm:p-6">
          <h3 className="text-[#9E630D] mb-3">Seus Dados</h3>
          <div className="space-y-2 text-[#9E630D]/80">
            <p>
              <span className="opacity-60">Nome:</span> {userName}
            </p>
            <p>
              <span className="opacity-60">E-mail:</span> {userEmail}
            </p>
          </div>
        </Card>

        {/* Selected Gifts Card */}
        <Card className="bg-white border-[#9E630D]/20 shadow-lg p-5 sm:p-6">
          <h3 className="text-[#9E630D] mb-4">Presentes Selecionados</h3>
          <div className="space-y-4">
            {selectedGifts.map((gift) => (
              <div
                key={gift.id}
                className="flex items-start justify-between gap-4 pb-4 border-b border-[#9E630D]/10 last:border-0 last:pb-0"
              >
                <div className="flex items-start gap-3 flex-1">
                  <div className="mt-1 w-5 h-5 rounded-full bg-[#9E630D]/10 flex items-center justify-center flex-shrink-0">
                    <Check className="w-3 h-3 text-[#9E630D]" />
                  </div>
                  <div className="flex-1">
                    <p className="text-[#9E630D]">{gift.name}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Info Box */}
        <div className="bg-[#9E630D]/10 border border-[#9E630D]/20 rounded-lg p-4 sm:p-5">
          <p className="text-[#9E630D]/80 text-sm text-center">
            Ao confirmar, você estará se comprometendo a presentear o casal com os itens selecionados. 
            Entraremos em contato através do e-mail fornecido com instruções para finalizar o presente.
          </p>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            onClick={onBack}
            variant="outline"
            className="flex-1 border-[#9E630D]/30 text-[#9E630D] hover:bg-[#9E630D]/10"
          >
            Voltar
          </Button>
          <Button
            onClick={onNext}
            className="flex-1 bg-[#9E630D] hover:bg-[#8A5609] text-white"
          >
            Confirmar Presente
          </Button>
        </div>

        {/* Decorative Bottom */}
        <div className="flex items-center justify-center gap-2 opacity-40 pt-4">
          <div className="w-2 h-2 rounded-full bg-[#9E630D]"></div>
          <div className="w-2 h-2 rounded-full bg-[#B8762A]"></div>
          <div className="w-2 h-2 rounded-full bg-[#D28A47]"></div>
        </div>
      </div>
    </div>
  );
}
