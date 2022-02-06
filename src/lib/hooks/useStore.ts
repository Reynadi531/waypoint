/* eslint-disable @typescript-eslint/no-explicit-any */
import create from "zustand";

type UniversalStore = {
  isAddingForm: boolean;
};

const useStore = create<UniversalStore>(() => ({
  isAddingForm: false,
}));

export default useStore;
