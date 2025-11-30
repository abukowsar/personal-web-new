import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const { name, email, subject, message } = await req.json();

    // Configure mail transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER, // Your Gmail
        pass: process.env.EMAIL_PASS, // App Password
      },
    });

    const mailOptions = {
      from: email,
      to: "mostafizurrahaman0401@gmail.com",
      subject: `💬 New Message from ${name}: ${subject}`,
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
            
            <!-- Header -->
            <tr>
              <td style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding:40px 40px; text-align:center;">
                <h1 style="margin:0; color:#ffffff; font-size:28px; font-weight:600;">
                  ✉️ New Message Received
                </h1>
                <p style="margin:10px 0 0; color:rgba(255,255,255,0.9); font-size:14px;">
                  Someone contacted you through your website
                </p>
              </td>
            </tr>

            <!-- Body -->
            <tr>
              <td style="padding:40px;">
                
                <!-- Sender Info Card -->
                <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f8fafc; border-radius:12px; margin-bottom:24px;">
                  <tr>
                    <td style="padding:24px;">
                      <table width="100%" cellpadding="0" cellspacing="0">
                        <tr>
                          <td width="60" valign="top">
                            <div style="width:50px; height:50px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius:50%; text-align:center; line-height:50px; color:#fff; font-size:20px; font-weight:bold;">
                              ${name.charAt(0).toUpperCase()}
                            </div>
                          </td>
                          <td valign="top" style="padding-left:16px;">
                            <h3 style="margin:0 0 4px; color:#1e293b; font-size:18px; font-weight:600;">${name}</h3>
                            <a href="mailto:${email}" style="color:#667eea; text-decoration:none; font-size:14px;">${email}</a>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>

                <!-- Subject -->
                <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px;">
                  <tr>
                    <td>
                      <p style="margin:0 0 8px; color:#64748b; font-size:12px; text-transform:uppercase; letter-spacing:1px; font-weight:600;">Subject</p>
                      <p style="margin:0; color:#1e293b; font-size:16px; font-weight:500;">${subject}</p>
                    </td>
                  </tr>
                </table>

                <!-- Message -->
                <table width="100%" cellpadding="0" cellspacing="0">
                  <tr>
                    <td>
                      <p style="margin:0 0 12px; color:#64748b; font-size:12px; text-transform:uppercase; letter-spacing:1px; font-weight:600;">Message</p>
                      <div style="background-color:#f8fafc; border-left:4px solid #667eea; padding:20px; border-radius:0 8px 8px 0;">
                        <p style="margin:0; color:#334155; font-size:15px; line-height:1.7; white-space:pre-line;">${message}</p>
                      </div>
                    </td>
                  </tr>
                </table>

                <!-- Reply Button -->
                <table width="100%" cellpadding="0" cellspacing="0" style="margin-top:32px;">
                  <tr>
                    <td align="center">
                      <a href="mailto:${email}?subject=Re: ${subject}" style="display:inline-block; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color:#ffffff; text-decoration:none; padding:14px 32px; border-radius:8px; font-weight:600; font-size:14px;">
                        Reply to ${name.split(" ")[0]}
                      </a>
                    </td>
                  </tr>
                </table>

              </td>
            </tr>

            <!-- Footer -->
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
                  This email was sent from your portfolio contact form
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
    // Send email
    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true, message: "Email sent!" });
  } catch (error) {
    console.error("Email error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to send email" },
      { status: 500 }
    );
  }
}
