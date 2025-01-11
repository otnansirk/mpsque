'use client'

import { ArrowDownCircleIcon, ArrowUpCircleIcon } from "@heroicons/react/20/solid";
import { useState } from "react";

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

export default function Dashboard() {

    const [amount, setAmount] = useState('');
    const [description, setDescription] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const onOutcomeHandler = async () => {

        setIsLoading(true);
        setError(null);

        const response = await fetch('/api/signin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                amount,
                description,
                type: 'outcome'
            })
        })

        const result = await response.json();
        setIsLoading(false)

        if (!response.ok) {
            setError(result.message || 'An error occurred');
        }
    }

    const onIncomeHandler = async () => {

        setIsLoading(true);
        setError(null);

        const response = await fetch('/api/signin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                amount,
                description,
                type: 'income'
            })
        })

        const result = await response.json();
        setIsLoading(false)

        if (!response.ok) {
            setError(result.message || 'An error occurred');
        }
    }

    return (
        <div className="container m-auto pt-6 max-w-xl">
            <div className="-space-y-px">
                <div className="rounded-t-md bg-white px-3 pb-1.5 pt-2.5 outline outline-1 -outline-offset-1 outline-gray-300 focus-within:relative focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
                    <label htmlFor="amount" className="block text-xs font-medium text-gray-900">
                        Uang
                    </label>
                    <div className="mt-2">
                        <div className="flex items-center rounded-md bg-white px-3 outline outline-1 -outline-offset-1 outline-gray-300 focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
                            <div className="shrink-0 select-none text-base text-gray-500 sm:text-sm/6">Rp.</div>
                            <input
                                id="price"
                                name="price"
                                type="number"
                                placeholder="0.00"
                                aria-describedby="price-currency"
                                className="block min-w-0 grow py-1.5 pl-1 pr-3 text-base text-gray-900 placeholder:text-gray-400 focus:outline focus:outline-0 sm:text-sm/6 font-bold"
                            />
                            <div id="price-currency" className="shrink-0 select-none text-base text-gray-500 sm:text-sm/6">
                                Rupiah
                            </div>
                        </div>
                    </div>
                </div>
                <div className="rounded-b-md bg-white px-3 pb-1.5 pt-2.5 outline outline-1 -outline-offset-1 outline-gray-300 focus-within:relative focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
                    <label htmlFor="description" className="block text-xs font-medium text-gray-900">
                        Detail Transaksi
                    </label>
                    <textarea
                        onChange={ev => setDescription(ev.target.value)}
                        id="description"
                        name="description"
                        rows={10}
                        placeholder="Detail transaksi"
                        className="block w-full text-gray-900 placeholder:text-gray-400 focus:outline focus:outline-0 sm:text-sm/6"
                    />
                </div>
                <div>
                    {error && <p className="text-red-500 text-center block mt-3">{error}</p>}
                </div>
                <div className="py-6 flex gap-5">
                    <button
                        disabled={isLoading}
                        onClick={onOutcomeHandler}
                        className="hover:bg-red-600 bg-red-500 font-semibold p-3 rounded-lg w-full">
                        {isLoading ? 'Sedang Proses' : 'Pengeluaran'}
                    </button>
                    <button
                        disabled={isLoading}
                        onClick={onIncomeHandler}
                        className="hover:bg-green-600 bg-green-500 font-semibold p-3 rounded-lg w-full">
                        {isLoading ? 'Sedang Proses' : 'Pemasukan'}
                    </button>
                </div>
            </div>
            <hr />
            <div className="px-6 lg:px-80 mt-8" id="report">
                <h2 className="mt-2 text-pretty text-center text-3xl font-semibold tracking-tight leading-tight text-gray-900 sm:text-2xl mb-4">
                    Laporan Saldo Infaq Masjid
                </h2>
                <div className="flex gap-5 mb-6">
                    <input
                        id="start_date"
                        name="start_date"
                        type="date"
                        className="ring-1 ring-gray-300 rounded-md outline outline-1 -outline-offset-1 outline-gray-300 block min-w-0 grow py-1.5 px-3 text-base text-gray-900 placeholder:text-gray-400 focus:outline focus:outline-0 sm:text-sm/6 font-bold"
                    />
                    <input
                        id="end_date"
                        name="end_date"
                        type="date"
                    className="ring-1 ring-gray-300 rounded-md outline outline-1 -outline-offset-1 outline-gray-300 block min-w-0 grow py-1.5 px-3 text-base text-gray-900 placeholder:text-gray-400 focus:outline focus:outline-0 sm:text-sm/6 font-bold"
                    />
                </div>
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
        </div>
    )
}
