# Sample Interview Exercises

Below are several exercises inspired by actual coding assignments.
The assignments are designed to be implemented within 1-2 hours each.

## swapi

1. swapi implementation with graphql wrapper

   - https://ronen-e.github.io/exercises/vehicle-table.html

1. swapi implementation with graphql wrapper.
   This is basically the same as `vehicle-table.html` but downloads only the data required for the exercise.

	 - https://ronen-e.github.io/exercises/vehicle-table-required-resources.html

1. without swapi-graphql - with a custom graphql-like interface for fetching data

   - https://ronen-e.github.io/exercises/index.html

1. promise based data fetch implemenation specific for this exercise which follows the following guidelines:

   1. fetch all vehicles
   1. filter out all vehicles without pilots
   1. fetch pilots for each vehicles
   1. fetch homeworld for each pilot

   - Requests for a resource are cached in memory
   - This implementation is faster than the others due to fetching just the minimal amount of resources
   - https://ronen-e.github.io/exercises/vehicle-table-promises.html

1. RxJS based implementation. This follows the same guidelines as the Promise based implementation.

   - https://ronen-e.github.io/exercises/vehicle-table-rxjs.html

1. Bar chart with vanilla javascript
   - https://ronen-e.github.io/exercises/planets-bar-chart.html

## Design

The main exercise is designed to test handling multiple asynchronous requests for remote servers (in this case - https://swapi.dev/ API)

One solution uses the (see `vehicle-table.html`) uses a graphql wrapper by https://github.com/graphql/swapi-graphql)

The second solution (`index.html`) uses some of the same code to implement a similar solution in the client side.

The third solution (`vehicle-table-promises.html`) uses just regular plain vanilla JS promises

The fourth solution (`vehicle-table-rxjs.html`) uses RxJS.

Remember. These solutions are quick and dirty solutions. They are not meant to be encompassing and leave a lot of room for improvement. A competent interviewer should ask you how to improve on it in a follow up session. One possible optimization was given in the file `vehicle-table-required-resources.html`

## Goal

Display a table containing information for the vehicle with the highest diameter sum of the pilots homeworld.

- There are many vehicles (`vehicles` resource)
- A vehicle can have multiple pilots (`people` resource)
- Each pilot has a single homeworld (`planets` resource)
- Each homeworld has a single diameter field (`number`)

### Gotchas

Q: What if there are 2 or more pilots from the same planet ???

A: Planets are deduped by name. I didn't notice such cases. But it is still possible.

## Problem

1. Swapi resources can be linked to other resources. The links are represented as Urls to that resource.
1. Resources are paginated. So when trying to get all `vehicles` we would receive a partial list and the url for the next "page"
1. There are multiple resources (Planets, Spaceships, Vehicles, People, Films and Species)

The purpose is to transform json response like this:

```json
	"https://swapi.dev/api/vehicles/14/": {
		"name": "Snowspeeder",
		"model": "t-47 airspeeder",
		"manufacturer": "Incom corporation",
		"cost_in_credits": "unknown",
		"length": "4.5",
		"max_atmosphering_speed": "650",
		"crew": "2",
		"passengers": "0",
		"cargo_capacity": "10",
		"consumables": "none",
		"vehicle_class": "airspeeder",
		"pilots": [
			"https://swapi.dev/api/people/1/",
			"https://swapi.dev/api/people/18/"
		],
		"films": [
			"https://swapi.dev/api/films/2/"
		],
		"created": "2014-12-15T12:22:12Z",
		"edited": "2014-12-20T21:30:21.672000Z",
		"url": "https://swapi.dev/api/vehicles/14/"
	},
	"https://swapi.dev/api/people/1/": {
		"name": "Luke Skywalker",
		"height": "172",
		"mass": "77",
		"hair_color": "blond",
		"skin_color": "fair",
		"eye_color": "blue",
		"birth_year": "19BBY",
		"gender": "male",
		"homeworld": "https://swapi.dev/api/planets/1/",
		"films": [
			"https://swapi.dev/api/films/1/",
			"https://swapi.dev/api/films/2/",
			"https://swapi.dev/api/films/3/",
			"https://swapi.dev/api/films/6/"
		],
		"species": [],
		"vehicles": [
			"https://swapi.dev/api/vehicles/14/",
			"https://swapi.dev/api/vehicles/30/"
		],
		"starships": [
			"https://swapi.dev/api/starships/12/",
			"https://swapi.dev/api/starships/22/"
		],
		"created": "2014-12-09T13:50:51.644000Z",
		"edited": "2014-12-20T21:17:56.891000Z",
		"url": "https://swapi.dev/api/people/1/"
	},
	"https://swapi.dev/api/people/18/": {
		"name": "Wedge Antilles",
		"height": "170",
		"mass": "77",
		"hair_color": "brown",
		"skin_color": "fair",
		"eye_color": "hazel",
		"birth_year": "21BBY",
		"gender": "male",
		"homeworld": "https://swapi.dev/api/planets/22/",
		"films": [
			"https://swapi.dev/api/films/1/",
			"https://swapi.dev/api/films/2/",
			"https://swapi.dev/api/films/3/"
		],
		"species": [],
		"vehicles": [
			"https://swapi.dev/api/vehicles/14/"
		],
		"starships": [
			"https://swapi.dev/api/starships/12/"
		],
		"created": "2014-12-12T11:08:06.469000Z",
		"edited": "2014-12-20T21:17:50.341000Z",
		"url": "https://swapi.dev/api/people/18/"
	},
	"https://swapi.dev/api/planets/1/": {
		"name": "Tatooine",
		"rotation_period": "23",
		"orbital_period": "304",
		"diameter": "10465",
		"climate": "arid",
		"gravity": "1 standard",
		"terrain": "desert",
		"surface_water": "1",
		"population": "200000",
		"residents": [
			"https://swapi.dev/api/people/1/",
			"https://swapi.dev/api/people/2/",
			"https://swapi.dev/api/people/4/",
			"https://swapi.dev/api/people/6/",
			"https://swapi.dev/api/people/7/",
			"https://swapi.dev/api/people/8/",
			"https://swapi.dev/api/people/9/",
			"https://swapi.dev/api/people/11/",
			"https://swapi.dev/api/people/43/",
			"https://swapi.dev/api/people/62/"
		],
		"films": [
			"https://swapi.dev/api/films/1/",
			"https://swapi.dev/api/films/3/",
			"https://swapi.dev/api/films/4/",
			"https://swapi.dev/api/films/5/",
			"https://swapi.dev/api/films/6/"
		],
		"created": "2014-12-09T13:50:49.641000Z",
		"edited": "2014-12-20T20:58:18.411000Z",
		"url": "https://swapi.dev/api/planets/1/"
	},
	"https://swapi.dev/api/planets/22/": {
		"name": "Corellia",
		"rotation_period": "25",
		"orbital_period": "329",
		"diameter": "11000",
		"climate": "temperate",
		"gravity": "1 standard",
		"terrain": "plains, urban, hills, forests",
		"surface_water": "70",
		"population": "3000000000",
		"residents": [
			"https://swapi.dev/api/people/14/",
			"https://swapi.dev/api/people/18/"
		],
		"films": [],
		"created": "2014-12-10T16:49:12.453000Z",
		"edited": "2014-12-20T20:58:18.456000Z",
		"url": "https://swapi.dev/api/planets/22/"
	},
```

Into this:

```json
{
  "name": "Snowspeeder",
  "pilots": [
    {
      "name": "Luke Skywalker",
      "homeworld": {
        "name": "Tatooine",
        "diameter": 10465
      }
    },
    {
      "name": "Wedge Antilles",
      "homeworld": {
        "name": "Corellia",
        "diameter": 11000
      }
    }
  ]
}
```

Once we have this object it is easy to calculate the total diameter sum (_10465+11000_ in the example).

## How it works

These are the main components:

1. Caching (`cache.js`) - Download all the api data locally for all resources and save it to local storage. This requires multiple API requests to SWAPI in order to obtain the data.
1. If `debug mode` (see below) is enabled then the data is fetched directly from the local file `data.json`.
1. The cache interface is asynchronous - it returns a promise which resolves with the requested resource. The promise only resolves after the cache is filled
1. Api Helpers (`apiHelpers.js`) - responsible for interacting with SWAPI
1. Schema building (`schema.js`) - The schema describes the structure of the requested resource and child resources and the fields for each resource. The file contains the code responsible for parsing the schema and converting it to a JavaScript object
1. Rendering - (`index.js`) - Renders the data using Vue.js. See the `main()` function for the application entry point.

### Download the whole Data set ? Seriously ?

I know, It's bad. But it's a really small DB (~400KB) and it's an exercise and it's an unusual way of solving the exercise.

## debug mode

To enable debug mode set the query string of the page to include the text "debug"

example:

```
/?debug=1
```

## Scripts

All the `.js` files are loaded as regular scripts and not modules. That means the global scope is "polluted".

# Bar Chart

Another exercise is creating a bar chart using vanilla JS only (no chart libraries).

# Standalone

The `standalone` folder contains single JS exercises and solutions
