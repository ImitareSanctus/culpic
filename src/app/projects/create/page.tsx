"use client";

import { useState } from "react";
import { Calendar, X, Hash, Link as LinkIcon, MapPin, Globe } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "../../../utils/supabase/client";

export default function CreateProjectPage() {
  const router = useRouter();
  const supabase = createClient();
  
  // 기본 정보 상태
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [genre, setGenre] = useState("R&B / Soul");
  const [deadLine, setDeadLine] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // 해시태그 상태
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState<string[]>([]);

  // 추가 기능 상태
  const [referenceUrl, setReferenceUrl] = useState("");
  const [workMode, setWorkMode] = useState("online");
  const [region, setRegion] = useState("");
  
  // ✨ 페이 상태 기본값 변경 ('nopay' 삭제 -> 'split'을 기본으로)
  const [payType, setPayType] = useState("split"); 

  // 태그 추가
  const handleTagKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && tagInput.trim() !== '') {
      e.preventDefault();
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const randomId = Math.floor(Math.random() * 1000);
      const randomImageUrl = `https://picsum.photos/seed/${randomId}/600/600`;

      // Supabase 저장
      const { error } = await supabase
        .from('projects')
        .insert({
          title: title,
          description: content,
          genre: genre,
          dead_line: deadLine,
          positions: tags,
          image_url: randomImageUrl,
          reference_url: referenceUrl,
          work_mode: workMode,
          region: workMode === 'offline' ? region : '',
          pay_type: payType,
        });

      if (error) throw error;

      alert("프로젝트가 등록되었습니다! 🚀");
      router.push("/"); 
      router.refresh(); 

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
                <option>R&B / Soul</option>
                <option>Hip-hop</option>
                <option>Ballad</option>
                <option>Rock / Band</option>
                <option>Jazz</option>
                <option>Electronic</option>
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

          {/* 해시태그 입력 */}
          <div className="flex flex-col gap-3">
            <label className="text-sm font-bold text-slate-700">
              무엇이 필요한가요? <span className="text-xs font-normal text-slate-400">(자유 입력 후 엔터)</span>
            </label>
            <div className="relative">
              <input 
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={handleTagKeyDown}
                placeholder="예: 피아노, 첼로, 영상편집"
                className="w-full p-4 pl-10 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium text-slate-900"
              />
              <Hash className="absolute left-3 top-4 w-5 h-5 text-slate-400" />
            </div>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag, index) => (
                <span 
                  key={index} 
                  onClick={() => removeTag(tag)}
                  className="px-3 py-1.5 bg-slate-100 text-slate-700 text-sm font-bold rounded-full flex items-center gap-1 cursor-pointer hover:bg-red-100 hover:text-red-600 transition-colors"
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
                placeholder="YouTube, SoundCloud, 데모 링크 등을 붙여넣으세요"
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
                <MapPin className="w-4 h-4" /> 오프라인/대면
              </button>
            </div>
            
            {workMode === 'offline' && (
              <input
                required
                type="text"
                value={region}
                onChange={(e) => setRegion(e.target.value)}
                placeholder="활동 지역을 입력해주세요 (예: 서울 마포구, 부산 해운대)"
                className="w-full p-4 rounded-xl bg-blue-50 border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium text-slate-900 animate-in fade-in slide-in-from-top-2"
              />
            )}
          </div>

          {/* ✨ 페이 / 수익 분배 (수정됨) */}
          <div className="flex flex-col gap-3">
            <label className="text-sm font-bold text-slate-700">페이 / 수익 분배</label>
            <div className="grid grid-cols-2 gap-2"> 
              {[
                { id: 'split', label: '기여도 분배' }, // ✨ 이름 변경
                { id: 'paid', label: '페이 지급' },
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
            <label className="text-sm font-bold text-slate-700">상세 내용</label>
            <textarea
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