# date-utils

This is a collection of utility methods for the `Date` object.

## Usage

**Download:**

 1. Click **Code** at the top of the page.

 ![GitHub Code button](./docs/github-code-download.png)

 2. Click **Download ZIP**
 3. The module can now be extracted from the zip file into your project.

**Import:**

```javaScript
import { DateUtil } from './modules/date-utils/index.js' // Use the location of the module in your project.

const dateUtil = new DateUtil()
```

## Table of contents

 - [Usage](#usage)
 - [Table of contents](#table-of-contents)
 - [Methods](#methods)
   - [countDays](#countdays)
   - [getWeekNumber](#getweeknumber)
   - [getOrdinalDate](#getordinaldate)
   - [getDaysBetween](#getdaysbetween)
   - [getDatesBetween](#getdatesbetween)
   - [getQuarter](#getquarter)
   - [isBetween](#isbetween)
   - [startOfWeek](#startofweek)
   - [endOfWeek](#endofweek)
   - [getDaysUntilWeekend](#getdaysuntilweekend)
   - [countWorkingDays](#countworkingdays)
   - [addDays](#adddays)
   - [removeDays](#removedays)
 - [Testing](#testing)

## Methods

### countDays

**countDays(date: Date): number**

Returns the number of days until a date. If the date is in the past, the number of days passed is returned (negative).

```javaScript
const nextWeek = new Date()
nextWeek.setDate(nextWeek.getDate() + 7)

dateUtil.countDays(nextWeek) // returns 7

dateUtil.countDays(new Date('2025-09-30')) // returns a negative number
```

### getWeekNumber

**getWeekNumber(date: Date): number**

Returns the number of the week that the date is in.

```javaScript
dateUtil.getWeekNumber(new Date('2025-09-17')) // returns 38
```

### getOrdinalDate

**getOrdinalDate(date: Date): number**

Returns the number representing the day of the year.

```javaScript
dateUtil.getOrdinalDate(new Date('2025-09-30')) // returns 273
```

### getDaysBetween

**getDaysBetween(date1: Date, date2: Date): number**

Returns the number of days between two dates.

```javaScript
dateUtil.getDaysBetween(new Date('2025-09-15'), new Date('2025-09-22')) // returns 7
```

### getDatesBetween

**getDatesBetween(startDate: Date, endDate: Date): Date[]**

Get an array of dates between two dates, inclusive.

```javaScript
dateUtil.getDatesBetween(new Date('2025-10-25'), new Date('2025-11-02'))
```

### getQuarter

**getQuarter(date: Date): number**

Returns the quarter of the year the date is in.

```javaScript
dateUtil.getQuarter(new Date('2025-10-01')) // returns 4
```

### isBetween

**isBetween(date: Date, startDate: Date, endDate: Date): boolean**

Check if a date is in the interval `[startDate, endDate]`.

```javaScript
dateUtil.isBetween(new Date('2025-09-30'), new Date('2025-09-29'), new Date('2025-10-01')) // true
```

### startOfWeek

**startOfWeek(date: Date): Date**

Returns the start (Monday) of the week the date is in.

```javaScript
dateUtil.startOfWeek(new Date('2025-09-30')) // returns a Date object set to 2025-09-29
```

### endOfWeek

**endOfWeek(date: Date): Date**

Returns the end (Sunday) of the week the date is in.

```javaScript
dateUtil.endOfWeek(new Date('2025-09-30')) // returns a Date object set to 2025-10-05
```

### getDaysUntilWeekend

**getDaysUntilWeekend(date: Date): number**

Get the number of days until the weekend (Saturday). If the date argument is a Sunday, it counts the days until the next weekend. If no argument is passed the current date will be used.

```javaScript
dateUtil.getDaysUntilWeekend(new Date('2025-11-05')) // returns 3
```

### countWorkingDays

**countWorkingDays(startDate: Date, endDate: Date): number**

Get the number of working days between two dates.

```javaScript
dateUtil.countWorkingDays(new Date('2025-10-20'), new Date('2025-11-01')) // returns 10
```

### addDays

**addDays(date: Date, numberOfDays: number): Date**

Add days to the date. The returned date is a different instance from the date argument.

```javaScript
dateUtil.addDays(new Date('2025-01-30'), 5) // returns a Date object set to 2025-02-04
```

### removeDays

**removeDays(date: Date, numberOfDays: number): Date**

Remove days from the date. The returned date is a different instance from the date argument.

```javaScript
dateUtil.addDays(new Date('2025-01-03'), 10) // returns a Date object set to 2024-12-24
```

## Testing

See [Testing instructions](./docs/testrapport.md#run-tests)
