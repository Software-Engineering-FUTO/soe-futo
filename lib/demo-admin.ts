// Demo-only route guard stub: every visitor is treated as an admin in
// this prototype. There is no real authentication or authorization.
export function isDemoAdmin(): boolean {
  return true;
}
