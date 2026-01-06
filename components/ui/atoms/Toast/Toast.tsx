import { ToastViewProps } from './Toast.types'

export function Toast({ content }: ToastViewProps) {
  return (
    <div
      className="
        fixed bottom-4 right-4
        rounded-lg shadow-lg
        bg-white text-gray-900
        px-4 py-3
      "
      style={{ zIndex: 700 }}
      role="status"
    >
      {content}
    </div>
  )
}
