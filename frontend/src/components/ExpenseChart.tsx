import { useMemo } from 'react'
import { useExpenseContext } from '../context/expense/useExpenseContext'
import {
  PieChart,
  Pie,
  Sector,
  ResponsiveContainer,
  Tooltip,
  Legend,
  type PieSectorShapeProps,
} from 'recharts'
import { PieChart as PieChartIcon, Frown } from 'lucide-react'
import './ExpenseChart.css'

interface TooltipPayload {
  name: string
  value: number
}

interface CustomTooltipProps {
  active?: boolean
  payload?: TooltipPayload[] | null
  currency: string
}

const CustomTooltip = ({ active, payload, currency }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <div className='custom-tooltip glass-panel'>
        <p className='tooltip-label'>{payload[0].name}</p>
        <p className='tooltip-value'>
          {currency}
          {payload[0].value.toLocaleString('en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </p>
      </div>
    )
  }
  return null
}

const COLORS = [
  '#6366f1', // Indigo
  '#8b5cf6', // Violet
  '#ec4899', // Pink
  '#f43f5e', // Rose
  '#f97316', // Orange
  '#eab308', // Yellow
  '#22c55e', // Green
  '#14b8a6', // Teal
  '#0ea5e9', // Sky
  '#64748b', // Slate
]

const renderPieSector = (props: PieSectorShapeProps) => {
  const { index } = props
  return <Sector {...props} fill={COLORS[index % COLORS.length]} />
}

const ExpenseChart = () => {
  const { transactions, filterSettings, currency } = useExpenseContext()

  const chartData = useMemo(() => {
    let expenses = transactions.filter((t) => t.type === 'EXPENSE')

    if (filterSettings.startDate || filterSettings.endDate) {
      expenses = expenses.filter((t) => {
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
        return true
      })
    }

    const categoryTotals = expenses.reduce(
      (acc, curr) => {
        acc[curr.category] = (acc[curr.category] || 0) + curr.amount
        return acc
      },
      {} as Record<string, number>,
    )

    return Object.keys(categoryTotals)
      .map((cat) => ({ name: cat, value: categoryTotals[cat] }))
      .sort((a, b) => b.value - a.value) // Sort largest to smallest
  }, [transactions, filterSettings.startDate, filterSettings.endDate])

  return (
    <div className='glass-panel chart-container'>
      <div className='chart-header'>
        <PieChartIcon size={20} color='var(--color-brand)' />
        <h3>Expense Breakdown</h3>
      </div>

      <div className='chart-body'>
        {chartData.length === 0 ? (
          <div className='empty-state'>
            <Frown size={48} className='empty-icon' />
            <p>No expenses recorded for this period.</p>
          </div>
        ) : (
          <ResponsiveContainer width='100%' height={300}>
            <PieChart>
              <Pie
                data={chartData}
                cx='50%'
                cy='50%'
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey='value'
                stroke='var(--bg-secondary)'
                strokeWidth={2}
                shape={renderPieSector}
              />

              <Tooltip content={<CustomTooltip currency={currency} />} />

              <Legend
                verticalAlign='bottom'
                height={36}
                formatter={(value: string) => (
                  <span className='legend-text'>{value}</span>
                )}
              />
            </PieChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  )
}

export default ExpenseChart
