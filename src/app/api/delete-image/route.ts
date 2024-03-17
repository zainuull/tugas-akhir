import cloudinary from 'cloudinary';
import { NextResponse } from 'next/server';

cloudinary.v2.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const deleteImage = async (publicId: string) => {
  console.log(publicId);

  try {
    const res = await cloudinary.v2.uploader.destroy(publicId);
    console.log('success', res);
  } catch (error) {
    console.log(error);
  }
};

export async function POST(req: Request) {
  const { publicId } = await req.json();
  await deleteImage(publicId);
  return NextResponse.json({ status_code: 200, message: 'Success to delete image' });
}
