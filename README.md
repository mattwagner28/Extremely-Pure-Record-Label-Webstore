# Purpose / User Story
I run a small record label called Extremely Pure. I built a full-stack webstore for the label using a payment system through Stripe because their purchase fees are significantly less than Bandcamp, which currently takes 15% percent of all sales (digital downloads and merch).

# Software Used
This site was buld using a PERN stack (PostgreSQL, Express, React, and Node). For CSS and responsive design, I implemented Tailwind. As mentioned, I also used Stripe's embedded checkout React component for secure payments. Google Analytics is also used. 

# Notable features
## Webstore and Cart
The Store component allows the user to add to or remove items from the cart without needing to click on an individual product's page. However, each release does have an individual info page where the user can also add or remove an item from 
the cart. The Cart component can be accessed from any page, with sleek slide-in slide-out functionality. 

## User Profile 
Users have the option to securely create an account to enhance user experience. The main benefit, is that if a user is logged in while ordering a product, the order information is saved to the database and will be displayed in the user's profile upon logging in. User login, signup, and password reset functionality were created with a mindfullness toward cybersecurity, implementing systems using bcrypt and JWTs.

# Deployment
https://www.extremelypurerecords.com/
I used Render.com to deploy both the front end, the server, and for postgreSQL hosting. 








