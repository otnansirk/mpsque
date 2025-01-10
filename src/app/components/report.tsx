import { ArrowUpCircleIcon, ArrowDownCircleIcon } from '@heroicons/react/20/solid'
import { JSX } from 'react'

const icon: Record<string, JSX.Element> = {
    out: <ArrowUpCircleIcon className='w-8 h-8 text-red-400' />,
    in: <ArrowDownCircleIcon className='w-8 h-8 text-green-300' />,
}

const data = [
    {
        id: 'out1223',
        type: 'in',
        amount: '12.000.000',
        desc: 'Uang masuk dari bapak kris, Uang masuk dari bapak kris, Uang masuk dari bapak kris,Uang masuk dari bapak kris Uang masuk dari bapak kris',
        created_at: '12 Januari 2025'
    },
    {
        id: 'out12123',
        type: 'out',
        amount: '12.000.000',
        desc: 'Uang masuk dari bapak kris',
        created_at: '12 Januari 2025'
    },
    {
        id: 'out112323',
        type: 'out',
        amount: '12.000.000',
        desc: 'Uang masuk dari bapak kris',
        created_at: '12 Januari 2025'
    },
    {
        id: 'ou233t123',
        type: 'out',
        amount: '12.000.000',
        desc: 'Uang masuk dari bapak kris',
        created_at: '12 Januari 2025'
    },
]

export default function Report() {
    return (
        <div className="px-6 lg:px-80" >
            <h2 className="mt-2 text-pretty text-3xl font-semibold tracking-tight leading-tight text-gray-900 sm:text-4xl mb-4">
                Laporan Saldo Infaq Masjid
            </h2>
            <ul role="list" className="divide-y divide-gray-100">
                {data.map((item) => (
                    <li key={item.id} className="flex justify-between gap-x-6 py-5">
                        <div className="flex min-w-0 gap-x-4">
                            <div className='w-100'>
                                {icon[item.type]}
                            </div>
                            <div className="min-w-0 flex-auto">
                                <p className="text-sm/6 font-semibold text-gray-900">{item.amount}</p>
                                <p className="mt-1 text-xs/5 text-gray-500">{item.desc}</p>
                            </div>
                        </div>
                        <div className="hidde shrink-0 sm:flex sm:flex-col sm:items-end">
                            <p className="text-sm/6 text-gray-500 text-right">
                                {item.created_at}<br />
                                <span className='text-sm'>{'13:00 AM'}</span>
                            </p>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}
