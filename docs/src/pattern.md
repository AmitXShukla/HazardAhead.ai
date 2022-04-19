# Design Pattern

Now since we know, what objective of this project is,
let's analyze what we already know.

We will first learn few design patterns, using examples from Theme parks like Disney, Universal or Magic mountain ride parks, who manage crowd gathering so well.

for example, take a section of map from Disney or universal theme parks.

*Disney Themepark*
![Disney Themepark](https://github.com/AmitXShukla/HazardAhead.ai/blob/main/assets/images/disney.png?raw=true)

*Universal Studio Themepark*
![Universal Studio](https://github.com/AmitXShukla/HazardAhead.ai/blob/main/assets/images/universal.png?raw=true)

---

## Pattern

Let's first analyze few basic characteristics of theme parks.

To start with, assume all of these theme parks tickets are sold in advance or bought on same day and most of the times, tickets are sold less than maximum occupancy as per capacity allowed.

*remember, crowd gathering less than maximum allowed occupancy, may not be the case in  other type of crowd gatherings, such as protests, political rally or festive gatherings etc.. We will address this later in vision IOT section, where it become an important factor to detect anomaly.*

- Create Graph, Vertices and Edges (relationships)
    
    Let's break each ride in park by it entity and characteristics (i.e. attributes).

- Gathering Visitor, Food Supply and other data

    create and load visitor information register and other data
    

- IOTs climate data

    gather IOT (Internet of things) data from sensors

- Analyzing patterns

---

## Create Graph, Vertices and Edges

```@example
# we are using Julia Language for Graph analysis
# TigerGraph provide RESTAPI end points, GSQL and GRAPHSTUDIO to connect TIGERGRAPH
#######################################################################
# pyTigerGraph is a Python based library to connect with GRAPH database and run GSQLs
# we will use Julia PyCall package to connect with pyTigerGraph library
#######################################################################
## **perhaps, some day I will re-write pyTigerGraph package in Julia ##
#######################################################################

# open Julia REPL, Jupyter or your favorite Julia IDE, run following

# first import all packages required to support our data analysis
# rest of this chapter assume that below packages are imported once
import Pkg
Pkg.add("DataFrames")
Pkg.add("CSV")
Pkg.add("PyCall")
Pkg.build("PyCall");

# you will also need to install pyTigerGraph in your python environment
# !pip install -U pyTigerGraph
```

!!! info

    before proceeding any further, please setup Tiger Graph Server instance at [tgcloud.io](https://tgcloud.io)
    please don't expect these credentials to work for you, as there is cost involved to keep this.

    hostName = "https://p2p.i.tgcloud.io"

    userName = "tigercloud"

    password = "tigercloud"

    graphName = "HazardAhead"

    conn = tg.TigerGraphConnection(host=hostName, username=userName, password=password, graphname=graphName)


---

*now once you have TigerGraph and Julia environments setup, let's jump on to setup sample graph, vertices and edges to get a hang of tools.*


```@example
import Pkg
# you may not need to add conda, pytigergraph
# if you already have python setup
# these instructions are specific for julia setup
Pkg.add("Conda")
ENV["PYTHON"] = "/usr/bin/python3"
using PyCall
using Conda
Conda.pip_interop(true;)
# Conda.pip_interop(true; [env::Environment="/usr/bin/python3"])
Conda.pip("install", "pyTigerGraph")
Conda.add("pyTigerGraph")
tg = pyimport("pyTigerGraph")
# please don't expect below credentials to work for you, and signup at tgcloud
hostName = "https://p2p.i.tgcloud.io"
userName = "amit"
password = "password"
graphName = "HazardAhead"
conn = tg.TigerGraphConnection(host=hostName, username=userName, password=password, graphname=graphName)
# conn.gsql(getSchema)
```

!!! warning
    Operations that DO NOT need a Token
    
    Viewing the schema of your graph using functions such as getSchema and getVertexTypes does not require you to have an authentication token. A token is also not required to run gsql commands through pyTigerGraph.
    
    Sample Connection
    
    conn = tg.TigerGraphConnection(host='https://pytigergraph-demo.i.tgcloud.io', username='tigergraph' password='password' graphname='DemoGraph')
    
    Operations that DO need a Token

    A token is required to view or modify any actual DATA in the graph. Examples are: upserting data, deleting edges, and getting stats about any loaded vertices. A token is also required to get version data about the TigerGraph instance.

    Sample Connection

    conn = tg.TigerGraphConnection(host='https://pytigergraph-demo.i.tgcloud.io', username='tigergraph' password='password' graphname='DemoGraph', apiToken='av1im8nd2v06clbnb424jj7fp09hp049')


!!! note
    Below code is directly executed over Python environment
    
    first you will also need to install pyTigerGraph in your python environment,

    !pip install -U pyTigerGraph
    
    then execute following commands to create TGCloud Graph

```@python
import pyTigerGraph as tg
hostName = "https://p2p.i.tgcloud.io"
userName = "amit"
password = "password"
graphName = "HazardAhead"
conn = tg.TigerGraphConnection(host=hostName, username=userName, password=password, graphname=graphName)

conn.gsql("ls")
conn.gsql('''USE GLOBAL
DROP ALL
''')

conn.gsql('''
  USE GLOBAL
  CREATE VERTEX Visitor (PRIMARY_ID id INT, bookDate DATETIME, name STRING, phoneNo INT, age INT, gender STRING, checkIn DATETIME, checkOut DATETIME, specialNeeds BOOL, race STRING, price STRING, accompanies INT, family BOOL, localResident BOOL, ADDRESS STRING) WITH primary_id_as_attribute="true"

  CREATE VERTEX Ride (PRIMARY_ID id INT, name STRING, indoor BOOL, inlets INT, outlets INT, temperature INT, avgWaitTime INT, popularityRating INT, rideType STRING, rideClass STRING, maturityRating STRING, numExits INT, area INT, numEmployees INT) WITH primary_id_as_attribute="true"

  CREATE VERTEX FoodCourt (PRIMARY_ID id INT, name STRING, indoor BOOL, inlets INT, outlets INT, temperature INT, avgWaitTime INT, popularityRating INT, foodType STRING, numExits INT, area INT, numEmployees INT) WITH primary_id_as_attribute="true"

  CREATE DIRECTED EDGE rides (From Visitor, To Ride, rideTime DATETIME)
  CREATE DIRECTED EDGE eats (From Visitor, To FoodCourt, eatTime DATETIME)
  CREATE UNDIRECTED EDGE accompanied (From Visitor, To Visitor)

''')
results = conn.gsql('CREATE GRAPH HazardAhead(Visitor, Ride, FoodCourt, rides, eats, accompanied)')
```

![Graph 1](https://github.com/AmitXShukla/HazardAhead.ai/blob/main/assets/images/graph1.png?raw=true)



#### Loading Data

```example
conn.gsql('''
USE GLOBAL
USE GRAPH HazardAhead
CREATE LOADING JOB HazardAhead_PATH FOR GRAPH HazardAhead {
DEFINE FILENAME file1 = "sampleData/visitors.csv";
DEFINE FILENAME file2 = "sampleData/ride.csv";
DEFINE FILENAME file3 = "sampleData/foodcourt.csv";
DEFINE FILENAME file4 = "sampleData/rides.csv";
DEFINE FILENAME file5 = "sampleData/eats.csv";
DEFINE FILENAME file6 = "sampleData/accompanied.csv";
LOAD file1 TO VERTEX Visitor VALUES ($0, $1,,....) USING header="true", separator=",";
LOAD file1 TO VERTEX Ride VALUES ($0, $1,,....) USING header="true", separator=",";
LOAD file1 TO VERTEX FoodCourt VALUES ($0, $1,,....) USING header="true", separator=",";
LOAD file1 TO VERTEX rides VALUES ($0, $1,,....) USING header="true", separator=",";
LOAD file1 TO VERTEX eats VALUES ($0, $1,,....) USING header="true", separator=",";
LOAD file1 TO VERTEX accompanied VALUES ($0, $1,,....) USING header="true", separator=",";
}
''')

results = conn.gsql('RUN LOADING JOB HazardAhead_PATH USING file1="sampleData/visitors.csv", "sampleData/ride.csv", ...)
```
![Graph 2](https://github.com/AmitXShukla/HazardAhead.ai/blob/main/assets/images/graph2.png?raw=true)

![Graph 3](https://github.com/AmitXShukla/HazardAhead.ai/blob/main/assets/images/graph3.png?raw=true)

![Graph 4](https://github.com/AmitXShukla/HazardAhead.ai/blob/main/assets/images/graph4.png?raw=true)

---

## Gathering Visitor, Food Supply and other data

```@example
##############################################
# let's create 1000 visitors in visit register
##############################################
using DataFrames, CSV, Dates, Distributions
sampleSizeVisitor = 1000
visitorDF = DataFrame(
    id = 1:1:sampleSizeVisitor, 
    bookDate = rand(Date("2020-04-01", dateformat"y-m-d"): Day(1): Date("2020-04-10", dateformat"y-m-d"), sampleSizeVisitor),
    name = "Last First Name M.",
    phoneNo = rand(1110000000:1:9988800000, sampleSizeVisitor), 
    age = rand(9:1:78, sampleSizeVisitor), 
    gender = rand(["Male","Female","Others","NA"], sampleSizeVisitor),
    checkIn = rand(Date("2020-04-01", dateformat"y-m-d"): Day(1): Date("2020-04-10", dateformat"y-m-d"), sampleSizeVisitor),
    checkOut = rand(Date("2020-04-01", dateformat"y-m-d"): Day(1): Date("2020-04-10", dateformat"y-m-d"), sampleSizeVisitor),
    specialNeeds = rand([0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1], sampleSizeVisitor), # biased distributions, mostly false
    race = "na",
    price = rand(Normal(100, 2), sampleSizeVisitor), 
    accompanies = rand([1,2,3,4], sampleSizeVisitor),
    family = rand([0,1], sampleSizeVisitor),
    localResident = rand([0,1], sampleSizeVisitor),
    ADDRESS = "Not available",
    )

first(visitorDF,5)
```


```@example
##############################################
# let's create 20 Rides in Park
##############################################
using DataFrames, CSV, Dates, Distributions
sampleSize = 20
rideDF = DataFrame(
    id = 1:1:sampleSize, 
    name = "Joy Ride",
    indoor = rand([0,1], sampleSize),
    inlets = rand([1,2,3,4], sampleSize),
    outlets = rand([1,2,3,4], sampleSize),
    temperature = rand(64:1:94, sampleSize),
    avgWaitTime = rand(5:1:110, sampleSize),
    popularityRating = rand(1:1:10, sampleSize),
    rideType = rand(["Adult","Teen","Kids", "YoungAdult"], sampleSize),
    rideClass = rand(["Luxury", "Special"], sampleSize),
    maturityRating = rand(1:1:10, sampleSize),
    numExits = rand([1,2,3,4], sampleSize),
    area = rand(5000:5:15000, sampleSize),
    numEmployees = rand(1:1:5, sampleSize)
    )

first(rideDF, 5)
```

```@example
##############################################
# let's create 20 Food Courts in Park
##############################################
using DataFrames, CSV, Dates, Distributions
sampleSize = 20
foodcourtDF = DataFrame(
    id = 1:1:sampleSize, 
    name = "Joy Ride",
    indoor = rand([0,1], sampleSize),
    inlets = rand([1,2,3,4], sampleSize),
    outlets = rand([1,2,3,4], sampleSize),
    temperature = rand(64:1:94, sampleSize),
    avgWaitTime = rand(5:1:110, sampleSize),
    popularityRating = rand(1:1:10, sampleSize),
    foodType = rand(["Fast","Formal","Snacks"], sampleSize),
    numExits = rand([1,2,3,4], sampleSize),
    area = rand(5000:5:15000, sampleSize),
    numEmployees = rand(1:1:15, sampleSize)
    )

first(foodcourtDF, 5)
```

---
## IOTs climate data

```@example
##############################################
# let's create weather data
##############################################
using DataFrames, CSV, Dates, Distributions
sampleSize = 365
weatherDF = DataFrame(
    cityid = 1:1:sampleSize, 
    state = rand(["LA","LA","FL"], sampleSize),
    indoorTemp = rand(64:1:94, sampleSize),
    outdoorTemp = rand(64:1:94, sampleSize),
    wind = rand(5:1:30, sampleSize),
    humidity = rand(30:1:70, sampleSize),
    precipitation = rand(0:1:5, sampleSize)
    )

first(weatherDF, 5)
```

---
## Analyzing patterns