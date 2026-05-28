import { PlusCircle } from 'lucide-react'
import { useTransactionForm } from './useTransactionForm'
import { CATEGORIES } from '../../services/categories'

export const TypeToggle = () => {
  const { type, setType } = useTransactionForm()

  return (
    <div className='type-toggle'>
      <button
        type='button'
        className={`toggle-btn ${type === 'EXPENSE' ? 'active-expense' : ''}`}
        onClick={() => setType('EXPENSE')}
      >
        Expense
      </button>
      <button
        type='button'
        className={`toggle-btn ${type === 'INCOME' ? 'active-income' : ''}`}
        onClick={() => setType('INCOME')}
      >
        Income
      </button>
    </div>
  )
}

export const AmountInput = () => {
  const { amount, setAmount } = useTransactionForm()
  return (
    <div className='form-group'>
      <label>Amount</label>
      <div className='amount-input-wrapper'>
        <span className='currency-symbol'>$</span>
        <input
          type='number'
          className='input-base amount-input'
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder='0.00'
          step='0.01'
          min='0.01'
          required
        />
      </div>
    </div>
  )
}

export const CategorySelect = () => {
  const { category, setCategory } = useTransactionForm()
  return (
    <div className='form-group flex-1'>
      <label>Category</label>
      <select
        className='input-base select-input'
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        required
      >
        {CATEGORIES.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>
    </div>
  )
}

export const DateInput = () => {
  const { date, setDate } = useTransactionForm()
  return (
    <div className='form-group flex-1'>
      <label>Date</label>
      <input
        type='date'
        className='input-base'
        value={date}
        onChange={(e) => setDate(e.target.value)}
        required
      />
    </div>
  )
}

export const NoteInput = () => {
  const { note, setNote } = useTransactionForm()
  return (
    <div className='form-group'>
      <label>Note (Optional)</label>
      <input
        type='text'
        className='input-base'
        value={note}
        onChange={(e) => setNote(e.target.value)}
        placeholder='What was this for?'
      />
    </div>
  )
}

export const SubmitButton = () => {
  const { type } = useTransactionForm()
  return (
    <button type='submit' className='btn btn-primary submit-btn'>
      <PlusCircle size={18} />
      Add {type === 'INCOME' ? 'Income' : 'Expense'}
    </button>
  )
}
