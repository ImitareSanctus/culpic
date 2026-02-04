// components/PositionBadge.tsx
import { Mic, Guitar, Music, Sliders, MonitorSpeaker } from "lucide-react";

// 1. 문자열을 받으면 아이콘 컴포넌트를 돌려주는 함수
const getIcon = (position: string) => {
  switch (position) {
    case "vocal":
      return <Mic className="w-3 h-3" />; // w-3 h-3은 아이콘 크기 (작게)
    case "guitar":
      return <Guitar className="w-3 h-3" />;
    case "piano":
      return <Music className="w-3 h-3" />; // 피아노 대신 음표 사용 예시
    case "mixing":
      return <Sliders className="w-3 h-3" />;
    case "studio":
      return <MonitorSpeaker className="w-3 h-3" />;
    default:
      return <Music className="w-3 h-3" />; // 기본값
  }
};

// 2. 뱃지 컴포넌트 (아이콘 + 텍스트)
export default function PositionBadge({ position, label }: { position: string, label: string }) {
  return (
    <span className="flex items-center gap-1 px-2 py-1 text-xs font-medium text-gray-700 bg-gray-100 rounded-full border border-gray-200">
      {/* 아이콘 렌더링 */}
      {getIcon(position)}
      {/* 텍스트 렌더링 */}
      <span>{label}</span>
    </span>
  );
}