import { modeOfTransactions } from '../utils/constants'

import styles from './CustomListItemStyles'

export const getAmountDetails = (info) => {
  const amount = Number(info?.transactionAmount)?.toFixed(2)

  if (info.transactionType === modeOfTransactions.debit) {
    return {
      style: styles.debitedStyle,
      symbol: '₹ -',
      amount
    }
  }
  return {
    style: styles.creditedStyle,
    symbol: '₹',
    amount
  }
}
