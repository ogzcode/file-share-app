import { create } from "zustand";

export interface SelectedHost {
  hostName: string;
  ip: string;
  lastConnected: string;
}

interface HostStore {
  selectedHost: SelectedHost | null;
  addHost: (host: SelectedHost) => void;
  removeHost: (host: SelectedHost) => void;
}

export const useHostStore = create<HostStore>((set) => ({
  selectedHost: null,
  addHost: (host) => set({ selectedHost: host }),
  removeHost: () => set({ selectedHost: null }),
}));