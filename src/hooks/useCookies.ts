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

    return cookies;
};

export default useCookies;
