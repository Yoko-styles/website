"use client";

import React, { useEffect, useRef, useState } from "react";

export default function Carousel3D({
    cards,
    height = "420px",
    width = "100%",
    offset = 2,
    showArrows = true,
    autoplay = true,
    interval = 3500,
}: any) {
    const [index, setIndex] = useState(0);
    const len = (cards || []).length;
    const autoplayRef = useRef<number | null>(null);

    useEffect(() => {
        if (!autoplay) return;
        autoplayRef.current = window.setInterval(() => {
            setIndex((i) => (i + 1) % len);
        }, interval);
        return () => {
            if (autoplayRef.current) window.clearInterval(autoplayRef.current);
        };
    }, [len, autoplay, interval]);

    function prev() {
        setIndex((i) => (i - 1 + len) % len);
    }

    function next() {
        setIndex((i) => (i + 1) % len);
    }

    // compute transform for each slide relative to current index
    // use fixed pixel spacing so slides don't intrude into the right panel
    const slideSpacingPx = 280; // px spacing between slide centers (increased for larger cards)

    const active = cards[index] || {};

    return (
        <div className="w-full" style={{ width }}>
            <div className="flex flex-col md:flex-row items-start gap-8">
                {/* carousel area */}
                <div className="relative md:flex-1 w-full overflow-hidden pr-6 md:pr-8" style={{ height }}>
                    <div className="absolute inset-0 flex items-center justify-center perspective-1000">
                        <div className="relative w-full h-full flex items-center justify-center">
                            {cards.map((c: any, i: number) => {
                                // circular distance
                                let d = i - index;
                                if (d > len / 2) d -= len;
                                if (d < -len / 2) d += len;

                                const abs = Math.abs(d);
                                const translateX = d * slideSpacingPx;
                                const rotateY = d * -10;
                                const scale = d === 0 ? 1 : Math.max(0.7, 1 - abs * 0.12);
                                // cap zIndex so elements never exceed navbar z-index (navbar uses z-50)
                                const zIndex = Math.min(40, Math.max(0, 100 - abs));

                                return (
                                    <div
                                        key={c.key || i}
                                        onClick={() => setIndex(i)}
                                        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-transform duration-700 ease-[cubic-bezier(.22,1,.36,1)]"
                                        style={{
                                            transform: `translateX(${translateX}px) translateZ(${-abs * 60}px) rotateY(${rotateY}deg) scale(${scale})`,
                                            zIndex,
                                            width: "340px",
                                            cursor: "pointer",
                                        }}
                                    >
                                        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                                            {/* optional card image */}
                                            {c.image && (
                                                <div className="h-64 w-full overflow-hidden">
                                                    <img src={c.image} alt={c.title || "slide image"} className="w-full h-full object-cover" />
                                                </div>
                                            )}

                                            <div className="p-4 text-center">
                                                {c.title && <div className="text-lg font-semibold text-gray-900">{c.title}</div>}
                                                {c.subtitle && <div className="text-sm text-gray-600 mt-2">{c.subtitle}</div>}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {showArrows && (
                        <>
                            <button
                                onClick={prev}
                                className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-md"
                                aria-label="Previous"
                            >
                                ‹
                            </button>

                            <button
                                onClick={next}
                                className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-md"
                                aria-label="Next"
                            >
                                ›
                            </button>
                        </>
                    )}

                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                        {cards.map((_: any, i: number) => (
                            <button
                                key={i}
                                onClick={() => setIndex(i)}
                                className={`w-2 h-2 rounded-full ${i === index ? "bg-black" : "bg-gray-300"}`}
                            />
                        ))}
                    </div>
                </div>

                {/* right-side panel that updates with active card (text-only) */}
                <div className="md:w-2/5 w-full pt-2 md:pt-6">
                    {active.title && <h3 className="text-2xl font-semibold text-gray-900">{active.title}</h3>}
                    {active.subtitle && <p className="text-gray-600 mt-2">{active.subtitle}</p>}

                    {active.panelText && <p className="text-gray-700 mt-4 leading-relaxed">{active.panelText}</p>}

                    {/* optional details list for richer content */}
                    {active.details && Array.isArray(active.details) && (
                        <ul className="mt-4 list-disc list-inside text-gray-700 space-y-2">
                            {active.details.map((d: string, i: number) => (
                                <li key={i}>{d}</li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </div>
    );
}
