'use client';

import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, Users, CheckCircle, XCircle, 
  MessageSquare, Phone, MoreHorizontal, ChevronDown, ChevronUp, 
  Trash2, Edit, AlertCircle 
} from 'lucide-react';

// 프로젝트 타입 정의
interface Project {
  id: number;
  title: string;
  maker: string;
  dday: string;
  status?: string; // 'Recruiting' | 'InProgress' | 'Completed'
  applicants?: any[];
  // ... 기타 속성
}

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<'maker' | 'joiner'>('maker');
  const [myProjects, setMyProjects] = useState<Project[]>([]);
  const [expandedProjectId, setExpandedProjectId] = useState<number | null>(null);

  // 1. 데이터 불러오기 (내가 만든 프로젝트)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const localData = localStorage.getItem('my_projects');
      if (localData) {
        try {
          const parsedData = JSON.parse(localData);
          // 데이터에 applicants가 없으면 빈 배열로 초기화해서 에러 방지
          const projectsWithApplicants = parsedData.map((p: any) => ({
            ...p,
            status: p.status || 'Recruiting', // 기본 상태
            applicants: p.applicants || []    // 지원자 목록 초기화
          }));
          setMyProjects(projectsWithApplicants);
        } catch (e) {
          console.error("데이터 로딩 실패", e);
        }
      }
    }
  }, []);

  // 2. 프로젝트 삭제 함수
  const handleDelete = (id: number) => {
    if (window.confirm("정말로 이 프로젝트를 삭제하시겠습니까?\n삭제 후에는 복구할 수 없습니다.")) {
      // 1. 상태 업데이트 (화면에서 즉시 제거)
      const updatedProjects = myProjects.filter(p => p.id !== id);
      setMyProjects(updatedProjects);
      
      // 2. 로컬 스토리지 업데이트 (영구 삭제)
      localStorage.setItem('my_projects', JSON.stringify(updatedProjects));
      alert("삭제되었습니다.");
    }
  };

  // 아코디언 토글
  const toggleExpand = (id: number) => {
    setExpandedProjectId(expandedProjectId === id ? null : id);
  };

  return (
    <main className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        
        {/* 헤더 영역 */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <LayoutDashboard className="w-7 h-7 text-indigo-600" />
            마이 대시보드
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            직접 만든 프로젝트를 관리하고 지원자를 확인하세요.
          </p>
        </div>

        {/* 탭 버튼 */}
        <div className="flex bg-white p-1 rounded-xl shadow-sm border border-gray-100 mb-6">
          <button
            onClick={() => setActiveTab('maker')}
            className={`flex-1 py-3 text-sm font-bold rounded-lg transition-all ${
              activeTab === 'maker' 
                ? 'bg-indigo-600 text-white shadow-md' 
                : 'text-gray-500 hover:bg-gray-50'
            }`}
          >
            내가 만든 프로젝트 ({myProjects.length})
          </button>
          <button
            onClick={() => setActiveTab('joiner')}
            className={`flex-1 py-3 text-sm font-bold rounded-lg transition-all ${
              activeTab === 'joiner' 
                ? 'bg-indigo-600 text-white shadow-md' 
                : 'text-gray-500 hover:bg-gray-50'
            }`}
          >
            내가 지원한 프로젝트 (0)
          </button>
        </div>

        {/* =======================================================
            [Tab 1] Maker View (내 프로젝트 관리)
        ======================================================= */}
        {activeTab === 'maker' && (
          <div className="space-y-6">
            {myProjects.length > 0 ? (
              myProjects.map((project) => (
                <div key={project.id} className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden relative group">
                  
                  {/* 삭제 버튼 (우측 상단) */}
                  <div className="absolute top-4 right-4 flex gap-2">
                    <button 
                      onClick={() => alert("수정 기능은 준비 중입니다! (지금은 삭제 후 다시 올려주세요 🙏)")}
                      className="p-2 bg-gray-100 text-gray-500 rounded-lg hover:bg-indigo-50 hover:text-indigo-600 transition-colors"
                      title="수정하기"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={(e) => { e.stopPropagation(); handleDelete(project.id); }}
                      className="p-2 bg-gray-100 text-gray-500 rounded-lg hover:bg-red-50 hover:text-red-600 transition-colors"
                      title="삭제하기"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  {/* 프로젝트 요약 헤더 */}
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-4 pr-20"> {/* pr-20: 버튼 공간 확보 */}
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <span className={`px-2 py-0.5 text-[10px] font-bold rounded-full border ${
                            project.status === 'Recruiting' 
                              ? 'bg-green-50 text-green-600 border-green-200' 
                              : 'bg-blue-50 text-blue-600 border-blue-200'
                          }`}>
                            {project.status === 'Recruiting' ? '모집중' : '진행중'}
                          </span>
                          <span className="text-xs text-gray-400 font-medium">{project.dday}</span>
                        </div>
                        <h3 className="text-lg font-bold text-gray-900 line-clamp-1">{project.title}</h3>
                      </div>
                    </div>

                    {/* 지원자 관리 토글 버튼 */}
                    <button 
                      onClick={() => toggleExpand(project.id)}
                      className="w-full flex items-center justify-between px-4 py-3 bg-gray-50 rounded-xl text-sm font-bold text-gray-700 hover:bg-gray-100 transition-colors border border-gray-100"
                    >
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-indigo-600" />
                        <span>지원자 현황</span>
                        <span className="bg-indigo-100 text-indigo-700 text-xs px-2 py-0.5 rounded-full">
                          {project.applicants?.length || 0}명
                        </span>
                      </div>
                      {expandedProjectId === project.id ? <ChevronUp className="w-4 h-4"/> : <ChevronDown className="w-4 h-4"/>}
                    </button>
                  </div>

                  {/* [아코디언 내용] 지원자 리스트 */}
                  {expandedProjectId === project.id && (
                    <div className="border-t border-gray-100 bg-gray-50/30 p-4 animate-in slide-in-from-top-2">
                      {(project.applicants && project.applicants.length > 0) ? (
                        <div className="space-y-3">
                          {/* 지원자가 있을 때의 UI (기존 더미 데이터 활용 필요) */}
                          {project.applicants.map((applicant: any) => (
                            <div key={applicant.id} className="bg-white p-4 rounded-xl border border-gray-200 flex justify-between items-center">
                              <span>{applicant.name}</span>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-8 text-gray-400">
                          <p className="text-sm">아직 지원자가 없습니다.</p>
                          <p className="text-xs mt-1">멋진 동료가 곧 나타날 거예요! ✨</p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))
            ) : (
              // 프로젝트가 없을 때
              <div className="text-center py-20 bg-white rounded-2xl border border-gray-200 border-dashed">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <AlertCircle className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-1">등록된 프로젝트가 없어요</h3>
                <p className="text-gray-500 text-sm mb-6">첫 번째 프로젝트를 만들어보세요!</p>
                <a href="/projects/create" className="px-6 py-3 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition-colors">
                  프로젝트 만들기
                </a>
              </div>
            )}
          </div>
        )}

        {/* [Tab 2] Joiner View (기존 더미 데이터 유지) */}
        {activeTab === 'joiner' && (
          <div className="text-center py-20">
            <p className="text-gray-500">아직 지원한 내역이 없습니다.</p>
          </div>
        )}

      </div>
    </main>
  );
}