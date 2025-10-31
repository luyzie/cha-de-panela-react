import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Card } from "./ui/card";
import { Heart, User, Mail } from "lucide-react";

interface LoginPageProps {
  onNext: (name: string, email: string) => void;
  onBack: () => void;
}

export default function LoginPage({ onNext, onBack }: LoginPageProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({ name: "", email: "" });

  const validateForm = () => {
    let isValid = true;
    const newErrors = { name: "", email: "" };

    if (!name.trim()) {
      newErrors.name = "Por favor, insira seu nome";
      isValid = false;
    }

    if (!email.trim()) {
      newErrors.email = "Por favor, insira seu e-mail";
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Por favor, insira um e-mail válido";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onNext(name, email);
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F3EE] flex flex-col items-center justify-center px-4 py-8 sm:py-12">
      <div className="w-full max-w-md space-y-6 sm:space-y-8">
        {/* Header */}
        <div className="text-center space-y-3 sm:space-y-4">
          <div className="flex items-center justify-center gap-3">
            <div className="h-px w-12 bg-[#9E630D]/30"></div>
            <Heart className="w-6 h-6 text-[#9E630D] fill-[#9E630D]" />
            <div className="h-px w-12 bg-[#9E630D]/30"></div>
          </div>
          
          <h1 className="text-[#9E630D] text-3xl sm:text-4xl">Identificação</h1>
          <p className="text-[#9E630D]/70">
            Por favor, preencha seus dados para continuar
          </p>
        </div>

        {/* Form Card */}
        <Card className="bg-white border-[#9E630D]/20 shadow-xl p-6 sm:p-8">
          <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
            {/* Name Field */}
            <div className="space-y-2">
              <Label htmlFor="name" className="text-[#9E630D] flex items-center gap-2">
                <User className="w-4 h-4" />
                Nome Completo
              </Label>
              <Input
                id="name"
                type="text"
                placeholder="Digite seu nome"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  if (errors.name) setErrors({ ...errors, name: "" });
                }}
                className={`border-[#9E630D]/30 focus:border-[#9E630D] ${
                  errors.name ? "border-red-500" : ""
                }`}
              />
              {errors.name && (
                <p className="text-red-500 text-sm">{errors.name}</p>
              )}
            </div>

            {/* Email Field */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-[#9E630D] flex items-center gap-2">
                <Mail className="w-4 h-4" />
                E-mail
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="seu@email.com"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (errors.email) setErrors({ ...errors, email: "" });
                }}
                className={`border-[#9E630D]/30 focus:border-[#9E630D] ${
                  errors.email ? "border-red-500" : ""
                }`}
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email}</p>
              )}
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <Button
                type="button"
                onClick={onBack}
                variant="outline"
                className="flex-1 border-[#9E630D]/30 text-[#9E630D] hover:bg-[#9E630D]/10"
              >
                Voltar
              </Button>
              <Button
                type="submit"
                className="flex-1 bg-[#9E630D] hover:bg-[#8A5609] text-white"
              >
                Continuar
              </Button>
            </div>
          </form>
        </Card>

        {/* Decorative Bottom */}
        <div className="flex items-center justify-center gap-2 opacity-40">
          <div className="w-2 h-2 rounded-full bg-[#9E630D]"></div>
          <div className="w-2 h-2 rounded-full bg-[#B8762A]"></div>
          <div className="w-2 h-2 rounded-full bg-[#D28A47]"></div>
        </div>
      </div>
    </div>
  );
}
