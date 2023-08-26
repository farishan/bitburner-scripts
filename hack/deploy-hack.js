/* edit code below */

const MAIN_SCRIPT = 'hack.js'

/** @param {NS} ns */
function customLog(ns) {
  const host = ns.args[0]
  ns.print(`INFO ${new Date().getTime()} ${host} money: ${ns.getServerMoneyAvailable(host)}. sec: +${ns.getServerSecurityLevel(host) - ns.getServerMinSecurityLevel(host)}`)
}

/* stop editing */

/** @param {NS} ns */
export async function main(ns) {
  const FLAGS = ns.flags([
    ['help', false],
    ['from', ''] // 'host1,host2,hostN'
  ])
  const CONFIG = {
    SCRIPT_NAME: ns.getScriptName()
  }

  if (FLAGS._.length === 0 || FLAGS.help) return help(ns, CONFIG)

  deploy(ns, CONFIG, FLAGS)

  /* Monitoring */
  ns.tail()
  ns.moveTail(0, 0)
  ns.resizeTail(500, 500 / 16 * 9)
  ns.disableLog('ALL')

  while (true) {
    ns.clearLog()
    customLog(ns)
    await ns.asleep(200)
  }
}

/** @param {NS} ns */
function help(ns, CONFIG) {
  ns.tprint(`This script helps to deploy 'analyze-script.js' and '${MAIN_SCRIPT}' to a remote host.`);
  ns.tprint(`Usage: run ${CONFIG.SCRIPT_NAME} HOST`);
  ns.tprint("Example:");
  ns.tprint(`> run ${CONFIG.SCRIPT_NAME} foodnstuff`);
  return;
}

/** @param {NS} ns */
function deploy(ns, CONFIG, FLAGS) {
  const host = ns.args[0]
  const _from = FLAGS.from
  const deployTargets = [host, ..._from.split(',')]

  let deployCount = 0

  for (let i = 0; i < deployTargets.length; i++) {
    const deployTarget = deployTargets[i]

    if (!ns.serverExists(deployTarget)) continue;

    let isDeployed = ns.scp(['analyze-script.js', MAIN_SCRIPT], deployTarget)
    if (!isDeployed) {
      ns.tprint(`Failed deploying to ${deployTarget}.`)
      continue;
    }

    deployCount++

    const threads = getThreads(ns, deployTarget, CONFIG)

    if (threads === 0) continue;

    ns.tprint(`INFO Running ${MAIN_SCRIPT} in ${host} from ${deployTarget}...`)
    ns.exec(MAIN_SCRIPT, deployTarget, threads, host)
  }

  ns.tprint(`Finished. Deploy count: ${deployCount}`)
}

/** @param {NS} ns */
function getThreads(ns, host, CONFIG) {
  const availableRam = ns.getServerMaxRam(host)
  const scriptRam = ns.getScriptRam(MAIN_SCRIPT)

  if (scriptRam === 0) return 0

  const usedRam = ns.getServerUsedRam(host)
  const freeRam = availableRam - usedRam
  const threads = Math.floor(freeRam / scriptRam)

  ns.tprint(`analyzed ${MAIN_SCRIPT} on ${host}`)
  ns.tprint(`free ram: ${freeRam}GB`)
  ns.tprint(`script ram: ${scriptRam}GB`)
  ns.tprint(`possible threads: ${threads}`)

  return threads
}

export function autocomplete(data) {
  return data.servers
}