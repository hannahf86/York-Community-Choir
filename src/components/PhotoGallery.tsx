/* ==========================================================================
   PHOTO GALLERY  (About page, #gallery)
   Grid of choir photos from `galleryPhotos` in content.ts. Clicking a photo
   opens it larger in a lightbox with previous/next controls. Keyboard: arrow
   keys move between photos, Esc closes.
   ========================================================================== */

import { useRef, useState, type KeyboardEvent } from 'react';
import { galleryPhotos, social } from '../content';

export function PhotoGallery() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [index, setIndex] = useState(0);
  const count = galleryPhotos.length;
  const photo = galleryPhotos[index];

  const open = (i: number) => {
    setIndex(i);
    dialogRef.current?.showModal();
  };
  const step = (dir: number) => setIndex((i) => (i + dir + count) % count);

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'ArrowRight') step(1);
    if (e.key === 'ArrowLeft') step(-1);
  };

  return (
    <section className="section section--light" id="gallery" aria-labelledby="gallery-title">
      <div className="container">
        {/* ---- Heading ---- */}
        <div className="section-head">
          <div>
            <p className="eyebrow">Gallery</p>
            <h2 id="gallery-title" className="h2 h2--md">Moments from the choir</h2>
          </div>
          <a href={social.instagram} className="btn btn--outline" target="_blank" rel="noopener noreferrer">
            More on Instagram
          </a>
        </div>

        {/* ---- Photo grid ---- */}
        <ul className="photo-grid">
          {galleryPhotos.map((p, i) => (
            <li key={p.src} className={`photo-grid__item${p.shape ? ` photo-grid__item--${p.shape}` : ''}`}>
              <button type="button" className="photo-grid__btn" onClick={() => open(i)}>
                <img src={p.src} alt={p.alt} loading="lazy" />
                {p.caption && <span className="photo-grid__caption">{p.caption}</span>}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* ---- Lightbox ---- */}
      <dialog
        ref={dialogRef}
        className="dialog dialog--lightbox"
        aria-label="Photo viewer"
        onKeyDown={onKeyDown}
        onClick={(e) => {
          if (e.target === e.currentTarget) e.currentTarget.close();
        }}
      >
        <form method="dialog" className="dialog__close-form">
          <button className="dialog__close" aria-label="Close photo viewer">
            ×
          </button>
        </form>
        <figure className="lightbox">
          <img src={photo.src} alt={photo.alt} />
          <figcaption className="lightbox__bar">
            <button type="button" className="lightbox__nav" onClick={() => step(-1)} aria-label="Previous photo">
              ←
            </button>
            <span>
              {photo.caption ?? photo.alt}
              <span className="lightbox__count">
                {' '}
                · {index + 1} of {count}
              </span>
            </span>
            <button type="button" className="lightbox__nav" onClick={() => step(1)} aria-label="Next photo">
              →
            </button>
          </figcaption>
        </figure>
      </dialog>
    </section>
  );
}
