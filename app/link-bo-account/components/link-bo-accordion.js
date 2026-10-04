'use client'
import React, { useState } from "react";
import { TECollapse } from "tw-elements-react";

export default function AccordionFlush() {
    const [activeElement, setActiveElement] = useState("");

    const handleClick = (value) => {
        if (value === activeElement) {
            setActiveElement("");
        } else {
            setActiveElement(value);
        }
    };
    return (
        <div className="mx-4  mt-4">
            <div className="card-shadow rounded-2xl">
                <div className="rounded-xl border-neutral-200">
                    <h2 className="mb-0">
                        <button
                            className={`${activeElement === "element1" &&
                                `text-primary [box-shadow:inset_0_-1px_0_rgba(229,231,235)] dark:!text-primary-400 dark:[box-shadow:inset_0_-1px_0_rgba(75,85,99)]`
                                } group relative flex w-full items-center rounded-none border-0 bg-white py-4 text-left text-base text-neutral-800 transition [overflow-anchor:none] hover:z-[2] focus:z-[3] focus:outline-none px-4`}
                            type="button"
                            onClick={() => handleClick("element1")}
                            aria-expanded="true"
                            aria-controls="collapseOne"
                        >
                            <strong>Switch to Midway?</strong>
                            <span
                                className={`${activeElement === "element1"
                                        ? `rotate-[-180deg] -mr-1`
                                        : `rotate-0 fill-[#212529] dark:fill-white`
                                    } ml-auto h-5 w-5 shrink-0 fill-[#336dec] transition-transform duration-200 ease-in-out motion-reduce:transition-none dark:fill-blue-300`}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="currentColor"
                                    className="h-6 w-6"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                                    />
                                </svg>
                            </span>
                        </button>
                    </h2>
                    <TECollapse
                        show={activeElement === "element1"}
                        className="!mt-0 !rounded-b-none !shadow-none"
                    >
                        <div className="px-5 py-4">
                            After you have successfully opened a Link BO Account with us, please download the form below, fill it out and give this to your current broker house. This form is your official request for them to process. They are legally bound to transfer your shares. Most broker firms complete the transfer in 1 business day. If you face any issues, please contact us: ​09609 100 142 (Facebook Messenger)

                            আমাদের সাথে আপনি সফলভাবে একটি লিংক বিও অ্যাকাউন্ট খোলার পরে, নীচের ফর্মটি ডাউনলোড করুন, এটি পূরণ করুন এবং আপনার বর্তমান ব্রোকার হাউসে এটি প্রদান করুন। এই ফর্মটি আপনার অফিসিয়াল অনুরোধ ফর্ম। তারা আপনার শেয়ার হস্তান্তর করার জন্য আইনগতভাবে আবদ্ধ। বেশিরভাগ ব্রোকার হাউজ 1 ব্যবসায়িক দিনে স্থানান্তর সম্পন্ন করে। আপনি যদি কোন সমস্যা সম্মুখীন হন, তাহলে আমাদের সাথে যোগাযোগ করুন: 09609 100 142 (Facebook Messenger)
                        </div>
                    </TECollapse>
                </div>
            </div>
        </div>
    );
}