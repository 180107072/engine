type MutableValues = {
  class_params: Record<string, string>
  func_params: Record<string, string>
  if_error: ErrorBlock
  next_id: string
  inherit_object: string | null
}

type ErrorBlock = {
  go_to: string
  repeat: number
  counter: number
  delay: number
}
