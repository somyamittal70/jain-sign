# Jain Signature Studio – Landing Page (React + Tailwind)
```
npm install
npm run dev      # http://localhost:5173
npm run build    # output in dist/
```
Real project photos: put them in `public/projects/` as `project-1.jpg` … `project-8.jpg`
(the page shows a colour placeholder until a photo exists). Do not use stock photos as the company's work.
The enquiry form is a demo: nothing is sent. Replace `submit()` in `src/pages/QuoteForm.jsx` with a real API call when going live.

## Structure
```
src/
  main.jsx            entry
  index.css           Tailwind + shared classes
  data/content.js     all text, links and lists
  pages/
    Home.jsx          page layout, popup state
    Header.jsx  Hero.jsx  Stats.jsx  Services.jsx  Projects.jsx
    Process.jsx  WhyUs.jsx  Faq.jsx  FinalCta.jsx  Footer.jsx
    MobileBar.jsx  QuoteModal.jsx  QuoteForm.jsx
```
