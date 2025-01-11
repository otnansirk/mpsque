'use client'

import { HomeIcon } from "@heroicons/react/20/solid";
import { useCookies } from "next-client-cookies";
import { redirect } from "next/navigation";
import { RedirectType } from "next/navigation";
import { useState } from "react";
import Report from "../components/report";

export default function Dashboard() {

    const [amount, setAmount] = useState('');
    const [description, setDescription] = useState('');
    const [isPostDataLoading, setIsPostDataLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const cookies = useCookies()

    const onOutcomeHandler = async () => {
        try {
            setIsPostDataLoading(true);
            setError(null);
    
            const response = await fetch('/api/transactions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    amount,
                    description,
                    type: 'outcome'
                })
            });
    
            const result = await response.json();
            if (!response.ok) {
                setError(result.message || 'An error occurred');
            }
        } catch (error) {
            console.error('Error posting outcome:', error);
            setError('Failed to post outcome');
        } finally {
            setIsPostDataLoading(false);
        }
    }

    const onIncomeHandler = async () => {
        try {
            setIsPostDataLoading(true);
            setError(null);
    
            const response = await fetch('/api/transactions', {
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
            setIsPostDataLoading(false)
    
            if (!response.ok) {
                setError(result.message || 'An error occurred');
            }

        } catch (error) {
            console.error('Error posting income:', error);
            setError('Failed to post income');
        } finally {
            setIsPostDataLoading(false);
        }
    }

    return (
        <div className="container m-auto pt-6 max-w-xl px-4">
            <div className="flex justify-between mb-3">
                <div
                    onClick={() => redirect("/", RedirectType.push)} 
                    className="flex items-end gap-2 font-semibold text-gray-500 cursor-pointer inline-block" >
                    <HomeIcon className="w-8 h-8"/> <span>{process.env.NEXT_PUBLIC_APP_NAME}</span>
                </div>
                <div
                    onClick={() => {
                        cookies.remove('_Access_Token')
                        redirect("/", RedirectType.push)
                    }} 
                    className="font-semibold text-red-500 cursor-pointer text-sm" >
                        Log Out
                </div>
            </div>
            <div className="-space-y-px">
                <div className="rounded-t-md bg-white px-3 pb-1.5 pt-2.5 outline outline-1 -outline-offset-1 outline-gray-300 focus-within:relative focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
                    <label htmlFor="amount" className="block text-xs font-medium text-gray-900">
                        Uang
                    </label>
                    <div className="mt-2">
                        <div className="flex items-center rounded-md bg-white px-3 outline outline-1 -outline-offset-1 outline-gray-300 focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
                            <div className="shrink-0 select-none text-base text-gray-500 sm:text-sm/6">Rp.</div>
                            <input
                                onChange={ev => setAmount(ev.target.value)}
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
                        placeholder="Masukkan Detail transaksi"
                        className="block w-full text-gray-900 placeholder:text-gray-400 focus:outline focus:outline-0 sm:text-sm/6"
                    />
                </div>
                <div>
                    {error && <p className="text-red-500 text-center block mt-3">{error}</p>}
                </div>
                <div className="py-6 flex gap-5">
                    <button
                        disabled={isPostDataLoading}
                        onClick={onOutcomeHandler}
                        className="hover:bg-red-600 bg-red-500 font-semibold p-3 rounded-lg w-full">
                        {isPostDataLoading ? 'Sedang Proses' : 'Pengeluaran'}
                    </button>
                    <button
                        disabled={isPostDataLoading}
                        onClick={onIncomeHandler}
                        className="hover:bg-green-600 bg-green-500 font-semibold p-3 rounded-lg w-full">
                        {isPostDataLoading ? 'Sedang Proses' : 'Pemasukan'}
                    </button>
                </div>
            </div>
            <hr />
            <Report canDelete={true} isRefetch={isPostDataLoading}/>
        </div>
    )
}
