import { useState } from 'react';

interface DonationPageProps {
  onBack: () => void;
  projectTitle: string;
  projectCategory: string;
}

type PaymentMethod = 'bca' | 'mandiri' | 'bni' | 'gopay' | 'ovo' | 'dana' | 'qris';

const paymentMethods = [
  { id: 'bca' as PaymentMethod, name: 'BCA', account: '1234567890', accountName: 'Yayasan ProjekKita' },
  { id: 'mandiri' as PaymentMethod, name: 'Mandiri', account: '0987654321', accountName: 'Yayasan ProjekKita' },
  { id: 'bni' as PaymentMethod, name: 'BNI', account: '5555666677', accountName: 'Yayasan ProjekKita' },
  { id: 'gopay' as PaymentMethod, name: 'GoPay', account: '081234567890', accountName: 'Yayasan ProjekKita' },
  { id: 'ovo' as PaymentMethod, name: 'OVO', account: '081298765432', accountName: 'Yayasan ProjekKita' },
  { id: 'dana' as PaymentMethod, name: 'DANA', account: '081211223344', accountName: 'Yayasan ProjekKita' },
  { id: 'qris' as PaymentMethod, name: 'QRIS', account: 'Scan QR Code', accountName: 'Yayasan ProjekKita' },
];

const quickAmounts = [50000, 100000, 250000, 500000, 1000000, 2500000];

// Generate unique code (3 digits)
const generateUniqueCode = () => {
  return Math.floor(100 + Math.random() * 900);
};

export function DonationPage({ onBack, projectTitle, projectCategory }: DonationPageProps) {
  const [amount, setAmount] = useState('');
  const [customAmount, setCustomAmount] = useState('');
  const [selectedPayment, setSelectedPayment] = useState<PaymentMethod>('bca');
  const [message, setMessage] = useState('');
  const [prayer, setPrayer] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);
  const [copiedAccount, setCopiedAccount] = useState(false);
  const [copiedTotal, setCopiedTotal] = useState(false);
  const [uniqueCode] = useState(generateUniqueCode());
  const [proofFile, setProofFile] = useState<File | null>(null);
  const [proofPreview, setProofPreview] = useState<string | null>(null);

  const handleQuickAmount = (value: number) => {
    setAmount(value.toString());
    setCustomAmount('');
  };

  const handleCustomAmount = (value: string) => {
    // Only allow numbers
    const numericValue = value.replace(/[^0-9]/g, '');
    setCustomAmount(numericValue);
    setAmount(numericValue);
  };

  const formatCurrency = (value: string) => {
    if (!value) return '';
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(parseInt(value));
  };

  const getTotalWithUniqueCode = () => {
    if (!amount) return 0;
    return parseInt(amount) + uniqueCode;
  };

  const copyToClipboard = (text: string, type: 'account' | 'total') => {
    navigator.clipboard.writeText(text);
    if (type === 'account') {
      setCopiedAccount(true);
      setTimeout(() => setCopiedAccount(false), 2000);
    } else {
      setCopiedTotal(true);
      setTimeout(() => setCopiedTotal(false), 2000);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Check file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('Ukuran file maksimal 5MB');
        return;
      }

      // Check file type
      if (!file.type.startsWith('image/')) {
        alert('File harus berupa gambar');
        return;
      }

      setProofFile(file);

      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setProofPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeProofFile = () => {
    setProofFile(null);
    setProofPreview(null);
  };

  const handleConfirmDonation = () => {
    if (!amount || parseInt(amount) < 10000) {
      alert('Minimal donasi adalah Rp 10.000');
      return;
    }
    setShowConfirmation(true);
  };

  const handleSubmitProof = () => {
    if (!proofFile) {
      alert('Silakan upload bukti transfer terlebih dahulu');
      return;
    }
    // Here you would typically upload the file to your server
    setShowThankYou(true);
  };

  const selectedMethod = paymentMethods.find(m => m.id === selectedPayment);

  // Generate reference number
  const referenceNumber = `PK${Date.now().toString().slice(-8)}${uniqueCode}`;

  // Thank You Page
  if (showThankYou) {
    return (
      <div className="flex min-h-screen bg-[#F8F9FA]">
        {/* Sidebar - Desktop Only */}
        <aside className="hidden lg:flex flex-col w-64 bg-[#2B4468] border-r border-[#2B4468] fixed inset-y-0 z-30 shadow-sm">
          {/* Decorative Background Elements */}
          <div className="absolute bottom-0 left-0 right-0 h-64 opacity-5">
            <div className="absolute bottom-[-20%] left-[-10%] w-64 h-64 bg-white rounded-full"></div>
          </div>

          <div className="relative z-10 flex flex-col h-full">
            {/* Logo */}
            <div className="p-5">
              <div className="bg-[#FAC06E] p-3 flex items-center gap-3 shadow-md">
                <div className="w-8 h-8 border-2 border-[#2B4468] flex items-center justify-center">
                  <span className="material-symbols-outlined text-[#2B4468] text-xl font-bold">mosque</span>
                </div>
                <span className="font-['Archivo_Black'] text-base uppercase tracking-tight text-[#2B4468]">
                  PROJEKKITA
                </span>
              </div>
            </div>

            {/* Menu Navigation */}
            <nav className="flex-1 px-5 pt-8">
              <div className="space-y-2">
                <button className="flex items-center gap-3 px-4 py-3.5 rounded-xl font-medium transition-all text-white/60 hover:bg-white/5 hover:text-white w-full">
                  <span className="material-symbols-outlined text-xl">home</span>
                  <span className="tracking-wide text-sm">Home</span>
                </button>

                <button className="flex items-center gap-3 px-4 py-3.5 rounded-xl font-medium transition-all text-white/60 hover:bg-white/5 hover:text-white w-full">
                  <span className="material-symbols-outlined text-xl">explore</span>
                  <span className="tracking-wide text-sm">Explore</span>
                </button>

                <button className="flex items-center gap-3 px-4 py-3.5 rounded-xl font-medium transition-all text-white/60 hover:bg-white/5 hover:text-white w-full relative">
                  <span className="material-symbols-outlined text-xl">chat_bubble</span>
                  <span className="tracking-wide text-sm">Pesan</span>
                </button>

                <button className="flex items-center gap-3 px-4 py-3.5 rounded-xl font-medium transition-all text-white/60 hover:bg-white/5 hover:text-white w-full">
                  <span className="material-symbols-outlined text-xl">settings</span>
                  <span className="tracking-wide text-sm">Settings</span>
                </button>
              </div>
            </nav>

            {/* Logout */}
            <div className="p-5 pb-6">
              <button className="flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all text-white/60 hover:bg-white/5 hover:text-white w-full">
                <span className="material-symbols-outlined text-xl">logout</span>
                <span className="tracking-wide text-sm">Logout</span>
              </button>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex-1 lg:ml-64 flex flex-col min-h-screen">
          {/* Content */}
          <div className="flex-1 flex items-center justify-center p-6 pb-20 lg:pb-6">
            <div className="max-w-2xl w-full">
              {/* Success Icon with Animation */}
              <div className="flex justify-center mb-8">
                <div className="relative">
                  <div className="w-32 h-32 bg-gradient-to-br from-[#4CAF50] to-[#45a049] rounded-full flex items-center justify-center shadow-2xl">
                    <span className="material-symbols-outlined text-white text-6xl">check_circle</span>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-br from-[#4CAF50] to-[#45a049] rounded-full animate-ping opacity-20"></div>
                </div>
              </div>

              {/* Thank You Message */}
              <div className="text-center mb-8">
                <h1 className="font-['Archivo_Black'] text-4xl md:text-5xl uppercase mb-4">
                  <span className="text-[#243D68] block">Jazakumullah</span>
                  <span className="text-[#FAC06E] block">Khairan Katsira</span>
                </h1>
                <p className="text-[#6B7280] text-base leading-relaxed max-w-lg mx-auto">
                  Terima kasih atas kontribusi Anda! Bukti transfer telah kami terima dan sedang dalam proses verifikasi.
                </p>
              </div>

              {/* Reference Number */}
              <div className="bg-gradient-to-br from-[#243D68] to-[#30518B] rounded-2xl p-6 mb-6 text-white shadow-lg">
                <p className="text-white/80 text-sm mb-2 text-center">Nomor Referensi Donasi</p>
                <div className="flex items-center justify-center gap-3">
                  <p className="font-mono text-2xl font-bold tracking-wider">
                    {referenceNumber}
                  </p>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(referenceNumber);
                    }}
                    className="p-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors"
                  >
                    <span className="material-symbols-outlined text-lg">content_copy</span>
                  </button>
                </div>
                <p className="text-white/70 text-xs mt-3 text-center">
                  Simpan nomor ini untuk melacak status donasi Anda
                </p>
              </div>

              {/* Donation Summary */}
              <div className="bg-white rounded-2xl p-6 border border-[#E5E7EB] shadow-md mb-6">
                <h3 className="text-lg font-bold text-[#0E1B33] mb-4 text-center">Ringkasan Donasi</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-start pb-4 border-b border-[#E5E7EB]">
                    <div>
                      <p className="text-xs text-[#6B7280] mb-1">Project</p>
                      <p className="font-semibold text-[#0E1B33]">{projectTitle}</p>
                      <p className="text-xs text-[#FAC06E] mt-1">{projectCategory}</p>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center pb-4 border-b border-[#E5E7EB]">
                    <p className="text-sm text-[#6B7280]">Nominal Donasi</p>
                    <p className="text-xl font-bold text-[#243D68]">{formatCurrency(amount)}</p>
                  </div>
                  
                  <div className="flex justify-between items-center pb-4 border-b border-[#E5E7EB]">
                    <p className="text-sm text-[#6B7280]">Metode Pembayaran</p>
                    <p className="text-sm font-semibold text-[#0E1B33]">{selectedMethod?.name}</p>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <p className="text-sm text-[#6B7280]">Waktu Transfer</p>
                    <p className="text-sm font-semibold text-[#0E1B33]">
                      {new Date().toLocaleDateString('id-ID', { 
                        day: 'numeric', 
                        month: 'long', 
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </p>
                  </div>
                </div>
              </div>

              {/* Next Steps Info */}
              <div className="bg-[#FFF9E6] border border-[#FAC06E] rounded-xl p-5 mb-6">
                <div className="flex gap-3">
                  <span className="material-symbols-outlined text-[#F59E0B] text-xl">info</span>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-[#92400E] mb-3">Langkah Selanjutnya:</p>
                    <ol className="text-sm text-[#92400E] space-y-2 list-decimal list-inside">
                      <li>Donasi Anda akan diverifikasi dalam 1x24 jam</li>
                      <li>Anda akan menerima email konfirmasi setelah verifikasi</li>
                      <li>Notifikasi juga akan dikirim melalui aplikasi</li>
                      <li>Anda dapat melacak status donasi di halaman "Pesan"</li>
                    </ol>
                  </div>
                </div>
              </div>

              {/* Appreciation Message */}
              <div className="bg-white rounded-2xl p-6 border border-[#E5E7EB] shadow-md mb-6 text-center">
                <span className="material-symbols-outlined text-[#FAC06E] text-5xl mb-3 block">volunteer_activism</span>
                <p className="text-[#6B7280] text-sm leading-relaxed italic">
                  "Perumpamaan orang yang menginfakkan hartanya di jalan Allah seperti sebutir biji yang menumbuhkan tujuh tangkai, pada setiap tangkai ada seratus biji. Allah melipatgandakan bagi siapa yang Dia kehendaki."
                </p>
                <p className="text-xs text-[#FAC06E] mt-2 font-semibold">QS. Al-Baqarah: 261</p>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <button
                  onClick={onBack}
                  className="w-full flex items-center justify-center gap-2 py-4 rounded-xl font-bold uppercase tracking-widest bg-[#183A74] text-white shadow-[6px_6px_0px_0px_rgba(250,192,110,1)] hover:shadow-[8px_8px_0px_0px_rgba(250,192,110,1)] active:shadow-none active:translate-x-1 active:translate-y-1 transition-all"
                >
                  <span className="material-symbols-outlined">home</span>
                  <span>Kembali ke Beranda</span>
                </button>
                <button
                  onClick={async () => {
                    // Share functionality with error handling
                    try {
                      if (navigator.share) {
                        await navigator.share({
                          title: 'ProjekKita - Donasi Berhasil',
                          text: `Alhamdulillah, saya baru saja berdonasi untuk "${projectTitle}" melalui ProjekKita. Mari ikut berkontribusi!`,
                        });
                      } else {
                        // Fallback: copy to clipboard
                        const shareText = `Alhamdulillah, saya baru saja berdonasi untuk "${projectTitle}" melalui ProjekKita. Mari ikut berkontribusi!`;
                        await navigator.clipboard.writeText(shareText);
                        alert('Teks berhasil disalin! Silakan bagikan melalui aplikasi favorit Anda.');
                      }
                    } catch (error) {
                      // Ignore if user cancels share dialog or permission denied
                      console.log('Share cancelled or not available');
                    }
                  }}
                  className="w-full flex items-center justify-center gap-2 py-4 rounded-xl font-bold uppercase tracking-widest bg-white text-[#243D68] border-2 border-[#243D68] hover:bg-[#F8F9FA] transition-all"
                >
                  <span className="material-symbols-outlined">share</span>
                  <span>Bagikan Kebaikan</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (showConfirmation) {
    return (
      <div className="flex min-h-screen bg-[#F8F9FA]">
        {/* Sidebar - Desktop Only */}
        <aside className="hidden lg:flex flex-col w-64 bg-[#2B4468] border-r border-[#2B4468] fixed inset-y-0 z-30 shadow-sm">
          {/* Decorative Background Elements */}
          <div className="absolute bottom-0 left-0 right-0 h-64 opacity-5">
            <div className="absolute bottom-[-20%] left-[-10%] w-64 h-64 bg-white rounded-full"></div>
          </div>

          <div className="relative z-10 flex flex-col h-full">
            {/* Logo */}
            <div className="p-5">
              <div className="bg-[#FAC06E] p-3 flex items-center gap-3 shadow-md">
                <div className="w-8 h-8 border-2 border-[#2B4468] flex items-center justify-center">
                  <span className="material-symbols-outlined text-[#2B4468] text-xl font-bold">mosque</span>
                </div>
                <span className="font-['Archivo_Black'] text-base uppercase tracking-tight text-[#2B4468]">
                  PROJEKKITA
                </span>
              </div>
            </div>

            {/* Menu Navigation */}
            <nav className="flex-1 px-5 pt-8">
              <div className="space-y-2">
                <button className="flex items-center gap-3 px-4 py-3.5 rounded-xl font-medium transition-all text-white/60 hover:bg-white/5 hover:text-white w-full">
                  <span className="material-symbols-outlined text-xl">home</span>
                  <span className="tracking-wide text-sm">Home</span>
                </button>

                <button className="flex items-center gap-3 px-4 py-3.5 rounded-xl font-medium transition-all text-white/60 hover:bg-white/5 hover:text-white w-full">
                  <span className="material-symbols-outlined text-xl">explore</span>
                  <span className="tracking-wide text-sm">Explore</span>
                </button>

                <button className="flex items-center gap-3 px-4 py-3.5 rounded-xl font-medium transition-all text-white/60 hover:bg-white/5 hover:text-white w-full relative">
                  <span className="material-symbols-outlined text-xl">chat_bubble</span>
                  <span className="tracking-wide text-sm">Pesan</span>
                </button>

                <button className="flex items-center gap-3 px-4 py-3.5 rounded-xl font-medium transition-all text-white/60 hover:bg-white/5 hover:text-white w-full">
                  <span className="material-symbols-outlined text-xl">settings</span>
                  <span className="tracking-wide text-sm">Settings</span>
                </button>
              </div>
            </nav>

            {/* Logout */}
            <div className="p-5 pb-6">
              <button className="flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all text-white/60 hover:bg-white/5 hover:text-white w-full">
                <span className="material-symbols-outlined text-xl">logout</span>
                <span className="tracking-wide text-sm">Logout</span>
              </button>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex-1 lg:ml-64 flex flex-col min-h-screen">
          {/* Header */}
          <div className="sticky top-0 z-20 flex items-center bg-white px-6 md:px-8 py-4 justify-between border-b border-[#E5E7EB] shadow-sm">
            <div className="flex items-center justify-start">
              <button onClick={onBack} className="cursor-pointer hover:bg-[#F8F9FA] rounded-lg p-1.5 transition-colors flex items-center justify-center">
                <span className="material-symbols-outlined text-[#243D68] text-[24px]">arrow_back</span>
              </button>
            </div>
            <h2 className="text-[#0E1B33] text-lg font-bold leading-tight tracking-tight flex-1 text-center uppercase">
              Konfirmasi Donasi
            </h2>
            <div className="w-10"></div>
          </div>

          {/* Confirmation Content */}
          <div className="flex-1 flex items-center justify-center p-6 pb-20 lg:pb-6">
            <div className="max-w-2xl w-full">
              {/* Success Icon - Only show after upload */}
              {proofFile && (
                <div className="flex justify-center mb-6">
                  <div className="w-24 h-24 bg-gradient-to-br from-[#4CAF50] to-[#45a049] rounded-full flex items-center justify-center shadow-lg">
                    <span className="material-symbols-outlined text-white text-5xl">check_circle</span>
                  </div>
                </div>
              )}

              {/* Success Message */}
              <div className="text-center mb-6">
                <h3 className="text-2xl font-['Archivo_Black'] text-[#0E1B33] uppercase mb-2">
                  {proofFile ? 'Terima Kasih!' : 'Instruksi Pembayaran'}
                </h3>
                <p className="text-[#6B7280] text-sm">
                  {proofFile 
                    ? 'Bukti transfer Anda telah diterima dan sedang diverifikasi. Kami akan mengirimkan konfirmasi via email.'
                    : 'Silakan lakukan pembayaran sesuai detail berikut dan upload bukti transfer Anda.'
                  }
                </p>
              </div>

              {/* Two Column Layout for Desktop/Tablet */}
              <div className="grid lg:grid-cols-2 gap-6 mb-6">
                {/* Payment Details Card */}
                <div className="bg-white rounded-2xl p-6 border border-[#E5E7EB] shadow-md">
                  {/* Amount with Unique Code */}
                  <div className="text-center mb-6 pb-6 border-b border-[#E5E7EB]">
                    <p className="text-sm text-[#6B7280] mb-1">Nominal Donasi</p>
                    <div className="mt-3 p-3 bg-[#FFF9E6] rounded-lg border border-[#FAC06E]">
                      <p className="text-xs text-[#92400E] mb-1">Transfer dengan Kode Unik:</p>
                      <div className="flex items-center justify-center gap-2">
                        <p className="text-3xl font-['Archivo_Black'] text-[#243D68]">
                          {formatCurrency(getTotalWithUniqueCode().toString())}
                        </p>
                        <button
                          onClick={() => copyToClipboard(getTotalWithUniqueCode().toString(), 'total')}
                          className="p-2 bg-[#243D68] hover:bg-[#1a2f54] text-white rounded-lg transition-colors"
                        >
                          <span className="material-symbols-outlined text-lg">
                            {copiedTotal ? 'check' : 'content_copy'}
                          </span>
                        </button>
                      </div>
                      {copiedTotal && (
                        <p className="text-xs text-[#4CAF50] mt-1 flex items-center justify-center gap-1">
                          <span className="material-symbols-outlined text-sm">check_circle</span>
                          Nominal berhasil disalin!
                        </p>
                      )}
                      <p className="text-xs text-[#92400E] mt-2">
                        Kode unik: <span className="font-bold text-[#F59E0B]">{uniqueCode}</span> (untuk validasi transfer)
                      </p>
                    </div>
                  </div>

                  {/* Payment Method */}
                  <div className="mb-4">
                    <p className="text-sm text-[#6B7280] mb-2">Metode Pembayaran</p>
                    <div className="flex items-center gap-3 p-3 bg-[#F8F9FA] rounded-lg">
                      <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center border border-[#E5E7EB] font-bold text-[#243D68]">
                        {selectedMethod?.name}
                      </div>
                      <div>
                        <p className="font-semibold text-[#0E1B33]">{selectedMethod?.name}</p>
                        <p className="text-xs text-[#6B7280]">{selectedMethod?.accountName}</p>
                      </div>
                    </div>
                  </div>

                  {/* Account Number */}
                  <div className="mb-4">
                    <p className="text-sm text-[#6B7280] mb-2">
                      {selectedPayment === 'qris' ? 'Instruksi Pembayaran' : 'Nomor Rekening/HP'}
                    </p>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 p-3 bg-[#F8F9FA] rounded-lg border border-[#E5E7EB]">
                        <p className="font-mono text-lg font-bold text-[#243D68]">
                          {selectedMethod?.account}
                        </p>
                      </div>
                      {selectedPayment !== 'qris' && (
                        <button
                          onClick={() => copyToClipboard(selectedMethod?.account || '', 'account')}
                          className="p-3 bg-[#243D68] hover:bg-[#1a2f54] text-white rounded-lg transition-colors"
                        >
                          <span className="material-symbols-outlined">
                            {copiedAccount ? 'check' : 'content_copy'}
                          </span>
                        </button>
                      )}
                    </div>
                    {copiedAccount && (
                      <p className="text-xs text-[#4CAF50] mt-1 flex items-center gap-1">
                        <span className="material-symbols-outlined text-sm">check_circle</span>
                        Nomor berhasil disalin!
                      </p>
                    )}
                  </div>

                  {/* Account Name */}
                  <div>
                    <p className="text-sm text-[#6B7280] mb-2">Nama Penerima</p>
                    <div className="p-3 bg-[#F8F9FA] rounded-lg border border-[#E5E7EB]">
                      <p className="font-semibold text-[#0E1B33]">{selectedMethod?.accountName}</p>
                    </div>
                  </div>
                </div>

                {/* Instructions */}
                <div className="bg-[#FFF9E6] border border-[#FAC06E] rounded-xl p-4 mb-6">
                  <div className="flex gap-3">
                    <span className="material-symbols-outlined text-[#F59E0B] text-xl">info</span>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-[#92400E] mb-2">Instruksi Pembayaran:</p>
                      <ol className="text-xs text-[#92400E] space-y-1 list-decimal list-inside">
                        <li>Transfer sesuai nominal yang tertera (termasuk kode unik)</li>
                        <li>Simpan bukti transfer Anda</li>
                        <li>Upload bukti transfer di bawah ini</li>
                        <li>Donasi akan diverifikasi dalam 1x24 jam</li>
                        <li>Anda akan menerima notifikasi konfirmasi via email</li>
                      </ol>
                    </div>
                  </div>
                </div>
              </div>

              {/* Upload Bukti Transfer */}
              <div className="bg-white rounded-2xl p-6 border border-[#E5E7EB] shadow-md mb-6">
                <h3 className="text-base font-bold text-[#0E1B33] mb-4 flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#243D68]">upload_file</span>
                  Upload Bukti Transfer
                </h3>

                {!proofPreview ? (
                  <div className="border-2 border-dashed border-[#E5E7EB] rounded-xl p-8 text-center hover:border-[#243D68] transition-colors">
                    <label htmlFor="proof-upload" className="cursor-pointer">
                      <div className="flex flex-col items-center gap-3">
                        <div className="w-16 h-16 bg-[#F8F9FA] rounded-full flex items-center justify-center">
                          <span className="material-symbols-outlined text-[#243D68] text-3xl">cloud_upload</span>
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-[#0E1B33] mb-1">
                            Klik untuk upload bukti transfer
                          </p>
                          <p className="text-xs text-[#6B7280]">
                            Format: JPG, PNG (Maks. 5MB)
                          </p>
                        </div>
                      </div>
                      <input
                        id="proof-upload"
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="hidden"
                      />
                    </label>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="relative rounded-xl overflow-hidden border border-[#E5E7EB]">
                      <img
                        src={proofPreview}
                        alt="Bukti Transfer"
                        className="w-full h-auto max-h-96 object-contain bg-[#F8F9FA]"
                      />
                      <button
                        onClick={removeProofFile}
                        className="absolute top-2 right-2 p-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors shadow-lg"
                      >
                        <span className="material-symbols-outlined">delete</span>
                      </button>
                    </div>
                    <div className="flex items-center gap-2 p-3 bg-[#E8F5E9] rounded-lg border border-[#4CAF50]">
                      <span className="material-symbols-outlined text-[#4CAF50]">check_circle</span>
                      <p className="text-sm text-[#4CAF50] font-medium">
                        Bukti transfer berhasil diupload: {proofFile?.name}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <button
                  onClick={handleSubmitProof}
                  disabled={!proofFile}
                  className={`w-full flex items-center justify-center gap-2 py-4 rounded-xl font-bold uppercase tracking-widest transition-all ${
                    proofFile
                      ? 'bg-[#183A74] text-white shadow-[6px_6px_0px_0px_rgba(250,192,110,1)] active:shadow-none active:translate-x-1 active:translate-y-1'
                      : 'bg-[#E5E7EB] text-[#9CA3AF] cursor-not-allowed'
                  }`}
                >
                  <span className="material-symbols-outlined">send</span>
                  <span>Kirim Bukti Transfer</span>
                </button>
                <button
                  onClick={onBack}
                  className="w-full flex items-center justify-center gap-2 py-4 rounded-xl font-bold uppercase tracking-widest bg-white text-[#243D68] border-2 border-[#243D68] hover:bg-[#F8F9FA] transition-all"
                >
                  <span className="material-symbols-outlined">arrow_back</span>
                  <span>Kembali ke Detail Project</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-[#F8F9FA]">
      {/* Sidebar - Desktop Only */}
      <aside className="hidden lg:flex flex-col w-64 bg-[#2B4468] border-r border-[#2B4468] fixed inset-y-0 z-30 shadow-sm">
        {/* Decorative Background Elements */}
        <div className="absolute bottom-0 left-0 right-0 h-64 opacity-5">
          <div className="absolute bottom-[-20%] left-[-10%] w-64 h-64 bg-white rounded-full"></div>
        </div>

        <div className="relative z-10 flex flex-col h-full">
          {/* Logo */}
          <div className="p-5">
            <div className="bg-[#FAC06E] p-3 flex items-center gap-3 shadow-md">
              <div className="w-8 h-8 border-2 border-[#2B4468] flex items-center justify-center">
                <span className="material-symbols-outlined text-[#2B4468] text-xl font-bold">mosque</span>
              </div>
              <span className="font-['Archivo_Black'] text-base uppercase tracking-tight text-[#2B4468]">
                PROJEKKITA
              </span>
            </div>
          </div>

          {/* Menu Navigation */}
          <nav className="flex-1 px-5 pt-8">
            <div className="space-y-2">
              <button className="flex items-center gap-3 px-4 py-3.5 rounded-xl font-medium transition-all text-white/60 hover:bg-white/5 hover:text-white w-full">
                <span className="material-symbols-outlined text-xl">home</span>
                <span className="tracking-wide text-sm">Home</span>
              </button>

              <button className="flex items-center gap-3 px-4 py-3.5 rounded-xl font-medium transition-all text-white/60 hover:bg-white/5 hover:text-white w-full">
                <span className="material-symbols-outlined text-xl">explore</span>
                <span className="tracking-wide text-sm">Explore</span>
              </button>

              <button className="flex items-center gap-3 px-4 py-3.5 rounded-xl font-medium transition-all text-white/60 hover:bg-white/5 hover:text-white w-full relative">
                <span className="material-symbols-outlined text-xl">chat_bubble</span>
                <span className="tracking-wide text-sm">Pesan</span>
              </button>

              <button className="flex items-center gap-3 px-4 py-3.5 rounded-xl font-medium transition-all text-white/60 hover:bg-white/5 hover:text-white w-full">
                <span className="material-symbols-outlined text-xl">settings</span>
                <span className="tracking-wide text-sm">Settings</span>
              </button>
            </div>
          </nav>

          {/* Logout */}
          <div className="p-5 pb-6">
            <button className="flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all text-white/60 hover:bg-white/5 hover:text-white w-full">
              <span className="material-symbols-outlined text-xl">logout</span>
              <span className="tracking-wide text-sm">Logout</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 lg:ml-64 flex flex-col min-h-screen">
        {/* Header */}
        <div className="sticky top-0 z-20 flex items-center bg-white px-6 md:px-8 py-4 justify-between border-b border-[#E5E7EB] shadow-sm">
          <div className="flex items-center justify-start">
            <button onClick={onBack} className="cursor-pointer hover:bg-[#F8F9FA] rounded-lg p-1.5 transition-colors flex items-center justify-center">
              <span className="material-symbols-outlined text-[#243D68] text-[24px]">arrow_back</span>
            </button>
          </div>
          <h2 className="text-[#0E1B33] text-lg font-bold leading-tight tracking-tight flex-1 text-center uppercase">
            Donasi Project
          </h2>
          <div className="w-10"></div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto pb-24 lg:pb-8">
          <div className="max-w-3xl mx-auto px-6 md:px-8 py-6 space-y-6">
            {/* Project Info */}
            <div className="bg-white rounded-2xl p-5 border border-[#E5E7EB] shadow-sm">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-[#243D68] to-[#30518B] rounded-xl flex items-center justify-center flex-shrink-0">
                  <span className="material-symbols-outlined text-white text-2xl">mosque</span>
                </div>
                <div className="flex-1">
                  <p className="text-xs text-[#6B7280] mb-1 uppercase tracking-wide">{projectCategory}</p>
                  <h3 className="text-lg font-bold text-[#0E1B33]">{projectTitle}</h3>
                </div>
              </div>
            </div>

            {/* Amount Selection */}
            <div className="bg-white rounded-2xl p-6 border border-[#E5E7EB] shadow-sm">
              <h3 className="text-base font-bold text-[#0E1B33] mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined text-[#243D68]">payments</span>
                Nominal Donasi
              </h3>

              {/* Quick Amount Buttons */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-4">
                {quickAmounts.map((value) => (
                  <button
                    key={value}
                    onClick={() => handleQuickAmount(value)}
                    className={`px-4 py-3 rounded-xl font-semibold text-sm transition-all border-2 ${
                      amount === value.toString()
                        ? 'bg-[#243D68] text-white border-[#243D68]'
                        : 'bg-white text-[#243D68] border-[#E5E7EB] hover:border-[#243D68]'
                    }`}
                  >
                    {formatCurrency(value.toString())}
                  </button>
                ))}
              </div>

              {/* Custom Amount Input */}
              <div>
                <label className="text-sm text-[#6B7280] mb-2 block">Atau masukkan nominal lainnya:</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#6B7280] font-semibold">
                    Rp
                  </span>
                  <input
                    type="text"
                    value={customAmount}
                    onChange={(e) => handleCustomAmount(e.target.value)}
                    placeholder="0"
                    className="w-full pl-12 pr-4 py-3 border-2 border-[#E5E7EB] rounded-xl focus:border-[#243D68] focus:outline-none text-lg font-semibold text-[#0E1B33]"
                  />
                </div>
                {customAmount && (
                  <p className="text-xs text-[#6B7280] mt-2">
                    Total: <span className="font-semibold text-[#243D68]">{formatCurrency(customAmount)}</span>
                  </p>
                )}
                <p className="text-xs text-[#6B7280] mt-2">Minimal donasi Rp 10.000</p>
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-white rounded-2xl p-6 border border-[#E5E7EB] shadow-sm">
              <h3 className="text-base font-bold text-[#0E1B33] mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined text-[#243D68]">account_balance</span>
                Metode Pembayaran
              </h3>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {paymentMethods.map((method) => (
                  <button
                    key={method.id}
                    onClick={() => setSelectedPayment(method.id)}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      selectedPayment === method.id
                        ? 'border-[#243D68] bg-[#243D68]/5'
                        : 'border-[#E5E7EB] hover:border-[#243D68]/50'
                    }`}
                  >
                    <div className="flex flex-col items-center gap-2">
                      <div className={`w-12 h-12 rounded-lg flex items-center justify-center font-bold text-sm ${
                        selectedPayment === method.id ? 'bg-[#243D68] text-white' : 'bg-[#F8F9FA] text-[#243D68]'
                      }`}>
                        {method.name}
                      </div>
                      <span className="text-xs font-semibold text-[#0E1B33]">{method.name}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Message & Prayer (Optional) */}
            <div className="bg-white rounded-2xl p-6 border border-[#E5E7EB] shadow-sm">
              <h3 className="text-base font-bold text-[#0E1B33] mb-1 flex items-center gap-2">
                <span className="material-symbols-outlined text-[#243D68]">edit_note</span>
                Pesan & Doa
              </h3>
              <p className="text-xs text-[#6B7280] mb-4">(Opsional)</p>

              {/* Message */}
              <div className="mb-4">
                <label className="text-sm text-[#6B7280] mb-2 block">Pesan untuk Project:</label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Semoga project ini bermanfaat untuk umat..."
                  maxLength={200}
                  rows={3}
                  className="w-full p-3 border-2 border-[#E5E7EB] rounded-xl focus:border-[#243D68] focus:outline-none text-sm text-[#0E1B33] resize-none"
                />
                <p className="text-xs text-[#6B7280] mt-1 text-right">{message.length}/200</p>
              </div>

              {/* Prayer */}
              <div className="mb-4">
                <label className="text-sm text-[#6B7280] mb-2 block">Doa untuk Project:</label>
                <textarea
                  value={prayer}
                  onChange={(e) => setPrayer(e.target.value)}
                  placeholder="Semoga Allah SWT memudahkan dan memberkahi project ini..."
                  maxLength={200}
                  rows={3}
                  className="w-full p-3 border-2 border-[#E5E7EB] rounded-xl focus:border-[#243D68] focus:outline-none text-sm text-[#0E1B33] resize-none"
                />
                <p className="text-xs text-[#6B7280] mt-1 text-right">{prayer.length}/200</p>
              </div>

              {/* Anonymous Option */}
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="anonymous"
                  checked={isAnonymous}
                  onChange={(e) => setIsAnonymous(e.target.checked)}
                  className="w-5 h-5 text-[#243D68] border-[#E5E7EB] rounded focus:ring-[#243D68]"
                />
                <label htmlFor="anonymous" className="text-sm text-[#6B7280] cursor-pointer">
                  Sembunyikan identitas saya (donasi anonim)
                </label>
              </div>
            </div>

            {/* Summary */}
            {amount && parseInt(amount) >= 10000 && (
              <div className="bg-gradient-to-br from-[#243D68] to-[#30518B] rounded-2xl p-6 text-white shadow-lg">
                <h3 className="text-sm font-semibold mb-3 opacity-90">Ringkasan Donasi</h3>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm opacity-80">Nominal Donasi:</span>
                    <span className="text-xl font-bold">{formatCurrency(amount)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm opacity-80">Metode Pembayaran:</span>
                    <span className="text-sm font-semibold">{selectedMethod?.name}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm opacity-80">Status:</span>
                    <span className="text-sm font-semibold">{isAnonymous ? 'Anonim' : 'Publik'}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Fixed Bottom Button */}
        <div className="fixed bottom-0 left-0 right-0 lg:static bg-white border-t border-[#E5E7EB] p-4 lg:px-8 lg:pb-8 z-10">
          <div className="max-w-3xl mx-auto">
            <button
              onClick={handleConfirmDonation}
              disabled={!amount || parseInt(amount) < 10000}
              className={`w-full flex items-center justify-center gap-2 py-4 rounded-xl font-bold uppercase tracking-widest transition-all ${
                amount && parseInt(amount) >= 10000
                  ? 'bg-[#183A74] text-white shadow-[6px_6px_0px_0px_rgba(250,192,110,1)] active:shadow-none active:translate-x-1 active:translate-y-1'
                  : 'bg-[#E5E7EB] text-[#9CA3AF] cursor-not-allowed'
              }`}
            >
              <span className="material-symbols-outlined">volunteer_activism</span>
              <span>Lanjutkan Donasi</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}