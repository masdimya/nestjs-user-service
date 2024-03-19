import { z } from 'zod';

const UserSchema = z.object({
  id: z
    .string({
      required_error: 'Id is required',
    }),
  name: z
    .string({
      required_error: 'Name is required',
    })
    .trim()
    .min(3, 'Must be 5 or more characters long'),
  email: z
    .string({
      required_error: 'Email is required',
    })
    .trim()
    .min(1, 'Email cannot be empty')
    .email('Invalid email'),
  password: z
    .string({
      required_error: 'Password is required',
    })
    .trim()
    .min(8, 'Must be 8 or more characters long'),
  address: z
    .string({
      required_error: 'Address is required',
    }),
  phone: z
    .string({
      required_error: 'phone is required',
    })
  
});

export const userCreateValidation = UserSchema.omit({ id: true })
export type  userCreateDTO = z.infer<typeof userCreateValidation>;
