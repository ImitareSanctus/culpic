'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link'; 
import { Menu, X, Bell, User, LogOut, LayoutDashboard, Plus, Search, BookOpen, AlertCircle } from 'lucide-react';

interface MenuItemProps {
  icon: React.ReactNode;
  text: string;
  badge?: string;
  active?: boolean;
  highlight?: boolean;
}

const Navigation = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isLoggedIn] = useState(true);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <>
      {/* =========================================
          1. 상단 헤더 (Header)
      ========================================= */}
      <header className="fixed top-0 left-0 right-0 h-16 bg-white border-b border-gray-200 z-40 px-4 flex items-center justify-between">
        
        {/* [좌측] 햄버거 메뉴 + 로고 */}
        <div className="flex items-center gap-2 md:gap-4 shrink-0">
          <button 
            onClick={() => setIsSidebarOpen(true)}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <Menu className="w-6 h-6 text-gray-700" />
          </button>
          
          {/* 상단 로고 (PC용) */}
          <Link href="/" className="flex items-center gap-2 cursor-pointer">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-lg">
              C
            </div>
            <h1 className="text-xl font-bold text-indigo-600 tracking-tight hidden sm:block">Culpic</h1>
          </Link>
        </div>

        {/* [중앙] 검색창 */}
        <div className="hidden md:flex flex-1 max-w-xl mx-4 lg:mx-8">
          <div className="relative w-full">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-full leading-5 bg-gray-50 placeholder-gray-500 focus:outline-none focus:bg-white focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-all"
              placeholder="찾고 있는 장르나 포지션을 검색해보세요"
            />
          </div>
        </div>

        {/* [우측] 버튼 그룹 */}
        <div className="flex items-center gap-2 md:gap-3 shrink-0">
          <button className="md:hidden p-2 hover:bg-gray-100 rounded-full text-gray-600">
            <Search className="w-5 h-5" />
          </button>

          <Link 
            href="/projects/create" 
            className="flex items-center gap-1 bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-2 rounded-lg text-sm font-medium transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span className="hidden md:inline">프로젝트 만들기</span>
          </Link>

          {isLoggedIn ? (
            <>
              <button className="relative p-2 hover:bg-gray-100 rounded-full">
                <Bell className="w-6 h-6 text-gray-600" />
                <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
              </button>

              <div className="relative" ref={dropdownRef}>
                <button 
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="w-9 h-9 rounded-full bg-gray-200 overflow-hidden border border-gray-300 focus:ring-2 focus:ring-indigo-500 ml-1"
                >
                  <img src="/file.svg" alt="Profile" className="w-full h-full object-cover" />
                </button>

                {isProfileOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-100 py-1 z-50 animate-in fade-in slide-in-from-top-2">
                    <div className="px-4 py-2 border-b border-gray-100">
                      <p className="text-sm font-semibold text-gray-800">성모님</p>
                      <p className="text-xs text-gray-500 truncate">user@email.com</p>
                    </div>
                    <Link href="/profile" className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                      <User className="w-4 h-4" /> 내 프로필
                    </Link>
                    <Link href="/dashboard" className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                      <LayoutDashboard className="w-4 h-4" /> 마이 대시보드
                    </Link>
                    <button className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 text-left">
                      <LogOut className="w-4 h-4" /> 로그아웃
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <Link href="/login" className="text-sm font-medium text-gray-600 hover:text-indigo-600">
              로그인
            </Link>
          )}
        </div>
      </header>

      {/* 헤더 높이만큼의 빈 공간 */}
      <div className="h-16" />

      {/* =========================================
          2. 왼쪽 사이드바 (Drawer Menu)
      ========================================= */}
      
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/40 z-50 transition-opacity"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <aside className={`fixed top-0 left-0 h-full w-72 bg-white z-50 shadow-2xl transform transition-transform duration-300 ease-in-out ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        
        {/* 사이드바 헤더 (여기가 수정되었습니다!) */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-gray-100">
          
          {/* [NEW] 로고 버튼: 클릭 시 홈으로 이동하며 메뉴 닫기 */}
          <Link 
            href="/" 
            onClick={() => setIsSidebarOpen(false)}
            className="flex items-center gap-2 cursor-pointer group"
          >
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-lg group-hover:bg-indigo-700 transition-colors">
              C
            </div>
            <span className="text-xl font-bold text-indigo-600 tracking-tight group-hover:text-indigo-700 transition-colors">Culpic</span>
          </Link>

          {/* 닫기 버튼 */}
          <button onClick={() => setIsSidebarOpen(false)} className="p-2 hover:bg-gray-100 rounded-full">
            <X className="w-6 h-6 text-gray-500" />
          </button>
        </div>

        {/* 사이드바 내용 */}
        <div className="flex flex-col h-[calc(100%-4rem)] justify-between p-4 overflow-y-auto">
          <div className="space-y-6">
            
            {/* 유저 정보 카드 */}
            {isLoggedIn ? (
              <div className="bg-indigo-50 p-4 rounded-xl flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-white overflow-hidden border border-indigo-100 shrink-0">
                   <img src="/file.svg" alt="User" />
                </div>
                <div className="overflow-hidden">
                  <div className="flex items-center gap-1">
                    <span className="font-bold text-gray-900 truncate">성모님</span>
                    <span className="bg-green-100 text-green-700 text-[10px] px-1.5 py-0.5 rounded-full font-bold shrink-0">✅</span>
                  </div>
                  <p className="text-xs text-gray-500 truncate">R&B 보컬</p>
                </div>
              </div>
            ) : (
              <div className="bg-gray-100 p-4 rounded-xl text-center mb-6">
                <p className="text-sm text-gray-600 mb-2">로그인하고 동료를 찾으세요!</p>
                <Link 
                  href="/login" 
                  onClick={() => setIsSidebarOpen(false)}
                  className="block w-full bg-indigo-600 text-white py-2 rounded-lg text-sm font-medium text-center"
                >
                  로그인 / 가입
                </Link>
              </div>
            )}

            {/* 네비게이션 메뉴 */}
            <nav className="space-y-1">
              <Link href="/" className="block" onClick={() => setIsSidebarOpen(false)}>
                <MenuItem icon={<Search className="w-5 h-5"/>} text="프로젝트 찾기" active />
              </Link>
              <Link href="/projects/create" className="block" onClick={() => setIsSidebarOpen(false)}>
                <MenuItem icon={<Plus className="w-5 h-5"/>} text="프로젝트 만들기" highlight />
              </Link>
              <Link href="/dashboard" className="block" onClick={() => setIsSidebarOpen(false)}>
                <MenuItem icon={<LayoutDashboard className="w-5 h-5"/>} text="마이 대시보드" badge="2" />
              </Link>
            </nav>

            <div className="border-t border-gray-100 my-4"></div>

            <nav className="space-y-1">
              <MenuItem icon={<BookOpen className="w-5 h-5"/>} text="이용 가이드" />
              <MenuItem icon={<AlertCircle className="w-5 h-5"/>} text="공지사항" />
            </nav>
          </div>

          <div className="space-y-2">
            <a href="/policy" className="text-xs text-gray-400 hover:text-gray-600 block px-4">약관 | 개인정보</a>
            {isLoggedIn && (
              <button className="w-full flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-red-50 hover:text-red-600 rounded-lg transition-colors">
                <LogOut className="w-5 h-5" />
                <span className="font-medium">로그아웃</span>
              </button>
            )}
          </div>
        </div>
      </aside>
    </>
  );
};

const MenuItem = ({ icon, text, badge, active, highlight }: MenuItemProps) => (
  <div className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition-colors ${
    active ? 'bg-indigo-50 text-indigo-700 font-semibold' : 'text-gray-600 hover:bg-gray-50'
  } ${highlight ? 'text-indigo-600' : ''} cursor-pointer`}>
    <div className="flex items-center gap-3">
      {icon}
      <span className="truncate">{text}</span>
    </div>
    {badge && (
      <span className="bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">{badge}</span>
    )}
  </div>
);

export default Navigation;