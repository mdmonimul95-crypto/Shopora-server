import { prisma } from "../lib/prisma";

export const getCategories = async () => {
    return await prisma.categories.findMany({
       include:{
        _count: {
            select:{
                products:true,
            }
        }
       },
        orderBy: {
            createdAt: 'desc'
        }

    });
}


export const createCategories = async(data:{name:string; description?:string; image?:string}) => {
    return await prisma.categories.create({        
        data:{
            name: data.name,
            description: data.description,
            image:data.image
        }
    })
}


export const updateCategories = async(id:string, data:{name?:string; description?:string; image?:string; status?:string})=> {
    return await prisma.categories.update({
        where: {id},
        data,
    })
}


export const deleteCategories = async (id:string) => {
    return await prisma.categories.delete({
        where: {id},
    })
}