import { useState, useRef } from "react";

const ROSTERS = {
  NYY:{lu:[{n:"Trent Grisham",p:"CF",a:29,o:72},{n:"Aaron Judge",p:"RF",a:33,o:98},{n:"Cody Bellinger",p:"LF",a:30,o:78},{n:"Ben Rice",p:"1B",a:25,o:74},{n:"Giancarlo Stanton",p:"DH",a:36,o:80},{n:"Jazz Chisholm Jr.",p:"2B",a:28,o:82},{n:"Ryan McMahon",p:"3B",a:29,o:74},{n:"Jose Caballero",p:"SS",a:28,o:70},{n:"Austin Wells",p:"C",a:25,o:72}],ro:[{n:"Max Fried",p:"SP",a:32,o:86},{n:"Cam Schlittler",p:"SP",a:24,o:74},{n:"Will Warren",p:"SP",a:26,o:72},{n:"Ryan Weathers",p:"SP",a:24,o:70},{n:"Luis Gil",p:"SP",a:25,o:75}],bp:[{n:"Devin Williams",p:"CL",a:30,o:88},{n:"Clay Holmes",p:"SU",a:32,o:78},{n:"Jonathan Loaisiga",p:"SU",a:30,o:76},{n:"Tommy Kahnle",p:"MR",a:35,o:72},{n:"Tim Mayza",p:"MR",a:32,o:70},{n:"Ian Hamilton",p:"MR",a:30,o:68}],bench:[{n:"Alex Verdugo",p:"LF",a:29,o:72},{n:"Oswaldo Cabrera",p:"UT",a:25,o:68},{n:"Jon Berti",p:"UT",a:36,o:64},{n:"Jose Trevino",p:"C",a:32,o:66}],farm:[{n:"Spencer Jones",p:"OF",a:23,o:60,pot:88,lvl:"AAA"},{n:"George Lombard Jr.",p:"OF",a:21,o:56,pot:84,lvl:"AA"},{n:"Ben Hess",p:"SP",a:22,o:52,pot:80,lvl:"A"},{n:"Jorbit Vivas",p:"2B",a:23,o:54,pot:74,lvl:"AA"},{n:"Will Warren Jr.",p:"SP",a:23,o:50,pot:78,lvl:"A"}]},
  BOS:{lu:[{n:"Roman Anthony",p:"DH",a:21,o:78},{n:"Trevor Story",p:"SS",a:33,o:73},{n:"Jarren Duran",p:"LF",a:28,o:80},{n:"Willson Contreras",p:"1B",a:33,o:76},{n:"Wilyer Abreu",p:"RF",a:25,o:72},{n:"Caleb Durbin",p:"3B",a:25,o:70},{n:"Marcelo Mayer",p:"2B",a:22,o:74},{n:"Ceddanne Rafaela",p:"CF",a:24,o:71},{n:"Carlos Narvaez",p:"C",a:27,o:68}],ro:[{n:"Garrett Crochet",p:"SP",a:26,o:88},{n:"Ranger Suarez",p:"SP",a:29,o:82},{n:"Sonny Gray",p:"SP",a:36,o:78},{n:"Brayan Bello",p:"SP",a:25,o:74},{n:"Johan Oviedo",p:"SP",a:25,o:70}],bp:[{n:"Kenley Jansen",p:"CL",a:37,o:80},{n:"Justin Slaten",p:"SU",a:27,o:74},{n:"Chris Martin",p:"SU",a:38,o:72},{n:"Greg Weissert",p:"MR",a:30,o:68},{n:"Brennan Bernardino",p:"MR",a:29,o:68},{n:"Bailey Horn",p:"MR",a:26,o:66}],bench:[{n:"Rob Refsnyder",p:"RF",a:34,o:70},{n:"Abraham Toro",p:"3B",a:29,o:66},{n:"Nick Sogard",p:"UT",a:28,o:64},{n:"Mickey Gasso",p:"C",a:23,o:62}],farm:[{n:"Kyle Teel",p:"C",a:23,o:64,pot:86,lvl:"AAA"},{n:"Kristian Campbell",p:"2B",a:22,o:60,pot:84,lvl:"AA"},{n:"Chase Meidroth",p:"2B",a:24,o:56,pot:76,lvl:"AA"},{n:"Hunter Dobbins",p:"SP",a:25,o:54,pot:78,lvl:"AA"},{n:"Blaze Jordan",p:"1B",a:22,o:52,pot:80,lvl:"A"}]},
  TBR:{lu:[{n:"Yandy Diaz",p:"DH",a:34,o:76},{n:"Jonathan Aranda",p:"1B",a:26,o:76},{n:"Junior Caminero",p:"3B",a:21,o:82},{n:"Ben Williamson",p:"2B",a:25,o:70},{n:"Cedric Mullins",p:"CF",a:31,o:74},{n:"Jonny DeLuca",p:"RF",a:25,o:70},{n:"Nick Fortes",p:"C",a:28,o:68},{n:"Chandler Simpson",p:"LF",a:24,o:68},{n:"Carson Williams",p:"SS",a:22,o:73}],ro:[{n:"Shane McClanahan",p:"SP",a:28,o:84},{n:"Drew Rasmussen",p:"SP",a:30,o:80},{n:"Ryan Pepiot",p:"SP",a:27,o:74},{n:"Zach Eflin",p:"SP",a:31,o:74},{n:"Nick Martinez",p:"SP",a:35,o:70}],bp:[{n:"Pete Fairbanks",p:"CL",a:31,o:82},{n:"Edwin Uceta",p:"SU",a:27,o:72},{n:"Kevin Kelly",p:"SU",a:28,o:70},{n:"Garrett Cleavinger",p:"MR",a:31,o:68},{n:"Shawn Armstrong",p:"MR",a:34,o:64},{n:"Chris Devenski",p:"MR",a:34,o:64}],bench:[{n:"Jose Siri",p:"CF",a:30,o:68},{n:"Taylor Walls",p:"SS",a:28,o:64},{n:"Ben Rortvedt",p:"C",a:27,o:64},{n:"Tristan Gray",p:"UT",a:27,o:60}],farm:[{n:"Xavier Isaac",p:"1B",a:21,o:58,pot:86,lvl:"A"},{n:"Taj Bradley",p:"SP",a:23,o:62,pot:82,lvl:"AAA"},{n:"Niko Hulsizer",p:"OF",a:26,o:58,pot:76,lvl:"AA"},{n:"Austin Vernon",p:"SP",a:23,o:52,pot:78,lvl:"A"},{n:"Kameron Misner",p:"OF",a:26,o:56,pot:74,lvl:"AAA"}]},
  TOR:{lu:[{n:"Vladimir Guerrero Jr.",p:"1B",a:27,o:88},{n:"George Springer",p:"CF",a:36,o:74},{n:"Daulton Varsho",p:"LF",a:28,o:74},{n:"Alejandro Kirk",p:"C",a:26,o:76},{n:"Andres Gimenez",p:"SS",a:27,o:74},{n:"Addison Barger",p:"RF",a:25,o:72},{n:"Kazuma Okamoto",p:"3B",a:26,o:70},{n:"Ernie Clement",p:"2B",a:29,o:68},{n:"Danny Jansen",p:"DH",a:30,o:70}],ro:[{n:"Kevin Gausman",p:"SP",a:35,o:82},{n:"Dylan Cease",p:"SP",a:30,o:84},{n:"Bowden Francis",p:"SP",a:28,o:72},{n:"Max Scherzer",p:"SP",a:41,o:72},{n:"Eric Lauer",p:"SP",a:30,o:70}],bp:[{n:"Yimi Garcia",p:"CL",a:34,o:76},{n:"Nate Pearson",p:"SU",a:27,o:74},{n:"Chad Green",p:"SU",a:33,o:72},{n:"Erik Swanson",p:"MR",a:31,o:70},{n:"Zach Pop",p:"MR",a:28,o:68},{n:"Genesis Cabrera",p:"MR",a:29,o:66}],bench:[{n:"Davis Schneider",p:"RF",a:27,o:70},{n:"Spencer Horwitz",p:"1B",a:28,o:70},{n:"Leo Jimenez",p:"2B",a:24,o:64},{n:"Ricky Tiedemann",p:"SP",a:23,o:68}],farm:[{n:"Ricky Tiedemann",p:"SP",a:23,o:68,pot:90,lvl:"AAA"},{n:"Orelvis Martinez",p:"SS",a:23,o:58,pot:82,lvl:"AAA"},{n:"Dasan Brown",p:"OF",a:22,o:52,pot:80,lvl:"A"},{n:"Alan Roden",p:"OF",a:24,o:56,pot:76,lvl:"AA"},{n:"Gabriel Moreno",p:"C",a:25,o:60,pot:78,lvl:"AA"}]},
  BAL:{lu:[{n:"Gunnar Henderson",p:"SS",a:24,o:91},{n:"Adley Rutschman",p:"C",a:27,o:86},{n:"Pete Alonso",p:"1B",a:31,o:84},{n:"Tyler O'Neill",p:"RF",a:30,o:76},{n:"Taylor Ward",p:"LF",a:31,o:78},{n:"Coby Mayo",p:"3B",a:23,o:74},{n:"Samuel Basallo",p:"DH",a:20,o:74},{n:"Colton Cowser",p:"CF",a:25,o:72},{n:"Blaze Alexander",p:"2B",a:27,o:66}],ro:[{n:"Kyle Bradish",p:"SP",a:27,o:80},{n:"Shane Baz",p:"SP",a:25,o:76},{n:"Chris Bassitt",p:"SP",a:37,o:76},{n:"Zach Eflin",p:"SP",a:31,o:74},{n:"Trevor Rogers",p:"SP",a:28,o:78}],bp:[{n:"Felix Bautista",p:"CL",a:29,o:88},{n:"Yennier Cano",p:"SU",a:30,o:78},{n:"Danny Coulombe",p:"SU",a:34,o:74},{n:"Bryan Baker",p:"MR",a:30,o:70},{n:"Mike Baumann",p:"MR",a:29,o:66},{n:"Jacob Webb",p:"MR",a:31,o:66}],bench:[{n:"Anthony Santander",p:"RF",a:30,o:76},{n:"Jordan Westburg",p:"2B",a:26,o:74},{n:"Ramon Urias",p:"3B",a:31,o:66},{n:"James McCann",p:"C",a:35,o:62}],farm:[{n:"Jackson Holliday",p:"SS",a:22,o:64,pot:92,lvl:"AAA"},{n:"Samuel Basallo",p:"C",a:20,o:62,pot:88,lvl:"AAA"},{n:"Heston Kjerstad",p:"OF",a:26,o:62,pot:80,lvl:"AAA"},{n:"Connor Norby",p:"2B",a:25,o:60,pot:76,lvl:"AA"},{n:"Joey Ortiz",p:"SS",a:26,o:64,pot:78,lvl:"AAA"}]},
  HOU:{lu:[{n:"Yordan Alvarez",p:"LF",a:28,o:95},{n:"Jose Altuve",p:"2B",a:35,o:82},{n:"Carlos Correa",p:"3B",a:31,o:82},{n:"Christian Walker",p:"1B",a:33,o:80},{n:"Jeremy Pena",p:"SS",a:27,o:78},{n:"Isaac Paredes",p:"DH",a:27,o:78},{n:"Yainer Diaz",p:"C",a:26,o:76},{n:"Cam Smith",p:"RF",a:24,o:72},{n:"Jake Meyers",p:"CF",a:28,o:70}],ro:[{n:"Framber Valdez",p:"SP",a:31,o:84},{n:"Hunter Brown",p:"SP",a:26,o:80},{n:"Lance McCullers Jr.",p:"SP",a:32,o:78},{n:"Cristian Javier",p:"SP",a:27,o:76},{n:"Ronel Blanco",p:"SP",a:31,o:76}],bp:[{n:"Ryan Pressly",p:"CL",a:36,o:78},{n:"Bryan Abreu",p:"SU",a:27,o:80},{n:"Hector Neris",p:"SU",a:35,o:72},{n:"Seth Martinez",p:"MR",a:30,o:68},{n:"Parker Mushinski",p:"MR",a:29,o:66},{n:"Tayler Scott",p:"MR",a:32,o:64}],bench:[{n:"Mauricio Dubon",p:"CF",a:30,o:68},{n:"Jon Singleton",p:"1B",a:33,o:66},{n:"Cesar Salazar",p:"C",a:29,o:62},{n:"David Hensley",p:"UT",a:29,o:62}],farm:[{n:"Drew Gilbert",p:"OF",a:24,o:60,pot:82,lvl:"AAA"},{n:"Jacob Melton",p:"OF",a:23,o:56,pot:80,lvl:"AA"},{n:"Shay Whitcomb",p:"SS",a:26,o:62,pot:74,lvl:"AAA"},{n:"Colton Gordon",p:"SP",a:26,o:58,pot:78,lvl:"AAA"},{n:"Kenedy Corona",p:"OF",a:22,o:52,pot:76,lvl:"A"}]},
  LAA:{lu:[{n:"Mike Trout",p:"CF",a:34,o:90},{n:"Zach Neto",p:"SS",a:24,o:78},{n:"Jorge Soler",p:"DH",a:34,o:76},{n:"Nolan Schanuel",p:"1B",a:23,o:74},{n:"Jo Adell",p:"RF",a:26,o:74},{n:"Logan O'Hoppe",p:"C",a:25,o:74},{n:"Josh Lowe",p:"LF",a:27,o:72},{n:"Oswald Peraza",p:"2B",a:25,o:68},{n:"Anthony Rendon",p:"3B",a:35,o:66}],ro:[{n:"Yusei Kikuchi",p:"SP",a:34,o:78},{n:"Jose Soriano",p:"SP",a:26,o:76},{n:"Reid Detmers",p:"SP",a:26,o:74},{n:"Tyler Anderson",p:"SP",a:32,o:70},{n:"Jack Kochanowicz",p:"SP",a:23,o:68}],bp:[{n:"Carlos Estevez",p:"CL",a:32,o:78},{n:"Ben Joyce",p:"SU",a:23,o:74},{n:"Matt Moore",p:"SU",a:35,o:70},{n:"Chase Silseth",p:"MR",a:25,o:68},{n:"Kolby Allard",p:"MR",a:27,o:64},{n:"Chris Devenski",p:"MR",a:34,o:64}],bench:[{n:"Brandon Drury",p:"3B",a:32,o:68},{n:"Willie Calhoun",p:"LF",a:30,o:66},{n:"Matt Thaiss",p:"C",a:30,o:64},{n:"Michael Stefanic",p:"2B",a:29,o:62}],farm:[{n:"Christian Moore",p:"2B",a:22,o:58,pot:86,lvl:"A"},{n:"Caden Dana",p:"SP",a:21,o:56,pot:84,lvl:"A"},{n:"Jordyn Adams",p:"OF",a:24,o:60,pot:80,lvl:"AA"},{n:"Sam Bachman",p:"SP",a:24,o:58,pot:76,lvl:"AA"},{n:"Werner Blakely",p:"SS",a:21,o:52,pot:78,lvl:"A"}]},
  OAK:{lu:[{n:"Brent Rooker",p:"DH",a:30,o:78},{n:"Nick Kurtz",p:"1B",a:22,o:76},{n:"Zack Gelof",p:"2B",a:25,o:76},{n:"Max Muncy",p:"3B",a:31,o:76},{n:"Jacob Wilson",p:"SS",a:23,o:74},{n:"Lawrence Butler",p:"RF",a:24,o:74},{n:"Tyler Soderstrom",p:"LF",a:23,o:74},{n:"Shea Langeliers",p:"C",a:27,o:74},{n:"JJ Bleday",p:"CF",a:27,o:70}],ro:[{n:"JP Sears",p:"SP",a:28,o:74},{n:"Jeffrey Springs",p:"SP",a:32,o:74},{n:"Luis Medina",p:"SP",a:25,o:70},{n:"Joey Estes",p:"SP",a:24,o:70},{n:"Mitch Spence",p:"SP",a:27,o:70}],bp:[{n:"Mason Miller",p:"CL",a:27,o:86},{n:"Lucas Erceg",p:"SU",a:30,o:74},{n:"Dany Jimenez",p:"SU",a:32,o:70},{n:"Brady Feigl",p:"MR",a:29,o:64},{n:"Austin Adams",p:"MR",a:34,o:64},{n:"Shintaro Fujinami",p:"MR",a:31,o:64}],bench:[{n:"Esteury Ruiz",p:"CF",a:25,o:68},{n:"Ryan Noda",p:"1B",a:29,o:66},{n:"Carlos Perez",p:"C",a:30,o:62},{n:"Abraham Toro",p:"UT",a:29,o:62}],farm:[{n:"Tyler Soderstrom",p:"C",a:23,o:64,pot:82,lvl:"AAA"},{n:"Alexander Sanchez",p:"OF",a:22,o:56,pot:82,lvl:"A"},{n:"Gunnar Hoglund",p:"SP",a:25,o:58,pot:78,lvl:"AA"},{n:"Max Muncy Jr.",p:"SS",a:21,o:52,pot:80,lvl:"A"},{n:"Jordan Diaz",p:"3B",a:24,o:60,pot:76,lvl:"AAA"}]},
  SEA:{lu:[{n:"Julio Rodriguez",p:"CF",a:24,o:88},{n:"Cal Raleigh",p:"C",a:28,o:82},{n:"Royce Lewis",p:"3B",a:26,o:80},{n:"Mitch Garver",p:"DH",a:33,o:74},{n:"Luke Raley",p:"LF",a:30,o:74},{n:"Jorge Polanco",p:"2B",a:32,o:74},{n:"Dominic Canzone",p:"RF",a:29,o:72},{n:"JP Crawford",p:"SS",a:30,o:72},{n:"Ty France",p:"1B",a:31,o:72}],ro:[{n:"Logan Gilbert",p:"SP",a:28,o:84},{n:"George Kirby",p:"SP",a:27,o:82},{n:"Luis Castillo",p:"SP",a:32,o:80},{n:"Bryan Woo",p:"SP",a:25,o:76},{n:"Emerson Hancock",p:"SP",a:25,o:74}],bp:[{n:"Andres Munoz",p:"CL",a:26,o:86},{n:"Matt Brash",p:"SU",a:26,o:72},{n:"Gabe Speier",p:"SU",a:29,o:72},{n:"Tayler Saucedo",p:"MR",a:29,o:70},{n:"Casey Sadler",p:"MR",a:34,o:68},{n:"Trent Thornton",p:"MR",a:32,o:66}],bench:[{n:"Sam Haggerty",p:"OF",a:31,o:66},{n:"Josh Rojas",p:"UT",a:31,o:66},{n:"Tom Murphy",p:"C",a:34,o:64},{n:"Cooper Hummel",p:"LF",a:30,o:62}],farm:[{n:"Cole Young",p:"SS",a:21,o:58,pot:86,lvl:"A"},{n:"Harry Ford",p:"C",a:22,o:56,pot:84,lvl:"AA"},{n:"Jonatan Clase",p:"OF",a:23,o:62,pot:80,lvl:"AAA"},{n:"Prelander Berroa",p:"SP",a:24,o:56,pot:78,lvl:"AA"},{n:"Victor Labrada",p:"OF",a:26,o:60,pot:76,lvl:"AAA"}]},
  TEX:{lu:[{n:"Corey Seager",p:"SS",a:32,o:88},{n:"Marcus Semien",p:"2B",a:35,o:80},{n:"Wyatt Langford",p:"LF",a:23,o:78},{n:"Nathaniel Lowe",p:"1B",a:29,o:78},{n:"Adolis Garcia",p:"RF",a:32,o:78},{n:"Josh Jung",p:"3B",a:27,o:76},{n:"Jonah Heim",p:"C",a:29,o:74},{n:"Leody Taveras",p:"CF",a:26,o:72},{n:"Evan Carter",p:"DH",a:22,o:70}],ro:[{n:"Jacob deGrom",p:"SP",a:38,o:80},{n:"Jon Gray",p:"SP",a:34,o:74},{n:"Kumar Rocker",p:"SP",a:25,o:74},{n:"Cody Bradford",p:"SP",a:26,o:70},{n:"Michael Lorenzen",p:"SP",a:33,o:70}],bp:[{n:"Kirby Yates",p:"CL",a:37,o:80},{n:"Grant Anderson",p:"SU",a:28,o:70},{n:"Jonathan Hernandez",p:"SU",a:28,o:70},{n:"Brock Burke",p:"MR",a:28,o:66},{n:"David Robertson",p:"MR",a:39,o:68},{n:"Cole Ragans",p:"MR",a:27,o:72}],bench:[{n:"Travis Jankowski",p:"CF",a:35,o:64},{n:"Andrew Knizner",p:"C",a:30,o:62},{n:"Ezequiel Duran",p:"UT",a:26,o:66},{n:"Brad Miller",p:"UT",a:35,o:60}],farm:[{n:"Kumar Rocker",p:"SP",a:25,o:66,pot:82,lvl:"AAA"},{n:"Brock Porter",p:"SP",a:22,o:54,pot:82,lvl:"A"},{n:"Ian Moller",p:"C",a:22,o:52,pot:78,lvl:"A"},{n:"Cole Winn",p:"SP",a:25,o:58,pot:76,lvl:"AAA"},{n:"Thomas Saggese",p:"3B",a:23,o:58,pot:74,lvl:"AAA"}]},
  CLE:{lu:[{n:"Jose Ramirez",p:"3B",a:33,o:92},{n:"Steven Kwan",p:"CF",a:27,o:82},{n:"Rhys Hoskins",p:"DH",a:32,o:76},{n:"Kyle Manzardo",p:"1B",a:24,o:74},{n:"Chase DeLauter",p:"RF",a:23,o:74},{n:"Bo Naylor",p:"C",a:24,o:72},{n:"Brayan Rocchio",p:"2B",a:23,o:70},{n:"Angel Martinez",p:"LF",a:22,o:70},{n:"Gabriel Arias",p:"SS",a:24,o:68}],ro:[{n:"Tanner Bibee",p:"SP",a:26,o:80},{n:"Gavin Williams",p:"SP",a:25,o:76},{n:"Ben Lively",p:"SP",a:32,o:72},{n:"Joey Cantillo",p:"SP",a:25,o:70},{n:"Parker Messick",p:"SP",a:24,o:70}],bp:[{n:"Emmanuel Clase",p:"CL",a:27,o:92},{n:"Trevor Stephan",p:"SU",a:29,o:74},{n:"Nick Sandlin",p:"SU",a:29,o:72},{n:"Hunter Gaddis",p:"MR",a:27,o:70},{n:"Sam Hentges",p:"MR",a:29,o:68},{n:"Tim Herrin",p:"MR",a:29,o:66}],bench:[{n:"David Fry",p:"C",a:29,o:68},{n:"Will Brennan",p:"LF",a:27,o:66},{n:"Ernie Clement",p:"UT",a:29,o:62},{n:"Austin Hedges",p:"C",a:32,o:60}],farm:[{n:"George Valera",p:"OF",a:24,o:60,pot:80,lvl:"AAA"},{n:"Daniel Espino",p:"SP",a:24,o:58,pot:86,lvl:"AA"},{n:"Jhonkensy Noel",p:"1B",a:23,o:60,pot:80,lvl:"AAA"},{n:"Angel Martinez",p:"SS",a:22,o:58,pot:76,lvl:"AAA"},{n:"Bo Naylor",p:"C",a:24,o:64,pot:80,lvl:"AAA"}]},
  CHW:{lu:[{n:"Luis Robert Jr.",p:"CF",a:27,o:82},{n:"Andrew Vaughn",p:"1B",a:27,o:74},{n:"Andrew Benintendi",p:"LF",a:31,o:74},{n:"Bryan Ramos",p:"3B",a:22,o:68},{n:"Lenyn Sosa",p:"2B",a:24,o:68},{n:"Korey Lee",p:"C",a:27,o:68},{n:"Gavin Sheets",p:"DH",a:29,o:68},{n:"Tommy Pham",p:"RF",a:37,o:66},{n:"Nicky Lopez",p:"SS",a:30,o:66}],ro:[{n:"Erick Fedde",p:"SP",a:33,o:72},{n:"Jonathan Cannon",p:"SP",a:24,o:70},{n:"Sean Burke",p:"SP",a:25,o:68},{n:"Chris Flexen",p:"SP",a:31,o:68},{n:"Davis Martin",p:"SP",a:28,o:66}],bp:[{n:"Michael Kopech",p:"CL",a:29,o:76},{n:"Jordan Leasure",p:"SU",a:28,o:70},{n:"Tanner Banks",p:"SU",a:33,o:68},{n:"Fraser Ellard",p:"MR",a:27,o:64},{n:"Jake Diekman",p:"MR",a:37,o:64},{n:"Bryan Shaw",p:"MR",a:37,o:62}],bench:[{n:"Oscar Colas",p:"RF",a:26,o:64},{n:"Zach Remillard",p:"UT",a:30,o:62},{n:"Seby Zavala",p:"C",a:32,o:60},{n:"Romy Gonzalez",p:"UT",a:28,o:60}],farm:[{n:"Colson Montgomery",p:"SS",a:22,o:58,pot:88,lvl:"AA"},{n:"Edgar Quero",p:"C",a:22,o:56,pot:82,lvl:"AA"},{n:"Noah Schultz",p:"SP",a:21,o:54,pot:84,lvl:"A"},{n:"Bryan Ramos",p:"3B",a:22,o:60,pot:80,lvl:"AAA"},{n:"Oscar Colas",p:"OF",a:26,o:58,pot:74,lvl:"AAA"}]},
  DET:{lu:[{n:"Tarik Skubal",p:"SP",a:28,o:92},{n:"Gleyber Torres",p:"2B",a:29,o:78},{n:"Spencer Torkelson",p:"1B",a:26,o:76},{n:"Kerry Carpenter",p:"LF",a:27,o:76},{n:"Parker Meadows",p:"CF",a:25,o:74},{n:"Jace Jung",p:"DH",a:24,o:72},{n:"Matt Vierling",p:"RF",a:29,o:72},{n:"Zach McKinstry",p:"3B",a:30,o:70},{n:"Trey Sweeney",p:"SS",a:24,o:68}],ro:[{n:"Tarik Skubal",p:"SP",a:28,o:92},{n:"Framber Valdez",p:"SP",a:31,o:84},{n:"Jackson Jobe",p:"SP",a:22,o:76},{n:"Reese Olson",p:"SP",a:25,o:74},{n:"Casey Mize",p:"SP",a:28,o:74}],bp:[{n:"Jason Foley",p:"CL",a:29,o:80},{n:"Tyler Holton",p:"SU",a:29,o:74},{n:"Will Vest",p:"SU",a:30,o:74},{n:"Brant Hurter",p:"MR",a:27,o:70},{n:"Alex Faedo",p:"MR",a:28,o:68},{n:"Joey Wentz",p:"MR",a:26,o:66}],bench:[{n:"Jake Rogers",p:"C",a:30,o:68},{n:"Mark Canha",p:"LF",a:36,o:66},{n:"Andy Ibanez",p:"UT",a:32,o:66},{n:"Eric Haase",p:"C",a:32,o:62}],farm:[{n:"Jackson Jobe",p:"SP",a:22,o:68,pot:88,lvl:"AAA"},{n:"Colt Keith",p:"2B",a:23,o:64,pot:84,lvl:"AAA"},{n:"Dylan Smith",p:"SP",a:23,o:56,pot:80,lvl:"AA"},{n:"Ty Madden",p:"SP",a:25,o:58,pot:76,lvl:"AA"},{n:"Parker Meadows",p:"OF",a:25,o:62,pot:78,lvl:"AAA"}]},
  KCR:{lu:[{n:"Bobby Witt Jr.",p:"SS",a:25,o:92},{n:"Salvador Perez",p:"C",a:35,o:80},{n:"Vinnie Pasquantino",p:"1B",a:27,o:78},{n:"Maikel Garcia",p:"3B",a:25,o:74},{n:"Jonathan India",p:"2B",a:28,o:74},{n:"Lane Thomas",p:"CF",a:29,o:72},{n:"Starling Marte",p:"RF",a:37,o:72},{n:"MJ Melendez",p:"DH",a:26,o:70},{n:"Dairon Blanco",p:"LF",a:31,o:68}],ro:[{n:"Cole Ragans",p:"SP",a:27,o:82},{n:"Seth Lugo",p:"SP",a:36,o:78},{n:"Brady Singer",p:"SP",a:28,o:76},{n:"Michael Wacha",p:"SP",a:34,o:72},{n:"Kris Bubic",p:"SP",a:27,o:70}],bp:[{n:"James McArthur",p:"CL",a:30,o:80},{n:"John Schreiber",p:"SU",a:31,o:70},{n:"Carlos Hernandez",p:"SU",a:28,o:72},{n:"Walter Pennington",p:"MR",a:27,o:66},{n:"Dylan Coleman",p:"MR",a:29,o:68},{n:"Josh Taylor",p:"MR",a:33,o:64}],bench:[{n:"Hunter Dozier",p:"3B",a:32,o:68},{n:"Freddy Fermin",p:"C",a:28,o:64},{n:"Drew Waters",p:"CF",a:26,o:64},{n:"Nick Pratto",p:"1B",a:26,o:62}],farm:[{n:"Jac Caglianone",p:"1B",a:22,o:58,pot:86,lvl:"A"},{n:"Carter Jensen",p:"C",a:23,o:60,pot:84,lvl:"AA"},{n:"Cayden Wallace",p:"3B",a:23,o:56,pot:80,lvl:"AA"},{n:"Frank Mozzicato",p:"SP",a:22,o:52,pot:82,lvl:"A"},{n:"Ben Kudrna",p:"SP",a:22,o:54,pot:80,lvl:"A"}]},
  MIN:{lu:[{n:"Byron Buxton",p:"CF",a:32,o:82},{n:"Royce Lewis",p:"3B",a:26,o:80},{n:"Ryan Jeffers",p:"C",a:28,o:76},{n:"Matt Wallner",p:"RF",a:27,o:74},{n:"Jose Miranda",p:"1B",a:28,o:72},{n:"Brooks Lee",p:"SS",a:24,o:72},{n:"Josh Bell",p:"DH",a:33,o:72},{n:"Luke Keaschall",p:"2B",a:23,o:70},{n:"Austin Martin",p:"LF",a:26,o:72}],ro:[{n:"Pablo Lopez",p:"SP",a:28,o:80},{n:"Joe Ryan",p:"SP",a:28,o:78},{n:"Bailey Ober",p:"SP",a:28,o:76},{n:"Zebby Matthews",p:"SP",a:24,o:70},{n:"Simeon Woods Richardson",p:"SP",a:23,o:70}],bp:[{n:"Jhoan Duran",p:"CL",a:27,o:88},{n:"Griffin Jax",p:"SU",a:31,o:74},{n:"Cole Sands",p:"SU",a:27,o:68},{n:"Caleb Thielbar",p:"MR",a:37,o:68},{n:"Brock Stewart",p:"MR",a:33,o:64},{n:"Steven Okert",p:"MR",a:34,o:64}],bench:[{n:"Kyle Farmer",p:"UT",a:34,o:66},{n:"Edouard Julien",p:"2B",a:26,o:70},{n:"Michael A Taylor",p:"CF",a:33,o:64},{n:"Christian Vazquez",p:"C",a:34,o:64}],farm:[{n:"Emmanuel Rodriguez",p:"OF",a:22,o:58,pot:86,lvl:"AA"},{n:"Noah Miller",p:"SS",a:23,o:56,pot:80,lvl:"A"},{n:"Yasser Mercedes",p:"OF",a:21,o:54,pot:82,lvl:"A"},{n:"Brooks Lee",p:"SS",a:24,o:64,pot:84,lvl:"AAA"},{n:"Simeon Woods Richardson",p:"SP",a:23,o:62,pot:80,lvl:"AAA"}]},
  ATL:{lu:[{n:"Ronald Acuna Jr.",p:"RF",a:28,o:92},{n:"Austin Riley",p:"3B",a:28,o:84},{n:"Matt Olson",p:"1B",a:31,o:84},{n:"Sean Murphy",p:"C",a:30,o:82},{n:"Ozzie Albies",p:"2B",a:29,o:82},{n:"Michael Harris II",p:"CF",a:24,o:82},{n:"Marcell Ozuna",p:"DH",a:35,o:78},{n:"Adam Duvall",p:"LF",a:37,o:70},{n:"Orlando Arcia",p:"SS",a:30,o:68}],ro:[{n:"Spencer Strider",p:"SP",a:25,o:82},{n:"Chris Sale",p:"SP",a:37,o:80},{n:"Reynaldo Lopez",p:"SP",a:31,o:76},{n:"Spencer Schwellenbach",p:"SP",a:24,o:74},{n:"Hurston Waldrep",p:"SP",a:24,o:70}],bp:[{n:"Raisel Iglesias",p:"CL",a:34,o:82},{n:"A.J. Minter",p:"SU",a:31,o:76},{n:"Joe Jimenez",p:"SU",a:31,o:70},{n:"Pierce Johnson",p:"MR",a:33,o:68},{n:"Dylan Lee",p:"MR",a:30,o:68},{n:"Jesse Chavez",p:"MR",a:40,o:66}],bench:[{n:"Travis d'Arnaud",p:"C",a:36,o:70},{n:"Eli White",p:"CF",a:31,o:62},{n:"Forrest Wall",p:"OF",a:29,o:62},{n:"Ehire Adrianza",p:"UT",a:35,o:58}],farm:[{n:"Spencer Schwellenbach",p:"SP",a:24,o:66,pot:84,lvl:"AAA"},{n:"Hurston Waldrep",p:"SP",a:24,o:64,pot:82,lvl:"AAA"},{n:"Drake Baldwin",p:"C",a:25,o:60,pot:80,lvl:"AA"},{n:"Justyn-Henry Malloy",p:"OF",a:25,o:60,pot:78,lvl:"AAA"},{n:"Cade Povich",p:"SP",a:25,o:58,pot:76,lvl:"AAA"}]},
  NYM:{lu:[{n:"Juan Soto",p:"RF",a:27,o:96},{n:"Francisco Lindor",p:"SS",a:32,o:88},{n:"Pete Alonso",p:"1B",a:31,o:84},{n:"Francisco Alvarez",p:"C",a:23,o:78},{n:"Mark Vientos",p:"3B",a:24,o:78},{n:"Brandon Nimmo",p:"CF",a:33,o:76},{n:"Brett Baty",p:"2B",a:24,o:72},{n:"Jesse Winker",p:"LF",a:32,o:74},{n:"Tyrone Taylor",p:"DH",a:31,o:70}],ro:[{n:"Kodai Senga",p:"SP",a:32,o:82},{n:"David Peterson",p:"SP",a:29,o:76},{n:"Sean Manaea",p:"SP",a:33,o:76},{n:"Clay Holmes",p:"SP",a:32,o:72},{n:"Paul Blackburn",p:"SP",a:32,o:70}],bp:[{n:"Edwin Diaz",p:"CL",a:31,o:88},{n:"Phil Maton",p:"SU",a:31,o:72},{n:"Adam Ottavino",p:"SU",a:39,o:70},{n:"Tylor Megill",p:"MR",a:29,o:68},{n:"Danny Young",p:"MR",a:29,o:68},{n:"Jorge Lopez",p:"MR",a:32,o:66}],bench:[{n:"Jeff McNeil",p:"2B",a:33,o:74},{n:"Harrison Bader",p:"CF",a:31,o:68},{n:"Omar Narvaez",p:"C",a:33,o:64},{n:"DJ Stewart",p:"LF",a:30,o:62}],farm:[{n:"Francisco Alvarez",p:"C",a:23,o:72,pot:90,lvl:"AAA"},{n:"Luisangel Acuna",p:"2B",a:22,o:60,pot:84,lvl:"AAA"},{n:"Kevin Parada",p:"C",a:23,o:58,pot:84,lvl:"AA"},{n:"Jett Williams",p:"SS",a:22,o:56,pot:82,lvl:"AA"},{n:"Brett Baty",p:"3B",a:24,o:64,pot:80,lvl:"AAA"}]},
  PHI:{lu:[{n:"Bryce Harper",p:"1B",a:33,o:92},{n:"Trea Turner",p:"SS",a:32,o:84},{n:"Kyle Schwarber",p:"LF",a:32,o:84},{n:"JT Realmuto",p:"C",a:34,o:84},{n:"Alec Bohm",p:"3B",a:28,o:78},{n:"Bryson Stott",p:"2B",a:26,o:76},{n:"Nick Castellanos",p:"RF",a:33,o:76},{n:"Johan Rojas",p:"CF",a:24,o:70},{n:"Weston Wilson",p:"DH",a:30,o:66}],ro:[{n:"Cristopher Sanchez",p:"SP",a:27,o:80},{n:"Jesus Luzardo",p:"SP",a:27,o:80},{n:"Aaron Nola",p:"SP",a:32,o:80},{n:"Andrew Painter",p:"SP",a:22,o:74},{n:"Taijuan Walker",p:"SP",a:33,o:70}],bp:[{n:"Jose Alvarado",p:"CL",a:29,o:84},{n:"Matt Strahm",p:"SU",a:32,o:76},{n:"Seranthony Dominguez",p:"SU",a:30,o:74},{n:"Gregory Soto",p:"MR",a:29,o:72},{n:"Jeff Hoffman",p:"MR",a:32,o:70},{n:"Connor Brogdon",p:"MR",a:30,o:66}],bench:[{n:"Brandon Marsh",p:"LF",a:27,o:72},{n:"Edmundo Sosa",p:"UT",a:29,o:64},{n:"Garrett Stubbs",p:"C",a:32,o:60},{n:"Kody Clemens",p:"UT",a:29,o:58}],farm:[{n:"Andrew Painter",p:"SP",a:22,o:66,pot:90,lvl:"AAA"},{n:"Mick Abel",p:"SP",a:23,o:60,pot:84,lvl:"AA"},{n:"Hao-Yu Lee",p:"2B",a:23,o:56,pot:78,lvl:"AA"},{n:"Griff McGarry",p:"SP",a:26,o:58,pot:78,lvl:"AAA"},{n:"Starlyn Caba",p:"SS",a:20,o:50,pot:82,lvl:"A"}]},
  MIA:{lu:[{n:"Jake Burger",p:"1B",a:29,o:76},{n:"Xavier Edwards",p:"2B",a:25,o:72},{n:"Jesus Sanchez",p:"RF",a:27,o:72},{n:"Bryan De La Cruz",p:"LF",a:28,o:70},{n:"Jake Fraley",p:"DH",a:30,o:68},{n:"Connor Norby",p:"3B",a:25,o:68},{n:"Otto Lopez",p:"SS",a:25,o:68},{n:"Dane Myers",p:"CF",a:25,o:66},{n:"Nick Fortes",p:"C",a:28,o:66}],ro:[{n:"Sandy Alcantara",p:"SP",a:30,o:82},{n:"Eury Perez",p:"SP",a:22,o:76},{n:"Braxton Garrett",p:"SP",a:27,o:72},{n:"Edward Cabrera",p:"SP",a:27,o:72},{n:"Trevor Rogers",p:"SP",a:28,o:70}],bp:[{n:"Tanner Scott",p:"CL",a:30,o:82},{n:"A.J. Puk",p:"SU",a:29,o:76},{n:"Andrew Nardi",p:"SU",a:28,o:68},{n:"Dylan Floro",p:"MR",a:34,o:68},{n:"George Soriano",p:"MR",a:26,o:64},{n:"Steven Okert",p:"MR",a:34,o:62}],bench:[{n:"Peyton Burdick",p:"RF",a:28,o:64},{n:"Jon Berti",p:"UT",a:36,o:62},{n:"Jacob Stallings",p:"C",a:35,o:62},{n:"Charles Leblanc",p:"UT",a:30,o:60}],farm:[{n:"Eury Perez",p:"SP",a:22,o:68,pot:90,lvl:"AAA"},{n:"Jacob Berry",p:"3B",a:23,o:58,pot:84,lvl:"AA"},{n:"Dax Fulton",p:"SP",a:23,o:56,pot:82,lvl:"AA"},{n:"Nasim Nunez",p:"SS",a:23,o:54,pot:78,lvl:"AA"},{n:"Osiris Johnson",p:"SS",a:21,o:50,pot:80,lvl:"A"}]},
  WSN:{lu:[{n:"James Wood",p:"CF",a:22,o:82},{n:"CJ Abrams",p:"SS",a:25,o:78},{n:"Nathaniel Lowe",p:"1B",a:29,o:78},{n:"Keibert Ruiz",p:"C",a:26,o:74},{n:"Luis Garcia Jr.",p:"2B",a:23,o:74},{n:"Dylan Crews",p:"RF",a:24,o:72},{n:"Joey Meneses",p:"DH",a:35,o:72},{n:"Eddie Rosario",p:"LF",a:34,o:68},{n:"Trey Lipscomb",p:"3B",a:26,o:66}],ro:[{n:"MacKenzie Gore",p:"SP",a:27,o:78},{n:"DJ Herz",p:"SP",a:24,o:72},{n:"Mitchell Parker",p:"SP",a:24,o:70},{n:"Jake Irvin",p:"SP",a:27,o:70},{n:"Patrick Corbin",p:"SP",a:36,o:66}],bp:[{n:"Kyle Finnegan",p:"CL",a:32,o:78},{n:"Mason Thompson",p:"SU",a:27,o:72},{n:"Hunter Harvey",p:"SU",a:28,o:72},{n:"Victor Arano",p:"MR",a:31,o:68},{n:"Jordan Weems",p:"MR",a:31,o:64},{n:"Erasmo Ramirez",p:"MR",a:35,o:62}],bench:[{n:"Alex Call",p:"LF",a:31,o:64},{n:"Stone Garrett",p:"RF",a:29,o:62},{n:"Carter Kieboom",p:"3B",a:27,o:62},{n:"Israel Pineda",p:"C",a:25,o:60}],farm:[{n:"James Wood",p:"OF",a:22,o:74,pot:92,lvl:"AAA"},{n:"Brady House",p:"SS",a:22,o:56,pot:82,lvl:"AA"},{n:"Elijah Green",p:"OF",a:21,o:52,pot:86,lvl:"A"},{n:"Cade Cavalli",p:"SP",a:26,o:60,pot:80,lvl:"AAA"},{n:"Dylan Crews",p:"OF",a:24,o:64,pot:84,lvl:"AAA"}]},
  CHC:{lu:[{n:"Seiya Suzuki",p:"RF",a:31,o:82},{n:"Nico Hoerner",p:"2B",a:28,o:80},{n:"Ian Happ",p:"LF",a:31,o:80},{n:"Cody Bellinger",p:"CF",a:30,o:78},{n:"Dansby Swanson",p:"SS",a:32,o:78},{n:"Michael Busch",p:"1B",a:27,o:76},{n:"Christopher Morel",p:"3B",a:26,o:72},{n:"Miguel Amaya",p:"C",a:25,o:70},{n:"Owen Caissie",p:"DH",a:22,o:70}],ro:[{n:"Shota Imanaga",p:"SP",a:31,o:84},{n:"Matthew Boyd",p:"SP",a:35,o:74},{n:"Jordan Wicks",p:"SP",a:26,o:72},{n:"Jameson Taillon",p:"SP",a:33,o:72},{n:"Colin Rea",p:"SP",a:35,o:68}],bp:[{n:"Adbert Alzolay",p:"CL",a:29,o:76},{n:"Luke Little",p:"SU",a:24,o:70},{n:"Hector Neris",p:"SU",a:35,o:72},{n:"Drew Smyly",p:"MR",a:35,o:66},{n:"Michael Rucker",p:"MR",a:32,o:66},{n:"Ethan Roberts",p:"MR",a:28,o:64}],bench:[{n:"Patrick Wisdom",p:"3B",a:33,o:66},{n:"Nelson Velazquez",p:"RF",a:26,o:64},{n:"Tomas Nido",p:"C",a:31,o:60},{n:"Miles Mastrobuoni",p:"UT",a:30,o:58}],farm:[{n:"Pete Crow-Armstrong",p:"OF",a:22,o:64,pot:86,lvl:"AAA"},{n:"Cade Horton",p:"SP",a:23,o:58,pot:86,lvl:"AA"},{n:"Matt Shaw",p:"3B",a:23,o:58,pot:82,lvl:"AA"},{n:"Kevin Alcantara",p:"OF",a:22,o:56,pot:80,lvl:"AA"},{n:"Owen Caissie",p:"OF",a:22,o:60,pot:82,lvl:"AAA"}]},
  MIL:{lu:[{n:"Willy Adames",p:"SS",a:29,o:80},{n:"William Contreras",p:"C",a:27,o:80},{n:"Christian Yelich",p:"DH",a:34,o:80},{n:"Jackson Chourio",p:"LF",a:21,o:78},{n:"Brice Turang",p:"2B",a:25,o:72},{n:"Sal Frelick",p:"CF",a:24,o:72},{n:"Tyler Black",p:"3B",a:24,o:72},{n:"Joey Wiemer",p:"RF",a:26,o:70},{n:"Jake Bauers",p:"1B",a:28,o:68}],ro:[{n:"Freddy Peralta",p:"SP",a:28,o:80},{n:"Brandon Woodruff",p:"SP",a:32,o:80},{n:"Tobias Myers",p:"SP",a:26,o:72},{n:"Quinn Priester",p:"SP",a:24,o:70},{n:"Aaron Civale",p:"SP",a:30,o:70}],bp:[{n:"Devin Williams",p:"CL",a:30,o:88},{n:"Joel Payamps",p:"SU",a:31,o:72},{n:"Elvis Peguero",p:"SU",a:27,o:70},{n:"Hoby Milner",p:"MR",a:34,o:68},{n:"Peter Strzelecki",p:"MR",a:31,o:66},{n:"Jake Cousins",p:"MR",a:31,o:64}],bench:[{n:"Owen Miller",p:"2B",a:28,o:64},{n:"Victor Caratini",p:"C",a:30,o:64},{n:"Blake Perkins",p:"CF",a:27,o:62},{n:"Andruw Monasterio",p:"UT",a:27,o:60}],farm:[{n:"Jackson Chourio",p:"OF",a:21,o:70,pot:88,lvl:"AAA"},{n:"Tyler Black",p:"3B",a:24,o:64,pot:80,lvl:"AAA"},{n:"Eric Brown Jr.",p:"SS",a:24,o:58,pot:78,lvl:"AA"},{n:"Hendry Mendez",p:"OF",a:20,o:52,pot:82,lvl:"A"},{n:"Sal Frelick",p:"OF",a:24,o:64,pot:82,lvl:"AAA"}]},
  STL:{lu:[{n:"Nolan Arenado",p:"3B",a:35,o:84},{n:"Paul Goldschmidt",p:"1B",a:38,o:80},{n:"Masyn Winn",p:"SS",a:23,o:78},{n:"Brendan Donovan",p:"2B",a:28,o:76},{n:"Lars Nootbaar",p:"RF",a:27,o:76},{n:"Jordan Walker",p:"LF",a:23,o:76},{n:"Ivan Herrera",p:"C",a:24,o:70},{n:"Victor Scott II",p:"CF",a:24,o:70},{n:"Thomas Saggese",p:"DH",a:23,o:68}],ro:[{n:"Sonny Gray",p:"SP",a:36,o:78},{n:"Miles Mikolas",p:"SP",a:37,o:70},{n:"Matthew Liberatore",p:"SP",a:25,o:72},{n:"Andre Pallante",p:"SP",a:27,o:70},{n:"Lance Lynn",p:"SP",a:38,o:68}],bp:[{n:"Ryan Helsley",p:"CL",a:30,o:88},{n:"JoJo Romero",p:"SU",a:28,o:72},{n:"Zack Thompson",p:"SU",a:27,o:68},{n:"Andrew Kittredge",p:"MR",a:34,o:70},{n:"Chris Stratton",p:"MR",a:34,o:66},{n:"Keynan Middleton",p:"MR",a:31,o:66}],bench:[{n:"Alec Burleson",p:"LF",a:26,o:70},{n:"Pedro Pages",p:"C",a:25,o:62},{n:"Jose Fermin",p:"UT",a:26,o:60},{n:"Lars Nootbaar",p:"RF",a:27,o:74}],farm:[{n:"Tink Hence",p:"SP",a:22,o:54,pot:84,lvl:"AA"},{n:"Gordon Graceffo",p:"SP",a:25,o:58,pot:78,lvl:"AAA"},{n:"Michael McGreevy",p:"SP",a:25,o:58,pot:76,lvl:"AAA"},{n:"Jordan Walker",p:"OF",a:23,o:66,pot:82,lvl:"AAA"},{n:"Masyn Winn",p:"SS",a:23,o:68,pot:84,lvl:"AAA"}]},
  PIT:{lu:[{n:"Bryan Reynolds",p:"CF",a:30,o:82},{n:"Oneil Cruz",p:"SS",a:26,o:80},{n:"Spencer Horwitz",p:"1B",a:28,o:72},{n:"Ji Hwan Bae",p:"LF",a:25,o:72},{n:"Nick Gonzales",p:"2B",a:26,o:70},{n:"Endy Rodriguez",p:"C",a:24,o:70},{n:"Jared Triolo",p:"3B",a:27,o:68},{n:"Connor Joe",p:"RF",a:32,o:68},{n:"Andrew McCutchen",p:"DH",a:39,o:68}],ro:[{n:"Paul Skenes",p:"SP",a:23,o:90},{n:"Mitch Keller",p:"SP",a:28,o:78},{n:"Braxton Ashcraft",p:"SP",a:24,o:72},{n:"Bubba Chandler",p:"SP",a:22,o:72},{n:"Marco Gonzales",p:"SP",a:33,o:68}],bp:[{n:"David Bednar",p:"CL",a:31,o:82},{n:"Colin Holderman",p:"SU",a:30,o:70},{n:"Ryan Borucki",p:"SU",a:31,o:70},{n:"Dauri Moreta",p:"MR",a:28,o:68},{n:"Luis Ortiz",p:"MR",a:26,o:66},{n:"Josh Fleming",p:"MR",a:28,o:64}],bench:[{n:"Jack Suwinski",p:"LF",a:27,o:66},{n:"Carlos Santana",p:"1B",a:39,o:62},{n:"Michael Perez",p:"C",a:33,o:58},{n:"Billy Cook",p:"UT",a:25,o:58}],farm:[{n:"Henry Davis",p:"C",a:24,o:58,pot:84,lvl:"AAA"},{n:"Termarr Johnson",p:"2B",a:21,o:56,pot:86,lvl:"AA"},{n:"Jared Jones",p:"SP",a:23,o:62,pot:82,lvl:"AAA"},{n:"Bubba Chandler",p:"SP",a:22,o:58,pot:84,lvl:"AA"},{n:"Endy Rodriguez",p:"C",a:24,o:60,pot:78,lvl:"AAA"}]},
  CIN:{lu:[{n:"Elly De La Cruz",p:"SS",a:23,o:84},{n:"Hunter Greene",p:"SP",a:25,o:82},{n:"Tyler Stephenson",p:"C",a:28,o:76},{n:"Matt McLain",p:"2B",a:25,o:76},{n:"Jonathan India",p:"3B",a:28,o:74},{n:"Christian Encarnacion-Strand",p:"1B",a:25,o:72},{n:"TJ Friedl",p:"CF",a:30,o:72},{n:"Will Benson",p:"RF",a:27,o:70},{n:"Jake Fraley",p:"LF",a:30,o:70}],ro:[{n:"Hunter Greene",p:"SP",a:25,o:82},{n:"Nick Lodolo",p:"SP",a:27,o:76},{n:"Andrew Abbott",p:"SP",a:26,o:74},{n:"Connor Phillips",p:"SP",a:24,o:70},{n:"Frankie Montas",p:"SP",a:32,o:70}],bp:[{n:"Alexis Diaz",p:"CL",a:28,o:82},{n:"Fernando Cruz",p:"SU",a:33,o:70},{n:"Buck Farmer",p:"SU",a:34,o:70},{n:"Tony Santillan",p:"MR",a:27,o:66},{n:"Ian Gibaut",p:"MR",a:31,o:64},{n:"Casey Legumina",p:"MR",a:27,o:64}],bench:[{n:"Jeimer Candelario",p:"3B",a:31,o:72},{n:"Stuart Fairchild",p:"CF",a:29,o:62},{n:"Luke Maile",p:"C",a:33,o:58},{n:"Matt Reynolds",p:"UT",a:34,o:58}],farm:[{n:"Edwin Arroyo",p:"SS",a:22,o:58,pot:84,lvl:"AA"},{n:"Cam Collier",p:"3B",a:20,o:52,pot:86,lvl:"A"},{n:"Rhett Lowder",p:"SP",a:23,o:56,pot:82,lvl:"AA"},{n:"Connor Phillips",p:"SP",a:24,o:60,pot:78,lvl:"AAA"},{n:"Christian Encarnacion-Strand",p:"1B",a:25,o:62,pot:78,lvl:"AAA"}]},
  LAD:{lu:[{n:"Shohei Ohtani",p:"DH",a:31,o:99},{n:"Mookie Betts",p:"SS",a:33,o:92},{n:"Freddie Freeman",p:"1B",a:36,o:90},{n:"Will Smith",p:"C",a:30,o:82},{n:"Teoscar Hernandez",p:"RF",a:32,o:80},{n:"Tommy Edman",p:"CF",a:30,o:76},{n:"Max Muncy",p:"3B",a:34,o:76},{n:"Kike Hernandez",p:"2B",a:34,o:72},{n:"Andy Pages",p:"LF",a:24,o:74}],ro:[{n:"Yoshinobu Yamamoto",p:"SP",a:27,o:90},{n:"Tyler Glasnow",p:"SP",a:31,o:86},{n:"Clayton Kershaw",p:"SP",a:38,o:76},{n:"Bobby Miller",p:"SP",a:26,o:74},{n:"James Paxton",p:"SP",a:37,o:70}],bp:[{n:"Evan Phillips",p:"CL",a:31,o:84},{n:"Alex Vesia",p:"SU",a:29,o:78},{n:"Brusdar Graterol",p:"SU",a:26,o:76},{n:"Anthony Banda",p:"MR",a:31,o:72},{n:"Joe Kelly",p:"MR",a:36,o:68},{n:"Ryan Brasier",p:"MR",a:37,o:64}],bench:[{n:"Chris Taylor",p:"UT",a:34,o:66},{n:"Enrique Hernandez",p:"UT",a:34,o:64},{n:"Austin Barnes",p:"C",a:36,o:60},{n:"Jason Heyward",p:"LF",a:36,o:58}],farm:[{n:"Diego Cartaya",p:"C",a:23,o:58,pot:86,lvl:"AA"},{n:"Dalton Rushing",p:"C",a:24,o:60,pot:84,lvl:"AAA"},{n:"Nick Frasso",p:"SP",a:26,o:58,pot:80,lvl:"AA"},{n:"Andy Pages",p:"OF",a:24,o:64,pot:80,lvl:"AAA"},{n:"River Ryan",p:"SP",a:26,o:60,pot:78,lvl:"AAA"}]},
  SDP:{lu:[{n:"Fernando Tatis Jr.",p:"RF",a:27,o:88},{n:"Manny Machado",p:"3B",a:33,o:86},{n:"Luis Arraez",p:"DH",a:29,o:84},{n:"Xander Bogaerts",p:"SS",a:33,o:80},{n:"Ha-Seong Kim",p:"2B",a:30,o:78},{n:"Jake Cronenworth",p:"1B",a:31,o:76},{n:"Kyle Higashioka",p:"C",a:34,o:68},{n:"Jose Azocar",p:"CF",a:29,o:66},{n:"David Peralta",p:"LF",a:37,o:66}],ro:[{n:"Dylan Cease",p:"SP",a:30,o:84},{n:"Michael King",p:"SP",a:29,o:82},{n:"Yu Darvish",p:"SP",a:39,o:76},{n:"Matt Waldron",p:"SP",a:27,o:72},{n:"Randy Vasquez",p:"SP",a:25,o:68}],bp:[{n:"Robert Suarez",p:"CL",a:32,o:84},{n:"Yuki Matsui",p:"SU",a:33,o:74},{n:"Steven Wilson",p:"SU",a:29,o:68},{n:"Nick Martinez",p:"MR",a:35,o:70},{n:"Tom Cosgrove",p:"MR",a:29,o:66},{n:"Ray Kerr",p:"MR",a:30,o:64}],bench:[{n:"Trent Grisham",p:"CF",a:29,o:70},{n:"Matthew Batten",p:"UT",a:29,o:58},{n:"Webster Rivas",p:"C",a:30,o:58},{n:"Rougned Odor",p:"UT",a:31,o:58}],farm:[{n:"Jackson Merrill",p:"OF",a:22,o:70,pot:88,lvl:"AAA"},{n:"Ethan Salas",p:"C",a:19,o:50,pot:90,lvl:"A"},{n:"Robby Snelling",p:"SP",a:20,o:52,pot:86,lvl:"A"},{n:"Samuel Zavala",p:"OF",a:20,o:52,pot:84,lvl:"A"},{n:"Victor Lizarraga",p:"SP",a:22,o:56,pot:80,lvl:"AA"}]},
  SFG:{lu:[{n:"Rafael Devers",p:"DH",a:29,o:88},{n:"Matt Chapman",p:"3B",a:32,o:80},{n:"Willy Adames",p:"SS",a:29,o:80},{n:"Jung Hoo Lee",p:"RF",a:27,o:78},{n:"Patrick Bailey",p:"C",a:26,o:74},{n:"Heliot Ramos",p:"LF",a:25,o:74},{n:"LaMonte Wade Jr.",p:"1B",a:31,o:70},{n:"Thairo Estrada",p:"2B",a:30,o:70},{n:"Luis Matos",p:"CF",a:23,o:68}],ro:[{n:"Logan Webb",p:"SP",a:28,o:82},{n:"Robbie Ray",p:"SP",a:34,o:76},{n:"Kyle Harrison",p:"SP",a:24,o:74},{n:"Mason Black",p:"SP",a:24,o:70},{n:"Hayden Birdsong",p:"SP",a:24,o:70}],bp:[{n:"Camilo Doval",p:"CL",a:27,o:82},{n:"Ryan Walker",p:"SU",a:29,o:72},{n:"Tyler Rogers",p:"SU",a:34,o:70},{n:"Randy Rodriguez",p:"MR",a:26,o:66},{n:"Tristan Beck",p:"MR",a:28,o:64},{n:"Sean Hjelle",p:"MR",a:27,o:64}],bench:[{n:"Wilmer Flores",p:"1B",a:32,o:68},{n:"Joc Pederson",p:"LF",a:34,o:68},{n:"Mike Yastrzemski",p:"RF",a:34,o:66},{n:"Curt Casali",p:"C",a:36,o:58}],farm:[{n:"Marco Luciano",p:"SS",a:23,o:60,pot:86,lvl:"AAA"},{n:"Kyle Harrison",p:"SP",a:24,o:66,pot:82,lvl:"AAA"},{n:"Grant McCray",p:"OF",a:24,o:54,pot:80,lvl:"AA"},{n:"Vaun Brown",p:"OF",a:26,o:60,pot:78,lvl:"AAA"},{n:"Tyler Fitzgerald",p:"SS",a:27,o:62,pot:76,lvl:"AAA"}]},
  COL:{lu:[{n:"Ezequiel Tovar",p:"SS",a:24,o:74},{n:"Ryan McMahon",p:"3B",a:29,o:74},{n:"Brenton Doyle",p:"CF",a:27,o:72},{n:"Nolan Jones",p:"RF",a:26,o:70},{n:"Zac Veen",p:"LF",a:23,o:66},{n:"Michael Toglia",p:"1B",a:26,o:66},{n:"Elehuris Montero",p:"DH",a:26,o:66},{n:"Hunter Goodman",p:"C",a:26,o:66},{n:"Alan Trejo",p:"2B",a:28,o:64}],ro:[{n:"Kyle Freeland",p:"SP",a:33,o:70},{n:"Cal Quantrill",p:"SP",a:30,o:70},{n:"Austin Gomber",p:"SP",a:30,o:68},{n:"Antonio Senzatela",p:"SP",a:30,o:66},{n:"Ryan Feltner",p:"SP",a:28,o:66}],bp:[{n:"Daniel Bard",p:"CL",a:39,o:70},{n:"Yency Almonte",p:"SU",a:31,o:66},{n:"Justin Lawrence",p:"SU",a:30,o:66},{n:"Jake Bird",p:"MR",a:29,o:64},{n:"Tyler Kinley",p:"MR",a:34,o:62},{n:"Ashton Goudeau",p:"MR",a:32,o:62}],bench:[{n:"Charlie Blackmon",p:"DH",a:39,o:64},{n:"Elias Diaz",p:"C",a:33,o:62},{n:"Sam Hilliard",p:"LF",a:31,o:60},{n:"Connor Joe",p:"RF",a:32,o:58}],farm:[{n:"Zac Veen",p:"OF",a:23,o:60,pot:86,lvl:"AAA"},{n:"Adael Amador",p:"SS",a:22,o:56,pot:82,lvl:"AA"},{n:"Drew Romo",p:"C",a:23,o:56,pot:80,lvl:"AA"},{n:"Gabriel Hughes",p:"SP",a:23,o:56,pot:80,lvl:"AA"},{n:"Sterlin Thompson",p:"OF",a:25,o:58,pot:76,lvl:"AAA"}]},
  ARI:{lu:[{n:"Corbin Carroll",p:"CF",a:24,o:84},{n:"Ketel Marte",p:"2B",a:32,o:86},{n:"Christian Walker",p:"1B",a:33,o:80},{n:"Manny Machado",p:"3B",a:33,o:86},{n:"Gabriel Moreno",p:"C",a:25,o:78},{n:"Fernando Tatis Jr.",p:"RF",a:27,o:88},{n:"Lourdes Gurriel Jr.",p:"LF",a:31,o:74},{n:"Eugenio Suarez",p:"DH",a:34,o:74},{n:"Geraldo Perdomo",p:"SS",a:25,o:72}],ro:[{n:"Zac Gallen",p:"SP",a:30,o:82},{n:"Brandon Pfaadt",p:"SP",a:26,o:74},{n:"Ryne Nelson",p:"SP",a:28,o:74},{n:"Eduardo Rodriguez",p:"SP",a:32,o:74},{n:"Merrill Kelly",p:"SP",a:36,o:72}],bp:[{n:"Paul Sewald",p:"CL",a:34,o:78},{n:"Kevin Ginkel",p:"SU",a:31,o:74},{n:"Miguel Castro",p:"SU",a:30,o:70},{n:"Kyle Nelson",p:"MR",a:29,o:68},{n:"Scott McGough",p:"MR",a:36,o:66},{n:"Noe Ramirez",p:"MR",a:34,o:62}],bench:[{n:"Alek Thomas",p:"CF",a:25,o:68},{n:"Pavin Smith",p:"1B",a:29,o:66},{n:"Jose Herrera",p:"C",a:28,o:62},{n:"Blaze Alexander",p:"UT",a:27,o:58}],farm:[{n:"Druw Jones",p:"OF",a:21,o:56,pot:90,lvl:"A"},{n:"Jordan Lawlar",p:"SS",a:22,o:60,pot:88,lvl:"AA"},{n:"Deyvison De Los Santos",p:"3B",a:21,o:54,pot:84,lvl:"A"},{n:"Slade Cecconi",p:"SP",a:25,o:62,pot:76,lvl:"AAA"},{n:"Brandon Pfaadt",p:"SP",a:26,o:66,pot:80,lvl:"AAA"}]},
};

const TEAMS=[
  {a:"NYY",n:"Yankees",c:"New York",d:"AL East",p:220},{a:"BOS",n:"Red Sox",c:"Boston",d:"AL East",p:185},
  {a:"TBR",n:"Rays",c:"Tampa Bay",d:"AL East",p:95},{a:"TOR",n:"Blue Jays",c:"Toronto",d:"AL East",p:155},
  {a:"BAL",n:"Orioles",c:"Baltimore",d:"AL East",p:130},{a:"HOU",n:"Astros",c:"Houston",d:"AL West",p:180},
  {a:"LAA",n:"Angels",c:"Los Angeles",d:"AL West",p:120},{a:"OAK",n:"Athletics",c:"Oakland",d:"AL West",p:80},
  {a:"SEA",n:"Mariners",c:"Seattle",d:"AL West",p:135},{a:"TEX",n:"Rangers",c:"Texas",d:"AL West",p:160},
  {a:"CLE",n:"Guardians",c:"Cleveland",d:"AL Central",p:95},{a:"CHW",n:"White Sox",c:"Chicago",d:"AL Central",p:70},
  {a:"DET",n:"Tigers",c:"Detroit",d:"AL Central",p:150},{a:"KCR",n:"Royals",c:"Kansas City",d:"AL Central",p:105},
  {a:"MIN",n:"Twins",c:"Minnesota",d:"AL Central",p:115},{a:"ATL",n:"Braves",c:"Atlanta",d:"NL East",p:195},
  {a:"NYM",n:"Mets",c:"New York",d:"NL East",p:210},{a:"PHI",n:"Phillies",c:"Philadelphia",d:"NL East",p:195},
  {a:"MIA",n:"Marlins",c:"Miami",d:"NL East",p:65},{a:"WSN",n:"Nationals",c:"Washington",d:"NL East",p:85},
  {a:"CHC",n:"Cubs",c:"Chicago",d:"NL Central",p:155},{a:"MIL",n:"Brewers",c:"Milwaukee",d:"NL Central",p:105},
  {a:"STL",n:"Cardinals",c:"St. Louis",d:"NL Central",p:145},{a:"PIT",n:"Pirates",c:"Pittsburgh",d:"NL Central",p:75},
  {a:"CIN",n:"Reds",c:"Cincinnati",d:"NL Central",p:95},{a:"LAD",n:"Dodgers",c:"Los Angeles",d:"NL West",p:265},
  {a:"SDP",n:"Padres",c:"San Diego",d:"NL West",p:180},{a:"SFG",n:"Giants",c:"San Francisco",d:"NL West",p:150},
  {a:"COL",n:"Rockies",c:"Colorado",d:"NL West",p:80},{a:"ARI",n:"D-backs",c:"Arizona",d:"NL West",p:120},
];

const FN=["Luis","Carlos","Miguel","Jose","Juan","Alex","David","Jorge","Angel","Diego","Marco","Roberto","Ty","Bo","Jake","Chase","Cole","Blake","Reid","Drew","Mason","Noah","Liam","Ethan"];
const LN=["Rivera","Santos","Garcia","Lopez","Martinez","Torres","Reyes","Flores","Castro","Mendez","Ramirez","Perez","Morales","Chavez","Ortega","Jimenez","Alvarez","Romero","Vega","Cruz"];
function rnd(a,b){return Math.floor(Math.random()*(b-a+1))+a;}
function pick(arr){return arr[Math.floor(Math.random()*arr.length)];}
function uid(){return Math.random().toString(36).slice(2,8);}
function gn(){return pick(FN)+" "+pick(LN);}
function oc(o){return o>=85?"#4fc76a":o>=75?"#4a9de8":o>=65?"#c9a84c":"#888";}
function ord(n){return n===1?"st":n===2?"nd":n===3?"rd":"th";}

function initStandings(myAbbr){
  const divs=["AL East","AL West","AL Central","NL East","NL West","NL Central"];
  const divMap={NYY:"AL East",BOS:"AL East",TBR:"AL East",TOR:"AL East",BAL:"AL East",HOU:"AL West",LAA:"AL West",OAK:"AL West",SEA:"AL West",TEX:"AL West",CLE:"AL Central",CHW:"AL Central",DET:"AL Central",KCR:"AL Central",MIN:"AL Central",ATL:"NL East",NYM:"NL East",PHI:"NL East",MIA:"NL East",WSN:"NL East",CHC:"NL Central",MIL:"NL Central",STL:"NL Central",PIT:"NL Central",CIN:"NL Central",LAD:"NL West",SDP:"NL West",SFG:"NL West",COL:"NL West",ARI:"NL West"};
  const st={};divs.forEach(d=>{st[d]=[];});
  TEAMS.forEach(t=>{st[divMap[t.a]].push({a:t.a,n:t.n,w:0,l:0,isMe:t.a===myAbbr});});
  return st;
}
function buildSched(abbr){
  const opps=TEAMS.filter(t=>t.a!==abbr);const s=[];
  for(let w=1;w<=27;w++){const cnt=rnd(5,7);for(let g=0;g<cnt&&s.length<162;g++){const opp=opps[rnd(0,opps.length-1)];s.push({week:w,opp:opp.a,home:Math.random()>.5,result:null,mS:0,oS:0,played:false});}}
  return s.slice(0,162);
}
function genDraftBoard(){
  return Array.from({length:20},(_,i)=>({id:uid(),rank:i+1,name:gn(),pos:Math.random()>.45?pick(["SP","RP"]):pick(["C","1B","2B","3B","SS","LF","CF","RF"]),potential:rnd(62,99),age:rnd(18,22),drafted:false}));
}
function mkPlayer(p,isSP){
  const s={...p,id:uid(),salary:p.o>=85?rnd(18,36):p.o>=75?rnd(8,18):rnd(2,8),years:rnd(1,4)};
  if(isSP){return{...s,years:rnd(1,3),era:(rnd(p.o>=82?185:310,p.o>=82?320:510)/100).toFixed(2),fip:(rnd(p.o>=82?195:320,p.o>=82?330:510)/100).toFixed(2),k9:(rnd(p.o>=82?88:52,140)/10).toFixed(1),war:(rnd(p.o>=82?20:3,p.o>=82?78:22)/10).toFixed(1),fatigue:0,used:false};}
  return{...s,avg:(rnd(230,310)/1000).toFixed(3),hr:rnd(p.o>=85?18:4,p.o>=85?45:25),opsPlus:rnd(p.o>=85?118:78,p.o>=85?178:118),war:(rnd(p.o>=85?28:4,p.o>=85?88:28)/10).toFixed(1)};
}
function mkBP(p){return{...p,id:uid(),salary:rnd(1,14),years:rnd(1,3),fatigue:0,used:false,era:(rnd(p.o>=78?195:295,p.o>=78?330:480)/100).toFixed(2),saves:p.p==="CL"?rnd(5,40):0};}
function mkFarm(p){return{...p,id:uid(),progress:rnd(15,70),trainPts:0,focus:null,age:p.age||20};}
function makeFA(){return Array.from({length:8},()=>{const isSP=Math.random()>.5;const o=rnd(58,88);return{id:uid(),n:gn(),p:isSP?pick(["SP","RP"]):pick(["C","1B","2B","3B","SS","LF","CF","RF"]),o,age:rnd(24,36),salary:rnd(2,28),years:rnd(1,4)};})}
function makeOffers(lu,mt){const opps=TEAMS.filter(t=>t.a!==mt.a);return Array.from({length:3},()=>({id:uid(),myPlayer:lu[rnd(0,lu.length-1)],theirName:gn(),theirPos:pick(["C","1B","2B","3B","SS","LF","CF","RF"]),theirOvr:rnd(62,92),oppTeam:opps[rnd(0,opps.length-1)]}));}

const C={
  app:{background:"#0a1220",minHeight:"100vh",fontFamily:"-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif",color:"#d4c9a8",display:"flex",flexDirection:"column"},
  top:{background:"#060e1a",borderBottom:"1px solid #7a6030",padding:"0 14px",display:"flex",alignItems:"center",gap:10,height:44,flexShrink:0,position:"sticky",top:0,zIndex:10},
  logo:{fontSize:12,fontWeight:600,letterSpacing:"0.1em",color:"#c9a84c"},
  nav:{background:"#060e1a",display:"flex",borderBottom:"1px solid #1e3558",position:"sticky",top:44,zIndex:10,overflowX:"auto",padding:"0 6px"},
  nb:(on)=>({background:"none",border:"none",borderBottom:on?"2px solid #c9a84c":"2px solid transparent",color:on?"#c9a84c":"#4a5d7a",padding:"9px 10px",fontSize:11,cursor:"pointer",whiteSpace:"nowrap",letterSpacing:"0.04em",fontFamily:"inherit"}),
  pg:{flex:1,padding:12,maxWidth:980,width:"100%",margin:"0 auto"},
  tt:{fontSize:10,color:"#4a5d7a",letterSpacing:"0.08em",textTransform:"uppercase",margin:"10px 0 7px"},
  card:{background:"#111d30",border:"1px solid #1e3558",borderRadius:6},
  tbox:{background:"#111d30",border:"1px solid #1e3558",borderRadius:6,overflow:"hidden",marginBottom:10},
  th:{textAlign:"left",fontSize:10,fontWeight:500,color:"#4a5d7a",padding:"5px 7px",borderBottom:"1px solid #1e3558",whiteSpace:"nowrap"},
  td:{padding:"6px 7px",borderBottom:"1px solid #1e3558",fontSize:12,color:"#d4c9a8"},
  btn:(pri,sm)=>({background:pri?"#c9a84c":"#16263d",color:pri?"#060e1a":"#d4c9a8",border:pri?"none":"1px solid #1e3558",padding:sm?"4px 9px":"7px 13px",borderRadius:5,fontSize:sm?10:11,cursor:"pointer",fontFamily:"inherit",fontWeight:pri?500:400,margin:2}),
  btnGrn:{background:"#1a5c2a",color:"#9fe8b0",border:"none",padding:"4px 9px",borderRadius:4,fontSize:10,cursor:"pointer",fontFamily:"inherit",margin:2},
  pb:{display:"inline-block",fontSize:9,fontWeight:500,padding:"1px 4px",borderRadius:3,background:"#16263d",color:"#8ab4e8"},
};

const TRAIN_OPTS={
  hitter:[{k:"contact",l:"Contact"},{k:"power",l:"Power"},{k:"speed",l:"Speed"},{k:"overall",l:"Overall"}],
  pitcher:[{k:"velocity",l:"Velocity"},{k:"control",l:"Control"},{k:"stuff",l:"Stuff"},{k:"overall",l:"Overall"}],
};

export default function App(){
  const [myTeam,setMyTeam]=useState(null);
  const [started,setStarted]=useState(false);
  const [tab,setTab]=useState("roster");
  const [rosterTab,setRosterTab]=useState("lineup");
  const [gmTab,setGmTab]=useState("offers");
  const [season,setSeason]=useState(2026);
  const [wins,setWins]=useState(0);
  const [losses,setLosses]=useState(0);
  const [week,setWeek]=useState(1);
  // Roster: lineup=starting 9, rotation=5 SP, bullpen=6 BP, bench=everyone else on 40-man
  const [lineup,setLineup]=useState([]);       // 9 starters
  const [rotation,setRotation]=useState([]);   // 5 SP
  const [bullpen,setBullpen]=useState([]);      // 6 BP
  const [bench,setBench]=useState([]);          // bench + extra pitchers
  const [farm,setFarm]=useState([]);
  const [draftBoard,setDraftBoard]=useState([]);
  const [schedule,setSchedule]=useState([]);
  const [standings,setStandings]=useState({});
  const [history,setHistory]=useState([]);
  const [champion,setChampion]=useState(null);
  const [playoffs,setPlayoffs]=useState(null);
  const [tradeOffers,setTradeOffers]=useState([]);
  const [faList,setFaList]=useState([]);
  const [pbp,setPbp]=useState([]);
  const [game,setGame]=useState(null);
  const [notif,setNotif]=useState("");
  const [trainPts,setTrainPts]=useState(100);

  const wR=useRef(0),lR=useRef(0),stR=useRef({});
  const nextSPIdx=useRef(0); // tracks rotation turn across games
  const trainPtsRef=useRef(100);
  function toast(msg){setNotif(msg);setTimeout(()=>setNotif(""),2800);}

  function startFranchise(){
    if(!myTeam){alert("Pick a team first.");return;}
    const R=ROSTERS[myTeam.a];
    setLineup(R.lu.map(p=>mkPlayer(p,false)));
    setRotation(R.ro.map(p=>mkPlayer(p,true)));
    setBullpen(R.bp.map(p=>mkBP(p)));
    setBench(R.bench.map(p=>mkPlayer(p,false)));
    setFarm(R.farm.map(p=>mkFarm(p)));
    setDraftBoard(genDraftBoard());
    const sched=buildSched(myTeam.a);setSchedule(sched);
    const st=initStandings(myTeam.a);setStandings(st);stR.current=st;
    setWins(0);setLosses(0);wR.current=0;lR.current=0;
    setWeek(1);setTrainPts(100);trainPtsRef.current=100;nextSPIdx.current=0;setStarted(true);setTab("roster");
    setTradeOffers(makeOffers(R.lu.map(p=>mkPlayer(p,false)),myTeam));
    setFaList(makeFA());
    toast("Welcome to "+season+" — "+myTeam.c+" "+myTeam.n+"!");
  }

  // ── ROSTER MANAGEMENT ────────────────────────────────────────────────────
  // Each player card can be clicked to start a swap, then click another to complete it

  function movePlayer(fromGroup,fromId,toGroup){
    // Get current arrays directly from state refs
    const allGroups={lineup:[...lineup],rotation:[...rotation],bullpen:[...bullpen],bench:[...bench]};
    const src=allGroups[fromGroup];
    const idx=src.findIndex(p=>p.id===fromGroup+"_"+fromId||p.id===fromId);
    if(idx<0){toast("Player not found — try again.");return;}
    const player=src[idx];
    allGroups[fromGroup]=src.filter((_,i)=>i!==idx);
    if(toGroup!=="release") allGroups[toGroup]=[...allGroups[toGroup],player];
    setLineup([...allGroups.lineup]);
    setRotation([...allGroups.rotation]);
    setBullpen([...allGroups.bullpen]);
    setBench([...allGroups.bench]);
    toast(toGroup==="release"?`${player.n} released`:`${player.n} → ${toGroup}`);
  }

  function signFA(fa){
    const p=mkPlayer({n:fa.n,p:fa.p,o:fa.o,a:fa.age},fa.p==="SP"||fa.p==="RP");
    p.salary=fa.salary;p.years=fa.years;
    setBench(prev=>[...prev,p]);
    setFaList(prev=>prev.filter(f=>f.id!==fa.id));
    toast(`Signed ${fa.n} → Bench. Use Roster tab to promote them.`);
  }

  function acceptTrade(offer){
    const newP=mkPlayer({n:offer.theirName,p:offer.theirPos,o:offer.theirOvr,a:rnd(22,34)},false);
    const sentId=offer.myPlayer?.id;
    if(sentId){
      const inLu=lineup.find(p=>p.id===sentId);
      const inRo=rotation.find(p=>p.id===sentId);
      if(inLu){setLineup(prev=>prev.filter(p=>p.id!==sentId));setBench(prev=>[...prev,inLu]);}
      else if(inRo){setRotation(prev=>prev.filter(p=>p.id!==sentId));setBench(prev=>[...prev,inRo]);}
    }
    setBench(prev=>[...prev,newP]);
    setTradeOffers(prev=>prev.filter(o=>o.id!==offer.id));
    toast(`${offer.theirName} on bench — promote via Roster tab.`);
  }

  function callUp(id){
    const p=farm.find(x=>x.id===id);if(!p)return;
    const isSP=(p.pos||p.p)==="SP"||(p.pos||p.p)==="RP";
    const newP=mkPlayer({n:p.n,p:p.pos||p.p,o:p.currentOvr,a:p.age||22},isSP);
    newP.salary=rnd(1,3);newP.years=1;
    setBench(prev=>[...prev,newP]);
    setFarm(prev=>prev.filter(x=>x.id!==id));
    toast(`${p.n} called up → Bench. Promote via Roster tab.`);
  }

  function draftPick(id){
    const p=draftBoard.find(x=>x.id===id);if(!p)return;
    setDraftBoard(prev=>prev.map(x=>x.id===id?{...x,drafted:true}:x));
    setFarm(prev=>[...prev,{id:uid(),n:p.name,p:p.pos,pos:p.pos,lvl:"A",pot:p.potential,currentOvr:rnd(40,62),age:p.age,progress:rnd(10,30),trainPts:0,focus:null}]);
    toast(`Drafted ${p.name} → Farm system!`);
  }

  // ── TRAINING ─────────────────────────────────────────────────────────────
  // Use a ref so applyTraining always reads fresh value even inside closures
  const trainPtsRef = useRef(100);

  function applyTraining(id,focus,pts){
    if(trainPtsRef.current<pts){toast(`Only ${trainPtsRef.current} training pts left this week.`);return;}
    trainPtsRef.current = trainPtsRef.current - pts;
    setTrainPts(trainPtsRef.current);
    setFarm(prev=>prev.map(p=>{
      if(p.id!==id)return p;
      const progressGain=pts*6;
      const newProgress=Math.min(99,p.progress+progressGain);
      const ovrGain=pts>=5?rnd(1,2):Math.random()<0.6?1:0;
      const newOvr=Math.min(p.pot,p.currentOvr+ovrGain);
      let newLvl=p.lvl;
      if(newProgress>=95&&p.lvl==="A") newLvl="AA";
      else if(newProgress>=95&&p.lvl==="AA") newLvl="AAA";
      return{...p,progress:newProgress,currentOvr:newOvr,lvl:newLvl,focus,trainPts:(p.trainPts||0)+pts};
    }));
    toast(`${focus} training applied (${pts}pts) — ${trainPtsRef.current} pts left this week`);
  }

  // ── FARM AUTO-ADVANCE (pure — takes array, returns new array) ─────────────
  function advanceFarmArr(farmArr){
    return farmArr.map(p=>{
      // Guaranteed OVR gain every week — 1 point always, 2 points if progress>70
      const ovrGain = p.currentOvr < p.pot ? (p.progress>70?rnd(1,2):1) : 0;
      const newOvr = Math.min(p.pot, p.currentOvr + ovrGain);
      const base = p.lvl==="A"?rnd(3,7):p.lvl==="AA"?rnd(4,8):rnd(2,5);
      let newProg = p.progress + base;
      let newLvl = p.lvl;
      if(newProg>=100){
        newProg=10;
        if(p.lvl==="A") newLvl="AA";
        else if(p.lvl==="AA") newLvl="AAA";
      }
      return{...p,progress:newProg,currentOvr:newOvr,lvl:newLvl};
    });
  }

  // ── WEEK / SEASON SIM ─────────────────────────────────────────────────────
  function simWeek(){
    const wg=schedule.filter(g=>!g.played&&g.week===week);
    if(!wg.length){
      const nw=Math.min(27,week+1);
      setWeek(nw);
      if(nw>27) runPlayoffs();
      else toast(`Advanced to week ${nw}`);
      return;
    }
    const oppMap={};TEAMS.forEach(t=>{oppMap[t.a]=Math.round((t.p/265)*30+55);});
    const myOvr=Math.round(
      rotation.reduce((s,p)=>s+p.o,0)/Math.max(1,rotation.length)*0.55+
      lineup.reduce((s,p)=>s+p.o,0)/Math.max(1,lineup.length)*0.45
    );
    let addW=0,addL=0;
    const newSched=schedule.map(g=>{
      if(!g.played&&g.week===week){
        const win=Math.random()<(0.45+(myOvr-(oppMap[g.opp]||70))*0.012);
        const mS=rnd(0,9),oS=win?Math.max(0,mS-rnd(1,5)):mS+rnd(1,5);
        if(win)addW++;else addL++;
        return{...g,played:true,result:win?"W":"L",mS,oS};
      }
      return g;
    });
    const nW=wR.current+addW, nL=lR.current+addL;
    wR.current=nW; lR.current=nL;

    // Advance farm synchronously so it's always visible
    setFarm(prev=>advanceFarmArr(prev));

    // Replenish training pts
    trainPtsRef.current=100;
    setTrainPts(100);

    setWins(nW);setLosses(nL);setSchedule(newSched);

    const newSt={};
    setStandings(prev=>{
      Object.entries(prev).forEach(([div,teams])=>{
        newSt[div]=teams.map(t=>{
          if(t.isMe)return{...t,w:nW,l:nL};
          const gp=addW+addL;
          const tw=Array.from({length:gp},()=>rnd(0,1)).reduce((a,b)=>a+b,0);
          return{...t,w:t.w+tw,l:t.l+(gp-tw)};
        }).sort((a,b)=>b.w-a.w||(a.l-b.l));
      });
      stR.current=newSt;
      return newSt;
    });

    const nw=Math.min(27,week+1);setWeek(nw);
    if(nw>27) runPlayoffs();
    else toast(`Week ${week} done: ${addW}W-${addL}L — 100 training pts refreshed`);
  }

  function simSeason(){
    // Sim all remaining weeks, building standings incrementally without relying on stale state
    const oppMap={};TEAMS.forEach(t=>{oppMap[t.a]=Math.round((t.p/265)*30+55);});
    const myOvr=Math.round(
      rotation.reduce((s,p)=>s+p.o,0)/Math.max(1,rotation.length)*0.55+
      lineup.reduce((s,p)=>s+p.o,0)/Math.max(1,lineup.length)*0.45
    );
    let totalW=wR.current, totalL=lR.current;
    let currentWeek=week;

    // Process all remaining games at once
    const newSched=schedule.map(g=>{
      if(g.played)return g;
      const win=Math.random()<(0.45+(myOvr-(oppMap[g.opp]||70))*0.012);
      const mS=rnd(0,9),oS=win?Math.max(0,mS-rnd(1,5)):mS+rnd(1,5);
      if(win)totalW++;else totalL++;
      currentWeek=Math.max(currentWeek,g.week);
      return{...g,played:true,result:win?"W":"L",mS,oS};
    });

    wR.current=totalW; lR.current=totalL;
    const weeksRemaining=27-week+1;

    // Advance farm for all remaining weeks
    setFarm(prev=>{
      let f=prev;
      for(let i=0;i<weeksRemaining;i++) f=advanceFarmArr(f);
      return f;
    });

    trainPtsRef.current=100; setTrainPts(100);
    setWins(totalW); setLosses(totalL); setSchedule(newSched); setWeek(28);

    // Build final standings
    const finalSt={};
    setStandings(prev=>{
      const gamesPerTeam=(weeksRemaining*6);
      Object.entries(prev).forEach(([div,teams])=>{
        finalSt[div]=teams.map(t=>{
          if(t.isMe)return{...t,w:totalW,l:totalL};
          const tw=Math.round(gamesPerTeam*0.5+rnd(-gamesPerTeam*0.1,gamesPerTeam*0.1));
          return{...t,w:t.w+tw,l:t.l+(gamesPerTeam-tw)};
        }).sort((a,b)=>b.w-a.w||(a.l-b.l));
      });
      stR.current=finalSt;
      return finalSt;
    });

    // Run playoffs with a slight delay so state settles
    setTimeout(()=>runPlayoffs(),50);
  }

  function runPlayoffs(){
    // Build from current standings ref
    const st=stR.current;
    if(!st||!Object.keys(st).length){toast("No standings data yet.");return;}
    let qual=[];
    Object.values(st).forEach(div=>{
      const sorted=[...div].sort((a,b)=>b.w-a.w||(a.l-b.l));
      if(sorted[0])qual.push({...sorted[0],seed:"div"});
      if(sorted[1])qual.push({...sorted[1],seed:"wc"});
    });
    qual.sort((a,b)=>b.w-a.w||(a.l-b.l));
    qual=qual.slice(0,8);
    if(qual.length<2){toast("Not enough teams for playoffs.");return;}
    // Pad if fewer than 8
    while(qual.length<8) qual.push({...qual[0],a:"BYE",n:"BYE",w:0,l:162});

    function sim(a,b){
      if(a.a==="BYE")return{win:b,sc:"3-0"};
      if(b.a==="BYE")return{win:a,sc:"3-0"};
      const ap=a.w/(a.w+a.l+1),bp2=b.w/(b.w+b.l+1);
      const winA=Math.random()<ap/(ap+bp2);
      return winA?{win:a,sc:`${rnd(3,4)}-${rnd(0,2)}`}:{win:b,sc:`${rnd(3,4)}-${rnd(0,2)}`};
    }
    const ds=[sim(qual[0],qual[7]),sim(qual[3],qual[4]),sim(qual[1],qual[6]),sim(qual[2],qual[5])];
    const cs=[sim(ds[0].win,ds[1].win),sim(ds[2].win,ds[3].win)];
    const ws=sim(cs[0].win,cs[1].win);
    const champ=ws.win;
    setChampion(champ);
    setPlayoffs({qual,ds,cs,ws});
    setTab("playoff");
    toast(`🏆 ${champ.a} are your ${season} World Series Champions!`);
  }
  function loadGame(idx){
    const g=schedule[idx];if(!g||g.played){toast("Already played.");return;}
    const opp=TEAMS.find(t=>t.a===g.opp)||TEAMS[0];
    const oppOvr=Math.round((opp.p/265)*30+55);
    // Pick today's starter from rotation — advances each game
    const spIdx=nextSPIdx.current%Math.max(1,rotation.length);
    const todaySP=rotation[spIdx]||rotation[0];
    // Initialise per-batter stats for my lineup keyed by lineup position (stable)
    const batterStats={};
    lineup.forEach((p,i)=>{batterStats[i]={name:p.n,pos:p.p,id:p.id,ab:0,h:0,hr:0,rbi:0,bb:0,k:0};});
    const boxScore=Array.from({length:9},()=>({away:0,home:0}));
    setGame({myHome:g.home,homeA:g.home?myTeam.a:opp.a,awayA:g.home?opp.a:myTeam.a,
      hS:0,aS:0,inn:1,top:true,outs:0,bases:[false,false,false],
      pitchCount:0,sp:todaySP?{...todaySP}:null,oppOvr,sidx:idx,gameOver:false,
      batIdx:0,  // continuous counter — never reset between innings
      batterStats,boxScore,
      spStats:{name:todaySP?.n||"SP",ipOuts:0,h:0,er:0,bb:0,k:0,pc:0},
      oppSPStats:{name:opp.a+" SP",ipOuts:0,h:0,er:0,bb:0,k:0,pc:0}
    });
    setPbp([{msg:`Game ${idx+1}: ${g.home?"vs":"@"} ${opp.a} — ${todaySP?.n||"SP"} takes the mound.`,cls:""}]);
    setTab("game");
  }

  function stepAB(g,myOvr,bp){
    if(!g||g.gameOver)return null;
    const myBat=(g.myHome&&!g.top)||(!g.myHome&&g.top);
    const offOvr=myBat?myOvr:g.oppOvr;const defOvr=g.sp?g.sp.o:70;
    const fp=Math.max(0,(g.pitchCount-60)*0.003);
    const hrP=0.032+(offOvr/100)*0.018;
    const hitP=Math.max(0.08,0.27+(offOvr-defOvr)*0.003-fp);
    const wkP=0.085+fp;const kP=0.22-(offOvr-defOvr)*0.002+fp*0.4;
    const r=Math.random();const innStr=(g.top?"▲":"▽")+g.inn;const bTeam=g.top?g.awayA:g.homeA;
    const logs=[];let hS=g.hS,aS=g.aS,bases=[...g.bases],outs=g.outs;
    let pitchCount=g.pitchCount+rnd(3,7),sp=g.sp;
    // Only advance batting order when my team is at bat
    const batIdx=myBat?g.batIdx+1:g.batIdx;
    const batName=myBat&&lineup[batSlot]?lineup[batSlot].n:bTeam;
    let newBp=[...bp],runs=0;

    // Batting order: batIdx is a continuous game counter, slot = batIdx % lineupLength
    const lineupLen=Math.max(1,lineup.length);
    const batSlot=g.batIdx%lineupLen;  // which lineup spot is up
    const myBatter=myBat?lineup[batSlot]:null;
    const newBatterStats=g.batterStats?{...g.batterStats}:{};
    // Credit AB to the correct lineup slot
    if(myBat&&newBatterStats[batSlot]){
      newBatterStats[batSlot]={...newBatterStats[batSlot],ab:newBatterStats[batSlot].ab+1};
    }

    // Box score: copy current
    const newBox=g.boxScore?g.boxScore.map(x=>({...x})):Array.from({length:9},()=>({away:0,home:0}));
    const boxIdx=Math.min(g.inn-1,8);

    // Pitcher stats — track IP as integer thirds (1 out = 1 third)
    const pitchesThisAB=pitchCount-g.pitchCount; // actual pitches thrown this AB
    let newSpStats=g.spStats?{...g.spStats}:{name:sp?.n||"SP",ipOuts:0,h:0,er:0,bb:0,k:0,pc:0};
    let newOppStats=g.oppSPStats?{...g.oppSPStats}:{name:"OPP SP",ipOuts:0,h:0,er:0,bb:0,k:0,pc:0};
    // My pitcher throws when opp bats: if myHome, opp bats in top half; if away, opp bats in bottom
    const myPitching=(g.myHome&&g.top)||(!g.myHome&&!g.top);
    if(myPitching) newSpStats={...newSpStats,pc:newSpStats.pc+pitchesThisAB};
    else newOppStats={...newOppStats,pc:newOppStats.pc+pitchesThisAB};

    if(r<hrP){
      let ct=1;bases.forEach(b=>{if(b)ct++;});bases=[false,false,false];runs=ct;
      logs.push({msg:`${innStr} ${batName} — HOME RUN! ${ct} run${ct>1?"s":""} score.`,cls:"sc"});
      if(myBat&&newBatterStats[batSlot]){newBatterStats[batSlot]={...newBatterStats[batSlot],hr:newBatterStats[batSlot].hr+1,rbi:newBatterStats[batSlot].rbi+ct,h:newBatterStats[batSlot].h+1};}
      if(myPitching) newSpStats={...newSpStats,h:newSpStats.h+1,er:newSpStats.er+ct};
      else newOppStats={...newOppStats,h:newOppStats.h+1,er:newOppStats.er+ct};
    }else if(r<hrP+hitP){
      const ht=Math.random()<0.58?"Single":Math.random()<0.6?"Double":"Triple";
      if(ht==="Single"){if(bases[2])runs++;bases=[true,bases[0],bases[1]];}
      else if(ht==="Double"){if(bases[2])runs++;if(bases[1])runs++;bases=[false,true,bases[0]];}
      else{bases.forEach(b=>{if(b)runs++;});bases=[false,false,true];}
      logs.push({msg:`${innStr} ${batName} — ${ht}.${runs?` ${runs} run${runs>1?"s":""} score.`:""}`,cls:runs?"sc":"h"});
      if(myBat&&newBatterStats[batSlot]){newBatterStats[batSlot]={...newBatterStats[batSlot],h:newBatterStats[batSlot].h+1,rbi:newBatterStats[batSlot].rbi+(runs>0?runs:0)};}
      if(myPitching) newSpStats={...newSpStats,h:newSpStats.h+1,er:newSpStats.er+runs};
      else newOppStats={...newOppStats,h:newOppStats.h+1,er:newOppStats.er+runs};
    }else if(r<hrP+hitP+wkP){
      if(bases[0]&&bases[1]&&bases[2]){
        runs=1;logs.push({msg:`${innStr} ${batName} — Walk, RBI.`,cls:"h"});
        if(myBat&&newBatterStats[batSlot]){newBatterStats[batSlot]={...newBatterStats[batSlot],bb:newBatterStats[batSlot].bb+1,rbi:newBatterStats[batSlot].rbi+1,ab:newBatterStats[batSlot].ab-1};}
        if(myPitching) newSpStats={...newSpStats,bb:newSpStats.bb+1,er:newSpStats.er+1};
        else newOppStats={...newOppStats,bb:newOppStats.bb+1,er:newOppStats.er+1};
      }else{
        bases=[true,...bases.slice(0,2)];logs.push({msg:`${innStr} ${batName} — Walk.`,cls:""});
        if(myBat&&newBatterStats[batSlot]){newBatterStats[batSlot]={...newBatterStats[batSlot],bb:newBatterStats[batSlot].bb+1,ab:newBatterStats[batSlot].ab-1};}
        if(myPitching) newSpStats={...newSpStats,bb:newSpStats.bb+1};
        else newOppStats={...newOppStats,bb:newOppStats.bb+1};
      }
    }else if(r<hrP+hitP+wkP+kP){
      outs++;logs.push({msg:`${innStr} ${batName} — Strikeout.`,cls:"o"});
      if(myBat&&newBatterStats[batSlot]){newBatterStats[batSlot]={...newBatterStats[batSlot],k:newBatterStats[batSlot].k+1};}
      if(myPitching) newSpStats={...newSpStats,k:newSpStats.k+1};
      else newOppStats={...newOppStats,k:newOppStats.k+1};
    }else{
      outs++;logs.push({msg:`${innStr} ${batName} — ${Math.random()<.5?"Groundout":"Flyout"}.`,cls:"o"});
    }
    if(g.top)aS+=runs;else hS+=runs;
    // Update box score
    if(g.top)newBox[boxIdx].away+=runs;else newBox[boxIdx].home+=runs;

    if(pitchCount>85&&Math.random()>0.65&&!myBat){
      const avail=newBp.filter(b=>!b.used&&b.fatigue<70);
      if(avail.length){
        const ri=newBp.findIndex(b=>b.id===avail[0].id);
        newBp[ri]={...newBp[ri],used:true,fatigue:newBp[ri].fatigue+30};
        sp=newBp[ri];pitchCount=0;
        logs.push({msg:`⇄ ${sp.name||sp.n} enters.`,cls:"e"});
      }
    }
    let inn=g.inn,top=g.top,gameOver=false;
    if(outs>=3){
      outs=0;bases=[false,false,false];
      // Record 3 outs worth of IP for the current pitcher
      if(myPitching) newSpStats={...newSpStats,ipOuts:newSpStats.ipOuts+3};
      else newOppStats={...newOppStats,ipOuts:newOppStats.ipOuts+3};
      if(top)top=false;else{inn++;top=true;pitchCount=0;}
      if((inn>9&&hS!==aS)||inn>12)gameOver=true;
    } else {
      // Partial inning — track outs for IP display
      const outsAdded=(outs>g.outs?outs-g.outs:0);
      if(outsAdded>0){
        if(myPitching) newSpStats={...newSpStats,ipOuts:newSpStats.ipOuts+outsAdded};
        else newOppStats={...newOppStats,ipOuts:newOppStats.ipOuts+outsAdded};
      }
    }
    return{
      newGame:{...g,hS,aS,bases,outs,inn,top,pitchCount,batIdx,sp,gameOver,
        batterStats:newBatterStats,boxScore:newBox,spStats:newSpStats,oppSPStats:newOppStats},
      logs,newBp,gameOver
    };
  }

  function commitGameEnd(g,allLogs,finalBp){
    const myWin=(g.myHome&&g.hS>g.aS)||(!g.myHome&&g.aS>g.hS);
    const mS=g.myHome?g.hS:g.aS,oS=g.myHome?g.aS:g.hS;
    const nW=wR.current+(myWin?1:0),nL=lR.current+(myWin?0:1);
    wR.current=nW;lR.current=nL;
    setPbp([{msg:`FINAL: ${g.homeA} ${g.hS} — ${g.awayA} ${g.aS}. ${myWin?"WIN! 🎉":"Loss."}`,cls:myWin?"sc":"o"},...allLogs].slice(0,80));
    setGame({...g,gameOver:true});setBullpen(finalBp);setWins(nW);setLosses(nL);
    // Advance rotation to next starter
    nextSPIdx.current=(nextSPIdx.current+1)%Math.max(1,rotation.length);
    setSchedule(prev=>prev.map((s,i)=>i===g.sidx?{...s,played:true,result:myWin?"W":"L",mS,oS}:s));
    setStandings(prev=>{const next={};Object.entries(prev).forEach(([div,teams])=>{next[div]=teams.map(t=>{if(t.isMe)return{...t,w:nW,l:nL};const w=rnd(0,1);return{...t,w:t.w+w,l:t.l+(1-w)};}).sort((a,b)=>b.w-a.w||(a.l-b.l));});stR.current=next;return next;});
    toast(myWin?"Victory!":"Tough loss.");
  }

  function simOnePitch(){if(!game||game.gameOver)return;const myOvr=Math.round(lineup.reduce((s,p)=>s+p.o,0)/Math.max(1,lineup.length));const res=stepAB(game,myOvr,bullpen);if(!res)return;if(res.gameOver)commitGameEnd(res.newGame,res.logs,res.newBp);else{setGame(res.newGame);setBullpen(res.newBp);setPbp(prev=>[...res.logs,...prev].slice(0,80));}}
  function simHalf(){if(!game||game.gameOver)return;const myOvr=Math.round(lineup.reduce((s,p)=>s+p.o,0)/Math.max(1,lineup.length));let g=game,bp=[...bullpen],allLogs=[];const st=g.top;for(let i=0;i<60&&!g.gameOver&&g.top===st;i++){const res=stepAB(g,myOvr,bp);if(!res)break;allLogs=[...res.logs,...allLogs];g=res.newGame;bp=res.newBp;if(res.gameOver){commitGameEnd(g,allLogs,bp);return;}}setGame(g);setBullpen(bp);setPbp(prev=>[...allLogs,...prev].slice(0,80));}
  function simFull(){if(!game||game.gameOver)return;const myOvr=Math.round(lineup.reduce((s,p)=>s+p.o,0)/Math.max(1,lineup.length));let g=game,bp=[...bullpen],allLogs=[];for(let i=0;i<400&&!g.gameOver;i++){const res=stepAB(g,myOvr,bp);if(!res)break;allLogs=[...res.logs,...allLogs];g=res.newGame;bp=res.newBp;if(res.gameOver){commitGameEnd(g,allLogs,bp);return;}}setGame(g);setBullpen(bp);setPbp(prev=>[...allLogs,...prev].slice(0,80));}
  function nextGame(){const idx=schedule.findIndex(g=>!g.played);if(idx<0){toast("Season over!");return;}loadGame(idx);}
  function bullpenChange(){const avail=bullpen.filter(b=>!b.used&&b.fatigue<80);if(!avail.length){toast("No fresh arms.");return;}const newBp=bullpen.map(b=>b.id===avail[0].id?{...b,used:true,fatigue:b.fatigue+35}:b);setBullpen(newBp);setGame(g=>({...g,sp:newBp.find(b=>b.id===avail[0].id),pitchCount:0}));setPbp(prev=>[{msg:`⇄ ${avail[0].name||avail[0].n} enters.`,cls:"e"},...prev].slice(0,80));toast(`${avail[0].name||avail[0].n} pitching.`);}

  function nextSeason(){
    setHistory(prev=>[...prev,{season,w:wins,l:losses,result:champion?`Champs: ${champion.a}`:wins>=90?"Playoff contender":"Below .500"}]);
    setSeason(s=>s+1);setWins(0);setLosses(0);wR.current=0;lR.current=0;setWeek(1);setChampion(null);setPlayoffs(null);
    setLineup(prev=>prev.map(p=>({...p,a:(p.a||25)+1,years:Math.max(0,(p.years||1)-1),o:p.a>32?Math.max(40,p.o-rnd(0,3)):p.a<=27?Math.min(99,p.o+rnd(0,2)):p.o})));
    setRotation(prev=>prev.map(p=>({...p,a:(p.a||26)+1,years:Math.max(0,(p.years||1)-1),o:p.a>33?Math.max(40,p.o-rnd(0,3)):p.a<=27?Math.min(99,p.o+rnd(0,2)):p.o})));
    setBench(prev=>prev.map(p=>({...p,a:(p.a||25)+1,years:Math.max(0,(p.years||1)-1)})));
    setFarm(prev=>prev.map(p=>{
      const np={...p,age:(p.age||20)+1,progress:Math.min(99,p.progress+rnd(15,30)),currentOvr:Math.min(p.pot,p.currentOvr+rnd(4,10))};
      if(np.lvl==="A"&&np.progress>75)np.lvl="AA";
      else if(np.lvl==="AA"&&np.progress>85)np.lvl="AAA";
      return np;
    }));
    const st=initStandings(myTeam.a);setStandings(st);stR.current=st;
    setSchedule(buildSched(myTeam.a));setDraftBoard(genDraftBoard());
    setTradeOffers(makeOffers(lineup,myTeam));setFaList(makeFA());
    trainPtsRef.current=100;setTrainPts(100);
    setTab("roster");toast(`Welcome to the ${season+1} season!`);
  }

  // ── HELPERS ───────────────────────────────────────────────────────────────
  const OVR=({o})=><span style={{color:oc(o),fontWeight:500}}>{o}</span>;
  const PB=({children})=><span style={C.pb}>{children}</span>;
  const pay=[...lineup,...rotation,...bullpen,...bench].reduce((s,p)=>s+(p.salary||0),0);
  const wrc=lineup.length?Math.round(lineup.reduce((s,p)=>s+(p.opsPlus||100),0)/lineup.length):100;
  const fip=rotation.length?(rotation.reduce((s,p)=>s+parseFloat(p.fip||4.0),0)/rotation.length).toFixed(2):"—";
  const war=[...lineup,...rotation].reduce((s,p)=>s+parseFloat(p.war||0),0).toFixed(1);
  const tot=wins+losses;const pct=tot>0?(wins/tot).toFixed(3):"—";

  // ── TEAM SELECT ───────────────────────────────────────────────────────────
  if(!started){return(
    <div style={C.app}>
      {notif&&<div style={{position:"fixed",bottom:16,right:16,background:"#c9a84c",color:"#060e1a",padding:"8px 14px",borderRadius:5,fontSize:11,fontWeight:500,zIndex:999}}>{notif}</div>}
      <div style={C.top}><span style={C.logo}>⚾ FRANCHISE GM 2026</span></div>
      <div style={{...C.pg,paddingTop:16}}>
        <div style={C.tt}>Choose your franchise — 2026 season</div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(5,1fr)",gap:7,marginTop:8}}>
          {TEAMS.map(t=>(
            <div key={t.a} onClick={()=>setMyTeam(t)} style={{...C.card,padding:"9px 7px",cursor:"pointer",textAlign:"center",border:myTeam?.a===t.a?"2px solid #c9a84c":"1px solid #1e3558",background:myTeam?.a===t.a?"#1a1500":"#111d30"}}>
              <div style={{fontSize:15,fontWeight:600,color:"#d4c9a8"}}>{t.a}</div>
              <div style={{fontSize:9,color:"#4a5d7a",marginTop:2,lineHeight:1.3}}>{t.c} {t.n}</div>
              <div style={{fontSize:8,color:"#4a5d7a",opacity:.5}}>{t.d}</div>
            </div>
          ))}
        </div>
        <button style={{...C.btn(true),marginTop:14,padding:"10px 24px"}} onClick={startFranchise}>Start Franchise →</button>
      </div>
    </div>
  );}

  const TABS=[["roster","Roster"],["sched","Schedule"],["game","Live Game"],["gm","GM Office"],["draft","Draft"],["farm","Farm & Training"],["stand","Standings"],["playoff","Playoffs"],["hist","History"]];

  return(
    <div style={C.app}>
      {notif&&<div style={{position:"fixed",bottom:16,right:16,background:"#c9a84c",color:"#060e1a",padding:"8px 14px",borderRadius:5,fontSize:11,fontWeight:500,zIndex:999}}>{notif}</div>}
      <div style={C.top}>
        <span style={C.logo}>⚾ FRANCHISE GM</span>
        <span style={{fontSize:12,color:"#8a9bbf"}}>{myTeam.c} {myTeam.n}</span>
        <span style={{fontSize:12,fontWeight:600,color:"#c9a84c",marginLeft:6}}>{wins}-{losses}</span>
        <span style={{fontSize:11,color:"#4a5d7a",marginLeft:"auto"}}>{season} • Wk {week}</span>
        <span style={{fontSize:11,color:pay>189?"#e05050":"#6dbf7e"}}>${pay}M</span>
      </div>
      <div style={C.nav}>{TABS.map(([id,label])=><button key={id} style={C.nb(tab===id)} onClick={()=>setTab(id)}>{label}</button>)}</div>
      <div style={C.pg}>

        {/* ── ROSTER ── */}
        {tab==="roster"&&<div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(5,1fr)",gap:8,marginBottom:12}}>
            {[["TEAM WAR",war,"Lg avg 38.1"],["wRC+",wrc,"Offense"],["FIP",fip,"Rotation"],[`RECORD`,`${wins}-${losses}`,pct],["PAYROLL",`$${pay}M`,pay>189?"Luxury tax":"Under cap"]].map(([l,v,s])=>(
              <div key={l} style={{background:"#111d30",borderRadius:6,padding:"10px 11px"}}><div style={{fontSize:10,color:"#4a5d7a",marginBottom:3}}>{l}</div><div style={{fontSize:18,fontWeight:500,color:"#d4c9a8"}}>{v}</div><div style={{fontSize:10,color:"#4a5d7a",marginTop:2}}>{s}</div></div>
            ))}
          </div>
          <div style={{fontSize:10,color:"#4a5d7a",marginBottom:10,background:"#111d30",padding:"8px 10px",borderRadius:5,border:"1px solid #1e3558"}}>
            Use the coloured buttons to move players: <span style={{color:"#4fc76a"}}>→ LU</span> promotes to lineup &nbsp;|&nbsp; <span style={{color:"#4a9de8"}}>→ SP / → BP</span> promotes to pitching staff &nbsp;|&nbsp; <span style={{color:"#c9a84c"}}>→ BN</span> demotes to bench &nbsp;|&nbsp; <span style={{color:"#e05050"}}>✕ DFA</span> releases
          </div>
          <div style={{display:"flex",gap:2,marginBottom:10,borderBottom:"1px solid #1e3558"}}>
            {[["lineup",`Starting Lineup (${lineup.length}/9)`],["rotation",`Rotation (${rotation.length}/5)`],["bullpen",`Bullpen (${bullpen.length})`],["bench",`Bench (${bench.length})`]].map(([id,label])=>(
              <button key={id} style={{background:"none",border:"none",borderBottom:rosterTab===id?"2px solid #c9a84c":"2px solid transparent",color:rosterTab===id?"#c9a84c":"#4a5d7a",padding:"6px 10px",fontSize:11,cursor:"pointer",fontFamily:"inherit",whiteSpace:"nowrap"}} onClick={()=>setRosterTab(id)}>{label}</button>
            ))}
          </div>

          {rosterTab==="lineup"&&<div style={C.tbox}><table style={{width:"100%",borderCollapse:"collapse"}}>
            <thead><tr><th style={C.th}>Pos</th><th style={C.th}>Player</th><th style={C.th}>OVR</th><th style={C.th}>Age</th><th style={C.th}>AVG</th><th style={C.th}>HR</th><th style={C.th}>OPS+</th><th style={C.th}>Contract</th><th style={C.th}>Move</th></tr></thead>
            <tbody>{lineup.map(p=>(
              <tr key={p.id}>
                <td style={C.td}><span style={C.pb}>{p.p}</span></td>
                <td style={{...C.td,fontWeight:500}}>{p.n}</td>
                <td style={C.td}><OVR o={p.o}/></td>
                <td style={C.td}>{p.a}</td>
                <td style={C.td}>{p.avg||"—"}</td>
                <td style={C.td}>{p.hr||"—"}</td>
                <td style={C.td}>{p.opsPlus||"—"}</td>
                <td style={{...C.td,fontSize:10,color:"#4a5d7a"}}>${p.salary||1}M/{p.years||1}yr</td>
                <td style={C.td}><button style={{background:"#3a2a10",color:"#c8a060",border:"none",padding:"3px 7px",borderRadius:3,fontSize:9,cursor:"pointer"}} onClick={()=>movePlayer("lineup",p.id,"bench")}>→ BN</button></td>
              </tr>
            ))}
            {lineup.length===0&&<tr><td colSpan={9} style={{...C.td,color:"#4a5d7a",textAlign:"center",padding:16}}>Lineup empty — promote players from Bench tab</td></tr>}
            </tbody>
          </table></div>}

          {rosterTab==="rotation"&&<div style={C.tbox}><table style={{width:"100%",borderCollapse:"collapse"}}>
            <thead><tr><th style={C.th}>Slot</th><th style={C.th}>Pitcher</th><th style={C.th}>OVR</th><th style={C.th}>Age</th><th style={C.th}>ERA</th><th style={C.th}>FIP</th><th style={C.th}>K/9</th><th style={C.th}>Contract</th><th style={C.th}>Move</th></tr></thead>
            <tbody>{rotation.map((p,i)=>(
              <tr key={p.id}>
                <td style={C.td}><span style={C.pb}>SP{i+1}</span></td>
                <td style={{...C.td,fontWeight:500}}>{p.n}</td>
                <td style={C.td}><OVR o={p.o}/></td>
                <td style={C.td}>{p.a}</td>
                <td style={C.td}>{p.era||"—"}</td>
                <td style={C.td}>{p.fip||"—"}</td>
                <td style={C.td}>{p.k9||"—"}</td>
                <td style={{...C.td,fontSize:10,color:"#4a5d7a"}}>${p.salary||1}M/{p.years||1}yr</td>
                <td style={C.td}><button style={{background:"#3a2a10",color:"#c8a060",border:"none",padding:"3px 7px",borderRadius:3,fontSize:9,cursor:"pointer"}} onClick={()=>movePlayer("rotation",p.id,"bench")}>→ BN</button></td>
              </tr>
            ))}
            {rotation.length===0&&<tr><td colSpan={9} style={{...C.td,color:"#4a5d7a",textAlign:"center",padding:16}}>Rotation empty — promote SP from Bench tab</td></tr>}
            </tbody>
          </table></div>}

          {rosterTab==="bullpen"&&<div style={C.tbox}><table style={{width:"100%",borderCollapse:"collapse"}}>
            <thead><tr><th style={C.th}>Role</th><th style={C.th}>Pitcher</th><th style={C.th}>OVR</th><th style={C.th}>Age</th><th style={C.th}>ERA</th><th style={C.th}>Saves</th><th style={C.th}>Fatigue</th><th style={C.th}>Contract</th><th style={C.th}>Move</th></tr></thead>
            <tbody>{bullpen.map(p=>(
              <tr key={p.id}>
                <td style={C.td}><span style={C.pb}>{p.p}</span></td>
                <td style={{...C.td,fontWeight:500}}>{p.n}</td>
                <td style={C.td}><OVR o={p.o}/></td>
                <td style={C.td}>{p.age||p.a||"—"}</td>
                <td style={C.td}>{p.era||"—"}</td>
                <td style={C.td}>{p.saves||0}</td>
                <td style={C.td}><div style={{height:4,background:"#1e3558",borderRadius:2,width:50}}><div style={{height:4,width:`${p.fatigue||0}%`,background:(p.fatigue||0)>60?"#c04040":(p.fatigue||0)>30?"#c0a030":"#4fc76a",borderRadius:2}}/></div></td>
                <td style={{...C.td,fontSize:10,color:"#4a5d7a"}}>${p.salary||1}M/{p.years||1}yr</td>
                <td style={C.td}><button style={{background:"#3a2a10",color:"#c8a060",border:"none",padding:"3px 7px",borderRadius:3,fontSize:9,cursor:"pointer"}} onClick={()=>movePlayer("bullpen",p.id,"bench")}>→ BN</button></td>
              </tr>
            ))}</tbody>
          </table></div>}

          {rosterTab==="bench"&&<div style={C.tbox}><table style={{width:"100%",borderCollapse:"collapse"}}>
            <thead><tr><th style={C.th}>Pos</th><th style={C.th}>Player</th><th style={C.th}>OVR</th><th style={C.th}>Age</th><th style={C.th}>Contract</th><th style={C.th}>Promote to</th></tr></thead>
            <tbody>{bench.map(p=>{
              const isSP=p.p==="SP"||p.p==="RP";
              return(
              <tr key={p.id}>
                <td style={C.td}><span style={C.pb}>{p.p}</span></td>
                <td style={{...C.td,fontWeight:500}}>{p.n}</td>
                <td style={C.td}><OVR o={p.o}/></td>
                <td style={C.td}>{p.a||"—"}</td>
                <td style={{...C.td,fontSize:10,color:"#4a5d7a"}}>${p.salary||1}M/{p.years||1}yr</td>
                <td style={C.td}>
                  <div style={{display:"flex",gap:4,flexWrap:"wrap"}}>
                    {!isSP&&<button style={{background:"#1a5c2a",color:"#9fe8b0",border:"none",padding:"3px 8px",borderRadius:3,fontSize:9,cursor:"pointer",fontWeight:500}} onClick={()=>movePlayer("bench",p.id,"lineup")}>→ Lineup</button>}
                    {isSP&&<button style={{background:"#1a5c2a",color:"#9fe8b0",border:"none",padding:"3px 8px",borderRadius:3,fontSize:9,cursor:"pointer",fontWeight:500}} onClick={()=>movePlayer("bench",p.id,"rotation")}>→ Rotation</button>}
                    {isSP&&<button style={{background:"#1a3a5c",color:"#9fb8e8",border:"none",padding:"3px 8px",borderRadius:3,fontSize:9,cursor:"pointer"}} onClick={()=>movePlayer("bench",p.id,"bullpen")}>→ Bullpen</button>}
                    <button style={{background:"#5c1a1a",color:"#e89f9f",border:"none",padding:"3px 8px",borderRadius:3,fontSize:9,cursor:"pointer"}} onClick={()=>movePlayer("bench",p.id,"release")}>✕ DFA</button>
                  </div>
                </td>
              </tr>
            );})}
            {bench.length===0&&<tr><td colSpan={6} style={{...C.td,color:"#4a5d7a",textAlign:"center",padding:16}}>Bench is empty</td></tr>}
            </tbody>
          </table></div>}
        </div>}

        {/* ── SCHEDULE ── */}
        {tab==="sched"&&<div>
          <div style={{display:"flex",gap:8,marginBottom:10,alignItems:"center",flexWrap:"wrap"}}>
            <button style={C.btn(true)} onClick={simWeek}>Sim week →</button>
            <button style={C.btn(false)} onClick={simSeason}>Sim rest of season</button>
            <span style={{fontSize:11,color:"#4a5d7a"}}>Week {week} • {schedule.filter(g=>g.played).length}/162 played</span>
          </div>
          {schedule.slice(0,100).map((g,i)=>(
            <div key={i} onClick={()=>loadGame(i)} style={{display:"flex",alignItems:"center",gap:8,padding:"6px 8px",borderBottom:"1px solid #1e3558",fontSize:12,cursor:"pointer",background:g.played?"transparent":"#111d30"}}>
              <span style={{color:"#4a5d7a",width:36,flexShrink:0}}>Wk{g.week}</span>
              <span style={{color:"#d4c9a8",flex:1}}>{g.home?"vs":"@"} {g.opp}</span>
              {g.played?<span style={{color:g.result==="W"?"#4fc76a":"#e05050",fontWeight:500}}>{g.result} {g.mS}-{g.oS}</span>:<span style={{color:"#4a5d7a"}}>—</span>}
            </div>
          ))}
        </div>}

        {/* ── GAME ── */}
        {tab==="game"&&<div>
          {game?<>
            {/* Scoreboard */}
            <div style={{background:"#060e1a",border:"1px solid #1e3558",borderRadius:6,padding:"12px 16px",marginBottom:10}}>
              <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:24,marginBottom:8}}>
                <div style={{textAlign:"center",minWidth:80}}>
                  <div style={{fontSize:20,fontWeight:700,color:"#d4c9a8"}}>{game.awayA}</div>
                  <div style={{fontSize:10,color:"#4a5d7a"}}>Away</div>
                </div>
                <div style={{textAlign:"center"}}>
                  <div style={{fontSize:34,fontWeight:700,color:"#c9a84c",letterSpacing:"0.1em",lineHeight:1}}>{game.aS} – {game.hS}</div>
                  <div style={{fontSize:11,color:"#4a5d7a",marginTop:4}}>{game.gameOver?"⚫ FINAL":`${game.top?"▲":"▽"} ${game.inn}${ord(game.inn)} • ${game.outs} out${game.outs!==1?"s":""}`}</div>
                </div>
                <div style={{textAlign:"center",minWidth:80}}>
                  <div style={{fontSize:20,fontWeight:700,color:"#d4c9a8"}}>{game.homeA}</div>
                  <div style={{fontSize:10,color:"#4a5d7a"}}>Home</div>
                </div>
              </div>
              {/* Inning line score */}
              {game.boxScore&&<div style={{overflowX:"auto"}}>
                <table style={{width:"100%",borderCollapse:"collapse",fontSize:11,textAlign:"center"}}>
                  <thead><tr>
                    <th style={{...C.th,textAlign:"left",width:50}}>Team</th>
                    {game.boxScore.map((_,i)=><th key={i} style={{...C.th,textAlign:"center",width:28}}>{i+1}</th>)}
                    <th style={{...C.th,textAlign:"center",width:32,color:"#c9a84c"}}>R</th>
                    <th style={{...C.th,textAlign:"center",width:28}}>H</th>
                  </tr></thead>
                  <tbody>
                    <tr style={{background:"#111d30"}}>
                      <td style={{...C.td,fontWeight:600,fontSize:11}}>{game.awayA}</td>
                      {game.boxScore.map((b,i)=><td key={i} style={{...C.td,textAlign:"center",fontSize:11,color:b.away>0?"#c9a84c":"#4a5d7a"}}>{i<game.inn||(i===game.inn-1&&!game.top)?b.away:"·"}</td>)}
                      <td style={{...C.td,textAlign:"center",fontWeight:700,color:"#c9a84c"}}>{game.aS}</td>
                      <td style={{...C.td,textAlign:"center",color:"#8a9bbf"}}>{game.oppSPStats?game.oppSPStats.h:0}</td>
                    </tr>
                    <tr>
                      <td style={{...C.td,fontWeight:600,fontSize:11}}>{game.homeA}</td>
                      {game.boxScore.map((b,i)=><td key={i} style={{...C.td,textAlign:"center",fontSize:11,color:b.home>0?"#c9a84c":"#4a5d7a"}}>{i<game.inn-1||(i===game.inn-1&&game.gameOver)?b.home:"·"}</td>)}
                      <td style={{...C.td,textAlign:"center",fontWeight:700,color:"#c9a84c"}}>{game.hS}</td>
                      <td style={{...C.td,textAlign:"center",color:"#8a9bbf"}}>{game.spStats?game.spStats.h:0}</td>
                    </tr>
                  </tbody>
                </table>
              </div>}
            </div>

            {/* Diamond + Current batter/pitcher */}
            <div style={{display:"flex",gap:12,marginBottom:10,flexWrap:"wrap"}}>
              <div style={{...C.card,padding:"10px 14px",display:"flex",gap:18,alignItems:"center",flex:"0 0 auto"}}>
                <div>
                  <div style={{display:"flex",gap:5,marginBottom:5,justifyContent:"center"}}>{[0,1,2].map(i=><div key={i} style={{width:9,height:9,borderRadius:"50%",border:"1.5px solid #1e3558",background:i<game.outs?"#c04040":"transparent"}}/>)}</div>
                  <div style={{position:"relative",width:66,height:66}}>
                    {[[28,2,1],[2,28,2],[52,28,0]].map(([l,t,bi])=>(<div key={bi} style={{position:"absolute",width:11,height:11,border:"1.5px solid #1e3558",transform:"rotate(45deg)",background:game.bases[bi]?"#c9a84c":"#111d30",left:l,top:t}}/>))}
                    <div style={{position:"absolute",width:11,height:11,border:"1.5px solid #1e3558",transform:"rotate(45deg)",background:"#111d30",left:28,bottom:2}}/>
                  </div>
                  <div style={{fontSize:10,color:"#4a5d7a",textAlign:"center",marginTop:4}}>{game.outs} out{game.outs!==1?"s":""}</div>
                </div>
              </div>

              {/* At bat info */}
              {((game.myHome&&!game.top)||(!game.myHome&&game.top))&&lineup.length>0&&(()=>{
                const batSlot=game.batIdx%Math.max(1,lineup.length);
                const batter=lineup[batSlot];
                const bs=game.batterStats?.[batSlot];
                const avg=bs&&bs.ab>0?((bs.h/bs.ab).toFixed(3)):"—";
                return batter?<div style={{...C.card,padding:"10px 14px",flex:1,minWidth:160}}>
                  <div style={{fontSize:10,color:"#4a5d7a",marginBottom:4}}>AT BAT</div>
                  <div style={{fontSize:14,fontWeight:600,color:"#d4c9a8"}}>{batter.n}</div>
                  <div style={{fontSize:11,color:"#8a9bbf",marginBottom:6}}><span style={C.pb}>{batter.p}</span> • OVR <OVR o={batter.o}/></div>
                  {bs&&<div style={{display:"flex",gap:12,fontSize:11}}>
                    <div><div style={{color:"#4a5d7a"}}>AVG</div><div style={{color:"#d4c9a8",fontWeight:500}}>{avg}</div></div>
                    <div><div style={{color:"#4a5d7a"}}>AB</div><div style={{color:"#d4c9a8"}}>{bs.ab}</div></div>
                    <div><div style={{color:"#4a5d7a"}}>H</div><div style={{color:"#4fc76a"}}>{bs.h}</div></div>
                    <div><div style={{color:"#4a5d7a"}}>HR</div><div style={{color:"#c9a84c"}}>{bs.hr}</div></div>
                    <div><div style={{color:"#4a5d7a"}}>RBI</div><div style={{color:"#d4c9a8"}}>{bs.rbi}</div></div>
                    <div><div style={{color:"#4a5d7a"}}>K</div><div style={{color:"#e05050"}}>{bs.k}</div></div>
                  </div>}
                </div>:null;
              })()}

              {/* Pitching info */}
              {game.sp&&<div style={{...C.card,padding:"10px 14px",flex:1,minWidth:160}}>
                <div style={{fontSize:10,color:"#4a5d7a",marginBottom:4}}>PITCHING</div>
                <div style={{fontSize:14,fontWeight:600,color:"#d4c9a8"}}>{game.sp.n||game.sp.name}</div>
                <div style={{fontSize:11,color:"#8a9bbf",marginBottom:6}}>Pitches: {game.pitchCount} &nbsp;|&nbsp; Fatigue: {Math.min(100,Math.round(game.pitchCount*1.1))}%</div>
                <div style={{height:3,background:"#1e3558",borderRadius:2,marginBottom:8,width:"100%"}}>
                  <div style={{height:3,width:`${Math.min(100,Math.round(game.pitchCount*1.1))}%`,background:game.pitchCount>70?"#c04040":game.pitchCount>40?"#c0a030":"#4fc76a",borderRadius:2}}/>
                </div>
                {(()=>{
                  const myPitching=(game.myHome&&game.top)||(!game.myHome&&!game.top);
                  const stats=myPitching?game.spStats:game.oppSPStats;
                  if(!stats)return null;
                  const ipo=stats.ipOuts||0;
                  const ipStr=Math.floor(ipo/3)+(ipo%3>0?"."+ipo%3:"");
                  const era=ipo>0?((stats.er/(ipo/3))*9).toFixed(2):"—";
                  return<div style={{display:"flex",gap:12,fontSize:11}}>
                    <div><div style={{color:"#4a5d7a"}}>IP</div><div style={{color:"#d4c9a8",fontWeight:500}}>{ipStr||"0"}</div></div>
                    <div><div style={{color:"#4a5d7a"}}>H</div><div style={{color:"#d4c9a8"}}>{stats.h}</div></div>
                    <div><div style={{color:"#4a5d7a"}}>ER</div><div style={{color:stats.er>3?"#e05050":"#d4c9a8"}}>{stats.er}</div></div>
                    <div><div style={{color:"#4a5d7a"}}>BB</div><div style={{color:"#d4c9a8"}}>{stats.bb}</div></div>
                    <div><div style={{color:"#4a5d7a"}}>K</div><div style={{color:"#4fc76a"}}>{stats.k}</div></div>
                    <div><div style={{color:"#4a5d7a"}}>ERA</div><div style={{color:"#c9a84c"}}>{era}</div></div>
                  </div>;
                })()}
              </div>}
            </div>

            {/* Play by play */}
            <div style={{background:"#111d30",borderRadius:5,padding:8,height:110,overflowY:"auto",fontSize:12,marginBottom:8,border:"1px solid #1e3558"}}>
              {pbp.map((l,i)=><div key={i} style={{padding:"2px 0",borderBottom:"1px solid #1e3558",color:l.cls==="sc"?"#c9a84c":l.cls==="h"?"#4fc76a":l.cls==="o"?"#4a5d7a":l.cls==="e"?"#e8c040":"#d4c9a8"}}>{l.msg}</div>)}
            </div>

            {/* Controls */}
            <div style={{display:"flex",gap:6,justifyContent:"center",flexWrap:"wrap",marginBottom:12}}>
              <button style={C.btn(false)} onClick={simOnePitch}>⊳ Pitch</button>
              <button style={C.btn(false)} onClick={simHalf}>⊳⊳ Half inning</button>
              <button style={C.btn(true)} onClick={simFull}>⊳⊳⊳ Full game</button>
              <button style={C.btn(false)} onClick={bullpenChange}>🔄 Pitching change</button>
              <button style={C.btn(false)} onClick={nextGame}>Next game</button>
            </div>

            {/* Batting box score — my lineup */}
            {game.batterStats&&Object.keys(game.batterStats).length>0&&<div>
              <div style={C.tt}>Batting — {game.myHome?game.homeA:game.awayA}</div>
              <div style={C.tbox}><table style={{width:"100%",borderCollapse:"collapse"}}>
                <thead><tr>
                  {["Pos","Player","AB","R","H","HR","RBI","BB","K","AVG"].map(h=><th key={h} style={{...C.th,textAlign:h==="Player"?"left":"center"}}>{h}</th>)}
                </tr></thead>
                <tbody>{lineup.map((p,i)=>{
                  const bs=game.batterStats?.[i]||{ab:0,h:0,hr:0,rbi:0,bb:0,k:0};
                  const avg=bs.ab>0?(bs.h/bs.ab).toFixed(3):"—";
                  const curSlot=game.batIdx%Math.max(1,lineup.length);
                  const isCur=!game.gameOver&&((game.myHome&&!game.top)||(!game.myHome&&game.top))&&curSlot===i;
                  return<tr key={p.id||i} style={{background:isCur?"#1a2a10":"transparent"}}>
                    <td style={{...C.td,textAlign:"center"}}><span style={C.pb}>{p.p}</span></td>
                    <td style={{...C.td,fontWeight:isCur?600:400,color:isCur?"#c9a84c":"#d4c9a8"}}>{isCur?"▶ ":""}{p.n}</td>
                    {[bs.ab,0,bs.h,bs.hr,bs.rbi,bs.bb,bs.k].map((v,j)=><td key={j} style={{...C.td,textAlign:"center",color:j===2&&v>0?"#4fc76a":j===3&&v>0?"#c9a84c":"#d4c9a8"}}>{v}</td>)}
                    <td style={{...C.td,textAlign:"center",color:bs.ab>0&&bs.h/bs.ab>=0.3?"#4fc76a":"#d4c9a8"}}>{avg}</td>
                  </tr>;
                })}</tbody>
              </table></div>
            </div>}

            {/* Pitching summary */}
            {game.spStats&&<div>
              <div style={C.tt}>Pitching summary</div>
              <div style={C.tbox}><table style={{width:"100%",borderCollapse:"collapse"}}>
                <thead><tr>{["Pitcher","Team","IP","H","ER","BB","K","Pitches","ERA"].map(h=><th key={h} style={{...C.th,textAlign:h==="Pitcher"?"left":"center"}}>{h}</th>)}</tr></thead>
                <tbody>{[
                  {...game.spStats,team:game.myHome?game.homeA:game.awayA,isMine:true},
                  {...game.oppSPStats,team:game.myHome?game.awayA:game.homeA,isMine:false}
                ].map((s,i)=>{
                  const ipo=s.ipOuts||0;
                  const ipStr=Math.floor(ipo/3)+(ipo%3>0?"."+ipo%3:"");
                  const era=ipo>0?((s.er/(ipo/3))*9).toFixed(2):"—";
                  return<tr key={i} style={{background:s.isMine?"#111d30":"transparent"}}>
                    <td style={{...C.td,fontWeight:500}}>{s.name}</td>
                    <td style={{...C.td,textAlign:"center"}}><span style={{fontSize:10,color:"#8a9bbf"}}>{s.team}</span></td>
                    <td style={{...C.td,textAlign:"center"}}>{ipStr||"0"}</td>
                    <td style={{...C.td,textAlign:"center"}}>{s.h}</td>
                    <td style={{...C.td,textAlign:"center",color:s.er>3?"#e05050":"#d4c9a8"}}>{s.er}</td>
                    <td style={{...C.td,textAlign:"center"}}>{s.bb}</td>
                    <td style={{...C.td,textAlign:"center",color:"#4fc76a"}}>{s.k}</td>
                    <td style={{...C.td,textAlign:"center",color:"#8a9bbf"}}>{s.pc}</td>
                    <td style={{...C.td,textAlign:"center",color:"#c9a84c"}}>{era}</td>
                  </tr>;
                })}</tbody>
              </table></div>
            </div>}
          </>:<div style={{textAlign:"center",padding:"40px 20px",color:"#4a5d7a"}}><div style={{marginBottom:12}}>Select a game from Schedule, or:</div><button style={C.btn(true)} onClick={nextGame}>Load next game →</button></div>}
        </div>}

        {/* ── GM OFFICE ── */}
        {tab==="gm"&&<div>
          <div style={{display:"flex",gap:2,marginBottom:10,borderBottom:"1px solid #1e3558"}}>
            {[["offers","Trade Offers"],["fa","Free Agents"],["contracts","Contracts"]].map(([id,label])=>(
              <button key={id} style={{background:"none",border:"none",borderBottom:gmTab===id?"2px solid #c9a84c":"2px solid transparent",color:gmTab===id?"#c9a84c":"#4a5d7a",padding:"6px 10px",fontSize:11,cursor:"pointer",fontFamily:"inherit"}} onClick={()=>setGmTab(id)}>{label}</button>
            ))}
          </div>
          {gmTab==="offers"&&<div>
            {tradeOffers.map(offer=>(
              <div key={offer.id} style={{...C.card,padding:12,marginBottom:10}}>
                <div style={{fontSize:11,color:"#4a5d7a",marginBottom:8}}>From: <strong style={{color:"#d4c9a8"}}>{offer.oppTeam.c} {offer.oppTeam.n}</strong></div>
                <div style={{display:"flex",gap:10,alignItems:"flex-start"}}>
                  <div style={{flex:1}}><div style={{fontSize:10,color:"#4a5d7a",marginBottom:5}}>YOU RECEIVE</div><div style={{fontSize:12}}>{offer.theirName} <PB>{offer.theirPos}</PB> <OVR o={offer.theirOvr}/></div></div>
                  <div style={{paddingTop:14,color:"#4a5d7a"}}>⇄</div>
                  <div style={{flex:1}}><div style={{fontSize:10,color:"#4a5d7a",marginBottom:5}}>YOU SEND</div><div style={{fontSize:12}}>{offer.myPlayer?.n} <PB>{offer.myPlayer?.p}</PB> <OVR o={offer.myPlayer?.o||70}/></div></div>
                </div>
                <div style={{marginTop:6,fontSize:10,color:"#4a5d7a"}}>Accepted players go to bench — use Roster to slot them in.</div>
                <div style={{marginTop:8,display:"flex",gap:6}}><button style={C.btnGrn} onClick={()=>acceptTrade(offer)}>Accept</button><button style={C.btn(false,true)} onClick={()=>setTradeOffers(prev=>prev.filter(o=>o.id!==offer.id))}>Decline</button></div>
              </div>
            ))}
            {!tradeOffers.length&&<div style={{fontSize:12,color:"#4a5d7a"}}>No pending offers.</div>}
            <button style={{...C.btn(false,true),marginTop:10}} onClick={()=>setTradeOffers(makeOffers(lineup,myTeam))}>Refresh offers</button>
          </div>}
          {gmTab==="fa"&&<div>
            <div style={{fontSize:11,color:"#4a5d7a",marginBottom:8}}>Signed players go to bench. Use the Roster tab to move them into your lineup or rotation.</div>
            <div style={C.tbox}><table style={{width:"100%",borderCollapse:"collapse"}}>
              <thead><tr><th style={C.th}>Player</th><th style={C.th}>Pos</th><th style={C.th}>OVR</th><th style={C.th}>Age</th><th style={C.th}>Ask</th><th style={C.th}></th></tr></thead>
              <tbody>{faList.map(f=><tr key={f.id}><td style={C.td}>{f.n}</td><td style={C.td}><PB>{f.p}</PB></td><td style={C.td}><OVR o={f.o}/></td><td style={C.td}>{f.age}</td><td style={C.td}>${f.salary}M/{f.years}yr</td><td style={C.td}><button style={C.btn(true,true)} onClick={()=>signFA(f)}>Sign → Bench</button></td></tr>)}</tbody>
            </table></div>
            <button style={{...C.btn(false,true),marginTop:8}} onClick={()=>setFaList(makeFA())}>Refresh market</button>
          </div>}
          {gmTab==="contracts"&&<div>
            <div style={C.tbox}><table style={{width:"100%",borderCollapse:"collapse"}}>
              <thead><tr><th style={C.th}>Player</th><th style={C.th}>Pos</th><th style={C.th}>OVR</th><th style={C.th}>Group</th><th style={C.th}>Salary</th><th style={C.th}>Years</th><th style={C.th}>Status</th></tr></thead>
              <tbody>{[...lineup.map(p=>({...p,grp:"LU"})),...rotation.map(p=>({...p,grp:"SP"})),...bullpen.map(p=>({...p,grp:"BP"})),...bench.map(p=>({...p,grp:"BN"}))].map((p,i)=>(
                <tr key={p.id||i}><td style={C.td}>{p.n||p.name}</td><td style={C.td}><PB>{p.p||p.role}</PB></td><td style={C.td}><OVR o={p.o||p.ovr}/></td><td style={C.td}><span style={{fontSize:10,color:"#8a9bbf"}}>{p.grp}</span></td><td style={C.td}>${p.salary||1}M</td><td style={C.td}>{p.years||1}yr</td><td style={{...C.td,color:(p.years||1)<=1?"#e05050":"#4fc76a",fontSize:10}}>{(p.years||1)<=1?"Expiring":"Active"}</td></tr>
              ))}</tbody>
            </table></div>
          </div>}
        </div>}

        {/* ── DRAFT ── */}
        {tab==="draft"&&<div>
          <div style={{fontSize:11,color:"#4a5d7a",marginBottom:10}}>Drafted players enter your farm system at Single-A.</div>
          {draftBoard.filter(p=>!p.drafted).map(p=>(
            <div key={p.id} style={{...C.card,padding:10,marginBottom:7,display:"flex",alignItems:"center",gap:10}}>
              <span style={{fontSize:11,color:"#4a5d7a",width:24,flexShrink:0}}>#{p.rank}</span>
              <div style={{flex:1}}><div style={{fontSize:13,fontWeight:500,color:"#d4c9a8"}}>{p.name}</div><div style={{fontSize:10,color:"#4a5d7a"}}>{p.pos} • Age {p.age}</div></div>
              <div style={{flex:1}}><span style={{fontSize:10,color:"#4a5d7a"}}>Ceiling: </span><OVR o={p.potential}/></div>
              <button style={C.btn(true,true)} onClick={()=>draftPick(p.id)}>Draft</button>
            </div>
          ))}
          {!draftBoard.filter(p=>!p.drafted).length&&<div style={{fontSize:12,color:"#4a5d7a"}}>Draft class complete.</div>}
        </div>}

        {/* ── FARM & TRAINING ── */}
        {tab==="farm"&&<div>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12,flexWrap:"wrap",gap:8}}>
            <div style={{fontSize:11,color:"#4a5d7a"}}>Players auto-develop each week. Use training to accelerate growth.</div>
            <div style={{background:"#111d30",border:"1px solid #7a6030",borderRadius:5,padding:"6px 12px",fontSize:12,color:"#c9a84c",fontWeight:500}}>
              🎓 Training pts this week: <strong>{trainPts}</strong> / 100
            </div>
          </div>
          {["AAA","AA","A"].map(lvl=>{
            const players=farm.filter(p=>p.lvl===lvl);if(!players.length)return null;
            return<div key={lvl}>
              <div style={C.tt}>{lvl} — {lvl==="AAA"?"Triple-A":lvl==="AA"?"Double-A":"Single-A"}{lvl==="AAA"?" (call-up eligible)":""}</div>
              {players.map(p=>{
                const isSP=p.pos==="SP"||p.pos==="RP"||p.p==="SP"||p.p==="RP";
                const opts=isSP?TRAIN_OPTS.pitcher:TRAIN_OPTS.hitter;
                return<div key={p.id} style={{...C.card,padding:12,marginBottom:8}}>
                  <div style={{display:"flex",gap:12,flexWrap:"wrap"}}>
                    <div style={{flex:"1 1 160px"}}>
                      <div style={{fontSize:13,fontWeight:500,color:"#d4c9a8"}}>{p.n}</div>
                      <div style={{fontSize:10,color:"#4a5d7a",marginTop:2}}>{p.pos||p.p} • Age {p.age}</div>
                      <div style={{marginTop:6,display:"flex",gap:10,alignItems:"center"}}>
                        <div><div style={{fontSize:10,color:"#4a5d7a"}}>Current</div><OVR o={p.currentOvr}/></div>
                        <div style={{color:"#4a5d7a"}}>→</div>
                        <div><div style={{fontSize:10,color:"#4a5d7a"}}>Ceiling</div><OVR o={p.pot}/></div>
                      </div>
                    </div>
                    <div style={{flex:"1 1 160px"}}>
                      <div style={{fontSize:10,color:"#4a5d7a",marginBottom:4}}>Development ({p.progress}%){p.lvl!=="AAA"?` — promotes at 100%`:""}</div>
                      <div style={{height:8,background:"#1e3558",borderRadius:4,marginBottom:6}}>
                        <div style={{height:8,background:p.progress>80?"#4fc76a":"#7a6030",borderRadius:4,width:`${p.progress}%`,transition:"width 0.4s"}}/>
                      </div>
                      {p.focus&&<div style={{fontSize:10,color:"#c9a84c"}}>Focus: {p.focus} • {p.trainPts||0} pts spent total</div>}
                    </div>
                    <div style={{flex:"1 1 200px"}}>
                      <div style={{fontSize:10,color:"#4a5d7a",marginBottom:5}}>Training focus (click to apply)</div>
                      <div style={{display:"flex",flexWrap:"wrap",gap:4}}>
                        {opts.map(opt=>(
                          <button key={opt.k} style={{...C.btn(false,true),fontSize:10,background:"#16263d",color:"#8ab4e8"}} onClick={()=>applyTraining(p.id,opt.l,2)}>
                            {opt.l} (2pts)
                          </button>
                        ))}
                        <button style={{...C.btn(false,true),fontSize:10,background:"#1a1a3a",color:"#c9a84c",border:"1px solid #7a6030"}} onClick={()=>applyTraining(p.id,"Intensive",5)}>
                          Intensive (5pts)
                        </button>
                      </div>
                    </div>
                  </div>
                  {lvl==="AAA"&&<div style={{marginTop:10,borderTop:"1px solid #1e3558",paddingTop:8}}>
                    <button style={{...C.btn(true,true),background:"#1a5c2a",color:"#9fe8b0"}} onClick={()=>callUp(p.id)}>⬆ Call up → Bench</button>
                    <span style={{fontSize:10,color:"#4a5d7a",marginLeft:8}}>Will be added to bench — slot into roster from there</span>
                  </div>}
                </div>;
              })}
            </div>;
          })}
          {!farm.length&&<div style={{fontSize:12,color:"#4a5d7a"}}>Farm empty — use the draft to build your pipeline.</div>}
        </div>}

        {/* ── STANDINGS ── */}
        {tab==="stand"&&<div>
          {Object.entries(standings).map(([div,teams])=>(
            <div key={div} style={{marginBottom:14}}>
              <div style={{fontSize:10,color:"#4a5d7a",letterSpacing:"0.07em",textTransform:"uppercase",padding:"7px 8px",background:"#111d30",borderRadius:"6px 6px 0 0",border:"1px solid #1e3558",borderBottom:"none"}}>{div}</div>
              <div style={C.tbox}><table style={{width:"100%",borderCollapse:"collapse"}}>
                <thead><tr><th style={C.th}>Team</th><th style={{...C.th,textAlign:"right"}}>W</th><th style={{...C.th,textAlign:"right"}}>L</th><th style={{...C.th,textAlign:"right"}}>PCT</th><th style={{...C.th,textAlign:"right"}}>GB</th></tr></thead>
                <tbody>{teams.map((t,i)=>{const tt=t.w+t.l,p2=tt>0?(t.w/tt).toFixed(3):"—";const ldr=teams[0],gb=i===0?"—":((ldr.w-t.w+t.l-ldr.l)/2).toFixed(1);return(
                  <tr key={t.a} style={{background:t.isMe?"#1a1500":"transparent"}}><td style={{...C.td,fontWeight:500,color:t.isMe?"#e8d5a3":"#d4c9a8"}}>{t.a}{i===1&&<span style={{fontSize:9,color:"#c9a84c",marginLeft:3}}>WC</span>}</td><td style={{...C.td,textAlign:"right"}}>{t.w}</td><td style={{...C.td,textAlign:"right"}}>{t.l}</td><td style={{...C.td,textAlign:"right",color:"#8a9bbf"}}>{p2}</td><td style={{...C.td,textAlign:"right"}}>{gb}</td></tr>
                );})}
                </tbody>
              </table></div>
            </div>
          ))}
        </div>}

        {/* ── PLAYOFFS ── */}
        {tab==="playoff"&&<div>
          {playoffs?<>
            <div style={{fontSize:13,color:"#c9a84c",fontWeight:500,marginBottom:10}}>🏆 {season} World Series Champion: {playoffs.ws.win.a} — {playoffs.ws.win.n}</div>
            {playoffs.qual.find(t=>t.isMe)?<div style={{fontSize:12,color:"#4fc76a",marginBottom:12}}>Your team made the postseason!</div>:<div style={{fontSize:12,color:"#4a5d7a",marginBottom:12}}>Your team missed the playoffs.</div>}
            <div style={{display:"flex",gap:10,overflowX:"auto"}}>
              {[["Division Series",playoffs.ds],["Championship",playoffs.cs],["World Series",[playoffs.ws]]].map(([label,rounds])=>(
                <div key={label} style={{minWidth:130,flexShrink:0}}>
                  <div style={{fontSize:9,color:"#4a5d7a",letterSpacing:"0.06em",textTransform:"uppercase",marginBottom:6}}>{label}</div>
                  {rounds.map((r,i)=>(
                    <div key={i} style={{...C.card,padding:8,marginBottom:8}}>
                      <div style={{display:"flex",justifyContent:"space-between",padding:"2px 0",fontSize:12,color:"#c9a84c",fontWeight:500}}><span>{r.win.a}</span><span style={{color:"#4a5d7a",fontSize:11}}>{r.sc.split("-")[0]}</span></div>
                      <div style={{display:"flex",justifyContent:"space-between",padding:"2px 0",fontSize:12,color:"#4a5d7a"}}><span>opp</span><span style={{fontSize:11}}>{r.sc.split("-")[1]}</span></div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
            <button style={{...C.btn(true),marginTop:16}} onClick={nextSeason}>Start {season+1} season →</button>
          </>:<div style={{fontSize:12,color:"#4a5d7a"}}>Complete the regular season to unlock playoffs.<br/><br/><button style={C.btn(false)} onClick={()=>setTab("sched")}>Go to Schedule →</button></div>}
        </div>}

        {/* ── HISTORY ── */}
        {tab==="hist"&&<div>
          <div style={C.tt}>Season history</div>
          {history.length?history.map((h,i)=>(
            <div key={i} style={{display:"flex",justifyContent:"space-between",padding:"6px 0",borderBottom:"1px solid #1e3558",fontSize:12}}>
              <span style={{color:"#c9a84c",fontWeight:500}}>{h.season}</span><span>{h.w}-{h.l}</span><span style={{color:"#8a9bbf"}}>{h.result}</span>
            </div>
          )):<div style={{fontSize:12,color:"#4a5d7a"}}>No completed seasons yet.</div>}
          <div style={{...C.tt,marginTop:16}}>Player aging</div>
          {[...lineup,...rotation].map((p,i)=>(
            <div key={p.id||i} style={{display:"flex",alignItems:"center",gap:8,padding:"5px 0",borderBottom:"1px solid #1e3558",fontSize:12}}>
              <span style={{flex:1,color:"#d4c9a8"}}>{p.n||p.name}</span><PB>{p.p}</PB><OVR o={p.o}/>
              <span style={{fontSize:11,color:(p.a||25)<=27?"#4fc76a":(p.a||25)>32?"#e05050":"#4a9de8"}}>Age {p.a||25} {(p.a||25)<=27?"▲":(p.a||25)>32?"▼":""}</span>
            </div>
          ))}
          {playoffs&&<button style={{...C.btn(true),marginTop:16}} onClick={nextSeason}>Start {season+1} season →</button>}
        </div>}

      </div>
    </div>
  );
}
