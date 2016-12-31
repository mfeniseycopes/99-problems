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
  x >= y ?
    x % y === 0 ?
      y :
      gcd(y, x % y) :
    gcd(y, x)

// 33
const coprime = (x, y) =>
  gcd(x, y) === 1

// 34
const totient = m =>
  range(1, m)
  .reduce((acc, k) =>
    acc + (coprime(k, m) ? 1 : 0), 0)

// 35
const primeFactors = (n, start = 3) =>
  n === start ?
    [n] :
    n % 2 === 0 ?
      [2, ...primeFactors(n / 2)] :
      n % start === 0 ?
        [start, ...primeFactors(n / start, start)] :
        primeFactors(n, start + 2)

// 36
const primeFactorMultiplicity = (n) =>
  encode(primeFactors(n))

// 37
const phi = n =>
  primeFactorMultiplicity(n)
  .reduce((acc, [p, m]) =>
    acc * (p - 1) * Math.pow(p, m - 1), 1)

// 38
const phiComparator = n => {
  console.log(`totient(${n})`)
  let start = Date.now()
  console.log("--", totient(n))
  console.log("--", Date.now() - start, "seconds")

  console.log(`phi(${n})`)
  start = Date.now()
  console.log("--", phi(n))
  console.log("--", Date.now() - start, "seconds")
}

// 39
const primeNumbers = (k, n) =>
  range(2, n).reduce((sieve, el) =>
    sieve.filter(x => x === el || x % el !== 0), range(k < 2 ? 2 : k, n))

// 40
const goldbach = n =>
  [range(2, Math.floor(n / 2))
  .findIndex(el => isPrime(el) && isPrime(n - el))]
  .reduce((acc, i) =>
    [i + 2, n - i - 2], [])

// 41
const goldbachList = (k, n) =>
  range(k, n)
  .filter(el => el % 2 === 0 && el > 2)
  .map(goldbach)

/* LOGIC & CODES */

// 46
const not = a =>
  !a

const and = (a, b) =>
  a && b

const or = (a, b) =>
  a || b

const nand = (a, b) =>
  not(and(a, b))

const nor = (a, b) =>
  not(or(a, b))

const xor = (a, b) =>
  and(or(a, b), nand(a, b))

const impl = (a, b) =>
  or(not(a), b)

const eq = (a, b) =>
  or(and(a, b), nand(a, b))

// 47, 48 (no custom operators in javascript)

// 49
const grey = n =>
  range(0, Math.pow(2, n) - 1)
  .map(k => k ^ (k >> 1))
  .map(k => new Array(n).join('0') + k.toString(2))
  .map(k => k.substr(-n))

// 50
const huffmanNode = (val, freq, left = null, right = null) =>
  ({ val, freq, left, right })

const huffmanTree = list =>
  length(list) <= 1 ?
    list[0] :
    huffmanTree(
      list.sort((x, y) => x.freq - y.freq)
      .reduce((acc, el, i, arr) =>
        i < 2 ?
          acc || [huffmanNode(null, arr[0].freq + arr[1].freq, arr[0], arr[1])] :
          [...acc, el], null))

const huffmanCodes = (huffmanNode, encoding = '') =>
  huffmanNode !== null ?
    [...(huffmanNode.val ? [[huffmanNode.val, encoding]]: []),
    ...huffmanCodes(huffmanNode.left, encoding + '0'),
    ...huffmanCodes(huffmanNode.right, encoding + '1')] :
    []

const huffman = list =>
  huffmanCodes(
    huffmanTree(
      list.map(el => huffmanNode(el[0], el[1]))))

/* BINARY TREES */

const newNode = (val, left = null, right = null) => ({
  val, left, right
})

const flatMap = (node, cb) =>
  node ?
    [...flatMap(node.left, cb), cb(node), ...flatMap(node.right, cb)] :
    []

// 55
const cBalanced = (n, val) =>
  n === 0 ?
    null :
    newNode(
      val,
      cBalanced(Math.ceil((n - 1) / 2), val),
      cBalanced(Math.floor((n - 1) / 2), val))

// 56
const isMirror = (left, right) =>
  and(left === null, right === null) ?
    true :
    and(left !== null, right !== null) ?
      and(
        isMirror(left.left, right.right),
        isMirror(left.right, right.left)) :
      false

const isSymmetric = node =>
  isMirror(node.left, node.right)

// 57
const addValue = (val, node = null) =>
  node === null ? 
    newNode(val) :
    node.val === val ?
      node :
      node.val > val ? 
        newNode(node.val, addValue(val, node.left), node.right) :
        newNode(node.val, node.left, addValue(val, node.right))  

const constructTree = list =>
  list.reduce((acc, val) =>
    addValue(val, acc), null)

