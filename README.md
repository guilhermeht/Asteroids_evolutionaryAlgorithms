# Asteroids with Evolutionary Algorithms

[Video explicativo](https://youtu.be/vv4i2TNSf3Q)

Asteroirds with evolutionary algorithms is a Evolutive Algorithms University Project.
The main purpose of this project is to see how the spaceships evolve to keep staying alive.

The whole project was build with:
  - Google Chrome
  - HTML, CSS
  - Javascript
  - P5.js framework

# Starting
After clonning the repository, just open the following file with your browser (Google Chrome is recommended):
```sh
$ source/index.html
```
The project should start by itself.

# About
Each spaceship was born with the following properties:
  - Random Level of attraction to food (green dot);
  - Random Level of attratction to poison (red dot);
  - Random Level of vision to food and poison (on debug mode: Green and red circle);
  - Level of mutation;
  - Level of reproduction;
  - Initial life.

Eating poison decrease life and eating food increases it. Spaceships have their own cost of living so they loses health as the times goes on. When the life is zero or below it dies and become food.

### Food and Poison
Foods (green dots) are the main source of life to the spaceships.
Every seconds there's a chance to grow more food randomly across the map

Poison decreases the life of the spaceships. Too much time without eating food also decreases the life of the spaceships.

### Reproduction and mutation
Every seconds there's a chance of each spaceship to reproduce itself and everytime it reproduces itself they have a chance to mutate its properties to become more adaptive or less.

### Spaceships
Spaceships are the triangles acrros the map. They start filled with the green color (healthy) and as become more red (unhealthy) until they die

### Debug Mode
On debug mode you're able to see:
   - The vision of each spaceship to food and poison (Circles red and green around the ship)
   - The level of attraction to food and poison (Lines red and green across the ship)

### Buttons
It's possible to interfere externally with the buttons:
   - Adicionar naves: Adds more spaceships to the map (random properties)
   - Adicionar comida: Adds more food to the map (random places)
   - Adicionar veneno: Adds more poison to the map (random places)


**Enjoy!**