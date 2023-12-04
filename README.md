# Moodle - Mood Tracking Project

## TL;DR
This was the second project and my first full stack application. The project requirements were as follows:
* Have at least two data entities
* Use 0Auth of some kind
* Have full CRUD capabilities
* (optional) consume a third party API

I decided to build a mood tracking app, where users would be able to enter their mood data based on the best predictors of mood. 
The app would then allow them to see trends that help them understand and take action to course-correct if they desire. 
This was based on my interest in mental health and my inability to detect mood changes in myself. 

The app was designed and built in 6 days. The deployed version can be found [HERE](https://moodle-me.netlify.app).


### Tech Stack
* Vue
* CSS
* Bootrap
* Jascript
* Node
* Bootstrap
* MongoDB


## Process

### Planning
I used a Miro board [HERE](https://miro.com/app/board/uXjVMkqdF3g=/?share_link_id=634871169238](https://miro.com/app/board/uXjVNdCFJGA=/?share_link_id=359849354752) to plan what I want to do with this project.

As topic I'm very interested in I wante to consider what I could build in 5 days, but also what I could build in the future. I started with a Lean Business Model to ensure I had a good grasp of the value of this product. I then started with creating a User Story map to get a broad view of the product and then reduced it down to what I believed user would actually use AND satisfy the project criteria. 

I then moved on to create some basic wireframe so I'd thought out the overall layout and user flow. Then finally I created an ERD diagram so I was ready to start building the backend for the data.

For each increment I would write pseudocode, again with the purpose of helping me focus on what exactly I wanted to achieve with each piece of code I was writing. 

### Coding 
* Set out components
* Add Google Auth and check user is logged in each component
* Build the full create entry functionality
* Edit and delete
* Weather API

## Future Developments
### BUGs
* Weather is based on London weather, it's not dynamic for a user.

### Features
I'd love to add:
* Add some graphs to visual trends for users
* Provide some genuinely 'wow' insight for users about their state of mind, possbily using an AI API
* Find a way to share some kind of summary with friends and/or family (or maybe colleagues?)
* Make it less data-entry'y and more human, e.g. record users verbal diary, transcribe and then analyse for sentiment. 
  
## Summary
### Challenges 
* Auth was tricky
* Weather API didn't work as expected (because they lied about their pay model)
* Learning the VUE way of doing things.
* Getting dates rendering correctly. 


