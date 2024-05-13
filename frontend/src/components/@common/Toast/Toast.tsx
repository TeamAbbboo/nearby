import { ReactNode } from 'react';
import { Flip, ToastOptions, toast } from 'react-toastify';
import './Toast.css';

const defaultToastOption: ToastOptions = {
  autoClose: 1000,
  hideProgressBar: false,
  pauseOnHover: false,
  closeButton: false,
  delay: 100,
  transition: Flip,
};

const Toast = {
  info: (message: ReactNode, options: ToastOptions = {}) => {
    toast.info(message, { ...defaultToastOption, icon: false, ...options });
  },
  success: (message: ReactNode, options: ToastOptions = {}) => {
    toast.success(message, { ...defaultToastOption, icon: false, ...options });
  },
  error: (message: ReactNode, options: ToastOptions = {}) => {
    toast.error(message, { ...defaultToastOption, icon: false, ...options });
  },
};

export default Toast;
