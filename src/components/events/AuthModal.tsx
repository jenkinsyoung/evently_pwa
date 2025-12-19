'use client'

interface AuthModalProps {
  open: boolean;
  onClose: () => void;
}

export function AuthModal({ open, onClose }: AuthModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-6 w-[320px] space-y-4">
        <h3 className="text-lg font-semibold">Требуется авторизация</h3>
        <p className="text-sm text-gray-500">
          Войдите или зарегистрируйтесь, чтобы продолжить
        </p>

        <div className="flex gap-3">
          <a 
            href="/login" 
            className="btn-primary flex-1 text-center py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors"
          >
            Войти
          </a>
          <a 
            href="/register" 
            className="btn-outline flex-1 text-center py-2 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors"
          >
            Регистрация
          </a>
        </div>

        <button 
          onClick={onClose} 
          className="w-full text-sm text-gray-400 hover:text-gray-600 transition-colors mt-2"
        >
          Закрыть
        </button>
      </div>
    </div>
  );
}