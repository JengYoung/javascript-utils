export const getLocalStorageItem = (key: string, defaultValue: any) => {
  if (!window) return defaultValue;

  try {
    const value = window.localStorage.getItem(key);

    return JSON.stringify(value) ?? defaultValue;
  } catch (e) {
    throw new Error(e as string);
  }
};

export const setLocalStorageItem = (key: string, value: any) => {
  if (!window) return;

  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    throw new Error(e as string);
  }
};
