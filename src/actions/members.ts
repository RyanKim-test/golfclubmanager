"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";

export async function createMember(formData: FormData) {
  await prisma.member.create({
    data: {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      phone: (formData.get("phone") as string) || null,
      membershipType: (formData.get("membershipType") as string) || "일반",
    },
  });
  revalidatePath("/members");
  redirect("/members");
}

export async function deleteMember(id: number) {
  await prisma.member.delete({ where: { id } });
  revalidatePath("/members");
}
