/** @param {NS} ns */
export async function main(ns) {
  const FLAGS = ns.flags([['help', false]])
  const CONFIG = {
    SCRIPT_NAME: ns.getScriptName()
  }

  if (FLAGS.help) return help(ns, CONFIG)

  analyzeScript(ns)
}

/** @param {NS} ns */
function help(ns, CONFIG) {
  ns.tprint("This script helps to analyze a script.");
  ns.tprint(`Usage: run ${CONFIG.SCRIPT_NAME}`);
  ns.tprint("Example:");
  ns.tprint(`> run ${CONFIG.SCRIPT_NAME}`);
  return;
}

/** @param {NS} ns */
function analyzeScript(ns) {
  const scriptName = ns.args[0]
  if (!scriptName) return

  const host = ns.getHostname()
  const availableRam = ns.getServerMaxRam(host)
  const scriptRam = ns.getScriptRam(scriptName)
  const usedRam = ns.getServerUsedRam(host) - scriptRam
  const freeRam = availableRam-usedRam

  ns.tprint(`analyzed ${scriptName} on ${host}`)
  ns.tprint(`free ram: ${freeRam}GB`)
  ns.tprint(`script ram: ${scriptRam}GB`)
  ns.tprint(`possible threads: ${Math.floor(freeRam/scriptRam)}`)
}
