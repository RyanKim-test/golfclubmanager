import Link from "next/link";
import { prisma } from "@/lib/db";
import { createReservation } from "@/actions/reservations";

export default async function NewReservationPage() {
  const members = await prisma.member.findMany({ orderBy: { name: "asc" } });

  return (
    <div className="max-w-lg">
      <div className="flex items-center gap-3 mb-6">
        <Link href="/reservations" className="text-gray-400 hover:text-gray-600">←</Link>
        <h1 className="text-2xl font-bold text-gray-800">예약 등록</h1>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <form action={createReservation} className="flex flex-col gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">회원 *</label>
            <select
              name="memberId"
              required
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">회원 선택</option>
              {members.map((m) => (
                <option key={m.id} value={m.id}>{m.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">코스명 *</label>
            <input
              name="course"
              required
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="예) 동코스 1번홀"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">티타임 *</label>
            <input
              name="teeTime"
              type="datetime-local"
              required
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">인원</label>
            <input
              name="players"
              type="number"
              min="1"
              max="8"
              defaultValue="1"
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              className="flex-1 bg-blue-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
            >
              예약하기
            </button>
            <Link
              href="/reservations"
              className="flex-1 text-center border border-gray-200 py-2 rounded-lg text-sm text-gray-600 hover:bg-gray-50 transition-colors"
            >
              취소
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
