import { useRef, useState } from "react";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [note, setNote] = useState("");
  const inputRef = useRef(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!EMAIL_PATTERN.test(email.trim())) {
      setNote("Please enter a valid email address.");
      inputRef.current?.focus();
      return;
    }
    setNote("Thank you — welcome to the Maison.");
    setEmail("");
  };

  return (
    <section className="section newsletter" aria-labelledby="news-title">
      <div className="container reveal">
        <span className="eyebrow">The Aurelle Letter</span>
        <h2 id="news-title">First access, privately.</h2>
        <p>New collections, atelier stories, and invitations — never more than once a month.</p>

        <form onSubmit={handleSubmit} noValidate>
          <label htmlFor="newsletter-email" className="sr-only">Email address</label>
          <input
            ref={inputRef}
            id="newsletter-email"
            type="email"
            placeholder="Your email address"
            autoComplete="email"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          <button type="submit">Subscribe</button>
        </form>

        <div className="form-note" role="status" aria-live="polite">{note}</div>
      </div>
    </section>
  );
}
