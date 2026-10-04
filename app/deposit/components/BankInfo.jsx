import React from 'react'
import CityBank from '../Assets/Svg/cityBank'
import DutchBangla from '../Assets/Svg/dutchBangla'

function FieldRow({ label, value, mono = false }) {
    return (
        <div className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0">
            <dt className="text-xs text-gray-400">{label}</dt>
            <dd
                className={`text-xs font-medium text-gray-800 ${mono ? 'font-mono bg-gray-100 px-2 py-0.5 rounded' : ''
                    }`}
            >
                {value}
            </dd>
        </div>
    )
}
const BankInfo = () => {
    const banks = [
        {
            initials: <CityBank width={30} height={30} />,
            colorClass: 'bg-blue-50 text-blue-800',
            name: 'City Bank',
            fields: [
                { label: 'Account name', value: 'Midway Securities Limited', mono: false },
                { label: 'Account no.', value: '3101093011001', mono: true },
                { label: 'Branch', value: 'Principal Branch, Dhaka South', mono: false },
                { label: 'Routing no.', value: '225275357', mono: true },
            ],
        },
        {
            initials: <DutchBangla width={30} height={30} />,
            colorClass: 'bg-green-50 text-green-800',
            name: 'Dutch Bangla Bank',
            fields: [
                { label: 'Account name', value: 'Midway Securities Limited', mono: false },
                { label: 'Account no.', value: '1011200006385', mono: true },
                { label: 'Branch', value: 'Local Branch, Dhaka South', mono: false },
                { label: 'Routing no.', value: '090273889', mono: true },
            ],
        },
    ]
    return (
        <div className="grid sm:grid-cols-2 gap-3">
            {banks.map((bank) => (
                <article
                    key={bank.name}
                    aria-label={`${bank.name} bank account details`}
                    className="bg-white border border-gray-200 rounded-xl p-4 hover:border-gray-300 transition-colors"
                >
                    <div
                        className={`inline-flex items-center justify-center w-8 h-8 rounded-lg text-xs font-semibold mb-3 ${bank.colorClass}`}
                        aria-hidden="true"
                    >
                        {bank.initials}
                    </div>
                    <h3 className="text-sm font-semibold text-gray-900 mb-3">{bank.name}</h3>
                    <dl className=''>
                        {bank.fields.map((f) => (
                            <FieldRow key={f.label} {...f} />
                        ))}
                    </dl>
                </article>
            ))}
        </div>
    )
}

export default BankInfo