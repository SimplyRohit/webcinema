import { PrismaClient } from "@prisma/client";

const prismaClientSingleton = () => {
  return new PrismaClient();
};

declare const global: {
  prismaGlobal?: PrismaClient;
};

const prisma = global.prismaGlobal ?? prismaClientSingleton();

if (process.env.NODE_ENV !== "production") {
  global.prismaGlobal = prisma;
}

export default prisma;
