/**
 * Payment Timer Component
 * Displays countdown for donation payment with 24-hour expiry
 * Part of FASE 4 implementation
 */

import { useState, useEffect } from 'react';

interface PaymentTimerProps {
  createdAt: string; // ISO timestamp when donation was created
  expiryHours?: number; // Default 24 hours
  onExpired?: () => void; // Callback when timer expires
  className?: string;
}

export function PaymentTimer({ 
  createdAt, 
  expiryHours = 24,
  onExpired,
  className = ''
}: PaymentTimerProps) {
  const [timeRemaining, setTimeRemaining] = useState<{
    hours: number;
    minutes: number;
    seconds: number;
    isExpired: boolean;
  }>({ hours: 0, minutes: 0, seconds: 0, isExpired: false });

  useEffect(() => {
    const calculateTimeRemaining = () => {
      const createdTime = new Date(createdAt).getTime();
      const expiryTime = createdTime + (expiryHours * 60 * 60 * 1000);
      const now = new Date().getTime();
      const diff = expiryTime - now;

      if (diff <= 0) {
        setTimeRemaining({ hours: 0, minutes: 0, seconds: 0, isExpired: true });
        if (onExpired) {
          onExpired();
        }
        return;
      }

      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeRemaining({ hours, minutes, seconds, isExpired: false });
    };

    // Calculate immediately
    calculateTimeRemaining();

    // Update every second
    const interval = setInterval(calculateTimeRemaining, 1000);

    return () => clearInterval(interval);
  }, [createdAt, expiryHours, onExpired]);

  if (timeRemaining.isExpired) {
    return (
      <div className={`bg-red-50 border-2 border-red-200 rounded-xl p-4 ${className}`}>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
            <span className="material-symbols-outlined text-red-600 text-xl">schedule</span>
          </div>
          <div className="flex-1">
            <p className="font-semibold text-red-900 text-sm mb-1">Waktu Pembayaran Habis</p>
            <p className="text-xs text-red-700">
              Batas waktu konfirmasi pembayaran telah berakhir. Silakan submit donasi baru jika ingin melanjutkan.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Determine urgency level based on remaining time
  const totalHoursRemaining = timeRemaining.hours + (timeRemaining.minutes / 60);
  const isUrgent = totalHoursRemaining < 3; // Less than 3 hours
  const isWarning = totalHoursRemaining < 6; // Less than 6 hours

  const bgColor = isUrgent ? 'bg-red-50' : isWarning ? 'bg-amber-50' : 'bg-blue-50';
  const borderColor = isUrgent ? 'border-red-200' : isWarning ? 'border-amber-200' : 'border-blue-200';
  const iconBg = isUrgent ? 'bg-red-100' : isWarning ? 'bg-amber-100' : 'bg-blue-100';
  const iconColor = isUrgent ? 'text-red-600' : isWarning ? 'text-amber-600' : 'text-blue-600';
  const textColor = isUrgent ? 'text-red-900' : isWarning ? 'text-amber-900' : 'text-blue-900';
  const subTextColor = isUrgent ? 'text-red-700' : isWarning ? 'text-amber-700' : 'text-blue-700';

  return (
    <div className={`${bgColor} border-2 ${borderColor} rounded-xl p-4 ${className}`}>
      <div className="flex items-center gap-3 mb-3">
        <div className={`w-10 h-10 ${iconBg} rounded-full flex items-center justify-center`}>
          <span className={`material-symbols-outlined ${iconColor} text-xl`}>schedule</span>
        </div>
        <div className="flex-1">
          <p className={`font-semibold ${textColor} text-sm mb-1`}>
            {isUrgent ? '⚠️ Segera Selesaikan Pembayaran!' : isWarning ? '⏰ Waktu Terbatas' : '⏱️ Batas Waktu Pembayaran'}
          </p>
          <p className={`text-xs ${subTextColor}`}>
            Selesaikan transfer dalam waktu di bawah ini
          </p>
        </div>
      </div>

      {/* Countdown Display */}
      <div className="flex items-center justify-center gap-2 mt-3">
        <div className={`flex-1 ${bgColor === 'bg-blue-50' ? 'bg-white' : bgColor === 'bg-amber-50' ? 'bg-white' : 'bg-white'} border ${borderColor} rounded-lg p-3 text-center`}>
          <p className={`text-2xl font-bold ${textColor}`}>
            {String(timeRemaining.hours).padStart(2, '0')}
          </p>
          <p className={`text-xs ${subTextColor} mt-1`}>Jam</p>
        </div>
        <span className={`text-xl font-bold ${textColor}`}>:</span>
        <div className={`flex-1 ${bgColor === 'bg-blue-50' ? 'bg-white' : bgColor === 'bg-amber-50' ? 'bg-white' : 'bg-white'} border ${borderColor} rounded-lg p-3 text-center`}>
          <p className={`text-2xl font-bold ${textColor}`}>
            {String(timeRemaining.minutes).padStart(2, '0')}
          </p>
          <p className={`text-xs ${subTextColor} mt-1`}>Menit</p>
        </div>
        <span className={`text-xl font-bold ${textColor}`}>:</span>
        <div className={`flex-1 ${bgColor === 'bg-blue-50' ? 'bg-white' : bgColor === 'bg-amber-50' ? 'bg-white' : 'bg-white'} border ${borderColor} rounded-lg p-3 text-center`}>
          <p className={`text-2xl font-bold ${textColor}`}>
            {String(timeRemaining.seconds).padStart(2, '0')}
          </p>
          <p className={`text-xs ${subTextColor} mt-1`}>Detik</p>
        </div>
      </div>

      {/* Warning Message */}
      {isUrgent && (
        <div className="mt-3 pt-3 border-t border-red-200">
          <p className="text-xs text-red-700 text-center">
            <span className="font-semibold">PENTING:</span> Waktu hampir habis! Segera selesaikan transfer untuk menghindari pembatalan otomatis.
          </p>
        </div>
      )}

      {isWarning && !isUrgent && (
        <div className="mt-3 pt-3 border-t border-amber-200">
          <p className="text-xs text-amber-700 text-center">
            Perhatian: Donasi akan dibatalkan otomatis jika tidak dikonfirmasi dalam waktu yang ditentukan.
          </p>
        </div>
      )}
    </div>
  );
}
