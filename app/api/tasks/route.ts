import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

const BACKEND_URL =
    process.env.NEXT_PUBLIC_API_URL ??
    "https://stork-helpers-api.onrender.com/api";

export async function POST(request: NextRequest) {
    try {
        const cookieStore = await cookies();
        const body = await request.json();

        const res = await fetch(`${BACKEND_URL}/tasks`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Cookie: cookieStore.toString(),
            },
            body: JSON.stringify(body),
            cache: "no-store",
        });

        const data = await res.json();

        return NextResponse.json(data, { status: res.status });
    } catch (error) {
        console.error("POST /api/tasks error:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}
