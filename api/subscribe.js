/* -------------------------------------------------------
   Wivoo — API Notification
   1. Crée/met à jour le contact dans Brevo avec PROFIL
   2. Envoie un email de confirmation transactionnel
------------------------------------------------------- */

const SITE_URL = 'https://wivoo-showcase-one.vercel.app';

function confirmationEmail(profile, cardTitle) {
  const profileLine = profile === 'RH'
    ? 'Notre équipe RH prendra contact avec vous dès la publication.'
    : profile === 'commerciale'
    ? 'Notre équipe commerciale prendra contact avec vous dès la publication.'
    : '';

  const articleLine = cardTitle
    ? `<p style="margin:0 0 8px;font-size:15px;color:#374151;">Article : <strong style="color:#451DC7;">${cardTitle}</strong></p>`
    : '';

  return `<!DOCTYPE html>
<html lang="fr">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#F5F4FB;font-family:'Helvetica Neue',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#F5F4FB;padding:40px 16px;">
    <tr><td align="center">
      <table width="100%" style="max-width:520px;background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">

        <!-- Header -->
        <tr>
          <td style="background:#17023C;padding:28px 32px;">
            <p style="margin:0;font-size:20px;font-weight:700;color:#ffffff;letter-spacing:-0.02em;">Wivoo</p>
            <p style="margin:4px 0 0;font-size:12px;color:rgba(255,255,255,0.45);letter-spacing:0.08em;text-transform:uppercase;">Cabinet de conseil · Product · AI · Data · Design</p>
          </td>
        </tr>

        <!-- Body -->
        <tr>
          <td style="padding:32px 32px 8px;">
            <p style="margin:0 0 8px;font-size:24px;font-weight:700;color:#111827;letter-spacing:-0.01em;">C'est noté ✓</p>
            <p style="margin:0 0 24px;font-size:15px;color:#6B7280;line-height:1.6;">
              Vous serez notifié dès que cet article sera publié sur notre site.
            </p>

            <!-- Article box -->
            <table width="100%" cellpadding="0" cellspacing="0" style="background:#F5F4FB;border-radius:10px;padding:16px 20px;margin-bottom:24px;">
              <tr><td>
                <p style="margin:0 0 4px;font-size:11px;font-weight:700;color:#9CA3AF;text-transform:uppercase;letter-spacing:0.1em;">Article concerné</p>
                ${articleLine}
                ${profileLine ? `<p style="margin:8px 0 0;font-size:13px;color:#6B7280;">${profileLine}</p>` : ''}
              </td></tr>
            </table>

            <p style="margin:0 0 24px;font-size:14px;color:#6B7280;line-height:1.6;">
              En attendant, découvrez nos autres réalisations publiées sur le site.
            </p>

            <!-- CTA -->
            <table cellpadding="0" cellspacing="0" style="margin-bottom:32px;">
              <tr>
                <td style="background:#451DC7;border-radius:50px;padding:12px 24px;">
                  <a href="${SITE_URL}/realisations" style="color:#ffffff;text-decoration:none;font-size:14px;font-weight:700;">Voir nos réalisations →</a>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="padding:20px 32px 28px;border-top:1px solid #F3F4F6;">
            <p style="margin:0;font-size:12px;color:#9CA3AF;line-height:1.6;">
              Vous recevez cet email car vous avez demandé à être notifié sur <a href="${SITE_URL}" style="color:#451DC7;text-decoration:none;">wivoo-showcase-one.vercel.app</a>.<br>
              Wivoo · Paris, France
            </p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST')   return res.status(405).json({ error: 'Method not allowed' });

  const { email, profile, cardTitle } = req.body || {};

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: 'Email invalide' });
  }

  const apiKey      = process.env.BREVO_API_KEY;
  const listId      = parseInt(process.env.BREVO_LIST_ID || '0', 10);
  const senderEmail = process.env.BREVO_SENDER_EMAIL || 'no-reply@wivoo.fr';

  if (!apiKey) {
    console.error('[Subscribe] BREVO_API_KEY manquante');
    return res.status(500).json({ error: 'Configuration manquante' });
  }

  const headers = {
    'api-key':      apiKey,
    'Content-Type': 'application/json',
    'Accept':       'application/json'
  };

  /* 1 — Créer / mettre à jour le contact */
  const contactBody = {
    email,
    attributes: {
      PROFIL:            profile   || 'non_renseigne',
      ARTICLE_INTERESSE: cardTitle || ''
    },
    updateEnabled: true
  };
  if (listId > 0) contactBody.listIds = [listId];

  try {
    const contactRes = await fetch('https://api.brevo.com/v3/contacts', {
      method: 'POST', headers,
      body: JSON.stringify(contactBody)
    });

    if (contactRes.status !== 201 && contactRes.status !== 204) {
      const err = await contactRes.json().catch(() => ({}));
      console.error('[Subscribe] Contact error', contactRes.status, err);
      return res.status(500).json({ error: 'Erreur création contact' });
    }
  } catch (err) {
    console.error('[Subscribe] Contact fetch error', err);
    return res.status(500).json({ error: 'Erreur réseau' });
  }

  /* 2 — Envoyer l'email de confirmation */
  const subject = cardTitle
    ? `✓ Vous serez notifié — ${cardTitle}`
    : '✓ Votre notification Wivoo est confirmée';

  try {
    const mailRes = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST', headers,
      body: JSON.stringify({
        sender:      { name: 'Wivoo', email: senderEmail },
        to:          [{ email }],
        subject,
        htmlContent: confirmationEmail(profile, cardTitle)
      })
    });

    if (!mailRes.ok) {
      const err = await mailRes.json().catch(() => ({}));
      console.error('[Subscribe] Mail error', mailRes.status, err);
      /* On retourne quand même succès — le contact est bien enregistré */
    }
  } catch (err) {
    console.error('[Subscribe] Mail fetch error', err);
  }

  return res.status(200).json({ success: true });
}
