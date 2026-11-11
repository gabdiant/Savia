export type TherapyFormat = 'online' | 'presencial' | 'ambos';
export type UserRole = 'cliente' | 'terapeuta' | 'administrador';

export interface TherapyService {
  id: string;
  title: string;
  price: number;
  durationMinutes: number;
  description: string;
  format: TherapyFormat;
  popular?: boolean;
}

export interface VideoPersonality {
  id: string;
  title: string;
  duration: string;
  thumbnail: string;
  summary: string;
  videoUrl?: string;
}

export interface Review {
  id: string;
  author: string;
  avatar?: string;
  date: string;
  rating: number;
  comment: string;
  therapyTitle: string;
}

export interface SocialLinks {
  enabled?: boolean;
  instagram?: string;
  whatsapp?: string;
  tiktok?: string;
  youtube?: string;
  website?: string;
  linkedin?: string;
}

export interface Therapist {
  id: string;
  name: string;
  headline: string;
  avatar: string;
  rating: number;
  reviewCount: number;
  bio: string;
  specialties: string[];
  formats: TherapyFormat[];
  city?: string;
  address?: string;
  isFeatured?: boolean;
  badge?: 'Nuevo' | 'Destacado' | 'Oferta' | 'Top Valorado';
  services: TherapyService[];
  videos: VideoPersonality[];
  reviews: Review[];
  availableDays: string[];
  socialLinks?: SocialLinks;
}

export interface Category {
  id: string;
  name: string;
  iconName: string;
  colorBg: string;
  colorText: string;
  accentColor: string;
  description: string;
}

export interface Workshop {
  id: string;
  title: string;
  therapistName: string;
  therapistAvatar: string;
  date: string;
  dateBadge: string;
  time: string;
  price: number;
  image: string;
  format: TherapyFormat;
  city?: string;
  category: string;
  spotsLeft: number;
  description: string;
}

export interface Booking {
  id: string;
  therapistId: string;
  therapistName: string;
  therapistAvatar: string;
  serviceId: string;
  serviceTitle: string;
  price: number;
  durationMinutes: number;
  date: string;
  time: string;
  format: TherapyFormat;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  consultationReason?: string;
  status: 'confirmada' | 'pendiente' | 'completada';
  createdAt: string;
}

export interface NeedFilter {
  id: string;
  label: string;
  categoryIds: string[];
  description: string;
}

export interface ClientProfile {
  name: string;
  email: string;
  age: number | string;
  gender: string;
  avatar: string;
  phone?: string;
  consultationNotes?: string;
}

export interface TherapistApplication {
  id: string;
  name: string;
  email: string;
  phone: string;
  city: string;
  avatar: string;
  headline: string;
  specialties: string[];
  formats: TherapyFormat[];
  experienceYears: number;
  certifications: string[];
  bio: string;
  status: 'pendiente' | 'aprobado' | 'rechazado';
  appliedDate: string;
  reviewNotes?: string;
}

export interface DaySchedule {
  enabled: boolean;
  slots: string[];
}

export interface TherapistSchedule {
  therapistId: string;
  scheduleMode: 'uniform' | 'daily'; // 'uniform': mismo horario para todos | 'daily': horario por día
  slotDurationMinutes: 30 | 45 | 60;  // 30, 45, 60 min
  uniformSlots: string[];
  dailySchedules: {
    [dayOfWeek: number]: DaySchedule; // 0 = Domingo, 1 = Lunes, ..., 6 = Sábado
  };
  blockedDates: string[]; // Fechas 'YYYY-MM-DD'
}

export interface AppNotification {
  id: string;
  type: 'cita_confirmada' | 'recordatorio' | 'taller' | 'sistema';
  title: string;
  message: string;
  date: string;
  read: boolean;
  bookingId?: string;
  therapistId?: string;
  linkTab?: string;
}
