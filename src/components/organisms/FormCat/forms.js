export default {
  web: [
    {
      name: "web_responsive",
      label: "Responsiveness",
      info:
        "Is the website responsive? How well does the responsive version work?",
      min: 0,
      max: 100,
      default: 50,
    },
    {
      name: "web_design",
      label: "Design",
      info:
        "Check for a new, modern design. No strange colors, comic sans or similar. Clean colors, which remain consistent throughout the whole website. Menu is intuitive and well structured. Links to social media are embedded.",
      min: 0,
      max: 100,
      default: 50,
    },
    {
      name: "web_wording",
      label: "Wording",
      info:
        "No spelling errors. Short and concise. Texts seem professional and not sloppy. Crucial Information is present: address, contact information, open hours.",
      min: 0,
      max: 100,
      default: 50,
    },
    {
      name: "web_picture_quality",
      label: "Picture Quality",
      info:
        "Check if the images are fitting and look professional. They should express what they are supposed to do.",
      min: 0,
      max: 100,
      default: 50,
    },
    {
      name: "web_analysis",
      label: "Analysis",
      info:
        "Check if Google Analytics or Facebook Pixel is integrated. (Check Network Tab in Development tools)",
      min: 0,
      max: 100,
      default: 50,
    },
    {
      name: "web_legal",
      label: "Legal",
      info: "Check if the required legal pages (about, privacy, ...) exist.",
      min: 0,
      max: 100,
      default: 50,
    },
    {
      name: "web_contact",
      label: "Contact Details",
      info:
        "How easy is it to contact the company? Is there a maps integration (if needed), phone, email, address, ...",
      min: 0,
      max: 100,
      default: 50,
    },
    {
      name: "web_performance",
      label: "Performance in ms",
      info:
        "Measure the performance using the Performance Tab in Development tools.",
      min: 0,
      max: 5000,
      default: 1000,
    },
  ],
  facebook: [
    {
      name: "facebook_likes",
      label: "Page Likes",
      info:
        "Does the number of page likes represent the average of other companies in the same sector?",
      min: 0,
      max: 100,
      default: 50,
    },
    {
      name: "facebook_branding",
      label: "Page Branding",
      info: "Logo implementation, banner, post design, consistency.",
      min: 0,
      max: 100,
      default: 50,
    },
    {
      name: "facebook_regularity",
      label: "Post Regularity",
      info: "How often and how regular does the company post on Facebook?",
      min: 0,
      max: 100,
      default: 50,
    },
    {
      name: "facebook_contact",
      label: "Contact",
      info:
        "How easy is it to contact the company? Does the company actually encourage action?",
      min: 0,
      max: 100,
      default: 50,
    },
  ],
  instagram: [
    {
      name: "instagram_picture_quality",
      label: "Picture Quality",
      info:
        "Uploaded Pictures look professional. If info graphics or so are posted, their design is consistent throughout the account. Stories are not just shaky videos. If products are sold, the posts should display them properly. ",
      min: 0,
      max: 100,
      default: 50,
    },
    {
      name: "instagram_caption",
      label: "Caption quality",
      info:
        "There are captions, first of all. The captions fit the corresponding picture and are free of spelling errors. Correct and sufficient use of hashtags (important!).",
      min: 0,
      max: 100,
      default: 50,
    },
    {
      name: "instagram_regularity",
      label: "Post regularity",
      info:
        "How often and how regular does the company post new images and/or stories?",
      min: 0,
      max: 100,
      default: 50,
    },
    {
      name: "instagram_followers",
      label: "Follower Tier",
      info:
        "How many followers does the account have? Does it map to the average like on images? 1000 followers = 50 points, 10000 followers = 100 points",
      min: 0,
      max: 100,
      default: 50,
    },
  ],
  corporate: [
    {
      name: "corporate_logo",
      label: "Logo Quality",
      info:
        "The logo should look modern or have weight and history to it. The logo must represent the company and has to be fitting to the sector. Resolution is also to be considered. ",
      min: 0,
      max: 100,
      default: 50,
    },
    {
      name: "corporate_consistency",
      label: "Consistency",
      info: "The Corporate Identity should be consistent across all platforms.",
      min: 0,
      max: 100,
      default: 50,
    },
  ],
  image: [
    {
      name: "image_film",
      label: "Image films",
      info:
        "Does the company has any image films? Are they good? Is the information clear and the video short and interesting?",
      min: 0,
      max: 100,
      default: 50,
    },
    {
      name: "image_portfolio",
      label: "Portfolio",
      info:
        "Does the company has a portfolio. This can consist of videos, photos, finished work, list of partner, ...",
      min: 0,
      max: 100,
      default: 50,
    },
  ],
  seo: [
    {
      name: "seo_traceability",
      label: "Traceability",
      info: "How easy is it to find the company on Google Search?",
      min: 0,
      max: 100,
      default: 50,
    },
    {
      name: "seo_code",
      label: "Code Quality",
      info: "How is the code quality? This does affect the listing position.",
      min: 0,
      max: 100,
      default: 50,
    },
    {
      name: "seo_meta",
      label: "Meta Tags",
      info:
        "Meta tags are existent and fitting? Are there opengraph tags for Facebook?",
      min: 0,
      max: 100,
      default: 50,
    },
    {
      name: "seo_https",
      label: "SSL Certificate",
      info:
        "Does the website have a https:// connection? How secure does the website look?",
      min: 0,
      max: 100,
      default: 50,
    },
    {
      name: "seo_domain",
      label: "Domain",
      info: "How fitting is the domain? Is there a better one?",
      min: 0,
      max: 100,
      default: 50,
    },
  ],
};

/**
 * SPDX-License-Identifier: (EUPL-1.2)
 * Copyright © 2020 Christian Aichner
 */
