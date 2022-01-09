export const getFullDate = (rawDate) => {
  const date = typeof(rawDate) === "string" ? new Date(rawDate) : rawDate
  const day = date.getDate()
  const month = date.getMonth() + 1
  const year = date.getFullYear()

  return day + "/" + month + "/" + year
}

export const calculateAge = (birthday) => { // birthday is a date
  const ageDifMs = Date.now() - birthday;
  const ageDate = new Date(ageDifMs); // miliseconds from epoch
  return Math.abs(ageDate.getUTCFullYear() - 1970);
}