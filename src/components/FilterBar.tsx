import React from 'react';
import { Search, SlidersHorizontal } from 'lucide-react';
import { Audience, Category } from '../types';

interface FilterBarProps {
  selectedAudience: Audience;
  onSelectAudience: (audience: Audience) => void;
  selectedCategory: Category;
  onSelectCategory: (category: Category) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  totalResults: number;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  selectedAudience,
  onSelectAudience,
  selectedCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  totalResults,
}) => {
  const audienceTabs: { id: Audience; label: string }[] = [
    { id: 'all', label: 'All Curations' },
    { id: 'her', label: 'For Her' },
    { id: 'him', label: 'For Him' },
    { id: 'unisex', label: 'Unisex & Shared' },
  ];

  const categoryTabs: { id: Category; label: string }[] = [
    { id: 'all', label: 'All Categories' },
    { id: 'moisturizer', label: 'Moisturizer Sets' },
    { id: 'perfume', label: 'Perfume Sets' },
    { id: 'makeup', label: 'Mini Makeup' },
    { id: 'rituals', label: 'Ritual Suites' },
  ];

  return (
    <div className="space-y-4">
      {/* Top Filter Bar: Search + Audience Segmented Control */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        {/* Search Input */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#736B60]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search sets by name, fragrance note, or ingredient..."
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-[#DDD7CC] rounded-xs text-xs text-[#1C1A17] placeholder:text-[#8C8477] focus:outline-none focus:border-[#1C1A17] transition-colors"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#736B60] hover:text-[#1C1A17]"
            >
              Clear
            </button>
          )}
        </div>

        {/* Audience Segmented Control (Both Males & Females & Unisex) */}
        <div className="flex items-center gap-1 p-1 bg-[#EFECE4] border border-[#DDD7CC] rounded-xs overflow-x-auto">
          {audienceTabs.map((tab) => {
            const isActive = selectedAudience === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => onSelectAudience(tab.id)}
                className={`px-3 py-1.5 text-xs font-medium tracking-wide rounded-xs transition-colors whitespace-nowrap shrink-0 ${
                  isActive
                    ? 'bg-[#1C1A17] text-[#FAF9F5] shadow-xs'
                    : 'text-[#5A554E] hover:text-[#1C1A17]'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Category Pills/Row with Result Count */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-[#E8E4DC]">
        <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
          <SlidersHorizontal className="w-3.5 h-3.5 text-[#736B60] mr-1 shrink-0 hidden sm:inline" />
          {categoryTabs.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className={`px-3 py-1 text-xs tracking-wider uppercase font-medium transition-colors whitespace-nowrap rounded-xs ${
                  isSelected
                    ? 'bg-[#E5E0D5] text-[#1C1A17] font-semibold border border-[#CFC8BB]'
                    : 'text-[#736B60] hover:text-[#1C1A17] border border-transparent'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        <div className="text-xs text-[#736B60] tabular-nums shrink-0">
          Showing {totalResults} {totalResults === 1 ? 'curated set' : 'curated sets'}
        </div>
      </div>
    </div>
  );
};
