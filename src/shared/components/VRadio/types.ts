export interface IVRadioOptions {
  value: any
  label: string | number
  disabled?: boolean
}

export type IVRadioModelValue = string | number | undefined | null

export interface IVRadioProps extends IVRadioOptions {
  disabled?: boolean
}
