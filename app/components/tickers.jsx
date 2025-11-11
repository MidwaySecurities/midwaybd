import TickerClient from "./TickerClient.jsx";

const Tickers = async () => {
    let refineData = [];
    let hasError = false;

    try {
        const response = await fetch(`https://platform.biniyog.com.bd/core/sharemarket/getPriceDataTableByAllSector`, {
            next: {
                revalidate: 60
            }
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        refineData = data.filter(item => {
            return ['BRACBANK', 'SQURPHARMA', 'GP', 'MARICO', 'BATBC', 'CITYBANK', 'EBL', 'ISLAMIBANK'].includes(item.MKISTAT_INSTRUMENT_CODE);
        });
        console.log('Fetched Ticker Data:', refineData);
    } catch (error) {
        
    }

    return <TickerClient tickerData={refineData} hasError={hasError} />;
};

export default Tickers;