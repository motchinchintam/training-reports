import type { Lang } from './index';

export interface ProjectTranslation {
  title: string;
  context: string;
  result: string;
  tags: string[];
  detail: {
    overview: string;
    problem: string;
    goal: string;
    approach: string[];
    solution: string;
    impact: string[];
  };
}

export interface InsightTranslation {
  title: string;
  excerpt: string;
  body: string[];
}

export interface Strings {
  nav: {
    work: string; about: string; insights: string; contact: string;
    apps: string; home: string;
  };
  common: {
    seeAll: string; contact: string; viewWork: string; result: string;
    backToWork: string; backToInsights: string; read: string;
    overview: string; problem: string; goal: string;
    approach: string; solution: string; impact: string;
    interestedWorking: string;
    footerTag: string; footerCopy: string;
  };
  home: {
    greeting: string; eyebrow: string; heroHeadline: string; heroSub: string;
    selectedWork: string; fullAbout: string;
    aboutEyebrow: string; aboutHeadline: string; aboutBody: string;
    statsYrs: string; statsTrained: string; statsAccounts: string; statsPass: string;
    coreStrengths: string; strengthsSub: string;
    fromMyFeed: string; socialNote: string;
    socialCaptions: string[];
  };
  work: { pageTitle: string; pageSub: string; };
  about: {
    pageSub: string;
    backgroundEyebrow: string; bio1: string; bio2: string; bio3: string;
    certsEyebrow: string;
    howIWork: string; howIWorkSub: string;
    coreStrengths: string;
    experienceTitle: string;
    principles: { label: string; desc: string }[];
  };
  insights: { pageTitle: string; pageSub: string; };
  contact: { pageTitle: string; pageSub: string; note: string; };
  data: {
    projects: ProjectTranslation[];
    insights: InsightTranslation[];
    strengths: { title: string; desc: string }[];
    timeline: { role: string }[];
  };
}

/* ─────────────────────────── ENGLISH ─────────────────────────── */
const en: Strings = {
  nav: {
    work: 'Work', about: 'About', insights: 'Insights',
    contact: 'Contact', apps: 'Apps', home: 'Home',
  },
  common: {
    seeAll: 'See all →', contact: 'Contact', viewWork: 'View Work',
    result: 'Result', backToWork: '← Back to Work',
    backToInsights: '← Back to Insights', read: 'Read →',
    overview: 'Overview', problem: 'Problem', goal: 'Goal',
    approach: 'Approach', solution: 'Solution', impact: 'Impact',
    interestedWorking: 'Interested in working together?',
    footerTag: 'HR & Sales Training · HRD',
    footerCopy: '© 2026 Nguyen Thanh Quan',
  },
  home: {
    greeting: "Hi, I'm Quân 👋",
    eyebrow: 'HR & Sales Training · HRD',
    heroHeadline: 'I help teams grow through systems, training, and structured execution.',
    heroSub: 'Sales & HR Development professional with 6+ years building onboarding programs, reducing churn, and scaling teams across SaaS, retail, and duty-free environments.',
    selectedWork: 'Selected Work',
    fullAbout: 'Full About →',
    aboutEyebrow: 'About',
    aboutHeadline: 'Mindset over title.',
    aboutBody: 'I care more about building systems that last than hitting short-term numbers. Whether it\'s designing a training program from scratch, cutting churn through better client engagement, or scaling a team across multiple cities — I approach every problem by asking what the root cause is, not just what the symptom looks like.',
    statsYrs: 'Yrs Exp', statsTrained: 'Trained',
    statsAccounts: 'Accounts', statsPass: 'Pass Rate',
    coreStrengths: 'Core Strengths',
    strengthsSub: 'What I do best — and how I approach every engagement.',
    fromMyFeed: 'From My Feed',
    socialNote: '* Posts are curated manually. Follow me for live updates.',
    socialCaptions: [
      'Great session with the team today — wrapped up a full onboarding module for new sales reps. Watching people click with a concept they struggled with an hour ago never gets old. 🙌',
      'Finished reading "The Coaching Habit" — some genuinely practical frameworks in there for anyone who leads or trains people. Highly recommend if you work in L&D or HR.',
      "Sometimes the best training tool is a conversation. Asked 3 simple questions in today's coaching session and the rep figured out the answer themselves. That's the goal every time.",
    ],
  },
  work: {
    pageTitle: 'Work',
    pageSub: 'Selected projects in training design, team building, and operational improvement. Click any project to see the full breakdown.',
  },
  about: {
    pageSub: 'HR & Sales Training HRD · Language Learner · Traveler',
    backgroundEyebrow: 'Background',
    bio1: "I'm a Sales & HR Development professional with 6+ years of experience driving revenue growth, building client portfolios, and leading high-performing teams across SaaS, retail, and duty-free environments. I've scaled merchant accounts from hundreds to thousands, cut churn rates in half, and built training systems that consistently turn new hires into top performers.",
    bio2: 'I thrive in fast-paced, target-driven environments and bring a sharp analytical mindset to every problem — combining hands-on selling experience with the discipline of building systems and processes that outlast my direct involvement.',
    bio3: "Outside of work, I'm learning Mandarin and English, planning to travel abroad, and working through a reading list that keeps getting longer.",
    certsEyebrow: 'Certifications',
    howIWork: 'How I work',
    howIWorkSub: 'The principles that guide how I approach every project.',
    coreStrengths: 'Core Strengths',
    experienceTitle: 'Experience',
    principles: [
      { label: 'Start with the root cause', desc: "I don't treat symptoms. Before designing a solution, I ask what's actually causing the problem — and whether my assumption is correct." },
      { label: 'Build for the team, not myself', desc: 'The best system is one that runs without me in the room. I design processes people can follow and improve on their own.' },
      { label: 'Measure what matters', desc: 'KPIs only work when connected to outcomes people care about. I build frameworks that make performance visible and purposeful.' },
      { label: 'Execution over theory', desc: 'Ideas are easy. What separates good work from great work is follow-through. I close the loop — every time.' },
    ],
  },
  insights: {
    pageTitle: 'Insights',
    pageSub: 'Short pieces on training, operations, and what I\'m learning.',
  },
  contact: {
    pageTitle: 'Contact',
    pageSub: 'Open to collaboration, conversations, and new opportunities. Reach out through any of the channels below.',
    note: 'Based in Ho Chi Minh City, Vietnam · Available for remote collaboration',
  },
  data: {
    projects: [
      {
        title: 'Training System Redesign',
        context: 'Built onboarding programs for 50+ staff across Sales, Tech Support, and Marketing from scratch.',
        result: '0% attrition in Marketing cohort',
        tags: ['Training Design', 'SOP', 'Onboarding'],
        detail: {
          overview: 'When I joined Enrich Operating System (Mango for Salon) as HR & Sales Training HRD, there were no structured onboarding systems in place. New hires across departments were learning by doing — leading to inconsistency and early exits.',
          problem: 'With rapid hiring across Sales (30+), Technical Support (20+), and Marketing (3) teams, the organization needed a scalable onboarding framework that worked across different roles and skill levels — without constant manager intervention.',
          goal: 'Design and deliver a complete onboarding system that reduces ramp-up time, sets clear expectations, and creates a consistent experience from day one.',
          approach: [
            "Mapped each role's first 30/60/90 days to identify key milestones and knowledge gaps",
            'Authored SOPs and KPI frameworks tailored to each department\'s objectives',
            'Designed onboarding workshops combining product knowledge, skills practice, and performance benchmarks',
            'Built P&L templates adopted across all teams for management reporting',
          ],
          solution: 'A department-specific onboarding program with SOPs, KPI frameworks, and structured workshops — giving each new hire a clear roadmap and measurable checkpoints from day one.',
          impact: [
            '0% attrition in the Marketing cohort (3/3 retained)',
            'Reduced average ramp-up time across Sales and Tech Support teams',
            'Equipment loss rate reduced to 0% through inventory SOP implementation',
            'SOPs and KPI frameworks adopted across all departments',
          ],
        },
      },
      {
        title: 'Churn Rate Reduction Program',
        context: 'Redesigned client engagement workflows for a 12-member team managing 1,800+ merchants.',
        result: 'Churn rate: 20% → 5%',
        tags: ['Process Design', 'Retention', 'Team Leadership'],
        detail: {
          overview: 'At Zota Brand, I led a 12-member team responsible for marketing and retention for 1,800+ merchant accounts. Department churn was at 20% — directly impacting revenue and team morale.',
          problem: 'Client churn was driven by inconsistent follow-up, unclear escalation paths, and a reactive relationship management culture. The team had no structured engagement workflow.',
          goal: 'Cut churn rate significantly and build a sustainable, proactive client relationship system.',
          approach: [
            'Audited existing client touchpoints and identified the top failure patterns leading to churn',
            'Designed a structured client engagement workflow with defined check-in schedules and escalation triggers',
            'Created team KPIs focused on proactive outreach rather than reactive issue resolution',
            'Trained 10 new team members on the new workflow with structured assessment',
          ],
          solution: 'A proactive engagement system with clear touchpoints, escalation workflows, and KPI benchmarks — replacing ad-hoc relationship management with a structured, repeatable process.',
          impact: [
            'Churn rate reduced from 20% to 5% across 1,800+ merchant accounts',
            'Team productivity improved by 40% through workflow redesign',
            '10 new hires trained with 90% pass rate',
            'Monthly P&L reporting system established for senior management',
          ],
        },
      },
      {
        title: 'Sales Team Scale-Up & City Expansion',
        context: 'Recruited and trained 40 Sales staff; built a 10-person Tech Support team from scratch.',
        result: 'Merchant accounts: 700 → 4,000+',
        tags: ['HR & Recruiting', 'Training', 'Expansion'],
        detail: {
          overview: 'Global Liaison was entering an aggressive growth phase across Vietnam. The challenge: scale the Sales team rapidly without sacrificing quality, while simultaneously building a new Technical Support function.',
          problem: 'The company had 700 merchant accounts and needed to scale to thousands. There was no Technical Support team, a high complaint rate (10% of total calls), and no formal training structure.',
          goal: 'Build the human infrastructure for rapid growth — recruiting, training, and systemizing two distinct teams simultaneously while leading city expansions.',
          approach: [
            'Designed a structured recruiting pipeline for Sales and Tech Support roles',
            'Built and ran training programs for 40 Sales staff covering product, client handling, and KPIs',
            'Created a 10-person Technical Support team from scratch with complaint resolution SOPs',
            'Led office expansion projects into Quy Nhon, Da Nang, and Nha Trang',
          ],
          solution: 'A parallel hiring + training system that allowed the company to scale two teams at once, with city-level expansions supported by pre-trained talent pipelines.',
          impact: [
            'Merchant accounts grew from 700 to 4,000+ in 12 months',
            'Technical Support complaint rate reduced from 10% to 5% of total calls',
            '40 Sales staff recruited and onboarded across multiple cities',
            'Successful office launches in Quy Nhon, Da Nang, and Nha Trang',
          ],
        },
      },
      {
        title: 'Category Revenue Growth',
        context: 'Led targeted upselling strategy for liquor & cigarette category with international clientele.',
        result: 'Category revenue: +35%',
        tags: ['Sales', 'Upselling', 'Revenue Growth'],
        detail: {
          overview: 'At Lotte Duty Free, I managed the liquor and cigarette category, primarily serving Chinese-speaking international customers. The category had clear room to grow through structured upselling.',
          problem: 'Category revenue was underperforming. Sales relied on passive browsing rather than consultative selling. The Covid-19 closure also created a stock liquidation challenge.',
          goal: 'Grow category revenue through structured upselling and protect inventory value during the closure period.',
          approach: [
            'Developed a category-specific upselling script tailored to Chinese-speaking clientele',
            'Built product knowledge into daily team briefings to improve conversion confidence',
            'Coordinated stock sell-off strategy to minimize inventory loss before closure',
            'Trained 2 new employees on category knowledge and upselling techniques',
          ],
          solution: 'A consultative selling approach with language-tailored client engagement and a structured stock liquidation plan during Covid-19.',
          impact: [
            'Category revenue grew by 35% year-on-year',
            '80% of remaining stock sold off during Covid-19 closure — minimizing inventory loss',
            '2 new employees trained and retained as permanent staff',
          ],
        },
      },
    ],
    insights: [
      {
        title: 'How I design onboarding that actually sticks',
        excerpt: "Most onboarding fails not because the content is wrong, but because it's not built around what happens on day one — and day thirty.",
        body: [
          "Most onboarding programs follow the same pattern: dump information in week one, then leave the new hire to figure out the rest. The result is predictable — high early confusion, inconsistent performance, and unnecessary attrition.",
          "What works is designing onboarding backward. Start with day 60 or day 90: what does a successful hire look like by then? What behaviors, outputs, and relationships define success? Once you have that picture, trace back to what needs to happen on day one, day seven, and day thirty.",
          "The other shift that matters is from 'knowledge transfer' to 'confidence building.' New hires don't fail because they lack information — they fail because they don't know how to use it under pressure. Good onboarding creates low-stakes practice before high-stakes moments.",
          "The simplest test: after onboarding, can your new hire explain their role, their first priority, and who to ask for help — without looking anything up? If not, the program has a gap.",
        ],
      },
      {
        title: 'What reducing churn taught me about relationships',
        excerpt: "Cutting churn from 20% to 5% wasn't about the product. It was about closing the gap between what clients expected and what they actually experienced.",
        body: [
          "When I was tasked with reducing churn across 1,800+ merchant accounts, my first instinct was to look at the product — pricing, features, bugs. But the data told a different story. Most clients who left weren't unhappy with the product. They felt ignored.",
          "The pattern was almost always the same: a client hits a friction point, never quite gets it resolved, and silently starts evaluating alternatives. By the time they cancelled, the decision had already been made weeks earlier.",
          "The fix wasn't complicated — it was consistent. We built a proactive check-in schedule, defined clear escalation paths, and created KPIs around outreach (not just response). Clients who felt seen and followed up stayed, even when things weren't perfect.",
          "The lesson: churn is almost always a relationship problem disguised as a product problem. If you're losing clients, the first question isn't 'what's wrong with the product?' — it's 'where did we stop paying attention?'",
        ],
      },
      {
        title: 'Why clear KPIs make better teams',
        excerpt: "A KPI without context is just a number. The teams that perform consistently are the ones who understand the why behind each metric.",
        body: [
          "I've built KPI frameworks for Sales, Customer Success, and Technical Support teams across different companies. The biggest mistake I see: treating KPIs as a surveillance tool rather than a communication tool.",
          "When a team member sees a KPI for the first time and thinks 'I'm being measured,' the relationship with that metric is defensive. When they understand 'this number tells us whether clients are getting what they came for,' the relationship becomes purposeful.",
          "The KPIs I've found most useful connect daily actions to company-level outcomes. Not just 'make 30 calls today' but '30 calls means 5 meaningful conversations, which typically means 1 retained account.' When your team can draw that line, they start self-managing around it.",
          "Clear KPIs also make underperformance easier to address. Instead of 'you're not hitting your numbers,' the conversation becomes 'which part of the process is breaking down?' — a much more productive place to start.",
        ],
      },
    ],
    strengths: [
      { title: 'SOP & Process Design',     desc: 'Building systems that teams can execute without constant supervision.' },
      { title: 'Training Systems',          desc: 'Structured programs that turn new hires into reliable performers.' },
      { title: 'Operational Optimization',  desc: 'Removing friction across workflows, teams, and client journeys.' },
      { title: 'Execution & Alignment',     desc: 'Bridging strategy to ground-level action — making sure things actually get done.' },
    ],
    timeline: [
      { role: 'HR & Sales Training HRD'  },
      { role: 'Customer Services Leader'  },
      { role: 'Training Executive · HRD'  },
      { role: 'Marketing Executive'       },
      { role: 'Sales Executive'           },
      { role: 'Sales Executive'           },
    ],
  },
};

/* ─────────────────────────── VIETNAMESE ─────────────────────────── */
const vi: Strings = {
  nav: {
    work: 'Dự Án', about: 'Về Tôi', insights: 'Bài Viết',
    contact: 'Liên Hệ', apps: 'Ứng Dụng', home: 'Trang Chủ',
  },
  common: {
    seeAll: 'Xem tất cả →', contact: 'Liên Hệ', viewWork: 'Xem Dự Án',
    result: 'Kết Quả', backToWork: '← Quay lại Dự Án',
    backToInsights: '← Quay lại Bài Viết', read: 'Đọc →',
    overview: 'Tổng Quan', problem: 'Vấn Đề', goal: 'Mục Tiêu',
    approach: 'Cách Tiếp Cận', solution: 'Giải Pháp', impact: 'Kết Quả',
    interestedWorking: 'Bạn muốn hợp tác cùng tôi?',
    footerTag: 'Đào Tạo Bán Hàng & Nhân Sự · HRD',
    footerCopy: '© 2026 Nguyễn Thành Quân',
  },
  home: {
    greeting: 'Xin chào, tôi là Quân 👋',
    eyebrow: 'Đào Tạo Bán Hàng & Nhân Sự · HRD',
    heroHeadline: 'Tôi giúp đội nhóm phát triển qua hệ thống, đào tạo và thực thi có cấu trúc.',
    heroSub: 'Chuyên gia Phát triển Bán hàng & Nhân sự với hơn 6 năm kinh nghiệm xây dựng chương trình onboarding, giảm tỷ lệ rời bỏ và mở rộng quy mô đội nhóm trong môi trường SaaS, bán lẻ và duty-free.',
    selectedWork: 'Dự Án Tiêu Biểu',
    fullAbout: 'Xem thêm →',
    aboutEyebrow: 'Về Tôi',
    aboutHeadline: 'Tư duy hơn chức danh.',
    aboutBody: 'Tôi quan tâm đến việc xây dựng hệ thống bền vững hơn là đạt các con số ngắn hạn. Dù là thiết kế chương trình đào tạo từ đầu, giảm tỷ lệ rời bỏ qua tương tác khách hàng tốt hơn, hay mở rộng đội nhóm qua nhiều thành phố — tôi luôn hỏi nguyên nhân gốc rễ là gì, không chỉ nhìn vào triệu chứng bề mặt.',
    statsYrs: 'Năm KN', statsTrained: 'Đào Tạo',
    statsAccounts: 'Tài Khoản', statsPass: 'Tỷ Lệ Đậu',
    coreStrengths: 'Điểm Mạnh Cốt Lõi',
    strengthsSub: 'Những gì tôi làm tốt nhất — và cách tôi tiếp cận mỗi dự án.',
    fromMyFeed: 'Từ Trang Của Tôi',
    socialNote: '* Bài viết được chọn lọc thủ công. Theo dõi tôi để cập nhật trực tiếp.',
    socialCaptions: [
      'Buổi học hôm nay rất hiệu quả — vừa hoàn thành module onboarding đầy đủ cho nhân viên kinh doanh mới. Nhìn mọi người hiểu ra một khái niệm mà trước đó một giờ còn loay hoay — cảm giác đó không bao giờ nhàm. 🙌',
      'Vừa đọc xong "The Coaching Habit" — có những framework thực tiễn đáng giá cho bất kỳ ai lãnh đạo hoặc đào tạo người khác. Rất khuyên dùng nếu bạn làm L&D hoặc Nhân sự.',
      'Đôi khi công cụ đào tạo hiệu quả nhất chỉ là một cuộc trò chuyện. Hỏi 3 câu đơn giản trong buổi coaching hôm nay và nhân viên tự tìm ra câu trả lời. Đó là mục tiêu mỗi lần.',
    ],
  },
  work: {
    pageTitle: 'Dự Án',
    pageSub: 'Các dự án tiêu biểu trong thiết kế đào tạo, xây dựng đội nhóm và cải thiện vận hành. Nhấn vào bất kỳ dự án nào để xem chi tiết.',
  },
  about: {
    pageSub: 'Đào Tạo Bán Hàng & Nhân Sự · Học Ngôn Ngữ · Du Lịch',
    backgroundEyebrow: 'Lý Lịch',
    bio1: 'Tôi là chuyên gia Phát triển Bán hàng & Nhân sự với hơn 6 năm kinh nghiệm thúc đẩy tăng trưởng doanh thu, xây dựng danh mục khách hàng và dẫn dắt đội nhóm hiệu suất cao trong môi trường SaaS, bán lẻ và duty-free. Tôi đã mở rộng tài khoản thương nhân từ vài trăm lên hàng nghìn, cắt giảm tỷ lệ rời bỏ một nửa và xây dựng hệ thống đào tạo giúp nhân viên mới nhanh chóng trở thành người thực hiện xuất sắc.',
    bio2: 'Tôi phát triển tốt trong môi trường nhanh và hướng mục tiêu, mang tư duy phân tích sắc bén vào mọi vấn đề — kết hợp kinh nghiệm bán hàng thực tế với kỷ luật xây dựng hệ thống và quy trình vượt qua sự tham gia trực tiếp của bản thân.',
    bio3: 'Ngoài công việc, tôi đang học tiếng Trung và tiếng Anh, có kế hoạch du lịch nước ngoài, và đang đọc một danh sách sách ngày càng dài hơn.',
    certsEyebrow: 'Chứng Chỉ',
    howIWork: 'Cách Tôi Làm Việc',
    howIWorkSub: 'Những nguyên tắc định hướng cách tôi tiếp cận mỗi dự án.',
    coreStrengths: 'Điểm Mạnh Cốt Lõi',
    experienceTitle: 'Kinh Nghiệm',
    principles: [
      { label: 'Bắt đầu từ nguyên nhân gốc rễ', desc: 'Tôi không xử lý triệu chứng. Trước khi đề ra giải pháp, tôi hỏi điều gì thực sự gây ra vấn đề — và liệu giả định của mình có đúng không.' },
      { label: 'Xây dựng cho đội nhóm, không cho bản thân', desc: 'Hệ thống tốt nhất là hệ thống vận hành tốt kể cả khi tôi không có mặt. Tôi thiết kế quy trình mà mọi người có thể tự thực hiện và cải tiến.' },
      { label: 'Đo lường những gì quan trọng', desc: 'KPI chỉ có tác dụng khi gắn với kết quả mà mọi người quan tâm. Tôi xây dựng khung giúp hiệu suất trở nên rõ ràng và có mục đích.' },
      { label: 'Thực thi hơn lý thuyết', desc: 'Ý tưởng thì dễ. Điều tạo ra sự khác biệt giữa công việc tốt và xuất sắc là khả năng theo đuổi đến cùng. Tôi luôn khép lại vòng lặp — mọi lúc.' },
    ],
  },
  insights: {
    pageTitle: 'Bài Viết',
    pageSub: 'Các bài viết ngắn về đào tạo, vận hành và những điều tôi đang học.',
  },
  contact: {
    pageTitle: 'Liên Hệ',
    pageSub: 'Sẵn sàng hợp tác, trò chuyện và đón nhận cơ hội mới. Liên hệ qua bất kỳ kênh nào dưới đây.',
    note: 'Đặt tại TP. Hồ Chí Minh, Việt Nam · Sẵn sàng làm việc từ xa',
  },
  data: {
    projects: [
      {
        title: 'Tái Thiết Hệ Thống Đào Tạo',
        context: 'Xây dựng chương trình onboarding cho hơn 50 nhân viên ở Sales, Kỹ thuật và Marketing từ đầu.',
        result: '0% nghỉ việc trong đội Marketing',
        tags: ['Thiết Kế Đào Tạo', 'SOP', 'Onboarding'],
        detail: {
          overview: 'Khi gia nhập Enrich Operating System (Mango for Salon) với vai trò HRD Đào tạo Bán hàng & Nhân sự, công ty chưa có hệ thống onboarding có cấu trúc. Nhân viên mới ở tất cả bộ phận đều tự mò mẫm — dẫn đến sự không nhất quán và tỷ lệ nghỉ việc sớm cao.',
          problem: 'Với tốc độ tuyển dụng nhanh ở Sales (30+), Hỗ trợ Kỹ thuật (20+) và Marketing (3), tổ chức cần một khung đào tạo có thể mở rộng, phù hợp với nhiều vai trò và trình độ — mà không cần quản lý can thiệp liên tục.',
          goal: 'Thiết kế và triển khai hệ thống onboarding toàn diện giúp rút ngắn thời gian làm quen, đặt kỳ vọng rõ ràng và tạo trải nghiệm nhất quán từ ngày đầu tiên.',
          approach: [
            'Lập bản đồ 30/60/90 ngày đầu cho từng vị trí để xác định các mốc quan trọng và khoảng trống kiến thức',
            'Biên soạn SOP và khung KPI phù hợp với mục tiêu từng bộ phận',
            'Thiết kế workshop onboarding kết hợp kiến thức sản phẩm, thực hành kỹ năng và chuẩn mực hiệu suất',
            'Xây dựng mẫu P&L được áp dụng trên toàn công ty cho báo cáo quản lý',
          ],
          solution: 'Chương trình onboarding theo từng bộ phận với SOP, khung KPI và workshop có cấu trúc — giúp mỗi nhân viên mới có lộ trình rõ ràng và điểm kiểm tra đo lường từ ngày đầu tiên.',
          impact: [
            '0% nghỉ việc trong đội Marketing (giữ chân 3/3 nhân viên)',
            'Rút ngắn thời gian làm quen trung bình ở Sales và Hỗ trợ Kỹ thuật',
            'Tỷ lệ thất thoát thiết bị giảm về 0% nhờ SOP quản lý kho',
            'SOP và khung KPI được áp dụng toàn công ty',
          ],
        },
      },
      {
        title: 'Chương Trình Giảm Tỷ Lệ Rời Bỏ',
        context: 'Tái thiết quy trình chăm sóc khách hàng cho đội 12 người quản lý hơn 1.800 thương nhân.',
        result: 'Tỷ lệ rời bỏ: 20% → 5%',
        tags: ['Thiết Kế Quy Trình', 'Giữ Chân KH', 'Quản Lý Đội Nhóm'],
        detail: {
          overview: 'Tại Zota Brand, tôi dẫn dắt đội 12 người phụ trách marketing và giữ chân hơn 1.800 tài khoản thương nhân. Tỷ lệ rời bỏ của bộ phận ở mức 20% — ảnh hưởng trực tiếp đến doanh thu và tinh thần đội ngũ.',
          problem: 'Tỷ lệ rời bỏ của khách hàng xuất phát từ việc theo dõi không nhất quán, quy trình leo thang không rõ ràng và văn hóa quản lý quan hệ thụ động. Đội nhóm không có quy trình tương tác có cấu trúc.',
          goal: 'Giảm mạnh tỷ lệ rời bỏ và xây dựng hệ thống quan hệ khách hàng chủ động, bền vững.',
          approach: [
            'Kiểm tra các điểm tiếp xúc khách hàng hiện tại và xác định các mô hình thất bại hàng đầu dẫn đến rời bỏ',
            'Thiết kế quy trình tương tác khách hàng có cấu trúc với lịch check-in và kích hoạt leo thang rõ ràng',
            'Tạo KPI đội nhóm tập trung vào outreach chủ động thay vì xử lý vấn đề thụ động',
            'Đào tạo 10 thành viên mới theo quy trình mới với đánh giá có cấu trúc',
          ],
          solution: 'Hệ thống tương tác chủ động với các điểm tiếp xúc rõ ràng, quy trình leo thang và chuẩn KPI — thay thế quản lý quan hệ tuỳ hứng bằng quy trình có cấu trúc và có thể lặp lại.',
          impact: [
            'Tỷ lệ rời bỏ giảm từ 20% xuống 5% trên hơn 1.800 tài khoản thương nhân',
            'Năng suất đội nhóm tăng 40% nhờ tái thiết quy trình',
            '10 nhân viên mới được đào tạo với tỷ lệ đậu 90%',
            'Hệ thống báo cáo P&L hàng tháng được thiết lập cho ban quản lý cấp cao',
          ],
        },
      },
      {
        title: 'Mở Rộng Đội Bán Hàng & Các Tỉnh Thành',
        context: 'Tuyển dụng và đào tạo 40 nhân viên Bán hàng; xây dựng đội Hỗ trợ Kỹ thuật 10 người từ đầu.',
        result: 'Tài khoản thương nhân: 700 → 4.000+',
        tags: ['Tuyển Dụng & Nhân Sự', 'Đào Tạo', 'Mở Rộng'],
        detail: {
          overview: 'Global Liaison đang bước vào giai đoạn tăng trưởng mạnh trên khắp Việt Nam. Thách thức: mở rộng đội Sales nhanh chóng mà không hy sinh chất lượng, đồng thời xây dựng bộ phận Hỗ trợ Kỹ thuật mới.',
          problem: 'Công ty có 700 tài khoản thương nhân và cần mở rộng lên hàng nghìn. Không có đội Hỗ trợ Kỹ thuật, tỷ lệ khiếu nại cao (10% tổng cuộc gọi) và không có cấu trúc đào tạo chính thức.',
          goal: 'Xây dựng nền tảng con người cho tăng trưởng nhanh — tuyển dụng, đào tạo và hệ thống hóa hai đội riêng biệt đồng thời trong khi dẫn dắt mở rộng các tỉnh thành.',
          approach: [
            'Thiết kế quy trình tuyển dụng có cấu trúc cho vị trí Sales và Hỗ trợ Kỹ thuật',
            'Xây dựng và triển khai chương trình đào tạo cho 40 nhân viên Sales về sản phẩm, xử lý khách hàng và KPI',
            'Tạo đội Hỗ trợ Kỹ thuật 10 người từ đầu với SOP giải quyết khiếu nại',
            'Dẫn dắt dự án mở văn phòng tại Quy Nhơn, Đà Nẵng và Nha Trang',
          ],
          solution: 'Hệ thống tuyển dụng + đào tạo song song cho phép công ty mở rộng hai đội cùng lúc, với các văn phòng tỉnh thành được hỗ trợ bởi đội ngũ đã đào tạo sẵn.',
          impact: [
            'Tài khoản thương nhân tăng từ 700 lên 4.000+ trong 12 tháng',
            'Tỷ lệ khiếu nại Hỗ trợ Kỹ thuật giảm từ 10% xuống 5% tổng cuộc gọi',
            '40 nhân viên Sales được tuyển dụng và onboarded trên nhiều thành phố',
            'Mở văn phòng thành công tại Quy Nhơn, Đà Nẵng và Nha Trang',
          ],
        },
      },
      {
        title: 'Tăng Trưởng Doanh Thu Danh Mục',
        context: 'Dẫn dắt chiến lược upselling cho danh mục rượu & thuốc lá với khách hàng quốc tế.',
        result: 'Doanh thu danh mục: +35%',
        tags: ['Bán Hàng', 'Upselling', 'Tăng Trưởng DT'],
        detail: {
          overview: 'Tại Lotte Duty Free, tôi quản lý danh mục rượu và thuốc lá, chủ yếu phục vụ khách hàng quốc tế nói tiếng Trung. Danh mục có nhiều dư địa tăng trưởng thông qua upselling có cấu trúc.',
          problem: 'Doanh thu danh mục đang dưới tiềm năng. Bán hàng dựa vào khách tự duyệt thụ động thay vì bán hàng tư vấn. Việc đóng cửa do Covid-19 cũng tạo ra thách thức thanh lý hàng tồn kho.',
          goal: 'Tăng doanh thu danh mục qua upselling có cấu trúc và bảo vệ giá trị tồn kho trong giai đoạn đóng cửa.',
          approach: [
            'Phát triển kịch bản upselling dành riêng cho danh mục, điều chỉnh cho khách hàng nói tiếng Trung',
            'Tích hợp kiến thức sản phẩm vào buổi briefing hàng ngày của đội để cải thiện tự tin chốt sale',
            'Phối hợp chiến lược thanh lý hàng tồn kho để giảm thiểu tổn thất trước khi đóng cửa',
            'Đào tạo 2 nhân viên mới về kiến thức danh mục và kỹ thuật upselling',
          ],
          solution: 'Cách tiếp cận bán hàng tư vấn với tương tác khách hàng theo ngôn ngữ và kế hoạch thanh lý tồn kho có cấu trúc trong thời gian Covid-19.',
          impact: [
            'Doanh thu danh mục tăng 35% so với cùng kỳ năm trước',
            '80% hàng tồn kho còn lại được bán hết trong giai đoạn đóng cửa Covid-19 — giảm thiểu tổn thất',
            '2 nhân viên mới được đào tạo và giữ lại làm nhân viên chính thức',
          ],
        },
      },
    ],
    insights: [
      {
        title: 'Cách tôi thiết kế onboarding thực sự hiệu quả',
        excerpt: 'Hầu hết onboarding thất bại không phải vì nội dung sai, mà vì không được xây dựng xung quanh những gì xảy ra vào ngày đầu — và ngày thứ ba mươi.',
        body: [
          'Hầu hết chương trình onboarding đều theo cùng một mô hình: đổ thông tin vào tuần đầu, rồi để nhân viên mới tự xoay sở. Kết quả có thể đoán trước — bối rối cao trong giai đoạn đầu, hiệu suất không nhất quán và tỷ lệ nghỉ việc không cần thiết.',
          'Điều hiệu quả là thiết kế onboarding ngược. Bắt đầu từ ngày 60 hoặc ngày 90: một nhân viên thành công trông như thế nào vào lúc đó? Hành vi, kết quả và mối quan hệ nào định nghĩa thành công? Khi đã có bức tranh đó, hãy truy ngược lại những gì cần xảy ra vào ngày đầu, ngày thứ bảy và ngày thứ ba mươi.',
          'Sự thay đổi quan trọng khác là từ "truyền đạt kiến thức" sang "xây dựng tự tin". Nhân viên mới không thất bại vì thiếu thông tin — họ thất bại vì không biết cách dùng nó dưới áp lực. Onboarding tốt tạo ra các tình huống thực hành ít rủi ro trước các thời điểm quan trọng.',
          'Bài kiểm tra đơn giản nhất: sau onboarding, nhân viên mới có thể giải thích vai trò, ưu tiên đầu tiên và ai để hỏi — mà không cần tra cứu không? Nếu không, chương trình có khoảng trống.',
        ],
      },
      {
        title: 'Điều giảm tỷ lệ rời bỏ dạy tôi về mối quan hệ',
        excerpt: 'Giảm tỷ lệ rời bỏ từ 20% xuống 5% không phải về sản phẩm. Đó là về việc thu hẹp khoảng cách giữa kỳ vọng và những gì khách hàng thực sự trải nghiệm.',
        body: [
          'Khi được giao nhiệm vụ giảm tỷ lệ rời bỏ trên hơn 1.800 tài khoản thương nhân, bản năng đầu tiên của tôi là nhìn vào sản phẩm — giá cả, tính năng, lỗi. Nhưng dữ liệu kể một câu chuyện khác. Hầu hết khách hàng rời đi không phải vì không hài lòng với sản phẩm. Họ cảm thấy bị bỏ quên.',
          'Mô hình gần như luôn giống nhau: khách hàng gặp điểm ma sát, không giải quyết được hoàn toàn, và âm thầm bắt đầu tìm kiếm lựa chọn khác. Đến khi họ hủy, quyết định đã được đưa ra từ vài tuần trước.',
          'Cách khắc phục không phức tạp — chỉ cần nhất quán. Chúng tôi xây dựng lịch check-in chủ động, xác định các đường leo thang rõ ràng và tạo KPI xung quanh outreach (không chỉ phản hồi). Khách hàng cảm thấy được chú ý và theo dõi thì ở lại, dù mọi thứ chưa hoàn hảo.',
          'Bài học: tỷ lệ rời bỏ gần như luôn là vấn đề quan hệ được ngụy trang thành vấn đề sản phẩm. Nếu bạn đang mất khách hàng, câu hỏi đầu tiên không phải "sản phẩm có vấn đề gì?" — mà là "chúng ta dừng chú ý ở đâu?"',
        ],
      },
      {
        title: 'Vì sao KPI rõ ràng tạo nên đội nhóm tốt hơn',
        excerpt: 'KPI không có ngữ cảnh chỉ là một con số. Các đội nhóm thực hiện nhất quán là những đội hiểu lý do đằng sau mỗi chỉ số.',
        body: [
          'Tôi đã xây dựng khung KPI cho các đội Sales, Customer Success và Hỗ trợ Kỹ thuật ở nhiều công ty. Sai lầm lớn nhất tôi thấy: xem KPI là công cụ giám sát thay vì công cụ giao tiếp.',
          'Khi một thành viên nhìn vào KPI lần đầu và nghĩ "tôi đang bị đo lường", mối quan hệ với chỉ số đó mang tính phòng thủ. Khi họ hiểu "con số này cho chúng ta biết liệu khách hàng có đang nhận được điều họ tìm kiếm không", mối quan hệ trở nên có mục đích.',
          'Các KPI tôi thấy hữu ích nhất là những cái kết nối hành động hàng ngày với kết quả cấp công ty. Không chỉ "gọi 30 cuộc hôm nay" mà "30 cuộc gọi nghĩa là 5 cuộc trò chuyện ý nghĩa, thường dẫn đến 1 tài khoản được giữ lại." Khi đội của bạn có thể vẽ ra đường đó, họ bắt đầu tự quản lý xung quanh nó.',
          'KPI rõ ràng cũng giúp việc xử lý hiệu suất thấp dễ dàng hơn. Thay vì "bạn không đạt chỉ tiêu", cuộc trò chuyện trở thành "phần nào trong quy trình đang bị gãy?" — một điểm khởi đầu hiệu quả hơn nhiều.',
        ],
      },
    ],
    strengths: [
      { title: 'Thiết Kế SOP & Quy Trình',  desc: 'Xây dựng hệ thống mà đội nhóm có thể thực thi mà không cần giám sát liên tục.' },
      { title: 'Hệ Thống Đào Tạo',           desc: 'Chương trình có cấu trúc giúp nhân viên mới nhanh chóng trở thành người thực hiện đáng tin cậy.' },
      { title: 'Tối Ưu Vận Hành',            desc: 'Loại bỏ ma sát trong quy trình làm việc, đội nhóm và hành trình khách hàng.' },
      { title: 'Thực Thi & Đồng Thuận',      desc: 'Kết nối chiến lược với hành động thực tế — đảm bảo mọi việc thực sự được hoàn thành.' },
    ],
    timeline: [
      { role: 'HRD Đào Tạo Bán Hàng & Nhân Sự' },
      { role: 'Trưởng Nhóm Dịch Vụ Khách Hàng'  },
      { role: 'Chuyên Viên Đào Tạo · Nhân Sự'   },
      { role: 'Chuyên Viên Marketing'             },
      { role: 'Chuyên Viên Kinh Doanh'            },
      { role: 'Chuyên Viên Kinh Doanh'            },
    ],
  },
};

/* ─────────────────────────── MANDARIN ─────────────────────────── */
const zh: Strings = {
  nav: {
    work: '作品', about: '关于我', insights: '洞察',
    contact: '联系', apps: '应用', home: '首页',
  },
  common: {
    seeAll: '查看全部 →', contact: '联系我', viewWork: '查看作品',
    result: '成果', backToWork: '← 返回作品',
    backToInsights: '← 返回洞察', read: '阅读 →',
    overview: '项目概览', problem: '问题', goal: '目标',
    approach: '执行方式', solution: '解决方案', impact: '成果',
    interestedWorking: '有意合作？',
    footerTag: 'HR与销售培训 · 总监',
    footerCopy: '© 2026 阮成权',
  },
  home: {
    greeting: '你好，我是Quân 👋',
    eyebrow: 'HR与销售培训 · 总监',
    heroHeadline: '我通过系统搭建、培训赋能与结构化执行，推动团队持续成长。',
    heroSub: '销售与人力资源发展专家，拥有6年以上经验，专注于构建入职培训体系、降低客户流失率，并在SaaS、零售及免税行业推动团队规模化增长。',
    selectedWork: '精选作品',
    fullAbout: '了解更多 →',
    aboutEyebrow: '关于我',
    aboutHeadline: '思维决定高度。',
    aboutBody: '比起追求短期数字，我更关注构建持久的系统。无论是从零设计培训方案、通过更好的客户互动降低流失率，还是跨城市扩张团队——我处理每个问题时，都会追问根本原因，而不仅仅看表面症状。',
    statsYrs: '年经验', statsTrained: '培训人数',
    statsAccounts: '账户数', statsPass: '通过率',
    coreStrengths: '核心优势',
    strengthsSub: '我最擅长的领域——以及我如何应对每次挑战。',
    fromMyFeed: '来自我的动态',
    socialNote: '* 帖子为手动精选。关注我获取实时更新。',
    socialCaptions: [
      '今天团队培训效果很好——刚完成了新销售代表完整入职模块的设计。看到大家在一小时前还困惑的概念上突然开窍，这种感觉永远不会腻。🙌',
      '刚读完《高效教练》——书中有不少对领导者和培训师非常实用的框架。如果你做L&D或人力资源，强烈推荐。',
      '有时候最好的培训工具就是一次对话。今天的辅导中问了3个简单问题，销售代表自己找到了答案。这就是我每次的目标。',
    ],
  },
  work: {
    pageTitle: '作品',
    pageSub: '在培训设计、团队建设和运营改善方面的精选项目。点击任意项目查看完整详情。',
  },
  about: {
    pageSub: 'HR与销售培训总监 · 语言学习者 · 旅行者',
    backgroundEyebrow: '背景',
    bio1: '我是一名销售与人力资源发展专家，拥有超过6年经验，专注于推动营收增长、构建客户资产组合，以及在SaaS、零售和免税行业领导高绩效团队。我曾将商户账户从数百扩张至数千，将流失率降低一半，并搭建了能持续将新员工培养为顶尖业绩者的培训体系。',
    bio2: '我在快节奏、目标导向的环境中表现出色，以敏锐的分析思维应对每个问题——将一线销售经验与构建可持续运行的系统和流程的能力有机结合。',
    bio3: '工作之余，我正在学习普通话和英语，计划出境旅行，也在持续阅读一份越来越长的书单。',
    certsEyebrow: '证书',
    howIWork: '我的工作方式',
    howIWorkSub: '指导我处理每个项目的核心原则。',
    coreStrengths: '核心优势',
    experienceTitle: '工作经历',
    principles: [
      { label: '从根本原因出发', desc: '我不处理表面症状。在设计解决方案之前，我会追问真正导致问题的原因——并验证自己的假设是否正确。' },
      { label: '为团队而建，而非为自己', desc: '最好的系统是不需要我在场就能运转的系统。我设计的流程，团队可以独立执行并持续改进。' },
      { label: '衡量真正重要的事', desc: 'KPI只有与人们真正关心的结果挂钩时才有意义。我构建的框架，让绩效数据变得清晰可见、有迹可循。' },
      { label: '执行重于理论', desc: '想法很容易。区分好工作与卓越工作的，是持续的跟进与收尾。我每次都会闭环——没有例外。' },
    ],
  },
  insights: {
    pageTitle: '洞察',
    pageSub: '关于培训、运营与个人成长的短篇思考。',
  },
  contact: {
    pageTitle: '联系我',
    pageSub: '欢迎合作、交流，以及探讨新机会。通过以下任意渠道与我联系。',
    note: '现居越南胡志明市 · 可远程协作',
  },
  data: {
    projects: [
      {
        title: '培训体系重构',
        context: '从零为销售、技术支持和市场部门的50余名员工构建完整入职培训体系。',
        result: '市场部门人员零流失',
        tags: ['培训设计', 'SOP', '入职培训'],
        detail: {
          overview: '加入Enrich Operating System（Mango for Salon）担任HR与销售培训总监时，公司没有任何结构化入职体系。各部门新员工都在摸索中学习——导致表现参差不齐和早期离职率偏高。',
          problem: '随着销售（30+）、技术支持（20+）和市场（3人）团队的快速招聘，公司需要一套可扩展的入职框架，适配不同岗位和技能层级——且无需管理者持续介入。',
          goal: '设计并落地完整入职体系，缩短上手时间，明确期望，并从第一天起创造一致的员工体验。',
          approach: [
            '梳理各岗位前30/60/90天的关键节点与知识盲区',
            '为各部门目标量身编写SOP和KPI框架',
            '设计融合产品知识、技能实操与绩效标准的入职工作坊',
            '构建全公司采用的P&L模板，用于管理层报告',
          ],
          solution: '以部门为单位的入职培训计划，包含SOP、KPI框架和结构化工作坊——让每位新员工从第一天起就有清晰路线图和可量化的阶段检核点。',
          impact: [
            '市场团队人员零流失（3人全部留任）',
            '销售和技术支持团队平均上手时间显著缩短',
            '设备丢失率降至0%，得益于库存SOP的实施',
            'SOP和KPI框架在全公司各部门推广采用',
          ],
        },
      },
      {
        title: '客户流失率降低计划',
        context: '为管理1,800余商户的12人团队重新设计客户互动流程。',
        result: '流失率：20% → 5%',
        tags: ['流程设计', '客户留存', '团队管理'],
        detail: {
          overview: '在Zota Brand，我带领12人团队负责1,800余商户账户的营销和留存工作。部门流失率高达20%——直接影响营收和团队士气。',
          problem: '客户流失源于跟进不一致、升级路径不清晰以及被动式客户关系管理文化。团队没有结构化的互动工作流程。',
          goal: '大幅降低流失率，构建可持续的主动客户关系体系。',
          approach: [
            '审计现有客户触点，识别导致流失的主要失败模式',
            '设计有明确签到计划和升级触发机制的客户互动结构化流程',
            '制定以主动外联为导向（而非被动响应）的团队KPI',
            '按结构化评估对10名新成员进行新流程培训',
          ],
          solution: '以清晰触点、升级工作流和KPI基准构建的主动互动体系——以结构化、可复制的流程取代临时性客户关系管理。',
          impact: [
            '1,800余商户账户的流失率从20%降至5%',
            '流程重构使团队效率提升40%',
            '10名新员工培训通过率达90%',
            '为高级管理层建立月度P&L报告体系',
          ],
        },
      },
      {
        title: '销售团队扩张与城市拓展',
        context: '招募并培训40名销售人员；从零组建10人技术支持团队。',
        result: '商户账户：700 → 4,000+',
        tags: ['招聘与人力资源', '培训', '城市扩张'],
        detail: {
          overview: 'Global Liaison正进入越南全境的激进增长阶段。挑战在于：快速扩张销售团队且不牺牲质量，同时构建全新的技术支持职能部门。',
          problem: '公司有700个商户账户，需要扩张至数千。没有技术支持团队，投诉率高（占总来电10%），且无正式培训体系。',
          goal: '为快速增长构建人才基础设施——同时招募、培训和系统化两支不同团队，并推进城市扩张。',
          approach: [
            '为销售和技术支持岗位设计结构化招聘流程',
            '为40名销售人员搭建并实施涵盖产品、客户处理和KPI的培训计划',
            '从零组建10人技术支持团队，配套投诉处理SOP',
            '主导在归仁、岘港和芽庄的办公室扩张项目',
          ],
          solution: '并行的招募+培训体系，使公司得以同步扩张两支团队，城市级扩张由预训练的人才储备支撑。',
          impact: [
            '商户账户在12个月内从700增长至4,000+',
            '技术支持投诉率从总来电10%降至5%',
            '跨多个城市招募并完成40名销售人员入职',
            '成功在归仁、岘港和芽庄开设办公室',
          ],
        },
      },
      {
        title: '品类营收增长',
        context: '针对国际客群主导酒类与烟草品类的结构化追加销售策略。',
        result: '品类营收：+35%',
        tags: ['销售', '追加销售', '营收增长'],
        detail: {
          overview: '在乐天免税店，我负责管理酒类和烟草品类，主要服务中文母语的国际顾客。该品类通过结构化追加销售有明确的增长空间。',
          problem: '品类营收表现低于潜力。销售依赖被动浏览而非顾问式销售。新冠疫情关店期间还面临库存清仓挑战。',
          goal: '通过结构化追加销售提升品类营收，并在关店期间保护库存价值。',
          approach: [
            '开发针对中文客群量身定制的品类追加销售话术',
            '将产品知识纳入每日团队早会，提升成交信心',
            '协调关店前库存清仓策略，最大程度减少损失',
            '对2名新员工进行品类知识和追加销售技巧培训',
          ],
          solution: '以语言适配客户互动为核心的顾问式销售方式，结合新冠疫情期间的结构化库存清仓计划。',
          impact: [
            '品类营收同比增长35%',
            '新冠疫情关店期间80%剩余库存成功清仓——损失最小化',
            '2名新员工培训后转为正式员工',
          ],
        },
      },
    ],
    insights: [
      {
        title: '如何设计真正有效的入职培训',
        excerpt: '大多数入职培训失败，不是因为内容有误，而是没有围绕第一天——以及第三十天——真正发生的事情来设计。',
        body: [
          '大多数入职培训程序遵循同样的模式：第一周塞满信息，然后让新员工自己摸索。结果是可预见的——早期高度混乱、绩效参差不齐，以及不必要的人员流失。',
          '真正有效的方法是反向设计入职培训。从第60天或第90天出发：到那时，一个成功的新员工应该是什么样子？哪些行为、产出和关系定义了成功？有了这张图，再倒推第一天、第七天和第三十天需要发生什么。',
          '另一个关键转变是从"知识传递"到"建立信心"。新员工失败，不是因为缺乏信息，而是因为不知道如何在压力下运用这些信息。好的入职培训，在高压时刻到来之前创造低风险的练习机会。',
          '最简单的测试：培训结束后，新员工能否在不查阅任何资料的情况下，说清楚自己的职责、第一优先级和遇到问题该找谁？如果不能，程序存在缺口。',
        ],
      },
      {
        title: '降低客户流失率让我学到的关系管理',
        excerpt: '将流失率从20%降至5%，靠的不是产品。靠的是缩小客户预期与实际体验之间的差距。',
        body: [
          '当被交予降低1,800余商户账户流失率的任务时，我的第一反应是看产品——定价、功能、漏洞。但数据讲述了不同的故事。大多数离开的客户并非对产品不满意。他们感到被忽视。',
          '模式几乎总是相同：客户遇到摩擦点，问题始终没有完全解决，然后悄悄开始考虑替代方案。等到他们取消时，决定往往已在数周前作出。',
          '解决方法并不复杂——关键在于一致性。我们建立了主动签到计划，明确了升级路径，并围绕外联（而非仅仅响应）制定KPI。感到被关注和跟进的客户留下来了，即使事情并不完美。',
          '教训：流失率几乎总是被伪装成产品问题的关系问题。如果你在失去客户，第一个问题不是"产品出了什么问题？"——而是"我们在哪里停止了关注？"',
        ],
      },
      {
        title: '为什么清晰的KPI能打造更好的团队',
        excerpt: '没有背景的KPI只是一个数字。持续高绩效的团队，是那些理解每个指标背后原因的团队。',
        body: [
          '我为多家公司的销售、客户成功和技术支持团队构建过KPI框架。我见过的最大错误：将KPI当作监控工具，而非沟通工具。',
          '当团队成员第一次看到KPI时想的是"我被衡量了"，与该指标的关系就是防御性的。当他们理解"这个数字告诉我们客户是否得到了他们来找我们的东西"，关系就变得有目的性。',
          '我发现最有用的KPI是将日常行动与公司层面成果连接起来的那些。不只是"今天打30个电话"，而是"30个电话意味着5次有意义的对话，通常意味着1个留存账户。"当你的团队能画出这条线，他们开始围绕它自我管理。',
          '清晰的KPI也让绩效不佳更容易处理。对话从"你没有完成指标"变成"流程中哪个环节出了问题？"——一个效率高得多的起点。',
        ],
      },
    ],
    strengths: [
      { title: 'SOP与流程设计',  desc: '构建团队无需持续监督即可执行的系统。' },
      { title: '培训体系',        desc: '结构化的培训项目，将新员工培养成可靠的高绩效人才。' },
      { title: '运营优化',        desc: '消除工作流程、团队协作和客户旅程中的阻力。' },
      { title: '执行与协同',      desc: '连接战略与一线行动——确保事情真正得以落地完成。' },
    ],
    timeline: [
      { role: '人力资源与销售培训总监' },
      { role: '客户服务团队主管'       },
      { role: '培训专员·人力资源'     },
      { role: '市场专员'               },
      { role: '销售专员'               },
      { role: '销售专员'               },
    ],
  },
};

export const TRANSLATIONS: Record<Lang, Strings> = { en, vi, zh };
