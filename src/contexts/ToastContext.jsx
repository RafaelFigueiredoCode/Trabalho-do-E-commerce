// src/contexts/ToastContext.jsx
import { createContext, useContext, useRef } from "react";
import { Toast } from "primereact/toast";

const ToastContext = createContext();

export function ToastProvider({ children }) {
  const toastRef = useRef(null);

  function showToast({ severity = "info", summary = "", detail = "", life = 3000 }) {
    toastRef.current?.show({ severity, summary, detail, life });
  }

  return (
    <ToastContext.Provider value={{ showToast }}>
      <Toast ref={toastRef} position="top-right" />
      {children}
    </ToastContext.Provider>
  );
}

export function useToast() {
  return useContext(ToastContext);
}
