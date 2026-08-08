"use client";

interface Props {
  open: boolean;
  title: string;
  message: string;
  confirmText: string;
  onCancel: () => void;
  onConfirm: () => void;
  loading?: boolean;
}

export default function ConfirmationModal({
  open,
  title,
  message,
  confirmText,
  onCancel,
  onConfirm,
  loading = false,
}: Props) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 p-4">
      <div className="w-full max-w-sm rounded-2xl bg-white p-5 shadow-2xl">
        <h2 className="font-instrument text-2xl text-[#2F4F2F]">
          {title}
        </h2>

        <p className="mt-2 text-sm leading-6 text-[#6F685E]">
          {message}
        </p>

        <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={onCancel}
            className="rounded-xl border border-[#DCD5CB] px-4 py-2.5 text-sm font-medium text-[#5F5A52] hover:bg-[#F8F6F2]"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={loading}
            className="rounded-xl bg-[#2F4F2F] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#465823] disabled:opacity-60"
          >
            {loading ? "Please wait..." : confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
