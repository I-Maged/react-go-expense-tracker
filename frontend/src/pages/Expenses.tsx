import AddTransactionForm from '../components/AddTransactionForm'
import BalanceSummary from '../components/BalanceSummary'
import ExpenseChart from '../components/ExpenseChart'
import FilterBar from '../components/FilterBar'
import Header from '../components/Header'
import TransactionList from '../components/TransactionList'

const Expenses = () => {
  return (
    <>
      <Header />

      <main className='app-main'>
        <BalanceSummary />

        <div className='app-grid'>
          <div className='grid-left'>
            <AddTransactionForm />
            <ExpenseChart />
          </div>

          <div className='grid-right'>
            <FilterBar />
            <TransactionList />
          </div>
        </div>
      </main>
    </>
  )
}

export default Expenses
