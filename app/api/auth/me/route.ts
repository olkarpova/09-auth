// app/api/auth/me/route.ts

import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { api, ApiError } from "@/app/api/api";

// Решта коду для GET

export async function PUT(request: Request) {
  const cookieStore = await cookies();
  const body = await request.json();
  try {
    const { data } = await api.put("/auth/me", body, {
      headers: {
        Cookie: cookieStore.toString(),
      },
    });

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      {
        error:
          (error as ApiError).response?.data?.error ??
          (error as ApiError).message,
      },
      { status: (error as ApiError).status },
    );
  }
}
