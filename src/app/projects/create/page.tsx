// app/projects/create/page.tsx
'use client'

import { useState } from 'react'
import { createClient } from '@/utils/supabase/client'
import { useRouter } from 'next/navigation'

export default function CreateProjectPage() {
  const supabase = createClient()
  const router = useRouter()
  
  // 6단계 입력을 위한 상태 관리
  const [formData, setFormData] = useState({
    title: '',
    genre: '',
    budget: 0,
    requirements: ''
  })
  const [loading, setLoading] = useState(false)

  // 입력 핸들러
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  // 프로젝트 생성 함수 (핵심 로직)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // 1. 현재 로그인한 유저 확인
    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user) {
      alert('로그인이 필요합니다!')
      setLoading(false)
      return
    }

    // 2. Supabase DB에 프로젝트 Insert
    const { data, error } = await supabase
      .from('projects')
      .insert([
        {
          owner_id: user.id,
          title: formData.title,
          genre: formData.genre,
          budget: Number(formData.budget),
          status: 0, // 0: 모집중 (초기 상태)
          requirements: { detail: formData.requirements } // JSON 형태로 저장
        }
      ])
      .select()

    if (error) {
      console.error(error)
      alert('프로젝트 생성 실패')
    } else {
      // 3. 성공 시 로그 생성 (기여도 증빙의 시작)
      await supabase.from('work_logs').insert({
        project_id: data[0].id,
        user_id: user.id,
        action_type: 'PROJECT_CREATED',
        message: '프로젝트가 공식적으로 개설되었습니다.'
      })
      
      alert('프로젝트가 개설되었습니다!')
      router.push('/dashboard') // 대시보드로 이동
    }
    setLoading(false)
  }

  return (
    <div className="max-w-2xl mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6">새 프로젝트 개설 (Standard Process)</h1>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* 1단계: 기본 정보 */}
        <div>
          <label className="block text-sm font-medium mb-1">프로젝트 제목</label>
          <input
            name="title"
            onChange={handleChange}
            className="w-full p-2 border rounded"
            placeholder="예: R&B 스타일의 기타 세션 구합니다"
            required
          />
        </div>

        {/* 2단계: 장르 및 스타일 */}
        <div>
          <label className="block text-sm font-medium mb-1">장르</label>
          <input
            name="genre"
            onChange={handleChange}
            className="w-full p-2 border rounded"
            placeholder="예: Jazz, City Pop"
            required
          />
        </div>

        {/* 3단계: 예산 설정 */}
        <div>
          <label className="block text-sm font-medium mb-1">예산 (원)</label>
          <input
            name="budget"
            type="number"
            onChange={handleChange}
            className="w-full p-2 border rounded"
            placeholder="500000"
            required
          />
        </div>
        
        {/* 4단계: 상세 요건 (추후 위자드 UI로 분리 가능) */}
        <div>
          <label className="block text-sm font-medium mb-1">상세 모집 요건</label>
          <textarea
            name="requirements"
            onChange={handleChange}
            className="w-full p-2 border rounded h-32"
            placeholder="구체적으로 원하는 연주 스타일이나 레퍼런스를 적어주세요."
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white p-3 rounded hover:bg-blue-700 font-bold"
        >
          {loading ? '생성 중...' : '프로젝트 개설하기'}
        </button>
      </form>
    </div>
  )
}