"use client";

import { FormEvent, useState } from "react";

type CreateGroupModalProps = {
  open: boolean;
  onClose: () => void;
  onCreate: (groupName: string) => Promise<void>;
};

export default function CreateGroupModal({ open, onClose, onCreate }: CreateGroupModalProps) {
  const [groupName, setGroupName] = useState("");
  const [submitting, setSubmitting] = useState(false);

  if (!open) {
    return null;
  }

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    if (submitting) {
      return;
    }

    const trimmed = groupName.trim();

    if (!trimmed) {
      window.alert("Lütfen grup adını girin.");
      return;
    }

    setSubmitting(true);

    try {
      await onCreate(trimmed);
      setGroupName("");
      onClose();
    } catch (error: any) {
      if (error?.message === "NOT_AUTHENTICATED") {
        window.alert("Devam etmek için önce giriş yapmalısınız.");
      } else if (error?.message === "GROUP_NAME_REQUIRED") {
        window.alert("Lütfen geçerli bir grup adı girin.");
      } else {
        window.alert("Grup oluşturulurken bir hata oluştu. Lütfen tekrar deneyin.");
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="w-full max-w-sm rounded-2xl bg-white p-5 shadow-xl">
        <h2 className="text-base font-semibold text-neutral-900">Yeni grup oluştur</h2>
        <p className="mt-1 text-xs text-neutral-500">
          Seyahat planınız için bir grup adı belirleyin ve arkadaşlarınızı davet edin.
        </p>

        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          <div className="space-y-1.5">
            <label htmlFor="group-name" className="text-xs font-medium text-neutral-800">
              Grup adı
            </label>
            <input
              id="group-name"
              value={groupName}
              onChange={(event) => setGroupName(event.target.value)}
              placeholder="Örn. Kapadokya Hafta Sonu"
              className="w-full rounded-full border border-neutral-200 bg-white px-3 py-2 text-sm text-neutral-900 placeholder:text-neutral-400 focus:border-[#0073D9] focus:outline-none focus:ring-2 focus:ring-[#0073D9]/10"
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
              className="inline-flex items-center justify-center rounded-full bg-[#0073D9] px-4 py-1.5 text-xs font-semibold text-white shadow-sm shadow-[#0073D9]/40 transition hover:bg-[#005fb1] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {submitting ? "Oluşturuluyor..." : "Grup oluştur"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

