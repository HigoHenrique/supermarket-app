"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {Card} from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { getBrands, createProduct } from "@/services/api";
import { Brand } from "@/types/Brand";

export default function CreateProductPage() {
  const router = useRouter();

  const [brands, setBrands] = useState<Brand[]>([]);
  const [loadingBrands, setLoadingBrands] = useState(false);
  const [errorBrands, setErrorBrands] = useState("");

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [brandId, setBrandId] = useState("");
  const [imageBase64, setImageBase64] = useState<string | null>(null);

  const [submitting, setSubmitting] = useState(false);
  const [errorSubmit, setErrorSubmit] = useState("");

  // Buscar marcas para o select
  useEffect(() => {
    const fetchBrands = async () => {
      setLoadingBrands(true);
      try {
        const res = await getBrands();
        setBrands(res.data);
      } catch {
        setErrorBrands("Erro ao carregar marcas");
      } finally {
        setLoadingBrands(false);
      }
    };

    fetchBrands();
  }, []);

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    const validTypes = ["image/jpeg", "image/png", "image/webp", "image/jpg"];

      if (!validTypes.includes(file.type)) {
        setImageBase64("");
        return setErrorSubmit("Tipo de arquivo inválido, envie uma imagem nos formatos JPG, PNG ou WEBP.");
      }

    const reader = new FileReader();
    reader.onloadend = () => {
      setImageBase64(reader.result as string);
    };
    reader.readAsDataURL(file);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrorSubmit("");

    if (!name.trim()) return setErrorSubmit("Nome é obrigatório");
    if (!price || isNaN(Number(price)) || Number(price) <= 0)
      return setErrorSubmit("Preço deve ser um número positivo");
    if (!brandId) return setErrorSubmit("Marca é obrigatória");

    setSubmitting(true);
    try {
      await createProduct({
        name,
        price: Number(price),
        description: description.trim() || undefined,
        brandId,
        image: imageBase64 || undefined,
      });
      router.push("/products");
    } catch (err: any) {
      setErrorSubmit(err.response.data.error || "Erro ao cadastrar produto.")
    } finally {
      setSubmitting(false);
    }
  }

  return(
    <main className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Novo produto</h1>
      <Card>
      <form onSubmit={handleSubmit} className="space-y-6 p-4">
        <div>
          <Label htmlFor="name">Nome *</Label>
          <Input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div>
          <Label htmlFor="price">Preço (R$) *</Label>
          <Input
            id="price"
            type="number"
            min="0"
            step="0.01"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>

        <div>
          <Label htmlFor="description">Descrição</Label>
          <Textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
          />
        </div>

        <div>
          <Label htmlFor="brand">Marca *</Label>
          {loadingBrands ? (
            <p>Carregando marcas...</p>
          ) : errorBrands ? (
            <p className="text-red-600">{errorBrands}</p>
          ) : (
            <Select
              value={brandId}
              onValueChange={setBrandId}
              defaultValue=""
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Selecione uma marca" />
              </SelectTrigger>
              <SelectContent>
                {brands?.map((brand) => (
                  <SelectItem key={brand.id} value={brand.id}>
                    {brand.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        </div>

        <div>
          <Label htmlFor="image">Imagem</Label>
          <Input
            id="image"
            type="file"
            accept=".png,.jpg,.jpeg,.webp"
            onChange={handleImageChange}
          />
          {imageBase64 && (
            <img
              src={imageBase64}
              alt="Preview"
              className="mt-2 w-32 h-32 object-cover rounded-md"
            />
          )}
        </div>

        {errorSubmit && <p className="text-red-600">{errorSubmit}</p>}
        <Button type="submit" disabled={submitting}>
          {submitting ? "Salvando..." : "Cadastrar"}
        </Button>
      </form>
        </Card>
    </main>
  )
}
