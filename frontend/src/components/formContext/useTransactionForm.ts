import { useContext } from 'react'
import { FormContext } from './FormContext'

export const useTransactionForm = () => {
  const context = useContext(FormContext)
  if (!context)
    throw new Error(
      'Transaction Form context must be used inside Add Transaction Form',
    )
  return context
}
