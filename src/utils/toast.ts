import { toast } from 'sonner';

/**
 * Toast notification utilities
 * Centralized toast messages with consistent styling
 */

interface ToastOptions {
  description?: string;
  duration?: number;
}

export const showToast = {
  /**
   * Success notification
   */
  success: (message: string, options?: ToastOptions) => {
    toast.success(message, {
      description: options?.description,
      duration: options?.duration || 3000,
      className: 'font-[Outfit]',
    });
  },

  /**
   * Error notification
   */
  error: (message: string, options?: ToastOptions) => {
    toast.error(message, {
      description: options?.description,
      duration: options?.duration || 4000,
      className: 'font-[Outfit]',
    });
  },

  /**
   * Info notification
   */
  info: (message: string, options?: ToastOptions) => {
    toast.info(message, {
      description: options?.description,
      duration: options?.duration || 3000,
      className: 'font-[Outfit]',
    });
  },

  /**
   * Warning notification
   */
  warning: (message: string, options?: ToastOptions) => {
    toast.warning(message, {
      description: options?.description,
      duration: options?.duration || 3500,
      className: 'font-[Outfit]',
    });
  },

  /**
   * Loading notification with promise
   */
  promise: <T,>(
    promise: Promise<T>,
    messages: {
      loading: string;
      success: string;
      error: string;
    }
  ) => {
    toast.promise(promise, {
      loading: messages.loading,
      success: messages.success,
      error: messages.error,
      className: 'font-[Outfit]',
    });
    return promise; // Return the original promise for chaining
  },

  /**
   * Custom notification
   */
  custom: (message: string, options?: ToastOptions) => {
    toast(message, {
      description: options?.description,
      duration: options?.duration || 3000,
      className: 'font-[Outfit]',
    });
  },
};

/**
 * Specific toast messages for common actions
 */
export const toastMessages = {
  login: {
    success: () => showToast.success('Login berhasil!', {
      description: 'Selamat datang di ProjekKita',
    }),
    error: () => showToast.error('Login gagal', {
      description: 'Periksa kembali email dan password Anda',
    }),
  },

  logout: {
    success: () => showToast.success('Logout berhasil', {
      description: 'Sampai jumpa lagi!',
    }),
  },

  donation: {
    success: () => showToast.success('Terima kasih atas donasi Anda!', {
      description: 'Donasi sedang diproses',
    }),
    error: () => showToast.error('Donasi gagal', {
      description: 'Silakan coba lagi atau hubungi support',
    }),
  },

  form: {
    error: () => showToast.error('Form tidak lengkap', {
      description: 'Mohon lengkapi semua field yang diperlukan',
    }),
    validation: (field: string) => showToast.error('Validasi gagal', {
      description: `${field} tidak valid`,
    }),
  },

  upload: {
    success: () => showToast.success('Upload berhasil', {
      description: 'File berhasil diunggah',
    }),
    error: () => showToast.error('Upload gagal', {
      description: 'Ukuran file maksimal 5MB',
    }),
    size: () => showToast.error('File terlalu besar', {
      description: 'Maksimal ukuran file adalah 5MB',
    }),
  },

  network: {
    error: () => showToast.error('Kesalahan jaringan', {
      description: 'Periksa koneksi internet Anda',
    }),
  },

  copy: {
    success: () => showToast.success('Disalin!', {
      description: 'Teks berhasil disalin ke clipboard',
      duration: 2000,
    }),
  },
};