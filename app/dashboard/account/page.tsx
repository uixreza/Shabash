import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";
import AccountForm from "@/components/dashboard/AccountForm";

export default async function AccountPage() {
  const session = await getServerSession(authOptions);
  const phone = session?.user?.phone;
  if (!phone) redirect("/");

  const user = await prisma.user.findUnique({ where: { phone } });

  return (
    <main className="flex-1 overflow-y-auto p-6">
      <div className="mx-auto max-w-2xl">
        <h1 className="text-2xl font-bold text-foreground">حساب کاربری</h1>
        <p className="mt-1 text-sm text-foreground/50">
          اطلاعات حساب خود را مشاهده و ویرایش کنید
        </p>
        <AccountForm
          initial={{
            phone,
            name: user?.name ?? "",
            nationalId: user?.nationalId ?? "",
            dateOfBirth: user?.dateOfBirth ?? "",
          }}
        />
      </div>
    </main>
  );
}
