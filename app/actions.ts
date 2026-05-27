"use server";

import { insertRegistration, type ParticipationMethod } from "@/lib/db";

export type RegistrationState =
  | { status: "idle" }
  | { status: "error"; error: string }
  | {
      status: "success";
      firstName: string;
      attending: number;
    };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function registerForEvent(
  _prev: RegistrationState,
  formData: FormData,
): Promise<RegistrationState> {
  const fullName = String(formData.get("fullName") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const phone = String(formData.get("phone") ?? "").trim();
  const country = String(formData.get("country") ?? "").trim();
  const church = String(formData.get("church") ?? "").trim();
  const attendingRaw = Number(formData.get("attending") ?? 1);
  const participationRaw = String(formData.get("participation") ?? "").trim();

  if (!fullName || !email || !phone || !country || !church) {
    return { status: "error", error: "Please fill in every field." };
  }
  if (!EMAIL_RE.test(email)) {
    return { status: "error", error: "That email doesn't look right." };
  }
  if (participationRaw !== "on-site" && participationRaw !== "online") {
    return { status: "error", error: "Please choose on-site or online." };
  }
  const participation: ParticipationMethod = participationRaw;
  const attending = Number.isFinite(attendingRaw)
    ? Math.min(Math.max(Math.round(attendingRaw), 1), 50)
    : 1;

  try {
    insertRegistration({
      fullName,
      email,
      phone,
      country,
      church,
      attending,
      participation,
      receivedAt: new Date().toISOString(),
    });
  } catch {
    return {
      status: "error",
      error: "We couldn't save your registration. Please try again.",
    };
  }

  const firstName = fullName.split(/\s+/)[0] ?? fullName;
  return { status: "success", firstName, attending };
}
