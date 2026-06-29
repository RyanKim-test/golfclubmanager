import Link from "next/link";
import { createMember } from "@/actions/members";

export default function NewMemberPage() {
  return (
    <div className="max-w-lg">
      <div className="flex items-center gap-3 mb-6">
        <Link href="/members" className="text-gray-400 hover:text-gray-600">←</Link>
        <h1 className="text-2xl font-bold text-gray-800">회원 등록</h1>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <form action={createMember} className="flex flex-col gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">이름 *</label>
            <input
              name="name"
              required
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="홍길동"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">이메일 *</label>
            <input
              name="email"
              type="email"
              required
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="hong@example.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">연락처</label>
            <input
              name="phone"
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="010-0000-0000"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">회원권 종류</label>
            <select
              name="membershipType"
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="일반">일반</option>
              <option value="VIP">VIP</option>
              <option value="준회원">준회원</option>
            </select>
          </div>
          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              className="flex-1 bg-green-700 text-white py-2 rounded-lg text-sm font-medium hover:bg-green-800 transition-colors"
            >
              등록하기
            </button>
            <Link
              href="/members"
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
