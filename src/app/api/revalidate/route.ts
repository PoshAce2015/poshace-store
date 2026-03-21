import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

export async function POST(request: NextRequest) {
  const secret = request.headers.get("x-revalidation-secret");
  if (secret !== process.env.REVALIDATION_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const { type, slug, path } = body;

  if (type === "product" && slug) {
    revalidatePath(`/in/p/${slug}`);
    revalidatePath(`/us/p/${slug}`);
    revalidatePath(`/ae/p/${slug}`);
    return NextResponse.json({ revalidated: true, slug });
  }

  if (type === "category" && path) {
    revalidatePath(`/in/category/${path}`);
    return NextResponse.json({ revalidated: true, path });
  }

  if (type === "home") {
    revalidatePath("/");
    return NextResponse.json({ revalidated: true, type: "home" });
  }

  return NextResponse.json({ error: "Invalid type" }, { status: 400 });
}
