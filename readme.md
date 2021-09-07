# apprentice.io interview project
This project implements a chess api

## Setup
- `npm install`
- Configure MongoDB connection string in .env.default

## NPM Commands
**Build**
`npm run build`
**Start**
`npm run start`
**Test**
`npm run test`
**Debug**
`npm run debug`

## Swagger API
Swagger api is located at localhost:3000/api-docs for testing the API

## Notes
The game board is represented as a 2 dimensional array arranged by rows and columns with coordinate (0,0) being the corner of the white play field.

W_R = White Rook
W_KN = White Knight
W_B = White Bishop
W_K = White King
W_Q = White Queen
W_P = White Pawn
B_R = Black Rook
B_KN = Black Knight
B_B = Black Bishop
B_K = Black King
B_Q = Black Queen
B_P = Black Pawn

|   | 0   | 1    | 2   | 3   | 4   | 5   | 6    | 7   |
| - | --- | ---- | --- | --- | --- | --- | ---- | --- |
| 0 | W_R | W_KN | W_B | W_K | W_Q | W_B | W_KN | W_R |
| 1 | W_P | W_P  | W_P | W_P | W_P | W_P | W_P  | W_P |
| 2 |  -  |   -  |  -  |  -  |  -  |  -  |  -   |  -  |
| 3 |  -  |   -  |  -  |  -  |  -  |  -  |  -   |  -  |
| 4 |  -  |   -  |  -  |  -  |  -  |  -  |  -   |  -  |
| 5 |  -  |   -  |  -  |  -  |  -  |  -  |  -   |  -  |
| 0 | B_R | B_KN | B_B | B_K | B_Q | B_B | B_KN | B_R |
| 1 | B_P | B_P  | B_P | B_P | B_P | B_P | W_P  | B_P |

## Notes
Used [this repo](https://github.com/sidhantpanda/docker-express-typescript-boilerplate.git) for inspiration.