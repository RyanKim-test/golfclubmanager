import Link from "next/link";
import { prisma } from "@/lib/db";

export default async function Home() {
  const [memberCount, reservationCount, scoreCount] = await Promise.all([
    prisma.member.count(),
    prisma.reservation.count(),
    prisma.score.count(),
  ]);

  const recentReservations = await prisma.reservation.findMany({
    take: 5,
    orderBy: { teeTime: "asc" },
    where: { teeTime: { gte: new Date() } },
    include: { member: true },
  });

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">대시보드</h1>

      <div className="grid grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <p className="text-sm text-gray-500 mb-1">총 회원</p>
          <p className="text-3xl font-bold text-green-700">{memberCount}명</p>
          <Link href="/members" className="text-xs text-green-600 hover:underline mt-2 inline-block">관리하기 →</Link>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <p className="text-sm text-gray-500 mb-1">총 예약</p>
          <p className="text-3xl font-bold text-blue-700">{reservationCount}건</p>
          <Link href="/reservations" className="text-xs text-blue-600 hover:underline mt-2 inline-block">관리하기 →</Link>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <p className="text-sm text-gray-500 mb-1">스코어 기록</p>
          <p className="text-3xl font-bold text-purple-700">{scoreCount}개</p>
          <Link href="/scores" className="text-xs text-purple-600 hover:underline mt-2 inline-block">보기 →</Link>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">예정된 예약</h2>
        {recentReservations.length === 0 ? (
          <p className="text-gray-400 text-sm">예정된 예약이 없습니다.</p>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-gray-500 border-b">
                <th className="pb-2">회원</th>
                <th className="pb-2">코스</th>
                <th className="pb-2">티타임</th>
                <th className="pb-2">인원</th>
                <th className="pb-2">상태</th>
              </tr>
            </thead>
            <tbody>
              {recentReservations.map((r) => (
                <tr key={r.id} className="border-b last:border-0">
                  <td className="py-2">{r.member.name}</td>
                  <td className="py-2">{r.course}</td>
                  <td className="py-2">{new Date(r.teeTime).toLocaleString("ko-KR")}</td>
                  <td className="py-2">{r.players}명</td>
                  <td className="py-2">
                    <span className="px-2 py-0.5 rounded-full text-xs bg-blue-100 text-blue-700">{r.status}</span>
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
