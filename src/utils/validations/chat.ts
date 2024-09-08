import { z } from 'zod';

export const ValidationSchemaChat = z.object({
  message: z
    .string({
      message: 'Message is required'
    })
    .min(1)
    .max(1000)
});

export const ValidationSchemaNewChat = z.object({
  name: z
    .string({
      message: 'Name is required'
    })
    .min(1, {
      message: 'Please choose a user'
    })
    .max(100)
});
