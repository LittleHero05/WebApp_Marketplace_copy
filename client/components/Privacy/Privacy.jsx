import React from 'react';
import { Container, Typography, Box, List, ListItem, ListItemText } from '@mui/material';
import './Privacy.css'; // Import the external CSS file

const PrivacyPolicy = () => {
  return (
    <Container maxWidth="md" className="privacy-policy-container">
      <Box className="privacy-policy-box">
        <Typography variant="h4" gutterBottom className="privacy-policy-heading">
          Privacy Policy
        </Typography>
        <Typography variant="body1" paragraph className="privacy-policy-text">
          Your privacy is important to us. This privacy policy outlines the types of personal information that we collect and how it is used and protected.
        </Typography>

        <Typography variant="h6" gutterBottom className="privacy-policy-subheading">
          1. Information We Collect
        </Typography>
        <Typography variant="body1" paragraph className="privacy-policy-text">
          We collect personal information when you use our services, including:
        </Typography>
        <List className="privacy-policy-list">
          <ListItem>
            <ListItemText primary="Contact Information (e.g., name, email address)" />
          </ListItem>
          <ListItem>
            <ListItemText primary="Usage Data (e.g., how you interact with our website)" />
          </ListItem>
          <ListItem>
            <ListItemText primary="Location Data (if enabled on your device)" />
          </ListItem>
        </List>

        <Typography variant="h6" gutterBottom className="privacy-policy-subheading">
          2. How We Use Your Information
        </Typography>
        <Typography variant="body1" paragraph className="privacy-policy-text">
          We use the information we collect to:
        </Typography>
        <List className="privacy-policy-list">
          <ListItem>
            <ListItemText primary="Provide, improve, and personalize our services" />
          </ListItem>
          <ListItem>
            <ListItemText primary="Send you important updates, such as security notices" />
          </ListItem>
          <ListItem>
            <ListItemText primary="Respond to your inquiries and provide customer support" />
          </ListItem>
        </List>

        <Typography variant="h6" gutterBottom className="privacy-policy-subheading">
          3. How We Protect Your Information
        </Typography>
        <Typography variant="body1" paragraph className="privacy-policy-text">
          We implement security measures to protect your personal information, including:
        </Typography>
        <List className="privacy-policy-list">
          <ListItem>
            <ListItemText primary="Encryption for data transmission" />
          </ListItem>
          <ListItem>
            <ListItemText primary="Access controls to ensure only authorized personnel can access your data" />
          </ListItem>
        </List>

        <Typography variant="h6" gutterBottom className="privacy-policy-subheading">
          4. Sharing Your Information
        </Typography>
        <Typography variant="body1" paragraph className="privacy-policy-text">
          We do not sell, trade, or rent your personal information to third parties. However, we may share your information with trusted service providers who help us operate our business.
        </Typography>

        <Typography variant="h6" gutterBottom className="privacy-policy-subheading">
          5. Your Rights and Choices
        </Typography>
        <Typography variant="body1" paragraph className="privacy-policy-text">
          You have the right to:
        </Typography>
        <List className="privacy-policy-list">
          <ListItem>
            <ListItemText primary="Access the personal information we hold about you" />
          </ListItem>
          <ListItem>
            <ListItemText primary="Request corrections to your personal information" />
          </ListItem>
          <ListItem>
            <ListItemText primary="Request deletion of your personal information (subject to legal obligations)" />
          </ListItem>
        </List>

        <Typography variant="h6" gutterBottom className="privacy-policy-subheading">
          6. Cookies and Tracking Technologies
        </Typography>
        <Typography variant="body1" paragraph className="privacy-policy-text">
          We use cookies and other tracking technologies to enhance your experience and gather information about how our services are used. You can control cookies through your browser settings.
        </Typography>

        <Typography variant="h6" gutterBottom className="privacy-policy-subheading">
          7. Changes to This Privacy Policy
        </Typography>
        <Typography variant="body1" paragraph className="privacy-policy-text">
          We may update this privacy policy from time to time. When we do, we will post the updated policy on this page and revise the "Last Updated" date.
        </Typography>

        <Typography variant="h6" gutterBottom className="privacy-policy-subheading">
          8. Contact Us
        </Typography>
        <Typography variant="body1" paragraph className="privacy-policy-text">
          If you have any questions about this privacy policy, please contact us at:
        </Typography>
        <Typography variant="body1" paragraph className="privacy-policy-text">
          Email: <a href="mailto:cantrade@ctrade.ca">cantrade@gmail.com</a>
        </Typography>
      </Box>
    </Container>
  );
};

export default PrivacyPolicy;
