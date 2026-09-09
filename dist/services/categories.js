"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCategories = exports.updateCategories = exports.createCategories = exports.getCategories = void 0;
const prisma_1 = require("../lib/prisma");
const getCategories = async () => {
    return await prisma_1.prisma.categories.findMany({
        include: {
            _count: {
                select: {
                    products: true,
                }
            }
        },
        orderBy: {
            createdAt: 'desc'
        }
    });
};
exports.getCategories = getCategories;
const createCategories = async (data) => {
    return await prisma_1.prisma.categories.create({
        data: {
            name: data.name,
            description: data.description,
            image: data.image
        }
    });
};
exports.createCategories = createCategories;
const updateCategories = async (id, data) => {
    return await prisma_1.prisma.categories.update({
        where: { id },
        data,
    });
};
exports.updateCategories = updateCategories;
const deleteCategories = async (id) => {
    return await prisma_1.prisma.categories.delete({
        where: { id },
    });
};
exports.deleteCategories = deleteCategories;
