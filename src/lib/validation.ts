import { isUrlOrRelativePath } from '@/utils/is-url-or-relative-path';
import sanitizeHtml from 'sanitize-html';
import { z } from 'zod';

const PostBaseSchema = z.object({
  title: z
    .string()
    .trim()
    .min(3, 'Title must be at least 3 characters long')
    .max(120, 'Title must be a maximum of 120 characters'),
  content: z
    .string()
    .trim()
    .min(3, 'Content is required')
    .transform(val => sanitizeHtml(val)),
  author: z
    .string()
    .trim()
    .min(4, 'Author must be at least 4 characters long')
    .max(100, 'Author name must not exceed 100 characters'),
  excerpt: z
    .string()
    .trim()
    .min(3, 'Excerpt must be at least 3 characters long')
    .max(200, 'Excerpt must not exceed 200 characters'),
  coverImageUrl: z.string().trim().refine(isUrlOrRelativePath, {
    message: 'Cover URL must be a valid URL or image path',
  }),
  published: z
    .union([
      z.literal('on'),
      z.literal('true'),
      z.literal('false'),
      z.literal(true),
      z.literal(false),
      z.literal(null),
      z.literal(undefined),
    ])
    .default(false)
    .transform(val => val === 'on' || val === 'true' || val === true),
});
export const PostCreateSchema = PostBaseSchema;

export const PostUpdateSchema = PostBaseSchema.extend({});
