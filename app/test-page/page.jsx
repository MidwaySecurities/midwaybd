'use client'
import { useEffect, useState } from "react"
import axios from "axios"
const TestPage = () => {

    const [value, setValue] = useState(1)
    const [info, setInfo] = useState([])
    useEffect(() => {
        const fetchData = async () => {
            const {data} = await axios.get(`https://bsbglobalnetwork.co.uk/api/city`)
            setInfo(data.cities)

        }
        fetchData()
        
    }, [value])
    console.log(info)
    return (
        <div>
            <h1>number count {value}</h1>
            <button onClick={() => {
                setValue(prev => prev + 1)
            }}>+</button>

            {info.map(item => {
                return (
                    <div onClick={() => {
                        alert(item.name)
                    }}>
                        Country Name: {item.name}<br />
                        Country Id: {item.country_id}
                    </div>
                )
            })}
        </div>
    )
}
export default TestPage