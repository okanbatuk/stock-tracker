export const RES_MSG = {
  /* Success Messages */
  REGISTERED: () => "Tebrikler! Başarıyla kaydoldunuz.",
  LOGIN: () => "Başarıyla giriş yaptınız.",
  LOGOUT: () => "Başarıyla çıkış yaptınız.",
  UPDATED: () => "Başarıyla güncelleme yaptınız.",
  UPDATED_W: (entity: string = "Kaynak") => `${entity} başarıyla güncellendi`,
  DELETED: (entity: string = "Kaynak") => `${entity} başarıyla silindi`,
  ALL: (entity: string = "Kaynak") => `Tüm ${entity} başarıyla getirildi`,
  FOUND: (entity: string = "Kaynak") => `${entity} başarıyla bulundu.`,

  /* Error Messages */
  NOT_FOUND: (entity: string = "Kaynak") => `${entity} bulunamadı`,
  NO_TOKEN: () => "",
  DUPLICATE: (field: string = "Alan") => `${field} zaten kullanımda`,
  INVALID: (field: string = "Alan") => `${field} geçersiz.`,
  INVALID_CRED: () => "E-posta veya şifre yanlış.",
  INCORRECT: () => "Mevcut şifre yanlış.",
  SERVER: () => "Bir şeyler ters gitti.",
} as const;
