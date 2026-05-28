import { useMemo } from 'react'
import { Wallet, TrendingUp, TrendingDown } from 'lucide-react'
import './BalanceSummary.css'
import { useExpenseContext } from '../context/expense/useExpenseContext'

const BalanceSummary = () => {
  const { transactions, currency } = useExpenseContext()

  const { income, expense, balance } = useMemo(() => {
    return transactions.reduce(
      (acc, transaction) => {
        if (transaction.type === 'INCOME') {
          acc.income += transaction.amount
          acc.balance += transaction.amount
        } else {
          acc.expense += transaction.amount
          acc.balance -= transaction.amount
        }
        return acc
      },
      { income: 0, expense: 0, balance: 0 },
    )
  }, [transactions])

  const formatMoney = (amount: number) => {
    return `${currency}${Math.abs(amount).toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`
  }

  return (
    <div className='balance-summary-container'>
      <div className='glass-panel balance-card main-balance'>
        <div className='icon-wrapper'>
          <Wallet size={24} color='var(--color-brand)' />
        </div>
        <div className='balance-info'>
          <p className='label'>Total Balance</p>
          <h2 className='amount'>
            {balance < 0 ? '-' : ''}
            {formatMoney(balance)}
          </h2>
        </div>
      </div>

      <div className='glass-panel balance-card income'>
        <div className='icon-wrapper income-wrapper'>
          <TrendingUp size={24} color='var(--color-income)' />
        </div>
        <div className='balance-info'>
          <p className='label'>Total Income</p>
          <h2 className='amount income-text'>+{formatMoney(income)}</h2>
        </div>
      </div>

      <div className='glass-panel balance-card expense'>
        <div className='icon-wrapper expense-wrapper'>
          <TrendingDown size={24} color='var(--color-expense)' />
        </div>
        <div className='balance-info'>
          <p className='label'>Total Expense</p>
          <h2 className='amount expense-text'>-{formatMoney(expense)}</h2>
        </div>
      </div>
    </div>
  )
}

export default BalanceSummary
