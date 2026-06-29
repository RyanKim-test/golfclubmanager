import Link from "next/link";
import { prisma } from "@/lib/db";
import { createScore } from "@/actions/scores";

export default async function NewScorePage() {
  const members = await prisma.member.findMany({ orderBy: { name: "asc" } });

  return (
    <div className="max-w-lg">
      <div className="flex items-center gap-3 mb-6">
        <Link href="/scores" className="text-gray-400 hover:text-gray-600">←</Link>
        <h1 className="text-2xl font-bold text-gray-800">스코어 등록</h1>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <form action={createScore} className="flex flex-col gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">회원 *</label>
            <select
              name="memberId"
              required
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
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
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="예) 동코스"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">플레이 날짜 *</label>
            <input
              name="playedAt"
              type="date"
              required
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">스코어 *</label>
              <input
                name="score"
                type="number"
                required
                min="18"
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="72"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">파</label>
              <input
                name="par"
                type="number"
                defaultValue="72"
                min="18"
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
          </div>
          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              className="flex-1 bg-purple-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-purple-700 transition-colors"
            >
              등록하기
            </button>
            <Link
              href="/scores"
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
