import { useState } from "react";


const useLocalstorage = (key: string, initialValue: string) => {
  const [value, setValue] = useState(() => {
    const jsonValue = localStorage.getItem(key);
    if (jsonValue != null) return JSON.parse(jsonValue);
    return initialValue;
  });

  const setLocalStorage = (newValue: string) => {
    setValue(newValue);
    localStorage.setItem(key, JSON.stringify(newValue));
  };

  return [value, setLocalStorage];
};

export default useLocalstorage;