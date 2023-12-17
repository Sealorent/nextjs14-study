import executeQuery from "@/app/lib/db";

export async function GET() {
    try {
      const res = await executeQuery('SELECT * FROM categories', []);
      return Response.json({ res });
    } catch (error) {
      console.error(error);
      return Response.json({ error: error });
    }
  }