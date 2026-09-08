import slugify from 'slugify';

export const slugFromText = (text: string) => {
  const slug = slugify(text, {
    lower: true,
    strict: true,
    trim: true,
  });
  return `${slug}-${Math.random().toString(36).substring(2, 8)}`;
};
