import { useState } from "react";

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt }),
    });
    const data = await res.json();
    setResult(data.result);
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>ContentHooks AI Assistant</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="مثلاً: یک کامپوننت جدید بساز برای صفحه اصلی"
          rows={5}
          cols={50}
        />
        <br />
        <button type="submit">Generate</button>
      </form>
      <div style={{ marginTop: "1rem", whiteSpace: "pre-wrap" }}>
        {result}
      </div>
    </div>
  );
}
