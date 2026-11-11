import { useState, useEffect } from 'react';
import { Therapist, Workshop, Category } from '../types';
import { THERAPISTS, WORKSHOPS, CATEGORIES } from '../data/mockData';

const CACHE_KEY = 'yoli_offline_cache_v1';

export interface OfflineCacheData {
  lastUpdated: string;
  therapists: Therapist[];
  workshops: Workshop[];
  categories: Category[];
  favoriteIds: string[];
}

// Initialize cache with default data if empty
export function initOfflineCache(favoriteIds: string[] = ['lucia-luna']): OfflineCacheData {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as OfflineCacheData;
      // Sync favorites if provided
      if (favoriteIds && favoriteIds.length > 0) {
        parsed.favoriteIds = favoriteIds;
        localStorage.setItem(CACHE_KEY, JSON.stringify(parsed));
      }
      return parsed;
    }
  } catch (e) {
    console.warn('Error reading offline cache', e);
  }

  const initialData: OfflineCacheData = {
    lastUpdated: new Date().toISOString(),
    therapists: THERAPISTS,
    workshops: WORKSHOPS,
    categories: CATEGORIES,
    favoriteIds
  };

  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify(initialData));
  } catch (e) {
    console.warn('Error storing offline cache', e);
  }

  return initialData;
}

// Update favorites snapshot in cache
export function syncFavoritesToOfflineCache(favoriteIds: string[]) {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    const data: OfflineCacheData = raw ? JSON.parse(raw) : {
      lastUpdated: new Date().toISOString(),
      therapists: THERAPISTS,
      workshops: WORKSHOPS,
      categories: CATEGORIES,
      favoriteIds: []
    };

    data.favoriteIds = favoriteIds;
    data.lastUpdated = new Date().toISOString();
    localStorage.setItem(CACHE_KEY, JSON.stringify(data));
  } catch (e) {
    console.warn('Error syncing favorites to cache', e);
  }
}

// Get cached data when offline
export function getOfflineData(): OfflineCacheData {
  return initOfflineCache();
}

// Hook to detect online / offline status
export function useOnlineStatus() {
  const [isOnline, setIsOnline] = useState<boolean>(
    typeof navigator !== 'undefined' ? navigator.onLine : true
  );

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return isOnline;
}
