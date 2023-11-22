
import dayjs from "dayjs"

//时间格式转换
export function parseDate(date, format = 'YYYY-MM-DD') {
  return dayjs(date).format(format)
}