import prisma from '@/lib/prismadb';
import { NextResponse } from 'next/server';

export const POST = async (req: Request) => {
  const {
    nik,
    name,
    place_of_birth,
    date_of_birth,
    biological_mother,
    work,
    protection_period,
    isPaid,
    created_at,
  } = await req.json();

  if (!nik && !name) {
    return NextResponse.json({ status_code: 500, message: 'nik and name are required' });
  }
  try {
    const data = await prisma.participant.create({
      data: {
        nik,
        name,
        place_of_birth,
        date_of_birth,
        biological_mother,
        work,
        protection_period,
        isPaid,
        created_at,
      },
    });
    console.log('Success to created', data);
    return NextResponse.json({ status_code: 200, message: 'Success to created', data });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ status_code: 500, message: 'Some error occurred' });
  }
};

export const GET = async () => {
  try {
    const data = await prisma.participant.findMany();
    if (!data) {
      return NextResponse.json({ status_code: 404, message: 'Data not found', data: [] });
    }
    return NextResponse.json({ status_code: 200, message: 'Success to Fetch', data });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ status_code: 500, message: 'Some error occurred', error });
  }
};
