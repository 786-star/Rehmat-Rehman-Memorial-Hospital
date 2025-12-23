import { getErrorMessage } from '@/lib/utils';
import { z } from 'zod';

export const loginSchema = z.object({
  username: z.string().min(1, getErrorMessage()),
  password: z.string().min(1, getErrorMessage()),
});

export const defaultValues = {
  username: '',
  password: '',
};