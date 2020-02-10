# Team Generator CLI

Command line interface for generating an `.html` page for your work team.  Options include Manager, Engineer, and Intern (all with specific information).

## Set Up:

Download or clone repo to your local machine and run 
```npm install``` to download necessary dependencies.

## Instructions:

Run the program with 
```
node app.js
```

This will boot up the `inquirer` prompts for entering you team information.  After successful entering of an employee, you must specify if you have other team members to add.  The default input if nothing is typed in will ask for another employee information.

Upon completion, the program will output an html file to the following path: `./output/generatedTeam.html` where you can see a webpage of your team information submitted.