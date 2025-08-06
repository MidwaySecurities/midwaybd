import Image from "next/image";

const SearchIcon = () => {
    return (
        <div className='h-8 bg-white my-6 mb-8 rounded-3xl relative'>
            <input type="text" placeholder='Search' className='h-full px-4 rounded-3xl text-gray-800 inline-block w-full' />
            <Image src={`https://cdn-icons-png.flaticon.com/512/17216/17216943.png`} alt="Search" width={20} height={10} className="w-6 h-6 absolute top-[50%] translate-y-[-50%] right-2 bg-white" />
        </div>
    )
}

export default SearchIcon;