"use client";

import { openReserve } from "@/features/ui/uiSlice";
import { useAppDispatch } from "@/store/hooks";

export function MobileReserveBar() {
  const dispatch = useAppDispatch();

  return (
    <div className="mobile-reserve-bar">
      <button
        type="button"
        className="btn btn-primary w-full"
        onClick={() => dispatch(openReserve())}
      >
        Reserve a table
      </button>
    </div>
  );
}
