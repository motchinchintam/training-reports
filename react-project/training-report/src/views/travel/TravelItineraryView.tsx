import { useState } from 'react';

interface Activity {
  time?: string;
  text: string;
  type?: 'transport' | 'food' | 'sightseeing' | 'hotel' | 'note' | 'optional' | 'flight';
  sub?: string[];
}

interface DayPlan {
  day: number;
  date: string;
  weekday: string;
  emoji: string;
  title: string;
  activities: Activity[];
}

const ITINERARY: DayPlan[] = [
  {
    day: 1,
    date: 'April 29, 2026',
    weekday: 'Wednesday',
    emoji: '🌙',
    title: 'Arrival & Night Market Fun',
    activities: [
      { time: '5:35 PM', text: 'Flight Z2 126 (Manila → Taipei)', type: 'flight' },
      { time: '7:55 PM', text: 'Arrival at Taoyuan Airport', type: 'transport' },
      { time: '8:25 PM', text: 'Airport → Taipei Main Station (45 min)', type: 'transport' },
      {
        time: '', text: 'Hostel: Taiwan Youth Hostel — Zhongzheng District, Taipei',
        type: 'hotel',
        sub: ['~2 min walk from Taipei Main Station via exit M8', 'Buy Easy Card at nearby 7/11 and FamilyMart']
      },
      {
        time: '10:00 PM', text: 'Raohe Night Market (30 min from hostel)', type: 'sightseeing',
        sub: ['Try famous street food', 'Songshan Ciyou Temple', 'Neon lights & night photos']
      },
      {
        time: '', text: 'Optional Detour: Taipei 101 photo spots (see Day 2) — for night photos (15 min from Raohe Night Market)',
        type: 'optional'
      },
      {
        time: '', text: 'Closer Night Market Options: Ningxia and Ximending Night Market (10–15 min from hostel)',
        type: 'optional'
      },
    ],
  },
  {
    day: 2,
    date: 'April 30, 2026',
    weekday: 'Thursday',
    emoji: '🌸',
    title: 'CKS Memorial, Food Trip & Tamsui Sunset',
    activities: [
      {
        time: '6:00 AM', text: 'Optional Breakfast: Fuhang Soy Milk (Zhongzheng District)',
        type: 'food',
        sub: ['12 min walk from hostel', 'Leave early — long line is expected!']
      },
      { time: '8:00 AM', text: 'Chiang Kai-shek Memorial Hall (Zhongzheng District)', type: 'sightseeing', sub: ['12 min walk from hostel'] },
      { time: '9:40 AM', text: 'Rongjin Gorgeous Time', type: 'sightseeing', sub: ['Historic Japanese style photo spots'] },
      {
        time: '10:30 AM', text: 'Yongkang Street Food Trip', type: 'food',
        sub: ['5 min walk from Rongjin Gorgeous Time', 'https://taiwanderers.com/yongkang-street-taipei/']
      },
      { time: '', text: 'Optional: Walk to Daan Forest Park — relax & photos (15 min walk from Yongkang Street)', type: 'optional' },
      {
        time: '12:00 PM', text: 'Taipei 101 + Rainbow Walk', type: 'sightseeing',
        sub: [
          'Photo Spots: Taipei 101 Rainbow Walk, Taipei City Hall Bus Station Staircase, No. 88 Songao Road, Tao Zhu Yin Yuan, Takemura Izakaya Street',
          'Quick mall stroll (Taipei 101, GU, NET)',
          'Optional food stop: Ichiran Ramen, Cha Kee Noodle, HANNA Pasta Café, Kai Kai Dessert',
          'NOTE: Chiang Kai-shek to Taipei 101 route may be done via KLOOK Tour Bus'
        ]
      },
      {
        time: '2:30 PM', text: 'Travel to Tamsui', type: 'transport',
        sub: ['Taipei 101 / Taipei Main → Tamsui Station', 'Travel time: 40–45 min']
      },
      {
        time: '3:30 PM', text: 'Tamsui Old Street', type: 'sightseeing',
        sub: ['Explore Tamsui Old Street and Baywalk', 'Optional Food Stop: 大塊牛排-淡水店 — Steak restaurant near Tamsui Station (~5 min walk)']
      },
      {
        time: '4:30 PM', text: 'Sunset at Tamsui Fisherman\'s Wharf / Lover\'s Bridge / Bali', type: 'sightseeing',
        sub: [
          'Best golden hour photos',
          'Note: Take a ferry from Tamsui Old Street to Fisherman\'s Wharf (~15–20 min), or take a bus (~30–45 min) — bus may take longer depending on traffic'
        ]
      },
      { time: '7:00 PM', text: 'Take Bus 947 to Banqiao Station Square', type: 'transport' },
      { time: '8:30 PM', text: 'Banqiao Christmas Land', type: 'sightseeing', sub: ['Giant Christmas tree and Light shows'] },
    ],
  },
  {
    day: 3,
    date: 'May 1, 2026',
    weekday: 'Friday',
    emoji: '🚌',
    title: 'Yehliu + Shifen + Jiufen KLOOK Tour + Ximending',
    activities: [
      {
        time: 'Morning', text: 'Optional Food Stops (1–8 min walk from hostel)', type: 'food',
        sub: ['Master of Rice Ball', 'GooDonut', 'Liu Shandong Beef Noodles', 'Fuzhou Ancestral Pepper Cake']
      },
      {
        time: '11:05 AM', text: 'KLOOK Yehliu, Shifen & Jiufen Night Tour', type: 'sightseeing',
        sub: [
          'Departure: Taipei Main Station M4',
          'Includes:',
          '• Yehliu Geopark',
          '• Shifen Old Street',
          '• Shifen Waterfall',
          '• Jiufen Old Street'
        ]
      },
      { time: '8:30 PM', text: 'Drop-off at Taipei Main Station M3', type: 'transport' },
      {
        time: '9:00 PM', text: 'Ximending Night Stroll', type: 'sightseeing',
        sub: [
          'Try these:',
          '• Xin Fu Tang brown sugar boba milk tea',
          '• Scallion pancake',
          '• Crispy Donut',
          '• The Red House',
          'Pasalubong Shops: Carrefour, Mr. Ho'
        ]
      },
    ],
  },
  {
    day: 4,
    date: 'May 2, 2026',
    weekday: 'Saturday',
    emoji: '☕',
    title: 'Maokong Gondola, Zhongshan Cafés & Huashan',
    activities: [
      {
        time: '8:00 AM', text: 'Maokong Gondola', type: 'sightseeing',
        sub: ['Scenic ride', 'Tea spots']
      },
      {
        time: '11:00 AM', text: 'Zhongshan District Café Hopping', type: 'food',
        sub: ['% Arabica', 'Coffee Dumbo', 'R9 Café', 'Coach Play Café', 'Fujin Tree Café', 'Jin Din Rou → 15 min walk from Fujin Tree Café']
      },
      {
        time: '', text: 'Optional Food Stop: Ajito Ramen, Comfort Burger Company, I\'m donut?, Fourninetine Bakery',
        type: 'optional'
      },
      {
        time: '2:30 PM', text: 'Huashan 1914 Creative Park', type: 'sightseeing',
        sub: ['Exhibits', 'Photo areas', 'Indie shops']
      },
      {
        time: '', text: 'Optional Evening Activities', type: 'optional',
        sub: [
          'Miramar Entertainment Park → ferris wheel at night',
          'Taipei Sightseeing Bus (Klook) → city tour at night',
          'Convenient for night sightseeing / spring lights',
          'Return to hostel around 9:30–10:00 PM'
        ]
      },
    ],
  },
  {
    day: 5,
    date: 'May 3, 2026',
    weekday: 'Sunday',
    emoji: '✈️',
    title: 'Flight Back to Manila',
    activities: [
      { time: '10:30 PM (May 2)', text: 'Travel to Taoyuan Airport', type: 'transport', sub: ['Check-in & boarding'] },
      { time: '1:55 AM', text: 'AirAsia Flight Z2 129 (Taipei → Manila)', type: 'flight' },
      { time: '4:10 AM', text: 'Arrival in Manila', type: 'flight' },
    ],
  },
];

// ─── ICS Export ───────────────────────────────────────────────────────────────
interface CalEvent {
  dtstart: string; // YYYYMMDDTHHmmss
  dtend: string;
  summary: string;
  description?: string;
  location?: string;
}

function pad(n: number) { return String(n).padStart(2, '0'); }

function toIcsDate(year: number, month: number, day: number, hour: number, min: number) {
  return `${year}${pad(month)}${pad(day)}T${pad(hour)}${pad(min)}00`;
}

function generateICS(events: CalEvent[]): string {
  const lines: string[] = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Quan Works//Travel Hub//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'X-WR-CALNAME:Taiwan Trip 2026',
    'X-WR-TIMEZONE:Asia/Taipei',
  ];
  for (const ev of events) {
    lines.push('BEGIN:VEVENT');
    lines.push(`DTSTART;TZID=Asia/Taipei:${ev.dtstart}`);
    lines.push(`DTEND;TZID=Asia/Taipei:${ev.dtend}`);
    lines.push(`SUMMARY:${ev.summary}`);
    if (ev.description) lines.push(`DESCRIPTION:${ev.description.replace(/\n/g, '\\n')}`);
    if (ev.location) lines.push(`LOCATION:${ev.location}`);
    lines.push(`UID:taiwan-2026-${ev.dtstart}-${Math.random().toString(36).slice(2)}@quanworks`);
    lines.push('END:VEVENT');
  }
  lines.push('END:VCALENDAR');
  return lines.join('\r\n');
}

const CALENDAR_EVENTS: CalEvent[] = [
  // Day 1 — Apr 29
  { dtstart: toIcsDate(2026,4,29,17,35), dtend: toIcsDate(2026,4,29,19,55), summary: '✈️ Flight Z2 126 — Manila → Taipei', location: 'Manila Ninoy Aquino International Airport' },
  { dtstart: toIcsDate(2026,4,29,19,55), dtend: toIcsDate(2026,4,29,20,25), summary: '🛬 Arrival at Taoyuan Airport', location: 'Taiwan Taoyuan International Airport' },
  { dtstart: toIcsDate(2026,4,29,20,25), dtend: toIcsDate(2026,4,29,21,15), summary: '🚌 Airport → Taipei Main Station', description: 'Travel time ~45 min. Buy Easy Card at nearby 7/11 or FamilyMart.' },
  { dtstart: toIcsDate(2026,4,29,22,0),  dtend: toIcsDate(2026,4,29,23,30), summary: '🌙 Raohe Night Market', description: 'Try famous street food. Songshan Ciyou Temple. Neon lights & night photos.', location: 'Raohe Street Night Market, Taipei' },
  // Day 2 — Apr 30
  { dtstart: toIcsDate(2026,4,30,6,0),  dtend: toIcsDate(2026,4,30,7,0),  summary: '🥛 Fuhang Soy Milk Breakfast (Optional)', description: 'Leave early — long line is expected!', location: 'Fuhang Soy Milk, Zhongzheng District, Taipei' },
  { dtstart: toIcsDate(2026,4,30,8,0),  dtend: toIcsDate(2026,4,30,9,30), summary: '🏛️ Chiang Kai-shek Memorial Hall', location: 'Chiang Kai-shek Memorial Hall, Zhongzheng District, Taipei' },
  { dtstart: toIcsDate(2026,4,30,9,40), dtend: toIcsDate(2026,4,30,10,30),summary: '📸 Rongjin Gorgeous Time', description: 'Historic Japanese style photo spots.' },
  { dtstart: toIcsDate(2026,4,30,10,30),dtend: toIcsDate(2026,4,30,12,0), summary: '🍜 Yongkang Street Food Trip', location: 'Yongkang Street, Da\'an District, Taipei' },
  { dtstart: toIcsDate(2026,4,30,12,0), dtend: toIcsDate(2026,4,30,14,30),summary: '🏙️ Taipei 101 + Rainbow Walk', description: 'Taipei 101 Rainbow Walk, City Hall Bus Station Staircase, No. 88 Songao Road, Tao Zhu Yin Yuan, Takemura Izakaya Street. Mall: Taipei 101, GU, NET.', location: 'Taipei 101, Xinyi District, Taipei' },
  { dtstart: toIcsDate(2026,4,30,14,30),dtend: toIcsDate(2026,4,30,15,30),summary: '🚇 Travel to Tamsui', description: 'Taipei 101 / Taipei Main → Tamsui Station. Travel time: 40–45 min.' },
  { dtstart: toIcsDate(2026,4,30,15,30),dtend: toIcsDate(2026,4,30,16,30),summary: '🏘️ Tamsui Old Street', location: 'Tamsui Old Street, Tamsui District, New Taipei' },
  { dtstart: toIcsDate(2026,4,30,16,30),dtend: toIcsDate(2026,4,30,18,30),summary: '🌅 Sunset at Tamsui Fisherman\'s Wharf / Lover\'s Bridge', description: 'Best golden hour photos. Take ferry (~15-20 min) or bus (~30-45 min) from Tamsui Old Street.', location: 'Fisherman\'s Wharf, Tamsui, New Taipei' },
  { dtstart: toIcsDate(2026,4,30,19,0), dtend: toIcsDate(2026,4,30,19,30),summary: '🚌 Bus 947 to Banqiao Station Square' },
  { dtstart: toIcsDate(2026,4,30,20,30),dtend: toIcsDate(2026,4,30,22,0), summary: '🎄 Banqiao Christmas Land', description: 'Giant Christmas tree and light shows.', location: 'Banqiao Station Square, New Taipei' },
  // Day 3 — May 1
  { dtstart: toIcsDate(2026,5,1,11,5),  dtend: toIcsDate(2026,5,1,20,30), summary: '🗺️ KLOOK Tour: Yehliu + Shifen + Jiufen', description: 'Departure: Taipei Main Station M4. Includes: Yehliu Geopark, Shifen Old Street, Shifen Waterfall, Jiufen Old Street.', location: 'Taipei Main Station M4, Taipei' },
  { dtstart: toIcsDate(2026,5,1,20,30), dtend: toIcsDate(2026,5,1,21,0),  summary: '🚉 Drop-off: Taipei Main Station M3' },
  { dtstart: toIcsDate(2026,5,1,21,0),  dtend: toIcsDate(2026,5,1,23,0),  summary: '🌃 Ximending Night Stroll', description: 'Xin Fu Tang boba, Scallion pancake, Crispy Donut, The Red House. Pasalubong: Carrefour, Mr. Ho.', location: 'Ximending, Wanhua District, Taipei' },
  // Day 4 — May 2
  { dtstart: toIcsDate(2026,5,2,8,0),   dtend: toIcsDate(2026,5,2,10,0),  summary: '🚡 Maokong Gondola', description: 'Scenic ride and tea spots.', location: 'Maokong Gondola, Wenshan District, Taipei' },
  { dtstart: toIcsDate(2026,5,2,11,0),  dtend: toIcsDate(2026,5,2,14,0),  summary: '☕ Zhongshan District Café Hopping', description: '% Arabica, Coffee Dumbo, R9 Café, Coach Play Café, Fujin Tree Café, Jin Din Rou.', location: 'Zhongshan District, Taipei' },
  { dtstart: toIcsDate(2026,5,2,14,30), dtend: toIcsDate(2026,5,2,17,0),  summary: '🎨 Huashan 1914 Creative Park', description: 'Exhibits, photo areas, indie shops.', location: 'Huashan 1914 Creative Park, Zhongzheng District, Taipei' },
  { dtstart: toIcsDate(2026,5,2,22,30), dtend: toIcsDate(2026,5,2,23,59), summary: '🚌 Travel to Taoyuan Airport', description: 'Check-in & boarding for early morning flight.' },
  // Day 5 — May 3
  { dtstart: toIcsDate(2026,5,3,1,55),  dtend: toIcsDate(2026,5,3,4,10),  summary: '✈️ Flight Z2 129 — Taipei → Manila', location: 'Taiwan Taoyuan International Airport' },
  { dtstart: toIcsDate(2026,5,3,4,10),  dtend: toIcsDate(2026,5,3,5,0),   summary: '🛬 Arrival in Manila', location: 'Manila Ninoy Aquino International Airport' },
];

function downloadICS() {
  const content = generateICS(CALENDAR_EVENTS);
  const blob = new Blob([content], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'taiwan-trip-2026.ics';
  a.click();
  URL.revokeObjectURL(url);
}

// ─── UI ───────────────────────────────────────────────────────────────────────
const TYPE_ICON: Record<string, string> = {
  flight: '✈️',
  transport: '🚌',
  food: '🍜',
  sightseeing: '📸',
  hotel: '🏨',
  note: '📝',
  optional: '💡',
};

const TYPE_COLOR: Record<string, string> = {
  flight: 'act-flight',
  transport: 'act-transport',
  food: 'act-food',
  sightseeing: 'act-sight',
  hotel: 'act-hotel',
  note: 'act-note',
  optional: 'act-optional',
};

export default function TravelItineraryView() {
  const [activeDay, setActiveDay] = useState(0);
  const day = ITINERARY[activeDay];

  return (
    <div className="itin-page">
      <div className="itin-header">
        <div className="itin-flag">🇹🇼</div>
        <div style={{ flex: 1 }}>
          <h1 className="itin-title">Solo Taiwan Trip</h1>
          <div className="itin-dates">April 29 – May 3, 2026 · Taipei</div>
        </div>
        <button className="itin-export-btn" onClick={downloadICS} title="Download .ics file to import into Apple Calendar, Google Calendar, or Outlook">
          📅 Export to Calendar
        </button>
      </div>

      <div className="itin-tabs">
        {ITINERARY.map((d, i) => (
          <button
            key={d.day}
            className={`itin-tab ${activeDay === i ? 'active' : ''}`}
            onClick={() => setActiveDay(i)}
          >
            <span className="itin-tab-emoji">{d.emoji}</span>
            <span className="itin-tab-day">Day {d.day}</span>
            <span className="itin-tab-date">{d.date.split(',')[0]}</span>
          </button>
        ))}
      </div>

      <div className="itin-day-header">
        <span className="itin-day-emoji">{day.emoji}</span>
        <div>
          <div className="itin-day-label">Day {day.day} — {day.date} ({day.weekday})</div>
          <div className="itin-day-title">{day.title}</div>
        </div>
      </div>

      <div className="itin-timeline">
        {day.activities.map((act, i) => (
          <div key={i} className={`itin-item ${TYPE_COLOR[act.type || 'note'] || ''}`}>
            <div className="itin-item-left">
              <span className="itin-item-icon">{TYPE_ICON[act.type || 'note'] || '📌'}</span>
              {i < day.activities.length - 1 && <div className="itin-item-line" />}
            </div>
            <div className="itin-item-body">
              {act.time && <div className="itin-item-time">{act.time}</div>}
              <div className="itin-item-text">{act.text}</div>
              {act.sub && (
                <ul className="itin-item-sub">
                  {act.sub.map((s, j) => <li key={j}>{s}</li>)}
                </ul>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="itin-nav">
        <button className="itin-nav-btn" onClick={() => setActiveDay(d => Math.max(0, d - 1))} disabled={activeDay === 0}>
          ← Previous Day
        </button>
        <span className="itin-nav-count">{activeDay + 1} / {ITINERARY.length}</span>
        <button className="itin-nav-btn" onClick={() => setActiveDay(d => Math.min(ITINERARY.length - 1, d + 1))} disabled={activeDay === ITINERARY.length - 1}>
          Next Day →
        </button>
      </div>
    </div>
  );
}
