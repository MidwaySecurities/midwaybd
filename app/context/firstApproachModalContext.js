'use client'
import React, { createContext, useContext, useState } from 'react';

export const BottomModalCloseContext = createContext();
export const BottomModalCloseProvider = ({ children }) => {
    const [isModalOpen, setIsModalOpen] = useState(true);
    const closeModal = () => setIsModalOpen(false);
    const openModal = () => setIsModalOpen(true);
    return (
        <BottomModalCloseContext.Provider value={{ isModalOpen, closeModal, openModal }}>
            {children}
        </BottomModalCloseContext.Provider>
    );
}

export const useBottomModalClose = () => (
    useContext(BottomModalCloseContext)
)