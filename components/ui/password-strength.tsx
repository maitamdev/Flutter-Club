'use client';
interface PasswordStrengthProps { password: string; }
export function PasswordStrength({ password }: PasswordStrengthProps) {
  const checks = [/.{8,}/, /[A-Z]/, /[a-z]/, /\d/, /[^A-Za-z0-9]/];
  const score = checks.filter(r => r.test(password)).length;
  const labels = ['Very weak','Weak','Fair','Strong','Very strong'];
  const colors = ['bg-red-500','bg-orange-500','bg-yellow-500','bg-blue-500','bg-green-500'];
  return (<div className='space-y-1'>
    <div className='flex gap-1'>{Array.from({length:5},(_,i) => <div key={i} className={`h-1.5 flex-1 rounded ${i<score?colors[score-1]:'bg-gray-200'}`}/>)}</div>
    <p className='text-xs text-gray-500'>{password ? labels[score-1]||labels[0] : ''}</p>
  </div>);
}
