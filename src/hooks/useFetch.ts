import { useState, useEffect } from 'react';

export function useFetch<T>(url: string): {
    data: T | null;
    error: string | null;
} {
    const [data, setData] = useState<T | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetch(url)
            .then((res) => res.json())
            .then(setData)
            .catch((err) => setError(err.message));
    }, [url]);

    return { data, error };
}
