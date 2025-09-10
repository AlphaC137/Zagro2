import { create } from "zustand";

interface Location {
  latitude?: number;
  longitude?: number;
  address?: string;
}

interface LocationStore {
  userLocation: Location;
  destinationLocation: Location;
  setUserLocation: (location: Location) => void;
  setDestinationLocation: (location: Location) => void;
  userLatitude?: number;
  userLongitude?: number;
  userAddress?: string;
  destinationLatitude?: number;
  destinationLongitude?: number;
  destinationAddress?: string;
}

export const useLocationStore = create<LocationStore>((set) => ({
  userLocation: {},
  destinationLocation: {},
  setUserLocation: (location) =>
    set((state) => ({
      userLocation: location,
      userLatitude: location.latitude,
      userLongitude: location.longitude,
      userAddress: location.address,
    })),
  setDestinationLocation: (location) =>
    set((state) => ({
      destinationLocation: location,
      destinationLatitude: location.latitude,
      destinationLongitude: location.longitude,
      destinationAddress: location.address,
    })),
  userLatitude: undefined,
  userLongitude: undefined,
  userAddress: undefined,
  destinationLatitude: undefined,
  destinationLongitude: undefined,
  destinationAddress: undefined,
}));
