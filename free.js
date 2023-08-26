/** @param {NS} ns */
export async function main(ns) {
  const FLAGS = ns.flags([['help', false]])
  const CONFIG = {
    SCRIPT_NAME: ns.getScriptName()
  }

  if (FLAGS.help) return help(ns, CONFIG)

  getTotalRam(ns, CONFIG)
}

/** @param {NS} ns */
function help(ns, CONFIG) {
  ns.tprint("This script helps to get your total ram.");
  ns.tprint(`Usage: run ${CONFIG.SCRIPT_NAME}`);
  ns.tprint("Example:");
  ns.tprint(`> run ${CONFIG.SCRIPT_NAME}`);
  return;
}

/** @param {NS} ns */
function getTotalRam(ns, CONFIG) {
  const servers = ns.scan().concat(['home'])
  const accessibles = []

  let total = 0
  let totalUsed = 0
  let totalFree = 0

  for (const server of servers) {
    if (!ns.hasRootAccess(server)) continue;

    if (server !== 'home') accessibles.push(server)

    let used = ns.getServerUsedRam(server);

    if (server === 'home') used -= ns.getScriptRam(ns.getScriptName())

    const max = ns.getServerMaxRam(server);
    const free = max - used;
    total += max;
    totalUsed += used;
    totalFree += free;

    ns.tprint(`${server}: ${used}/${max}GB (${(100 * used / max).toFixed(2)}%)`)
  }

  ns.tprint(`total: ${totalUsed}/${total}GB`)
  ns.tprint(`total free: ${totalFree}GB`)
  ns.tprint(`for --from flag: ${accessibles.join(',')}`)
}
