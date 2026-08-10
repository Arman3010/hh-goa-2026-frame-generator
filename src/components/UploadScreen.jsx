import { useState } from "react";
import PropTypes from "prop-types";
import BrandMark from "./BrandMark";

export default function UploadScreen({ onFileSelected, status }) {
  const [isDragging, setIsDragging] = useState(false);
  const isLoading = status === "loading";

  function selectFile(file) {
    if (file) onFileSelected(file);
  }

  function handleChange(event) {
    selectFile(event.target.files[0]);
  }

  function handleDrop(event) {
    event.preventDefault();
    setIsDragging(false);
    selectFile(event.dataTransfer.files[0]);
  }

  return (
    <section className="border-x-2 border-b-2 border-hh-yellow bg-hh-green">
      <header className="mx-auto flex max-w-[1320px] items-center justify-between gap-4 px-5 py-5 sm:px-10 lg:px-14">
        <BrandMark />
        <div className="hidden text-right md:block">
          <p className="text-[10px] font-bold tracking-[0.18em] text-hh-yellow sm:text-xs">GOA, INDIA · 28 — 31 OCT 2026</p>
          <p className="mt-1 hidden text-[10px] tracking-[0.13em] text-hh-cream/75 sm:block">HH GOA ’26 FRAME STUDIO</p>
        </div>
      </header>

      <div className="mx-auto grid max-w-[1320px] gap-10 px-5 pb-8 pt-8 sm:px-10 sm:pb-10 lg:grid-cols-[1fr_0.88fr] lg:items-center lg:gap-10 lg:px-14 lg:pb-12 lg:pt-10">
        <div className="max-w-3xl">
          <p className="text-xs font-bold tracking-[0.2em] text-hh-yellow">HH GOA ’26 · PROFILE FRAME GENERATOR</p>
          <h1 className="mt-5 max-w-3xl font-display text-6xl font-black leading-[0.88] text-hh-cream sm:text-7xl lg:text-[5.4rem]">
            MAKE YOUR
            <br />
            PROFILE GOA-READY.
          </h1>
          <p className="mt-7 max-w-xl text-base leading-7 text-hh-cream/90 sm:text-lg">
            One clean photo. One unmistakably Goa profile frame. Built to look great everywhere you show up.
          </p>
          <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-xs font-bold tracking-wide text-hh-yellow">
            <span>01 · UPLOAD</span>
            <span>02 · POSITION</span>
            <span>03 · DOWNLOAD</span>
          </div>
        </div>

        <div
          className={`relative overflow-hidden border-2 p-1 shadow-[10px_10px_0_#03351d] transition sm:p-2 ${
            isDragging ? "border-hh-pink bg-hh-pink" : "border-hh-yellow bg-hh-yellow"
          }`}
          onDragEnter={(event) => {
            event.preventDefault();
            setIsDragging(true);
          }}
          onDragOver={(event) => event.preventDefault()}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
        >
          <div className="relative min-h-[385px] overflow-hidden bg-hh-deep px-6 py-8 sm:min-h-[455px] sm:px-10 sm:py-11">
            <img
              src="/hhgoa-sunrise.png"
              alt=""
              className="absolute inset-0 size-full object-cover opacity-35"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-hh-deep/75 via-hh-green/75 to-hh-green/45" />
            <div className="relative z-10 flex h-full min-h-[320px] flex-col items-start justify-between sm:min-h-[365px]">
              <div>
                <span className="border border-hh-yellow bg-hh-deep/75 px-2 py-1 text-[10px] font-bold tracking-[0.15em] text-hh-yellow">YOUR FRAME STARTS HERE</span>
                <h2 className="mt-5 max-w-sm font-display text-4xl font-black leading-[0.92] text-hh-cream sm:text-5xl">
                  {isDragging ? "DROP YOUR PHOTO" : "MAKE IT OFFICIALLY YOURS"}
                </h2>
                <p className="mt-4 max-w-sm text-sm leading-6 text-hh-cream/85">JPG, PNG, WebP and HEIC work. No sign-up, no complicated editing.</p>
              </div>

              <div>
                <label className="inline-flex cursor-pointer items-center justify-center border-2 border-hh-deep bg-hh-pink px-7 py-4 text-sm font-black text-hh-cream shadow-[5px_5px_0_#fee101] transition hover:-translate-y-0.5 hover:bg-[#df006c] focus-within:outline-2 focus-within:outline-offset-4 focus-within:outline-hh-yellow disabled:cursor-wait sm:text-base">
                  {isLoading ? "READING PHOTO..." : "UPLOAD YOUR PHOTO"}
                  <input
                    type="file"
                    accept="image/jpeg,image/png,image/webp,image/heic,image/heif,.heic,.heif"
                    onChange={handleChange}
                    disabled={isLoading}
                    hidden
                  />
                </label>
                <p className="mt-4 text-[10px] font-bold tracking-[0.13em] text-hh-cream/80">DRAG & DROP ON DESKTOP · NO SIGNUP NEEDED</p>
              </div>
            </div>
          </div>
        </div>

        {isLoading && (
          <div className="lg:col-span-2 lg:mt-[-1.5rem]" role="status">
            <p className="flex items-center gap-2 text-xs font-bold tracking-wide text-hh-yellow"><span className="size-4 animate-spin rounded-full border-2 border-hh-leaf border-t-hh-pink" /> GETTING YOUR FRAME STUDIO READY…</p>
          </div>
        )}

        {status?.startsWith("error") && (
          <p className="border-2 border-hh-pink bg-[#fff0f7] px-4 py-3 text-sm leading-6 text-hh-deep lg:col-span-2" role="alert">
            We couldn’t read that photo. Please try a JPG, PNG, WebP, or HEIC image.
          </p>
        )}
      </div>
    </section>
  );
}

UploadScreen.propTypes = {
  onFileSelected: PropTypes.func.isRequired,
  status: PropTypes.string.isRequired,
};
