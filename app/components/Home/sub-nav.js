const SubNav = () => {
    return (
        <div className="flex overflow-x-auto whitespace-nowrap p-4 bg-gray-100">
            <div className="inline-block px-4 py-2 bg-white rounded-lg shadow-md mr-2 bg-opacity-0 backdrop-blur-lg">
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