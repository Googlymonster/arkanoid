// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

(function(modules, cache, entry, globalName) {
  /* eslint-disable no-undef */
  var globalObject =
    typeof globalThis !== 'undefined'
      ? globalThis
      : typeof self !== 'undefined'
      ? self
      : typeof window !== 'undefined'
      ? window
      : typeof global !== 'undefined'
      ? global
      : {};
  /* eslint-enable no-undef */

  // Save the require from previous bundle to this closure if any
  var previousRequire =
    typeof globalObject.parcelRequire === 'function' &&
    globalObject.parcelRequire;
  // Do not use `require` to prevent Webpack from trying to bundle this call
  var nodeRequire =
    typeof module !== 'undefined' &&
    typeof module.require === 'function' &&
    module.require.bind(module);

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire =
          typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error("Cannot find module '" + name + "'");
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = (cache[name] = new newRequire.Module(name));

      modules[name][0].call(
        module.exports,
        localRequire,
        module,
        module.exports,
        this
      );
    }

    return cache[name].exports;

    function localRequire(x) {
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x) {
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function(id, exports) {
    modules[id] = [
      function(require, module) {
        module.exports = exports;
      },
      {},
    ];
  };

  globalObject.parcelRequire = newRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === 'object' && typeof module !== 'undefined') {
      module.exports = mainExports;

      // RequireJS
    } else if (typeof define === 'function' && define.amd) {
      define(function() {
        return mainExports;
      });

      // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }
})({"0fcac8ab3ce0ef713b176cc21d7843cb":[function(require,module,exports) {
var global = arguments[3];
var HMR_HOST = null;
var HMR_PORT = 1234;
var HMR_ENV_HASH = "d751713988987e9331980363e24189ce";
module.bundle.HMR_BUNDLE_ID = "17d264b53b951f69c3b2ab60a05a5eae";
/* global HMR_HOST, HMR_PORT, HMR_ENV_HASH */

var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept, acceptedAssets; // eslint-disable-next-line no-redeclare

var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = HMR_HOST || (location.protocol.indexOf('http') === 0 ? location.hostname : 'localhost');
  var port = HMR_PORT || location.port;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + (port ? ':' + port : '') + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    acceptedAssets = {};
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      // Remove error overlay if there is one
      removeErrorOverlay();
      let assets = data.assets.filter(asset => asset.envHash === HMR_ENV_HASH); // Handle HMR Update

      var handled = false;
      assets.forEach(asset => {
        var didAccept = asset.type === 'css' || hmrAcceptCheck(global.parcelRequire, asset.id);

        if (didAccept) {
          handled = true;
        }
      });

      if (handled) {
        console.clear();
        assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });

        for (var i = 0; i < assetsToAccept.length; i++) {
          var id = assetsToAccept[i][1];

          if (!acceptedAssets[id]) {
            hmrAcceptRun(assetsToAccept[i][0], id);
          }
        }
      } else {
        window.location.reload();
      }
    }

    if (data.type === 'error') {
      // Log parcel errors to console
      for (let ansiDiagnostic of data.diagnostics.ansi) {
        let stack = ansiDiagnostic.codeframe ? ansiDiagnostic.codeframe : ansiDiagnostic.stack;
        console.error('???? [parcel]: ' + ansiDiagnostic.message + '\n' + stack + '\n\n' + ansiDiagnostic.hints.join('\n'));
      } // Render the fancy html overlay


      removeErrorOverlay();
      var overlay = createErrorOverlay(data.diagnostics.html);
      document.body.appendChild(overlay);
    }
  };

  ws.onerror = function (e) {
    console.error(e.message);
  };

  ws.onclose = function (e) {
    console.warn('[parcel] ???? Connection to the HMR server was lost');
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
    console.log('[parcel] ??? Error resolved');
  }
}

function createErrorOverlay(diagnostics) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID;
  let errorHTML = '<div style="background: black; opacity: 0.85; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; font-family: Menlo, Consolas, monospace; z-index: 9999;">';

  for (let diagnostic of diagnostics) {
    let stack = diagnostic.codeframe ? diagnostic.codeframe : diagnostic.stack;
    errorHTML += `
      <div>
        <div style="font-size: 18px; font-weight: bold; margin-top: 20px;">
          ???? ${diagnostic.message}
        </div>
        <pre>
          ${stack}
        </pre>
        <div>
          ${diagnostic.hints.map(hint => '<div>' + hint + '</div>').join('')}
        </div>
      </div>
    `;
  }

  errorHTML += '</div>';
  overlay.innerHTML = errorHTML;
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push([bundle, k]);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function updateLink(link) {
  var newLink = link.cloneNode();

  newLink.onload = function () {
    if (link.parentNode !== null) {
      link.parentNode.removeChild(link);
    }
  };

  newLink.setAttribute('href', link.getAttribute('href').split('?')[0] + '?' + Date.now());
  link.parentNode.insertBefore(newLink, link.nextSibling);
}

var cssTimeout = null;

function reloadCSS() {
  if (cssTimeout) {
    return;
  }

  cssTimeout = setTimeout(function () {
    var links = document.querySelectorAll('link[rel="stylesheet"]');

    for (var i = 0; i < links.length; i++) {
      var absolute = /^https?:\/\//i.test(links[i].getAttribute('href'));

      if (!absolute) {
        updateLink(links[i]);
      }
    }

    cssTimeout = null;
  }, 50);
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    if (asset.type === 'css') {
      reloadCSS();
    } else {
      var fn = new Function('require', 'module', 'exports', asset.output);
      modules[asset.id] = [fn, asset.depsByBundle[bundle.HMR_BUNDLE_ID]];
    }
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (v) {
    return hmrAcceptCheck(v[0], v[1]);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached && cached.hot) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      var assetsToAlsoAccept = cb(function () {
        return getParents(global.parcelRequire, id);
      });

      if (assetsToAlsoAccept && assetsToAccept.length) {
        assetsToAccept.push.apply(assetsToAccept, assetsToAlsoAccept);
      }
    });
  }

  acceptedAssets[id] = true;
}
},{}],"f2f497094f3d929c275dbe4e29a3cb4a":[function(require,module,exports) {
require('./bundle-manifest').register(JSON.parse("{\"c3b2ab60a05a5eae\":\"arkanoid.17d264b5.js\",\"9ca1037006ff5d69\":\"brick-red.017fac44.png\",\"73bdd1cbc087e10d\":\"brick-blue.8cb47f5a.png\",\"cfb265f2a0bc841e\":\"brick-green.a95970c2.png\",\"b131a919ab77a520\":\"brick-yellow.8716baf5.png\",\"9d362448b79e559b\":\"brick-purple.03a375a7.png\",\"a060715d74fc36b0\":\"paddle.2161a8b1.png\",\"f28ece03f7046d22\":\"ball.b5d353cd.png\"}"));
},{"./bundle-manifest":"ba8df6b71e73837c465d69bebde6e64d"}],"ba8df6b71e73837c465d69bebde6e64d":[function(require,module,exports) {
"use strict";

var mapping = {};

function register(pairs) {
  var keys = Object.keys(pairs);

  for (var i = 0; i < keys.length; i++) {
    mapping[keys[i]] = pairs[keys[i]];
  }
}

function resolve(id) {
  var resolved = mapping[id];

  if (resolved == null) {
    throw new Error('Could not resolve bundle with id ' + id);
  }

  return resolved;
}

module.exports.register = register;
module.exports.resolve = resolve;
},{}],"7843b3960e086726267ff606847fc92b":[function(require,module,exports) {
"use strict";

var _CanvasView = require("./view/CanvasView");

var _Ball = require("./sprites/Ball");

var _Paddle = require("./sprites/Paddle");

var _Collision = require("./Collision");

var _paddle = _interopRequireDefault(require("url:./images/paddle.png"));

var _ball = _interopRequireDefault(require("url:./images/ball.png"));

var _setup = require("./setup");

var _helpers = require("./helpers");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Images
// 
// Helpers
let gameOver = false;
let score = 0;

function setGameOver(view) {
  view.drawInfo('Game Over!');
  gameOver = false;
}

function setGameWin(view) {
  view.drawInfo('Game Won!');
  gameOver = false;
}

function gameLoop(view, bricks, paddle, ball, collision) {
  view.clear();
  view.drawBricks(bricks);
  view.drawSprite(paddle);
  view.drawSprite(ball); // Move ball

  ball.moveBall(); // Move paddle and check so it won't exit the playfield

  if (paddle.isMovingLeft && paddle.pos.x > 0 || paddle.isMovingRight && paddle.pos.x < view.canvas.width - paddle.width) {
    paddle.movePaddle();
  }

  collision.checkBallCollision(ball, paddle, view);
  const collidingBrick = collision.isCollidingBricks(ball, bricks);

  if (collidingBrick) {
    score += 1;
    view.drawScore(score);
  } // Game Over when ball leaves playfield


  if (ball.pos.y > view.canvas.height) gameOver = true; // If game won

  if (bricks.length === 0) return setGameWin(view); // Return if gameover and dont run request animation frame

  if (gameOver) return setGameOver(view);
  requestAnimationFrame(() => gameLoop(view, bricks, paddle, ball, collision));
}

function startGame(view) {
  // Reset display
  score = 0;
  view.drawInfo('');
  view.drawScore(0); // Create collision instance

  const collision = new _Collision.Collision(); // Create all bricks

  const bricks = (0, _helpers.createBricks)(); // Create a ball

  const ball = new _Ball.Ball(_setup.BALL_SIZE, {
    x: _setup.BALL_STARTX,
    y: _setup.BALL_STARTY
  }, _setup.BALL_SPEED, _ball.default); // Create paddle

  const paddle = new _Paddle.Paddle(_setup.PADDLE_SPEED, _setup.PADDLE_WIDTH, _setup.PADDLE_HEIGHT, {
    x: _setup.PADDLE_STARTX,
    y: view.canvas.height - _setup.PADDLE_HEIGHT - 5
  }, _paddle.default);
  gameLoop(view, bricks, paddle, ball, collision);
} // Create a new view


const view = new _CanvasView.CanvasView('#playField');
view.initStartButton(startGame);
},{"./view/CanvasView":"751fd1e74e198ad36f36a0407f43e5c8","./helpers":"3d4c4d3f40e66301a26f684b13801ee3","./sprites/Paddle":"42bb5ba97b56ade705ff45b63338f76a","./setup":"1e73ce32230b09512757c80a8dbf13d3","url:./images/paddle.png":"0348e1dc296632f8f16c921ef9490e1f","./sprites/Ball":"8dcdb765250c1eeae7e48ffc27fca110","url:./images/ball.png":"fee7523e0bab4ecb2d3eae476120072e","./Collision":"c1547fd9436f6a846e85a7781ca84cc5"}],"751fd1e74e198ad36f36a0407f43e5c8":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CanvasView = void 0;

// Types
class CanvasView {
  constructor(canvasName) {
    this.canvas = document.querySelector(canvasName);
    this.context = this.canvas.getContext('2d');
    this.scoreDisplay = document.querySelector('#score');
    this.start = document.querySelector('#start');
    this.info = document.querySelector('#info');
  }

  clear() {
    this.context?.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  initStartButton(startFunction) {
    this.start?.addEventListener('click', () => startFunction(this));
  }

  drawScore(score) {
    if (this.scoreDisplay) this.scoreDisplay.innerHTML = score.toString();
  }

  drawInfo(text) {
    if (this.info) this.info.innerHTML = text;
  }

  drawSprite(brick) {
    if (!brick) return;
    this.context?.drawImage(brick.image, brick.pos.x, brick.pos.y, brick.width, brick.height);
  }

  drawBricks(bricks) {
    bricks.forEach(brick => this.drawSprite(brick));
  }

}

exports.CanvasView = CanvasView;
},{}],"3d4c4d3f40e66301a26f684b13801ee3":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createBricks = createBricks;

var _Brick = require("./sprites/Brick");

var _setup = require("./setup");

function createBricks() {
  return _setup.LEVEL.reduce((ack, element, i) => {
    const row = Math.floor((i + 1) / _setup.STAGE_COLS);
    const col = i % _setup.STAGE_COLS;
    const x = _setup.STAGE_PADDING + col * (_setup.BRICK_WIDTH + _setup.BRICK_PADDING);
    const y = _setup.STAGE_PADDING + row * (_setup.BRICK_HEIGHT + _setup.BRICK_PADDING);
    if (element === 0) return ack;
    return [...ack, new _Brick.Brick(_setup.BRICK_WIDTH, _setup.BRICK_HEIGHT, {
      x,
      y
    }, _setup.BRICK_ENERGY[element], _setup.BRICK_IMAGES[element])];
  }, []);
}
},{"./sprites/Brick":"3f2a094154170616f14f1faa653f7677","./setup":"1e73ce32230b09512757c80a8dbf13d3"}],"3f2a094154170616f14f1faa653f7677":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Brick = void 0;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class Brick {
  constructor(brickWidth, brickHeight, position, brickEnergy, image) {
    _defineProperty(this, "brickImage", new Image());

    this.brickWidth = brickWidth;
    this.brickHeight = brickHeight;
    this.position = position;
    this.brickEnergy = brickEnergy;
    this.brickWidth = brickWidth;
    this.brickHeight = brickHeight;
    this.position = position;
    this.brickEnergy = brickEnergy;
    this.brickImage.src = image;
  } // Getters


  get width() {
    return this.brickWidth;
  }

  get height() {
    return this.brickHeight;
  }

  get pos() {
    return this.position;
  }

  get image() {
    return this.brickImage;
  }

  get energy() {
    return this.brickEnergy;
  } // Setters


  set energy(energy) {
    this.brickEnergy = energy;
  }

}

exports.Brick = Brick;
},{}],"1e73ce32230b09512757c80a8dbf13d3":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LEVEL = exports.BRICK_ENERGY = exports.BRICK_IMAGES = exports.BALL_STARTY = exports.BALL_STARTX = exports.BALL_SIZE = exports.BALL_SPEED = exports.PADDLE_SPEED = exports.PADDLE_STARTX = exports.PADDLE_HEIGHT = exports.PADDLE_WIDTH = exports.BRICK_HEIGHT = exports.BRICK_WIDTH = exports.BRICK_PADDING = exports.STAGE_COLS = exports.STAGE_ROWS = exports.STAGE_PADDING = void 0;

var _brickRed = _interopRequireDefault(require("url:./images/brick-red.png"));

var _brickBlue = _interopRequireDefault(require("url:./images/brick-blue.png"));

var _brickGreen = _interopRequireDefault(require("url:./images/brick-green.png"));

var _brickYellow = _interopRequireDefault(require("url:./images/brick-yellow.png"));

var _brickPurple = _interopRequireDefault(require("url:./images/brick-purple.png"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Grab the canvas element for calculating the brick width
// depending on canvas width
const canvas = document.querySelector('#playField'); // Constants

const STAGE_PADDING = 10;
exports.STAGE_PADDING = STAGE_PADDING;
const STAGE_ROWS = 20;
exports.STAGE_ROWS = STAGE_ROWS;
const STAGE_COLS = 10;
exports.STAGE_COLS = STAGE_COLS;
const BRICK_PADDING = 5;
exports.BRICK_PADDING = BRICK_PADDING;
const BRICK_WIDTH = canvas ? Math.floor((canvas.width - STAGE_PADDING * 2) / STAGE_COLS) - BRICK_PADDING : 100;
exports.BRICK_WIDTH = BRICK_WIDTH;
const BRICK_HEIGHT = canvas ? Math.floor((canvas.height - STAGE_PADDING * 2) / STAGE_ROWS) - BRICK_PADDING : 30;
exports.BRICK_HEIGHT = BRICK_HEIGHT;
const PADDLE_WIDTH = 150;
exports.PADDLE_WIDTH = PADDLE_WIDTH;
const PADDLE_HEIGHT = 25;
exports.PADDLE_HEIGHT = PADDLE_HEIGHT;
const PADDLE_STARTX = 450;
exports.PADDLE_STARTX = PADDLE_STARTX;
const PADDLE_SPEED = 10;
exports.PADDLE_SPEED = PADDLE_SPEED;
const BALL_SPEED = 5;
exports.BALL_SPEED = BALL_SPEED;
const BALL_SIZE = 20;
exports.BALL_SIZE = BALL_SIZE;
const BALL_STARTX = 500;
exports.BALL_STARTX = BALL_STARTX;
const BALL_STARTY = 400;
exports.BALL_STARTY = BALL_STARTY;
const BRICK_IMAGES = {
  1: _brickRed.default,
  2: _brickGreen.default,
  3: _brickYellow.default,
  4: _brickBlue.default,
  5: _brickPurple.default
};
exports.BRICK_IMAGES = BRICK_IMAGES;
const BRICK_ENERGY = {
  1: 1,
  // Red brick
  2: 1,
  // Green brick
  3: 2,
  // Yellow brick
  4: 2,
  // Blue brick
  5: 3 // Purple brick

}; // prettier-ignore

exports.BRICK_ENERGY = BRICK_ENERGY;
const LEVEL = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 3, 3, 3, 3, 3, 3, 3, 3, 0, 0, 0, 4, 4, 4, 4, 4, 4, 0, 0, 0, 0, 5, 5, 0, 0, 5, 5, 0, 0];
exports.LEVEL = LEVEL;
},{"url:./images/brick-red.png":"91712691a001f8477bed43e1b56dc914","url:./images/brick-blue.png":"5b2f4ff5c46dd68bc483ed0c9d97f81c","url:./images/brick-green.png":"863e7aa2f5b8c9e650428f665bde7d00","url:./images/brick-yellow.png":"b20f8f88fdac58e8f22c062f2cde60a6","url:./images/brick-purple.png":"eb2f7c8b5cf13ec4c2384a939eda3eb0"}],"91712691a001f8477bed43e1b56dc914":[function(require,module,exports) {
module.exports = require('./bundle-url').getBundleURL() + require('./relative-path')("c3b2ab60a05a5eae", "9ca1037006ff5d69");
},{"./bundle-url":"2146da1905b95151ed14d455c784e7b7","./relative-path":"1b9943ef25c7bbdf0dd1b9fa91880a6c"}],"2146da1905b95151ed14d455c784e7b7":[function(require,module,exports) {
"use strict";

/* globals document:readonly */
var bundleURL = null;

function getBundleURLCached() {
  if (!bundleURL) {
    bundleURL = getBundleURL();
  }

  return bundleURL;
}

function getBundleURL() {
  try {
    throw new Error();
  } catch (err) {
    var matches = ('' + err.stack).match(/(https?|file|ftp):\/\/[^)\n]+/g);

    if (matches) {
      return getBaseURL(matches[0]);
    }
  }

  return '/';
}

function getBaseURL(url) {
  return ('' + url).replace(/^((?:https?|file|ftp):\/\/.+)\/[^/]+$/, '$1') + '/';
} // TODO: Replace uses with `new URL(url).origin` when ie11 is no longer supported.


function getOrigin(url) {
  let matches = ('' + url).match(/(https?|file|ftp):\/\/[^/]+/);

  if (!matches) {
    throw new Error('Origin not found');
  }

  return matches[0];
}

exports.getBundleURL = getBundleURLCached;
exports.getBaseURL = getBaseURL;
exports.getOrigin = getOrigin;
},{}],"1b9943ef25c7bbdf0dd1b9fa91880a6c":[function(require,module,exports) {
"use strict";

var resolve = require('./bundle-manifest').resolve;

module.exports = function (fromId, toId) {
  return relative(dirname(resolve(fromId)), resolve(toId));
};

function dirname(_filePath) {
  if (_filePath === '') {
    return '.';
  }

  var filePath = _filePath[_filePath.length - 1] === '/' ? _filePath.slice(0, _filePath.length - 1) : _filePath;
  var slashIndex = filePath.lastIndexOf('/');
  return slashIndex === -1 ? '.' : filePath.slice(0, slashIndex);
}

function relative(from, to) {
  if (from === to) {
    return '';
  }

  var fromParts = from.split('/');

  if (fromParts[0] === '.') {
    fromParts.shift();
  }

  var toParts = to.split('/');

  if (toParts[0] === '.') {
    toParts.shift();
  } // Find where path segments diverge.


  var i;
  var divergeIndex;

  for (i = 0; (i < toParts.length || i < fromParts.length) && divergeIndex == null; i++) {
    if (fromParts[i] !== toParts[i]) {
      divergeIndex = i;
    }
  } // If there are segments from "from" beyond the point of divergence,
  // return back up the path to that point using "..".


  var parts = [];

  for (i = 0; i < fromParts.length - divergeIndex; i++) {
    parts.push('..');
  } // If there are segments from "to" beyond the point of divergence,
  // continue using the remaining segments.


  if (toParts.length > divergeIndex) {
    parts.push.apply(parts, toParts.slice(divergeIndex));
  }

  return parts.join('/');
}

module.exports._dirname = dirname;
module.exports._relative = relative;
},{"./bundle-manifest":"ba8df6b71e73837c465d69bebde6e64d"}],"5b2f4ff5c46dd68bc483ed0c9d97f81c":[function(require,module,exports) {
module.exports = require('./bundle-url').getBundleURL() + require('./relative-path')("c3b2ab60a05a5eae", "73bdd1cbc087e10d");
},{"./bundle-url":"2146da1905b95151ed14d455c784e7b7","./relative-path":"1b9943ef25c7bbdf0dd1b9fa91880a6c"}],"863e7aa2f5b8c9e650428f665bde7d00":[function(require,module,exports) {
module.exports = require('./bundle-url').getBundleURL() + require('./relative-path')("c3b2ab60a05a5eae", "cfb265f2a0bc841e");
},{"./bundle-url":"2146da1905b95151ed14d455c784e7b7","./relative-path":"1b9943ef25c7bbdf0dd1b9fa91880a6c"}],"b20f8f88fdac58e8f22c062f2cde60a6":[function(require,module,exports) {
module.exports = require('./bundle-url').getBundleURL() + require('./relative-path')("c3b2ab60a05a5eae", "b131a919ab77a520");
},{"./bundle-url":"2146da1905b95151ed14d455c784e7b7","./relative-path":"1b9943ef25c7bbdf0dd1b9fa91880a6c"}],"eb2f7c8b5cf13ec4c2384a939eda3eb0":[function(require,module,exports) {
module.exports = require('./bundle-url').getBundleURL() + require('./relative-path')("c3b2ab60a05a5eae", "9d362448b79e559b");
},{"./bundle-url":"2146da1905b95151ed14d455c784e7b7","./relative-path":"1b9943ef25c7bbdf0dd1b9fa91880a6c"}],"42bb5ba97b56ade705ff45b63338f76a":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Paddle = void 0;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class Paddle {
  constructor(speed, paddleWidth, paddleHeight, position, image) {
    _defineProperty(this, "paddleImage", new Image());

    _defineProperty(this, "handleKeyUp", e => {
      if (e.code === "ArrowLeft" || e.key === "ArrowLeft") this.moveLeft = false;
      if (e.code === "ArrowRight" || e.key === "ArrowRight") this.moveRight = false;
    });

    _defineProperty(this, "handleKeyDown", e => {
      if (e.code === "ArrowLeft" || e.key === "ArrowLeft") this.moveLeft = true;
      if (e.code === "ArrowRight" || e.key === "ArrowRight") this.moveRight = true;
    });

    this.speed = speed;
    this.paddleWidth = paddleWidth;
    this.paddleHeight = paddleHeight;
    this.position = position;
    this.speed = speed;
    this.paddleWidth = paddleWidth;
    this.paddleHeight = paddleHeight;
    this.position = position;
    this.moveLeft = false;
    this.moveRight = false;
    this.paddleImage.src = image; // Event Listeners

    document.addEventListener('keydown', this.handleKeyDown);
    document.addEventListener('keyup', this.handleKeyUp);
  } // Getters


  get width() {
    return this.paddleWidth;
  }

  get height() {
    return this.paddleHeight;
  }

  get pos() {
    return this.position;
  }

  get image() {
    return this.paddleImage;
  }

  get isMovingLeft() {
    return this.moveLeft;
  }

  get isMovingRight() {
    return this.moveRight;
  }

  movePaddle() {
    if (this.moveLeft) this.pos.x -= this.speed;
    if (this.moveRight) this.pos.x += this.speed;
  }

}

exports.Paddle = Paddle;
},{}],"0348e1dc296632f8f16c921ef9490e1f":[function(require,module,exports) {
module.exports = require('./bundle-url').getBundleURL() + require('./relative-path')("c3b2ab60a05a5eae", "a060715d74fc36b0");
},{"./bundle-url":"2146da1905b95151ed14d455c784e7b7","./relative-path":"1b9943ef25c7bbdf0dd1b9fa91880a6c"}],"8dcdb765250c1eeae7e48ffc27fca110":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Ball = void 0;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class Ball {
  constructor(ballSize, position, speed, image) {
    _defineProperty(this, "ballImage", new Image());

    this.ballSize = ballSize;
    this.position = position;
    this.ballSize = ballSize;
    this.position = position;
    this.speed = {
      x: speed,
      y: -speed
    }, this.ballImage.src = image;
  } // Getters


  get width() {
    return this.ballSize;
  }

  get height() {
    return this.ballSize;
  }

  get pos() {
    return this.position;
  }

  get image() {
    return this.ballImage;
  } // Methods


  changeYDirection() {
    this.speed.y = -this.speed.y;
  }

  changeXDirection() {
    this.speed.x = -this.speed.x;
  }

  moveBall() {
    this.pos.x += this.speed.x;
    this.pos.y += this.speed.y;
  }

}

exports.Ball = Ball;
},{}],"fee7523e0bab4ecb2d3eae476120072e":[function(require,module,exports) {
module.exports = require('./bundle-url').getBundleURL() + require('./relative-path')("c3b2ab60a05a5eae", "f28ece03f7046d22");
},{"./bundle-url":"2146da1905b95151ed14d455c784e7b7","./relative-path":"1b9943ef25c7bbdf0dd1b9fa91880a6c"}],"c1547fd9436f6a846e85a7781ca84cc5":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Collision = void 0;

// Types
class Collision {
  isCollidingBrick(ball, brick) {
    if (ball.pos.x < brick.pos.x + brick.width && ball.pos.x + ball.width > brick.pos.x && ball.pos.y < brick.pos.y + brick.height && ball.pos.y + ball.height > brick.pos.y) {
      return true;
    }

    return false;
  } // Check ball collision with bricks


  isCollidingBricks(ball, bricks) {
    let colliding = false;
    bricks.forEach((brick, i) => {
      if (this.isCollidingBrick(ball, brick)) {
        ball.changeYDirection();

        if (brick.energy === 1) {
          bricks.splice(i, 1);
        } else {
          brick.energy -= 1;
        }

        colliding = true;
      }
    });
    return colliding;
  }

  checkBallCollision(ball, paddle, view) {
    // Check ball collision with paddle
    if (ball.pos.x + ball.width > paddle.pos.x && ball.pos.x < paddle.pos.x + paddle.width && ball.pos.y + ball.height === paddle.pos.y) {
      ball.changeYDirection();
    } // Check ball collision with walls
    // Ball movement X constraints


    if (ball.pos.x > view.canvas.width - ball.width || ball.pos.x < 0) {
      ball.changeXDirection();
    } // Ball movement Y constraints


    if (ball.pos.y < 0) {
      ball.changeYDirection();
    }
  }

}

exports.Collision = Collision;
},{}]},{},["0fcac8ab3ce0ef713b176cc21d7843cb","f2f497094f3d929c275dbe4e29a3cb4a","7843b3960e086726267ff606847fc92b"], null)

//# sourceMappingURL=arkanoid.17d264b5.js.map
