import { NextResponse } from 'next/server';
import { authService } from '@/services/auth.service';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const result = await authService.register(body);

    if (result.error) {
      return NextResponse.json(result.error.errors, { status: 400 });
    }

    return NextResponse.json(result.data, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}