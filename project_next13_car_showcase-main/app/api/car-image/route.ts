import { NextRequest, NextResponse } from 'next/server';

// Новый API-роут: Pexels/Unsplash
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const make = searchParams.get('make');
  const model = searchParams.get('model');

  if (!make || !model) {
    return NextResponse.json({ url: '/default-car.jpg' }, { status: 400 });
  }

  // 1. Pexels
  try {
    const response = await fetch(
      `https://api.pexels.com/v1/search?query=${make}%20${model}&per_page=1`,
      {
        headers: {
          Authorization: process.env.NEXT_PUBLIC_PEXELS_KEY || '',
        },
      }
    );
    const data = await response.json();
    const url = data.photos?.[0]?.src?.medium;
    if (url) {
      return NextResponse.json({ url });
    }
  } catch (e) {
    // Игнорируем ошибку и пробуем Unsplash
  }

  // 2. Unsplash
  try {
    const response = await fetch(
      `https://api.unsplash.com/search/photos?query=${make}%20${model}&client_id=${process.env.NEXT_PUBLIC_UNSPLASH_KEY}`
    );
    const data = await response.json();
    const url = data.results?.[0]?.urls?.regular;
    if (url) {
      return NextResponse.json({ url });
    }
  } catch (e) {
    // Если и Unsplash не сработал, возвращаем дефолт
  }

  // 3. Дефолт
  return NextResponse.json({ url: '/default-car.jpg' });
}
