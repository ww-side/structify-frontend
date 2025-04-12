'use client';

import { addToast } from '@heroui/toast';

export { Toast, ToastProvider } from '@heroui/toast';

export const notifySuccess = (msg: string) =>
  addToast({ title: msg, color: 'success' });

export const notifyDanger = (msg: string) =>
  addToast({ title: msg, color: 'danger' });

export const notifyInfo = (msg: string) =>
  addToast({ title: msg, color: 'default' });