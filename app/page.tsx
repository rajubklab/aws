"use client";

import { useState } from "react";

export default function Home() {
  const [message, setMessage] = useState("");
  const [reply, setReply] = useState("");

  async function send() {
    const res = await fetch("/api/agent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message }),
    });

    const data = await res.json();
    setReply(data.reply);
  }

  return (
    <main style={{ padding: 40 }}>
      <h1>Simple AI Agent</h1>

      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        rows={4}
        cols={50}
      />

      <br />
      <br />

      <button onClick={send}>Ask Agent</button>

      <h3>Agent Reply</h3>
      <p>{reply}</p>
    </main>
  );
}
