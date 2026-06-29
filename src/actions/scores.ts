"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";

export async function createScore(formData: FormData) {
  await prisma.score.create({
    data: {
      memberId: parseInt(formData.get("memberId") as string),
      course: formData.get("course") as string,
      playedAt: new Date(formData.get("playedAt") as string),
      score: parseInt(formData.get("score") as string),
      par: parseInt((formData.get("par") as string) || "72"),
    },
  });
  revalidatePath("/scores");
  redirect("/scores");
}

export async function deleteScore(id: number) {
  await prisma.score.delete({ where: { id } });
  revalidatePath("/scores");
}
