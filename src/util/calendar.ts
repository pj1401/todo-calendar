/**
 * Utility functions for calendar components.
 */

import { getFirstDayOfMonth } from '@pj1401/date-utils'

/**
 * Get the grid-column-start value for the Month and Week view. Monday is the start of the week.
 * @param {number} year The year the month is in.
 * @param {number} month The number representing the month. Zero-based, 0 represents January.
 * @returns {number} The value for grid-column-start
 */
function getStartColumn (year: number, month: number): number {
  // (getFirstDayOfMonth(year, month) + 6) % 7 to change the week start to Monday.
  // Add 1 to get the correct grid-column-start value.
  // The value should not be 0 for the grid to display correctly.
  return convertWeekdayMondayStart(getFirstDayOfMonth(year, month)) + 1
}

/**
 * Convert the number representing the day of the week to Monday starting the week.
 * @param {number} day The day of the week, where 0 represents Sunday as in Date.getDay().
 * @returns {number} The day of the week where 0 represents Monday.
 */
function convertWeekdayMondayStart (day: number): number {
  return (day + 6) % 7
}

/**
 * Determine if the day starts the month. Returns the value for gird-column-start if the day starts the month.
 * @param {number} index The index of the day element.
 * @param {number} startColumn The value for grid-column-start.
 * @returns {number | undefined} The startColumn value if the day is the month start day.
 */
function isStartDay (index: number, startColumn: number): number | undefined {
  return index === 0 ? startColumn : undefined
}

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]

const weekdays = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
]

export { getStartColumn, isStartDay, convertWeekdayMondayStart, months, weekdays }
