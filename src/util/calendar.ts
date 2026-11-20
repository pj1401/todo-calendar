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
  return ((getFirstDayOfMonth(year, month) + 6) % 7) + 1
}

export { getStartColumn }
