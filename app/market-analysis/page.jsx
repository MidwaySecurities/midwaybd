'use client'
import React, { useState, useEffect } from 'react';
import { AreaChart, Area, ComposedChart, BarChart, Line, Bar, Cell, XAxis, YAxis, ResponsiveContainer, Tooltip, ReferenceLine, ReferenceDot } from 'recharts';

const DAILY_DATA = {

  date: 'September 24, 2026 (Thursday)',

  indices: {
    dsex: {
      value: 5578.32760,
      change: -17.89099,
      changePercent: -0.32,
      high: 5632.29866,
      low: 5578.32760,
      open: 5596.21859,
      previousClose: 5596.21859,
    },
    dses: { value: 1115.89, change: -3.43, changePercent: -0.31 },
    ds30: { value: 2112.13, change: -10.60, changePercent: -0.50 },
  },

  technicalLevels: {
    dma20: 5552.21,
    rsi14: 51.9,
    support: 5540.32,
    supportLabel: "Sep 22 close / Sep 23 open",
    resistance: 5632.30,
    resistanceLabel: "Sep 24 intraday high (rejected)",
    low30: 5379.00,
    low30Label: "Sep 14",
    high30: 5883.91,
    recoveryFromLowPct: 3.71,
  },

  historicalData: [
    { date: 'Aug 13', value: 5883.91, dma20: null, valueMn: 9256.69 },
    { date: 'Aug 16', value: 5859.98, dma20: null, valueMn: 11307.67 },
    { date: 'Aug 17', value: 5814.27, dma20: null, valueMn: 9948.55 },
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
    { date: 'Sep 10', value: 5515.17, dma20: 5671.98, valueMn: 5444.26 },
    { date: 'Sep 13', value: 5418.55, dma20: 5648.71, valueMn: 5713.18 },
    { date: 'Sep 14', value: 5379.00, dma20: 5624.66, valueMn: 4865.53 },
    { date: 'Sep 15', value: 5472.46, dma20: 5607.57, valueMn: 5048.69 },
    { date: 'Sep 16', value: 5494.07, dma20: 5593.59, valueMn: 5562.09 },
    { date: 'Sep 17', value: 5532.15, dma20: 5581.71, valueMn: 6554.26 },
    { date: 'Sep 20', value: 5592.21, dma20: 5572.02, valueMn: 7473.82 },
    { date: 'Sep 21', value: 5550.50, dma20: 5563.43, valueMn: 7887.06 },
    { date: 'Sep 22', value: 5540.32, dma20: 5558.27, valueMn: 7914.88 },
    { date: 'Sep 23', value: 5596.22, dma20: 5556.08, valueMn: 8446.97 },
    { date: 'Sep 24', value: 5578.33, dma20: 5552.21, valueMn: 7563.16 },
  ],

  marketSummary: {
    totalTrades: 202860,
    totalVolume: 238268268,
    totalValueMn: 7563.161,
    issuesAdvanced: 141,
    issuesDeclined: 190,
    issuesUnchanged: 57,
    prevTrades: 217984,
    prevVolume: 267998402,
    prevValueMn: 8446.967,
    marketCapMn: 6905719,
    prevMarketCapMn: 6944297.002,
    marketCapUsdMn: 56030,
    pe: 8.86,
    prevPe: 8.88,
    normalValueMn: 7029.84,
    blockValueMn: 531.60,
    smeValueMn: 95.73,
  },

  marketBreadth: {
    gainers: { count: 141, percent: 36.3 },
    losers: { count: 190, percent: 49.0 },
    unchanged: { count: 57, percent: 14.7 },
  },

  clientType: [
    { type: 'Retail', buyPct: 86.27, sellPct: 87.19, totalPct: 86.73 },
    { type: 'Institution', buyPct: 9.28, sellPct: 7.11, totalPct: 8.19 },
    { type: 'Foreign', buyPct: 2.09, sellPct: 3.79, totalPct: 2.94 },
    { type: 'Dealer', buyPct: 1.37, sellPct: 0.78, totalPct: 1.08 },
    { type: 'Others', buyPct: 0.99, sellPct: 1.13, totalPct: 1.06 },
  ],

  clientFlowNote: "Sources: DSE Trade Participants report (to Sep 21) and DSE Daily Market Snippet (Sep 23 onward). Sep 22 not available.",

  clientFlowHistory: [   // net buy (+) / sell (−), BDT mn. Optional per-row flag: '<reason>' fades a bar when its figure may diverge materially
    { date: 'Sep 2', retail: 197, institution: -139, foreign: -68, dealer: 0 },
    { date: 'Sep 3', retail: -96, institution: 11, foreign: 51, dealer: -2 },
    { date: 'Sep 6', retail: -24, institution: 10, foreign: -2, dealer: 16 },
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
  ],

  categoryBreadth: [
    { category: 'A', gainers: 89, losers: 82, unchanged: 23, turnoverMn: 4982.94 },
    { category: 'B', gainers: 10, losers: 60, unchanged: 4, turnoverMn: 1745.02 },
    { category: 'Z', gainers: 41, losers: 46, unchanged: 30, turnoverMn: 301.86 },
  ],

  volumeSpikes: {
    totalCount: 41,
    up: 25,
    down: 12,
    unchanged: 4,
    turnoverMn: 959.42,
    sharePct: 13.648,
    top: [
      { symbol: 'RENATA', sector: "Pharma & Chem.", spike: 7.584, change: 0.04, valueMn: 52.96, circuit: null },
      { symbol: 'ORIONPHARM', sector: "Pharma & Chem.", spike: 5.307, change: 9.82, valueMn: 58.66, circuit: 'UC' },
      { symbol: 'CNATEX', sector: "Textile", spike: 4.746, change: 10.00, valueMn: 14.89, circuit: 'UC' },
      { symbol: 'SIPLC', sector: "Gen. Insurance", spike: 4.724, change: 9.97, valueMn: 123.75, circuit: 'UC' },
      { symbol: 'EMERALDOIL', sector: "Food & Allied", spike: 4.389, change: 7.69, valueMn: 16.47, circuit: null },
      { symbol: 'PRAGATIINS', sector: "Gen. Insurance", spike: 3.411, change: 1.20, valueMn: 12.11, circuit: null },
    ],
  },

  sectorPerformance: [
    { sector: "Gen. Insurance", valueMn: 1259.91, prevValueMn: 963.23, changePct: 30.80, percent: 17.92, adv: 38, dec: 3 },
    { sector: "Textile", valueMn: 1208.76, prevValueMn: 1578.62, changePct: -23.43, percent: 17.19, adv: 17, dec: 32 },
    { sector: "Pharma & Chemicals", valueMn: 961.27, prevValueMn: 1413.52, changePct: -31.99, percent: 13.67, adv: 11, dec: 20 },
    { sector: "Miscellaneous", valueMn: 561.13, prevValueMn: 425.31, changePct: 31.93, percent: 7.98, adv: 5, dec: 9 },
    { sector: "Mutual Funds", valueMn: 540.65, prevValueMn: 611.06, changePct: -11.52, percent: 7.69, adv: 23, dec: 1 },
    { sector: "Banks", valueMn: 502.61, prevValueMn: 447.82, changePct: 12.23, percent: 7.15, adv: 5, dec: 15 },
    { sector: "Engineering", valueMn: 477.49, prevValueMn: 646.49, changePct: -26.14, percent: 6.79, adv: 6, dec: 28 },
    { sector: "Financial Institutions", valueMn: 294.15, prevValueMn: 265.66, changePct: 10.72, percent: 4.18, adv: 4, dec: 9 },
  ],

  intradayData: [
    { time: '10:00', value: 5596.22 },
    { time: '10:01', value: 5612.81 },
    { time: '10:02', value: 5616.3 },
    { time: '10:03', value: 5619.22 },
    { time: '10:04', value: 5622.52 },
    { time: '10:05', value: 5623.88 },
    { time: '10:06', value: 5623.88 },
    { time: '10:07', value: 5624.27 },
    { time: '10:08', value: 5624.08 },
    { time: '10:09', value: 5624.46 },
    { time: '10:10', value: 5625.05 },
    { time: '10:11', value: 5625.82 },
    { time: '10:12', value: 5625.05 },
    { time: '10:13', value: 5624.46 },
    { time: '10:14', value: 5624.46 },
    { time: '10:15', value: 5624.46 },
    { time: '10:16', value: 5625.44 },
    { time: '10:17', value: 5625.44 },
    { time: '10:18', value: 5626.6 },
    { time: '10:19', value: 5627.38 },
    { time: '10:20', value: 5628.16 },
    { time: '10:21', value: 5629.32 },
    { time: '10:22', value: 5630.1 },
    { time: '10:23', value: 5629.52 },
    { time: '10:24', value: 5629.52 },
    { time: '10:25', value: 5629.9 },
    { time: '10:26', value: 5632.3 },
    { time: '10:27', value: 5630.1 },
    { time: '10:28', value: 5629.52 },
    { time: '10:29', value: 5629.32 },
    { time: '10:30', value: 5629.9 },
    { time: '10:31', value: 5628.93 },
    { time: '10:32', value: 5627.18 },
    { time: '10:33', value: 5626.21 },
    { time: '10:34', value: 5624.66 },
    { time: '10:35', value: 5623.88 },
    { time: '10:36', value: 5624.85 },
    { time: '10:37', value: 5625.24 },
    { time: '10:38', value: 5625.24 },
    { time: '10:39', value: 5625.05 },
    { time: '10:40', value: 5623.3 },
    { time: '10:41', value: 5622.33 },
    { time: '10:42', value: 5621.74 },
    { time: '10:43', value: 5621.55 },
    { time: '10:44', value: 5620.77 },
    { time: '10:45', value: 5619.8 },
    { time: '10:46', value: 5618.44 },
    { time: '10:47', value: 5616.3 },
    { time: '10:48', value: 5615.33 },
    { time: '10:49', value: 5614.75 },
    { time: '10:50', value: 5614.75 },
    { time: '10:51', value: 5614.75 },
    { time: '10:52', value: 5614.36 },
    { time: '10:53', value: 5614.56 },
    { time: '10:54', value: 5613.97 },
    { time: '10:55', value: 5614.75 },
    { time: '10:56', value: 5615.14 },
    { time: '10:57', value: 5615.53 },
    { time: '10:58', value: 5615.53 },
    { time: '10:59', value: 5615.53 },
    { time: '11:00', value: 5615.72 },
    { time: '11:01', value: 5616.89 },
    { time: '11:02', value: 5616.89 },
    { time: '11:03', value: 5616.11 },
    { time: '11:04', value: 5617.66 },
    { time: '11:05', value: 5617.47 },
    { time: '11:06', value: 5616.89 },
    { time: '11:07', value: 5617.86 },
    { time: '11:08', value: 5617.86 },
    { time: '11:09', value: 5618.44 },
    { time: '11:10', value: 5619.02 },
    { time: '11:11', value: 5619.8 },
    { time: '11:12', value: 5620.58 },
    { time: '11:13', value: 5621.74 },
    { time: '11:14', value: 5621.74 },
    { time: '11:15', value: 5621.74 },
    { time: '11:16', value: 5622.52 },
    { time: '11:17', value: 5622.13 },
    { time: '11:18', value: 5621.55 },
    { time: '11:19', value: 5622.52 },
    { time: '11:20', value: 5622.13 },
    { time: '11:21', value: 5621.55 },
    { time: '11:22', value: 5620.97 },
    { time: '11:23', value: 5620.19 },
    { time: '11:24', value: 5621.74 },
    { time: '11:25', value: 5620.97 },
    { time: '11:26', value: 5620.0 },
    { time: '11:27', value: 5619.02 },
    { time: '11:28', value: 5619.02 },
    { time: '11:29', value: 5619.02 },
    { time: '11:30', value: 5618.44 },
    { time: '11:31', value: 5618.25 },
    { time: '11:32', value: 5618.44 },
    { time: '11:33', value: 5618.25 },
    { time: '11:34', value: 5618.44 },
    { time: '11:35', value: 5618.05 },
    { time: '11:36', value: 5617.47 },
    { time: '11:37', value: 5616.3 },
    { time: '11:38', value: 5615.72 },
    { time: '11:39', value: 5615.14 },
    { time: '11:40', value: 5614.75 },
    { time: '11:41', value: 5613.58 },
    { time: '11:42', value: 5612.81 },
    { time: '11:43', value: 5611.84 },
    { time: '11:44', value: 5610.28 },
    { time: '11:45', value: 5608.53 },
    { time: '11:46', value: 5608.14 },
    { time: '11:47', value: 5607.76 },
    { time: '11:48', value: 5606.98 },
    { time: '11:49', value: 5606.78 },
    { time: '11:50', value: 5605.81 },
    { time: '11:51', value: 5605.81 },
    { time: '11:52', value: 5604.45 },
    { time: '11:53', value: 5604.26 },
    { time: '11:54', value: 5603.87 },
    { time: '11:55', value: 5603.68 },
    { time: '11:56', value: 5604.45 },
    { time: '11:57', value: 5603.48 },
    { time: '11:58', value: 5602.12 },
    { time: '11:59', value: 5599.79 },
    { time: '12:00', value: 5599.21 },
    { time: '12:01', value: 5598.82 },
    { time: '12:02', value: 5597.65 },
    { time: '12:03', value: 5598.24 },
    { time: '12:04', value: 5598.43 },
    { time: '12:05', value: 5598.04 },
    { time: '12:06', value: 5595.9 },
    { time: '12:07', value: 5595.71 },
    { time: '12:08', value: 5595.71 },
    { time: '12:09', value: 5594.93 },
    { time: '12:10', value: 5593.77 },
    { time: '12:11', value: 5593.77 },
    { time: '12:12', value: 5592.8 },
    { time: '12:13', value: 5591.82 },
    { time: '12:14', value: 5592.21 },
    { time: '12:15', value: 5590.85 },
    { time: '12:16', value: 5589.88 },
    { time: '12:17', value: 5589.69 },
    { time: '12:18', value: 5588.91 },
    { time: '12:19', value: 5588.13 },
    { time: '12:20', value: 5588.13 },
    { time: '12:21', value: 5586.58 },
    { time: '12:22', value: 5586.77 },
    { time: '12:23', value: 5586.58 },
    { time: '12:24', value: 5589.1 },
    { time: '12:25', value: 5590.46 },
    { time: '12:26', value: 5591.24 },
    { time: '12:27', value: 5591.82 },
    { time: '12:28', value: 5592.8 },
    { time: '12:29', value: 5594.35 },
    { time: '12:30', value: 5596.1 },
    { time: '12:31', value: 5597.46 },
    { time: '12:32', value: 5597.85 },
    { time: '12:33', value: 5599.4 },
    { time: '12:34', value: 5600.57 },
    { time: '12:35', value: 5601.34 },
    { time: '12:36', value: 5601.54 },
    { time: '12:37', value: 5602.7 },
    { time: '12:38', value: 5602.7 },
    { time: '12:39', value: 5602.7 },
    { time: '12:40', value: 5602.7 },
    { time: '12:41', value: 5603.87 },
    { time: '12:42', value: 5605.04 },
    { time: '12:43', value: 5605.04 },
    { time: '12:44', value: 5604.65 },
    { time: '12:45', value: 5604.06 },
    { time: '12:46', value: 5602.12 },
    { time: '12:47', value: 5601.73 },
    { time: '12:48', value: 5601.34 },
    { time: '12:49', value: 5600.96 },
    { time: '12:50', value: 5599.79 },
    { time: '12:51', value: 5599.21 },
    { time: '12:52', value: 5597.65 },
    { time: '12:53', value: 5596.1 },
    { time: '12:54', value: 5595.13 },
    { time: '12:55', value: 5594.35 },
    { time: '12:56', value: 5593.57 },
    { time: '12:57', value: 5594.35 },
    { time: '12:58', value: 5593.77 },
    { time: '12:59', value: 5593.77 },
    { time: '13:00', value: 5592.8 },
    { time: '13:01', value: 5591.44 },
    { time: '13:02', value: 5589.69 },
    { time: '13:03', value: 5589.49 },
    { time: '13:04', value: 5589.49 },
    { time: '13:05', value: 5589.88 },
    { time: '13:06', value: 5589.69 },
    { time: '13:07', value: 5589.88 },
    { time: '13:08', value: 5590.66 },
    { time: '13:09', value: 5591.05 },
    { time: '13:10', value: 5591.44 },
    { time: '13:11', value: 5593.77 },
    { time: '13:12', value: 5593.77 },
    { time: '13:13', value: 5593.57 },
    { time: '13:14', value: 5593.77 },
    { time: '13:15', value: 5593.77 },
    { time: '13:16', value: 5594.35 },
    { time: '13:17', value: 5594.54 },
    { time: '13:18', value: 5593.57 },
    { time: '13:19', value: 5594.35 },
    { time: '13:20', value: 5594.35 },
    { time: '13:21', value: 5594.35 },
    { time: '13:22', value: 5593.38 },
    { time: '13:23', value: 5593.38 },
    { time: '13:24', value: 5593.38 },
    { time: '13:25', value: 5593.38 },
    { time: '13:26', value: 5593.38 },
    { time: '13:27', value: 5593.38 },
    { time: '13:28', value: 5592.21 },
    { time: '13:29', value: 5592.21 },
    { time: '13:30', value: 5591.82 },
    { time: '13:31', value: 5591.82 },
    { time: '13:32', value: 5591.24 },
    { time: '13:33', value: 5592.02 },
    { time: '13:34', value: 5589.88 },
    { time: '13:35', value: 5588.52 },
    { time: '13:36', value: 5588.91 },
    { time: '13:37', value: 5587.55 },
    { time: '13:38', value: 5586.19 },
    { time: '13:39', value: 5584.64 },
    { time: '13:40', value: 5582.89 },
    { time: '13:41', value: 5585.61 },
    { time: '13:42', value: 5584.25 },
    { time: '13:43', value: 5583.47 },
    { time: '13:44', value: 5584.64 },
    { time: '13:45', value: 5584.83 },
    { time: '13:46', value: 5585.22 },
    { time: '13:47', value: 5584.83 },
    { time: '13:48', value: 5585.61 },
    { time: '13:49', value: 5585.8 },
    { time: '13:50', value: 5585.02 },
    { time: '13:51', value: 5586.77 },
    { time: '13:52', value: 5587.36 },
    { time: '13:53', value: 5586.58 },
    { time: '13:54', value: 5586.58 },
    { time: '13:55', value: 5587.16 },
    { time: '13:56', value: 5587.36 },
    { time: '13:57', value: 5586.19 },
    { time: '13:58', value: 5586.58 },
    { time: '13:59', value: 5585.02 },
    { time: '14:00', value: 5578.3276 },
    { time: '14:30', value: 5578.3276 },
  ],

  topGainers: [
    { symbol: 'CNATEX', close: 3.30, change: 10.00 },
    { symbol: 'SIPLC', close: 148.90, change: 9.97 },
    { symbol: 'ORIONPHARM', close: 30.20, change: 9.82 },
    { symbol: 'EMERALDOIL', close: 29.40, change: 7.69 },
    { symbol: 'TUNGHAI', close: 4.20, change: 7.69 },
  ],

  topLosers: [
    { symbol: 'SAIHAMTEX', close: 34.90, change: -6.68 },
    { symbol: 'APSCLBOND', close: 1060.00, change: -5.94 },
    { symbol: 'PLFSL', close: 1.70, change: -5.56 },
    { symbol: 'SEB1PBOND', close: 4380.00, change: -4.78 },
    { symbol: 'KBPPWBIL', close: 37.90, change: -4.53 },
  ],

  topValue: [
    { symbol: 'IPDC', valueMn: 236.13, close: 34.80, change: 3.57, sector: "Financial Institutions" },
    { symbol: 'GQBALLPEN', valueMn: 212.11, close: 625.00, change: 2.11, sector: "Miscellaneous" },
    { symbol: 'SQURPHARMA', valueMn: 189.15, close: 217.60, change: 0.23, sector: "Pharmaceuticals and Chemicals" },
    { symbol: 'ENVOYTEX', valueMn: 178.26, close: 73.80, change: 3.36, sector: "Textile" },
    { symbol: 'SHARPIND', valueMn: 177.25, close: 19.10, change: -3.05, sector: "Textile" },
    { symbol: 'MERCINS', valueMn: 173.91, close: 51.30, change: 5.99, sector: "Insurance" },
    { symbol: 'BRACBANK', valueMn: 156.79, close: 64.20, change: -0.47, sector: "Bank" },
    { symbol: 'SAIHAMTEX', valueMn: 156.59, close: 34.90, change: -6.68, sector: "Textile" },
    { symbol: 'SIPLC', valueMn: 123.75, close: 148.90, change: 9.97, sector: "Insurance" },
    { symbol: 'DOMINAGE', valueMn: 121.77, close: 65.70, change: -2.95, sector: "Engineering" },
  ],

  blockMarket: {
    summary: { totalTrades: 105, totalScrips: 42, totalQuantity: 5123388, totalValueMn: 531.597 },
    top5: [
      { symbol: 'FINEFOODS', quantity: 390450, maxPrice: 450.00, minPrice: 440.00, trades: 3, valueMn: 174.598 },
      { symbol: 'GQBALLPEN', quantity: 209048, maxPrice: 626.00, minPrice: 570.00, trades: 23, valueMn: 124.113 },
      { symbol: 'MARICO', quantity: 16200, maxPrice: 2650.00, minPrice: 2650.00, trades: 15, valueMn: 42.930 },
      { symbol: 'CITYGENINS', quantity: 299000, maxPrice: 128.70, minPrice: 120.00, trades: 2, valueMn: 38.420 },
      { symbol: 'BRACBANK', quantity: 463000, maxPrice: 64.50, minPrice: 64.40, trades: 2, valueMn: 29.837 },
    ],
  },

  sectorCommentary: {
    en: "Money rotated into general insurance, which led the market with ৳125.99 crore (17.9% of turnover), up 30.8% on the day with 38 of 43 issues higher, and mutual funds rebounded with 23 gainers; Textile (৳120.88 crore, −23.4%) and Pharmaceuticals (৳96.13 crore, −32.0%) cooled with decliners dominating, while Banks traded more (+12.2%) but saw 15 decliners against 5 gainers.",
    bn: "আজ টাকা ঘুরেছে সাধারণ বীমা খাতে — ৳125.99 কোটি লেনদেন নিয়ে খাতটি শীর্ষে (মোট turnover-এর 17.9%), লেনদেন বেড়েছে 30.8% এবং 43টির মধ্যে 38টির দাম বেড়েছে; Mutual Funds-ও ঘুরে দাঁড়িয়েছে, 23টির দর বেড়েছে। অন্যদিকে Textile (৳120.88 কোটি, −23.4%) ও ওষুধ খাতে (৳96.13 কোটি, −32.0%) লেনদেন কমেছে, দরপতনই বেশি। ব্যাংক খাতে লেনদেন বাড়লেও (+12.2%) 15টির দর কমেছে, বেড়েছে মাত্র 5টির।",
  },

  commentary: {
    headline: {
      en: 'Early high rejected; index closes at the day’s low',
      bn: 'শুরুর উত্থান ধরে রাখা যায়নি, দিনের সর্বনিম্নে সমাপনী',
    },
    en: [
      "The DSEX slipped 17.89 points (0.32%) to 5,578.33, giving back about a third of Wednesday's gain. The index jumped at the open and touched a high of 5,632.30 within the first half-hour, but sellers took over from late morning and it closed at the day's low. The blue-chip DS30 fell 0.50%, more than the broad index, as PUBALIBANK, BATBC, UCB and EBL weighed on the market. For the week, the DSEX still gained 0.83%, its second weekly rise in a row.",
      "Breadth turned negative, with 141 advancers against 190 decliners. Turnover eased 10.5% to ৳756.32 crore but stayed about 21% above its 20-session average, and money rotated sharply into general insurance while Textile and Pharmaceuticals lost ground. DSE's client data showed institutions as net buyers for a second straight session, at roughly ৳15.25 crore, while retail investors (about ৳6.47 crore) and foreign investors (about ৳11.95 crore) were net sellers; two sessions suggest a possible shift in institutional behaviour, but it should await confirmation. Among individual stocks, SIPLC closed at its upper circuit on nearly five times its previous volume, while SAIHAMTEX fell 6.68%, the day's biggest decline.",
      "Technically, the index held above its 20-day average of 5,552, and an RSI near 52 is neutral, so the recovery from the September 14 low remains intact for now. However, the sharp rejection at 5,632 marks that area as near-term resistance, and closing at the day's low suggests sellers had the upper hand going into the weekend. Watch Sunday: holding the 5,552–5,540 zone with institutions still buying would suggest the recovery is intact, while a close below 5,540 could open the way to the September 16 close of 5,494; a move back above 5,600 would be needed before 5,632 comes back into play.",
    ],
    bn: [
      "DSEX আজ 17.89 পয়েন্ট (0.32%) কমে 5,578.33-এ বন্ধ হয়েছে — বুধবারের উত্থানের প্রায় এক-তৃতীয়াংশ হাতছাড়া হলো। লেনদেন শুরু হতেই সূচক লাফিয়ে ওঠে এবং প্রথম আধা ঘণ্টার মধ্যেই দিনের সর্বোচ্চ 5,632.30 ছোঁয়; কিন্তু বেলা বাড়ার সঙ্গে বিক্রির চাপ বাড়তে থাকে, আর শেষে সূচক দিনের সর্বনিম্ন স্তরেই বন্ধ হয়। বড় মূলধনী শেয়ারের সূচক DS30 কমেছে 0.50%, যা সামগ্রিক সূচকের চেয়ে বেশি — PUBALIBANK, BATBC, UCB ও EBL-এর দরপতন সূচককে টেনে নামিয়েছে। তবে পুরো সপ্তাহের হিসাবে DSEX বেড়েছে 0.83%; টানা দ্বিতীয় সপ্তাহে সূচক ঊর্ধ্বমুখী।",
      "বাজারের breadth আজ নেতিবাচক — দর বেড়েছে 141টির, কমেছে 190টির। লেনদেন 10.5% কমে ৳756.32 কোটিতে নেমেছে, তবু তা গত 20 দিনের গড়ের চেয়ে প্রায় 21% বেশি; টাকা জোরেশোরে ঢুকেছে সাধারণ বীমা খাতে, আর Textile ও ওষুধ খাত পিছিয়ে পড়েছে। DSE-র তথ্যে দেখা যাচ্ছে, টানা দ্বিতীয় দিনের মতো প্রাতিষ্ঠানিক বিনিয়োগকারীরা নিট ক্রেতা — প্রায় ৳15.25 কোটি; অন্যদিকে সাধারণ বিনিয়োগকারীরা (প্রায় ৳6.47 কোটি) ও বিদেশিরা (প্রায় ৳11.95 কোটি) ছিলেন নিট বিক্রেতা। দুই দিনের এই চিত্র প্রতিষ্ঠানগুলোর আচরণে পরিবর্তনের ইঙ্গিত দিলেও নিশ্চিত হতে আরও অপেক্ষা করতে হবে। একক শেয়ারের মধ্যে SIPLC আগের দিনের প্রায় পাঁচ গুণ volume নিয়ে upper circuit-এ বন্ধ হয়েছে, আর SAIHAMTEX 6.68% কমে দিনের সবচেয়ে বড় দরপতনের শিকার।",
      "টেকনিক্যাল দিক থেকে সূচক এখনও 20 দিনের গড় 5,552-এর ওপরে, আর RSI প্রায় 52 — নিরপেক্ষ অবস্থান; ফলে 14 সেপ্টেম্বরের তলানি থেকে শুরু হওয়া পুনরুদ্ধার আপাতত টিকে আছে। তবে 5,632-এর কাছ থেকে জোরালোভাবে ফিরে আসায় ওই স্তরটি এখন কাছাকাছি resistance, আর দিনের সর্বনিম্নে বন্ধ হওয়া বলছে সপ্তাহের শেষে বিক্রেতারাই এগিয়ে ছিলেন। রবিবার যা দেখার: প্রতিষ্ঠানগুলোর কেনা অব্যাহত রেখে সূচক 5,552–5,540-এর মধ্যে টিকে থাকলে পুনরুদ্ধার অটুট বলে ধরা যাবে; আর 5,540-এর নিচে বন্ধ হলে 16 সেপ্টেম্বরের সমাপনী 5,494 পর্যন্ত নামার পথ খুলতে পারে। আবার 5,632 পরীক্ষার আগে সূচককে 5,600-এর ওপরে ফিরতে হবে।",
    ],
  },

};

// ╔════════════════════════════════════════════════════════════════════════════╗
// ║                            END OF DAILY DATA INPUT                         ║
// ╚════════════════════════════════════════════════════════════════════════════╝


// ============================================================================
// TEMPLATE ENGINE  (Tailwind CSS)
// ----------------------------------------------------------------------------
// Requires Tailwind v3.2+ (or v4) for arbitrary variants like max-[720px]:.
// Every class name below is written out in full so Tailwind's scanner can see it.
// Only truly dynamic values (bar widths, marker positions) stay as inline style.
// Recharts draws SVG, so its colours still come from the hex map `C`.
// ============================================================================

// Hex map — used ONLY for Recharts props (SVG attributes can't take Tailwind classes)
const C = {
  ink: '#0b1220', sub: '#5b6474', mute: '#8a93a3', line: '#e7e9ee',
  up: '#0f9d6b', down: '#d9423a',
};
const BRAND = '#004990';

// Font stacks as arbitrary properties (underscores become spaces)
const FONT_CLS = '[font-family:Inter,system-ui,-apple-system,Segoe_UI,sans-serif]';
const BN_CLS = '[font-family:Noto_Sans_Bengali,Hind_Siliguri,Nirmala_UI,Vrinda,sans-serif]';

const fx = (n, d = 2) => Number(n).toLocaleString('en-US', { minimumFractionDigits: d, maximumFractionDigits: d });
const sign = (n) => (n > 0 ? '+' : '');
const toneCls = (n) => (n > 0 ? 'text-[#0f9d6b]' : n < 0 ? 'text-[#d9423a]' : 'text-[#8a93a3]');
const inr = (n, d = 2) => Number(n).toLocaleString('en-IN', { minimumFractionDigits: d, maximumFractionDigits: d });
const cr = (mn, d = 2) => `৳${inr(mn / 10, d)} cr`;            // BDT million → crore
const qty = (n) => (n >= 1e7 ? `${inr(n / 1e7)} cr` : n >= 1e5 ? `${inr(n / 1e5)} lakh` : Number(n).toLocaleString('en-IN'));
const pctChg = (a, b) => ((a - b) / b) * 100;
const sCr = (mn) => `${mn > 0 ? '+' : mn < 0 ? '−' : ''}${cr(Math.abs(mn))}`;

const REPORT_VERSION = 'v2.7';

// ── Shared table classes (replace the old `.dse table/th/td` CSS) ───────────
const TBL = 'w-full border-collapse';
const TH = 'pt-0 px-2 pb-2.5 text-right text-[10px] font-semibold text-[#8a93a3] uppercase tracking-[.06em] border-b border-[#e7e9ee] first:text-left first:pl-0 last:pr-0';
const TB = 'text-[13px] [&_tr:last-child_td]:border-b-0';
const TD = 'px-2 py-2.5 text-right border-b border-[#e7e9ee] first:text-left first:pl-0 last:pr-0';

const Card = ({ children, pad = 'p-[22px]', className = '' }) => (
  <div className={`bg-white rounded-2xl border border-[#e7e9ee] max-[720px]:!p-[18px] ${pad} ${className}`}>
    {children}
  </div>
);

const Title = ({ children, right, color = 'text-[#0b1220]' }) => (
  <div className="flex justify-between items-center gap-3 mb-4 flex-wrap">
    <h2 className={`m-0 text-[13px] font-[650] tracking-[.02em] ${color}`}>{children}</h2>
    {right}
  </div>
);

const Pill = ({ children, cls }) => (
  <span className={`inline-block px-[9px] py-[3px] rounded-full text-[11px] font-semibold whitespace-nowrap ${cls}`}>{children}</span>
);

const Chg = ({ v, suffix = '%' }) => (
  <span className={`${toneCls(v)} font-semibold`}>{sign(v)}{fx(v)}{suffix}</span>
);

const LangToggle = ({ en, onToggle, darkBg }) => (
  <div className={`inline-flex rounded-full p-[3px] border ${darkBg ? 'bg-white/[.08] border-white/[.12]' : 'bg-[#f7f8fa] border-[#e7e9ee]'}`}>
    {[['EN', true], ['বাংলা', false]].map(([label, val]) => (
      <button key={label} onClick={() => onToggle(val)}
        className={`border-0 cursor-pointer rounded-full px-3 py-[5px] text-[11px] font-semibold ${val ? FONT_CLS : BN_CLS} ${
          en === val
            ? (darkBg ? 'bg-white text-[#0b1220]' : 'bg-[#0b1220] text-white')
            : (darkBg ? 'bg-transparent text-[#b8c0cc]' : 'bg-transparent text-[#5b6474]')
        }`}>{label}</button>
    ))}
  </div>
);

const IntradayTip = ({ active, payload, label }) => {
  if (!active || !payload || !payload.length) return null;
  return (
    <div className="bg-[#0b1220] text-white rounded-[10px] px-3 py-2 text-xs shadow-[0_8px_24px_rgba(0,0,0,.18)]">
      <div className="text-[#9aa4b2] text-[11px]">{label}</div>
      <div className="font-[650]">{fx(payload[0].value)}</div>
    </div>
  );
};

export default function DSEMarketAnalysis() {
  const D = DAILY_DATA;
  const { indices, marketSummary: M, marketBreadth: B } = D;
  const dsex = indices.dsex;
  const [en, setEn] = useState(true);
  const [secEn, setSecEn] = useState(true);

  useEffect(() => {
    const id = 'dse-fonts';
    if (typeof document !== 'undefined' && !document.getElementById(id)) {
      const l = document.createElement('link');
      l.id = id; l.rel = 'stylesheet';
      l.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Noto+Sans+Bengali:wght@400;500;600;700&display=swap';
      document.head.appendChild(l);
    }
  }, []);

  const up = dsex.change >= 0;
  const acc = up ? C.up : C.down;                                   // hex, for charts
  const accText = up ? 'text-[#0f9d6b]' : 'text-[#d9423a]';
  const accPill = up ? 'text-[#0f9d6b] bg-[#e7f6ef]' : 'text-[#d9423a] bg-[#fdeceb]';
  const adRatio = M.issuesAdvanced / M.issuesDeclined;
  const range = dsex.high - dsex.low;
  const closePos = ((dsex.value - dsex.low) / range) * 100;
  const blockShare = (D.blockMarket.summary.totalValueMn / M.totalValueMn) * 100;
  const maxSec = Math.max(...D.sectorPerformance.map((s) => s.valueMn));
  const maxVal = Math.max(...D.topValue.map((s) => s.valueMn));
  const highPt = D.intradayData.reduce((a, b) => (b.value > a.value ? b : a));
  const paras = en ? D.commentary.en : D.commentary.bn;
  const iv = D.intradayData.map((d) => d.value);
  const iLo = Math.floor((Math.min(...iv) - 8) / 10) * 10, iHi = Math.ceil((Math.max(...iv) + 8) / 10) * 10;
  const intraDomain = [iLo, iHi];
  const intraTicks = Array.from({ length: 5 }, (_, k) => Math.round(iLo + ((iHi - iLo) * k) / 4));
  const hv = D.historicalData.map((d) => d.value);
  const histDomain = [Math.floor((Math.min(...hv) - 60) / 50) * 50, Math.ceil((Math.max(...hv) + 60) / 50) * 50];

  return (
    <div className={`min-h-screen bg-[#f4f5f7] px-4 py-7 text-[#0b1220] tabular-nums ${FONT_CLS}`}>
      <div className="container mx-auto flex flex-col gap-4 px-4">

        {/* ── Header ─────────────────────────────────────────── */}
        <div className="flex justify-between items-end gap-3 flex-wrap px-1">
          <div>
            <div className="text-[11px] font-semibold text-[#004990] tracking-[.12em] uppercase">Midway Securities Ltd. · End of Day</div>
            <h1 className="mt-1.5 mb-0 text-[28px] font-bold tracking-[-.02em]">DSE Market Summary</h1>
          </div>
          <div className="text-right">
            <div className="text-sm font-semibold">{D.date}</div>
            <div className="text-xs text-[#5b6474] mt-0.5">Dhaka Stock Exchange · Session close</div>
          </div>
        </div>

        {/* ── DSEX hero ──────────────────────────────────────── */}
        <Card pad="p-[26px]">
          <div className="flex justify-between items-end gap-4 flex-wrap">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="text-xs font-semibold text-[#5b6474] tracking-[.08em]">DSEX INDEX</span>
                <Pill cls={accPill}>{up ? '▲' : '▼'} {sign(dsex.changePercent)}{fx(dsex.changePercent)}%</Pill>
              </div>
              <div className="flex items-baseline gap-3.5 flex-wrap">
                <span className="text-[46px] font-bold tracking-[-.03em] leading-none">{fx(dsex.value)}</span>
                <span className={`text-xl font-semibold ${accText}`}>{sign(dsex.change)}{fx(dsex.change)}</span>
              </div>
            </div>
            <div className="grid grid-cols-[repeat(4,auto)] gap-[22px] max-[720px]:grid-cols-[repeat(2,auto)] max-[720px]:gap-y-3">
              {[['Open', dsex.open, 'text-[#0b1220]'], ['High', dsex.high, 'text-[#0f9d6b]'], ['Low', dsex.low, 'text-[#d9423a]'], ['Prev. close', dsex.previousClose, 'text-[#5b6474]']].map(([l, v, c]) => (
                <div key={l}>
                  <div className="text-[10px] text-[#8a93a3] uppercase tracking-[.08em] font-semibold">{l}</div>
                  <div className={`text-[15px] font-semibold mt-[3px] ${c}`}>{fx(v)}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="h-[230px] mt-[22px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={D.intradayData} margin={{ top: 10, right: 8, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="dsexFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={acc} stopOpacity={0.22} />
                    <stop offset="100%" stopColor={acc} stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{ fill: C.mute, fontSize: 11 }} ticks={['10:00', '11:00', '12:00', '13:00', '14:00']} />
                <YAxis domain={intraDomain} ticks={intraTicks} axisLine={false} tickLine={false} tick={{ fill: C.mute, fontSize: 11 }} tickFormatter={(v) => v.toLocaleString('en-IN')} width={48} />
                <ReferenceLine y={dsex.previousClose} stroke={C.mute} strokeDasharray="4 4" />
                <Tooltip content={<IntradayTip />} cursor={{ stroke: C.line }} />
                <Area type="linear" dataKey="value" stroke={acc} strokeWidth={1.8} fill="url(#dsexFill)" dot={false} activeDot={{ r: 4 }} isAnimationActive={false} />
                <ReferenceDot x={highPt.time} y={highPt.value} r={4} fill={C.up} stroke="#fff" strokeWidth={2}
                  label={{ value: `High ${fx(dsex.high)}`, position: 'left', fill: C.up, fontSize: 11, fontWeight: 600 }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-between gap-3 flex-wrap mt-2.5 text-[11px] text-[#8a93a3]">
            <span><span className="inline-block w-4 border-t-2 border-dashed border-[#8a93a3] align-middle mr-1.5" />Previous close {fx(dsex.previousClose)}</span>
            <span>Day range {fx(range)} pts · closed at {fx(closePos, 0)}% of range</span>
          </div>
        </Card>

        {/* ── Other indices + range meter ────────────────────── */}
        <div className="grid grid-cols-3 gap-3 max-[720px]:grid-cols-1">
          {[['DSES · Shariah', indices.dses], ['DS30 · Blue chip', indices.ds30]].map(([label, d]) => (
            <Card key={label} pad="p-[18px]">
              <div className="text-[11px] text-[#5b6474] font-semibold tracking-[.06em]">{label.toUpperCase()}</div>
              <div className="flex items-baseline gap-2.5 mt-2 flex-wrap">
                <span className="text-[22px] font-bold">{fx(d.value)}</span>
                <span className={`text-[13px] font-semibold ${toneCls(d.change)}`}>{sign(d.change)}{fx(d.change)} ({sign(d.changePercent)}{fx(d.changePercent)}%)</span>
              </div>
            </Card>
          ))}
          <Card pad="p-[18px]">
            <div className="text-[11px] text-[#5b6474] font-semibold tracking-[.06em]">CLOSE IN DAY RANGE</div>
            <div className="relative h-2 bg-[#f7f8fa] rounded-full mt-4 border border-[#e7e9ee]">
              <div className="absolute left-0 inset-y-0 bg-gradient-to-r from-[#e7f6ef] to-[#0f9d6b] rounded-full" style={{ width: `${closePos}%` }} />
              <div className="absolute -top-1 w-3.5 h-3.5 -ml-[7px] rounded-full bg-white border-[3px] border-[#0f9d6b]" style={{ left: `${closePos}%` }} />
            </div>
            <div className="flex justify-between text-[11px] text-[#8a93a3] mt-2">
              <span>{fx(dsex.low)}</span><span>{fx(dsex.high)}</span>
            </div>
          </Card>
        </div>

        {/* ── KPI strip ──────────────────────────────────────── */}
        <div className="grid grid-cols-5 gap-px bg-[#e7e9ee] rounded-[14px] overflow-hidden border border-[#e7e9ee] max-[720px]:grid-cols-2">
          {[
            ['Turnover', cr(M.totalValueMn), `${sign(pctChg(M.totalValueMn, M.prevValueMn))}${fx(pctChg(M.totalValueMn, M.prevValueMn))}% vs prev · block ${cr(M.blockValueMn)}`],
            ['Volume', `${inr(M.totalVolume / 1e7)} cr`, `${sign(pctChg(M.totalVolume, M.prevVolume))}${fx(pctChg(M.totalVolume, M.prevVolume))}% vs prev (shares)`],
            ['Trades', M.totalTrades.toLocaleString('en-IN'), `${sign(pctChg(M.totalTrades, M.prevTrades))}${fx(pctChg(M.totalTrades, M.prevTrades))}% vs prev`],
            ['Market Cap', M.marketCapMn != null ? `৳${inr(M.marketCapMn / 1e6)} lakh cr` : '—', M.marketCapMn != null ? `${sign(pctChg(M.marketCapMn, M.prevMarketCapMn))}${fx(pctChg(M.marketCapMn, M.prevMarketCapMn))}% · US$${inr(M.marketCapUsdMn / 1000)} bn` : 'Awaiting DSE snippet'],
            ['Market P/E', M.pe != null ? fx(M.pe) : '—', `${M.prevPe != null ? `prev ${fx(M.prevPe)} · ` : ''}A/D ${fx(adRatio)}:1`],
          ].map(([l, v, s]) => (
            <div key={l} className="bg-white px-[18px] py-4">
              <div className="text-[10px] text-[#8a93a3] font-semibold uppercase tracking-[.08em]">{l}</div>
              <div className="text-[19px] font-bold mt-1.5 text-[#0b1220]">{v}</div>
              <div className="text-[11px] text-[#5b6474] mt-[3px]">{s}</div>
            </div>
          ))}
        </div>

        {/* ── Commentary ─────────────────────────────────────── */}
        <div className="bg-[#0b1220] rounded-2xl p-[26px] text-[#e6e9ef] max-[720px]:!p-[18px]">
          <div className="flex justify-between items-center gap-3 mb-3.5 flex-wrap">
            <div>
              <div className="text-[11px] font-semibold text-[#5fd3a6] tracking-[.12em] uppercase">Market Commentary</div>
              <div className={`text-lg font-[650] text-white mt-1 ${en ? FONT_CLS : BN_CLS}`}>
                {en ? D.commentary.headline.en : D.commentary.headline.bn}
              </div>
            </div>
            <LangToggle en={en} onToggle={setEn} darkBg />
          </div>
          {paras.map((p, i) => (
            <p key={i} className={`${i ? 'mt-3' : 'mt-0'} mb-0 text-[#cfd5df] ${en ? `text-sm leading-[1.75] ${FONT_CLS}` : `text-[15px] leading-[1.95] ${BN_CLS}`}`}>{p}</p>
          ))}
        </div>

        {/* ── Client type ────────────────────────────────────── */}
        <Card>
          <Title right={<span className="text-[11px] text-[#8a93a3]">DSE client type-wise statistics</span>}>Who Bought, Who Sold</Title>
          {(() => {
            const rows = D.clientType.map((c) => ({ ...c, netMn: ((c.buyPct - c.sellPct) / 100) * M.normalValueMn }));
            const maxAbs = Math.max(...rows.map((r) => Math.abs(r.netMn)));
            return (
              <div className="overflow-x-auto">
                <table className={`${TBL} min-w-[520px]`}>
                  <thead><tr><th className={TH}>Client</th><th className={TH}>Share of trading</th><th className={TH}>Buy %</th><th className={TH}>Sell %</th><th className={`${TH} w-[34%]`}>Net</th></tr></thead>
                  <tbody className={TB}>
                    {rows.map((r) => (
                      <tr key={r.type}>
                        <td className={`${TD} font-semibold`}>{r.type}</td>
                        <td className={`${TD} text-[#5b6474]`}>{fx(r.totalPct)}%</td>
                        <td className={TD}>{fx(r.buyPct)}%</td>
                        <td className={TD}>{fx(r.sellPct)}%</td>
                        <td className={TD}>
                          <div className="flex items-center gap-2.5 justify-end">
                            <div className="relative flex-1 max-w-[120px] h-2">
                              <div className="absolute left-1/2 -top-[3px] -bottom-[3px] w-px bg-[#e7e9ee]" />
                              <div className={`absolute top-0 h-2 rounded-[2px] ${r.netMn >= 0 ? 'bg-[#0f9d6b]' : 'bg-[#d9423a]'}`}
                                style={{ left: r.netMn >= 0 ? '50%' : `${50 - (Math.abs(r.netMn) / maxAbs) * 50}%`, width: `${(Math.abs(r.netMn) / maxAbs) * 50}%` }} />
                            </div>
                            <b className={`min-w-[78px] text-right ${toneCls(r.netMn)}`}>{sCr(r.netMn)}</b>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );
          })()}
          <div className="text-[11px] text-[#8a93a3] mt-2.5">
            Source: DSE Daily Market Snippet. Net = (buy % − sell %) × public-market turnover of {cr(M.normalValueMn)}.
          </div>

          <div className="border-t border-[#e7e9ee] mt-[18px] pt-4">
            <div className="flex justify-between items-center gap-3 flex-wrap mb-2">
              <div className="text-xs font-[650]">Net flow trend · last {D.clientFlowHistory.length} sessions <span className="text-[#8a93a3] font-medium">(৳ crore)</span></div>
              <div className="flex gap-3.5 text-[11px] text-[#5b6474] flex-wrap">
                {[['bg-[#004990]', 'Retail'], ['bg-[#e08a1e]', 'Institution'], ['bg-[#9aa4b2]', 'Foreign']].map(([c, l]) => (
                  <span key={l}><span className={`inline-block w-2.5 h-2.5 rounded-[2px] align-middle mr-[5px] ${c}`} />{l}</span>
                ))}
              </div>
            </div>
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={D.clientFlowHistory.map((r) => ({ ...r, retail: r.retail / 10, institution: r.institution / 10, foreign: r.foreign / 10 }))} margin={{ top: 6, right: 4, left: 0, bottom: 0 }} barGap={1}>
                  <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fill: C.mute, fontSize: 10 }} interval={1} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: C.mute, fontSize: 10 }} width={36} />
                  <ReferenceLine y={0} stroke={C.line} />
                  <Tooltip cursor={{ fill: 'rgba(0,0,0,.03)' }} content={({ active, payload, label }) => active && payload && payload.length ? (
                    <div className="bg-[#0b1220] text-white rounded-[10px] px-3 py-2 text-xs">
                      <div className="text-[#9aa4b2] text-[11px]">{label}{payload[0].payload.flag ? ` · ${payload[0].payload.flag}` : ''}</div>
                      {payload.map((p) => <div key={p.dataKey}>{p.name}: <b>{sCr(p.value * 10)}</b></div>)}
                    </div>) : null} />
                  {[['retail', 'Retail', BRAND], ['institution', 'Institution', '#e08a1e'], ['foreign', 'Foreign', '#9aa4b2']].map(([k, n, c]) => (
                    <Bar key={k} dataKey={k} name={n} fill={c} radius={[2, 2, 0, 0]} isAnimationActive={false}>
                      {D.clientFlowHistory.map((r, i) => <Cell key={i} fillOpacity={r.flag ? 0.45 : 1} stroke={r.flag ? c : 'none'} strokeDasharray={r.flag ? '3 2' : undefined} />)}
                    </Bar>
                  ))}
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="text-[11px] text-[#8a93a3] mt-2 leading-[1.55]">
              {D.clientFlowNote}
            </div>
          </div>
        </Card>

        {/* ── Technical view ─────────────────────────────────── */}
        <div className="bg-[#0b1220] rounded-2xl p-[22px] text-[#e6e9ef] max-[720px]:!p-[18px]">
          <div className="flex justify-between items-center gap-3 mb-3 flex-wrap">
            <h2 className="m-0 text-[13px] font-[650] text-white">DSEX · Last 30 Sessions</h2>
            <div className="flex gap-3.5 text-[11px] text-[#9aa4b2] flex-wrap">
              {[['bg-[#5fd3a6]', 'DSEX close'], ['bg-[#f5b544]', '20-day avg']].map(([c, l]) => (
                <span key={l}><span className={`inline-block w-3.5 h-0.5 align-middle mr-1.5 ${c}`} />{l}</span>
              ))}
              <span className="text-[#6b7585]">Bars: turnover</span>
            </div>
          </div>
          <div className="h-[210px]">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={D.historicalData} margin={{ top: 6, right: 4, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="histFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#5fd3a6" stopOpacity={0.25} />
                    <stop offset="100%" stopColor="#5fd3a6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fill: '#6b7585', fontSize: 10 }} interval={4} />
                <YAxis yAxisId="i" domain={histDomain} axisLine={false} tickLine={false} tick={{ fill: '#6b7585', fontSize: 10 }} width={44} tickFormatter={(v) => v.toLocaleString('en-IN')} />
                <YAxis yAxisId="v" orientation="right" hide domain={[0, 40000]} />
                <Tooltip content={({ active, payload, label }) => active && payload && payload.length ? (
                  <div className="bg-white text-[#0b1220] rounded-[10px] px-3 py-2 text-xs">
                    <div className="text-[#8a93a3] text-[11px]">{label}</div>
                    <div className="font-[650]">{fx(payload.find((p) => p.dataKey === 'value').value)}</div>
                    <div className="text-[#5b6474]">Turnover {cr(payload.find((p) => p.dataKey === 'valueMn').value)}</div>
                  </div>) : null} />
                <Bar yAxisId="v" dataKey="valueMn" fill="#334155" radius={[2, 2, 0, 0]} isAnimationActive={false} />
                <Area yAxisId="i" type="monotone" dataKey="value" stroke="#5fd3a6" strokeWidth={2} fill="url(#histFill)" dot={false} isAnimationActive={false} />
                <Line yAxisId="i" type="monotone" dataKey="dma20" stroke="#f5b544" strokeWidth={1.5} strokeDasharray="4 3" dot={false} connectNulls isAnimationActive={false} />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(140px,1fr))] gap-2 mt-3.5">
            {(() => { const T = D.technicalLevels; return [
              ['20-day avg', fx(T.dma20), `${fx(Math.abs(pctChg(dsex.value, T.dma20)))}% ${dsex.value >= T.dma20 ? 'above' : 'below'}`, 'text-[#f5b544]'],
              ['RSI (14)', fx(T.rsi14, 1), T.rsi14 >= 70 ? 'Overbought' : T.rsi14 <= 30 ? 'Oversold' : 'Neutral', 'text-[#9aa4b2]'],
              ['Support', fx(T.support), T.supportLabel, 'text-[#f87171]'],
              ['Resistance', fx(T.resistance), T.resistanceLabel, 'text-[#5fd3a6]'],
              ['30-session range', `${inr(T.low30, 0)} – ${inr(T.high30, 0)}`, `${sign(T.recoveryFromLowPct)}${fx(T.recoveryFromLowPct)}% vs ${T.low30Label} low`, 'text-[#9aa4b2]'],
            ].map(([l, v, sub, c]) => (
              <div key={l} className="bg-white/5 rounded-[10px] px-3 py-2.5">
                <div className={`text-[10px] font-semibold uppercase tracking-[.06em] ${c}`}>{l}</div>
                <div className="text-base font-bold text-white mt-1">{v}</div>
                <div className="text-[11px] text-[#9aa4b2] mt-0.5">{sub}</div>
              </div>
            )); })()}
          </div>
          <div className="text-[10px] text-[#6b7585] mt-2.5">20-day average and RSI computed from DSE's last {D.historicalData.length} published closes ({D.historicalData[0].date} – {D.historicalData[D.historicalData.length - 1].date}).</div>
        </div>

        {/* ── Breadth ────────────────────────────────────────── */}
        <div className="grid grid-cols-2 gap-4 max-[720px]:grid-cols-1">
          <Card>
            <Title right={<Pill cls="text-[#0f9d6b] bg-[#e7f6ef]">{fx(adRatio)} : 1</Pill>}>Market Breadth</Title>
            <div className="flex h-3 rounded-full overflow-hidden gap-0.5">
              <div className="bg-[#0f9d6b]" style={{ width: `${B.gainers.percent}%` }} />
              <div className="bg-[#d9423a]" style={{ width: `${B.losers.percent}%` }} />
              <div className="bg-[#c9ced8]" style={{ width: `${B.unchanged.percent}%` }} />
            </div>
            <div className="grid grid-cols-3 gap-2.5 mt-4">
              {[['Advanced', B.gainers, 'text-[#0f9d6b]'], ['Declined', B.losers, 'text-[#d9423a]'], ['Unchanged', B.unchanged, 'text-[#8a93a3]']].map(([l, d, c]) => (
                <div key={l}>
                  <div className={`text-2xl font-bold ${c}`}>{d.count}</div>
                  <div className="text-[11px] text-[#5b6474]">{l} · {fx(d.percent, 1)}%</div>
                </div>
              ))}
            </div>
            <div className="text-[11px] text-[#8a93a3] mt-3.5">Official DSE count; excludes SME board.</div>
          </Card>

          <Card>
            <Title>Category-wise Breadth</Title>
            <table className={TBL}>
              <thead><tr><th className={TH}>Category</th><th className={TH}>Adv</th><th className={TH}>Dec</th><th className={TH}>Unch</th><th className={TH}>Turnover</th></tr></thead>
              <tbody className={TB}>
                {D.categoryBreadth.map((c) => (
                  <tr key={c.category}>
                    <td className={TD}><Pill cls="text-[#0b1220] bg-[#f7f8fa]">{c.category}</Pill></td>
                    <td className={`${TD} text-[#0f9d6b] font-semibold`}>{c.gainers}</td>
                    <td className={`${TD} text-[#d9423a] font-semibold`}>{c.losers}</td>
                    <td className={`${TD} text-[#5b6474]`}>{c.unchanged}</td>
                    <td className={`${TD} font-semibold`}>{cr(c.turnoverMn)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
        </div>

        {/* ── Sectors ────────────────────────────────────────── */}
        <Card>
          <Title right={<LangToggle en={secEn} onToggle={setSecEn} />}>Sector Turnover · Top 8</Title>
          <div className="flex flex-col gap-3">
            {D.sectorPerformance.map((s) => {
              const net = s.adv - s.dec;
              return (
                <div key={s.sector} className="grid grid-cols-[minmax(120px,210px)_1fr_auto] items-center gap-3">
                  <div className="text-[13px] font-medium overflow-hidden text-ellipsis whitespace-nowrap">{s.sector}</div>
                  <div className="bg-[#f7f8fa] rounded-full h-2.5 overflow-hidden">
                    <div className={`h-full rounded-full opacity-[.85] ${net >= 0 ? 'bg-[#0f9d6b]' : 'bg-[#d9423a]'}`} style={{ width: `${(s.valueMn / maxSec) * 100}%` }} />
                  </div>
                  <div className="text-xs text-right whitespace-nowrap">
                    <b>{cr(s.valueMn)}</b>
                    <span className="text-[#8a93a3]"> · {fx(s.percent, 1)}% · </span>
                    <span className="text-[#0f9d6b]">{s.adv}▲</span> <span className="text-[#d9423a]">{s.dec}▼</span>
                  </div>
                </div>
              );
            })}
          </div>
          <div className={`mt-4 px-3.5 py-3 bg-[#f7f8fa] rounded-xl text-[13px] leading-[1.65] text-[#5b6474] ${secEn ? FONT_CLS : BN_CLS}`}>
            {secEn ? D.sectorCommentary.en : D.sectorCommentary.bn}
          </div>
          <div className="text-[11px] text-[#8a93a3] mt-2.5">Share of public-market turnover (excl. block &amp; SME). Bar colour = net advancers vs decliners in the sector.</div>
        </Card>

        {/* ── Movers ─────────────────────────────────────────── */}
        <div className="grid grid-cols-2 gap-4 max-[720px]:grid-cols-1">
          {[['Top Gainers', D.topGainers, 'text-[#0f9d6b]'], ['Top Losers', D.topLosers, 'text-[#d9423a]']].map(([t, rows, c]) => (
            <Card key={t}>
              <Title color={c}>{t}</Title>
              <table className={TBL}>
                <thead><tr><th className={TH}>Symbol</th><th className={TH}>Close (৳)</th><th className={TH}>Change</th></tr></thead>
                <tbody className={TB}>
                  {rows.map((r) => (
                    <tr key={r.symbol}><td className={`${TD} font-semibold`}>{r.symbol}</td><td className={TD}>{fx(r.close)}</td><td className={TD}><Chg v={r.change} /></td></tr>
                  ))}
                </tbody>
              </table>
            </Card>
          ))}
        </div>

        {/* ── Top value ──────────────────────────────────────── */}
        <Card>
          <Title right={<span className="text-[11px] text-[#8a93a3]">Public market, ৳ crore</span>}>Turnover Leaders · Top 10</Title>
          <div className="overflow-x-auto">
            <table className={`${TBL} min-w-[560px]`}>
              <thead><tr><th className={TH}>#&nbsp;&nbsp;Symbol</th><th className={`${TH} !text-left`}>Sector</th><th className={`${TH} w-[28%]`}>Turnover</th><th className={TH}>Close</th><th className={TH}>Change</th></tr></thead>
              <tbody className={TB}>
                {D.topValue.map((r, i) => (
                  <tr key={r.symbol}>
                    <td className={`${TD} font-semibold`}><span className="text-[#8a93a3] inline-block w-[22px]">{i + 1}</span>{r.symbol}</td>
                    <td className={`${TD} !text-left text-[#5b6474] !text-xs`}>{r.sector}</td>
                    <td className={TD}>
                      <div className="flex items-center gap-2 justify-end">
                        <div className="flex-1 max-w-[110px] h-1.5 bg-[#f7f8fa] rounded-full">
                          <div className="h-full bg-[#94a3b8] rounded-full ml-auto" style={{ width: `${(r.valueMn / maxVal) * 100}%` }} />
                        </div>
                        <b>{inr(r.valueMn / 10)}</b>
                      </div>
                    </td>
                    <td className={TD}>{fx(r.close)}</td>
                    <td className={TD}><Chg v={r.change} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* ── Volume spikes ──────────────────────────────────── */}
        {(() => {
          const V = D.volumeSpikes;
          const tn = (c) => (c > 0 ? 'text-[#5fd3a6]' : c < 0 ? 'text-[#f87171]' : 'text-[#9aa4b2]');
          return (
            <div className="bg-[#0b1220] rounded-2xl p-[22px] text-[#e6e9ef] max-[720px]:!p-[18px]">
              <div className="flex justify-between items-center gap-3 mb-2 flex-wrap">
                <h2 className="m-0 text-[13px] font-[650] text-white">Volume Spikes</h2>
                <span className="px-[9px] py-[3px] rounded-full text-[11px] font-semibold text-[#f5b544] bg-[#f5b544]/[.12]">{V.totalCount} stocks ≥ 2× previous-day volume</span>
              </div>
              <div className="text-[13px] text-[#9aa4b2] mb-3.5 leading-[1.6]">
                Of these, <b className="text-[#5fd3a6]">{V.up} rose</b>, <b className="text-[#f87171]">{V.down} fell</b> and {V.unchanged} were unchanged · combined turnover <b className="text-white">{cr(V.turnoverMn)}</b> ({fx(V.sharePct, 1)}% of market)
              </div>
              <div className="grid grid-cols-3 gap-2.5 max-[720px]:grid-cols-1">
                {V.top.map((s) => (
                  <div key={s.symbol} className="bg-white/5 border border-white/[.06] rounded-xl p-3.5">
                    <div className="flex justify-between items-baseline gap-2">
                      <span className="text-[13px] font-bold text-white whitespace-nowrap">
                        {s.symbol}
                        {s.circuit && <span className={`text-[9px] font-bold text-[#0b1220] rounded px-[5px] py-px ml-1.5 align-middle ${s.circuit === 'UC' ? 'bg-[#5fd3a6]' : 'bg-[#f87171]'}`}>{s.circuit}</span>}
                      </span>
                      <span className="text-[11px] text-[#6b7585] text-right">{s.sector}</span>
                    </div>
                    <div className="text-[26px] font-bold text-[#f5b544] mt-1.5">{fx(s.spike, 1)}×</div>
                    <div className="flex justify-between text-xs mt-1">
                      <span className={`font-semibold ${tn(s.change)}`}>{sign(s.change)}{fx(s.change)}%</span>
                      <span className="text-[#9aa4b2]">{cr(s.valueMn)}</span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="text-[11px] text-[#6b7585] mt-3">
                Volume multiple = today's volume ÷ previous session's. Top {V.top.length} by multiple among stocks with turnover ≥ ৳1 crore. UC / LC = closed at upper / lower circuit limit.
              </div>
            </div>
          );
        })()}

        {/* ── Block market ───────────────────────────────────── */}
        <Card>
          <Title right={
            <div className="flex gap-3.5 text-xs text-[#5b6474] flex-wrap">
              <span>Trades <b className="text-[#0b1220]">{D.blockMarket.summary.totalTrades}</b></span>
              <span>Scrips <b className="text-[#0b1220]">{D.blockMarket.summary.totalScrips}</b></span>
              <span>Value <b className="text-[#0b1220]">{cr(D.blockMarket.summary.totalValueMn)}</b></span>
              <span>Share <b className="text-[#0b1220]">{fx(blockShare, 1)}%</b></span>
            </div>
          }>Block Market · Top 5 by Value</Title>
          <div className="overflow-x-auto">
            <table className={`${TBL} min-w-[520px]`}>
              <thead><tr><th className={TH}>Symbol</th><th className={TH}>Trades</th><th className={TH}>Quantity</th><th className={TH}>Price (৳)</th><th className={TH}>Value (৳ crore)</th></tr></thead>
              <tbody className={TB}>
                {D.blockMarket.top5.map((b) => (
                  <tr key={b.symbol}>
                    <td className={`${TD} font-semibold`}>{b.symbol}</td>
                    <td className={TD}>{b.trades}</td>
                    <td className={TD}>{qty(b.quantity)}</td>
                    <td className={TD}>{b.maxPrice === b.minPrice ? fx(b.maxPrice) : `${fx(b.minPrice)} – ${fx(b.maxPrice)}`}</td>
                    <td className={`${TD} font-semibold`}>{inr(b.valueMn / 10)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* ── Footer ─────────────────────────────────────────── */}
        <div className="text-center px-3 pt-2 pb-1 text-[11px] text-[#8a93a3] leading-[1.6]">
          <div className="font-semibold text-[#5b6474]">MIDWAY SECURITIES LTD — Daily Market Analysis · {REPORT_VERSION}</div>
          Sources: DSE Website (Daily Market Snippet, Recent Market Information, Block Report). For information only; not investment advice.
        </div>
      </div>
    </div>
  );
}