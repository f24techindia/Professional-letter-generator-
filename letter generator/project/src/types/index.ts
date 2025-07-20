export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'instructor' | 'student';
  avatar?: string;
  joinedAt: string;
  isActive: boolean;
  lastLogin?: string;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  instructor: string;
  instructorId: string;
  category: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  duration: string;
  price: number;
  thumbnail: string;
  enrolledStudents: number;
  rating: number;
  totalRatings: number;
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
  lessons: Lesson[];
}

export interface Lesson {
  id: string;
  title: string;
  description: string;
  videoUrl?: string;
  duration: string;
  order: number;
  isPreview: boolean;
  materials: LessonMaterial[];
}

export interface LessonMaterial {
  id: string;
  title: string;
  type: 'pdf' | 'video' | 'quiz' | 'assignment';
  url: string;
  size?: string;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  courseCount: number;
  icon: string;
}

export interface Analytics {
  totalStudents: number;
  totalCourses: number;
  totalInstructors: number;
  totalRevenue: number;
  monthlyRevenue: Array<{
    month: string;
    revenue: number;
    students: number;
  }>;
  popularCourses: Array<{
    title: string;
    enrollments: number;
  }>;
  categoryDistribution: Array<{
    category: string;
    count: number;
  }>;
}

export interface Enrollment {
  id: string;
  studentId: string;
  courseId: string;
  enrolledAt: string;
  progress: number;
  completedLessons: string[];
  lastAccessedAt: string;
}