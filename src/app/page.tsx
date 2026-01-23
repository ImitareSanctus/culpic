"use client";

import React, { useState } from 'react';

interface Artist {
  id: number;
  name: string;
  role: string;
  genre: string;
  status: string; // '모집중' 또는 '작업가능' 상태 추가
  score: number;
}

export default function Home() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Artist[]>([]);

  const handleSearch = () => {
    const mockData: Artist[] = [
      { id: 1, name: "성모", role: "작곡가", genre: "클래식/재즈", status: "프로젝트 모집중", score: 98 },
      { id: 2, name: "김피아노", role: "피아니스트", genre: "재즈", status: "협업 가능", score: 85 },
      { id: 3, name: "박드럼", role: "드러머", genre: "록", status: "개인 작업중", score: 72 },
      { id: 4, name: "이지타", role: "기타리스트", genre: "블루스", status: "밴드 모집중", score: 88 },
    ];
    
    const filteredResults = mockData.filter(artist => 
      artist.name.includes(query) || artist.role.includes(query) || artist.genre.includes(query)
    );
    setResults(filteredResults);
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      backgroundColor: '#0f172a', 
      color: '#f8fafc',
      fontFamily: 'sans-serif',
    }}>
      {/* 1. 상단 메뉴바 (STO 삭제, 관심 항목 추가) */}
      <nav style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '20px 50px',
        backgroundColor: 'rgba(15, 23, 42, 0.8)',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        position: 'sticky',
        top: 0,
        zIndex: 100
      }}>
        <div style={{ fontSize: '1.6rem', fontWeight: '900', color: '#38bdf8', letterSpacing: '2px' }}>CULPIC</div>
        <ul style={{ 
          display: 'flex', 
          listStyle: 'none', 
          gap: '35px', 
          margin: 0, 
          padding: 0,
          fontSize: '0.95rem'
        }}>
          <li style={{ cursor: 'pointer', fontWeight: 'bold' }}>홈</li>
          <li style={{ cursor: 'pointer', color: '#38bdf8' }}>파트너 매칭</li>
          <li style={{ cursor: 'pointer' }}>프로젝트 모집</li> {/* STO 대신 추가 */}
          <li style={{ cursor: 'pointer' }}>아티스트 라운지</li> {/* 커뮤니티 항목 */}
          <li style={{ cursor: 'pointer' }}>마이페이지</li>
        </ul>
      </nav>

      <main style={{ padding: '100px 20px', textAlign: 'center' }}>
        {/* 2. 대문자 강조 히어로 섹션 */}
        <h1 style={{ fontSize: '4rem', marginBottom: '20px', fontWeight: '900' }}>
          CREATE WITH <span style={{ color: '#38bdf8' }}>CULPIC</span>
        </h1>
        <p style={{ color: '#94a3b8', fontSize: '1.3rem', marginBottom: '50px', maxWidth: '700px', margin: '0 auto 50px' }}>
          혼자서는 불가능한 음악, <br/>여기서 당신의 완벽한 파트너를 모집하고 협업을 시작하세요.
        </p>

        {/* 3. 검색 영역 */}
        <div style={{ marginBottom: '80px' }}>
          <input 
            type="text" 
            placeholder="찾고 있는 포지션이나 장르를 검색하세요 (예: 작곡가, 밴드 모집)" 
            style={{ 
              padding: '20px 35px', 
              width: '550px', 
              borderRadius: '50px', 
              border: '2px solid #334155',
              backgroundColor: '#1e293b',
              color: 'white',
              fontSize: '1.1rem',
              outline: 'none'
            }}
            onChange={(e) => setQuery(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
          />
          <button 
            onClick={handleSearch}
            style={{ 
              padding: '20px 45px', 
              marginLeft: '-70px',
              borderRadius: '50px', 
              backgroundColor: '#38bdf8', 
              color: '#0f172a', 
              border: 'none',
              fontSize: '1.1rem',
              fontWeight: 'bold',
              cursor: 'pointer'
            }}
          >
            찾기
          </button>
        </div>

        {/* 4. 결과 카드 (모집 상태 강조) */}
        <div style={{ 
          maxWidth: '1100px', 
          margin: '0 auto', 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', 
          gap: '30px' 
        }}>
          {results.map(artist => (
            <div key={artist.id} style={{ 
              backgroundColor: '#1e293b', 
              padding: '35px', 
              borderRadius: '28px', 
              border: '1px solid rgba(255, 255, 255, 0.05)',
              textAlign: 'left'
            }}>
              <div style={{ 
                display: 'inline-block',
                padding: '5px 12px',
                borderRadius: '8px',
                backgroundColor: artist.status.includes('모집중') ? '#ef4444' : '#10b981',
                fontSize: '0.75rem',
                fontWeight: 'bold',
                marginBottom: '15px'
              }}>
                {artist.status}
              </div>
              <h2 style={{ margin: '0 0 5px 0', fontSize: '1.7rem' }}>{artist.name}</h2>
              <div style={{ color: '#38bdf8', marginBottom: '15px' }}>{artist.role}</div>
              <p style={{ color: '#94a3b8', fontSize: '0.9rem', marginBottom: '25px' }}># {artist.genre} # 전문가 # 협업환영</p>
              
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                paddingTop: '20px',
                borderTop: '1px solid rgba(255, 255, 255, 0.1)'
              }}>
                <span style={{ color: '#facc15', fontSize: '0.9rem' }}>★ 매칭률 {artist.score}%</span>
                <button style={{ 
                  backgroundColor: 'white', 
                  color: '#0f172a',
                  padding: '10px 22px', 
                  borderRadius: '12px',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                  border: 'none'
                }}>메시지 보내기</button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}