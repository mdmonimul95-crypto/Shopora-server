import { prisma } from "../lib/prisma";

export const createProduct = async (data: any) => {
    console.log(data);
    console.log("CATEGORY ID:", data.categoryId);
    console.log("CATEGORY:", data.category);

    const seller = await prisma.users.findUnique({
        where: {
            id: data.sellerId,
        },
    });

    console.log("SELLER ID RECEIVED:", data.sellerId);
console.log("SELLER FROM DATABASE:", seller);

    const allUsers = await prisma.users.findMany({
    select: {
        id: true,
        name: true,
        email: true,
        role: true,
    },
});

console.log("ALL USERS FROM PRISMA:", allUsers);
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