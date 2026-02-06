/* eslint-disable @next/next/no-img-element */
"use client";

import { Mic, Guitar, Music, Sliders, MonitorSpeaker, Plus } from "lucide-react";

// 1. 데이터 타입 정의 (imageUrl 추가됨!)
export interface ProjectData {
  id: number;
  title: string;
  artist: string;
  dDay: string;
  imageUrl: string; // 👈 여기가 바뀌었습니다 (색상 -> 이미지 주소)
  positions: { type: string; label: string }[];
}

// (아이콘 선택 함수 - 기존과 동일)
const getIcon = (position: string) => {
  switch (position) {
    case "vocal": return <Mic className="w-3 h-3" />;
    case "guitar": return <Guitar className="w-3 h-3" />;
    case "piano": return <Music className="w-3 h-3" />;
    case "mixing": return <Sliders className="w-3 h-3" />;
    case "studio": return <MonitorSpeaker className="w-3 h-3" />;
    default: return <Music className="w-3 h-3" />;
  }
};

// (뱃지 컴포넌트 - 기존과 동일)
function PositionBadge({ type, label }: { type: string; label: string }) {
  return (
    <span className="flex items-center gap-1 px-2 py-1 text-[10px] font-bold text-slate-700 bg-slate-100 rounded-full border border-slate-200">
      {getIcon(type)}
      <span>{label}</span>
    </span>
  );
}

// 2. 메인 카드 컴포넌트 (이미지 태그 적용!)
export default function ProjectCard({ data }: { data: ProjectData }) {
  return (
    <div className="group cursor-pointer flex flex-col gap-2">
      {/* 썸네일 영역 (이제 진짜 이미지가 들어갑니다) */}
      <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-slate-200 shadow-sm transition-all group-hover:shadow-md">
        
        {/* 👈 여기가 핵심! 실제 이미지 태그 (img) 사용 */}
        <img
          src={data.imageUrl}
          alt={data.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        
        {/* 가독성을 위한 검은색 반투명 필터 (선택 사항) */}
        <div className="absolute inset-0 bg-black/20 transition-opacity group-hover:opacity-0" />

        {/* 마감 뱃지 */}
        <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-sm text-white text-[10px] font-bold px-2 py-1 rounded-md">
          {data.dDay}
        </div>
      </div>

      {/* 정보 영역 (기존과 동일) */}
      <div className="flex flex-col gap-1 px-1 mt-1">
        <div className="flex flex-wrap gap-1 mb-1">
          {data.positions.slice(0, 3).map((pos, idx) => (
            <PositionBadge key={idx} type={pos.type} label={pos.label} />
          ))}
          {data.positions.length > 3 && (
            <span className="flex items-center gap-1 px-2 py-1 text-[10px] font-bold text-slate-500 bg-slate-50 rounded-full">
              <Plus className="w-3 h-3" />
              {data.positions.length - 3}
            </span>
          )}
        </div>
        <h3 className="text-sm font-bold text-slate-900 leading-tight truncate">
          {data.title}
        </h3>
        <div className="flex items-center gap-1.5 mt-0.5">
          <div className="w-5 h-5 rounded-full bg-slate-200 overflow-hidden">
             {/* 아티스트 프사도 임시로 같은 이미지 사용 (나중에 분리 가능) */}
            <img src={data.imageUrl} alt={data.artist} className="w-full h-full object-cover"/>
          </div>
          <span className="text-xs text-slate-600 font-medium">{data.artist}</span>
        </div>
      </div>
    </div>
  );
}