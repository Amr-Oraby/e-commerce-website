import { requireAuth } from "@/lib/auth";
import { ProfileSidebar } from "@/app/features/profile/components/ProfileSidebar";

export default async function layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  await requireAuth();
  return (
    <div className="flex items-start gap-1 md:gap-5 py-10 mx-2 md:mx-10 pt-10 ">
      <ProfileSidebar />
      <div className="min-h-200 w-232.5">{children}</div>
    </div>
  );
}
