import Link from 'next/link'
import React from 'react'

const ForeignInvestor = () => {
    return (
        <div className='px-4'>
            <div className='mt-8 card-shadow p-2 rounded-lg'>
                <h1 className='font-bold text-xl mb-3'>Investment Freedom in Bangladesh</h1>
                <p>The Foreign Investment Act of 1980 guarantees the right of repatriation of invested capital, profits, capital gains, post-tax dividends, and approved royalties and fees. Foreign firms are able to repatriate funds without much difficulty, provided the appropriate documentation is in order. </p>
                <p>​For Foreign individual the tax on cash dividend is 25%, and tax on capital gain is 0%. For foreign company, the tax on cash dividend is 20%, and capital gain tax is 10%.</p>
            </div>

            <div className='mt-8 card-shadow p-2 rounded-lg'>
                <h1 className='font-bold text-xl mb-3'>Economic Freedom in Bangladesh</h1>
                <p>Bangladesh's economic freedom score is 55.0, making its economy the 128th freest in the 2017 Index. Its overall score is 1.7 points higher than last year, mainly reflecting improvements in trade freedom and investment freedom. Bangladesh is ranked 28th out of 43 countries in the Asia–Pacific region. Bangladesh has enjoyed impressive economic growth of around 6.5 percent per year over the past five years, driven mainly by its limited but growing services and industrial sectors.</p>
            </div>

            <div className='mt-8 card-shadow p-2 rounded-lg'>
                <h1 className='font-bold text-xl mb-3'>Required Documents</h1>
                <ol>
                    <li>Collect foreign institutional form</li>
                    <li>Fill up the form and signed by authorized personnel</li>
                    <li>A copy of the memorandum and articles of the association of the company.</li>
                    <li>A copy of certification of the incorporation of the company.</li>
                    <li>A copy of the authorization / board resolution to open and operate the account with us.</li>
                    <li> A copy of the authorization / board resolution authorizing the executives to operate the account, including their photographs.</li>
                    <li>  Clients need to submit the hard copy of the form.
                        All the above documents must be attested by either the Bangladesh Embassy or notarized by a notary public .</li>
                </ol>
            </div>

            <div className='mt-8 card-shadow p-2 rounded-lg'>
                <h1 className='font-bold text-xl mb-3'>What we do for our foreign clients </h1>
                <ol>
                    <li>Dealings with foreign individual/institutional investors.</li>
                    <li>Strategic Consulting, including business plan & sales strategy development for foreign investors.</li>
                    <li> Operational support to foreign investors regarding opening BO account , NITA account , FC account , executing custodial activities . </li>
                    <li>A copy of certification of the incorporation of the company.</li>
                    <li>Support in Trade Execution & Repatriation of proceeds.</li>
                    <li>A to Z solutions to foreign investors.</li>
                    <li>We sell research data to our specific foreign clients on demand basis.</li>
                </ol>
            </div>

            <div className='mt-8'>
                <h1 className='font-bold text-xl'>Required Link</h1>
                <Link className='font-bold underline' href={`http://www.dsebd.org/pdf/facilities%20for%20for%20foreign%20investors.pdf`}>http://www.dsebd.org/pdf/facilities%20for%20for%20foreign%20investors.pdf</Link>
            </div>

            <div className='mt-8'>
                <h1 className='font-bold text-xl'>International Broker</h1>
                <p>As a leading of broker of Dhaka Stock Exchange , we welcome the international broker as partnership basis for mutual benefit . We hope your effort with us will be benefited for your clients' and investors' interest .</p>
            </div>

            <p className='font-semibold mt-16 italic text-gray-500'><blockquote className='bg-[url(https://www.midwaybd.com/files/theme/images/quotes.png?1753622919)] bg-no-repeat pl-[30px] text-'>We have several lucrative product design to satisfy our foreign individual or institutional investors .</blockquote></p>

        </div>
    )
}

export default ForeignInvestor