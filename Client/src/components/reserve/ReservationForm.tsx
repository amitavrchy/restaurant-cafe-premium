"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { useEffect, useMemo, useState } from "react";
import { DayPicker } from "react-day-picker";
import { useForm } from "react-hook-form";
import { z } from "zod";
import "react-day-picker/style.css";
import {
  createReservation,
  fetchAvailability,
  type Reservation,
} from "@/lib/api";
import { cn } from "@/lib/utils";

const schema = z.object({
  name: z.string().min(2, "Please enter your name"),
  email: z.email("Enter a valid email"),
  phone: z.string().optional(),
  notes: z.string().optional(),
  seating: z.string().optional(),
});

type FormValues = z.infer<typeof schema>;

type Props = {
  onSuccess?: (reservation: Reservation) => void;
  embedded?: boolean;
};

export function ReservationForm({ onSuccess, embedded }: Props) {
  const [date, setDate] = useState<Date | undefined>(() => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    d.setHours(0, 0, 0, 0);
    return d;
  });
  const [partySize, setPartySize] = useState(2);
  const [time, setTime] = useState<string | null>(null);
  const [confirmation, setConfirmation] = useState<Reservation | null>(null);

  const dateStr = date ? format(date, "yyyy-MM-dd") : "";

  const availabilityQuery = useQuery({
    queryKey: ["availability", dateStr],
    queryFn: () => fetchAvailability(dateStr),
    enabled: Boolean(dateStr),
  });

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      notes: "",
      seating: "Dining room",
    },
  });

  const slots = availabilityQuery.data?.slots ?? [];
  const closed = availabilityQuery.data?.closed;

  const usableSlots = useMemo(
    () => slots.filter((s) => s.remaining >= partySize),
    [slots, partySize],
  );

  useEffect(() => {
    setTime(null);
  }, [dateStr, partySize]);

  const mutation = useMutation({
    mutationFn: createReservation,
    onSuccess: (res) => {
      setConfirmation(res);
      onSuccess?.(res);
    },
  });

  const onSubmit = form.handleSubmit((values) => {
    if (!dateStr || !time) return;
    mutation.mutate({
      date: dateStr,
      time,
      partySize,
      name: values.name,
      email: values.email,
      phone: values.phone || undefined,
      notes: values.notes || undefined,
      seating: values.seating || undefined,
    });
  });

  if (confirmation) {
    return (
      <div className="space-y-4" role="status" aria-live="polite">
        <p className="text-eyebrow text-terracotta">Confirmed</p>
        <h3 className="heading-lg">We look forward to welcoming you</h3>
        <p className="text-body">
          Reservation <span className="font-mono-price text-ink">{confirmation.code.slice(0, 8).toUpperCase()}</span>{" "}
          for {confirmation.partySize} on {format(new Date(confirmation.date), "MMM d, yyyy")} at{" "}
          {confirmation.time}.
        </p>
        <p className="text-[var(--text-sm)] text-muted">
          A confirmation note has been logged for {confirmation.email}.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className={cn("space-y-8", embedded && "max-w-xl")}>
      <div>
        <label className="text-eyebrow">Date</label>
        <div className="reserve-calendar mt-3">
          <DayPicker
            mode="single"
            selected={date}
            onSelect={setDate}
            disabled={{ before: new Date() }}
            className="mx-auto w-full"
          />
        </div>
      </div>

      <div>
        <label className="text-eyebrow" htmlFor="party-size">
          Party size
        </label>
        <div className="mt-3 flex flex-wrap gap-2" id="party-size">
          {Array.from({ length: 8 }, (_, i) => i + 1).map((n) => (
            <button
              key={n}
              type="button"
              className={cn(
                "h-11 w-11 rounded-full border text-[var(--text-sm)] transition-colors",
                partySize === n
                  ? "border-ink bg-ink text-cream"
                  : "border-line text-ink hover:border-ink",
              )}
              onClick={() => setPartySize(n)}
              aria-pressed={partySize === n}
            >
              {n}
            </button>
          ))}
        </div>
      </div>

      <div>
        <p className="text-eyebrow">Time</p>
        {availabilityQuery.isLoading ? (
          <p className="mt-3 text-[var(--text-sm)] text-muted">Loading slots…</p>
        ) : closed ? (
          <p className="mt-3 text-[var(--text-sm)] text-terracotta" role="alert">
            Closed{availabilityQuery.data?.reason ? `: ${availabilityQuery.data.reason}` : ""}
          </p>
        ) : usableSlots.length === 0 ? (
          <p className="mt-3 text-[var(--text-sm)] text-muted" role="alert">
            No availability for this party size.
          </p>
        ) : (
          <div className="mt-3 grid grid-cols-3 gap-2 sm:grid-cols-4">
            {usableSlots.map((slot) => (
              <button
                key={slot.time}
                type="button"
                className={cn(
                  "rounded-xl border px-2 py-3 text-[var(--text-sm)] transition-colors",
                  time === slot.time
                    ? "border-terracotta bg-terracotta text-cream"
                    : "border-line hover:border-ink",
                )}
                onClick={() => setTime(slot.time)}
                aria-pressed={time === slot.time}
              >
                <span className="block font-mono-price">{slot.time}</span>
                <span className="mt-1 block text-[0.65rem] opacity-70">
                  {slot.remaining} left
                </span>
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="grid gap-4">
        <Field
          label="Name"
          error={form.formState.errors.name?.message}
          {...form.register("name")}
        />
        <Field
          label="Email"
          type="email"
          error={form.formState.errors.email?.message}
          {...form.register("email")}
        />
        <Field label="Phone" type="tel" {...form.register("phone")} />
        <div>
          <label className="text-eyebrow" htmlFor="seating">
            Seating
          </label>
          <select
            id="seating"
            className="mt-2 w-full border border-line bg-transparent px-3 py-3 text-[var(--text-base)] outline-none focus:border-ink"
            {...form.register("seating")}
          >
            <option>Dining room</option>
            <option>Window</option>
            <option>Bar</option>
            <option>Patio</option>
          </select>
        </div>
        <div>
          <label className="text-eyebrow" htmlFor="notes">
            Notes
          </label>
          <textarea
            id="notes"
            rows={3}
            className="mt-2 w-full border border-line bg-transparent px-3 py-3 text-[var(--text-base)] outline-none focus:border-ink"
            {...form.register("notes")}
          />
        </div>
      </div>

      {mutation.isError ? (
        <p className="text-[var(--text-sm)] text-terracotta" role="alert">
          {getErrorMessage(mutation.error)}
        </p>
      ) : null}

      <button
        type="submit"
        className="btn btn-primary w-full"
        disabled={!time || mutation.isPending || Boolean(closed)}
      >
        {mutation.isPending ? "Booking…" : "Confirm reservation"}
      </button>
    </form>
  );
}

function getErrorMessage(error: unknown) {
  if (
    typeof error === "object" &&
    error &&
    "response" in error &&
    typeof (error as { response?: unknown }).response === "object"
  ) {
    const message = (
      error as { response?: { data?: { message?: string | string[] } } }
    ).response?.data?.message;
    if (Array.isArray(message)) return message.join(", ");
    if (typeof message === "string") return message;
  }
  return "Unable to complete reservation. Please try another slot.";
}

function Field({
  label,
  error,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  error?: string;
}) {
  const id = props.id ?? props.name;
  return (
    <div>
      <label className="text-eyebrow" htmlFor={id}>
        {label}
      </label>
      <input
        id={id}
        className="mt-2 w-full border border-line bg-transparent px-3 py-3 text-[var(--text-base)] outline-none focus:border-ink"
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        {...props}
      />
      {error ? (
        <p id={`${id}-error`} className="mt-1 text-[var(--text-sm)] text-terracotta" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}
