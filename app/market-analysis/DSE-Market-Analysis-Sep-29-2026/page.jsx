'use client';

/*
================================================================================
  DSE MARKET ANALYSIS — End of Day Report
================================================================================
  Template Version: v3.0
  Client: Midway Securities Ltd.

  VERSION HISTORY (structural changes)
  v2.0  Modern redesign: hero intraday chart, KPI strip, EN/BN commentary,
        breadth, sectors, movers, turnover leaders, circuits, spikes, block
  v2.1  Lakh/crore units; minute-by-minute calibrated intraday trace;
        client-type statistics; 30-session technical panel (20-DMA, RSI);
        prices on closing-price (CP) basis; DSE snippet data
  v2.2  Client type simplified to one table; sector layout restored
  v2.3  Brand colour #004990 on header eyebrow; Noto Sans Bengali font;
        footer sources line; visible version tag in footer
  v2.4  Client-flow trend chart (net retail / institution / foreign, last
        16 sessions) inside the client-type card; clientFlowHistory data
  v2.5  Template made fully data-driven: commentary headline, intraday and
        history axis ranges, technical-tile labels, flow-chart note; KPI
        tiles show '—' when DSE snippet values (M.cap, P/E) are unavailable
  v2.6  Client-type net figures shown plainly as calculated; flow-chart bars
        are faded only when a row carries a `flag` (likely material divergence)
  v2.7  Circuit Breakers card removed (covered by Top Gainers/Losers); Volume
        Spikes rebuilt as a full-width dark panel: summary line + six cards
        (multiple, change, turnover, sector, UC/LC badge)
  v2.8  Sector Turnover rows show taka turnover and advancers/decliners only
        (market-share % removed from the rows; still used in commentary)
  v2.9  Mobile-first pass: KPI tiles swipe sideways on phones; Market P/E
        moved to 2nd tile; Sector Turnover Top 5 + Show All; on phones,
        Turnover Leaders Top 5 + Show All (no bars) and Volume Spikes
        Top 3 + Show All (desktop unchanged)
  v3.0  Mobile-first rebuild for the Next.js website (320px and up): phone
        layout is the base, tablet (640px) and desktop (1024px) add columns;
        'use client' component with no chart library (SVG charts, tap/drag or
        arrow keys to read values); wide tables become lists on phones; DSEX
        30-session chart split into price + turnover panels (no dual axis);
        client-flow colours re-validated for colour-blind readers; tap
        targets ≥ 40px; all CSS scoped under .msr (safe with Tailwind)
  Report Date: September 29, 2026 (Tuesday)

  MARKET DATA: End of Day - September 29, 2026

  DSEX −1.49 (−0.03%) to 5,524.37 — fourth straight decline and fourth close
  at the day's low; breadth 142 : 178; turnover ৳634.52 cr (−15.0%).
  Textile leads (SAIHAMTEX, SAIHAMCOT); institutions net sellers (3rd day).

  Sources: AmarStock CSV (DSEX OHLC, stock data), DSE Daily Market Snippet
  (breadth, M.cap, P/E, sectors, client type, category turnover), DSE website
  (intraday chart), DSE block report CSV, DSEX history (project EOD file).
  Money in crore (1 crore = 10 mn); volumes in lakh/crore shares.
================================================================================
*/

import React, { useState, useEffect, useRef, useId } from 'react';

// ╔════════════════════════════════════════════════════════════════════════════╗
// ║                              DAILY DATA INPUT                              ║
// ╚════════════════════════════════════════════════════════════════════════════╝

const DAILY_DATA = {

  date: 'September 29, 2026 (Tuesday)',

  indices: {
    dsex: {
      value: 5524.36722,
      change: -1.49,   // DSE basis: rounded close − rounded prev close
      changePercent: -0.03,
      high: 5557.11499,
      low: 5524.36722,
      open: 5525.86270,
      previousClose: 5525.86270,
    },
    dses: { value: 1098.04, change: -2.14, changePercent: -0.19 },
    ds30: { value: 2094.68, change: -3.26, changePercent: -0.16 },
  },

  technicalLevels: {
    dma20: 5538.88,
    rsi14: 48.8,
    support: 5494.07,
    supportLabel: "Sep 16 close",
    resistance: 5557.11,
    resistanceLabel: "Sep 29 intraday high",
    low30: 5379.00,
    low30Label: "Sep 14",
    high30: 5786.08,
    recoveryFromLowPct: 2.70,
  },

  historicalData: [
    { date: 'Aug 18', value: 5773.63, dma20: null, valueMn: 9981.09 },
    { date: 'Aug 19', value: 5769.71, dma20: null, valueMn: 7328.32 },
    { date: 'Aug 20', value: 5786.08, dma20: null, valueMn: 6719.89 },
    { date: 'Aug 23', value: 5722.21, dma20: null, valueMn: 7111.50 },
    { date: 'Aug 24', value: 5643.57, dma20: null, valueMn: 6019.73 },
    { date: 'Aug 25', value: 5640.09, dma20: null, valueMn: 5067.18 },
    { date: 'Aug 27', value: 5655.68, dma20: null, valueMn: 4670.15 },
    { date: 'Aug 30', value: 5614.29, dma20: null, valueMn: 5180.31 },
    { date: 'Aug 31', value: 5598.08, dma20: null, valueMn: 4772.47 },
    { date: 'Sep 1', value: 5637.30, dma20: null, valueMn: 5968.23 },
    { date: 'Sep 2', value: 5660.41, dma20: null, valueMn: 7310.74 },
    { date: 'Sep 3', value: 5662.09, dma20: null, valueMn: 7209.21 },
    { date: 'Sep 6', value: 5558.45, dma20: null, valueMn: 5452.77 },
    { date: 'Sep 7', value: 5567.42, dma20: null, valueMn: 5713.25 },
    { date: 'Sep 8', value: 5539.32, dma20: null, valueMn: 5904.38 },
    { date: 'Sep 9', value: 5537.88, dma20: null, valueMn: 5197.78 },
    { date: 'Sep 10', value: 5515.17, dma20: null, valueMn: 5444.26 },
    { date: 'Sep 13', value: 5418.55, dma20: null, valueMn: 5713.18 },
    { date: 'Sep 14', value: 5379.00, dma20: null, valueMn: 4865.53 },
    { date: 'Sep 15', value: 5472.46, dma20: 5607.57, valueMn: 5048.69 },
    { date: 'Sep 16', value: 5494.07, dma20: 5593.59, valueMn: 5562.09 },
    { date: 'Sep 17', value: 5532.15, dma20: 5581.71, valueMn: 6554.26 },
    { date: 'Sep 20', value: 5592.21, dma20: 5572.02, valueMn: 7473.82 },
    { date: 'Sep 21', value: 5550.50, dma20: 5563.43, valueMn: 7887.06 },
    { date: 'Sep 22', value: 5540.32, dma20: 5558.27, valueMn: 7914.88 },
    { date: 'Sep 23', value: 5596.22, dma20: 5556.08, valueMn: 8446.97 },
    { date: 'Sep 24', value: 5578.33, dma20: 5552.21, valueMn: 7563.16 },
    { date: 'Sep 27', value: 5532.75, dma20: 5548.13, valueMn: 7274.03 },
    { date: 'Sep 28', value: 5525.86, dma20: 5544.52, valueMn: 7464.69 },
    { date: 'Sep 29', value: 5524.37, dma20: 5538.88, valueMn: 6345.24 },
  ],

  marketSummary: {
    totalTrades: 172615,
    totalVolume: 208386790,
    totalValueMn: 6345.238,
    issuesAdvanced: 142,
    issuesDeclined: 178,
    issuesUnchanged: 75,
    prevTrades: 195699,
    prevVolume: 234770459,
    prevValueMn: 7464.688,
    marketCapMn: 6851893,
    prevMarketCapMn: 6875358.000,
    marketCapUsdMn: 55774,
    pe: 8.79,
    prevPe: 8.8,
    normalValueMn: 5751.64,
    blockValueMn: 583.847,
    smeValueMn: 66.21,
  },

  marketBreadth: {
    gainers: { count: 142, percent: 35.9 },
    losers: { count: 178, percent: 45.1 },
    unchanged: { count: 75, percent: 19.0 },
  },

  clientType: [
    { type: 'Retail', buyPct: 85.12, sellPct: 84.06, totalPct: 84.59 },
    { type: 'Institution', buyPct: 9.24, sellPct: 10.55, totalPct: 9.90 },
    { type: 'Foreign', buyPct: 2.73, sellPct: 2.82, totalPct: 2.77 },
    { type: 'Dealer', buyPct: 1.43, sellPct: 1.20, totalPct: 1.31 },
    { type: 'Others', buyPct: 1.48, sellPct: 1.37, totalPct: 1.43 },
  ],

  clientFlowNote: "Sources: DSE Trade Participants report (to Sep 21) and DSE Daily Market Snippet (Sep 23 onward). Sep 22 not available.",

  clientFlowHistory: [   // net buy (+) / sell (−), BDT mn. Optional per-row flag: '<reason>' fades a bar when its figure may diverge materially
    { date: 'Sep 7', retail: -19, institution: 39, foreign: -61, dealer: 41 },
    { date: 'Sep 8', retail: 80, institution: 24, foreign: -85, dealer: -11 },
    { date: 'Sep 9', retail: 29, institution: 3, foreign: -6, dealer: -45 },
    { date: 'Sep 10', retail: 119, institution: -134, foreign: -7, dealer: -14 },
    { date: 'Sep 13', retail: -10, institution: 61, foreign: 0, dealer: -52 },
    { date: 'Sep 14', retail: 89, institution: -120, foreign: 2, dealer: 31 },
    { date: 'Sep 15', retail: 201, institution: -177, foreign: -35, dealer: -3 },
    { date: 'Sep 16', retail: 41, institution: -117, foreign: 30, dealer: 42 },
    { date: 'Sep 17', retail: 253, institution: -216, foreign: -33, dealer: -12 },
    { date: 'Sep 20', retail: 426, institution: -419, foreign: -24, dealer: 22 },
    { date: 'Sep 21', retail: 362, institution: -404, foreign: 2, dealer: 23 },
    { date: 'Sep 23', retail: -197.64, institution: 42.86, foreign: -34.13, dealer: 151.6 },
    { date: 'Sep 24', retail: -64.67, institution: 152.55, foreign: -119.51, dealer: 41.48 },
    { date: 'Sep 27', retail: 115.3, institution: -194.7, foreign: -5.52, dealer: 71.81 },
    { date: 'Sep 28', retail: 56.32, institution: -52.8, foreign: -56.32, dealer: 50.68 },
    { date: 'Sep 29', retail: 60.967, institution: -75.346, foreign: -5.176, dealer: 13.229 },
  ],

  categoryBreadth: [
    { category: 'A', gainers: 49, losers: 105, unchanged: 36, turnoverMn: 3912.71 },
    { category: 'B', gainers: 40, losers: 23, unchanged: 11, turnoverMn: 1656.74 },
    { category: 'Z', gainers: 49, losers: 39, unchanged: 29, turnoverMn: 182.18 },
  ],

  volumeSpikes: {
    totalCount: 32,
    up: 17,
    down: 11,
    unchanged: 4,
    turnoverMn: 359.54,
    sharePct: 6.251,
    top: [
      { symbol: 'MATINSPINN', sector: "Textile", spike: 4.158, change: 4.60, valueMn: 54.50, circuit: null },
      { symbol: 'GREENDELT', sector: "Gen. Insurance", spike: 3.867, change: 2.27, valueMn: 35.85, circuit: null },
      { symbol: 'UNIQUEHRL', sector: "Travel & Leisure", spike: 3.615, change: 3.61, valueMn: 23.53, circuit: null },
      { symbol: 'NAHEEACP', sector: "Engineering", spike: 3.562, change: 4.49, valueMn: 36.05, circuit: null },
      { symbol: 'FINEFOODS', sector: "Food & Allied", spike: 2.914, change: 0.92, valueMn: 23.33, circuit: null },
      { symbol: 'SHASHADNIM', sector: "Textile", spike: 2.745, change: 2.67, valueMn: 22.54, circuit: null },
    ],
  },

  sectorPerformance: [
    { sector: "Textile", valueMn: 1658.05, prevValueMn: 1952.03, changePct: -15.06, percent: 28.83, adv: 33, dec: 12 },
    { sector: "Gen. Insurance", valueMn: 1045.41, prevValueMn: 1573.31, changePct: -33.55, percent: 18.18, adv: 15, dec: 24 },
    { sector: "Pharma & Chemicals", valueMn: 608.13, prevValueMn: 676.99, changePct: -10.17, percent: 10.57, adv: 7, dec: 21 },
    { sector: "Mutual Funds", valueMn: 458.43, prevValueMn: 555.89, changePct: -17.53, percent: 7.97, adv: 3, dec: 17 },
    { sector: "Banks", valueMn: 346.92, prevValueMn: 455.99, changePct: -23.92, percent: 6.03, adv: 6, dec: 8 },
    { sector: "Engineering", valueMn: 319.46, prevValueMn: 365.55, changePct: -12.61, percent: 5.55, adv: 16, dec: 17 },
    { sector: "Financial Institutions", valueMn: 253.63, prevValueMn: 225.66, changePct: 12.39, percent: 4.41, adv: 7, dec: 9 },
    { sector: "Life Insurance", valueMn: 170.18, prevValueMn: 186.42, changePct: -8.71, percent: 2.96, adv: 2, dec: 10 },
  ],

  intradayData: [
    { time: '10:00', value: 5525.86 },
    { time: '10:01', value: 5537.98 },
    { time: '10:02', value: 5541.87 },
    { time: '10:03', value: 5544.16 },
    { time: '10:04', value: 5547.59 },
    { time: '10:05', value: 5550.11 },
    { time: '10:06', value: 5551.26 },
    { time: '10:07', value: 5551.26 },
    { time: '10:08', value: 5550.68 },
    { time: '10:09', value: 5551.48 },
    { time: '10:10', value: 5551.83 },
    { time: '10:11', value: 5551.48 },
    { time: '10:12', value: 5550.68 },
    { time: '10:13', value: 5549.77 },
    { time: '10:14', value: 5550.34 },
    { time: '10:15', value: 5550.11 },
    { time: '10:16', value: 5548.85 },
    { time: '10:17', value: 5549.42 },
    { time: '10:18', value: 5550.34 },
    { time: '10:19', value: 5550.11 },
    { time: '10:20', value: 5551.26 },
    { time: '10:21', value: 5552.97 },
    { time: '10:22', value: 5553.43 },
    { time: '10:23', value: 5553.66 },
    { time: '10:24', value: 5554.23 },
    { time: '10:25', value: 5554.8 },
    { time: '10:26', value: 5557.11 },
    { time: '10:27', value: 5554.92 },
    { time: '10:28', value: 5553.89 },
    { time: '10:29', value: 5553.43 },
    { time: '10:30', value: 5552.63 },
    { time: '10:31', value: 5552.06 },
    { time: '10:32', value: 5551.48 },
    { time: '10:33', value: 5550.8 },
    { time: '10:34', value: 5550.57 },
    { time: '10:35', value: 5552.4 },
    { time: '10:36', value: 5551.71 },
    { time: '10:37', value: 5551.03 },
    { time: '10:38', value: 5550.68 },
    { time: '10:39', value: 5550.34 },
    { time: '10:40', value: 5548.97 },
    { time: '10:41', value: 5548.51 },
    { time: '10:42', value: 5548.17 },
    { time: '10:43', value: 5547.48 },
    { time: '10:44', value: 5545.88 },
    { time: '10:45', value: 5545.08 },
    { time: '10:46', value: 5544.85 },
    { time: '10:47', value: 5544.5 },
    { time: '10:48', value: 5543.93 },
    { time: '10:49', value: 5542.56 },
    { time: '10:50', value: 5542.1 },
    { time: '10:51', value: 5539.81 },
    { time: '10:52', value: 5540.16 },
    { time: '10:53', value: 5540.73 },
    { time: '10:54', value: 5539.81 },
    { time: '10:55', value: 5539.93 },
    { time: '10:56', value: 5540.96 },
    { time: '10:57', value: 5540.84 },
    { time: '10:58', value: 5541.07 },
    { time: '10:59', value: 5541.76 },
    { time: '11:00', value: 5542.56 },
    { time: '11:01', value: 5542.9 },
    { time: '11:02', value: 5543.13 },
    { time: '11:03', value: 5543.7 },
    { time: '11:04', value: 5544.28 },
    { time: '11:05', value: 5544.5 },
    { time: '11:06', value: 5545.19 },
    { time: '11:07', value: 5545.19 },
    { time: '11:08', value: 5546.11 },
    { time: '11:09', value: 5546.22 },
    { time: '11:10', value: 5546.11 },
    { time: '11:11', value: 5546.11 },
    { time: '11:12', value: 5546.91 },
    { time: '11:13', value: 5547.71 },
    { time: '11:14', value: 5547.48 },
    { time: '11:15', value: 5547.14 },
    { time: '11:16', value: 5547.02 },
    { time: '11:17', value: 5547.25 },
    { time: '11:18', value: 5548.74 },
    { time: '11:19', value: 5548.85 },
    { time: '11:20', value: 5549.2 },
    { time: '11:21', value: 5549.77 },
    { time: '11:22', value: 5549.2 },
    { time: '11:23', value: 5549.08 },
    { time: '11:24', value: 5548.74 },
    { time: '11:25', value: 5547.82 },
    { time: '11:26', value: 5547.14 },
    { time: '11:27', value: 5546.68 },
    { time: '11:28', value: 5545.76 },
    { time: '11:29', value: 5545.31 },
    { time: '11:30', value: 5544.96 },
    { time: '11:31', value: 5544.28 },
    { time: '11:32', value: 5544.05 },
    { time: '11:33', value: 5543.02 },
    { time: '11:34', value: 5542.45 },
    { time: '11:35', value: 5542.67 },
    { time: '11:36', value: 5543.13 },
    { time: '11:37', value: 5543.36 },
    { time: '11:38', value: 5543.59 },
    { time: '11:39', value: 5544.39 },
    { time: '11:40', value: 5545.19 },
    { time: '11:41', value: 5544.96 },
    { time: '11:42', value: 5544.96 },
    { time: '11:43', value: 5544.73 },
    { time: '11:44', value: 5544.28 },
    { time: '11:45', value: 5544.05 },
    { time: '11:46', value: 5543.93 },
    { time: '11:47', value: 5544.39 },
    { time: '11:48', value: 5544.5 },
    { time: '11:49', value: 5544.73 },
    { time: '11:50', value: 5545.65 },
    { time: '11:51', value: 5546.11 },
    { time: '11:52', value: 5546.11 },
    { time: '11:53', value: 5545.76 },
    { time: '11:54', value: 5545.88 },
    { time: '11:55', value: 5547.25 },
    { time: '11:56', value: 5547.37 },
    { time: '11:57', value: 5547.25 },
    { time: '11:58', value: 5547.94 },
    { time: '11:59', value: 5548.62 },
    { time: '12:00', value: 5549.08 },
    { time: '12:01', value: 5549.54 },
    { time: '12:02', value: 5549.42 },
    { time: '12:03', value: 5549.31 },
    { time: '12:04', value: 5549.31 },
    { time: '12:05', value: 5549.08 },
    { time: '12:06', value: 5548.74 },
    { time: '12:07', value: 5547.48 },
    { time: '12:08', value: 5546.79 },
    { time: '12:09', value: 5547.02 },
    { time: '12:10', value: 5547.25 },
    { time: '12:11', value: 5546.91 },
    { time: '12:12', value: 5545.65 },
    { time: '12:13', value: 5545.19 },
    { time: '12:14', value: 5545.31 },
    { time: '12:15', value: 5544.5 },
    { time: '12:16', value: 5544.28 },
    { time: '12:17', value: 5543.82 },
    { time: '12:18', value: 5543.36 },
    { time: '12:19', value: 5543.13 },
    { time: '12:20', value: 5543.02 },
    { time: '12:21', value: 5542.45 },
    { time: '12:22', value: 5542.22 },
    { time: '12:23', value: 5542.1 },
    { time: '12:24', value: 5541.42 },
    { time: '12:25', value: 5540.39 },
    { time: '12:26', value: 5539.93 },
    { time: '12:27', value: 5538.9 },
    { time: '12:28', value: 5538.44 },
    { time: '12:29', value: 5537.75 },
    { time: '12:30', value: 5537.64 },
    { time: '12:31', value: 5539.59 },
    { time: '12:32', value: 5540.39 },
    { time: '12:33', value: 5540.61 },
    { time: '12:34', value: 5541.19 },
    { time: '12:35', value: 5542.56 },
    { time: '12:36', value: 5543.13 },
    { time: '12:37', value: 5543.02 },
    { time: '12:38', value: 5542.33 },
    { time: '12:39', value: 5543.02 },
    { time: '12:40', value: 5542.9 },
    { time: '12:41', value: 5542.1 },
    { time: '12:42', value: 5541.64 },
    { time: '12:43', value: 5541.19 },
    { time: '12:44', value: 5540.27 },
    { time: '12:45', value: 5540.73 },
    { time: '12:46', value: 5540.61 },
    { time: '12:47', value: 5540.39 },
    { time: '12:48', value: 5540.16 },
    { time: '12:49', value: 5539.7 },
    { time: '12:50', value: 5539.7 },
    { time: '12:51', value: 5539.7 },
    { time: '12:52', value: 5539.7 },
    { time: '12:53', value: 5540.61 },
    { time: '12:54', value: 5539.81 },
    { time: '12:55', value: 5539.36 },
    { time: '12:56', value: 5538.9 },
    { time: '12:57', value: 5538.44 },
    { time: '12:58', value: 5536.72 },
    { time: '12:59', value: 5534.44 },
    { time: '13:00', value: 5534.32 },
    { time: '13:01', value: 5534.44 },
    { time: '13:02', value: 5534.78 },
    { time: '13:03', value: 5535.7 },
    { time: '13:04', value: 5535.24 },
    { time: '13:05', value: 5534.67 },
    { time: '13:06', value: 5534.09 },
    { time: '13:07', value: 5532.95 },
    { time: '13:08', value: 5534.21 },
    { time: '13:09', value: 5533.75 },
    { time: '13:10', value: 5534.32 },
    { time: '13:11', value: 5533.64 },
    { time: '13:12', value: 5533.06 },
    { time: '13:13', value: 5532.95 },
    { time: '13:14', value: 5532.38 },
    { time: '13:15', value: 5532.03 },
    { time: '13:16', value: 5532.95 },
    { time: '13:17', value: 5532.95 },
    { time: '13:18', value: 5533.06 },
    { time: '13:19', value: 5532.49 },
    { time: '13:20', value: 5532.38 },
    { time: '13:21', value: 5532.26 },
    { time: '13:22', value: 5531.58 },
    { time: '13:23', value: 5532.03 },
    { time: '13:24', value: 5532.03 },
    { time: '13:25', value: 5530.66 },
    { time: '13:26', value: 5531.12 },
    { time: '13:27', value: 5531.0 },
    { time: '13:28', value: 5531.12 },
    { time: '13:29', value: 5530.43 },
    { time: '13:30', value: 5530.66 },
    { time: '13:31', value: 5530.2 },
    { time: '13:32', value: 5529.63 },
    { time: '13:33', value: 5529.17 },
    { time: '13:34', value: 5527.69 },
    { time: '13:35', value: 5528.03 },
    { time: '13:36', value: 5528.03 },
    { time: '13:37', value: 5529.06 },
    { time: '13:38', value: 5528.83 },
    { time: '13:39', value: 5529.63 },
    { time: '13:40', value: 5529.17 },
    { time: '13:41', value: 5529.75 },
    { time: '13:42', value: 5529.29 },
    { time: '13:43', value: 5529.17 },
    { time: '13:44', value: 5530.2 },
    { time: '13:45', value: 5529.86 },
    { time: '13:46', value: 5529.4 },
    { time: '13:47', value: 5528.6 },
    { time: '13:48', value: 5529.06 },
    { time: '13:49', value: 5528.94 },
    { time: '13:50', value: 5528.94 },
    { time: '13:51', value: 5528.83 },
    { time: '13:52', value: 5529.75 },
    { time: '13:53', value: 5530.55 },
    { time: '13:54', value: 5531.46 },
    { time: '13:55', value: 5532.15 },
    { time: '13:56', value: 5532.38 },
    { time: '13:57', value: 5531.69 },
    { time: '13:58', value: 5531.69 },
    { time: '13:59', value: 5532.95 },
    { time: '14:00', value: 5524.36722 },
    { time: '14:30', value: 5524.36722 },
  ],

  topGainers: [
    { symbol: 'MIDASFIN', close: 5.00, change: 8.70 },
    { symbol: 'SAIHAMCOT', close: 24.00, change: 7.62 },
    { symbol: 'PREMIERCEM', close: 43.00, change: 6.17 },
    { symbol: 'SIPLC', close: 160.30, change: 6.09 },
    { symbol: 'DULAMIACOT', close: 221.40, change: 5.88 },
  ],

  topLosers: [
    { symbol: 'HFL', close: 11.10, change: -6.72 },
    { symbol: 'PLFSL', close: 1.60, change: -5.88 },
    { symbol: 'PREMIERLEA', close: 1.90, change: -5.00 },
    { symbol: 'VAMLRBBF', close: 8.20, change: -4.65 },
    { symbol: 'ORIONINFU', close: 268.70, change: -4.58 },
  ],

  topValue: [
    { symbol: 'SAIHAMTEX', valueMn: 337.10, close: 40.50, change: 5.74, sector: "Textile" },
    { symbol: 'IPDC', valueMn: 216.79, close: 35.60, change: 0.28, sector: "Financial Institutions" },
    { symbol: 'SAIHAMCOT', valueMn: 185.04, close: 24.00, change: 7.62, sector: "Textile" },
    { symbol: 'PTL', valueMn: 155.25, close: 80.80, change: 1.76, sector: "Textile" },
    { symbol: 'ORIONINFU', valueMn: 149.34, close: 268.70, change: -4.58, sector: "Pharmaceuticals and Chemicals" },
    { symbol: 'SHARPIND', valueMn: 141.56, close: 18.70, change: 5.06, sector: "Textile" },
    { symbol: 'APEXSPINN', valueMn: 141.32, close: 374.80, change: -1.21, sector: "Textile" },
    { symbol: 'RELIANCINS', valueMn: 135.17, close: 107.80, change: -3.14, sector: "Insurance" },
    { symbol: 'BRACBANK', valueMn: 133.78, close: 64.60, change: 0.00, sector: "Bank" },
    { symbol: 'MALEKSPIN', valueMn: 124.05, close: 48.00, change: 0.42, sector: "Textile" },
  ],

  blockMarket: {
    summary: { totalTrades: 79, totalScrips: 38, totalQuantity: 20872535, totalValueMn: 583.847 },
    top5: [
      { symbol: 'BRACBANK', quantity: 1500000, maxPrice: 64.60, minPrice: 64.60, trades: 5, valueMn: 96.900 },
      { symbol: 'DHAKABANK', quantity: 7574916, maxPrice: 11.30, minPrice: 11.30, trades: 1, valueMn: 85.597 },
      { symbol: 'JAMUNABANK', quantity: 2180000, maxPrice: 22.90, minPrice: 22.90, trades: 1, valueMn: 49.922 },
      { symbol: 'IPDC', quantity: 1198000, maxPrice: 38.90, minPrice: 38.90, trades: 3, valueMn: 46.602 },
      { symbol: 'GREENDELT', quantity: 700000, maxPrice: 66.10, minPrice: 66.10, trades: 2, valueMn: 46.270 },
    ],
  },

  sectorCommentary: {
    en: "Textile stayed the market's focus with ৳165.81 crore (28.8% of turnover) and 33 of 58 issues higher, led by SAIHAMTEX and SAIHAMCOT; general Insurance turnover fell 33.6% with decliners outnumbering gainers 24 to 15, while Financial Institutions was among the few sectors to draw more money (turnover up 12.4%).",
    bn: "Textile খাতেই আজও বাজারের মনোযোগ — লেনদেন ৳165.81 কোটি (মোট turnover-এর 28.8%), 58টির মধ্যে 33টির দর বেড়েছে, নেতৃত্বে SAIHAMTEX ও SAIHAMCOT। সাধারণ বীমা খাতে লেনদেন 33.6% কমেছে, দর কমেছে 24টির বিপরীতে বেড়েছে 15টির; আর যে অল্প কয়েকটি খাতে লেনদেন বেড়েছে তার একটি আর্থিক প্রতিষ্ঠান খাত (turnover +12.4%)।",
  },

  commentary: {
    headline: {
      en: 'Thin trading, flat index; fourth close at the day’s low',
      bn: 'লেনদেন কমেছে, সূচক প্রায় স্থির; টানা চতুর্থ দিন সর্বনিম্নে সমাপনী',
    },
    en: [
      "The DSEX edged down 1.49 points (0.03%) to 5,524.37, a fourth straight decline and again its lowest close since September 16, though the loss was the smallest of the four. The index rose early to a high of 5,557.11 around 10:26, then made a series of lower highs through the day, near 5,550 before and after 11:20 and 12:00 and near 5,543 at 12:36, before drifting down and closing at the day's low for a fourth consecutive session. DS30 fell 0.16% and DSES 0.19%.",
      "Breadth improved again to 142 advancers against 178 decliners, but trading thinned out: turnover fell 15.0% to ৳634.52 crore, the lowest since September 16 and about 3% below its 20-session average. Block deals made up a relatively large 9.2% of turnover at ৳58.38 crore, led by bank transactions in BRACBANK (৳9.69 crore) and DHAKABANK (৳8.56 crore). The five most-traded stocks rose 2.16% on average against a flat index, helped by SAIHAMTEX (+5.74%) and SAIHAMCOT (+7.62%), while the top 20 gained a more modest 0.67%, which suggests selective buying rather than a broad move. DSE's client data shows institutions were net sellers for a third straight session, at about ৳7.53 crore today and roughly ৳32.28 crore over the three days, while retail investors bought a net ৳6.10 crore and foreign flows were close to balanced.",
      "Technically, the index is about 0.3% below its 20-day average of 5,539 and remains under its 50-day (5,698) and 100-day (5,616) averages, above the 200-day near 5,390; RSI near 49 is neutral. Four closes in a row at the day's low, lower highs through the session and steady institutional selling suggest the market is still being sold into strength, although the shrinking losses and better breadth could indicate that the selling pressure is easing; that should await confirmation. Watch Wednesday: a close back above the 20-day average near 5,539 on better turnover would be the first sign of stabilisation, while the September 16 close of 5,494 remains the key level below.",
    ],
    bn: [
      "DSEX আজ 1.49 পয়েন্ট (0.03%) কমে 5,524.37-এ বন্ধ হয়েছে — টানা চতুর্থ দিনের দরপতন, আবারও 16 সেপ্টেম্বরের পর সর্বনিম্ন সমাপনী; তবে চার দিনের মধ্যে আজকের পতনই সবচেয়ে কম। সকালে সূচক বেড়ে সাড়ে দশটার একটু আগে দিনের সর্বোচ্চ 5,557.11-এ ওঠে, এরপর সারা দিন প্রতিটি উত্থানই আগেরটির চেয়ে নিচে থেমেছে — সোয়া এগারোটা ও বারোটার দিকে প্রায় 5,550, সাড়ে বারোটার পর প্রায় 5,543 — তারপর ধীরে ধীরে নেমে টানা চতুর্থ দিন দিনের সর্বনিম্নেই বন্ধ হয়। DS30 কমেছে 0.16% এবং DSES 0.19%।",
      "বাজারের breadth আরও কিছুটা ভালো হয়েছে — দর বেড়েছে 142টির, কমেছে 178টির; কিন্তু লেনদেন কমে গেছে: turnover 15.0% কমে ৳634.52 কোটি, যা 16 সেপ্টেম্বরের পর সর্বনিম্ন এবং গত 20 দিনের গড়ের চেয়ে প্রায় 3% কম। মোট লেনদেনের 9.2% — ৳58.38 কোটি — হয়েছে ব্লক মার্কেটে, যা সাম্প্রতিক দিনগুলোর তুলনায় বেশি; এর বড় অংশ ব্যাংকের শেয়ারে, যেমন BRACBANK (৳9.69 কোটি) ও DHAKABANK (৳8.56 কোটি)। সবচেয়ে বেশি লেনদেন হওয়া পাঁচটি শেয়ারের দর গড়ে 2.16% বেড়েছে, নেতৃত্বে SAIHAMTEX (+5.74%) ও SAIHAMCOT (+7.62%), অথচ সূচক প্রায় স্থির; শীর্ষ 20টির গড় বৃদ্ধি মাত্র 0.67% — অর্থাৎ কেনাকাটা বাছাই করা কিছু শেয়ারেই সীমিত, পুরো বাজারে ছড়ায়নি। DSE-র তথ্য অনুযায়ী প্রাতিষ্ঠানিক বিনিয়োগকারীরা টানা তৃতীয় দিন নিট বিক্রেতা — আজ প্রায় ৳7.53 কোটি, তিন দিনে মোট প্রায় ৳32.28 কোটি; অন্যদিকে সাধারণ বিনিয়োগকারীরা নিট ৳6.10 কোটি কিনেছেন, আর বিদেশিদের কেনা-বেচা প্রায় সমান ছিল।",
      "টেকনিক্যাল দিক থেকে সূচক 20 দিনের গড় 5,539-এর প্রায় 0.3% নিচে, 50 দিনের (5,698) ও 100 দিনের (5,616) গড়ের নিচে, তবে 200 দিনের গড় (প্রায় 5,390)-এর ওপরে; RSI প্রায় 49 — নিরপেক্ষ। টানা চার দিন সর্বনিম্নে সমাপনী, দিনভর নিচু হতে থাকা চূড়া আর প্রতিষ্ঠানগুলোর ধারাবাহিক বিক্রি বলছে, সূচক উঠলেই বিক্রির চাপ আসছে; তবে পতনের মাত্রা কমে আসা ও breadth-এর উন্নতি ইঙ্গিত দিতে পারে যে চাপ কিছুটা কমছে — যদিও তা নিশ্চিত হতে আরও অপেক্ষা দরকার। বুধবার যা দেখার: ভালো লেনদেন নিয়ে সূচক 20 দিনের গড় (প্রায় 5,539)-এর ওপরে বন্ধ হলে সেটিই হবে স্থিতিশীলতার প্রথম লক্ষণ; আর নিচের দিকে গুরুত্বপূর্ণ স্তর 16 সেপ্টেম্বরের সমাপনী 5,494।",
    ],
  },

};

// ╔════════════════════════════════════════════════════════════════════════════╗
// ║                            END OF DAILY DATA INPUT                         ║
// ╚════════════════════════════════════════════════════════════════════════════╝
// ============================================================================
// TEMPLATE ENGINE (v3.0 · mobile-first, no chart library, 320px and up)
// ============================================================================

const C = {
  bg: '#f4f5f7', card: '#ffffff', ink: '#0b1220', sub: '#5b6474', mute: '#8a93a3',
  line: '#e7e9ee', soft: '#f7f8fa',
  up: '#0f9d6b', upSoft: '#e7f6ef', down: '#d9423a', downSoft: '#fdeceb', flat: '#8a93a3',
  dark: '#0b1220', dText: '#e6e9ef', dBody: '#cfd5df', dSub: '#9aa4b2', dMute: '#6b7585',
  dUp: '#5fd3a6', dDown: '#f87171', gold: '#f5b544',
};
// Client-flow series (validated: lightness, chroma, colour-blind separation, 3:1 contrast on white)
const SERIES = [['retail', 'Retail', '#2b6cb0'], ['institution', 'Institution', '#d97706'], ['foreign', 'Foreign', '#7c5cc4']];
const FONT = "'Inter', system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif";
const BN_FONT = "'Noto Sans Bengali', 'Hind Siliguri', 'Nirmala UI', 'Vrinda', sans-serif";
const BRAND = '#004990';

const fx = (n, d = 2) => Number(n).toLocaleString('en-US', { minimumFractionDigits: d, maximumFractionDigits: d });
const sign = (n) => (n > 0 ? '+' : '');
const tone = (n) => (n > 0 ? C.up : n < 0 ? C.down : C.flat);
const inr = (n, d = 2) => Number(n).toLocaleString('en-IN', { minimumFractionDigits: d, maximumFractionDigits: d });
const cr = (mn, d = 2) => `৳${inr(mn / 10, d)} cr`;            // BDT million → crore
const qty = (n) => (n >= 1e7 ? `${inr(n / 1e7)} cr` : n >= 1e5 ? `${inr(n / 1e5)} lakh` : Number(n).toLocaleString('en-IN'));
const pctChg = (a, b) => ((a - b) / b) * 100;
const sCr = (mn) => `${mn > 0 ? '+' : mn < 0 ? '−' : ''}${cr(Math.abs(mn))}`;

const REPORT_VERSION = 'v3.0';

// Mobile-first: base rules are the phone layout (320px+); min-width queries add tablet (640px) and desktop (1024px).
// All rules are scoped under .msr so they cannot clash with the host site's CSS (Tailwind preflight included).
const CSS = `
  .msr, .msr * { box-sizing: border-box; }
  .msr { background: ${C.bg}; color: ${C.ink}; font-family: ${FONT}; font-variant-numeric: tabular-nums; line-height: 1.45;
         -webkit-text-size-adjust: 100%; padding: 16px 12px 28px; min-height: 100vh; overflow-x: hidden; }
  .msr h1, .msr h2, .msr p, .msr ol, .msr ul { margin: 0; padding: 0; }
  .msr ol, .msr ul { list-style: none; }
  .msr button { font-family: ${FONT}; cursor: pointer; -webkit-tap-highlight-color: transparent; }
  .msr .wrap { max-width: 980px; margin: 0 auto; display: flex; flex-direction: column; gap: 12px; }
  .msr .card { background: ${C.card}; border: 1px solid ${C.line}; border-radius: 14px; padding: 16px; min-width: 0; }
  .msr .dark { background: ${C.dark}; color: ${C.dText}; border-radius: 14px; padding: 16px; min-width: 0; }
  .msr .ttl { display: flex; justify-content: space-between; align-items: center; gap: 8px 12px; flex-wrap: wrap; margin-bottom: 12px; }
  .msr .h2 { font-size: 14px; font-weight: 650; letter-spacing: .01em; }
  .msr .eyebrow { font-size: 10px; font-weight: 600; letter-spacing: .08em; text-transform: uppercase; color: ${C.mute}; }
  .msr .hint { font-size: 11px; color: ${C.mute}; }
  .msr .note { font-size: 11px; color: ${C.mute}; line-height: 1.55; margin-top: 10px; }
  .msr .dark .note { color: ${C.dMute}; }
  .msr .sub { font-size: 11.5px; color: ${C.sub}; line-height: 1.4; }
  .msr .r { text-align: right; }
  .msr .nw { white-space: nowrap; }
  .msr .pill { display: inline-block; padding: 3px 9px; border-radius: 999px; font-size: 11px; font-weight: 600; white-space: nowrap; }

  /* header & hero */
  .msr .head { display: flex; flex-direction: column; gap: 6px; padding: 0 2px; }
  .msr .brand { font-size: 10.5px; font-weight: 600; color: ${BRAND}; letter-spacing: .1em; text-transform: uppercase; }
  .msr h1 { font-size: 23px; font-weight: 700; letter-spacing: -.02em; line-height: 1.15; margin-top: 2px; }
  .msr .date { font-size: 13px; font-weight: 600; }
  .msr .big { font-size: 38px; font-weight: 700; letter-spacing: -.03em; line-height: 1; }
  .msr .ohlc { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 10px 16px; margin-top: 14px; }
  .msr .ohlc b { display: block; font-size: 15px; font-weight: 600; margin-top: 2px; }
  .msr .legend { display: flex; flex-wrap: wrap; gap: 6px 14px; font-size: 11px; color: ${C.sub}; }
  .msr .dark .legend { color: ${C.dSub}; }
  .msr .key { display: inline-block; vertical-align: middle; margin-right: 6px; }

  /* charts */
  .msr .chart { position: relative; width: 100%; margin-top: 12px; }
  .msr .chart svg { display: block; width: 100%; height: auto; touch-action: pan-y; outline: none; user-select: none; -webkit-user-select: none; }
  .msr .chart svg:focus-visible { box-shadow: 0 0 0 2px ${BRAND}; border-radius: 6px; }
  .msr .tip { position: absolute; top: 4px; pointer-events: none; background: ${C.ink}; color: #fff; border-radius: 10px; padding: 7px 10px;
              font-size: 12px; line-height: 1.45; box-shadow: 0 8px 24px rgba(0,0,0,.18); min-width: 118px; z-index: 2; }
  .msr .tip .t { color: ${C.dSub}; font-size: 11px; }
  .msr .tip.light { background: #fff; color: ${C.ink}; }
  .msr .tip.light .t { color: ${C.mute}; }
  .msr .tip i { display: inline-block; width: 10px; height: 2px; vertical-align: middle; margin-right: 6px; }

  /* index cards, KPI tiles */
  .msr .idx { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 12px; }
  .msr .idx .range { grid-column: 1 / -1; }
  .msr .kpis { display: flex; gap: 10px; overflow-x: auto; scroll-snap-type: x mandatory; scroll-padding-inline: 12px;
               margin: 0 -12px; padding: 0 12px 4px; scrollbar-width: none; -webkit-overflow-scrolling: touch; }
  .msr .kpis::-webkit-scrollbar { display: none; }
  .msr .kpi { flex: 0 0 calc((100% - 10px) / 2.2); min-width: 128px; scroll-snap-align: start; background: ${C.card};
              border: 1px solid ${C.line}; border-radius: 14px; padding: 14px; }
  .msr .kpi .v { font-size: 18px; font-weight: 700; margin-top: 6px; white-space: nowrap; }
  .msr .swipe { font-size: 11px; color: ${C.mute}; text-align: right; margin-top: -4px; }

  /* commentary */
  .msr .headline { font-size: 17px; font-weight: 650; color: #fff; margin-top: 4px; line-height: 1.35; }
  .msr .para { font-size: 14.5px; line-height: 1.75; color: ${C.dBody}; }
  .msr .para.bn { font-size: 15.5px; line-height: 1.95; }
  .msr .para + .para { margin-top: 12px; }

  /* segmented toggle & buttons (tap targets ≥ 40px) */
  .msr .seg { display: inline-flex; border-radius: 999px; padding: 3px; background: ${C.soft}; border: 1px solid ${C.line}; flex-shrink: 0; }
  .msr .seg button { border: none; border-radius: 999px; min-height: 40px; min-width: 54px; padding: 0 14px; font-size: 12px; font-weight: 600;
                     background: transparent; color: ${C.sub}; }
  .msr .seg button[aria-pressed="true"] { background: ${C.ink}; color: #fff; }
  .msr .dark .seg { background: rgba(255,255,255,.08); border-color: rgba(255,255,255,.12); }
  .msr .dark .seg button { color: #b8c0cc; }
  .msr .dark .seg button[aria-pressed="true"] { background: #fff; color: ${C.ink}; }
  .msr .more { display: flex; justify-content: center; margin-top: 12px; }
  .msr .more button { min-height: 44px; padding: 0 22px; border-radius: 999px; font-size: 13px; font-weight: 600;
                      border: 1px solid ${C.line}; background: ${C.soft}; color: ${C.ink}; }
  .msr .dark .more button { border-color: rgba(255,255,255,.14); background: rgba(255,255,255,.06); color: ${C.dText}; }

  /* tables (tablet & desktop) and lists (phone) */
  .msr table { width: 100%; border-collapse: collapse; }
  .msr th { font-size: 10px; font-weight: 600; color: ${C.mute}; text-transform: uppercase; letter-spacing: .05em; padding: 0 6px 9px;
            text-align: right; border-bottom: 1px solid ${C.line}; white-space: nowrap; }
  .msr td { font-size: 13px; padding: 10px 6px; text-align: right; border-bottom: 1px solid ${C.line}; color: ${C.ink}; }
  .msr th:first-child, .msr td:first-child { text-align: left; padding-left: 0; }
  .msr th:last-child, .msr td:last-child { padding-right: 0; }
  .msr tr:last-child td { border-bottom: none; }
  .msr .lst > li { display: flex; align-items: flex-start; gap: 10px; padding: 11px 0; border-bottom: 1px solid ${C.line}; }
  .msr .lst > li:last-child { border-bottom: none; }
  .msr .lst .grow { flex: 1; min-width: 0; }
  .msr .lst b { font-weight: 650; font-size: 13.5px; }
  .msr .rk { color: ${C.mute}; font-size: 12px; width: 16px; flex-shrink: 0; padding-top: 1px; }
  .msr .md-only, .msr .md-inline { display: none; }
  .msr .g2 { display: grid; grid-template-columns: minmax(0, 1fr); gap: 12px; }

  /* sectors */
  .msr .srow { display: grid; grid-template-columns: minmax(0, 1fr) auto; align-items: center; gap: 6px 10px; }
  .msr .srow .nm { font-size: 13px; font-weight: 500; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  .msr .srow .bar { grid-column: 1 / -1; grid-row: 2; }
  .msr .srow .val { font-size: 12px; text-align: right; white-space: nowrap; }

  /* technical tiles, spikes */
  .msr .tech { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 8px; margin-top: 12px; }
  .msr .tech .wide { grid-column: 1 / -1; }
  .msr .tile { background: rgba(255,255,255,.05); border-radius: 10px; padding: 10px 12px; min-width: 0; }
  .msr .spk { display: grid; grid-template-columns: minmax(0, 1fr); gap: 10px; }
  .msr .scard { background: rgba(255,255,255,.05); border: 1px solid rgba(255,255,255,.06); border-radius: 12px; padding: 12px 14px; min-width: 0; }

  @media (max-width: 639.98px) {
    .msr .xs-hide { display: none !important; }
  }
  @media (min-width: 640px) {
    .msr { padding: 24px 16px 32px; }
    .msr .wrap { gap: 16px; }
    .msr .card, .msr .dark { padding: 20px; border-radius: 16px; }
    .msr .head { flex-direction: row; justify-content: space-between; align-items: flex-end; }
    .msr .head .when { text-align: right; }
    .msr h1 { font-size: 27px; }
    .msr .big { font-size: 44px; }
    .msr .ohlc { grid-template-columns: repeat(4, auto); justify-content: start; gap: 12px 26px; }
    .msr .g2 { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 16px; }
    .msr .idx { grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 16px; }
    .msr .idx .range { grid-column: auto; }
    .msr .kpi { flex-basis: calc((100% - 30px) / 3.3); }
    .msr .sm-only { display: none !important; }
    .msr .md-only { display: block; }
    .msr table.md-only { display: table; }
    .msr .md-inline { display: inline; }
    .msr .srow { grid-template-columns: minmax(120px, 200px) minmax(0, 1fr) auto; gap: 12px; }
    .msr .srow .bar { grid-column: auto; grid-row: auto; }
    .msr .tech { grid-template-columns: repeat(3, minmax(0, 1fr)); }
    .msr .tech .wide { grid-column: auto; }
    .msr .spk { grid-template-columns: repeat(2, minmax(0, 1fr)); }
    .msr .headline { font-size: 19px; }
  }
  @media (min-width: 1024px) {
    .msr { padding: 32px 24px 40px; }
    .msr .card, .msr .dark { padding: 24px; }
    .msr .hero { display: flex; justify-content: space-between; align-items: flex-end; gap: 16px; }
    .msr .hero .ohlc { margin-top: 0; }
    .msr .kpis { display: grid; grid-template-columns: repeat(5, minmax(0, 1fr)); gap: 1px; overflow: hidden; margin: 0; padding: 0;
                 background: ${C.line}; border: 1px solid ${C.line}; border-radius: 16px; }
    .msr .kpi { border: none; border-radius: 0; min-width: 0; padding: 16px 18px; }
    .msr .kpi .v { font-size: 19px; }
    .msr .swipe { display: none; }
    .msr .tech { grid-template-columns: repeat(5, minmax(0, 1fr)); }
    .msr .spk { grid-template-columns: repeat(3, minmax(0, 1fr)); }
  }
`;

// ── Small building blocks ───────────────────────────────────────────────────
const Chg = ({ v, suffix = '%' }) => <span style={{ color: tone(v), fontWeight: 600 }} className="nw">{sign(v)}{fx(v)}{suffix}</span>;

const Seg = ({ en, onToggle, label }) => (
  <div className="seg" role="group" aria-label={label}>
    {[['EN', true], ['বাংলা', false]].map(([t, val]) => (
      <button key={t} type="button" aria-pressed={en === val} onClick={() => onToggle(val)} style={{ fontFamily: val ? FONT : BN_FONT }}>{t}</button>
    ))}
  </div>
);

const More = ({ open, onClick, total, className = '' }) => (
  <div className={`more ${className}`}>
    <button type="button" aria-expanded={open} onClick={onClick}>{open ? 'Show Less' : `Show All (${total})`}</button>
  </div>
);

// Measures the container so SVG charts draw at true pixel width (crisp text at 320px and at desktop).
function useWidth(initial = 320) {
  const ref = useRef(null);
  const [w, setW] = useState(initial);
  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    const set = () => setW(Math.max(240, Math.round(el.getBoundingClientRect().width)));
    set();
    if (typeof ResizeObserver === 'undefined') { window.addEventListener('resize', set); return () => window.removeEventListener('resize', set); }
    const ro = new ResizeObserver(set);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  return [ref, w];
}

// Shared pointer/keyboard handling: tap or drag to inspect, arrows on keyboard; mouse-out clears, touch keeps the reading.
function useInspect(n, locate) {
  const [idx, setIdx] = useState(null);
  const onPointer = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    const i = locate((e.clientX - r.left) / r.width);
    if (i != null) setIdx(Math.max(0, Math.min(n - 1, i)));
  };
  const handlers = {
    onPointerDown: onPointer,
    onPointerMove: (e) => { if (e.pointerType === 'mouse' || e.buttons) onPointer(e); },
    onPointerLeave: (e) => { if (e.pointerType === 'mouse') setIdx(null); },
    onBlur: () => setIdx(null),
    onKeyDown: (e) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
        e.preventDefault();
        const step = e.key === 'ArrowRight' ? 1 : -1;
        setIdx((v) => Math.max(0, Math.min(n - 1, (v == null ? (step > 0 ? -1 : n) : v) + step)));
      } else if (e.key === 'Escape') setIdx(null);
    },
    tabIndex: 0,
  };
  return [idx, handlers];
}

const niceTicks = (lo, hi, count = 4) => {
  const raw = (hi - lo) / count;
  const mag = Math.pow(10, Math.floor(Math.log10(raw)));
  const step = [1, 2, 2.5, 5, 10].map((k) => k * mag).find((s) => s >= raw) || raw;
  const out = [];
  for (let v = Math.floor(lo / step) * step; v <= hi + 1e-9; v += step) out.push(Math.round(v * 1e6) / 1e6);
  return out;
};

// ── Intraday DSEX (area + previous-close line + day-high marker) ────────────
function IntradayChart({ data, prev, acc, domain, ticks }) {
  const [ref, w] = useWidth();
  const gid = `g${useId().replace(/[^a-zA-Z0-9]/g, '')}`;
  const h = w < 480 ? 196 : 240;
  const m = { l: 42, r: 10, t: 14, b: 24 };
  const mins = data.map((d) => { const [H, M] = d.time.split(':').map(Number); return (H - 10) * 60 + M; });
  const xMax = Math.max(270, mins[mins.length - 1]);
  const pw = w - m.l - m.r;
  const x = (v) => m.l + (v / xMax) * pw;
  const y = (v) => m.t + (1 - (v - domain[0]) / (domain[1] - domain[0])) * (h - m.t - m.b);
  const path = data.map((d, i) => `${i ? 'L' : 'M'}${x(mins[i]).toFixed(1)},${y(d.value).toFixed(1)}`).join('');
  const area = `${path}L${x(mins[mins.length - 1]).toFixed(1)},${h - m.b}L${m.l},${h - m.b}Z`;
  const hi = data.reduce((a, d, i) => (d.value > data[a].value ? i : a), 0);
  const [idx, on] = useInspect(data.length, (fr) => {
    const t = ((fr * w - m.l) / pw) * xMax;
    let best = 0;
    mins.forEach((mm, i) => { if (Math.abs(mm - t) < Math.abs(mins[best] - t)) best = i; });
    return best;
  });
  const hx = x(mins[hi]);
  const hiRight = hx < w * 0.55;
  const cur = idx != null ? data[idx] : null;
  return (
    <div className="chart" ref={ref}>
      <svg viewBox={`0 0 ${w} ${h}`} width={w} height={h} role="img" {...on}
        aria-label={`DSEX intraday: opened ${fx(data[0].value)}, high ${fx(data[hi].value)} at ${data[hi].time}, closed ${fx(data[data.length - 1].value)}. Tap or use arrow keys to read values.`}>
        <defs>
          <linearGradient id={gid} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={acc} stopOpacity="0.2" />
            <stop offset="100%" stopColor={acc} stopOpacity="0" />
          </linearGradient>
        </defs>
        {ticks.map((t) => (
          <g key={t}>
            <line x1={m.l} x2={w - m.r} y1={y(t)} y2={y(t)} stroke={C.line} strokeWidth="1" />
            <text x={m.l - 6} y={y(t) + 3.5} textAnchor="end" fontSize="10" fill={C.mute}>{t.toLocaleString('en-IN')}</text>
          </g>
        ))}
        {(w < 420 ? [0, 120, 240] : [0, 60, 120, 180, 240]).map((t) => (
          <text key={t} x={x(t)} y={h - 6} textAnchor={t === 0 ? 'start' : 'middle'} fontSize="10" fill={C.mute}>{`${10 + t / 60}:00`}</text>
        ))}
        <line x1={m.l} x2={w - m.r} y1={y(prev)} y2={y(prev)} stroke={C.mute} strokeDasharray="4 4" strokeWidth="1" />
        <path d={area} fill={`url(#${gid})`} />
        <path d={path} fill="none" stroke={acc} strokeWidth="2" strokeLinejoin="round" />
        <circle cx={hx} cy={y(data[hi].value)} r="4.5" fill={C.up} stroke="#fff" strokeWidth="2" />
        <text x={hx + (hiRight ? 9 : -9)} y={y(data[hi].value) + 4} textAnchor={hiRight ? 'start' : 'end'} fontSize="11" fontWeight="600" fill={C.up}>High {fx(data[hi].value)}</text>
        {cur && (
          <g pointerEvents="none">
            <line x1={x(mins[idx])} x2={x(mins[idx])} y1={m.t - 6} y2={h - m.b} stroke={C.ink} strokeOpacity="0.35" strokeWidth="1" />
            <circle cx={x(mins[idx])} cy={y(cur.value)} r="4.5" fill={acc} stroke="#fff" strokeWidth="2" />
          </g>
        )}
      </svg>
      {cur && (
        <div className="tip" style={x(mins[idx]) > w / 2 ? { left: m.l + 4 } : { right: m.r + 4 }}>
          <div className="t">{cur.time}</div>
          <div style={{ fontWeight: 650, fontSize: 13 }}>{fx(cur.value)}</div>
          <div style={{ color: cur.value - prev >= 0 ? C.dUp : C.dDown }}>{sign(cur.value - prev)}{fx(cur.value - prev)} vs prev close</div>
        </div>
      )}
    </div>
  );
}

// ── Client net flow (grouped bars, ৳ crore) ─────────────────────────────────
function FlowChart({ rows }) {
  const [ref, w] = useWidth();
  const h = w < 480 ? 190 : 210;
  const m = { l: 34, r: 4, t: 8, b: 22 };
  const vals = rows.flatMap((r) => SERIES.map(([k]) => r[k] / 10));
  const ticks = niceTicks(Math.min(0, ...vals), Math.max(0, ...vals), 4);
  const lo = ticks[0], hi = ticks[ticks.length - 1];
  const pw = w - m.l - m.r;
  const gw = pw / rows.length;
  const y = (v) => m.t + (1 - (v - lo) / (hi - lo)) * (h - m.t - m.b);
  const bw = Math.max(2, (gw * 0.78 - 2) / 3);
  const every = Math.max(1, Math.ceil(38 / gw));
  const [idx, on] = useInspect(rows.length, (fr) => Math.floor((fr * w - m.l) / gw));
  const cur = idx != null ? rows[idx] : null;
  return (
    <div className="chart" ref={ref}>
      <svg viewBox={`0 0 ${w} ${h}`} width={w} height={h} role="img" {...on}
        aria-label={`Net buying and selling by retail, institutional and foreign investors over the last ${rows.length} sessions, in crore taka. Tap a day or use arrow keys to read values.`}>
        {ticks.map((t) => (
          <g key={t}>
            <line x1={m.l} x2={w - m.r} y1={y(t)} y2={y(t)} stroke={t === 0 ? '#c9ced8' : C.line} strokeWidth="1" />
            <text x={m.l - 5} y={y(t) + 3.5} textAnchor="end" fontSize="10" fill={C.mute}>{t}</text>
          </g>
        ))}
        {idx != null && <rect x={m.l + idx * gw} y={m.t} width={gw} height={h - m.t - m.b} fill={C.ink} fillOpacity="0.05" rx="3" />}
        {rows.map((r, i) => (
          <g key={r.date} opacity={r.flag ? 0.45 : 1}>
            {SERIES.map(([k, , c], j) => {
              const v = r[k] / 10;
              const bx = m.l + i * gw + gw * 0.11 + j * (bw + 1);
              return <rect key={k} x={bx} y={Math.min(y(v), y(0))} width={bw} height={Math.max(1, Math.abs(y(v) - y(0)))} fill={c} rx="1" />;
            })}
            {(rows.length - 1 - i) % every === 0 && (i === rows.length - 1 || m.l + (i + 0.5) * gw + 18 < w - m.r - 38) && (
              <text x={i === rows.length - 1 ? w - m.r : m.l + (i + 0.5) * gw} y={h - 6} textAnchor={i === rows.length - 1 ? 'end' : 'middle'} fontSize="10" fill={C.mute}>{r.date}</text>
            )}
          </g>
        ))}
      </svg>
      {cur && (
        <div className="tip" style={m.l + (idx + 0.5) * gw > w / 2 ? { left: m.l + 4 } : { right: m.r + 4 }}>
          <div className="t">{cur.date}{cur.flag ? ` · ${cur.flag}` : ''}</div>
          {[...SERIES, ['dealer', 'Dealer', '#9aa4b2']].filter(([k]) => cur[k] != null).map(([k, n, c]) => (
            <div key={k} className="nw"><i style={{ background: c }} /><b>{sCr(cur[k])}</b> <span style={{ color: C.dSub }}>{n}</span></div>
          ))}
        </div>
      )}
    </div>
  );
}

// ── DSEX last 30 sessions: price panel + separate turnover strip (one y-axis each) ──
function HistoryChart({ rows, domain }) {
  const [ref, w] = useWidth();
  const gid = `h${useId().replace(/[^a-zA-Z0-9]/g, '')}`;
  const h1 = w < 480 ? 168 : 196, gap = 10, h2 = 46;
  const h = h1 + gap + h2 + 18;
  const m = { l: 42, r: 6, t: 8 };
  const pw = w - m.l - m.r;
  const st = pw / rows.length;
  const x = (i) => m.l + (i + 0.5) * st;
  const y = (v) => m.t + (1 - (v - domain[0]) / (domain[1] - domain[0])) * (h1 - m.t);
  const vmax = Math.max(...rows.map((r) => r.valueMn));
  const yb = (v) => h1 + gap + h2 - (v / vmax) * h2;
  const ticks = niceTicks(domain[0], domain[1], 3).filter((t) => t >= domain[0] && t <= domain[1]);
  const line = rows.map((r, i) => `${i ? 'L' : 'M'}${x(i).toFixed(1)},${y(r.value).toFixed(1)}`).join('');
  const area = `${line}L${x(rows.length - 1).toFixed(1)},${h1}L${x(0).toFixed(1)},${h1}Z`;
  const dma = rows.map((r, i) => [i, r.dma20]).filter(([, v]) => v != null);
  const dmaPath = dma.map(([i, v], k) => `${k ? 'L' : 'M'}${x(i).toFixed(1)},${y(v).toFixed(1)}`).join('');
  const every = Math.max(1, Math.ceil(44 / st));
  const [idx, on] = useInspect(rows.length, (fr) => Math.floor((fr * w - m.l) / st));
  const cur = idx != null ? rows[idx] : null;
  return (
    <div className="chart" ref={ref}>
      <svg viewBox={`0 0 ${w} ${h}`} width={w} height={h} role="img" {...on}
        aria-label={`DSEX closes for the last ${rows.length} sessions with the 20-day average and daily turnover. Tap a day or use arrow keys to read values.`}>
        <defs>
          <linearGradient id={gid} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={C.dUp} stopOpacity="0.22" />
            <stop offset="100%" stopColor={C.dUp} stopOpacity="0" />
          </linearGradient>
        </defs>
        {ticks.map((t) => (
          <g key={t}>
            <line x1={m.l} x2={w - m.r} y1={y(t)} y2={y(t)} stroke="rgba(255,255,255,.07)" strokeWidth="1" />
            <text x={m.l - 6} y={y(t) + 3.5} textAnchor="end" fontSize="10" fill={C.dMute}>{t.toLocaleString('en-IN')}</text>
          </g>
        ))}
        <path d={area} fill={`url(#${gid})`} />
        <path d={dmaPath} fill="none" stroke={C.gold} strokeWidth="1.5" strokeDasharray="4 3" />
        <path d={line} fill="none" stroke={C.dUp} strokeWidth="2" strokeLinejoin="round" />
        <text x={m.l - 6} y={h1 + gap + 12} textAnchor="end" fontSize="9.5" fill={C.dMute}>৳ cr</text>
        {rows.map((r, i) => (
          <rect key={r.date} x={m.l + i * st + st * 0.18} y={yb(r.valueMn)} width={Math.max(1.5, st * 0.64)} height={h1 + gap + h2 - yb(r.valueMn)}
            fill={idx === i ? '#94a3b8' : '#475569'} rx="1" />
        ))}
        {rows.map((r, i) => ((rows.length - 1 - i) % every === 0 && (i === rows.length - 1 || x(i) + 18 < w - m.r - 38) ? (
          <text key={r.date} x={i === rows.length - 1 ? w - m.r : x(i)} y={h - 4} textAnchor={i === rows.length - 1 ? 'end' : 'middle'} fontSize="10" fill={C.dMute}>{r.date}</text>
        ) : null))}
        {cur && (
          <g pointerEvents="none">
            <line x1={x(idx)} x2={x(idx)} y1={m.t} y2={h1 + gap + h2} stroke="#fff" strokeOpacity="0.3" strokeWidth="1" />
            <circle cx={x(idx)} cy={y(cur.value)} r="4.5" fill={C.dUp} stroke={C.dark} strokeWidth="2" />
          </g>
        )}
      </svg>
      {cur && (
        <div className="tip light" style={x(idx) > w / 2 ? { left: m.l + 4 } : { right: m.r + 4 }}>
          <div className="t">{cur.date}</div>
          <div className="nw"><i style={{ background: C.dUp }} /><b>{fx(cur.value)}</b> DSEX</div>
          {cur.dma20 != null && <div className="nw"><i style={{ background: C.gold }} /><b>{fx(cur.dma20)}</b> 20-day avg</div>}
          <div className="nw"><i style={{ background: '#475569' }} /><b>{cr(cur.valueMn)}</b> turnover</div>
        </div>
      )}
    </div>
  );
}

// ── Page ────────────────────────────────────────────────────────────────────
export default function DSEMarketAnalysis() {
  const D = DAILY_DATA;
  const { indices, marketSummary: M, marketBreadth: B } = D;
  const dsex = indices.dsex;
  const [en, setEn] = useState(true);
  const [secEn, setSecEn] = useState(true);
  const [allSec, setAllSec] = useState(false);
  const [allTv, setAllTv] = useState(false);
  const [allSp, setAllSp] = useState(false);

  useEffect(() => {
    const id = 'msr-fonts';
    if (typeof document !== 'undefined' && !document.getElementById(id)) {
      const l = document.createElement('link');
      l.id = id; l.rel = 'stylesheet';
      l.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Noto+Sans+Bengali:wght@400;500;600;700&display=swap';
      document.head.appendChild(l);
    }
  }, []);

  const up = dsex.change >= 0;
  const acc = up ? C.up : C.down;
  const adRatio = M.issuesAdvanced / M.issuesDeclined;
  const range = dsex.high - dsex.low;
  const closePos = range > 0 ? ((dsex.value - dsex.low) / range) * 100 : 50;
  const blockShare = (D.blockMarket.summary.totalValueMn / M.totalValueMn) * 100;
  const maxSec = Math.max(...D.sectorPerformance.map((s) => s.valueMn));
  const maxVal = Math.max(...D.topValue.map((s) => s.valueMn));
  const paras = en ? D.commentary.en : D.commentary.bn;
  const iv = D.intradayData.map((d) => d.value);
  const iLo = Math.floor((Math.min(...iv) - 8) / 10) * 10, iHi = Math.ceil((Math.max(...iv) + 8) / 10) * 10;
  const intraTicks = Array.from({ length: 5 }, (_, k) => Math.round(iLo + ((iHi - iLo) * k) / 4));
  const hv = D.historicalData.map((d) => d.value);
  const histDomain = [Math.floor((Math.min(...hv) - 60) / 50) * 50, Math.ceil((Math.max(...hv) + 60) / 50) * 50];
  const clientRows = D.clientType.map((c) => ({ ...c, netMn: ((c.buyPct - c.sellPct) / 100) * M.normalValueMn }));
  const maxNet = Math.max(...clientRows.map((r) => Math.abs(r.netMn)));
  const secRows = D.sectorPerformance.slice(0, allSec ? undefined : 5);
  const V = D.volumeSpikes;
  const T = D.technicalLevels;

  const kpis = [
    ['Turnover', cr(M.totalValueMn), `${sign(pctChg(M.totalValueMn, M.prevValueMn))}${fx(pctChg(M.totalValueMn, M.prevValueMn))}% vs prev`, `incl. block ${cr(M.blockValueMn)}`],
    ['Market P/E', M.pe != null ? fx(M.pe) : '—', M.prevPe != null ? `prev ${fx(M.prevPe)}` : 'Awaiting DSE snippet', `A/D ${fx(adRatio)} : 1`],
    ['Volume', `${inr(M.totalVolume / 1e7)} cr`, `${sign(pctChg(M.totalVolume, M.prevVolume))}${fx(pctChg(M.totalVolume, M.prevVolume))}% vs prev`, 'shares'],
    ['Trades', M.totalTrades.toLocaleString('en-IN'), `${sign(pctChg(M.totalTrades, M.prevTrades))}${fx(pctChg(M.totalTrades, M.prevTrades))}% vs prev`, ''],
    ['Market Cap', M.marketCapMn != null ? `৳${inr(M.marketCapMn / 1e6)} lakh cr` : '—',
      M.marketCapMn != null ? `${sign(pctChg(M.marketCapMn, M.prevMarketCapMn))}${fx(pctChg(M.marketCapMn, M.prevMarketCapMn))}% vs prev` : 'Awaiting DSE snippet',
      M.marketCapUsdMn != null ? `US$${inr(M.marketCapUsdMn / 1000)} bn` : ''],
  ];

  return (
    <div className="msr">
      <style>{CSS}</style>
      <div className="wrap">

        {/* ── Header ─────────────────────────────────────────── */}
        <header className="head">
          <div>
            <div className="brand">Midway Securities Ltd. · End of Day</div>
            <h1>DSE Market Summary</h1>
          </div>
          <div className="when">
            <div className="date">{D.date}</div>
            <div className="sub">Dhaka Stock Exchange · Session close</div>
          </div>
        </header>

        {/* ── DSEX hero ──────────────────────────────────────── */}
        <section className="card" aria-label="DSEX index">
          <div className="hero">
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                <span className="eyebrow" style={{ color: C.sub, fontSize: 11 }}>DSEX Index</span>
                <span className="pill" style={{ color: acc, background: up ? C.upSoft : C.downSoft }}>{up ? '▲' : '▼'} {sign(dsex.changePercent)}{fx(dsex.changePercent)}%</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, flexWrap: 'wrap' }}>
                <span className="big">{fx(dsex.value)}</span>
                <span style={{ fontSize: 19, fontWeight: 600, color: acc }}>{sign(dsex.change)}{fx(dsex.change)}</span>
              </div>
            </div>
            <div className="ohlc">
              {[['Open', dsex.open, C.ink], ['High', dsex.high, C.up], ['Low', dsex.low, C.down], ['Prev. close', dsex.previousClose, C.sub]].map(([l, v, c]) => (
                <div key={l}><span className="eyebrow">{l}</span><b style={{ color: c }}>{fx(v)}</b></div>
              ))}
            </div>
          </div>
          <IntradayChart data={D.intradayData} prev={dsex.previousClose} acc={acc} domain={[iLo, iHi]} ticks={intraTicks} />
          <div className="legend" style={{ justifyContent: 'space-between', marginTop: 8, color: C.mute }}>
            <span><span className="key" style={{ width: 16, borderTop: `2px dashed ${C.mute}` }} />Previous close {fx(dsex.previousClose)}</span>
            <span>Day range {fx(range)} pts · closed at {fx(closePos, 0)}% of range</span>
          </div>
        </section>

        {/* ── Other indices + range meter ────────────────────── */}
        <div className="idx">
          {[['DSES · Shariah', indices.dses], ['DS30 · Blue chip', indices.ds30]].map(([label, d]) => (
            <div key={label} className="card" style={{ padding: 14 }}>
              <div className="eyebrow" style={{ color: C.sub }}>{label}</div>
              <div style={{ fontSize: 20, fontWeight: 700, marginTop: 6 }}>{fx(d.value)}</div>
              <div style={{ fontSize: 12.5, color: tone(d.change), fontWeight: 600, marginTop: 2 }} className="nw">{sign(d.change)}{fx(d.change)} ({sign(d.changePercent)}{fx(d.changePercent)}%)</div>
            </div>
          ))}
          <div className="card range" style={{ padding: 14 }}>
            <div className="eyebrow" style={{ color: C.sub }}>Close in day range</div>
            <div style={{ position: 'relative', height: 8, background: C.soft, borderRadius: 99, marginTop: 16, border: `1px solid ${C.line}` }}>
              <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: `${closePos}%`, background: `linear-gradient(90deg, ${C.upSoft}, ${C.up})`, borderRadius: 99 }} />
              <div style={{ position: 'absolute', left: `${closePos}%`, top: -4, width: 14, height: 14, marginLeft: -7, borderRadius: 99, background: '#fff', border: `3px solid ${C.up}` }} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: C.mute, marginTop: 8 }}>
              <span>Low {fx(dsex.low)}</span><span>High {fx(dsex.high)}</span>
            </div>
          </div>
        </div>

        {/* ── KPI strip (swipe on phones and tablets, grid on desktop) ── */}
        <div>
          <div className="kpis" role="list" aria-label="Market statistics">
            {kpis.map(([l, v, s1, s2]) => (
              <div key={l} className="kpi" role="listitem">
                <div className="eyebrow">{l}</div>
                <div className="v">{v}</div>
                <div className="sub" style={{ marginTop: 3 }}>{s1}</div>
                {s2 && <div className="sub" style={{ color: C.mute }}>{s2}</div>}
              </div>
            ))}
          </div>
          <div className="swipe" aria-hidden="true">Swipe for more →</div>
        </div>

        {/* ── Commentary ─────────────────────────────────────── */}
        <section className="dark" aria-label="Market commentary">
          <div className="ttl" style={{ alignItems: 'flex-start', marginBottom: 14 }}>
            <div style={{ flex: '1 1 200px', minWidth: 0 }}>
              <div className="eyebrow" style={{ color: C.dUp, letterSpacing: '.12em' }}>Market Commentary</div>
              <h2 className="headline" style={{ fontFamily: en ? FONT : BN_FONT }}>{en ? D.commentary.headline.en : D.commentary.headline.bn}</h2>
            </div>
            <Seg en={en} onToggle={setEn} label="Commentary language" />
          </div>
          <div lang={en ? 'en' : 'bn'}>
            {paras.map((p, i) => <p key={i} className={`para ${en ? '' : 'bn'}`} style={{ fontFamily: en ? FONT : BN_FONT }}>{p}</p>)}
          </div>
        </section>

        {/* ── Client type ────────────────────────────────────── */}
        <section className="card" aria-label="Who bought, who sold">
          <div className="ttl"><h2 className="h2">Who Bought, Who Sold</h2><span className="hint">DSE client type-wise statistics</span></div>

          <ul className="lst sm-only">
            {clientRows.map((r) => (
              <li key={r.type}>
                <div className="grow">
                  <b>{r.type}</b>
                  <div className="sub">Buy {fx(r.buyPct)}% · Sell {fx(r.sellPct)}%</div>
                </div>
                <div className="r">
                  <b style={{ color: tone(r.netMn) }} className="nw">{sCr(r.netMn)}</b>
                  <div className="sub nw">{fx(r.totalPct)}% of trading</div>
                </div>
              </li>
            ))}
          </ul>
          <table className="md-only">
            <thead><tr><th>Client</th><th>Share of trading</th><th>Buy %</th><th>Sell %</th><th style={{ width: '36%' }}>Net</th></tr></thead>
            <tbody>
              {clientRows.map((r) => (
                <tr key={r.type}>
                  <td style={{ fontWeight: 600 }}>{r.type}</td>
                  <td style={{ color: C.sub }}>{fx(r.totalPct)}%</td>
                  <td>{fx(r.buyPct)}%</td>
                  <td>{fx(r.sellPct)}%</td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, justifyContent: 'flex-end' }}>
                      <div style={{ position: 'relative', flex: 1, maxWidth: 120, height: 8 }}>
                        <div style={{ position: 'absolute', left: '50%', top: -3, bottom: -3, width: 1, background: C.line }} />
                        <div style={{ position: 'absolute', top: 0, height: 8, borderRadius: 2, background: r.netMn >= 0 ? C.up : C.down,
                          left: r.netMn >= 0 ? '50%' : `${50 - (Math.abs(r.netMn) / maxNet) * 50}%`, width: `${(Math.abs(r.netMn) / maxNet) * 50}%` }} />
                      </div>
                      <b style={{ color: tone(r.netMn) }} className="nw">{sCr(r.netMn)}</b>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="note">Source: DSE Daily Market Snippet. Net = (buy % − sell %) × public-market turnover of {cr(M.normalValueMn)}.</div>

          <div style={{ borderTop: `1px solid ${C.line}`, marginTop: 16, paddingTop: 14 }}>
            <div className="ttl" style={{ marginBottom: 4 }}>
              <div style={{ fontSize: 12.5, fontWeight: 650 }}>Net flow · last {D.clientFlowHistory.length} sessions <span style={{ color: C.mute, fontWeight: 500 }}>(৳ crore)</span></div>
              <div className="legend">
                {SERIES.map(([, l, c]) => <span key={l}><span className="key" style={{ width: 10, height: 10, borderRadius: 2, background: c }} />{l}</span>)}
              </div>
            </div>
            <FlowChart rows={D.clientFlowHistory} />
            <div className="note">Tap a day for values. {D.clientFlowNote}</div>
          </div>
        </section>

        {/* ── Technical view ─────────────────────────────────── */}
        <section className="dark" aria-label="DSEX last 30 sessions">
          <div className="ttl" style={{ marginBottom: 4 }}>
            <h2 className="h2" style={{ color: '#fff' }}>DSEX · Last {D.historicalData.length} Sessions</h2>
            <div className="legend">
              <span><span className="key" style={{ width: 14, height: 2, background: C.dUp }} />DSEX close</span>
              <span><span className="key" style={{ width: 14, borderTop: `2px dashed ${C.gold}` }} />20-day avg</span>
              <span><span className="key" style={{ width: 10, height: 10, borderRadius: 2, background: '#475569' }} />Turnover</span>
            </div>
          </div>
          <HistoryChart rows={D.historicalData} domain={histDomain} />
          <div className="tech">
            {[
              ['20-day avg', fx(T.dma20), `${fx(Math.abs(pctChg(dsex.value, T.dma20)))}% ${dsex.value >= T.dma20 ? 'above' : 'below'}`, C.gold, ''],
              ['RSI (14)', fx(T.rsi14, 1), T.rsi14 >= 70 ? 'Overbought' : T.rsi14 <= 30 ? 'Oversold' : 'Neutral', C.dSub, ''],
              ['Support', fx(T.support), T.supportLabel, C.dDown, ''],
              ['Resistance', fx(T.resistance), T.resistanceLabel, C.dUp, ''],
              ['30-session range', `${inr(T.low30, 0)} – ${inr(T.high30, 0)}`, `${sign(T.recoveryFromLowPct)}${fx(T.recoveryFromLowPct)}% vs ${T.low30Label} low`, C.dSub, 'wide'],
            ].map(([l, v, s, c, cls]) => (
              <div key={l} className={`tile ${cls}`}>
                <div className="eyebrow" style={{ color: c }}>{l}</div>
                <div style={{ fontSize: 16, fontWeight: 700, color: '#fff', marginTop: 4 }} className="nw">{v}</div>
                <div style={{ fontSize: 11, color: C.dSub, marginTop: 2 }}>{s}</div>
              </div>
            ))}
          </div>
          <div className="note">Tap the chart for daily values. 20-day average and RSI computed from DSE's last {D.historicalData.length} published closes ({D.historicalData[0].date} – {D.historicalData[D.historicalData.length - 1].date}).</div>
        </section>

        {/* ── Breadth ────────────────────────────────────────── */}
        <div className="g2">
          <section className="card" aria-label="Market breadth">
            <div className="ttl"><h2 className="h2">Market Breadth</h2><span className="pill" style={{ color: C.up, background: C.upSoft }}>{fx(adRatio)} : 1</span></div>
            <div style={{ display: 'flex', height: 12, borderRadius: 99, overflow: 'hidden', gap: 2 }}>
              <div style={{ width: `${B.gainers.percent}%`, background: C.up }} />
              <div style={{ width: `${B.losers.percent}%`, background: C.down }} />
              <div style={{ width: `${B.unchanged.percent}%`, background: '#c9ced8' }} />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: 8, marginTop: 14 }}>
              {[['Advanced', B.gainers, C.up], ['Declined', B.losers, C.down], ['Unchanged', B.unchanged, C.flat]].map(([l, d, c]) => (
                <div key={l}>
                  <div style={{ fontSize: 22, fontWeight: 700, color: c }}>{d.count}</div>
                  <div className="sub">{l}</div>
                  <div className="sub" style={{ color: C.mute }}>{fx(d.percent, 1)}%</div>
                </div>
              ))}
            </div>
            <div className="note">Official DSE count; excludes SME board.</div>
          </section>

          <section className="card" aria-label="Category-wise breadth">
            <div className="ttl"><h2 className="h2">Category-wise Breadth</h2></div>
            <table>
              <thead><tr><th>Cat.</th><th>Adv</th><th>Dec</th><th>Unch</th><th>Turnover</th></tr></thead>
              <tbody>
                {D.categoryBreadth.map((c) => (
                  <tr key={c.category}>
                    <td><span className="pill" style={{ color: C.ink, background: C.soft }}>{c.category}</span></td>
                    <td style={{ color: C.up, fontWeight: 600 }}>{c.gainers}</td>
                    <td style={{ color: C.down, fontWeight: 600 }}>{c.losers}</td>
                    <td style={{ color: C.sub }}>{c.unchanged}</td>
                    <td style={{ fontWeight: 600 }} className="nw">{cr(c.turnoverMn)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        </div>

        {/* ── Sectors (Top 5 + Show All on every screen) ─────── */}
        <section className="card" aria-label="Sector turnover">
          <div className="ttl">
            <h2 className="h2">Sector Turnover · Top {secRows.length}</h2>
            <Seg en={secEn} onToggle={setSecEn} label="Sector note language" />
          </div>
          <ul style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {secRows.map((s) => {
              const net = s.adv - s.dec;
              return (
                <li key={s.sector} className="srow">
                  <div className="nm">{s.sector}</div>
                  <div className="bar" style={{ background: C.soft, borderRadius: 99, height: 8, overflow: 'hidden' }}>
                    <div style={{ width: `${(s.valueMn / maxSec) * 100}%`, height: '100%', borderRadius: 99, background: net >= 0 ? C.up : C.down, opacity: 0.85 }} />
                  </div>
                  <div className="val">
                    <b>{cr(s.valueMn)}</b><span style={{ color: C.mute }}> · </span>
                    <span style={{ color: C.up }}>{s.adv}▲</span> <span style={{ color: C.down }}>{s.dec}▼</span>
                  </div>
                </li>
              );
            })}
          </ul>
          {D.sectorPerformance.length > 5 && <More open={allSec} onClick={() => setAllSec(!allSec)} total={D.sectorPerformance.length} />}
          <div style={{ marginTop: 14, padding: '12px 14px', background: C.soft, borderRadius: 12, fontSize: secEn ? 13 : 14, lineHeight: secEn ? 1.65 : 1.85, color: C.sub, fontFamily: secEn ? FONT : BN_FONT }} lang={secEn ? 'en' : 'bn'}>
            {secEn ? D.sectorCommentary.en : D.sectorCommentary.bn}
          </div>
          <div className="note">Public-market turnover (excl. block &amp; SME). Bar length = turnover; bar colour = net advancers vs decliners in the sector.</div>
        </section>

        {/* ── Movers ─────────────────────────────────────────── */}
        <div className="g2">
          {[['Top Gainers', D.topGainers, C.up], ['Top Losers', D.topLosers, C.down]].map(([t, rows, c]) => (
            <section key={t} className="card" aria-label={t}>
              <div className="ttl"><h2 className="h2" style={{ color: c }}>{t}</h2></div>
              <table>
                <thead><tr><th>Symbol</th><th>Close (৳)</th><th>Change</th></tr></thead>
                <tbody>
                  {rows.map((r) => (
                    <tr key={r.symbol}>
                      <td style={{ fontWeight: 600 }}>{r.symbol}</td>
                      <td>{fx(r.close)}</td>
                      <td><Chg v={r.change} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </section>
          ))}
        </div>

        {/* ── Turnover leaders ───────────────────────────────── */}
        <section className="card" aria-label="Turnover leaders">
          <div className="ttl">
            <h2 className="h2">Turnover Leaders · Top <span className="sm-only" style={{ display: 'inline' }}>{allTv ? D.topValue.length : Math.min(5, D.topValue.length)}</span><span className="md-inline">{D.topValue.length}</span></h2>
            <span className="hint">Public market, ৳ crore</span>
          </div>
          <ol className="lst sm-only">
            {D.topValue.slice(0, allTv ? undefined : 5).map((r, i) => (
              <li key={r.symbol}>
                <span className="rk">{i + 1}</span>
                <div className="grow">
                  <b>{r.symbol}</b>
                  <div className="sub">{r.sector} · Close {fx(r.close)}</div>
                </div>
                <div className="r">
                  <b className="nw">{inr(r.valueMn / 10)}</b>
                  <div style={{ fontSize: 12.5 }}><Chg v={r.change} /></div>
                </div>
              </li>
            ))}
          </ol>
          {D.topValue.length > 5 && <More className="sm-only" open={allTv} onClick={() => setAllTv(!allTv)} total={D.topValue.length} />}
          <table className="md-only">
            <thead><tr><th>#&nbsp;&nbsp;Symbol</th><th style={{ textAlign: 'left' }}>Sector</th><th>Turnover</th><th>Close</th><th>Change</th></tr></thead>
            <tbody>
              {D.topValue.map((r, i) => (
                <tr key={r.symbol}>
                  <td style={{ fontWeight: 600 }} className="nw"><span style={{ color: C.mute, display: 'inline-block', width: 24 }}>{i + 1}</span>{r.symbol}</td>
                  <td style={{ textAlign: 'left', color: C.sub, fontSize: 12 }}>{r.sector}</td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, justifyContent: 'flex-end' }}>
                      <div style={{ flex: 1, maxWidth: 110, minWidth: 40, height: 6, background: C.soft, borderRadius: 99 }}>
                        <div style={{ width: `${(r.valueMn / maxVal) * 100}%`, height: '100%', background: '#94a3b8', borderRadius: 99, marginLeft: 'auto' }} />
                      </div>
                      <b>{inr(r.valueMn / 10)}</b>
                    </div>
                  </td>
                  <td>{fx(r.close)}</td>
                  <td><Chg v={r.change} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        {/* ── Volume spikes (Top 3 + Show All on phones) ─────── */}
        <section className="dark" aria-label="Volume spikes">
          <div className="ttl" style={{ marginBottom: 8 }}>
            <h2 className="h2" style={{ color: '#fff' }}>Volume Spikes</h2>
            <span className="pill" style={{ color: C.gold, background: 'rgba(245,181,68,.12)' }}>{V.totalCount} stocks ≥ 2× previous-day volume</span>
          </div>
          <p style={{ fontSize: 13, color: C.dSub, marginBottom: 12, lineHeight: 1.6 }}>
            Of these, <b style={{ color: C.dUp }}>{V.up} rose</b>, <b style={{ color: C.dDown }}>{V.down} fell</b> and {V.unchanged} were unchanged · combined turnover <b style={{ color: '#fff' }}>{cr(V.turnoverMn)}</b> ({fx(V.sharePct, 1)}% of market)
          </p>
          <div className="spk">
            {V.top.map((s, i) => {
              const tn = s.change > 0 ? C.dUp : s.change < 0 ? C.dDown : C.dSub;
              return (
                <div key={s.symbol} className={`scard ${i >= 3 && !allSp ? 'xs-hide' : ''}`}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 8 }}>
                    <span style={{ fontSize: 13.5, fontWeight: 700, color: '#fff' }} className="nw">
                      {s.symbol}
                      {s.circuit && <span style={{ fontSize: 9, fontWeight: 700, color: C.ink, background: s.circuit === 'UC' ? C.dUp : C.dDown, borderRadius: 4, padding: '1px 5px', marginLeft: 6, verticalAlign: 'middle' }}>{s.circuit}</span>}
                    </span>
                    <span style={{ fontSize: 11, color: C.dMute, textAlign: 'right', minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{s.sector}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 8, marginTop: 6 }}>
                    <span style={{ fontSize: 26, fontWeight: 700, color: C.gold, lineHeight: 1 }}>{fx(s.spike, 1)}×</span>
                    <span style={{ fontSize: 12, textAlign: 'right' }}>
                      <span style={{ color: tn, fontWeight: 600 }}>{sign(s.change)}{fx(s.change)}%</span>
                      <span style={{ color: C.dSub, display: 'block' }}>{cr(s.valueMn)}</span>
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
          {V.top.length > 3 && <More className="sm-only" open={allSp} onClick={() => setAllSp(!allSp)} total={V.top.length} />}
          <div className="note">Volume multiple = today's volume ÷ previous session's. Top {V.top.length} by multiple among stocks with turnover ≥ ৳1 crore. UC / LC = closed at upper / lower circuit limit.</div>
        </section>

        {/* ── Block market ───────────────────────────────────── */}
        <section className="card" aria-label="Block market">
          <div className="ttl"><h2 className="h2">Block Market · Top 5 by Value</h2></div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px 16px', fontSize: 12, color: C.sub, marginBottom: 10 }}>
            <span>Trades <b style={{ color: C.ink }}>{D.blockMarket.summary.totalTrades}</b></span>
            <span>Scrips <b style={{ color: C.ink }}>{D.blockMarket.summary.totalScrips}</b></span>
            <span className="nw">Value <b style={{ color: C.ink }}>{cr(D.blockMarket.summary.totalValueMn)}</b></span>
            <span className="nw">Share <b style={{ color: C.ink }}>{fx(blockShare, 1)}%</b></span>
          </div>
          <ul className="lst sm-only">
            {D.blockMarket.top5.map((b) => (
              <li key={b.symbol}>
                <div className="grow">
                  <b>{b.symbol}</b>
                  <div className="sub">{qty(b.quantity)} @ ৳{b.maxPrice === b.minPrice ? fx(b.maxPrice) : `${fx(b.minPrice)}–${fx(b.maxPrice)}`} · {b.trades} {b.trades === 1 ? 'trade' : 'trades'}</div>
                </div>
                <div className="r"><b className="nw">{cr(b.valueMn)}</b></div>
              </li>
            ))}
          </ul>
          <table className="md-only">
            <thead><tr><th>Symbol</th><th>Trades</th><th>Quantity</th><th>Price (৳)</th><th>Value (৳ crore)</th></tr></thead>
            <tbody>
              {D.blockMarket.top5.map((b) => (
                <tr key={b.symbol}>
                  <td style={{ fontWeight: 600 }}>{b.symbol}</td>
                  <td>{b.trades}</td>
                  <td>{qty(b.quantity)}</td>
                  <td>{b.maxPrice === b.minPrice ? fx(b.maxPrice) : `${fx(b.minPrice)} – ${fx(b.maxPrice)}`}</td>
                  <td style={{ fontWeight: 600 }}>{inr(b.valueMn / 10)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        {/* ── Footer ─────────────────────────────────────────── */}
        <footer style={{ textAlign: 'center', padding: '6px 8px 2px', fontSize: 11, color: C.mute, lineHeight: 1.6 }}>
          <div style={{ fontWeight: 600, color: C.sub }}>MIDWAY SECURITIES LTD — Daily Market Analysis · {REPORT_VERSION}</div>
          Sources: DSE Website (Daily Market Snippet, Recent Market Information, Block Report). For information only; not investment advice.
        </footer>
      </div>
    </div>
  );
}
