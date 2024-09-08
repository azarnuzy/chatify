import { z } from 'zod';

export const ValidationSchemaRegister = z.object({
  username: z
    .string({
      required_error: 'Username should be filled'
    })
    .min(1, 'Username should be filled'),
  email: z
    .string({
      required_error: 'Email should be filled'
    })
    .email('Email should be valid'),
  password: z
    .string({
      required_error: 'Password should be filled'
    })
    .min(1, 'Password should be filled')
});

export const ValidationSchemaLogin = z.object({
  email: z
    .string({
      required_error: 'Email should be filled'
    })
    .email('Email should be valid'),
  password: z
    .string({
      required_error: 'Password should be filled'
    })
    .min(1, 'Password should be filled')
});
