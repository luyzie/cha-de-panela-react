// src/App.tsx

// Imports do React e dos seus componentes
import { useState } from "react";
import HomePage from "./components/HomePage";
import LoginPage from "./components/LoginPage";
import GiftSelectionPage from "./components/GiftSelectionPage";
import SummaryPage from "./components/SummaryPage";
import ThankYouPage from "./components/ThankYouPage";

// === IMPORTS DO FIREBASE ===
// Precisamos do 'db' e das funções para 'escrever'
import { db } from "./firebase";
import { doc, writeBatch } from "firebase/firestore";

// Tipos
type Page = "home" | "login" | "gifts" | "summary" | "thankyou";

interface UserData {
  name: string;
  email: string;
}

// === MUDANÇA IMPORTANTE ===
// O ID do Firebase é uma string, não um número
interface SelectedGift {
  id: string; // <-- Mudado de 'number' para 'string'
  name: string;
}

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>("home");
  const [userData, setUserData] = useState<UserData>({ name: "", email: "" });
  const [selectedGifts, setSelectedGifts] = useState<SelectedGift[]>([]);

  const handleLoginSubmit = (name: string, email: string) => {
    setUserData({ name, email });
    setCurrentPage("gifts");
  };

  const handleGiftsSelected = (gifts: SelectedGift[]) => {
    setSelectedGifts(gifts);
    setCurrentPage("summary");
  };

  // === LÓGICA DO FIREBASE ADICIONADA AQUI ===
  // Esta função agora é 'async' (assíncrona)
  const handleConfirmOrder = async () => {
    console.log("Confirmando pedido e atualizando o Firebase...");

    // 1. Cria um "batch" (pacote) de escritas.
    // Isso é mais eficiente do que atualizar um item de cada vez.
    const batch = writeBatch(db);

    try {
      // 2. Para cada presente que o usuário selecionou...
      selectedGifts.forEach((gift) => {
        // 3. Pega a referência do documento no Firebase (ex: "presentes/idDoPresente")
        const giftRef = doc(db, "presentes", gift.id);
        
        // 4. Adiciona ao "pacote" a ordem para atualizar este item
        batch.update(giftRef, { 
          comprado: true,
          compradoPor: userData.name // Bônus: salva quem comprou!
        });
      });

      // 5. Executa todas as atualizações no Firebase de uma só vez
      await batch.commit();

      console.log("Firebase atualizado com sucesso!");

      // 6. Só então, vai para a página de agradecimento
      setCurrentPage("thankyou");

    } catch (error) {
      console.error("Erro ao atualizar presentes no Firebase: ", error);
      // Opcional: mostrar uma mensagem de erro para o usuário
    }
  };
  // === FIM DA LÓGICA DO FIREBASE ===


  const handleRestart = () => {
    setCurrentPage("home");
    setUserData({ name: "", email: "" });
    setSelectedGifts([]);
  };

  return (
    <div className="min-h-screen">
      {currentPage === "home" && (
        <HomePage onNext={() => setCurrentPage("login")} />
      )}

      {currentPage === "login" && (
        <LoginPage
          onNext={handleLoginSubmit}
          onBack={() => setCurrentPage("home")}
        />
      )}

      {/* Este componente (GiftSelectionPage) é quem vai 
        BUSCAR os dados do Firebase para mostrar a lista.
        O App.tsx não precisa saber da lista completa.
      */}
      {currentPage === "gifts" && (
        <GiftSelectionPage
          onNext={handleGiftsSelected}
          onBack={() => setCurrentPage("login")}
        />
      )}

      {currentPage === "summary" && (
        <SummaryPage
          userName={userData.name}
          userEmail={userData.email}
          selectedGifts={selectedGifts}
          onNext={handleConfirmOrder} // <-- Vai chamar nossa função com Firebase
          onBack={() => setCurrentPage("gifts")}
        />
      )}

      {currentPage === "thankyou" && (
        <ThankYouPage userName={userData.name} onRestart={handleRestart} />
      )}
    </div>
  );
}