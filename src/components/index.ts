import { message } from 'antd'
export * from './DashBoard'
export * from './ScoreCard'

export const showMessage = (
  messageType: 'info' | 'error' | 'success' | 'warning',
  content: string,
) => {
  if (messageType === 'info') message.info(content)
  else if (messageType === 'error') message.error(content)
  else if (messageType === 'success') message.success(content)
  else if (messageType === 'warning') message.warning(content)
}
