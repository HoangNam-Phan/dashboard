This is a Next.js project built on top of the following technologies:

- React
- Tailwind
- Typescript
- MongoDB Atlas
- Jest
- Cypress
- Framer Motion

To run this app locally, you first need to install the packages with npm install.
If youre encountering any issues, make sure you have python installed on youre local machine.

Then run the local development server with either:

npm run dev / yarn dev / pnpm dev / bun dev

This projects sole purpose is to act as a showcase app and is not meant for personal use, so please refrain from
using any personal data. For ease of use, i added the .env.local to the github repo. In a real world application,
this should NOT be the case, as it holds sensitive data. But for easy of use and as the API keys are all free to
use, i decided to add them, so the project can be used locally by others.

User authentication is done with session tokens, internationalization with i18n and the data is being managed in
a free MongoDB Atlas Cluster. The Stock API has a daily limit of 25 requests and the News API only works on localhost.
Thank you for checking the project out!


- Nam Phan
