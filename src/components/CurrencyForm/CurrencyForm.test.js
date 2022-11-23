import { getByText, render, screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CurrencyForm from './CurrencyForm';


describe('Component CurrencyForm', () => {
  it('component should render without problem', () => {
    render(<CurrencyForm action={() => {}} />)
  });
  it('should render action callback with proper data on submit', () => {
    
    const testCases = [
      {amount: '200', from: 'PLN', to: 'USD'},
      {amount: '100', from: 'USD', to: 'PLN'},
      {amount: '330', from: 'PLN', to: 'USD'},
      {amount: '3400', from: 'USD', to: 'PLN'}
    ]
    for(const testObj of testCases) { 
    
    const action = jest.fn();
    
    render(<CurrencyForm action={action}/>)
    
    const submitButton = screen.getByText('Convert')
    
    const fieldAmount = screen.getByTestId('amount')
    const fromSelect = screen.getByTestId('from')
    const toSelect = screen.getByTestId('to')
    
    userEvent.type(fieldAmount, testObj.amount);
    userEvent.selectOptions(fromSelect, testObj.from);
    userEvent.selectOptions(toSelect, testObj.to);
    userEvent.click(submitButton);
    
    expect(action).toHaveBeenCalledTimes(1);
    expect(action).toHaveBeenCalledWith({amount: parseInt(testObj.amount), from: testObj.from, to: testObj.to})
    cleanup();
    }
   })
   
});