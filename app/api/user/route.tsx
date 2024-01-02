import { NextRequest, NextResponse } from "next/server";

import { signUp } from '@/app/lib/firebase/service';
import { SignUpDto } from '@/app/dto/signup';



export  async function GET(req: NextRequest, res: NextResponse) {
   return NextResponse.json({
        status : true,
        message : "Success",
    })
}

export async function POST(req: NextRequest, res: NextResponse) {
    try {
        // Wait for the promise to resolve before accessing properties
        const body = await req.json();
        

        // Wrap the signUp function in a promise
        const status = await new Promise<boolean>((resolve, reject) => {
            signUp(body, (result: boolean) => {
                resolve(result);
            });
        });

        if (status) {
            return NextResponse.json({
                status: true,
                message: "Success",
            });
        } else {
            return NextResponse.json({
                status: false,
                message: "Failed",
            });
        }
    } catch (error) {
        console.error("Error in POST:", error);
        return NextResponse.json({
            status: false,
            message: "Failed",
        });
    }
}