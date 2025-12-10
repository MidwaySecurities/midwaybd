/*
================================================================================
  DSE MARKET ANALYSIS - Official Market Report Template
================================================================================
  Version: 1.9
  Client: Midway Securities Ltd.
  Report Date: December 8, 2025
  
  MARKET DATA: End of Day - December 8, 2025
  
  STRONG REVERSAL: Broke 4-session losing streak with conviction
  Both breadth AND volume surged - institutions returned

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
  
  date: 'December 8, 2025',
  
  indices: {
    dsex: {
      value: 4906.29,
      change: 33.65,
      changePercent: 0.69,
      high: 4925.83,
      low: 4874.75,
      open: 4872.64,
      previousClose: 4872.64,
    },
    dses: {
      value: 1027.53,
      change: 6.63,
      changePercent: 0.65,
    },
    ds30: {
      value: 1892.95,
      change: 6.83,
      changePercent: 0.36,
    },
  },
  
  technicalLevels: {
    dma20: 4959.80,
    dma50: 5128.30,
    dma200: 5120.60,
    rsi14: 45.20,
    support: 4702.69,
    resistance: 5197.27,
    week52High: 5636.15,
    week52Low: 4615.41,
  },
  
  ytdPerformance: {
    startValue: 5218.16,
    currentValue: 4906.29,
    returnPercent: -5.98,
  },
  
  historicalData: [
    { date: 'Oct 30', value: 5122.22 },
    { date: 'Nov 2', value: 5115.88 },
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
  ],
  
  marketSummary: {
    totalVolume: 135257653,
    totalValueMn: 3646.50,
    issuesAdvanced: 287,
    issuesDeclined: 53,
    issuesUnchanged: 51,
  },
  
  marketBreadth: {
    gainers: { count: 275, percent: 72.4 },
    losers: { count: 55, percent: 14.5 },
    unchanged: { count: 50, percent: 13.2 },
    commentary: {
      en: "Market breadth exploded to its strongest reading in weeks. Gainers surged from 28.4% (Sunday) to 72.4% while losers collapsed from 52.6% to 14.5%. The A/D ratio skyrocketed from 0.54:1 to 5.00:1 (275 advancing vs 55 declining) - a decisive shift from bearish to bullish territory. All categories participated: Category A showed 140 gainers vs 20 losers (7:1 ratio), Category B had 68 gainers vs 7 losers (9.7:1 ratio), and even Category Z turned bullish with 61 gainers vs 19 losers (3.2:1 ratio). Circuit breakers reflected the strength: 2 upper circuits (RAHIMAFOOD +10%, ZEALBANGLA +9.98%) and zero lower circuits. Critically, this breadth explosion came with strong volume confirmation - turnover surged 36.3% to BDT 3,646M and volume jumped 34.4% to 135.3M. This is the opposite of Sunday's low-volume bounce. Institutions returned, and retail followed. This is conviction buying.",
      bn: "Market breadth সপ্তাহের সবচেয়ে শক্তিশালী reading-এ পৌঁছেছে। Gainer শুক্রবারের 28.4% থেকে 72.4%-এ বেড়েছে আর loser 52.6% থেকে 14.5%-এ কমেছে। A/D ratio 0.54:1 থেকে লাফিয়ে 5.00:1 হয়েছে (275টি বাড়া বনাম 55টি কমা) - bearish থেকে bullish territory-তে decisive shift। সব category অংশ নিয়েছে: Category A-তে 140টি gainer বনাম 20টি loser (7:1 ratio), Category B-তে 68টি gainer বনাম 7টি loser (9.7:1 ratio), এমনকি Category Z bullish হয়েছে 61টি gainer বনাম 19টি loser (3.2:1 ratio) নিয়ে। Circuit breaker শক্তি প্রতিফলিত করেছে: 2টি upper circuit (RAHIMAFOOD +10%, ZEALBANGLA +9.98%) এবং শূন্য lower circuit। গুরুত্বপূর্ণভাবে, এই breadth explosion শক্তিশালী volume confirmation সহ এসেছে - turnover 36.3% বেড়ে BDT 3,646M হয়েছে এবং volume 34.4% বেড়ে 135.3M হয়েছে। এটা শুক্রবারের low-volume bounce-এর উল্টো। Institution ফিরেছে, এবং retail অনুসরণ করেছে। এটা conviction buying।"
    },
  },
  
  categoryBreadth: [
    { category: 'A', gainers: 140, losers: 20, unchanged: 0, turnoverMn: 2097.52 },
    { category: 'B', gainers: 68, losers: 7, unchanged: 0, turnoverMn: 1215.13 },
    { category: 'N', gainers: 0, losers: 0, unchanged: 0, turnoverMn: 0 },
    { category: 'Z', gainers: 61, losers: 19, unchanged: 0, turnoverMn: 161.73 },
  ],
  
  circuitBreakers: {
    upper: [
      { symbol: 'RAHIMAFOOD', close: 138.60, change: 10.00 },
      { symbol: 'ZEALBANGLA', close: 159.80, change: 9.98 },
    ],
    upperCount: 2,
    lower: [],
    lowerCount: 0,
  },
  
  volumeSpikes: {
    totalCount: 106,
    top5: [
      { symbol: 'TAKAFULINS', volume: 84510000, prevVolume: 100, spike: 845.1, close: 34.20, change: -1.74 },
      { symbol: 'ORYZAAGRO', volume: 59690000, prevVolume: 100, spike: 596.9, close: 7.80, change: 5.48 },
      { symbol: 'CRAFTSMAN', volume: 16800, prevVolume: 100, spike: 168.0, close: 26.50, change: -7.89 },
      { symbol: 'MASTERAGRO', volume: 11470000, prevVolume: 100, spike: 114.7, close: 4.20, change: 0.00 },
      { symbol: 'APEXWEAV', volume: 4200, prevVolume: 100, spike: 42.0, close: 5.10, change: 0.00 },
    ],
  },
  
  sectorPerformance: [
    { sector: 'Pharma & Chemicals', valueMn: 707.15, percent: 20.29 },
    { sector: 'Textile', valueMn: 545.85, percent: 15.66 },
    { sector: 'Engineering', valueMn: 386.79, percent: 11.10 },
    { sector: 'Food and Allied', valueMn: 378.35, percent: 10.85 },
    { sector: 'Fuel and Power', valueMn: 299.73, percent: 8.60 },
  ],
  
  sectorCommentary: {
    en: "Pharma surged back to leadership with BDT 707M (20.29%, +103% vs Sunday), showing institutions favoring defensive quality names. ASIATICCLAB dominated the sector with BDT 197M turnover (+8.12%). Textile held second place at BDT 546M (15.66%, +70% vs Sunday) as SIMTEX stabilized at BDT 197M (+0.84%). Engineering fell to third at BDT 387M (11.10%, +3% vs Sunday), maintaining steady participation. Food & Allied was fourth at BDT 378M (10.85%, +35% vs Sunday) despite BDTHAIFOOD plunging 7.32%. The rotation into Pharma and away from Sunday's panic stocks (SIMTEX, BDTHAIFOOD) signals a flight to quality. This sector distribution is healthier and more sustainable than last week's concentration.",
    bn: "Pharma leadership-এ ফিরে এসেছে BDT 707M (20.29%, শুক্রবার থেকে +103%) নিয়ে, দেখাচ্ছে institution defensive quality name পছন্দ করছে। ASIATICCLAB sector-এ আধিপত্য করেছে BDT 197M turnover নিয়ে (+8.12%)। Textile দ্বিতীয় স্থানে থেকেছে BDT 546M (15.66%, শুক্রবার থেকে +70%) নিয়ে কারণ SIMTEX স্থিতিশীল হয়েছে BDT 197M-এ (+0.84%)। Engineering তৃতীয় স্থানে নেমেছে BDT 387M (11.10%, শুক্রবার থেকে +3%) নিয়ে, steady participation বজায় রেখে। Food & Allied চতুর্থ ছিল BDT 378M (10.85%, শুক্রবার থেকে +35%) নিয়ে যদিও BDTHAIFOOD 7.32% পড়েছে। Pharma-তে rotation এবং শুক্রবারের panic stock (SIMTEX, BDTHAIFOOD) থেকে সরে যাওয়া flight to quality signal করছে। এই sector distribution গত সপ্তাহের concentration থেকে স্বাস্থ্যকর এবং আরও টেকসই।"
  },
  
  intradayData: [
    { time: '10:00', value: 4900 },
    { time: '10:05', value: 4915 },
    { time: '10:10', value: 4928 },
    { time: '10:15', value: 4925 },
    { time: '10:20', value: 4918 },
    { time: '10:25', value: 4920 },
    { time: '10:30', value: 4926 },
    { time: '10:35', value: 4925 },
    { time: '10:40', value: 4923 },
    { time: '10:45', value: 4926 },
    { time: '10:50', value: 4924 },
    { time: '10:55', value: 4922 },
    { time: '11:00', value: 4921 },
    { time: '11:10', value: 4922 },
    { time: '11:20', value: 4923 },
    { time: '11:30', value: 4924 },
    { time: '11:40', value: 4923 },
    { time: '11:50', value: 4922 },
    { time: '12:00', value: 4920 },
    { time: '12:10', value: 4918 },
    { time: '12:20', value: 4915 },
    { time: '12:30', value: 4912 },
    { time: '12:40', value: 4910 },
    { time: '12:50', value: 4907 },
    { time: '13:00', value: 4905 },
    { time: '13:10', value: 4903 },
    { time: '13:20', value: 4901 },
    { time: '13:30', value: 4900 },
    { time: '13:40', value: 4903 },
    { time: '13:50', value: 4907 },
    { time: '14:00', value: 4912 },
    { time: '14:10', value: 4910 },
    { time: '14:20', value: 4908 },
    { time: '14:30', value: 4906.29 },
  ],
  
  topGainers: [
    { symbol: 'RAHIMAFOOD', close: 138.60, change: 10.00 },
    { symbol: 'ZEALBANGLA', close: 159.80, change: 9.98 },
    { symbol: 'MEGHNAPET', close: 22.40, change: 9.80 },
    { symbol: 'INTECH', close: 28.20, change: 9.73 },
    { symbol: 'HIMADRI', close: 680.00, change: 8.78 },
  ],
  
  topLosers: [
    { symbol: 'WONDERTOYS', close: 17.60, change: -9.74 },
    { symbol: 'FASFIN', close: 0.74, change: -8.64 },
    { symbol: 'FAMILYTEX', close: 1.10, change: -8.33 },
    { symbol: 'CRAFTSMAN', close: 26.50, change: -7.89 },
    { symbol: 'BDTHAIFOOD', close: 15.20, change: -7.32 },
  ],
  
  topValue: [
    { symbol: 'ORIONINFU', valueMn: 232.78, close: 391.50, change: 3.41 },
    { symbol: 'ASIATICCLAB', valueMn: 196.69, close: 54.60, change: 8.12 },
    { symbol: 'SIMTEX', valueMn: 196.53, close: 24.00, change: 0.84 },
    { symbol: 'KBPPWBIL', valueMn: 134.97, close: 53.80, change: -2.00 },
    { symbol: 'DOMINAGE', valueMn: 117.00, close: 26.80, change: 2.29 },
    { symbol: 'ACMEPL', valueMn: 115.93, close: 17.90, change: 4.68 },
    { symbol: 'BDTHAIFOOD', valueMn: 115.75, close: 15.20, change: -7.32 },
    { symbol: 'MONNOFABR', valueMn: 77.40, close: 21.00, change: 4.48 },
    { symbol: 'FINEFOODS', valueMn: 68.61, close: 341.70, change: 1.21 },
    { symbol: 'MPETROLEUM', valueMn: 64.19, close: 210.00, change: -1.13 },
  ],
  
  blockMarket: {
    summary: {
      totalTrades: 56,
      totalScrips: 22,
      totalValueMn: 125.26,
    },
    top5: [
      { symbol: 'FINEFOODS', quantity: 135020, price: 330.00, valueMn: 44.53 },
      { symbol: 'DOMINAGE', quantity: 664902, price: 25.24, valueMn: 16.79 },
      { symbol: 'ASIATICCLAB', quantity: 387990, price: 50.50, valueMn: 19.74 },
      { symbol: 'SHYAMPSUG', quantity: 39686, price: 192.10, valueMn: 7.69 },
      { symbol: 'SIMTEX', quantity: 244111, price: 25.59, valueMn: 6.25 },
    ],
  },
  
  commentary: {
    en: `The DSEX delivered a decisive reversal, surging 33.65 points (+0.69%) to close at 4,906.29, breaking a four-session losing streak. This was not Sunday's low-volume bounce - both breadth and liquidity exploded in tandem. The market opened around 4,900 and rallied sharply in the first 20 minutes to reach an intraday high of 4,928. The index held elevated levels around 4,920-4,925 until 11:00 AM, then began a gradual, orderly decline throughout the afternoon session, touching the session low of 4,900 by 1:30 PM. Late buying in the final hour supported a modest recovery to close at 4,906. Market breadth showed institutional conviction: gainers surged to 72.4% (vs 28.4% Sunday) while the A/D ratio rocketed from 0.54:1 to 5.00:1 (275 vs 55). Critically, turnover jumped 36.3% to BDT 3,646M and volume surged 34.4% to 135.3M - institutions returned after sitting out Sunday's bounce. All categories participated: Category A had a 7:1 gainer-to-loser ratio, Category B showed 9.7:1, and Category Z turned bullish at 3.2:1. Circuit breakers flipped positive with 2 upper circuits and zero lower circuits. Pharma surged to leadership with BDT 707M (20.29%, +103% vs Sunday) as ASIATICCLAB dominated with BDT 197M turnover. The index now sits just 54 points below the 20 DMA (4,960) and 204 points above critical November 13 support (4,703). RSI improved to 45.2, moving away from oversold. The reversal from Thursday's panic (8.9% gainers, 78.8% losers) to today's strength (72.4% gainers, 14.5% losers) marks a potential trend shift. A break above 4,960 (20 DMA) would target 5,000-5,050.`,
    bn: `DSEX decisive reversal দিয়েছে, 33.65 পয়েন্ট (+0.69%) বেড়ে 4,906.29-এ বন্ধ হয়েছে, চার-session-এর losing streak ভেঙে। এটা রবিবারের low-volume bounce ছিল না - breadth এবং liquidity একসাথে বিস্ফোরিত হয়েছে। বাজার প্রায় 4,900-এ খুলেছে এবং প্রথম 20 মিনিটে দ্রুত rally করে 4,928 intraday high স্পর্শ করেছে। Index 11:00 AM পর্যন্ত 4,920-4,925 এর উচ্চ level-এ ছিল, তারপর বিকেলের session জুড়ে ধীরে ধীরে, সুশৃঙ্খলভাবে decline করে 1:30 PM-এ 4,900 session low স্পর্শ করেছে। শেষ ঘন্টায় late buying একটি সামান্য recovery support করে 4,906-এ বন্ধ হয়েছে। Market breadth institutional conviction দেখিয়েছে: gainer 72.4%-এ বেড়েছে (রবিবার 28.4% ছিল) আর A/D ratio 0.54:1 থেকে 5.00:1-এ (275 বনাম 55) rocket করেছে। গুরুত্বপূর্ণভাবে, turnover 36.3% বেড়ে BDT 3,646M হয়েছে এবং volume 34.4% বেড়ে 135.3M হয়েছে - institution রবিবারের bounce বসে থাকার পর ফিরেছে। সব category অংশ নিয়েছে: Category A-তে 7:1 gainer-to-loser ratio ছিল, Category B দেখিয়েছে 9.7:1, এবং Category Z bullish হয়েছে 3.2:1-এ। Circuit breaker positive flip করেছে 2টি upper circuit এবং শূন্য lower circuit নিয়ে। Pharma leadership-এ surge করেছে BDT 707M (20.29%, রবিবার থেকে +103%) নিয়ে কারণ ASIATICCLAB আধিপত্য করেছে BDT 197M turnover নিয়ে। Index এখন 20 DMA (4,960) থেকে মাত্র 54 পয়েন্ট নিচে এবং critical November 13 support (4,703) থেকে 204 পয়েন্ট উপরে। RSI 45.2-এ উন্নত হয়েছে, oversold থেকে সরে গেছে। বৃহস্পতিবারের panic (8.9% gainer, 78.8% loser) থেকে আজকের strength (72.4% gainer, 14.5% loser)-এ reversal একটি সম্ভাব্য trend shift চিহ্নিত করে। 4,960 (20 DMA) উপরে break 5,000-5,050 target করবে।`
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
        border: '1px solid rgba(34, 197, 94, 0.3)',
        borderRadius: '8px',
        padding: '12px 16px',
        boxShadow: '0 10px 40px rgba(0, 0, 0, 0.1)',
      }}>
        <p style={{ color: '#64748b', fontSize: '12px', margin: 0 }}>{label}</p>
        <p style={{ color: '#16a34a', fontSize: '18px', fontWeight: 600, margin: '4px 0 0' }}>
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
            background: 'linear-gradient(90deg, #16a34a 0%, #22c55e 100%)',
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
              { label: 'A/D Ratio', value: advanceDeclineRatio, color: '#16a34a' },
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
