const express = require('express');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// ── Mock Data ──────────────────────────────────────────────────────────────────

const babysitters = [
  {
    id: '1',
    name: 'Nour Mostafa',
    nameAr: 'نور مصطفى',
    age: 28,
    photo: null,
    experience: 5,
    rating: 4.9,
    reviewCount: 47,
    areas: ['Maadi', 'Dokki', 'Zamalek'],
    bio: 'Experienced and caring babysitter with a background in early childhood education. Fluent in Arabic and English. CPR certified and passionate about child development.',
    certifications: ['CPR Certified', 'Early Childhood Education Diploma'],
    languages: ['Arabic', 'English'],
    availability: 'Full-time',
    hourlyRate: 25,
    packages: ['daily', 'weekly', 'monthly'],
  },
  {
    id: '2',
    name: 'Fatima El-Sayed',
    nameAr: 'فاطمة السيد',
    age: 32,
    photo: null,
    experience: 8,
    rating: 4.8,
    reviewCount: 63,
    areas: ['Heliopolis', 'Nasr City', 'New Cairo'],
    bio: 'Dedicated nanny with 8 years of experience caring for children aged 0–12. Former kindergarten teacher, loves arts and crafts, storytelling, and outdoor activities.',
    certifications: ['First Aid', 'Kindergarten Teaching Certificate'],
    languages: ['Arabic', 'English', 'French'],
    availability: 'Full-time',
    hourlyRate: 30,
    packages: ['daily', 'weekly', 'monthly'],
  },
  {
    id: '3',
    name: 'Amira Hassan',
    nameAr: 'أميرة حسن',
    age: 24,
    photo: null,
    experience: 3,
    rating: 4.7,
    reviewCount: 29,
    areas: ['Zamalek', 'Mohandessin', 'Dokki'],
    bio: 'Young, energetic babysitter currently studying child psychology. Great with toddlers and school-age children. Provides homework help and fun educational activities.',
    certifications: ['CPR Certified'],
    languages: ['Arabic', 'English'],
    availability: 'Part-time',
    hourlyRate: 20,
    packages: ['daily', 'weekly'],
  },
  {
    id: '4',
    name: 'Hana Ibrahim',
    nameAr: 'هناء إبراهيم',
    age: 35,
    photo: null,
    experience: 10,
    rating: 5.0,
    reviewCount: 88,
    areas: ['New Cairo', 'Heliopolis', 'Nasr City'],
    bio: 'Senior nanny with over a decade of experience. Specializes in newborn care and infants. Gentle, patient, and deeply committed to providing a safe and loving environment.',
    certifications: ['Newborn Care Specialist', 'CPR & First Aid', 'Pediatric Nutrition'],
    languages: ['Arabic', 'English'],
    availability: 'Full-time',
    hourlyRate: 35,
    packages: ['daily', 'weekly', 'monthly'],
  },
  {
    id: '5',
    name: 'Sara Kamel',
    nameAr: 'سارة كامل',
    age: 27,
    photo: null,
    experience: 4,
    rating: 4.6,
    reviewCount: 34,
    areas: ['Maadi', 'New Cairo'],
    bio: 'Cheerful and responsible babysitter who enjoys creating a stimulating environment for children. Experienced with twins and multiple children. Great at managing routines.',
    certifications: ['CPR Certified', 'Child Behavior Management'],
    languages: ['Arabic', 'English'],
    availability: 'Full-time',
    hourlyRate: 22,
    packages: ['daily', 'weekly', 'monthly'],
  },
  {
    id: '6',
    name: 'Rana Mahmoud',
    nameAr: 'رنا محمود',
    age: 30,
    photo: null,
    experience: 6,
    rating: 4.8,
    reviewCount: 51,
    areas: ['6th of October', 'Mohandessin', 'Dokki'],
    bio: 'Warm and nurturing caregiver with experience in special needs support. Trained in positive discipline techniques and child-led learning approaches.',
    certifications: ['Special Needs Care', 'CPR Certified', 'Montessori Basics'],
    languages: ['Arabic', 'English'],
    availability: 'Full-time',
    hourlyRate: 28,
    packages: ['daily', 'weekly', 'monthly'],
  },
  {
    id: '7',
    name: 'Dina Youssef',
    nameAr: 'دينا يوسف',
    age: 26,
    photo: null,
    experience: 3,
    rating: 4.5,
    reviewCount: 22,
    areas: ['Nasr City', 'Heliopolis'],
    bio: 'Fun-loving and responsible babysitter with a talent for creative play. Background in arts education. Loves music, drawing, and helping children express themselves.',
    certifications: ['CPR Certified', 'Arts Education Workshop'],
    languages: ['Arabic', 'English'],
    availability: 'Part-time',
    hourlyRate: 18,
    packages: ['daily', 'weekly'],
  },
  {
    id: '8',
    name: 'Mona Abdel-Aziz',
    nameAr: 'منى عبد العزيز',
    age: 40,
    photo: null,
    experience: 15,
    rating: 4.9,
    reviewCount: 112,
    areas: ['Zamalek', 'Maadi', 'Heliopolis', 'New Cairo'],
    bio: 'Highly experienced nanny and household manager with 15 years caring for Cairo families. Excellent references. Fluent in three languages. Specializes in long-term placements.',
    certifications: ['Professional Nanny Certification', 'CPR & First Aid', 'Child Development'],
    languages: ['Arabic', 'English', 'French'],
    availability: 'Full-time',
    hourlyRate: 40,
    packages: ['weekly', 'monthly'],
  },
  {
    id: '9',
    name: 'Yasmin Nasser',
    nameAr: 'ياسمين ناصر',
    age: 23,
    photo: null,
    experience: 2,
    rating: 4.4,
    reviewCount: 15,
    areas: ['6th of October', 'Mohandessin'],
    bio: 'Recent graduate in education, enthusiastic and patient babysitter. Great with toddlers and pre-schoolers. Enjoys outdoor play, storytelling, and creative activities.',
    certifications: ['CPR Certified'],
    languages: ['Arabic', 'English'],
    availability: 'Part-time',
    hourlyRate: 15,
    packages: ['daily'],
  },
  {
    id: '10',
    name: 'Layla Omar',
    nameAr: 'ليلى عمر',
    age: 31,
    photo: null,
    experience: 7,
    rating: 4.7,
    reviewCount: 58,
    areas: ['Dokki', 'Mohandessin', '6th of October', 'Zamalek'],
    bio: 'Experienced and professional nanny with a calm, nurturing approach. Background in nursing, so well-equipped for children with health needs. Strong focus on safety and emotional well-being.',
    certifications: ['Nursing Degree', 'Pediatric First Aid', 'CPR Certified'],
    languages: ['Arabic', 'English'],
    availability: 'Full-time',
    hourlyRate: 32,
    packages: ['daily', 'weekly', 'monthly'],
  },
];

const packages = [
  {
    id: 'daily',
    name: 'Daily Package',
    nameAr: 'الباقة اليومية',
    price: 150,
    currency: 'EGP',
    description: 'Full day of childcare (up to 8 hours)',
    descriptionAr: 'رعاية كاملة لمدة يوم (حتى 8 ساعات)',
    duration: '1 day',
  },
  {
    id: 'weekly',
    name: 'Weekly Package',
    nameAr: 'الباقة الأسبوعية',
    price: 800,
    currency: 'EGP',
    description: '5 days per week, up to 8 hours daily',
    descriptionAr: '5 أيام في الأسبوع، حتى 8 ساعات يومياً',
    duration: '1 week',
  },
  {
    id: 'monthly',
    name: 'Monthly Package',
    nameAr: 'الباقة الشهرية',
    price: 2500,
    currency: 'EGP',
    description: 'Full month coverage, priority scheduling',
    descriptionAr: 'تغطية شهر كامل مع الأولوية في الجدولة',
    duration: '1 month',
  },
];

const customers = [
  {
    id: 'c1',
    name: 'Ahmed El-Masry',
    nameAr: 'أحمد المصري',
    email: 'ahmed.elmasry@email.com',
    phone: '+20 100 123 4567',
    area: 'Maadi',
    children: 2,
    childrenAges: [3, 6],
    bookings: 5,
    registeredAt: '2024-01-15',
    preferredBabysitter: 'Nour Mostafa',
  },
  {
    id: 'c2',
    name: 'Mariam Farouk',
    nameAr: 'مريم فاروق',
    email: 'mariam.farouk@email.com',
    phone: '+20 101 234 5678',
    area: 'New Cairo',
    children: 1,
    childrenAges: [1],
    bookings: 3,
    registeredAt: '2024-02-20',
    preferredBabysitter: 'Hana Ibrahim',
  },
  {
    id: 'c3',
    name: 'Khaled Nabil',
    nameAr: 'خالد نبيل',
    email: 'khaled.nabil@email.com',
    phone: '+20 102 345 6789',
    area: 'Zamalek',
    children: 3,
    childrenAges: [2, 5, 9],
    bookings: 8,
    registeredAt: '2023-11-05',
    preferredBabysitter: 'Mona Abdel-Aziz',
  },
  {
    id: 'c4',
    name: 'Nadia Salah',
    nameAr: 'نادية صلاح',
    email: 'nadia.salah@email.com',
    phone: '+20 103 456 7890',
    area: 'Heliopolis',
    children: 2,
    childrenAges: [4, 7],
    bookings: 6,
    registeredAt: '2024-03-10',
    preferredBabysitter: 'Fatima El-Sayed',
  },
  {
    id: 'c5',
    name: 'Omar Sherif',
    nameAr: 'عمر شريف',
    email: 'omar.sherif@email.com',
    phone: '+20 104 567 8901',
    area: 'Mohandessin',
    children: 1,
    childrenAges: [6],
    bookings: 2,
    registeredAt: '2024-04-18',
    preferredBabysitter: 'Rana Mahmoud',
  },
  {
    id: 'c6',
    name: 'Yasmine Adel',
    nameAr: 'ياسمين عادل',
    email: 'yasmine.adel@email.com',
    phone: '+20 105 678 9012',
    area: 'Nasr City',
    children: 2,
    childrenAges: [1, 4],
    bookings: 4,
    registeredAt: '2024-01-30',
    preferredBabysitter: 'Amira Hassan',
  },
];

// In-memory bookings store
const bookings = [];

// ── Routes ─────────────────────────────────────────────────────────────────────

// GET /api/babysitters — list all
app.get('/api/babysitters', (req, res) => {
  res.json({ success: true, data: babysitters, total: babysitters.length });
});

// GET /api/babysitters/:id — single profile
app.get('/api/babysitters/:id', (req, res) => {
  const sitter = babysitters.find((b) => b.id === req.params.id);
  if (!sitter) return res.status(404).json({ success: false, message: 'Babysitter not found' });
  res.json({ success: true, data: sitter });
});

// GET /api/search?q=&area=&minRating=&package=
app.get('/api/search', (req, res) => {
  const { q, area, minRating, package: pkg } = req.query;
  let results = [...babysitters];

  if (q) {
    const query = q.toLowerCase();
    results = results.filter(
      (b) =>
        b.name.toLowerCase().includes(query) ||
        b.nameAr.includes(q) ||
        b.bio.toLowerCase().includes(query)
    );
  }

  if (area) {
    results = results.filter((b) =>
      b.areas.some((a) => a.toLowerCase() === area.toLowerCase())
    );
  }

  if (minRating) {
    results = results.filter((b) => b.rating >= parseFloat(minRating));
  }

  if (pkg) {
    results = results.filter((b) => b.packages.includes(pkg));
  }

  res.json({ success: true, data: results, total: results.length });
});

// GET /api/packages
app.get('/api/packages', (req, res) => {
  res.json({ success: true, data: packages });
});

// POST /api/bookings
app.post('/api/bookings', (req, res) => {
  const { babysitterId, packageId, parentName, parentPhone, parentEmail, date } = req.body;

  if (!babysitterId || !packageId || !parentName || !parentPhone || !parentEmail) {
    return res.status(400).json({ success: false, message: 'Missing required fields' });
  }

  const sitter = babysitters.find((b) => b.id === babysitterId);
  if (!sitter) return res.status(404).json({ success: false, message: 'Babysitter not found' });

  const pkg = packages.find((p) => p.id === packageId);
  if (!pkg) return res.status(404).json({ success: false, message: 'Package not found' });

  const booking = {
    id: uuidv4(),
    babysitterId,
    babysitterName: sitter.name,
    packageId,
    packageName: pkg.name,
    price: pkg.price,
    currency: pkg.currency,
    parentName,
    parentPhone,
    parentEmail,
    date: date || new Date().toISOString().split('T')[0],
    status: 'confirmed',
    createdAt: new Date().toISOString(),
  };

  bookings.push(booking);
  res.status(201).json({ success: true, data: booking, message: 'Booking confirmed!' });
});

// GET /api/admin/customers — admin only
app.get('/api/admin/customers', (req, res) => {
  const adminKey = req.headers['x-admin-key'];
  if (adminKey !== 'admin123') {
    return res.status(403).json({ success: false, message: 'Unauthorized. Invalid admin key.' });
  }
  res.json({ success: true, data: customers, bookings, total: customers.length });
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ success: true, message: 'Cairo Babysitter API is running', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`Cairo Babysitter API running on http://localhost:${PORT}`);
});
