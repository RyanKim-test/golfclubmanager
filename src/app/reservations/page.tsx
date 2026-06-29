import Link from "next/link";
import { prisma } from "@/lib/db";
import { deleteReservation, updateReservationStatus } from "@/actions/reservations";

const STATUS_COLORS: Record<string, string> = {
  "예약중": "bg-blue-100 text-blue-700",
  "완료": "bg-green-100 text-green-700",
  "취소": "bg-red-100 text-red-700",
};

export default async function ReservationsPage() {
  const reservations = await prisma.reservation.findMany({
    orderBy: { teeTime: "asc" },
    include: { member: true },
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">예약 관리</h1>
        <Link
          href="/reservations/new"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition-colors"
        >
          + 예약 등록
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        {reservations.length === 0 ? (
          <p className="p-8 text-center text-gray-400">등록된 예약이 없습니다.</p>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr className="text-left text-gray-500">
                <th className="px-6 py-3">회원</th>
                <th className="px-6 py-3">코스</th>
                <th className="px-6 py-3">티타임</th>
                <th className="px-6 py-3">인원</th>
                <th className="px-6 py-3">상태</th>
                <th className="px-6 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {reservations.map((r) => (
                <tr key={r.id} className="border-t border-gray-50">
                  <td className="px-6 py-4 font-medium">{r.member.name}</td>
                  <td className="px-6 py-4 text-gray-600">{r.course}</td>
                  <td className="px-6 py-4 text-gray-600">{new Date(r.teeTime).toLocaleString("ko-KR")}</td>
                  <td className="px-6 py-4 text-gray-600">{r.players}명</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-0.5 rounded-full text-xs ${STATUS_COLORS[r.status] ?? "bg-gray-100 text-gray-600"}`}>
                      {r.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 flex gap-2">
                    {r.status === "예약중" && (
                      <form action={updateReservationStatus.bind(null, r.id, "완료")}>
                        <button type="submit" className="text-green-500 hover:text-green-700 text-xs">완료</button>
                      </form>
                    )}
                    <form action={deleteReservation.bind(null, r.id)}>
                      <button type="submit" className="text-red-400 hover:text-red-600 text-xs">삭제</button>
                    </form>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
