# Project: Building a simple Pokedex
<img src="https://user-images.githubusercontent.com/99111208/159686419-2254c8da-48d9-4d5b-97a9-82b455de1995.gif" width="600">


### Project description
This app was developed as part of the CareerFoundry Full-Stack Web-Development-Course.
It displays a list of 150 Pokemon in the database. The user can search Pokemon by name and click on each Pokemon to open a modal with more information on height and types as well as an image. It is responsive.

<img src="https://user-images.githubusercontent.com/99111208/159686389-aea96071-2a7c-42c0-823c-7ecb15a68ce2.gif" width="600">

### Languages
This app was first written in HTML, SCSS and JavaScript (see Screenshot below). Later it was rewritten with jQuery and some Bootstrap elements added.

<img src="https://user-images.githubusercontent.com/99111208/159683538-7990d6bc-4087-40a4-adc8-de578ed8366d.png" width="600">

### Key features 
* Loads data from an external source (API):https://pokeapi.co/api/v2/pokemon/?limit=150
* View a list of pokemon
* Modal/pop-up: With a click on a button the user can view more details on the pokemon selected: height, types and a frontal image.
* Search box: When typing in the name of a pokemon then the list item is filtered and displayed.

### Additional information
* The Project follows the rules of ESLint, Prettier, Stylelint.
* The app works in Chrome, Firefox, Safari, Edge, and Internet Explorer 11 (by incorporating Polyfills for fetch and promise)

### Learnings from project
**Bootstrap** 
* how to apply bootstrap grid and define breakpoints for responsiveness
* setting margins to create gaps between items influences grid properties, use border in the color of the background instead

**Modal**
* aligning the modal at center of page with position: fixed and transform: translate (-50%, 50%)

**Search box**
* in order to filter by pokemon name, it is necessary to first pinpoint target and value in external API using console.log

**Display images from API**
* the API does not deliver any explicit ID for each pokemon. Since the items are delivered in a certain order, it is possible to get the images with a forEach on datafromAPI. 

# How to run the app locally
1. First clone the file. For instructions, how to clone a github repository, [click here](https://docs.github.com/en/repositories/creating-and-managing-repositories/cloning-a-repository)
2. Go to your local directory, where you stored the cloned file and click the index.html to open in the browser.

# Use it Live

[Click here to use the app](https://lisapmunich.github.io/Simple-Pokemon-JS-App/)
