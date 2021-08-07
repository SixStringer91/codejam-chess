export function timeFormatHandle(timeInMinutes: number) {
  const seconds = timeInMinutes % 60;
  const minutes = (timeInMinutes / 60) % 60;
  return `${Math.trunc(minutes)}:${seconds < 10 ? `0${seconds}` : seconds}`;
}
