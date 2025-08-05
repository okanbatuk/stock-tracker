export const VAL_MSG = {
  /* Validation Messages */
  MIN: (field: string = "Alan", minChar: number = 3) =>
    `${field} alanı en az ${minChar} karakter uzunluğunda olmalıdır.`,
  MAX: (field: string = "Alan", maxChar: number = 50) =>
    `${field} alanı en fazla ${maxChar} karakter uzunluğunda olabilir.`,
  EMAIL: () => "Lütfen geçerli bir e-posta adresi girin.",
  PASSWORD: (field: string = "Şifre") =>
    `${field} en az bir büyük harf, bir küçük harf ve bir rakam içermelidir.`,
  NO_MATCH: () => "Yeni şifre mevcut şifreyle aynı olamaz.",
  PASSWD_REQ: (field: string = "mevcut") =>
    `Şifrenizi güncellemek için ${field} şifrenizi girmeniz gerekir.`,
} as const;
