/* LIST OPERATIONS */

// 1
const last = list =>
  list[list.length - 1] || null

// 2
const penultimate = list =>
  list[list.length - 2] || null

// 3
const nth = (n, list) =>
  list[n] || null

// 4
const length = list =>
  list.length

// 5
const reverse = list =>
  list.map((_, i) => list[list.length - i - 1])

// 6
const isPalidrome = list =>
  reverse(list).all((el, i) => el === list[i])

// 7
const flatten = list =>
  list.reduce(
    (acc, el) =>
      el instanceof Array ? acc.concat(flatten(el)) : acc.concat([el]),
    []
  )

// 8
const compress = list =>
  list.filter((el, i) => el !== list[i - 1])

// 9
const pack = list =>
  list.reduce((acc, el, i) => {
    el === list[i - 1] ? last(acc).push(el) : acc.push([el])
    return acc
  }, [])

// 10
const encode = list =>
  pack(list).map( packing => [packing[0], length(packing)])

// 11
const encodeModified = list =>
  encode(list).map((encoding => encoding[1] === 1 ? encoding[0] : encoding))

// 12
const decode = list =>
  list.reduce(
    (acc, group) => acc.concat(new Array(group[1]).fill(group[0])),
    []
  )

// 13
const encodeDirect = list =>
  list.reduce((acc, el, i) => {
    el === list[i - 1] ? last(acc)[1] = last(acc)[1] + 1 : acc.push([el, 1])
    return acc
  }, [])

// 14
const duplicate = list =>
  list.reduce((acc, el) => acc.concat([el, el]), [])

// 15
const duplicateN = (n, list) =>
  list.reduce((acc, el) => acc.concat(new Array(n).fill(el)), [])

// 16
const drop = (n, list) => list.filter((_, i) => (i + 1) % n !== 0)

// 17
const split = (n, list) => [list.slice(0, n), list.slice(n)]

// 18
const slice = (i, k, list) => list.slice(i, k)

// 19
const rotate = (n, list) => flatten(reverse(split(n, list)))

// 20
const removeAt = (k, list) => [...slice(0, k, list), ...slice(k + 1, length(list), list)]

// 21
const insertAt = (el, k, list) => {
  const [left, right] = split(k, list)
  return [...left, el, ...right]
}

// 22
const range = (start, end) =>
  Array.from({ length: end - start + 1 }, (_, i) => start + i)

// 23
const randomSelect = (n, list) => {
    const selected = {}
    const nextRandomUniq = () => {
      let i = Math.floor(Math.random() * length(list))
      return selected[i] ? nextRandomUniq() : selected[i] = true && list[i]
    }

  return Array.from({ length: n }, () => nextRandomUniq())
}

// 24
const lotto = (n, max) => randomSelect(n, range(1, max))

// 25
const randomPermute = list => randomSelect(length(list), list)

// 26
const combinations = (k, list) =>
  k === 1 ?
    list.map((el) => [el]) :
    list.slice(0, length(list) - k + 1, list)
    .reduce((acc, el, i) =>
      acc.concat(
        combinations(k - 1, slice(i + 1, length(list), list))
        .map(subCombo => [el,...subCombo])), [])

// 27
const group = (sizes, list) =>
  length(sizes) === 1 ?
    combinations(sizes[0], list)
    .map(combo => [combo]) :
    combinations(sizes[0], list)
    .reduce((acc, combo) =>
        group(
          sizes.slice(1),
          list.filter(el => !combo.includes(el)))
        .reduce((subAcc, subGroup) =>
          subAcc.concat([[combo, ...subGroup]]), acc), [])

// 28a
const lsort = list =>
  list.sort((x, y) => length(x) <= length(y) ? -1 : 1)

// 28b
const lsortFreq = list =>
  Object.keys(freqs = list.reduce((acc, x) =>
    Object.assign(acc, {
      [length(x)]: acc[length(x)] ? acc[length(x)].concat([x]) : [x] })
  , {}))
  .sort((x, y) => x > y ? -1 : 1)
  .reduce((acc, key) =>
    acc.concat(freqs[key]), [])

/* NUMBER THEORY */

// 31
const isPrime = num =>
  num <= 3 ?
    true :
    range(2, Math.floor(Math.sqrt(num)))
    .every(factor => num % factor !== 0)

// 32
const gcd = (x, y) =>
  x > y ?
    x % y ?
      gcd(y, x % y) :
      y :
    gcd(y, x)

// 33
const coprime = (x, y) =>
  gcd(x, y) === 1

// 34
const phi = m =>
  range(1, m)
  .reduce((acc, k) =>
    acc + (coprime(k, m) ? 1 : 0), 0)

// 35
const primeFactors = (n, start = 3) =>
  n / start === 1 ?
    [start] :
    n % 2 === 0 ?
      [2, ...primeFactors(n / 2)] :
      n % start === 0 ?
        [start, ...primeFactors(n / start, start)] :
        primeFactors(n, start + 2)

console.log(primeFactors(100000))
