const last = list =>
  list[list.length - 1] || null

const penultimate = list =>
  list[list.length - 2] || null

const nth = (n, list) =>
  list[n] || null

const length = list =>
  list.length

const reverse = list =>
  list.map((_, i) => list[list.length - i - 1])

const isPalidrome = list =>
  reverse(list).all((el, i) => el === list[i])

const flatten = list =>
  list.reduce(
    (acc, el) =>
      el instanceof Array ? acc.concat(flatten(el)) : acc.concat([el]),
    []
  )

const compress = list =>
  list.filter((el, i) => el !== list[i - 1])

const pack = list =>
  list.reduce((acc, el, i) => {
    el === list[i - 1] ? last(acc).push(el) : acc.push([el])
    return acc
  }, [])

const encode = list =>
  pack(list).map( packing => [packing[0], length(packing)])
