var documenterSearchIndex = {"docs":
[{"location":"define/#Define-Problem-Statement","page":"Define Problem","title":"Define Problem Statement","text":"","category":"section"},{"location":"define/","page":"Define Problem","title":"Define Problem","text":"Religion, sports, social gatherings are one of those things, which bring people together, spread joy and love.","category":"page"},{"location":"define/","page":"Define Problem","title":"Define Problem","text":"","category":"page"},{"location":"define/","page":"Define Problem","title":"Define Problem","text":"Imagine sight of thousands of people taking bath at Holy Ganges. (Image: Holy Ganges)","category":"page"},{"location":"define/","page":"Define Problem","title":"Define Problem","text":"Celebrating Dussehra together. The festival that marks the victory of good over evil. (Image: Dussehra)","category":"page"},{"location":"define/","page":"Define Problem","title":"Define Problem","text":"so is sports, being at Lakers game. (Image: Dussehra)","category":"page"},{"location":"define/","page":"Define Problem","title":"Define Problem","text":"watching Croatia, France Final in 2018, even though I never visited either of these countries. (Image: Dussehra)","category":"page"},{"location":"define/","page":"Define Problem","title":"Define Problem","text":"Being at Theme park or concert Or just simply having a barbecue or watching movie with friends & family.","category":"page"},{"location":"define/","page":"Define Problem","title":"Define Problem","text":"","category":"page"},{"location":"define/","page":"Define Problem","title":"Define Problem","text":"HOWEVER...","category":"page"},{"location":"define/","page":"Define Problem","title":"Define Problem","text":"sometimes, being together can be a nightmare ...","category":"page"},{"location":"define/","page":"Define Problem","title":"Define Problem","text":"","category":"page"},{"location":"define/","page":"Define Problem","title":"Define Problem","text":"(Image: RailTrack)","category":"page"},{"location":"define/","page":"Define Problem","title":"Define Problem","text":"(Image: RailTrack)","category":"page"},{"location":"define/","page":"Define Problem","title":"Define Problem","text":"(Image: RailTrack)","category":"page"},{"location":"define/","page":"Define Problem","title":"Define Problem","text":"(Image: RailTrack)","category":"page"},{"location":"define/","page":"Define Problem","title":"Define Problem","text":"","category":"page"},{"location":"define/","page":"Define Problem","title":"Define Problem","text":"(Image: RailTrack)","category":"page"},{"location":"define/","page":"Define Problem","title":"Define Problem","text":"(Image: RailTrack)","category":"page"},{"location":"define/","page":"Define Problem","title":"Define Problem","text":"","category":"page"},{"location":"define/","page":"Define Problem","title":"Define Problem","text":"(Image: RailTrack)","category":"page"},{"location":"define/","page":"Define Problem","title":"Define Problem","text":"","category":"page"},{"location":"define/","page":"Define Problem","title":"Define Problem","text":"Introducing HazardAhead.ai","category":"page"},{"location":"define/","page":"Define Problem","title":"Define Problem","text":"In this AI, I am using Graph Analysis to predict, alert and possibility prevent hazards ahead. This Analysis can be used by law enforcements, event management authorities and is applicable to most of places where efficient crowd gathering management is required.","category":"page"},{"location":"api/#API","page":"API","title":"API","text":"","category":"section"},{"location":"usecase/#Use-Cases","page":"Use Cases","title":"Use Cases","text":"","category":"section"},{"location":"pattern/#Design-Pattern","page":"Design Pattern","title":"Design Pattern","text":"","category":"section"},{"location":"pattern/","page":"Design Pattern","title":"Design Pattern","text":"Now since we know, what objective of this project is, let's analyze what we already know.","category":"page"},{"location":"pattern/","page":"Design Pattern","title":"Design Pattern","text":"We will first learn few design patterns, using examples from Theme parks like Disney, Universal or Magic mountain ride parks, who manage crowd gathering so well.","category":"page"},{"location":"pattern/","page":"Design Pattern","title":"Design Pattern","text":"for example, take a section of map from Disney or universal theme parks.","category":"page"},{"location":"pattern/","page":"Design Pattern","title":"Design Pattern","text":"Disney Themepark (Image: Disney Themepark)","category":"page"},{"location":"pattern/","page":"Design Pattern","title":"Design Pattern","text":"Universal Studio Themepark (Image: Universal Studio)","category":"page"},{"location":"pattern/","page":"Design Pattern","title":"Design Pattern","text":"","category":"page"},{"location":"pattern/#Pattern","page":"Design Pattern","title":"Pattern","text":"","category":"section"},{"location":"pattern/","page":"Design Pattern","title":"Design Pattern","text":"Let's first analyze few basic characteristics of theme parks.","category":"page"},{"location":"pattern/","page":"Design Pattern","title":"Design Pattern","text":"To start with, assume all of these theme parks tickets are sold in advance or bought on same day and most of the times, tickets are sold less than maximum occupancy as per capacity allowed.","category":"page"},{"location":"pattern/","page":"Design Pattern","title":"Design Pattern","text":"remember, crowd gathering less than maximum allowed occupancy, may not be the case in  other type of crowd gatherings, such as protests, political rally or festive gatherings etc.. We will address this later in vision IOT section, where it become an important factor to detect anomaly.","category":"page"},{"location":"pattern/","page":"Design Pattern","title":"Design Pattern","text":"Create Graph, Vertices and Edges (relationships)\nLet's break each ride in park by it entity and characteristics (i.e. attributes).\nGathering Visitor, Food Supply and other data\ncreate and load visitor information register and other data\nIOTs climate data\ngather IOT (Internet of things) data from sensors\nAnalyzing patterns","category":"page"},{"location":"pattern/","page":"Design Pattern","title":"Design Pattern","text":"","category":"page"},{"location":"pattern/#Create-Graph,-Vertices-and-Edges","page":"Design Pattern","title":"Create Graph, Vertices and Edges","text":"","category":"section"},{"location":"pattern/","page":"Design Pattern","title":"Design Pattern","text":"# we are using Julia Language for Graph analysis\n# TigerGraph provide RESTAPI end points, GSQL and GRAPHSTUDIO to connect TIGERGRAPH\n#######################################################################\n# pyTigerGraph is a Python based library to connect with GRAPH database and run GSQLs\n# we will use Julia PyCall package to connect with pyTigerGraph library\n#######################################################################\n## **perhaps, some day I will re-write pyTigerGraph package in Julia ##\n#######################################################################\n\n# open Julia REPL, Jupyter or your favorite Julia IDE, run following\n\n# first import all packages required to support our data analysis\n# rest of this chapter assume that below packages are imported once\nimport Pkg\nPkg.add(\"DataFrames\")\nPkg.add(\"CSV\")\nPkg.add(\"PyCall\")\nPkg.build(\"PyCall\");\n\n# you will also need to install pyTigerGraph in your python environment\n# !pip install -U pyTigerGraph","category":"page"},{"location":"pattern/","page":"Design Pattern","title":"Design Pattern","text":"info: Info\nbefore proceeding any further, please setup Tiger Graph Server instance at tgcloud.io please don't expect these credentials to work for you, as there is cost involved to keep this.hostName = \"https://p2p.i.tgcloud.io\"userName = \"tigercloud\"password = \"tigercloud\"graphName = \"HazardAhead\"conn = tg.TigerGraphConnection(host=hostName, username=userName, password=password, graphname=graphName)","category":"page"},{"location":"pattern/","page":"Design Pattern","title":"Design Pattern","text":"","category":"page"},{"location":"pattern/","page":"Design Pattern","title":"Design Pattern","text":"now once you have TigerGraph and Julia environments setup, let's jump on to setup sample graph, vertices and edges to get a hang of tools.","category":"page"},{"location":"pattern/","page":"Design Pattern","title":"Design Pattern","text":"import Pkg\n# you may not need to add conda, pytigergraph\n# if you already have python setup\n# these instructions are specific for julia setup\nPkg.add(\"Conda\")\nENV[\"PYTHON\"] = \"/usr/bin/python3\"\nusing PyCall\nusing Conda\nConda.pip_interop(true;)\n# Conda.pip_interop(true; [env::Environment=\"/usr/bin/python3\"])\nConda.pip(\"install\", \"pyTigerGraph\")\nConda.add(\"pyTigerGraph\")\ntg = pyimport(\"pyTigerGraph\")\n# please don't expect below credentials to work for you, and signup at tgcloud\nhostName = \"https://p2p.i.tgcloud.io\"\nuserName = \"amit\"\npassword = \"password\"\ngraphName = \"HazardAhead\"\nconn = tg.TigerGraphConnection(host=hostName, username=userName, password=password, graphname=graphName)\n# conn.gsql(getSchema)","category":"page"},{"location":"pattern/","page":"Design Pattern","title":"Design Pattern","text":"warning: Warning\nOperations that DO NOT need a TokenViewing the schema of your graph using functions such as getSchema and getVertexTypes does not require you to have an authentication token. A token is also not required to run gsql commands through pyTigerGraph.Sample Connectionconn = tg.TigerGraphConnection(host='https://pytigergraph-demo.i.tgcloud.io', username='tigergraph' password='password' graphname='DemoGraph')Operations that DO need a TokenA token is required to view or modify any actual DATA in the graph. Examples are: upserting data, deleting edges, and getting stats about any loaded vertices. A token is also required to get version data about the TigerGraph instance.Sample Connectionconn = tg.TigerGraphConnection(host='https://pytigergraph-demo.i.tgcloud.io', username='tigergraph' password='password' graphname='DemoGraph', apiToken='av1im8nd2v06clbnb424jj7fp09hp049')","category":"page"},{"location":"pattern/","page":"Design Pattern","title":"Design Pattern","text":"note: Note\nBelow code is directly executed over Python environmentfirst you will also need to install pyTigerGraph in your python environment,!pip install -U pyTigerGraphthen execute following commands to create TGCloud Graph","category":"page"},{"location":"pattern/","page":"Design Pattern","title":"Design Pattern","text":"import pyTigerGraph as tg\nhostName = \"https://p2p.i.tgcloud.io\"\nuserName = \"amit\"\npassword = \"password\"\ngraphName = \"HazardAhead\"\nconn = tg.TigerGraphConnection(host=hostName, username=userName, password=password, graphname=graphName)\n\nconn.gsql(\"ls\")\nconn.gsql('''USE GLOBAL\nDROP ALL\n''')\n\nconn.gsql('''\n  USE GLOBAL\n  CREATE VERTEX Visitor (PRIMARY_ID id INT, bookDate DATETIME, name STRING, phoneNo INT, age INT, gender STRING, checkIn DATETIME, checkOut DATETIME, specialNeeds BOOL, race STRING, price STRING, accompanies INT, family BOOL, localResident BOOL, ADDRESS STRING) WITH primary_id_as_attribute=\"true\"\n\n  CREATE VERTEX Ride (PRIMARY_ID id INT, name STRING, indoor BOOL, inlets INT, outlets INT, temperature INT, avgWaitTime INT, popularityRating INT, rideType STRING, rideClass STRING, maturityRating STRING, numExits INT, area INT, numEmployees INT) WITH primary_id_as_attribute=\"true\"\n\n  CREATE VERTEX FoodCourt (PRIMARY_ID id INT, name STRING, indoor BOOL, inlets INT, outlets INT, temperature INT, avgWaitTime INT, popularityRating INT, foodType STRING, numExits INT, area INT, numEmployees INT) WITH primary_id_as_attribute=\"true\"\n\n  CREATE DIRECTED EDGE rides (From Visitor, To Ride, rideTime DATETIME)\n  CREATE DIRECTED EDGE eats (From Visitor, To FoodCourt, eatTime DATETIME)\n  CREATE UNDIRECTED EDGE accompanied (From Visitor, To Visitor)\n\n''')\nresults = conn.gsql('CREATE GRAPH HazardAhead(Visitor, Ride, FoodCourt, rides, eats, accompanied)')","category":"page"},{"location":"pattern/","page":"Design Pattern","title":"Design Pattern","text":"(Image: Graph 1)","category":"page"},{"location":"pattern/#Loading-Data","page":"Design Pattern","title":"Loading Data","text":"","category":"section"},{"location":"pattern/","page":"Design Pattern","title":"Design Pattern","text":"conn.gsql('''\nUSE GLOBAL\nUSE GRAPH HazardAhead\nCREATE LOADING JOB HazardAhead_PATH FOR GRAPH HazardAhead {\nDEFINE FILENAME file1 = \"sampleData/visitor.csv\";\nDEFINE FILENAME file2 = \"sampleData/ride.csv\";\nDEFINE FILENAME file3 = \"sampleData/foodcourt.csv\";\nDEFINE FILENAME file4 = \"sampleData/rides.csv\";\nDEFINE FILENAME file5 = \"sampleData/eats.csv\";\nDEFINE FILENAME file6 = \"sampleData/accompanied.csv\";\nLOAD file1 TO VERTEX Visitor VALUES ($0, $1,,....) USING header=\"true\", separator=\",\";\nLOAD file1 TO VERTEX Ride VALUES ($0, $1,,....) USING header=\"true\", separator=\",\";\nLOAD file1 TO VERTEX FoodCourt VALUES ($0, $1,,....) USING header=\"true\", separator=\",\";\nLOAD file1 TO VERTEX rides VALUES ($0, $1,,....) USING header=\"true\", separator=\",\";\nLOAD file1 TO VERTEX eats VALUES ($0, $1,,....) USING header=\"true\", separator=\",\";\nLOAD file1 TO VERTEX Galaxy accompanied ($0, $1,,....) USING header=\"true\", separator=\",\";\n}\n''')\n\nresults = conn.gsql('RUN LOADING JOB HazardAhead_PATH USING file1=\"sampleData/visitor.csv\", \"sampleData/ride.csv\", ...)","category":"page"},{"location":"pattern/","page":"Design Pattern","title":"Design Pattern","text":"(Image: Graph 2)","category":"page"},{"location":"pattern/","page":"Design Pattern","title":"Design Pattern","text":"(Image: Graph 3)","category":"page"},{"location":"pattern/","page":"Design Pattern","title":"Design Pattern","text":"(Image: Graph 4)","category":"page"},{"location":"pattern/","page":"Design Pattern","title":"Design Pattern","text":"","category":"page"},{"location":"pattern/#Gathering-Visitor,-Food-Supply-and-other-data","page":"Design Pattern","title":"Gathering Visitor, Food Supply and other data","text":"","category":"section"},{"location":"pattern/","page":"Design Pattern","title":"Design Pattern","text":"","category":"page"},{"location":"pattern/#IOTs-climate-data","page":"Design Pattern","title":"IOTs climate data","text":"","category":"section"},{"location":"pattern/","page":"Design Pattern","title":"Design Pattern","text":"","category":"page"},{"location":"pattern/#Analyzing-patterns","page":"Design Pattern","title":"Analyzing patterns","text":"","category":"section"},{"location":"ml/#AI/ML-Predictions","page":"AI/ML Predictions","title":"AI/ML Predictions","text":"","category":"section"},{"location":"#HazardAhead.ai","page":"Introduction","title":"HazardAhead.ai","text":"","category":"section"},{"location":"","page":"Introduction","title":"Introduction","text":"Predicting danger, crime, distractions, hazards before it happens. Ability to predict danger, hazards and distractions in advance before they do any damage is no longer a distant fantasy. Subject of surveillance has shown world new ways of predicting hazards ahead.","category":"page"},{"location":"","page":"Introduction","title":"Introduction","text":"This book is about Data Science, Graph Analysis to understand data pattern in crowd gatherings, making use of climate, supply chain, behavior archives of criminological data to understand what causes hazards. HazardAhead.ai demonstrates how to construct predictive algorithms to aid in the search for hazardous, danger, distractions and criminal activity.","category":"page"},{"location":"","page":"Introduction","title":"Introduction","text":"One great aspect of hazards is, it Work in Mathematical Ways.","category":"page"},{"location":"","page":"Introduction","title":"Introduction","text":"This notebook is dedicated to show examples, that using different technologies together, how a Hazard can be predicted well in advance, so that preventive actions can be taken.","category":"page"},{"location":"#about-Author","page":"Introduction","title":"about Author","text":"","category":"section"},{"location":"","page":"Introduction","title":"Introduction","text":"info: Info\nAuthor: Amit ShuklaBio: about meLast Update Date: Apr 18 2022Who should read this: IT developers, Healthcare, law enforcement agencies, Event management authoritiesVersion: 0.22Sponsorship: open for funding","category":"page"},{"location":"","page":"Introduction","title":"Introduction","text":"(Image: GitHub) (Image: YouTube) (Image: Twitter) (Image: LinkedIn) (Image: Medium)","category":"page"},{"location":"","page":"Introduction","title":"Introduction","text":"","category":"page"},{"location":"#how-to-use-this-book","page":"Introduction","title":"how to use this book","text":"","category":"section"},{"location":"","page":"Introduction","title":"Introduction","text":"This book first version is completely free(v1.2) and is published as website under GitHub gh-pages branch.","category":"page"},{"location":"","page":"Introduction","title":"Introduction","text":"Most of the source code is MIT License, (except few ML/Deep Learning algorithms, which are proprietary and customer owned content).","category":"page"},{"location":"","page":"Introduction","title":"Introduction","text":"Complete source code can be found here. https://github.com/AmitXShukla/HazardAhead.ai","category":"page"},{"location":"","page":"Introduction","title":"Introduction","text":"","category":"page"},{"location":"","page":"Introduction","title":"Introduction","text":"note: Note\nPlatform: TigerGraph, Oracle OCI, AWS, Google or Microsoft Azure data cloud.Data: Internet of things, vision, ocr, supply chain ERP systemsAnalytics: Jupyter NBs, Julia Pluto notebooks, TigerGraph GSQL, Power BI, Tableau, Oracle Analytics Cloud or KibanaProgramming/Framework: Julia, FluxML, TigerGraph GSQL, TigerGraph ML","category":"page"},{"location":"","page":"Introduction","title":"Introduction","text":"","category":"page"},{"location":"","page":"Introduction","title":"Introduction","text":"Hazards are everywhere, and often completely unpredictable. But recent advancements in AI, ML Models, Scientific Neural network deep learning methods and advance use of mathematics like calculus enabled us to use these technologies learn design and data pattern which can be used to analyze, visualize, and further train machine learning models to predict certain events.","category":"page"},{"location":"","page":"Introduction","title":"Introduction","text":"When I think about Impact using Graph technologies, I'm sure, these technologies will be able to make meaningful predictions which are useful to crowd/event management and is very helpful to the places and people who want to use Graph technologies in event management.","category":"page"},{"location":"","page":"Introduction","title":"Introduction","text":"I have seen researcher using Graph technologies to predict supply chain in retail industry. Graph technologies are certainly useful, where events depends entity and their relationship, like Power Industries or healthcare industry. However, I have not seen much applications of using Graph in Law n Order, Hazard, Crowd/Event management area.","category":"page"},{"location":"","page":"Introduction","title":"Introduction","text":"HazardAhead.ai uses extremely complex graph and data algorithms. This is lot of work to first identify, design solution pattern, gathering meaningful data. Cleaning and Wrangling huge amount of variety of data formats for different data sources. ","category":"page"},{"location":"#Table-of-Contents","page":"Introduction","title":"Table of Contents","text":"","category":"section"},{"location":"","page":"Introduction","title":"Introduction","text":"Pages = [\n\t\"index.md\"\n    \"define.md\"\n    \"pattern.md\"\n    \"iot.md\"\n    \"process.md\"\n    \"usecase.md\"\n    \"ml.md\"\n    \"api.md\"\n]","category":"page"},{"location":"#License-Agreement","page":"Introduction","title":"License Agreement","text":"","category":"section"},{"location":"","page":"Introduction","title":"Introduction","text":"https://raw.githubusercontent.com/AmitXShukla/HazardAhead.ai/main/LICENSE","category":"page"},{"location":"#Privacy-Policy","page":"Introduction","title":"Privacy Policy","text":"","category":"section"},{"location":"","page":"Introduction","title":"Introduction","text":"https://raw.githubusercontent.com/AmitXShukla/HazardAhead.ai/main/LICENSE","category":"page"},{"location":"iot/#Internet-of-Things","page":"IOTs","title":"Internet of Things","text":"","category":"section"},{"location":"process/#Design-Pattern","page":"Data Points","title":"Design Pattern","text":"","category":"section"}]
}
