import { PrismaClient } from "@prisma/client";
interface UsersType {
    id: number;
    name: string;
    email: string;
    password: string;
    phone?: string | null;
    address?: string | null;
    city?: string | null;
    state?: string | null;
    country?: string | null;
    postalCode?: string | null;
    role: string;
    isActive: boolean;
    emailVerified: boolean;
    avatalUrl?: string | null;
    createdAt: Date;
    updatedAt: Date;
}

class UserModel {
    private prisma: PrismaClient;
    constructor() {
        this.prisma = new PrismaClient();
    }
    public async getUsers(): Promise<UsersType[]> {
        const users = await this.prisma.user.findMany({
            orderBy: { createdAt: "desc" }
        });
        return users;
    }
}
export default UserModel;