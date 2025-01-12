'use client';

import { useEffect, useState } from 'react';

const useCookies = (key = '') => {
    const [cookies, setCookies] = useState(null);

    useEffect(() => {
        if (typeof document !== 'undefined') {
            const cookieString = document.cookie;
            const cookieObject = Object.fromEntries(
                cookieString.split('; ').map((item) => item.split('='))
            );

            if (key) {
                setCookies(cookieObject[key] || null);
            } else {
                setCookies(cookieObject);
            }
        }
    }, [key]);

    const remove = (key: string) => {
        document.cookie = `${key}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    }

    return {cookies, remove};
};

export default useCookies;
