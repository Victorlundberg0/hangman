 
# Victor's Hangman Game
 
This game was created using reactJS.
 
## Dependencies, api's and components
 
The game uses the free api: https://random-words-api.vercel.app/word to fetch a random word.
 
For most UI components material UI is used, other components used are: react-Toastify (warning messages), react-spinners (loading animation),react-simple-keyboard(on-screen input).
 
## How the game works
 
This is a game of hangman where the user gets a random word to guess it using keyboard input, done either by an actual keyboard or the on-screen keyboard, making it suitable for mobile.
 
### Points
 
You have six lives and start with 100 points, for each wrong input you lose one life and 20 points. You lose the game when you lose all lives. You can get a hint in the form of a description, this costs 20 points.
 
### Error prevention
 
You can only insert the same character once, the available words only include a-z and any special characters as è are normalized to its regular counterpart. If a word could not be loaded you will be prompted to reload.
 
 
