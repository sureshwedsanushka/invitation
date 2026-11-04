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
} else {
  history.replaceState(null, '', `${basePath}/v1${location.search}${location.hash}`);
}

void import('./v1');
