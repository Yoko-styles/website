"use client";

import React from "react";

export default function Card({ imagen }: { imagen: string }) {
  return (
    <div className="w-64 p-4 bg-white rounded-lg shadow-md">
      <img src={imagen} alt="card" className="w-full rounded-md" />
      <h3 className="mt-3 font-semibold">Title</h3>
      <p className="text-sm text-gray-600">Short description here.</p>
    </div>
  );
}
