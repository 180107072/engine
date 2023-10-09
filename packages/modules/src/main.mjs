import fs from 'node:fs'

import path from 'node:path'

const start = performance.now()

const module = 'pythonRPA'
const input = 'data'
let shared = {
  results: null,
  object: null,
  inherit_object: null,
  module: 'pyPythonRPA.Robot.pythonRPA',
  breakpoint: false,
  if_error: { go_to: 'block_id', repeat: 1, counter: 0 },
  start: false,
  next_id: 'finish'
}

const reader = {
  root: [process.cwd(), input],
  forward(to) {
    this.root.push(to)
    return this.current()
  },
  back() {
    this.root.pop()
  },
  look(...to) {
    return path.join(...[...this.root, ...to])
  },
  current() {
    return path.join(...this.root)
  }
}

const modules = await fs.promises.readdir(reader.current())
const features = await Promise.all(
  modules.map(async (feature) => {
    const entries = await fs.promises.readdir(reader.look(feature))
    return entries.map((entry) =>
      fs.promises.readFile(reader.look(feature, entry), 'utf8')
    )
  })
).then((data) => Promise.all(data.flat(1)))

const mapFeatures = (content) => {
  const {
    name,
    class_params,
    func_params,
    additional_info,
    class: className,
    function: functionName
  } = content
  return {
    name,
    class_params,
    func_params,
    additional_info,
    className,
    functionName
  }
}

const mapped = features.map((feature) => mapFeatures(JSON.parse(feature)))

const moduleExists = await fs.promises.access(module).then(
  () => true,
  () => false
)
if (!moduleExists) await fs.promises.mkdir(module)

const writeModule = (data, scope) =>
  fs.promises.writeFile(
    `${module}/${module}.${scope}.json`,
    JSON.stringify(data, null, 4)
  )

await Promise.all([
  writeModule(mapped, 'module'),
  writeModule(shared, 'shared')
])

console.log(`${(performance.now() - start).toFixed(3)}ms`)
