'use client';

/* eslint-disable @next/next/no-img-element */

import React, { useState, useRef, useEffect, use } from 'react';
import Link from 'next/link';
import { ChevronLeft, Play, Pause, Clock, MapPin, DollarSign, PieChart, Zap, Share2, Heart, AlertTriangle } from 'lucide-react';

// ==========================================
// 1. 더미 데이터 (분위기 맞는 고품질 BGM 적용 🎵)
// ==========================================
const ALL_PROJECTS = [
  // 🎷 JAZZ (100번대)
  {
    id: 101,
    title: "한밤의 재즈바 라이브 세션 (콘트라베이스 구함)",
    maker: "Jazz_Master",
    dday: "D-3",
    genre: "Jazz",
    type: "pay",
    condition: "200,000원 (회당)",
    positions: ["베이스", "피아노"],
    description: "매주 금요일 밤, 홍대 근처 재즈바에서 정기 연주를 함께할 콘트라베이스 연주자님을 모십니다.\n\n빠른 템포의 스윙부터 느린 발라드까지 소화 가능하신 분 환영합니다.",
    image: "https://picsum.photos/seed/jazz1/600/600",
    // 🎵 Song: Faster Does It (신나는 스윙 재즈)
    audioUrl: "https://archive.org/download/Jazz_Sampler-9619/Kevin_MacLeod_-_Faster_Does_It.mp3", 
  },
  {
    id: 102,
    title: "스윙 재즈 드럼 & 브라스 세션 모집",
    maker: "SwingKing",
    dday: "D-7",
    genre: "Jazz",
    type: "split",
    condition: "수익 배분 (1/N)",
    positions: ["드럼", "트럼펫"],
    description: "빅밴드 스타일의 스윙 재즈를 지향하는 팀입니다. 브라스 섹션의 화려한 사운드를 만들어봐요!",
    image: "https://picsum.photos/seed/music/600/600",
    // 🎵 Song: Corncob (경쾌한 컨트리/스윙 느낌)
    audioUrl: "https://archive.org/download/Jazz_Sampler-9619/Kevin_MacLeod_-_Corncob.mp3",
  },
  {
    id: 103,
    title: "카페 BGM용 로파이(Lofi) 재즈 합작",
    maker: "CoffeeCat",
    dday: "Today",
    genre: "Jazz",
    type: "mix",
    condition: "5만원 + 저작권 10%",
    positions: ["믹싱", "피아노"],
    description: "편안한 피아노 선율과 빗소리가 어우러지는 곡입니다. 새벽 감성, 공부할 때 듣기 좋은 음악을 지향합니다.",
    image: "https://picsum.photos/seed/piano/600/600",
    // 🎵 Song: Night on the Docks (새벽 감성 색소폰)
    audioUrl: "https://archive.org/download/Jazz_Sampler-9619/Kevin_MacLeod_-_Night_on_the_Docks_-_Sax.mp3",
  },
  {
    id: 104,
    title: "재즈 피아노 트리오 결성하실 분",
    maker: "BlueNote",
    dday: "D-1",
    genre: "Jazz",
    type: "split",
    condition: "공연 수익 배분",
    positions: ["드럼", "베이스"],
    description: "빌 에반스 트리오 스타일을 지향합니다. 섬세한 인터플레이를 즐기시는 분들 연락주세요.",
    image: "https://picsum.photos/seed/drum/600/600",
    // 🎵 Song: Backed Vibes Clean (비브라폰이 들어간 몽환적 재즈)
    audioUrl: "https://archive.org/download/Jazz_Sampler-9619/Kevin_MacLeod_-_Backed_Vibes_Clean.mp3",
  },
  
  // 🎤 R&B (200번대)
  {
    id: 201,
    title: "몽환적인 R&B 트랙 보컬 구합니다",
    maker: "Seongmo",
    dday: "D-2",
    genre: "R&B",
    type: "mix",
    condition: "10만원 + 저작권 5%",
    positions: ["보컬", "믹싱"],
    description: "위켄드(The Weeknd) 스타일의 몽환적인 R&B 트랙을 작업 중입니다.\n\n그루비한 베이스 라인 위에 섹시한 보컬을 얹어주실 분을 찾습니다.",
    image: "https://picsum.photos/seed/vocal/600/600",
    // 🎵 Song: AcidJazz (그루비하고 몽환적인 R&B 느낌)
    audioUrl: "https://archive.org/download/Jazz_Sampler-9619/Kevin_MacLeod_-_AcidJazz.mp3",
  },
  {
    id: 202,
    title: "트렌디한 PBR&B 비트 메이킹 협업",
    maker: "TheWeeknd_Fan",
    dday: "D-5",
    genre: "R&B",
    type: "split",
    condition: "저작권 50:50",
    positions: ["작곡", "편곡"],
    description: "기존의 R&B 틀을 깨는 새로운 비트를 만들어보고 싶습니다. 실험적인 사운드 환영합니다.",
    image: "https://picsum.photos/seed/night/600/600",
    // 🎵 Song: Vibe Ace (세련된 비트)
    audioUrl: "https://archive.org/download/Jazz_Sampler-9619/Kevin_MacLeod_-_Vibe_Ace.mp3",
  },
  {
    id: 203,
    title: "그루비한 베이스 라인 만들어주실 분",
    maker: "Groove_Rider",
    dday: "D-10",
    genre: "R&B",
    type: "pay",
    condition: "150,000원",
    positions: ["베이스"],
    description: "드럼 비트는 완성되어 있습니다. 그 위에 찰진 베이스 라인을 얹어주실 분을 찾습니다.",
    image: "https://picsum.photos/seed/purple/600/600",
    // 🎵 Song: I Knew a Guy (느리고 끈적한 그루브)
    audioUrl: "https://archive.org/download/Jazz_Sampler-9619/Kevin_MacLeod_-_I_Knew_a_Guy.mp3",
  },
  {
    id: 204,
    title: "새벽 감성 R&B 탑라인 작곡가 모십니다",
    maker: "Dawn_Music",
    dday: "D-4",
    genre: "R&B",
    type: "split",
    condition: "저작권 지분 쉐어",
    positions: ["보컬", "피아노"],
    description: "코드는 나와있습니다. 귀에 꽂히는 멜로디(탑라인)를 짜주실 작곡가님을 모십니다.",
    image: "https://picsum.photos/seed/mic/600/600",
    // 🎵 Song: As I Figure (차분한 비트)
    audioUrl: "https://archive.org/download/Jazz_Sampler-9619/Kevin_MacLeod_-_As_I_Figure.mp3",
  },
  
  // 🎹 PIANO (300번대)
  {
    id: 301,
    title: "잔잔한 어쿠스틱 발라드 피아노 세션",
    maker: "Autumn",
    dday: "Today",
    genre: "Ballad",
    type: "pay",
    condition: "150,000원 (건)",
    positions: ["피아노"],
    description: "가을 감성의 발라드 곡입니다. 화려한 기교보다는 여백의 미를 아시는 분이 오셨으면 좋겠습니다.",
    image: "https://picsum.photos/seed/classic/600/600",
    // 🎵 Song: Gymnopedie No 1 (가장 유명한 잔잔한 피아노곡)
    audioUrl: "https://archive.org/download/Classical_Sampler-9615/Kevin_MacLeod_-_Gymnopedie_No_1.mp3",
  },
  {
    id: 302,
    title: "영화 OST 스타일 오케스트라 편곡",
    maker: "Cinema_Sound",
    dday: "D-14",
    genre: "Classic",
    type: "split",
    condition: "프로젝트 수익 10%",
    positions: ["작곡", "편곡"],
    description: "단편 영화 엔딩 크레딧에 들어갈 곡입니다. 웅장하면서도 슬픈 느낌을 찾고 있습니다.",
    image: "https://picsum.photos/seed/calm/600/600",
    // 🎵 Song: Danse Macabre (웅장한 클래식/오케스트라)
    audioUrl: "https://archive.org/download/Classical_Sampler-9615/Kevin_MacLeod_-_Danse_Macabre.mp3",
  },
];

type Props = {
  params: Promise<{ id: string }>;
};

export default function ProjectDetailPage({ params }: Props) {
  // 초기 파형 데이터
  const INITIAL_WAVE_HEIGHTS = [40, 70, 30, 80, 50, 90, 40, 60, 80, 50, 30, 70, 90, 60, 40, 80, 50, 70, 30, 60];

  const { id } = use(params);
  const projectId = parseInt(id);
  const project = ALL_PROJECTS.find((p) => p.id === projectId);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [waveHeights, setWaveHeights] = useState(INITIAL_WAVE_HEIGHTS);
  
  // 드래그 중인지 확인하는 상태 (충돌 방지용)
  const [isDragging, setIsDragging] = useState(false);
  
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // 파형 애니메이션
  useEffect(() => {
    let interval: any;
    if (isPlaying) {
      interval = setInterval(() => {
        setWaveHeights(current => 
          current.map(() => Math.max(20, Math.random() * 100))
        );
      }, 100);
    } else {
      setWaveHeights(INITIAL_WAVE_HEIGHTS);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      // play()는 Promise를 반환하므로 에러 처리를 해주는 것이 안전함
      audioRef.current.play().catch(error => console.error("Playback failed:", error));
    }
    setIsPlaying(!isPlaying);
  };

  const onTimeUpdate = () => {
    // 드래그 중이 아닐 때만 시간 업데이트 (UI 충돌 방지)
    if (audioRef.current && !isDragging) {
      setCurrentTime(audioRef.current.currentTime);
      if (!isNaN(audioRef.current.duration) && audioRef.current.duration !== Infinity) {
        setDuration(audioRef.current.duration);
      }
    }
  };

  const onLoadedMetadata = () => {
    if (audioRef.current && !isNaN(audioRef.current.duration) && audioRef.current.duration !== Infinity) {
      setDuration(audioRef.current.duration);
    }
  };

  // [1] 슬라이더를 잡는 순간: UI 업데이트만 허용 (오디오 간섭 차단)
  const handleSeekMouseDown = () => {
    setIsDragging(true);
  };

  // [2] 슬라이더 움직임: UI 숫자만 변경 (오디오는 건드리지 않음)
  const handleSeekChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentTime(parseFloat(e.target.value));
  };

  // [3] 슬라이더 놓는 순간: 실제 오디오 이동 & 재생 복구
  const handleSeekMouseUp = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = currentTime;
      // 만약 재생 중이었다면, 위치 이동 후 계속 재생
      if (isPlaying) {
        audioRef.current.play().catch(console.error);
      }
    }
    setIsDragging(false); // 드래그 종료 선언
  };

  const onEnded = () => {
    setIsPlaying(false);
    setCurrentTime(0);
    if(audioRef.current) audioRef.current.currentTime = 0;
  };

  const formatTime = (time: number) => {
    if (isNaN(time)) return "0:00";
    const min = Math.floor(time / 60);
    const sec = Math.floor(time % 60);
    return `${min}:${sec < 10 ? `0${sec}` : sec}`;
  };

  if (!project) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white">
        <AlertTriangle className="w-12 h-12 text-yellow-500 mb-4" />
        <h2 className="text-xl font-bold text-gray-900">프로젝트를 찾을 수 없습니다.</h2>
        <Link href="/" className="mt-4 px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
          홈으로 돌아가기
        </Link>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-white pb-24">
      
      {/* 1. 상단 네비게이션 */}
      <div className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 px-4 h-14 flex items-center justify-between">
        <Link href="/" className="p-2 -ml-2 hover:bg-gray-100 rounded-full text-gray-700">
          <ChevronLeft className="w-6 h-6" />
        </Link>
        <span className="font-bold text-sm text-gray-900 truncate max-w-[200px]">{project.title}</span>
        <button className="p-2 -mr-2 hover:bg-gray-100 rounded-full text-gray-700">
          <Share2 className="w-5 h-5" />
        </button>
      </div>

      {/* 2. 오디오 플레이어 */}
      <div className="bg-gray-900 text-white p-6 relative overflow-hidden transition-all duration-500">
        
        <audio 
          ref={audioRef}
          src={project.audioUrl}
          onTimeUpdate={onTimeUpdate}
          onEnded={onEnded}
          onLoadedMetadata={onLoadedMetadata}
          onError={(e) => console.error("Audio Load Error:", e)}
        />

        <div 
          className="absolute inset-0 opacity-30 bg-center bg-cover blur-xl scale-110"
          style={{ backgroundImage: `url(${project.image})` }} 
        />
        
        <div className="relative z-10 flex flex-col items-center gap-6 py-4">
          
          <div className={`w-32 h-32 rounded-lg shadow-2xl overflow-hidden border-2 border-white/10 transition-transform duration-700 ${isPlaying ? 'scale-105 shadow-indigo-500/30' : ''}`}>
            <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
          </div>
          
          <div className="w-full max-w-md space-y-5">
            
            {/* 파형 비주얼라이저 */}
            <div className="flex items-center gap-1 h-8 justify-center opacity-60">
              {waveHeights.map((height, i) => (
                <div 
                  key={i} 
                  className="w-1 bg-white rounded-full transition-all duration-100"
                  style={{ height: `${height}%` }} 
                />
              ))}
            </div>
            
            {/* 탐색 바 & 시간 표시 */}
            <div className="w-full flex items-center gap-3">
              <span className="text-xs text-gray-400 font-mono w-10 text-right">{formatTime(currentTime)}</span>
              
              <input 
                type="range" 
                min="0" 
                max={duration || 100}
                step="0.1" 
                value={currentTime}
                // [이벤트 핸들러] 끊김 없는 드래그 구현
                onMouseDown={handleSeekMouseDown}
                onTouchStart={handleSeekMouseDown}
                onChange={handleSeekChange}    
                onMouseUp={handleSeekMouseUp}  
                onTouchEnd={handleSeekMouseUp} 
                className="flex-1 h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:rounded-full hover:[&::-webkit-slider-thumb]:scale-125 transition-all"
              />

              <span className="text-xs text-gray-400 font-mono w-10 text-left">{duration ? formatTime(duration) : '0:00'}</span>
            </div>

            {/* 재생 버튼 */}
            <div className="flex justify-center">
              <button 
                onClick={togglePlay}
                className="w-14 h-14 bg-white text-gray-900 rounded-full flex items-center justify-center hover:scale-105 transition-transform shadow-lg shadow-white/20 active:scale-95"
              >
                {isPlaying ? (
                  <Pause className="w-6 h-6 fill-current" />
                ) : (
                  <Play className="w-6 h-6 ml-1 fill-current" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-5 py-8 space-y-8">
        
        {/* 3. 헤더 정보 */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <span className="px-2.5 py-1 bg-gray-100 text-gray-600 text-xs font-bold rounded-md">
              {project.genre}
            </span>
            <span className="px-2.5 py-1 bg-red-50 text-red-600 text-xs font-bold rounded-md flex items-center gap-1">
              <Clock className="w-3 h-3" /> {project.dday}
            </span>
          </div>
          <h1 className="text-2xl font-black text-gray-900 leading-tight mb-4">
            {project.title}
          </h1>
          
          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl border border-gray-100">
            <div className="w-10 h-10 rounded-full bg-indigo-100 overflow-hidden border border-indigo-200 shrink-0">
              <img src={`/api/placeholder/40/40?text=${project.maker[0]}`} alt="maker" className="w-full h-full object-cover"/>
            </div>
            <div>
              <p className="text-sm font-bold text-gray-900 flex items-center gap-1">
                {project.maker} <span className="text-blue-500 text-[10px]">✅</span>
              </p>
              <p className="text-xs text-gray-500">신뢰도 98% · 응답 빠름</p>
            </div>
          </div>
        </div>

        {/* 4. 보상 정보 */}
        <div className="bg-white border-2 border-indigo-50 rounded-2xl p-5 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 p-3 opacity-5">
            <DollarSign className="w-24 h-24 text-indigo-900" />
          </div>
          <h3 className="text-sm font-bold text-gray-400 mb-1 uppercase tracking-wider">Project Reward</h3>
          <div className="flex items-end gap-2">
            <span className="text-2xl font-black text-indigo-600">{project.condition}</span>
            <span className="text-sm text-gray-500 font-medium mb-1">으로 제안합니다</span>
          </div>
          
          <div className="mt-4 flex gap-2">
            {project.type === 'pay' && <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-bold rounded flex gap-1"><DollarSign className="w-3 h-3"/> 페이 지급</span>}
            {project.type === 'split' && <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-bold rounded flex gap-1"><PieChart className="w-3 h-3"/> 수익 분배</span>}
            {project.type === 'mix' && <span className="px-2 py-1 bg-purple-100 text-purple-700 text-xs font-bold rounded flex gap-1"><Zap className="w-3 h-3"/> 복합 지급</span>}
          </div>
        </div>

        {/* 5. 상세 설명 */}
        <div>
          <h3 className="text-lg font-bold text-gray-900 mb-3">프로젝트 소개</h3>
          <p className="text-gray-600 leading-relaxed whitespace-pre-wrap">
            {project.description}
          </p>
        </div>

        {/* 6. 모집 포지션 */}
        <div>
          <h3 className="text-lg font-bold text-gray-900 mb-3">모집 포지션</h3>
          <div className="flex flex-wrap gap-2">
            {project.positions.map((pos, idx) => (
              <span key={idx} className="px-4 py-2 bg-gray-100 text-gray-700 font-medium rounded-lg">
                {pos}
              </span>
            ))}
          </div>
        </div>

        {/* 7. 위치 정보 */}
        <div>
          <h3 className="text-lg font-bold text-gray-900 mb-3">작업 위치</h3>
          <div className="flex items-center gap-2 text-gray-600 bg-gray-50 p-3 rounded-lg">
            <MapPin className="w-5 h-5 text-gray-400" />
            <span className="text-sm">서울 마포구 서교동 (합주실)</span>
          </div>
        </div>

      </div>

      {/* 8. 하단 고정 바 */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 pb-6 md:pb-4 shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
        <div className="max-w-3xl mx-auto flex items-center gap-3">
          <button className="p-3 bg-gray-100 rounded-xl text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors">
            <Heart className="w-6 h-6" />
          </button>
          <button className="flex-1 bg-indigo-600 text-white font-bold text-lg py-3 rounded-xl hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200">
            지원하기 🚀
          </button>
        </div>
      </div>

    </main>
  );
}