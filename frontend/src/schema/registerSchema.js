import { getErrorMessage } from '@/lib/utils';
import { z } from 'zod';

export const registerSchema = z.object({
    userName: z.string().min(1, getErrorMessage()),
    email: z.string().min(1, getErrorMessage()),    
    password: z.string().min(3, getErrorMessage()),
});

export const defaultValues = {
    userName: '',
    email: '',
    password: '',
};