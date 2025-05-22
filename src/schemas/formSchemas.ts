import * as z from 'zod';

export const step1Schema = z
    .object({
        firstName: z.string().min(1, 'First name is required'),
        lastName: z.string().min(1, 'Last name is required'),
        password: z
            .string()
            .min(6, 'Password must be at least 6 characters long'),
        confirmPassword: z.string(),
        interests: z
            .array(z.string())
            .nonempty('At least one interest is required')
            .max(2, 'You can select up to 2 interests'),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: 'Passwords must match',
        path: ['confirmPassword'],
    });

export const step2Schema = z.object({
    avatar: z.instanceof(File),
});
