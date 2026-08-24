"use client";

import Lightbox from "yet-another-react-lightbox";
import Captions from "yet-another-react-lightbox/plugins/captions";
import Counter from "yet-another-react-lightbox/plugins/counter";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/captions.css";

export type GallerySlide = {
  src: string;
  title: string;
  description: string;
  width: number;
  height: number;
};

type GalleryLightboxProps = {
  open: boolean;
  index: number;
  slides: GallerySlide[];
  onClose: () => void;
};

/**
 * Isolated so the lightbox + plugins are code-split out of the initial
 * gallery bundle — next/dynamic only fetches this chunk when opened.
 */
export default function GalleryLightbox({ open, index, slides, onClose }: GalleryLightboxProps) {
  return (
    <Lightbox
      open={open}
      close={onClose}
      index={index}
      slides={slides}
      plugins={[Captions, Counter]}
      controller={{ closeOnPullDown: true }}
      animation={{ fade: 300 }}
      styles={{ container: { backgroundColor: "rgba(32, 20, 9, 0.94)" } }}
    />
  );
}
