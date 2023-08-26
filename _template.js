/** @param {NS} ns */
export async function main(ns) {
  const FLAGS = ns.flags([['help', false]])
  const CONFIG = {
    SCRIPT_NAME: ns.getScriptName()
  }

  if (FLAGS.help) return help(ns, CONFIG)

  /* code goes here... */
}

/** @param {NS} ns */
function help(ns, CONFIG) {
  ns.tprint("This script helps lorem ipsum dolor sit amet.");
  ns.tprint(`Usage: run ${CONFIG.SCRIPT_NAME}`);
  ns.tprint("Example:");
  ns.tprint(`> run ${CONFIG.SCRIPT_NAME}`);
  return;
}
