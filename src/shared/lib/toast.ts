'use client';

import toast from 'react-hot-toast';

export const notifySuccess = (message: string) => toast.success(message);

export const notifyDanger = (message: string) => toast.error(message);
