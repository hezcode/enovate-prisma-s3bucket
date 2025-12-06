import sgMail from "@sendgrid/mail";
import { NextRequest, NextResponse } from "next/server";

const sendgridApiKey = process.env.SENDGRID_API_KEY;
const ownerEmail = process.env.OWNER_EMAIL;
const senderEmail = process.env.SENDER_EMAIL;

export async function POST(req: any) {
  const { name, gotToKnowEnovate, service, budget, email, moreDetails } =
    await req.json();
  //   const body = await req.json();
  //   console.log(body);
  try {
    if (!sendgridApiKey || !ownerEmail || !senderEmail) {
      throw new Error(
        "Missing Sendgrid or owner email or sendEmail missing API key"
      );
    }
    sgMail.setApiKey(sendgridApiKey);

    const msg = {
      to: ownerEmail,
      from: senderEmail,
      subject: "Lead - New Message from Enovate Studio Visitor",
      html: `
        <h2> New Message received </h2>
        <p> You have a new message from ${name}, They got to know about Enovate Studio through ${gotToKnowEnovate}. They need the following service from you ${service} and their budget is ${budget}. Their email is ${email}. </p>
        <p> ${moreDetails} </p>
      `,
    };
    const autoResponse = {
      to: email,
      from: senderEmail,
      subject: "We have Received Your Message — Thanks for Reaching Out 🚀",
      html: `
        <p>Good day ${name},</p>
        <p> Thank you for contacting Enovate — your message has been successfully received!</p>
        <p>One of our team members is already reviewing your request, and we will get back to you shortly with the next steps.
        We typically respond within a few hours, but no later than 24 hours on business days.</p>
        <br/>
        <p>Looking forward to connecting with you,</p>
        <p><b>The Enovate Team</b></p>
      `,
    };

    await Promise.all([sgMail.send(msg), sgMail.send(autoResponse)]);
    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ status: false, message: error });
  }
}
