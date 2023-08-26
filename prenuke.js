/** @param {NS} ns */
export async function main(ns) {
  const ARGS = ns.flags([['help', false]])
  const CONFIG = {
    SCRIPT_NAME: ns.getScriptName()
  }

  if (ARGS.help) return help(ns, CONFIG)

  prenuke(ns, CONFIG)
}

function help(ns, CONFIG) {
  ns.tprint("This script lists all nuke-able nearest servers.");
  ns.tprint(`Usage: run ${CONFIG.SCRIPT_NAME}`);
  ns.tprint("Example:");
  ns.tprint(`> run ${CONFIG.SCRIPT_NAME}`);
  return;
}

function prenuke(ns) {
  const servers = ns.scan();
  const player = ns.getPlayer();

  let results = []

  for (let i = 0; i < servers.length; i++) {
    const server = ns.getServer(servers[i])
    const is_hackable =
      player.skills.hacking >= server.requiredHackingSkill
      && server.hasAdminRights === false
      && server.numOpenPortsRequired < 1
    if (is_hackable) results.push(server)
  }

  const result = results.map(s => s.hostname).join(' ')

  ns.tprint(`

    ${result}

    run nuke.js ${result}

  `)
}
