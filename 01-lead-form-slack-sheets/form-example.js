// ============================================================
// Contact form → n8n lead pipeline (pairs with 01-lead-form-slack-sheets)
// Expects a form with fields: name, email, service, message
// ============================================================

document.getElementById("contactForm").addEventListener("submit", async function (e) {
  e.preventDefault(); // stop the default redirect

  const data = Object.fromEntries(new FormData(this));

  const res = await fetch("YOUR_N8N_WEBHOOK_URL", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (res.ok) {
    this.innerHTML =
      '<div style="padding:32px;text-align:center;color:#ff6b35;font-size:1.2rem;">✅ Thanks! Your message was received — we\'ll reply within 24h.</div>';
  } else {
    this.innerHTML =
      '<div style="padding:32px;text-align:center;color:#ff6b35;font-size:1.2rem;">Something went wrong — please email us directly.</div>';
  }
});
