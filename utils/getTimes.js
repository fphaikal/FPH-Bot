const formatTime = (n) => {
    return n < 10 ? '0' + n : n;
  };
  
  const getTimes = (dateInput) => {
    var date = new Date(dateInput);
    var time = `${formatTime(date.getHours())}:${formatTime(date.getMinutes())}`;
    return time;
  };
  
  const getCurrentTime = () => {
    var date = new Date();
    const hours = date.getHours() + ':' + date.getMinutes();
    return hours;
  };
  
  const getStreamStartedTime = () => {
    const streamStarted = new Date(Date.now() - 1000 * (60 * 5));
    return streamStarted;
  };
  
  const formatStreamTime = (times) => {
    return times ? getTimes(times * 1000) : 'TBD';
  };
  
  module.export = { getCurrentTime, getStreamStartedTime, formatStreamTime };
  