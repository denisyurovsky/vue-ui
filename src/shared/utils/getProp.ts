export function getProp(object: Record<string, any>, path: string): any {
  if (!object) {
    return null
  }

  if (!path) {
    return null
  }

  const _path = path.split('.')

  if (_path.length === 1) {
    return object[_path[0]]
  }

  return getProp(object[_path[0]], _path.slice(1).join('.'))
}
