import axios from "axios"
import errorHandler
  from "@/datasource/network/errorHandler"

const GOOGLE_CALENDAR_API = "https://www.googleapis.com/calendar/v3/calendars/id.indonesian%23holiday%40group.v.calendar.google.com/events?key="
const API_KEY = "AIzaSyCYRNbkOMDOgVQ8uSSwg7JVP3gKM93Wq9g"

const getEventHoliday = async () => {
  try {
    var urlGetHoliday = GOOGLE_CALENDAR_API + API_KEY
    var holiday = await axios.get(urlGetHoliday, {}, {})

    var holidayRaw = holiday.data.items
    var i = 0
    var holidayClean = []
    while (i < holidayRaw.length) {
      var itemHoliday = {
        startDate: holidayRaw[i].start.date,
        endDate: holidayRaw[i].end.date,
        summary: holidayRaw[i].summary
      }
      holidayClean[i] = itemHoliday
      i++
    }
    // return array of object itemHoliday
    return holidayClean
  } catch (err) {
    return await errorHandler(err)
  }
}

export default {
  getEventHoliday
}
