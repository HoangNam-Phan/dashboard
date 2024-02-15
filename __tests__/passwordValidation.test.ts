function isValidPassword(password: FormDataEntryValue | number | null): boolean {
  const passwordString = String(password);
  const letterRegex = /[a-zA-Z]/;
  const uppercaseRegex = /[A-Z]/;
  const numberRegex = /\d/;

  return (
    passwordString.length >= 8 &&
    numberRegex.test(passwordString) &&
    letterRegex.test(passwordString) &&
    uppercaseRegex.test(passwordString)
  );
}

describe('isValidPassword', () => {
  it('returns true for valid passwords', () => {
    expect(isValidPassword('ValidPass1')).toBe(true);
    expect(isValidPassword('AnotherV2')).toBe(true);
  });

  it('returns false for passwords shorter than 8 characters', () => {
    expect(isValidPassword('Short1')).toBe(false);
  });

  it('returns false for passwords without numbers', () => {
    expect(isValidPassword('NoNumbers')).toBe(false);
  });

  it('returns false for passwords without letters', () => {
    expect(isValidPassword('12345678')).toBe(false);
  });

  it('returns false for passwords without uppercase letters', () => {
    expect(isValidPassword('nouppercase1')).toBe(false);
  });

  it('handles null inputs gracefully', () => {
    expect(isValidPassword(null)).toBe(false);
  });

  it('handles non-string inputs that can be coerced to strings', () => {
    expect(isValidPassword(12345678)).toBe(false); 
    expect(isValidPassword('Valid123')).toBe(true);
  });
});