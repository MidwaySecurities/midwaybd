'use client'
const { useContext, useEffect, useState, createContext } = require("react");

export const DeviceDetectContext = createContext()

export const DeviceDetectContextProvider = ({children}) => {
    const [os, setOs] = useState('Unknown');

      useEffect(() => {
        const userAgent = navigator.userAgent || navigator.vendor || window.opera;
        const platform = navigator.platform;
    
        if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
          setOs('iOS');
        } else if (/MacIntel/.test(platform)) {
          setOs('macOS');
        } else if (/Win/.test(platform)) {
          setOs('Windows');
        } else if (/Android/.test(userAgent)) {
          setOs('Android');
        } else if (/Linux/.test(platform)) {
          setOs('Linux');
        }

      }, []);

    return (
        <DeviceDetectContext.Provider value={{os}}>
            {children}
        </DeviceDetectContext.Provider>
    )
}

export const useDeviceDetect = () => (
    useContext(DeviceDetectContext)
)