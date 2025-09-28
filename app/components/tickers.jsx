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
    } catch (error) {
        console.error('Error fetching ticker data:', error);
        hasError = true;
        refineData = [
            {
                MKISTAT_INSTRUMENT_CODE: 'BRACBANK',
                MKISTAT_PUB_LAST_TRADED_PRICE: '45.60',
                MKISTAT_YDAY_CLOSE_PRICE: '44.80'
            },
            {
                MKISTAT_INSTRUMENT_CODE: 'SQURPHARMA',
                MKISTAT_PUB_LAST_TRADED_PRICE: '128.50',
                MKISTAT_YDAY_CLOSE_PRICE: '130.20'
            },
            {
                MKISTAT_INSTRUMENT_CODE: 'GP',
                MKISTAT_PUB_LAST_TRADED_PRICE: '22.30',
                MKISTAT_YDAY_CLOSE_PRICE: '21.80'
            },
            {
                MKISTAT_INSTRUMENT_CODE: 'MARICO',
                MKISTAT_PUB_LAST_TRADED_PRICE: '1850.00',
                MKISTAT_YDAY_CLOSE_PRICE: '1820.50'
            },
            {
                MKISTAT_INSTRUMENT_CODE: 'BATBC',
                MKISTAT_PUB_LAST_TRADED_PRICE: '320.75',
                MKISTAT_YDAY_CLOSE_PRICE: '315.20'
            },
            {
                MKISTAT_INSTRUMENT_CODE: 'CITYBANK',
                MKISTAT_PUB_LAST_TRADED_PRICE: '18.90',
                MKISTAT_YDAY_CLOSE_PRICE: '19.40'
            }
        ];
    }

    return <TickerClient tickerData={refineData} hasError={hasError} />;
};

export default Tickers;