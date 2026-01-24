import { VALIDATION, DONATION } from '@/constants';

/**
 * Form validation utilities
 * Provides reusable validation functions for forms
 */

export interface ValidationResult {
  isValid: boolean;
  error?: string;
}

/**
 * Validate email format
 */
export function validateEmail(email: string): ValidationResult {
  if (!email.trim()) {
    return { isValid: false, error: 'Email tidak boleh kosong' };
  }

  if (!VALIDATION.EMAIL_REGEX.test(email)) {
    return { isValid: false, error: 'Format email tidak valid' };
  }

  return { isValid: true };
}

/**
 * Validate password
 */
export function validatePassword(password: string): ValidationResult {
  if (!password) {
    return { isValid: false, error: 'Password tidak boleh kosong' };
  }

  if (password.length < VALIDATION.MIN_PASSWORD_LENGTH) {
    return {
      isValid: false,
      error: `Password minimal ${VALIDATION.MIN_PASSWORD_LENGTH} karakter`,
    };
  }

  return { isValid: true };
}

/**
 * Validate phone number
 */
export function validatePhone(phone: string): ValidationResult {
  if (!phone.trim()) {
    return { isValid: false, error: 'Nomor telepon tidak boleh kosong' };
  }

  if (!VALIDATION.PHONE_REGEX.test(phone)) {
    return { isValid: false, error: 'Format nomor telepon tidak valid (10-13 digit)' };
  }

  return { isValid: true };
}

/**
 * Validate required field
 */
export function validateRequired(value: string, fieldName: string): ValidationResult {
  if (!value || !value.trim()) {
    return { isValid: false, error: `${fieldName} tidak boleh kosong` };
  }

  return { isValid: true };
}

/**
 * Validate donation amount
 */
export function validateDonationAmount(amount: string | number): ValidationResult {
  const numAmount = typeof amount === 'string' ? parseFloat(amount) : amount;

  if (isNaN(numAmount) || numAmount <= 0) {
    return { isValid: false, error: 'Jumlah donasi tidak valid' };
  }

  if (numAmount < DONATION.MIN_AMOUNT) {
    return {
      isValid: false,
      error: `Donasi minimal Rp ${DONATION.MIN_AMOUNT.toLocaleString('id-ID')}`,
    };
  }

  if (numAmount > DONATION.MAX_AMOUNT) {
    return {
      isValid: false,
      error: `Donasi maksimal Rp ${DONATION.MAX_AMOUNT.toLocaleString('id-ID')}`,
    };
  }

  return { isValid: true };
}

/**
 * Validate file upload
 */
export function validateFile(file: File): ValidationResult {
  const MAX_SIZE = 5 * 1024 * 1024; // 5MB
  const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/jpg'];

  if (!ALLOWED_TYPES.includes(file.type)) {
    return {
      isValid: false,
      error: 'Format file tidak valid. Gunakan JPG, JPEG, atau PNG',
    };
  }

  if (file.size > MAX_SIZE) {
    return {
      isValid: false,
      error: 'Ukuran file terlalu besar. Maksimal 5MB',
    };
  }

  return { isValid: true };
}

/**
 * Validate login form
 */
export interface LoginFormData {
  email: string;
  password: string;
}

export function validateLoginForm(data: LoginFormData): {
  isValid: boolean;
  errors: Partial<Record<keyof LoginFormData, string>>;
} {
  const errors: Partial<Record<keyof LoginFormData, string>> = {};

  const emailValidation = validateEmail(data.email);
  if (!emailValidation.isValid) {
    errors.email = emailValidation.error;
  }

  const passwordValidation = validatePassword(data.password);
  if (!passwordValidation.isValid) {
    errors.password = passwordValidation.error;
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

/**
 * Validate donation form
 */
export interface DonationFormData {
  name: string;
  email: string;
  phone: string;
  amount: string | number;
}

export function validateDonationForm(data: DonationFormData): {
  isValid: boolean;
  errors: Partial<Record<keyof DonationFormData, string>>;
} {
  const errors: Partial<Record<keyof DonationFormData, string>> = {};

  const nameValidation = validateRequired(data.name, 'Nama');
  if (!nameValidation.isValid) {
    errors.name = nameValidation.error;
  }

  const emailValidation = validateEmail(data.email);
  if (!emailValidation.isValid) {
    errors.email = emailValidation.error;
  }

  const phoneValidation = validatePhone(data.phone);
  if (!phoneValidation.isValid) {
    errors.phone = phoneValidation.error;
  }

  const amountValidation = validateDonationAmount(data.amount);
  if (!amountValidation.isValid) {
    errors.amount = amountValidation.error;
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

/**
 * Format Indonesian Rupiah
 */
export function formatRupiah(amount: number): string {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(amount);
}

/**
 * Parse Rupiah string to number
 */
export function parseRupiah(value: string): number {
  return parseFloat(value.replace(/[^\d]/g, '')) || 0;
}
