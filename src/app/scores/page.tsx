import Link from "next/link";
import { prisma } from "@/lib/db";
import { deleteScore } from "@/actions/scores";

export default async function ScoresPage() {
  const scores = await prisma.score.findMany({
    orderBy: { playedAt: "desc" },
    include: { member: true },
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">스코어 기록</h1>
        <Link
          href="/scores/new"
          className="bg-purple-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-purple-700 transition-colors"
        >
          + 스코어 등록
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        {scores.length === 0 ? (
          <p className="p-8 text-center text-gray-400">등록된 스코어가 없습니다.</p>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr className="text-left text-gray-500">
                <th className="px-6 py-3">회원</th>
                <th className="px-6 py-3">코스</th>
                <th className="px-6 py-3">날짜</th>
                <th className="px-6 py-3">스코어</th>
                <th className="px-6 py-3">파</th>
                <th className="px-6 py-3">+/-</th>
                <th className="px-6 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {scores.map((s) => {
                const diff = s.score - s.par;
                return (
                  <tr key={s.id} className="border-t border-gray-50">
                    <td className="px-6 py-4 font-medium">{s.member.name}</td>
                    <td className="px-6 py-4 text-gray-600">{s.course}</td>
                    <td className="px-6 py-4 text-gray-600">{new Date(s.playedAt).toLocaleDateString("ko-KR")}</td>
                    <td className="px-6 py-4 font-bold">{s.score}</td>
                    <td className="px-6 py-4 text-gray-500">{s.par}</td>
                    <td className="px-6 py-4">
                      <span className={`font-medium ${diff < 0 ? "text-blue-600" : diff === 0 ? "text-gray-600" : "text-red-500"}`}>
                        {diff > 0 ? `+${diff}` : diff}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <form action={deleteScore.bind(null, s.id)}>
                        <button type="submit" className="text-red-400 hover:text-red-600 text-xs">삭제</button>
                      </form>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
