"use client";

import { useState } from "react";
import { Calendar, X, Hash, Link as LinkIcon, MapPin, Globe } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function CreateProjectPage() {
  const router = useRouter();
  
  // 기본 정보 상태
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [genre, setGenre] = useState("R&B");
  const [deadLine, setDeadLine] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // 해시태그 상태
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState<string[]>([]);

  // 추가 기능 상태
  const [referenceUrl, setReferenceUrl] = useState("");
  const [workMode, setWorkMode] = useState("online");
  const [region, setRegion] = useState("");
  
  // ✨ 페이 상태 ('pay', 'split', 'mix'로 내부 통일)
  const [payType, setPayType] = useState("split"); 

  // 태그 추가
  const handleTagKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && tagInput.trim() !== '') {
      e.preventDefault(); // 폼 제출 방지
      if (!tags.includes(tagInput.trim())) {
        setTags([...tags, tagInput.trim()]);
      }
      setTagInput("");
    }
  };

  // 태그 삭제
  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  // D-Day 계산 함수 (YYYY-MM-DD -> D-3)
  const calculateDDay = (targetDate: string) => {
    if (!targetDate) return "D-Day";
    const today = new Date();
    const target = new Date(targetDate);
    const diffTime = target.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return "Today";
    if (diffDays < 0) return "Expired";
    return `D-${diffDays}`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // 유효성 검사
    if (!title || !content || tags.length === 0) {
      alert("제목, 내용, 그리고 최소 1개의 포지션 태그가 필요합니다!");
      setIsLoading(false);
      return;
    }

    try {
      // 1. 새로운 프로젝트 객체 생성 (기존 데이터 구조와 호환되게 만듦)
      const newProject = {
        id: Date.now(), // 유니크 ID
        title: title,
        description: content,
        genre: genre,
        dday: calculateDDay(deadLine), // 날짜 계산해서 넣기
        positions: tags,
        
        // 메인 화면 필터링을 위한 속성 매핑
        type: payType, // pay, split, mix
        maker: "성모님", // 현재 로그인 유저 (가정)
        condition: payType === 'pay' ? "페이 협의" : "수익 분배",
        
        // 이미지와 오디오 (랜덤/기본값)
        image: `https://picsum.photos/seed/${Date.now()}/600/600`,
        audioUrl: "https://archive.org/download/Jazz_Sampler-9619/Kevin_MacLeod_-_AcidJazz.mp3", // 기본 BGM
        
        // 상세 정보 저장
        referenceUrl: referenceUrl,
        workMode: workMode,
        region: workMode === 'offline' ? region : 'Online',
      };

      // 2. 로컬 스토리지에 저장
      const existingProjects = JSON.parse(localStorage.getItem('my_projects') || '[]');
      localStorage.setItem('my_projects', JSON.stringify([newProject, ...existingProjects]));

      alert("프로젝트가 등록되었습니다! 🚀");
      router.push("/"); 
      
    } catch (error) {
      console.error(error);
      alert("저장에 실패했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 py-10 px-4 md:px-0">
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        
        {/* 헤더 */}
        <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-white sticky top-0 z-10">
          <h1 className="text-xl font-black text-slate-900">새 프로젝트 만들기</h1>
          <Link href="/" className="text-slate-400 hover:text-slate-600">
            <X className="w-6 h-6" />
          </Link>
        </div>

        {/* 폼 */}
        <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-8">
          
          {/* 제목 */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold text-slate-700">
              프로젝트 제목 <span className="text-red-500">*</span>
            </label>
            <input
              required
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="예: 몽환적인 R&B 트랙 위에 얹을 보컬 구합니다"
              className="w-full p-4 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium text-slate-900"
            />
          </div>

          {/* 장르 & 마감일 */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold text-slate-700">장르</label>
              <select 
                value={genre}
                onChange={(e) => setGenre(e.target.value)}
                className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900"
              >
                <option value="R&B">R&B / Soul</option>
                <option value="Hiphop">Hip-hop</option>
                <option value="Ballad">Ballad</option>
                <option value="Rock">Rock / Band</option>
                <option value="Jazz">Jazz</option>
                <option value="Classic">Classic</option>
                <option value="Pop">Pop</option>
              </select>
            </div>
            
            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold text-slate-700">마감일</label>
              <div className="relative">
                <input
                  type="date"
                  required
                  value={deadLine}
                  onChange={(e) => setDeadLine(e.target.value)}
                  className="w-full p-3 pl-10 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900"
                />
                <Calendar className="absolute left-3 top-3.5 w-4 h-4 text-slate-400" />
              </div>
            </div>
          </div>

          {/* 해시태그 입력 (포지션) */}
          <div className="flex flex-col gap-3">
            <label className="text-sm font-bold text-slate-700">
              구하는 포지션 <span className="text-xs font-normal text-slate-400">(입력 후 엔터)</span> <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input 
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={handleTagKeyDown}
                placeholder="예: 보컬, 피아노, 영상편집"
                className="w-full p-4 pl-10 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium text-slate-900"
              />
              <Hash className="absolute left-3 top-4 w-5 h-5 text-slate-400" />
            </div>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag, index) => (
                <span 
                  key={index} 
                  onClick={() => removeTag(tag)}
                  className="px-3 py-1.5 bg-indigo-100 text-indigo-700 text-sm font-bold rounded-full flex items-center gap-1 cursor-pointer hover:bg-red-100 hover:text-red-600 transition-colors"
                >
                  #{tag}
                  <X className="w-3 h-3" />
                </span>
              ))}
            </div>
          </div>

          {/* 레퍼런스 링크 */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold text-slate-700">레퍼런스 링크 (선택)</label>
            <div className="relative">
              <input
                type="url"
                value={referenceUrl}
                onChange={(e) => setReferenceUrl(e.target.value)}
                placeholder="URL을 붙여넣으세요"
                className="w-full p-4 pl-10 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium text-slate-900"
              />
              <LinkIcon className="absolute left-3 top-4 w-5 h-5 text-slate-400" />
            </div>
          </div>

          {/* 작업 방식 */}
          <div className="flex flex-col gap-3">
            <label className="text-sm font-bold text-slate-700">작업 방식</label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setWorkMode('online')}
                className={`p-3 rounded-xl border font-bold flex items-center justify-center gap-2 ${
                  workMode === 'online' ? 'bg-slate-900 text-white border-slate-900' : 'bg-white text-slate-500 border-slate-200'
                }`}
              >
                <Globe className="w-4 h-4" /> 온라인
              </button>
              <button
                type="button"
                onClick={() => setWorkMode('offline')}
                className={`p-3 rounded-xl border font-bold flex items-center justify-center gap-2 ${
                  workMode === 'offline' ? 'bg-slate-900 text-white border-slate-900' : 'bg-white text-slate-500 border-slate-200'
                }`}
              >
                <MapPin className="w-4 h-4" /> 오프라인
              </button>
            </div>
            
            {workMode === 'offline' && (
              <input
                required
                type="text"
                value={region}
                onChange={(e) => setRegion(e.target.value)}
                placeholder="활동 지역을 입력해주세요 (예: 서울 마포구)"
                className="w-full p-4 rounded-xl bg-blue-50 border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium text-slate-900 animate-in fade-in slide-in-from-top-2"
              />
            )}
          </div>

          {/* 페이 / 수익 분배 */}
          <div className="flex flex-col gap-3">
            <label className="text-sm font-bold text-slate-700">보상 방식</label>
            <div className="grid grid-cols-3 gap-2"> 
              {[
                { id: 'split', label: '수익 분배' },
                { id: 'pay', label: '페이 지급' },
                { id: 'mix', label: '복합 지급' },
              ].map((option) => (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => setPayType(option.id)}
                  className={`p-3 rounded-xl border text-sm font-bold transition-all ${
                    payType === option.id 
                      ? 'bg-green-50 border-green-500 text-green-700 ring-1 ring-green-500' 
                      : 'bg-white border-slate-200 text-slate-500 hover:bg-slate-50'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          {/* 내용 */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold text-slate-700">상세 내용 <span className="text-red-500">*</span></label>
            <textarea
              required
              rows={6}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="프로젝트에 대해 자유롭게 설명해주세요."
              className="w-full p-4 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium text-slate-900 resize-none"
            />
          </div>

          <div className="pt-4 border-t border-slate-100">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-bold text-lg transition-all active:scale-[0.98] flex justify-center items-center gap-2"
            >
              {isLoading ? "등록 중..." : "프로젝트 올리기 ✨"}
            </button>
          </div>

        </form>
      </div>
    </main>
  );
}