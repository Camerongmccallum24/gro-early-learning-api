const nodemailer = require('nodemailer');

class Email {
  constructor(user, url) {
    this.to = user.email;
    this.firstName = user.profile?.firstName || user.name;
    this.url = url;
    this.from = `ATS System <${process.env.EMAIL_FROM || 'noreply@ats.com'}>`;
  }

  newTransport() {
    if (process.env.NODE_ENV === 'production') {
      // Production email service (e.g., SendGrid, Mailgun)
      return nodemailer.createTransporter({
        service: 'SendGrid',
        auth: {
          user: process.env.SENDGRID_USERNAME,
          pass: process.env.SENDGRID_PASSWORD,
        },
      });
    }

    // Development using Gmail or other SMTP
    return nodemailer.createTransporter({
      host: process.env.EMAIL_HOST || 'smtp.gmail.com',
      port: process.env.EMAIL_PORT || 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
  }

  async send(template, subject) {
    // Define email options
    const mailOptions = {
      from: this.from,
      to: this.to,
      subject,
      html: template,
    };

    // Create a transport and send email
    await this.newTransport().sendMail(mailOptions);
  }

  async sendWelcome() {
    const template = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333;">Welcome to ATS!</h2>
        <p>Hi ${this.firstName},</p>
        <p>Welcome to our Applicant Tracking System! We're excited to have you on board.</p>
        <p>To get started, please verify your email address by clicking the button below:</p>
        <div style="text-align: center; margin: 30px 0;">
          <a href="${this.url}" style="background-color: #007bff; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; display: inline-block;">Verify Email</a>
        </div>
        <p>If you didn't create this account, please ignore this email.</p>
        <p>Best regards,<br>The ATS Team</p>
      </div>
    `;
    
    await this.send(template, 'Welcome to ATS - Please verify your email');
  }

  async sendPasswordReset() {
    const template = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333;">Password Reset Request</h2>
        <p>Hi ${this.firstName},</p>
        <p>We received a request to reset your password. Click the button below to create a new password:</p>
        <div style="text-align: center; margin: 30px 0;">
          <a href="${this.url}" style="background-color: #dc3545; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; display: inline-block;">Reset Password</a>
        </div>
        <p>This link will expire in 10 minutes.</p>
        <p>If you didn't request a password reset, please ignore this email.</p>
        <p>Best regards,<br>The ATS Team</p>
      </div>
    `;
    
    await this.send(template, 'Password Reset Request');
  }

  async sendEmailVerification() {
    const template = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333;">Email Verification</h2>
        <p>Hi ${this.firstName},</p>
        <p>Please verify your email address by clicking the button below:</p>
        <div style="text-align: center; margin: 30px 0;">
          <a href="${this.url}" style="background-color: #28a745; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; display: inline-block;">Verify Email</a>
        </div>
        <p>This link will expire in 24 hours.</p>
        <p>Best regards,<br>The ATS Team</p>
      </div>
    `;
    
    await this.send(template, 'Email Verification Required');
  }

  async sendApplicationConfirmation(jobTitle) {
    const template = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333;">Application Received</h2>
        <p>Hi ${this.firstName},</p>
        <p>Thank you for applying for the position of <strong>${jobTitle}</strong>.</p>
        <p>We have received your application and our team will review it shortly. You will be notified about the next steps via email.</p>
        <p>In the meantime, you can track your application status in your dashboard.</p>
        <p>Best regards,<br>The ATS Team</p>
      </div>
    `;
    
    await this.send(template, `Application Received - ${jobTitle}`);
  }

  async sendApplicationStatusUpdate(jobTitle, status) {
    const statusMessages = {
      under_review: 'is currently under review',
      screening: 'has passed initial screening',
      phone_interview: 'has been selected for a phone interview',
      video_interview: 'has been selected for a video interview',
      onsite_interview: 'has been selected for an onsite interview',
      offer_extended: 'has resulted in a job offer',
      hired: 'has been successful - Welcome aboard!',
      rejected: 'was not selected for this position',
    };

    const statusMessage = statusMessages[status] || 'has been updated';
    
    const template = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333;">Application Status Update</h2>
        <p>Hi ${this.firstName},</p>
        <p>We wanted to update you on your application for the position of <strong>${jobTitle}</strong>.</p>
        <p>Your application <strong>${statusMessage}</strong>.</p>
        ${status === 'hired' ? '<p>🎉 Congratulations! We look forward to working with you.</p>' : ''}
        ${status === 'rejected' ? '<p>Thank you for your interest in our company. We encourage you to apply for future opportunities that match your skills.</p>' : ''}
        <p>You can view more details in your dashboard.</p>
        <p>Best regards,<br>The ATS Team</p>
      </div>
    `;
    
    await this.send(template, `Application Update - ${jobTitle}`);
  }

  async sendInterviewInvitation(jobTitle, interviewType, scheduledDate, location) {
    const template = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333;">Interview Invitation</h2>
        <p>Hi ${this.firstName},</p>
        <p>Congratulations! You have been selected for a <strong>${interviewType}</strong> interview for the position of <strong>${jobTitle}</strong>.</p>
        <div style="background-color: #f8f9fa; padding: 20px; margin: 20px 0; border-radius: 5px;">
          <h3 style="margin-top: 0;">Interview Details:</h3>
          <p><strong>Date & Time:</strong> ${new Date(scheduledDate).toLocaleString()}</p>
          <p><strong>Type:</strong> ${interviewType}</p>
          <p><strong>Location/Link:</strong> ${location}</p>
        </div>
        <p>Please confirm your attendance and let us know if you have any questions.</p>
        <p>We look forward to speaking with you!</p>
        <p>Best regards,<br>The ATS Team</p>
      </div>
    `;
    
    await this.send(template, `Interview Invitation - ${jobTitle}`);
  }

  async sendOfferLetter(jobTitle, salary, startDate) {
    const template = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333;">Job Offer</h2>
        <p>Hi ${this.firstName},</p>
        <p>🎉 Congratulations! We are pleased to offer you the position of <strong>${jobTitle}</strong>.</p>
        <div style="background-color: #f8f9fa; padding: 20px; margin: 20px 0; border-radius: 5px;">
          <h3 style="margin-top: 0;">Offer Details:</h3>
          <p><strong>Position:</strong> ${jobTitle}</p>
          <p><strong>Salary:</strong> ${salary}</p>
          <p><strong>Start Date:</strong> ${startDate}</p>
        </div>
        <p>Please review the attached offer letter and let us know your decision.</p>
        <p>We're excited about the possibility of having you join our team!</p>
        <p>Best regards,<br>The ATS Team</p>
      </div>
    `;
    
    await this.send(template, `Job Offer - ${jobTitle}`);
  }
}

module.exports = Email; 