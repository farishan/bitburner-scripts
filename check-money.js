/**
 * @param {number} money
 * @param {NS} ns
 * @param {number} minLength
 *
*/
function formatMoney(money, ns, minLength) {
  const str = ns.formatNumber(money, 1)
  const diff = str.length < minLength ? minLength - str.length : 0
  return `[ $${diff > 0 ? str + ' '.repeat(diff) : str} ]`
}

/** @param {NS} ns */
export async function main(ns) {
  const servers = ns.scan()
  let message = `\n\n`
  let minLength = Math.max(...servers.map(s => (ns.formatNumber(ns.getServerMoneyAvailable(s), 1)).length))

  for (let i = 0; i < servers.length; i++) {
    message += `${formatMoney(ns.getServerMoneyAvailable(servers[i]), ns, minLength)} ${servers[i]}\n`
  }

  ns.tprint(message + '\n')
}
