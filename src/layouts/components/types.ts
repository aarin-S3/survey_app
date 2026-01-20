export interface ChildMenu {
  icon: string,
  text: string,
  to: string,
  description?: string,
  params?: Record<string, string>
  badge?:string
}
export interface Menu {
  icon: string,
  text: string,
  isDivider: boolean,
  isTitle: boolean,
  child?: ChildMenu[],
  to?: string,
  description?: string,
  badge?:string
}
