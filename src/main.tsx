import { invitationConfigs } from './invite-config';

// All routes load the same invitation implementation.
const basePath = import.meta.env.BASE_URL.replace(/\/$/, '');
const invitePath = (location.pathname.startsWith(basePath)
  ? location.pathname.slice(basePath.length)
  : location.pathname).replace(/\/+$/, '') || '/';
const canonicalInvitePath = Object.keys(invitationConfigs).find(
  (path) => path.toLowerCase() === invitePath.toLowerCase(),
);

if (canonicalInvitePath) {
  if (invitePath !== canonicalInvitePath) {
    history.replaceState(null, '', `${basePath}${canonicalInvitePath}${location.search}${location.hash}`);
  }
} else if (invitePath === '/') {
  history.replaceState(null, '', `${basePath}/v1${location.search}${location.hash}`);
}

if (canonicalInvitePath || invitePath === '/') {
  void import('./v1');
} else {
  document.title = 'Invitation not found';
  document.getElementById('root')!.innerHTML = '<main><h1>Invitation not found</h1><p>Please check the invitation link you received.</p></main>';
}
