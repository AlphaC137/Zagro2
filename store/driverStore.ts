import { create } from "zustand";
import { MarkerData } from "@/types/type";

interface DriverStore {
  drivers: MarkerData[] | null;
  selectedDriver: number | null;
  setDrivers: (drivers: MarkerData[]) => void;
  setSelectedDriver: (driverId: number) => void;
}

export const useDriverStore = create<DriverStore>((set) => ({
  drivers: null,
  selectedDriver: null,
  setDrivers: (drivers) => set({ drivers }),
  setSelectedDriver: (driverId) => set({ selectedDriver: driverId }),
}));
