import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    const { token, password } = await req.json();

    if (!token || !password) {
      return NextResponse.json({ error: "Token and new password are required" }, { status: 400 });
    }

    const resetToken = await prisma.passwordResetToken.findUnique({
      where: { token }
    });

    if (!resetToken || resetToken.expires < new Date()) {
      return NextResponse.json({ error: "Token is invalid or has expired" }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { email: resetToken.email }
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Update user's password
    await prisma.user.update({
      where: { id: user.id },
      data: { password: hashedPassword }
    });

    // Delete the used token to prevent reuse
    await prisma.passwordResetToken.delete({
      where: { id: resetToken.id }
    });

    return NextResponse.json({ success: true, message: "Password reset successful" });
  } catch (error) {
    console.error("Reset password error:", error);
    return NextResponse.json({ error: "An unexpected error occurred" }, { status: 500 });
  }
}
