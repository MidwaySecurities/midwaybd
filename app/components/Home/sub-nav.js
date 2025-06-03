const SubNav = () => {
    // scroallable horizontal menu
    // also want if scrolled horizontally always 1 menu left behind
    // and 1 menu right behind
    // so that it looks like a carousel
    // add momentum to the scroll
    // add corousel effect like if you scroll left it goes to the next menu
    return (
        <div className="flex overflow-x-auto whitespace-nowrap p-4 bg-gray-100">
            <div className="inline-block px-4 py-2 bg-white rounded-lg shadow-md mr-2">
                Open Bo
            </div>
            <div className="inline-block px-4 py-2 bg-white rounded-lg shadow-md mr-2">
                Deposits
            </div>
            <div className="inline-block px-4 py-2 bg-white rounded-lg shadow-md mr-2">
                Withdrawals
            </div>
            <div className="inline-block px-4 py-2 bg-white rounded-lg shadow-md mr-2">
                More
            </div>
        </div>
    );
    
}

export default SubNav;