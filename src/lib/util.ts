export function checkNotNull<T>(check: T | null | undefined): T {
  if (check == null) {
    throw new Error();
  }
  return check;
}
