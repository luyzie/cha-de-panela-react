// src/components/GiftSelectionPage.tsx

// === IMPORTS ATUALIZADOS ===
// useEffect foi adicionado
import { useState, useEffect } from "react";
// Imports dos componentes UI (seus)
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { ShoppingBag } from "lucide-react";
import { Checkbox } from "./ui/checkbox";

// === IMPORTS DO FIREBASE ===
import { db } from "../firebase"; // Subimos um nível para achar o firebase.ts
import {
  collection,
  query,
  where,
  onSnapshot,
} from "firebase/firestore";

// === INTERFACE ATUALIZADA ===
// 'id' agora é 'string' e adicionamos 'comprado'
export interface Gift {
  id: string; // <-- MUITO IMPORTANTE
  name: string;
  image: string;
  comprado: boolean;
  // ...outros campos que você tenha no Firebase (ex: link, preco)
}

// === INTERFACE DOS PROPS ATUALIZADA ===
// onNext agora envia IDs como 'string'
interface GiftSelectionPageProps {
  onNext: (selectedGifts: { id: string; name: string }[]) => void;
  onBack: () => void;
}

// === DADOS ESTÁTICOS (const gifts) FORAM REMOVIDOS ===
// Não precisamos mais deles!

export default function GiftSelectionPage({
  onNext,
  onBack,
}: GiftSelectionPageProps) {
  // === ESTADOS ATUALIZADOS ===
  // Estado para guardar os presentes vindo do Firebase
  const [allGifts, setAllGifts] = useState<Gift[]>([]);
  // Estado para os IDs selecionados (agora string)
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  // Estado de Loading
  const [isLoading, setIsLoading] = useState(true);

  // === NOVO useEffect PARA BUSCAR DADOS DO FIREBASE ===
  useEffect(() => {
    // 1. Define a "query": buscar na coleção "presentes"
    // 2. Adiciona um filtro: ONDE o campo "comprado" for "==" "false"
    // Isso garante que presentes já comprados não apareçam na lista!
    const q = query(collection(db, "presentes"), where("comprado", "==", false));

    // 3. onSnapshot "ouve" a query em tempo real
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const giftsFromFirebase: Gift[] = [];
      querySnapshot.forEach((doc) => {
        // Adiciona o 'id' do documento junto com os dados (doc.data())
        giftsFromFirebase.push({ id: doc.id, ...doc.data() } as Gift);
      });

      setAllGifts(giftsFromFirebase); // 4. Atualiza nosso estado com os dados
      setIsLoading(false); // 5. Para de carregar
    });

    // 6. Limpa a "escuta" quando o componente for desmontado
    return () => unsubscribe();
  }, []); // [] = Roda isso apenas uma vez, quando a página carregar

  // === FUNÇÃO ATUALIZADA (para 'string') ===
  const handleToggleGift = (id: string) => {
    setSelectedIds((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const handleContinue = () => {
    if (selectedIds.size === 0) {
      alert("Por favor, selecione pelo menos um presente");
      return;
    }

    // Busca os dados dos presentes selecionados a partir do 'allGifts'
    const selectedGifts = Array.from(selectedIds).map((id) => {
      const gift = allGifts.find((g) => g.id === id)!;
      return {
        id: gift.id,
        name: gift.name,
      };
    });

    onNext(selectedGifts); // Envia para o App.tsx
  };

  const getTotalItems = () => {
    return selectedIds.size;
  };

  // === RENDERIZAÇÃO (JSX) ===
  return (
    <div className="min-h-screen bg-[#F5F3EE] py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Header (sem mudanças) */}
        <div className="text-center space-y-3">
          <div className="flex items-center justify-center gap-3">
            <div className="h-px w-12 bg-[#9E630D]/30"></div>
            <ShoppingBag className="w-6 h-6 text-[#9E630D]" />
            <div className="h-px w-12 bg-[#9E630D]/30"></div>
          </div>
          <h1 className="text-[#9E630D] text-3xl sm:text-4xl">
            Lista de Presentes
          </h1>
          <p className="text-[#9E630D]/70">
            Escolha os presentes que deseja nos dar
          </p>
        </div>

        {/* Gift Grid (ATUALIZADO) */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          
          {/* Lógica de Loading */}
          {isLoading && (
            <p className="text-[#9E630D] col-span-3 text-center">
              Carregando presentes...
            </p>
          )}

          {/* Lógica de Lista Vazia */}
          {!isLoading && allGifts.length === 0 && (
             <p className="text-[#9E630D] col-span-3 text-center">
              Oba! Parece que todos os presentes já foram comprados.
            </p>
          )}

          {/* O map agora usa 'allGifts' (do Firebase)
              em vez de 'gifts' (estático) 
          */}
          {allGifts.map((gift) => {
            const isSelected = selectedIds.has(gift.id);

            return (
              <Card
                key={gift.id} // <-- Agora é uma string, mas o React não se importa
                className={`bg-white border-[#9E630D]/20 shadow-lg overflow-hidden hover:shadow-xl transition-shadow cursor-pointer ${
                  gift.comprado ? 'opacity-50' : '' // Exemplo: se já estiver comprado, fica opaco
                }`}
                onClick={() => handleToggleGift(gift.id)}
              >
                <div className="aspect-[4/3] overflow-hidden bg-gray-100">
                  <img
                    src={gift.image}
                    alt={gift.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-3">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="text-[#9E630D] flex-1 text-sm leading-tight">
                      {gift.name}
                    </h3>
                    <Checkbox
                      checked={isSelected}
                      onCheckedChange={() => handleToggleGift(gift.id)}
                      onClick={(e) => e.stopPropagation()}
                      className="border-[#9E630D]/40 data-[state=checked]:bg-[#9E630D] data-[state=checked]:border-[#9E630D] flex-shrink-0"
                    />
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Footer Buttons (sem mudanças) */}
        <div className="sticky bottom-0 bg-[#F5F3EE] pt-6 pb-4 border-t border-[#9E630D]/10">
          <div className="max-w-md mx-auto space-y-4">
            {getTotalItems() > 0 && (
              <div className="bg-white rounded-lg px-4 py-3 shadow-md text-center">
                <p className="text-[#9E630D]">
                  {getTotalItems()}{" "}
                  {getTotalItems() === 1
                    ? "item selecionado"
                    : "itens selecionados"}
                </p>
              </div>
            )}
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                onClick={onBack}
                variant="outline"
                className="flex-1 border-[#9E630D]/30 text-[#9E630D] hover:bg-[#9E630D]/10"
              >
                Voltar
              </Button>
              <Button
                onClick={handleContinue}
                className="flex-1 bg-[#9E630D] hover:bg-[#8A5609] text-white"
              >
                Continuar
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}