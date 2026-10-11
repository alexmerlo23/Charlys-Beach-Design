import { Router } from "express";
import { rateLimit } from "express-rate-limit";
import nodemailer from "nodemailer";

const router = Router();
const notificationEmail = "alexmerlo23@gmail.com";
const orderRequestLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: "Too many cart requests. Please try again later." },
});

const escapeHtml = (value) =>
  value.replace(/[&<>"']/g, (character) =>
    ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    })[character]
  );

router.post("/order-request", orderRequestLimiter, async (req, res) => {
  const email = typeof req.body?.email === "string" ? req.body.email.trim() : "";
  const phone = typeof req.body?.phone === "string" ? req.body.phone.trim() : "";
  const submittedItems = req.body?.items;

  if (
    email.length > 254 ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
    !Array.isArray(submittedItems) ||
    submittedItems.length < 1 ||
    submittedItems.length > 50
  ) {
    return res.status(400).json({ message: "Enter a valid email and cart." });
  }

  const normalizedPhone = phone.replace(/[\s().-]/g, "");
  if (phone.length > 30 || !/^\+?\d{7,15}$/.test(normalizedPhone)) {
    return res.status(400).json({ message: "Enter a valid phone number." });
  }

  const items = [];
  for (const item of submittedItems) {
    const name = typeof item?.name === "string" ? item.name.trim() : "";
    const quantity = Number(item?.quantity);
    if (
      !name ||
      name.length > 160 ||
      !Number.isInteger(quantity) ||
      quantity < 1 ||
      quantity > 1000
    ) {
      return res.status(400).json({ message: "The cart contains an invalid item." });
    }
    let image = "";
    if (typeof item?.image === "string") {
      try {
        const imageUrl = new URL(item.image.trim());
        if (imageUrl.protocol === "https:" && !imageUrl.username && !imageUrl.password) {
          image = imageUrl.href;
        }
      } catch {
        image = "";
      }
    }
    items.push({ name, quantity, image });
  }

  const { SMTP_HOST, SMTP_USER, SMTP_PASS } = process.env;
  const SMTP_PORT = Number(process.env.SMTP_PORT || 587);
  const from = process.env.ORDER_FROM_EMAIL || SMTP_USER;
  if (
    !SMTP_HOST ||
    !SMTP_USER ||
    !SMTP_PASS ||
    !from ||
    !Number.isInteger(SMTP_PORT)
  ) {
    return res.status(503).json({ message: "Email service is not configured." });
  }

  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: SMTP_PORT,
    secure: process.env.SMTP_SECURE === "true",
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });
  const itemLines = items.map(({ name, quantity }) => `- ${name} x ${quantity}`);
  const itemRows = items
    .map(({ name, quantity, image }) => {
      const imageMarkup = image
        ? `<img src="${escapeHtml(image)}" alt="${escapeHtml(name)}" width="88" height="104" style="display:block;width:88px;height:104px;object-fit:cover;border:0;border-radius:4px;background:#eef6f8;" />`
        : `<div style="width:88px;height:104px;background:#eef6f8;color:#64748b;text-align:center;line-height:104px;font-size:11px;">Image unavailable</div>`;
      return `<tr><td style="padding:14px 0;border-bottom:1px solid #e5e7eb;"><table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td width="104" valign="top" style="padding-right:16px;">${imageMarkup}</td><td valign="middle" style="font-family:Arial,sans-serif;"><div style="font-size:15px;line-height:22px;font-weight:700;color:#17212b;">${escapeHtml(name)}</div><div style="padding-top:6px;font-size:13px;line-height:19px;color:#52616b;">Quantity: ${quantity}</div></td></tr></table></td></tr>`;
    })
    .join("");
  const safeEmail = escapeHtml(email);
  const safePhone = escapeHtml(phone);
  const contactDetails = `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:20px 0;background:#f3f8fa;"><tr><td style="padding:12px 16px;font:13px/20px Arial,sans-serif;color:#52616b;"><strong style="color:#17212b;">Customer email:</strong> ${safeEmail}<br /><strong style="color:#17212b;">Phone:</strong> ${safePhone}</td></tr></table>`;
  const renderEmail = (heading, introduction, details = "") => `<!doctype html><html lang="en"><body style="margin:0;padding:0;background:#f1f6f8;color:#17212b;font-family:Arial,Helvetica,sans-serif;"><table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="#f1f6f8"><tr><td align="center" style="padding:28px 12px;"><table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="width:100%;max-width:600px;background:#ffffff;border-collapse:collapse;"><tr><td bgcolor="#5ec0eb" style="padding:20px 28px;"><div style="font-size:12px;line-height:18px;font-weight:700;letter-spacing:1px;color:#123b4a;">CHARLY'S BEACH DESIGN</div></td></tr><tr><td style="padding:28px 28px 12px;"><h1 style="margin:0;font-size:24px;line-height:31px;color:#17212b;">${heading}</h1><p style="margin:12px 0 0;font-size:14px;line-height:22px;color:#52616b;">${introduction}</p>${details}<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-top:20px;"><tr><td style="padding:0 0 8px;font-size:12px;line-height:18px;font-weight:700;text-transform:uppercase;color:#52616b;">Cart items</td></tr>${itemRows}</table><p style="margin:22px 0 8px;font-size:13px;line-height:20px;color:#52616b;">No payment was taken. We will follow up to confirm availability and pricing.</p></td></tr><tr><td style="padding:16px 28px;background:#f8fafb;font-size:11px;line-height:17px;color:#71808a;">Charly's Beach Design</td></tr></table></td></tr></table></body></html>`;

  try {
    await Promise.all([
      transporter.sendMail({
        from,
        to: email,
        subject: "We received your cart",
        text: `We received your cart request. No payment was taken.\n\n${itemLines.join("\n")}\n\nWe will follow up to confirm availability and pricing.`,
        html: renderEmail(
          "We received your cart",
          "Thanks for reaching out. Here is a copy of the cart you sent us."
        ),
      }),
      transporter.sendMail({
        from,
        to: notificationEmail,
        replyTo: email,
        subject: `New cart request from ${email}`,
        text: `Customer email: ${email}\nCustomer phone: ${phone}\n\nCart:\n${itemLines.join("\n")}`,
        html: renderEmail(
          "New cart request",
          "A customer submitted a cart request.",
          contactDetails
        ),
      }),
    ]);
    return res.json({ message: "Cart confirmation emails sent." });
  } catch (error) {
    console.error("Cart email delivery failed:", error);
    return res.status(502).json({ message: "Could not send the cart emails. Please try again." });
  }
});

export default router;