# Animoos
A site that offers information on Anime. Use the search/filter system to review what you missed, check out the current offerings or check the actors behind the characters you love. [View Site](https://animoos.herokuapp.com/).

#A pproach
### Day 1 
* Plan server structure and routes
* Drew wireframes
* Research and test API calls

### Day 2
* Add skeleton structure
* Setup server routes

### Day 3
* Developed front-end code and structure
* Connected API data to front-end
* Styling

### Day 4 
* Built Anime Description view
* Styling

### Day 5
* Initiated search view
* Initiated logic for filter system
* Styling

### Day 6
* Completed search logic
* Refactor server route code to handle more universal route calls
* Completed styling decisions

### Day 7
* Moved filter system to main page results
* Implemented ng-watch filter changes
* Deployed site
* Refactor front-end controller code

#Technologies Used
[Materialize](http://materializecss.com/)
[FontAwesome](http://fontawesome.io/)
[SmoothScroll](https://github.com/d-oliveros/ngSmoothScroll)
[Request-Promise](https://github.com/request/request-promise)
[Anilist API](https://anilist-api.readthedocs.io/en/latest/)

#Routes
METHOD | URL | Purpose
GET | /browse | receives a query param of an object with filter specifications. queries the Anilist API and returns a result of 40 anime objects.
GET | /search/anime/:title| receives query param of an anime title, queries the API with the search term returns an array of objects that match the search term.
GET | /page-data/anime/:id | receives query param of an anime id, queries the API and returns an object with the anime data
GET | /page-data/character/:id | receives query param of an character id, queries the API and returns an object with the character data

#Issues
* This was a project to practice CSS skills, making Angular and Materialize work together was difficult.
* Creating a universal backend route to query the API proved difficult to make a route generic enough to handle the front-end request properly. The Anilist API also does not accept blank entries in their API queries and designing the call around that was interesting.

#Unsolved Problems
* bug due to image sizing with character image size and voice actor image size, hover over actor names produces a twitching effect.
* bug due to image sizing with character image size not all uniform causes mostly empty rows in the all character and staff modal.

#Next Steps
* Complete infinite scroll on main page or implement pagination for filter results
* optimize home page, heavily loaded with content produces slow navigation

#Resources Used
[Background used for shows that do not have a banner](http://www.nmgncp.com/anime-background-wallpaper/3663544.html)
[App background](http://www.shunvmall.com/anime-wallpaper/47754412.html)
