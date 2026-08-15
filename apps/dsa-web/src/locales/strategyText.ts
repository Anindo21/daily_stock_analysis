export type StrategyText = {
  name: string;
  description: string;
};

export const ENGLISH_STRATEGY_METADATA: Record<string, StrategyText> = {
  bull_trend: { name: 'Default Bull Trend', description: 'Default stock-analysis strategy for bullish alignment, trend continuation, and pullback entries.' },
  ma_golden_cross: { name: 'Moving Average Golden Cross', description: 'Detects moving-average golden crosses with volume confirmation for reversal and continuation signals.' },
  volume_breakout: { name: 'Volume Breakout', description: 'Detects breakouts through resistance with volume confirmation.' },
  hot_theme: { name: 'Hot Themes', description: 'Tracks policy, industry, and market themes to assess strength, breadth, and relative performance.' },
  shrink_pullback: { name: 'Low-Volume Pullback', description: 'Detects low-volume pullbacks to moving-average support for trend-continuation entries.' },
  event_driven: { name: 'Event Driven', description: 'Assesses earnings, policy, M&A, orders, and product catalysts with probability and risk boundaries.' },
  box_oscillation: { name: 'Range Oscillation', description: 'Identifies price ranges for buy-near-support and reduce-near-resistance decisions.' },
  growth_quality: { name: 'Growth Quality', description: 'Combines revenue, earnings, ROE, cash flow, and market opportunity to assess sustainable growth.' },
  bottom_volume: { name: 'Bottom Volume Expansion', description: 'Detects volume expansion after long declines as a potential trend-reversal signal.' },
  expectation_repricing: { name: 'Expectation Repricing', description: 'Analyzes earnings, policy, and valuation expectation changes for repricing opportunities and risks.' },
  chan_theory: { name: 'Chan Theory', description: 'Uses strokes, segments, and central structures to assess trend levels, entries, exits, and divergence.' },
  wave_theory: { name: 'Wave Theory', description: 'Uses Elliott impulse and corrective wave structures to assess the current wave and potential targets.' },
  dragon_head: { name: 'Market Leader', description: 'Identifies sector leaders during rotation, sector launches, and industry catalyst events.' },
  emotion_cycle: { name: 'Sentiment Cycle', description: 'Uses sentiment, turnover, and price-volume structure to identify fear, euphoria, and contrarian setups.' },
  one_yang_three_yin: { name: 'One Bullish Candle, Three Bearish Candles', description: 'Detects the one-up-three-down consolidation pattern as a trend-continuation entry signal.' },
};