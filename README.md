# J!Party Game [WIP]

This project is the software piece of the J!Party collection.

It is built on top of the [Aurelia](http://aurelia.io/) framework; no server required.

Runs on all modern browsers, including Chrome, Firefox, Safari, Edge, and Internet Explorer 11.

## Installation

If you don't want to build the game from the source code, consider downloading the J!Party bundle instead.

To build the game, you need the following tools:

* [node/npm](http://nodejs.org/)
* [gulp](http://gulpjs.com/)
* [bower](http://bower.io/)
* [sqlite3](https://www.sqlite.org/)
* the [aurelia-cli](https://github.com/aurelia/cli) (`au`) tool

Next, install the package dependencies in the project folder: `npm install`

You'll need a *clues database*, in the format created by [the J!Party crawler](https://github.com/j-party/crawler). Copy the database into the root folder of this project and name it `clues.db`.

Once you have the packages installed, you can run any of the following tasks:

```shell
au build         # compiles the game
au run           # serves the game at http://localhost:9000
au run --watch   # serves the game and watches for changes to files
au test          # runs the unit test suite (can also add --watch)
au e2e           # runs the end-to-end test suite
```

## Configuration

### Game Settings

The [config.json](src/config.json) file affects how the game works.

* `numPlayers` -- number of players (default: 3)
* `numRounds` -- number of game rounds (default: 2)
* `numCategories` -- number of categories per round (default: 6)
* `numCluesPerCategory` -- number of clues per category (default: 5)
* `initialMoney` -- money value of the first clue of the first round (default: $100)
* `moneyIncrement` -- increment of the money values between clues in the first round (default: $100)
* `secsBeforeClue` -- how many seconds before the clue is shown (default: 3)
* `secsToBuzzIn` -- how many seconds players have to buzz in with an answer (default: 10)
* `secsForAnswer` -- how many seconds players have to answer the clue (default: 30)
* `spellingTolerance` -- tolerance of mistakes in answers, from 1 (barely tolerant) to 5 (very tolerant) (default: 3)
* `cpuSkill` -- skill of AI players, from 1 (dumb) to 5 (superintelligent) (default: 3)

### Styling

[SCSS](http://sass-lang.com/) files are used to define the look of the game.

## Related

* J!Party Bundle
* J!Party Crawler
* J!Party Device

## License

Copyright 2016 Eric Heikes.

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at [http://www.apache.org/licenses/LICENSE-2.0](http://www.apache.org/licenses/LICENSE-2.0).

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.

The Jeopardy! game show and all elements thereof, including but not limited to copyright and trademark thereto, are the property of Jeopardy Productions, Inc. and are protected under law. This software is not affiliated with, sponsored by, or operated by Jeopardy Productions, Inc.
