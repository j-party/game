define('app-data',["require", "exports"], function (require, exports) {
    "use strict";
    exports.appData = {
        author: 'Manmade Games',
        date: 2016,
        license: 'Apache 2.0',
        name: 'J!Party'
    };
});

define('clue',["require", "exports"], function (require, exports) {
    "use strict";
    var Clue = (function () {
        function Clue() {
        }
        return Clue;
    }());
    exports.Clue = Clue;
    var Category = (function () {
        function Category() {
        }
        return Category;
    }());
    exports.Category = Category;
});

define('database-parser',["require", "exports"], function (require, exports) {
    "use strict";
    ;
    var DatabaseParser = (function () {
        function DatabaseParser() {
        }
        DatabaseParser.prototype.parseList = function (text, callback) {
            var rowCountLine = 0;
            var headerLine = 1;
            var rows = text.split(/[\r\n]+/);
            var count = rows[rowCountLine];
            callback({ total: count });
            var parsedRow;
            var header = rows[headerLine].split('|');
            for (var i = headerLine + 1; i < rows.length; i++) {
                if (rows[i].indexOf('|') === -1) {
                    continue;
                }
                parsedRow = {};
                var cols = rows[i].split('|');
                for (var j = 0; j < cols.length; j++) {
                    parsedRow[header[j]] = cols[j];
                }
                callback(parsedRow);
            }
            callback({ done: true });
        };
        return DatabaseParser;
    }());
    exports.DatabaseParser = DatabaseParser;
    ;
});

define('randomizer',["require", "exports", 'random-js'], function (require, exports, Random) {
    "use strict";
    var Randomizer = (function () {
        function Randomizer() {
            this.engine = new Random(Random.engines.mt19937().autoSeed());
        }
        Randomizer.prototype.generate = function (min, max) {
            return this.engine.integer(min, max);
        };
        return Randomizer;
    }());
    exports.Randomizer = Randomizer;
});

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define('clue-service',["require", "exports", 'aurelia-framework', 'aurelia-fetch-client', './database-parser', './randomizer'], function (require, exports, aurelia_framework_1, aurelia_fetch_client_1, database_parser_1, randomizer_1) {
    "use strict";
    var ClueService = (function () {
        function ClueService(dbParser, http, randomizer) {
            this.dbParser = dbParser;
            this.http = http;
            this.randomizer = randomizer;
            this.categoriesFile = 'categories.txt';
            this.cluesFile = 'clues.txt';
            this.clues = [];
            this.hasLoaded = false;
        }
        ClueService.prototype.choose = function (num) {
            var categories = [];
            for (var i = 0; i < num; i++) {
                var index = this.randomizer.generate(0, this.clues.length);
                categories.push(this.clues[index]);
            }
            return Promise.resolve(categories);
        };
        ClueService.prototype.getClue = function (id) {
            return this.clues[0].clues[0];
        };
        ClueService.prototype.getClues = function () {
            return Promise.resolve(this.clues);
        };
        ClueService.prototype.loadClues = function () {
            var _this = this;
            var categoryRawData;
            var clueRawData;
            var loadDataFiles = function () {
                return Promise.all([
                    _this.http.fetch(_this.categoriesFile).then(function (response) { return response.text(); }),
                    _this.http.fetch(_this.cluesFile).then(function (response) { return response.text(); })
                ]).then(function (data) {
                    categoryRawData = data[0], clueRawData = data[1];
                });
            };
            var parseData = function () {
                var parser = function (data) {
                    var parsedData = [];
                    return new Promise(function (resolve) {
                        _this.dbParser.parseList(data, function (row) {
                            if (row.total) {
                            }
                            else if (row.done) {
                                resolve(parsedData);
                            }
                            else {
                                parsedData.push(row);
                            }
                        });
                    });
                };
                return Promise.all([
                    parser(categoryRawData),
                    parser(clueRawData)
                ]).then(function (data) {
                    var categoryParsedData = data[0], clueParsedData = data[1];
                    var indexedData = {};
                    categoryParsedData.forEach(function (category) {
                        var categoryId = Number(category.id);
                        var newCategory = {
                            id: categoryId,
                            name: String(category.name),
                            isFinal: false,
                            clues: []
                        };
                        indexedData[categoryId] = newCategory;
                    });
                    clueParsedData.forEach(function (clue) {
                        var categoryId = Number(clue.categoryId);
                        var level = Number(clue.level) === 999 ? 0 : Number(clue.level);
                        var newClue = {
                            id: Number(clue.id),
                            clue: String(clue.clue),
                            answer: String(clue.answer)
                        };
                        indexedData[categoryId].isFinal = Number(clue.level) === 999;
                        indexedData[categoryId].clues[level] = newClue;
                    });
                    _this.clues = Object.keys(indexedData).map(function (key) {
                        return indexedData[Number(key)];
                    });
                });
            };
            return loadDataFiles().then(parseData).then(function () { _this.hasLoaded = true; });
        };
        ClueService = __decorate([
            aurelia_framework_1.inject(database_parser_1.DatabaseParser, aurelia_fetch_client_1.HttpClient, randomizer_1.Randomizer), 
            __metadata('design:paramtypes', [database_parser_1.DatabaseParser, aurelia_fetch_client_1.HttpClient, randomizer_1.Randomizer])
        ], ClueService);
        return ClueService;
    }());
    exports.ClueService = ClueService;
});

define('player',["require", "exports"], function (require, exports) {
    "use strict";
    var Player = (function () {
        function Player(name) {
            this.name = name;
            this.money = 0;
        }
        return Player;
    }());
    exports.Player = Player;
});

define('game-state',["require", "exports", './app-data'], function (require, exports, app_data_1) {
    "use strict";
    var GameRound = (function () {
        function GameRound() {
            this.number = 0;
            this.name = app_data_1.appData.name;
        }
        return GameRound;
    }());
    exports.GameRound = GameRound;
    var GameState = (function () {
        function GameState() {
        }
        GameState.prototype.reset = function (players, categories) {
            this.players = players;
            this.currentPlayer = this.players[0];
            this.categories = categories;
            this.round = new GameRound();
        };
        return GameState;
    }());
    exports.GameState = GameState;
});

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define('app',["require", "exports", 'aurelia-framework', './app-data', './clue-service', './game-state', './player'], function (require, exports, aurelia_framework_1, app_data_1, clue_service_1, game_state_1, player_1) {
    "use strict";
    var App = (function () {
        function App(clueService, gameState) {
            this.clueService = clueService;
            this.gameState = gameState;
            this.title = app_data_1.appData.name;
        }
        App.prototype.configureRouter = function (config, router) {
            config.title = this.title;
            config.map([
                { route: '', moduleId: 'title-screen' },
                { route: 'board', moduleId: 'board', name: 'board' },
                { route: 'clue/:id', moduleId: 'clue-detail', name: 'clueDetail' },
            ]);
            this.router = router;
        };
        App.prototype.created = function () {
            var _this = this;
            console.log('Loading clues...');
            return this.clueService.loadClues().then(function () {
                console.log('clues loaded');
                return _this.clueService.choose(6);
            }).then(function (categories) {
                var players = [
                    new player_1.Player('You'),
                    new player_1.Player('Computer 1'),
                    new player_1.Player('Computer 2'),
                ];
                _this.gameState.reset(players, categories);
            }).catch(function (err) { console.log('ERROR!', err); });
        };
        App = __decorate([
            aurelia_framework_1.inject(clue_service_1.ClueService, game_state_1.GameState), 
            __metadata('design:paramtypes', [clue_service_1.ClueService, game_state_1.GameState])
        ], App);
        return App;
    }());
    exports.App = App;
});

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define('board',["require", "exports", 'aurelia-framework', 'aurelia-router', './game-state'], function (require, exports, aurelia_framework_1, aurelia_router_1, game_state_1) {
    "use strict";
    var Board = (function () {
        function Board(gameState, router) {
            this.gameState = gameState;
            this.router = router;
        }
        Board.prototype.created = function () {
            this.categories = this.gameState.categories;
            this.currentPlayer = this.gameState.currentPlayer;
            this.players = this.gameState.players;
            this.round = this.gameState.round;
        };
        Board.prototype.gotoDetail = function (clue) {
            this.router.navigateToRoute('clueDetail', { id: clue.id });
        };
        Board = __decorate([
            aurelia_framework_1.inject(game_state_1.GameState, aurelia_router_1.Router), 
            __metadata('design:paramtypes', [game_state_1.GameState, aurelia_router_1.Router])
        ], Board);
        return Board;
    }());
    exports.Board = Board;
});

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define('clue-detail',["require", "exports", 'aurelia-framework', './clue-service'], function (require, exports, aurelia_framework_1, clue_service_1) {
    "use strict";
    var ClueDetailComponent = (function () {
        function ClueDetailComponent(clueService) {
            this.clueService = clueService;
        }
        ClueDetailComponent.prototype.activate = function (params) {
            var id = Number(params.id);
            this.clue = this.clueService.getClue(id);
        };
        ClueDetailComponent.prototype.goBack = function () {
            window.history.back();
        };
        ClueDetailComponent = __decorate([
            aurelia_framework_1.inject(clue_service_1.ClueService), 
            __metadata('design:paramtypes', [clue_service_1.ClueService])
        ], ClueDetailComponent);
        return ClueDetailComponent;
    }());
    exports.ClueDetailComponent = ClueDetailComponent;
});

define('environment',["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = {
        debug: true,
        testing: true
    };
});

define('input',["require", "exports"], function (require, exports) {
    "use strict";
    (function (InputType) {
        InputType[InputType["Keyboard"] = 0] = "Keyboard";
        InputType[InputType["Mouse"] = 1] = "Mouse";
        InputType[InputType["Touch"] = 2] = "Touch";
    })(exports.InputType || (exports.InputType = {}));
    var InputType = exports.InputType;
    var Input = (function () {
        function Input(type) {
            this.type = type;
        }
        return Input;
    }());
    exports.Input = Input;
});

define('keyboard-service',["require", "exports", './input'], function (require, exports, input_1) {
    "use strict";
    var KeyboardService = (function () {
        function KeyboardService() {
        }
        KeyboardService.prototype.waitForAny = function () {
            return new Promise(function (resolve, reject) {
                document.onkeypress = function (event) {
                    resolve(new input_1.Input(input_1.InputType.Keyboard));
                };
            });
        };
        return KeyboardService;
    }());
    exports.KeyboardService = KeyboardService;
});

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define('input-service',["require", "exports", 'aurelia-framework', './keyboard-service'], function (require, exports, aurelia_framework_1, keyboard_service_1) {
    "use strict";
    var InputService = (function () {
        function InputService(keyboardService) {
            this.keyboardService = keyboardService;
        }
        InputService.prototype.waitForAny = function () {
            return Promise.race([
                this.keyboardService.waitForAny()
            ]);
        };
        InputService = __decorate([
            aurelia_framework_1.inject(keyboard_service_1.KeyboardService), 
            __metadata('design:paramtypes', [keyboard_service_1.KeyboardService])
        ], InputService);
        return InputService;
    }());
    exports.InputService = InputService;
});

define('main',["require", "exports", './environment'], function (require, exports, environment_1) {
    "use strict";
    Promise.config({
        warnings: {
            wForgottenReturn: false
        }
    });
    function configure(aurelia) {
        aurelia.use
            .standardConfiguration()
            .feature('resources');
        if (environment_1.default.debug) {
            aurelia.use.developmentLogging();
        }
        if (environment_1.default.testing) {
            aurelia.use.plugin('aurelia-testing');
        }
        return aurelia.start().then(function () { return aurelia.setRoot(); });
    }
    exports.configure = configure;
});

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define('title-screen',["require", "exports", 'aurelia-framework', 'aurelia-router', './app-data', './clue-service', './input-service'], function (require, exports, aurelia_framework_1, aurelia_router_1, app_data_1, clue_service_1, input_service_1) {
    "use strict";
    var TitleScreen = (function () {
        function TitleScreen(bindingEngine, clueService, inputService, router) {
            this.bindingEngine = bindingEngine;
            this.clueService = clueService;
            this.inputService = inputService;
            this.router = router;
            this.app = app_data_1.appData;
            this.loading = true;
        }
        TitleScreen.prototype.created = function () {
            var _this = this;
            var turnOffLoading = function () { return _this.loading = false; };
            var waitForInput = function () {
                return _this.inputService.waitForAny().then(function () {
                    _this.router.navigateToRoute('board');
                });
            };
            var subscription = this.bindingEngine.propertyObserver(this.clueService, 'hasLoaded')
                .subscribe(function (newValue, oldValue) {
                turnOffLoading();
                waitForInput();
                subscription.dispose();
            });
        };
        TitleScreen = __decorate([
            aurelia_framework_1.inject(aurelia_framework_1.BindingEngine, clue_service_1.ClueService, input_service_1.InputService, aurelia_router_1.Router), 
            __metadata('design:paramtypes', [aurelia_framework_1.BindingEngine, clue_service_1.ClueService, input_service_1.InputService, aurelia_router_1.Router])
        ], TitleScreen);
        return TitleScreen;
    }());
    exports.TitleScreen = TitleScreen;
});

define('resources/index',["require", "exports"], function (require, exports) {
    "use strict";
    function configure(config) {
    }
    exports.configure = configure;
});

define('text!app.html', ['module'], function(module) { module.exports = "<template>\n  <require from=\"./app.css\"></require>\n  <router-view></router-view>\n</template>\n"; });
define('text!app.css', ['module'], function(module) { module.exports = "h1 {\n  font-size: 1.2em;\n  color: #999;\n  margin-bottom: 0; }\n\nh2 {\n  font-size: 2em;\n  margin-top: 0;\n  padding-top: 0; }\n\nnav a {\n  padding: 5px 10px;\n  text-decoration: none;\n  margin-top: 10px;\n  display: inline-block;\n  background-color: #eee;\n  border-radius: 4px; }\n\nnav a:visited, a:link {\n  color: #607D8B; }\n\nnav a:hover {\n  color: #039be5;\n  background-color: #CFD8DC; }\n\nnav a.router-link-active {\n  color: #039be5; }\n"; });
define('text!board.html', ['module'], function(module) { module.exports = "<template>\n  <require from=\"./board.css\"></require>\n  <h3>${round.name}</h3>\n  <table border=\"1\">\n    <thead>\n      <tr>\n        <th repeat.for=\"category of categories\">${category.name}</th>\n      </tr>\n    </thead>\n    <tbody>\n      <tr>\n        <td repeat.for=\"category of categories\" click.trigger=\"gotoDetail(category.clues[0])\">${category.clues[0].clue}</td>\n      </tr>\n      <tr>\n        <td repeat.for=\"category of categories\" click.trigger=\"gotoDetail(category.clues[1])\">${category.clues[1].clue}</td>\n      </tr>\n      <tr>\n        <td repeat.for=\"category of categories\" click.trigger=\"gotoDetail(category.clues[2])\">${category.clues[2].clue}</td>\n      </tr>\n      <tr>\n        <td repeat.for=\"category of categories\" click.trigger=\"gotoDetail(category.clues[3])\">${category.clues[3].clue}</td>\n      </tr>\n      <tr>\n        <td repeat.for=\"category of categories\" click.trigger=\"gotoDetail(category.clues[4])\">${category.clues[4].clue}</td>\n      </tr>\n    </tbody>\n  </table>\n  <p class=\"please-choose\">${currentPlayer.name}, choose a category.</p>\n  <ul class=\"players\">\n    <li repeat.for=\"player of players\">${player.name} $${player.money}</li>\n  </ul>\n</template>\n"; });
define('text!board.css', ['module'], function(module) { module.exports = "[class*='col-'] {\n  float: left; }\n\n*, *:after, *:before {\n  -webkit-box-sizing: border-box;\n  -moz-box-sizing: border-box;\n  box-sizing: border-box; }\n\nh3 {\n  text-align: center;\n  margin-bottom: 0; }\n\n[class*='col-'] {\n  padding-right: 20px;\n  padding-bottom: 20px; }\n\n[class*='col-']:last-of-type {\n  padding-right: 0; }\n\n.grid {\n  margin: 0; }\n\n.col-1-4 {\n  width: 25%; }\n\n.module {\n  padding: 20px;\n  text-align: center;\n  color: #eee;\n  max-height: 120px;\n  min-width: 120px;\n  background-color: #607D8B;\n  border-radius: 2px; }\n\nh4 {\n  position: relative; }\n\n.module:hover {\n  background-color: #EEE;\n  cursor: pointer;\n  color: #607d8b; }\n\n.grid-pad {\n  padding: 10px 0; }\n\n.grid-pad > [class*='col-']:last-of-type {\n  padding-right: 20px; }\n\n@media (max-width: 600px) {\n  .module {\n    font-size: 10px;\n    max-height: 75px; } }\n\n@media (max-width: 1024px) {\n  .grid {\n    margin: 0; }\n  .module {\n    min-width: 60px; } }\n"; });
define('text!clue-detail.html', ['module'], function(module) { module.exports = "<template>\n  <require from=\"./clue-detail.css\"></require>\n  <div if.bind=\"clue\">\n    <h2>Clue details!</h2>\n    <div><label>ID: </label>${clue.id}</div>\n    <label>Level: <input value.bind=\"clue.level\" placeholder=\"level\"></label>\n    <label>Clue: <input value.bind=\"clue.clue\" placeholder=\"clue\"></label>\n    <label>Answer: <input value.bind=\"clue.answer\" placeholder=\"answer\"></label>\n  </div>\n  <button click.trigger=\"goBack()\">Back</button>\n</template>\n"; });
define('text!clue-detail.css', ['module'], function(module) { module.exports = "label {\n  display: inline-block;\n  width: 3em;\n  margin: .5em 0;\n  color: #607D8B;\n  font-weight: bold; }\n\ninput {\n  height: 2em;\n  font-size: 1em;\n  padding-left: .4em; }\n\nbutton {\n  margin-top: 20px;\n  font-family: Arial;\n  background-color: #eee;\n  border: none;\n  padding: 5px 10px;\n  border-radius: 4px;\n  cursor: pointer;\n  cursor: hand; }\n\nbutton:hover {\n  background-color: #cfd8dc; }\n\nbutton:disabled {\n  background-color: #eee;\n  color: #ccc;\n  cursor: auto; }\n"; });
define('text!title-screen.html', ['module'], function(module) { module.exports = "<template>\n  <div class=\"title-screen\">\n    <h1>${app.name}</h1>\n    <p if.bind=\"loading\">Loading...</p>\n    <p if.bind=\"!loading\" class=\"press-any\">Press any key to continue</p>\n    <p class=\"legalese\">\n      Copyright © ${app.date} ${app.author} and licensed under the ${app.license} License.\n      The Jeopardy! game show and all elements thereof, including but not limited to copyright and trademark thereto, are the property of Jeopardy Productions, Inc. and are protected under law. This software is not affiliated with, sponsored by, or operated by Jeopardy Productions, Inc.\n    </p>\n  </div>\n</template>\n"; });
//# sourceMappingURL=app-bundle.js.map