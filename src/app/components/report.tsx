'use client'

import { ArrowUpCircleIcon, ArrowDownCircleIcon, TrashIcon } from '@heroicons/react/20/solid'
import { JSX, useEffect, useState } from 'react'

const dateFormat = (timestamp: string) => {
    const date = new Date(timestamp);
    const formattedDate = `${String(date.getDate()).padStart(2, '0')}-${String(date.getMonth() + 1).padStart(2, '0')}-${date.getFullYear()}`;
    const formattedTime = `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;

    return {
        date: formattedDate,
        time: formattedTime,
    }
}

const dateStartEndFormat = () => {
    
    const end_date   = new Date();
    const start_date = new Date(new Date().setDate(end_date.getDate() - 30));

    const formattedStartDate = `${start_date.getFullYear()}-${String(start_date.getMonth() + 1).padStart(2, '0')}-${String(start_date.getDate()).padStart(2, '0')} ` +
                     `${String(start_date.getHours()).padStart(2, '0')}:${String(start_date.getMinutes()).padStart(2, '0')}:${String(start_date.getSeconds()).padStart(2, '0')}.` +
                     `${String(start_date.getMilliseconds()).padStart(3, '0')}+00`;

    const formattedEndDate = `${end_date.getFullYear()}-${String(end_date.getMonth() + 1).padStart(2, '0')}-${String(end_date.getDate()).padStart(2, '0')} ` +
                     `${String(end_date.getHours()).padStart(2, '0')}:${String(end_date.getMinutes()).padStart(2, '0')}:${String(end_date.getSeconds()).padStart(2, '0')}.` +
                     `${String(end_date.getMilliseconds()).padStart(3, '0')}+00`;

    return {
        start: formattedStartDate,
        end: formattedEndDate,
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


export default function Report({canDelete = false, isRefetch = false}) {

    const [isFetchDataLoading, setIsFetchDataLoading] = useState(false);
    const [isPostDataLoading, setIsPostDataLoading] = useState(false);
    const [filters, setFilters] = useState<Filters>({
        start_date: "",
        end_date: "",
    });
    const [trxData, setTrxData] = useState<Transaction[]>([]);
    const [error, setError] = useState<string | null>(null);


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

                const params = new URLSearchParams({
                    start_date: filters.start_date.substring(0, 10) + dateStartEndFormat().start.slice(10),
                    end_date: filters.end_date.substring(0, 10) + dateStartEndFormat().end.slice(10),
                });
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

    }, [filters, isPostDataLoading, isRefetch])

    useEffect(() => {
        const date = dateStartEndFormat()
        setFilters({
            start_date: date.start,
            end_date: date.end,
        })
    }, [])

    return (
        <div className="px-6 container mt-8 mx-auto">
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
            {
                trxData.length && <div className='text-gray-700 font-bold mb-5 text-lg'>
                    <span className='text-gray-500'>Total Saldo :</span> {
                    new Intl.NumberFormat('id-ID').format(
                        trxData.map(item => item.amount)
                            .reduce((accumulator, amount) => accumulator + amount
                            )
                        )
                    }
                </div>
            }
            <div className="max-h-[600px] overflow-y-scroll sm:px-4">
                {!trxData.length && !isFetchDataLoading && <p className="text-gray-500 text-center font-bold">Tidak ada data yang ditampilkan</p>}
                {
                    isFetchDataLoading && !error
                        ? <p className="animate-bounce text-gray-500 text-center font-bold">Loading...</p>
                        : <ul role="list" className="divide-y divide-gray-100">
                            {trxData.map((item) => (
                                <li key={item.id} className="flex justify-between gap-x-6 py-5">
                                    <div className="flex min-w-0 gap-x-4">
                                        <div className='w-100'>
                                            {icon[item.type]}
                                        </div>
                                        <div className="min-w-0 flex-auto">
                                            <p className={`text-md font-bold text-gray-900 ${item.type === 'income' ? 'text-green-600' : 'text-red-600'}`}>
                                                {new Intl.NumberFormat('id-ID').format(item.amount)}
                                            </p>
                                            <p className="mt-1 text-xs/5 text-gray-500">{item.description}</p>
                                        </div>
                                    </div>
                                    <div className="shrink-0 sm:flex sm:flex-col sm:items-end">
                                        <p className="text-sm/6 text-gray-500 text-right">
                                            {dateFormat(item.created_at).date}<br />
                                            <span className='text-sm'>{dateFormat(item.created_at).time}</span>
                                        </p>
                                        {
                                            canDelete &&
                                                <div className="flex justify-end mt-2">
                                                    <div 
                                                        onClick={() => onDeleteHandler(item.id)}
                                                        className="bg-red-200 rounded-full w-8 h-8 flex justify-center items-center cursor-pointer hover:bg-red-400 hover:text-white text-red-600">
                                                        <TrashIcon className="w-5 h-5"/>
                                                    </div>
                                                </div>
                                        }
                                    </div>
                                </li>
                            ))}
                        </ul>
                }
            </div>
        </div>
    )
}
