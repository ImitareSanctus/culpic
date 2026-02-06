import ProjectCard, { ProjectData } from "../components/ProjectCard";

// ✅ 개발자용 이미지 서버 (Picsum) 사용
// 여기는 새로고침을 백만 번 해도 차단하지 않습니다.
// /seed/단어/ : 뒤에 단어를 바꾸면 이미지가 고정됩니다.
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
const IMG_PIANO_3 = "https://picsum.photos/seed/melody/600/600";
const IMG_PIANO_4 = "https://picsum.photos/seed/song/600/600";


// ==========================================
// 🎷 1층: JAZZ
// ==========================================
const JAZZ_PROJECTS: ProjectData[] = [
  {
    id: 101,
    title: "한밤의 재즈바 라이브 세션 (콘트라베이스 구함)",
    artist: "Jazz_Master",
    dDay: "D-3",
    imageUrl: IMG_JAZZ_1,
    positions: [{ type: "guitar", label: "베이스" }, { type: "piano", label: "피아노" }],
  },
  {
    id: 102,
    title: "스윙 재즈 드럼 & 브라스 세션 모집",
    artist: "SwingKing",
    dDay: "D-7",
    imageUrl: IMG_JAZZ_2,
    positions: [{ type: "studio", label: "드럼" }, { type: "vocal", label: "트럼펫" }],
  },
  {
    id: 103,
    title: "카페 BGM용 로파이(Lofi) 재즈 합작",
    artist: "CoffeeCat",
    dDay: "Today",
    imageUrl: IMG_JAZZ_3,
    positions: [{ type: "mixing", label: "믹싱" }, { type: "piano", label: "건반" }],
  },
  {
    id: 104,
    title: "재즈 피아노 트리오 결성하실 분",
    artist: "BlueNote",
    dDay: "D-1",
    imageUrl: IMG_JAZZ_4,
    positions: [{ type: "studio", label: "드럼" }, { type: "guitar", label: "콘트라베이스" }],
  },
];

// ==========================================
// 🎤 2층: R&B
// ==========================================
const RNB_PROJECTS: ProjectData[] = [
  {
    id: 201,
    title: "몽환적인 R&B 트랙 보컬 구합니다",
    artist: "Seongmo",
    dDay: "D-2",
    imageUrl: IMG_RNB_1,
    positions: [{ type: "vocal", label: "보컬" }, { type: "mixing", label: "믹싱" }],
  },
  {
    id: 202,
    title: "트렌디한 PBR&B 비트 메이킹 협업",
    artist: "TheWeeknd_Fan",
    dDay: "D-5",
    imageUrl: IMG_RNB_2,
    positions: [{ type: "studio", label: "작업실" }, { type: "mixing", label: "마스터링" }],
  },
  {
    id: 203,
    title: "그루비한 베이스 라인 만들어주실 분",
    artist: "Groove_Rider",
    dDay: "D-10",
    imageUrl: IMG_RNB_3,
    positions: [{ type: "guitar", label: "베이스" }],
  },
  {
    id: 204,
    title: "새벽 감성 R&B 탑라인 작곡가 모십니다",
    artist: "Dawn_Music",
    dDay: "D-4",
    imageUrl: IMG_RNB_4,
    positions: [{ type: "vocal", label: "탑라인" }, { type: "piano", label: "코드진행" }],
  },
];

// ==========================================
// 🎹 3층: PIANO
// ==========================================
const PIANO_PROJECTS: ProjectData[] = [
  {
    id: 301,
    title: "잔잔한 어쿠스틱 발라드 피아노 세션",
    artist: "Autumn",
    dDay: "Today",
    imageUrl: IMG_PIANO_1,
    positions: [{ type: "piano", label: "피아노" }],
  },
  {
    id: 302,
    title: "영화 OST 스타일 오케스트라 편곡",
    artist: "Cinema_Sound",
    dDay: "D-14",
    imageUrl: IMG_PIANO_2,
    positions: [{ type: "piano", label: "작곡/편곡" }, { type: "studio", label: "미디" }],
  },
  {
    id: 303,
    title: "CCM 반주 및 코드 리하모니제이션",
    artist: "Church_Keys",
    dDay: "D-6",
    imageUrl: IMG_PIANO_3,
    positions: [{ type: "piano", label: "메인건반" }, { type: "studio", label: "세컨건반" }],
  },
  {
    id: 304,
    title: "뉴에이지 스타일 피아노 듀엣 곡 작업",
    artist: "Yiruma_Wannabe",
    dDay: "D-30",
    imageUrl: IMG_PIANO_4,
    positions: [{ type: "piano", label: "피아노" }, { type: "guitar", label: "첼로" }],
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-white pb-20">
      
      {/* 1층: Jazz Section */}
      <section className="py-8 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xl font-black text-slate-900 flex items-center gap-2">
                🎷 오늘 밤, 재즈 어때요?
              </h2>
              <p className="text-slate-500 text-xs mt-1">즉흥 연주의 매력에 빠져보세요.</p>
            </div>
            <button className="text-xs font-bold text-slate-400 hover:text-blue-600 transition-colors">
              전체보기 &gt;
            </button>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {JAZZ_PROJECTS.map((project) => (
              <ProjectCard key={project.id} data={project} />
            ))}
          </div>
        </div>
      </section>

      {/* 2층: R&B Section */}
      <section className="py-8 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xl font-black text-slate-900 flex items-center gap-2">
                🎤 감성 충만 R&B / Soul
              </h2>
              <p className="text-slate-500 text-xs mt-1">트렌디한 비트와 보컬을 찾고 있어요.</p>
            </div>
            <button className="text-xs font-bold text-slate-400 hover:text-blue-600 transition-colors">
              전체보기 &gt;
            </button>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {RNB_PROJECTS.map((project) => (
              <ProjectCard key={project.id} data={project} />
            ))}
          </div>
        </div>
      </section>

      {/* 3층: Piano Section */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xl font-black text-slate-900 flex items-center gap-2">
                🎹 피아노 & 어쿠스틱
              </h2>
              <p className="text-slate-500 text-xs mt-1">건반 위의 선율을 함께 만들어봐요.</p>
            </div>
            <button className="text-xs font-bold text-slate-400 hover:text-blue-600 transition-colors">
              전체보기 &gt;
            </button>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {PIANO_PROJECTS.map((project) => (
              <ProjectCard key={project.id} data={project} />
            ))}
          </div>
        </div>
      </section>

    </main>
  );
}