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
    await sgMail.send(msg).then(() => {
      console.log("Email sent");
    });
    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ status: false, message: error });
  }
}
