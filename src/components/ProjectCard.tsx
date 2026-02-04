"use client";

import { Mic, Guitar, Music, Sliders, MonitorSpeaker, Plus } from "lucide-react";

// 1. 데이터 타입 정의 (이 부분이 추가되었습니다!)
interface Position {
  type: string;
  label: string;
}

interface ProjectData {
  id: number;
  title: string;
  artist: string;
  dDay: string;
  colorClass: string;
  positions: Position[];
}

// 2. 아이콘 선택 함수
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

// 3. 뱃지 컴포넌트
function PositionBadge({ type, label }: { type: string; label: string }) {
  return (
    <span className="flex items-center gap-1 px-2 py-1 text-[10px] font-bold text-slate-700 bg-slate-100 rounded-full border border-slate-200">
      {getIcon(type)}
      <span>{label}</span>
    </span>
  );
}

// 4. 메인 카드 컴포넌트 (any 대신 ProjectData 타입을 사용)
export default function ProjectCard({ data }: { data: ProjectData }) {
  return (
    <div className="group cursor-pointer flex flex-col gap-2">
      {/* 썸네일 영역 */}
      <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-slate-800 shadow-md transition-all group-hover:shadow-xl group-hover:scale-[1.02]">
        <div className={`w-full h-full ${data.colorClass} opacity-80`} />
        
        {/* 마감 뱃지 */}
        <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-sm text-white text-[10px] font-bold px-2 py-1 rounded-md">
          {data.dDay}
        </div>
      </div>

      {/* 정보 영역 */}
      <div className="flex flex-col gap-1 px-1">
        {/* 포지션 뱃지 */}
        <div className="flex flex-wrap gap-1 mb-1">
          {data.positions.slice(0, 3).map((pos, idx) => (
            <PositionBadge key={idx} type={pos.type} label={pos.label} />
          ))}
          {/* 3개 넘어가면 +N 표시 */}
          {data.positions.length > 3 && (
            <span className="flex items-center gap-1 px-2 py-1 text-[10px] font-bold text-slate-500 bg-slate-50 rounded-full">
              <Plus className="w-3 h-3" />
              {data.positions.length - 3}
            </span>
          )}
        </div>

        {/* 제목 & 아티스트 */}
        <h3 className="text-sm font-bold text-slate-900 leading-tight truncate">
          {data.title}
        </h3>
        <div className="flex items-center gap-1.5 mt-1">
          <div className="w-4 h-4 rounded-full bg-slate-300" />
          <span className="text-xs text-slate-500 font-medium">{data.artist}</span>
        </div>
      </div>
    </div>
  );
}