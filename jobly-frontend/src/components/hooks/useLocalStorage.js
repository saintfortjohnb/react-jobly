import { useState } from 'react';

function useLocalStorage(key, initialValue) {

  const storedValue = localStorage.getItem(key);

  const initial = storedValue && storedValue !== "undefined" ? JSON.parse(storedValue) : initialValue;

  const [value, setValue] = useState(initial);

  const setStoredValue = (newValue) => {
    setValue(newValue);
    localStorage.setItem(key, JSON.stringify(newValue));
  };

  return [value, setStoredValue];
}

export default useLocalStorage;