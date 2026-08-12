import { useState } from "react";
import PropTypes from "prop-types";
import BrandMark from "./BrandMark";
import BeachScene from "./BeachScene";

export default function UploadScreen({ onFileSelected, status }) {
  const [isDragging, setIsDragging] = useState(false);
  const isLoading = status === "loading";

  function selectFile(file) {
    if (file) onFileSelected(file);
  }

  function handleChange(event) {
    selectFile(event.target.files?.[0]);
  }

  function handleDrop(event) {
    event.preventDefault();
    setIsDragging(false);
    selectFile(event.dataTransfer.files?.[0]);
  }

  return (
    <div className="w-full max-w-full overflow-x-clip">
      <section className="hh-screen flex min-h-[calc(100svh-2.75rem)] flex-col sm:min-h-[calc(100svh-3.5rem)]">
        {/* Top bar — HH Goa site style */}
        <header className="flex w-full items-center justify-between gap-3 border-b-2 border-hh-yellow/40 px-3 py-3 sm:px-6 sm:py-4 md:px-10">
          <BrandMark />
          <div className="min-w-0 shrink text-right">
            <p className="truncate text-[8px] font-bold tracking-[0.12em] text-hh-yellow sm:text-[11px] sm:tracking-[0.16em]">
              GOA, INDIA · 28 — 31 OCT 2026
            </p>
            <p className="mt-0.5 truncate text-[8px] tracking-[0.1em] text-hh-cream/70 sm:text-[10px]">
              HH GOA &apos;26 FRAME STUDIO
            </p>
          </div>
        </header>

        {/* Hero + upload card — stacked on mobile, split on lg */}
        <div className="mx-auto flex w-full max-w-[1500px] flex-1 flex-col justify-center gap-7 px-3 py-6 sm:gap-9 sm:px-6 sm:py-8 md:px-10 lg:grid lg:grid-cols-[1.08fr_0.92fr] lg:items-center lg:gap-16 lg:py-10">
          <div className="min-w-0">
            <p className="text-[10px] font-bold tracking-[0.16em] text-hh-yellow sm:text-xs sm:tracking-[0.2em]">
              HH GOA &apos;26 · PROFILE FRAME GENERATOR
            </p>
            <h1 className="mt-3 font-display text-[clamp(2.35rem,8vw,5.75rem)] font-black leading-[0.88] text-hh-cream sm:mt-4 lg:text-[7.5rem]">
              MAKE YOUR
              <br />
              PROFILE
              <br />
              GOA-READY.
            </h1>
            <p className="mt-4 max-w-xl text-[13px] leading-6 text-hh-cream/90 sm:mt-5 sm:text-base sm:leading-7 lg:text-lg lg:leading-8">
              One clean photo. One unmistakably Goa profile frame. Built to look great everywhere you show up.
            </p>
            <div className="mt-5 flex flex-wrap gap-x-4 gap-y-2 text-[10px] font-bold tracking-wide text-hh-yellow sm:mt-6 sm:gap-x-6 sm:text-xs lg:text-sm">
              <span>01 · UPLOAD</span>
              <span>02 · POSITION</span>
              <span>03 · DOWNLOAD</span>
            </div>
          </div>

          {/* Screenshot upload card — kept, position flexible */}
          <div
            className={`w-full max-w-[34rem] justify-self-center overflow-hidden border-2 p-1 transition sm:p-1.5 lg:max-w-[42rem] lg:justify-self-end ${
              isDragging ? "border-hh-pink bg-hh-pink" : "border-hh-yellow bg-hh-yellow"
            }`}
            style={{ boxShadow: "8px 8px 0 #03351d" }}
            onDragEnter={(event) => {
              event.preventDefault();
              setIsDragging(true);
            }}
            onDragOver={(event) => event.preventDefault()}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
          >
            <div className="relative min-h-[19rem] overflow-hidden bg-hh-deep px-4 py-6 sm:min-h-[23rem] sm:px-8 sm:py-8 md:min-h-[25rem] lg:min-h-[32rem] lg:px-10 lg:py-10">
              <img
                src="/hhgoa-sunrise.png"
                alt=""
                className="absolute inset-0 size-full object-cover object-bottom opacity-40"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-hh-deep/80 via-hh-green/70 to-hh-green/35" />

              <div className="relative z-10 flex h-full min-h-[16.5rem] flex-col items-start justify-between sm:min-h-[20rem] lg:min-h-[27rem]">
                <div className="min-w-0">
                  <span className="inline-block border border-hh-yellow bg-hh-deep/80 px-2 py-1 text-[9px] font-bold tracking-[0.14em] text-hh-yellow sm:text-[10px]">
                    YOUR FRAME STARTS HERE
                  </span>
                  <h2 className="mt-4 max-w-[14ch] font-display text-[clamp(1.85rem,5vw,2.85rem)] font-black leading-[0.92] text-hh-cream lg:text-[4rem]">
                    {isDragging ? "DROP YOUR PHOTO" : "MAKE IT OFFICIALLY YOURS"}
                  </h2>
                  <p className="mt-3 max-w-sm text-[12px] leading-5 text-hh-cream/85 sm:text-sm sm:leading-6 lg:text-base lg:leading-7">
                    JPG, PNG, WebP and HEIC work. No sign-up, no complicated editing.
                  </p>
                </div>

                <div className="mt-6 w-full">
                  <label
                    className={`hh-btn-shadow inline-flex min-h-11 w-full cursor-pointer items-center justify-center border-2 border-hh-deep bg-hh-pink px-5 py-3 text-center text-[13px] font-bold text-hh-cream transition hover:-translate-y-0.5 hover:bg-[#df006c] focus-within:outline-2 focus-within:outline-offset-4 focus-within:outline-hh-yellow sm:w-auto sm:text-sm lg:px-8 lg:py-4 lg:text-base ${
                      isLoading ? "cursor-wait opacity-90" : ""
                    }`}
                  >
                    {isLoading ? "READING PHOTO..." : "UPLOAD YOUR PHOTO"}
                    <input
                      type="file"
                      accept="image/jpeg,image/png,image/webp,image/heic,image/heif,.heic,.heif"
                      onChange={handleChange}
                      disabled={isLoading}
                      hidden
                    />
                  </label>
                  <p className="mt-3 text-[9px] font-bold tracking-[0.12em] text-hh-cream/80 sm:text-[10px]">
                    DRAG & DROP ON DESKTOP · NO SIGNUP NEEDED
                  </p>
                </div>
              </div>
            </div>
          </div>

          {isLoading && (
            <div className="lg:col-span-2" role="status">
              <p className="flex items-center gap-2 text-xs font-bold tracking-wide text-hh-yellow">
                <span className="size-4 animate-spin rounded-full border-2 border-hh-leaf border-t-hh-pink" />
                GETTING YOUR FRAME STUDIO READY…
              </p>
            </div>
          )}

          {status?.startsWith("error") && (
            <p
              className="border-2 border-hh-pink bg-[#fff0f7] px-4 py-3 text-sm leading-6 text-hh-deep lg:col-span-2"
              role="alert"
            >
              We couldn’t read that photo. Please try a JPG, PNG, WebP, or HEIC image.
            </p>
          )}
        </div>
      </section>

      <BeachScene />
    </div>
  );
}

UploadScreen.propTypes = {
  onFileSelected: PropTypes.func.isRequired,
  status: PropTypes.string.isRequired,
};
