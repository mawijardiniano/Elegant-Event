Authentication API Admin
- username
- email
- password


Venue API
-Image
-Venue Name
-ratings
-description
-capacity
-location
-tags
-price

Event Type API
- Event Type

Package API
- Package Name

Additional Service API
- Service Name
- Service Price

Payment Method API
-Payment Option (Pay FUll/ Pay Deposit 25%)

Booking API
- Venue Id
- Date and Time //can see if is reserved
- Event type Id
- Expected Guest
- Event Name
- Description //optional
- Special Req or accomodations //optional
- Package ID
- Addtional Service ID //optional 
- First Name
- Last Name
- Email
- Number
-Payment Method ID
-Card Info
-timestamp


Reservation Flow
1. Select Venue
2. Date and Time
3. Event Details
4. Select Package and Add Ons
5. Contact Info
6. Review and Summary
7. Payment
8. Confirmation



1. Make a service
2. Make a controller
3. Make a routes
4. Last is Connect to server.js

npx prisma migrate dev --name //EventType