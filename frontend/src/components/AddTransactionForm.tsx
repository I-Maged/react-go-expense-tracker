import FormProvider from './formContext/FormContext'
import {
  AmountInput,
  CategorySelect,
  DateInput,
  NoteInput,
  SubmitButton,
  TypeToggle,
} from './formContext/FormComponents'

import './AddTransactionForm.css'

const AddTransactionForm = () => {
  return (
    <div className='glass-panel form-container'>
      <div className='form-header'>
        <h3>Add Transaction</h3>
      </div>
      <FormProvider>
        <TypeToggle />
        <AmountInput />
        <div className='form-row'>
          <CategorySelect />
          <DateInput />
        </div>
        <NoteInput />
        <SubmitButton />
      </FormProvider>
    </div>
  )
}

export default AddTransactionForm
