/** @param {NS} ns */
export async function main(ns) {
  const FLAGS = ns.flags([['help', false]])
  const CONFIG = {
    SCRIPT_NAME: ns.getScriptName()
  }

  if (FLAGS._.length === 0 || FLAGS.help)
    return help(ns, CONFIG)

  nuke(ns, CONFIG)
}

function help(ns, CONFIG) {
  ns.tprint("This script helps to nuke all nearest-hackable servers.");
  ns.tprint(`Usage: run ${CONFIG.SCRIPT_NAME} HOST_1 HOST_2 HOST_N`);
  ns.tprint("Example:");
  ns.tprint(`> run ${CONFIG.SCRIPT_NAME} n00dles foodnstuff`);
  return;
}

/** @param {NS} ns */
function nuke(ns) {
  const hostnames = ns.args

  if (hostnames.length < 1) return

  for (let i = 0; i < hostnames.length; i++) {
      const hostname = hostnames[i]
      ns.tprint(`#${i} [ ${hostname} ] nuking...`)
      ns.nuke(hostname)
      ns.tprint(`#${i} [ ${hostname} ] NUKED!`)
  }
}
