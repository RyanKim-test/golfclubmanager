"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";

export async function createReservation(formData: FormData) {
  await prisma.reservation.create({
    data: {
      memberId: parseInt(formData.get("memberId") as string),
      course: formData.get("course") as string,
      teeTime: new Date(formData.get("teeTime") as string),
      players: parseInt((formData.get("players") as string) || "1"),
      status: "예약중",
    },
  });
  revalidatePath("/reservations");
  redirect("/reservations");
}

export async function updateReservationStatus(id: number, status: string) {
  await prisma.reservation.update({ where: { id }, data: { status } });
  revalidatePath("/reservations");
}

export async function deleteReservation(id: number) {
  await prisma.reservation.delete({ where: { id } });
  revalidatePath("/reservations");
}
