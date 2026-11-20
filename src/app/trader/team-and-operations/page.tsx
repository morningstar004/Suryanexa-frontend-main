"use client";

import React from "react";
import {
  Users,
  Shield,
  CheckCircle2,
  Phone,
  Mail,
  UserCheck,
  Plus,
} from "lucide-react";
import { toast } from "sonner";

export default function TeamAndOperationsPage() {
  const TEAM_MEMBERS = [
    {
      name: "Noor H.",
      role: "Chief Trading Officer / Managing Partner",
      email: "noor@tidewell.com",
      status: "Active (HQ)",
      access: "Full Super-Admin",
    },
    {
      name: "Ramesh Sharma",
      role: "Regional Logistics & Staging Director",
      email: "ramesh@tidewell.com",
      status: "On Site · Mundra Port",
      access: "Dispatch & Telematics",
    },
    {
      name: "Pooja Varma",
      role: "ALMM Compliance & DISCOM SLD Engineer",
      email: "pooja@tidewell.com",
      status: "Active (Pune Office)",
      access: "KYC & Technical Verification",
    },
  ];

  return (
    <div className="space-y-6 select-none font-sans text-zinc-900">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-zinc-200">
        <div>
          <h2 className="font-display font-extrabold text-xl sm:text-2xl text-zinc-950 tracking-tight flex items-center gap-2">
            <Users className="w-6 h-6 text-emerald-700" />
            <span>Team &amp; Warehouse Operations</span>
          </h2>
          <p className="font-sans text-xs sm:text-sm text-zinc-500 mt-0.5">
            Operational roles, dispatch depot supervisors, and access permissions.
          </p>
        </div>

        <button
          type="button"
          onClick={() => toast.info("Invite modal opened for new operations manager.")}
          className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-display font-bold text-xs shadow-xs active:scale-[0.97] transition-all cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-4 h-4 stroke-[2.5]" />
          <span>Invite Team Member</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-2xl bg-white border border-zinc-200 shadow-2xs">
          <span className="text-xs font-semibold text-zinc-500">Active Operators</span>
          <div className="font-display font-black text-2xl text-zinc-950 mt-1">21 On Site</div>
          <p className="text-[11px] text-emerald-700 font-medium mt-1">90% daily crew attendance</p>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-zinc-200 shadow-2xs">
          <span className="text-xs font-semibold text-zinc-500">Dispatch Depots</span>
          <div className="font-display font-black text-2xl text-zinc-950 mt-1">4 Facilities</div>
          <p className="text-[11px] text-emerald-700 font-medium mt-1">Mundra, Pune, Sanand, Gr. Noida</p>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-zinc-200 shadow-2xs">
          <span className="text-xs font-semibold text-zinc-500">Security Clearance</span>
          <div className="font-display font-black text-2xl text-zinc-950 mt-1">Tier-1 Bonded</div>
          <p className="text-[11px] text-emerald-700 font-medium mt-1">MNRE &amp; GST compliant desks</p>
        </div>
      </div>

      <div className="bg-white rounded-3xl p-5 border border-zinc-200 shadow-2xs space-y-3">
        <h3 className="font-display font-bold text-sm text-zinc-950">
          Authorized Team Roster
        </h3>

        <div className="divide-y divide-zinc-100">
          {TEAM_MEMBERS.map((m, idx) => (
            <div
              key={idx}
              className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-zinc-900 text-white font-bold text-xs flex items-center justify-center shrink-0">
                  {m.name.slice(0, 2).toUpperCase()}
                </div>
                <div>
                  <h4 className="font-display font-bold text-sm text-zinc-950">{m.name}</h4>
                  <p className="text-xs text-zinc-500 font-sans">{m.role}</p>
                </div>
              </div>

              <div className="flex items-center gap-4 text-xs">
                <span className="font-mono text-zinc-600">{m.email}</span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                  {m.status}
                </span>
                <span className="px-2 py-0.5 rounded bg-zinc-100 text-zinc-700 text-[10px] font-mono">
                  {m.access}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
