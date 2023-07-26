const formatNumber = (number) => {
    const suffixes = ['', '', '', '', ''];
    const magnitude = Math.floor(Math.log10(number) / 3);
  
    if (magnitude >= suffixes.length) {
      return 'Number is too large';
    }
  
    const scaledNumber = number / Math.pow(1000, magnitude);
    return scaledNumber.toFixed(3).replace(/\.?0+$/, '') + suffixes[magnitude];
  };
  
module.exports = {
    formatNumber,
}