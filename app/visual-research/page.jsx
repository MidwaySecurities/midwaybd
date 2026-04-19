/*
================================================================================
  DSE MARKET ANALYSIS - Official Market Report Template
================================================================================
  Version: 1.9
  Client: Midway Securities Ltd.
  Report Date: December 10, 2025
  
  MARKET DATA: End of Day - December 10, 2025
  
  FAILED BREAKOUT: Bull trap at 5,000 resistance
  Distribution day with breadth collapse

================================================================================
*/
'use client'
import React, { useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer, Tooltip, ReferenceLine, ComposedChart, Line } from 'recharts';

// ╔════════════════════════════════════════════════════════════════════════════╗
// ║                         DAILY DATA INPUT                                    ║
// ║                    (Update this section each trading day)                   ║
// ╚════════════════════════════════════════════════════════════════════════════╝

const DAILY_DATA = {
  
  date: 'December 10, 2025',
  
  indices: {
    dsex: {
      value: 4941.84,
      change: -21.06,
      changePercent: -0.42,
      high: 4994.54,
      low: 4941.84,
      open: 4962.90,
      previousClose: 4962.90,
    },
    dses: {
      value: 1031.73,
      change: -7.50,
      changePercent: -0.72,
    },
    ds30: {
      value: 1899.10,
      change: -8.67,
      changePercent: -0.45,
    },
  },
  
  technicalLevels: {
    dma20: 4959.80,
    dma50: 5128.30,
    dma200: 5120.60,
    rsi14: 52.10,
    support: 4872.64,
    resistance: 5197.27,
    week52High: 5636.15,
    week52Low: 4615.41,
  },
  
  ytdPerformance: {
    startValue: 5218.16,
    currentValue: 4941.84,
    returnPercent: -5.30,
  },
  
  historicalData: [
    { date: 'Nov 3', value: 5061.01 },
    { date: 'Nov 4', value: 5019.07 },
    { date: 'Nov 5', value: 4986.89 },
    { date: 'Nov 6', value: 4967.94 },
    { date: 'Nov 9', value: 4899.93 },
    { date: 'Nov 10', value: 4860.75 },
    { date: 'Nov 11', value: 4872.77 },
    { date: 'Nov 12', value: 4825.33 },
    { date: 'Nov 13', value: 4702.69 },
    { date: 'Nov 16', value: 4732.16 },
    { date: 'Nov 17', value: 4774.96 },
    { date: 'Nov 18', value: 4846.88 },
    { date: 'Nov 19', value: 4901.38 },
    { date: 'Nov 20', value: 4869.01 },
    { date: 'Nov 23', value: 4915.75 },
    { date: 'Nov 24', value: 5024.86 },
    { date: 'Nov 25', value: 5018.28 },
    { date: 'Nov 26', value: 5009.80 },
    { date: 'Nov 27', value: 5028.14 },
    { date: 'Nov 30', value: 4978.77 },
    { date: 'Dec 1', value: 4914.72 },
    { date: 'Dec 2', value: 4950.92 },
    { date: 'Dec 3', value: 4927.49 },
    { date: 'Dec 4', value: 4886.57 },
    { date: 'Dec 7', value: 4872.64 },
    { date: 'Dec 8', value: 4906.29 },
    { date: 'Dec 9', value: 4962.90 },
    { date: 'Dec 10', value: 4941.84 },
  ],
  
  marketSummary: {
    totalVolume: 170335930,
    totalValueMn: 5339.07,
    issuesAdvanced: 114,
    issuesDeclined: 227,
    issuesUnchanged: 53,
  },
  
  marketBreadth: {
    gainers: { count: 105, percent: 27.6 },
    losers: { count: 221, percent: 58.2 },
    unchanged: { count: 50, percent: 13.2 },
    commentary: {
      en: "Market breadth collapsed in a classic distribution pattern. Gainers plunged to just 27.6% (105 stocks) while losers surged to 58.2% (221 stocks), producing a bearish 0.48:1 A/D ratio - a complete reversal from yesterday's euphoric 8.50:1. This represents one of the most dramatic one-day breadth reversals in recent months. Category participation turned decisively negative: Category A showed 48 gainers vs 108 losers (2.25:1 loser ratio), Category B had only 13 gainers vs 59 losers (4.5:1 loser ratio), and even Category Z weakened with 39 gainers vs 44 losers. Circuit breakers reflected the shift with only 2 upper circuits (FASFIN +10.26%, NORTHERN +9.93%) and zero lower circuits. The critical warning: this breadth collapse came with RISING volume - turnover jumped 16.6% to BDT 5,339M and volume increased 9.5% to 170.3M. High volume on a down day with collapsing breadth is the textbook definition of institutional distribution. Smart money was selling into yesterday's euphoria. The failed attempt to clear 5,000 psychological resistance (reached 4,995 intraday) combined with the loss of 20 DMA support at 4,960 confirms this was a bull trap. The two-day rally from Dec 7-9 has now been rejected, with institutions using the bounce to distribute holdings to retail buyers who chased the breakout.",
      bn: "বাজারের ব্রেডথ একটি ক্লাসিক বিতরণ প্যাটার্নে ভেঙে পড়েছে। লাভবান শেয়ার মাত্র 27.6% (105টি)-এ নেমে এসেছে যেখানে ক্ষতিগ্রস্ত শেয়ার 58.2% (221টি)-এ বেড়েছে, তৈরি হয়েছে নেতিবাচক 0.48:1 A/D ratio - গতকালের উৎসাহব্যঞ্জক 8.50:1 থেকে সম্পূর্ণ বিপরীত। এটি সাম্প্রতিক মাসগুলোর মধ্যে সবচেয়ে নাটকীয় একদিনের ব্রেডথ পরিবর্তন। সব category-তে অংশগ্রহণ স্পষ্টভাবে নেতিবাচক হয়েছে: Category A দেখিয়েছে 48টি লাভবান বনাম 108টি ক্ষতিগ্রস্ত (2.25:1 ক্ষতির অনুপাত), Category B-তে ছিল মাত্র 13টি লাভবান বনাম 59টি ক্ষতিগ্রস্ত (4.5:1 ক্ষতির অনুপাত), এবং এমনকি Category Z-ও দুর্বল হয়েছে 39টি লাভবান বনাম 44টি ক্ষতিগ্রস্ত নিয়ে। Circuit breaker এই পরিবর্তন প্রতিফলিত করেছে - মাত্র 2টি upper circuit (FASFIN +10.26%, NORTHERN +9.93%) এবং কোনো lower circuit নেই। মূল সতর্কতা: এই ব্রেডথ সংকোচন ঘটেছে ক্রমবর্ধমান ভলিউমের সাথে - টার্নওভার 16.6% বেড়ে BDT 5,339M এবং ভলিউম 9.5% বৃদ্ধি পেয়ে 170.3M হয়েছে। পতনশীল দিনে উচ্চ ভলিউম ও ব্রেডথ সংকোচন হলো প্রাতিষ্ঠানিক বিতরণের পাঠ্যপুস্তকের সংজ্ঞা। বুদ্ধিমান অর্থ গতকালের উচ্ছ্বাসে বিক্রয় করছিল। 5,000 মানসিক resistance অতিক্রমের ব্যর্থ চেষ্টা (intraday 4,995 স্পর্শ করেছিল), এবং 20 DMA support 4,960-এ হারানো নিশ্চিত করে যে এটি ছিল একটি bull trap। Dec 7-9-এর দুই দিনের উত্থান এখন প্রত্যাখ্যাত হয়েছে, প্রতিষ্ঠানগুলো এই bounce ব্যবহার করেছে খুচরা ক্রেতাদের কাছে হোল্ডিং বিতরণে যারা breakout-এর পেছনে ছুটেছিল।"
    },
  },
  
  categoryBreadth: [
    { category: 'A', gainers: 48, losers: 108, unchanged: 0, turnoverMn: 2737.94 },
    { category: 'B', gainers: 13, losers: 59, unchanged: 0, turnoverMn: 1620.42 },
    { category: 'Z', gainers: 39, losers: 44, unchanged: 0, turnoverMn: 225.38 },
  ],
  
  circuitBreakers: {
    upper: [
      { symbol: 'FASFIN', close: 0.86, change: 10.26 },
      { symbol: 'NORTHERN', close: 112.90, change: 9.93 },
    ],
    upperCount: 2,
    lower: [],
    lowerCount: 0,
  },
  
  volumeSpikes: {
    totalCount: 56,
    top5: [
      { symbol: 'KBSEED', volume: 950000, prevVolume: 100, spike: 9500.0, close: 6.30, change: -2.99 },
      { symbol: 'BENGALBISC', volume: 37250, prevVolume: 100, spike: 372.5, close: 52.00, change: -9.88 },
      { symbol: 'KFL', volume: 13760, prevVolume: 100, spike: 137.6, close: 7.50, change: -6.25 },
      { symbol: 'NIALCO', volume: 5380, prevVolume: 100, spike: 53.8, close: 21.50, change: -6.05 },
      { symbol: 'SKTRIMS', volume: 2920, prevVolume: 100, spike: 29.2, close: 8.00, change: 5.26 },
    ],
  },
  
  sectorPerformance: [
    { sector: 'Pharma & Chemicals', valueMn: 664.36, percent: 14.46 },
    { sector: 'Engineering', valueMn: 605.90, percent: 13.18 },
    { sector: 'Textile', valueMn: 546.17, percent: 11.88 },
    { sector: 'Food and Allied', valueMn: 490.82, percent: 10.68 },
    { sector: 'Insurance', valueMn: 370.38, percent: 8.06 },
  ],
  
  sectorCommentary: {
    en: "Sector performance showed defensive rotation as the breakout failed. Pharma regained leadership with BDT 664M (14.46%, +15% vs Monday), as money moved back to defensive plays. Engineering held second at BDT 606M (13.18%, +6% vs Monday) but lost momentum. Textile remained third with BDT 546M (11.88%, -1% vs Monday). Food & Allied surged to fourth place with BDT 491M (10.68%, +38% vs Monday) led by BDTHAIFOOD's BDT 128M turnover (+7.14%). Insurance jumped into the top 5 with BDT 370M (8.06%), replacing Fuel & Power. The rotation back to defensive Pharma and the emergence of Food & Allied signals risk-off positioning. DOMINAGE led all stocks with BDT 189M turnover despite flat performance, while ORIONINFU held second at BDT 142M (+0.16%). The shift from cyclical sectors (Engineering, Power) back to defensives (Pharma, Food) confirms institutions are reducing risk exposure after the failed breakout attempt. Volume spikes were notably on declining stocks (BENGALBISC -9.88%, KFL -6.25%, NIALCO -6.05%), indicating panic selling rather than accumulation.",
    bn: "Breakout ব্যর্থ হওয়ার সাথে সাথে খাতের কর্মক্ষমতা প্রতিরক্ষামূলক ঘূর্ণন দেখিয়েছে। Pharma নেতৃত্ব পুনরুদ্ধার করেছে BDT 664M (14.46%, রবিবার থেকে +15%) নিয়ে, কারণ অর্থ প্রতিরক্ষামূলক খাতে ফিরে গেছে। Engineering দ্বিতীয় স্থানে টিকে আছে BDT 606M (13.18%, রবিবার থেকে +6%) নিয়ে কিন্তু গতি হারিয়েছে। Textile তৃতীয় স্থানে রয়েছে BDT 546M (11.88%, রবিবার থেকে -1%) নিয়ে। Food & Allied চতুর্থ স্থানে লাফিয়ে এসেছে BDT 491M (10.68%, রবিবার থেকে +38%) নিয়ে, যার নেতৃত্বে রয়েছে BDTHAIFOOD-এর BDT 128M টার্নওভার (+7.14%)। Insurance শীর্ষ 5-এ প্রবেশ করেছে BDT 370M (8.06%) নিয়ে, Fuel & Power-কে প্রতিস্থাপন করেছে। প্রতিরক্ষামূলক Pharma-তে ঘূর্ণন এবং Food & Allied-এর উত্থান ঝুঁকি-বিমুখ অবস্থানের সংকেত দেয়। DOMINAGE সব শেয়রকে এগিয়ে রেখেছে BDT 189M টার্নওভার নিয়ে যদিও দাম অপরিবর্তিত, আর ORIONINFU দ্বিতীয় অবস্থানে রয়েছে BDT 142M (+0.16%) নিয়ে। চক্রাকার খাত (Engineering, Power) থেকে প্রতিরক্ষামূলক (Pharma, Food)-এ এই পরিবর্তন নিশ্চিত করে যে প্রতিষ্ঠানগুলো ব্যর্থ breakout প্রচেষ্টার পর ঝুঁকি এক্সপোজার কমাচ্ছে। ভলিউম স্পাইক উল্লেখযোগ্যভাবে পতনশীল শেয়ারে ছিল (BENGALBISC -9.88%, KFL -6.25%, NIALCO -6.05%), যা জমা করার পরিবর্তে আতঙ্কজনক বিক্রয় নির্দেশ করে।"
  },
  
  intradayData: [
    { time: '10:00', value: 4990 },
    { time: '10:05', value: 4993 },
    { time: '10:10', value: 4995 },
    { time: '10:15', value: 4992 },
    { time: '10:20', value: 4990 },
    { time: '10:25', value: 4988 },
    { time: '10:30', value: 4985 },
    { time: '10:35', value: 4985 },
    { time: '10:40', value: 4986 },
    { time: '10:45', value: 4987 },
    { time: '10:50', value: 4986 },
    { time: '10:55', value: 4985 },
    { time: '11:00', value: 4983 },
    { time: '11:10', value: 4980 },
    { time: '11:20', value: 4978 },
    { time: '11:30', value: 4975 },
    { time: '11:40', value: 4973 },
    { time: '11:50', value: 4972 },
    { time: '12:00', value: 4970 },
    { time: '12:10', value: 4973 },
    { time: '12:20', value: 4975 },
    { time: '12:30', value: 4978 },
    { time: '12:40', value: 4975 },
    { time: '12:50', value: 4973 },
    { time: '13:00', value: 4970 },
    { time: '13:10', value: 4968 },
    { time: '13:20', value: 4965 },
    { time: '13:30', value: 4963 },
    { time: '13:40', value: 4960 },
    { time: '13:50', value: 4958 },
    { time: '14:00', value: 4955 },
    { time: '14:10', value: 4948 },
    { time: '14:20', value: 4945 },
    { time: '14:30', value: 4941.84 },
  ],
  
  topGainers: [
    { symbol: 'FASFIN', close: 0.86, change: 10.26 },
    { symbol: 'NORTHERN', close: 112.90, change: 9.93 },
    { symbol: 'TILIL', close: 46.20, change: 9.74 },
    { symbol: 'HRTEX', close: 18.40, change: 8.88 },
    { symbol: 'MEGHNACE M', close: 31.50, change: 8.25 },
  ],
  
  topLosers: [
    { symbol: 'BENGALBISC', close: 52.00, change: -9.88 },
    { symbol: 'FAMILYTEX', close: 1.10, change: -8.33 },
    { symbol: 'WONDERTOYS', close: 18.20, change: -6.52 },
    { symbol: 'SHYAMPSUG', close: 209.70, change: -6.47 },
    { symbol: 'KFL', close: 7.50, change: -6.25 },
  ],
  
  topValue: [
    { symbol: 'DOMINAGE', valueMn: 188.75, close: 27.10, change: 0.00 },
    { symbol: 'ORIONINFU', valueMn: 142.37, close: 383.60, change: 0.16 },
    { symbol: 'BDTHAIFOOD', valueMn: 127.65, close: 16.50, change: 7.14 },
    { symbol: 'ASIATICCLAB', valueMn: 126.40, close: 55.70, change: 2.20 },
    { symbol: 'ACMEPL', valueMn: 110.38, close: 16.80, change: -4.00 },
    { symbol: 'SIMTEX', valueMn: 109.87, close: 22.90, change: -1.29 },
    { symbol: 'MONNOFABR', valueMn: 106.99, close: 20.90, change: -0.48 },
    { symbol: 'TILIL', valueMn: 97.95, close: 46.20, change: 9.74 },
    { symbol: 'SQURPHARMA', valueMn: 95.54, close: 201.40, change: -0.25 },
    { symbol: 'RUPALILIFE', valueMn: 91.86, close: 82.40, change: 4.17 },
  ],
  
  blockMarket: {
    summary: {
      totalTrades: 97,
      totalScrips: 42,
      totalValueMn: 519.84,
    },
    top5: [
      { symbol: 'PTL', quantity: 400000, price: 50.95, valueMn: 20.38 },
      { symbol: 'SQURPHARMA', quantity: 144830, price: 201.78, valueMn: 29.29 },
      { symbol: 'PRIMEBANK', quantity: 250000, price: 27.98, valueMn: 6.99 },
      { symbol: 'ASIATICCLAB', quantity: 184807, price: 54.98, valueMn: 10.16 },
      { symbol: 'GP', quantity: 282259, price: 246.96, valueMn: 69.70 },
    ],
  },
  
  commentary: {
    en: `The DSEX delivered a textbook failed breakout, falling 21.06 points (-0.42%) to close at 4,941.84, erasing yesterday's euphoric gains and confirming a classic bull trap. The market opened at 4,963 (yesterday's close) and made an early attempt to clear the psychologically critical 5,000 level, reaching an intraday high of 4,995 by 10:10 AM - just 5 points shy of this major resistance. However, sellers aggressively defended this level, and the index began a steady, relentless decline throughout the entire session. The selling pressure intensified in the final hour, driving the index below the 20 DMA (4,960) and closing at the session low of 4,942. Market breadth collapsed catastrophically: gainers plunged from yesterday's euphoric 81.0% to just 27.6% (105 stocks), while the A/D ratio flipped from a bullish 8.50:1 to a bearish 0.48:1 - one of the most dramatic one-day reversals in recent memory. This represents 221 declining stocks overwhelming just 105 advancing stocks. The distribution pattern was evident across all categories: Category A showed a 2.25:1 loser ratio, Category B had a brutal 4.5:1 loser ratio, and even Category Z weakened. Circuit breakers reflected the shift with only 2 upper circuits versus yesterday's 9. The critical warning sign: this breadth collapse came with RISING volume and turnover - volume increased 9.5% to 170.3M and turnover surged 16.6% to BDT 5,339M. High volume on a down day with collapsing breadth is institutional distribution - smart money selling into yesterday's retail-driven euphoria. Sector rotation turned defensive as Pharma regained leadership (+15%) while cyclical Engineering and Power lost momentum. The failed attempt at 5,000, combined with losing the 20 DMA support, confirms the Dec 7-9 rally was a bull trap used by institutions to distribute holdings. RSI declined to 52.1, losing bullish momentum. The index now faces immediate support at 4,900, with critical support at the Dec 7 low of 4,873.`,
    bn: `DSEX একটি ক্লাসিক ব্যর্থ breakout-এর উদাহরণ দেখিয়েছে, 21.06 পয়েন্ট (-0.42%) কমে 4,941.84-এ বন্ধ হয়েছে, যা গতকালের উচ্ছ্বাসপূর্ণ লাভ মুছে দিয়ে একটি bull trap নিশ্চিত করেছে। বাজার 4,963-এ খুলেছিল (গতকালের সমাপনী) এবং মানসিকভাবে গুরুত্বপূর্ণ 5,000 লেভেল অতিক্রমের চেষ্টা করেছিল, সকাল 10:10 AM-এ 4,995-এ পৌঁছেছিল - এই বড় resistance থেকে মাত্র 5 পয়েন্ট দূরে। কিন্তু বিক্রেতারা আক্রমণাত্মকভাবে এই স্তর রক্ষা করেছে এবং সূচক পুরো session জুড়ে ক্রমাগত নিম্নমুখী হয়েছে। শেষ ঘণ্টায় বিক্রয়ের চাপ তীব্র হয়ে index-কে 20 DMA (4,960)-এর নিচে ঠেলে দিয়ে 4,942-এ session-এর সর্বনিম্ন পর্যায়ে বন্ধ করেছে। বাজারের প্রশস্ততা মারাত্মকভাবে ধসে পড়েছে: লাভবান শেয়ার গতকালের উচ্ছ্বাসপূর্ণ 81.0% থেকে মাত্র 27.6% (105টি)-এ নেমে এসেছে, আর A/D ratio ইতিবাচক 8.50:1 থেকে নেতিবাচক 0.48:1-এ পরিণত হয়েছে - সাম্প্রতিক সময়ের সবচেয়ে নাটকীয় একদিনের উল্টাপাল্টা। এর অর্থ হলো 221টি পতনশীল শেয়ার মাত্র 105টি ঊর্ধ্বমুখী শেয়রকে ছাপিয়ে গেছে। সব category জুড়ে বিতরণের ধরন স্পষ্ট ছিল: Category A-তে 2.25:1 হারে ক্ষতিগ্রস্ত, Category B-তে কঠোর 4.5:1 হারে ক্ষতি, এমনকি Category Z-ও দুর্বল হয়েছে। Circuit breaker এই পরিবর্তন প্রতিফলিত করেছে - মাত্র 2টি upper circuit, যেখানে গতকাল ছিল 9টি। সবচেয়ে গুরুত্বপূর্ণ সতর্কতা: এই ব্রেডথ সংকোচন ঘটেছে ক্রমবর্ধমান ভলিউম ও টার্নওভারের সাথে - ভলিউম 9.5% বেড়ে 170.3M এবং টার্নওভার 16.6% লাফ দিয়ে BDT 5,339M হয়েছে। নিম্নমুখী দিনে উচ্চ ভলিউম ও ব্রেডথ সংকোচনের অর্থ হলো প্রাতিষ্ঠানিক বিতরণ - বড় বিনিয়োগকারীরা গতকালের খুচরা-চালিত উচ্ছ্বাসে বিক্রয় করছিল। খাত ঘূর্ণন প্রতিরক্ষামূলক হয়েছে যখন Pharma নেতৃত্ব ফিরে পেয়েছে (+15%), আর চক্রাকার Engineering ও Power গতি হারিয়েছে। 5,000-এ ব্যর্থ প্রচেষ্টা এবং 20 DMA support হারানো নিশ্চিত করে যে Dec 7-9-এর উত্থান ছিল একটি bull trap যা প্রতিষ্ঠানগুলো তাদের হোল্ডিং বিতরণে ব্যবহার করেছে। RSI 52.1-এ নেমেছে, ইতিবাচক গতি হারিয়েছে। সূচক এখন 4,900-এ তাৎক্ষণিক support-এর মুখোমুখি, Dec 7-এর 4,873 low-এ গুরুত্বপূর্ণ support রয়েছে।`
  },

};

// ╔════════════════════════════════════════════════════════════════════════════╗
// ║                         END OF DAILY DATA INPUT                             ║
// ╚════════════════════════════════════════════════════════════════════════════╝


// ============================================================================
// TEMPLATE ENGINE v1.9
// ============================================================================

// Language Toggle Button Component (Dark Theme)
const LanguageToggle = ({ isEnglish, onToggle }) => (
  <button
    onClick={onToggle}
    style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: '6px',
      background: isEnglish ? 'rgba(255,255,255,0.1)' : 'rgba(34, 197, 94, 0.2)',
      border: isEnglish ? '1px solid rgba(255,255,255,0.2)' : '1px solid rgba(34, 197, 94, 0.4)',
      borderRadius: '6px',
      padding: '5px 12px',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
    }}
  >
    <svg 
      width="14" 
      height="14" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke={isEnglish ? '#94a3b8' : '#4ade80'}
      strokeWidth="2"
    >
      <circle cx="12" cy="12" r="10"/>
      <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
    </svg>
    <span style={{ 
      fontSize: '11px', 
      fontWeight: 600,
      color: isEnglish ? '#94a3b8' : '#4ade80',
    }}>
      {isEnglish ? 'বাংলায় পড়ুন' : 'Read in English'}
    </span>
  </button>
);

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div style={{
        background: 'rgba(255, 255, 255, 0.95)',
        border: '1px solid rgba(220, 38, 38, 0.3)',
        borderRadius: '8px',
        padding: '12px 16px',
        boxShadow: '0 10px 40px rgba(0, 0, 0, 0.1)',
      }}>
        <p style={{ color: '#64748b', fontSize: '12px', margin: 0 }}>{label}</p>
        <p style={{ color: '#dc2626', fontSize: '18px', fontWeight: 600, margin: '4px 0 0' }}>
          {payload[0].value.toLocaleString()}
        </p>
      </div>
    );
  }
  return null;
};

const TechnicalTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div style={{
        background: 'rgba(15, 23, 42, 0.95)',
        border: '1px solid #334155',
        borderRadius: '8px',
        padding: '10px 14px',
        boxShadow: '0 10px 40px rgba(0, 0, 0, 0.3)',
      }}>
        <p style={{ color: '#94a3b8', fontSize: '11px', margin: 0 }}>{label}</p>
        <p style={{ color: '#f8fafc', fontSize: '16px', fontWeight: 600, margin: '4px 0 0' }}>
          {payload[0].value.toLocaleString(undefined, { minimumFractionDigits: 2 })}
        </p>
      </div>
    );
  }
  return null;
};

const formatNumber = (num) => num.toLocaleString();
const formatVolume = (num) => {
  if (num >= 1000000) return (num / 1000000).toFixed(0) + 'M';
  if (num >= 1000) return (num / 1000).toFixed(0) + 'K';
  return num.toString();
};

const formatTurnoverRounded = (num) => {
  return Math.round(num).toLocaleString();
};

// Sector Bar Component
const SectorBar = ({ sector, valueMn, percent, maxPercent }) => {
  const barWidth = (percent / maxPercent) * 100;
  return (
    <div style={{ display: 'flex', alignItems: 'center', padding: '8px 0', borderBottom: '1px solid #e2e8f0' }}>
      <div style={{ width: '140px', flexShrink: 0 }}>
        <span style={{ color: '#0f172a', fontSize: '11px', fontWeight: 500 }}>{sector}</span>
      </div>
      <div style={{ flex: 1, marginRight: '12px' }}>
        <div style={{ background: '#e2e8f0', borderRadius: '4px', height: '8px', overflow: 'hidden' }}>
          <div style={{
            width: `${barWidth}%`,
            height: '100%',
            background: 'linear-gradient(90deg, #dc2626 0%, #ef4444 100%)',
            borderRadius: '4px',
          }} />
        </div>
      </div>
      <div style={{ width: '90px', textAlign: 'right' }}>
        <span style={{ color: '#0f172a', fontSize: '11px', fontWeight: 600 }}>BDT {valueMn.toFixed(2)}M</span>
      </div>
      <div style={{ width: '55px', textAlign: 'right' }}>
        <span style={{ color: '#64748b', fontSize: '10px' }}>({percent.toFixed(2)}%)</span>
      </div>
    </div>
  );
};

// Dark Commentary Box Component with Language Toggle
const DarkCommentary = ({ textEn, textBn }) => {
  const [isEnglish, setIsEnglish] = useState(true);
  
  return (
    <div style={{
      background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
      borderRadius: '8px',
      padding: '14px 16px',
      marginTop: '12px',
    }}>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '10px' }}>
        <LanguageToggle isEnglish={isEnglish} onToggle={() => setIsEnglish(!isEnglish)} />
      </div>
      <p style={{ 
        color: '#e2e8f0', 
        fontSize: '12px', 
        lineHeight: 1.7, 
        margin: 0,
        fontFamily: isEnglish ? 'system-ui, -apple-system, sans-serif' : "'Noto Sans Bengali', 'Hind Siliguri', system-ui, sans-serif",
      }}>
        {isEnglish ? textEn : textBn}
      </p>
    </div>
  );
};

export default function DSEMarketAnalysis() {
  const { indices, technicalLevels, ytdPerformance, historicalData, marketSummary, marketBreadth, categoryBreadth, circuitBreakers, volumeSpikes, sectorPerformance, sectorCommentary, intradayData, topGainers, topLosers, topValue, blockMarket, commentary, date } = DAILY_DATA;
  
  // State for main commentary language
  const [mainCommentaryEnglish, setMainCommentaryEnglish] = useState(true);
  
  const isPositive = indices.dsex.change >= 0;
  const accentColor = isPositive ? '#16a34a' : '#dc2626';
  const advanceDeclineRatio = (marketSummary.issuesAdvanced / marketSummary.issuesDeclined).toFixed(2);
  const maxSectorPercent = Math.max(...sectorPerformance.map(s => s.percent));
  const activeCategories = categoryBreadth.filter(c => c.gainers + c.losers + c.unchanged > 0);
  
  const historicalWithDMA = historicalData.map(d => ({
    ...d,
    dma20: technicalLevels.dma20
  }));

  const getRSIColor = (val) => {
    if (val >= 70) return '#dc2626';
    if (val <= 30) return '#16a34a';
    return '#f59e0b';
  };
  const getRSILabel = (val) => {
    if (val >= 70) return 'Overbought';
    if (val <= 30) return 'Oversold';
    return 'Neutral';
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
      padding: '24px',
      fontFamily: "system-ui, -apple-system, sans-serif",
    }}>
      <div style={{
        maxWidth: '900px',
        margin: '0 auto',
        background: '#ffffff',
        borderRadius: '16px',
        padding: '28px',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.06)',
      }}>
        
        {/* Header */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '24px',
          paddingBottom: '16px',
          borderBottom: '2px solid #e2e8f0',
        }}>
          <div>
            <h1 style={{ fontSize: '24px', fontWeight: 700, color: '#0f172a', margin: '0 0 4px' }}>
              DSE Market Analysis
            </h1>
            <p style={{ color: '#64748b', fontSize: '13px', margin: 0 }}>
              Midway Securities Ltd. • End of Day Report
            </p>
          </div>
          <div style={{
            textAlign: 'right',
            background: '#f8fafc',
            padding: '10px 16px',
            borderRadius: '10px',
            border: '1px solid #e2e8f0',
          }}>
            <p style={{ color: '#64748b', fontSize: '10px', margin: '0 0 2px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Report Date
            </p>
            <p style={{ color: '#0f172a', fontSize: '14px', fontWeight: 600, margin: 0 }}>
              {date}
            </p>
          </div>
        </div>

        {/* DSEX Index Section */}
        <div style={{
          background: '#f8fafc',
          borderRadius: '12px',
          padding: '20px',
          marginBottom: '20px',
          border: '1px solid #e2e8f0',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px', flexWrap: 'wrap', gap: '12px' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
                <p style={{ color: '#64748b', fontSize: '11px', margin: 0, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  DSEX Index
                </p>
                <span style={{
                  background: ytdPerformance.returnPercent >= 0 ? '#dcfce7' : '#fef2f2',
                  color: ytdPerformance.returnPercent >= 0 ? '#16a34a' : '#dc2626',
                  padding: '2px 8px',
                  borderRadius: '4px',
                  fontSize: '10px',
                  fontWeight: 600,
                }}>
                  YTD: {ytdPerformance.returnPercent >= 0 ? '+' : ''}{ytdPerformance.returnPercent.toFixed(2)}%
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px', flexWrap: 'wrap' }}>
                <span style={{ fontSize: '36px', fontWeight: 700, color: '#0f172a' }}>
                  {indices.dsex.value.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                </span>
                <span style={{ color: accentColor, fontSize: '18px', fontWeight: 600 }}>
                  {isPositive ? '+' : ''}{indices.dsex.change.toFixed(2)}
                </span>
                <span style={{
                  background: isPositive ? '#dcfce7' : '#fef2f2',
                  color: accentColor,
                  padding: '4px 10px',
                  borderRadius: '6px',
                  fontSize: '13px',
                  fontWeight: 600,
                }}>
                  {isPositive ? '+' : ''}{indices.dsex.changePercent.toFixed(2)}%
                </span>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '20px', textAlign: 'right' }}>
              <div>
                <p style={{ color: '#64748b', fontSize: '10px', margin: '0 0 2px', textTransform: 'uppercase' }}>High</p>
                <p style={{ color: '#16a34a', fontSize: '14px', fontWeight: 600, margin: 0 }}>
                  {indices.dsex.high.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                </p>
              </div>
              <div>
                <p style={{ color: '#64748b', fontSize: '10px', margin: '0 0 2px', textTransform: 'uppercase' }}>Low</p>
                <p style={{ color: '#dc2626', fontSize: '14px', fontWeight: 600, margin: 0 }}>
                  {indices.dsex.low.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                </p>
              </div>
              <div>
                <p style={{ color: '#64748b', fontSize: '10px', margin: '0 0 2px', textTransform: 'uppercase' }}>Open</p>
                <p style={{ color: '#0f172a', fontSize: '14px', fontWeight: 600, margin: 0 }}>
                  {indices.dsex.open.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                </p>
              </div>
            </div>
          </div>
          
          {/* Intraday Chart */}
          <div style={{ height: '160px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={intradayData} margin={{ top: 5, right: 5, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={accentColor} stopOpacity={0.25} />
                    <stop offset="100%" stopColor={accentColor} stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 9 }} interval={5} />
                <YAxis domain={['dataMin - 15', 'dataMax + 15']} axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 9 }} tickFormatter={(val) => val.toLocaleString()} width={45} />
                <ReferenceLine y={indices.dsex.previousClose} stroke="#94a3b8" strokeDasharray="4 4" strokeWidth={1} />
                <Tooltip content={<CustomTooltip />} />
                <Area type="monotone" dataKey="value" stroke={accentColor} strokeWidth={2} fill="url(#areaGradient)" dot={false} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '6px' }}>
            <div style={{ width: '16px', borderTop: '2px dashed #94a3b8' }} />
            <span style={{ color: '#94a3b8', fontSize: '9px' }}>Previous Close: {indices.dsex.previousClose.toLocaleString()}</span>
          </div>
        </div>

        {/* DSEX Technical Levels */}
        <div style={{
          background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
          borderRadius: '12px',
          padding: '16px',
          marginBottom: '20px',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px', gap: '12px' }}>
            <h2 style={{ color: '#ffffff', fontSize: '11px', fontWeight: 600, margin: 0, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              DSEX Technical Levels
            </h2>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(255,255,255,0.05)', borderRadius: '6px', padding: '6px 10px' }}>
              <span style={{ color: '#94a3b8', fontSize: '7px', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>52W</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ color: '#f87171', fontSize: '9px', fontWeight: 600 }}>{(technicalLevels.week52Low / 1000).toFixed(1)}K</span>
                <div style={{ width: '40px', position: 'relative' }}>
                  <div style={{ background: '#334155', borderRadius: '3px', height: '3px' }}>
                    <div style={{
                      position: 'absolute',
                      left: `${((indices.dsex.value - technicalLevels.week52Low) / (technicalLevels.week52High - technicalLevels.week52Low)) * 100}%`,
                      top: '-1.5px',
                      width: '6px',
                      height: '6px',
                      background: '#3b82f6',
                      borderRadius: '50%',
                      transform: 'translateX(-50%)',
                    }} />
                  </div>
                </div>
                <span style={{ color: '#4ade80', fontSize: '9px', fontWeight: 600 }}>{(technicalLevels.week52High / 1000).toFixed(1)}K</span>
              </div>
            </div>
          </div>
          
          <div style={{ marginBottom: '16px' }}>
            <div style={{ height: '180px', marginBottom: '8px' }}>
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={historicalWithDMA} margin={{ top: 5, right: 5, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="techGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.3} />
                      <stop offset="100%" stopColor="#3b82f6" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 8 }} interval={4} />
                  <YAxis domain={['dataMin - 50', 'dataMax + 50']} axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 9 }} width={40} />
                  <Tooltip content={<TechnicalTooltip />} />
                  <Area type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={2} fill="url(#techGradient)" dot={false} />
                  <Line type="monotone" dataKey="dma20" stroke="#f59e0b" strokeWidth={1.5} strokeDasharray="4 4" dot={false} />
                  <ReferenceLine y={technicalLevels.support} stroke="#dc2626" strokeDasharray="3 3" strokeWidth={1} />
                  <ReferenceLine y={technicalLevels.resistance} stroke="#16a34a" strokeDasharray="3 3" strokeWidth={1} />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
            
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', justifyContent: 'center' }}>
              {[
                { color: '#3b82f6', label: 'DSEX' },
                { color: '#f59e0b', label: '20 DMA' },
                { color: '#16a34a', label: 'Resist' },
                { color: '#dc2626', label: 'Support' },
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <div style={{ width: '12px', height: '2px', background: item.color }} />
                  <span style={{ color: '#94a3b8', fontSize: '8px' }}>{item.label}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px' }}>
            <div style={{ background: 'rgba(255,255,255,0.05)', borderRadius: '8px', padding: '10px' }}>
              <p style={{ color: getRSIColor(technicalLevels.rsi14), fontSize: '8px', margin: '0 0 2px', textTransform: 'uppercase' }}>RSI (14)</p>
              <p style={{ color: '#ffffff', fontSize: '18px', fontWeight: 700, margin: 0 }}>{technicalLevels.rsi14.toFixed(1)}</p>
              <p style={{ color: getRSIColor(technicalLevels.rsi14), fontSize: '8px', margin: '2px 0 0' }}>{getRSILabel(technicalLevels.rsi14)}</p>
            </div>
            
            <div style={{ background: 'rgba(255,255,255,0.05)', borderRadius: '8px', padding: '10px' }}>
              <p style={{ color: '#f59e0b', fontSize: '8px', margin: '0 0 2px', textTransform: 'uppercase' }}>20 DMA</p>
              <p style={{ color: '#ffffff', fontSize: '16px', fontWeight: 700, margin: 0 }}>{technicalLevels.dma20.toLocaleString()}</p>
              <p style={{ color: indices.dsex.value > technicalLevels.dma20 ? '#4ade80' : '#f87171', fontSize: '8px', margin: '2px 0 0' }}>
                {indices.dsex.value > technicalLevels.dma20 ? '▲' : '▼'} {(((indices.dsex.value - technicalLevels.dma20) / technicalLevels.dma20) * 100).toFixed(2)}%
              </p>
            </div>
            
            <div style={{ background: 'rgba(22, 163, 74, 0.1)', borderRadius: '8px', padding: '10px', borderLeft: '3px solid #16a34a' }}>
              <p style={{ color: '#4ade80', fontSize: '8px', margin: '0 0 2px', textTransform: 'uppercase' }}>Resistance</p>
              <p style={{ color: '#ffffff', fontSize: '16px', fontWeight: 700, margin: 0 }}>{technicalLevels.resistance.toLocaleString()}</p>
            </div>
            
            <div style={{ background: 'rgba(220, 38, 38, 0.1)', borderRadius: '8px', padding: '10px', borderLeft: '3px solid #dc2626' }}>
              <p style={{ color: '#f87171', fontSize: '8px', margin: '0 0 2px', textTransform: 'uppercase' }}>Support</p>
              <p style={{ color: '#ffffff', fontSize: '16px', fontWeight: 700, margin: 0 }}>{technicalLevels.support.toLocaleString()}</p>
            </div>
          </div>
        </div>

        {/* Other Indices */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px', marginBottom: '20px' }}>
          {[
            { label: 'DSES Index', data: indices.dses },
            { label: 'DS30 Index', data: indices.ds30 },
          ].map((item) => (
            <div key={item.label} style={{ background: '#f8fafc', borderRadius: '10px', padding: '14px', border: '1px solid #e2e8f0' }}>
              <p style={{ color: '#64748b', fontSize: '10px', margin: '0 0 4px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{item.label}</p>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', flexWrap: 'wrap' }}>
                <span style={{ color: '#0f172a', fontSize: '18px', fontWeight: 600 }}>
                  {item.data.value.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                </span>
                <span style={{ color: item.data.change >= 0 ? '#16a34a' : '#dc2626', fontSize: '12px' }}>
                  {item.data.change >= 0 ? '+' : ''}{item.data.change.toFixed(2)} ({item.data.change >= 0 ? '+' : ''}{item.data.changePercent.toFixed(2)}%)
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Market Summary */}
        <div style={{ background: '#f8fafc', borderRadius: '12px', padding: '16px', marginBottom: '20px', border: '1px solid #e2e8f0' }}>
          <h2 style={{ color: '#0f172a', fontSize: '12px', fontWeight: 600, margin: '0 0 12px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Market Summary</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '12px' }}>
            {[
              { label: 'Turnover', value: `BDT ${formatTurnoverRounded(marketSummary.totalValueMn)}M`, color: '#0f172a' },
              { label: 'Volume', value: formatVolume(marketSummary.totalVolume), color: '#0f172a' },
              { label: 'Advanced', value: marketSummary.issuesAdvanced, color: '#16a34a' },
              { label: 'Declined', value: marketSummary.issuesDeclined, color: '#dc2626' },
              { label: 'A/D Ratio', value: advanceDeclineRatio, color: '#dc2626' },
            ].map((item, i) => (
              <div key={i} style={{ textAlign: 'center' }}>
                <p style={{ color: '#64748b', fontSize: '9px', margin: '0 0 4px', textTransform: 'uppercase' }}>{item.label}</p>
                <p style={{ color: item.color, fontSize: '15px', fontWeight: 600, margin: 0 }}>{item.value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Market Commentary with Language Toggle */}
        <div style={{
          background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
          borderRadius: '12px',
          padding: '18px',
          marginBottom: '20px',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <h2 style={{ color: '#ffffff', fontSize: '12px', fontWeight: 600, margin: 0, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              Market Commentary
            </h2>
            <LanguageToggle isEnglish={mainCommentaryEnglish} onToggle={() => setMainCommentaryEnglish(!mainCommentaryEnglish)} />
          </div>
          <p style={{ 
            color: '#e2e8f0', 
            fontSize: '13px', 
            lineHeight: 1.7, 
            margin: 0,
            fontFamily: mainCommentaryEnglish ? 'system-ui, -apple-system, sans-serif' : "'Noto Sans Bengali', 'Hind Siliguri', system-ui, sans-serif",
          }}>
            {mainCommentaryEnglish ? commentary.en : commentary.bn}
          </p>
        </div>

        {/* Market Breadth Analysis */}
        <div style={{ background: '#f8fafc', borderRadius: '12px', padding: '16px', marginBottom: '20px', border: '1px solid #e2e8f0' }}>
          <h2 style={{ color: '#0f172a', fontSize: '12px', fontWeight: 600, margin: '0 0 12px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Market Breadth Analysis</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
            {[
              { data: marketBreadth.gainers, label: 'GAINERS', color: '#16a34a' },
              { data: marketBreadth.losers, label: 'LOSERS', color: '#dc2626' },
              { data: marketBreadth.unchanged, label: 'UNCHANGED', color: '#64748b' },
            ].map((item, i) => (
              <div key={i} style={{ background: '#ffffff', borderRadius: '10px', padding: '14px', borderLeft: `4px solid ${item.color}` }}>
                <p style={{ color: item.color, fontSize: '24px', fontWeight: 700, margin: '0 0 2px' }}>{item.data.percent.toFixed(1)}%</p>
                <p style={{ color: '#64748b', fontSize: '11px', margin: 0 }}>{item.data.count} {item.label.toLowerCase()}</p>
                <p style={{ color: item.color, fontSize: '10px', fontWeight: 600, margin: '2px 0 0', textTransform: 'uppercase' }}>{item.label}</p>
              </div>
            ))}
          </div>
          <DarkCommentary textEn={marketBreadth.commentary.en} textBn={marketBreadth.commentary.bn} />
        </div>

        {/* Category-wise Breadth */}
        <div style={{ background: '#f8fafc', borderRadius: '12px', padding: '16px', marginBottom: '20px', border: '1px solid #e2e8f0' }}>
          <h2 style={{ color: '#0f172a', fontSize: '12px', fontWeight: 600, margin: '0 0 12px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Category-wise Breadth</h2>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #e2e8f0' }}>
                <th style={{ textAlign: 'left', padding: '8px 6px', color: '#64748b', fontSize: '9px', textTransform: 'uppercase' }}>Category</th>
                <th style={{ textAlign: 'center', padding: '8px 6px', color: '#16a34a', fontSize: '9px', textTransform: 'uppercase' }}>Gainers</th>
                <th style={{ textAlign: 'center', padding: '8px 6px', color: '#dc2626', fontSize: '9px', textTransform: 'uppercase' }}>Losers</th>
                <th style={{ textAlign: 'center', padding: '8px 6px', color: '#64748b', fontSize: '9px', textTransform: 'uppercase' }}>Unchanged</th>
                <th style={{ textAlign: 'right', padding: '8px 6px', color: '#64748b', fontSize: '9px', textTransform: 'uppercase' }}>Turnover</th>
              </tr>
            </thead>
            <tbody>
              {activeCategories.map((cat, i) => (
                <tr key={i} style={{ borderBottom: '1px solid #e2e8f0' }}>
                  <td style={{ padding: '10px 6px' }}>
                    <span style={{
                      background: cat.category === 'A' ? '#dbeafe' : cat.category === 'B' ? '#fef3c7' : cat.category === 'N' ? '#d1fae5' : '#fee2e2',
                      color: cat.category === 'A' ? '#1e40af' : cat.category === 'B' ? '#92400e' : cat.category === 'N' ? '#065f46' : '#991b1b',
                      padding: '4px 10px',
                      borderRadius: '4px',
                      fontSize: '11px',
                      fontWeight: 600,
                    }}>
                      {cat.category}
                    </span>
                  </td>
                  <td style={{ padding: '10px 6px', textAlign: 'center', color: '#16a34a', fontSize: '12px', fontWeight: 600 }}>{cat.gainers}</td>
                  <td style={{ padding: '10px 6px', textAlign: 'center', color: '#dc2626', fontSize: '12px', fontWeight: 600 }}>{cat.losers}</td>
                  <td style={{ padding: '10px 6px', textAlign: 'center', color: '#64748b', fontSize: '12px' }}>{cat.unchanged}</td>
                  <td style={{ padding: '10px 6px', textAlign: 'right', color: '#0f172a', fontSize: '11px', fontWeight: 600 }}>BDT {formatTurnoverRounded(cat.turnoverMn)}M</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Circuit Breakers */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px', marginBottom: '20px' }}>
          <div style={{ background: '#f0fdf4', borderRadius: '10px', padding: '14px', border: '1px solid #bbf7d0' }}>
            <h3 style={{ color: '#16a34a', fontSize: '11px', fontWeight: 600, margin: '0 0 10px', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '6px' }}>
              Upper Circuit
              <span style={{ background: '#16a34a', color: '#fff', padding: '2px 6px', borderRadius: '4px', fontSize: '9px', marginLeft: 'auto' }}>
                {circuitBreakers.upperCount}
              </span>
            </h3>
            {circuitBreakers.upper.length > 0 ? circuitBreakers.upper.slice(0, 5).map((s, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '5px 0', borderBottom: i < Math.min(circuitBreakers.upper.length, 5) - 1 ? '1px solid #bbf7d0' : 'none' }}>
                <span style={{ color: '#0f172a', fontSize: '11px', fontWeight: 500 }}>{s.symbol}</span>
                <span style={{ color: '#16a34a', fontSize: '11px', fontWeight: 600 }}>+{s.change.toFixed(2)}%</span>
              </div>
            )) : (
              <p style={{ color: '#64748b', fontSize: '11px', fontStyle: 'italic', margin: 0 }}>None today</p>
            )}
          </div>

          <div style={{ background: '#fef2f2', borderRadius: '10px', padding: '14px', border: '1px solid #fecaca' }}>
            <h3 style={{ color: '#dc2626', fontSize: '11px', fontWeight: 600, margin: '0 0 10px', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '6px' }}>
              Lower Circuit
              <span style={{ background: '#dc2626', color: '#fff', padding: '2px 6px', borderRadius: '4px', fontSize: '9px', marginLeft: 'auto' }}>
                {circuitBreakers.lowerCount}
              </span>
            </h3>
            {circuitBreakers.lower.length > 0 ? circuitBreakers.lower.slice(0, 5).map((s, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '5px 0', borderBottom: i < Math.min(circuitBreakers.lower.length, 5) - 1 ? '1px solid #fecaca' : 'none' }}>
                <span style={{ color: '#0f172a', fontSize: '11px', fontWeight: 500 }}>{s.symbol}</span>
                <span style={{ color: '#dc2626', fontSize: '11px', fontWeight: 600 }}>{s.change.toFixed(2)}%</span>
              </div>
            )) : (
              <p style={{ color: '#64748b', fontSize: '11px', fontStyle: 'italic', margin: 0 }}>None today</p>
            )}
          </div>
        </div>

        {/* Volume Spike Alert */}
        <div style={{ background: '#fefce8', borderRadius: '12px', padding: '16px', marginBottom: '20px', border: '1px solid #fef08a' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <h2 style={{ color: '#854d0e', fontSize: '12px', fontWeight: 600, margin: 0, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              Volume Spike Alert
            </h2>
            <span style={{ background: '#eab308', color: '#ffffff', padding: '3px 8px', borderRadius: '4px', fontSize: '10px', fontWeight: 600 }}>
              {volumeSpikes.totalCount} stocks with ≥2x volume
            </span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '8px' }}>
            {volumeSpikes.top5.map((s, i) => (
              <div key={i} style={{ background: '#ffffff', borderRadius: '8px', padding: '10px', textAlign: 'center', border: '1px solid #fef08a' }}>
                <p style={{ color: '#0f172a', fontSize: '11px', fontWeight: 600, margin: '0 0 4px' }}>{s.symbol}</p>
                <p style={{ color: '#ca8a04', fontSize: '16px', fontWeight: 700, margin: '0 0 2px' }}>{s.spike >= 1000 ? (s.spike/1000).toFixed(1) + 'K' : s.spike.toFixed(1)}x</p>
                <p style={{ color: s.change >= 0 ? '#16a34a' : '#dc2626', fontSize: '10px', margin: 0 }}>
                  {s.change >= 0 ? '+' : ''}{s.change.toFixed(2)}%
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Sector Performance */}
        <div style={{ background: '#f8fafc', borderRadius: '12px', padding: '16px', marginBottom: '20px', border: '1px solid #e2e8f0' }}>
          <h2 style={{ color: '#0f172a', fontSize: '12px', fontWeight: 600, margin: '0 0 12px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Sector Performance (Top 5 by Value)</h2>
          <div>
            {sectorPerformance.map((s, i) => (
              <SectorBar key={i} sector={s.sector} valueMn={s.valueMn} percent={s.percent} maxPercent={maxSectorPercent} />
            ))}
          </div>
          <DarkCommentary textEn={sectorCommentary.en} textBn={sectorCommentary.bn} />
        </div>

        {/* Top Movers */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px', marginBottom: '20px' }}>
          <div style={{ background: '#f8fafc', borderRadius: '10px', padding: '14px', border: '1px solid #e2e8f0' }}>
            <h3 style={{ color: '#16a34a', fontSize: '11px', fontWeight: 600, margin: '0 0 10px', textTransform: 'uppercase' }}>Top Gainers</h3>
            {topGainers.map((s, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: i < 4 ? '1px solid #e2e8f0' : 'none' }}>
                <span style={{ color: '#0f172a', fontSize: '11px', fontWeight: 500 }}>{s.symbol}</span>
                <div style={{ display: 'flex', gap: '12px' }}>
                  <span style={{ color: '#64748b', fontSize: '11px' }}>BDT {s.close.toFixed(2)}</span>
                  <span style={{ color: '#16a34a', fontSize: '11px', minWidth: '50px', textAlign: 'right' }}>+{s.change.toFixed(2)}%</span>
                </div>
              </div>
            ))}
          </div>
          <div style={{ background: '#f8fafc', borderRadius: '10px', padding: '14px', border: '1px solid #e2e8f0' }}>
            <h3 style={{ color: '#dc2626', fontSize: '11px', fontWeight: 600, margin: '0 0 10px', textTransform: 'uppercase' }}>Top Losers</h3>
            {topLosers.map((s, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: i < 4 ? '1px solid #e2e8f0' : 'none' }}>
                <span style={{ color: '#0f172a', fontSize: '11px', fontWeight: 500 }}>{s.symbol}</span>
                <div style={{ display: 'flex', gap: '12px' }}>
                  <span style={{ color: '#64748b', fontSize: '11px' }}>BDT {s.close.toFixed(2)}</span>
                  <span style={{ color: '#dc2626', fontSize: '11px', minWidth: '50px', textAlign: 'right' }}>{s.change.toFixed(2)}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Value */}
        <div style={{ background: '#f8fafc', borderRadius: '12px', padding: '16px', marginBottom: '20px', border: '1px solid #e2e8f0' }}>
          <h2 style={{ color: '#0f172a', fontSize: '12px', fontWeight: 600, margin: '0 0 12px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Top Value (Top 10 by Turnover)</h2>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #e2e8f0' }}>
                <th style={{ textAlign: 'left', padding: '8px 6px', color: '#64748b', fontSize: '9px', textTransform: 'uppercase' }}>Rank</th>
                <th style={{ textAlign: 'left', padding: '8px 6px', color: '#64748b', fontSize: '9px', textTransform: 'uppercase' }}>Symbol</th>
                <th style={{ textAlign: 'right', padding: '8px 6px', color: '#64748b', fontSize: '9px', textTransform: 'uppercase' }}>Turnover</th>
                <th style={{ textAlign: 'right', padding: '8px 6px', color: '#64748b', fontSize: '9px', textTransform: 'uppercase' }}>Close (BDT)</th>
                <th style={{ textAlign: 'right', padding: '8px 6px', color: '#64748b', fontSize: '9px', textTransform: 'uppercase' }}>Change %</th>
              </tr>
            </thead>
            <tbody>
              {topValue.map((s, i) => (
                <tr key={i} style={{ borderBottom: '1px solid #e2e8f0' }}>
                  <td style={{ padding: '8px 6px', color: '#64748b', fontSize: '11px', fontWeight: 600 }}>{i + 1}</td>
                  <td style={{ padding: '8px 6px', color: '#0f172a', fontSize: '11px', fontWeight: 600 }}>{s.symbol}</td>
                  <td style={{ padding: '8px 6px', color: '#0f172a', fontSize: '11px', textAlign: 'right', fontWeight: 600 }}>BDT {s.valueMn.toFixed(2)}M</td>
                  <td style={{ padding: '8px 6px', color: '#0f172a', fontSize: '11px', textAlign: 'right' }}>{s.close.toFixed(2)}</td>
                  <td style={{ padding: '8px 6px', fontSize: '11px', textAlign: 'right', fontWeight: 600, color: s.change > 0 ? '#16a34a' : s.change < 0 ? '#dc2626' : '#64748b' }}>
                    {s.change > 0 ? '+' : ''}{s.change.toFixed(2)}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Block Market */}
        {blockMarket.top5.length > 0 && (
          <div style={{ background: '#f8fafc', borderRadius: '12px', padding: '16px', marginBottom: '20px', border: '1px solid #e2e8f0' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px', flexWrap: 'wrap', gap: '8px' }}>
              <h2 style={{ color: '#0f172a', fontSize: '12px', fontWeight: 600, margin: 0, textTransform: 'uppercase' }}>Block Market (Top 5 by Value)</h2>
              <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                <span style={{ color: '#64748b', fontSize: '10px' }}>Trades: <strong style={{ color: '#0f172a' }}>{blockMarket.summary.totalTrades}</strong></span>
                <span style={{ color: '#64748b', fontSize: '10px' }}>Scrips: <strong style={{ color: '#0f172a' }}>{blockMarket.summary.totalScrips}</strong></span>
                <span style={{ color: '#64748b', fontSize: '10px' }}>Total: <strong style={{ color: '#0f172a' }}>BDT {formatTurnoverRounded(blockMarket.summary.totalValueMn)}M</strong></span>
              </div>
            </div>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid #e2e8f0' }}>
                  <th style={{ textAlign: 'left', padding: '8px 6px', color: '#64748b', fontSize: '9px', textTransform: 'uppercase' }}>Rank</th>
                  <th style={{ textAlign: 'left', padding: '8px 6px', color: '#64748b', fontSize: '9px', textTransform: 'uppercase' }}>Symbol</th>
                  <th style={{ textAlign: 'right', padding: '8px 6px', color: '#64748b', fontSize: '9px', textTransform: 'uppercase' }}>Qty</th>
                  <th style={{ textAlign: 'right', padding: '8px 6px', color: '#64748b', fontSize: '9px', textTransform: 'uppercase' }}>Price (BDT)</th>
                  <th style={{ textAlign: 'right', padding: '8px 6px', color: '#64748b', fontSize: '9px', textTransform: 'uppercase' }}>Value (BDT M)</th>
                </tr>
              </thead>
              <tbody>
                {blockMarket.top5.map((tx, i) => (
                  <tr key={i} style={{ borderBottom: '1px solid #e2e8f0' }}>
                    <td style={{ padding: '10px 6px', color: '#64748b', fontSize: '11px', fontWeight: 600 }}>{i + 1}</td>
                    <td style={{ padding: '10px 6px', color: '#0f172a', fontSize: '11px', fontWeight: 600 }}>{tx.symbol}</td>
                    <td style={{ padding: '10px 6px', color: '#0f172a', fontSize: '11px', textAlign: 'right' }}>{formatNumber(tx.quantity)}</td>
                    <td style={{ padding: '10px 6px', color: '#0f172a', fontSize: '11px', textAlign: 'right' }}>{tx.price.toFixed(2)}</td>
                    <td style={{ padding: '10px 6px', color: '#0f172a', fontSize: '11px', textAlign: 'right', fontWeight: 600 }}>{tx.valueMn.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Footer */}
        <div style={{ textAlign: 'center', marginTop: '20px', paddingTop: '14px', borderTop: '1px solid #e2e8f0' }}>
          <p style={{ color: '#0f172a', fontSize: '10px', fontWeight: 600, margin: '0 0 4px' }}>
            MIDWAY SECURITIES LTD – Daily Market Analysis Report
          </p>
          <p style={{ color: '#64748b', fontSize: '9px', margin: 0 }}>
            Source: DSE, etc. | This report is prepared for informational purposes and does not constitute investment advice.
          </p>
        </div>
      </div>
    </div>
  );
}
