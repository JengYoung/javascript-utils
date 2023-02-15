export const GLOBAL_LOCALES = {
  'GMT/LON': 0,
  PAR: 1,
  'CAI/JRS': 2,
  JED: 3,
  THR: 3.5,
  DXB: 4,
  KBL: 4.5,
  KHI: 5,
  DEL: 5.5,
  DAC: 6,
  RGN: 6.5,
  BKK: 7,
  HKG: 8,
  SEL: 9,
  ADL: 9.5,
  SYD: 10,
  NOU: 11,
  WLG: 12,
} as const;

type LocaleKeys = keyof typeof GLOBAL_LOCALES;

export const getGlobalTime = (dateParam?: Date, locale?: LocaleKeys) => {
  const MILLI_SEC_PER_HOUR = 3600000;

  const nowDate = dateParam ?? new Date();

  const year = nowDate.getUTCFullYear();
  const month = nowDate.getUTCMonth();
  const date = nowDate.getUTCDate();
  const hours = nowDate.getUTCHours();
  const minutes = nowDate.getUTCMinutes();
  const seconds = nowDate.getUTCSeconds();
  const milliseconds = nowDate.getUTCMilliseconds();

  const utcTime = Date.UTC(
    year,
    month,
    date,
    hours,
    minutes,
    seconds,
    milliseconds,
  );

  return utcTime + MILLI_SEC_PER_HOUR * GLOBAL_LOCALES[locale as LocaleKeys];
};

// console.log(new Date(getGlobalTime(new Date(Date.now()), 'SEL')));
