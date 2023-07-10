import { useState } from 'react';

import Header from './components/Header/Header';
import InvestmentInput from './components/UserInput/InvestmentInput';
import InvestmentTable from './components/ResultsTable/InvestmentTable';

function App() {
  const [userInput, setUserInput] = useState(null);

  const calculateHandler = (userInput) => {
    setUserInput(userInput);
  };

  const yearlyData = [];

  if (userInput) {
    let currentSavings = +userInput['current-savings'];
    const yearlyContribution = +userInput['yearly-contribution'];
    const expectedReturn = +userInput['expected-return'] / 100;
    const duration = +userInput['duration'];

    for (let i = 0; i < duration; i++) {
      const yearlyInterest = currentSavings * expectedReturn;
      currentSavings += yearlyInterest + yearlyContribution;
      yearlyData.push({
        year: i + 1,
        savingsEndOfYear: currentSavings,
        yearlyInterest: yearlyInterest,
        yearlyContribution: yearlyContribution,
      });
    }
  }

  return (
    <div>
      <Header />
      <InvestmentInput onCalculate={calculateHandler} />

      {!userInput && (
        <p style={{ textAlign: 'center' }}>No investment calculated yet.</p>
      )}
      {userInput && (
        <InvestmentTable
          items={yearlyData}
          initialInvestment={userInput['current-savings']}
        />
      )}
    </div>
  );
}

export default App;
