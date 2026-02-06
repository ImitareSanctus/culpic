'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Filter, Play, DollarSign, PieChart, Zap, BarChart3 } from 'lucide-react';

// ==========================================
// 1. 더미 데이터 (오디오 URL 포함)
// ==========================================

const IMG_JAZZ_1 = "https://picsum.photos/seed/jazz1/600/600";
const IMG_JAZZ_2 = "https://picsum.photos/seed/music/600/600";
const IMG_JAZZ_3 = "https://picsum.photos/seed/piano/600/600";
const IMG_JAZZ_4 = "https://picsum.photos/seed/drum/600/600";
const IMG_RNB_1 = "https://picsum.photos/seed/vocal/600/600";
const IMG_RNB_2 = "https://picsum.photos/seed/night/600/600";
const IMG_RNB_3 = "https://picsum.photos/seed/purple/600/600";
const IMG_RNB_4 = "https://picsum.photos/seed/mic/600/600";
const IMG_PIANO_1 = "https://picsum.photos/seed/classic/600/600";
const IMG_PIANO_2 = "https://picsum.photos/seed/calm/600/600";

const GENRES = ["전체", "Jazz", "R&B", "Ballad", "Pop", "Rock", "Classic", "Hiphop", "Electronic"];
const POSITIONS = ["전체", "보컬", "작곡", "편곡", "피아노", "기타", "베이스", "드럼", "믹싱", "트럼펫"];

// 오디오 링크 (무료 음원)
const AUDIO_JAZZ = "https://archive.org/download/Jazz_Sampler-9619/Kevin_MacLeod_-_Faster_Does_It.mp3";
const AUDIO_RNB = "https://archive.org/download/Jazz_Sampler-9619/Kevin_MacLeod_-_AcidJazz.mp3";
const AUDIO_PIANO = "https://archive.org/download/Classical_Sampler-9615/Kevin_MacLeod_-_Gymnopedie_No_1.mp3";

const ALL_PROJECTS = [
  // JAZZ
  {
    id: 101,
    title: "한밤의 재즈바 라이브 세션 (콘트라베이스 구함)",
    maker: "Jazz_Master",
    dday: "D-3",
    genre: "Jazz",
    type: "pay",
    positions: ["베이스", "피아노"],
    image: IMG_JAZZ_1,
    audioUrl: AUDIO_JAZZ
  },
  {
    id: 102,
    title: "스윙 재즈 드럼 & 브라스 세션 모집",
    maker: "SwingKing",
    dday: "D-7",
    genre: "Jazz",
    type: "split",
    positions: ["드럼", "트럼펫"],
    image: IMG_JAZZ_2,
    audioUrl: "https://archive.org/download/Jazz_Sampler-9619/Kevin_MacLeod_-_Corncob.mp3"
  },
  {
    id: 103,
    title: "카페 BGM용 로파이(Lofi) 재즈 합작",
    maker: "CoffeeCat",
    dday: "Today",
    genre: "Jazz",
    type: "mix",
    positions: ["믹싱", "피아노"],
    image: IMG_JAZZ_3,
    audioUrl: "https://archive.org/download/Jazz_Sampler-9619/Kevin_MacLeod_-_Night_on_the_Docks_-_Sax.mp3"
  },
  {
    id: 104,
    title: "재즈 피아노 트리오 결성하실 분",
    maker: "BlueNote",
    dday: "D-1",
    genre: "Jazz",
    type: "split",
    positions: ["드럼", "베이스"],
    image: IMG_JAZZ_4,
    audioUrl: "https://archive.org/download/Jazz_Sampler-9619/Kevin_MacLeod_-_Backed_Vibes_Clean.mp3"
  },
  // R&B
  {
    id: 201,
    title: "몽환적인 R&B 트랙 보컬 구합니다",
    maker: "Seongmo",
    dday: "D-2",
    genre: "R&B",
    type: "mix",
    positions: ["보컬", "믹싱"],
    image: IMG_RNB_1,
    audioUrl: AUDIO_RNB
  },
  {
    id: 202,
    title: "트렌디한 PBR&B 비트 메이킹 협업",
    maker: "TheWeeknd_Fan",
    dday: "D-5",
    genre: "R&B",
    type: "split",
    positions: ["작곡", "편곡"],
    image: IMG_RNB_2,
    audioUrl: "https://archive.org/download/Jazz_Sampler-9619/Kevin_MacLeod_-_Vibe_Ace.mp3"
  },
  {
    id: 203,
    title: "그루비한 베이스 라인 만들어주실 분",
    maker: "Groove_Rider",
    dday: "D-10",
    genre: "R&B",
    type: "pay",
    positions: ["베이스"],
    image: IMG_RNB_3,
    audioUrl: "https://archive.org/download/Jazz_Sampler-9619/Kevin_MacLeod_-_I_Knew_a_Guy.mp3"
  },
  {
    id: 204,
    title: "새벽 감성 R&B 탑라인 작곡가 모십니다",
    maker: "Dawn_Music",
    dday: "D-4",
    genre: "R&B",
    type: "split",
    positions: ["보컬", "피아노"],
    image: IMG_RNB_4,
    audioUrl: "https://archive.org/download/Jazz_Sampler-9619/Kevin_MacLeod_-_As_I_Figure.mp3"
  },
  // PIANO
  {
    id: 301,
    title: "잔잔한 어쿠스틱 발라드 피아노 세션",
    maker: "Autumn",
    dday: "Today",
    genre: "Ballad",
    type: "pay",
    positions: ["피아노"],
    image: IMG_PIANO_1,
    audioUrl: AUDIO_PIANO
  },
  {
    id: 302,
    title: "영화 OST 스타일 오케스트라 편곡",
    maker: "Cinema_Sound",
    dday: "D-14",
    genre: "Classic",
    type: "split",
    positions: ["작곡", "편곡"],
    image: IMG_PIANO_2,
    audioUrl: "https://archive.org/download/Classical_Sampler-9615/Kevin_MacLeod_-_Danse_Macabre.mp3"
  },
];

// ==========================================
// 2. 호버 재생 카드 컴포넌트 (ProjectCard)
// ==========================================
const ProjectCard = ({ project }: { project: any }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseEnter = () => {
    setIsHovering(true);
    if (audioRef.current) {
      audioRef.current.volume = 0.5; // 볼륨 50%
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch((error) => {
          // 자동 재생 정책 에러는 콘솔에만 출력하고 사용자에게는 방해되지 않게 함
          console.log("Hover Play Blocked:", error);
        });
      }
    }
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0; // 초기화
    }
  };

  return (
    <Link 
      href={`/projects/${project.id}`} 
      className="group block bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-gray-100"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* 오디오 태그 (숨김) */}
      <audio ref={audioRef} src={project.audioUrl || AUDIO_RNB} preload="none" />

      {/* 썸네일 영역 */}
      <div className="relative aspect-square bg-gray-200 overflow-hidden">
        <img 
          src={project.image} 
          alt={project.title}
          className={`w-full h-full object-cover transition-transform duration-700 ${isHovering ? 'scale-110' : 'scale-100'}`}
        />
        
        {/* 정산 방식 배지 */}
        <div className="absolute top-3 left-3 flex gap-1 z-10">
          {project.type === 'pay' && <span className="px-2 py-1 bg-green-500/90 backdrop-blur-sm text-white text-[10px] font-bold rounded-full flex items-center gap-0.5"><DollarSign className="w-3 h-3"/> 페이</span>}
          {project.type === 'split' && <span className="px-2 py-1 bg-blue-500/90 backdrop-blur-sm text-white text-[10px] font-bold rounded-full flex items-center gap-0.5"><PieChart className="w-3 h-3"/> 지분</span>}
          {project.type === 'mix' && <span className="px-2 py-1 bg-purple-500/90 backdrop-blur-sm text-white text-[10px] font-bold rounded-full flex items-center gap-0.5"><Zap className="w-3 h-3"/> 복합</span>}
        </div>

        {/* D-Day 배지 */}
        <div className="absolute top-3 right-3 px-2 py-1 bg-black/60 backdrop-blur-sm text-white text-xs font-bold rounded-lg border border-white/10 z-10">
          {project.dday}
        </div>

        {/* 호버 시 나타나는 오버레이 (재생 중 효과) */}
        <div className={`absolute inset-0 bg-black/40 transition-opacity duration-300 flex items-center justify-center ${isHovering ? 'opacity-100' : 'opacity-0'}`}>
          <div className="flex flex-col items-center gap-2 text-white">
            {/* 이퀄라이저 애니메이션 */}
            <div className="flex items-end gap-1 h-6">
              <div className="w-1.5 bg-white rounded-full animate-[bounce_1s_infinite] h-3"></div>
              <div className="w-1.5 bg-white rounded-full animate-[bounce_1.2s_infinite] h-5"></div>
              <div className="w-1.5 bg-white rounded-full animate-[bounce_0.8s_infinite] h-4"></div>
              <div className="w-1.5 bg-white rounded-full animate-[bounce_1.1s_infinite] h-6"></div>
            </div>
            <span className="text-xs font-bold tracking-wider">PREVIEW</span>
          </div>
        </div>
      </div>

      {/* 정보 영역 */}
      <div className="p-5">
        <div className="flex flex-wrap gap-1 mb-3">
          {project.positions.map((pos: string, idx: number) => (
            <span key={idx} className="px-2 py-0.5 bg-gray-100 text-gray-600 text-[10px] font-medium rounded-md">
              {pos}
            </span>
          ))}
        </div>
        <h3 className={`font-bold text-gray-900 leading-tight mb-2 line-clamp-2 transition-colors ${isHovering ? 'text-indigo-600' : ''}`}>
          {project.title}
        </h3>
        <div className="flex items-center justify-between pt-3 border-t border-gray-50 mt-auto">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-full bg-gray-200 overflow-hidden">
              <img src={`/api/placeholder/20/20?text=${project.maker[0]}`} alt="" className="w-full h-full object-cover"/>
            </div>
            <span className="text-xs text-gray-500 font-medium truncate max-w-[80px]">{project.maker}</span>
          </div>
          <span className="text-xs text-gray-400 font-medium">{project.genre}</span>
        </div>
      </div>
    </Link>
  );
};

// ==========================================
// 3. 메인 홈 컴포넌트
// ==========================================
export default function Home() {
  const [selectedGenre, setSelectedGenre] = useState("전체");
  const [selectedPosition, setSelectedPosition] = useState("전체");
  const [rewardType, setRewardType] = useState("all");
  const [isRecruitingOnly, setIsRecruitingOnly] = useState(true);

  // [중요] 전체 프로젝트 목록 상태
  const [projects, setProjects] = useState(ALL_PROJECTS);

  // [중요] 로컬 스토리지 데이터 불러오기 (내가 만든 프로젝트 연동)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const localData = localStorage.getItem('my_projects');
      if (localData) {
        try {
          const myProjects = JSON.parse(localData);
          // 내가 만든 프로젝트를 맨 앞에 배치
          setProjects([...myProjects, ...ALL_PROJECTS]);
        } catch (e) {
          console.error("데이터 로딩 실패", e);
        }
      }
    }
  }, []);

  const filteredProjects = projects.filter((project) => {
    // 1. 장르 필터 (부분 일치 허용)
    if (selectedGenre !== "전체") {
      if (!project.genre.includes(selectedGenre)) return false;
    }
    // 2. 포지션 필터
    if (selectedPosition !== "전체" && !project.positions.includes(selectedPosition)) return false;
    // 3. 정산 방식 필터
    if (rewardType !== "all" && project.type !== rewardType) return false;
    return true;
  });

  return (
    <main className="min-h-screen bg-gray-50 pb-20">
      
      {/* Sticky Filter Bar */}
      <div className="sticky top-16 z-30 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 space-y-4">
          
          {/* 1행: 필터링 */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex p-1 bg-gray-100 rounded-lg self-start">
              <button onClick={() => setRewardType("all")} className={`px-4 py-1.5 text-sm font-medium rounded-md transition-all ${rewardType === 'all' ? 'bg-white text-indigo-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}>전체</button>
              <button onClick={() => setRewardType("pay")} className={`flex items-center gap-1 px-4 py-1.5 text-sm font-medium rounded-md transition-all ${rewardType === 'pay' ? 'bg-white text-indigo-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}><DollarSign className="w-3 h-3" /> 페이</button>
              <button onClick={() => setRewardType("split")} className={`flex items-center gap-1 px-4 py-1.5 text-sm font-medium rounded-md transition-all ${rewardType === 'split' ? 'bg-white text-indigo-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}><PieChart className="w-3 h-3" /> 지분</button>
              <button onClick={() => setRewardType("mix")} className={`flex items-center gap-1 px-4 py-1.5 text-sm font-medium rounded-md transition-all ${rewardType === 'mix' ? 'bg-white text-indigo-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}><Zap className="w-3 h-3" /> 복합</button>
            </div>
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <div className="relative">
                <input type="checkbox" className="sr-only peer" checked={isRecruitingOnly} onChange={() => setIsRecruitingOnly(!isRecruitingOnly)} />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-0.5 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
              </div>
              <span className="text-sm font-medium text-gray-700">모집 중만 보기</span>
            </label>
          </div>

          {/* 2행: 장르 & 포지션 */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
              <span className="text-xs font-bold text-gray-400 shrink-0 uppercase tracking-wider">Genre</span>
              {GENRES.map((genre) => (
                <button key={genre} onClick={() => setSelectedGenre(genre)} className={`px-3 py-1.5 rounded-full text-sm whitespace-nowrap border transition-colors ${selectedGenre === genre ? "bg-gray-900 text-white border-gray-900" : "bg-white text-gray-600 border-gray-200 hover:border-gray-400"}`}>{genre}</button>
              ))}
            </div>
            <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-hide">
              <span className="text-xs font-bold text-gray-400 shrink-0 uppercase tracking-wider">Inst.</span>
              {POSITIONS.map((pos) => (
                <button key={pos} onClick={() => setSelectedPosition(pos)} className={`px-3 py-1.5 rounded-full text-sm whitespace-nowrap border transition-colors ${selectedPosition === pos ? "bg-indigo-50 text-indigo-700 border-indigo-200 font-medium" : "bg-white text-gray-600 border-gray-200 hover:border-gray-400"}`}>{pos}</button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-6 flex items-end gap-2">
          <h2 className="text-xl font-bold text-gray-900">프로젝트</h2>
          <span className="text-sm text-gray-500 font-medium mb-1">{filteredProjects.length}개 발견</span>
        </div>

        {filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProjects.map((project) => (
              // [중요] 일반 Link 대신 'ProjectCard' 컴포넌트를 사용하여 호버 재생 구현
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-2xl border border-gray-100 border-dashed">
            <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4"><Filter className="w-8 h-8 text-gray-300" /></div>
            <h3 className="text-lg font-bold text-gray-900 mb-1">조건에 맞는 프로젝트가 없어요</h3>
            <p className="text-gray-500 text-sm">필터를 변경하거나 초기화해보세요.</p>
            <button onClick={() => {setSelectedGenre("전체"); setSelectedPosition("전체"); setRewardType("all");}} className="mt-4 px-4 py-2 bg-white border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors">필터 초기화</button>
          </div>
        )}
      </div>
    </main>
  );
}