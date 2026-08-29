import { prisma } from "../lib/prisma";

export const createProduct = async (data: any) => {
  return await prisma.product.create({
    data,
  });
};


export const getProducts = async () =>{
    return await prisma.product.findMany({
        orderBy:{
            createdAt: "desc"
        }
    })
}