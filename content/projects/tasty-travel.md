---
id: 7
date: february 1, 2024
image: "images/project/travel.jpg"
github: "https://github.com/michaelssavage/TastyTravel-3rdYearProject"
technology: ["Android", "MapboxAPI", "GoogleMapsAPI", "Firebase"]
---

# TastyTravel

:pic{ src="images/project/tastytravel.png" alt="tastytravel icon" }

Android app that let users search for meeting places between two locations based on equitravelling time.

TastyTravel is an Android app built with Android Studio 3.6.1. The app allows one person to search for places for two parties to meet and the given results depend on their chosen mode of transport. The aim of the app is to return locations on an interactive Google Map that each party can arrive at roughly at the same time. They can choose to search for either Bars, Cafes, or Restaurants.

When users of the app successfully search using all the parameters, they can look through at a list of 20 places or less. If the user has created an account before searching, their searches will be stored in our Firebase real-time database. They can find and delete their search history in the app. We also let users save places that they like and they can find and delete their saved places in the app too.

The app finds recommended locations by using Mapbox isochrones and the SphericalUtil class from Google. When the user presses search, the app builds a URL that takes in the mode of transport (Walk, Car, or Bike) and requests the JSONObject from MapBox. The JSONObject contains information on the properties and geometry of the isochrone, but most importantly we parse the coordinates from the URL into a list and use our algorithm to find suitable meeting places. We do this by iterating through the coordinates list of your location and finding the shortest distance to their location. Then we do the vice versa until we end up with two locations. We then use interpolation to get a midpoint between those locations where the midpoint is a given score that is influenced by the modes of transport. The score is a fraction between 0 and 1. The score favours people who walk, then cycle, and finally driving. If the modes of transport are the same then the fraction will be neutral at 0.5.

By default, the app does not draw the isochrone onto the app but a toggle can be switched on. This switch will add a Google GeoJsonLayer to the map using the coordinates list.
