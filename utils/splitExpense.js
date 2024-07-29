const splitExpense = (amount, method, details) => {
    switch (method) {
      case 'exact':
        return details.map(detail => ({ ...detail, share: detail.amount }));
      case 'percentage':
        const totalPercentage = details.reduce((sum, detail) => sum + detail.percentage, 0);
        if (totalPercentage !== 100) {
          throw new Error('Total percentage must add up to 100');
        }
        return details.map(detail => ({
          ...detail,
          share: (amount * detail.percentage) / 100,
        }));
      case 'equal':
        const equalShare = amount / details.length;
        return details.map(detail => ({ ...detail, share: equalShare }));
      default:
        throw new Error('Invalid split method');
    }
  };
  
  module.exports = splitExpense;
  