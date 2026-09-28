export async function verifyHoneypotInput(formData: FormData) {
  const niceInputValue = formData.get('dateUpdatedAt');

  const isBot =
    niceInputValue === null ||
    (typeof niceInputValue === 'string' && niceInputValue.trim() !== '');

  return isBot;
}
