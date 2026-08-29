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

export const updateProduct = async(id:string, data:any) => {
    return await prisma.product.update({
        where: {id, }, data,
    })
}


export const deleteProduct = async (id:string) =>{
    return await prisma.product.delete({
        where:{
            id,
        },
    });
}