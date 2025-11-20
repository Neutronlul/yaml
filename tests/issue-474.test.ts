import { parseDocument } from 'yaml'

describe('Issue #474: Extra newline after empty values', () => {
  test('Empty values with blank lines should round-trip correctly', () => {
    const yaml = `map:
  item:

anothermap:
  anotheritem:
`
    const doc = parseDocument(yaml)
    const result = doc.toString()
    expect(result).toBe(yaml)
  })

  test('Multiple blank lines are normalized to one', () => {
    const yaml = `map:
  item:


anothermap:
  anotheritem:
`
    const expected = `map:
  item:

anothermap:
  anotheritem:
`
    const doc = parseDocument(yaml)
    const result = doc.toString()
    expect(result).toBe(expected)
  })

  test('Nested empty values', () => {
    const yaml = `outer:
  inner:
    key:

  another:
    key2:
`
    const doc = parseDocument(yaml)
    const result = doc.toString()
    expect(result).toBe(yaml)
  })
})
