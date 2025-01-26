import { NextResponse } from "next/server";
import { stringify } from "querystring";

export async function Post(request: Request) {

    return NextResponse.json({message: "rota de cadastro"})
}