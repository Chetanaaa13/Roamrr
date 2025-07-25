import React, { useState } from 'react';
import { travelApi } from '../api/travelApi';

const CurrencyConverter = () => {
  const [amount, setAmount] = useState(100);
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const currencies = [
    { code: 'USD', name: 'US Dollar', symbol: '$' },
    { code: 'EUR', name: 'Euro', symbol: '€' },
    { code: 'JPY', name: 'Japanese Yen', symbol: '¥' },
    { code: 'IDR', name: 'Indonesian Rupiah', symbol: 'Rp' }
  ];

  const handleConvert = async () => {
    if (!amount || amount <= 0) {
      alert('Please enter a valid amount');
      return;
    }

    setLoading(true);
    try {
      const conversion = await travelApi.convertCurrency(amount, fromCurrency, toCurrency);
      setResult(conversion);
    } catch (error) {
      console.error('Error converting currency:', error);
      alert('Error converting currency. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const swapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
    setResult(null);
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h3>💱 Currency Converter</h3>
        
        <div style={styles.form}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Amount:</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(parseFloat(e.target.value))}
              style={styles.amountInput}
              min="0"
              step="0.01"
            />
          </div>

          <div style={styles.currencyRow}>
            <div style={styles.currencyGroup}>
              <label style={styles.label}>From:</label>
              <select
                value={fromCurrency}
                onChange={(e) => setFromCurrency(e.target.value)}
                style={styles.select}
              >
                {currencies.map(currency => (
                  <option key={currency.code} value={currency.code}>
                    {currency.code} - {currency.name}
                  </option>
                ))}
              </select>
            </div>

            <button onClick={swapCurrencies} style={styles.swapButton}>
              ⇄
            </button>

            <div style={styles.currencyGroup}>
              <label style={styles.label}>To:</label>
              <select
                value={toCurrency}
                onChange={(e) => setToCurrency(e.target.value)}
                style={styles.select}
              >
                {currencies.map(currency => (
                  <option key={currency.code} value={currency.code}>
                    {currency.code} - {currency.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <button
            onClick={handleConvert}
            disabled={loading || fromCurrency === toCurrency}
            style={{
              ...styles.convertButton,
              ...(loading || fromCurrency === toCurrency ? styles.disabledButton : {})
            }}
          >
            {loading ? 'Converting...' : 'Convert'}
          </button>
        </div>

        {result && (
          <div style={styles.result}>
            <div style={styles.resultMain}>
              <span style={styles.originalAmount}>
                {result.originalAmount} {result.fromCurrency}
              </span>
              <span style={styles.equals}>=</span>
              <span style={styles.convertedAmount}>
                {result.convertedAmount} {result.toCurrency}
              </span>
            </div>
            <div style={styles.exchangeRate}>
              Exchange Rate: 1 {result.fromCurrency} = {result.exchangeRate} {result.toCurrency}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    padding: '2rem'
  },
  card: {
    backgroundColor: 'white',
    borderRadius: '12px',
    padding: '2rem',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    width: '100%',
    maxWidth: '500px'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem'
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem'
  },
  label: {
    fontSize: '0.9rem',
    fontWeight: '500',
    color: '#555'
  },
  amountInput: {
    padding: '0.75rem',
    border: '2px solid #e0e0e0',
    borderRadius: '8px',
    fontSize: '1.1rem',
    outline: 'none',
    transition: 'border-color 0.3s ease'
  },
  currencyRow: {
    display: 'flex',
    alignItems: 'end',
    gap: '1rem'
  },
  currencyGroup: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem'
  },
  select: {
    padding: '0.75rem',
    border: '2px solid #e0e0e0',
    borderRadius: '8px',
    fontSize: '1rem',
    outline: 'none',
    backgroundColor: 'white',
    cursor: 'pointer'
  },
  swapButton: {
    padding: '0.75rem',
    border: 'none',
    borderRadius: '50%',
    backgroundColor: '#667eea',
    color: 'white',
    cursor: 'pointer',
    fontSize: '1.2rem',
    width: '50px',
    height: '50px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.3s ease'
  },
  convertButton: {
    padding: '1rem',
    backgroundColor: '#667eea',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontSize: '1.1rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease'
  },
  disabledButton: {
    backgroundColor: '#ccc',
    cursor: 'not-allowed'
  },
  result: {
    marginTop: '1.5rem',
    padding: '1.5rem',
    backgroundColor: '#f8f9ff',
    borderRadius: '8px',
    border: '2px solid #667eea'
  },
  resultMain: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '1rem',
    marginBottom: '1rem'
  },
  originalAmount: {
    fontSize: '1.3rem',
    fontWeight: '600',
    color: '#333'
  },
  equals: {
    fontSize: '1.5rem',
    color: '#667eea',
    fontWeight: 'bold'
  },
  convertedAmount: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: '#667eea'
  },
  exchangeRate: {
    textAlign: 'center',
    fontSize: '0.9rem',
    color: '#666',
    fontStyle: 'italic'
  }
};

export default CurrencyConverter;