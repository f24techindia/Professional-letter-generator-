import { User, Course, Category, Analytics, Enrollment } from '../types';

export const mockUsers: User[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    role: 'admin',
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150',
    joinedAt: '2024-01-15',
    isActive: true,
    lastLogin: '2024-01-20'
  },
  {
    id: '2',
    name: 'Sarah Wilson',
    email: 'sarah@example.com',
    role: 'instructor',
    avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150',
    joinedAt: '2024-01-10',
    isActive: true,
    lastLogin: '2024-01-19'
  },
  {
    id: '3',
    name: 'Mike Johnson',
    email: 'mike@example.com',
    role: 'student',
    avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150',
    joinedAt: '2024-01-05',
    isActive: true,
    lastLogin: '2024-01-18'
  },
  {
    id: '4',
    name: 'Emily Davis',
    email: 'emily@example.com',
    role: 'instructor',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150',
    joinedAt: '2024-01-12',
    isActive: true,
    lastLogin: '2024-01-17'
  }
];

export const mockCourses: Course[] = [
  {
    id: '1',
    title: 'Complete React Development Course',
    description: 'Learn React from basics to advanced concepts including hooks, context, and modern patterns.',
    instructor: 'Sarah Wilson',
    instructorId: '2',
    category: 'Web Development',
    level: 'intermediate',
    duration: '12 hours',
    price: 99.99,
    thumbnail: 'https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?auto=compress&cs=tinysrgb&w=400',
    enrolledStudents: 1250,
    rating: 4.8,
    totalRatings: 324,
    isPublished: true,
    createdAt: '2024-01-10',
    updatedAt: '2024-01-15',
    lessons: [
      {
        id: '1',
        title: 'Introduction to React',
        description: 'Understanding React fundamentals and setup',
        duration: '45 min',
        order: 1,
        isPreview: true,
        materials: []
      },
      {
        id: '2',
        title: 'Components and JSX',
        description: 'Creating and using React components',
        duration: '60 min',
        order: 2,
        isPreview: false,
        materials: []
      }
    ]
  },
  {
    id: '2',
    title: 'Python for Data Science',
    description: 'Master Python programming for data analysis, visualization, and machine learning.',
    instructor: 'Emily Davis',
    instructorId: '4',
    category: 'Data Science',
    level: 'beginner',
    duration: '15 hours',
    price: 129.99,
    thumbnail: 'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=400',
    enrolledStudents: 890,
    rating: 4.6,
    totalRatings: 156,
    isPublished: true,
    createdAt: '2024-01-08',
    updatedAt: '2024-01-12',
    lessons: [
      {
        id: '3',
        title: 'Python Basics',
        description: 'Variables, data types, and control structures',
        duration: '50 min',
        order: 1,
        isPreview: true,
        materials: []
      }
    ]
  },
  {
    id: '3',
    title: 'Digital Marketing Masterclass',
    description: 'Complete guide to digital marketing including SEO, social media, and analytics.',
    instructor: 'Sarah Wilson',
    instructorId: '2',
    category: 'Marketing',
    level: 'intermediate',
    duration: '10 hours',
    price: 79.99,
    thumbnail: 'https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg?auto=compress&cs=tinysrgb&w=400',
    enrolledStudents: 567,
    rating: 4.7,
    totalRatings: 89,
    isPublished: true,
    createdAt: '2024-01-05',
    updatedAt: '2024-01-10',
    lessons: []
  }
];

export const mockCategories: Category[] = [
  {
    id: '1',
    name: 'Web Development',
    description: 'Frontend and backend web development courses',
    courseCount: 45,
    icon: 'Code'
  },
  {
    id: '2',
    name: 'Data Science',
    description: 'Data analysis, machine learning, and AI courses',
    courseCount: 32,
    icon: 'BarChart3'
  },
  {
    id: '3',
    name: 'Marketing',
    description: 'Digital marketing and business growth strategies',
    courseCount: 28,
    icon: 'TrendingUp'
  },
  {
    id: '4',
    name: 'Design',
    description: 'UI/UX design and graphic design courses',
    courseCount: 21,
    icon: 'Palette'
  }
];

export const mockAnalytics: Analytics = {
  totalStudents: 12450,
  totalCourses: 126,
  totalInstructors: 45,
  totalRevenue: 245680,
  monthlyRevenue: [
    { month: 'Jan', revenue: 45000, students: 1200 },
    { month: 'Feb', revenue: 52000, students: 1350 },
    { month: 'Mar', revenue: 48000, students: 1180 },
    { month: 'Apr', revenue: 61000, students: 1520 },
    { month: 'May', revenue: 58000, students: 1450 },
    { month: 'Jun', revenue: 67000, students: 1680 }
  ],
  popularCourses: [
    { title: 'Complete React Development', enrollments: 1250 },
    { title: 'Python for Data Science', enrollments: 890 },
    { title: 'Digital Marketing Masterclass', enrollments: 567 },
    { title: 'UI/UX Design Fundamentals', enrollments: 445 }
  ],
  categoryDistribution: [
    { category: 'Web Development', count: 45 },
    { category: 'Data Science', count: 32 },
    { category: 'Marketing', count: 28 },
    { category: 'Design', count: 21 }
  ]
};

export const mockEnrollments: Enrollment[] = [
  {
    id: '1',
    studentId: '3',
    courseId: '1',
    enrolledAt: '2024-01-15',
    progress: 65,
    completedLessons: ['1'],
    lastAccessedAt: '2024-01-18'
  }
];