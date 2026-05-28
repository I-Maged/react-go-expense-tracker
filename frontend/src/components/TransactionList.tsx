import { useMemo } from 'react'
import { Trash2, ArrowUpRight, ArrowDownRight, Frown } from 'lucide-react'
import { useExpenseContext } from '../context/expense/useExpenseContext'
import './TransactionList.css'

const TransactionList = () => {
  const { transactions, filterSettings, currency, deleteTransaction } =
    useExpenseContext()

  const filteredTransactions = useMemo(() => {
    return transactions.filter((t) => {
      if (
        filterSettings.category !== 'ALL' &&
        t.category !== filterSettings.category
      ) {
        return false
      }

      if (filterSettings.startDate || filterSettings.endDate) {
        const tDate = new Date(t.date).getTime()

        if (filterSettings.startDate) {
          const start = new Date(filterSettings.startDate).getTime()
          if (tDate < start) return false
        }

        if (filterSettings.endDate) {
          const end = new Date(filterSettings.endDate)
          end.setHours(23, 59, 59, 999)
          if (tDate > end.getTime()) return false
        }
      }
      return true
    })
  }, [transactions, filterSettings])

  const handleDelete = (id: string) => {
    deleteTransaction(id)
  }

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }
    return new Date(dateString).toLocaleDateString('en-US', options)
  }

  const formatAmount = (amount: number) => {
    return amount.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })
  }

  return (
    <div className='glass-panel list-container'>
      <div className='list-header'>
        <h3>Recent Transactions</h3>
        <span className='badge'>{filteredTransactions.length}</span>
      </div>

      <div className='transaction-list'>
        {filteredTransactions.length === 0 ? (
          <div className='empty-state'>
            <Frown size={48} className='empty-icon' />
            <p>No transactions found for these filters.</p>
          </div>
        ) : (
          filteredTransactions.map((transaction) => (
            <div
              key={transaction.id}
              className='transaction-item animate-fade-in'
            >
              <div className='t-icon-wrapper'>
                {transaction.type === 'INCOME' ? (
                  <div className='t-icon income-icon'>
                    <ArrowUpRight size={18} />
                  </div>
                ) : (
                  <div className='t-icon expense-icon'>
                    <ArrowDownRight size={18} />
                  </div>
                )}
              </div>

              <div className='t-details'>
                <div className='t-category'>{transaction.category}</div>
                <div className='t-note-date'>
                  {transaction.note ? `${transaction.note} • ` : ''}
                  {formatDate(transaction.date)}
                </div>
              </div>

              <div className='t-actions'>
                <div
                  className={`t-amount ${transaction.type === 'INCOME' ? 't-income-text' : ''}`}
                >
                  {transaction.type === 'INCOME' ? '+' : '-'}
                  {currency}
                  {formatAmount(transaction.amount)}
                </div>
                <button
                  className='delete-btn'
                  onClick={() => handleDelete(transaction.id)}
                  title='Delete Transaction'
                  aria-label='Delete Transaction'
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default TransactionList
