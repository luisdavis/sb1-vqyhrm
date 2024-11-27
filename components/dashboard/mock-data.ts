// Mock data for trades and orders
export const MOCK_TRADES = [
  { 
    id: '1',
    pair: 'EURUSD',
    tradeId: '2245545664',
    ticker: 'E6U4',
    quantity: 2,
    position: 'Sell',
    date: '7/16/2024 2:15pm',
    pnl: '+$220',
    entryPrice: 1.0923,
    currentPrice: 1.0900,
    stopLoss: 1.0950,
    takeProfit: 1.0850,
    commission: 2.50,
    swap: -0.32,
    group: 'Forex Group 1',
    account: {
      id: '1',
      name: 'Main Trading Account'
    },
    duration: '2h 15m',
    status: 'active'
  },
  { 
    id: '2',
    pair: 'BTCUSD',
    tradeId: '2245545665',
    ticker: 'BTC',
    quantity: 0.5,
    position: 'Buy',
    date: '7/16/2024 2:15pm',
    pnl: '-$20',
    entryPrice: 45230,
    currentPrice: 45200,
    stopLoss: 44800,
    takeProfit: 46000,
    commission: 1.75,
    swap: 0,
    group: 'Crypto Group 1',
    account: {
      id: '2',
      name: 'Crypto Trading'
    },
    duration: '45m',
    status: 'archived'
  },
];

export const MOCK_ORDERS = [
  {
    id: '1',
    pair: 'EURUSD',
    tradeId: '2245545664',
    ticker: 'E6U4',
    quantity: 2,
    position: 'Sell',
    date: '7/16/2024 2:15pm',
    pnl: '+$220',
    orderType: 'limit',
    status: 'partially_filled',
    limitPrice: 1.0950,
    stopPrice: null,
    timeInForce: 'GTC',
    expiryDate: '7/17/2024',
    group: 'Forex Group 1',
    account: {
      id: '1',
      name: 'Main Trading Account'
    },
    filledQuantity: 1,
    remainingQuantity: 1,
    averagePrice: 1.0948,
    fills: [
      {
        id: 'fill1',
        price: 1.0948,
        quantity: 1,
        timestamp: '7/16/2024 2:16pm',
        executionId: 'exec123'
      }
    ]
  },
  {
    id: '2',
    pair: 'BTCUSD',
    tradeId: '2245545665',
    ticker: 'BTC',
    quantity: 0.5,
    position: 'Buy',
    date: '7/16/2024 2:15pm',
    pnl: '-$20',
    orderType: 'stop',
    status: 'filled',
    limitPrice: null,
    stopPrice: 45000,
    timeInForce: 'GTC',
    expiryDate: null,
    group: 'Crypto Group 1',
    account: {
      id: '2',
      name: 'Crypto Trading'
    },
    filledQuantity: 0.5,
    remainingQuantity: 0,
    averagePrice: 45010,
    fills: [
      {
        id: 'fill2',
        price: 45005,
        quantity: 0.3,
        timestamp: '7/16/2024 2:16pm',
        executionId: 'exec124'
      },
      {
        id: 'fill3',
        price: 45015,
        quantity: 0.2,
        timestamp: '7/16/2024 2:17pm',
        executionId: 'exec125'
      }
    ]
  },
];