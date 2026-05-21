import { useState, useRef } from "react";

// ── Real 2026 40-man rosters: lu=lineup, ro=rotation, bp=bullpen, bench, farm ──
const ROSTERS = {
  NYY:{
    lu:[{n:"Trent Grisham",p:"CF",a:29,o:72},{n:"Aaron Judge",p:"RF",a:33,o:98},{n:"Cody Bellinger",p:"LF",a:30,o:78},{n:"Ben Rice",p:"1B",a:25,o:74},{n:"Giancarlo Stanton",p:"DH",a:36,o:80},{n:"Jazz Chisholm Jr.",p:"2B",a:28,o:82},{n:"Ryan McMahon",p:"3B",a:29,o:74},{n:"Jose Caballero",p:"SS",a:28,o:70},{n:"Austin Wells",p:"C",a:25,o:72}],
    ro:[{n:"Max Fried",p:"SP1",a:32,o:86},{n:"Cam Schlittler",p:"SP2",a:24,o:74},{n:"Will Warren",p:"SP3",a:26,o:72},{n:"Ryan Weathers",p:"SP4",a:24,o:70},{n:"Luis Gil",p:"SP5",a:25,o:75}],
    bp:[{n:"Devin Williams",p:"CL",a:30,o:88},{n:"Clay Holmes",p:"SU",a:32,o:78},{n:"Jonathan Loaisiga",p:"SU",a:30,o:76},{n:"Tommy Kahnle",p:"MR",a:35,o:72},{n:"Tim Mayza",p:"MR",a:32,o:70},{n:"Ian Hamilton",p:"MR",a:30,o:68}],
    bench:[{n:"Alex Verdugo",p:"LF",a:29,o:72},{n:"Oswaldo Cabrera",p:"UT",a:25,o:68},{n:"Chaz Roe",p:"C",a:26,o:66},{n:"Jon Berti",p:"UT",a:36,o:64}],
    farm:[{n:"George Lombard Jr.",p:"OF",a:21,o:58,pot:84,lvl:"AA"},{n:"Spencer Jones",p:"OF",a:23,o:60,pot:88,lvl:"AAA"},{n:"Will Warren",p:"SP",a:26,o:65,pot:78,lvl:"AAA"},{n:"Jorbit Vivas",p:"2B",a:23,o:56,pot:74,lvl:"AA"},{n:"Ben Hess",p:"SP",a:22,o:52,pot:80,lvl:"A"}]
  },
  BOS:{
    lu:[{n:"Roman Anthony",p:"DH",a:21,o:78},{n:"Trevor Story",p:"SS",a:33,o:73},{n:"Jarren Duran",p:"LF",a:28,o:80},{n:"Willson Contreras",p:"1B",a:33,o:76},{n:"Wilyer Abreu",p:"RF",a:25,o:72},{n:"Caleb Durbin",p:"3B",a:25,o:70},{n:"Marcelo Mayer",p:"2B",a:22,o:74},{n:"Ceddanne Rafaela",p:"CF",a:24,o:71},{n:"Carlos Narvaez",p:"C",a:27,o:68}],
    ro:[{n:"Garrett Crochet",p:"SP1",a:26,o:88},{n:"Ranger Suarez",p:"SP2",a:29,o:82},{n:"Sonny Gray",p:"SP3",a:36,o:78},{n:"Brayan Bello",p:"SP4",a:25,o:74},{n:"Johan Oviedo",p:"SP5",a:25,o:70}],
    bp:[{n:"Kenley Jansen",p:"CL",a:37,o:80},{n:"Justin Slaten",p:"SU",a:27,o:74},{n:"Chris Martin",p:"SU",a:38,o:72},{n:"Greg Weissert",p:"MR",a:30,o:68},{n:"Brennan Bernardino",p:"MR",a:29,o:68},{n:"Bailey Horn",p:"MR",a:26,o:66}],
    bench:[{n:"Rob Refsnyder",p:"OF",a:34,o:70},{n:"Abraham Toro",p:"3B",a:29,o:66},{n:"Mickey Gasso",p:"C",a:23,o:62},{n:"Nick Sogard",p:"UT",a:28,o:64}],
    farm:[{n:"Kyle Teel",p:"C",a:23,o:64,pot:86,lvl:"AAA"},{n:"Roman Anthony",p:"OF",a:21,o:70,pot:92,lvl:"AAA"},{n:"Kristian Campbell",p:"2B",a:22,o:60,pot:84,lvl:"AA"},{n:"Chase Meidroth",p:"2B",a:24,o:58,pot:76,lvl:"AA"},{n:"Hunter Dobbins",p:"SP",a:25,o:56,pot:78,lvl:"AA"}]
  },
  TBR:{
    lu:[{n:"Yandy Diaz",p:"DH",a:34,o:76},{n:"Jonathan Aranda",p:"1B",a:26,o:76},{n:"Junior Caminero",p:"3B",a:21,o:82},{n:"Ben Williamson",p:"2B",a:25,o:70},{n:"Cedric Mullins",p:"CF",a:31,o:74},{n:"Jonny DeLuca",p:"RF",a:25,o:70},{n:"Nick Fortes",p:"C",a:28,o:68},{n:"Chandler Simpson",p:"LF",a:24,o:68},{n:"Carson Williams",p:"SS",a:22,o:73}],
    ro:[{n:"Drew Rasmussen",p:"SP1",a:30,o:80},{n:"Nick Martinez",p:"SP2",a:35,o:74},{n:"Ryan Pepiot",p:"SP3",a:27,o:74},{n:"Shane McClanahan",p:"SP4",a:28,o:84},{n:"Zach Eflin",p:"SP5",a:31,o:74}],
    bp:[{n:"Pete Fairbanks",p:"CL",a:31,o:82},{n:"Edwin Uceta",p:"SU",a:27,o:72},{n:"Kevin Kelly",p:"SU",a:28,o:70},{n:"Garrett Cleavinger",p:"MR",a:31,o:68},{n:"Chris Devenski",p:"MR",a:34,o:66},{n:"Shawn Armstrong",p:"MR",a:34,o:64}],
    bench:[{n:"Jose Siri",p:"OF",a:30,o:68},{n:"Taylor Walls",p:"UT",a:28,o:64},{n:"Tristan Gray",p:"UT",a:27,o:62},{n:"Ben Rortvedt",p:"C",a:27,o:64}],
    farm:[{n:"Xavier Isaac",p:"1B",a:21,o:58,pot:86,lvl:"A"},{n:"Taj Bradley",p:"SP",a:23,o:62,pot:82,lvl:"AAA"},{n:"Kameron Misner",p:"OF",a:26,o:56,pot:74,lvl:"AAA"},{n:"Austin Vernon",p:"SP",a:23,o:52,pot:78,lvl:"A"},{n:"Niko Hulsizer",p:"OF",a:26,o:58,pot:76,lvl:"AA"}]
  },
  TOR:{
    lu:[{n:"George Springer",p:"DH",a:36,o:74},{n:"Daulton Varsho",p:"CF",a:28,o:74},{n:"Vladimir Guerrero Jr.",p:"1B",a:27,o:88},{n:"Addison Barger",p:"RF",a:25,o:72},{n:"Alejandro Kirk",p:"C",a:26,o:76},{n:"Jesus Sanchez",p:"LF",a:27,o:72},{n:"Kazuma Okamoto",p:"3B",a:26,o:70},{n:"Ernie Clement",p:"2B",a:29,o:68},{n:"Andres Gimenez",p:"SS",a:27,o:74}],
    ro:[{n:"Kevin Gausman",p:"SP1",a:35,o:82},{n:"Dylan Cease",p:"SP2",a:30,o:84},{n:"Eric Lauer",p:"SP3",a:30,o:70},{n:"Bowden Francis",p:"SP4",a:28,o:72},{n:"Max Scherzer",p:"SP5",a:41,o:72}],
    bp:[{n:"Yimi Garcia",p:"CL",a:34,o:76},{n:"Nate Pearson",p:"SU",a:27,o:74},{n:"Chad Green",p:"SU",a:33,o:72},{n:"Erik Swanson",p:"MR",a:31,o:70},{n:"Zach Pop",p:"MR",a:28,o:68},{n:"Genesis Cabrera",p:"MR",a:29,o:66}],
    bench:[{n:"Davis Schneider",p:"UT",a:27,o:70},{n:"Spencer Horwitz",p:"1B",a:28,o:70},{n:"Leo Jimenez",p:"UT",a:24,o:64},{n:"Ricky Tiedemann",p:"SP",a:23,o:66}],
    farm:[{n:"Ricky Tiedemann",p:"SP",a:23,o:66,pot:90,lvl:"AAA"},{n:"Orelvis Martinez",p:"SS",a:23,o:58,pot:82,lvl:"AAA"},{n:"Alan Roden",p:"OF",a:24,o:56,pot:76,lvl:"AA"},{n:"Dasan Brown",p:"OF",a:22,o:52,pot:80,lvl:"A"},{n:"Jace Jung",p:"2B",a:24,o:60,pot:78,lvl:"AAA"}]
  },
  BAL:{
    lu:[{n:"Gunnar Henderson",p:"SS",a:24,o:91},{n:"Adley Rutschman",p:"C",a:27,o:86},{n:"Pete Alonso",p:"1B",a:31,o:84},{n:"Taylor Ward",p:"LF",a:31,o:78},{n:"Samuel Basallo",p:"DH",a:20,o:74},{n:"Tyler O'Neill",p:"RF",a:30,o:76},{n:"Coby Mayo",p:"3B",a:23,o:74},{n:"Colton Cowser",p:"CF",a:25,o:72},{n:"Blaze Alexander",p:"2B",a:27,o:66}],
    ro:[{n:"Kyle Bradish",p:"SP1",a:27,o:80},{n:"Shane Baz",p:"SP2",a:25,o:76},{n:"Chris Bassitt",p:"SP3",a:37,o:76},{n:"Zach Eflin",p:"SP4",a:31,o:74},{n:"Trevor Rogers",p:"SP5",a:28,o:78}],
    bp:[{n:"Felix Bautista",p:"CL",a:29,o:88},{n:"Danny Coulombe",p:"SU",a:34,o:74},{n:"Yennier Cano",p:"SU",a:30,o:78},{n:"Bryan Baker",p:"MR",a:30,o:70},{n:"Jacob Webb",p:"MR",a:31,o:68},{n:"Mike Baumann",p:"MR",a:29,o:66}],
    bench:[{n:"Anthony Santander",p:"OF",a:30,o:76},{n:"Jordan Westburg",p:"UT",a:26,o:74},{n:"Ramon Urias",p:"UT",a:31,o:66},{n:"James McCann",p:"C",a:35,o:62}],
    farm:[{n:"Jackson Holliday",p:"SS",a:22,o:64,pot:92,lvl:"AAA"},{n:"Heston Kjerstad",p:"OF",a:26,o:62,pot:80,lvl:"AAA"},{n:"Samuel Basallo",p:"C",a:20,o:66,pot:88,lvl:"AAA"},{n:"Joey Ortiz",p:"SS",a:26,o:64,pot:78,lvl:"AAA"},{n:"Connor Norby",p:"2B",a:25,o:60,pot:76,lvl:"AA"}]
  },
  HOU:{
    lu:[{n:"Jeremy Pena",p:"SS",a:27,o:78},{n:"Yordan Alvarez",p:"LF",a:28,o:95},{n:"Jose Altuve",p:"2B",a:35,o:82},{n:"Carlos Correa",p:"3B",a:31,o:82},{n:"Isaac Paredes",p:"DH",a:27,o:78},{n:"Christian Walker",p:"1B",a:33,o:80},{n:"Yainer Diaz",p:"C",a:26,o:76},{n:"Cam Smith",p:"RF",a:24,o:72},{n:"Jake Meyers",p:"CF",a:28,o:70}],
    ro:[{n:"Hunter Brown",p:"SP1",a:26,o:80},{n:"Cristian Javier",p:"SP2",a:27,o:76},{n:"Lance McCullers Jr.",p:"SP3",a:32,o:78},{n:"Framber Valdez",p:"SP4",a:31,o:84},{n:"Ronel Blanco",p:"SP5",a:31,o:76}],
    bp:[{n:"Ryan Pressly",p:"CL",a:36,o:78},{n:"Bryan Abreu",p:"SU",a:27,o:80},{n:"Hector Neris",p:"SU",a:35,o:72},{n:"Seth Martinez",p:"MR",a:30,o:68},{n:"Parker Mushinski",p:"MR",a:29,o:66},{n:"Tayler Scott",p:"MR",a:32,o:64}],
    bench:[{n:"Mauricio Dubon",p:"UT",a:30,o:68},{n:"Jon Singleton",p:"1B",a:33,o:66},{n:"David Hensley",p:"UT",a:29,o:64},{n:"Cesar Salazar",p:"C",a:29,o:62}],
    farm:[{n:"Colton Gordon",p:"SP",a:26,o:58,pot:78,lvl:"AAA"},{n:"Drew Gilbert",p:"OF",a:24,o:60,pot:82,lvl:"AAA"},{n:"Jacob Melton",p:"OF",a:23,o:56,pot:80,lvl:"AA"},{n:"Kenedy Corona",p:"OF",a:22,o:52,pot:76,lvl:"A"},{n:"Shay Whitcomb",p:"SS",a:26,o:62,pot:74,lvl:"AAA"}]
  },
  LAA:{
    lu:[{n:"Zach Neto",p:"SS",a:24,o:78},{n:"Mike Trout",p:"CF",a:34,o:90},{n:"Nolan Schanuel",p:"1B",a:23,o:74},{n:"Jorge Soler",p:"DH",a:34,o:76},{n:"Jo Adell",p:"RF",a:26,o:74},{n:"Josh Lowe",p:"LF",a:27,o:72},{n:"Logan O'Hoppe",p:"C",a:25,o:74},{n:"Oswald Peraza",p:"2B",a:25,o:68},{n:"Anthony Rendon",p:"3B",a:35,o:66}],
    ro:[{n:"Jose Soriano",p:"SP1",a:26,o:76},{n:"Yusei Kikuchi",p:"SP2",a:34,o:78},{n:"Reid Detmers",p:"SP3",a:26,o:74},{n:"Tyler Anderson",p:"SP4",a:32,o:70},{n:"Jack Kochanowicz",p:"SP5",a:23,o:68}],
    bp:[{n:"Carlos Estevez",p:"CL",a:32,o:78},{n:"Matt Moore",p:"SU",a:35,o:70},{n:"Ben Joyce",p:"SU",a:23,o:74},{n:"Chris Devenski",p:"MR",a:34,o:66},{n:"Kolby Allard",p:"MR",a:27,o:64},{n:"Chase Silseth",p:"MR",a:25,o:68}],
    bench:[{n:"Brandon Drury",p:"UT",a:32,o:68},{n:"Matt Thaiss",p:"C",a:30,o:64},{n:"Willie Calhoun",p:"OF",a:30,o:66},{n:"Michael Stefanic",p:"UT",a:29,o:62}],
    farm:[{n:"Caden Dana",p:"SP",a:21,o:56,pot:84,lvl:"A"},{n:"Christian Moore",p:"2B",a:22,o:58,pot:86,lvl:"A"},{n:"Jordyn Adams",p:"OF",a:24,o:60,pot:80,lvl:"AA"},{n:"Sam Bachman",p:"SP",a:24,o:58,pot:76,lvl:"AA"},{n:"Werner Blakely",p:"SS",a:21,o:52,pot:78,lvl:"A"}]
  },
  OAK:{
    lu:[{n:"Nick Kurtz",p:"1B",a:22,o:76},{n:"Shea Langeliers",p:"C",a:27,o:74},{n:"Tyler Soderstrom",p:"LF",a:23,o:74},{n:"Brent Rooker",p:"DH",a:30,o:78},{n:"Jacob Wilson",p:"SS",a:23,o:74},{n:"Lawrence Butler",p:"RF",a:24,o:74},{n:"Max Muncy",p:"3B",a:31,o:76},{n:"Zack Gelof",p:"2B",a:25,o:76},{n:"JJ Bleday",p:"CF",a:27,o:70}],
    ro:[{n:"JP Sears",p:"SP1",a:28,o:74},{n:"Jeffrey Springs",p:"SP2",a:32,o:74},{n:"Luis Medina",p:"SP3",a:25,o:70},{n:"Joey Estes",p:"SP4",a:24,o:70},{n:"Mitch Spence",p:"SP5",a:27,o:70}],
    bp:[{n:"Mason Miller",p:"CL",a:27,o:86},{n:"Lucas Erceg",p:"SU",a:30,o:74},{n:"Dany Jimenez",p:"SU",a:32,o:70},{n:"Shintaro Fujinami",p:"MR",a:31,o:68},{n:"Austin Adams",p:"MR",a:34,o:66},{n:"Brady Feigl",p:"MR",a:29,o:64}],
    bench:[{n:"Esteury Ruiz",p:"OF",a:25,o:68},{n:"Ryan Noda",p:"1B",a:29,o:66},{n:"Abraham Toro",p:"UT",a:29,o:64},{n:"Carlos Perez",p:"C",a:30,o:62}],
    farm:[{n:"Nick Kurtz",p:"1B",a:22,o:70,pot:88,lvl:"AAA"},{n:"Max Muncy",p:"SS",a:21,o:58,pot:84,lvl:"A"},{n:"Alexander Sanchez",p:"OF",a:22,o:56,pot:82,lvl:"A"},{n:"Gunnar Hoglund",p:"SP",a:25,o:58,pot:78,lvl:"AA"},{n:"Tyler Soderstrom",p:"C",a:23,o:64,pot:82,lvl:"AAA"}]
  },
  SEA:{
    lu:[{n:"Julio Rodriguez",p:"CF",a:24,o:88},{n:"Cal Raleigh",p:"C",a:28,o:82},{n:"Luke Raley",p:"LF",a:30,o:74},{n:"Mitch Garver",p:"DH",a:33,o:74},{n:"Jorge Polanco",p:"2B",a:32,o:74},{n:"Dominic Canzone",p:"RF",a:29,o:72},{n:"Dylan Moore",p:"SS",a:32,o:70},{n:"JP Crawford",p:"3B",a:30,o:72},{n:"Ty France",p:"1B",a:31,o:72}],
    ro:[{n:"Logan Gilbert",p:"SP1",a:28,o:84},{n:"George Kirby",p:"SP2",a:27,o:82},{n:"Bryan Woo",p:"SP3",a:25,o:76},{n:"Luis Castillo",p:"SP4",a:32,o:80},{n:"Emerson Hancock",p:"SP5",a:25,o:74}],
    bp:[{n:"Andres Munoz",p:"CL",a:26,o:86},{n:"Gabe Speier",p:"SU",a:29,o:72},{n:"Tayler Saucedo",p:"SU",a:29,o:70},{n:"Casey Sadler",p:"MR",a:34,o:68},{n:"Trent Thornton",p:"MR",a:32,o:66},{n:"Matt Brash",p:"MR",a:26,o:72}],
    bench:[{n:"Sam Haggerty",p:"UT",a:31,o:66},{n:"Tom Murphy",p:"C",a:34,o:64},{n:"Cooper Hummel",p:"OF",a:30,o:62},{n:"Josh Rojas",p:"UT",a:31,o:66}],
    farm:[{n:"Cole Young",p:"SS",a:21,o:58,pot:86,lvl:"A"},{n:"Harry Ford",p:"C",a:22,o:56,pot:84,lvl:"AA"},{n:"Victor Labrada",p:"OF",a:26,o:60,pot:76,lvl:"AAA"},{n:"Jonatan Clase",p:"OF",a:23,o:62,pot:80,lvl:"AAA"},{n:"Prelander Berroa",p:"SP",a:24,o:56,pot:78,lvl:"AA"}]
  },
  TEX:{
    lu:[{n:"Marcus Semien",p:"2B",a:35,o:80},{n:"Corey Seager",p:"SS",a:32,o:88},{n:"Adolis Garcia",p:"RF",a:32,o:78},{n:"Nathaniel Lowe",p:"1B",a:29,o:78},{n:"Josh Jung",p:"3B",a:27,o:76},{n:"Jonah Heim",p:"C",a:29,o:74},{n:"Wyatt Langford",p:"LF",a:23,o:78},{n:"Leody Taveras",p:"CF",a:26,o:72},{n:"Robbie Grossman",p:"DH",a:35,o:66}],
    ro:[{n:"Jacob deGrom",p:"SP1",a:38,o:80},{n:"Jon Gray",p:"SP2",a:34,o:74},{n:"Kumar Rocker",p:"SP3",a:25,o:74},{n:"Cody Bradford",p:"SP4",a:26,o:70},{n:"Michael Lorenzen",p:"SP5",a:33,o:70}],
    bp:[{n:"Kirby Yates",p:"CL",a:37,o:80},{n:"David Robertson",p:"SU",a:39,o:72},{n:"Grant Anderson",p:"SU",a:28,o:70},{n:"Jonathan Hernandez",p:"MR",a:28,o:70},{n:"Brock Burke",p:"MR",a:28,o:66},{n:"Cole Ragans",p:"MR",a:27,o:74}],
    bench:[{n:"Evan Carter",p:"OF",a:22,o:70},{n:"Travis Jankowski",p:"OF",a:35,o:64},{n:"Andrew Knizner",p:"C",a:30,o:62},{n:"Ezequiel Duran",p:"UT",a:26,o:66}],
    farm:[{n:"Evan Carter",p:"OF",a:22,o:68,pot:86,lvl:"AAA"},{n:"Kumar Rocker",p:"SP",a:25,o:66,pot:82,lvl:"AAA"},{n:"Cole Winn",p:"SP",a:25,o:58,pot:76,lvl:"AAA"},{n:"Ian Moller",p:"C",a:22,o:52,pot:78,lvl:"A"},{n:"Brock Porter",p:"SP",a:22,o:54,pot:82,lvl:"A"}]
  },
  CLE:{
    lu:[{n:"Steven Kwan",p:"CF",a:27,o:82},{n:"Chase DeLauter",p:"RF",a:23,o:74},{n:"Jose Ramirez",p:"3B",a:33,o:92},{n:"Kyle Manzardo",p:"1B",a:24,o:74},{n:"Rhys Hoskins",p:"DH",a:32,o:76},{n:"Angel Martinez",p:"LF",a:22,o:70},{n:"Bo Naylor",p:"C",a:24,o:72},{n:"Gabriel Arias",p:"SS",a:24,o:68},{n:"Brayan Rocchio",p:"2B",a:23,o:70}],
    ro:[{n:"Tanner Bibee",p:"SP1",a:26,o:80},{n:"Gavin Williams",p:"SP2",a:25,o:76},{n:"Carlos Carrasco",p:"SP3",a:38,o:68},{n:"Joey Cantillo",p:"SP4",a:25,o:70},{n:"Ben Lively",p:"SP5",a:32,o:72}],
    bp:[{n:"Emmanuel Clase",p:"CL",a:27,o:92},{n:"Trevor Stephan",p:"SU",a:29,o:74},{n:"Nick Sandlin",p:"SU",a:29,o:72},{n:"Sam Hentges",p:"MR",a:29,o:68},{n:"Hunter Gaddis",p:"MR",a:27,o:70},{n:"Tim Herrin",p:"MR",a:29,o:66}],
    bench:[{n:"David Fry",p:"C",a:29,o:68},{n:"Will Brennan",p:"OF",a:27,o:66},{n:"Ernie Clement",p:"UT",a:29,o:62},{n:"Austin Hedges",p:"C",a:32,o:60}],
    farm:[{n:"Chase DeLauter",p:"OF",a:23,o:66,pot:84,lvl:"AAA"},{n:"Kyle Manzardo",p:"1B",a:24,o:68,pot:82,lvl:"AAA"},{n:"George Valera",p:"OF",a:24,o:60,pot:80,lvl:"AAA"},{n:"Daniel Espino",p:"SP",a:24,o:58,pot:86,lvl:"AA"},{n:"Brayan Rocchio",p:"SS",a:23,o:62,pot:78,lvl:"AAA"}]
  },
  CHW:{
    lu:[{n:"Lenyn Sosa",p:"2B",a:24,o:68},{n:"Andrew Benintendi",p:"LF",a:31,o:74},{n:"Andrew Vaughn",p:"1B",a:27,o:74},{n:"Luis Robert Jr.",p:"CF",a:27,o:82},{n:"Korey Lee",p:"C",a:27,o:68},{n:"Gavin Sheets",p:"DH",a:29,o:68},{n:"Nicky Lopez",p:"SS",a:30,o:66},{n:"Bryan Ramos",p:"3B",a:22,o:68},{n:"Tommy Pham",p:"RF",a:37,o:66}],
    ro:[{n:"Erick Fedde",p:"SP1",a:33,o:72},{n:"Chris Flexen",p:"SP2",a:31,o:68},{n:"Jonathan Cannon",p:"SP3",a:24,o:70},{n:"Davis Martin",p:"SP4",a:28,o:66},{n:"Sean Burke",p:"SP5",a:25,o:68}],
    bp:[{n:"Michael Kopech",p:"CL",a:29,o:76},{n:"Tanner Banks",p:"SU",a:33,o:68},{n:"Jordan Leasure",p:"SU",a:28,o:70},{n:"Jake Diekman",p:"MR",a:37,o:64},{n:"Fraser Ellard",p:"MR",a:27,o:64},{n:"Bryan Shaw",p:"MR",a:37,o:62}],
    bench:[{n:"Zach Remillard",p:"UT",a:30,o:62},{n:"Romy Gonzalez",p:"UT",a:28,o:62},{n:"Seby Zavala",p:"C",a:32,o:60},{n:"Oscar Colas",p:"OF",a:26,o:64}],
    farm:[{n:"Colson Montgomery",p:"SS",a:22,o:58,pot:88,lvl:"AA"},{n:"Noah Schultz",p:"SP",a:21,o:54,pot:84,lvl:"A"},{n:"Bryan Ramos",p:"3B",a:22,o:62,pot:80,lvl:"AAA"},{n:"Oscar Colas",p:"OF",a:26,o:60,pot:74,lvl:"AAA"},{n:"Edgar Quero",p:"C",a:22,o:56,pot:82,lvl:"AA"}]
  },
  DET:{
    lu:[{n:"Gleyber Torres",p:"2B",a:29,o:78},{n:"Parker Meadows",p:"CF",a:25,o:74},{n:"Spencer Torkelson",p:"1B",a:26,o:76},{n:"Kerry Carpenter",p:"LF",a:27,o:76},{n:"Jake Rogers",p:"C",a:30,o:68},{n:"Zach McKinstry",p:"3B",a:30,o:70},{n:"Jace Jung",p:"DH",a:24,o:72},{n:"Trey Sweeney",p:"SS",a:24,o:68},{n:"Matt Vierling",p:"RF",a:29,o:72}],
    ro:[{n:"Tarik Skubal",p:"SP1",a:28,o:92},{n:"Framber Valdez",p:"SP2",a:31,o:84},{n:"Reese Olson",p:"SP3",a:25,o:74},{n:"Jackson Jobe",p:"SP4",a:22,o:76},{n:"Casey Mize",p:"SP5",a:28,o:74}],
    bp:[{n:"Jason Foley",p:"CL",a:29,o:80},{n:"Will Vest",p:"SU",a:30,o:74},{n:"Tyler Holton",p:"SU",a:29,o:74},{n:"Brant Hurter",p:"MR",a:27,o:70},{n:"Joey Wentz",p:"MR",a:26,o:66},{n:"Alex Faedo",p:"MR",a:28,o:68}],
    bench:[{n:"Andy Ibanez",p:"UT",a:32,o:66},{n:"Eric Haase",p:"C",a:32,o:62},{n:"Mark Canha",p:"OF",a:36,o:66},{n:"Gio Urshela",p:"3B",a:33,o:64}],
    farm:[{n:"Jackson Jobe",p:"SP",a:22,o:68,pot:88,lvl:"AAA"},{n:"Colt Keith",p:"2B",a:23,o:64,pot:84,lvl:"AAA"},{n:"Jace Jung",p:"2B",a:24,o:66,pot:80,lvl:"AAA"},{n:"Dylan Smith",p:"SP",a:23,o:56,pot:80,lvl:"AA"},{n:"Ty Madden",p:"SP",a:25,o:58,pot:76,lvl:"AA"}]
  },
  KCR:{
    lu:[{n:"Maikel Garcia",p:"3B",a:25,o:74},{n:"Bobby Witt Jr.",p:"SS",a:25,o:92},{n:"Vinnie Pasquantino",p:"1B",a:27,o:78},{n:"Salvador Perez",p:"C",a:35,o:80},{n:"Isaac Collins",p:"LF",a:27,o:68},{n:"Jonathan India",p:"2B",a:28,o:74},{n:"MJ Melendez",p:"DH",a:26,o:70},{n:"Starling Marte",p:"RF",a:37,o:72},{n:"Dairon Blanco",p:"CF",a:31,o:68}],
    ro:[{n:"Cole Ragans",p:"SP1",a:27,o:82},{n:"Seth Lugo",p:"SP2",a:36,o:78},{n:"Brady Singer",p:"SP3",a:28,o:76},{n:"Kris Bubic",p:"SP4",a:27,o:70},{n:"Michael Wacha",p:"SP5",a:34,o:72}],
    bp:[{n:"James McArthur",p:"CL",a:30,o:80},{n:"Carlos Hernandez",p:"SU",a:28,o:72},{n:"John Schreiber",p:"SU",a:31,o:70},{n:"Dylan Coleman",p:"MR",a:29,o:68},{n:"Walter Pennington",p:"MR",a:27,o:66},{n:"Josh Taylor",p:"MR",a:33,o:64}],
    bench:[{n:"Hunter Dozier",p:"UT",a:32,o:68},{n:"Freddy Fermin",p:"C",a:28,o:64},{n:"Drew Waters",p:"OF",a:26,o:64},{n:"Nick Pratto",p:"1B",a:26,o:64}],
    farm:[{n:"Carter Jensen",p:"C",a:23,o:60,pot:84,lvl:"AA"},{n:"Jac Caglianone",p:"1B",a:22,o:58,pot:86,lvl:"A"},{n:"Cayden Wallace",p:"3B",a:23,o:56,pot:80,lvl:"AA"},{n:"Frank Mozzicato",p:"SP",a:22,o:52,pot:82,lvl:"A"},{n:"Ben Kudrna",p:"SP",a:22,o:54,pot:80,lvl:"A"}]
  },
  MIN:{
    lu:[{n:"Austin Martin",p:"LF",a:26,o:72},{n:"Byron Buxton",p:"CF",a:32,o:82},{n:"Luke Keaschall",p:"2B",a:23,o:70},{n:"Ryan Jeffers",p:"C",a:28,o:76},{n:"Matt Wallner",p:"RF",a:27,o:74},{n:"Josh Bell",p:"DH",a:33,o:72},{n:"Jose Miranda",p:"1B",a:28,o:72},{n:"Royce Lewis",p:"3B",a:26,o:80},{n:"Brooks Lee",p:"SS",a:24,o:72}],
    ro:[{n:"Joe Ryan",p:"SP1",a:28,o:78},{n:"Bailey Ober",p:"SP2",a:28,o:76},{n:"Pablo Lopez",p:"SP3",a:28,o:80},{n:"Zebby Matthews",p:"SP4",a:24,o:70},{n:"Simeon Woods Richardson",p:"SP5",a:23,o:70}],
    bp:[{n:"Jhoan Duran",p:"CL",a:27,o:88},{n:"Griffin Jax",p:"SU",a:31,o:74},{n:"Caleb Thielbar",p:"SU",a:37,o:68},{n:"Steven Okert",p:"MR",a:34,o:66},{n:"Brock Stewart",p:"MR",a:33,o:64},{n:"Cole Sands",p:"MR",a:27,o:68}],
    bench:[{n:"Kyle Farmer",p:"UT",a:34,o:66},{n:"Christian Vazquez",p:"C",a:34,o:64},{n:"Michael A Taylor",p:"OF",a:33,o:64},{n:"Edouard Julien",p:"2B",a:26,o:70}],
    farm:[{n:"Brooks Lee",p:"SS",a:24,o:66,pot:84,lvl:"AAA"},{n:"Emmanuel Rodriguez",p:"OF",a:22,o:58,pot:86,lvl:"AA"},{n:"Noah Miller",p:"SS",a:23,o:56,pot:80,lvl:"A"},{n:"Yasser Mercedes",p:"OF",a:21,o:54,pot:82,lvl:"A"},{n:"Simeon Woods Richardson",p:"SP",a:23,o:62,pot:80,lvl:"AAA"}]
  },
  ATL:{
    lu:[{n:"Ozzie Albies",p:"2B",a:29,o:82},{n:"Ronald Acuna Jr.",p:"RF",a:28,o:92},{n:"Austin Riley",p:"3B",a:28,o:84},{n:"Sean Murphy",p:"C",a:30,o:82},{n:"Matt Olson",p:"1B",a:31,o:84},{n:"Marcell Ozuna",p:"DH",a:35,o:78},{n:"Michael Harris II",p:"CF",a:24,o:82},{n:"Adam Duvall",p:"LF",a:37,o:70},{n:"Orlando Arcia",p:"SS",a:30,o:68}],
    ro:[{n:"Chris Sale",p:"SP1",a:37,o:80},{n:"Spencer Strider",p:"SP2",a:25,o:82},{n:"Reynaldo Lopez",p:"SP3",a:31,o:76},{n:"Spencer Schwellenbach",p:"SP4",a:24,o:74},{n:"Hurston Waldrep",p:"SP5",a:24,o:70}],
    bp:[{n:"Raisel Iglesias",p:"CL",a:34,o:82},{n:"A.J. Minter",p:"SU",a:31,o:76},{n:"Jesse Chavez",p:"SU",a:40,o:68},{n:"Joe Jimenez",p:"MR",a:31,o:70},{n:"Dylan Lee",p:"MR",a:30,o:68},{n:"Pierce Johnson",p:"MR",a:33,o:68}],
    bench:[{n:"Travis d'Arnaud",p:"C",a:36,o:70},{n:"Eli White",p:"OF",a:31,o:62},{n:"Kevin Pillar",p:"OF",a:36,o:60},{n:"Ehire Adrianza",p:"UT",a:35,o:58}],
    farm:[{n:"Hurston Waldrep",p:"SP",a:24,o:64,pot:82,lvl:"AAA"},{n:"Spencer Schwellenbach",p:"SP",a:24,o:66,pot:84,lvl:"AAA"},{n:"Drake Baldwin",p:"C",a:25,o:60,pot:80,lvl:"AA"},{n:"Cade Povich",p:"SP",a:25,o:58,pot:76,lvl:"AAA"},{n:"Justyn-Henry Malloy",p:"OF",a:25,o:60,pot:78,lvl:"AAA"}]
  },
  NYM:{
    lu:[{n:"Juan Soto",p:"RF",a:27,o:96},{n:"Francisco Lindor",p:"SS",a:32,o:88},{n:"Mark Vientos",p:"3B",a:24,o:78},{n:"Pete Alonso",p:"1B",a:31,o:84},{n:"Jesse Winker",p:"LF",a:32,o:74},{n:"Brandon Nimmo",p:"CF",a:33,o:76},{n:"Brett Baty",p:"2B",a:24,o:72},{n:"Francisco Alvarez",p:"C",a:23,o:78},{n:"Tyrone Taylor",p:"DH",a:31,o:70}],
    ro:[{n:"Kodai Senga",p:"SP1",a:32,o:82},{n:"David Peterson",p:"SP2",a:29,o:76},{n:"Sean Manaea",p:"SP3",a:33,o:76},{n:"Clay Holmes",p:"SP4",a:32,o:72},{n:"Paul Blackburn",p:"SP5",a:32,o:70}],
    bp:[{n:"Edwin Diaz",p:"CL",a:31,o:88},{n:"Phil Maton",p:"SU",a:31,o:72},{n:"Adam Ottavino",p:"SU",a:39,o:70},{n:"Danny Young",p:"MR",a:29,o:68},{n:"Jorge Lopez",p:"MR",a:32,o:66},{n:"Tylor Megill",p:"MR",a:29,o:68}],
    bench:[{n:"Jeff McNeil",p:"2B",a:33,o:74},{n:"Omar Narvaez",p:"C",a:33,o:64},{n:"Harrison Bader",p:"OF",a:31,o:68},{n:"DJ Stewart",p:"OF",a:30,o:64}],
    farm:[{n:"Francisco Alvarez",p:"C",a:23,o:72,pot:90,lvl:"AAA"},{n:"Brett Baty",p:"3B",a:24,o:66,pot:82,lvl:"AAA"},{n:"Luisangel Acuna",p:"2B",a:22,o:60,pot:84,lvl:"AAA"},{n:"Kevin Parada",p:"C",a:23,o:58,pot:84,lvl:"AA"},{n:"Jett Williams",p:"SS",a:22,o:56,pot:82,lvl:"AA"}]
  },
  PHI:{
    lu:[{n:"Trea Turner",p:"SS",a:32,o:84},{n:"Kyle Schwarber",p:"LF",a:32,o:84},{n:"Bryce Harper",p:"1B",a:33,o:92},{n:"JT Realmuto",p:"C",a:34,o:84},{n:"Nick Castellanos",p:"RF",a:33,o:76},{n:"Bryson Stott",p:"2B",a:26,o:76},{n:"Alec Bohm",p:"3B",a:28,o:78},{n:"Johan Rojas",p:"CF",a:24,o:70},{n:"Weston Wilson",p:"DH",a:30,o:66}],
    ro:[{n:"Cristopher Sanchez",p:"SP1",a:27,o:80},{n:"Jesus Luzardo",p:"SP2",a:27,o:80},{n:"Aaron Nola",p:"SP3",a:32,o:80},{n:"Taijuan Walker",p:"SP4",a:33,o:70},{n:"Andrew Painter",p:"SP5",a:22,o:74}],
    bp:[{n:"Jose Alvarado",p:"CL",a:29,o:84},{n:"Matt Strahm",p:"SU",a:32,o:76},{n:"Gregory Soto",p:"SU",a:29,o:72},{n:"Seranthony Dominguez",p:"MR",a:30,o:74},{n:"Jeff Hoffman",p:"MR",a:32,o:70},{n:"Connor Brogdon",p:"MR",a:30,o:66}],
    bench:[{n:"Brandon Marsh",p:"OF",a:27,o:72},{n:"Edmundo Sosa",p:"UT",a:29,o:64},{n:"Garrett Stubbs",p:"C",a:32,o:60},{n:"Kody Clemens",p:"UT",a:29,o:62}],
    farm:[{n:"Andrew Painter",p:"SP",a:22,o:66,pot:90,lvl:"AAA"},{n:"Mick Abel",p:"SP",a:23,o:60,pot:84,lvl:"AA"},{n:"Griff McGarry",p:"SP",a:26,o:58,pot:78,lvl:"AAA"},{n:"Hao-Yu Lee",p:"2B",a:23,o:56,pot:78,lvl:"AA"},{n:"Starlyn Caba",p:"SS",a:20,o:50,pot:82,lvl:"A"}]
  },
  MIA:{
    lu:[{n:"Xavier Edwards",p:"2B",a:25,o:72},{n:"Jake Burger",p:"1B",a:29,o:76},{n:"Jesus Sanchez",p:"RF",a:27,o:72},{n:"Bryan De La Cruz",p:"LF",a:28,o:70},{n:"Nick Fortes",p:"C",a:28,o:66},{n:"Connor Norby",p:"3B",a:25,o:68},{n:"Otto Lopez",p:"SS",a:25,o:68},{n:"Dane Myers",p:"CF",a:25,o:66},{n:"Jake Fraley",p:"DH",a:30,o:68}],
    ro:[{n:"Eury Perez",p:"SP1",a:22,o:76},{n:"Sandy Alcantara",p:"SP2",a:30,o:82},{n:"Braxton Garrett",p:"SP3",a:27,o:72},{n:"Edward Cabrera",p:"SP4",a:27,o:72},{n:"Trevor Rogers",p:"SP5",a:28,o:70}],
    bp:[{n:"Tanner Scott",p:"CL",a:30,o:82},{n:"A.J. Puk",p:"SU",a:29,o:76},{n:"Dylan Floro",p:"SU",a:34,o:68},{n:"Steven Okert",p:"MR",a:34,o:64},{n:"Andrew Nardi",p:"MR",a:28,o:68},{n:"George Soriano",p:"MR",a:26,o:64}],
    bench:[{n:"Peyton Burdick",p:"OF",a:28,o:64},{n:"Jon Berti",p:"UT",a:36,o:62},{n:"Nick Gordon",p:"UT",a:29,o:62},{n:"Charles Leblanc",p:"UT",a:30,o:60}],
    farm:[{n:"Eury Perez",p:"SP",a:22,o:68,pot:90,lvl:"AAA"},{n:"Jacob Berry",p:"3B",a:23,o:58,pot:84,lvl:"AA"},{n:"Dax Fulton",p:"SP",a:23,o:56,pot:82,lvl:"AA"},{n:"Nasim Nunez",p:"SS",a:23,o:54,pot:78,lvl:"AA"},{n:"Osiris Johnson",p:"SS",a:21,o:50,pot:80,lvl:"A"}]
  },
  WSN:{
    lu:[{n:"CJ Abrams",p:"SS",a:25,o:78},{n:"James Wood",p:"CF",a:22,o:82},{n:"Nathaniel Lowe",p:"1B",a:29,o:78},{n:"Luis Garcia Jr.",p:"2B",a:23,o:74},{n:"Joey Meneses",p:"DH",a:35,o:72},{n:"Keibert Ruiz",p:"C",a:26,o:74},{n:"Dylan Crews",p:"RF",a:24,o:72},{n:"Eddie Rosario",p:"LF",a:34,o:68},{n:"Trey Lipscomb",p:"3B",a:26,o:66}],
    ro:[{n:"MacKenzie Gore",p:"SP1",a:27,o:78},{n:"DJ Herz",p:"SP2",a:24,o:72},{n:"Mitchell Parker",p:"SP3",a:24,o:70},{n:"Jake Irvin",p:"SP4",a:27,o:70},{n:"Patrick Corbin",p:"SP5",a:36,o:66}],
    bp:[{n:"Kyle Finnegan",p:"CL",a:32,o:78},{n:"Mason Thompson",p:"SU",a:27,o:72},{n:"Victor Arano",p:"SU",a:31,o:68},{n:"Hunter Harvey",p:"MR",a:28,o:72},{n:"Jordan Weems",p:"MR",a:31,o:64},{n:"Erasmo Ramirez",p:"MR",a:35,o:62}],
    bench:[{n:"Alex Call",p:"OF",a:31,o:64},{n:"Stone Garrett",p:"OF",a:29,o:62},{n:"Carter Kieboom",p:"UT",a:27,o:62},{n:"Israel Pineda",p:"C",a:25,o:60}],
    farm:[{n:"James Wood",p:"OF",a:22,o:74,pot:92,lvl:"AAA"},{n:"Dylan Crews",p:"OF",a:24,o:64,pot:84,lvl:"AAA"},{n:"Brady House",p:"SS",a:22,o:56,pot:82,lvl:"AA"},{n:"Cade Cavalli",p:"SP",a:26,o:60,pot:80,lvl:"AAA"},{n:"Elijah Green",p:"OF",a:21,o:52,pot:86,lvl:"A"}]
  },
  CHC:{
    lu:[{n:"Nico Hoerner",p:"2B",a:28,o:80},{n:"Ian Happ",p:"LF",a:31,o:80},{n:"Seiya Suzuki",p:"RF",a:31,o:82},{n:"Cody Bellinger",p:"CF",a:30,o:78},{n:"Michael Busch",p:"1B",a:27,o:76},{n:"Dansby Swanson",p:"SS",a:32,o:78},{n:"Christopher Morel",p:"3B",a:26,o:72},{n:"Miguel Amaya",p:"C",a:25,o:70},{n:"Owen Caissie",p:"DH",a:22,o:70}],
    ro:[{n:"Shota Imanaga",p:"SP1",a:31,o:84},{n:"Matthew Boyd",p:"SP2",a:35,o:74},{n:"Jameson Taillon",p:"SP3",a:33,o:72},{n:"Jordan Wicks",p:"SP4",a:26,o:72},{n:"Colin Rea",p:"SP5",a:35,o:68}],
    bp:[{n:"Hector Neris",p:"CL",a:35,o:74},{n:"Adbert Alzolay",p:"SU",a:29,o:76},{n:"Drew Smyly",p:"SU",a:35,o:66},{n:"Michael Rucker",p:"MR",a:32,o:66},{n:"Luke Little",p:"MR",a:24,o:70},{n:"Ethan Roberts",p:"MR",a:28,o:64}],
    bench:[{n:"Patrick Wisdom",p:"3B",a:33,o:66},{n:"Tomas Nido",p:"C",a:31,o:60},{n:"Nelson Velazquez",p:"OF",a:26,o:64},{n:"Miles Mastrobuoni",p:"UT",a:30,o:60}],
    farm:[{n:"Owen Caissie",p:"OF",a:22,o:62,pot:84,lvl:"AAA"},{n:"Pete Crow-Armstrong",p:"OF",a:22,o:64,pot:86,lvl:"AAA"},{n:"Matt Shaw",p:"3B",a:23,o:58,pot:82,lvl:"AA"},{n:"Kevin Alcantara",p:"OF",a:22,o:56,pot:80,lvl:"AA"},{n:"Cade Horton",p:"SP",a:23,o:58,pot:86,lvl:"AA"}]
  },
  MIL:{
    lu:[{n:"Brice Turang",p:"2B",a:25,o:72},{n:"William Contreras",p:"C",a:27,o:80},{n:"Christian Yelich",p:"DH",a:34,o:80},{n:"Joey Wiemer",p:"RF",a:26,o:70},{n:"Jackson Chourio",p:"LF",a:21,o:78},{n:"Sal Frelick",p:"CF",a:24,o:72},{n:"Jake Bauers",p:"1B",a:28,o:68},{n:"Tyler Black",p:"3B",a:24,o:72},{n:"Willy Adames",p:"SS",a:29,o:80}],
    ro:[{n:"Freddy Peralta",p:"SP1",a:28,o:80},{n:"Brandon Woodruff",p:"SP2",a:32,o:80},{n:"Tobias Myers",p:"SP3",a:26,o:72},{n:"Aaron Civale",p:"SP4",a:30,o:70},{n:"Quinn Priester",p:"SP5",a:24,o:70}],
    bp:[{n:"Devin Williams",p:"CL",a:30,o:88},{n:"Joel Payamps",p:"SU",a:31,o:72},{n:"Hoby Milner",p:"SU",a:34,o:68},{n:"Elvis Peguero",p:"MR",a:27,o:70},{n:"Peter Strzelecki",p:"MR",a:31,o:66},{n:"Jake Cousins",p:"MR",a:31,o:64}],
    bench:[{n:"Owen Miller",p:"UT",a:28,o:64},{n:"Victor Caratini",p:"C",a:30,o:64},{n:"Blake Perkins",p:"OF",a:27,o:62},{n:"Andruw Monasterio",p:"UT",a:27,o:62}],
    farm:[{n:"Jackson Chourio",p:"OF",a:21,o:70,pot:88,lvl:"AAA"},{n:"Sal Frelick",p:"OF",a:24,o:64,pot:82,lvl:"AAA"},{n:"Tyler Black",p:"3B",a:24,o:64,pot:80,lvl:"AAA"},{n:"Hendry Mendez",p:"OF",a:20,o:52,pot:82,lvl:"A"},{n:"Eric Brown Jr.",p:"SS",a:24,o:58,pot:78,lvl:"AA"}]
  },
  STL:{
    lu:[{n:"Masyn Winn",p:"SS",a:23,o:78},{n:"Brendan Donovan",p:"2B",a:28,o:76},{n:"Paul Goldschmidt",p:"1B",a:38,o:80},{n:"Nolan Arenado",p:"3B",a:35,o:84},{n:"Lars Nootbaar",p:"RF",a:27,o:76},{n:"Jordan Walker",p:"LF",a:23,o:76},{n:"Ivan Herrera",p:"C",a:24,o:70},{n:"Thomas Saggese",p:"DH",a:23,o:68},{n:"Victor Scott II",p:"CF",a:24,o:70}],
    ro:[{n:"Miles Mikolas",p:"SP1",a:37,o:70},{n:"Matthew Liberatore",p:"SP2",a:25,o:72},{n:"Lance Lynn",p:"SP3",a:38,o:68},{n:"Sonny Gray",p:"SP4",a:36,o:78},{n:"Andre Pallante",p:"SP5",a:27,o:70}],
    bp:[{n:"Ryan Helsley",p:"CL",a:30,o:88},{n:"JoJo Romero",p:"SU",a:28,o:72},{n:"Andrew Kittredge",p:"SU",a:34,o:70},{n:"Chris Stratton",p:"MR",a:34,o:66},{n:"Keynan Middleton",p:"MR",a:31,o:66},{n:"Zack Thompson",p:"MR",a:27,o:68}],
    bench:[{n:"Alec Burleson",p:"OF",a:26,o:70},{n:"Pedro Pages",p:"C",a:25,o:62},{n:"Jose Fermin",p:"UT",a:26,o:60},{n:"Matt Carpenter",p:"DH",a:39,o:58}],
    farm:[{n:"Jordan Walker",p:"OF",a:23,o:68,pot:84,lvl:"AAA"},{n:"Masyn Winn",p:"SS",a:23,o:70,pot:86,lvl:"AAA"},{n:"Gordon Graceffo",p:"SP",a:25,o:58,pot:78,lvl:"AAA"},{n:"Michael McGreevy",p:"SP",a:25,o:58,pot:76,lvl:"AAA"},{n:"Tink Hence",p:"SP",a:22,o:54,pot:84,lvl:"AA"}]
  },
  PIT:{
    lu:[{n:"Oneil Cruz",p:"SS",a:26,o:80},{n:"Bryan Reynolds",p:"CF",a:30,o:82},{n:"Ji Hwan Bae",p:"LF",a:25,o:72},{n:"Spencer Horwitz",p:"1B",a:28,o:72},{n:"Jared Triolo",p:"3B",a:27,o:68},{n:"Nick Gonzales",p:"2B",a:26,o:70},{n:"Endy Rodriguez",p:"C",a:24,o:70},{n:"Connor Joe",p:"RF",a:32,o:68},{n:"Andrew McCutchen",p:"DH",a:39,o:68}],
    ro:[{n:"Paul Skenes",p:"SP1",a:23,o:90},{n:"Mitch Keller",p:"SP2",a:28,o:78},{n:"Braxton Ashcraft",p:"SP3",a:24,o:72},{n:"Bubba Chandler",p:"SP4",a:22,o:72},{n:"Marco Gonzales",p:"SP5",a:33,o:68}],
    bp:[{n:"David Bednar",p:"CL",a:31,o:82},{n:"Ryan Borucki",p:"SU",a:31,o:70},{n:"Colin Holderman",p:"SU",a:30,o:70},{n:"Dauri Moreta",p:"MR",a:28,o:68},{n:"Josh Fleming",p:"MR",a:28,o:64},{n:"Luis Ortiz",p:"MR",a:26,o:66}],
    bench:[{n:"Jack Suwinski",p:"OF",a:27,o:66},{n:"Billy Cook",p:"UT",a:25,o:60},{n:"Carlos Santana",p:"1B",a:39,o:62},{n:"Michael Perez",p:"C",a:33,o:58}],
    farm:[{n:"Paul Skenes",p:"SP",a:23,o:82,pot:96,lvl:"AAA"},{n:"Bubba Chandler",p:"SP",a:22,o:60,pot:84,lvl:"AA"},{n:"Henry Davis",p:"C",a:24,o:58,pot:84,lvl:"AAA"},{n:"Jared Jones",p:"SP",a:23,o:62,pot:82,lvl:"AAA"},{n:"Termarr Johnson",p:"2B",a:21,o:56,pot:86,lvl:"AA"}]
  },
  CIN:{
    lu:[{n:"Elly De La Cruz",p:"SS",a:23,o:84},{n:"Matt McLain",p:"2B",a:25,o:76},{n:"Tyler Stephenson",p:"C",a:28,o:76},{n:"Jonathan India",p:"3B",a:28,o:74},{n:"TJ Friedl",p:"CF",a:30,o:72},{n:"Will Benson",p:"RF",a:27,o:70},{n:"Christian Encarnacion-Strand",p:"1B",a:25,o:72},{n:"Jake Fraley",p:"LF",a:30,o:70},{n:"Jeimer Candelario",p:"DH",a:31,o:72}],
    ro:[{n:"Hunter Greene",p:"SP1",a:25,o:82},{n:"Nick Lodolo",p:"SP2",a:27,o:76},{n:"Andrew Abbott",p:"SP3",a:26,o:74},{n:"Frankie Montas",p:"SP4",a:32,o:70},{n:"Connor Phillips",p:"SP5",a:24,o:70}],
    bp:[{n:"Alexis Diaz",p:"CL",a:28,o:82},{n:"Buck Farmer",p:"SU",a:34,o:70},{n:"Fernando Cruz",p:"SU",a:33,o:70},{n:"Tony Santillan",p:"MR",a:27,o:66},{n:"Ian Gibaut",p:"MR",a:31,o:64},{n:"Casey Legumina",p:"MR",a:27,o:64}],
    bench:[{n:"Stuart Fairchild",p:"OF",a:29,o:62},{n:"Matt Reynolds",p:"UT",a:34,o:60},{n:"Luke Maile",p:"C",a:33,o:58},{n:"Eric Yang",p:"OF",a:25,o:58}],
    farm:[{n:"Elly De La Cruz",p:"SS",a:23,o:76,pot:92,lvl:"AAA"},{n:"Edwin Arroyo",p:"SS",a:22,o:58,pot:84,lvl:"AA"},{n:"Cam Collier",p:"3B",a:20,o:52,pot:86,lvl:"A"},{n:"Connor Phillips",p:"SP",a:24,o:62,pot:78,lvl:"AAA"},{n:"Rhett Lowder",p:"SP",a:23,o:56,pot:82,lvl:"AA"}]
  },
  LAD:{
    lu:[{n:"Shohei Ohtani",p:"DH",a:31,o:99},{n:"Mookie Betts",p:"SS",a:33,o:92},{n:"Freddie Freeman",p:"1B",a:36,o:90},{n:"Teoscar Hernandez",p:"RF",a:32,o:80},{n:"Will Smith",p:"C",a:30,o:82},{n:"Max Muncy",p:"3B",a:34,o:76},{n:"Kike Hernandez",p:"2B",a:34,o:72},{n:"Tommy Edman",p:"CF",a:30,o:76},{n:"Andy Pages",p:"LF",a:24,o:74}],
    ro:[{n:"Yoshinobu Yamamoto",p:"SP1",a:27,o:90},{n:"Tyler Glasnow",p:"SP2",a:31,o:86},{n:"Clayton Kershaw",p:"SP3",a:38,o:76},{n:"James Paxton",p:"SP4",a:37,o:70},{n:"Bobby Miller",p:"SP5",a:26,o:74}],
    bp:[{n:"Evan Phillips",p:"CL",a:31,o:84},{n:"Alex Vesia",p:"SU",a:29,o:78},{n:"Anthony Banda",p:"SU",a:31,o:72},{n:"Brusdar Graterol",p:"MR",a:26,o:76},{n:"Joe Kelly",p:"MR",a:36,o:68},{n:"Ryan Brasier",p:"MR",a:37,o:64}],
    bench:[{n:"Chris Taylor",p:"UT",a:34,o:66},{n:"Austin Barnes",p:"C",a:36,o:60},{n:"Enrique Hernandez",p:"UT",a:34,o:64},{n:"Jason Heyward",p:"OF",a:36,o:58}],
    farm:[{n:"Andy Pages",p:"OF",a:24,o:66,pot:82,lvl:"AAA"},{n:"Diego Cartaya",p:"C",a:23,o:58,pot:86,lvl:"AA"},{n:"Dalton Rushing",p:"C",a:24,o:60,pot:84,lvl:"AAA"},{n:"Nick Frasso",p:"SP",a:26,o:58,pot:80,lvl:"AA"},{n:"River Ryan",p:"SP",a:26,o:60,pot:78,lvl:"AAA"}]
  },
  SDP:{
    lu:[{n:"Xander Bogaerts",p:"SS",a:33,o:80},{n:"Manny Machado",p:"3B",a:33,o:86},{n:"Fernando Tatis Jr.",p:"RF",a:27,o:88},{n:"Jake Cronenworth",p:"1B",a:31,o:76},{n:"Ha-Seong Kim",p:"2B",a:30,o:78},{n:"Luis Arraez",p:"DH",a:29,o:84},{n:"Kyle Higashioka",p:"C",a:34,o:68},{n:"Jose Azocar",p:"CF",a:29,o:66},{n:"David Peralta",p:"LF",a:37,o:66}],
    ro:[{n:"Michael King",p:"SP1",a:29,o:82},{n:"Dylan Cease",p:"SP2",a:30,o:84},{n:"Yu Darvish",p:"SP3",a:39,o:76},{n:"Matt Waldron",p:"SP4",a:27,o:72},{n:"Randy Vasquez",p:"SP5",a:25,o:68}],
    bp:[{n:"Robert Suarez",p:"CL",a:32,o:84},{n:"Yuki Matsui",p:"SU",a:33,o:74},{n:"Nick Martinez",p:"SU",a:35,o:70},{n:"Steven Wilson",p:"MR",a:29,o:68},{n:"Tom Cosgrove",p:"MR",a:29,o:66},{n:"Ray Kerr",p:"MR",a:30,o:64}],
    bench:[{n:"Trent Grisham",p:"OF",a:29,o:70},{n:"Rougned Odor",p:"UT",a:31,o:60},{n:"Webster Rivas",p:"C",a:30,o:58},{n:"Matthew Batten",p:"UT",a:29,o:58}],
    farm:[{n:"Jackson Merrill",p:"OF",a:22,o:70,pot:88,lvl:"AAA"},{n:"Samuel Zavala",p:"OF",a:20,o:52,pot:84,lvl:"A"},{n:"Ethan Salas",p:"C",a:19,o:50,pot:90,lvl:"A"},{n:"Robby Snelling",p:"SP",a:20,o:52,pot:86,lvl:"A"},{n:"Victor Lizarraga",p:"SP",a:22,o:56,pot:80,lvl:"AA"}]
  },
  SFG:{
    lu:[{n:"Matt Chapman",p:"3B",a:32,o:80},{n:"Rafael Devers",p:"DH",a:29,o:88},{n:"Willy Adames",p:"SS",a:29,o:80},{n:"Jung Hoo Lee",p:"RF",a:27,o:78},{n:"Heliot Ramos",p:"LF",a:25,o:74},{n:"Patrick Bailey",p:"C",a:26,o:74},{n:"LaMonte Wade Jr.",p:"1B",a:31,o:70},{n:"Thairo Estrada",p:"2B",a:30,o:70},{n:"Luis Matos",p:"CF",a:23,o:68}],
    ro:[{n:"Logan Webb",p:"SP1",a:28,o:82},{n:"Robbie Ray",p:"SP2",a:34,o:76},{n:"Kyle Harrison",p:"SP3",a:24,o:74},{n:"Mason Black",p:"SP4",a:24,o:70},{n:"Hayden Birdsong",p:"SP5",a:24,o:70}],
    bp:[{n:"Camilo Doval",p:"CL",a:27,o:82},{n:"Tyler Rogers",p:"SU",a:34,o:70},{n:"Ryan Walker",p:"SU",a:29,o:72},{n:"Sean Hjelle",p:"MR",a:27,o:64},{n:"Tristan Beck",p:"MR",a:28,o:64},{n:"Randy Rodriguez",p:"MR",a:26,o:66}],
    bench:[{n:"Mike Yastrzemski",p:"OF",a:34,o:66},{n:"Curt Casali",p:"C",a:36,o:58},{n:"Wilmer Flores",p:"UT",a:32,o:68},{n:"Joc Pederson",p:"DH",a:34,o:68}],
    farm:[{n:"Marco Luciano",p:"SS",a:23,o:60,pot:86,lvl:"AAA"},{n:"Kyle Harrison",p:"SP",a:24,o:66,pot:82,lvl:"AAA"},{n:"Vaun Brown",p:"OF",a:26,o:60,pot:78,lvl:"AAA"},{n:"Tyler Fitzgerald",p:"SS",a:27,o:62,pot:76,lvl:"AAA"},{n:"Grant McCray",p:"OF",a:24,o:54,pot:80,lvl:"AA"}]
  },
  COL:{
    lu:[{n:"Ezequiel Tovar",p:"SS",a:24,o:74},{n:"Brenton Doyle",p:"CF",a:27,o:72},{n:"Ryan McMahon",p:"3B",a:29,o:74},{n:"Nolan Jones",p:"RF",a:26,o:70},{n:"Hunter Goodman",p:"C",a:26,o:66},{n:"Michael Toglia",p:"1B",a:26,o:66},{n:"Elehuris Montero",p:"DH",a:26,o:66},{n:"Alan Trejo",p:"2B",a:28,o:64},{n:"Zac Veen",p:"LF",a:23,o:66}],
    ro:[{n:"Kyle Freeland",p:"SP1",a:33,o:70},{n:"Austin Gomber",p:"SP2",a:30,o:68},{n:"Cal Quantrill",p:"SP3",a:30,o:70},{n:"Ryan Feltner",p:"SP4",a:28,o:66},{n:"Antonio Senzatela",p:"SP5",a:30,o:66}],
    bp:[{n:"Daniel Bard",p:"CL",a:39,o:70},{n:"Yency Almonte",p:"SU",a:31,o:66},{n:"Justin Lawrence",p:"SU",a:30,o:66},{n:"Ashton Goudeau",p:"MR",a:32,o:62},{n:"Tyler Kinley",p:"MR",a:34,o:62},{n:"Jake Bird",p:"MR",a:29,o:64}],
    bench:[{n:"Charlie Blackmon",p:"DH",a:39,o:64},{n:"Elias Diaz",p:"C",a:33,o:62},{n:"Sam Hilliard",p:"OF",a:31,o:60},{n:"Connor Joe",p:"OF",a:32,o:60}],
    farm:[{n:"Zac Veen",p:"OF",a:23,o:60,pot:86,lvl:"AAA"},{n:"Drew Romo",p:"C",a:23,o:56,pot:80,lvl:"AA"},{n:"Adael Amador",p:"SS",a:22,o:56,pot:82,lvl:"AA"},{n:"Gabriel Hughes",p:"SP",a:23,o:56,pot:80,lvl:"AA"},{n:"Sterlin Thompson",p:"OF",a:25,o:58,pot:76,lvl:"AAA"}]
  },
  ARI:{
    lu:[{n:"Ketel Marte",p:"2B",a:32,o:86},{n:"Geraldo Perdomo",p:"SS",a:25,o:72},{n:"Lourdes Gurriel Jr.",p:"LF",a:31,o:74},{n:"Corbin Carroll",p:"CF",a:24,o:84},{n:"Christian Walker",p:"1B",a:33,o:80},{n:"Eugenio Suarez",p:"3B",a:34,o:74},{n:"Gabriel Moreno",p:"C",a:25,o:78},{n:"Pavin Smith",p:"RF",a:29,o:68},{n:"Joc Pederson",p:"DH",a:34,o:68}],
    ro:[{n:"Zac Gallen",p:"SP1",a:30,o:82},{n:"Ryne Nelson",p:"SP2",a:28,o:74},{n:"Eduardo Rodriguez",p:"SP3",a:32,o:74},{n:"Brandon Pfaadt",p:"SP4",a:26,o:74},{n:"Merrill Kelly",p:"SP5",a:36,o:72}],
    bp:[{n:"Paul Sewald",p:"CL",a:34,o:78},{n:"Kevin Ginkel",p:"SU",a:31,o:74},{n:"Miguel Castro",p:"SU",a:30,o:70},{n:"Kyle Nelson",p:"MR",a:29,o:68},{n:"Scott McGough",p:"MR",a:36,o:66},{n:"Noe Ramirez",p:"MR",a:34,o:62}],
    bench:[{n:"Alek Thomas",p:"OF",a:25,o:68},{n:"Jose Herrera",p:"C",a:28,o:62},{n:"Blaze Alexander",p:"UT",a:27,o:60},{n:"Evan Longoria",p:"3B",a:39,o:58}],
    farm:[{n:"Druw Jones",p:"OF",a:21,o:56,pot:90,lvl:"A"},{n:"Jordan Lawlar",p:"SS",a:22,o:60,pot:88,lvl:"AA"},{n:"Deyvison De Los Santos",p:"3B",a:21,o:54,pot:84,lvl:"A"},{n:"Brandon Pfaadt",p:"SP",a:26,o:66,pot:80,lvl:"AAA"},{n:"Slade Cecconi",p:"SP",a:25,o:62,pot:76,lvl:"AAA"}]
  },
};

const TEAMS = [
  {a:"NYY",n:"Yankees",c:"New York",d:"AL East",lg:"AL",p:220},
  {a:"BOS",n:"Red Sox",c:"Boston",d:"AL East",lg:"AL",p:185},
  {a:"TBR",n:"Rays",c:"Tampa Bay",d:"AL East",lg:"AL",p:95},
  {a:"TOR",n:"Blue Jays",c:"Toronto",d:"AL East",lg:"AL",p:155},
  {a:"BAL",n:"Orioles",c:"Baltimore",d:"AL East",lg:"AL",p:130},
  {a:"HOU",n:"Astros",c:"Houston",d:"AL West",lg:"AL",p:180},
  {a:"LAA",n:"Angels",c:"Los Angeles",d:"AL West",lg:"AL",p:120},
  {a:"OAK",n:"Athletics",c:"Oakland",d:"AL West",lg:"AL",p:80},
  {a:"SEA",n:"Mariners",c:"Seattle",d:"AL West",lg:"AL",p:135},
  {a:"TEX",n:"Rangers",c:"Texas",d:"AL West",lg:"AL",p:160},
  {a:"CLE",n:"Guardians",c:"Cleveland",d:"AL Central",lg:"AL",p:95},
  {a:"CHW",n:"White Sox",c:"Chicago",d:"AL Central",lg:"AL",p:70},
  {a:"DET",n:"Tigers",c:"Detroit",d:"AL Central",lg:"AL",p:150},
  {a:"KCR",n:"Royals",c:"Kansas City",d:"AL Central",lg:"AL",p:105},
  {a:"MIN",n:"Twins",c:"Minnesota",d:"AL Central",lg:"AL",p:115},
  {a:"ATL",n:"Braves",c:"Atlanta",d:"NL East",lg:"NL",p:195},
  {a:"NYM",n:"Mets",c:"New York",d:"NL East",lg:"NL",p:210},
  {a:"PHI",n:"Phillies",c:"Philadelphia",d:"NL East",lg:"NL",p:195},
  {a:"MIA",n:"Marlins",c:"Miami",d:"NL East",lg:"NL",p:65},
  {a:"WSN",n:"Nationals",c:"Washington",d:"NL East",lg:"NL",p:85},
  {a:"CHC",n:"Cubs",c:"Chicago",d:"NL Central",lg:"NL",p:155},
  {a:"MIL",n:"Brewers",c:"Milwaukee",d:"NL Central",lg:"NL",p:105},
  {a:"STL",n:"Cardinals",c:"St. Louis",d:"NL Central",lg:"NL",p:145},
  {a:"PIT",n:"Pirates",c:"Pittsburgh",d:"NL Central",lg:"NL",p:75},
  {a:"CIN",n:"Reds",c:"Cincinnati",d:"NL Central",lg:"NL",p:95},
  {a:"LAD",n:"Dodgers",c:"Los Angeles",d:"NL West",lg:"NL",p:265},
  {a:"SDP",n:"Padres",c:"San Diego",d:"NL West",lg:"NL",p:180},
  {a:"SFG",n:"Giants",c:"San Francisco",d:"NL West",lg:"NL",p:150},
  {a:"COL",n:"Rockies",c:"Colorado",d:"NL West",lg:"NL",p:80},
  {a:"ARI",n:"D-backs",c:"Arizona",d:"NL West",lg:"NL",p:120},
];

const FN=["Luis","Carlos","Miguel","Jose","Juan","Alex","David","Jorge","Angel","Diego","Marco","Roberto","Ty","Bo","Jake","Chase","Cole","Blake","Reid","Drew","Mason","Ethan","Noah","Liam"];
const LN=["Rivera","Santos","Garcia","Lopez","Martinez","Torres","Reyes","Flores","Castro","Mendez","Ramirez","Perez","Morales","Chavez","Ortega","Jimenez","Alvarez","Romero","Vega","Cruz"];

function rnd(a,b){return Math.floor(Math.random()*(b-a+1))+a;}
function pick(arr){return arr[Math.floor(Math.random()*arr.length)];}
function uid(){return Math.random().toString(36).slice(2,8);}
function gn(){return pick(FN)+" "+pick(LN);}
function oc(o){return o>=85?"#4fc76a":o>=75?"#4a9de8":o>=65?"#c9a84c":"#888";}
function ord(n){return n===1?"st":n===2?"nd":n===3?"rd":"th";}

function genDraftBoard(){
  return Array.from({length:20},(_,i)=>({
    id:uid(),rank:i+1,name:gn(),
    pos:Math.random()>.45?pick(["SP","RP"]):pick(["C","1B","2B","3B","SS","LF","CF","RF"]),
    potential:rnd(62,99),age:rnd(18,22),drafted:false
  }));
}
function buildSched(abbr){
  const opps=TEAMS.filter(t=>t.a!==abbr);
  const s=[];
  for(let w=1;w<=27;w++){
    const cnt=rnd(5,7);
    for(let g=0;g<cnt&&s.length<162;g++){
      const opp=opps[rnd(0,opps.length-1)];
      s.push({week:w,opp:opp.a,home:Math.random()>.5,result:null,mS:0,oS:0,played:false});
    }
  }
  return s.slice(0,162);
}
function initStandings(myAbbr){
  const divs=["AL East","AL West","AL Central","NL East","NL West","NL Central"];
  const st={};
  divs.forEach(d=>{st[d]=[];});
  TEAMS.forEach(t=>{st[t.d].push({a:t.a,n:t.n,w:0,l:0,isMe:t.a===myAbbr});});
  return st;
}
function enrichPlayer(p,isSP){
  const sal=p.o>=85?rnd(18,36):p.o>=75?rnd(8,18):rnd(2,8);
  if(isSP){
    return{...p,id:uid(),salary:sal,years:rnd(1,3),
      era:(rnd(p.o>=82?185:310,p.o>=82?320:510)/100).toFixed(2),
      fip:(rnd(p.o>=82?195:320,p.o>=82?330:510)/100).toFixed(2),
      k9:(rnd(p.o>=82?88:52,140)/10).toFixed(1),
      war:(rnd(p.o>=82?20:3,p.o>=82?78:22)/10).toFixed(1),
      fatigue:0,used:false};
  }
  return{...p,id:uid(),salary:sal,years:rnd(1,4),
    avg:(rnd(230,310)/1000).toFixed(3),hr:rnd(p.o>=85?18:4,p.o>=85?45:25),
    opsPlus:rnd(p.o>=85?118:78,p.o>=85?178:118),
    war:(rnd(p.o>=85?28:4,p.o>=85?88:28)/10).toFixed(1)};
}
function enrichBP(p){
  return{...p,id:uid(),salary:rnd(1,14),years:rnd(1,3),fatigue:0,used:false,
    era:(rnd(p.o>=78?195:295,p.o>=78?330:480)/100).toFixed(2),saves:p.p==="CL"?rnd(5,40):0};
}
function enrichFarm(p){
  return{...p,id:uid(),progress:rnd(15,70),eta:p.lvl==="AAA"?1:p.lvl==="AA"?2:3,
    trainPts:0,focus:null};
}

const C={
  app:{background:"#0a1220",minHeight:"100vh",fontFamily:"-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif",color:"#d4c9a8",display:"flex",flexDirection:"column"},
  top:{background:"#060e1a",borderBottom:"1px solid #7a6030",padding:"0 14px",display:"flex",alignItems:"center",gap:10,height:44,flexShrink:0,position:"sticky",top:0,zIndex:10},
  logo:{fontSize:12,fontWeight:600,letterSpacing:"0.1em",color:"#c9a84c"},
  nav:{background:"#060e1a",display:"flex",borderBottom:"1px solid #1e3558",position:"sticky",top:44,zIndex:10,overflowX:"auto",padding:"0 6px"},
  nb:(on)=>({background:"none",border:"none",borderBottom:on?"2px solid #c9a84c":"2px solid transparent",color:on?"#c9a84c":"#4a5d7a",padding:"9px 10px",fontSize:11,cursor:"pointer",whiteSpace:"nowrap",letterSpacing:"0.04em",fontFamily:"inherit"}),
  pg:{flex:1,padding:12,maxWidth:960,width:"100%",margin:"0 auto"},
  tt:{fontSize:10,color:"#4a5d7a",letterSpacing:"0.08em",textTransform:"uppercase",margin:"10px 0 7px"},
  card:{background:"#111d30",border:"1px solid #1e3558",borderRadius:6},
  tbox:{background:"#111d30",border:"1px solid #1e3558",borderRadius:6,overflow:"hidden",marginBottom:10},
  th:{textAlign:"left",fontSize:10,fontWeight:500,color:"#4a5d7a",padding:"5px 7px",borderBottom:"1px solid #1e3558",whiteSpace:"nowrap"},
  td:{padding:"6px 7px",borderBottom:"1px solid #1e3558",fontSize:12,color:"#d4c9a8"},
  btn:(pri,sm)=>({background:pri?"#c9a84c":"#16263d",color:pri?"#060e1a":"#d4c9a8",border:pri?"none":"1px solid #1e3558",padding:sm?"4px 9px":"7px 13px",borderRadius:5,fontSize:sm?10:11,cursor:"pointer",fontFamily:"inherit",fontWeight:pri?500:400,margin:2}),
  btnGrn:{background:"#1a5c2a",color:"#9fe8b0",border:"none",padding:"4px 9px",borderRadius:4,fontSize:10,cursor:"pointer",fontFamily:"inherit",margin:2},
  pb:{display:"inline-block",fontSize:9,fontWeight:500,padding:"1px 4px",borderRadius:3,background:"#16263d",color:"#8ab4e8"},
  sg:{display:"grid",gridTemplateColumns:"repeat(5,1fr)",gap:8,marginBottom:12},
  sc:{background:"#111d30",borderRadius:6,padding:"10px 11px"},
};

// Training focus options
const TRAIN_OPTS={
  hitter:[{k:"contact",l:"Contact",stat:"avg"},{k:"power",l:"Power",stat:"hr"},{k:"eye",l:"Plate Eye",stat:"opsPlus"},{k:"overall",l:"Overall",stat:"o"}],
  pitcher:[{k:"velocity",l:"Velocity",stat:"k9"},{k:"control",l:"Control",stat:"era"},{k:"stuff",l:"Stuff",stat:"fip"},{k:"overall",l:"Overall",stat:"o"}],
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
  const [lineup,setLineup]=useState([]);
  const [rotation,setRotation]=useState([]);
  const [bullpen,setBullpen]=useState([]);
  const [bench,setBench]=useState([]);
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
  const [trainWeekPts,setTrainWeekPts]=useState(10); // points to allocate per week
  const wR=useRef(0),lR=useRef(0),stR=useRef({});

  function toast(msg){setNotif(msg);setTimeout(()=>setNotif(""),2600);}

  function makeFA(){
    return Array.from({length:8},()=>{
      const isSP=Math.random()>.5;
      return{id:uid(),name:gn(),pos:isSP?pick(["SP","RP"]):pick(["C","1B","2B","3B","SS","LF","CF","RF"]),o:rnd(58,88),age:rnd(24,36),salary:rnd(2,28),years:rnd(1,4)};
    });
  }
  function makeOffers(lu,mt){
    const opps=TEAMS.filter(t=>t.a!==mt.a);
    return Array.from({length:3},()=>({
      id:uid(),myPlayer:lu[rnd(0,lu.length-1)],
      theirName:gn(),theirPos:pick(["C","1B","2B","3B","SS","LF","CF","RF"]),
      theirOvr:rnd(62,92),oppTeam:opps[rnd(0,opps.length-1)]
    }));
  }

  function startFranchise(){
    if(!myTeam){alert("Pick a team first.");return;}
    const real=ROSTERS[myTeam.a];
    const lu=real.lu.map(p=>enrichPlayer(p,false));
    const ro=real.ro.map(p=>enrichPlayer(p,true));
    const bp=real.bp.map(p=>enrichBP(p));
    const bn=real.bench.map(p=>({...enrichPlayer(p,false),id:uid()}));
    const fm=real.farm.map(p=>enrichFarm(p));
    const db=genDraftBoard();
    const sched=buildSched(myTeam.a);
    const st=initStandings(myTeam.a);
    setLineup(lu);setRotation(ro);setBullpen(bp);setBench(bn);setFarm(fm);
    setDraftBoard(db);setSchedule(sched);setStandings(st);stR.current=st;
    setWins(0);setLosses(0);wR.current=0;lR.current=0;
    setWeek(1);setStarted(true);setTab("roster");setTrainWeekPts(10);
    setTradeOffers(makeOffers(lu,myTeam));setFaList(makeFA());
    toast("Welcome to the "+season+" season — "+myTeam.c+" "+myTeam.n+"!");
  }

  // ── GAME ENGINE (pure functional) ────────────────────────────────────────
  function loadGame(idx){
    const g=schedule[idx];
    if(!g||g.played){toast("Already played.");return;}
    const opp=TEAMS.find(t=>t.a===g.opp)||TEAMS[0];
    const oppOvr=Math.round((opp.p/265)*30+55);
    setGame({myHome:g.home,homeA:g.home?myTeam.a:opp.a,awayA:g.home?opp.a:myTeam.a,
      hS:0,aS:0,inn:1,top:true,outs:0,bases:[false,false,false],
      pitchCount:0,sp:{...rotation[0]},oppOvr,sidx:idx,gameOver:false,batIdx:0});
    setPbp([{msg:"Game ready — press Pitch to play.",cls:""}]);
    setTab("game");
  }

  function stepAB(g,myOvr,bp){
    if(!g||g.gameOver)return null;
    const myBat=(g.myHome&&!g.top)||(!g.myHome&&g.top);
    const offOvr=myBat?myOvr:g.oppOvr;
    const defOvr=g.sp?g.sp.o:70;
    const fp=Math.max(0,(g.pitchCount-60)*0.003);
    const hrP=0.032+(offOvr/100)*0.018;
    const hitP=Math.max(0.08,0.27+(offOvr-defOvr)*0.003-fp);
    const wkP=0.085+fp;
    const kP=0.22-(offOvr-defOvr)*0.002+fp*0.4;
    const r=Math.random();
    const innStr=(g.top?"▲":"▽")+g.inn;
    const bTeam=g.top?g.awayA:g.homeA;
    const logs=[];
    let hS=g.hS,aS=g.aS,bases=[...g.bases],outs=g.outs;
    let pitchCount=g.pitchCount+rnd(3,7),batIdx=(g.batIdx||0)+1,sp=g.sp;
    let newBp=[...bp],runs=0;
    if(r<hrP){
      let ct=1;bases.forEach(b=>{if(b)ct++;});bases=[false,false,false];runs=ct;
      logs.push({msg:`${innStr} ${bTeam} — HOME RUN! ${ct} run${ct>1?"s":""} score.`,cls:"sc"});
    }else if(r<hrP+hitP){
      const ht=Math.random()<0.58?"Single":Math.random()<0.6?"Double":"Triple";
      if(ht==="Single"){if(bases[2])runs++;bases=[true,bases[0],bases[1]];}
      else if(ht==="Double"){if(bases[2])runs++;if(bases[1])runs++;bases=[false,true,bases[0]];}
      else{bases.forEach(b=>{if(b)runs++;});bases=[false,false,true];}
      logs.push({msg:`${innStr} ${bTeam} — ${ht}.${runs?` ${runs} run${runs>1?"s":""} score.`:""}`,cls:runs?"sc":"h"});
    }else if(r<hrP+hitP+wkP){
      if(bases[0]&&bases[1]&&bases[2]){runs=1;logs.push({msg:`${innStr} ${bTeam} — Walk, RBI.`,cls:"h"});}
      else{bases=[true,...bases.slice(0,2)];logs.push({msg:`${innStr} ${bTeam} — Walk.`,cls:""});}
    }else if(r<hrP+hitP+wkP+kP){
      outs++;logs.push({msg:`${innStr} ${bTeam} — Strikeout.`,cls:"o"});
    }else{
      outs++;logs.push({msg:`${innStr} ${bTeam} — ${Math.random()<.5?"Groundout":"Flyout"}.`,cls:"o"});
    }
    if(g.top)aS+=runs;else hS+=runs;
    if(pitchCount>85&&Math.random()>0.65&&!myBat){
      const avail=newBp.filter(b=>!b.used&&b.fatigue<70);
      if(avail.length){
        const ri=newBp.findIndex(b=>b.id===avail[0].id);
        newBp[ri]={...newBp[ri],used:true,fatigue:newBp[ri].fatigue+30};
        sp=newBp[ri];pitchCount=0;
        logs.push({msg:`⇄ ${sp.name} enters.`,cls:"e"});
      }
    }
    let inn=g.inn,top=g.top,gameOver=false;
    if(outs>=3){
      outs=0;bases=[false,false,false];
      if(top)top=false;else{inn++;top=true;pitchCount=0;}
      if((inn>9&&hS!==aS)||inn>12)gameOver=true;
    }
    return{newGame:{...g,hS,aS,bases,outs,inn,top,pitchCount,batIdx,sp,gameOver},logs,newBp,gameOver};
  }

  function commitGameEnd(g,allLogs,finalBp){
    const myWin=(g.myHome&&g.hS>g.aS)||(!g.myHome&&g.aS>g.hS);
    const mS=g.myHome?g.hS:g.aS,oS=g.myHome?g.aS:g.hS;
    const nW=wR.current+(myWin?1:0),nL=lR.current+(myWin?0:1);
    wR.current=nW;lR.current=nL;
    setPbp([{msg:`FINAL: ${g.homeA} ${g.hS} — ${g.awayA} ${g.aS}. ${myWin?"WIN! 🎉":"Loss."}`,cls:myWin?"sc":"o"},...allLogs].slice(0,80));
    setGame({...g,gameOver:true});setBullpen(finalBp);setWins(nW);setLosses(nL);
    setSchedule(prev=>prev.map((s,i)=>i===g.sidx?{...s,played:true,result:myWin?"W":"L",mS,oS}:s));
    setStandings(prev=>{
      const next={};
      Object.entries(prev).forEach(([div,teams])=>{
        next[div]=teams.map(t=>{
          if(t.isMe)return{...t,w:nW,l:nL};
          const w=rnd(0,1);return{...t,w:t.w+w,l:t.l+(1-w)};
        }).sort((a,b)=>b.w-a.w||(a.l-b.l));
      });
      stR.current=next;return next;
    });
    toast(myWin?"Victory!":"Tough loss.");
  }

  function simOnePitch(){
    if(!game||game.gameOver)return;
    const myOvr=Math.round(lineup.reduce((s,p)=>s+p.o,0)/lineup.length);
    const res=stepAB(game,myOvr,bullpen);if(!res)return;
    if(res.gameOver)commitGameEnd(res.newGame,res.logs,res.newBp);
    else{setGame(res.newGame);setBullpen(res.newBp);setPbp(prev=>[...res.logs,...prev].slice(0,80));}
  }
  function simHalf(){
    if(!game||game.gameOver)return;
    const myOvr=Math.round(lineup.reduce((s,p)=>s+p.o,0)/lineup.length);
    let g=game,bp=[...bullpen],allLogs=[];const st=g.top;
    for(let i=0;i<60&&!g.gameOver&&g.top===st;i++){
      const res=stepAB(g,myOvr,bp);if(!res)break;
      allLogs=[...res.logs,...allLogs];g=res.newGame;bp=res.newBp;
      if(res.gameOver){commitGameEnd(g,allLogs,bp);return;}
    }
    setGame(g);setBullpen(bp);setPbp(prev=>[...allLogs,...prev].slice(0,80));
  }
  function simFull(){
    if(!game||game.gameOver)return;
    const myOvr=Math.round(lineup.reduce((s,p)=>s+p.o,0)/lineup.length);
    let g=game,bp=[...bullpen],allLogs=[];
    for(let i=0;i<400&&!g.gameOver;i++){
      const res=stepAB(g,myOvr,bp);if(!res)break;
      allLogs=[...res.logs,...allLogs];g=res.newGame;bp=res.newBp;
      if(res.gameOver){commitGameEnd(g,allLogs,bp);return;}
    }
    setGame(g);setBullpen(bp);setPbp(prev=>[...allLogs,...prev].slice(0,80));
  }
  function nextGame(){
    const idx=schedule.findIndex(g=>!g.played);
    if(idx<0){toast("Season over! Check Playoffs.");return;}
    loadGame(idx);
  }
  function bullpenChange(){
    const avail=bullpen.filter(b=>!b.used&&b.fatigue<80);
    if(!avail.length){toast("No fresh arms.");return;}
    const newBp=bullpen.map(b=>b.id===avail[0].id?{...b,used:true,fatigue:b.fatigue+35}:b);
    setBullpen(newBp);setGame(g=>({...g,sp:newBp.find(b=>b.id===avail[0].id),pitchCount:0}));
    setPbp(prev=>[{msg:`⇄ Manual: ${avail[0].name} enters.`,cls:"e"},...prev].slice(0,80));
    toast(`${avail[0].name} pitching.`);
  }

  // ── SEASON SIM ────────────────────────────────────────────────────────────
  function simWeek(){
    const wg=schedule.filter(g=>!g.played&&g.week===week);
    if(!wg.length){
      const nw=Math.min(27,week+1);setWeek(nw);
      if(nw>27)runPlayoffs();else toast(`Week ${nw}`);return;
    }
    const oppMap={};TEAMS.forEach(t=>{oppMap[t.a]=Math.round((t.p/265)*30+55);});
    const myOvr=Math.round(rotation.reduce((s,p)=>s+p.o,0)/rotation.length*0.55+lineup.reduce((s,p)=>s+p.o,0)/lineup.length*0.45);
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
    const nW=wR.current+addW,nL=lR.current+addL;
    wR.current=nW;lR.current=nL;
    setWins(nW);setLosses(nL);setSchedule(newSched);
    // Advance farm prospects automatically each week
    advanceFarmWeek();
    setStandings(prev=>{
      const next={};
      Object.entries(prev).forEach(([div,teams])=>{
        next[div]=teams.map(t=>{
          if(t.isMe)return{...t,w:nW,l:nL};
          const gp=addW+addL;
          const tw=Array.from({length:gp},()=>rnd(0,1)).reduce((a,b)=>a+b,0);
          return{...t,w:t.w+tw,l:t.l+(gp-tw)};
        }).sort((a,b)=>b.w-a.w||(a.l-b.l));
      });
      stR.current=next;return next;
    });
    const nw=Math.min(27,week+1);setWeek(nw);
    setTrainWeekPts(10); // reset training points each week
    if(nw>27)runPlayoffs();else toast(`Week ${week} done: ${addW}W-${addL}L`);
  }
  function simSeason(){let w=week;while(w<=27){simWeek();w++;}}

  // ── FARM DEVELOPMENT ──────────────────────────────────────────────────────
  function advanceFarmWeek(){
    setFarm(prev=>prev.map(p=>{
      // Base weekly progress (varies by level — lower levels develop slower)
      const base=p.lvl==="A"?rnd(1,4):p.lvl==="AA"?rnd(2,5):rnd(1,3);
      const newProgress=Math.min(100,p.progress+base);
      let newOvr=p.currentOvr,newLvl=p.lvl;
      // OVR creeps toward potential at a slow rate
      if(Math.random()<0.15) newOvr=Math.min(p.pot,newOvr+1);
      // Level promotion at progress milestones
      if(newProgress>=100&&p.lvl==="A") newLvl="AA";
      else if(newProgress>=100&&p.lvl==="AA") newLvl="AAA";
      return{...p,progress:newProgress>=100?10:newProgress,lvl:newLvl,currentOvr:newOvr};
    }));
  }

  function applyTraining(id,focus,pts){
    if(trainWeekPts<pts){toast(`Not enough training points (${trainWeekPts} left)`);return;}
    setFarm(prev=>prev.map(p=>{
      if(p.id!==id)return p;
      // Training boosts: progress + chance to boost relevant stat
      const progressGain=pts*4;
      const newProgress=Math.min(99,p.progress+progressGain);
      let newOvr=p.currentOvr;
      const ovrGain=Math.random()<(pts*0.15)?1:0;
      newOvr=Math.min(p.pot,newOvr+ovrGain);
      return{...p,progress:newProgress,currentOvr:newOvr,focus,trainPts:(p.trainPts||0)+pts};
    }));
    setTrainWeekPts(prev=>prev-pts);
    toast(`Training applied — ${pts}pts on ${focus}`);
  }

  function callUp(id){
    const p=farm.find(x=>x.id===id);if(!p)return;
    const isSP=p.pos==="SP"||p.pos==="RP";
    if(isSP){setRotation(prev=>prev.map((r,i)=>i===4?{...enrichPlayer({...p,o:p.currentOvr},true),id:p.id}:r));}
    else{setLineup(prev=>prev.map(r=>r.p===p.pos?{...enrichPlayer({...p,o:p.currentOvr},false),id:p.id,p:p.pos}:r));}
    setFarm(prev=>prev.filter(x=>x.id!==id));
    toast(`${p.n} called up to the majors!`);
  }

  // ── GM ────────────────────────────────────────────────────────────────────
  function acceptTrade(offer){
    setLineup(prev=>prev.map(p=>p.id===offer.myPlayer.id?{...p,n:offer.theirName,p:offer.theirPos,o:offer.theirOvr,avg:(rnd(230,310)/1000).toFixed(3),hr:rnd(5,30),opsPlus:rnd(80,130),war:(rnd(5,60)/10).toFixed(1)}:p));
    setTradeOffers(prev=>prev.filter(o=>o.id!==offer.id));
    toast("Trade accepted! "+offer.theirName+" joins the team.");
  }
  function signFA(fa){
    if(fa.pos==="SP"||fa.pos==="RP"){setRotation(prev=>prev.map((p,i)=>i===4?{...p,n:fa.name,o:fa.o,a:fa.age,salary:fa.salary,years:fa.years}:p));}
    else{setLineup(prev=>prev.map(p=>p.p===fa.pos?{...p,n:fa.name,o:fa.o,a:fa.age,salary:fa.salary,years:fa.years}:p));}
    setFaList(prev=>prev.filter(f=>f.id!==fa.id));
    toast(`Signed ${fa.name} — $${fa.salary}M/${fa.years}yr`);
  }
  function draftPick(id){
    const p=draftBoard.find(x=>x.id===id);if(!p)return;
    setDraftBoard(prev=>prev.map(x=>x.id===id?{...x,drafted:true}:x));
    setFarm(prev=>[...prev,{id:uid(),n:p.name,pos:p.pos,lvl:"A",pot:p.potential,currentOvr:rnd(40,65),age:p.age,progress:rnd(15,35),eta:3,trainPts:0,focus:null}]);
    toast(`Drafted ${p.name} → Farm!`);
  }

  // ── PLAYOFFS ──────────────────────────────────────────────────────────────
  function runPlayoffs(){
    let qual=[];
    Object.values(stR.current).forEach(div=>{if(div[0])qual.push(div[0]);if(div[1])qual.push(div[1]);});
    qual.sort((a,b)=>b.w-a.w);qual=qual.slice(0,8);
    function sim(a,b){const ap=a.w/(a.w+a.l+1),bp2=b.w/(b.w+b.l+1);return Math.random()<ap/(ap+bp2)?{win:a,sc:`${rnd(3,4)}-${rnd(0,2)}`}:{win:b,sc:`${rnd(3,4)}-${rnd(0,2)}`};}
    const ds=[sim(qual[0],qual[7]||qual[0]),sim(qual[1],qual[6]||qual[1]),sim(qual[2],qual[5]||qual[2]),sim(qual[3],qual[4]||qual[3])];
    const cs=[sim(ds[0].win,ds[1].win),sim(ds[2].win,ds[3].win)];
    const ws=sim(cs[0].win,cs[1].win);
    setChampion(ws.win);setPlayoffs({qual,ds,cs,ws});setTab("playoff");
    toast("Playoffs set! "+ws.win.a+" are World Series Champions!");
  }

  function nextSeason(){
    setHistory(prev=>[...prev,{season,w:wins,l:losses,result:champion?`Champs: ${champion.a}`:wins>=90?"Playoff contender":"Below .500"}]);
    setSeason(s=>s+1);setWins(0);setLosses(0);wR.current=0;lR.current=0;setWeek(1);setChampion(null);setPlayoffs(null);
    setLineup(prev=>prev.map(p=>({...p,a:p.a+1,years:Math.max(0,(p.years||1)-1),o:p.a>32?Math.max(40,p.o-rnd(0,3)):p.a<=27?Math.min(99,p.o+rnd(0,2)):p.o})));
    setRotation(prev=>prev.map(p=>({...p,a:p.a+1,years:Math.max(0,(p.years||1)-1),o:p.a>33?Math.max(40,p.o-rnd(0,3)):p.a<=27?Math.min(99,p.o+rnd(0,2)):p.o})));
    setFarm(prev=>prev.map(p=>{
      const np={...p,age:(p.age||20)+1};
      // End-of-season bigger development jump
      const jump=rnd(3,10);
      np.currentOvr=Math.min(np.pot,np.currentOvr+jump);
      np.progress=Math.min(99,np.progress+rnd(10,25));
      if(np.lvl==="A"&&np.progress>75)np.lvl="AA";
      else if(np.lvl==="AA"&&np.progress>85)np.lvl="AAA";
      return np;
    }));
    const st=initStandings(myTeam.a);setStandings(st);stR.current=st;
    setSchedule(buildSched(myTeam.a));setDraftBoard(genDraftBoard());
    setTradeOffers(makeOffers(lineup,myTeam));setFaList(makeFA());setTrainWeekPts(10);
    setTab("roster");toast(`Welcome to the ${season+1} season!`);
  }

  // ── RENDER ────────────────────────────────────────────────────────────────
  const OVR=({o})=><span style={{color:oc(o),fontWeight:500}}>{o}</span>;
  const PB=({children})=><span style={C.pb}>{children}</span>;
  const pay=[...lineup,...rotation,...bullpen].reduce((s,p)=>s+(p.salary||0),0);
  const war=[...lineup,...rotation].reduce((s,p)=>s+parseFloat(p.war||0),0).toFixed(1);
  const wrc=lineup.length?Math.round(lineup.reduce((s,p)=>s+(p.opsPlus||100),0)/lineup.length):100;
  const fip=rotation.length?(rotation.reduce((s,p)=>s+parseFloat(p.fip||4.0),0)/rotation.length).toFixed(2):"—";
  const tot=wins+losses;const pct=tot>0?(wins/tot).toFixed(3):"—";

  // ── TEAM SELECT SCREEN ────────────────────────────────────────────────────
  if(!started){return(
    <div style={C.app}>
      {notif&&<div style={{position:"fixed",bottom:16,right:16,background:"#c9a84c",color:"#060e1a",padding:"8px 14px",borderRadius:5,fontSize:11,fontWeight:500,zIndex:999}}>{notif}</div>}
      <div style={C.top}><span style={C.logo}>⚾ FRANCHISE GM 2026</span></div>
      <div style={{...C.pg,paddingTop:16}}>
        <div style={C.tt}>Choose your franchise — 2026 season</div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(5,1fr)",gap:7,marginTop:8}}>
          {TEAMS.map(t=>(
            <div key={t.a} onClick={()=>setMyTeam(t)}
              style={{...C.card,padding:"9px 7px",cursor:"pointer",textAlign:"center",
                border:myTeam?.a===t.a?"2px solid #c9a84c":"1px solid #1e3558",
                background:myTeam?.a===t.a?"#1a1500":"#111d30"}}>
              <div style={{fontSize:15,fontWeight:600,color:"#d4c9a8"}}>{t.a}</div>
              <div style={{fontSize:9,color:"#4a5d7a",marginTop:2,lineHeight:1.3}}>{t.c} {t.n}</div>
              <div style={{fontSize:8,color:"#4a5d7a",opacity:.5,marginTop:1}}>{t.d}</div>
            </div>
          ))}
        </div>
        {myTeam&&(
          <div style={{...C.card,padding:14,marginTop:14,maxWidth:420}}>
            <div style={{fontSize:13,fontWeight:600,color:"#c9a84c",marginBottom:8}}>{myTeam.c} {myTeam.n} — 40-Man Roster Preview</div>
            <div style={{fontSize:11,color:"#8a9bbf",marginBottom:6}}>Starting lineup</div>
            {ROSTERS[myTeam.a].lu.map((p,i)=><div key={i} style={{fontSize:11,color:"#d4c9a8",padding:"2px 0",borderBottom:"1px solid #1e3558",display:"flex",justifyContent:"space-between"}}><span><PB>{p.p}</PB> {p.n}</span><OVR o={p.o}/></div>)}
            <div style={{fontSize:11,color:"#8a9bbf",margin:"8px 0 4px"}}>Rotation</div>
            {ROSTERS[myTeam.a].ro.map((p,i)=><div key={i} style={{fontSize:11,color:"#d4c9a8",padding:"2px 0",borderBottom:"1px solid #1e3558",display:"flex",justifyContent:"space-between"}}><span>{p.n}</span><OVR o={p.o}/></div>)}
          </div>
        )}
        <button style={{...C.btn(true),marginTop:14,padding:"10px 24px",letterSpacing:"0.06em"}} onClick={startFranchise}>Start Franchise →</button>
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
      <div style={C.nav}>
        {TABS.map(([id,label])=><button key={id} style={C.nb(tab===id)} onClick={()=>setTab(id)}>{label}</button>)}
      </div>
      <div style={C.pg}>

        {/* ── ROSTER ── */}
        {tab==="roster"&&<div>
          <div style={C.sg}>
            {[["TEAM WAR",war,"Lg avg 38.1"],["wRC+",wrc,"Offense"],["FIP",fip,"Rotation"],[`RECORD`,`${wins}-${losses}`,pct],["PAYROLL",`$${pay}M`,pay>189?"Luxury tax":"Under cap"]].map(([l,v,s])=>(
              <div key={l} style={C.sc}><div style={{fontSize:10,color:"#4a5d7a",marginBottom:3}}>{l}</div><div style={{fontSize:18,fontWeight:500,color:"#d4c9a8"}}>{v}</div><div style={{fontSize:10,color:"#4a5d7a",marginTop:2}}>{s}</div></div>
            ))}
          </div>
          <div style={{display:"flex",gap:2,marginBottom:10,borderBottom:"1px solid #1e3558"}}>
            {[["lineup","Lineup"],["rotation","Rotation"],["bullpen","Bullpen"],["bench","Bench"]].map(([id,label])=>(
              <button key={id} style={{background:"none",border:"none",borderBottom:rosterTab===id?"2px solid #c9a84c":"2px solid transparent",color:rosterTab===id?"#c9a84c":"#4a5d7a",padding:"6px 10px",fontSize:11,cursor:"pointer",fontFamily:"inherit"}} onClick={()=>setRosterTab(id)}>{label}</button>
            ))}
          </div>
          {rosterTab==="lineup"&&<div style={C.tbox}><table style={{width:"100%",borderCollapse:"collapse"}}>
            <thead><tr>{["Pos","Player","OVR","Age","AVG","HR","OPS+","WAR","Contract"].map(h=><th key={h} style={C.th}>{h}</th>)}</tr></thead>
            <tbody>{lineup.map(p=><tr key={p.id}><td style={C.td}><PB>{p.p}</PB></td><td style={C.td}>{p.n}</td><td style={C.td}><OVR o={p.o}/></td><td style={C.td}>{p.a}</td><td style={C.td}>{p.avg}</td><td style={C.td}>{p.hr}</td><td style={C.td}>{p.opsPlus}</td><td style={C.td}>{p.war}</td><td style={{...C.td,fontSize:10,color:"#4a5d7a"}}>${p.salary}M/{p.years}yr</td></tr>)}</tbody>
          </table></div>}
          {rosterTab==="rotation"&&<div style={C.tbox}><table style={{width:"100%",borderCollapse:"collapse"}}>
            <thead><tr>{["Pos","Pitcher","OVR","Age","ERA","FIP","K/9","WAR","Contract"].map(h=><th key={h} style={C.th}>{h}</th>)}</tr></thead>
            <tbody>{rotation.map(p=><tr key={p.id}><td style={C.td}><PB>{p.p}</PB></td><td style={C.td}>{p.n}</td><td style={C.td}><OVR o={p.o}/></td><td style={C.td}>{p.a}</td><td style={C.td}>{p.era}</td><td style={C.td}>{p.fip}</td><td style={C.td}>{p.k9}</td><td style={C.td}>{p.war}</td><td style={{...C.td,fontSize:10,color:"#4a5d7a"}}>${p.salary}M/{p.years}yr</td></tr>)}</tbody>
          </table></div>}
          {rosterTab==="bullpen"&&<div style={C.tbox}><table style={{width:"100%",borderCollapse:"collapse"}}>
            <thead><tr>{["Role","Pitcher","OVR","Age","ERA","Saves","Fatigue"].map(h=><th key={h} style={C.th}>{h}</th>)}</tr></thead>
            <tbody>{bullpen.map(p=><tr key={p.id}><td style={C.td}><PB>{p.p}</PB></td><td style={C.td}>{p.name}</td><td style={C.td}><OVR o={p.o}/></td><td style={C.td}>{p.age}</td><td style={C.td}>{p.era}</td><td style={C.td}>{p.saves||0}</td><td style={C.td}><div style={{height:4,background:"#1e3558",borderRadius:2,width:60}}><div style={{height:4,width:`${p.fatigue}%`,background:p.fatigue>60?"#c04040":p.fatigue>30?"#c0a030":"#4fc76a",borderRadius:2}}/></div></td></tr>)}</tbody>
          </table></div>}
          {rosterTab==="bench"&&<div style={C.tbox}><table style={{width:"100%",borderCollapse:"collapse"}}>
            <thead><tr>{["Pos","Player","OVR","Age","Contract"].map(h=><th key={h} style={C.th}>{h}</th>)}</tr></thead>
            <tbody>{bench.map(p=><tr key={p.id}><td style={C.td}><PB>{p.p}</PB></td><td style={C.td}>{p.n}</td><td style={C.td}><OVR o={p.o}/></td><td style={C.td}>{p.a}</td><td style={{...C.td,fontSize:10,color:"#4a5d7a"}}>${p.salary}M/{p.years}yr</td></tr>)}</tbody>
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
            <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:20,padding:"14px 0 8px"}}>
              <div style={{textAlign:"center"}}><div style={{fontSize:22,fontWeight:600,color:"#d4c9a8"}}>{game.awayA}</div><div style={{fontSize:11,color:"#4a5d7a"}}>Away</div></div>
              <div style={{textAlign:"center"}}>
                <div style={{fontSize:30,fontWeight:600,color:"#c9a84c",letterSpacing:"0.08em"}}>{game.aS} – {game.hS}</div>
                <div style={{fontSize:11,color:"#4a5d7a",marginTop:3}}>{game.gameOver?"FINAL":`${game.top?"▲":"▽"}${game.inn}${ord(game.inn)} • ${game.outs} out${game.outs!==1?"s":""}`}</div>
              </div>
              <div style={{textAlign:"center"}}><div style={{fontSize:22,fontWeight:600,color:"#d4c9a8"}}>{game.homeA}</div><div style={{fontSize:11,color:"#4a5d7a"}}>Home</div></div>
            </div>
            <div style={{display:"flex",justifyContent:"center",gap:24,marginBottom:8}}>
              <div>
                <div style={{display:"flex",gap:5,marginBottom:5,justifyContent:"center"}}>{[0,1,2].map(i=><div key={i} style={{width:9,height:9,borderRadius:"50%",border:"1.5px solid #1e3558",background:i<game.outs?"#c04040":"transparent"}}/>)}</div>
                <div style={{position:"relative",width:66,height:66}}>
                  {[[28,2,1],[2,28,2],[52,28,0]].map(([l,t,bi])=>(
                    <div key={bi} style={{position:"absolute",width:11,height:11,border:"1.5px solid #1e3558",transform:"rotate(45deg)",background:game.bases[bi]?"#c9a84c":"#111d30",left:l,top:t}}/>
                  ))}
                  <div style={{position:"absolute",width:11,height:11,border:"1.5px solid #1e3558",transform:"rotate(45deg)",background:"#111d30",left:28,bottom:2}}/>
                </div>
              </div>
              <div style={{fontSize:11,color:"#4a5d7a",paddingTop:4}}>
                {game.sp&&<><div>P: {game.sp.n||game.sp.name}</div><div style={{marginTop:6}}>Fatigue {Math.min(100,Math.round(game.pitchCount*1.1))}%<div style={{width:70,height:3,background:"#1e3558",borderRadius:2,marginTop:2}}><div style={{height:3,width:`${Math.min(100,Math.round(game.pitchCount*1.1))}%`,background:game.pitchCount>70?"#c04040":game.pitchCount>40?"#c0a030":"#4fc76a",borderRadius:2}}/></div></div></>}
                {((game.myHome&&!game.top)||(!game.myHome&&game.top))&&lineup.length&&<div style={{marginTop:4}}>AB: {lineup[game.batIdx%lineup.length]?.n}</div>}
              </div>
            </div>
            <div style={{background:"#111d30",borderRadius:5,padding:8,height:130,overflowY:"auto",fontSize:12,marginBottom:8}}>
              {pbp.map((l,i)=><div key={i} style={{padding:"2px 0",borderBottom:"1px solid #1e3558",color:l.cls==="sc"?"#c9a84c":l.cls==="h"?"#4fc76a":l.cls==="o"?"#4a5d7a":l.cls==="e"?"#e8c040":"#d4c9a8"}}>{l.msg}</div>)}
            </div>
            <div style={{display:"flex",gap:6,justifyContent:"center",flexWrap:"wrap"}}>
              <button style={C.btn(false)} onClick={simOnePitch}>⊳ Pitch</button>
              <button style={C.btn(false)} onClick={simHalf}>⊳⊳ Half inning</button>
              <button style={C.btn(true)} onClick={simFull}>⊳⊳⊳ Full game</button>
              <button style={C.btn(false)} onClick={bullpenChange}>🔄 Pitching change</button>
              <button style={C.btn(false)} onClick={nextGame}>Next game</button>
            </div>
          </>:<div style={{textAlign:"center",padding:"40px 20px",color:"#4a5d7a"}}>
            <div style={{marginBottom:12}}>Select a game from Schedule, or load the next unplayed game.</div>
            <button style={C.btn(true)} onClick={nextGame}>Load next game →</button>
          </div>}
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
                <div style={{marginTop:8,display:"flex",gap:6}}><button style={C.btnGrn} onClick={()=>acceptTrade(offer)}>Accept</button><button style={C.btn(false,true)} onClick={()=>setTradeOffers(prev=>prev.filter(o=>o.id!==offer.id))}>Decline</button></div>
              </div>
            ))}
            {!tradeOffers.length&&<div style={{fontSize:12,color:"#4a5d7a"}}>No pending offers.</div>}
            <button style={{...C.btn(false,true),marginTop:10}} onClick={()=>setTradeOffers(makeOffers(lineup,myTeam))}>Refresh offers</button>
          </div>}
          {gmTab==="fa"&&<div>
            <div style={C.tbox}><table style={{width:"100%",borderCollapse:"collapse"}}>
              <thead><tr>{["Player","Pos","OVR","Age","Ask",""].map(h=><th key={h} style={C.th}>{h}</th>)}</tr></thead>
              <tbody>{faList.map(f=><tr key={f.id}><td style={C.td}>{f.name}</td><td style={C.td}><PB>{f.pos}</PB></td><td style={C.td}><OVR o={f.o}/></td><td style={C.td}>{f.age}</td><td style={C.td}>${f.salary}M/{f.years}yr</td><td style={C.td}><button style={C.btn(true,true)} onClick={()=>signFA(f)}>Sign</button></td></tr>)}</tbody>
            </table></div>
            <button style={{...C.btn(false,true),marginTop:8}} onClick={()=>setFaList(makeFA())}>Refresh market</button>
          </div>}
          {gmTab==="contracts"&&<div>
            <div style={C.tbox}><table style={{width:"100%",borderCollapse:"collapse"}}>
              <thead><tr>{["Player","Pos","OVR","Age","Salary","Years","Status"].map(h=><th key={h} style={C.th}>{h}</th>)}</tr></thead>
              <tbody>{[...lineup,...rotation,...bullpen].map((p,i)=><tr key={p.id||i}><td style={C.td}>{p.n||p.name}</td><td style={C.td}><PB>{p.p||p.role}</PB></td><td style={C.td}><OVR o={p.o||p.ovr}/></td><td style={C.td}>{p.a||p.age}</td><td style={C.td}>${p.salary||1}M</td><td style={C.td}>{p.years||1}yr</td><td style={{...C.td,color:(p.years||1)<=1?"#e05050":"#4fc76a",fontSize:10}}>{(p.years||1)<=1?"Expiring":"Active"}</td></tr>)}</tbody>
            </table></div>
          </div>}
        </div>}

        {/* ── DRAFT ── */}
        {tab==="draft"&&<div>
          <div style={{fontSize:11,color:"#4a5d7a",marginBottom:10}}>Amateur draft — picks go to your farm system.</div>
          {draftBoard.filter(p=>!p.drafted).map(p=>(
            <div key={p.id} style={{...C.card,padding:10,marginBottom:7,display:"flex",alignItems:"center",gap:10}}>
              <span style={{fontSize:11,color:"#4a5d7a",width:24,flexShrink:0}}>#{p.rank}</span>
              <div style={{flex:1}}><div style={{fontSize:13,fontWeight:500,color:"#d4c9a8"}}>{p.name}</div><div style={{fontSize:10,color:"#4a5d7a"}}>{p.pos} • Age {p.age}</div></div>
              <div style={{flex:1}}><div style={{fontSize:10,color:"#4a5d7a"}}>Ceiling: <OVR o={p.potential}/></div></div>
              <button style={C.btn(true,true)} onClick={()=>draftPick(p.id)}>Draft</button>
            </div>
          ))}
          {!draftBoard.filter(p=>!p.drafted).length&&<div style={{fontSize:12,color:"#4a5d7a"}}>Draft class complete.</div>}
        </div>}

        {/* ── FARM & TRAINING ── */}
        {tab==="farm"&&<div>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10}}>
            <div style={{fontSize:11,color:"#4a5d7a"}}>Minor league pipeline — players auto-develop each week</div>
            <div style={{background:"#111d30",border:"1px solid #7a6030",borderRadius:5,padding:"5px 10px",fontSize:11,color:"#c9a84c"}}>🎓 Training pts: <strong>{trainWeekPts}</strong> / week</div>
          </div>
          {["AAA","AA","A"].map(lvl=>{
            const players=farm.filter(p=>p.lvl===lvl);
            if(!players.length)return null;
            return<div key={lvl}>
              <div style={C.tt}>{lvl} — {lvl==="AAA"?"Triple-A (call-up eligible)":lvl==="AA"?"Double-A":"Single-A"}</div>
              {players.map(p=>{
                const isSP=p.pos==="SP"||p.pos==="RP";
                const trainOpts=isSP?TRAIN_OPTS.pitcher:TRAIN_OPTS.hitter;
                return<div key={p.id} style={{...C.card,padding:12,marginBottom:8}}>
                  <div style={{display:"flex",alignItems:"flex-start",gap:12,flexWrap:"wrap"}}>
                    <div style={{flex:1,minWidth:160}}>
                      <div style={{fontSize:13,fontWeight:500,color:"#d4c9a8"}}>{p.n}</div>
                      <div style={{fontSize:10,color:"#4a5d7a",marginTop:2}}>{p.pos} • Age {p.age||"?"} • ETA {p.eta}yr</div>
                      <div style={{fontSize:10,color:"#4a5d7a",marginTop:4}}>
                        OVR <OVR o={p.currentOvr}/> → Ceiling <OVR o={p.pot}/>
                      </div>
                    </div>
                    <div style={{flex:1,minWidth:160}}>
                      <div style={{fontSize:10,color:"#4a5d7a",marginBottom:4}}>Development progress</div>
                      <div style={{height:6,background:"#1e3558",borderRadius:3,marginBottom:6}}>
                        <div style={{height:6,background:"#7a6030",borderRadius:3,width:`${p.progress}%`,transition:"width 0.3s"}}/>
                      </div>
                      <div style={{fontSize:10,color:"#4a5d7a"}}>{p.progress}% — auto-advances {p.lvl==="A"?"to AA at 100%":p.lvl==="AA"?"to AAA at 100%":"ready to call up"}</div>
                    </div>
                    <div style={{minWidth:200}}>
                      <div style={{fontSize:10,color:"#4a5d7a",marginBottom:5}}>Weekly training focus</div>
                      <div style={{display:"flex",flexWrap:"wrap",gap:4,marginBottom:6}}>
                        {trainOpts.map(opt=>(
                          <button key={opt.k} style={{...C.btn(p.focus===opt.k,true),background:p.focus===opt.k?"#7a6030":"#16263d",color:p.focus===opt.k?"#e8d5a3":"#8a9bbf"}} onClick={()=>applyTraining(p.id,opt.l,2)}>
                            {opt.l} <span style={{opacity:.7}}>(2pts)</span>
                          </button>
                        ))}
                        <button style={{...C.btn(false,true),background:"#1a2f52",color:"#c9a84c",borderColor:"#7a6030"}} onClick={()=>applyTraining(p.id,"Intensive",5)}>
                          Intensive <span style={{opacity:.7}}>(5pts)</span>
                        </button>
                      </div>
                      {p.focus&&<div style={{fontSize:10,color:"#c9a84c"}}>Last focus: {p.focus} • Total: {p.trainPts||0}pts spent</div>}
                    </div>
                  </div>
                  {lvl==="AAA"&&<div style={{marginTop:8,borderTop:"1px solid #1e3558",paddingTop:8}}>
                    <button style={{...C.btn(true,true),background:"#1a5c2a",color:"#9fe8b0"}} onClick={()=>callUp(p.id)}>⬆ Call up to majors</button>
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
                <tbody>{teams.map((t,i)=>{
                  const tt=t.w+t.l,p2=tt>0?(t.w/tt).toFixed(3):"—";
                  const ldr=teams[0],gb=i===0?"—":((ldr.w-t.w+t.l-ldr.l)/2).toFixed(1);
                  return<tr key={t.a} style={{background:t.isMe?"#1a1500":"transparent"}}>
                    <td style={{...C.td,fontWeight:500,color:t.isMe?"#e8d5a3":"#d4c9a8"}}>{t.a}{i===1&&<span style={{fontSize:9,color:"#c9a84c",marginLeft:3}}>WC</span>}</td>
                    <td style={{...C.td,textAlign:"right"}}>{t.w}</td><td style={{...C.td,textAlign:"right"}}>{t.l}</td>
                    <td style={{...C.td,textAlign:"right",color:"#8a9bbf"}}>{p2}</td><td style={{...C.td,textAlign:"right"}}>{gb}</td>
                  </tr>;})}
                </tbody>
              </table></div>
            </div>
          ))}
        </div>}

        {/* ── PLAYOFFS ── */}
        {tab==="playoff"&&<div>
          {playoffs?<>
            <div style={{fontSize:13,color:"#c9a84c",fontWeight:500,marginBottom:10}}>🏆 {season} World Series Champion: {playoffs.ws.win.a} — {playoffs.ws.win.n}</div>
            {playoffs.qual.find(t=>t.isMe)?<div style={{fontSize:12,color:"#4fc76a",marginBottom:12}}>Your team made the postseason!</div>:<div style={{fontSize:12,color:"#4a5d7a",marginBottom:12}}>Your team missed the playoffs this year.</div>}
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
              <span style={{color:"#c9a84c",fontWeight:500}}>{h.season}</span>
              <span>{h.w}-{h.l}</span>
              <span style={{color:"#8a9bbf"}}>{h.result}</span>
            </div>
          )):<div style={{fontSize:12,color:"#4a5d7a"}}>No completed seasons yet.</div>}
          <div style={{...C.tt,marginTop:16}}>Player development & aging</div>
          {[...lineup,...rotation].map((p,i)=>(
            <div key={p.id||i} style={{display:"flex",alignItems:"center",gap:8,padding:"5px 0",borderBottom:"1px solid #1e3558",fontSize:12}}>
              <span style={{flex:1,color:"#d4c9a8"}}>{p.n||p.name}</span><PB>{p.p||p.pos}</PB><OVR o={p.o||p.ovr}/>
              <span style={{fontSize:11,color:(p.a||p.age)<=27?"#4fc76a":(p.a||p.age)>32?"#e05050":"#4a9de8"}}>Age {p.a||p.age} {(p.a||p.age)<=27?"▲":(p.a||p.age)>32?"▼":""}</span>
            </div>
          ))}
          {playoffs&&<button style={{...C.btn(true),marginTop:16}} onClick={nextSeason}>Start {season+1} season →</button>}
        </div>}

      </div>
    </div>
  );
}
