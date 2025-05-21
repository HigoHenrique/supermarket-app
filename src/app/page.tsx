"use client";

import { useRouter } from 'next/navigation'
import { useEffect, useState } from "react";
import { getProducts } from "@/services/api";
import { Product } from "@/types/Product";
import { Card, CardContent } from "@/components/ui/card";
import ThemeToggle from "@/components/darkmodeButton";
import { toast } from "sonner"

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Button } from "@/components/ui/button";
import Image from 'next/image';

export default function ProductListPage() {
  const router = useRouter()
  const [products, setProducts] = useState<Product[]>([]);

  const handleClick = () => {
    router.push('/products')
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getProducts();
        setProducts(res.data.products);
      } catch (error) {
        toast("Ocorreu um erro ao buscar produtos");
      }
    };

    fetchData();
  }, []);

  return (
    <main className="lg:max-w-6xl mx-auto lg:px-4 lg:py-4 space-y-6">
      <div className='p-4 m-4'>
        <ThemeToggle/>
      </div>
        <h1 className="text-center lg:text-5xl text-2xl font-bold">Produtos do Supermercado</h1>
        <p className='font-normal text-center text-10'>confira os todos os nossos produtos disponíveis!</p>
      <Card className='self-center'>
        <CardContent className="pt-1 lg:w-2xl w-80 lg:h-1/2 m-auto justify-center lg:flex ">
          <Carousel className="py-5 lg:w-2/3 lg:h-1/3">
            <CarouselContent className="mx-auto my-5">
              {
                products?.map(product =>(
                  <CarouselItem className="p-5 m-auto text-center" key={product.id}>
                    <h2 className="text-center text-2xl font-bold">{product.name}</h2>
                    <h3 className="text-center text-2xl font-bold"> R$ {product.price}</h3>
                  {product.image ? (
                    <Image
                      width={500}
                      height={500}
                      src={product.image}
                      alt={product.name}
                      className="max-h-96 rounded-md mt-2"
                    />
                  ) : (
                    <Image
                      width={500}
                      height={500}
                      src="/sem-foto.jpg"
                      alt={product.name}
                      className="max-h-96 rounded-md mt-2"
                    />
                  )}
                  </CarouselItem>
                ))
              }
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
          </Carousel>
        </CardContent>
            <Button onClick={handleClick} className='cursor-pointer lg:w-1/2 self-center'>
                Acessar gerenciador de produtos
            </Button>
      </Card>
    </main>
  );
}
