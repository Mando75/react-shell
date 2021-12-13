export function useTestid(id: string) {
  if (process.env.NODE_ENV !== "test") return {};
  return { "data-testid": id };
}
