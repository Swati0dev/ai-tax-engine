import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { sendPasswordResetEmail } from "@/lib/mail";
import crypto from "crypto";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { email }
    });

    if (!user) {
      // Don't leak whether the email exists, just return success
      return NextResponse.json({ success: true, message: "If your email is registered, you will receive a reset link." });
    }

    // Generate secure token
    const token = crypto.randomBytes(32).toString("hex");
    const expires = new Date(Date.now() + 3600 * 1000); // 1 hour expiration

    // Clear previous tokens for this email
    await prisma.passwordResetToken.deleteMany({
      where: { email }
    });

    // Save new token to DB
    await prisma.passwordResetToken.create({
      data: {
        email,
        token,
        expires
      }
    });

    await sendPasswordResetEmail(email, token);

    return NextResponse.json({ success: true, message: "If your email is registered, you will receive a reset link." });
  } catch (error) {
    console.error("Forgot password error:", error);
    return NextResponse.json({ error: "An unexpected error occurred" }, { status: 500 });
  }
}
