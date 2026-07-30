import { constructMetadata } from "@/lib/seo";

export const metadata = constructMetadata({
  title: "Login | AI Tax Engine",
  description: "Sign in to your AI Tax Engine account to access personalized tax insights and tools.",
});

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
