import { Search } from 'lucide-react';

// ============================================
// ProductToolbar
// Search + Filter + Sort — fully controlled via props
// ============================================

const categories = [
  'All Categories',
  'CPU',
  'GPU',
  'RAM',
  'SSD',
  'Motherboard',
  'Power Supply',
  'PC Case',
  'Cooling',
];

const sortOptions = [
  { label: 'Newest', value: 'newest' },
  { label: 'Price: Low → High', value: 'price-asc' },
  { label: 'Price: High → Low', value: 'price-desc' },
  { label: 'Name: A → Z', value: 'name-asc' },
  { label: 'Name: Z → A', value: 'name-desc' },
];

const ProductToolbar = ({ search, setSearch, category, setCategory, sort, setSort }) => {
  return (
    <div className="w-full bg-gray-900 border border-gray-800 rounded-xl p-4">
      <div className="flex flex-col md:flex-row md:flex-wrap lg:flex-nowrap gap-3">
        {/* Search Input */}
        <div className="relative w-full md:w-full lg:flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search PC components..."
            className="w-full bg-gray-800/60 text-gray-100 placeholder-gray-500 pl-10 pr-4 py-2.5 rounded-xl border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
          />
        </div>

        {/* Category Dropdown */}
        <div className="w-full md:w-1/2 lg:w-48 lg:flex-shrink-0">
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full bg-gray-800/60 text-gray-100 px-4 py-2.5 rounded-xl border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all appearance-none cursor-pointer"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat} className="bg-gray-900 text-gray-100">
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* Sort Dropdown */}
        <div className="w-full md:w-1/2 lg:w-48 lg:flex-shrink-0">
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="w-full bg-gray-800/60 text-gray-100 px-4 py-2.5 rounded-xl border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all appearance-none cursor-pointer"
          >
            {sortOptions.map((opt) => (
              <option key={opt.value} value={opt.value} className="bg-gray-900 text-gray-100">
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default ProductToolbar;