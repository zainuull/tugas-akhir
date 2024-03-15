import prisma from '@/lib/prismadb';
import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';

export const POST = async (req: Request) => {
  const { name, email, password, role } = await req.json();

  if (!name && !email && !password) {
    return NextResponse.json({ status_code: 500, message: 'name and email are required' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const data = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role,
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
    const data = await prisma.user.findMany();
    if (!data) {
      return NextResponse.json({ status_code: 404, message: 'Data not found', data: [] });
    }
    return NextResponse.json({ status_code: 200, message: 'Success to Fetch', data });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ status_code: 500, message: 'Some error occurred', error });
  }
};
