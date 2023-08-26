/** @param {NS} ns */
export async function main(ns) {
  const FLAGS = ns.flags([
    ['help', false]
  ])
  const CONFIG = {
    SCRIPT_NAME: ns.getScriptName()
  }

  if (FLAGS._.length === 0 || FLAGS.help) return help(ns, CONFIG)

  shutdown(ns, CONFIG, FLAGS)
}

/** @param {NS} ns */
function help(ns, CONFIG) {
  ns.tprint("This script helps to shutdown all `weaken.js` in remote hosts.");
  ns.tprint(`Usage: run ${CONFIG.SCRIPT_NAME} HOST HOST_1 HOST_2 HOST_N`);
  ns.tprint("Example:");
  ns.tprint(`> run ${CONFIG.SCRIPT_NAME} foodnstuff sigma-cosmetics`);
  return;
}

/** @param {NS} ns */
function shutdown(ns, CONFIG, FLAGS) {
  const hosts = ns.args

  for (let i = 0; i < hosts.length; i++) {
    const host = hosts[i]

    ns.scriptKill('weaken.js', host)
  }

  ns.tprint(`Successfully killed all weaken.js`)
}

export function autocomplete(data) {
  return data.servers
}