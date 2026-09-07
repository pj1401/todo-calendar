import { DateUtil } from "date-utils";

const dateUtil = new DateUtil()

const nextWeek = new Date()
nextWeek.setDate(nextWeek.getDate() + 7)

console.log(dateUtil.countDays(nextWeek))

const lastWeek = new Date()
lastWeek.setDate(lastWeek.getDate() - 7)

console.log(dateUtil.countDays(lastWeek))
