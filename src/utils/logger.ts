// utils/logger.ts
import { createClient } from './supabase/client'

/**
 * 컬픽 핵심 기능: 작업 로그 기록 (Immutable Log)
 * 이 함수는 모든 협업 액션(업로드, 승인, 댓글) 발생 시 호출되어야 합니다.
 */
export async function logWorkAction(
  projectId: string,
  userId: string,
  actionType: 'UPLOAD' | 'APPROVE' | 'COMMENT',
  message: string,
  fileUrl?: string
) {
  const supabase = createClient()

  const { error } = await supabase
    .from('work_logs')
    .insert({
      project_id: projectId,
      user_id: userId,
      action_type: actionType,
      message: message,
      file_url: fileUrl,
      // created_at은 DB에서 자동으로 현재 시간으로 기록됨 (위변조 불가)
    })

  if (error) {
    console.error('로그 기록 실패(중대 오류):', error)
    // 실제 운영 시에는 여기서 관리자에게 알림을 보내야 함
  }
}