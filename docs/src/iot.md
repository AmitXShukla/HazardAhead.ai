# Internet of Things

We will use standard weather and news information from weather.com and NEW API websites.

and as well, will use **implanted IOT sensors** to capture vision, density, temperature, moisture, sound and activities.
![Sensors](https://github.com/AmitXShukla/HazardAhead.ai/blob/main/assets/images/sensors.jpg?raw=true)

## density / vision
Capturing crowd density varies case by case. For example, In case of, organized gatherings like Theme parks, concerts etc.
number of people attending the event can be predicted in advance.

However, at the same, number of people entering, leaving and present at a given time is very important.
Most of the chaos, happens when too many people appear at a place at the same time. for example, people entering / leaving premises.

![Sensors](https://github.com/AmitXShukla/HazardAhead.ai/blob/main/assets/images/crowd_density_model_1.png?raw=true)
![Sensors](https://github.com/AmitXShukla/HazardAhead.ai/blob/main/assets/images/crowd_density_model_2.png?raw=true)

[Reference](https://www.researchgate.net/publication/343341033_Crowd_Modeling_and_Simulation_for_Safer_Building_Design)

other option is, Density will calculated using vision AI, captured through a motion camera / CCTV footage.

![Sensors](https://github.com/AmitXShukla/HazardAhead.ai/blob/main/assets/images/crowd_density_model.png?raw=true)

---
## visibility
Brightness

![Sensors](https://github.com/AmitXShukla/HazardAhead.ai/blob/main/assets/images/sensor4.png?raw=true)

---
## temperature

Outside temperature

![Sensors](https://github.com/AmitXShukla/HazardAhead.ai/blob/main/assets/images/sensor1.png?raw=true)

```@example
##############################################
# outdoorTemp
##############################################
using DataFrames, CSV, Dates, Distributions
sampleSize = 365
weatherDF = DataFrame(
    cityid = 1:1:sampleSize, 
    state = rand(["LA","LA","FL"], sampleSize),
    indoorTemp = rand(64:1:94, sampleSize),
    outdoorTemp = rand(54:1:104, sampleSize),
    wind = rand(5:1:30, sampleSize),
    humidity = rand(30:1:70, sampleSize),
    precipitation = rand(0:1:5, sampleSize)
    )
first(weatherDF[:, [:cityid, :state, :outdoorTemp]], 10)
```

Inside temperature

![Sensors](https://github.com/AmitXShukla/HazardAhead.ai/blob/main/assets/images/sensor2.png?raw=true)

```@example
##############################################
# outdoorTemp
##############################################
using DataFrames, CSV, Dates, Distributions
sampleSize = 365
weatherDF = DataFrame(
    cityid = 1:1:sampleSize, 
    state = rand(["LA","LA","FL"], sampleSize),
    indoorTemp = rand(64:1:94, sampleSize),
    outdoorTemp = rand(54:1:104, sampleSize),
    wind = rand(5:1:30, sampleSize),
    humidity = rand(30:1:70, sampleSize),
    precipitation = rand(0:1:5, sampleSize)
    )
first(weatherDF[:, [:cityid, :state, :indoorTemp]], 10)
```
---
## moisture
![Sensors](https://github.com/AmitXShukla/HazardAhead.ai/blob/main/assets/images/sensor3.png?raw=true)

```@example
##############################################
# moisture
##############################################
using DataFrames, CSV, Dates, Distributions
sampleSize = 365
weatherDF = DataFrame(
    cityid = 1:1:sampleSize, 
    state = rand(["LA","LA","FL"], sampleSize),
    indoorTemp = rand(64:1:94, sampleSize),
    outdoorTemp = rand(54:1:104, sampleSize),
    wind = rand(5:1:30, sampleSize),
    humidity = rand(30:1:70, sampleSize),
    precipitation = rand(0:1:5, sampleSize)
    )
first(weatherDF[:,[:cityid, :state, :humidity]], 10)
```
---
## sound

![Sensors](https://github.com/AmitXShukla/HazardAhead.ai/blob/main/assets/images/sensor5.png?raw=true)
```@example
##############################################
# Noise / sound
##############################################
using DataFrames, CSV, Dates, Distributions
sampleSize = 365
weatherDF = DataFrame(
    cityid = 1:1:sampleSize, 
    state = rand(["LA","LA","FL"], sampleSize),
    indoorTemp = rand(64:1:94, sampleSize),
    sound = rand(54:1:104, sampleSize),
    wind = rand(5:1:30, sampleSize),
    humidity = rand(30:1:70, sampleSize),
    precipitation = rand(0:1:5, sampleSize)
    )
first(weatherDF[:,[:cityid, :state, :sound]], 10)
```

---
## activities
motion activities

![Sensors](https://github.com/AmitXShukla/HazardAhead.ai/blob/main/assets/images/sensor6.png?raw=true)

```@example
##############################################
# motion activities
##############################################
using DataFrames, CSV, Dates, Distributions
sampleSize = 365
weatherDF = DataFrame(
    cityid = 1:1:sampleSize, 
    state = rand(["LA","LA","FL"], sampleSize),
    indoorTemp = rand(64:1:94, sampleSize),
    sound = rand(54:1:104, sampleSize),
    shadows = rand(5:1:30, sampleSize),
    humidity = rand(30:1:70, sampleSize),
    precipitation = rand(0:1:5, sampleSize)
    )
first(weatherDF[:,[:cityid, :state, :shadows]], 10)
```
---
## news
