"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { closeReserve } from "@/features/ui/uiSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { ReservationForm } from "./ReservationForm";

export function ReservationDrawer() {
  const open = useAppSelector((s) => s.ui.reserveOpen);
  const dispatch = useAppDispatch();

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
          className="fixed inset-y-0 right-0 z-[70] flex h-full w-full max-w-md flex-col bg-cream shadow-2xl outline-none data-[state=open]:animate-[slideIn_350ms_var(--ease-reserve)]"
          aria-describedby={undefined}
        >
          <div className="flex items-center justify-between border-b border-line px-6 py-5">
            <Dialog.Title className="heading-md">Reserve</Dialog.Title>
            <Dialog.Close
              className="inline-flex h-10 w-10 items-center justify-center text-ink"
              aria-label="Close reservation"
            >
              <X size={20} />
            </Dialog.Close>
          </div>
          <div className="flex-1 overflow-y-auto px-6 py-6">
            <ReservationForm onSuccess={() => undefined} />
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
