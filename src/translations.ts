/**
 * AlMaqdisi Project - Complete Translation System
 * Supports: Indonesian (id) and English (en)
 */

export type Language = 'id' | 'en';

export interface Translations {
  // ===== 1. NAVIGATION & MENU =====
  nav: {
    home: string;
    explore: string;
    messages: string;
    settings: string;
    logout: string;
    campaign: string;
    adminPanel: string;
  };

  // ===== 2. TABS =====
  tabs: {
    openVolunteer: string;
    projectGallery: string;
    campaign: string;
    overview: string;
    progress: string;
    members: string;
    discussion: string;
    wallet: string;
  };

  // ===== 3. HERO SECTION =====
  hero: {
    title: string;
    description: string;
    aqsaBaitulMaqdis: string;
    exploreProjectBtn: string;
  };

  // ===== 4. CATEGORIES =====
  categories: {
    all: string;
    education: string;
    environment: string;
    health: string;
  };

  // ===== 5. HOME SECTIONS =====
  home: {
    featuredProjects: string;
    exploreProjects: string;
    educationProjects: string;
    environmentProjects: string;
    healthProjects: string;
    inspiringStories: string;
    inspiringStoriesDesc: string;
    yourProjects: string;
    upcomingEvents: string;
    viewAll: string;
    viewProject: string;
    login: string;
    searchPlaceholder: string;
  };

  // ===== 6. PROJECT DETAIL =====
  projectDetail: {
    category: string;
    location: string;
    duration: string;
    target: string;
    collected: string;
    deadline: string;
    status: string;
    joinProject: string;
    donateNow: string;
    shareProject: string;
    save: string;
    description: string;
    projectInfo: string;
    requirements: string;
    benefits: string;
  };

  // ===== 7. PROJECT STATUS =====
  status: {
    active: string;
    completed: string;
    closed: string;
    pending: string;
    approved: string;
    rejected: string;
    draft: string;
    published: string;
    new: string;
    popular: string;
    trending: string;
  };

  // ===== 8. MEMBERS SECTION =====
  members: {
    teamMembers: string;
    pic: string;
    totalMembers: string;
    viewAll: string;
    joinDate: string;
    role: string;
  };

  // ===== 9. DISCUSSION SECTION =====
  discussion: {
    discussion: string;
    writeComment: string;
    send: string;
    reply: string;
    edit: string;
    delete: string;
    noComments: string;
    loadMore: string;
  };

  // ===== 10. WALLET SECTION =====
  wallet: {
    projectBalance: string;
    totalDonations: string;
    totalWithdrawals: string;
    transactionHistory: string;
    withdrawFunds: string;
    date: string;
    type: string;
    amount: string;
    description: string;
    noTransactions: string;
  };

  // ===== 11. DONATION PAGE =====
  donation: {
    donateToProject: string;
    donationAmount: string;
    selectPaymentMethod: string;
    bankTransfer: string;
    eWallet: string;
    creditCard: string;
    messageForPic: string;
    donateAnonymous: string;
    continuePayment: string;
    back: string;
    enterAmount: string;
    quickAmounts: string;
  };

  // ===== 12. MESSAGES =====
  messages: {
    messages: string;
    searchConversations: string;
    typeMessage: string;
    online: string;
    lastActive: string;
    read: string;
    sent: string;
    delivered: string;
    noMessages: string;
    startConversation: string;
  };

  // ===== 13. SETTINGS =====
  settings: {
    settings: string;
    alumniProfile: string;
    account: string;
    accountSecurity: string;
    notifications: string;
    privacy: string;
    preferences: string;
    helpSupport: string;
    about: string;
    
    // Profile
    personalInfo: string;
    alumniData: string;
    editProfile: string;
    fullName: string;
    nickname: string;
    email: string;
    phoneNumber: string;
    bio: string;
    major: string;
    saladinCampBatch: string;
    currentStatus: string;
    company: string;
    domicile: string;
    maritalStatus: string;
    employmentStatus: string;
    skills: string;
    learning: string;
    
    // Security
    changePassword: string;
    oldPassword: string;
    newPassword: string;
    confirmPassword: string;
    emailVerification: string;
    verified: string;
    notVerified: string;
    resend: string;
    twoFactor: string;
    
    // Notifications
    pushNotifications: string;
    emailNotifications: string;
    inAppNotifications: string;
    notificationCategories: string;
    projectUpdates: string;
    newVote: string;
    mentions: string;
    newDiscussion: string;
    adminAnnouncements: string;
    
    // Privacy
    profileVisibility: string;
    public: string;
    alumniOnly: string;
    private: string;
    contactVisibleTo: string;
    allowMentionsFrom: string;
    showOnlineStatus: string;
    everyone: string;
    
    // Preferences
    language: string;
    theme: string;
    timezone: string;
    
    // Help & Support
    helpCenter: string;
    contactUs: string;
    reportBug: string;
    faq: string;
    
    // About
    aboutApp: string;
    termsConditions: string;
    privacyPolicy: string;
    appVersion: string;
    
    // Buttons
    save: string;
    cancel: string;
    logout: string;
    editProfileBtn: string;
  };

  // ===== 14. NOTIFICATIONS =====
  notifications: {
    notifications: string;
    markAllRead: string;
    clearAll: string;
    newNotifications: string;
    earlier: string;
    noNotifications: string;
    
    // Types
    donationSuccess: string;
    joinRequestApproved: string;
    joinRequestRejected: string;
    projectUpdate: string;
    newVoteAvailable: string;
    mentionInDiscussion: string;
    withdrawalApproved: string;
    newMember: string;
    projectCompleted: string;
  };

  // ===== 15. CAMPAIGN =====
  campaign: {
    campaignDashboard: string;
    createNewCampaign: string;
    activeCampaigns: string;
    completedCampaigns: string;
    fundingGoal: string;
    collected: string;
    numberOfDonors: string;
    timeRemaining: string;
    campaignDescription: string;
    campaignUpdates: string;
    donorList: string;
    editCampaign: string;
    deleteCampaign: string;
    shareCampaign: string;
  };

  // ===== 16. ADMIN PANEL =====
  admin: {
    adminDashboard: string;
    statistics: string;
    totalProjects: string;
    totalDonations: string;
    totalAlumni: string;
    totalDonors: string;
    manageProjects: string;
    manageUsers: string;
    manageDonations: string;
    manageWithdrawals: string;
    manageJoinRequests: string;
    approve: string;
    reject: string;
    edit: string;
    delete: string;
    viewDetails: string;
    actions: string;
  };

  // ===== 17. TIME & DATE =====
  time: {
    justNow: string;
    minuteAgo: string;
    minutesAgo: string;
    hourAgo: string;
    hoursAgo: string;
    dayAgo: string;
    daysAgo: string;
    weekAgo: string;
    weeksAgo: string;
    monthAgo: string;
    monthsAgo: string;
    today: string;
    yesterday: string;
    tomorrow: string;
  };

  // ===== 18. COMMON ACTIONS =====
  common: {
    save: string;
    cancel: string;
    delete: string;
    edit: string;
    view: string;
    close: string;
    back: string;
    next: string;
    previous: string;
    submit: string;
    confirm: string;
    loading: string;
    search: string;
    filter: string;
    sort: string;
    reset: string;
    apply: string;
    clear: string;
    yes: string;
    no: string;
    ok: string;
  };

  // ===== 19. TOAST MESSAGES =====
  toast: {
    // Success
    saveSuccess: string;
    donationSuccess: string;
    joinRequestSuccess: string;
    profileUpdateSuccess: string;
    passwordChangeSuccess: string;
    withdrawalSuccess: string;
    
    // Error
    error: string;
    donationFailed: string;
    passwordMismatch: string;
    requiredField: string;
    invalidEmail: string;
    fileTooLarge: string;
    
    // Confirmation
    areYouSure: string;
    deleteConfirm: string;
    yesDelete: string;
    noCancel: string;
    yesLogout: string;
  };

  // ===== 20. EMPTY STATES =====
  empty: {
    noProjects: string;
    noNotifications: string;
    noMessages: string;
    noDonations: string;
    noCampaigns: string;
    noMembers: string;
    noTransactions: string;
    noResults: string;
    noData: string;
  };

  // ===== 21. EXPLORE PAGE =====
  explore: {
    explore: string;
    filterBy: string;
    sortBy: string;
    latest: string;
    mostPopular: string;
    nearestDeadline: string;
    showing: string;
    results: string;
    categoryFilter: string;
  };

  // ===== 22. MY DONATIONS =====
  myDonations: {
    myDonations: string;
    donationHistory: string;
    totalDonated: string;
    totalProjects: string;
    donationDetails: string;
    paymentMethod: string;
    transactionId: string;
    donationDate: string;
    projectSupported: string;
  };

  // ===== 23. MY JOIN REQUESTS =====
  myJoinRequests: {
    myJoinRequests: string;
    requestHistory: string;
    viewProject: string;
    requestDate: string;
    responseDate: string;
    statusMessage: string;
  };

  // ===== 24. FORM VALIDATION =====
  validation: {
    required: string;
    invalidEmail: string;
    minLength: string;
    maxLength: string;
    passwordMismatch: string;
    invalidPhone: string;
    invalidUrl: string;
    minAmount: string;
    maxAmount: string;
  };

  // ===== 25. ALUMNI STORY =====
  alumniStory: {
    alumniStory: string;
    readMore: string;
    shareStory: string;
    relatedStories: string;
    backToStories: string;
  };

  // ===== 26. EVENT =====
  event: {
    eventDetails: string;
    registerNow: string;
    eventDate: string;
    eventTime: string;
    eventLocation: string;
    capacity: string;
    registered: string;
    spotsLeft: string;
    organizerInfo: string;
    eventDescription: string;
    registrationClosed: string;
    eventFull: string;
  };

  // ===== 27. MARITAL & EMPLOYMENT STATUS =====
  maritalStatus: {
    single: string;
    married: string;
    divorced: string;
  };

  employmentStatus: {
    working: string;
    student: string;
    entrepreneur: string;
    freelance: string;
    unemployed: string;
  };

  // ===== 28. MESSAGE PAGE (Donatur Inbox) =====
  messagePage: {
    messages: string;
    donationReport: string;
    event: string;
    personalMessages: string;
    announcements: string;
    donationRefNumber: string;
    copyRefNumber: string;
    totalYourDonations: string;
    projects: string;
    thankYou: string;
    success: string;
    inVerification: string;
    rejected: string;
    project: string;
    donationAmount: string;
    paymentMethod: string;
    transferTime: string;
    donationInVerification: string;
    verificationThankYou: string;
    verificationTime: string;
    verificationEmail: string;
    verificationApp: string;
    donationRejected: string;
    reuploadProof: string;
    donationConfirmed: string;
    donationConfirmedDesc: string;
    eventRegistrations: string;
    noEventRegistrations: string;
    noEventRegistrationsDesc: string;
    waitingConfirmation: string;
    registeredStatus: string;
    rejectedStatus: string;
    date: string;
    time: string;
    location: string;
    participantQuota: string;
    persons: string;
    spotsRemaining: string;
  };

  // ===== 29. NOTIFICATION CENTER =====
  notifCenter: {
    notifications: string;
    unreadNotifications: string;
    allRead: string;
    readAll: string;
    deleteAll: string;
    allReadTitle: string;
    noNotifications: string;
    allReadDesc: string;
    noCategoryNotif: string;
    newBadge: string;
    viewDonationHistory: string;
    viewJoinRequestStatus: string;
    viewEventDetail: string;
    viewTaskInMessages: string;
    viewInProjectDetail: string;
    summary: string;
    total: string;
    unread: string;
    read: string;
    deleteAllConfirm: string;
    cannotUndo: string;
    // Filter labels
    filterAll: string;
    filterUnread: string;
    filterDonation: string;
    filterJoin: string;
    filterEvent: string;
    filterTask: string;
    filterUpdate: string;
    filterProject: string;
    // Notification type labels
    donationApproved: string;
    donationRejected: string;
    joinApproved: string;
    joinRejected: string;
    projectUpdate: string;
    newTask: string;
    taskCompleted: string;
    withdrawalApproved: string;
    withdrawalRejected: string;
    contentRemoved: string;
    eventRegistration: string;
    eventApproved: string;
    eventRejected: string;
    eventReminder: string;
    eventCancelled: string;
    projectClosed: string;
    closureApproved: string;
    closureRejected: string;
    alumniVerified: string;
    defaultNotification: string;
    // Time
    justNow: string;
    minutesAgo: string;
    hoursAgo: string;
    daysAgo: string;
  };

  // ===== 30. MY DONATIONS PAGE =====
  myDonationsPage: {
    myDonations: string;
    trackStatus: string;
    totalDonations: string;
    waiting: string;
    approved: string;
    totalDistributed: string;
    searchPlaceholder: string;
    all: string;
    pending: string;
    approvedFilter: string;
    rejectedFilter: string;
    noDonationsFound: string;
    tryDifferentSearch: string;
    noDonationsYet: string;
    nominal: string;
    date: string;
    method: string;
    donationRejected: string;
    clickReupload: string;
    verifiedOn: string;
    by: string;
    detail: string;
    reupload: string;
    reuploadTitle: string;
    previousRejectionReason: string;
    reuploadGuide: string;
    guideItem1: string;
    guideItem2: string;
    guideItem3: string;
    guideItem4: string;
    newProofTransfer: string;
    clickToUpload: string;
    clickToChange: string;
    fileSelected: string;
    successSent: string;
    successSentDesc: string;
    close: string;
    cancel: string;
    sending: string;
    resend: string;
    // Bottom nav
    home: string;
    explore: string;
    messages: string;
    settings: string;
  };

  // ===== 31. MY JOIN REQUESTS PAGE =====
  myJoinRequestsPage: {
    joinRequests: string;
    trackJoinStatus: string;
    totalRequests: string;
    waiting: string;
    accepted: string;
    rejected: string;
    searchPlaceholder: string;
    all: string;
    pendingFilter: string;
    acceptedFilter: string;
    rejectedFilter: string;
    noRequests: string;
    noRequestsDesc: string;
    exploreProject: string;
    submittedAgo: string;
    commitment: string;
    date: string;
    reasonToJoin: string;
    rejectionReason: string;
    canResubmit: string;
    congratsAccepted: string;
    approvedOn: string;
    picReviewing: string;
    viewProject: string;
    cancelRequest: string;
    cancelConfirm: string;
    cancelSuccess: string;
    resubmit: string;
    back: string;
    // Time
    today: string;
    yesterday: string;
    daysAgo: string;
    weeksAgo: string;
    monthsAgo: string;
    // Bottom nav
    home: string;
    explore: string;
    messages: string;
    settings: string;
  };
}

export const translations: Record<Language, Translations> = {
  id: {
    // ===== 1. NAVIGATION & MENU =====
    nav: {
      home: 'Home',
      explore: 'Explore',
      messages: 'Pesan',
      settings: 'Settings',
      logout: 'Logout',
      campaign: 'Campaign',
      adminPanel: 'Panel Admin',
    },

    // ===== 2. TABS =====
    tabs: {
      openVolunteer: 'Open Volunteer',
      projectGallery: 'Galeri Project',
      campaign: 'Campaign',
      overview: 'Overview',
      progress: 'Progress',
      members: 'Members',
      discussion: 'Discussion',
      wallet: 'Wallet',
    },

    // ===== 3. HERO SECTION =====
    hero: {
      title: 'Bersama Berjuang Untuk Al Aqsa',
      description: 'Bersama ratusan alumni Saladin Camp, mari kita teguhkan kembali janji perjuangan kita. Ini bukan sekadar solidaritas, ini adalah komitmen sejarah. Saatnya menyatukan kekuatan, merapatkan barisan, dan menghadirkan kontribusi nyata untuk satu tujuan besar: pembebasan',
      aqsaBaitulMaqdis: 'masjidil aqsa dan Baitul Maqdis',
      exploreProjectBtn: 'Explore Project',
    },

    // ===== 4. CATEGORIES =====
    categories: {
      all: 'Semua',
      education: 'Pendidikan',
      environment: 'Lingkungan',
      health: 'Kesehatan',
    },

    // ===== 5. HOME SECTIONS =====
    home: {
      featuredProjects: 'Rekomendasi Project',
      exploreProjects: 'Explore Proyek',
      educationProjects: 'Proyek Pendidikan',
      environmentProjects: 'Proyek Lingkungan',
      healthProjects: 'Proyek Kesehatan',
      inspiringStories: 'Kisah Inspiratif',
      inspiringStoriesDesc: 'Kisah nyata alumni yang berdedikasi untuk Baitul Maqdis dan Palestina!',
      yourProjects: 'Project Pilihanmu',
      upcomingEvents: 'Event Mendatang',
      viewAll: 'Lihat Semua',
      viewProject: 'Lihat Project',
      login: 'Login',
      searchPlaceholder: 'Cari project...',
    },

    // ===== 6. PROJECT DETAIL =====
    projectDetail: {
      category: 'Kategori',
      location: 'Lokasi',
      duration: 'Durasi',
      target: 'Target',
      collected: 'Terkumpul',
      deadline: 'Deadline',
      status: 'Status',
      joinProject: 'Join Project',
      donateNow: 'Donasi Sekarang',
      shareProject: 'Share Project',
      save: 'Simpan',
      description: 'Deskripsi',
      projectInfo: 'Info Project',
      requirements: 'Persyaratan',
      benefits: 'Manfaat',
    },

    // ===== 7. PROJECT STATUS =====
    status: {
      active: 'Aktif',
      completed: 'Selesai',
      closed: 'Ditutup',
      pending: 'Menunggu',
      approved: 'Disetujui',
      rejected: 'Ditolak',
      draft: 'Draft',
      published: 'Dipublikasi',
      new: 'Baru',
      popular: 'Popular',
      trending: 'Trending',
    },

    // ===== 8. MEMBERS SECTION =====
    members: {
      teamMembers: 'Anggota Tim',
      pic: 'PIC (Person In Charge)',
      totalMembers: 'Total Anggota',
      viewAll: 'Lihat Semua',
      joinDate: 'Tanggal Bergabung',
      role: 'Peran',
    },

    // ===== 9. DISCUSSION SECTION =====
    discussion: {
      discussion: 'Diskusi',
      writeComment: 'Tulis komentar...',
      send: 'Kirim',
      reply: 'Balas',
      edit: 'Edit',
      delete: 'Hapus',
      noComments: 'Belum ada komentar',
      loadMore: 'Muat Lebih Banyak',
    },

    // ===== 10. WALLET SECTION =====
    wallet: {
      projectBalance: 'Saldo Project',
      totalDonations: 'Total Donasi',
      totalWithdrawals: 'Total Penarikan',
      transactionHistory: 'Riwayat Transaksi',
      withdrawFunds: 'Tarik Dana',
      date: 'Tanggal',
      type: 'Tipe',
      amount: 'Jumlah',
      description: 'Keterangan',
      noTransactions: 'Belum ada transaksi',
    },

    // ===== 11. DONATION PAGE =====
    donation: {
      donateToProject: 'Donasi untuk Project',
      donationAmount: 'Nominal Donasi',
      selectPaymentMethod: 'Pilih Metode Pembayaran',
      bankTransfer: 'Transfer Bank',
      eWallet: 'E-Wallet',
      creditCard: 'Kartu Kredit',
      messageForPic: 'Pesan untuk PIC (Opsional)',
      donateAnonymous: 'Donasi sebagai Anonim',
      continuePayment: 'Lanjutkan Pembayaran',
      back: 'Kembali',
      enterAmount: 'Masukkan nominal',
      quickAmounts: 'Nominal Cepat',
    },

    // ===== 12. MESSAGES =====
    messages: {
      messages: 'Pesan',
      searchConversations: 'Cari percakapan...',
      typeMessage: 'Ketik pesan...',
      online: 'Online',
      lastActive: 'Terakhir aktif',
      read: 'Dibaca',
      sent: 'Terkirim',
      delivered: 'Tersampaikan',
      noMessages: 'Belum ada pesan',
      startConversation: 'Mulai percakapan',
    },

    // ===== 13. SETTINGS =====
    settings: {
      settings: 'Settings',
      alumniProfile: 'Profil Alumni',
      account: 'Akun',
      accountSecurity: 'Keamanan Akun',
      notifications: 'Notifikasi',
      privacy: 'Privasi',
      preferences: 'Preferensi',
      helpSupport: 'Bantuan & Dukungan',
      about: 'Tentang',
      
      personalInfo: 'Informasi Pribadi',
      alumniData: 'Data Alumni',
      editProfile: 'Edit Profil',
      fullName: 'Nama Lengkap',
      nickname: 'Nama Panggilan',
      email: 'Email',
      phoneNumber: 'Nomor Telepon',
      bio: 'Bio',
      major: 'Jurusan',
      saladinCampBatch: 'Batch Saladin Camp',
      currentStatus: 'Status Saat Ini',
      company: 'Perusahaan',
      domicile: 'Domisili',
      maritalStatus: 'Status Pernikahan',
      employmentStatus: 'Status Pekerjaan',
      skills: 'Keahlian',
      learning: 'Sedang Dipelajari',
      
      changePassword: 'Ubah Password',
      oldPassword: 'Password Lama',
      newPassword: 'Password Baru',
      confirmPassword: 'Konfirmasi Password',
      emailVerification: 'Verifikasi Email',
      verified: 'Terverifikasi',
      notVerified: 'Belum Terverifikasi',
      resend: 'Kirim Ulang',
      twoFactor: 'Two-Factor Authentication',
      
      pushNotifications: 'Push Notifications',
      emailNotifications: 'Email Notifications',
      inAppNotifications: 'Notifikasi di aplikasi',
      notificationCategories: 'Notifikasi Per Kategori',
      projectUpdates: 'Update proyek yang saya ikuti',
      newVote: 'Vote baru dibuat',
      mentions: 'Seseorang mention saya',
      newDiscussion: 'Diskusi baru di proyek saya',
      adminAnnouncements: 'Announcement dari admin',
      
      profileVisibility: 'Visibilitas Profil',
      public: 'Publik',
      alumniOnly: 'Hanya Alumni',
      private: 'Privat',
      contactVisibleTo: 'Kontak dapat dilihat oleh',
      allowMentionsFrom: 'Izinkan mention dari',
      showOnlineStatus: 'Tampilkan status online',
      everyone: 'Semua Orang',
      
      language: 'Bahasa',
      theme: 'Tema',
      timezone: 'Zona Waktu',
      
      helpCenter: 'Pusat Bantuan',
      contactUs: 'Hubungi Kami',
      reportBug: 'Laporkan Bug',
      faq: 'FAQ',
      
      aboutApp: 'Tentang Aplikasi',
      termsConditions: 'Syarat & Ketentuan',
      privacyPolicy: 'Kebijakan Privasi',
      appVersion: 'Versi Aplikasi',
      
      save: 'Simpan',
      cancel: 'Batal',
      logout: 'Logout',
      editProfileBtn: 'Edit Profil',
    },

    // ===== 14. NOTIFICATIONS =====
    notifications: {
      notifications: 'Notifikasi',
      markAllRead: 'Tandai Semua Dibaca',
      clearAll: 'Hapus Semua',
      newNotifications: 'Notifikasi Baru',
      earlier: 'Sebelumnya',
      noNotifications: 'Tidak ada notifikasi',
      
      donationSuccess: 'Donasi Berhasil Dikirim',
      joinRequestApproved: 'Join Request Disetujui',
      joinRequestRejected: 'Join Request Ditolak',
      projectUpdate: 'Update Progress Project',
      newVoteAvailable: 'Vote Baru Tersedia',
      mentionInDiscussion: 'Mention di Diskusi',
      withdrawalApproved: 'Withdrawal Disetujui',
      newMember: 'Anggota Baru Bergabung',
      projectCompleted: 'Project Selesai',
    },

    // ===== 15. CAMPAIGN =====
    campaign: {
      campaignDashboard: 'Dashboard Campaign',
      createNewCampaign: 'Buat Campaign Baru',
      activeCampaigns: 'Campaign Aktif',
      completedCampaigns: 'Campaign Selesai',
      fundingGoal: 'Target Dana',
      collected: 'Terkumpul',
      numberOfDonors: 'Jumlah Donatur',
      timeRemaining: 'Sisa Waktu',
      campaignDescription: 'Deskripsi Campaign',
      campaignUpdates: 'Update Campaign',
      donorList: 'Daftar Donatur',
      editCampaign: 'Edit Campaign',
      deleteCampaign: 'Hapus Campaign',
      shareCampaign: 'Bagikan Campaign',
    },

    // ===== 16. ADMIN PANEL =====
    admin: {
      adminDashboard: 'Dashboard Admin',
      statistics: 'Statistik',
      totalProjects: 'Total Project',
      totalDonations: 'Total Donasi',
      totalAlumni: 'Total Alumni',
      totalDonors: 'Total Donatur',
      manageProjects: 'Kelola Project',
      manageUsers: 'Kelola User',
      manageDonations: 'Kelola Donasi',
      manageWithdrawals: 'Kelola Withdrawal',
      manageJoinRequests: 'Kelola Join Request',
      approve: 'Setujui',
      reject: 'Tolak',
      edit: 'Edit',
      delete: 'Hapus',
      viewDetails: 'Lihat Detail',
      actions: 'Aksi',
    },

    // ===== 17. TIME & DATE =====
    time: {
      justNow: 'Baru saja',
      minuteAgo: '1 menit yang lalu',
      minutesAgo: 'menit yang lalu',
      hourAgo: '1 jam yang lalu',
      hoursAgo: 'jam yang lalu',
      dayAgo: '1 hari yang lalu',
      daysAgo: 'hari yang lalu',
      weekAgo: '1 minggu yang lalu',
      weeksAgo: 'minggu yang lalu',
      monthAgo: '1 bulan yang lalu',
      monthsAgo: 'bulan yang lalu',
      today: 'Hari ini',
      yesterday: 'Kemarin',
      tomorrow: 'Besok',
    },

    // ===== 18. COMMON ACTIONS =====
    common: {
      save: 'Simpan',
      cancel: 'Batal',
      delete: 'Hapus',
      edit: 'Edit',
      view: 'Lihat',
      close: 'Tutup',
      back: 'Kembali',
      next: 'Selanjutnya',
      previous: 'Sebelumnya',
      submit: 'Kirim',
      confirm: 'Konfirmasi',
      loading: 'Memuat...',
      search: 'Cari',
      filter: 'Filter',
      sort: 'Urutkan',
      reset: 'Reset',
      apply: 'Terapkan',
      clear: 'Bersihkan',
      yes: 'Ya',
      no: 'Tidak',
      ok: 'OK',
    },

    // ===== 19. TOAST MESSAGES =====
    toast: {
      saveSuccess: 'Berhasil disimpan!',
      donationSuccess: 'Donasi berhasil dikirim!',
      joinRequestSuccess: 'Join request berhasil dikirim!',
      profileUpdateSuccess: 'Profil berhasil diperbarui!',
      passwordChangeSuccess: 'Password berhasil diubah!',
      withdrawalSuccess: 'Penarikan dana berhasil!',
      
      error: 'Terjadi kesalahan!',
      donationFailed: 'Gagal mengirim donasi!',
      passwordMismatch: 'Password tidak cocok!',
      requiredField: 'Field ini wajib diisi',
      invalidEmail: 'Email tidak valid',
      fileTooLarge: 'File terlalu besar (max 5MB)',
      
      areYouSure: 'Apakah Anda yakin?',
      deleteConfirm: 'Data akan dihapus permanen',
      yesDelete: 'Ya, Hapus',
      noCancel: 'Tidak, Batal',
      yesLogout: 'Ya, Logout',
    },

    // ===== 20. EMPTY STATES =====
    empty: {
      noProjects: 'Tidak ada project ditemukan',
      noNotifications: 'Tidak ada notifikasi',
      noMessages: 'Tidak ada pesan',
      noDonations: 'Belum ada donasi',
      noCampaigns: 'Belum ada campaign',
      noMembers: 'Belum ada anggota',
      noTransactions: 'Belum ada transaksi',
      noResults: 'Tidak ada hasil',
      noData: 'Tidak ada data',
    },

    // ===== 21. EXPLORE PAGE =====
    explore: {
      explore: 'Explore',
      filterBy: 'Filter berdasarkan',
      sortBy: 'Urutkan berdasarkan',
      latest: 'Terbaru',
      mostPopular: 'Terpopuler',
      nearestDeadline: 'Deadline Terdekat',
      showing: 'Menampilkan',
      results: 'hasil',
      categoryFilter: 'Filter Kategori',
    },

    // ===== 22. MY DONATIONS =====
    myDonations: {
      myDonations: 'Donasi Saya',
      donationHistory: 'Riwayat Donasi',
      totalDonated: 'Total Donasi',
      totalProjects: 'Total Project',
      donationDetails: 'Detail Donasi',
      paymentMethod: 'Metode Pembayaran',
      transactionId: 'ID Transaksi',
      donationDate: 'Tanggal Donasi',
      projectSupported: 'Project yang Didukung',
    },

    // ===== 23. MY JOIN REQUESTS =====
    myJoinRequests: {
      myJoinRequests: 'Join Request Saya',
      requestHistory: 'Riwayat Request',
      viewProject: 'Lihat Project',
      requestDate: 'Tanggal Request',
      responseDate: 'Tanggal Respon',
      statusMessage: 'Status',
    },

    // ===== 24. FORM VALIDATION =====
    validation: {
      required: 'Field ini wajib diisi',
      invalidEmail: 'Email tidak valid',
      minLength: 'Minimal {min} karakter',
      maxLength: 'Maksimal {max} karakter',
      passwordMismatch: 'Password tidak cocok',
      invalidPhone: 'Nomor telepon tidak valid',
      invalidUrl: 'URL tidak valid',
      minAmount: 'Minimal Rp {min}',
      maxAmount: 'Maksimal Rp {max}',
    },

    // ===== 25. ALUMNI STORY =====
    alumniStory: {
      alumniStory: 'Kisah Alumni',
      readMore: 'Baca Selengkapnya',
      shareStory: 'Bagikan Kisah',
      relatedStories: 'Kisah Terkait',
      backToStories: 'Kembali ke Kisah',
    },

    // ===== 26. EVENT =====
    event: {
      eventDetails: 'Detail Event',
      registerNow: 'Daftar Sekarang',
      eventDate: 'Tanggal Event',
      eventTime: 'Waktu Event',
      eventLocation: 'Lokasi Event',
      capacity: 'Kapasitas',
      registered: 'Terdaftar',
      spotsLeft: 'Sisa Kuota',
      organizerInfo: 'Info Penyelenggara',
      eventDescription: 'Deskripsi Event',
      registrationClosed: 'Pendaftaran Ditutup',
      eventFull: 'Event Penuh',
    },

    // ===== 27. MARITAL & EMPLOYMENT STATUS =====
    maritalStatus: {
      single: 'Single',
      married: 'Menikah',
      divorced: 'Cerai',
    },

    employmentStatus: {
      working: 'Bekerja',
      student: 'Mahasiswa',
      entrepreneur: 'Wirausaha',
      freelance: 'Freelance',
      unemployed: 'Tidak Bekerja',
    },

    // ===== 28. MESSAGE PAGE (Donatur Inbox) =====
    messagePage: {
      messages: 'Pesan',
      donationReport: 'Laporan Donasi',
      event: 'Event',
      personalMessages: 'Pesan Pribadi',
      announcements: 'Pengumuman',
      donationRefNumber: 'Nomor Referensi Donasi',
      copyRefNumber: 'Salin Nomor Referensi',
      totalYourDonations: 'Total Donasi Anda',
      projects: 'Proyek',
      thankYou: 'Terima Kasih',
      success: 'Berhasil',
      inVerification: 'Dalam Verifikasi',
      rejected: 'Ditolak',
      project: 'Proyek',
      donationAmount: 'Nominal Donasi',
      paymentMethod: 'Metode Pembayaran',
      transferTime: 'Waktu Transfer',
      donationInVerification: 'Donasi Anda Sedang Diverifikasi',
      verificationThankYou: 'Terima Kasih Telah Mengirim Bukti Transfer',
      verificationTime: 'Waktu Verifikasi',
      verificationEmail: 'Email Verifikasi',
      verificationApp: 'Aplikasi Verifikasi',
      donationRejected: 'Donasi Anda Ditolak',
      reuploadProof: 'Unggah Ulang Bukti Transfer',
      donationConfirmed: 'Donasi Anda Dikonfirmasi',
      donationConfirmedDesc: 'Donasi Anda telah dikonfirmasi dan akan diproses.',
      eventRegistrations: 'Pendaftaran Event',
      noEventRegistrations: 'Tidak Ada Pendaftaran Event',
      noEventRegistrationsDesc: 'Anda belum mendaftar untuk event apapun.',
      waitingConfirmation: 'Menunggu Konfirmasi',
      registeredStatus: 'Status Terdaftar',
      rejectedStatus: 'Status Ditolak',
      date: 'Tanggal',
      time: 'Waktu',
      location: 'Lokasi',
      participantQuota: 'Kuota Peserta',
      persons: 'Orang',
      spotsRemaining: 'Sisa Kuota',
    },

    // ===== 29. NOTIFICATION CENTER =====
    notifCenter: {
      notifications: 'Notifikasi',
      unreadNotifications: 'Notifikasi Belum Dibaca',
      allRead: 'Semua Dibaca',
      readAll: 'Tandai Semua Dibaca',
      deleteAll: 'Hapus Semua',
      allReadTitle: 'Semua Notifikasi Dibaca',
      noNotifications: 'Tidak Ada Notifikasi',
      allReadDesc: 'Anda telah membaca semua notifikasi.',
      noCategoryNotif: 'Tidak Ada Notifikasi Dalam Kategori Ini',
      newBadge: 'Baru',
      viewDonationHistory: 'Lihat Riwayat Donasi',
      viewJoinRequestStatus: 'Lihat Status Join Request',
      viewEventDetail: 'Lihat Detail Event',
      viewTaskInMessages: 'Lihat Tugas di Pesan',
      viewInProjectDetail: 'Lihat di Detail Proyek',
      summary: 'Ringkasan',
      total: 'Total',
      unread: 'Belum Dibaca',
      read: 'Dibaca',
      deleteAllConfirm: 'Anda yakin ingin menghapus semua notifikasi?',
      cannotUndo: 'Tindakan ini tidak dapat diurungkan.',
      // Filter labels
      filterAll: 'Semua',
      filterUnread: 'Belum Dibaca',
      filterDonation: 'Donasi',
      filterJoin: 'Join Request',
      filterEvent: 'Event',
      filterTask: 'Tugas',
      filterUpdate: 'Update',
      filterProject: 'Proyek',
      // Notification type labels
      donationApproved: 'Donasi Disetujui',
      donationRejected: 'Donasi Ditolak',
      joinApproved: 'Join Request Disetujui',
      joinRejected: 'Join Request Ditolak',
      projectUpdate: 'Update Proyek',
      newTask: 'Tugas Baru',
      taskCompleted: 'Tugas Selesai',
      withdrawalApproved: 'Penarikan Disetujui',
      withdrawalRejected: 'Penarikan Ditolak',
      contentRemoved: 'Konten Dihapus',
      eventRegistration: 'Pendaftaran Event',
      eventApproved: 'Event Disetujui',
      eventRejected: 'Event Ditolak',
      eventReminder: 'Pengingat Event',
      eventCancelled: 'Event Dibatalkan',
      projectClosed: 'Proyek Ditutup',
      closureApproved: 'Penutupan Disetujui',
      closureRejected: 'Penutupan Ditolak',
      alumniVerified: 'Alumni Terverifikasi',
      defaultNotification: 'Notifikasi Default',
      // Time
      justNow: 'Baru saja',
      minutesAgo: 'menit yang lalu',
      hoursAgo: 'jam yang lalu',
      daysAgo: 'hari yang lalu',
    },

    // ===== 30. MY DONATIONS PAGE =====
    myDonationsPage: {
      myDonations: 'Donasi Saya',
      trackStatus: 'Lacak Status',
      totalDonations: 'Total Donasi',
      waiting: 'Menunggu',
      approved: 'Disetujui',
      totalDistributed: 'Total Terdistribusi',
      searchPlaceholder: 'Cari donasi...',
      all: 'Semua',
      pending: 'Menunggu',
      approvedFilter: 'Disetujui',
      rejectedFilter: 'Ditolak',
      noDonationsFound: 'Tidak ada donasi ditemukan',
      tryDifferentSearch: 'Coba pencarian yang berbeda',
      noDonationsYet: 'Belum ada donasi',
      nominal: 'Nominal',
      date: 'Tanggal',
      method: 'Metode',
      donationRejected: 'Donasi Ditolak',
      clickReupload: 'Klik untuk mengunggah ulang',
      verifiedOn: 'Diverifikasi pada',
      by: 'oleh',
      detail: 'Detail',
      reupload: 'Unggah Ulang',
      reuploadTitle: 'Unggah Ulang Bukti Transfer',
      previousRejectionReason: 'Alasan Penolakan Sebelumnya',
      reuploadGuide: 'Panduan Unggah Ulang Bukti Transfer',
      guideItem1: 'Pastikan gambar jelas dan terlihat dengan baik.',
      guideItem2: 'Bukti transfer harus mencakup detail transaksi seperti nomor referensi, jumlah, dan tanggal.',
      guideItem3: 'Jika Anda menggunakan metode pembayaran lain, pastikan semua detail transaksi tercantum.',
      guideItem4: 'Klik "Unggah" untuk mengunggah gambar.',
      newProofTransfer: 'Bukti Transfer Baru',
      clickToUpload: 'Klik untuk mengunggah',
      clickToChange: 'Klik untuk mengubah',
      fileSelected: 'File dipilih',
      successSent: 'Berhasil Dikirim',
      successSentDesc: 'Bukti transfer Anda telah dikirim.',
      close: 'Tutup',
      cancel: 'Batal',
      sending: 'Mengirim...',
      resend: 'Kirim Ulang',
      // Bottom nav
      home: 'Home',
      explore: 'Explore',
      messages: 'Pesan',
      settings: 'Settings',
    },

    // ===== 31. MY JOIN REQUESTS PAGE =====
    myJoinRequestsPage: {
      joinRequests: 'Join Request Saya',
      trackJoinStatus: 'Lacak Status Join',
      totalRequests: 'Total Request',
      waiting: 'Menunggu',
      accepted: 'Diterima',
      rejected: 'Ditolak',
      searchPlaceholder: 'Cari request...',
      all: 'Semua',
      pendingFilter: 'Menunggu',
      acceptedFilter: 'Diterima',
      rejectedFilter: 'Ditolak',
      noRequests: 'Tidak Ada Request',
      noRequestsDesc: 'Anda belum mengirim request join apapun.',
      exploreProject: 'Explore Project',
      submittedAgo: 'Dikirim {time} yang lalu',
      commitment: 'Komitmen',
      date: 'Tanggal',
      reasonToJoin: 'Alasan Join',
      rejectionReason: 'Alasan Penolakan',
      canResubmit: 'Anda dapat mengirim ulang request join.',
      congratsAccepted: 'Selamat! Request join Anda diterima.',
      approvedOn: 'Diterima pada',
      picReviewing: 'PIC sedang meninjau request Anda.',
      viewProject: 'Lihat Project',
      cancelRequest: 'Batalkan Request',
      cancelConfirm: 'Anda yakin ingin membatalkan request join ini?',
      cancelSuccess: 'Request join berhasil dibatalkan.',
      resubmit: 'Kirim Ulang',
      back: 'Kembali',
      // Time
      today: 'Hari ini',
      yesterday: 'Kemarin',
      daysAgo: 'hari yang lalu',
      weeksAgo: 'minggu yang lalu',
      monthsAgo: 'bulan yang lalu',
      // Bottom nav
      home: 'Home',
      explore: 'Explore',
      messages: 'Pesan',
      settings: 'Settings',
    },
  },

  en: {
    // ===== 1. NAVIGATION & MENU =====
    nav: {
      home: 'Home',
      explore: 'Explore',
      messages: 'Messages',
      settings: 'Settings',
      logout: 'Logout',
      campaign: 'Campaign',
      adminPanel: 'Admin Panel',
    },

    // ===== 2. TABS =====
    tabs: {
      openVolunteer: 'Open Volunteer',
      projectGallery: 'Project Gallery',
      campaign: 'Campaign',
      overview: 'Overview',
      progress: 'Progress',
      members: 'Members',
      discussion: 'Discussion',
      wallet: 'Wallet',
    },

    // ===== 3. HERO SECTION =====
    hero: {
      title: 'Fighting Together For Al Aqsa',
      description: 'Together with hundreds of Saladin Camp alumni, let\'s reaffirm our commitment to the struggle. This is not just solidarity, this is a historical commitment. It\'s time to unite our strength, close ranks, and bring real contributions to one great goal: the liberation of',
      aqsaBaitulMaqdis: 'Al-Aqsa Mosque and Baitul Maqdis',
      exploreProjectBtn: 'Explore Project',
    },

    // ===== 4. CATEGORIES =====
    categories: {
      all: 'All',
      education: 'Education',
      environment: 'Environment',
      health: 'Health',
    },

    // ===== 5. HOME SECTIONS =====
    home: {
      featuredProjects: 'Featured Projects',
      exploreProjects: 'Explore Projects',
      educationProjects: 'Education Projects',
      environmentProjects: 'Environment Projects',
      healthProjects: 'Health Projects',
      inspiringStories: 'Inspiring Stories',
      inspiringStoriesDesc: 'Real stories of alumni dedicated to Baitul Maqdis and Palestine!',
      yourProjects: 'Your Favorite Projects',
      upcomingEvents: 'Upcoming Events',
      viewAll: 'View All',
      viewProject: 'View Project',
      login: 'Login',
      searchPlaceholder: 'Search projects...',
    },

    // ===== 6. PROJECT DETAIL =====
    projectDetail: {
      category: 'Category',
      location: 'Location',
      duration: 'Duration',
      target: 'Target',
      collected: 'Collected',
      deadline: 'Deadline',
      status: 'Status',
      joinProject: 'Join Project',
      donateNow: 'Donate Now',
      shareProject: 'Share Project',
      save: 'Save',
      description: 'Description',
      projectInfo: 'Project Info',
      requirements: 'Requirements',
      benefits: 'Benefits',
    },

    // ===== 7. PROJECT STATUS =====
    status: {
      active: 'Active',
      completed: 'Completed',
      closed: 'Closed',
      pending: 'Pending',
      approved: 'Approved',
      rejected: 'Rejected',
      draft: 'Draft',
      published: 'Published',
      new: 'New',
      popular: 'Popular',
      trending: 'Trending',
    },

    // ===== 8. MEMBERS SECTION =====
    members: {
      teamMembers: 'Team Members',
      pic: 'PIC (Person In Charge)',
      totalMembers: 'Total Members',
      viewAll: 'View All',
      joinDate: 'Join Date',
      role: 'Role',
    },

    // ===== 9. DISCUSSION SECTION =====
    discussion: {
      discussion: 'Discussion',
      writeComment: 'Write a comment...',
      send: 'Send',
      reply: 'Reply',
      edit: 'Edit',
      delete: 'Delete',
      noComments: 'No comments yet',
      loadMore: 'Load More',
    },

    // ===== 10. WALLET SECTION =====
    wallet: {
      projectBalance: 'Project Balance',
      totalDonations: 'Total Donations',
      totalWithdrawals: 'Total Withdrawals',
      transactionHistory: 'Transaction History',
      withdrawFunds: 'Withdraw Funds',
      date: 'Date',
      type: 'Type',
      amount: 'Amount',
      description: 'Description',
      noTransactions: 'No transactions yet',
    },

    // ===== 11. DONATION PAGE =====
    donation: {
      donateToProject: 'Donate to Project',
      donationAmount: 'Donation Amount',
      selectPaymentMethod: 'Select Payment Method',
      bankTransfer: 'Bank Transfer',
      eWallet: 'E-Wallet',
      creditCard: 'Credit Card',
      messageForPic: 'Message for PIC (Optional)',
      donateAnonymous: 'Donate as Anonymous',
      continuePayment: 'Continue Payment',
      back: 'Back',
      enterAmount: 'Enter amount',
      quickAmounts: 'Quick Amounts',
    },

    // ===== 12. MESSAGES =====
    messages: {
      messages: 'Messages',
      searchConversations: 'Search conversations...',
      typeMessage: 'Type a message...',
      online: 'Online',
      lastActive: 'Last active',
      read: 'Read',
      sent: 'Sent',
      delivered: 'Delivered',
      noMessages: 'No messages yet',
      startConversation: 'Start a conversation',
    },

    // ===== 13. SETTINGS =====
    settings: {
      settings: 'Settings',
      alumniProfile: 'Alumni Profile',
      account: 'Account',
      accountSecurity: 'Account Security',
      notifications: 'Notifications',
      privacy: 'Privacy',
      preferences: 'Preferences',
      helpSupport: 'Help & Support',
      about: 'About',
      
      personalInfo: 'Personal Information',
      alumniData: 'Alumni Data',
      editProfile: 'Edit Profile',
      fullName: 'Full Name',
      nickname: 'Nickname',
      email: 'Email',
      phoneNumber: 'Phone Number',
      bio: 'Bio',
      major: 'Major',
      saladinCampBatch: 'Saladin Camp Batch',
      currentStatus: 'Current Status',
      company: 'Company',
      domicile: 'Domicile',
      maritalStatus: 'Marital Status',
      employmentStatus: 'Employment Status',
      skills: 'Skills',
      learning: 'Currently Learning',
      
      changePassword: 'Change Password',
      oldPassword: 'Old Password',
      newPassword: 'New Password',
      confirmPassword: 'Confirm Password',
      emailVerification: 'Email Verification',
      verified: 'Verified',
      notVerified: 'Not Verified',
      resend: 'Resend',
      twoFactor: 'Two-Factor Authentication',
      
      pushNotifications: 'Push Notifications',
      emailNotifications: 'Email Notifications',
      inAppNotifications: 'In-app notifications',
      notificationCategories: 'Notification Categories',
      projectUpdates: 'Updates on projects I follow',
      newVote: 'New vote created',
      mentions: 'Someone mentioned me',
      newDiscussion: 'New discussion in my projects',
      adminAnnouncements: 'Admin announcements',
      
      profileVisibility: 'Profile Visibility',
      public: 'Public',
      alumniOnly: 'Alumni Only',
      private: 'Private',
      contactVisibleTo: 'Contact visible to',
      allowMentionsFrom: 'Allow mentions from',
      showOnlineStatus: 'Show online status',
      everyone: 'Everyone',
      
      language: 'Language',
      theme: 'Theme',
      timezone: 'Timezone',
      
      helpCenter: 'Help Center',
      contactUs: 'Contact Us',
      reportBug: 'Report a Bug',
      faq: 'FAQ',
      
      aboutApp: 'About Application',
      termsConditions: 'Terms & Conditions',
      privacyPolicy: 'Privacy Policy',
      appVersion: 'App Version',
      
      save: 'Save',
      cancel: 'Cancel',
      logout: 'Logout',
      editProfileBtn: 'Edit Profile',
    },

    // ===== 14. NOTIFICATIONS =====
    notifications: {
      notifications: 'Notifications',
      markAllRead: 'Mark All as Read',
      clearAll: 'Clear All',
      newNotifications: 'New Notifications',
      earlier: 'Earlier',
      noNotifications: 'No notifications',
      
      donationSuccess: 'Donation Successfully Sent',
      joinRequestApproved: 'Join Request Approved',
      joinRequestRejected: 'Join Request Rejected',
      projectUpdate: 'Project Progress Update',
      newVoteAvailable: 'New Vote Available',
      mentionInDiscussion: 'Mentioned in Discussion',
      withdrawalApproved: 'Withdrawal Approved',
      newMember: 'New Member Joined',
      projectCompleted: 'Project Completed',
    },

    // ===== 15. CAMPAIGN =====
    campaign: {
      campaignDashboard: 'Campaign Dashboard',
      createNewCampaign: 'Create New Campaign',
      activeCampaigns: 'Active Campaigns',
      completedCampaigns: 'Completed Campaigns',
      fundingGoal: 'Funding Goal',
      collected: 'Collected',
      numberOfDonors: 'Number of Donors',
      timeRemaining: 'Time Remaining',
      campaignDescription: 'Campaign Description',
      campaignUpdates: 'Campaign Updates',
      donorList: 'Donor List',
      editCampaign: 'Edit Campaign',
      deleteCampaign: 'Delete Campaign',
      shareCampaign: 'Share Campaign',
    },

    // ===== 16. ADMIN PANEL =====
    admin: {
      adminDashboard: 'Admin Dashboard',
      statistics: 'Statistics',
      totalProjects: 'Total Projects',
      totalDonations: 'Total Donations',
      totalAlumni: 'Total Alumni',
      totalDonors: 'Total Donors',
      manageProjects: 'Manage Projects',
      manageUsers: 'Manage Users',
      manageDonations: 'Manage Donations',
      manageWithdrawals: 'Manage Withdrawals',
      manageJoinRequests: 'Manage Join Requests',
      approve: 'Approve',
      reject: 'Reject',
      edit: 'Edit',
      delete: 'Delete',
      viewDetails: 'View Details',
      actions: 'Actions',
    },

    // ===== 17. TIME & DATE =====
    time: {
      justNow: 'Just now',
      minuteAgo: '1 minute ago',
      minutesAgo: 'minutes ago',
      hourAgo: '1 hour ago',
      hoursAgo: 'hours ago',
      dayAgo: '1 day ago',
      daysAgo: 'days ago',
      weekAgo: '1 week ago',
      weeksAgo: 'weeks ago',
      monthAgo: '1 month ago',
      monthsAgo: 'months ago',
      today: 'Today',
      yesterday: 'Yesterday',
      tomorrow: 'Tomorrow',
    },

    // ===== 18. COMMON ACTIONS =====
    common: {
      save: 'Save',
      cancel: 'Cancel',
      delete: 'Delete',
      edit: 'Edit',
      view: 'View',
      close: 'Close',
      back: 'Back',
      next: 'Next',
      previous: 'Previous',
      submit: 'Submit',
      confirm: 'Confirm',
      loading: 'Loading...',
      search: 'Search',
      filter: 'Filter',
      sort: 'Sort',
      reset: 'Reset',
      apply: 'Apply',
      clear: 'Clear',
      yes: 'Yes',
      no: 'No',
      ok: 'OK',
    },

    // ===== 19. TOAST MESSAGES =====
    toast: {
      saveSuccess: 'Successfully saved!',
      donationSuccess: 'Donation sent successfully!',
      joinRequestSuccess: 'Join request sent successfully!',
      profileUpdateSuccess: 'Profile updated successfully!',
      passwordChangeSuccess: 'Password changed successfully!',
      withdrawalSuccess: 'Withdrawal successful!',
      
      error: 'An error occurred!',
      donationFailed: 'Failed to send donation!',
      passwordMismatch: 'Passwords don\'t match!',
      requiredField: 'This field is required',
      invalidEmail: 'Invalid email',
      fileTooLarge: 'File too large (max 5MB)',
      
      areYouSure: 'Are you sure?',
      deleteConfirm: 'Data will be permanently deleted',
      yesDelete: 'Yes, Delete',
      noCancel: 'No, Cancel',
      yesLogout: 'Yes, Logout',
    },

    // ===== 20. EMPTY STATES =====
    empty: {
      noProjects: 'No projects found',
      noNotifications: 'No notifications',
      noMessages: 'No messages',
      noDonations: 'No donations yet',
      noCampaigns: 'No campaigns yet',
      noMembers: 'No members yet',
      noTransactions: 'No transactions yet',
      noResults: 'No results',
      noData: 'No data',
    },

    // ===== 21. EXPLORE PAGE =====
    explore: {
      explore: 'Explore',
      filterBy: 'Filter by',
      sortBy: 'Sort by',
      latest: 'Latest',
      mostPopular: 'Most Popular',
      nearestDeadline: 'Nearest Deadline',
      showing: 'Showing',
      results: 'results',
      categoryFilter: 'Category Filter',
    },

    // ===== 22. MY DONATIONS =====
    myDonations: {
      myDonations: 'My Donations',
      donationHistory: 'Donation History',
      totalDonated: 'Total Donated',
      totalProjects: 'Total Projects',
      donationDetails: 'Donation Details',
      paymentMethod: 'Payment Method',
      transactionId: 'Transaction ID',
      donationDate: 'Donation Date',
      projectSupported: 'Project Supported',
    },

    // ===== 23. MY JOIN REQUESTS =====
    myJoinRequests: {
      myJoinRequests: 'My Join Requests',
      requestHistory: 'Request History',
      viewProject: 'View Project',
      requestDate: 'Request Date',
      responseDate: 'Response Date',
      statusMessage: 'Status',
    },

    // ===== 24. FORM VALIDATION =====
    validation: {
      required: 'This field is required',
      invalidEmail: 'Invalid email',
      minLength: 'Minimum {min} characters',
      maxLength: 'Maximum {max} characters',
      passwordMismatch: 'Passwords don\'t match',
      invalidPhone: 'Invalid phone number',
      invalidUrl: 'Invalid URL',
      minAmount: 'Minimum IDR {min}',
      maxAmount: 'Maximum IDR {max}',
    },

    // ===== 25. ALUMNI STORY =====
    alumniStory: {
      alumniStory: 'Alumni Story',
      readMore: 'Read More',
      shareStory: 'Share Story',
      relatedStories: 'Related Stories',
      backToStories: 'Back to Stories',
    },

    // ===== 26. EVENT =====
    event: {
      eventDetails: 'Event Details',
      registerNow: 'Register Now',
      eventDate: 'Event Date',
      eventTime: 'Event Time',
      eventLocation: 'Event Location',
      capacity: 'Capacity',
      registered: 'Registered',
      spotsLeft: 'Spots Left',
      organizerInfo: 'Organizer Info',
      eventDescription: 'Event Description',
      registrationClosed: 'Registration Closed',
      eventFull: 'Event Full',
    },

    // ===== 27. MARITAL & EMPLOYMENT STATUS =====
    maritalStatus: {
      single: 'Single',
      married: 'Married',
      divorced: 'Divorced',
    },

    employmentStatus: {
      working: 'Working',
      student: 'Student',
      entrepreneur: 'Entrepreneur',
      freelance: 'Freelance',
      unemployed: 'Unemployed',
    },

    // ===== 28. MESSAGE PAGE (Donatur Inbox) =====
    messagePage: {
      messages: 'Messages',
      donationReport: 'Donation Report',
      event: 'Event',
      personalMessages: 'Personal Messages',
      announcements: 'Announcements',
      donationRefNumber: 'Donation Reference Number',
      copyRefNumber: 'Copy Reference Number',
      totalYourDonations: 'Total Your Donations',
      projects: 'Projects',
      thankYou: 'Thank You',
      success: 'Success',
      inVerification: 'In Verification',
      rejected: 'Rejected',
      project: 'Project',
      donationAmount: 'Donation Amount',
      paymentMethod: 'Payment Method',
      transferTime: 'Transfer Time',
      donationInVerification: 'Donation in Verification',
      verificationThankYou: 'Thank you for sending the transfer proof',
      verificationTime: 'Verification Time',
      verificationEmail: 'Verification Email',
      verificationApp: 'Verification App',
      donationRejected: 'Donation Rejected',
      reuploadProof: 'Reupload Proof',
      donationConfirmed: 'Donation Confirmed',
      donationConfirmedDesc: 'Your donation has been confirmed and will be processed.',
      eventRegistrations: 'Event Registrations',
      noEventRegistrations: 'No Event Registrations',
      noEventRegistrationsDesc: 'You have not registered for any events.',
      waitingConfirmation: 'Waiting Confirmation',
      registeredStatus: 'Registered Status',
      rejectedStatus: 'Rejected Status',
      date: 'Date',
      time: 'Time',
      location: 'Location',
      participantQuota: 'Participant Quota',
      persons: 'Persons',
      spotsRemaining: 'Spots Remaining',
    },

    // ===== 29. NOTIFICATION CENTER =====
    notifCenter: {
      notifications: 'Notifications',
      unreadNotifications: 'Unread Notifications',
      allRead: 'All Read',
      readAll: 'Mark All as Read',
      deleteAll: 'Delete All',
      allReadTitle: 'All Notifications Read',
      noNotifications: 'No Notifications',
      allReadDesc: 'You have read all notifications.',
      noCategoryNotif: 'No Notifications in This Category',
      newBadge: 'New',
      viewDonationHistory: 'View Donation History',
      viewJoinRequestStatus: 'View Join Request Status',
      viewEventDetail: 'View Event Detail',
      viewTaskInMessages: 'View Task in Messages',
      viewInProjectDetail: 'View in Project Detail',
      summary: 'Summary',
      total: 'Total',
      unread: 'Unread',
      read: 'Read',
      deleteAllConfirm: 'Are you sure you want to delete all notifications?',
      cannotUndo: 'This action cannot be undone.',
      // Filter labels
      filterAll: 'All',
      filterUnread: 'Unread',
      filterDonation: 'Donation',
      filterJoin: 'Join Request',
      filterEvent: 'Event',
      filterTask: 'Task',
      filterUpdate: 'Update',
      filterProject: 'Project',
      // Notification type labels
      donationApproved: 'Donation Approved',
      donationRejected: 'Donation Rejected',
      joinApproved: 'Join Request Approved',
      joinRejected: 'Join Request Rejected',
      projectUpdate: 'Project Update',
      newTask: 'New Task',
      taskCompleted: 'Task Completed',
      withdrawalApproved: 'Withdrawal Approved',
      withdrawalRejected: 'Withdrawal Rejected',
      contentRemoved: 'Content Removed',
      eventRegistration: 'Event Registration',
      eventApproved: 'Event Approved',
      eventRejected: 'Event Rejected',
      eventReminder: 'Event Reminder',
      eventCancelled: 'Event Cancelled',
      projectClosed: 'Project Closed',
      closureApproved: 'Closure Approved',
      closureRejected: 'Closure Rejected',
      alumniVerified: 'Alumni Verified',
      defaultNotification: 'Default Notification',
      // Time
      justNow: 'Just now',
      minutesAgo: 'minutes ago',
      hoursAgo: 'hours ago',
      daysAgo: 'days ago',
    },

    // ===== 30. MY DONATIONS PAGE =====
    myDonationsPage: {
      myDonations: 'My Donations',
      trackStatus: 'Track Status',
      totalDonations: 'Total Donations',
      waiting: 'Waiting',
      approved: 'Approved',
      totalDistributed: 'Total Distributed',
      searchPlaceholder: 'Search donations...',
      all: 'All',
      pending: 'Pending',
      approvedFilter: 'Approved',
      rejectedFilter: 'Rejected',
      noDonationsFound: 'No donations found',
      tryDifferentSearch: 'Try a different search',
      noDonationsYet: 'No donations yet',
      nominal: 'Nominal',
      date: 'Date',
      method: 'Method',
      donationRejected: 'Donation Rejected',
      clickReupload: 'Click to reupload',
      verifiedOn: 'Verified on',
      by: 'by',
      detail: 'Detail',
      reupload: 'Reupload',
      reuploadTitle: 'Reupload Transfer Proof',
      previousRejectionReason: 'Previous Rejection Reason',
      reuploadGuide: 'Reupload Transfer Proof Guide',
      guideItem1: 'Ensure the image is clear and visible.',
      guideItem2: 'The transfer proof must include transaction details such as reference number, amount, and date.',
      guideItem3: 'If you are using a different payment method, ensure all transaction details are included.',
      guideItem4: 'Click "Upload" to upload the image.',
      newProofTransfer: 'New Transfer Proof',
      clickToUpload: 'Click to upload',
      clickToChange: 'Click to change',
      fileSelected: 'File selected',
      successSent: 'Successfully Sent',
      successSentDesc: 'Your transfer proof has been sent.',
      close: 'Close',
      cancel: 'Cancel',
      sending: 'Sending...',
      resend: 'Resend',
      // Bottom nav
      home: 'Home',
      explore: 'Explore',
      messages: 'Messages',
      settings: 'Settings',
    },

    // ===== 31. MY JOIN REQUESTS PAGE =====
    myJoinRequestsPage: {
      joinRequests: 'My Join Requests',
      trackJoinStatus: 'Track Join Status',
      totalRequests: 'Total Requests',
      waiting: 'Waiting',
      accepted: 'Accepted',
      rejected: 'Rejected',
      searchPlaceholder: 'Search requests...',
      all: 'All',
      pendingFilter: 'Pending',
      acceptedFilter: 'Accepted',
      rejectedFilter: 'Rejected',
      noRequests: 'No Requests',
      noRequestsDesc: 'You have not sent any join requests.',
      exploreProject: 'Explore Project',
      submittedAgo: 'Submitted {time} ago',
      commitment: 'Commitment',
      date: 'Date',
      reasonToJoin: 'Reason to Join',
      rejectionReason: 'Rejection Reason',
      canResubmit: 'You can resubmit the join request.',
      congratsAccepted: 'Congratulations! Your join request has been accepted.',
      approvedOn: 'Approved on',
      picReviewing: 'PIC is reviewing your request.',
      viewProject: 'View Project',
      cancelRequest: 'Cancel Request',
      cancelConfirm: 'Are you sure you want to cancel this join request?',
      cancelSuccess: 'Join request successfully cancelled.',
      resubmit: 'Resubmit',
      back: 'Back',
      // Time
      today: 'Today',
      yesterday: 'Yesterday',
      daysAgo: 'days ago',
      weeksAgo: 'weeks ago',
      monthsAgo: 'months ago',
      // Bottom nav
      home: 'Home',
      explore: 'Explore',
      messages: 'Messages',
      settings: 'Settings',
    },
  },
};

// Helper function to get translation
export function getTranslation(language: Language): Translations {
  return translations[language];
}

// Helper function to format relative time
export function formatRelativeTime(date: Date, language: Language): string {
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const weeks = Math.floor(days / 7);
  const months = Math.floor(days / 30);

  const t = translations[language].time;

  if (seconds < 60) return t.justNow;
  if (minutes === 1) return t.minuteAgo;
  if (minutes < 60) return `${minutes} ${t.minutesAgo}`;
  if (hours === 1) return t.hourAgo;
  if (hours < 24) return `${hours} ${t.hoursAgo}`;
  if (days === 1) return t.dayAgo;
  if (days < 7) return `${days} ${t.daysAgo}`;
  if (weeks === 1) return t.weekAgo;
  if (weeks < 4) return `${weeks} ${t.weeksAgo}`;
  if (months === 1) return t.monthAgo;
  return `${months} ${t.monthsAgo}`;
}

// Helper function to format currency
export function formatCurrency(amount: number, language: Language): string {
  if (language === 'id') {
    return `Rp ${amount.toLocaleString('id-ID')}`;
  } else {
    return `IDR ${amount.toLocaleString('en-US')}`;
  }
}

// Helper function to format date
export function formatDate(date: Date, language: Language): string {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  
  if (language === 'id') {
    return date.toLocaleDateString('id-ID', options);
  } else {
    return date.toLocaleDateString('en-US', options);
  }
}