/** @param {NS} ns */
export async function main(ns) {
  const FLAGS = ns.flags([['help', false]])
  const CONFIG = {
    SCRIPT_NAME: ns.getScriptName()
  }

  if (FLAGS.help) return help(ns, CONFIG)

  await weaken(ns)
}

/** @param {NS} ns */
function help(ns, CONFIG) {
  ns.tprint("This script helps to weaken a server.");
  ns.tprint(`Usage: run ${CONFIG.SCRIPT_NAME} TARGET_HOST`);
  ns.tprint("Example:");
  ns.tprint(`> run ${CONFIG.SCRIPT_NAME} n00dles`);
  return;
}

/** @param {NS} ns */
async function weaken(ns) {
  const host = ns.args[0] || ns.getHostname()

  if (host === 'home') {
    ns.tprint('Cannot weaken home.')
    return
  }

  ns.tail()
  ns.setTitle(`weakening ${host} from ${ns.getHostname()}`)

  let current = ns.getServerSecurityLevel(host)
  let threshold = ns.getServerMinSecurityLevel(host)
  let time = ns.getWeakenTime(host)

  while (current > threshold) {
    ns.print(`INFO [${new Date()}] weaken ${host}...`)
    ns.print(`INFO Finished at: approx. ${new Date(new Date().getTime()+time)}`)
    await ns.weaken(host)
    current = ns.getServerSecurityLevel(host)
    threshold = ns.getServerMinSecurityLevel(host)
    ns.print(`INFO weakened ${host}.`)
    ns.print(`INFO current: ${current}/${threshold}.`)
  }

  ns.tprint(`SUCCESS fully-weakened: ${host}.`)
}

export function autocomplete(data) {
  return data.servers
}
