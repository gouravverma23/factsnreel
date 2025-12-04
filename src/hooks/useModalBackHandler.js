import { useEffect } from 'react';

const useModalBackHandler = (setModalState) => {
    useEffect(() => {
        const handlePopState = () => {
            setModalState(null);
        };

        window.addEventListener('popstate', handlePopState);
        return () => window.removeEventListener('popstate', handlePopState);
    }, [setModalState]);

    const openModal = (data) => {
        window.history.pushState({ modal: true }, '');
        setModalState(data);
    };

    const closeModal = () => {
        window.history.back();
    };

    return { openModal, closeModal };
};

export default useModalBackHandler;
