import Link from "next/link";
import { prisma } from "@/lib/db";
import { deleteMember } from "@/actions/members";

export default async function MembersPage() {
  const members = await prisma.member.findMany({
    orderBy: { joinedAt: "desc" },
    include: { _count: { select: { reservations: true, scores: true } } },
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">회원 관리</h1>
        <Link
          href="/members/new"
          className="bg-green-700 text-white px-4 py-2 rounded-lg text-sm hover:bg-green-800 transition-colors"
        >
          + 회원 등록
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        {members.length === 0 ? (
          <p className="p-8 text-center text-gray-400">등록된 회원이 없습니다.</p>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-gray-50 rounded-t-xl">
              <tr className="text-left text-gray-500">
                <th className="px-6 py-3">이름</th>
                <th className="px-6 py-3">이메일</th>
                <th className="px-6 py-3">연락처</th>
                <th className="px-6 py-3">회원권</th>
                <th className="px-6 py-3">예약</th>
                <th className="px-6 py-3">가입일</th>
                <th className="px-6 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {members.map((m) => (
                <tr key={m.id} className="border-t border-gray-50">
                  <td className="px-6 py-4 font-medium">{m.name}</td>
                  <td className="px-6 py-4 text-gray-600">{m.email}</td>
                  <td className="px-6 py-4 text-gray-600">{m.phone || "-"}</td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-0.5 rounded-full text-xs bg-green-100 text-green-700">{m.membershipType}</span>
                  </td>
                  <td className="px-6 py-4 text-gray-600">{m._count.reservations}건</td>
                  <td className="px-6 py-4 text-gray-500">{new Date(m.joinedAt).toLocaleDateString("ko-KR")}</td>
                  <td className="px-6 py-4">
                    <form action={deleteMember.bind(null, m.id)}>
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
