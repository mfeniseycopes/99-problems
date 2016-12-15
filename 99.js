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

const encodeModified = list =>
  encode(list).map((encoding => encoding[1] === 1 ? encoding[0] : encoding))

const decode = list =>
  list.reduce(
    (acc, group) => acc.concat(new Array(group[1]).fill(group[0])),
    []
  )

const encodeDirect = list =>
  list.reduce((acc, el, i) => {
    el === list[i - 1] ? last(acc)[1] = last(acc)[1] + 1 : acc.push([el, 1])
    return acc
  }, [])

const duplicate = list =>
  list.reduce((acc, el) => acc.concat([el, el]), [])

const duplicateN = (n, list) =>
  list.reduce((acc, el) => acc.concat(new Array(n).fill(el)), [])

const drop = (n, list) => list.filter((_, i) => (i + 1) % n !== 0)

const split = (n, list) => [list.slice(0, n), list.slice(n)]

const slice = (i, k, list) => list.slice(i, k)

const rotate = (n, list) => flatten(reverse(split(n, list)))

const removeAt = (k, list) => [...slice(0, k, list), ...slice(k + 1, length(list), list)]
