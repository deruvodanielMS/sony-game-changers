/**
 * Sony fiscal year utilities.
 *
 * Sony's fiscal year runs from April 1st to March 31st.
 * FY25 = April 1, 2025 – March 31, 2026.
 *
 * @example
 * getFiscalYear(new Date('2026-02-15')) // → 25  (Jan–Mar belong to the previous FY)
 * getFiscalYear(new Date('2025-05-01')) // → 25  (May onwards starts the new FY)
 * getFiscalYear(new Date('2026-04-01')) // → 26  (April 1st opens FY26)
 */
export function getFiscalYear(date: Date = new Date()): number {
  const month = date.getMonth() + 1 // getMonth() is 0-indexed
  const year = date.getFullYear()

  // Months April (4) through December (12) belong to the fiscal year that starts
  // in that calendar year. January (1) through March (3) belong to the fiscal
  // year that started the previous calendar year.
  const fiscalCalendarYear = month >= 4 ? year : year - 1

  return fiscalCalendarYear % 100
}
