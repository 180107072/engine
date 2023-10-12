enum CONNECTION_TYPES {
  NEXT = 'NEXT',
  ERROR = 'ERROR',
  REFERENCE = 'REFERENCE',
  CUSTOM = 'CUSTOM'
}

enum PORT_TYPES {
  TEXT = 'TEXT',
  NUMBER = 'NUMBER',
  ARRAY = 'ARRAY',
  BOOLEAN = 'BOOLEAN'
}

type ArgumentProps = {
  name: string
  type: string
  example: string
  required: boolean
  output: boolean
  value?: any
}

type ModuleNode = {
  name: string
  class_params: Record<string, ArgumentProps>
  func_params: Record<string, ArgumentProps>
  additional_info: Record<string, string>
  className: string
  functionName: string
}

type ModuleShared = {
  breakpoint: boolean
  if_error: Record<string, string>
  inherit_object: string
  module: string
  next_id: string
  object: string
  results: string
  start: boolean
}

type Module = {
  core: ModuleNode[]
  shared: ModuleShared
}
