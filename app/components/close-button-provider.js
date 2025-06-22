'use client'
import React, { createContext, useContext, useState } from 'react';

export const ModalCloseContext = createContext();
export const ModalCloseProvider = ({ children }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const closeModal = () => setIsModalOpen(false);
    const openModal = () => setIsModalOpen(true);
    return (
        <ModalCloseContext.Provider value={{ isModalOpen, closeModal, openModal }}>
            {children}
        </ModalCloseContext.Provider>
    );
}

export const useModalClose = () => (
    useContext(ModalCloseContext)
)