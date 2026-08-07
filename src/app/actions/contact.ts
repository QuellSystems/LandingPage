"use server";

import { Resend } from "resend";

export type ContactState = {
  status: "idle" | "success" | "error";
  message?: string;
};

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendContact(
  _prev: ContactState,
  formData: FormData
): Promise<ContactState> {
  const nombre = formData.get("nombre") as string;
  const empresa = formData.get("empresa") as string;
  const email = formData.get("email") as string;
  const servicio = formData.get("servicio") as string;
  const proceso = formData.get("proceso") as string;

  if (!nombre || !email || !proceso) {
    return { status: "error", message: "Faltan campos requeridos." };
  }

  try {
    await resend.emails.send({
      from: "Quell Systems <contacto@quellsystems.com>",
      to: ["systemsquell@gmail.com"],
      replyTo: email,
      subject: `[Landing] Nuevo contacto — ${nombre}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; color: #12263f;">
          <h2 style="margin-bottom: 4px;">Nuevo contacto desde quellsystems.com</h2>
          <hr style="border: none; border-top: 1px solid #dde3ea; margin: 16px 0;" />

          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0; color: #5a6b80; width: 140px; vertical-align: top; font-size: 13px; text-transform: uppercase; letter-spacing: 0.1em;">Nombre</td>
              <td style="padding: 8px 0; font-size: 15px;">${nombre}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #5a6b80; vertical-align: top; font-size: 13px; text-transform: uppercase; letter-spacing: 0.1em;">Empresa</td>
              <td style="padding: 8px 0; font-size: 15px;">${empresa || "—"}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #5a6b80; vertical-align: top; font-size: 13px; text-transform: uppercase; letter-spacing: 0.1em;">Email</td>
              <td style="padding: 8px 0; font-size: 15px;"><a href="mailto:${email}" style="color: #C4622D;">${email}</a></td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #5a6b80; vertical-align: top; font-size: 13px; text-transform: uppercase; letter-spacing: 0.1em;">Servicio</td>
              <td style="padding: 8px 0; font-size: 15px;">${servicio}</td>
            </tr>
          </table>

          <hr style="border: none; border-top: 1px solid #dde3ea; margin: 16px 0;" />

          <p style="color: #5a6b80; font-size: 13px; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 8px;">Proceso que los está frenando</p>
          <p style="font-size: 15px; line-height: 1.7; white-space: pre-wrap;">${proceso}</p>

          <hr style="border: none; border-top: 1px solid #dde3ea; margin: 24px 0;" />
          <p style="font-size: 12px; color: #7c8fa8;">Enviado desde quellsystems.com · Podés responder directamente a este mail.</p>
        </div>
      `,
    });

    return { status: "success" };
  } catch (error) {
    console.error("[contact] resend error:", error);
    return {
      status: "error",
      message: "No pudimos enviar el mensaje. Escribinos a systemsquell@gmail.com.",
    };
  }
}
