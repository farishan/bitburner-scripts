/** @param {NS} ns */
export async function main(ns) {
  const FLAGS = ns.flags([['help', false]])
  const CONFIG = {
    SCRIPT_NAME: ns.getScriptName()
  }

  if (FLAGS._.length === 0 || FLAGS.help) return help(ns, CONFIG)

  analyzeWeaken(ns)
}

/** @param {NS} ns */
function help(ns, CONFIG) {
  ns.tprint("This script helps to analyze weaken action on a host.");
  ns.tprint(`Usage: run ${CONFIG.SCRIPT_NAME} HOST RAM`);
  ns.tprint("Example:");
  ns.tprint(`> run ${CONFIG.SCRIPT_NAME} n00dles 8`);
  return;
}

/** @param {NS} ns */
function analyzeWeaken(ns) {
  const host = ns.args[0]
  const ram = ns.args[1]
  if (!host || !ram) return

  const sec = ns.getServerSecurityLevel(host)
  const minSec = ns.getServerMinSecurityLevel(host)
  const threads = Math.floor(ram/ns.getScriptRam(ns.getScriptName())) 

  ns.tprint(`host: ${host}`)
  ns.tprint(`security: ${sec}/${minSec}`)

  if (sec <= minSec) {
    ns.tprint(`GOOD TO GO. No need to weaken.`)
    return
  }

  ns.tprint(`weaken time: ${ns.tFormat(ns.getWeakenTime(host))}`)
  ns.tprint(`threads: ${threads}`)
  /* @todo add cores parameter */
  ns.tprint(`security decrease: ${ns.weakenAnalyze(threads)}`)
}
