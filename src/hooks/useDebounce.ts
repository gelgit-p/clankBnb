'use client';
import { useEffect, useState } from 'react';

const useDebounce = (value: any, delay: any) => {
    const [debounced, setDebouncedValue] = useState(value)


    useEffect(() => {
        const timer = setTimeout(() => setDebouncedValue(value),delay || 500);

        return () => {
            clearTimeout(timer)
        }
    }, [value, delay]
)

return debounced;


//   const { chainId } = useAccount();
//   const networkData = getNetwork(chainId);
//   return networkData as Network;
};

export default useDebounce;
