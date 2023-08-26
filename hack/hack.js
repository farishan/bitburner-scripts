/** @param {NS} ns */
export async function main(ns) {
  const FLAGS = ns.flags([['help', false]])
  const CONFIG = {
    SCRIPT_NAME: ns.getScriptName()
  }

  if (FLAGS.help) return help(ns, CONFIG)

  await hack(ns)
}

/** @param {NS} ns */
function help(ns, CONFIG) {
  ns.tprint("This script helps to hack a server.");
  ns.tprint(`Usage: run ${CONFIG.SCRIPT_NAME} TARGET_HOST`);
  ns.tprint("Example:");
  ns.tprint(`> run ${CONFIG.SCRIPT_NAME} n00dles`);
  return;
}

/** @param {NS} ns */
async function hack(ns) {
  const host = ns.args[0] || ns.getHostname()

  if (host === 'home') {
    ns.tprint('Cannot hack home.')
    return
  }

  ns.tail()
  ns.setTitle(`hacking ${host} from ${ns.getHostname()}`)

  let current = ns.getServerMoneyAvailable(host)
  let threshold = 0
  let time = ns.getHackTime(host)

  while (current > threshold) {
    ns.print(`INFO [${new Date()}] hack ${host}...`)
    ns.print(`INFO Finished at: approx. ${new Date(new Date().getTime()+time)}`)
    await ns.hack(host)
    current = ns.getServerMoneyAvailable(host)
    threshold = 0
    ns.print(`INFO hacked ${host}.`)
    ns.print(`INFO current: ${current}/${threshold}.`)
  }

  ns.tprint(`SUCCESS fully-hacked: ${host}.`)
}

export function autocomplete(data) {
  return data.servers
}
