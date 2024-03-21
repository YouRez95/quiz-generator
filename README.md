# Quiz Generator

## Description

Quiz Generator is a comprehensive web application designed to allow users create and participate in quizzes. With a user-friendly interface and robust functionality
Quiz Generator serves as a platform where users can unleash their creativity by creating custom quizzes and engage in challenging quizzes created by others.

## Technologies

## Key Features

- **_User Authentication :_** Secure user authentication endpoints using JWT tokens.
- **_Creating Quiz :_** User authenticated can create quiz, can be public or private
- **_Quiz Category :_** User can select the category from the list provided, or create new category
- **_Creating Questions :_** User authenticated can create maximun 10 questions for each quiz created
- **_Draft Quiz :_** Users may be unable to complete a question after creating a quiz. When this occurs, the quiz is automatically considered as a draft and is added to the user's dashboard
- **_Like Quiz :_** User can like any public quiz
- **_Comment Quiz :_** User can comment public quiz
- **_Play Quiz :_** User can play any public quiz
- **_Score quiz :_** After user play the quiz the score of that quiz will be automatically added to dashboard statistique
- **_Dashboard Statistique :_** User can see all quizzes already play and the score of each quiz
- **_Dashboard Quizzes :_** User can update the quiz or the questions for specific quiz
- **_Dashboard Draft :_** User can see all quiz not completed yet, and can completed any time he want
- **_Dashboard Notifications :_** If another user likes or comments on a specific quiz, the owner of that quiz will receive a notification.
- **_dashboard Statistique :_** User can update their username, fillname and avatar (email and password added later)

## Installation

1. **_Clone the Repository:_** Use the `git clone` command to clone the GitHub repository to your local machine
   ```
    git clone https://github.com/YouRez95/quiz-generator.git
   ```
2. **_Install depends:_**

   ```
   cd backend && npm install
   ```

   ```
   cd frontend && npm install
   ```

3. **_Setting up env variables:_**

   i. .env on backend :

   ```
   MONGO_URL=YOUR DATABASE URI MONGODB

   ## JWT access token

   JWT_SECRET=YOUR JWT ACCESS TOKEN SECRET

   ## NODE ENV

   NODE_ENV=NODE ENV HERE

   ## FRONT URL

   FRONT_URL=undefined
   ```

   ii. .env on frontend :

   ```
   ## URL API : example: http://localhost:5000

   VITE_BASE_URL=URL API HERE

   ## URL API ENTRY : example: http://localhost:5000/api/v1

   VITE_API_URL=URL API HERE/api/v1
   ```
