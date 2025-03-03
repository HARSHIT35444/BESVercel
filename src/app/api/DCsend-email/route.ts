// File: app/api/send-email/route.ts
import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

interface ExistingMotorData {
  make?: string;
  kw?: string;
  hp?: string;
  rpm?: string;
  mounting?: string;
  pole?: string;
  application?: string;
}

interface MotorFormData {
  motorType?: string;
  application?: string;
  dutyDescription?: string;
  kw?: string;
  hp?: string;
  armatureVoltage?: string;
  fieldVoltage?: string;
  baseRpm?: string;
  speedVariation?: string;
  overloadClass?: string;
  delivery?: string;
  deliveryDutyDescription?: string;
  offerRequirement?: 'estimated' | 'firm';
  description?: string;
  replacement?: 'yes' | 'no';
  existingMotor?: ExistingMotorData;
  otherSpecs?: string;
}

export async function POST(req: NextRequest) {
  try {
    // Get form data
    const formData = await req.formData();
    const jsonData = formData.get('formData');
    const file = formData.get('file') as File | null;
    
    if (!jsonData) {
      return NextResponse.json(
        { message: 'Form data is required' },
        { status: 400 }
      );
    }
    
    // Parse the JSON string back to an object
    const motorData = JSON.parse(jsonData as string);
    
    // Configure email transport (use environment variables in production)
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST || 'smtp.example.com',
      port: Number(process.env.EMAIL_PORT) || 587,
      secure: process.env.EMAIL_SECURE === 'true',
      auth: {
        user: process.env.EMAIL_USER || 'your-email@example.com',
        pass: process.env.EMAIL_PASSWORD || 'your-password',
      },
    });
    
    // Create the email message
    const mailOptions = {
      from: process.env.EMAIL_FROM || 'noreply@yourcompany.com',
      to: process.env.EMAIL_TO || 'sales@yourcompany.com',
      subject: `DC Motor Enquiry - ${motorData.motorType || 'New Enquiry'}`,
      text: createEmailBody(motorData),
      html: createHtmlEmailBody(motorData),
      attachments: [] as {filename: string, content?: Buffer, contentType?: string}[],
    };
    
    // Add attachment if a file was uploaded
    if (file) {
      const buffer = Buffer.from(await file.arrayBuffer());
      mailOptions.attachments.push({
        filename: file.name,
        content: buffer,
        contentType: file.type,
      });
    }
    
    // Send the email
    await transporter.sendMail(mailOptions);
    
    return NextResponse.json(
      { message: 'Email sent successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { message: 'Failed to send email', error: (error as Error).message },
      { status: 500 }
    );
  }
}

// Function to generate plain text email body
function createEmailBody(data: MotorFormData): string {
  let body = 'DC MOTOR ENQUIRY FORM SUBMISSION\n\n';
  body += '------- MOTOR SPECIFICATIONS -------\n';
  body += `Type of Motor: ${data.motorType || 'Not specified'}\n`;
  body += `Application: ${data.application || 'Not specified'}\n`;
  
  if (data.application === 'other' && data.dutyDescription) {
    body += `Duty Description: ${data.dutyDescription}\n`;
  }
  
  body += `Power: ${data.kw || 'Not specified'} KW / ${data.hp || 'Not specified'} HP\n`;
  body += `Armature Voltage: ${data.armatureVoltage || 'Not specified'}\n`;
  body += `Field Voltage: ${data.fieldVoltage || 'Not specified'}\n`;
  body += `Base RPM: ${data.baseRpm || 'Not specified'}\n`;
  body += `Speed Variation: ${data.speedVariation || 'Not specified'}\n`;
  body += `Overload Class: ${data.overloadClass || 'Not specified'}\n`;
  body += `Expected Delivery: ${data.delivery || 'Not specified'}\n`;
  
  if (data.delivery === 'other' && data.deliveryDutyDescription) {
    body += `Delivery Description: ${data.deliveryDutyDescription}\n`;
  }
  
  body += `Offer Requirement: ${data.offerRequirement === 'estimated' ? 'Estimated' : 'Firm'}\n`;
  
  if (data.description) {
    body += '\n------- ADDITIONAL DESCRIPTION -------\n';
    body += `${data.description}\n`;
  }
  
  body += `\nRequirement is for Replacement: ${data.replacement === 'yes' ? 'Yes' : 'No'}\n`;
  
  if (data.replacement === 'yes') {
    body += '\n------- EXISTING MOTOR DETAILS -------\n';
    body += `Make: ${data.existingMotor?.make || 'Not specified'}\n`;
    body += `Power: ${data.existingMotor?.kw || 'Not specified'} KW / ${data.existingMotor?.hp || 'Not specified'} HP\n`;
    body += `RPM: ${data.existingMotor?.rpm || 'Not specified'}\n`;
    body += `Mounting: ${data.existingMotor?.mounting || 'Not specified'}\n`;
    body += `Pole: ${data.existingMotor?.pole || 'Not specified'}\n`;
    body += `Application: ${data.existingMotor?.application || 'Not specified'}\n`;
  }
  
  if (data.otherSpecs) {
    body += '\n------- OTHER SPECIFICATIONS -------\n';
    body += `${data.otherSpecs}\n`;
  }
  
  return body;
}

// Function to generate HTML email body
function createHtmlEmailBody(data: MotorFormData): string {
  let html = `
    <h1 style="color: #333;">DC Motor Enquiry Form Submission</h1>
    <div style="margin: 20px 0; padding: 15px; border: 1px solid #ddd; border-radius: 5px; background-color: #f9f9f9;">
      <h2 style="color: #444; border-bottom: 1px solid #eee; padding-bottom: 10px;">Motor Specifications</h2>
      <table style="width: 100%; border-collapse: collapse;">
        <tr>
          <td style="padding: 8px; border-bottom: 1px solid #eee; width: 30%;"><strong>Type of Motor:</strong></td>
          <td style="padding: 8px; border-bottom: 1px solid #eee;">${data.motorType || 'Not specified'}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Application:</strong></td>
          <td style="padding: 8px; border-bottom: 1px solid #eee;">${data.application || 'Not specified'}</td>
        </tr>`;
        
  if (data.application === 'other' && data.dutyDescription) {
    html += `
        <tr>
          <td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Duty Description:</strong></td>
          <td style="padding: 8px; border-bottom: 1px solid #eee;">${data.dutyDescription.replace(/\n/g, '<br>')}</td>
        </tr>`;
  }
  
  html += `
        <tr>
          <td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Power:</strong></td>
          <td style="padding: 8px; border-bottom: 1px solid #eee;">${data.kw || 'Not specified'} KW / ${data.hp || 'Not specified'} HP</td>
        </tr>
        <tr>
          <td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Armature Voltage:</strong></td>
          <td style="padding: 8px; border-bottom: 1px solid #eee;">${data.armatureVoltage || 'Not specified'}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Field Voltage:</strong></td>
          <td style="padding: 8px; border-bottom: 1px solid #eee;">${data.fieldVoltage || 'Not specified'}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Base RPM:</strong></td>
          <td style="padding: 8px; border-bottom: 1px solid #eee;">${data.baseRpm || 'Not specified'}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Speed Variation:</strong></td>
          <td style="padding: 8px; border-bottom: 1px solid #eee;">${data.speedVariation || 'Not specified'}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Overload Class:</strong></td>
          <td style="padding: 8px; border-bottom: 1px solid #eee;">${data.overloadClass || 'Not specified'}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Expected Delivery:</strong></td>
          <td style="padding: 8px; border-bottom: 1px solid #eee;">${data.delivery || 'Not specified'}</td>
        </tr>`;
        
  if (data.delivery === 'other' && data.deliveryDutyDescription) {
    html += `
        <tr>
          <td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Delivery Description:</strong></td>
          <td style="padding: 8px; border-bottom: 1px solid #eee;">${data.deliveryDutyDescription.replace(/\n/g, '<br>')}</td>
        </tr>`;
  }
  
  html += `
        <tr>
          <td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Offer Requirement:</strong></td>
          <td style="padding: 8px; border-bottom: 1px solid #eee;">${data.offerRequirement === 'estimated' ? 'Estimated' : 'Firm'}</td>
        </tr>
      </table>`;
      
  if (data.description) {
    html += `
      <h2 style="color: #444; border-bottom: 1px solid #eee; padding-bottom: 10px; margin-top: 20px;">Additional Description</h2>
      <p style="padding: 8px;">${data.description.replace(/\n/g, '<br>')}</p>`;
  }
  
  html += `
      <h2 style="color: #444; border-bottom: 1px solid #eee; padding-bottom: 10px; margin-top: 20px;">Replacement Information</h2>
      <p style="padding: 8px;"><strong>Requirement is for Replacement:</strong> ${data.replacement === 'yes' ? 'Yes' : 'No'}</p>`;
  
  if (data.replacement === 'yes') {
    html += `
      <h2 style="color: #444; border-bottom: 1px solid #eee; padding-bottom: 10px; margin-top: 20px;">Existing Motor Details</h2>
      <table style="width: 100%; border-collapse: collapse;">
        <tr>
          <td style="padding: 8px; border-bottom: 1px solid #eee; width: 30%;"><strong>Make:</strong></td>
          <td style="padding: 8px; border-bottom: 1px solid #eee;">${data.existingMotor?.make || 'Not specified'}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Power:</strong></td>
          <td style="padding: 8px; border-bottom: 1px solid #eee;">${data.existingMotor?.kw || 'Not specified'} KW / ${data.existingMotor?.hp || 'Not specified'} HP</td>
        </tr>
        <tr>
          <td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>RPM:</strong></td>
          <td style="padding: 8px; border-bottom: 1px solid #eee;">${data.existingMotor?.rpm || 'Not specified'}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Mounting:</strong></td>
          <td style="padding: 8px; border-bottom: 1px solid #eee;">${data.existingMotor?.mounting || 'Not specified'}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Pole:</strong></td>
          <td style="padding: 8px; border-bottom: 1px solid #eee;">${data.existingMotor?.pole || 'Not specified'}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Application:</strong></td>
          <td style="padding: 8px; border-bottom: 1px solid #eee;">${data.existingMotor?.application || 'Not specified'}</td>
        </tr>
      </table>`;
  }
  
  if (data.otherSpecs) {
    html += `
      <h2 style="color: #444; border-bottom: 1px solid #eee; padding-bottom: 10px; margin-top: 20px;">Other Specifications</h2>
      <p style="padding: 8px;">${data.otherSpecs.replace(/\n/g, '<br>')}</p>`;
  }
  
  html += `
    </div>
    <p style="color: #777; font-size: 12px; margin-top: 30px;">This email was sent automatically from your website's DC Motor Enquiry Form.</p>`;
  
  return html;
}