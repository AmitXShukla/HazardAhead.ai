# Use Cases
    
    Rail Tracks
    Festive Gatherings
    Protests
    Concerts
    Games
    Political Rallies


---
## Rail Tracks

#### Let's create a simple example RailTrack Graph with Vertices and Edges

```@python
import pyTigerGraph as tg
hostName = "https://p2p.i.tgcloud.io"
userName = "amit"
password = "password"
graphName = "RailTrack"
conn = tg.TigerGraphConnection(host=hostName, username=userName, password=password, graphname=graphName)

conn.gsql('''
  USE GLOBAL
  CREATE VERTEX Site (PRIMARY_ID id INT, name STRING, specialNeeds BOOL, ADDRESS STRING, Indoor Bool) WITH primary_id_as_attribute="true"

  CREATE VERTEX IOT (PRIMARY_ID id INT, cityid STRING, state STRING, indoorTemp INT, outdoorTemp INT, wind INT, humidity INT, precipitation INT) WITH primary_id_as_attribute="true"

  CREATE VERTEX Person (PRIMARY_ID id INT, bookDate DATETIME, name STRING, phoneNo INT, age INT, gender STRING, checkIn DATETIME, checkOut DATETIME, specialNeeds BOOL, race STRING, price STRING, accompanies INT, family BOOL, localResident BOOL, ADDRESS STRING) WITH primary_id_as_attribute="true"

  CREATE DIRECTED EDGE visiting (From Person, To Site, visitTime DATETIME)

  CREATE DIRECTED EDGE climate (From Site, To IOT, eatTime DATETIME)

''')
results = conn.gsql('CREATE GRAPH RailTrack(Site, IOT, Person, visiting, climate)')
```

![Graph 1](https://github.com/AmitXShukla/HazardAhead.ai/blob/main/assets/images/usecase1.png?raw=true)

#### Queries

## Crowd Density by CheckIn, CheckOut time
    - number of people per place
    - Crowd Density / Entry- Exit gates ratio
    - Crowd Density / age maturity ratio

## Extended Delays
    - excessive wait times
    - operational faults

## Facilities
    - newly opened
    - located near Electric Grids
    - located near Entry, Exit gates

---
## Festive Gatherings

#### Let's create a simple example Festive Gatherings Graph with Vertices and Edges

```@python
import pyTigerGraph as tg
hostName = "https://p2p.i.tgcloud.io"
userName = "amit"
password = "password"
graphName = "FestiveGathering"
conn = tg.TigerGraphConnection(host=hostName, username=userName, password=password, graphname=graphName)

conn.gsql('''
  USE GLOBAL
  CREATE VERTEX Site (PRIMARY_ID id INT, name STRING, specialNeeds BOOL, ADDRESS STRING, Indoor Bool) WITH primary_id_as_attribute="true"

  CREATE VERTEX IOT (PRIMARY_ID id INT, cityid STRING, state STRING, indoorTemp INT, outdoorTemp INT, wind INT, humidity INT, precipitation INT) WITH primary_id_as_attribute="true"

  CREATE VERTEX Person (PRIMARY_ID id INT, bookDate DATETIME, name STRING, phoneNo INT, age INT, gender STRING, checkIn DATETIME, checkOut DATETIME, specialNeeds BOOL, race STRING, price STRING, accompanies INT, family BOOL, localResident BOOL, ADDRESS STRING) WITH primary_id_as_attribute="true"

  CREATE VERTEX Market(PRIMARY_ID id INT, name STRING, indoor BOOL, inlets INT, outlets INT, temperature INT, avgWaitTime INT, popularityRating INT, mktType STRING, numExits INT, area INT, numEmployees INT) WITH primary_id_as_attribute="true"

  CREATE VERTEX FoodCourt(PRIMARY_ID id INT, name STRING, indoor BOOL, inlets INT, outlets INT, temperature INT, avgWaitTime INT, popularityRating INT, foodType STRING, numExits INT, area INT, numEmployees INT) WITH primary_id_as_attribute="true"

  CREATE DIRECTED EDGE visiting (From Person, To Site, visitTime DATETIME)

  CREATE DIRECTED EDGE climate (From Site, To IOT, eatTime DATETIME)

  CREATE DIRECTED EDGE buys (From Person, To Market, visitTime DATETIME)

  CREATE DIRECTED EDGE eats (From Person, To FoodCourt, visitTime DATETIME)

''')
results = conn.gsql('CREATE GRAPH FestiveGathering(Site, IOT, Person, Market, FoodCourt, visiting, climate, buys, eats)')
```

![Graph 2](https://github.com/AmitXShukla/HazardAhead.ai/blob/main/assets/images/usecase2.png?raw=true)

#### Queries

## Food & beverages
    - food courts, food/alcoholic sales ratio is higher
    - food delivery delays
    - lunch, dinner time crowd gathering

## Climate
    - excessive moisture
    - excessive heat
    - excessive cold
    - excessive noise / activity

## Crowd Density by attraction
    - fatal attractions
    - concerts gatherings
    - show time attractions

## Facilities
    - newly opened
    - located near Electric Grids
    - located near Entry, Exit gates


---
## Protests

#### Let's create a simple example Protests Gatherings Graph with Vertices and Edges

```@python
import pyTigerGraph as tg
hostName = "https://p2p.i.tgcloud.io"
userName = "amit"
password = "password"
graphName = "ProtestsGathering"
conn = tg.TigerGraphConnection(host=hostName, username=userName, password=password, graphname=graphName)

conn.gsql('''
  USE GLOBAL
  CREATE VERTEX Site (PRIMARY_ID id INT, name STRING, specialNeeds BOOL, ADDRESS STRING, Indoor Bool) WITH primary_id_as_attribute="true"

  CREATE VERTEX IOT (PRIMARY_ID id INT, cityid STRING, state STRING, indoorTemp INT, outdoorTemp INT, wind INT, humidity INT, precipitation INT) WITH primary_id_as_attribute="true"

  CREATE VERTEX Person (PRIMARY_ID id INT, bookDate DATETIME, name STRING, phoneNo INT, age INT, gender STRING, checkIn DATETIME, checkOut DATETIME, specialNeeds BOOL, race STRING, price STRING, accompanies INT, family BOOL, localResident BOOL, ADDRESS STRING) WITH primary_id_as_attribute="true"

  CREATE VERTEX Market(PRIMARY_ID id INT, name STRING, indoor BOOL, inlets INT, outlets INT, temperature INT, avgWaitTime INT, popularityRating INT, mktType STRING, numExits INT, area INT, numEmployees INT) WITH primary_id_as_attribute="true"

  CREATE VERTEX FoodCourt(PRIMARY_ID id INT, name STRING, indoor BOOL, inlets INT, outlets INT, temperature INT, avgWaitTime INT, popularityRating INT, foodType STRING, numExits INT, area INT, numEmployees INT) WITH primary_id_as_attribute="true"

  CREATE DIRECTED EDGE visiting (From Person, To Site, visitTime DATETIME)

  CREATE DIRECTED EDGE climate (From Site, To IOT, eatTime DATETIME)

  CREATE DIRECTED EDGE buys (From Person, To Market, visitTime DATETIME)
  
  CREATE DIRECTED EDGE eats (From Person, To FoodCourt, visitTime DATETIME)

''')
results = conn.gsql('CREATE GRAPH ProtestsGathering(Site, IOT, Person, Market, FoodCourt, visiting, climate, buys, eats)')
```

![Graph 3](https://github.com/AmitXShukla/HazardAhead.ai/blob/main/assets/images/usecase3.png?raw=true)

#### Queries

## Food & beverages
    - food courts, food/alcoholic sales ratio is higher
    - food delivery delays
    - lunch, dinner time crowd gathering

## Climate
    - excessive moisture
    - excessive heat
    - excessive cold
    - excessive noise / activity

---
## Concerts

---
## Games

---
## Political Rallies