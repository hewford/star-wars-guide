angular.module("StarWarsApp",["lumx","ngRoute","underscore"]).config(["$routeProvider","$httpProvider",function(e,r){r.defaults.useXDomain=!0,delete r.defaults.headers.common["X-Requested-With"],e.when("/",{templateUrl:"components/categories.html"}).when("/characters",{templateUrl:"components/characters/characters.html",controller:"charactersController"}).when("/characters/:id",{templateUrl:"components/characters/character.html",controller:"characterController"}).when("/films",{templateUrl:"components/films/films.html",controller:"filmsController"}).when("/films/:id",{templateUrl:"components/films/film.html",controller:"filmController"}).when("/species",{templateUrl:"components/species/species.html",controller:"speciesController"}).when("/species/:id",{templateUrl:"components/species/specie.html",controller:"specieController"}).when("/starships",{templateUrl:"components/starships/starships.html",controller:"starshipsController"}).when("/starships/:id",{templateUrl:"components/starships/starship.html",controller:"starshipController"}).when("/vehicles",{templateUrl:"components/vehicles/vehicles.html",controller:"vehiclesController"}).when("/vehicles/:id",{templateUrl:"components/vehicles/vehicle.html",controller:"vehicleController"}).when("/planets",{templateUrl:"components/planets/planets.html",controller:"planetsController"}).when("/planets/:id",{templateUrl:"components/planets/planet.html",controller:"planetController"}).otherwise("/")}]),angular.module("StarWarsApp").controller("characterController",["$scope","$http","characterFactory","planetsFactory","speciesFactory","wikiaFactory","$routeParams",function(e,r,t,n,a,l,c){var o=c.id;e.crumbs=[{url:"#/",name:"Home"},{url:"#/characters?page=1",name:"Characters"}],t.getById(o,function(r,t){return r?console.log(r):(e.person=t,n.getByUrls(t.homeworld_url,function(r,t){r&&console.log(r),e.person.homeworld=t[0],console.log(t)}),a.getByUrls(t.speciesUrls,function(r,t){r&&console.log(r),e.person.species=t[0]}),void(e.pageTitle=e.person.name))})}]),angular.module("StarWarsApp").factory("characterFactory",["$http","$q","titleCase",function(e,r,t){var n,a=[],l=function(e){return{name:t(e.name),img_url:"./assets/img/characters/"+parseInt(s(e.url))+".jpg",url:"#/characters/"+s(e.url)}},c=function(e){return{name:t(e.name),birth_year:i(e.birth_year),hair_color:t(e.hair_color),skin_color:t(e.skin_color),gender:t(e.gender),height:o(e.height,"cm"),mass:o(e.mass,"kg"),homeworld_url:u(e.homeworld),filmUrls:u(e.films),speciesUrls:u(e.species),vehicleUrls:u(e.vehicles),starshipUrls:u(e.starships),id:parseInt(s(e.url)),img_url:"./assets/img/characters/"+parseInt(s(e.url))+".jpg",url:"#/characters/"+s(e.url)}},o=function(e,r){return isNaN(e)?{unit:t(e)}:{number:e,unit:r}},i=function(e){return"unknown"===e?"Unknown":e},s=function(e){var r=e.match(/([0-9])+/g);return r=r[0]},u=function(e){var r=[],t=[];return r=e instanceof Array?e:[e],t=r.map(function(e){return e.replace(/.*?:/g,"")})};return{getAll:function(r,t){e.get("//swapi.co/api/people/?page="+r,{cache:!0}).then(function(e){var r,c=e.data.results,o=[];o=c.map(function(e){return l(e)}),r=e.data.count,n=Math.ceil(r/10),a=o,t(null,a)},function(e){t(e)})},getById:function(r,t){e.get("//swapi.co/api/people/"+r+"/",{cache:!0}).then(function(e){var r=c(e.data);t(null,r)},function(e){t(e)})},getByUrls:function(t,n){if(!t||!t.length)return n&&n(null,[]);var a=t.map(function(r){return e.get(r,{cache:!0})});r.all(a,n).then(function(e){var r=e.map(function(e){return l(e.data)});n(null,r)},function(e){n(e)})},getNumberOfPages:function(){return n}}}]),angular.module("StarWarsApp").controller("charactersController",["$scope","$http","characterFactory","_","$routeParams","$location",function(e,r,t,n,a,l){e.crumbs=[{url:"#/",name:"Home"}],e.pageTitle="Characters",e.currentPage=a.page,t.getAll(e.currentPage,function(r,a){if(r)return console.log(r);e.characters=a;var l=t.getNumberOfPages();e.pages=n.range(1,l+1)}),e.getNewPage=function(e){l.search("page",e)}}]),angular.module("StarWarsApp").controller("filmController",["$scope","$http","filmFactory","$routeParams",function(e,r,t,n){var a=n.id;e.crumbs=[{url:"#/",name:"Home"},{url:"#/films?page=1",name:"Films"}],t.getById(a,function(r,t){return r?console.log(r):(e.film=t,void(e.pageTitle=e.film.name))})}]),angular.module("StarWarsApp").factory("filmFactory",["$http","$q","titleCase",function(e,r,t){var n,a=[],l=function(e){return{name:"Episode "+u(e.episode_id)+": "+e.title,img_url:"./assets/img/films/"+s(e.url)+".jpg",id:parseInt(e.episode_id),url:"#/films/"+s(e.url)}},c=function(e){return{name:"Episode "+u(e.episode_id)+": "+e.title,director:e.director,id:parseInt(e.episode_id),crawl:e.opening_crawl,producer:e.producer,date:i(e.release_date),characterUrls:o(e.characters),planetUrls:o(e.planets),starshipUrls:o(e.starships),vehicleUrls:o(e.vehicles),speciesUrls:o(e.species),img_url:"./assets/img/films/"+s(e.url)+".jpg",url:"#/films/"+s(e.url)}},o=function(e){var r=[],t=[];return r=e instanceof Array?e:[e],t=r.map(function(e){return e.replace(/.*?:/g,"")})},i=function(e){var r=e.split("-"),t=r[1]+"-"+r[2]+"-"+r[0];return t},s=function(e){var r=e.match(/([0-9])+/g);return r=r[0]},u=function(e){var r;switch(e){case 1:r="I";break;case 2:r="II";break;case 3:r="III";break;case 4:r="IV";break;case 5:r="V";break;case 6:r="VI";break;case 7:r="VII";break;case 8:r="VIII";break;case 9:r="IX";break;case 10:r="X"}return r};return{getAll:function(r,t){e.get("//swapi.co/api/films/?page="+r,{cache:!0}).then(function(e){var r,c=e.data.results,o=[];o=c.map(function(e){return l(e)}),r=e.data.count,n=Math.ceil(r/10),a=o,t(null,a)},function(e){t(e)})},getById:function(r,t){e.get("//swapi.co/api/films/"+r+"/",{cache:!0}).then(function(e){var r=c(e.data);t(null,r)},function(e){t(e)})},getByUrls:function(t,n){if(!t||!t.length)return n&&n(null,[]);var a=t.map(function(r){return e.get(r,{cache:!0})});r.all(a,n).then(function(e){var r=e.map(function(e){return l(e.data)});n(null,r)},function(e){n(e)})},getNumberOfPages:function(){return n}}}]),angular.module("StarWarsApp").controller("filmsController",["$scope","$http","filmFactory","_","$routeParams","$location",function(e,r,t,n,a,l){e.crumbs=[{url:"#/",name:"Home"}],e.pageTitle="Films",e.currentPage=a.page,t.getAll(e.currentPage,function(r,a){if(r)return console.log(r);e.films=a;var l=t.getNumberOfPages();e.pages=n.range(1,l+1)}),e.getNewPage=function(e){l.search("page",e)}}]),angular.module("StarWarsApp").controller("headerController",["$scope","LxDialogService",function(e,r){e.openDialog=function(e){r.open(e)}}]),angular.module("StarWarsApp").controller("planetController",["$scope","$http","planetsFactory","$routeParams",function(e,r,t,n){var a=n.id;e.crumbs=[{url:"#/",name:"Home"},{url:"#/planets?page=1",name:"Planets"}],t.getById(a,function(r,t){return r?console.log(r):(e.planet=t,void(e.pageTitle=e.planet.name))})}]),angular.module("StarWarsApp").controller("planetsController",["$scope","$http","planetsFactory","_","$routeParams","$location",function(e,r,t,n,a,l){e.crumbs=[{url:"#/",name:"Home"}],e.pageTitle="Planets",e.currentPage=a.page,t.getAll(e.currentPage,function(r,a){if(r)return console.log(r);e.planets=a;var l=t.getNumberOfPages();e.pages=n.range(1,l+1)}),e.getNewPage=function(e){l.search("page",e)}}]),angular.module("StarWarsApp").factory("planetsFactory",["$http","$q","titleCase",function(e,r,t){var n,a=[],l=function(e){return{name:t(e.name),img_url:"./assets/img/planets/"+parseInt(u(e.url))+".jpg",url:"#/planets/"+u(e.url)}},c=function(e){return{name:t(e.name),rotation_period:i(e.rotation_period," days"),orbital_period:i(e.orbital_period," days"),diameter:i(e.diameter,"km"),climate:t(e.climate),gravity:t(e.gravity),terrain:t(e.terrain),water:i(e.surface_water,"%"),population:s(e.population),characterUrls:o(e.residents),filmUrls:o(e.films),img_url:"./assets/img/planets/"+parseInt(u(e.url))+".jpg",id:parseInt(u(e.url)),url:"#/planets/"+u(e.url)}},o=function(e){var r=[],t=[];return r=e instanceof Array?e:[e],t=r.map(function(e){return e.replace(/.*?:/g,"")})},i=function(e,r){return isNaN(e)?{unit:t(e)}:{number:e,unit:r}},s=function(e){return"unknown"===e?"Unknown":e},u=function(e){var r=e.match(/([0-9])+/g);return r=r[0]};return{getAll:function(r,t){e.get("//swapi.co/api/planets/?page="+r,{cache:!0}).then(function(e){var r,c=e.data.results,o=[];o=c.map(function(e){return l(e)}),r=e.data.count,n=Math.ceil(r/10),a=o,t(null,a)},function(e){t(e)})},getById:function(r,t){e.get("//swapi.co/api/planets/"+r+"/",{cache:!0}).then(function(e){var r=c(e.data);t(null,r)},function(e){t(e)})},getByUrls:function(t,n){if(!t||!t.length)return n&&n(null,[]);var a=t.map(function(r){return e.get(r,{cache:!0})});r.all(a,n).then(function(e){var r=e.map(function(e){return l(e.data)});n(null,r)},function(e){n(e)})},getNumberOfPages:function(){return n}}}]),angular.module("StarWarsApp").controller("specieController",["$scope","$http","speciesFactory","$routeParams",function(e,r,t,n){var a=n.id;e.crumbs=[{url:"#/",name:"Home"},{url:"#/species?page=1",name:"Species"}],t.getById(a,function(r,t){return r?console.log(r):(e.specie=t,void(e.pageTitle=e.specie.name))})}]),angular.module("StarWarsApp").controller("speciesController",["$scope","$http","speciesFactory","_","$routeParams","$location",function(e,r,t,n,a,l){e.crumbs=[{url:"#/",name:"Home"}],e.pageTitle="Species",e.currentPage=a.page,t.getAll(e.currentPage,function(r,a){if(r)return console.log(r);e.species=a;var l=t.getNumberOfPages();e.pages=n.range(1,l+1)}),e.getNewPage=function(e){l.search("page",e)}}]),angular.module("StarWarsApp").factory("speciesFactory",["$http","$q","titleCase",function(e,r,t){var n,a=[],l=function(e){return{name:t(e.name),img_url:"./assets/img/species/"+parseInt(s(e.url))+".jpg",url:"#/species/"+s(e.url)}},c=function(e){return{name:t(e.name),classification:t(e.classification),designation:t(e.designation),avg_height:i(e.average_height,"cm"),skin_colors:t(e.skin_colors),hair_colors:t(e.hair_colors),eye_colors:t(e.eye_colors),lifespan:i(e.average_lifespan," years"),language:t(e.language),characterUrls:o(e.people),filmUrls:o(e.films),img_url:"./assets/img/species/"+parseInt(s(e.url))+".jpg",id:parseInt(s(e.url)),url:"#/species/"+s(e.url)}},o=function(e){var r=[],t=[];return r=e instanceof Array?e:[e],t=r.map(function(e){return e.replace(/.*?:/g,"")})},i=function(e,r){return isNaN(e)?{unit:t(e)}:{number:e,unit:r}},s=function(e){var r=e.match(/([0-9])+/g);return r=r[0]};return{getAll:function(r,t){e.get("//swapi.co/api/species/?page="+r,{cache:!0}).then(function(e){var r,c=e.data.results,o=[];o=c.map(function(e){return l(e)}),r=e.data.count,n=Math.ceil(r/10),a=o,t(null,a)},function(e){t(e)})},getById:function(r,t){e.get("//swapi.co/api/species/"+r+"/",{cache:!0}).then(function(e){var r=c(e.data);t(null,r)},function(e){t(e)})},getByUrls:function(t,n){if(!t||!t.length)return n&&n(null,[]);var a=t.map(function(r){return e.get(r,{cache:!0})});r.all(a,n).then(function(e){var r=e.map(function(e){return l(e.data)});n(null,r)},function(e){n(e)})},getNumberOfPages:function(){return n}}}]),angular.module("StarWarsApp").controller("starshipController",["$scope","$http","starshipsFactory","$routeParams",function(e,r,t,n){var a=n.id;e.crumbs=[{url:"#/",name:"Home"},{url:"#/starships?page=1",name:"Starships"}],t.getById(a,function(r,t){return r?console.log(r):(e.starship=t,void(e.pageTitle=e.starship.name))})}]),angular.module("StarWarsApp").controller("starshipsController",["$scope","$http","starshipsFactory","_","$routeParams","$location",function(e,r,t,n,a,l){e.crumbs=[{url:"#/",name:"Home"}],e.pageTitle="Starships",e.currentPage=a.page,t.getAll(e.currentPage,function(r,a){if(r)return console.log(r);e.starships=a;var l=t.getNumberOfPages();e.pages=n.range(1,l+1)}),e.getNewPage=function(e){l.search("page",e)}}]),angular.module("StarWarsApp").factory("starshipsFactory",["$http","$q","titleCase",function(e,r,t){var n,a=[],l=function(e){return{name:e.name,img_url:"./assets/img/starships/"+parseInt(p(e.url))+".jpg",url:"#/starships/"+p(e.url)}},c=function(e){return{name:e.name,model:e.model,manufacturer:e.manufacturer,cost:i(e.cost_in_credits," credits"),length:{number:e.length.replace(/,/g,""),unit:"m"},speed:s(e.max_atmosphering_speed),min_crew:e.crew,passengers:e.passengers,cargo_capacity:u(e.cargo_capacity),consumables:e.consumables,hyperdrive_rating:e.hyperdrive_rating,mglt:e.MGLT,shipclass:t(e.starship_class),characterUrls:o(e.pilots),filmUrls:o(e.films),img_url:"./assets/img/starships/"+parseInt(p(e.url))+".jpg",id:parseInt(p(e.url)),url:"#/starships/"+p(e.url)}},o=function(e){var r=[],t=[];return r=e instanceof Array?e:[e],t=r.map(function(e){return e.replace(/.*?:/g,"")})},i=function(e,r){return isNaN(e)?{unit:t(e)}:{number:e,unit:r}},s=function(e){return"n/a"===e?{unit:e}:e.includes("km")?{number:e.match(/\d/g).join(""),unit:"km/h"}:{number:e,unit:"km/h"}},u=function(e){return parseInt(e)>1e3?{number:(parseInt(e)/1e3).toFixed(),unit:" metric tons"}:{number:e,unit:"kg"}},p=function(e){var r=e.match(/([0-9])+/g);return r=r[0]};return{getAll:function(r,t){e.get("//swapi.co/api/starships/?page="+r,{cache:!0}).then(function(e){var r,c=e.data.results,o=[];o=c.map(function(e){return l(e)}),r=e.data.count,n=Math.ceil(r/10),a=o,t(null,a)},function(e){t(e)})},getById:function(r,t){e.get("//swapi.co/api/starships/"+r+"/",{cache:!0}).then(function(e){var r=c(e.data);t(null,r)},function(e){t(e)})},getByUrls:function(t,n){if(!t||!t.length)return n&&n(null,[]);var a=t.map(function(r){return e.get(r,{cache:!0})});r.all(a,n).then(function(e){var r=e.map(function(e){return l(e.data)});n(null,r)},function(e){n(e)})},getNumberOfPages:function(){return n}}}]),angular.module("StarWarsApp").controller("vehicleController",["$scope","$http","vehiclesFactory","$routeParams",function(e,r,t,n){var a=n.id;e.crumbs=[{url:"#/",name:"Home"},{url:"#/vehicles?page=1",name:"Vehicles"}],t.getById(a,function(r,t){return r?console.log(r):(e.vehicle=t,void(e.pageTitle=e.vehicle.name))})}]),angular.module("StarWarsApp").controller("vehiclesController",["$scope","$http","vehiclesFactory","_","$routeParams","$location",function(e,r,t,n,a,l){e.crumbs=[{url:"#/",name:"Home"}],e.pageTitle="Vehicles",e.currentPage=a.page,t.getAll(e.currentPage,function(r,a){if(r)return console.log(r);e.vehicles=a;var l=t.getNumberOfPages();e.pages=n.range(1,l+1)}),e.getNewPage=function(e){l.search("page",e)}}]),angular.module("StarWarsApp").factory("vehiclesFactory",["$http","$q","titleCase",function(e,r,t){var n,a=[],l=function(e){return{name:e.name,img_url:"./assets/img/vehicles/"+parseInt(p(e.url))+".jpg",url:"#/vehicles/"+p(e.url)}},c=function(e){return{name:e.name,model:e.model,manufacturer:e.manufacturer,cost:o(e.cost_in_credits," credits"),length:{number:e.length.replace(/,/g,""),unit:"m"},speed:s(e.max_atmosphering_speed),min_crew:i(e.crew),passengers:i(e.passengers),cargo_capacity:u(e.cargo_capacity),consumables:t(e.consumables),vehicle_class:t(e.vehicle_class),characterUrls:e.pilots,filmUrls:e.films,img_url:"./assets/img/vehicles/"+parseInt(p(e.url))+".jpg",id:parseInt(p(e.url)),url:"#/vehicles/"+p(e.url)}},o=function(e,r){return isNaN(e)?{unit:t(e)}:{number:e,unit:r}},i=function(e){return"unknown"===e?"Unknown":e},s=function(e){return"n/a"===e?{unit:e}:e.includes("km")?{number:e.match(/\d/g).join(""),unit:"km/h"}:{number:e,unit:"km/h"}},u=function(e){return parseInt(e)>1e3?{number:(parseInt(e)/1e3).toFixed(),unit:" metric tons"}:{number:e,unit:"kg"}},p=function(e){var r=e.match(/([0-9])+/g);return r=r[0]};return{getAll:function(r,t){e.get("//swapi.co/api/vehicles/?page="+r,{cache:!0}).then(function(e){var r,c=e.data.results,o=[];o=c.map(function(e){return l(e)}),r=e.data.count,n=Math.ceil(r/10),a=o,t(null,a)},function(e){t(e)})},getById:function(r,t){e.get("//swapi.co/api/vehicles/"+r+"/",{cache:!0}).then(function(e){var r=c(e.data);t(null,r)},function(e){t(e)})},getByUrls:function(t,n){if(!t||!t.length)return n&&n(null,[]);var a=t.map(function(r){return e.get(r,{cache:!0})});r.all(a,n).then(function(e){var r=e.map(function(e){return l(e.data)});n(null,r)},function(e){n(e)})},getNumberOfPages:function(){return n}}}]),angular.module("StarWarsApp").factory("wikiaFactory",["$http",function(e){return{getAbstract:function(r,t){e.jsonp("http://starwars.wikia.com/api/v1/Search/List/?callback=JSON_CALLBACK&limit=1&query="+r).then(function(e){t(null,e)},function(e){t(e)})}}}]),angular.module("StarWarsApp").directive("badge",function(){return{restrict:"E",templateUrl:"./directives/badge.html",scope:{data:"="},link:function(e,r,t){}}}),angular.module("StarWarsApp").directive("breadcrumbs",function(){return{restrict:"E",templateUrl:"./directives/breadcrumbs.html",scope:{crumbs:"=",pageTitle:"@"}}}),angular.module("StarWarsApp").directive("detailsBadge",function(){return{restrict:"E",templateUrl:"./directives/detailsBadge.html",transclude:!0,scope:{imgUrl:"=",header:"="},link:function(e,r,t){}}}),angular.module("StarWarsApp").directive("pagination",function(){return{restrict:"E",templateUrl:"./directives/pagination.html",scope:{currentPage:"=",pages:"=",action:"&clickAction"},link:function(e,r,t){e.isCurrentPage=function(r){return r===parseInt(e.currentPage)}}}}),angular.module("StarWarsApp").directive("relatedLinks",function(){return{restrict:"E",templateUrl:"./directives/relatedLinks.html",scope:{header:"@",factory:"=",urls:"="},link:function(e,r,t){e.currentPage=1,e.hasError=!1,e.hasData=!1;var n=r.injector().get(t.factory),a=[],l=0;e.loadNext=function(){e.currentPage++,l+=5,e.currentPage===e.totalPages?e.chunk=a.slice(l):e.chunk=a.slice(l,l+5)},e.loadPrevious=function(){e.currentPage--,l-=5,e.chunk=a.slice(l,l+5)},e.$watch("urls",function(r){n.getByUrls(r,function(r,t){return r?(e.hasError=!0,e.err="An error occured. Please try again later.",console.log(r)):void(t&&t.length&&(e.hasData=!0,a=t,e.totalPages=Math.ceil(a.length/5),e.chunk=a.slice(l,5)))})})}}}),angular.module("StarWarsApp").factory("titleCase",function(){return function(e){var r=[],t=e.split(" ");return t.forEach(function(e){if("n/a"===e)r.push(e);else{var t=e.charAt(0).toUpperCase()+e.slice(1);r.push(t)}}),r=r.join(" ")}}),angular.module("StarWarsApp").filter("textOrNumber",["$filter",function(e){return function(r,t){return isNaN(r)?r:e("number")(r,t)}}]);