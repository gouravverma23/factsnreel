import { useEffect, useRef, useState } from 'react';

const useActiveCard = (threshold = 0.6) => {
    const ref = useRef(null);
    const [isActive, setIsActive] = useState(false);

    useEffect(() => {
        // Only run on devices that don't support hover (touch devices)
        const isTouchDevice = window.matchMedia('(hover: none)').matches;
        if (!isTouchDevice) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsActive(entry.isIntersecting);
            },
            {
                threshold: threshold,
                rootMargin: '-10% 0px -10% 0px', // Trigger when element is mostly in center
            }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => {
            if (ref.current) {
                observer.unobserve(ref.current);
            }
        };
    }, [threshold]);

    return [ref, isActive];
};

export default useActiveCard;
