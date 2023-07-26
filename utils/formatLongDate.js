const formatLongDate = (dateInput, isGetTime = false) => {
  const months = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Des"];

  const format_two_digits = (n) => {
    return n < 10 ? '0' + n : n;
  };

  var dt = new Date(dateInput);

  if (isGetTime) {
    const time = format_two_digits(dt.getHours()) + ":" + format_two_digits(dt.getMinutes());
    return time;
  } else {
    const longDate = dt.getDate() + " " + months[dt.getMonth()] + " " + dt.getFullYear() + " " + format_two_digits(dt.getHours()) + ":" + format_two_digits(dt.getMinutes());
    return longDate;
  }
};

module.exports = {
  formatLongDate
}