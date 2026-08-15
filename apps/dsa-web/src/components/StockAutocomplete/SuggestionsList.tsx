/**
 * Stock search suggestion list.
 */

import type { CSSProperties } from 'react';
import type { StockSuggestion } from '../../types/stockIndex';
import { Badge } from '../common';
import { cn } from '../../utils/cn';
import { useUiLanguage } from '../../contexts/UiLanguageContext';

export interface SuggestionsListProps {
  /** Suggestion list */
  suggestions: StockSuggestion[];
  /** Highlighted index */
  highlightedIndex: number;
  /** Selection callback */
  onSelect: (suggestion: StockSuggestion) => void;
  /** Mouse hover callback */
  onMouseEnter: (index: number) => void;
  /** Custom style (for Portal fixed positioning) */
  style?: CSSProperties;
}

export function SuggestionsList({
  suggestions,
  highlightedIndex,
  onSelect,
  onMouseEnter,
  style,
}: SuggestionsListProps) {
  const { language } = useUiLanguage();
  if (suggestions.length === 0) {
    return null;
  }

  return (
    <ul
      id="suggestions-list"
      className="z-[100] border-x border-b rounded-b-lg rounded-t-none max-h-60 overflow-auto"
      style={{
        ...style,
        backgroundColor: 'hsl(var(--card) / 0.85)',
        borderColor: 'var(--border-accent)',
        boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.3), 0 8px 10px -6px rgba(0, 0, 0, 0.3), -4px 0 15px -3px rgba(0, 0, 0, 0.2), 4px 0 15px -3px rgba(0, 0, 0, 0.2)',
      }}
      role="listbox"
    >
      {suggestions.map((suggestion, index) => (
        <li
          key={suggestion.canonicalCode}
          role="option"
          aria-selected={index === highlightedIndex}
          className={cn(
            'px-4 py-1 cursor-pointer flex items-center justify-between',
            'hover:bg-[var(--autocomplete-hover-bg)]/25',
            index === highlightedIndex && 'bg-[var(--autocomplete-hover-bg)]/25',
          )}
          onClick={() => onSelect(suggestion)}
          onMouseEnter={() => onMouseEnter(index)}
        >
          <div className="flex items-center gap-3">
            <MarketBadge market={suggestion.market} language={language} />

            <div className="flex flex-col">
              <span className="text-sm font-medium text-primary-text">
                {language === 'en' && /[\u4e00-\u9fff]/.test(suggestion.nameZh)
                  ? suggestion.nameEn || suggestion.displayCode
                  : suggestion.nameZh}
              </span>
              <span className="text-sm text-secondary-text">
                {suggestion.displayCode}
              </span>
            </div>
          </div>

          <MatchTypeBadge matchType={suggestion.matchType} language={language} />
        </li>
      ))}
    </ul>
  );
}

const MARKET_BADGE_CONFIG = {
  CN: { label: { zh: 'A股', en: 'China' }, className: 'border-danger/25 bg-danger/10 text-danger' },
  HK: { label: { zh: '港股', en: 'Hong Kong' }, className: 'border-success/25 bg-success/10 text-success' },
  US: { label: { zh: '美股', en: 'US' }, className: 'border-cyan/25 bg-cyan/10 text-cyan' },
  JP: { label: { zh: '日股', en: 'Japan' }, className: 'border-indigo-500/25 bg-indigo-500/10 text-indigo-500' },
  KR: { label: { zh: '韩股', en: 'Korea' }, className: 'border-rose-500/25 bg-rose-500/10 text-rose-500' },
  INDEX: { label: { zh: '指数', en: 'Index' }, className: 'border-purple/25 bg-purple/10 text-purple' },
  ETF: { label: 'ETF', className: 'border-warning/25 bg-warning/10 text-warning' },
  BSE: { label: { zh: '北交所', en: 'Beijing' }, className: 'border-orange-500/25 bg-orange-500/10 text-orange-500' },
} as const;

function MarketBadge({ market, language }: { market: string; language: 'zh' | 'en' }) {
  const config = MARKET_BADGE_CONFIG[market as keyof typeof MARKET_BADGE_CONFIG];

  if (!config) {
    throw new Error(`Unsupported market in stock suggestion: ${market}`);
  }

  return (
    <Badge variant="default" size="sm" className={cn('min-w-[3rem] justify-center shadow-none', config.className)}>
      {typeof config.label === 'string' ? config.label : config.label[language]}
    </Badge>
  );
}

function MatchTypeBadge({ matchType, language }: { matchType: string; language: 'zh' | 'en' }) {
  const configMap = {
    exact: { label: { zh: '精确', en: 'Exact' }, className: 'border-cyan/25 bg-cyan/10 text-cyan' },
    prefix: { label: { zh: '前缀', en: 'Prefix' }, className: 'border-purple/25 bg-purple/10 text-purple' },
    contains: { label: { zh: '包含', en: 'Contains' }, className: 'border-warning/25 bg-warning/10 text-warning' },
    fuzzy: { label: { zh: '模糊', en: 'Fuzzy' }, className: 'border-border/55 bg-elevated/75 text-muted-text' },
  };

  const config = configMap[matchType as keyof typeof configMap] || configMap.fuzzy;

  return (
    <Badge variant="default" size="sm" className={cn('shrink-0 shadow-none', config.className)}>
      {config.label[language]}
    </Badge>
  );
}

export default SuggestionsList;
