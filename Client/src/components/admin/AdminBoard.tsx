"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  fetchReservations,
  loginAdmin,
  patchReservation,
  type Reservation,
} from "@/lib/api";
import { setCredentials, logout } from "@/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { cn } from "@/lib/utils";

const loginSchema = z.object({
  email: z.email(),
  password: z.string().min(6),
});

type LoginValues = z.infer<typeof loginSchema>;

export function AdminBoard() {
  const dispatch = useAppDispatch();
  const auth = useAppSelector((s) => s.auth);
  const queryClient = useQueryClient();
  const [error, setError] = useState<string | null>(null);

  const form = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "admin@maisonverdant.com",
      password: "Admin123!",
    },
  });

  const reservationsQuery = useQuery({
    queryKey: ["admin-reservations", auth.token],
    queryFn: () => fetchReservations(auth.token!),
    enabled: Boolean(auth.token),
  });

  const statusMutation = useMutation({
    mutationFn: ({
      id,
      status,
    }: {
      id: string;
      status: Reservation["status"];
    }) => patchReservation(auth.token!, id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-reservations"] });
    },
  });

  const onLogin = form.handleSubmit(async (values) => {
    setError(null);
    try {
      const res = await loginAdmin(values.email, values.password);
      dispatch(setCredentials({ token: res.accessToken, user: res.user }));
    } catch {
      setError("Invalid credentials");
    }
  });

  if (!auth.token) {
    return (
      <form onSubmit={onLogin} className="mx-auto max-w-md space-y-5 border border-line p-8">
        <h1 className="heading-lg">Admin</h1>
        <p className="text-body">Sign in to manage reservations.</p>
        <div>
          <label className="text-eyebrow" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            className="mt-2 w-full border border-line px-3 py-3 outline-none focus:border-ink"
            {...form.register("email")}
          />
        </div>
        <div>
          <label className="text-eyebrow" htmlFor="password">
            Password
          </label>
          <input
            id="password"
            type="password"
            className="mt-2 w-full border border-line px-3 py-3 outline-none focus:border-ink"
            {...form.register("password")}
          />
        </div>
        {error ? (
          <p className="text-[var(--text-sm)] text-terracotta" role="alert">
            {error}
          </p>
        ) : null}
        <button type="submit" className="btn btn-ink w-full">
          Sign in
        </button>
      </form>
    );
  }

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-eyebrow">Operations</p>
          <h1 className="heading-xl mt-2">Reservation board</h1>
          <p className="text-body mt-2">Signed in as {auth.user?.name}</p>
        </div>
        <button
          type="button"
          className="btn btn-ghost"
          onClick={() => dispatch(logout())}
        >
          Sign out
        </button>
      </div>

      <div className="mt-10 overflow-x-auto border border-line">
        <table className="min-w-full text-left text-[var(--text-sm)]">
          <thead className="border-b border-line bg-line/40">
            <tr>
              <th className="px-4 py-3 font-medium">Date</th>
              <th className="px-4 py-3 font-medium">Time</th>
              <th className="px-4 py-3 font-medium">Guest</th>
              <th className="px-4 py-3 font-medium">Party</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {reservationsQuery.isLoading ? (
              <tr>
                <td className="px-4 py-6 text-muted" colSpan={6}>
                  Loading…
                </td>
              </tr>
            ) : (reservationsQuery.data ?? []).length === 0 ? (
              <tr>
                <td className="px-4 py-6 text-muted" colSpan={6}>
                  No reservations yet.
                </td>
              </tr>
            ) : (
              reservationsQuery.data!.map((r) => (
                <tr key={r.id} className="border-b border-line/80">
                  <td className="px-4 py-4 whitespace-nowrap">
                    {format(new Date(r.date), "MMM d, yyyy")}
                  </td>
                  <td className="px-4 py-4 font-mono-price">{r.time}</td>
                  <td className="px-4 py-4">
                    <div>{r.name}</div>
                    <div className="text-muted">{r.email}</div>
                  </td>
                  <td className="px-4 py-4">{r.partySize}</td>
                  <td className="px-4 py-4">
                    <span
                      className={cn(
                        "inline-block border px-2 py-1 text-[0.7rem] tracking-[0.08em] uppercase",
                        r.status === "CONFIRMED" && "border-olive text-olive",
                        r.status === "CANCELLED" && "border-muted text-muted",
                        r.status === "NO_SHOW" && "border-terracotta text-terracotta",
                        r.status === "PENDING" && "border-gold text-gold",
                      )}
                    >
                      {r.status.replace("_", " ")}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex flex-wrap gap-2">
                      <button
                        type="button"
                        className="border border-line px-2 py-1 hover:border-ink"
                        onClick={() =>
                          statusMutation.mutate({ id: r.id, status: "CONFIRMED" })
                        }
                      >
                        Confirm
                      </button>
                      <button
                        type="button"
                        className="border border-line px-2 py-1 hover:border-ink"
                        onClick={() =>
                          statusMutation.mutate({ id: r.id, status: "NO_SHOW" })
                        }
                      >
                        No-show
                      </button>
                      <button
                        type="button"
                        className="border border-line px-2 py-1 hover:border-terracotta hover:text-terracotta"
                        onClick={() =>
                          statusMutation.mutate({ id: r.id, status: "CANCELLED" })
                        }
                      >
                        Cancel
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
