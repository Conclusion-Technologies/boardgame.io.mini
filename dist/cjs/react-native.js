'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

require('nanoid/non-secure');
require('./index-014e9b03.js');
require('redux');
require('./turn-order-183d6eb6.js');
require('immer');
require('lodash.isplainobject');
require('./reducer-9d0c3a85.js');
require('rfc6902');
require('./initialize-54269c98.js');
require('./transport-6284017b.js');
var client = require('./client-6c605c6a.js');
var _rollupPluginBabelHelpers = require('./_rollupPluginBabelHelpers-299ca838.js');
var React = _interopDefault(require('react'));
var PropTypes = _interopDefault(require('prop-types'));

/**
 * Client
 *
 * boardgame.io React Native client.
 *
 * @param {...object} game - The return value of `Game`.
 * @param {...object} numPlayers - The number of players.
 * @param {...object} board - The React component for the game.
 * @param {...object} loading - (optional) The React component for the loading state.
 * @param {...object} multiplayer - Set to a falsy value or a transportFactory, e.g., SocketIO()
 * @param {...object} enhancer - Optional enhancer to send to the Redux store
 *
 * Returns:
 *   A React Native component that wraps board and provides an
 *   API through props for it to interact with the framework
 *   and dispatch actions such as MAKE_MOVE.
 */

function Client(opts) {
  var _class, _temp;

  var game = opts.game,
      numPlayers = opts.numPlayers,
      board = opts.board,
      multiplayer = opts.multiplayer,
      enhancer = opts.enhancer;
  /*
   * WrappedBoard
   *
   * The main React component that wraps the passed in
   * board component and adds the API to its props.
   */

  return _temp = _class = /*#__PURE__*/function (_React$Component) {
    _rollupPluginBabelHelpers._inherits(WrappedBoard, _React$Component);

    var _super = _rollupPluginBabelHelpers._createSuper(WrappedBoard);

    function WrappedBoard(props) {
      var _this;

      _rollupPluginBabelHelpers._classCallCheck(this, WrappedBoard);

      _this = _super.call(this, props);
      _this.client = client.Client({
        game: game,
        numPlayers: numPlayers,
        multiplayer: multiplayer,
        matchID: props.matchID,
        playerID: props.playerID,
        credentials: props.credentials,
        debug: false,
        enhancer: enhancer
      });
      return _this;
    }

    _rollupPluginBabelHelpers._createClass(WrappedBoard, [{
      key: "componentDidMount",
      value: function componentDidMount() {
        var _this2 = this;

        this.unsubscribe = this.client.subscribe(function () {
          return _this2.forceUpdate();
        });
        this.client.start();
      }
    }, {
      key: "componentWillUnmount",
      value: function componentWillUnmount() {
        this.client.stop();
        this.unsubscribe();
      }
    }, {
      key: "componentDidUpdate",
      value: function componentDidUpdate(prevProps) {
        if (prevProps.matchID != this.props.matchID) {
          this.client.updateMatchID(this.props.matchID);
        }

        if (prevProps.playerID != this.props.playerID) {
          this.client.updatePlayerID(this.props.playerID);
        }

        if (prevProps.credentials != this.props.credentials) {
          this.client.updateCredentials(this.props.credentials);
        }
      }
    }, {
      key: "render",
      value: function render() {
        var _board = null;
        var state = this.client.getState();

        var _this$props = this.props,
            matchID = _this$props.matchID,
            playerID = _this$props.playerID,
            rest = _rollupPluginBabelHelpers._objectWithoutProperties(_this$props, ["matchID", "playerID"]);

        if (board) {
          _board = /*#__PURE__*/React.createElement(board, _rollupPluginBabelHelpers._objectSpread2(_rollupPluginBabelHelpers._objectSpread2(_rollupPluginBabelHelpers._objectSpread2({}, state), rest), {}, {
            matchID: matchID,
            playerID: playerID,
            isMultiplayer: !!multiplayer,
            moves: this.client.moves,
            events: this.client.events,
            step: this.client.step,
            reset: this.client.reset,
            undo: this.client.undo,
            redo: this.client.redo,
            matchData: this.client.matchData,
            sendChatMessage: this.client.sendChatMessage,
            chatMessages: this.client.chatMessages
          }));
        }

        return _board;
      }
    }]);

    return WrappedBoard;
  }(React.Component), _rollupPluginBabelHelpers._defineProperty(_class, "propTypes", {
    // The ID of a game to connect to.
    // Only relevant in multiplayer.
    matchID: PropTypes.string,
    // The ID of the player associated with this client.
    // Only relevant in multiplayer.
    playerID: PropTypes.string,
    // This client's authentication credentials.
    // Only relevant in multiplayer.
    credentials: PropTypes.string
  }), _rollupPluginBabelHelpers._defineProperty(_class, "defaultProps", {
    matchID: 'default',
    playerID: null,
    credentials: null
  }), _temp;
}

exports.Client = Client;
