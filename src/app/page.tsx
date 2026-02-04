import ProjectCard from "../components/ProjectCard";

// 개발용 더미 데이터 (DB 없이 화면 확인용)
const DUMMY_PROJECTS = [
  {
    id: 1,
    title: "몽환적인 R&B 트랙 보컬 구합니다",
    artist: "Seongmo",
    dDay: "D-2",
    colorClass: "bg-gradient-to-br from-purple-600 to-blue-500", // 앨범아트 대신 색상
    positions: [
      { type: "vocal", label: "보컬" },
      { type: "mixing", label: "믹싱" },
    ],
  },
  {
    id: 2,
    title: "강렬한 밴드 사운드 합주 멤버 모집",
    artist: "Rocker_K",
    dDay: "D-5",
    colorClass: "bg-gradient-to-br from-red-600 to-orange-500",
    positions: [
      { type: "guitar", label: "일렉기타" },
      { type: "piano", label: "키보드" },
      { type: "vocal", label: "보컬" },
      { type: "studio", label: "합주실" }, // +1 로 뜰 것임
    ],
  },
  {
    id: 3,
    title: "잔잔한 어쿠스틱 발라드 피아노 세션",
    artist: "Autumn",
    dDay: "Today",
    colorClass: "bg-gradient-to-br from-amber-200 to-yellow-500",
    positions: [
      { type: "piano", label: "피아노" },
    ],
  },
  {
    id: 4,
    title: "사이버펑크 스타일 비트 메이킹 협업",
    artist: "Neo_Seoul",
    dDay: "D-10",
    colorClass: "bg-gradient-to-br from-cyan-500 to-blue-900",
    positions: [
      { type: "mixing", label: "믹싱" },
      { type: "studio", label: "작업실" },
    ],
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-white p-6 md:p-10">
      {/* 헤더 영역 */}
      <section className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">
          지금 뜨는 프로젝트 🔥
        </h1>
        <p className="text-slate-500 text-sm mt-1">
          마감이 얼마 남지 않은 협업 기회를 잡아보세요.
        </p>
      </section>

      {/* 카드 리스트 영역 (그리드 레이아웃) */}
      <section className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-x-4 gap-y-8">
        {DUMMY_PROJECTS.map((project) => (
          <ProjectCard key={project.id} data={project} />
        ))}
      </section>
    </main>
  );
}