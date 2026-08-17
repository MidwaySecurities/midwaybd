import TickerClient from "./TickerClient.jsx";

const Tickers = async () => {
    let refineData = [];
    let hasError = false;

    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_PORTAL_URL}/ds30`, {
            next: {
                revalidate: 60
            }
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        refineData = data?.data?.filter(item => {
            return ['BRACBANK', 'SQURPHARMA', 'GP', 'MARICO', 'BATBC', 'CITYBANK', 'EBL', 'ISLAMIBANK'].includes(item.MKISTAT_INSTRUMENT_CODE);
        });
    } catch (error) {
        console.error("Error fetching ticker data:", error);
        hasError = true;
    }

    return <TickerClient tickerData={refineData} hasError={hasError} />;
};

export default Tickers;