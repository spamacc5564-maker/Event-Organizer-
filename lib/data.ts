export type Category =
  | 'sports'
  | 'music'
  | 'art'
  | 'gaming'
  | 'volunteering'
  | 'outdoors'
  | 'tech'
  | 'food'

export type TransitMode = 'walk' | 'bus' | 'bike' | 'car'

export type Organizer = {
  id: string
  name: string
  initials: string
  verified: boolean
  bio: string
  eventsHosted: number
  rating: number
  since: string
}

export type SidequestEvent = {
  id: string
  title: string
  category: Category
  image: string
  day: 'Sat' | 'Sun'
  date: string
  isoDate: string
  start: string
  end: string
  price: number
  distanceKm: number
  transit: { mode: TransitMode; minutes: number }
  venue: string
  address: string
  neighborhood: string
  lat: number
  lng: number
  ages: string
  indoor: boolean
  friendly: boolean
  tags: string[]
  summary: string
  description: string[]
  whyPicked: string[]
  going: number
  spotsLeft?: number
  organizer: Organizer
}

const organizers = {
  rampside: {
    id: 'rampside',
    name: 'Rampside Skate Collective',
    initials: 'RS',
    verified: true,
    bio: 'Volunteer-run crew keeping the Underpass Park bowl alive since 2017. All levels, helmets provided.',
    eventsHosted: 48,
    rating: 4.9,
    since: '2021',
  },
  bloomCafe: {
    id: 'bloom',
    name: 'Bloom Café & Stage',
    initials: 'BC',
    verified: true,
    bio: 'All-ages café with a tiny stage and a big heart. Open mic every Saturday, no cover.',
    eventsHosted: 112,
    rating: 4.8,
    since: '2020',
  },
  cityMuseum: {
    id: 'harbour-art',
    name: 'Harbour Contemporary Art Gallery',
    initials: 'HC',
    verified: true,
    bio: 'Free admission for visitors 25 and under every weekend, plus teen-led tours.',
    eventsHosted: 76,
    rating: 4.7,
    since: '2022',
  },
  greenTeam: {
    id: 'green-team',
    name: 'Don Valley Green Team',
    initials: 'DV',
    verified: true,
    bio: 'Youth-led environmental group. Every cleanup counts toward volunteer hours.',
    eventsHosted: 34,
    rating: 5.0,
    since: '2022',
  },
  courtside: {
    id: 'courtside',
    name: 'Courtside Community League',
    initials: 'CL',
    verified: true,
    bio: 'Free drop-in hoops with refs, music, and water. Run by local coaches.',
    eventsHosted: 91,
    rating: 4.8,
    since: '2019',
  },
  codeClub: {
    id: 'code-club',
    name: 'Library Code Club',
    initials: 'LC',
    verified: true,
    bio: 'Free beginner-friendly workshops at the public library, run by student mentors.',
    eventsHosted: 57,
    rating: 4.9,
    since: '2021',
  },
  nightMarket: {
    id: 'night-market',
    name: 'Eastside Night Market',
    initials: 'EN',
    verified: false,
    bio: 'Twenty-plus food stalls, live DJs and local makers every weekend through October.',
    eventsHosted: 22,
    rating: 4.6,
    since: '2024',
  },
} satisfies Record<string, Organizer>

export const events: SidequestEvent[] = [
  {
    id: 'underpass-skate-jam',
    title: 'Underpass Skate Jam',
    category: 'sports',
    image: '/images/skate.png',
    day: 'Sat',
    date: 'Sat, Nov 28',
    isoDate: '2026-11-28',
    start: '11:00 AM',
    end: '2:00 PM',
    price: 0,
    distanceKm: 1.8,
    transit: { mode: 'bike', minutes: 9 },
    venue: 'Underpass Park',
    address: '29 Lower River St',
    neighborhood: 'Corktown',
    lat: 43.6549,
    lng: -79.3563,
    ages: 'All ages · under 16 with a guardian waiver',
    indoor: false,
    friendly: true,
    tags: ['Free', 'Outdoors', 'Beginner friendly'],
    summary: 'Mini contests, free loaner boards and a best-trick jam with prizes from local shops.',
    description: [
      'Roll through for three hours of open sessions, a beginner clinic at 11:30, and a best-trick jam at 1 PM with prizes from Rampside and local board shops.',
      'Loaner boards and helmets are free on a first-come basis. There is a quiet corner for first-timers and a DJ under the bridge for everyone else.',
    ],
    whyPicked: [
      'You picked Sports and Outdoors as top interests',
      'Free — keeps your weekend well under your $40 budget',
      '9 min by bike from your neighborhood',
      'Clear skies forecast Saturday morning',
    ],
    going: 142,
    organizer: organizers.rampside,
  },
  {
    id: 'bloom-open-mic',
    title: 'Open Mic Night at Bloom',
    category: 'music',
    image: '/images/openmic.png',
    day: 'Sat',
    date: 'Sat, Nov 28',
    isoDate: '2026-11-28',
    start: '7:00 PM',
    end: '9:30 PM',
    price: 5,
    distanceKm: 2.6,
    transit: { mode: 'bus', minutes: 14 },
    venue: 'Bloom Café & Stage',
    address: '214 Augusta Ave',
    neighborhood: 'Kensington Market',
    lat: 43.6545,
    lng: -79.4011,
    ages: 'All ages · alcohol-free venue',
    indoor: true,
    friendly: true,
    tags: ['Indoor', 'Under $20', 'With friends'],
    summary: 'Ten-minute slots for poetry, comedy and acoustic sets. Sign-up opens at 6:30.',
    description: [
      'Bring a song, a poem, or just your friends. Performers get ten-minute slots and a free drink; listeners get the best $5 night in the city.',
      'Sign-up sheet opens at 6:30 PM. The venue is alcohol-free and staff are trained in our safer spaces policy.',
    ],
    whyPicked: [
      'Matches your Music interest',
      'You said you want something chill with friends in the evening',
      '14 min on the 510 streetcar',
    ],
    going: 87,
    spotsLeft: 12,
    organizer: organizers.bloomCafe,
  },
  {
    id: 'free-museum-day',
    title: 'Free Gallery Day + Teen Tour',
    category: 'art',
    image: '/images/museum.png',
    day: 'Sun',
    date: 'Sun, Nov 29',
    isoDate: '2026-11-29',
    start: '12:00 PM',
    end: '2:00 PM',
    price: 0,
    distanceKm: 3.1,
    transit: { mode: 'bus', minutes: 18 },
    venue: 'Harbour Contemporary Art Gallery',
    address: '231 Queens Quay W',
    neighborhood: 'Harbourfront',
    lat: 43.6387,
    lng: -79.3816,
    ages: 'Free for 25 and under',
    indoor: true,
    friendly: true,
    tags: ['Free', 'Indoor', 'Art'],
    summary: 'Free entry for under-25s, plus a 45-minute tour led by teen gallery guides.',
    description: [
      'Explore the new "Signal & Noise" exhibition with free admission for anyone 25 and under. Teen guides lead a 45-minute tour at 12:30 PM.',
      'After the tour, drop into the hands-on zine-making table in the lobby. Materials included.',
    ],
    whyPicked: [
      'You picked Art as an interest',
      'Indoor backup in case Sunday stays cloudy',
      'Free with your student ID',
    ],
    going: 203,
    organizer: organizers.cityMuseum,
  },
  {
    id: 'don-valley-cleanup',
    title: 'Don Valley Park Cleanup',
    category: 'volunteering',
    image: '/images/cleanup.png',
    day: 'Sun',
    date: 'Sun, Nov 29',
    isoDate: '2026-11-29',
    start: '9:30 AM',
    end: '11:30 AM',
    price: 0,
    distanceKm: 2.2,
    transit: { mode: 'bike', minutes: 11 },
    venue: 'Riverdale Park East',
    address: '550 Broadview Ave',
    neighborhood: 'Riverdale',
    lat: 43.6702,
    lng: -79.3528,
    ages: 'Ages 13+ · counts for volunteer hours',
    indoor: false,
    friendly: true,
    tags: ['Free', 'Outdoors', 'Volunteer hours'],
    summary: 'Two hours, gloves and snacks provided — and a signed form for your volunteer hours.',
    description: [
      'Help clear the trails along the Don before winter. We provide gloves, grabbers, bags and a hot-chocolate stop at the end.',
      'Every participant gets a signed form for two community service hours.',
    ],
    whyPicked: [
      'You mentioned needing volunteer hours',
      'Short ride from home, finishes before lunch',
      'Hosted by a verified youth-led group',
    ],
    going: 64,
    spotsLeft: 20,
    organizer: organizers.greenTeam,
  },
  {
    id: 'pickup-basketball',
    title: 'Saturday Pickup Basketball',
    category: 'sports',
    image: '/images/basketball.png',
    day: 'Sat',
    date: 'Sat, Nov 28',
    isoDate: '2026-11-28',
    start: '3:00 PM',
    end: '5:00 PM',
    price: 0,
    distanceKm: 1.2,
    transit: { mode: 'walk', minutes: 15 },
    venue: 'Regent Park Courts',
    address: '620 Dundas St E',
    neighborhood: 'Regent Park',
    lat: 43.6598,
    lng: -79.3622,
    ages: 'Ages 14–24',
    indoor: false,
    friendly: true,
    tags: ['Free', 'With friends', 'Outdoors'],
    summary: 'Run-it-back 3v3 and 5v5 with refs, music and free water. Just show up.',
    description: [
      'Drop-in games every Saturday. Teams are mixed on arrival so solo players always get a run.',
      'Coaches from the league referee and keep the vibe friendly. Water and first aid on site.',
    ],
    whyPicked: ['You picked Sports', '15 min walk — no transit needed', 'Fits between your other plans'],
    going: 58,
    organizer: organizers.courtside,
  },
  {
    id: 'intro-to-game-dev',
    title: 'Intro to Game Dev Workshop',
    category: 'tech',
    image: '/images/coding.png',
    day: 'Sun',
    date: 'Sun, Nov 29',
    isoDate: '2026-11-29',
    start: '2:30 PM',
    end: '4:30 PM',
    price: 0,
    distanceKm: 2.9,
    transit: { mode: 'bus', minutes: 16 },
    venue: 'Lillian H. Smith Library',
    address: '239 College St',
    neighborhood: 'Downtown',
    lat: 43.6577,
    lng: -79.3999,
    ages: 'Ages 13–19',
    indoor: true,
    friendly: false,
    tags: ['Free', 'Indoor', 'Beginner friendly'],
    summary: 'Build a tiny platformer in two hours. Laptops provided, zero experience needed.',
    description: [
      'Student mentors walk you through building a playable mini platformer. You leave with a link to share with friends.',
      'Laptops provided. Bring a USB stick if you want to take the project files home.',
    ],
    whyPicked: ['Matches your Tech and Gaming interests', 'Indoor and free', 'Near the gallery — easy to combine'],
    going: 31,
    spotsLeft: 6,
    organizer: organizers.codeClub,
  },
  {
    id: 'eastside-night-market',
    title: 'Eastside Night Market',
    category: 'food',
    image: '/images/foodmarket.png',
    day: 'Sat',
    date: 'Sat, Nov 28',
    isoDate: '2026-11-28',
    start: '5:30 PM',
    end: '7:00 PM',
    price: 15,
    distanceKm: 3.4,
    transit: { mode: 'bus', minutes: 19 },
    venue: 'The Distillery Lot',
    address: '55 Mill St',
    neighborhood: 'Distillery District',
    lat: 43.6503,
    lng: -79.3596,
    ages: 'All ages',
    indoor: false,
    friendly: true,
    tags: ['Under $20', 'With friends', 'Food'],
    summary: 'Twenty-plus food stalls, a live DJ and makers. Budget around $15 for food.',
    description: [
      'Graze through dumplings, birria tacos, bubble waffles and more. Entry is free — we estimated $15 for food.',
      'Live DJ from 6 PM and a heated tent if the evening gets chilly.',
    ],
    whyPicked: ['You picked Food', 'Dinner stop before your open mic', 'Most stalls under $8'],
    going: 310,
    organizer: organizers.nightMarket,
  },
]

export function getEvent(id: string) {
  return events.find((e) => e.id === id)
}

export const weekendPlan = {
  title: 'Skate, snacks & stage lights',
  vibe: 'Active Saturday, chill creative Sunday, under $40, with friends',
  saturday: ['underpass-skate-jam', 'pickup-basketball', 'eastside-night-market', 'bloom-open-mic'],
  sunday: ['don-valley-cleanup', 'free-museum-day', 'intro-to-game-dev'],
  backups: ['intro-to-game-dev', 'free-museum-day'],
}

export const weather = [
  { day: 'Sat', date: 'Nov 28', high: 9, low: 2, condition: 'Sunny', precip: 5 },
  { day: 'Sun', date: 'Nov 29', high: 6, low: 1, condition: 'Cloudy', precip: 30 },
] as const

export const interests: { id: Category; label: string }[] = [
  { id: 'sports', label: 'Sports' },
  { id: 'music', label: 'Music' },
  { id: 'art', label: 'Art' },
  { id: 'gaming', label: 'Gaming' },
  { id: 'volunteering', label: 'Volunteering' },
  { id: 'outdoors', label: 'Outdoors' },
  { id: 'tech', label: 'Tech' },
  { id: 'food', label: 'Food' },
]

export const transitLabels: Record<TransitMode, string> = {
  walk: 'walk',
  bus: 'by transit',
  bike: 'by bike',
  car: 'by car',
}

export const testimonials = [
  {
    quote:
      'I used to spend Friday night scrolling for plans. Now I type one sentence and my whole weekend is sorted — and it actually fits my budget.',
    name: 'Amara O.',
    detail: '17 · Scarborough',
  },
  {
    quote:
      'My parents love the verified organizer badge. I love that it found a skate jam I never would have heard about.',
    name: 'Jonah L.',
    detail: '15 · Leslieville',
  },
  {
    quote:
      'We posted our cleanup on Sidequest and had 40 sign-ups in two days. The AI wrote a better description than we did.',
    name: 'Priya S.',
    detail: 'Organizer · Don Valley Green Team',
  },
]

export const savedPlans = [
  {
    id: 'this-weekend',
    title: 'Skate, snacks & stage lights',
    dates: 'Nov 28 – 29',
    cost: 20,
    events: 7,
    images: ['/images/skate.png', '/images/openmic.png', '/images/museum.png'],
    status: 'Upcoming',
  },
  {
    id: 'rainy-day',
    title: 'Rainy day creative reset',
    dates: 'Nov 21 – 22',
    cost: 12,
    events: 4,
    images: ['/images/museum.png', '/images/coding.png', '/images/openmic.png'],
    status: 'Completed',
  },
  {
    id: 'volunteer-sprint',
    title: 'Volunteer hours sprint',
    dates: 'Nov 14 – 15',
    cost: 0,
    events: 3,
    images: ['/images/cleanup.png', '/images/basketball.png', '/images/coding.png'],
    status: 'Completed',
  },
]

export const friends = [
  { name: 'Maya', initials: 'MR', color: 'bg-cta text-cta-foreground' },
  { name: 'Theo', initials: 'TK', color: 'bg-highlight text-highlight-foreground' },
  { name: 'Ines', initials: 'IA', color: 'bg-primary text-primary-foreground' },
  { name: 'Dev', initials: 'DP', color: 'bg-chart-4 text-white' },
]

export const organizerStats = [
  { label: 'Event views', value: '12,480', change: '+18%', trend: 'up' as const },
  { label: 'Saves', value: '1,936', change: '+24%', trend: 'up' as const },
  { label: 'RSVPs', value: '642', change: '+9%', trend: 'up' as const },
  { label: 'Avg. attendee age', value: '17.4', change: '−0.6', trend: 'down' as const },
]

export const organizerEvents = [
  { id: 'don-valley-cleanup', title: 'Don Valley Park Cleanup', date: 'Nov 29', status: 'Live', views: 3210, saves: 412, rsvps: 64 },
  { id: 'trail-mapping', title: 'Winter Trail Mapping Walk', date: 'Dec 6', status: 'Live', views: 1840, saves: 233, rsvps: 41 },
  { id: 'tree-planting', title: 'Spring Tree Planting Kickoff', date: 'Mar 14', status: 'Draft', views: 0, saves: 0, rsvps: 0 },
  { id: 'river-clean', title: 'Riverbank Cleanup', date: 'Nov 15', status: 'Ended', views: 4620, saves: 587, rsvps: 118 },
]

export const analytics = [
  { week: 'Oct 5', views: 820, saves: 120, rsvps: 34 },
  { week: 'Oct 12', views: 1040, saves: 160, rsvps: 51 },
  { week: 'Oct 19', views: 1380, saves: 210, rsvps: 62 },
  { week: 'Oct 26', views: 1210, saves: 190, rsvps: 58 },
  { week: 'Nov 2', views: 1690, saves: 260, rsvps: 81 },
  { week: 'Nov 9', views: 2150, saves: 330, rsvps: 102 },
  { week: 'Nov 16', views: 1980, saves: 310, rsvps: 96 },
  { week: 'Nov 23', views: 2510, saves: 402, rsvps: 128 },
]

export function formatPrice(price: number) {
  return price === 0 ? 'Free' : `$${price}`
}
