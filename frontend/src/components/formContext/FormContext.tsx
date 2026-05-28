import { v4 as uuidv4 } from 'uuid'
import {
  createContext,
  useState,
  type ChangeEvent,
  type FC,
  type ReactNode,
} from 'react'

import type { TransactionType } from '../../types/types'
import { CATEGORIES } from '../../services/categories'
import { useExpenseContext } from '../../context/expense/useExpenseContext'

type FormProviderProps = { children: ReactNode }

type FormContextType = {
  type: TransactionType
  setType: (t: TransactionType) => void
  amount: string
  setAmount: (a: string) => void
  category: string
  setCategory: (c: string) => void
  date: string
  setDate: (d: string) => void
  note: string
  setNote: (n: string) => void
  handleSubmit: (e: ChangeEvent) => void
}

const FormContext = createContext<FormContextType | null>(null)

const FormProvider: FC<FormProviderProps> = ({ children }) => {
  const { addTransaction } = useExpenseContext()

  const [type, setType] = useState<TransactionType>('EXPENSE')
  const [amount, setAmount] = useState('')
  const [category, setCategory] = useState(CATEGORIES[3])
  const [date, setDate] = useState(new Date().toISOString().split('T')[0])
  const [note, setNote] = useState('')

  const handleSubmit = (e: ChangeEvent) => {
    e.preventDefault()
    console.log('hello')
    addTransaction({
      id: uuidv4(),
      type,
      amount: Number(amount),
      category,
      date: new Date(date).toISOString(),
      note: note.trim(),
    })
  }

  const ctx = {
    type,
    setType,
    amount,
    setAmount,
    category,
    setCategory,
    date,
    setDate,
    note,
    setNote,
    handleSubmit,
  }

  return (
    <FormContext.Provider value={ctx}>
      <form onSubmit={handleSubmit} className='transaction-form'>
        {children}
      </form>
    </FormContext.Provider>
  )
}

export default FormProvider
export { FormContext }
