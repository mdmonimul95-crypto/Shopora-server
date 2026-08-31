import { prisma } from "../lib/prisma";

export const createProduct = async (data: any) => {
  return await prisma.product.create({
    data: {
      name: data.name,
      sku: data.sku,
      category: data.category,
      brand: data.brand,
      shortDescription: data.shortDescription,

      regularPrice: Number(data.regularPrice),
      salePrice: Number(data.salePrice),

      stockQuantity: Number(data.stockQuantity),
      lowStockAlert: Number(data.lowStockAlert),

      stockStatus: data.stockStatus,
      description: data.description,
      status: data.productStatus,

      images: data.images,
    },
  });
};


export const getProducts = async () =>{
    return await prisma.product.findMany({
        orderBy:{
            createdAt: "desc"
        }
    })
}

export const getProductById = async(id:string)=>{
    return await prisma.product.findUnique({
        where:{id, },
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