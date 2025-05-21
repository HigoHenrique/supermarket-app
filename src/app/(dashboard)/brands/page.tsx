"use client";

import { useEffect, useState } from "react";
import { getBrands } from "@/services/api";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area"
import { Brand } from "@/types/Brand";
import { toast } from "sonner";

export default function ProductListPage() {
  const [brands, setBrands] = useState<Brand[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getBrands();
        setBrands(res.data);
      } catch (error) {
        toast("Ocorreu um erro ao buscar marcas");
      }
    };

    fetchData();
  }, []);

  return (
    <main className="max-w-6xl mx-auto px-4 py-8 space-y-6">
        <h1 className="text-2xl font-bold mb-6">Lista de marcas cadastradas no sistema</h1>
        <ScrollArea className="h-165 border overflow-y">
        <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Marca</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {brands?.map((brand) => (
            <TableRow key={brand.id}>
              <TableCell>{brand.name}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      </ScrollArea>
    </main>
  );
}
