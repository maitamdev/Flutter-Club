'use client';
interface MemberCardV2Props { name: string; role: string; avatar?: string; email?: string; status?: 'active'|'inactive'; }
export function MemberCardV2({ name, role, email, status='active' }: MemberCardV2Props) {
  return (<div className='p-4 border rounded-xl hover:shadow-md transition-shadow'>
    <div className='flex items-center gap-3'>
      <div className='w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-lg font-bold text-blue-600'>{name[0]}</div>
      <div><h4 className='font-semibold'>{name}</h4><p className='text-sm text-gray-500'>{role}</p>
        {email && <p className='text-xs text-gray-400'>{email}</p>}</div>
      <span className={`px-2 py-0.5 rounded-full text-xs ml-auto ${status==='active'?'bg-green-100 text-green-700':'bg-gray-100 text-gray-500'}`}>{status}</span>
    </div>
  </div>);
}
