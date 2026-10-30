"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { useCallback, useRef } from "react";
import { closeReserve } from "@/features/ui/uiSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { ReservationForm } from "./ReservationForm";

export function ReservationDrawer() {
  const open = useAppSelector((s) => s.ui.reserveOpen);
  const dispatch = useAppDispatch();
  const scrollRef = useRef<HTMLDivElement>(null);

  const stopPageScroll = useCallback((event: React.WheelEvent | React.TouchEvent) => {
    event.stopPropagation();
  }, []);

  return (
    <Dialog.Root
      open={open}
      onOpenChange={(next) => {
        if (!next) dispatch(closeReserve());
      }}
    >
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[60] bg-ink/45 data-[state=open]:animate-[fadeIn_350ms_var(--ease-reserve)]" />
        <Dialog.Content
          className="fixed inset-y-0 right-0 z-[70] flex h-dvh w-full max-w-md flex-col overflow-hidden bg-cream shadow-2xl outline-none data-[state=open]:animate-[slideIn_350ms_var(--ease-reserve)]"
          aria-describedby={undefined}
          onWheel={stopPageScroll}
          onTouchMove={stopPageScroll}
          onOpenAutoFocus={(e) => {
            // Keep focus in drawer without jumping scroll
            e.preventDefault();
            scrollRef.current?.focus({ preventScroll: true });
          }}
        >
          <div className="flex shrink-0 items-center justify-between border-b border-line px-6 py-5">
            <Dialog.Title className="heading-md">Reserve</Dialog.Title>
            <Dialog.Close
              className="inline-flex h-10 w-10 items-center justify-center text-ink"
              aria-label="Close reservation"
            >
              <X size={20} />
            </Dialog.Close>
          </div>
          <div
            ref={scrollRef}
            tabIndex={-1}
            data-lenis-prevent
            className="min-h-0 flex-1 overflow-y-auto overscroll-y-contain px-6 py-6 outline-none"
            onWheel={stopPageScroll}
            onTouchMove={stopPageScroll}
          >
            <ReservationForm onSuccess={() => undefined} />
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
