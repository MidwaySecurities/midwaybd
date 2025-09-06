'use client'
import { createContext, useContext, useState } from "react";

const blogTabContext = createContext()

export const BlogTabProvider = ({ children }) => {
    const [currentTab, setCurrentTab] = useState('');
    return (
        <blogTabContext.Provider value={{ currentTab, setCurrentTab }}>
            {children}
        </blogTabContext.Provider>
    );
};

export const useBlogTab = () => useContext(blogTabContext);