export function generateOrderId(): string {
  const currentYear = new Date().getFullYear();
  const randomSuffix = Math.floor(1000 + Math.random() * 9000);
  return `F0-${currentYear}-${randomSuffix}`;
}
