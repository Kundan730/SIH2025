"use client";

import { useState } from "react";

export default function HomePage() {
  const [file, setFile] = useState<File | null>(null);
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    setLoading(true);
    try {
      // Step 1: Send file name & meta to API
      const resp = await fetch(
        "https://kundan30-blue-carbon.hf.space/gradio_api/call/predict",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            data: [
              {
                path: file.name, // 🚨 this is only filename, API won’t see file contents
                meta: { _type: "gradio.FileData" },
              },
            ],
          }),
        }
      );

      const data = await resp.json();
      const eventId = data.event_id || data.data;

      // Step 2: Poll / stream results
      const eventResp = await fetch(
        `https://kundan30-blue-carbon.hf.space/gradio_api/call/predict/${eventId}`
      );

      const finalResult = await eventResp.json();
      setResult(finalResult);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6">
      <h1 className="text-2xl font-bold mb-4">Upload & Predict</h1>

      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="mb-4"
      />

      <button
        onClick={handleUpload}
        disabled={!file || loading}
        className="bg-blue-600 text-white px-4 py-2 rounded-lg"
      >
        {loading ? "Processing..." : "Upload & Predict"}
      </button>

      {result && (
        <pre className="mt-6 bg-gray-100 p-4 rounded text-sm text-left w-full max-w-2xl overflow-x-auto">
          {JSON.stringify(result, null, 2)}
        </pre>
      )}
    </main>
  );
}
