export type LayoutTabItem = {
  value: string
  label: string
  href: string
  icon?: React.ReactNode
}
export type LayoutTabSectionProps = {
  sections: Array<LayoutTabItem>
  children: React.ReactNode
  /** Base path segment to extract the current section from pathname */
  basePath: string
}
