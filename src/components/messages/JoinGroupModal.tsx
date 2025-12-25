"use client";

import { FormEvent, useState } from "react";

type JoinGroupModalProps = {
  open: boolean;
  onClose: () => void;
  onJoin: (inviteCode: string) => Promise<void>;
};

export default function JoinGroupModal({ open, onClose, onJoin }: JoinGroupModalProps) {
  const [inviteCode, setInviteCode] = useState("");
  const [submitting, setSubmitting] = useState(false);

  if (!open) {
    return null;
  }

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    if (submitting) {
      return;
    }

    const trimmed = inviteCode.trim();

    if (!trimmed) {
      window.alert("Lütfen davet kodunu girin.");
      return;
    }

    setSubmitting(true);

    try {
      await onJoin(trimmed);
      setInviteCode("");
      onClose();
    } catch (error: any) {
      if (error?.message === "NOT_AUTHENTICATED") {
        window.alert("Devam etmek için önce giriş yapmalısınız.");
      } else if (error?.message === "INVITE_CODE_REQUIRED") {
        window.alert("Lütfen davet kodunu girin.");
      } else if (error?.message === "INVALID_INVITE_CODE") {
        window.alert("Davet kodu geçersiz. Lütfen kontrol edip tekrar deneyin.");
      } else {
        window.alert("Gruba katılırken bir hata oluştu. Lütfen tekrar deneyin.");
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="w-full max-w-sm rounded-2xl bg-white p-5 shadow-xl">
        <h2 className="text-base font-semibold text-neutral-900">Davet kodu ile katıl</h2>
        <p className="mt-1 text-xs text-neutral-500">
          Arkadaşınızdan aldığınız 6 karakterli davet kodunu girerek gruba katılın.
        </p>

        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          <div className="space-y-1.5">
            <label htmlFor="invite-code" className="text-xs font-medium text-neutral-800">
              Davet kodu
            </label>
            <input
              id="invite-code"
              value={inviteCode}
              onChange={(event) => setInviteCode(event.target.value.toUpperCase())}
              placeholder="Örn. ABC123"
              maxLength={6}
              className="w-full rounded-full border border-neutral-200 bg-white px-3 py-2 text-sm text-neutral-900 uppercase tracking-[0.3em] placeholder:text-neutral-400 focus:border-[#0073D9] focus:outline-none focus:ring-2 focus:ring-[#0073D9]/10"
            />
          </div>

          <div className="flex items-center justify-end gap-2 pt-1">
            <button
              type="button"
              onClick={onClose}
              disabled={submitting}
              className="inline-flex items-center justify-center rounded-full border border-neutral-200 px-4 py-1.5 text-xs font-medium text-neutral-700 transition hover:bg-neutral-50 disabled:cursor-not-allowed disabled:opacity-60"
            >
              İptal
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="inline-flex items-center justify-center rounded-full bg-[#F1A501] px-4 py-1.5 text-xs font-semibold text-white shadow-sm shadow-[#F1A501]/40 transition hover:bg-[#d89000] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {submitting ? "Katılınıyor..." : "Gruba katıl"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

