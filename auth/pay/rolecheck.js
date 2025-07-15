// All users are always treated as 'pro' with unlimited quota. All checks succeed. No login or payment required.
function login() { /* No-op: login not required */ }
function upgradeToPro() { /* No-op: upgrade not required */ }
async function getrole() {
  return { plan: 'Pro', quota: 9999999999, used: 0 };
}
async function rolecheck() {
  return { plan: 'Pro', quota: 9999999999, used: 0 };
}
function customerportal() { /* No-op: not required */ }
async function updateuse() { /* No-op: not required */ }