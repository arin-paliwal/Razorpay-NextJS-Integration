export function generateRandomValue(min=100, max=1000) {
  const randomNumber = Math.random();
  const scaledNumber = randomNumber * (max - min);
  const randomValue = scaledNumber + min;
  return Math.round(randomValue);
}