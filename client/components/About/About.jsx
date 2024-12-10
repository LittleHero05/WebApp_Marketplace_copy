import React from "react";
import { Box, Typography, Grid, Container } from "@mui/material";
import work1 from "../../assets/working.jpg";
import work2 from "../../assets/working2.jpg";
import "./About.css";

const About = () => {
    return (
        <Container maxWidth="lg" sx={{ py: 6 }}>
            {/* Header Section */}
            <Box sx={{ textAlign: "center", mb: 9 }}>
                <Typography variant="h4" textAlign={'center'} fontWeight={'bold'}>
                    About Us
                </Typography>
                <Typography variant="h6" color="textSecondary">
                    Learn more about our mission, vision, and the team members that made this application possible.
                </Typography>
            </Box>

            {/* Mission Section */}
            <Grid container spacing={4} alignItems="center" sx={{ mb: 6 }} className="section">
                <Grid item xs={12} md={6}>
                    <Box>
                        <Typography variant="h4" component="h2" gutterBottom>
                            Our Mission
                        </Typography>
                        <Typography variant="body1" color="textSecondary">
                            Our mission is to create a platform that allows people to buy and sell their things.
                            Whether those things be new, old, or even handmade -- we want to provide a space for
                            people to connect and share their goods with others.
                        </Typography>
                    </Box>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Box
                        component="img"
                        className="image"
                        src={work1}
                        alt="Our Mission"
                        sx={{ width: "100%", borderRadius: 2, boxShadow: 3 }}
                    />
                </Grid>
            </Grid>

            {/* Vision Section */}
            <Grid container spacing={4} alignItems="center" justifyContent="center" sx={{ mb: 6 }} className="section">
                <Grid item xs={12} md={6} order={{ xs: 2, md: 1 }}>
                    <Box
                        component="img"
                        className="image"
                        src={work2}
                        alt="Our Vision"
                        sx={{ width: "100%", borderRadius: 2, boxShadow: 3 }}
                    />
                </Grid>
                <Grid item xs={12} md={6} order={{ xs: 1, md: 2 }}>
                    <Box>
                        <Typography variant="h4" component="h2" gutterBottom>
                            Our Team
                        </Typography>
                        <Typography variant="body1" color="textSecondary">
                            The team behind this application is made up of four developers who are passionate about
                            creating applications that make a difference. We are dedicated to providing a platform that
                            is easy to use, secure, and reliable.
                        </Typography>
                    </Box>
                </Grid>
            </Grid>

            {/* Values Section */}
            <Box sx={{ textAlign: "center", py: 4, bgcolor: "grey.100", borderRadius: 2 }}>
                <Typography variant="h4" component="h2" gutterBottom>
                    Our Core Values
                </Typography>
                <Typography variant="body1" color="textSecondary" sx={{ mb: 4 }}>
                    We are guided by principles that inspire us to be better every day.
                </Typography>
                <Grid container spacing={4} justifyContent="center">
                    <Grid item xs={12} sm={4}>
                        <Typography variant="h6" gutterBottom>
                            Innovation
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                            Driving progress with creative ideas and cutting-edge technology.
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Typography variant="h6" gutterBottom>
                            Integrity
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                            Upholding honesty, transparency, and ethics in everything we do.
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Typography variant="h6" gutterBottom>
                            Customer Focus
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                            Putting our customers at the heart of our decisions and actions.
                        </Typography>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    );
};

export default About;
