// Which thread does a run continue?  ONE rule, no heuristics:
// every thread has exactly one home — a project id, or null for general office
// work — and only ever serves runs with that same home.  A run for project A
// never lands in project B's thread, and never in a general one (or the reverse),
// so a background run can't leak its messages into another project's history.
//
// A home whose project was deleted/unregistered decays to null (general) instead
// of stranding the thread forever.

function threadHome(entry, isLive) {
  const p = entry && entry.proj;
  return p && isLive(p) ? p : null;
}

// Newest thread of `agentSessions` that lives in `want` (null = general).
function pickSession(agentSessions, want, isLive) {
  const home = want && isLive(want) ? want : null;
  return (agentSessions || [])
    .filter((e) => threadHome(e, isLive) === home)
    .sort((a, b) => (b.ts || 0) - (a.ts || 0))[0] || null;
}

module.exports = { pickSession, threadHome };
