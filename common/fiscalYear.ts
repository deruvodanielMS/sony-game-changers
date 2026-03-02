/**
 * Sony fiscal year utilities.
 *
 * Sony's fiscal year runs from April 1st to March 31st.
 * FY2025 = April 1, 2025 – March 31, 2026.
 *
 * @example
 * getFiscalYear(new Date('2026-02-15')) // → 2025  (Jan–Mar belong to the previous FY)
 * getFiscalYear(new Date('2025-05-01')) // → 2025  (May onwards is within FY2025)
 * getFiscalYear(new Date('2026-04-01')) // → 2026  (April 1st opens FY2026)
 */
export function getFiscalYear(date: Date = new Date()): number {
  const month = date.getMonth() + 1 // getMonth() is 0-indexed
  const year = date.getFullYear()

  // Months April (4) through December (12) belong to the fiscal year that starts
  // in that calendar year. January (1) through March (3) belong to the fiscal
  // year that started the previous calendar year.
  return month >= 4 ? year : year - 1
}

/**
 * Returns a short display label for the fiscal year (e.g. "FY25").
 * Use this for UI display; use getFiscalYear() for API/DB queries.
 */
export function getFiscalYearLabel(date: Date = new Date()): string {
  return `FY${getFiscalYear(date) % 100}`
}
