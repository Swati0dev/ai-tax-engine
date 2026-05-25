export async function sendPasswordResetEmail(email: string, token: string) {
  const resetLink = `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/reset-password?token=${token}`;

  // In a real production app, use Resend, SendGrid, or Nodemailer here.
  // For now, keeping the architecture ready and logging to console as a mock provider.
  console.log("=========================================");
  console.log(`[MAILER MOCK] Sending Password Reset Email`);
  console.log(`[MAILER MOCK] To: ${email}`);
  console.log(`[MAILER MOCK] Link: ${resetLink}`);
  console.log("=========================================");

  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1000));
}
