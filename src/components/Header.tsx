"use client";

import { Search, Bell, PlusSquare } from "lucide-react";
import Link from "next/link";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-100 bg-white/80 backdrop-blur-md">
      <div className="flex h-16 items-center justify-between px-6 md:px-10 max-w-7xl mx-auto">
        
        {/* 1. 로고 (Culpic) */}
        <Link href="/" className="flex items-center gap-1 group">
          <div className="w-5 h-5 bg-slate-900 rounded-sm group-hover:bg-blue-600 transition-colors" /> {/* 심플한 심볼 */}
          <span className="text-xl font-black tracking-tighter text-slate-900 font-sans">
            Culpic
          </span>
        </Link>

        {/* 2. 검색바 (중앙 배치) */}
        <div className="hidden md:flex flex-1 max-w-md mx-8">
          <div className="relative w-full group">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors">
              <Search className="w-4 h-4" />
            </div>
            <input
              type="text"
              placeholder="찾고 있는 장르나 포지션을 검색해보세요"
              className="h-10 w-full rounded-full bg-slate-100 pl-10 pr-4 text-sm font-medium text-slate-900 outline-none ring-1 ring-transparent transition-all focus:bg-white focus:ring-blue-500 placeholder:text-slate-400"
            />
          </div>
        </div>

        {/* 3. 우측 메뉴 (프로젝트 생성, 알림, 마이페이지) */}
        <div className="flex items-center gap-3">
          
          {/* 모바일용 검색 아이콘 (화면 작을 때만 보임) */}
          <button className="md:hidden p-2 text-slate-500 hover:bg-slate-100 rounded-full">
            <Search className="w-5 h-5" />
          </button>

          <Link 
  href="/projects/create" 
  className="hidden sm:flex items-center gap-2 px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-full text-xs font-bold transition-all hover:scale-105 active:scale-95"
>
  <PlusSquare className="w-4 h-4" />
  <span>프로젝트 만들기</span>
</Link>

          {/* 알림 아이콘 */}
          <button className="relative p-2 text-slate-500 hover:bg-slate-100 rounded-full transition-colors">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-white" />
          </button>

          {/* 4. 마이페이지 (프로필 아바타) */}
          <div className="ml-1 cursor-pointer">
            <div className="w-9 h-9 rounded-full bg-linear-to-tr from-blue-500 to-purple-500 p-0.5">
              <div className="w-full h-full rounded-full bg-white flex items-center justify-center overflow-hidden">
                 {/* 실제로는 여기에 유저 이미지 태그가 들어감 */}
                 <span className="text-xs font-bold text-slate-700">SM</span> 
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </header>
  );
}