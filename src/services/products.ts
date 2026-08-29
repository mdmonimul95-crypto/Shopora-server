import { prisma } from "../lib/prisma";

export const createProduct = async (data: any) => {
  return await prisma.product.create({
    data,
  });
};