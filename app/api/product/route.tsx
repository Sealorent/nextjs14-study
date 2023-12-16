import prisma from '@/app/lib/prisma';


export async function GET() {
    try {
        const res = await prisma.category.findMany({});
        return Response.json({ res });
    } catch (error) {
        console.error(error);
        return Response.json({ error: error });
    }
}
