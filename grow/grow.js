/** @param {NS} ns */
export async function main(ns) {
  const FLAGS = ns.flags([['help', false]])
  const CONFIG = {
    SCRIPT_NAME: ns.getScriptName()
  }

  if (FLAGS.help) return help(ns, CONFIG)

  await grow(ns)
}

/** @param {NS} ns */
function help(ns, CONFIG) {
  ns.tprint("This script helps to grow a server.");
  ns.tprint(`Usage: run ${CONFIG.SCRIPT_NAME} TARGET_HOST`);
  ns.tprint("Example:");
  ns.tprint(`> run ${CONFIG.SCRIPT_NAME} n00dles`);
  return;
}

/** @param {NS} ns */
async function grow(ns) {
  const host = ns.args[0] || ns.getHostname()

  if (host === 'home') {
    ns.tprint('Cannot grow home.')
    return
  }

  ns.tail()
  ns.setTitle(`growing ${host} from ${ns.getHostname()}`)

  let current = ns.getServerMoneyAvailable(host)
  let threshold = ns.getServerMaxMoney(host)
  let time = ns.getGrowTime(host)

  while (current < threshold) {
    ns.print(`INFO [${new Date()}] grow ${host}...`)
    ns.print(`INFO Finished at: approx. ${new Date(new Date().getTime()+time)}`)
    await ns.grow(host)
    current = ns.getServerMoneyAvailable(host)
    threshold = ns.getServerMaxMoney(host)
    ns.print(`INFO grown ${host}.`)
    ns.print(`INFO current: ${current}/${threshold}.`)
  }

  ns.tprint(`SUCCESS fully-grown: ${host}.`)
}

export function autocomplete(data) {
  return data.servers
}
