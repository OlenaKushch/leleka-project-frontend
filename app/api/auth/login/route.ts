import { NextRequest, NextResponse } from 'next/server';
import { api } from '@/services/api';
import { parse } from 'cookie';
import axios, { AxiosError } from 'axios';

interface BackendErrorResponse {
  message?: string;
  error?: string;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const apiRes = await api.post('/auth/login', body);
    const res = NextResponse.json(apiRes.data, { status: apiRes.status });
    const setCookie = apiRes.headers['set-cookie'];

    if (setCookie) {
      const cookieArray = Array.isArray(setCookie) ? setCookie : [setCookie];

      cookieArray.forEach((cookieStr) => {
        const parsed = parse(cookieStr);
        const cookieName = Object.keys(parsed).find(
          (key) => !['Path', 'Max-Age', 'Expires', 'HttpOnly', 'Secure', 'SameSite', 'Domain'].includes(key)
        );
        const cookieValue = cookieName ? parsed[cookieName] : undefined;

        if (cookieName && typeof cookieValue === 'string') {
          res.cookies.set(cookieName, cookieValue, {
            path: parsed.Path ?? '/',
            httpOnly: true,
            maxAge: parsed['Max-Age'] ? Number(parsed['Max-Age']) : undefined,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
          });
        }
      });
    }

    return res;

  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError<BackendErrorResponse>;
      
      console.error('🔴 Login API Error:', axiosError.response?.data || axiosError.message);

      return NextResponse.json(
        { 
          error: axiosError.response?.data?.message || 
                 axiosError.response?.data?.error || 
                 axiosError.message 
        },
        { status: axiosError.response?.status ?? 500 }
      );
    }

    console.error('🔴 Unexpected Login Error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' }, 
      { status: 500 }
    );
  }
}