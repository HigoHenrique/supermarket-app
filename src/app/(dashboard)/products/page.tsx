"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { getProducts } from "@/services/api";
import { Product } from "@/types/Product";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner"

export default function ProductListPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const pageSize = 10;

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(search), 500);
    return () => clearTimeout(timer);
  }, [search]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getProducts(page, pageSize, debouncedSearch);
        setProducts(res.data.products);
        setTotal(res.data.total);
      } catch (error) {
        toast("Ocorreu um erro ao buscar produtos");
      }
    };

    fetchData();
  }, [debouncedSearch, page]);

  return (
    <main className="lg:max-w-6xl lg:mx-auto lg:px-4 py-8 space-y-6 bg-background">
      <h1 className="text-2xl text-left font-bold lg:mb-6">Lista de produtos cadastradas no sistema</h1>
      <Card>
        <p className="text-1xl font ml-6 font-bold">Pesquisa de produtos</p>
        <CardContent className="pt-1">
          <Input
            type="text"
            placeholder="Buscar por nome do produto"
            value={search}
            onChange={(e) => {
              setPage(1);
              setSearch(e.target.value);
            }}
          />
        </CardContent>
      </Card>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Imagem</TableHead>
            <TableHead>Nome</TableHead>
            <TableHead>Preço</TableHead>
            <TableHead>Marca</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products?.map((product) => (
            <TableRow key={product.id}>
              <TableCell>
                {product.image ? (
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-16 h-16 object-cover rounded-md"
                  />
                ) : (
                  <span className="text-muted-foreground text-sm">
                    Sem imagem
                  </span>
                )}
              </TableCell>
              <TableCell>{product.name}</TableCell>
              <TableCell>R$ {product.price.toFixed(2)}</TableCell>
              <TableCell>{product.brand?.name || "Marca desconhecida"}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="flex items-center justify-between mt-4">
        <span className="text-sm text-muted-foreground">
          Página {page} de {Math.ceil(total / pageSize) || 1}
        </span>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPage((prev) => Math.max(1, prev - 1))}
            disabled={page === 1}
          >
            Anterior
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              setPage((prev) =>
                prev < Math.ceil(total / pageSize) ? prev + 1 : prev
              )
            }
            disabled={page >= Math.ceil(total / pageSize)}
          >
            Próximo
          </Button>
        </div>
      </div>
    </main>
  );
}
