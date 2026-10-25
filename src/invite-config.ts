export type InvitationLocation = {
  locationLabel?: string;
  venue: string;
  address: readonly string[];
  mapUrl: string;
};

type InvitationConfig = {
  includeMehendi: boolean;
  includeHaldi: boolean;
  includeSangeet: boolean;
  familyCopy: Readonly<Record<string, string>>;
  announcementCopy?: Readonly<Record<string, string>>;
  haldiLocation?: InvitationLocation;
};

const standardInvitation: InvitationConfig = {
  includeMehendi: true,
  includeHaldi: true,
  includeSangeet: true,
  familyCopy: {},
};

const anushkaFirstAnnouncement: Readonly<Record<string, string>> = {
  Suresh: 'Anushka',
  Anushka: 'Suresh',
};

const anushkaInvitation: InvitationConfig = {
  ...standardInvitation,
  announcementCopy: anushkaFirstAnnouncement,
};

const groomInvitation: InvitationConfig = {
  ...standardInvitation,
  includeMehendi: false,
  includeHaldi: true,
  familyCopy: {
    'Mrs. Shweta & Mr. Abhay Subhedar': 'Mrs. Sailee & Mr. Chandrakant Bhandari',
    'cordially invite you\nto celebrate the wedding of their daughter': 'cordially invite you\nto celebrate the wedding of their son',
    'Anushka': 'Suresh',
    'Suresh': 'Anushka',
    'son of': 'daughter of',
    'Mrs. Sailee & Mr. Chandrakant Bhandari': 'Mrs. Shweta & Mr. Abhay Subhedar',
  },
  haldiLocation: {
    venue: '',
    address: [
      'G-704, A.M Residency',
      '35 Nesbit Road, Opp Mazagaon court',
      'Mumbai - 400010',
    ],
    mapUrl: 'https://www.google.com/maps/place/ALFA+MANA+REALTORS+PVT.+LTD/data=!4m2!3m1!1s0x0:0x1a91b7f231225b96',
  },
};

// Content differences only: all routes use the same page layouts and animations.
export const invitationConfigs: Readonly<Record<string, InvitationConfig>> = {
  '/v1': { ...groomInvitation, includeHaldi: false, includeSangeet: false },
  '/VAMHS': anushkaInvitation,
  '/VAMH': { ...anushkaInvitation, includeSangeet: false },
  '/VAHS': { ...anushkaInvitation, includeMehendi: false },
  '/VAS': { ...anushkaInvitation, includeMehendi: false, includeHaldi: false },
  '/VA': { ...anushkaInvitation, includeMehendi: false, includeHaldi: false, includeSangeet: false },
  '/VSHS': groomInvitation,
  '/VSH': { ...groomInvitation, includeSangeet: false },
};
