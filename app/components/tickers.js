import Image from 'next/image'
import React from 'react'
import style from './tickers.module.css';
const Tickers = () => {
    return (
        <div>
            <div class="carousel">
                <div class={`${style.group}`}>
                    <div class="card">A</div>
                    <div class="card">B</div>
                    <div class="card">C</div>
                </div>

                <div aria-hidden class={`${style.group}`}>
                    <div class="card">A</div>
                    <div class="card">B</div>
                    <div class="card">C</div>
                </div>
            </div>
        </div>
    )
}

export default Tickers