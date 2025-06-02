# EmailJS Setup Guide for Quintessence LLC Website

This guide will help you set up EmailJS to enable full email functionality for the contact form.

## 🚀 Quick Setup

### Step 1: Create EmailJS Account

1. **Visit [EmailJS.com](https://www.emailjs.com/)**
2. **Sign up** for a free account (allows 200 emails/month)
3. **Verify your email** address

### Step 2: Add Email Service

1. **Go to Email Services** in your EmailJS dashboard
2. **Click "Add New Service"**
3. **Choose your email provider**:
   - Gmail (recommended)
   - Outlook
   - Yahoo
   - SendGrid
   - Custom SMTP
4. **Follow the setup instructions** for your chosen provider
5. **Test the connection**
6. **Note down your Service ID** (e.g., "service_abc123")

### Step 3: Create Email Template

1. **Go to Email Templates** in your dashboard
2. **Click "Create New Template"**
3. **Use this template structure**:

```
Subject: Pacific Connection from {{from_name}}

From: {{from_name}} <{{from_email}}>
Organization: {{organization}}

Message:
{{message}}

---
Reply to: {{from_email}}
Sent via Quintessence LLC Pacific Bridge Contact Form
```

4. **Configure template variables**:
   - `from_name` - Sender's name
   - `from_email` - Sender's email
   - `organization` - Sender's organization (optional)
   - `message` - The actual message
   - `to_email` - Your email (hello@quintessence.llc)

5. **Test the template**
6. **Note down your Template ID** (e.g., "template_xyz789")

### Step 4: Get Your Public Key

1. **Go to Account** in your EmailJS dashboard
2. **Copy your Public Key** (e.g., "user_abcdef123456")

### Step 5: Configure the Website

1. **Open `script.js` in your code editor**

2. **Find this line**:
   ```javascript
   emailjs.init("YOUR_PUBLIC_KEY");
   ```

3. **Replace `YOUR_PUBLIC_KEY`** with your actual public key:
   ```javascript
   emailjs.init("user_abcdef123456");
   ```

4. **Find this line**:
   ```javascript
   emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', emailParams)
   ```

5. **Replace the placeholders**:
   ```javascript
   emailjs.send('service_abc123', 'template_xyz789', emailParams)
   ```

### Step 6: Test the Contact Form

1. **Open your website** in a browser
2. **Fill out the contact form** with test data
3. **Submit the form**
4. **Check your email** (hello@quintessence.llc) for the message
5. **Verify the sender receives a confirmation** (if you set up auto-reply)

## 🔧 Advanced Configuration

### Auto-Reply Template (Optional)

Create a second template for auto-replies to form senders:

```
Subject: Aloha! Message received - Quintessence LLC

Dear {{from_name}},

Thank you for reaching out across the Pacific! We've received your message and will connect with you soon.

Your message:
{{message}}

We appreciate your interest in our Pacific bridge initiatives.

Mahalo,
Quintessence LLC Team
Hawaii • Pacific Hub

---
This is an automated response. Please do not reply to this email.
```

### Error Handling

The website includes automatic fallback to mailto if EmailJS fails:
- Users will see their default email client open
- Email will be pre-filled with form data
- Works even if EmailJS is misconfigured

### Rate Limiting

EmailJS free plan limits:
- **200 emails/month**
- **50 emails/day**
- Upgrade available for higher volumes

## 🛠️ Troubleshooting

### Common Issues

1. **Emails not sending**:
   - Check your Service ID and Template ID
   - Verify your email service is properly connected
   - Check EmailJS dashboard for error logs

2. **Console errors**:
   - Make sure EmailJS script is loaded
   - Check for typos in configuration
   - Verify your public key is correct

3. **Spam/Junk folder**:
   - Emails might end up in spam initially
   - Add EmailJS to your safe senders list
   - Consider using a custom domain for better deliverability

### Testing

Use browser console to debug:
```javascript
// Test EmailJS configuration
console.log('EmailJS initialized:', typeof emailjs !== 'undefined');
```

## 🌊 Pacific-Themed Customization

The current setup includes:
- **Pacific-themed success messages**
- **Aloha-style confirmations**
- **Cultural bridge language**
- **Hawaii-centric branding**

Feel free to customize the notification messages in `script.js` to match your brand voice!

## 📞 Support

If you need help:
- **EmailJS Documentation**: https://www.emailjs.com/docs/
- **EmailJS Support**: support@emailjs.com
- **Website Issues**: Check the browser console for errors

---

*Setup with aloha from the Pacific* 🌺🌊 