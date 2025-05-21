"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { createBrand } from "@/services/api";

export default function NewBrandPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorSubmit, setErrorSubmit] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) return setErrorSubmit("Nome é obrigatório");
    setLoading(true);
    try {
      await createBrand({ name: name.trim() });
      router.push("/brands");
    } catch (err : any) {
      setErrorSubmit(err.response.data.error || "Erro ao cadastrar marca.")
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Nova marca</h1>
      <Card>
        <CardContent className="pt-6 space-y-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label>Nome *</Label>
              <Input value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            {errorSubmit && <p className="text-red-600">{errorSubmit}</p>}
            <Button type="submit" disabled={loading}>
              {loading ? "Salvando..." : "Cadastrar"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </main>
  );
}
