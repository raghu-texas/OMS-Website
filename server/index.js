// Simple Express server for handling demo booking email notifications
const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

// Load email config
const configPath = path.join(__dirname, 'emailconfig.json');
const emailConfig = JSON.parse(fs.readFileSync(configPath, 'utf-8'));

const app = express();
const PORT = emailConfig.PORT || 3001;

// Middleware
app.use(cors());
app.use(bodyParser.json());

const transporter = nodemailer.createTransport({
  host: emailConfig.SMTP_HOST,
  port: emailConfig.SMTP_PORT,
  secure: emailConfig.SMTP_SECURE,
  auth: {
    user: emailConfig.SMTP_USER,
    pass: emailConfig.SMTP_PASS,
  },
});

app.post('/api/book-demo', async (req, res) => {
  const {
    firstName,
    lastName,
    email,
    mobile,
    practice,
    surgeons,
    offices,
    description,
    appointmentDate,
    appointmentTime,
    timeOfDay
  } = req.body;

  const mailOptions = {
    from: emailConfig.FROM_EMAIL,
    to: emailConfig.ADMIN_EMAIL,
    subject: 'New Demo Request Submitted – Action Required',
    html: `
    <div style="font-family: Arial, sans-serif; font-size: 15px; color: #222;">

      <p>Dear Ali,</p>

      <p>
        We have received a new inquiry through the Request Demo from a new vendor
        interested in connecting with our Onlinemedsys.com website.
      </p>

      <p>Please find the details below:</p>

      <table 
        border="1" 
        cellpadding="8" 
        cellspacing="0" 
        style="border-collapse: collapse; min-width: 400px;"
      >
        <thead>
          <tr style="background:#f2f2f2;">
            <th align="left">Field Name</th>
            <th align="left">Submitted Value</th>
          </tr>
        </thead>

        <tbody>

          <tr style="background:#ffffff;">
            <td>Date</td>
            <td>${appointmentDate}</td>
          </tr>

          <tr style="background:#f2f2f2;">
            <td>Session</td>
            <td>${timeOfDay}</td>
          </tr>

          <tr style="background:#ffffff;">
            <td>Time</td>
            <td>${appointmentTime}</td>
          </tr>

          <tr style="background:#f2f2f2;">
            <td>First Name</td>
            <td>${firstName}</td>
          </tr>

          <tr style="background:#ffffff;">
            <td>Last Name</td>
            <td>${lastName}</td>
          </tr>

          <tr style="background:#f2f2f2;">
            <td>Email</td>
            <td>${email}</td>
          </tr>

          <tr style="background:#ffffff;">
            <td>Mobile</td>
            <td>${mobile}</td>
          </tr>

          <tr style="background:#f2f2f2;">
            <td>Practice Name</td>
            <td>${practice}</td>
          </tr>

          <tr style="background:#ffffff;">
            <td>Number of Surgeons</td>
            <td>${surgeons}</td>
          </tr>

          <tr style="background:#f2f2f2;">
            <td>Number of Offices</td>
            <td>${offices}</td>
          </tr>

          <tr style="background:#ffffff;">
            <td>Description</td>
            <td>${description || 'N/A'}</td>
          </tr>

        </tbody>
      </table>

      <br />

      <p>
        Thank you,<br />
        Onlinemedsys.com
      </p>

      <hr style="margin: 24px 0; border: none; border-top: 1px solid #eee;" />

      <p style="font-size: 12px; color: #888;">
        This email was automatically generated from the website demo request form.
      </p>

    </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
