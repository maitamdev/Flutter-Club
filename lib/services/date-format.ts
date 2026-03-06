// Date formatting service for Vietnamese locale
export function formatVietnameseDate(date: Date): string {
  const day = date.getDate(); const month = date.getMonth() + 1; const year = date.getFullYear()
  return `${day} thang ${month}, ${year}`
}
export function formatVietnameseDateTime(date: Date): string {
  const hours = date.getHours().toString().padStart(2, '0')
  const minutes = date.getMinutes().toString().padStart(2, '0')
  return `${hours}:${minutes}, ${formatVietnameseDate(date)}`
}
export function getGreeting(): string {
  const hour = new Date().getHours()
  if (hour < 12) return 'Chao buoi sang'
  if (hour < 18) return 'Chao buoi chieu'
  return 'Chao buoi toi'
}
export function getDayOfWeekVN(date: Date): string {
  const days = ['Chu nhat', 'Thu 2', 'Thu 3', 'Thu 4', 'Thu 5', 'Thu 6', 'Thu 7']
  return days[date.getDay()]
}
