import React, { useState, useEffect } from 'react';
import { CATEGORIES, THERAPISTS, WORKSHOPS, NEED_FILTERS, INITIAL_NOTIFICATIONS } from './data/mockData';
import { Therapist, TherapyService, VideoPersonality, Workshop, Booking, Category, UserRole, AppNotification } from './types';
import { MobileDeviceFrame } from './components/MobileDeviceFrame';
import { HomeScreen } from './components/HomeScreen';
import { FavoritesScreen } from './components/FavoritesScreen';
import { ProfileScreen } from './components/ProfileScreen';
import { TherapistDetailScreen } from './components/TherapistDetailScreen';
import { CategoriesGalleryScreen } from './components/CategoriesGalleryScreen';
import { TherapistsListScreen } from './components/TherapistsListScreen';
import { BottomNav, TabType } from './components/BottomNav';
import { VideoPlayerModal } from './components/VideoPlayerModal';
import { BookingScreen } from './components/BookingScreen';
import { WorkshopModal } from './components/WorkshopModal';
import { TherapyQuizModal } from './components/TherapyQuizModal';
import { OfflineIndicator } from './components/OfflineIndicator';
import { AdminDashboardScreen } from './components/AdminDashboardScreen';
import { NotificationDrawer } from './components/NotificationDrawer';
import { syncFavoritesToOfflineCache, initOfflineCache } from './utils/offlineCache';
import { runViewTransition } from './utils/viewTransition';

export default function App() {
  const [currentUserRole, setCurrentUserRole] = useState<UserRole>('cliente');
  const [activeTab, setActiveTab] = useState<TabType>('inicio');
  const [selectedTherapist, setSelectedTherapist] = useState<Therapist | null>(null);
  const [selectedCategoryForTherapists, setSelectedCategoryForTherapists] = useState<Category | null>(null);
  const [showCategoriesGallery, setShowCategoriesGallery] = useState(false);
  const [showAdminDashboard, setShowAdminDashboard] = useState(false);
  const [activeVideo, setActiveVideo] = useState<{ therapist: Therapist; video: VideoPersonality } | null>(null);
  const [bookingSession, setBookingSession] = useState<{ therapist: Therapist; service?: TherapyService } | null>(null);
  const [selectedWorkshop, setSelectedWorkshop] = useState<Workshop | null>(null);
  const [isQuizOpen, setIsQuizOpen] = useState(false);

  // Initial favorites populated with Lucía Luna
  const [favoriteIds, setFavoriteIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('yoli_favorites');
      return saved ? JSON.parse(saved) : ['lucia-luna'];
    } catch {
      return ['lucia-luna'];
    }
  });

  // Initial bookings populated for demonstration
  const [bookings, setBookings] = useState<Booking[]>(() => {
    try {
      const saved = localStorage.getItem('yoli_bookings');
      if (saved) return JSON.parse(saved);
    } catch {}
    return [
      {
        id: 'initial_book_1',
        therapistId: 'lucia-luna',
        therapistName: 'Lucía Luna',
        therapistAvatar: '/src/assets/images/therapist_sofia_reiki_1793833272999.jpg',
        serviceId: 'lucia-tarot-completo',
        serviceTitle: 'Tarot Completo Evolutivo',
        price: 50,
        durationMinutes: 60,
        date: '2026-10-28',
        time: '17:30',
        format: 'online',
        clientName: 'Gabriel',
        clientEmail: 'gabdiant@gmail.com',
        clientPhone: '+34 612 345 678',
        consultationReason: 'Orientación para nuevos proyectos y alineación de propósitos.',
        status: 'confirmada',
        createdAt: '2026-10-20T10:00:00Z'
      }
    ];
  });

  useEffect(() => {
    try {
      localStorage.setItem('yoli_favorites', JSON.stringify(favoriteIds));
      syncFavoritesToOfflineCache(favoriteIds);
    } catch {}
  }, [favoriteIds]);

  useEffect(() => {
    initOfflineCache(favoriteIds);
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('yoli_bookings', JSON.stringify(bookings));
    } catch {}
  }, [bookings]);

  // Always reset scroll container to top when changing screens/views
  useEffect(() => {
    const scrollContainer = document.getElementById('yoli-app-body');
    if (scrollContainer) {
      scrollContainer.scrollTop = 0;
    }
  }, [
    selectedTherapist?.id,
    selectedCategoryForTherapists?.id,
    bookingSession?.therapist.id,
    showCategoriesGallery,
    showAdminDashboard,
    activeTab
  ]);

  // Notifications State
  const [notifications, setNotifications] = useState<AppNotification[]>(() => {
    try {
      const saved = localStorage.getItem('yoli_notifications');
      if (saved) return JSON.parse(saved);
    } catch {}
    return INITIAL_NOTIFICATIONS;
  });
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem('yoli_notifications', JSON.stringify(notifications));
    } catch {}
  }, [notifications]);

  const handleMarkAllNotificationsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const handleClearAllNotifications = () => {
    setNotifications([]);
  };

  const handleNotificationClick = (notif: AppNotification) => {
    setNotifications(prev => 
      prev.map(n => n.id === notif.id ? { ...n, read: true } : n)
    );
    if (notif.linkTab === 'citas') {
      setIsNotificationsOpen(false);
      setBookingSession(null);
      setSelectedTherapist(null);
      setSelectedCategoryForTherapists(null);
      setShowCategoriesGallery(false);
      setShowAdminDashboard(false);
      setActiveTab('perfil');
    }
  };

  const handleToggleFavorite = (therapistId: string) => {
    setFavoriteIds(prev => 
      prev.includes(therapistId) 
        ? prev.filter(id => id !== therapistId)
        : [...prev, therapistId]
    );
  };

  const handleConfirmBooking = (newBooking: Booking) => {
    setBookings(prev => [newBooking, ...prev]);

    // Create persistent notification for confirmed booking
    const newNotif: AppNotification = {
      id: 'notif_' + Date.now(),
      type: 'cita_confirmada',
      title: 'Reserva Confirmada',
      message: `Tu consulta de ${newBooking.serviceTitle} con ${newBooking.therapistName} quedó agendada para el ${newBooking.date} a las ${newBooking.time}.`,
      date: 'Ahora mismo',
      read: false,
      bookingId: newBooking.id,
      linkTab: 'citas'
    };
    setNotifications(prev => [newNotif, ...prev]);
  };

  const handleBookWorkshop = (workshop: Workshop, name: string, email: string) => {
    const newBooking: Booking = {
      id: 'ws_book_' + Date.now(),
      therapistId: workshop.category,
      therapistName: workshop.therapistName,
      therapistAvatar: workshop.therapistAvatar,
      serviceId: workshop.id,
      serviceTitle: workshop.title,
      price: workshop.price,
      durationMinutes: 120,
      date: workshop.dateBadge,
      time: workshop.time,
      format: workshop.format,
      clientName: name,
      clientEmail: email,
      clientPhone: '',
      consultationReason: 'Inscripción a taller grupal',
      status: 'confirmada',
      createdAt: new Date().toISOString()
    };
    setBookings(prev => [newBooking, ...prev]);

    const wsNotif: AppNotification = {
      id: 'notif_' + Date.now(),
      type: 'taller',
      title: 'Inscripción a Taller Confirmada',
      message: `Te has inscrito en "${workshop.title}" para el ${workshop.dateBadge} a las ${workshop.time}.`,
      date: 'Ahora mismo',
      read: false
    };
    setNotifications(prev => [wsNotif, ...prev]);
  };

  const handleTabChange = (tab: TabType) => {
    runViewTransition(() => {
      setBookingSession(null);
      setSelectedTherapist(null);
      setSelectedCategoryForTherapists(null);
      setShowCategoriesGallery(false);
      setShowAdminDashboard(false);
      setActiveTab(tab);
    });
  };

  const favoriteTherapists = THERAPISTS.filter(t => favoriteIds.includes(t.id));

  return (
    <MobileDeviceFrame
      userRole={currentUserRole}
      onSwitchRole={(role) => {
        runViewTransition(() => {
          setCurrentUserRole(role);
          if (role !== 'administrador' && showAdminDashboard) {
            setShowAdminDashboard(false);
          }
        });
      }}
      onOpenAdminDashboard={() => runViewTransition(() => setShowAdminDashboard(true))}
      bottomBar={
        <BottomNav
          activeTab={activeTab}
          onTabChange={handleTabChange}
          favoritesCount={favoriteIds.length}
        />
      }
    >
      <OfflineIndicator />
      {/* 
        Persistent View Router:
        1. If viewing Admin Dashboard: shows AdminDashboardScreen (exclusive to admin)
        2. If booking a session: shows BookingScreen (dedicated page, no popup)
        3. If looking at Therapist Detail: shows TherapistDetailScreen
        4. If looking at Therapists for a Category: shows TherapistsListScreen
        5. If looking at Categories Gallery: shows CategoriesGalleryScreen
        6. Otherwise shows active tab (Inicio / Favoritos / Perfil)
      */}
      {showAdminDashboard ? (
        <AdminDashboardScreen
          bookings={bookings}
          onBack={() => runViewTransition(() => setShowAdminDashboard(false))}
          onExplore={() => {
            runViewTransition(() => {
              setShowAdminDashboard(false);
              setActiveTab('inicio');
            });
          }}
        />
      ) : bookingSession ? (
        <BookingScreen
          therapist={bookingSession.therapist}
          initialService={bookingSession.service}
          onBack={() => runViewTransition(() => setBookingSession(null))}
          onConfirmBooking={handleConfirmBooking}
          onGoToBookings={() => {
            runViewTransition(() => {
              setBookingSession(null);
              setSelectedTherapist(null);
              setSelectedCategoryForTherapists(null);
              setShowCategoriesGallery(false);
              setShowAdminDashboard(false);
              setActiveTab('perfil');
            });
          }}
        />
      ) : selectedTherapist ? (
        <TherapistDetailScreen
          therapist={selectedTherapist}
          isFavorite={favoriteIds.includes(selectedTherapist.id)}
          userRole={currentUserRole}
          onToggleFavorite={handleToggleFavorite}
          onBack={() => runViewTransition(() => setSelectedTherapist(null))}
          onOpenVideo={(video) => runViewTransition(() => setActiveVideo({ therapist: selectedTherapist, video }))}
          onBookService={(service) => runViewTransition(() => setBookingSession({ therapist: selectedTherapist, service }))}
        />
      ) : selectedCategoryForTherapists ? (
        <TherapistsListScreen
          category={selectedCategoryForTherapists}
          therapists={THERAPISTS}
          favoriteIds={favoriteIds}
          onBack={() => runViewTransition(() => setSelectedCategoryForTherapists(null))}
          onSelectTherapist={(t) => runViewTransition(() => setSelectedTherapist(t))}
          onToggleFavorite={handleToggleFavorite}
        />
      ) : showCategoriesGallery ? (
        <CategoriesGalleryScreen
          categories={CATEGORIES}
          onBack={() => runViewTransition(() => setShowCategoriesGallery(false))}
          onSelectCategory={(categoryId) => {
            const cat = CATEGORIES.find(c => c.id === categoryId);
            runViewTransition(() => {
              setShowCategoriesGallery(false);
              if (cat) {
                setSelectedCategoryForTherapists(cat);
              }
            });
          }}
        />
      ) : (
        <>
          {activeTab === 'inicio' && (
            <HomeScreen
              categories={CATEGORIES}
              therapists={THERAPISTS}
              workshops={WORKSHOPS}
              needFilters={NEED_FILTERS}
              favoriteIds={favoriteIds}
              unreadNotificationsCount={notifications.filter(n => !n.read).length}
              onOpenNotifications={() => setIsNotificationsOpen(true)}
              onToggleFavorite={handleToggleFavorite}
              onSelectTherapist={(t) => runViewTransition(() => setSelectedTherapist(t))}
              onSelectWorkshop={(ws) => runViewTransition(() => setSelectedWorkshop(ws))}
              onOpenQuiz={() => runViewTransition(() => setIsQuizOpen(true))}
              onNavigateToCategoriesGallery={() => runViewTransition(() => setShowCategoriesGallery(true))}
              onNavigateToCategoryTherapists={(cat) => runViewTransition(() => setSelectedCategoryForTherapists(cat))}
            />
          )}

          {activeTab === 'favoritos' && (
            <FavoritesScreen
              favoriteTherapists={favoriteTherapists}
              onSelectTherapist={(t) => runViewTransition(() => setSelectedTherapist(t))}
              onToggleFavorite={handleToggleFavorite}
              onExplore={() => {
                runViewTransition(() => {
                  setSelectedTherapist(null);
                  setSelectedCategoryForTherapists(null);
                  setActiveTab('inicio');
                });
              }}
            />
          )}

          {activeTab === 'perfil' && (
            <ProfileScreen
              bookings={bookings}
              therapists={THERAPISTS}
              currentUserRole={currentUserRole}
              onOpenAdminDashboard={() => runViewTransition(() => setShowAdminDashboard(true))}
              onViewTherapistProfile={() => {
                const lucia = THERAPISTS.find(t => t.id === 'lucia-luna') || THERAPISTS[0];
                runViewTransition(() => setSelectedTherapist(lucia));
              }}
              onExplore={() => {
                runViewTransition(() => {
                  setSelectedTherapist(null);
                  setSelectedCategoryForTherapists(null);
                  setShowAdminDashboard(false);
                  setActiveTab('inicio');
                });
              }}
            />
          )}
        </>
      )}

      {/* Interactive Notification Drawer */}
      <NotificationDrawer
        isOpen={isNotificationsOpen}
        onClose={() => setIsNotificationsOpen(false)}
        notifications={notifications}
        onMarkAllAsRead={handleMarkAllNotificationsRead}
        onNotificationClick={handleNotificationClick}
        onClearAll={handleClearAllNotifications}
      />

      {/* Video Player Modal (for Personality Reels) */}
      {activeVideo && (
        <VideoPlayerModal
          therapist={activeVideo.therapist}
          video={activeVideo.video}
          onClose={() => runViewTransition(() => setActiveVideo(null))}
          onBookNow={() => {
            const th = activeVideo.therapist;
            runViewTransition(() => {
              setActiveVideo(null);
              setBookingSession({ therapist: th });
            });
          }}
        />
      )}

      {/* Workshop Registration Modal */}
      {selectedWorkshop && (
        <WorkshopModal
          workshop={selectedWorkshop}
          onClose={() => runViewTransition(() => setSelectedWorkshop(null))}
          onBookWorkshop={handleBookWorkshop}
        />
      )}

      {/* Therapy Recommendation Quiz Modal */}
      {isQuizOpen && (
        <TherapyQuizModal
          therapists={THERAPISTS}
          onClose={() => runViewTransition(() => setIsQuizOpen(false))}
          onSelectTherapist={(t) => {
            runViewTransition(() => {
              setIsQuizOpen(false);
              setSelectedTherapist(t);
            });
          }}
        />
      )}
    </MobileDeviceFrame>
  );
}
