import React, { useState } from "react";

export default function ContactSection({ token }) {
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!token) return alert("Only admin can send messages (test mode).");
    console.log("Contact message:", message);
    setSubmitted(true);
    setMessage("");
  };

  return (
    <section id="contact">
      <h2>Contact</h2>
      {submitted ? (
        <p>Message submitted! (Check console in test mode)</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Write your message..."
            rows="5"
            style={{ width: "100%", padding: "10px", fontSize: "16px" }}
          />
          <button type="submit" style={{ marginTop: "10px", padding: "10px 20px", fontSize: "16px" }}>
            Send
          </button>
        </form>
      )}
    </section>
  );
}
