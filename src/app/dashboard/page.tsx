'use client'

import { ArrowDownCircleIcon, ArrowUpCircleIcon, TrashIcon, HomeIcon } from "@heroicons/react/20/solid";
import { useCookies } from "next-client-cookies";
import { redirect } from "next/navigation";
import { RedirectType } from "next/navigation";
import { JSX, useEffect, useState } from "react";

const dateFormat = (timestamp: string) => {
    const date = new Date(timestamp);
    const formattedDate = `${String(date.getDate()).padStart(2, '0')}-${String(date.getMonth() + 1).padStart(2, '0')}-${date.getFullYear()}`;
    const formattedTime = `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;

    return {
        date: formattedDate,
        time: formattedTime,
    }
}

type Filters = {
    start_date: string;
    end_date: string;
};
type Transaction = {
    id          : string;
    created_at   : string;
    updated_at   : null;
    description : string;
    amount      : number;
    type        : string;
}


const icon: Record<string, JSX.Element> = {
    outcome: <ArrowUpCircleIcon className='w-8 h-8 text-red-400' />,
    income: <ArrowDownCircleIcon className='w-8 h-8 text-green-300' />,
}


export default function Dashboard() {

    const [trxData, setTrxData] = useState<Transaction[]>([]);
    const [amount, setAmount] = useState('');
    const [description, setDescription] = useState('');
    const [isPostDataLoading, setIsPostDataLoading] = useState(false);
    const [isFetchDataLoading, setIsFetchDataLoading] = useState(false);
    const [filters, setFilters] = useState<Filters>({
        start_date: "",
        end_date: "",
    });
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

    const onDeleteHandler = async (id: string) => {

        setIsPostDataLoading(true);
        setError(null);

        const response = await fetch(`/api/transactions/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })

        const result = await response.json();
        setIsPostDataLoading(false)

        if (!response.ok) {
            setError(result.message || 'An error occurred');
        }
    }


    useEffect(() => {

        const fetchData = async () => {
            try {
                setIsFetchDataLoading(true);
                setError(null);
    
                const params = new URLSearchParams(filters);
                const response = await fetch(`/api/transactions?${params.toString()}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });
    
                const result = await response.json();
    
                if (!response.ok) {
                    setError(result.message || 'An error occurred');
                } else {
                    setTrxData(result.data ?? []);
                }
            } catch (error) {
                console.error('Error fetching data:', error); // Logging the error
                setError('Failed to fetch transaction data');
            } finally {
                setIsFetchDataLoading(false);
            }
        };

        if (filters.start_date && filters.end_date && !isPostDataLoading) {
            fetchData();
        }

    }, [filters, isPostDataLoading])

    useEffect(() => {
        const end_date   = new Date();
        const start_date = new Date(new Date().setDate(end_date.getDate() - 30));

        const formattedStartDate = `${start_date.getFullYear()}-${String(start_date.getMonth() + 1).padStart(2, '0')}-${String(start_date.getDate()).padStart(2, '0')} ` +
                         `${String(start_date.getHours()).padStart(2, '0')}:${String(start_date.getMinutes()).padStart(2, '0')}:${String(start_date.getSeconds()).padStart(2, '0')}.` +
                         `${String(start_date.getMilliseconds()).padStart(3, '0')}+00`;

        const formattedEndDate = `${end_date.getFullYear()}-${String(end_date.getMonth() + 1).padStart(2, '0')}-${String(end_date.getDate()).padStart(2, '0')} ` +
                         `${String(end_date.getHours()).padStart(2, '0')}:${String(end_date.getMinutes()).padStart(2, '0')}:${String(end_date.getSeconds()).padStart(2, '0')}.` +
                         `${String(end_date.getMilliseconds()).padStart(3, '0')}+00`;

        setFilters({
            start_date: formattedStartDate,
            end_date: formattedEndDate,
        })
    }, [])

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
            <div className=" mt-8">
                <h2 className="mt-2 text-pretty text-center text-3xl font-semibold tracking-tight leading-tight text-gray-900 sm:text-2xl mb-4">
                    Laporan Saldo Infaq Masjid
                </h2>
                <div className="flex gap-5 mb-6">
                    <input
                        onChange={ev => setFilters(state => ({ ...state, start_date: ev.target.value }))}
                        defaultValue={filters.start_date.substring(0, 10)}
                        id="start_date"
                        name="start_date"
                        type="date"
                        className="ring-1 ring-gray-300 rounded-md outline outline-1 -outline-offset-1 outline-gray-300 block min-w-0 grow py-1.5 px-3 text-base text-gray-900 placeholder:text-gray-400 focus:outline focus:outline-0 sm:text-sm/6 font-bold"
                    />
                    <input
                        onChange={ev => setFilters(state => ({ ...state, end_date: ev.target.value }))}
                        defaultValue={filters.end_date.substring(0, 10)}
                        id="end_date"
                        name="end_date"
                        type="date"
                        className="ring-1 ring-gray-300 rounded-md outline outline-1 -outline-offset-1 outline-gray-300 block min-w-0 grow py-1.5 px-3 text-base text-gray-900 placeholder:text-gray-400 focus:outline focus:outline-0 sm:text-sm/6 font-bold"
                    />
                </div>
                <div className="max-h-[600px] overflow-y-scroll sm:px-4">
                {
                    isFetchDataLoading 
                        ? <p className="animate-bounce text-gray-500 text-center font-bold">Loading...</p>
                        : <ul role="list" className="divide-y divide-gray-100">
                            {trxData.map((item) => (
                                <li key={item.id} className="flex justify-between gap-x-6 py-5">
                                    <div className="flex min-w-0 gap-x-4">
                                        <div className='w-100'>
                                            {icon[item.type]}
                                        </div>
                                        <div className="min-w-0 flex-auto">
                                            <p className={`text-md font-bold text-gray-900 ${item.type === 'income'? 'text-green-600': 'text-red-600'}`}>
                                            {item.type === 'income'? '+': '-'} { new Intl.NumberFormat('id-ID').format(item.amount)}
                                            </p>
                                            <p className="mt-1 text-xs/5 text-gray-500">{item.description}</p>
                                        </div>
                                    </div>
                                    <div className="shrink-0 sm:flex sm:flex-col sm:items-end">
                                        <p className="text-sm/6 text-gray-500 text-right">
                                            {dateFormat(item.created_at).date}<br />
                                            <span className='text-sm'>{dateFormat(item.created_at).time}</span>
                                        </p>
                                        <div className="flex justify-end mt-2">
                                            <div 
                                                onClick={() => onDeleteHandler(item.id)}
                                                className="bg-red-200 rounded-full w-8 h-8 flex justify-center items-center cursor-pointer hover:bg-red-400 hover:text-white text-red-600">
                                                <TrashIcon className="w-5 h-5"/>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                }
                </div>
            </div>
        </div>
    )
}
