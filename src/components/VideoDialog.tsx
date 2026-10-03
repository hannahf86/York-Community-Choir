/* ==========================================================================
   VIDEO DIALOG
   Native <dialog> lightbox for the hero performance video. Pauses the video
   when closed (Esc, backdrop click or close button).
   ========================================================================== */

import { forwardRef, useRef } from 'react';

export function useVideoDialog() {
  const ref = useRef<HTMLDialogElement>(null);
  return {
    ref,
    open: () => {
      ref.current?.showModal();
      ref.current?.querySelector('video')?.play().catch(() => {});
    },
  };
}

type Props = { src: string; poster: string; title: string };

export const VideoDialog = forwardRef<HTMLDialogElement, Props>(function VideoDialog(
  { src, poster, title },
  ref,
) {
  return (
    <dialog
      ref={ref}
      className="dialog dialog--video"
      aria-label={title}
      onClose={(e) => e.currentTarget.querySelector('video')?.pause()}
      onClick={(e) => {
        // Clicking the backdrop (the dialog element itself) closes it
        if (e.target === e.currentTarget) e.currentTarget.close();
      }}
    >
      <form method="dialog" className="dialog__close-form">
        <button className="dialog__close" aria-label="Close video">
          ×
        </button>
      </form>
      <video controls playsInline preload="none" poster={poster}>
        <source src={src} type="video/mp4" />
      </video>
    </dialog>
  );
});
