import React from 'react';
import { 
  Search, 
  UserCircle, 
  ChevronRight,
  Star,
  Music2,
  Mic2,
  Drum,
  Cloud
} from 'lucide-react';

export default function HomePage() {
  // 검색 추천 키워드와 아이콘 매칭
  const suggestions = [
    { name: "재즈", icon: <Music2 size={14} /> },
    { name: "드럼", icon: <Drum size={14} /> },
    { name: "기타", icon: <Music2 size={14} /> },
    { name: "몽환적인 느낌", icon: <Cloud size={14} /> }
  ];

  // 아티스트 예시 데이터
  const artists = [
    {
      id: 1,
      name: "김진아",
      role: "재즈 기타리스트",
      vibe: "따뜻하고 부드러운 선율",
      tags: ["Jazz", "Guitar"],
      rating: 4.9
    },
    {
      id: 2,
      name: "정모건",
      role: "드럼 세션 / 프로듀서",
      vibe: "공간감 있는 사운드 디자인",
      tags: ["Drums", "Ambient"],
      rating: 4.8
    },
    {
      id: 3,
      name: "이하늘",
      role: "신디사이저 작곡가",
      vibe: "새벽녘 같은 신비로운 분위기",
      tags: ["Dreamy", "Electronic"],
      rating: 5.0
    }
  ];

  return (
    // '쨍한' 보라 대신 차분한 슬레이트 퍼플(bg-[#0a0a0c]) 단색 배경 사용
    <div className="min-h-screen bg-[#0a0a0c] text-slate-200 selection:bg-violet-500/30 font-sans">
      
      {/* 1. 심플 네비게이션 */}
      <nav className="fixed top-0 z-50 w-full border-b border-white/5 bg-[#0a0a0c]/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <div className="text-xl font-bold tracking-tight text-white">
            CUL<span className="text-violet-400">PIC</span>
          </div>

          <div className="flex items-center gap-8 text-sm font-medium text-slate-400">
            <button className="hover:text-white transition-colors">라운지</button>
            <button className="hover:text-white transition-colors">프로젝트</button>
            <button className="hover:text-white transition-colors">아티스트</button>
            <UserCircle size={22} className="text-slate-500 cursor-pointer hover:text-white transition-colors" />
          </div>
        </div>
      </nav>

      {/* 2. 검색 섹션 (직관적인 레이아웃) */}
      <main className="mx-auto max-w-3xl px-6 pt-44 pb-20">
        <div className="space-y-12">
          {/* 헤드라인: 문구 최소화 */}
          <div className="text-center space-y-3">
            <h1 className="text-4xl font-bold tracking-tight text-white md:text-5xl">
              어떤 파트너를 찾으시나요?
            </h1>
            <p className="text-slate-500 text-lg">장르, 악기, 분위기 키워드로 검색해 보세요.</p>
          </div>

          {/* 깔끔한 검색바 */}
          <div className="space-y-6">
            <div className="relative group">
              <div className="flex items-center bg-white/5 border border-white/10 rounded-2xl px-6 py-5 focus-within:border-violet-500/50 focus-within:bg-white/[0.08] transition-all">
                <Search className="text-slate-500 mr-4" size={20} />
                <input 
                  type="text" 
                  placeholder="예: 재즈, 몽환적인 느낌, 드럼..." 
                  className="w-full bg-transparent border-none text-white placeholder-slate-600 outline-none text-lg"
                />
              </div>
            </div>

            {/* 추천 태그 (차분한 색감) */}
            <div className="flex flex-wrap items-center justify-center gap-2">
              {suggestions.map((item) => (
                <button 
                  key={item.name}
                  className="flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white/5 border border-white/5 text-xs text-slate-400 hover:bg-white/10 hover:text-violet-300 transition-all"
                >
                  {item.icon}
                  {item.name}
                </button>
              ))}
            </div>
          </div>

          {/* 3. 검색 결과 예시 (리스트) */}
          <div className="pt-10 space-y-6">
            <div className="flex items-center justify-between px-2">
              <h2 className="text-xs font-bold text-slate-500 uppercase tracking-widest">추천 아티스트</h2>
              <div className="h-px flex-1 mx-4 bg-white/5"></div>
            </div>

            <div className="grid gap-3">
              {artists.map((artist) => (
                <div 
                  key={artist.id} 
                  className="group flex items-center justify-between p-5 rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] hover:border-violet-500/30 transition-all cursor-pointer"
                >
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-xl bg-violet-500/10 flex items-center justify-center text-violet-400 font-bold border border-violet-500/20">
                      {artist.name[0]}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="font-bold text-slate-200">{artist.name}</span>
                        <span className="text-[10px] text-slate-500 font-medium">| {artist.role}</span>
                      </div>
                      <p className="text-xs text-slate-500 mb-2">{artist.vibe}</p>
                      <div className="flex gap-2">
                        {artist.tags.map(tag => (
                          <span key={tag} className="text-[10px] text-violet-400/80 font-medium italic">#{tag}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="hidden sm:flex items-center gap-1 text-slate-500 group-hover:text-violet-400 transition-colors">
                      <Star size={12} fill="currentColor" className="text-violet-500/50" />
                      <span className="text-xs font-bold">{artist.rating}</span>
                    </div>
                    <ChevronRight size={18} className="text-slate-600 group-hover:text-white transition-all" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}