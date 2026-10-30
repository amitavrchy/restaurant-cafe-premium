"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { createPrivateInquiry } from "@/lib/api";

const schema = z.object({
  name: z.string().min(2),
  email: z.email(),
  phone: z.string().optional(),
  eventDate: z.string().optional(),
  guests: z.coerce.number().int().min(1).optional(),
  message: z.string().min(10, "Tell us a little more about your event"),
});

type FormValues = z.infer<typeof schema>;

export function PrivateInquiryForm() {
  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      eventDate: "",
      message: "",
    },
  });

  const mutation = useMutation({
    mutationFn: createPrivateInquiry,
  });

  if (mutation.isSuccess) {
    return (
      <div role="status" aria-live="polite" className="space-y-3">
        <p className="text-eyebrow text-terracotta">Received</p>
        <h3 className="heading-lg">Thank you</h3>
        <p className="text-body">
          Our events team will respond within two business days.
        </p>
      </div>
    );
  }

  return (
    <form
      className="space-y-5"
      onSubmit={form.handleSubmit((values) =>
        mutation.mutate({
          ...values,
          eventDate: values.eventDate || undefined,
          guests: values.guests || undefined,
          phone: values.phone || undefined,
        }),
      )}
    >
      <Field label="Name" error={form.formState.errors.name?.message} {...form.register("name")} />
      <Field label="Email" type="email" error={form.formState.errors.email?.message} {...form.register("email")} />
      <Field label="Phone" type="tel" {...form.register("phone")} />
      <Field label="Event date" type="date" {...form.register("eventDate")} />
      <Field label="Guests" type="number" {...form.register("guests")} />
      <div>
        <label className="text-eyebrow" htmlFor="message">
          Message
        </label>
        <textarea
          id="message"
          rows={5}
          className="mt-2 w-full border border-line bg-transparent px-3 py-3 text-[var(--text-base)] outline-none focus:border-ink"
          aria-invalid={Boolean(form.formState.errors.message)}
          {...form.register("message")}
        />
        {form.formState.errors.message ? (
          <p className="mt-1 text-[var(--text-sm)] text-terracotta" role="alert">
            {form.formState.errors.message.message}
          </p>
        ) : null}
      </div>
      <button type="submit" className="btn btn-primary w-full" disabled={mutation.isPending}>
        {mutation.isPending ? "Sending…" : "Send inquiry"}
      </button>
    </form>
  );
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
        {...props}
      />
      {error ? (
        <p className="mt-1 text-[var(--text-sm)] text-terracotta" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}
