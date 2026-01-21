import { isAxiosError } from "axios";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { api } from "../../../client";

type RouteParams = {
    params: Promise<{ id: string; }>;
};

export async function PATCH(
    request: NextRequest,
    { params }: RouteParams
) {
    try {
        const cookieStore = await cookies();

        const { id } = await params;

        const body = await request.json();

        const response = await api.patch(`/tasks/${id}/status`, body,
            {
                headers: { Cookie: cookieStore.toString(), },
            }
        );
        return NextResponse.json(response.data, {
            status: response.status,
        });
    } catch (error) {
        if (isAxiosError(error)) {

            return NextResponse.json(
                {
                    error: error.message,
                    backendResponse: error.response?.data,
                },
                {
                    status: error.response?.status || 500,
                }
            );
        }
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}