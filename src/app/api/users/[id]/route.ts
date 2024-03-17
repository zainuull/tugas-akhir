import prisma from '@/lib/prismadb';
import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';

export const GET = async (req: Request, { params }: { params: { id: string } }) => {
  const id = params.id;
  try {
    const data = await prisma.users.findUnique({
      where: { id },
    });
    if (!data) {
      return NextResponse.json({ status_code: 404, message: 'Data not found', data: [] });
    }
    return NextResponse.json({ status_code: 200, message: 'Success to fetch data by id', data });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ status_code: 500, message: 'Failed to fetch data', error });
  }
};

export const PUT = async (req: Request, { params }: { params: { id: string } }) => {
  const id = params.id;
  const { name, email, password, role, image, created_at } = await req.json();

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const data = await prisma.users.update({
      where: { id },
      data: {
        name,
        email,
        password: hashedPassword,
        role,
        image,
        created_at,
      },
    });
    if (!data) {
      return NextResponse.json({ status_code: 404, message: 'Data not found', data: [] });
    }
    return NextResponse.json({ status_code: 200, message: 'Success to update', data });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ status_code: 500, message: 'Failed to update data', error });
  }
};

export const DELETE = async (req: Request, { params }: { params: { id: string } }) => {
  const id = params.id;
  try {
    const data = await prisma.users.delete({ where: { id } });
    if (!data) {
      return NextResponse.json({ status_code: 404, message: 'Data not found', data: [] });
    }
    return NextResponse.json({ status_code: 200, message: 'Success to delete', data });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ status_code: 500, message: 'Failed to delete data', error });
  }
};
