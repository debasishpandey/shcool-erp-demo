// Mock Syllabus Data for the School ERP Demo
// Single source of truth — filtered by role (Principal / Class Teacher / Subject Teacher)

export const syllabusMockData = [
  // ─── VIII-A ───
  {
    class: "VIII", section: "A", subject: "Mathematics", teacher: "Sunita Sharma",
    chapters: [
      { id: 1, name: "Rational Numbers", status: "Completed", completionDate: "2026-06-15", remarks: "" },
      { id: 2, name: "Linear Equations in One Variable", status: "Completed", completionDate: "2026-06-28", remarks: "" },
      { id: 3, name: "Understanding Quadrilaterals", status: "Completed", completionDate: "2026-07-12", remarks: "" },
      { id: 4, name: "Data Handling", status: "Completed", completionDate: "2026-07-22", remarks: "" },
      { id: 5, name: "Squares and Square Roots", status: "Completed", completionDate: "2026-08-05", remarks: "" },
      { id: 6, name: "Cubes and Cube Roots", status: "In Progress", completionDate: null, remarks: "Expected by 5 Sep" },
      { id: 7, name: "Comparing Quantities", status: "Not Started", completionDate: null, remarks: "" },
      { id: 8, name: "Algebraic Expressions and Identities", status: "Not Started", completionDate: null, remarks: "" },
      { id: 9, name: "Mensuration", status: "Not Started", completionDate: null, remarks: "" },
      { id: 10, name: "Exponents and Powers", status: "Not Started", completionDate: null, remarks: "" },
    ]
  },
  {
    class: "VIII", section: "A", subject: "Science", teacher: "Ravi Shankar",
    chapters: [
      { id: 1, name: "Crop Production and Management", status: "Completed", completionDate: "2026-06-18", remarks: "" },
      { id: 2, name: "Microorganisms: Friend and Foe", status: "Completed", completionDate: "2026-07-02", remarks: "" },
      { id: 3, name: "Synthetic Fibres and Plastics", status: "Completed", completionDate: "2026-07-15", remarks: "" },
      { id: 4, name: "Materials: Metals and Non-Metals", status: "Completed", completionDate: "2026-07-28", remarks: "" },
      { id: 5, name: "Coal and Petroleum", status: "In Progress", completionDate: null, remarks: "Ongoing" },
      { id: 6, name: "Combustion and Flame", status: "Not Started", completionDate: null, remarks: "" },
      { id: 7, name: "Conservation of Plants and Animals", status: "Not Started", completionDate: null, remarks: "" },
      { id: 8, name: "Cell — Structure and Functions", status: "Not Started", completionDate: null, remarks: "" },
    ]
  },
  {
    class: "VIII", section: "A", subject: "English", teacher: "Neha Patel",
    chapters: [
      { id: 1, name: "The Best Christmas Present", status: "Completed", completionDate: "2026-06-12", remarks: "" },
      { id: 2, name: "The Tsunami", status: "Completed", completionDate: "2026-06-25", remarks: "" },
      { id: 3, name: "Glimpses of the Past", status: "Completed", completionDate: "2026-07-10", remarks: "" },
      { id: 4, name: "Bepin Choudhury's Lapse of Memory", status: "Completed", completionDate: "2026-07-24", remarks: "" },
      { id: 5, name: "The Summit Within", status: "Completed", completionDate: "2026-08-08", remarks: "" },
      { id: 6, name: "This is Jody's Fawn", status: "In Progress", completionDate: null, remarks: "" },
      { id: 7, name: "A Visit to Cambridge", status: "Not Started", completionDate: null, remarks: "" },
      { id: 8, name: "A Short Monsoon Diary", status: "Not Started", completionDate: null, remarks: "" },
    ]
  },
  {
    class: "VIII", section: "A", subject: "Social Science", teacher: "Meenakshi Iyer",
    chapters: [
      { id: 1, name: "How, When and Where", status: "Completed", completionDate: "2026-06-20", remarks: "" },
      { id: 2, name: "From Trade to Territory", status: "Completed", completionDate: "2026-07-05", remarks: "" },
      { id: 3, name: "Ruling the Countryside", status: "Completed", completionDate: "2026-07-18", remarks: "" },
      { id: 4, name: "Tribals, Dikus and the Vision of a Golden Age", status: "In Progress", completionDate: null, remarks: "" },
      { id: 5, name: "When People Rebel", status: "Not Started", completionDate: null, remarks: "" },
      { id: 6, name: "Weavers, Iron Smelters and Factory Owners", status: "Not Started", completionDate: null, remarks: "" },
      { id: 7, name: "Civilising the 'Native', Educating the Nation", status: "Not Started", completionDate: null, remarks: "" },
      { id: 8, name: "Women, Caste and Reform", status: "Not Started", completionDate: null, remarks: "" },
    ]
  },
  {
    class: "VIII", section: "A", subject: "Hindi", teacher: "Priya Verma",
    chapters: [
      { id: 1, name: "ध्वनि (Dhvani)", status: "Completed", completionDate: "2026-06-14", remarks: "" },
      { id: 2, name: "लाख की चूड़ियाँ (Laakh ki Choodiyaan)", status: "Completed", completionDate: "2026-06-30", remarks: "" },
      { id: 3, name: "बस की यात्रा (Bus ki Yatra)", status: "Completed", completionDate: "2026-07-14", remarks: "" },
      { id: 4, name: "दीवानों की हस्ती (Deewaanon ki Hasti)", status: "Completed", completionDate: "2026-07-28", remarks: "" },
      { id: 5, name: "चिट्ठियों की अनूठी दुनिया (Chitthiyon ki Anoothi Duniya)", status: "In Progress", completionDate: null, remarks: "" },
      { id: 6, name: "क्या निराश हुआ जाए (Kya Nirash Hua Jaye)", status: "Not Started", completionDate: null, remarks: "" },
      { id: 7, name: "यह सबसे कठिन समय नहीं (Yeh Sabse Kathin Samay Nahi)", status: "Not Started", completionDate: null, remarks: "" },
    ]
  },

  // ─── IX-B ───
  {
    class: "IX", section: "B", subject: "Mathematics", teacher: "Sunita Sharma",
    chapters: [
      { id: 1, name: "Number Systems", status: "Completed", completionDate: "2026-06-20", remarks: "" },
      { id: 2, name: "Polynomials", status: "Completed", completionDate: "2026-07-05", remarks: "" },
      { id: 3, name: "Coordinate Geometry", status: "Completed", completionDate: "2026-07-20", remarks: "" },
      { id: 4, name: "Linear Equations in Two Variables", status: "In Progress", completionDate: null, remarks: "Slow progress" },
      { id: 5, name: "Introduction to Euclid's Geometry", status: "Not Started", completionDate: null, remarks: "" },
      { id: 6, name: "Lines and Angles", status: "Not Started", completionDate: null, remarks: "" },
      { id: 7, name: "Triangles", status: "Not Started", completionDate: null, remarks: "" },
      { id: 8, name: "Quadrilaterals", status: "Not Started", completionDate: null, remarks: "" },
      { id: 9, name: "Statistics", status: "Not Started", completionDate: null, remarks: "" },
      { id: 10, name: "Probability", status: "Not Started", completionDate: null, remarks: "" },
    ]
  },
  {
    class: "IX", section: "B", subject: "Science", teacher: "Ravi Shankar",
    chapters: [
      { id: 1, name: "Matter in Our Surroundings", status: "Completed", completionDate: "2026-06-22", remarks: "" },
      { id: 2, name: "Is Matter Around Us Pure", status: "Completed", completionDate: "2026-07-08", remarks: "" },
      { id: 3, name: "Atoms and Molecules", status: "In Progress", completionDate: null, remarks: "" },
      { id: 4, name: "Structure of the Atom", status: "Not Started", completionDate: null, remarks: "" },
      { id: 5, name: "The Fundamental Unit of Life", status: "Not Started", completionDate: null, remarks: "" },
      { id: 6, name: "Tissues", status: "Not Started", completionDate: null, remarks: "" },
      { id: 7, name: "Motion", status: "Not Started", completionDate: null, remarks: "" },
      { id: 8, name: "Force and Laws of Motion", status: "Not Started", completionDate: null, remarks: "" },
    ]
  },
  {
    class: "IX", section: "B", subject: "English", teacher: "Neha Patel",
    chapters: [
      { id: 1, name: "The Fun They Had", status: "Completed", completionDate: "2026-06-15", remarks: "" },
      { id: 2, name: "The Sound of Music", status: "Completed", completionDate: "2026-06-30", remarks: "" },
      { id: 3, name: "The Little Girl", status: "Completed", completionDate: "2026-07-14", remarks: "" },
      { id: 4, name: "A Truly Beautiful Mind", status: "Completed", completionDate: "2026-07-30", remarks: "" },
      { id: 5, name: "The Snake and the Mirror", status: "In Progress", completionDate: null, remarks: "" },
      { id: 6, name: "My Childhood", status: "Not Started", completionDate: null, remarks: "" },
      { id: 7, name: "Reach for the Top", status: "Not Started", completionDate: null, remarks: "" },
    ]
  },

  // ─── X-A ───
  {
    class: "X", section: "A", subject: "Mathematics", teacher: "Sunita Sharma",
    chapters: [
      { id: 1, name: "Real Numbers", status: "Completed", completionDate: "2026-06-18", remarks: "" },
      { id: 2, name: "Polynomials", status: "Completed", completionDate: "2026-07-02", remarks: "" },
      { id: 3, name: "Pair of Linear Equations", status: "Completed", completionDate: "2026-07-18", remarks: "" },
      { id: 4, name: "Quadratic Equations", status: "Completed", completionDate: "2026-08-02", remarks: "" },
      { id: 5, name: "Arithmetic Progressions", status: "In Progress", completionDate: null, remarks: "" },
      { id: 6, name: "Triangles", status: "Not Started", completionDate: null, remarks: "" },
      { id: 7, name: "Coordinate Geometry", status: "Not Started", completionDate: null, remarks: "" },
      { id: 8, name: "Introduction to Trigonometry", status: "Not Started", completionDate: null, remarks: "" },
      { id: 9, name: "Surface Areas and Volumes", status: "Not Started", completionDate: null, remarks: "" },
      { id: 10, name: "Statistics", status: "Not Started", completionDate: null, remarks: "" },
    ]
  },
  {
    class: "X", section: "A", subject: "Science", teacher: "Ravi Shankar",
    chapters: [
      { id: 1, name: "Chemical Reactions and Equations", status: "Completed", completionDate: "2026-06-20", remarks: "" },
      { id: 2, name: "Acids, Bases and Salts", status: "Completed", completionDate: "2026-07-05", remarks: "" },
      { id: 3, name: "Metals and Non-metals", status: "Completed", completionDate: "2026-07-22", remarks: "" },
      { id: 4, name: "Carbon and its Compounds", status: "Completed", completionDate: "2026-08-06", remarks: "" },
      { id: 5, name: "Life Processes", status: "Completed", completionDate: "2026-08-20", remarks: "" },
      { id: 6, name: "Control and Coordination", status: "In Progress", completionDate: null, remarks: "" },
      { id: 7, name: "Light — Reflection and Refraction", status: "Not Started", completionDate: null, remarks: "" },
      { id: 8, name: "Electricity", status: "Not Started", completionDate: null, remarks: "" },
    ]
  },
  {
    class: "X", section: "A", subject: "English", teacher: "Neha Patel",
    chapters: [
      { id: 1, name: "A Letter to God", status: "Completed", completionDate: "2026-06-12", remarks: "" },
      { id: 2, name: "Nelson Mandela", status: "Completed", completionDate: "2026-06-28", remarks: "" },
      { id: 3, name: "Two Stories about Flying", status: "Completed", completionDate: "2026-07-12", remarks: "" },
      { id: 4, name: "From the Diary of Anne Frank", status: "Completed", completionDate: "2026-07-28", remarks: "" },
      { id: 5, name: "The Hundred Dresses — I", status: "Completed", completionDate: "2026-08-10", remarks: "" },
      { id: 6, name: "The Hundred Dresses — II", status: "In Progress", completionDate: null, remarks: "" },
      { id: 7, name: "Glimpses of India", status: "Not Started", completionDate: null, remarks: "" },
    ]
  },
];

// Helper: compute progress for a syllabus entry
export function getSyllabusProgress(entry) {
  const total = entry.chapters.length;
  const completed = entry.chapters.filter(c => c.status === "Completed").length;
  const inProgress = entry.chapters.filter(c => c.status === "In Progress").length;
  const notStarted = entry.chapters.filter(c => c.status === "Not Started").length;
  const percent = total > 0 ? Math.round((completed / total) * 100) : 0;
  const behindSchedule = percent < 40;
  return { total, completed, inProgress, notStarted, percent, behindSchedule };
}
