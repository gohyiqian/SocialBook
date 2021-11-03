# SocialBook

A full-stack responsive social media platform application with the following features:
1. Post Images
2. Like/ Dislike Post
3. Follow/ Unfollow Users
4. multi-users chat capability using socket io
Self-practice project to improve my development skills.

## Social Media App built with:
- ReactJS
- NodeJS
- ExpressJS
- MongoDB
- Socket io

## Styled primarily using:
- Material UI
- CSS Flexbox

## Authorisation & Authentication:
- JWT Tokens
- Utilised useContext hooks, Redux and Dispatch to pass user credentials to authorised routes.

## Other packages or libraries used:
- dotenv
- mongoose
- nodemon
- multer
- helmet

## Mongoose Schemas:
- User: { username, email, password, profilePicture, coverPicture, followers, followings, isAdmin, timestamp}
- Conversations: {members(which is array of users), timestamp}
- Messages: {conversationId, sender, text, timestamp}
- Posts: { userId, desc, img, likes, timestamp}


## Credits:
Lama Dev
