export const getFullDate = (rawDate) => {
  const date = typeof(rawDate) === "string" ? new Date(rawDate) : rawDate
  const day = date.getDate()
  const month = date.getMonth() + 1
  const year = date.getFullYear()

  return day + "/" + month + "/" + year
}