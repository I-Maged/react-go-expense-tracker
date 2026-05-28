import BalanceSummary from '../components/BalanceSummary'
import FilterBar from '../components/FilterBar'
import Header from '../components/Header'

const Expenses = () => {
  return (
    <>
      <Header />

      <main className='app-main'>
        <BalanceSummary />

        <div className='app-grid'>
          <div className='grid-right'>
            <FilterBar />
          </div>
        </div>
      </main>
    </>
  )
}

export default Expenses
