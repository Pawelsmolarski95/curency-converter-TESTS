import { cleanup, render, screen } from '@testing-library/react';
import ResultBox from './ResultBox.js'
import '@testing-library/jest-dom/extend-expect';

describe('Component ResultBox', () => {
     it('component sholuld render without crashing', () => {
       render(<ResultBox amount={100} from="PLN" to="USD"/>) 
     });
     it('should render proper info about conversion when PLN -> USD', () => {
        const testCases = [
            { amount: '150', results: 'PLN 150.00 = $42.86' },
            { amount: '345', results: 'PLN 345.00 = $98.57' },
            { amount: '50',  results: 'PLN 50.00 = $14.29'  },
            { amount: '120', results: 'PLN 120.00 = $34.29' },
        ]
        
        for (const objTest of testCases) {
        
        render(<ResultBox  amount={parseInt(objTest.amount)} from="PLN" to="USD"/>)
        
        const resultBox = screen.getByTestId('result');
        
        expect(resultBox).toHaveTextContent(objTest.results)
        cleanup();
        }
     })
     it('should render proper info about conversion when USD -> PLN', () => {
        const testCases = [
            { amount: '100', results: '$100.00 = PLN 350.00' },
            { amount: '45',  results: '$45.00 = PLN 157.50' },
            { amount: '150', results: '$150.00 = PLN 525.00'  },
            { amount: '220', results: '$220.00 = PLN 770.00' },
        ]
        
        for (const objTest of testCases) {
        
        render(<ResultBox  amount={parseInt(objTest.amount)} from="USD" to="PLN"/>)
        
        const resultBox = screen.getByTestId('result');
        
        expect(resultBox).toHaveTextContent(objTest.results)
        cleanup();
        }
     })
     it('should render proper info about conversion when PLN -> PLN', () => {
        const testCases = [
            { amount: '100', results: 'PLN 100.00 = PLN 100.00' },
            { amount: '45',  results: 'PLN 45.00 = PLN 45.00' },
        ]
        
        for (const objTest of testCases) {
        
        render(<ResultBox  amount={parseInt(objTest.amount)} from="PLN" to="PLN"/>)
        
        const resultBox = screen.getByTestId('result');
        
        expect(resultBox).toHaveTextContent(objTest.results)
        cleanup();
        }
     })
     it('should render proper info about conversion when USD -> USD', () => {
        const testCases = [
            { amount: '10', results: '$10.00 = $10.00' },
            { amount: '495',  results: '$495.00 = $495.00' },
        ]
     
        for (const objTest of testCases) {
        
        render(<ResultBox  amount={parseInt(objTest.amount)} from="USD" to="USD"/>)
        
        const resultBox = screen.getByTestId('result');
        
        expect(resultBox).toHaveTextContent(objTest.results)
        cleanup();
        }
     })
     it('should return -> Wrong value <-  when input is lower than zero', () => {
        

        render(<ResultBox  amount={-13} from="PLN" to="USD"/>)
        
        const resultBox = screen.getByTestId('result');
        
        expect(resultBox).toHaveTextContent('Wrong value')
     })
    });