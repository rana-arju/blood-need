
export interface BlogPost {
  id: number;
  title: string;
  image: string;
  category: string;
  date: string;
  readTime: number;
  author: string;
  authorImage: string;
  excerpt: string;
  content: string;
  tags: string[];
}

export const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "The Lifesaving Impact of Regular Blood Donation",
    image:
      "https://innovativeartisan.com/demo/html/blad-ai/assets/images/hm1.png",
    category: "Awareness",
    date: "June 14, 2023",
    readTime: 5,
    author: "Dr. Sarah Johnson",
    authorImage: "https://randomuser.me/api/portraits/women/44.jpg",
    excerpt:
      "Regular blood donation can save countless lives. Learn about the incredible impact your donation can have on patients in need.",
    content: `
      <p>Every two seconds, someone in the United States needs blood. This astounding statistic highlights just how crucial blood donation is to our healthcare system. Yet, only about 3% of eligible Americans donate blood each year.</p>
      
      <h3>The Far-Reaching Impact of Blood Donation</h3>
      
      <p>When you donate blood, you're not just helping one person – a single donation can save up to three lives. Your blood might help:</p>
      
      <ul>
        <li>Trauma victims who have experienced significant blood loss</li>
        <li>Cancer patients undergoing chemotherapy treatments</li>
        <li>Individuals with blood disorders like sickle cell anemia</li>
        <li>Mothers experiencing complications during childbirth</li>
        <li>Patients undergoing complex surgeries</li>
      </ul>
      
      <p>Blood cannot be manufactured – it can only come from generous donors. Despite medical advances, there is still no substitute for human blood in treating patients.</p>
      
      <h3>Blood Types and Critical Needs</h3>
      
      <p>While all blood donations are valuable, certain blood types are particularly in demand:</p>
      
      <p>Type O negative is the universal donor type that can be transfused to almost any patient in an emergency. Only about 7% of the population has O negative blood, making it consistently in short supply.</p>
      
      <p>Type AB plasma can be transfused to patients of all blood types. Since only 4% of the population has AB blood, this plasma is always needed.</p>
      
      <h3>The Donation Process</h3>
      
      <p>Donating blood is a simple and safe process that typically takes about an hour from start to finish. The actual blood drawing usually only takes 8-10 minutes. After a brief health screening and registration, donors can relax while their donation is collected, followed by a short recovery period with refreshments.</p>
      
      <p>Regular donors can give blood every 56 days, up to 6 times a year. This frequency allows the body to replenish red blood cells while providing a steady supply to blood banks.</p>
      
      <h3>Making a Difference</h3>
      
      <p>By becoming a regular blood donor, you join a community of everyday heroes who collectively save millions of lives each year. It's one of the most direct ways you can make a tangible difference in your community.</p>
      
      <p>The next time you see a blood drive in your area or pass by a donation center, consider taking an hour out of your day to donate. That single hour could mean a lifetime to someone in need.</p>
    `,
    tags: ["Blood Donation", "Healthcare", "Community Service", "Life Saving"],
  },
  {
    id: 2,
    title: "Common Myths About Blood Donation Debunked",
    image:
      "https://images.unsplash.com/photo-1615461066841-6116e61058f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    category: "Education",
    date: "May 8, 2023",
    readTime: 4,
    author: "Michael Chang",
    authorImage: "https://randomuser.me/api/portraits/men/32.jpg",
    excerpt:
      "Many misconceptions prevent people from donating blood. Let's separate fact from fiction and address common concerns about blood donation.",
    content: `
      <p>Despite the critical need for blood donations worldwide, many eligible donors hesitate due to misconceptions and fears about the donation process. Let's address some of the most common myths that might be holding potential donors back.</p>
      
      <h3>Myth #1: "Donating blood is painful"</h3>
      
      <p>Reality: Most donors report feeling only a brief pinch when the needle is inserted, similar to a quick pinch. The actual donation process is typically painless. Donation centers use sterile, single-use needles and are staffed by professionals trained to make the experience as comfortable as possible.</p>
      
      <h3>Myth #2: "I don't have enough blood to spare"</h3>
      
      <p>Reality: The average adult has about 10 pints of blood in their body, and a typical donation is only about 1 pint (about 10% of your total blood volume). Your body replaces the fluid within 24 hours and regenerates the red blood cells within a few weeks.</p>
      
      <h3>Myth #3: "I'll get sick or weak after donating"</h3>
      
      <p>Reality: The vast majority of donors feel fine after donation. Blood centers provide refreshments to help replenish fluids and sugar. Following post-donation guidelines like drinking extra fluids, avoiding strenuous activities for 24 hours, and eating iron-rich foods helps ensure a smooth recovery.</p>
      
      <h3>Myth #4: "I can't donate because I have a common condition like diabetes or high blood pressure"</h3>
      
      <p>Reality: Many people with well-controlled chronic conditions can donate blood. Each donor undergoes a health screening, and eligibility is determined on an individual basis. Always check with the donation center if you're unsure about your eligibility.</p>
      
      <h3>Myth #5: "Blood donation centers already have enough blood"</h3>
      
      <p>Reality: Blood shortages are common, especially during holidays, summer months, and winter weather. Blood has a limited shelf life – red blood cells must be used within 42 days, and platelets within just 5 days. A continuous supply of new donations is essential.</p>
      
      <h3>Myth #6: "The process takes too long"</h3>
      
      <p>Reality: The entire process typically takes about an hour, with the actual blood collection only lasting 8-10 minutes. This small time commitment can save up to three lives.</p>
      
      <h3>Myth #7: "I can get diseases from donating blood"</h3>
      
      <p>Reality: This is impossible. All equipment used for blood donation is sterile and used only once. There is absolutely no risk of contracting any disease from the donation process.</p>
      
      <p>By understanding the facts about blood donation, more eligible donors might feel comfortable taking this life-saving step. If you have specific concerns about donating, speak with healthcare professionals at your local donation center who can provide personalized information.</p>
    `,
    tags: ["Myths", "Blood Donation Facts", "Donor Education", "Healthcare"],
  },
  {
    id: 3,
    title: "Preparing for Your First Blood Donation: What to Expect",
    image:
      "https://images.unsplash.com/photo-1579154341098-e4e158cc7f55?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    category: "Tips",
    date: "April 17, 2023",
    readTime: 6,
    author: "Jennifer Martinez",
    authorImage: "https://randomuser.me/api/portraits/women/63.jpg",
    excerpt:
      "Nervous about your first blood donation? This comprehensive guide will walk you through every step of the process and help you prepare properly.",
    content: `
      <p>Deciding to donate blood for the first time is a wonderful choice that can save lives. However, it's normal to feel nervous when you don't know what to expect. This guide will walk you through the entire process to help you feel prepared and confident.</p>
      
      <h3>Before Your Donation</h3>
      
      <p><strong>In the days leading up to your donation:</strong></p>
      <ul>
        <li>Eat iron-rich foods like lean red meat, spinach, beans, and fortified cereals</li>
        <li>Stay well-hydrated by drinking extra water</li>
        <li>Get a good night's sleep the night before</li>
        <li>Avoid fatty foods on the day of donation (they can affect blood tests)</li>
      </ul>
      
      <p><strong>Right before your appointment:</strong></p>
      <ul>
        <li>Eat a healthy meal within 3 hours of donating</li>
        <li>Drink an extra 16 oz of water</li>
        <li>Wear comfortable clothing with sleeves that can be raised above the elbow</li>
        <li>Bring your ID and list of medications you take</li>
      </ul>
      
      <h3>The Donation Process: Step by Step</h3>
      
      <p><strong>1. Registration</strong></p>
      <p>You'll check in, show identification, and complete a basic registration form. This typically takes about 10-15 minutes.</p>
      
      <p><strong>2. Health History and Mini-Physical</strong></p>
      <p>You'll answer questions about your health history and travel in a private setting. A technician will check your:</p>
      <ul>
        <li>Temperature</li>
        <li>Blood pressure</li>
        <li>Pulse</li>
        <li>Hemoglobin levels (via a quick finger prick)</li>
      </ul>
      
      <p><strong>3. The Donation</strong></p>
      <p>Once you're cleared to donate, you'll be seated in a comfortable chair. The technician will:</p>
      <ul>
        <li>Clean an area on your arm</li>
        <li>Insert a new, sterile needle</li>
        <li>Draw about a pint of blood (this takes around 8-10 minutes)</li>
      </ul>
      
      <p>Many people find it helpful to look away during the needle insertion and to bring a friend or something to distract them (like music or a podcast).</p>
      
      <p><strong>4. Recovery</strong></p>
      <p>After donating, you'll be given refreshments and asked to rest for 10-15 minutes. This allows staff to ensure you're feeling well before you leave.</p>
      
      <h3>After Your Donation</h3>
      
      <p>To take care of yourself after donating:</p>
      <ul>
        <li>Continue drinking extra fluids for 48 hours</li>
        <li>Avoid alcohol for 24 hours</li>
        <li>Avoid heavy lifting or strenuous exercise for 24 hours</li>
        <li>Keep the bandage on for several hours</li>
        <li>If you feel dizzy, sit or lie down until the feeling passes</li>
      </ul>
      
      <h3>Common First-Time Donor Concerns</h3>
      
      <p><strong>What if I'm afraid of needles?</strong><br>
      Many donors have this fear. Let the staff know—they're experienced in helping nervous donors. Looking away, practicing deep breathing, or talking with the technician can help distract you.</p>
      
      <p><strong>What if I feel faint?</strong><br>
      This happens to some donors, especially first-timers. The staff are well-trained to handle this situation. Staying well-hydrated and having a good meal beforehand reduces this risk significantly.</p>
      
      <p>Remember, your first donation might feel challenging, but it gets easier with experience. The momentary discomfort is nothing compared to the impact your donation will have—potentially saving up to three lives with just one donation.</p>
    `,
    tags: [
      "First Time Donors",
      "Preparation",
      "Blood Donation Process",
      "Donor Tips",
    ],
  },
  {
    id: 4,
    title: "Beyond Blood: Different Types of Donations That Save Lives",
    image:
      "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    category: "Education",
    date: "March 5, 2023",
    readTime: 7,
    author: "Dr. Robert Williams",
    authorImage: "https://randomuser.me/api/portraits/men/75.jpg",
    excerpt:
      "Beyond whole blood donation, there are several specialized donation types that help different patients. Learn about platelet, plasma, and power red donations.",
    content: `
      <p>When most people think of blood donation, they picture the standard whole blood donation that takes about 10 minutes. However, there are several specialized types of blood donations that help meet specific patient needs. Understanding these options can help you make an informed decision about how you might best contribute.</p>
      
      <h3>Whole Blood Donation</h3>
      
      <p>This is the most common type of blood donation, where you donate approximately one pint of blood. The blood is later separated into its components: red cells, plasma, and sometimes platelets.</p>
      
      <p><strong>Who it helps:</strong> Trauma patients, surgical patients, and those with anemia, among others.<br>
      <strong>Time commitment:</strong> About one hour from check-in to completion.<br>
      <strong>Donation frequency:</strong> Every 56 days (up to 6 times per year).</p>
      
      <h3>Platelet Donation (Plateletpheresis)</h3>
      
      <p>This specialized donation collects only platelets—tiny cells that help blood clot. During the process, a small amount of blood is drawn from your arm and passed through a machine that separates and collects the platelets while returning the other blood components back to you.</p>
      
      <p><strong>Who it helps:</strong> Cancer patients undergoing chemotherapy, those having organ transplants, and people with clotting disorders. Platelets are especially critical because they have a very short shelf life of just 5 days.<br>
      <strong>Time commitment:</strong> About 2-3 hours.<br>
      <strong>Donation frequency:</strong> Every 7 days, up to 24 times per year.</p>
      
      <h3>Plasma Donation</h3>
      
      <p>Plasma is the liquid portion of blood that carries the blood cells. Like platelet donation, plasma donation involves drawing blood, separating the plasma, and returning the red cells and platelets to your body.</p>
      
      <p><strong>Who it helps:</strong> Trauma patients, burn victims, and people with liver or clotting factor disorders. AB plasma is universally compatible, making AB donors especially valuable plasma donors.<br>
      <strong>Time commitment:</strong> About 1-2 hours.<br>
      <strong>Donation frequency:</strong> Every 28 days, up to 13 times per year.</p>
      
      <h3>Power Red Donation (Double Red Cell Donation)</h3>
      
      <p>This donation collects two units of red cells while returning your plasma and platelets. Like other specialized donations, a machine separates your blood components and returns what's not being collected.</p>
      
      <p><strong>Who it helps:</strong> Trauma victims, surgery patients, and those with anemia. Type O donors are especially needed for this type of donation.<br>
      <strong>Time commitment:</strong> About 1.5 hours.<br>
      <strong>Donation frequency:</strong> Every 112 days, up to 3 times per year.</p>
      
      <h3>Which Donation Type Is Right for You?</h3>
      
      <p>The "best" donation depends on several factors:</p>
      
      <p><strong>Your blood type:</strong> If you're Type O, your red cells are universally compatible, making whole blood or power red donations especially valuable. If you're Type AB, your plasma can be given to anyone, making plasma donation particularly impactful.</p>
      
      <p><strong>Your schedule:</strong> If you have more time to spare, platelet donations take longer but can be done more frequently and have a critical need.</p>
      
      <p><strong>Local needs:</strong> Blood centers often have specific current needs based on their patient population and inventory levels.</p>
      
      <p>When you contact your local blood center, they can help determine which type of donation would be most beneficial based on your blood type, physical eligibility, and current community needs.</p>
      
      <p>No matter which type of donation you choose, remember that every contribution helps save lives—whether you donate once or become a regular donor, your gift is invaluable to patients in need.</p>
    `,
    tags: [
      "Platelet Donation",
      "Plasma Donation",
      "Specialized Donations",
      "Blood Components",
    ],
  },
];
