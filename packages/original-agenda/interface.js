import XDate from 'xdate';

function padNumber(n: any) {
  if (n < 10) {
    return '0' + n;
  }
  return n;
}

export function xdateToData(xdate: any) {
  const dateString = xdate.toString('yyyy-MM-dd');
  return {
    year: xdate.getFullYear(),
    month: xdate.getMonth() + 1,
    day: xdate.getDate(),
    timestamp: new XDate(dateString, true).getTime(),
    dateString: dateString
  };
}

export function parseDate(d: any) {
  if (!d) {
    return;
  } else if (d.timestamp) {
    // conventional data timestamp
    return new XDate(d.timestamp, true);
  } else if (d instanceof XDate) {
    // xdate
    return new XDate(d.toString('yyyy-MM-dd'), true);
  } else if (d.getTime) {
    // javascript date
    const dateString =
      d.getFullYear() +
      '-' +
      padNumber(d.getMonth() + 1) +
      '-' +
      padNumber(d.getDate());
    return new XDate(dateString, true);
  } else if (d.year) {
    const dateString =
      d.year + '-' + padNumber(d.month) + '-' + padNumber(d.day);
    return new XDate(dateString, true);
  } else if (d) {
    // timestamp number or date formatted as string
    return new XDate(d, true);
  }
}
