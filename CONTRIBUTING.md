# Follow the Contribution Guidelines

Following are the steps to guide you:

- Step 1: Fork <a href="https://github.com/rockingrohit9639/project-zone" target="_blank">this</a> repository.

![step1](https://user-images.githubusercontent.com/72425181/122670349-45916200-d1df-11eb-9538-8738de17dcdb.png)

Then go to your Git terminal and clone it on your machine.
<br>
<br>
![step2](https://user-images.githubusercontent.com/72425181/122670352-4a561600-d1df-11eb-9092-ec76fecc7f94.png)
<br>

- Step 2: Add a upstream link to main branch in your cloned repo
  ```
  git remote add upstream https://github.com/rockingrohit9639/project-zone.git
  ```
- Step 3: Keep your cloned repo upto date by pulling from upstream (this will also avoid any merge conflicts while committing new changes)
  ```
  git pull upstream main
  ```
- Step 4: Create your feature branch (This is a necessary step, so don't skip it)
  ```
  git checkout -b <feature-name>
  ```
- Step 5: Track your changes:heavy_check_mark: .
  ```
  git add .
  ```
- Step 5: Check for your changes.
  ```
  git status
  ```
- Step 7: Commit all the changes (Write commit message as "Small Message")
  ```
  git commit -m "Write a meaningfull but small commit message"
  ```
- Step 8: Push the changes for review
  ```
  git push origin <branch-name>
  ```
- Step 9: Create a PR on Github. (Don't just hit the create a pull request button, you must write a PR message to clarify why and what are you contributing)

### 🚩 Setting up the environment

#### Client-Side

- To setup the environment in your system run the following commands
  ```
  cd project-zone
  npm install
  ```
- After installing all the server dependencies run the server using the following command

  ```
  npm start
  ```

#### Server

- To setup server in your system run the following commands
  ```
  cd project-zone
  cd server
  npm install
  ```
- After installing all the dependencies go through the following commands to make a directory named config inside server directory & add a fille config.env in config directory.
  ```
  mkdir config
  touch config.env
  ```
- Edit config.env as follow :-
  ```
  PORT=8000
  MONGO_URI=<YOUR-MONGO-URI>
  ACCESS_TOKEN_SECRET=<YOUR-ACCESS-TOKEN-SECRET>
  ACCESS_TOKEN_SECRET_FOREGTPASS=<YOUR-ACCESS-TOKEN-SECRET-FORGETPASS>
  ACCESS_TOKEN_VERIFY_EMAIL=<YOUR_ACCESS_TOKEN_SECRET_VERIFYEMAIL>
  SENDGRID_API_KEY=<YOUR-SENDGRID-API-KEY>
  SENDGRID_VERIFIED_MAIL=<YOUR-SENDGRID-VERIFIED-MAIL>
  ```
- After following all above steps, run the following command to start server
  ```
  cd ../
  nodemon index.js
  ```
- Expected Output in terminal

<p align="center">
<img src="Project_Img/Server.png" width=50% />&ensp;&ensp;&ensp;
</p>
