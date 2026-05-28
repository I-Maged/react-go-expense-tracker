import type { ChangeEvent } from 'react'
import { useExpenseContext } from '../context/expense/useExpenseContext'
import { CATEGORIES } from '../services/categories'
import { Filter, Calendar } from 'lucide-react'
import './FilterBar.css'

const FilterBar = () => {
  const { filterSettings, setFilters } = useExpenseContext()

  const handleCategoryChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setFilters({ category: e.target.value })
  }

  const handleStartDateChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFilters({ startDate: e.target.value || null })
  }

  const handleEndDateChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFilters({ endDate: e.target.value || null })
  }

  const clearFilters = () => {
    setFilters({ category: 'ALL', startDate: null, endDate: null })
  }

  const hasActiveFilters =
    filterSettings.category !== 'ALL' ||
    filterSettings.startDate ||
    filterSettings.endDate

  return (
    <div className='glass-panel filter-bar animate-slide-down'>
      <div className='filter-header'>
        <Filter size={20} color='var(--color-brand)' />
        <h3>Filters & Data Range</h3>
      </div>

      <div className='filter-controls'>
        <div className='filter-group'>
          <label>Category</label>
          <select
            className='input-base select-input'
            value={filterSettings.category}
            onChange={handleCategoryChange}
          >
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div className='filter-group date-group'>
          <label>Date Range</label>
          <div className='date-inputs'>
            <div className='date-input-wrapper'>
              <Calendar size={16} className='date-icon' />
              <input
                type='date'
                className='input-base date-input'
                value={filterSettings.startDate || ''}
                onChange={handleStartDateChange}
              />
            </div>
            <span className='date-separator'>to</span>
            <div className='date-input-wrapper'>
              <Calendar size={16} className='date-icon' />
              <input
                type='date'
                className='input-base date-input'
                value={filterSettings.endDate || ''}
                onChange={handleEndDateChange}
              />
            </div>
          </div>
        </div>

        {hasActiveFilters && (
          <button
            className='btn btn-secondary clear-btn'
            onClick={clearFilters}
          >
            Clear Filters
          </button>
        )}
      </div>
    </div>
  )
}

export default FilterBar
