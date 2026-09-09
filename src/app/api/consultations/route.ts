import { NextResponse } from "next/server";
import { getDatabase } from "@/lib/mongodb";
import nodemailer from "nodemailer";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const { name, email, phone, company, service, message } = await req.json();

    if (!name || !email || !service || !message) {
      return NextResponse.json(
        { success: false, message: "Name, email, service, and message are required" },
        { status: 400 }
      );
    }

    if (
      !process.env.EMAIL_USER ||
      !process.env.EMAIL_PASS ||
      !process.env.MONGODB_URI
    ) {
      console.error("Missing required email or MongoDB environment variables");
      return NextResponse.json(
        { success: false, message: "Server configuration error" },
        { status: 500 }
      );
    }

    const db = await getDatabase();
    await db.collection("consultations").insertOne({
      name,
      email,
      phone: phone || "",
      company: company || "",
      service,
      message,
      status: "new",
      createdAt: new Date(),
    });

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.verify();

    const mailOptions = {
      from: process.env.EMAIL_USER,
      replyTo: email,
      to: "eng.abukowsar@gmail.com",
      subject: `📅 New Consultation Request from ${name}: ${service}`,
      html: `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
  </head>
  <body style="margin:0; padding:0; background-color:#f0f4f8; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f0f4f8; padding:40px 20px;">
      <tr>
        <td align="center">
          <table width="600" cellpadding="0" cellspacing="0" style="background-color:#ffffff; border-radius:16px; overflow:hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">

            <tr>
              <td style="background: linear-gradient(135deg, #0ea5a4 0%, #0891b2 100%); padding:40px; text-align:center;">
                <h1 style="margin:0; color:#ffffff; font-size:28px; font-weight:600;">
                  📅 New Consultation Request
                </h1>
                <p style="margin:10px 0 0; color:rgba(255,255,255,0.9); font-size:14px;">
                  Someone booked a consultation through your website
                </p>
              </td>
            </tr>

            <tr>
              <td style="padding:40px;">
                <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f8fafc; border-radius:12px; margin-bottom:24px;">
                  <tr>
                    <td style="padding:24px;">
                      <table width="100%" cellpadding="0" cellspacing="0">
                        <tr>
                          <td width="60" valign="top">
                            <div style="width:50px; height:50px; background: linear-gradient(135deg, #0ea5a4 0%, #0891b2 100%); border-radius:50%; text-align:center; line-height:50px; color:#fff; font-size:20px; font-weight:bold;">
                              ${name.charAt(0).toUpperCase()}
                            </div>
                          </td>
                          <td valign="top" style="padding-left:16px;">
                            <h3 style="margin:0 0 4px; color:#1e293b; font-size:18px; font-weight:600;">${name}</h3>
                            <a href="mailto:${email}" style="color:#0891b2; text-decoration:none; font-size:14px;">${email}</a>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>

                <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px;">
                  <tr>
                    <td width="50%" style="padding-right:8px;">
                      <p style="margin:0 0 4px; color:#64748b; font-size:12px; text-transform:uppercase; letter-spacing:1px; font-weight:600;">Service</p>
                      <p style="margin:0; color:#1e293b; font-size:15px;">${service}</p>
                    </td>
                    <td width="50%" style="padding-left:8px;">
                      <p style="margin:0 0 4px; color:#64748b; font-size:12px; text-transform:uppercase; letter-spacing:1px; font-weight:600;">Phone</p>
                      <p style="margin:0; color:#1e293b; font-size:15px;">${phone || "Not provided"}</p>
                    </td>
                  </tr>
                </table>

                <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px;">
                  <tr>
                    <td>
                      <p style="margin:0 0 4px; color:#64748b; font-size:12px; text-transform:uppercase; letter-spacing:1px; font-weight:600;">Company</p>
                      <p style="margin:0; color:#1e293b; font-size:15px;">${company || "Not provided"}</p>
                    </td>
                  </tr>
                </table>

                <table width="100%" cellpadding="0" cellspacing="0">
                  <tr>
                    <td>
                      <p style="margin:0 0 12px; color:#64748b; font-size:12px; text-transform:uppercase; letter-spacing:1px; font-weight:600;">Message</p>
                      <div style="background-color:#f8fafc; border-left:4px solid #0891b2; padding:20px; border-radius:0 8px 8px 0;">
                        <p style="margin:0; color:#334155; font-size:15px; line-height:1.7; white-space:pre-line;">${message}</p>
                      </div>
                    </td>
                  </tr>
                </table>

                <table width="100%" cellpadding="0" cellspacing="0" style="margin-top:32px;">
                  <tr>
                    <td align="center">
                      <a href="mailto:${email}?subject=Re: Consultation Request - ${service}" style="display:inline-block; background: linear-gradient(135deg, #0ea5a4 0%, #0891b2 100%); color:#ffffff; text-decoration:none; padding:14px 32px; border-radius:8px; font-weight:600; font-size:14px;">
                        Reply to ${name.split(" ")[0]}
                      </a>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <tr>
              <td style="background-color:#f8fafc; padding:24px 40px; text-align:center; border-top:1px solid #e2e8f0;">
                <p style="margin:0 0 8px; color:#64748b; font-size:13px;">
                  📅 Received on ${new Date().toLocaleDateString("en-US", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
                <p style="margin:0; color:#94a3b8; font-size:12px;">
                  This email was sent from your portfolio's consultation booking form
                </p>
              </td>
            </tr>

          </table>
        </td>
      </tr>
    </table>
  </body>
  </html>
      `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true, message: "Consultation request sent!" });
  } catch (error) {
    console.error("Consultation request error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to send consultation request" },
      { status: 500 }
    );
  }
}
