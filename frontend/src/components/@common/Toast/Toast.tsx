import { ReactNode } from 'react';
import { Flip, ToastOptions, toast } from 'react-toastify';
import './Toast.css';

const defaultToastOption: ToastOptions = {
  autoClose: 1500,
  hideProgressBar: false,
  pauseOnHover: false,
  closeButton: false,
  delay: 100,
  transition: Flip,
};

const Toast = {
  info: (message: ReactNode, options: ToastOptions = {}) => {
    toast.info(message, { ...defaultToastOption, icon: true, ...options });
  },
  success: (message: ReactNode, options: ToastOptions = {}) => {
    toast.success(message, { ...defaultToastOption, icon: true, ...options });
  },
  error: (message: ReactNode, options: ToastOptions = {}) => {
    toast.error(message, { ...defaultToastOption, icon: true, ...options });
  },
  default: (message: ReactNode, options: ToastOptions = {}) => {
    toast.default(message, { ...defaultToastOption, icon: true, ...options });
  },
};

export default Toast;
