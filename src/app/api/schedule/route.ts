import { NextResponse } from "next/server";
import { getDatabase } from "@/lib/mongodb";
import nodemailer from "nodemailer";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const { name, email, phone, topic, preferredDateTime, message } = await req.json();

    if (!name || !email || !topic || !preferredDateTime) {
      return NextResponse.json(
        { success: false, message: "Name, email, topic, and preferred date/time are required" },
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
    await db.collection("schedule_requests").insertOne({
      name,
      email,
      phone: phone || "",
      topic,
      preferredDateTime,
      message: message || "",
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

    const formattedTime = new Date(preferredDateTime).toLocaleString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      replyTo: email,
      to: "eng.abukowsar@gmail.com",
      subject: `🗓️ New Meeting Request from ${name}: ${topic}`,
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
              <td style="background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%); padding:40px; text-align:center;">
                <h1 style="margin:0; color:#ffffff; font-size:28px; font-weight:600;">
                  🗓️ New Meeting Request
                </h1>
                <p style="margin:10px 0 0; color:rgba(255,255,255,0.9); font-size:14px;">
                  Someone wants to schedule time with you
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
                            <div style="width:50px; height:50px; background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%); border-radius:50%; text-align:center; line-height:50px; color:#fff; font-size:20px; font-weight:bold;">
                              ${name.charAt(0).toUpperCase()}
                            </div>
                          </td>
                          <td valign="top" style="padding-left:16px;">
                            <h3 style="margin:0 0 4px; color:#1e293b; font-size:18px; font-weight:600;">${name}</h3>
                            <a href="mailto:${email}" style="color:#6366f1; text-decoration:none; font-size:14px;">${email}</a>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>

                <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px;">
                  <tr>
                    <td width="50%" style="padding-right:8px;">
                      <p style="margin:0 0 4px; color:#64748b; font-size:12px; text-transform:uppercase; letter-spacing:1px; font-weight:600;">Topic</p>
                      <p style="margin:0; color:#1e293b; font-size:15px;">${topic}</p>
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
                      <p style="margin:0 0 4px; color:#64748b; font-size:12px; text-transform:uppercase; letter-spacing:1px; font-weight:600;">Requested Time</p>
                      <div style="background-color:#eef2ff; border-left:4px solid #6366f1; padding:14px 16px; border-radius:0 8px 8px 0;">
                        <p style="margin:0; color:#1e293b; font-size:15px; font-weight:600;">${formattedTime}</p>
                      </div>
                    </td>
                  </tr>
                </table>

                ${
                  message
                    ? `
                <table width="100%" cellpadding="0" cellspacing="0">
                  <tr>
                    <td>
                      <p style="margin:0 0 12px; color:#64748b; font-size:12px; text-transform:uppercase; letter-spacing:1px; font-weight:600;">Notes</p>
                      <div style="background-color:#f8fafc; border-left:4px solid #6366f1; padding:20px; border-radius:0 8px 8px 0;">
                        <p style="margin:0; color:#334155; font-size:15px; line-height:1.7; white-space:pre-line;">${message}</p>
                      </div>
                    </td>
                  </tr>
                </table>
                `
                    : ""
                }

                <table width="100%" cellpadding="0" cellspacing="0" style="margin-top:32px;">
                  <tr>
                    <td align="center">
                      <a href="mailto:${email}?subject=Re: Meeting Request - ${topic}" style="display:inline-block; background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%); color:#ffffff; text-decoration:none; padding:14px 32px; border-radius:8px; font-weight:600; font-size:14px;">
                        Confirm with ${name.split(" ")[0]}
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
                  This email was sent from your portfolio's meeting scheduler
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

    return NextResponse.json({ success: true, message: "Meeting request sent!" });
  } catch (error) {
    console.error("Schedule request error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to send meeting request" },
      { status: 500 }
    );
  }
}
