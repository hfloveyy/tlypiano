'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/*!
 * Bmob WeChat applet SDK
 * http://www.bmob.cn
 * Copyright Bmob, Inc.
 * The Bmob WeChat applet SDK is freely distributable under the MIT license.
 * (c) 2016-2050 Magic
 */

(function (root) {

  var io = 'undefined' === typeof module ? {} : module.exports;
  var BmobSocketIo = {};
  exports.BmobSocketIo = BmobSocketIo;

  /**
   * socket.io
   * Copyright(c) 2017 Magic <730170034@qq.com>
   * MIT Licensed
   */

  (function (exports, global, root) {

    /**
     * IO namespace.
     *
     * @namespace
     */

    var io = exports;

    /**
     *
     * @api public
     */

    io.version = 'V1.0.0';

    io.JSON = JSON;

    /**
     * Protocol implemented.
     *
     * @api public
     */

    io.protocol = 1;

    /**
     * Available transports, these will be populated with the available transports
     *
     * @api public
     */

    io.transports = [];

    /**
     * Keep track of jsonp callbacks.
     *
     * @api private
     */

    io.j = [];

    /**
     * Keep track of our io.Sockets
     *
     * @api private
     */
    io.sockets = {};
    /**
    * Manages connections to hosts.
    *
    * @param {String} uri
    * @Param {Boolean} force creation of new socket (defaults to false)
    * @api public
    */

    io.connect = function (host, details) {
      var uri = io.util.parseUri(host),
          uuri,
          socket;

      if (global && global.location) {
        uri.protocol = uri.protocol || global.location.protocol.slice(0, -1);
        uri.host = uri.host;
        uri.port = uri.port || global.location.port;
      }

      uuri = io.util.uniqueUri(uri);

      var options = {
        host: uri.host,
        secure: 'https' == uri.protocol,
        port: "",
        query: uri.query || ''
      };

      io.util.merge(options, details);

      if (options['force new connection'] || !io.sockets[uuri]) {
        socket = new io.Socket(options);
      }

      if (!options['force new connection'] && socket) {
        io.sockets[uuri] = socket;
      }

      console.log("connect");
      socket = socket || io.sockets[uuri];

      // if path is different from '' or /
      return socket.of(uri.path.length > 1 ? uri.path : '');
    };
  })('object' === (typeof module === 'undefined' ? 'undefined' : _typeof(module)) ? module.exports : this.io = {}, this);

  /**
   * socket.io
   * Copyright(c) 2017 Magic <730170034@qq.com>
   * MIT Licensed
   */

  (function (exports, io) {

    /**
     * Expose constructor.
     */

    exports.EventEmitter = EventEmitter;

    /**
     * Event emitter constructor.
     *
     * @api public.
     */

    function EventEmitter() {};

    /**
     * Adds a listener
     *
     * @api public
     */

    EventEmitter.prototype.on = function (name, fn) {
      if (!this.$events) {
        this.$events = {};
      }

      if (!this.$events[name]) {
        this.$events[name] = fn;
      } else if (io.util.isArray(this.$events[name])) {
        this.$events[name].push(fn);
      } else {
        this.$events[name] = [this.$events[name], fn];
      }

      return this;
    };

    EventEmitter.prototype.addListener = EventEmitter.prototype.on;

    /**
     * Adds a volatile listener.
     *
     * @api public
     */

    EventEmitter.prototype.once = function (name, fn) {
      var self = this;

      function on() {
        self.removeListener(name, on);
        fn.apply(this, arguments);
      };

      on.listener = fn;
      this.on(name, on);

      return this;
    };

    /**
     * Removes a listener.
     *
     * @api public
     */

    EventEmitter.prototype.removeListener = function (name, fn) {
      if (this.$events && this.$events[name]) {
        var list = this.$events[name];

        if (io.util.isArray(list)) {
          var pos = -1;

          for (var i = 0, l = list.length; i < l; i++) {
            if (list[i] === fn || list[i].listener && list[i].listener === fn) {
              pos = i;
              break;
            }
          }

          if (pos < 0) {
            return this;
          }

          list.splice(pos, 1);

          if (!list.length) {
            delete this.$events[name];
          }
        } else if (list === fn || list.listener && list.listener === fn) {
          delete this.$events[name];
        }
      }

      return this;
    };

    /**
     * Removes all listeners for an event.
     *
     * @api public
     */

    EventEmitter.prototype.removeAllListeners = function (name) {
      if (name === undefined) {
        this.$events = {};
        return this;
      }

      if (this.$events && this.$events[name]) {
        this.$events[name] = null;
      }

      return this;
    };

    /**
     * Gets all listeners for a certain event.
     *
     * @api publci
     */

    EventEmitter.prototype.listeners = function (name) {
      if (!this.$events) {
        this.$events = {};
      }

      if (!this.$events[name]) {
        this.$events[name] = [];
      }

      if (!io.util.isArray(this.$events[name])) {
        this.$events[name] = [this.$events[name]];
      }

      return this.$events[name];
    };

    /**
     * Emits an event.
     *
     * @api public
     */

    EventEmitter.prototype.emit = function (name) {
      if (!this.$events) {
        return false;
      }

      var handler = this.$events[name];

      if (!handler) {
        return false;
      }

      var args = Array.prototype.slice.call(arguments, 1);

      if ('function' == typeof handler) {
        handler.apply(this, args);
      } else if (io.util.isArray(handler)) {
        var listeners = handler.slice();

        for (var i = 0, l = listeners.length; i < l; i++) {
          listeners[i].apply(this, args);
        }
      } else {
        return false;
      }

      return true;
    };
  })('undefined' != typeof io ? io : module.exports, 'undefined' != typeof io ? io : module.parent.exports);

  /**
   * socket.io
   * Copyright(c) 2017 Magic <730170034@qq.com>
   * MIT Licensed
   */

  (function (exports, global) {

    /**
     * Utilities namespace.
     *
     * @namespace
     */

    var util = exports.util = {};

    /**
     * Parses an URI
     *
     * @api public
     */

    var re = /^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/;

    var parts = ['source', 'protocol', 'authority', 'userInfo', 'user', 'password', 'host', 'port', 'relative', 'path', 'directory', 'file', 'query', 'anchor'];

    util.parseUri = function (str) {
      var m = re.exec(str || ''),
          uri = {},
          i = 14;

      while (i--) {
        uri[parts[i]] = m[i] || '';
      }

      return uri;
    };

    /**
     * Produces a unique url that identifies a Socket.IO connection.
     *
     * @param {Object} uri
     * @api public
     */

    util.uniqueUri = function (uri) {
      var protocol = uri.protocol,
          host = uri.host,
          port = uri.port;

      if (global) {
        host = host || document.domain;
        port = port || (protocol == 'https' && document.location.protocol !== 'https:' ? 443 : document.location.port);
      } else {
        host = host || 'localhost';

        if (!port && protocol == 'https') {
          port = 443;
        }
      }

      return (protocol || 'http') + '://' + host + ':' + (port || 80);
    };

    /**
     * Mergest 2 query strings in to once unique query string
     *
     * @param {String} base
     * @param {String} addition
     * @api public
     */

    util.query = function (base, addition) {
      var query = util.chunkQuery(base || ''),
          components = [];

      util.merge(query, util.chunkQuery(addition || ''));
      for (var part in query) {
        if (query.hasOwnProperty(part)) {
          components.push(part + '=' + query[part]);
        }
      }

      return components.length ? '?' + components.join('&') : '';
    };

    /**
     * Transforms a querystring in to an object
     *
     * @param {String} qs
     * @api public
     */

    util.chunkQuery = function (qs) {
      var query = {},
          params = qs.split('&'),
          i = 0,
          l = params.length,
          kv;

      for (; i < l; ++i) {
        kv = params[i].split('=');
        if (kv[0]) {
          query[kv[0]] = kv[1];
        }
      }

      return query;
    };

    /**
     * Executes the given function when the page is loaded.
     *
     *     io.util.load(function () { console.log('page loaded'); });
     *
     * @param {Function} fn
     * @api public
     */

    var pageLoaded = false;

    util.load = function (fn) {
      if (pageLoaded) {
        return fn();
      }

      util.on(global, 'load', fn, false);
    };

    /**
     * Adds an event.
     *
     * @api private
     */

    util.on = function (element, event, fn, capture) {
      if (element.attachEvent) {
        element.attachEvent('on' + event, fn);
      } else if (element.addEventListener) {
        element.addEventListener(event, fn, capture);
      }
    };

    /**
     * Change the internal pageLoaded value.
     */

    if ('undefined' != typeof window) {
      util.load(function () {
        pageLoaded = true;
      });
    }

    /**
     * Defers a function to ensure a spinner is not displayed by the browser
     *
     * @param {Function} fn
     * @api public
     */

    util.defer = function (fn) {
      if (!util.ua.webkit || 'undefined' != typeof importScripts) {
        return fn();
      }

      util.load(function () {
        setTimeout(fn, 100);
      });
    };

    /**
     * Merges two objects.
     *
     * @api public
     */

    util.merge = function merge(target, additional, deep, lastseen) {
      var seen = lastseen || [],
          depth = typeof deep == 'undefined' ? 2 : deep,
          prop;

      for (prop in additional) {
        if (additional.hasOwnProperty(prop) && util.indexOf(seen, prop) < 0) {
          if (_typeof(target[prop]) !== 'object' || !depth) {
            target[prop] = additional[prop];
            seen.push(additional[prop]);
          } else {
            util.merge(target[prop], additional[prop], depth - 1, seen);
          }
        }
      }

      return target;
    };

    /**
     * Merges prototypes from objects
     *
     * @api public
     */

    util.mixin = function (ctor, ctor2) {
      util.merge(ctor.prototype, ctor2.prototype);
    };

    /**
     * Shortcut for prototypical and static inheritance.
     *
     * @api private
     */

    util.inherit = function (ctor, ctor2) {
      function f() {};
      f.prototype = ctor2.prototype;
      ctor.prototype = new f();
    };

    /**
     * Checks if the given object is an Array.
     *
     *     io.util.isArray([]); // true
     *     io.util.isArray({}); // false
     *
     * @param Object obj
     * @api public
     */

    util.isArray = Array.isArray || function (obj) {
      return Object.prototype.toString.call(obj) === '[object Array]';
    };

    /**
     * Intersects values of two arrays into a third
     *
     * @api public
     */

    util.intersect = function (arr, arr2) {
      var ret = [],
          longest = arr.length > arr2.length ? arr : arr2,
          shortest = arr.length > arr2.length ? arr2 : arr;

      for (var i = 0, l = shortest.length; i < l; i++) {
        if (~util.indexOf(longest, shortest[i])) ret.push(shortest[i]);
      }

      return ret;
    };

    /**
     * Array indexOf compatibility.
     *
     * @see bit.ly/a5Dxa2
     * @api public
     */

    util.indexOf = function (arr, o, i) {

      for (var j = arr.length, i = i < 0 ? i + j < 0 ? 0 : i + j : i || 0; i < j && arr[i] !== o; i++) {}

      return j <= i ? -1 : i;
    };

    /**
     * Converts enumerables to array.
     *
     * @api public
     */

    util.toArray = function (enu) {
      var arr = [];

      for (var i = 0, l = enu.length; i < l; i++) {
        arr.push(enu[i]);
      }return arr;
    };

    /**
     * UA / engines detection namespace.
     *
     * @namespace
     */

    util.ua = {};

    /**
     * Whether the UA supports CORS for XHR.
     *
     * @api public
     */

    util.ua.hasCORS = 'undefined' != typeof XMLHttpRequest && function () {
      try {
        var a = new XMLHttpRequest();
      } catch (e) {
        return false;
      }

      return a.withCredentials != undefined;
    }();

    /**
     * Detect webkit.
     *
     * @api public
     */

    util.ua.webkit = 'undefined' != typeof navigator && /webkit/i.test(navigator.userAgent);

    /**
    * Detect iPad/iPhone/iPod.
    *
    * @api public
    */

    util.ua.iDevice = 'undefined' != typeof navigator && /iPad|iPhone|iPod/i.test(navigator.userAgent);
  })('undefined' != typeof io ? io : module.exports, this);

  /**
  * socket.io
  * Copyright(c) 2017 Magic <730170034@qq.com>
  * MIT Licensed
  */

  (function (exports, io, global) {

    /**
     * Expose constructor.
     */

    exports.Socket = Socket;

    /**
     * Create a new `Socket.IO client` which can establish a persistent
     * connection with a Socket.IO enabled server.
     *
     * @api public
     */

    function Socket(options) {
      this.options = {
        port: 80,
        secure: true,
        document: false,
        resource: 'socket.io',
        transports: io.transports,
        'connect timeout': 10000,
        'try multiple transports': true,
        'reconnect': true,
        'reconnection delay': 500,
        'reconnection limit': Infinity,
        'reopen delay': 3000,
        'max reconnection attempts': 10,
        'sync disconnect on unload': false,
        'auto connect': true,
        'flash policy port': 10843,
        'manualFlush': false
      };

      io.util.merge(this.options, options);

      this.connected = false;
      this.open = false;
      this.connecting = false;
      this.reconnecting = false;
      this.namespaces = {};
      this.buffer = [];
      this.doBuffer = false;

      if (this.options['sync disconnect on unload'] && (!this.isXDomain() || io.util.ua.hasCORS)) {
        var self = this;
        io.util.on(global, 'beforeunload', function () {
          self.disconnectSync();
        }, false);
      }

      if (this.options['auto connect']) {
        this.connect();
      }
    };

    /**
     * Apply EventEmitter mixin.
     */

    io.util.mixin(Socket, io.EventEmitter);

    /**
     * Returns a namespace listener/emitter for this socket
     *
     * @api public
     */

    Socket.prototype.of = function (name) {
      if (!this.namespaces[name]) {
        this.namespaces[name] = new io.SocketNamespace(this, name);

        if (name !== '') {
          this.namespaces[name].packet({ type: 'connect' });
        }
      }

      return this.namespaces[name];
    };

    /**
     * Emits the given event to the Socket and all namespaces
     *
     * @api private
     */

    Socket.prototype.publish = function () {
      this.emit.apply(this, arguments);

      var nsp;

      for (var i in this.namespaces) {
        if (this.namespaces.hasOwnProperty(i)) {
          nsp = this.of(i);
          nsp.$emit.apply(nsp, arguments);
        }
      }
    };

    /**
     * 链接 handshake
     *
     * @api private
     */

    function empty() {};

    Socket.prototype.handshake = function (fn) {
      var self = this,
          options = this.options;

      function complete(data) {
        if (data instanceof Error) {
          self.connecting = false;
          self.onError(data.message);
        } else {
          fn.apply(null, data.split(':'));
        }
      };

      options.secure = true;
      var url = ['http' + (options.secure ? 's' : '') + ':/', options.host, options.resource, io.protocol, io.util.query(this.options.query, 't=' + +new Date())].join('/');

      var dataObject = {};
      var data = JSON.stringify(dataObject);

      var method = "GET";

      wx.request({
        method: method,
        url: url,
        data: data,
        header: {
          'content-type': 'text/plain'
        },
        success: function success(res) {
          if (res.data && res.data.code) {
            console.log("request error");
          } else if (res.statusCode != 200) {
            console.log("request error");
          } else {
            complete(res.data);
          }
        },
        fail: function fail(e) {
          console.log("request error");
        }
      });
    };

    /**
     * Find an available transport based on the options supplied in the constructor.
     *
     * @api private
     */

    Socket.prototype.getTransport = function (override) {
      var transports = override || this.transports,
          match;

      for (var i = 0, transport; transport = transports[i]; i++) {
        if (transport) {
          return new io.Transport[transport](this, this.sessionid);
        }
      }

      return null;
    };

    /**
     * Connects to the server.
     *
     * @param {Function} [fn] Callback.
     * @returns {io.Socket}
     * @api public
     */

    Socket.prototype.connect = function (fn) {
      if (this.connecting) {
        return this;
      }

      var self = this;
      self.connecting = true;

      this.handshake(function (sid, heartbeat, close, transports) {
        self.sessionid = sid;
        self.closeTimeout = close * 1000;
        self.heartbeatTimeout = heartbeat * 1000;

        if (!self.transports) self.transports = self.origTransports = transports ? io.util.intersect(transports.split(','), self.options.transports) : self.options.transports;

        self.setHeartbeatTimeout();

        function connect(transports) {
          if (self.transport) self.transport.clearTimeouts();

          self.transport = self.getTransport(transports);

          if (!self.transport) return self.publish('connect_failed');

          // once the transport is ready
          self.transport.ready(self, function () {
            self.connecting = true;
            self.publish('connecting', self.transport.name);
            self.transport.open();

            if (self.options['connect timeout']) {
              self.connectTimeoutTimer = setTimeout(function () {
                if (!self.connected) {
                  self.connecting = false;

                  if (self.options['try multiple transports']) {
                    var remaining = self.transports;

                    while (remaining.length > 0 && remaining.splice(0, 1)[0] != self.transport.name) {}

                    if (remaining.length) {
                      connect(remaining);
                    } else {
                      self.publish('connect_failed2');
                    }
                  }
                }
              }, self.options['connect timeout']);
            }
          });
        }

        connect(self.transports);

        self.once('connect', function () {
          clearTimeout(self.connectTimeoutTimer);

          fn && typeof fn == 'function' && fn();
        });
      });

      return this;
    };

    /**
     * Clears and sets a new heartbeat timeout using the value given by the
     * server during the handshake.
     *
     * @api private
     */

    Socket.prototype.setHeartbeatTimeout = function () {
      clearTimeout(this.heartbeatTimeoutTimer);
      if (this.transport && !this.transport.heartbeats()) return;

      var self = this;
      this.heartbeatTimeoutTimer = setTimeout(function () {
        self.transport.onClose();
      }, this.heartbeatTimeout);
    };

    /**
     * Sends a message.
     *
     * @param {Object} data packet.
     * @returns {io.Socket}
     * @api public
     */

    Socket.prototype.packet = function (data) {
      if (this.connected && !this.doBuffer) {
        this.transport.packet(data);
      } else {
        this.buffer.push(data);
      }

      return this;
    };

    /**
     * Sets buffer state
     *
     * @api private
     */

    Socket.prototype.setBuffer = function (v) {
      this.doBuffer = v;

      if (!v && this.connected && this.buffer.length) {
        if (!this.options['manualFlush']) {
          this.flushBuffer();
        }
      }
    };

    /**
     * Flushes the buffer data over the wire.
     * To be invoked manually when 'manualFlush' is set to true.
     *
     * @api public
     */

    Socket.prototype.flushBuffer = function () {
      this.transport.payload(this.buffer);
      this.buffer = [];
    };

    /**
     * Disconnect the established connect.
     *
     * @returns {io.Socket}
     * @api public
     */

    Socket.prototype.disconnect = function () {
      if (this.connected || this.connecting) {
        if (this.open) {
          this.of('').packet({ type: 'disconnect' });
        }

        // handle disconnection immediately
        this.onDisconnect('booted');
      }

      return this;
    };

    /**
     * Disconnects the socket with a sync XHR.
     *
     * @api private
     */

    Socket.prototype.disconnectSync = function () {
      // ensure disconnection
      var xhr = io.util.request();
      var uri = ['http' + (this.options.secure ? 's' : '') + ':/', this.options.host + ':' + this.options.port, this.options.resource, io.protocol, '', this.sessionid].join('/') + '/?disconnect=1';

      xhr.open('GET', uri, false);
      xhr.send(null);

      // handle disconnection immediately
      this.onDisconnect('booted');
    };

    /**
     * Check if we need to use cross domain enabled transports. Cross domain would
     * be a different port or different domain name.
     *
     * @returns {Boolean}
     * @api private
     */

    Socket.prototype.isXDomain = function () {

      // var port = global.location.port ||
      //   ('https:' == global.location.protocol ? 443 : 80);
      var port = "";

      return port;
    };

    /**
     * Called upon handshake.
     *
     * @api private
     */

    Socket.prototype.onConnect = function () {
      if (!this.connected) {
        this.connected = true;
        this.connecting = false;
        if (!this.doBuffer) {
          // make sure to flush the buffer
          this.setBuffer(false);
        }
        this.emit('connect');
      }
    };

    /**
     * Called when the transport opens
     *
     * @api private
     */

    Socket.prototype.onOpen = function () {
      this.open = true;
    };

    /**
     * Called when the transport closes.
     *
     * @api private
     */

    Socket.prototype.onClose = function () {
      this.open = false;
      clearTimeout(this.heartbeatTimeoutTimer);
    };

    /**
     * Called when the transport first opens a connection
     *
     * @param text
     */

    Socket.prototype.onPacket = function (packet) {
      this.of(packet.endpoint).onPacket(packet);
    };

    /**
     * Handles an error.
     *
     * @api private
     */

    Socket.prototype.onError = function (err) {
      if (err && err.advice) {
        if (err.advice === 'reconnect' && (this.connected || this.connecting)) {
          this.disconnect();
          if (this.options.reconnect) {
            this.reconnect();
          }
        }
      }

      this.publish('error', err && err.reason ? err.reason : err);
    };

    /**
     * Called when the transport disconnects.
     *
     * @api private
     */

    Socket.prototype.onDisconnect = function (reason) {
      var wasConnected = this.connected,
          wasConnecting = this.connecting;

      this.connected = false;
      this.connecting = false;
      this.open = false;

      if (wasConnected || wasConnecting) {
        this.transport.close();
        this.transport.clearTimeouts();
        if (wasConnected) {
          this.publish('disconnect', reason);

          if ('booted' != reason && this.options.reconnect && !this.reconnecting) {
            this.reconnect();
          }
        }
      }
    };

    /**
     * Called upon reconnection.
     *
     * @api private
     */

    Socket.prototype.reconnect = function () {
      this.reconnecting = true;
      this.reconnectionAttempts = 0;
      this.reconnectionDelay = this.options['reconnection delay'];

      var self = this,
          maxAttempts = this.options['max reconnection attempts'],
          tryMultiple = this.options['try multiple transports'],
          limit = this.options['reconnection limit'];

      function reset() {
        if (self.connected) {
          for (var i in self.namespaces) {
            if (self.namespaces.hasOwnProperty(i) && '' !== i) {
              self.namespaces[i].packet({ type: 'connect' });
            }
          }
          self.publish('reconnect', self.transport.name, self.reconnectionAttempts);
        }

        clearTimeout(self.reconnectionTimer);

        self.removeListener('connect_failed', maybeReconnect);
        self.removeListener('connect', maybeReconnect);

        self.reconnecting = false;

        delete self.reconnectionAttempts;
        delete self.reconnectionDelay;
        delete self.reconnectionTimer;
        delete self.redoTransports;

        self.options['try multiple transports'] = tryMultiple;
      };

      function maybeReconnect() {
        if (!self.reconnecting) {
          return;
        }

        if (self.connected) {
          return reset();
        };

        if (self.connecting && self.reconnecting) {
          return self.reconnectionTimer = setTimeout(maybeReconnect, 1000);
        }

        if (self.reconnectionAttempts++ >= maxAttempts) {
          if (!self.redoTransports) {
            self.on('connect_failed', maybeReconnect);
            self.options['try multiple transports'] = true;
            self.transports = self.origTransports;
            self.transport = self.getTransport();
            self.redoTransports = true;
            self.connect();
          } else {
            self.publish('reconnect_failed');
            reset();
          }
        } else {
          if (self.reconnectionDelay < limit) {
            self.reconnectionDelay *= 2; // exponential back off
          }

          self.connect();
          self.publish('reconnecting', self.reconnectionDelay, self.reconnectionAttempts);
          self.reconnectionTimer = setTimeout(maybeReconnect, self.reconnectionDelay);
        }
      };

      this.options['try multiple transports'] = false;
      this.reconnectionTimer = setTimeout(maybeReconnect, this.reconnectionDelay);

      this.on('connect', maybeReconnect);
    };
  })('undefined' != typeof io ? io : module.exports, 'undefined' != typeof io ? io : module.parent.exports, this);

  /**
   * socket.io
   * Copyright(c) 2017 Magic <730170034@qq.com>
   * MIT Licensed
   */

  (function (exports, io) {

    /**
     * Expose constructor.
     */

    exports.SocketNamespace = SocketNamespace;

    /**
     * Socket namespace constructor.
     *
     * @constructor
     * @api public
     */

    function SocketNamespace(socket, name) {
      this.socket = socket;
      this.name = name || '';
      this.flags = {};
      this.json = new Flag(this, 'json');
      this.ackPackets = 0;
      this.acks = {};
    };

    /**
     * Apply EventEmitter mixin.
     */

    io.util.mixin(SocketNamespace, io.EventEmitter);

    /**
     * Copies emit since we override it
     *
     * @api private
     */

    SocketNamespace.prototype.$emit = io.EventEmitter.prototype.emit;
    // SocketNamespace.prototype.$emit = false;

    /**
     * Creates a new namespace, by proxying the request to the socket. This
     * allows us to use the synax as we do on the server.
     *
     * @api public
     */

    SocketNamespace.prototype.of = function () {
      return this.socket.of.apply(this.socket, arguments);
    };

    /**
     * Sends a packet.
     *
     * @api private
     */

    SocketNamespace.prototype.packet = function (packet) {
      packet.endpoint = this.name;
      this.socket.packet(packet);
      this.flags = {};
      return this;
    };

    /**
     * Sends a message
     *
     * @api public
     */

    SocketNamespace.prototype.send = function (data, fn) {
      var packet = {
        type: this.flags.json ? 'json' : 'message',
        data: data
      };

      if ('function' == typeof fn) {
        packet.id = ++this.ackPackets;
        packet.ack = true;
        this.acks[packet.id] = fn;
      }

      return this.packet(packet);
    };

    /**
     * Emits an event
     *
     * @api public
     */

    SocketNamespace.prototype.emit = function (name) {
      var args = Array.prototype.slice.call(arguments, 1),
          lastArg = args[args.length - 1],
          packet = {
        type: 'event',
        name: name
      };

      if ('function' == typeof lastArg) {
        packet.id = ++this.ackPackets;
        packet.ack = 'data';
        this.acks[packet.id] = lastArg;
        args = args.slice(0, args.length - 1);
      }

      packet.args = args;

      return this.packet(packet);
    };

    /**
     * Disconnects the namespace
     *
     * @api private
     */

    SocketNamespace.prototype.disconnect = function () {
      if (this.name === '') {
        this.socket.disconnect();
      } else {
        this.packet({ type: 'disconnect' });
        this.$emit('disconnect');
      }

      return this;
    };

    /**
     * Handles a packet
     *
     * @api private
     */

    SocketNamespace.prototype.onPacket = function (packet) {
      var self = this;

      function ack() {
        self.packet({
          type: 'ack',
          args: io.util.toArray(arguments),
          ackId: packet.id
        });
      };

      switch (packet.type) {
        case 'connect':
          this.$emit('connect');
          break;

        case 'disconnect':
          if (this.name === '') {
            this.socket.onDisconnect(packet.reason || 'booted');
          } else {
            this.$emit('disconnect', packet.reason);
          }
          break;

        case 'message':
        case 'json':
          var params = ['message', packet.data];

          if (packet.ack == 'data') {
            params.push(ack);
          } else if (packet.ack) {
            this.packet({ type: 'ack', ackId: packet.id });
          }

          this.$emit.apply(this, params);
          break;

        case 'event':
          var params = [packet.name].concat(packet.args);

          if (packet.ack == 'data') params.push(ack);

          this.$emit.apply(this, params);
          break;

        case 'ack':
          if (this.acks[packet.ackId]) {
            this.acks[packet.ackId].apply(this, packet.args);
            delete this.acks[packet.ackId];
          }
          break;

        case 'error':
          if (packet.advice) {
            this.socket.onError(packet);
          } else {
            if (packet.reason == 'unauthorized') {
              this.$emit('connect_failed', packet.reason);
            } else {
              this.$emit('error', packet.reason);
            }
          }
          break;
      }
    };

    /**
     * Flag interface.
     *
     * @api private
     */

    function Flag(nsp, name) {
      this.namespace = nsp;
      this.name = name;
    };

    /**
     * Send a message
     *
     * @api public
     */

    Flag.prototype.send = function () {
      this.namespace.flags[this.name] = true;
      this.namespace.send.apply(this.namespace, arguments);
    };

    /**
     * Emit an event
     *
     * @api public
     */

    Flag.prototype.emit = function () {
      this.namespace.flags[this.name] = true;
      this.namespace.emit.apply(this.namespace, arguments);
    };
  })('undefined' != typeof io ? io : module.exports, 'undefined' != typeof io ? io : module.parent.exports);

  /**
   * socket.io
   * Copyright(c) 2017 Magic <730170034@qq.com>
   * MIT Licensed
   */

  (function (exports, io) {

    /**
     * Expose constructor.
     */

    exports.Transport = Transport;

    /**
     * This is the transport template for all supported transport methods.
     *
     * @constructor
     * @api public
     */

    function Transport(socket, sessid) {
      this.socket = socket;
      this.sessid = sessid;
    };

    /**
     * Apply EventEmitter mixin.
     */

    io.util.mixin(Transport, io.EventEmitter);

    /**
     * Indicates whether heartbeats is enabled for this transport
     *
     * @api private
     */

    Transport.prototype.heartbeats = function () {
      return true;
    };

    /**
     * Handles the response from the server. When a new response is received
     * it will automatically update the timeout, decode the message and
     * forwards the response to the onMessage function for further processing.
     *
     * @param {String} data Response from the server.
     * @api private
     */

    Transport.prototype.onData = function (data) {
      this.clearCloseTimeout();

      // If the connection in currently open (or in a reopening state) reset the close
      // timeout since we have just received data. This check is necessary so
      // that we don't reset the timeout on an explicitly disconnected connection.
      if (this.socket.connected || this.socket.connecting || this.socket.reconnecting) {
        this.setCloseTimeout();
      }

      if (data !== '') {
        // todo: we should only do decodePayload for xhr transports
        var msgs = io.parser.decodePayload(data);

        if (msgs && msgs.length) {
          for (var i = 0, l = msgs.length; i < l; i++) {
            this.onPacket(msgs[i]);
          }
        }
      }

      return this;
    };

    /**
     * Handles packets.
     *
     * @api private
     */

    Transport.prototype.onPacket = function (packet) {
      this.socket.setHeartbeatTimeout();

      if (packet.type == 'heartbeat') {
        return this.onHeartbeat();
      }

      if (packet.type == 'connect' && packet.endpoint == '') {
        this.onConnect();
      }

      if (packet.type == 'error' && packet.advice == 'reconnect') {
        this.isOpen = false;
      }

      this.socket.onPacket(packet);

      return this;
    };

    /**
     * Sets close timeout
     *
     * @api private
     */

    Transport.prototype.setCloseTimeout = function () {
      if (!this.closeTimeout) {
        var self = this;

        this.closeTimeout = setTimeout(function () {
          self.onDisconnect();
        }, this.socket.closeTimeout);
      }
    };

    /**
     * Called when transport disconnects.
     *
     * @api private
     */

    Transport.prototype.onDisconnect = function () {
      if (this.isOpen) this.close();
      this.clearTimeouts();
      this.socket.onDisconnect();
      return this;
    };

    /**
     * Called when transport connects
     *
     * @api private
     */

    Transport.prototype.onConnect = function () {
      this.socket.onConnect();
      return this;
    };

    /**
     * Clears close timeout
     *
     * @api private
     */

    Transport.prototype.clearCloseTimeout = function () {
      if (this.closeTimeout) {
        clearTimeout(this.closeTimeout);
        this.closeTimeout = null;
      }
    };

    /**
     * Clear timeouts
     *
     * @api private
     */

    Transport.prototype.clearTimeouts = function () {
      this.clearCloseTimeout();

      if (this.reopenTimeout) {
        clearTimeout(this.reopenTimeout);
      }
    };

    /**
     * Sends a packet
     *
     * @param {Object} packet object.
     * @api private
     */

    Transport.prototype.packet = function (packet) {
      this.send(io.parser.encodePacket(packet));
    };

    /**
     * Send the received heartbeat message back to server. So the server
     * knows we are still connected.
     *
     * @param {String} heartbeat Heartbeat response from the server.
     * @api private
     */

    Transport.prototype.onHeartbeat = function (heartbeat) {
      this.packet({ type: 'heartbeat' });
    };

    /**
     * Called when the transport opens.
     *
     * @api private
     */

    Transport.prototype.onOpen = function () {
      this.isOpen = true;
      this.clearCloseTimeout();
      this.socket.onOpen();
    };

    /**
     * Notifies the base when the connection with the Socket.IO server
     * has been disconnected.
     *
     * @api private
     */

    Transport.prototype.onClose = function () {
      var self = this;

      /* FIXME: reopen delay causing a infinit loop
      this.reopenTimeout = setTimeout(function () {
        self.open();
      }, this.socket.options['reopen delay']);*/

      this.isOpen = false;
      this.socket.onClose();
      this.onDisconnect();
    };

    /**
     * Generates a connection url based on the Socket.IO URL Protocol.
     * See <https://github.com/learnboost/socket.io-node/> for more details.
     *
     * @returns {String} Connection url
     * @api private
     */

    Transport.prototype.prepareUrl = function () {
      var options = this.socket.options;

      return this.scheme() + '://' + options.host + ':' + options.port + '/' + options.resource + '/' + io.protocol + '/' + this.name + '/' + this.sessid;
    };

    /**
     * Checks if the transport is ready to start a connection.
     *
     * @param {Socket} socket The socket instance that needs a transport
     * @param {Function} fn The callback
     * @api private
     */

    Transport.prototype.ready = function (socket, fn) {
      fn.call(this);
    };
  })('undefined' != typeof io ? io : module.exports, 'undefined' != typeof io ? io : module.parent.exports);

  /**
   * socket.io
   * Copyright(c) 2017 Magic <730170034@qq.com>
   * MIT Licensed
   */

  (function (exports, io, global) {

    /**
     * Expose constructor.
     */

    exports.websocket = WS;

    /**
     * The WebSocket transport uses the HTML5 WebSocket API to establish an
     * persistent connection with the Socket.IO server. This transport will also
     * be inherited by the FlashSocket fallback as it provides a API compatible
     * polyfill for the WebSockets.
     *
     * @constructor
     * @extends {io.Transport}
     * @api public
     */

    function WS(socket) {
      io.Transport.apply(this, arguments);
    };

    /**
     * Inherits from Transport.
     */

    io.util.inherit(WS, io.Transport);

    /**
     * Transport name
     *
     * @api public
     */

    WS.prototype.name = 'websocket';

    /**
     * Initializes a new `WebSocket` connection with the Socket.IO server. We attach
     * all the appropriate listeners to handle the responses from the server.
     *
     * @returns {Transport}
     * @api public
     */

    WS.prototype.open = function () {
      var query = io.util.query(this.socket.options.query),
          self = this,
          Socket;

      //微信Socket
      Socket = wx.connectSocket;

      //开始连接
      var url = this.prepareUrl() + query;
      this.websocket = new Socket({
        url: url,
        data: {
          x: '',
          y: ''
        },
        header: {
          'content-type': 'application/json'
        },
        protocols: ['protocol1'],
        method: "GET"
      });

      wx.onSocketOpen(function (res) {
        console.log('WebSocket连接已打开！');

        self.onOpen();
        self.socket.setBuffer(false);
      });

      wx.onSocketError(function (res) {
        console.log('WebSocket连接打开失败，请检查！');
      });

      wx.onSocketMessage(function (res) {
        console.log('收到服务器内容：' + res.data);
        self.onData(res.data);
      });

      this.websocket.send = function (res) {
        console.log("发送一次消息", res);
        wx.sendSocketMessage({
          data: res
        });
      };

      wx.onSocketClose(function (res) {
        self.onClose();
        self.socket.setBuffer(true);
        console.log('WebSocket 已关闭！');
      });

      this.websocket.close = function (res) {
        wx.closeSocket();
      };

      this.websocket.onopen = function () {
        self.onOpen();
        self.socket.setBuffer(false);
      };
      this.websocket.onmessage = function (ev) {
        self.onData(ev.data);
      };
      this.websocket.onclose = function () {
        self.onClose();
        self.socket.setBuffer(true);
      };
      this.websocket.onerror = function (e) {
        self.onError(e);
      };

      return this;
    };

    /**
     * Send a message to the Socket.IO server. The message will automatically be
     * encoded in the correct message format.
     *
     * @returns {Transport}
     * @api public
     */

    // Do to a bug in the current IDevices browser, we need to wrap the send in a
    // setTimeout, when they resume from sleeping the browser will crash if
    // we don't allow the browser time to detect the socket has been closed
    if (io.util.ua.iDevice) {
      WS.prototype.send = function (data) {
        var self = this;
        setTimeout(function () {
          self.websocket.send(data);
        }, 0);
        return this;
      };
    } else {
      WS.prototype.send = function (data) {
        this.websocket.send(data);
        return this;
      };
    }

    /**
     * Payload
     *
     * @api private
     */

    WS.prototype.payload = function (arr) {
      for (var i = 0, l = arr.length; i < l; i++) {
        this.packet(arr[i]);
      }
      return this;
    };

    /**
     * Disconnect the established `WebSocket` connection.
     *
     * @returns {Transport}
     * @api public
     */

    WS.prototype.close = function () {
      this.websocket.close();
      return this;
    };

    /**
     * Handle the errors that `WebSocket` might be giving when we
     * are attempting to connect or send messages.
     *
     * @param {Error} e The error.
     * @api private
     */

    WS.prototype.onError = function (e) {
      this.socket.onError(e);
    };

    /**
     * Returns the appropriate scheme for the URI generation.
     *
     * @api private
     */
    WS.prototype.scheme = function () {
      return this.socket.options.secure ? 'wss' : 'wss';
    };

    /**
     * Checks if the browser has support for native `WebSockets` and that
     * it's not the polyfill created for the FlashSocket transport.
     *
     * @return {Boolean}
     * @api public
     */

    WS.check = function () {
      return 'WebSocket' in global && !('__addTask' in WebSocket) || 'MozWebSocket' in global;
    };

    /**
     * Check if the `WebSocket` transport support cross domain communications.
     *
     * @returns {Boolean}
     * @api public
     */

    WS.xdomainCheck = function () {
      return true;
    };

    /**
     * Add the transport to your public io.transports array.
     *
     * @api private
     */

    io.transports.push('websocket');
  })('undefined' != typeof io ? io.Transport : module.exports, 'undefined' != typeof io ? io : module.parent.exports, this);

  /**
   * socket.io
   * Copyright(c) 2017 Magic <730170034@qq.com>
   * MIT Licensed
   */

  (function (exports, io) {
    console.log('9999', exports, 'lllll', io, '000000');
    /**
     * Parser namespace.
     *
     * @namespace
     */

    var parser = exports.parser = {};

    /**
     * Packet types.
     */

    var packets = parser.packets = ['disconnect', 'connect', 'heartbeat', 'message', 'json', 'event', 'ack', 'error', 'noop'];

    /**
     * Errors reasons.
     */

    var reasons = parser.reasons = ['transport not supported', 'client not handshaken', 'unauthorized'];

    /**
     * Errors advice.
     */

    var advice = parser.advice = ['reconnect'];

    /**
     * Shortcuts.
     */

    var JSON = io.JSON,
        indexOf = io.util.indexOf;

    /**
     * Encodes a packet.
     *
     * @api private
     */

    parser.encodePacket = function (packet) {
      var type = indexOf(packets, packet.type),
          id = packet.id || '',
          endpoint = packet.endpoint || '',
          ack = packet.ack,
          data = null;

      switch (packet.type) {
        case 'error':
          var reason = packet.reason ? indexOf(reasons, packet.reason) : '',
              adv = packet.advice ? indexOf(advice, packet.advice) : '';

          if (reason !== '' || adv !== '') data = reason + (adv !== '' ? '+' + adv : '');

          break;

        case 'message':
          if (packet.data !== '') data = packet.data;
          break;

        case 'event':
          var ev = { name: packet.name };

          if (packet.args && packet.args.length) {
            ev.args = packet.args;
          }

          data = JSON.stringify(ev);
          break;

        case 'json':
          data = JSON.stringify(packet.data);
          break;

        case 'connect':
          if (packet.qs) data = packet.qs;
          break;

        case 'ack':
          data = packet.ackId + (packet.args && packet.args.length ? '+' + JSON.stringify(packet.args) : '');
          break;
      }

      // construct packet with required fragments
      var encoded = [type, id + (ack == 'data' ? '+' : ''), endpoint];

      // data fragment is optional
      if (data !== null && data !== undefined) encoded.push(data);

      return encoded.join(':');
    };

    /**
     * Encodes multiple messages (payload).
     *
     * @param {Array} messages
     * @api private
     */

    parser.encodePayload = function (packets) {
      var decoded = '';

      if (packets.length == 1) return packets[0];

      for (var i = 0, l = packets.length; i < l; i++) {
        var packet = packets[i];
        decoded += '\uFFFD' + packet.length + '\uFFFD' + packets[i];
      }

      return decoded;
    };

    /**
     * Decodes a packet
     *
     * @api private
     */

    var regexp = /([^:]+):([0-9]+)?(\+)?:([^:]+)?:?([\s\S]*)?/;

    parser.decodePacket = function (data) {
      var pieces = data.match(regexp);

      if (!pieces) return {};

      var id = pieces[2] || '',
          data = pieces[5] || '',
          packet = {
        type: packets[pieces[1]],
        endpoint: pieces[4] || ''
      };

      // whether we need to acknowledge the packet
      if (id) {
        packet.id = id;
        if (pieces[3]) packet.ack = 'data';else packet.ack = true;
      }

      // handle different packet types
      switch (packet.type) {
        case 'error':
          var pieces = data.split('+');
          packet.reason = reasons[pieces[0]] || '';
          packet.advice = advice[pieces[1]] || '';
          break;

        case 'message':
          packet.data = data || '';
          break;

        case 'event':
          try {
            var opts = JSON.parse(data);
            packet.name = opts.name;
            packet.args = opts.args;
          } catch (e) {}

          packet.args = packet.args || [];
          break;

        case 'json':
          try {
            packet.data = JSON.parse(data);
          } catch (e) {}
          break;

        case 'connect':
          packet.qs = data || '';
          break;

        case 'ack':
          var pieces = data.match(/^([0-9]+)(\+)?(.*)/);
          if (pieces) {
            packet.ackId = pieces[1];
            packet.args = [];

            if (pieces[3]) {
              try {
                packet.args = pieces[3] ? JSON.parse(pieces[3]) : [];
              } catch (e) {}
            }
          }
          break;

        case 'disconnect':
        case 'heartbeat':
          break;
      };

      return packet;
    };

    /**
     * Decodes data payload. Detects multiple messages
     *
     * @return {Array} messages
     * @api public
     */

    parser.decodePayload = function (data) {
      // IE doesn't like data[i] for unicode chars, charAt works fine
      if (data.charAt(0) == '\uFFFD') {
        var ret = [];

        for (var i = 1, length = ''; i < data.length; i++) {
          if (data.charAt(i) == '\uFFFD') {
            ret.push(parser.decodePacket(data.substr(i + 1).substr(0, length)));
            i += Number(length) + 1;
            length = '';
          } else {
            length += data.charAt(i);
          }
        }

        return ret;
      } else {
        return [parser.decodePacket(data)];
      }
    };
  })('undefined' != typeof io ? io : module.exports, 'undefined' != typeof io ? io : module.parent.exports);

  /**
   * socket.io
   * Copyright(c) 2017 Magic <730170034@qq.com>
   * MIT Licensed
   */

  /**
  * 初始化时需要调用这个函数。可以从BmobSocketIo中获取所需的key
  *
  * @param {String} applicationId 你的 Application ID.
  * @param {String} masterKey (optional) 你的 BmobSocketIo Master Key.
  */
  BmobSocketIo.initialize = function (applicationId) {
    if (!applicationId) {
      throw "BmobSocketIo.initialize() need a applicationId";
    }
    BmobSocketIo._initialize(applicationId);
  };

  BmobSocketIo.serverURL = "wss://wss.bmob.cn/";

  BmobSocketIo.obj = null;

  BmobSocketIo.init = function (applicationId) {
    //sockeit obj
    BmobSocketIo.obj = io.connect(BmobSocketIo.serverURL);

    //监听服务器的响应
    BmobSocketIo.obj.on("server_pub", function (resp) {

      var data = JSON.parse(resp);

      switch (data.action) {
        case "updateTable":
          BmobSocketIo.onUpdateTable(data.tableName, data.data);
          break;
        case "updateRow":
          BmobSocketIo.onUpdateRow(data.tableName, data.objectId, data.data);
          break;
        case "deleteTable":
          BmobSocketIo.onDeleteTable(data.tableName, data.data);
          break;
        case "deleteRow":
          BmobSocketIo.onDeleteRow(data.tableName, data.objectId, data.data);
          break;
      }
    });

    // //连接上socket.io服务器后触发的事件
    BmobSocketIo.obj.on("client_send_data", function (resp) {
      io.BmobSocketIo.onInitListen();
    });

    BmobSocketIo.obj.on("disconnect", function () {
      console.log("You have disconnected from the server");
    });
  };

  /**
   * Call this method first to set up authentication tokens for BmobSocketIo.
   * This method is for BmobSocketIo's own private use.
   * @param {String} applicationId Your BmobSocketIo Application ID
   */
  BmobSocketIo._initialize = function (applicationId) {
    BmobSocketIo.applicationId = applicationId;

    // //sockeit obj
    // BmobSocketIo.obj = io.connect(BmobSocketIo.serverURL);

    // //监听服务器的响应
    // BmobSocketIo.obj.on("server_pub", function (resp) {

    //   var data = JSON.parse(resp);

    //   switch (data.action) {
    //     case "updateTable":
    //       BmobSocketIo.onUpdateTable(data.tableName, data.data);
    //       break;
    //     case "updateRow":
    //       BmobSocketIo.onUpdateRow(data.tableName, data.objectId, data.data);
    //       break;
    //     case "deleteTable":
    //       BmobSocketIo.onDeleteTable(data.tableName, data.data);
    //       break;
    //     case "deleteRow":
    //       BmobSocketIo.onDeleteRow(data.tableName, data.objectId, data.data);
    //       break;
    //   }
    // });

    // // //连接上socket.io服务器后触发的事件
    // BmobSocketIo.obj.on("client_send_data", function (resp) {
    //   io.BmobSocketIo.onInitListen();
    // });
  };

  //"unsub_updateTable" ,"unsub_updateRow", "unsub_deleteTable", "unsub_deleteRow"
  //订阅更新数据表的数据
  BmobSocketIo.updateTable = function (tablename) {

    var data = { "appKey": BmobSocketIo.applicationId, "tableName": tablename, "objectId": "", "action": "updateTable" };
    BmobSocketIo.obj.emit("client_sub", JSON.stringify(data));
  };

  //取消订阅更新数据表的数据
  BmobSocketIo.unsubUpdateTable = function (tablename) {

    var data = { "appKey": BmobSocketIo.applicationId, "tableName": tablename, "objectId": "", "action": "unsub_updateTable" };
    BmobSocketIo.obj.emit("client_unsub", JSON.stringify(data));
  };

  //订阅行更新的数据
  BmobSocketIo.updateRow = function (tablename, objectId) {

    var data = { "appKey": BmobSocketIo.applicationId, "tableName": tablename, "objectId": objectId, "action": "updateRow" };
    BmobSocketIo.obj.emit("client_sub", JSON.stringify(data));
  };

  //取消订阅行更新的数据
  BmobSocketIo.unsubUpdateRow = function (tablename, objectId) {

    var data = { "appKey": BmobSocketIo.applicationId, "tableName": tablename, "objectId": objectId, "action": "unsub_updateRow" };
    BmobSocketIo.obj.emit("client_unsub", JSON.stringify(data));
  };

  //订阅表删除的数据
  BmobSocketIo.deleteTable = function (tablename) {

    var data = { "appKey": BmobSocketIo.applicationId, "tableName": tablename, "objectId": "", "action": "deleteTable" };
    BmobSocketIo.obj.emit("client_sub", JSON.stringify(data));
  };

  //取消订阅表删除的数据
  BmobSocketIo.unsubDeleteTable = function (tablename) {

    var data = { "appKey": BmobSocketIo.applicationId, "tableName": tablename, "objectId": "", "action": "unsub_deleteTable" };
    BmobSocketIo.obj.emit("client_unsub", JSON.stringify(data));
  };

  //订阅更新数据表的数据
  BmobSocketIo.deleteRow = function (tablename, objectId) {

    var data = { "appKey": BmobSocketIo.applicationId, "tableName": tablename, "objectId": objectId, "action": "deleteRow" };
    BmobSocketIo.obj.emit("client_sub", JSON.stringify(data));
  };

  //订阅更新数据表的数据
  BmobSocketIo.unsubDeleteRow = function (tablename, objectId) {

    var data = { "appKey": BmobSocketIo.applicationId, "tableName": tablename, "objectId": objectId, "action": "unsub_deleteRow" };
    BmobSocketIo.obj.emit("client_unsub", JSON.stringify(data));
  };

  //监听服务器返回的更新数据表的数据，需要用户重写
  BmobSocketIo.onUpdateTable = function (tablename, data) {};

  //监听服务器返回的更新数据表的数据，需要用户重写
  BmobSocketIo.onUpdateRow = function (tablename, objectId, data) {};

  //监听服务器返回的更新数据表的数据，需要用户重写
  BmobSocketIo.onDeleteTable = function (tablename, data) {};

  //监听服务器返回的更新数据表的数据，需要用户重写
  BmobSocketIo.onDeleteRow = function (tablename, objectId, data) {};

  //初始连接socket.io服务器后，需要监听的事件都写在这个函数内，
  //注意，必须要把监听的数据写在这个函数内，
  //当浏览器因意外断网后，服务器上的订阅事件会取消，js脚本会重新连接服务器，写在这个函数内的订阅事件会重新在服务器上订阅
  BmobSocketIo.onInitListen = function () {};
}).call(undefined);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImJtb2JTb2NrZXRJby5qcyJdLCJuYW1lcyI6WyJyb290IiwiaW8iLCJtb2R1bGUiLCJleHBvcnRzIiwiQm1vYlNvY2tldElvIiwiZ2xvYmFsIiwidmVyc2lvbiIsIkpTT04iLCJwcm90b2NvbCIsInRyYW5zcG9ydHMiLCJqIiwic29ja2V0cyIsImNvbm5lY3QiLCJob3N0IiwiZGV0YWlscyIsInVyaSIsInV0aWwiLCJwYXJzZVVyaSIsInV1cmkiLCJzb2NrZXQiLCJsb2NhdGlvbiIsInNsaWNlIiwicG9ydCIsInVuaXF1ZVVyaSIsIm9wdGlvbnMiLCJzZWN1cmUiLCJxdWVyeSIsIm1lcmdlIiwiU29ja2V0IiwiY29uc29sZSIsImxvZyIsIm9mIiwicGF0aCIsImxlbmd0aCIsIkV2ZW50RW1pdHRlciIsInByb3RvdHlwZSIsIm9uIiwibmFtZSIsImZuIiwiJGV2ZW50cyIsImlzQXJyYXkiLCJwdXNoIiwiYWRkTGlzdGVuZXIiLCJvbmNlIiwic2VsZiIsInJlbW92ZUxpc3RlbmVyIiwiYXBwbHkiLCJhcmd1bWVudHMiLCJsaXN0ZW5lciIsImxpc3QiLCJwb3MiLCJpIiwibCIsInNwbGljZSIsInJlbW92ZUFsbExpc3RlbmVycyIsInVuZGVmaW5lZCIsImxpc3RlbmVycyIsImVtaXQiLCJoYW5kbGVyIiwiYXJncyIsIkFycmF5IiwiY2FsbCIsInBhcmVudCIsInJlIiwicGFydHMiLCJzdHIiLCJtIiwiZXhlYyIsImRvY3VtZW50IiwiZG9tYWluIiwiYmFzZSIsImFkZGl0aW9uIiwiY2h1bmtRdWVyeSIsImNvbXBvbmVudHMiLCJwYXJ0IiwiaGFzT3duUHJvcGVydHkiLCJqb2luIiwicXMiLCJwYXJhbXMiLCJzcGxpdCIsImt2IiwicGFnZUxvYWRlZCIsImxvYWQiLCJlbGVtZW50IiwiZXZlbnQiLCJjYXB0dXJlIiwiYXR0YWNoRXZlbnQiLCJhZGRFdmVudExpc3RlbmVyIiwid2luZG93IiwiZGVmZXIiLCJ1YSIsIndlYmtpdCIsImltcG9ydFNjcmlwdHMiLCJzZXRUaW1lb3V0IiwidGFyZ2V0IiwiYWRkaXRpb25hbCIsImRlZXAiLCJsYXN0c2VlbiIsInNlZW4iLCJkZXB0aCIsInByb3AiLCJpbmRleE9mIiwibWl4aW4iLCJjdG9yIiwiY3RvcjIiLCJpbmhlcml0IiwiZiIsIm9iaiIsIk9iamVjdCIsInRvU3RyaW5nIiwiaW50ZXJzZWN0IiwiYXJyIiwiYXJyMiIsInJldCIsImxvbmdlc3QiLCJzaG9ydGVzdCIsIm8iLCJ0b0FycmF5IiwiZW51IiwiaGFzQ09SUyIsIlhNTEh0dHBSZXF1ZXN0IiwiYSIsImUiLCJ3aXRoQ3JlZGVudGlhbHMiLCJuYXZpZ2F0b3IiLCJ0ZXN0IiwidXNlckFnZW50IiwiaURldmljZSIsInJlc291cmNlIiwiSW5maW5pdHkiLCJjb25uZWN0ZWQiLCJvcGVuIiwiY29ubmVjdGluZyIsInJlY29ubmVjdGluZyIsIm5hbWVzcGFjZXMiLCJidWZmZXIiLCJkb0J1ZmZlciIsImlzWERvbWFpbiIsImRpc2Nvbm5lY3RTeW5jIiwiU29ja2V0TmFtZXNwYWNlIiwicGFja2V0IiwidHlwZSIsInB1Ymxpc2giLCJuc3AiLCIkZW1pdCIsImVtcHR5IiwiaGFuZHNoYWtlIiwiY29tcGxldGUiLCJkYXRhIiwiRXJyb3IiLCJvbkVycm9yIiwibWVzc2FnZSIsInVybCIsIkRhdGUiLCJkYXRhT2JqZWN0Iiwic3RyaW5naWZ5IiwibWV0aG9kIiwid3giLCJyZXF1ZXN0IiwiaGVhZGVyIiwic3VjY2VzcyIsInJlcyIsImNvZGUiLCJzdGF0dXNDb2RlIiwiZmFpbCIsImdldFRyYW5zcG9ydCIsIm92ZXJyaWRlIiwibWF0Y2giLCJ0cmFuc3BvcnQiLCJUcmFuc3BvcnQiLCJzZXNzaW9uaWQiLCJzaWQiLCJoZWFydGJlYXQiLCJjbG9zZSIsImNsb3NlVGltZW91dCIsImhlYXJ0YmVhdFRpbWVvdXQiLCJvcmlnVHJhbnNwb3J0cyIsInNldEhlYXJ0YmVhdFRpbWVvdXQiLCJjbGVhclRpbWVvdXRzIiwicmVhZHkiLCJjb25uZWN0VGltZW91dFRpbWVyIiwicmVtYWluaW5nIiwiY2xlYXJUaW1lb3V0IiwiaGVhcnRiZWF0VGltZW91dFRpbWVyIiwiaGVhcnRiZWF0cyIsIm9uQ2xvc2UiLCJzZXRCdWZmZXIiLCJ2IiwiZmx1c2hCdWZmZXIiLCJwYXlsb2FkIiwiZGlzY29ubmVjdCIsIm9uRGlzY29ubmVjdCIsInhociIsInNlbmQiLCJvbkNvbm5lY3QiLCJvbk9wZW4iLCJvblBhY2tldCIsImVuZHBvaW50IiwiZXJyIiwiYWR2aWNlIiwicmVjb25uZWN0IiwicmVhc29uIiwid2FzQ29ubmVjdGVkIiwid2FzQ29ubmVjdGluZyIsInJlY29ubmVjdGlvbkF0dGVtcHRzIiwicmVjb25uZWN0aW9uRGVsYXkiLCJtYXhBdHRlbXB0cyIsInRyeU11bHRpcGxlIiwibGltaXQiLCJyZXNldCIsInJlY29ubmVjdGlvblRpbWVyIiwibWF5YmVSZWNvbm5lY3QiLCJyZWRvVHJhbnNwb3J0cyIsImZsYWdzIiwianNvbiIsIkZsYWciLCJhY2tQYWNrZXRzIiwiYWNrcyIsImlkIiwiYWNrIiwibGFzdEFyZyIsImFja0lkIiwiY29uY2F0IiwibmFtZXNwYWNlIiwic2Vzc2lkIiwib25EYXRhIiwiY2xlYXJDbG9zZVRpbWVvdXQiLCJzZXRDbG9zZVRpbWVvdXQiLCJtc2dzIiwicGFyc2VyIiwiZGVjb2RlUGF5bG9hZCIsIm9uSGVhcnRiZWF0IiwiaXNPcGVuIiwicmVvcGVuVGltZW91dCIsImVuY29kZVBhY2tldCIsInByZXBhcmVVcmwiLCJzY2hlbWUiLCJ3ZWJzb2NrZXQiLCJXUyIsImNvbm5lY3RTb2NrZXQiLCJ4IiwieSIsInByb3RvY29scyIsIm9uU29ja2V0T3BlbiIsIm9uU29ja2V0RXJyb3IiLCJvblNvY2tldE1lc3NhZ2UiLCJzZW5kU29ja2V0TWVzc2FnZSIsIm9uU29ja2V0Q2xvc2UiLCJjbG9zZVNvY2tldCIsIm9ub3BlbiIsIm9ubWVzc2FnZSIsImV2Iiwib25jbG9zZSIsIm9uZXJyb3IiLCJjaGVjayIsIldlYlNvY2tldCIsInhkb21haW5DaGVjayIsInBhY2tldHMiLCJyZWFzb25zIiwiYWR2IiwiZW5jb2RlZCIsImVuY29kZVBheWxvYWQiLCJkZWNvZGVkIiwicmVnZXhwIiwiZGVjb2RlUGFja2V0IiwicGllY2VzIiwib3B0cyIsInBhcnNlIiwiY2hhckF0Iiwic3Vic3RyIiwiTnVtYmVyIiwiaW5pdGlhbGl6ZSIsImFwcGxpY2F0aW9uSWQiLCJfaW5pdGlhbGl6ZSIsInNlcnZlclVSTCIsImluaXQiLCJyZXNwIiwiYWN0aW9uIiwib25VcGRhdGVUYWJsZSIsInRhYmxlTmFtZSIsIm9uVXBkYXRlUm93Iiwib2JqZWN0SWQiLCJvbkRlbGV0ZVRhYmxlIiwib25EZWxldGVSb3ciLCJvbkluaXRMaXN0ZW4iLCJ1cGRhdGVUYWJsZSIsInRhYmxlbmFtZSIsInVuc3ViVXBkYXRlVGFibGUiLCJ1cGRhdGVSb3ciLCJ1bnN1YlVwZGF0ZVJvdyIsImRlbGV0ZVRhYmxlIiwidW5zdWJEZWxldGVUYWJsZSIsImRlbGV0ZVJvdyIsInVuc3ViRGVsZXRlUm93Il0sIm1hcHBpbmdzIjoiOzs7O0FBQUE7Ozs7Ozs7O0FBU0MsV0FBVUEsSUFBVixFQUFnQjs7QUFFZixNQUFJQyxLQUFNLGdCQUFnQixPQUFPQyxNQUF2QixHQUFnQyxFQUFoQyxHQUFxQ0EsT0FBT0MsT0FBdEQ7QUFDQSxNQUFJQyxlQUFlLEVBQW5CO0FBQ0FELFVBQVFDLFlBQVIsR0FBdUJBLFlBQXZCOztBQUdBOzs7Ozs7QUFNQSxHQUFDLFVBQVVELE9BQVYsRUFBbUJFLE1BQW5CLEVBQTJCTCxJQUEzQixFQUFpQzs7QUFFaEM7Ozs7OztBQU1BLFFBQUlDLEtBQUtFLE9BQVQ7O0FBRUE7Ozs7O0FBS0FGLE9BQUdLLE9BQUgsR0FBYSxRQUFiOztBQUdBTCxPQUFHTSxJQUFILEdBQVVBLElBQVY7O0FBSUE7Ozs7OztBQU1BTixPQUFHTyxRQUFILEdBQWMsQ0FBZDs7QUFJQTs7Ozs7O0FBTUFQLE9BQUdRLFVBQUgsR0FBZ0IsRUFBaEI7O0FBRUE7Ozs7OztBQU1BUixPQUFHUyxDQUFILEdBQU8sRUFBUDs7QUFFQTs7Ozs7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SUFBakIsQ0FBc0IsWUFBdEIsRUFBb0NsRCxLQUFLb0osU0FBTCxDQUFlUCxJQUFmLENBQXBDO0FBRUQsR0FMRDs7QUFPQTtBQUNBaEosZUFBYWlTLGNBQWIsR0FBOEIsVUFBVVAsU0FBVixFQUFxQkwsUUFBckIsRUFBK0I7O0FBRTNELFFBQUlySSxPQUFPLEVBQUUsVUFBVWhKLGFBQWE0USxhQUF6QixFQUF3QyxhQUFhYyxTQUFyRCxFQUFnRSxZQUFZTCxRQUE1RSxFQUFzRixVQUFVLGlCQUFoRyxFQUFYO0FBQ0FyUixpQkFBYXVHLEdBQWIsQ0FBaUJsRCxJQUFqQixDQUFzQixjQUF0QixFQUFzQ2xELEtBQUtvSixTQUFMLENBQWVQLElBQWYsQ0FBdEM7QUFFRCxHQUxEOztBQVNBO0FBQ0FoSixlQUFha1IsYUFBYixHQUE2QixVQUFVUSxTQUFWLEVBQXFCMUksSUFBckIsRUFBMkIsQ0FFdkQsQ0FGRDs7QUFJQTtBQUNBaEosZUFBYW9SLFdBQWIsR0FBMkIsVUFBVU0sU0FBVixFQUFxQkwsUUFBckIsRUFBK0JySSxJQUEvQixFQUFxQyxDQUUvRCxDQUZEOztBQUlBO0FBQ0FoSixlQUFhc1IsYUFBYixHQUE2QixVQUFVSSxTQUFWLEVBQXFCMUksSUFBckIsRUFBMkIsQ0FFdkQsQ0FGRDs7QUFJQTtBQUNBaEosZUFBYXVSLFdBQWIsR0FBMkIsVUFBVUcsU0FBVixFQUFxQkwsUUFBckIsRUFBK0JySSxJQUEvQixFQUFxQyxDQUUvRCxDQUZEOztBQUlBO0FBQ0E7QUFDQTtBQUNBaEosZUFBYXdSLFlBQWIsR0FBNEIsWUFBWSxDQUV2QyxDQUZEO0FBSUQsQ0ExM0VBLEVBMDNFQy9OLElBMTNFRCxXQUFEIiwiZmlsZSI6ImJtb2JTb2NrZXRJby5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qIVxyXG4gKiBCbW9iIFdlQ2hhdCBhcHBsZXQgU0RLXHJcbiAqIGh0dHA6Ly93d3cuYm1vYi5jblxyXG4gKiBDb3B5cmlnaHQgQm1vYiwgSW5jLlxyXG4gKiBUaGUgQm1vYiBXZUNoYXQgYXBwbGV0IFNESyBpcyBmcmVlbHkgZGlzdHJpYnV0YWJsZSB1bmRlciB0aGUgTUlUIGxpY2Vuc2UuXHJcbiAqIChjKSAyMDE2LTIwNTAgTWFnaWNcclxuICovXHJcblxyXG5cclxuKGZ1bmN0aW9uIChyb290KSB7XHJcblxyXG4gIHZhciBpbyA9ICgndW5kZWZpbmVkJyA9PT0gdHlwZW9mIG1vZHVsZSA/IHt9IDogbW9kdWxlLmV4cG9ydHMpO1xyXG4gIHZhciBCbW9iU29ja2V0SW8gPSB7fTtcclxuICBleHBvcnRzLkJtb2JTb2NrZXRJbyA9IEJtb2JTb2NrZXRJbztcclxuXHJcblxyXG4gIC8qKlxyXG4gICAqIHNvY2tldC5pb1xyXG4gICAqIENvcHlyaWdodChjKSAyMDE3IE1hZ2ljIDw3MzAxNzAwMzRAcXEuY29tPlxyXG4gICAqIE1JVCBMaWNlbnNlZFxyXG4gICAqL1xyXG5cclxuICAoZnVuY3Rpb24gKGV4cG9ydHMsIGdsb2JhbCwgcm9vdCkge1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogSU8gbmFtZXNwYWNlLlxyXG4gICAgICpcclxuICAgICAqIEBuYW1lc3BhY2VcclxuICAgICAqL1xyXG5cclxuICAgIHZhciBpbyA9IGV4cG9ydHM7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKlxyXG4gICAgICogQGFwaSBwdWJsaWNcclxuICAgICAqL1xyXG5cclxuICAgIGlvLnZlcnNpb24gPSAnVjEuMC4wJztcclxuXHJcblxyXG4gICAgaW8uSlNPTiA9IEpTT047XHJcblxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIFByb3RvY29sIGltcGxlbWVudGVkLlxyXG4gICAgICpcclxuICAgICAqIEBhcGkgcHVibGljXHJcbiAgICAgKi9cclxuXHJcbiAgICBpby5wcm90b2NvbCA9IDE7XHJcblxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIEF2YWlsYWJsZSB0cmFuc3BvcnRzLCB0aGVzZSB3aWxsIGJlIHBvcHVsYXRlZCB3aXRoIHRoZSBhdmFpbGFibGUgdHJhbnNwb3J0c1xyXG4gICAgICpcclxuICAgICAqIEBhcGkgcHVibGljXHJcbiAgICAgKi9cclxuXHJcbiAgICBpby50cmFuc3BvcnRzID0gW107XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBLZWVwIHRyYWNrIG9mIGpzb25wIGNhbGxiYWNrcy5cclxuICAgICAqXHJcbiAgICAgKiBAYXBpIHByaXZhdGVcclxuICAgICAqL1xyXG5cclxuICAgIGlvLmogPSBbXTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEtlZXAgdHJhY2sgb2Ygb3VyIGlvLlNvY2tldHNcclxuICAgICAqXHJcbiAgICAgKiBAYXBpIHByaXZhdGVcclxuICAgICAqL1xyXG4gICAgaW8uc29ja2V0cyA9IHt9O1xyXG4gICAgLyoqXHJcbiAgICogTWFuYWdlcyBjb25uZWN0aW9ucyB0byBob3N0cy5cclxuICAgKlxyXG4gICAqIEBwYXJhbSB7U3RyaW5nfSB1cmlcclxuICAgKiBAUGFyYW0ge0Jvb2xlYW59IGZvcmNlIGNyZWF0aW9uIG9mIG5ldyBzb2NrZXQgKGRlZmF1bHRzIHRvIGZhbHNlKVxyXG4gICAqIEBhcGkgcHVibGljXHJcbiAgICovXHJcblxyXG4gICAgaW8uY29ubmVjdCA9IGZ1bmN0aW9uIChob3N0LCBkZXRhaWxzKSB7XHJcbiAgICAgIHZhciB1cmkgPSBpby51dGlsLnBhcnNlVXJpKGhvc3QpXHJcbiAgICAgICAgLCB1dXJpXHJcbiAgICAgICAgLCBzb2NrZXQ7XHJcblxyXG4gICAgICBpZiAoZ2xvYmFsICYmIGdsb2JhbC5sb2NhdGlvbikge1xyXG4gICAgICAgIHVyaS5wcm90b2NvbCA9IHVyaS5wcm90b2NvbCB8fCBnbG9iYWwubG9jYXRpb24ucHJvdG9jb2wuc2xpY2UoMCwgLTEpO1xyXG4gICAgICAgIHVyaS5ob3N0ID0gdXJpLmhvc3Q7XHJcbiAgICAgICAgdXJpLnBvcnQgPSB1cmkucG9ydCB8fCBnbG9iYWwubG9jYXRpb24ucG9ydDtcclxuICAgICAgfVxyXG5cclxuICAgICAgdXVyaSA9IGlvLnV0aWwudW5pcXVlVXJpKHVyaSk7XHJcblxyXG4gICAgICB2YXIgb3B0aW9ucyA9IHtcclxuICAgICAgICBob3N0OiB1cmkuaG9zdFxyXG4gICAgICAgICwgc2VjdXJlOiAnaHR0cHMnID09IHVyaS5wcm90b2NvbFxyXG4gICAgICAgICwgcG9ydDogXCJcIlxyXG4gICAgICAgICwgcXVlcnk6IHVyaS5xdWVyeSB8fCAnJ1xyXG4gICAgICB9O1xyXG5cclxuXHJcbiAgICAgIGlvLnV0aWwubWVyZ2Uob3B0aW9ucywgZGV0YWlscyk7XHJcblxyXG4gICAgICBpZiAob3B0aW9uc1snZm9yY2UgbmV3IGNvbm5lY3Rpb24nXSB8fCAhaW8uc29ja2V0c1t1dXJpXSkge1xyXG4gICAgICAgIHNvY2tldCA9IG5ldyBpby5Tb2NrZXQob3B0aW9ucyk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmICghb3B0aW9uc1snZm9yY2UgbmV3IGNvbm5lY3Rpb24nXSAmJiBzb2NrZXQpIHtcclxuICAgICAgICBpby5zb2NrZXRzW3V1cmldID0gc29ja2V0O1xyXG4gICAgICB9XHJcblxyXG5cclxuXHJcbiAgICAgIGNvbnNvbGUubG9nKFwiY29ubmVjdFwiKVxyXG4gICAgICBzb2NrZXQgPSBzb2NrZXQgfHwgaW8uc29ja2V0c1t1dXJpXTtcclxuXHJcbiAgICAgIC8vIGlmIHBhdGggaXMgZGlmZmVyZW50IGZyb20gJycgb3IgL1xyXG4gICAgICByZXR1cm4gc29ja2V0Lm9mKHVyaS5wYXRoLmxlbmd0aCA+IDEgPyB1cmkucGF0aCA6ICcnKTtcclxuICAgIH1cclxuXHJcbiAgfSkoJ29iamVjdCcgPT09IHR5cGVvZiBtb2R1bGUgPyBtb2R1bGUuZXhwb3J0cyA6ICh0aGlzLmlvID0ge30pLCB0aGlzKTtcclxuXHJcblxyXG5cclxuXHJcbiAgLyoqXHJcbiAgICogc29ja2V0LmlvXHJcbiAgICogQ29weXJpZ2h0KGMpIDIwMTcgTWFnaWMgPDczMDE3MDAzNEBxcS5jb20+XHJcbiAgICogTUlUIExpY2Vuc2VkXHJcbiAgICovXHJcblxyXG4gIChmdW5jdGlvbiAoZXhwb3J0cywgaW8pIHtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEV4cG9zZSBjb25zdHJ1Y3Rvci5cclxuICAgICAqL1xyXG5cclxuICAgIGV4cG9ydHMuRXZlbnRFbWl0dGVyID0gRXZlbnRFbWl0dGVyO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogRXZlbnQgZW1pdHRlciBjb25zdHJ1Y3Rvci5cclxuICAgICAqXHJcbiAgICAgKiBAYXBpIHB1YmxpYy5cclxuICAgICAqL1xyXG5cclxuICAgIGZ1bmN0aW9uIEV2ZW50RW1pdHRlcigpIHsgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEFkZHMgYSBsaXN0ZW5lclxyXG4gICAgICpcclxuICAgICAqIEBhcGkgcHVibGljXHJcbiAgICAgKi9cclxuXHJcbiAgICBFdmVudEVtaXR0ZXIucHJvdG90eXBlLm9uID0gZnVuY3Rpb24gKG5hbWUsIGZuKSB7XHJcbiAgICAgIGlmICghdGhpcy4kZXZlbnRzKSB7XHJcbiAgICAgICAgdGhpcy4kZXZlbnRzID0ge307XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmICghdGhpcy4kZXZlbnRzW25hbWVdKSB7XHJcbiAgICAgICAgdGhpcy4kZXZlbnRzW25hbWVdID0gZm47XHJcbiAgICAgIH0gZWxzZSBpZiAoaW8udXRpbC5pc0FycmF5KHRoaXMuJGV2ZW50c1tuYW1lXSkpIHtcclxuICAgICAgICB0aGlzLiRldmVudHNbbmFtZV0ucHVzaChmbik7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy4kZXZlbnRzW25hbWVdID0gW3RoaXMuJGV2ZW50c1tuYW1lXSwgZm5dO1xyXG4gICAgICB9XHJcblxyXG4gICAgICByZXR1cm4gdGhpcztcclxuICAgIH07XHJcblxyXG4gICAgRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5hZGRMaXN0ZW5lciA9IEV2ZW50RW1pdHRlci5wcm90b3R5cGUub247XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBBZGRzIGEgdm9sYXRpbGUgbGlzdGVuZXIuXHJcbiAgICAgKlxyXG4gICAgICogQGFwaSBwdWJsaWNcclxuICAgICAqL1xyXG5cclxuICAgIEV2ZW50RW1pdHRlci5wcm90b3R5cGUub25jZSA9IGZ1bmN0aW9uIChuYW1lLCBmbikge1xyXG4gICAgICB2YXIgc2VsZiA9IHRoaXM7XHJcblxyXG4gICAgICBmdW5jdGlvbiBvbigpIHtcclxuICAgICAgICBzZWxmLnJlbW92ZUxpc3RlbmVyKG5hbWUsIG9uKTtcclxuICAgICAgICBmbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xyXG4gICAgICB9O1xyXG5cclxuICAgICAgb24ubGlzdGVuZXIgPSBmbjtcclxuICAgICAgdGhpcy5vbihuYW1lLCBvbik7XHJcblxyXG4gICAgICByZXR1cm4gdGhpcztcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZW1vdmVzIGEgbGlzdGVuZXIuXHJcbiAgICAgKlxyXG4gICAgICogQGFwaSBwdWJsaWNcclxuICAgICAqL1xyXG5cclxuICAgIEV2ZW50RW1pdHRlci5wcm90b3R5cGUucmVtb3ZlTGlzdGVuZXIgPSBmdW5jdGlvbiAobmFtZSwgZm4pIHtcclxuICAgICAgaWYgKHRoaXMuJGV2ZW50cyAmJiB0aGlzLiRldmVudHNbbmFtZV0pIHtcclxuICAgICAgICB2YXIgbGlzdCA9IHRoaXMuJGV2ZW50c1tuYW1lXTtcclxuXHJcbiAgICAgICAgaWYgKGlvLnV0aWwuaXNBcnJheShsaXN0KSkge1xyXG4gICAgICAgICAgdmFyIHBvcyA9IC0xO1xyXG5cclxuICAgICAgICAgIGZvciAodmFyIGkgPSAwLCBsID0gbGlzdC5sZW5ndGg7IGkgPCBsOyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKGxpc3RbaV0gPT09IGZuIHx8IChsaXN0W2ldLmxpc3RlbmVyICYmIGxpc3RbaV0ubGlzdGVuZXIgPT09IGZuKSkge1xyXG4gICAgICAgICAgICAgIHBvcyA9IGk7XHJcbiAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICBpZiAocG9zIDwgMCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcztcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICBsaXN0LnNwbGljZShwb3MsIDEpO1xyXG5cclxuICAgICAgICAgIGlmICghbGlzdC5sZW5ndGgpIHtcclxuICAgICAgICAgICAgZGVsZXRlIHRoaXMuJGV2ZW50c1tuYW1lXTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2UgaWYgKGxpc3QgPT09IGZuIHx8IChsaXN0Lmxpc3RlbmVyICYmIGxpc3QubGlzdGVuZXIgPT09IGZuKSkge1xyXG4gICAgICAgICAgZGVsZXRlIHRoaXMuJGV2ZW50c1tuYW1lXTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFJlbW92ZXMgYWxsIGxpc3RlbmVycyBmb3IgYW4gZXZlbnQuXHJcbiAgICAgKlxyXG4gICAgICogQGFwaSBwdWJsaWNcclxuICAgICAqL1xyXG5cclxuICAgIEV2ZW50RW1pdHRlci5wcm90b3R5cGUucmVtb3ZlQWxsTGlzdGVuZXJzID0gZnVuY3Rpb24gKG5hbWUpIHtcclxuICAgICAgaWYgKG5hbWUgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgIHRoaXMuJGV2ZW50cyA9IHt9O1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAodGhpcy4kZXZlbnRzICYmIHRoaXMuJGV2ZW50c1tuYW1lXSkge1xyXG4gICAgICAgIHRoaXMuJGV2ZW50c1tuYW1lXSA9IG51bGw7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldHMgYWxsIGxpc3RlbmVycyBmb3IgYSBjZXJ0YWluIGV2ZW50LlxyXG4gICAgICpcclxuICAgICAqIEBhcGkgcHVibGNpXHJcbiAgICAgKi9cclxuXHJcbiAgICBFdmVudEVtaXR0ZXIucHJvdG90eXBlLmxpc3RlbmVycyA9IGZ1bmN0aW9uIChuYW1lKSB7XHJcbiAgICAgIGlmICghdGhpcy4kZXZlbnRzKSB7XHJcbiAgICAgICAgdGhpcy4kZXZlbnRzID0ge307XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmICghdGhpcy4kZXZlbnRzW25hbWVdKSB7XHJcbiAgICAgICAgdGhpcy4kZXZlbnRzW25hbWVdID0gW107XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmICghaW8udXRpbC5pc0FycmF5KHRoaXMuJGV2ZW50c1tuYW1lXSkpIHtcclxuICAgICAgICB0aGlzLiRldmVudHNbbmFtZV0gPSBbdGhpcy4kZXZlbnRzW25hbWVdXTtcclxuICAgICAgfVxyXG5cclxuICAgICAgcmV0dXJuIHRoaXMuJGV2ZW50c1tuYW1lXTtcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBFbWl0cyBhbiBldmVudC5cclxuICAgICAqXHJcbiAgICAgKiBAYXBpIHB1YmxpY1xyXG4gICAgICovXHJcblxyXG4gICAgRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5lbWl0ID0gZnVuY3Rpb24gKG5hbWUpIHtcclxuICAgICAgaWYgKCF0aGlzLiRldmVudHMpIHtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHZhciBoYW5kbGVyID0gdGhpcy4kZXZlbnRzW25hbWVdO1xyXG5cclxuICAgICAgaWYgKCFoYW5kbGVyKSB7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICB9XHJcblxyXG4gICAgICB2YXIgYXJncyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMSk7XHJcblxyXG4gICAgICBpZiAoJ2Z1bmN0aW9uJyA9PSB0eXBlb2YgaGFuZGxlcikge1xyXG4gICAgICAgIGhhbmRsZXIuYXBwbHkodGhpcywgYXJncyk7XHJcbiAgICAgIH0gZWxzZSBpZiAoaW8udXRpbC5pc0FycmF5KGhhbmRsZXIpKSB7XHJcbiAgICAgICAgdmFyIGxpc3RlbmVycyA9IGhhbmRsZXIuc2xpY2UoKTtcclxuXHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDAsIGwgPSBsaXN0ZW5lcnMubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XHJcbiAgICAgICAgICBsaXN0ZW5lcnNbaV0uYXBwbHkodGhpcywgYXJncyk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgfVxyXG5cclxuICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9O1xyXG5cclxuICB9KShcclxuICAgICd1bmRlZmluZWQnICE9IHR5cGVvZiBpbyA/IGlvIDogbW9kdWxlLmV4cG9ydHNcclxuICAgICwgJ3VuZGVmaW5lZCcgIT0gdHlwZW9mIGlvID8gaW8gOiBtb2R1bGUucGFyZW50LmV4cG9ydHNcclxuICAgICk7XHJcblxyXG5cclxuXHJcblxyXG4gIC8qKlxyXG4gICAqIHNvY2tldC5pb1xyXG4gICAqIENvcHlyaWdodChjKSAyMDE3IE1hZ2ljIDw3MzAxNzAwMzRAcXEuY29tPlxyXG4gICAqIE1JVCBMaWNlbnNlZFxyXG4gICAqL1xyXG5cclxuICAoZnVuY3Rpb24gKGV4cG9ydHMsIGdsb2JhbCkge1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogVXRpbGl0aWVzIG5hbWVzcGFjZS5cclxuICAgICAqXHJcbiAgICAgKiBAbmFtZXNwYWNlXHJcbiAgICAgKi9cclxuXHJcbiAgICB2YXIgdXRpbCA9IGV4cG9ydHMudXRpbCA9IHt9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogUGFyc2VzIGFuIFVSSVxyXG4gICAgICpcclxuICAgICAqIEBhcGkgcHVibGljXHJcbiAgICAgKi9cclxuXHJcbiAgICB2YXIgcmUgPSAvXig/Oig/IVteOkBdKzpbXjpAXFwvXSpAKShbXjpcXC8/Iy5dKyk6KT8oPzpcXC9cXC8pPygoPzooKFteOkBdKikoPzo6KFteOkBdKikpPyk/QCk/KFteOlxcLz8jXSopKD86OihcXGQqKSk/KSgoKFxcLyg/OltePyNdKD8hW14/I1xcL10qXFwuW14/I1xcLy5dKyg/Ols/I118JCkpKSpcXC8/KT8oW14/I1xcL10qKSkoPzpcXD8oW14jXSopKT8oPzojKC4qKSk/KS87XHJcblxyXG4gICAgdmFyIHBhcnRzID0gWydzb3VyY2UnLCAncHJvdG9jb2wnLCAnYXV0aG9yaXR5JywgJ3VzZXJJbmZvJywgJ3VzZXInLCAncGFzc3dvcmQnLFxyXG4gICAgICAnaG9zdCcsICdwb3J0JywgJ3JlbGF0aXZlJywgJ3BhdGgnLCAnZGlyZWN0b3J5JywgJ2ZpbGUnLCAncXVlcnknLFxyXG4gICAgICAnYW5jaG9yJ107XHJcblxyXG4gICAgdXRpbC5wYXJzZVVyaSA9IGZ1bmN0aW9uIChzdHIpIHtcclxuICAgICAgdmFyIG0gPSByZS5leGVjKHN0ciB8fCAnJylcclxuICAgICAgICAsIHVyaSA9IHt9XHJcbiAgICAgICAgLCBpID0gMTQ7XHJcblxyXG4gICAgICB3aGlsZSAoaS0tKSB7XHJcbiAgICAgICAgdXJpW3BhcnRzW2ldXSA9IG1baV0gfHwgJyc7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHJldHVybiB1cmk7XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogUHJvZHVjZXMgYSB1bmlxdWUgdXJsIHRoYXQgaWRlbnRpZmllcyBhIFNvY2tldC5JTyBjb25uZWN0aW9uLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSB1cmlcclxuICAgICAqIEBhcGkgcHVibGljXHJcbiAgICAgKi9cclxuXHJcbiAgICB1dGlsLnVuaXF1ZVVyaSA9IGZ1bmN0aW9uICh1cmkpIHtcclxuICAgICAgdmFyIHByb3RvY29sID0gdXJpLnByb3RvY29sXHJcbiAgICAgICAgLCBob3N0ID0gdXJpLmhvc3RcclxuICAgICAgICAsIHBvcnQgPSB1cmkucG9ydDtcclxuXHJcbiAgICAgIGlmIChnbG9iYWwpIHtcclxuICAgICAgICBob3N0ID0gaG9zdCB8fCBkb2N1bWVudC5kb21haW47XHJcbiAgICAgICAgcG9ydCA9IHBvcnQgfHwgKHByb3RvY29sID09ICdodHRwcydcclxuICAgICAgICAgICYmIGRvY3VtZW50LmxvY2F0aW9uLnByb3RvY29sICE9PSAnaHR0cHM6JyA/IDQ0MyA6IGRvY3VtZW50LmxvY2F0aW9uLnBvcnQpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGhvc3QgPSBob3N0IHx8ICdsb2NhbGhvc3QnO1xyXG5cclxuICAgICAgICBpZiAoIXBvcnQgJiYgcHJvdG9jb2wgPT0gJ2h0dHBzJykge1xyXG4gICAgICAgICAgcG9ydCA9IDQ0MztcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHJldHVybiAocHJvdG9jb2wgfHwgJ2h0dHAnKSArICc6Ly8nICsgaG9zdCArICc6JyArIChwb3J0IHx8IDgwKTtcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBNZXJnZXN0IDIgcXVlcnkgc3RyaW5ncyBpbiB0byBvbmNlIHVuaXF1ZSBxdWVyeSBzdHJpbmdcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gYmFzZVxyXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGFkZGl0aW9uXHJcbiAgICAgKiBAYXBpIHB1YmxpY1xyXG4gICAgICovXHJcblxyXG4gICAgdXRpbC5xdWVyeSA9IGZ1bmN0aW9uIChiYXNlLCBhZGRpdGlvbikge1xyXG4gICAgICB2YXIgcXVlcnkgPSB1dGlsLmNodW5rUXVlcnkoYmFzZSB8fCAnJylcclxuICAgICAgICAsIGNvbXBvbmVudHMgPSBbXTtcclxuXHJcbiAgICAgIHV0aWwubWVyZ2UocXVlcnksIHV0aWwuY2h1bmtRdWVyeShhZGRpdGlvbiB8fCAnJykpO1xyXG4gICAgICBmb3IgKHZhciBwYXJ0IGluIHF1ZXJ5KSB7XHJcbiAgICAgICAgaWYgKHF1ZXJ5Lmhhc093blByb3BlcnR5KHBhcnQpKSB7XHJcbiAgICAgICAgICBjb21wb25lbnRzLnB1c2gocGFydCArICc9JyArIHF1ZXJ5W3BhcnRdKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHJldHVybiBjb21wb25lbnRzLmxlbmd0aCA/ICc/JyArIGNvbXBvbmVudHMuam9pbignJicpIDogJyc7XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogVHJhbnNmb3JtcyBhIHF1ZXJ5c3RyaW5nIGluIHRvIGFuIG9iamVjdFxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBxc1xyXG4gICAgICogQGFwaSBwdWJsaWNcclxuICAgICAqL1xyXG5cclxuICAgIHV0aWwuY2h1bmtRdWVyeSA9IGZ1bmN0aW9uIChxcykge1xyXG4gICAgICB2YXIgcXVlcnkgPSB7fVxyXG4gICAgICAgICwgcGFyYW1zID0gcXMuc3BsaXQoJyYnKVxyXG4gICAgICAgICwgaSA9IDBcclxuICAgICAgICAsIGwgPSBwYXJhbXMubGVuZ3RoXHJcbiAgICAgICAgLCBrdjtcclxuXHJcbiAgICAgIGZvciAoOyBpIDwgbDsgKytpKSB7XHJcbiAgICAgICAga3YgPSBwYXJhbXNbaV0uc3BsaXQoJz0nKTtcclxuICAgICAgICBpZiAoa3ZbMF0pIHtcclxuICAgICAgICAgIHF1ZXJ5W2t2WzBdXSA9IGt2WzFdO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG5cclxuICAgICAgcmV0dXJuIHF1ZXJ5O1xyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEV4ZWN1dGVzIHRoZSBnaXZlbiBmdW5jdGlvbiB3aGVuIHRoZSBwYWdlIGlzIGxvYWRlZC5cclxuICAgICAqXHJcbiAgICAgKiAgICAgaW8udXRpbC5sb2FkKGZ1bmN0aW9uICgpIHsgY29uc29sZS5sb2coJ3BhZ2UgbG9hZGVkJyk7IH0pO1xyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGZuXHJcbiAgICAgKiBAYXBpIHB1YmxpY1xyXG4gICAgICovXHJcblxyXG4gICAgdmFyIHBhZ2VMb2FkZWQgPSBmYWxzZTtcclxuXHJcbiAgICB1dGlsLmxvYWQgPSBmdW5jdGlvbiAoZm4pIHtcclxuICAgICAgaWYgKHBhZ2VMb2FkZWQpIHtcclxuICAgICAgICByZXR1cm4gZm4oKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgdXRpbC5vbihnbG9iYWwsICdsb2FkJywgZm4sIGZhbHNlKTtcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBBZGRzIGFuIGV2ZW50LlxyXG4gICAgICpcclxuICAgICAqIEBhcGkgcHJpdmF0ZVxyXG4gICAgICovXHJcblxyXG4gICAgdXRpbC5vbiA9IGZ1bmN0aW9uIChlbGVtZW50LCBldmVudCwgZm4sIGNhcHR1cmUpIHtcclxuICAgICAgaWYgKGVsZW1lbnQuYXR0YWNoRXZlbnQpIHtcclxuICAgICAgICBlbGVtZW50LmF0dGFjaEV2ZW50KCdvbicgKyBldmVudCwgZm4pO1xyXG4gICAgICB9IGVsc2UgaWYgKGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcikge1xyXG4gICAgICAgIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihldmVudCwgZm4sIGNhcHR1cmUpO1xyXG4gICAgICB9XHJcbiAgICB9O1xyXG5cclxuXHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ2hhbmdlIHRoZSBpbnRlcm5hbCBwYWdlTG9hZGVkIHZhbHVlLlxyXG4gICAgICovXHJcblxyXG4gICAgaWYgKCd1bmRlZmluZWQnICE9IHR5cGVvZiB3aW5kb3cpIHtcclxuICAgICAgdXRpbC5sb2FkKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBwYWdlTG9hZGVkID0gdHJ1ZTtcclxuICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBEZWZlcnMgYSBmdW5jdGlvbiB0byBlbnN1cmUgYSBzcGlubmVyIGlzIG5vdCBkaXNwbGF5ZWQgYnkgdGhlIGJyb3dzZXJcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBmblxyXG4gICAgICogQGFwaSBwdWJsaWNcclxuICAgICAqL1xyXG5cclxuICAgIHV0aWwuZGVmZXIgPSBmdW5jdGlvbiAoZm4pIHtcclxuICAgICAgaWYgKCF1dGlsLnVhLndlYmtpdCB8fCAndW5kZWZpbmVkJyAhPSB0eXBlb2YgaW1wb3J0U2NyaXB0cykge1xyXG4gICAgICAgIHJldHVybiBmbigpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICB1dGlsLmxvYWQoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHNldFRpbWVvdXQoZm4sIDEwMCk7XHJcbiAgICAgIH0pO1xyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIE1lcmdlcyB0d28gb2JqZWN0cy5cclxuICAgICAqXHJcbiAgICAgKiBAYXBpIHB1YmxpY1xyXG4gICAgICovXHJcblxyXG4gICAgdXRpbC5tZXJnZSA9IGZ1bmN0aW9uIG1lcmdlKHRhcmdldCwgYWRkaXRpb25hbCwgZGVlcCwgbGFzdHNlZW4pIHtcclxuICAgICAgdmFyIHNlZW4gPSBsYXN0c2VlbiB8fCBbXVxyXG4gICAgICAgICwgZGVwdGggPSB0eXBlb2YgZGVlcCA9PSAndW5kZWZpbmVkJyA/IDIgOiBkZWVwXHJcbiAgICAgICAgLCBwcm9wO1xyXG5cclxuICAgICAgZm9yIChwcm9wIGluIGFkZGl0aW9uYWwpIHtcclxuICAgICAgICBpZiAoYWRkaXRpb25hbC5oYXNPd25Qcm9wZXJ0eShwcm9wKSAmJiB1dGlsLmluZGV4T2Yoc2VlbiwgcHJvcCkgPCAwKSB7XHJcbiAgICAgICAgICBpZiAodHlwZW9mIHRhcmdldFtwcm9wXSAhPT0gJ29iamVjdCcgfHwgIWRlcHRoKSB7XHJcbiAgICAgICAgICAgIHRhcmdldFtwcm9wXSA9IGFkZGl0aW9uYWxbcHJvcF07XHJcbiAgICAgICAgICAgIHNlZW4ucHVzaChhZGRpdGlvbmFsW3Byb3BdKTtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHV0aWwubWVyZ2UodGFyZ2V0W3Byb3BdLCBhZGRpdGlvbmFsW3Byb3BdLCBkZXB0aCAtIDEsIHNlZW4pO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG5cclxuICAgICAgcmV0dXJuIHRhcmdldDtcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBNZXJnZXMgcHJvdG90eXBlcyBmcm9tIG9iamVjdHNcclxuICAgICAqXHJcbiAgICAgKiBAYXBpIHB1YmxpY1xyXG4gICAgICovXHJcblxyXG4gICAgdXRpbC5taXhpbiA9IGZ1bmN0aW9uIChjdG9yLCBjdG9yMikge1xyXG4gICAgICB1dGlsLm1lcmdlKGN0b3IucHJvdG90eXBlLCBjdG9yMi5wcm90b3R5cGUpO1xyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFNob3J0Y3V0IGZvciBwcm90b3R5cGljYWwgYW5kIHN0YXRpYyBpbmhlcml0YW5jZS5cclxuICAgICAqXHJcbiAgICAgKiBAYXBpIHByaXZhdGVcclxuICAgICAqL1xyXG5cclxuICAgIHV0aWwuaW5oZXJpdCA9IGZ1bmN0aW9uIChjdG9yLCBjdG9yMikge1xyXG4gICAgICBmdW5jdGlvbiBmKCkgeyB9O1xyXG4gICAgICBmLnByb3RvdHlwZSA9IGN0b3IyLnByb3RvdHlwZTtcclxuICAgICAgY3Rvci5wcm90b3R5cGUgPSBuZXcgZjtcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDaGVja3MgaWYgdGhlIGdpdmVuIG9iamVjdCBpcyBhbiBBcnJheS5cclxuICAgICAqXHJcbiAgICAgKiAgICAgaW8udXRpbC5pc0FycmF5KFtdKTsgLy8gdHJ1ZVxyXG4gICAgICogICAgIGlvLnV0aWwuaXNBcnJheSh7fSk7IC8vIGZhbHNlXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIE9iamVjdCBvYmpcclxuICAgICAqIEBhcGkgcHVibGljXHJcbiAgICAgKi9cclxuXHJcbiAgICB1dGlsLmlzQXJyYXkgPSBBcnJheS5pc0FycmF5IHx8IGZ1bmN0aW9uIChvYmopIHtcclxuICAgICAgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChvYmopID09PSAnW29iamVjdCBBcnJheV0nO1xyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEludGVyc2VjdHMgdmFsdWVzIG9mIHR3byBhcnJheXMgaW50byBhIHRoaXJkXHJcbiAgICAgKlxyXG4gICAgICogQGFwaSBwdWJsaWNcclxuICAgICAqL1xyXG5cclxuICAgIHV0aWwuaW50ZXJzZWN0ID0gZnVuY3Rpb24gKGFyciwgYXJyMikge1xyXG4gICAgICB2YXIgcmV0ID0gW11cclxuICAgICAgICAsIGxvbmdlc3QgPSBhcnIubGVuZ3RoID4gYXJyMi5sZW5ndGggPyBhcnIgOiBhcnIyXHJcbiAgICAgICAgLCBzaG9ydGVzdCA9IGFyci5sZW5ndGggPiBhcnIyLmxlbmd0aCA/IGFycjIgOiBhcnI7XHJcblxyXG4gICAgICBmb3IgKHZhciBpID0gMCwgbCA9IHNob3J0ZXN0Lmxlbmd0aDsgaSA8IGw7IGkrKykge1xyXG4gICAgICAgIGlmICh+dXRpbC5pbmRleE9mKGxvbmdlc3QsIHNob3J0ZXN0W2ldKSlcclxuICAgICAgICAgIHJldC5wdXNoKHNob3J0ZXN0W2ldKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgcmV0dXJuIHJldDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEFycmF5IGluZGV4T2YgY29tcGF0aWJpbGl0eS5cclxuICAgICAqXHJcbiAgICAgKiBAc2VlIGJpdC5seS9hNUR4YTJcclxuICAgICAqIEBhcGkgcHVibGljXHJcbiAgICAgKi9cclxuXHJcbiAgICB1dGlsLmluZGV4T2YgPSBmdW5jdGlvbiAoYXJyLCBvLCBpKSB7XHJcblxyXG4gICAgICBmb3IgKHZhciBqID0gYXJyLmxlbmd0aCwgaSA9IGkgPCAwID8gaSArIGogPCAwID8gMCA6IGkgKyBqIDogaSB8fCAwO1xyXG4gICAgICAgIGkgPCBqICYmIGFycltpXSAhPT0gbzsgaSsrKSB7IH1cclxuXHJcbiAgICAgIHJldHVybiBqIDw9IGkgPyAtMSA6IGk7XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ29udmVydHMgZW51bWVyYWJsZXMgdG8gYXJyYXkuXHJcbiAgICAgKlxyXG4gICAgICogQGFwaSBwdWJsaWNcclxuICAgICAqL1xyXG5cclxuICAgIHV0aWwudG9BcnJheSA9IGZ1bmN0aW9uIChlbnUpIHtcclxuICAgICAgdmFyIGFyciA9IFtdO1xyXG5cclxuICAgICAgZm9yICh2YXIgaSA9IDAsIGwgPSBlbnUubGVuZ3RoOyBpIDwgbDsgaSsrKVxyXG4gICAgICAgIGFyci5wdXNoKGVudVtpXSk7XHJcblxyXG4gICAgICByZXR1cm4gYXJyO1xyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFVBIC8gZW5naW5lcyBkZXRlY3Rpb24gbmFtZXNwYWNlLlxyXG4gICAgICpcclxuICAgICAqIEBuYW1lc3BhY2VcclxuICAgICAqL1xyXG5cclxuICAgIHV0aWwudWEgPSB7fTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFdoZXRoZXIgdGhlIFVBIHN1cHBvcnRzIENPUlMgZm9yIFhIUi5cclxuICAgICAqXHJcbiAgICAgKiBAYXBpIHB1YmxpY1xyXG4gICAgICovXHJcblxyXG4gICAgdXRpbC51YS5oYXNDT1JTID0gJ3VuZGVmaW5lZCcgIT0gdHlwZW9mIFhNTEh0dHBSZXF1ZXN0ICYmIChmdW5jdGlvbiAoKSB7XHJcbiAgICAgIHRyeSB7XHJcbiAgICAgICAgdmFyIGEgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcclxuICAgICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgfVxyXG5cclxuICAgICAgcmV0dXJuIGEud2l0aENyZWRlbnRpYWxzICE9IHVuZGVmaW5lZDtcclxuICAgIH0pKCk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBEZXRlY3Qgd2Via2l0LlxyXG4gICAgICpcclxuICAgICAqIEBhcGkgcHVibGljXHJcbiAgICAgKi9cclxuXHJcbiAgICB1dGlsLnVhLndlYmtpdCA9ICd1bmRlZmluZWQnICE9IHR5cGVvZiBuYXZpZ2F0b3JcclxuICAgICAgJiYgL3dlYmtpdC9pLnRlc3QobmF2aWdhdG9yLnVzZXJBZ2VudCk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAqIERldGVjdCBpUGFkL2lQaG9uZS9pUG9kLlxyXG4gICAgKlxyXG4gICAgKiBAYXBpIHB1YmxpY1xyXG4gICAgKi9cclxuXHJcbiAgICB1dGlsLnVhLmlEZXZpY2UgPSAndW5kZWZpbmVkJyAhPSB0eXBlb2YgbmF2aWdhdG9yXHJcbiAgICAgICYmIC9pUGFkfGlQaG9uZXxpUG9kL2kudGVzdChuYXZpZ2F0b3IudXNlckFnZW50KTtcclxuXHJcbiAgfSkoJ3VuZGVmaW5lZCcgIT0gdHlwZW9mIGlvID8gaW8gOiBtb2R1bGUuZXhwb3J0cywgdGhpcyk7XHJcblxyXG4gIC8qKlxyXG4gKiBzb2NrZXQuaW9cclxuICogQ29weXJpZ2h0KGMpIDIwMTcgTWFnaWMgPDczMDE3MDAzNEBxcS5jb20+XHJcbiAqIE1JVCBMaWNlbnNlZFxyXG4gKi9cclxuXHJcbiAgKGZ1bmN0aW9uIChleHBvcnRzLCBpbywgZ2xvYmFsKSB7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBFeHBvc2UgY29uc3RydWN0b3IuXHJcbiAgICAgKi9cclxuXHJcbiAgICBleHBvcnRzLlNvY2tldCA9IFNvY2tldDtcclxuXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZSBhIG5ldyBgU29ja2V0LklPIGNsaWVudGAgd2hpY2ggY2FuIGVzdGFibGlzaCBhIHBlcnNpc3RlbnRcclxuICAgICAqIGNvbm5lY3Rpb24gd2l0aCBhIFNvY2tldC5JTyBlbmFibGVkIHNlcnZlci5cclxuICAgICAqXHJcbiAgICAgKiBAYXBpIHB1YmxpY1xyXG4gICAgICovXHJcblxyXG4gICAgZnVuY3Rpb24gU29ja2V0KG9wdGlvbnMpIHtcclxuICAgICAgdGhpcy5vcHRpb25zID0ge1xyXG4gICAgICAgIHBvcnQ6IDgwXHJcbiAgICAgICAgLCBzZWN1cmU6IHRydWVcclxuICAgICAgICAsIGRvY3VtZW50OiBmYWxzZVxyXG4gICAgICAgICwgcmVzb3VyY2U6ICdzb2NrZXQuaW8nXHJcbiAgICAgICAgLCB0cmFuc3BvcnRzOiBpby50cmFuc3BvcnRzXHJcbiAgICAgICAgLCAnY29ubmVjdCB0aW1lb3V0JzogMTAwMDBcclxuICAgICAgICAsICd0cnkgbXVsdGlwbGUgdHJhbnNwb3J0cyc6IHRydWVcclxuICAgICAgICAsICdyZWNvbm5lY3QnOiB0cnVlXHJcbiAgICAgICAgLCAncmVjb25uZWN0aW9uIGRlbGF5JzogNTAwXHJcbiAgICAgICAgLCAncmVjb25uZWN0aW9uIGxpbWl0JzogSW5maW5pdHlcclxuICAgICAgICAsICdyZW9wZW4gZGVsYXknOiAzMDAwXHJcbiAgICAgICAgLCAnbWF4IHJlY29ubmVjdGlvbiBhdHRlbXB0cyc6IDEwXHJcbiAgICAgICAgLCAnc3luYyBkaXNjb25uZWN0IG9uIHVubG9hZCc6IGZhbHNlXHJcbiAgICAgICAgLCAnYXV0byBjb25uZWN0JzogdHJ1ZVxyXG4gICAgICAgICwgJ2ZsYXNoIHBvbGljeSBwb3J0JzogMTA4NDNcclxuICAgICAgICAsICdtYW51YWxGbHVzaCc6IGZhbHNlXHJcbiAgICAgIH07XHJcblxyXG4gICAgICBpby51dGlsLm1lcmdlKHRoaXMub3B0aW9ucywgb3B0aW9ucyk7XHJcblxyXG4gICAgICB0aGlzLmNvbm5lY3RlZCA9IGZhbHNlO1xyXG4gICAgICB0aGlzLm9wZW4gPSBmYWxzZTtcclxuICAgICAgdGhpcy5jb25uZWN0aW5nID0gZmFsc2U7XHJcbiAgICAgIHRoaXMucmVjb25uZWN0aW5nID0gZmFsc2U7XHJcbiAgICAgIHRoaXMubmFtZXNwYWNlcyA9IHt9O1xyXG4gICAgICB0aGlzLmJ1ZmZlciA9IFtdO1xyXG4gICAgICB0aGlzLmRvQnVmZmVyID0gZmFsc2U7XHJcblxyXG4gICAgICBpZiAodGhpcy5vcHRpb25zWydzeW5jIGRpc2Nvbm5lY3Qgb24gdW5sb2FkJ10gJiZcclxuICAgICAgICAoIXRoaXMuaXNYRG9tYWluKCkgfHwgaW8udXRpbC51YS5oYXNDT1JTKSkge1xyXG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcclxuICAgICAgICBpby51dGlsLm9uKGdsb2JhbCwgJ2JlZm9yZXVubG9hZCcsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgIHNlbGYuZGlzY29ubmVjdFN5bmMoKTtcclxuICAgICAgICB9LCBmYWxzZSk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmICh0aGlzLm9wdGlvbnNbJ2F1dG8gY29ubmVjdCddKSB7XHJcbiAgICAgICAgdGhpcy5jb25uZWN0KCk7XHJcbiAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBBcHBseSBFdmVudEVtaXR0ZXIgbWl4aW4uXHJcbiAgICAgKi9cclxuXHJcbiAgICBpby51dGlsLm1peGluKFNvY2tldCwgaW8uRXZlbnRFbWl0dGVyKTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgYSBuYW1lc3BhY2UgbGlzdGVuZXIvZW1pdHRlciBmb3IgdGhpcyBzb2NrZXRcclxuICAgICAqXHJcbiAgICAgKiBAYXBpIHB1YmxpY1xyXG4gICAgICovXHJcblxyXG4gICAgU29ja2V0LnByb3RvdHlwZS5vZiA9IGZ1bmN0aW9uIChuYW1lKSB7XHJcbiAgICAgIGlmICghdGhpcy5uYW1lc3BhY2VzW25hbWVdKSB7XHJcbiAgICAgICAgdGhpcy5uYW1lc3BhY2VzW25hbWVdID0gbmV3IGlvLlNvY2tldE5hbWVzcGFjZSh0aGlzLCBuYW1lKTtcclxuXHJcbiAgICAgICAgaWYgKG5hbWUgIT09ICcnKSB7XHJcbiAgICAgICAgICB0aGlzLm5hbWVzcGFjZXNbbmFtZV0ucGFja2V0KHsgdHlwZTogJ2Nvbm5lY3QnIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG5cclxuICAgICAgcmV0dXJuIHRoaXMubmFtZXNwYWNlc1tuYW1lXTtcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBFbWl0cyB0aGUgZ2l2ZW4gZXZlbnQgdG8gdGhlIFNvY2tldCBhbmQgYWxsIG5hbWVzcGFjZXNcclxuICAgICAqXHJcbiAgICAgKiBAYXBpIHByaXZhdGVcclxuICAgICAqL1xyXG5cclxuICAgIFNvY2tldC5wcm90b3R5cGUucHVibGlzaCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgdGhpcy5lbWl0LmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XHJcblxyXG4gICAgICB2YXIgbnNwO1xyXG5cclxuICAgICAgZm9yICh2YXIgaSBpbiB0aGlzLm5hbWVzcGFjZXMpIHtcclxuICAgICAgICBpZiAodGhpcy5uYW1lc3BhY2VzLmhhc093blByb3BlcnR5KGkpKSB7XHJcbiAgICAgICAgICBuc3AgPSB0aGlzLm9mKGkpO1xyXG4gICAgICAgICAgbnNwLiRlbWl0LmFwcGx5KG5zcCwgYXJndW1lbnRzKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDpk77mjqUgaGFuZHNoYWtlXHJcbiAgICAgKlxyXG4gICAgICogQGFwaSBwcml2YXRlXHJcbiAgICAgKi9cclxuXHJcbiAgICBmdW5jdGlvbiBlbXB0eSgpIHsgfTtcclxuXHJcbiAgICBTb2NrZXQucHJvdG90eXBlLmhhbmRzaGFrZSA9IGZ1bmN0aW9uIChmbikge1xyXG4gICAgICB2YXIgc2VsZiA9IHRoaXNcclxuICAgICAgICAsIG9wdGlvbnMgPSB0aGlzLm9wdGlvbnM7XHJcblxyXG4gICAgICBmdW5jdGlvbiBjb21wbGV0ZShkYXRhKSB7XHJcbiAgICAgICAgaWYgKGRhdGEgaW5zdGFuY2VvZiBFcnJvcikge1xyXG4gICAgICAgICAgc2VsZi5jb25uZWN0aW5nID0gZmFsc2U7XHJcbiAgICAgICAgICBzZWxmLm9uRXJyb3IoZGF0YS5tZXNzYWdlKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgZm4uYXBwbHkobnVsbCwgZGF0YS5zcGxpdCgnOicpKTtcclxuICAgICAgICB9XHJcbiAgICAgIH07XHJcblxyXG4gICAgICBvcHRpb25zLnNlY3VyZSA9IHRydWU7XHJcbiAgICAgIHZhciB1cmwgPSBbXHJcbiAgICAgICAgJ2h0dHAnICsgKG9wdGlvbnMuc2VjdXJlID8gJ3MnIDogJycpICsgJzovJ1xyXG4gICAgICAgICwgb3B0aW9ucy5ob3N0XHJcbiAgICAgICAgLCBvcHRpb25zLnJlc291cmNlXHJcbiAgICAgICAgLCBpby5wcm90b2NvbFxyXG4gICAgICAgICwgaW8udXRpbC5xdWVyeSh0aGlzLm9wdGlvbnMucXVlcnksICd0PScgKyArbmV3IERhdGUpXHJcbiAgICAgIF0uam9pbignLycpO1xyXG5cclxuXHJcbiAgICAgIHZhciBkYXRhT2JqZWN0ID0ge307XHJcbiAgICAgIHZhciBkYXRhID0gSlNPTi5zdHJpbmdpZnkoZGF0YU9iamVjdCk7XHJcblxyXG4gICAgICB2YXIgbWV0aG9kID0gXCJHRVRcIjtcclxuXHJcbiAgICAgIHd4LnJlcXVlc3Qoe1xyXG4gICAgICAgIG1ldGhvZDogbWV0aG9kLFxyXG4gICAgICAgIHVybDogdXJsLFxyXG4gICAgICAgIGRhdGE6IGRhdGEsXHJcbiAgICAgICAgaGVhZGVyOiB7XHJcbiAgICAgICAgICAnY29udGVudC10eXBlJzogJ3RleHQvcGxhaW4nXHJcbiAgICAgICAgfSxcclxuICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzKSB7XHJcbiAgICAgICAgICBpZiAocmVzLmRhdGEgJiYgcmVzLmRhdGEuY29kZSkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcInJlcXVlc3QgZXJyb3JcIik7XHJcbiAgICAgICAgICB9IGVsc2UgaWYgKHJlcy5zdGF0dXNDb2RlICE9IDIwMCkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcInJlcXVlc3QgZXJyb3JcIik7XHJcblxyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgY29tcGxldGUocmVzLmRhdGEpO1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICB9LFxyXG4gICAgICAgIGZhaWw6IGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhcInJlcXVlc3QgZXJyb3JcIik7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuXHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogRmluZCBhbiBhdmFpbGFibGUgdHJhbnNwb3J0IGJhc2VkIG9uIHRoZSBvcHRpb25zIHN1cHBsaWVkIGluIHRoZSBjb25zdHJ1Y3Rvci5cclxuICAgICAqXHJcbiAgICAgKiBAYXBpIHByaXZhdGVcclxuICAgICAqL1xyXG5cclxuICAgIFNvY2tldC5wcm90b3R5cGUuZ2V0VHJhbnNwb3J0ID0gZnVuY3Rpb24gKG92ZXJyaWRlKSB7XHJcbiAgICAgIHZhciB0cmFuc3BvcnRzID0gb3ZlcnJpZGUgfHwgdGhpcy50cmFuc3BvcnRzLCBtYXRjaDtcclxuXHJcbiAgICAgIGZvciAodmFyIGkgPSAwLCB0cmFuc3BvcnQ7IHRyYW5zcG9ydCA9IHRyYW5zcG9ydHNbaV07IGkrKykge1xyXG4gICAgICAgIGlmICh0cmFuc3BvcnQpIHtcclxuICAgICAgICAgIHJldHVybiBuZXcgaW8uVHJhbnNwb3J0W3RyYW5zcG9ydF0odGhpcywgdGhpcy5zZXNzaW9uaWQpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG5cclxuICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ29ubmVjdHMgdG8gdGhlIHNlcnZlci5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBbZm5dIENhbGxiYWNrLlxyXG4gICAgICogQHJldHVybnMge2lvLlNvY2tldH1cclxuICAgICAqIEBhcGkgcHVibGljXHJcbiAgICAgKi9cclxuXHJcbiAgICBTb2NrZXQucHJvdG90eXBlLmNvbm5lY3QgPSBmdW5jdGlvbiAoZm4pIHtcclxuICAgICAgaWYgKHRoaXMuY29ubmVjdGluZykge1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgICB9XHJcblxyXG4gICAgICB2YXIgc2VsZiA9IHRoaXM7XHJcbiAgICAgIHNlbGYuY29ubmVjdGluZyA9IHRydWU7XHJcblxyXG4gICAgICB0aGlzLmhhbmRzaGFrZShmdW5jdGlvbiAoc2lkLCBoZWFydGJlYXQsIGNsb3NlLCB0cmFuc3BvcnRzKSB7XHJcbiAgICAgICAgc2VsZi5zZXNzaW9uaWQgPSBzaWQ7XHJcbiAgICAgICAgc2VsZi5jbG9zZVRpbWVvdXQgPSBjbG9zZSAqIDEwMDA7XHJcbiAgICAgICAgc2VsZi5oZWFydGJlYXRUaW1lb3V0ID0gaGVhcnRiZWF0ICogMTAwMDtcclxuXHJcbiAgICAgICAgaWYgKCFzZWxmLnRyYW5zcG9ydHMpXHJcbiAgICAgICAgICBzZWxmLnRyYW5zcG9ydHMgPSBzZWxmLm9yaWdUcmFuc3BvcnRzID0gKHRyYW5zcG9ydHMgPyBpby51dGlsLmludGVyc2VjdChcclxuICAgICAgICAgICAgdHJhbnNwb3J0cy5zcGxpdCgnLCcpXHJcbiAgICAgICAgICAgICwgc2VsZi5vcHRpb25zLnRyYW5zcG9ydHNcclxuICAgICAgICAgICkgOiBzZWxmLm9wdGlvbnMudHJhbnNwb3J0cyk7XHJcblxyXG4gICAgICAgIHNlbGYuc2V0SGVhcnRiZWF0VGltZW91dCgpO1xyXG5cclxuICAgICAgICBmdW5jdGlvbiBjb25uZWN0KHRyYW5zcG9ydHMpIHtcclxuICAgICAgICAgIGlmIChzZWxmLnRyYW5zcG9ydCkgc2VsZi50cmFuc3BvcnQuY2xlYXJUaW1lb3V0cygpO1xyXG5cclxuICAgICAgICAgIHNlbGYudHJhbnNwb3J0ID0gc2VsZi5nZXRUcmFuc3BvcnQodHJhbnNwb3J0cyk7XHJcblxyXG4gICAgICAgICAgaWYgKCFzZWxmLnRyYW5zcG9ydCkgcmV0dXJuIHNlbGYucHVibGlzaCgnY29ubmVjdF9mYWlsZWQnKTtcclxuXHJcbiAgICAgICAgICAvLyBvbmNlIHRoZSB0cmFuc3BvcnQgaXMgcmVhZHlcclxuICAgICAgICAgIHNlbGYudHJhbnNwb3J0LnJlYWR5KHNlbGYsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgc2VsZi5jb25uZWN0aW5nID0gdHJ1ZTtcclxuICAgICAgICAgICAgc2VsZi5wdWJsaXNoKCdjb25uZWN0aW5nJywgc2VsZi50cmFuc3BvcnQubmFtZSk7XHJcbiAgICAgICAgICAgIHNlbGYudHJhbnNwb3J0Lm9wZW4oKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChzZWxmLm9wdGlvbnNbJ2Nvbm5lY3QgdGltZW91dCddKSB7XHJcbiAgICAgICAgICAgICAgc2VsZi5jb25uZWN0VGltZW91dFRpbWVyID0gc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoIXNlbGYuY29ubmVjdGVkKSB7XHJcbiAgICAgICAgICAgICAgICAgIHNlbGYuY29ubmVjdGluZyA9IGZhbHNlO1xyXG5cclxuICAgICAgICAgICAgICAgICAgaWYgKHNlbGYub3B0aW9uc1sndHJ5IG11bHRpcGxlIHRyYW5zcG9ydHMnXSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciByZW1haW5pbmcgPSBzZWxmLnRyYW5zcG9ydHM7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHdoaWxlIChyZW1haW5pbmcubGVuZ3RoID4gMCAmJiByZW1haW5pbmcuc3BsaWNlKDAsIDEpWzBdICE9XHJcbiAgICAgICAgICAgICAgICAgICAgICBzZWxmLnRyYW5zcG9ydC5uYW1lKSB7IH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlbWFpbmluZy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgIGNvbm5lY3QocmVtYWluaW5nKTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgc2VsZi5wdWJsaXNoKCdjb25uZWN0X2ZhaWxlZDInKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICB9LCBzZWxmLm9wdGlvbnNbJ2Nvbm5lY3QgdGltZW91dCddKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25uZWN0KHNlbGYudHJhbnNwb3J0cyk7XHJcblxyXG4gICAgICAgIHNlbGYub25jZSgnY29ubmVjdCcsIGZ1bmN0aW9uICgpe1xyXG4gICAgICAgICAgY2xlYXJUaW1lb3V0KHNlbGYuY29ubmVjdFRpbWVvdXRUaW1lcik7XHJcblxyXG4gICAgICAgICAgZm4gJiYgdHlwZW9mIGZuID09ICdmdW5jdGlvbicgJiYgZm4oKTtcclxuICAgICAgICB9KTtcclxuICAgICAgfSk7XHJcblxyXG4gICAgICByZXR1cm4gdGhpcztcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDbGVhcnMgYW5kIHNldHMgYSBuZXcgaGVhcnRiZWF0IHRpbWVvdXQgdXNpbmcgdGhlIHZhbHVlIGdpdmVuIGJ5IHRoZVxyXG4gICAgICogc2VydmVyIGR1cmluZyB0aGUgaGFuZHNoYWtlLlxyXG4gICAgICpcclxuICAgICAqIEBhcGkgcHJpdmF0ZVxyXG4gICAgICovXHJcblxyXG4gICAgU29ja2V0LnByb3RvdHlwZS5zZXRIZWFydGJlYXRUaW1lb3V0ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICBjbGVhclRpbWVvdXQodGhpcy5oZWFydGJlYXRUaW1lb3V0VGltZXIpO1xyXG4gICAgICBpZiAodGhpcy50cmFuc3BvcnQgJiYgIXRoaXMudHJhbnNwb3J0LmhlYXJ0YmVhdHMoKSkgcmV0dXJuO1xyXG5cclxuICAgICAgdmFyIHNlbGYgPSB0aGlzO1xyXG4gICAgICB0aGlzLmhlYXJ0YmVhdFRpbWVvdXRUaW1lciA9IHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHNlbGYudHJhbnNwb3J0Lm9uQ2xvc2UoKTtcclxuICAgICAgfSwgdGhpcy5oZWFydGJlYXRUaW1lb3V0KTtcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZW5kcyBhIG1lc3NhZ2UuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGRhdGEgcGFja2V0LlxyXG4gICAgICogQHJldHVybnMge2lvLlNvY2tldH1cclxuICAgICAqIEBhcGkgcHVibGljXHJcbiAgICAgKi9cclxuXHJcbiAgICBTb2NrZXQucHJvdG90eXBlLnBhY2tldCA9IGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgIGlmICh0aGlzLmNvbm5lY3RlZCAmJiAhdGhpcy5kb0J1ZmZlcikge1xyXG4gICAgICAgIHRoaXMudHJhbnNwb3J0LnBhY2tldChkYXRhKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLmJ1ZmZlci5wdXNoKGRhdGEpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICByZXR1cm4gdGhpcztcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXRzIGJ1ZmZlciBzdGF0ZVxyXG4gICAgICpcclxuICAgICAqIEBhcGkgcHJpdmF0ZVxyXG4gICAgICovXHJcblxyXG4gICAgU29ja2V0LnByb3RvdHlwZS5zZXRCdWZmZXIgPSBmdW5jdGlvbiAodikge1xyXG4gICAgICB0aGlzLmRvQnVmZmVyID0gdjtcclxuXHJcbiAgICAgIGlmICghdiAmJiB0aGlzLmNvbm5lY3RlZCAmJiB0aGlzLmJ1ZmZlci5sZW5ndGgpIHtcclxuICAgICAgICBpZiAoIXRoaXMub3B0aW9uc1snbWFudWFsRmx1c2gnXSkge1xyXG4gICAgICAgICAgdGhpcy5mbHVzaEJ1ZmZlcigpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEZsdXNoZXMgdGhlIGJ1ZmZlciBkYXRhIG92ZXIgdGhlIHdpcmUuXHJcbiAgICAgKiBUbyBiZSBpbnZva2VkIG1hbnVhbGx5IHdoZW4gJ21hbnVhbEZsdXNoJyBpcyBzZXQgdG8gdHJ1ZS5cclxuICAgICAqXHJcbiAgICAgKiBAYXBpIHB1YmxpY1xyXG4gICAgICovXHJcblxyXG4gICAgU29ja2V0LnByb3RvdHlwZS5mbHVzaEJ1ZmZlciA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgdGhpcy50cmFuc3BvcnQucGF5bG9hZCh0aGlzLmJ1ZmZlcik7XHJcbiAgICAgIHRoaXMuYnVmZmVyID0gW107XHJcbiAgICB9O1xyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIERpc2Nvbm5lY3QgdGhlIGVzdGFibGlzaGVkIGNvbm5lY3QuXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybnMge2lvLlNvY2tldH1cclxuICAgICAqIEBhcGkgcHVibGljXHJcbiAgICAgKi9cclxuXHJcbiAgICBTb2NrZXQucHJvdG90eXBlLmRpc2Nvbm5lY3QgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgIGlmICh0aGlzLmNvbm5lY3RlZCB8fCB0aGlzLmNvbm5lY3RpbmcpIHtcclxuICAgICAgICBpZiAodGhpcy5vcGVuKSB7XHJcbiAgICAgICAgICB0aGlzLm9mKCcnKS5wYWNrZXQoeyB0eXBlOiAnZGlzY29ubmVjdCcgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBoYW5kbGUgZGlzY29ubmVjdGlvbiBpbW1lZGlhdGVseVxyXG4gICAgICAgIHRoaXMub25EaXNjb25uZWN0KCdib290ZWQnKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogRGlzY29ubmVjdHMgdGhlIHNvY2tldCB3aXRoIGEgc3luYyBYSFIuXHJcbiAgICAgKlxyXG4gICAgICogQGFwaSBwcml2YXRlXHJcbiAgICAgKi9cclxuXHJcbiAgICBTb2NrZXQucHJvdG90eXBlLmRpc2Nvbm5lY3RTeW5jID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAvLyBlbnN1cmUgZGlzY29ubmVjdGlvblxyXG4gICAgICB2YXIgeGhyID0gaW8udXRpbC5yZXF1ZXN0KCk7XHJcbiAgICAgIHZhciB1cmkgPSBbXHJcbiAgICAgICAgJ2h0dHAnICsgKHRoaXMub3B0aW9ucy5zZWN1cmUgPyAncycgOiAnJykgKyAnOi8nXHJcbiAgICAgICAgLCB0aGlzLm9wdGlvbnMuaG9zdCArICc6JyArIHRoaXMub3B0aW9ucy5wb3J0XHJcbiAgICAgICAgLCB0aGlzLm9wdGlvbnMucmVzb3VyY2VcclxuICAgICAgICAsIGlvLnByb3RvY29sXHJcbiAgICAgICAgLCAnJ1xyXG4gICAgICAgICwgdGhpcy5zZXNzaW9uaWRcclxuICAgICAgXS5qb2luKCcvJykgKyAnLz9kaXNjb25uZWN0PTEnO1xyXG5cclxuICAgICAgeGhyLm9wZW4oJ0dFVCcsIHVyaSwgZmFsc2UpO1xyXG4gICAgICB4aHIuc2VuZChudWxsKTtcclxuXHJcbiAgICAgIC8vIGhhbmRsZSBkaXNjb25uZWN0aW9uIGltbWVkaWF0ZWx5XHJcbiAgICAgIHRoaXMub25EaXNjb25uZWN0KCdib290ZWQnKTtcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDaGVjayBpZiB3ZSBuZWVkIHRvIHVzZSBjcm9zcyBkb21haW4gZW5hYmxlZCB0cmFuc3BvcnRzLiBDcm9zcyBkb21haW4gd291bGRcclxuICAgICAqIGJlIGEgZGlmZmVyZW50IHBvcnQgb3IgZGlmZmVyZW50IGRvbWFpbiBuYW1lLlxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm5zIHtCb29sZWFufVxyXG4gICAgICogQGFwaSBwcml2YXRlXHJcbiAgICAgKi9cclxuXHJcbiAgICBTb2NrZXQucHJvdG90eXBlLmlzWERvbWFpbiA9IGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAgIC8vIHZhciBwb3J0ID0gZ2xvYmFsLmxvY2F0aW9uLnBvcnQgfHxcclxuICAgICAgLy8gICAoJ2h0dHBzOicgPT0gZ2xvYmFsLmxvY2F0aW9uLnByb3RvY29sID8gNDQzIDogODApO1xyXG4gICAgICB2YXIgcG9ydCA9IFwiXCI7XHJcblxyXG4gICAgICByZXR1cm4gcG9ydDtcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDYWxsZWQgdXBvbiBoYW5kc2hha2UuXHJcbiAgICAgKlxyXG4gICAgICogQGFwaSBwcml2YXRlXHJcbiAgICAgKi9cclxuXHJcbiAgICBTb2NrZXQucHJvdG90eXBlLm9uQ29ubmVjdCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgaWYgKCF0aGlzLmNvbm5lY3RlZCkge1xyXG4gICAgICAgIHRoaXMuY29ubmVjdGVkID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLmNvbm5lY3RpbmcgPSBmYWxzZTtcclxuICAgICAgICBpZiAoIXRoaXMuZG9CdWZmZXIpIHtcclxuICAgICAgICAgIC8vIG1ha2Ugc3VyZSB0byBmbHVzaCB0aGUgYnVmZmVyXHJcbiAgICAgICAgICB0aGlzLnNldEJ1ZmZlcihmYWxzZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuZW1pdCgnY29ubmVjdCcpO1xyXG4gICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ2FsbGVkIHdoZW4gdGhlIHRyYW5zcG9ydCBvcGVuc1xyXG4gICAgICpcclxuICAgICAqIEBhcGkgcHJpdmF0ZVxyXG4gICAgICovXHJcblxyXG4gICAgU29ja2V0LnByb3RvdHlwZS5vbk9wZW4gPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgIHRoaXMub3BlbiA9IHRydWU7XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ2FsbGVkIHdoZW4gdGhlIHRyYW5zcG9ydCBjbG9zZXMuXHJcbiAgICAgKlxyXG4gICAgICogQGFwaSBwcml2YXRlXHJcbiAgICAgKi9cclxuXHJcbiAgICBTb2NrZXQucHJvdG90eXBlLm9uQ2xvc2UgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgIHRoaXMub3BlbiA9IGZhbHNlO1xyXG4gICAgICBjbGVhclRpbWVvdXQodGhpcy5oZWFydGJlYXRUaW1lb3V0VGltZXIpO1xyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIENhbGxlZCB3aGVuIHRoZSB0cmFuc3BvcnQgZmlyc3Qgb3BlbnMgYSBjb25uZWN0aW9uXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHRleHRcclxuICAgICAqL1xyXG5cclxuICAgIFNvY2tldC5wcm90b3R5cGUub25QYWNrZXQgPSBmdW5jdGlvbiAocGFja2V0KSB7XHJcbiAgICAgIHRoaXMub2YocGFja2V0LmVuZHBvaW50KS5vblBhY2tldChwYWNrZXQpO1xyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEhhbmRsZXMgYW4gZXJyb3IuXHJcbiAgICAgKlxyXG4gICAgICogQGFwaSBwcml2YXRlXHJcbiAgICAgKi9cclxuXHJcbiAgICBTb2NrZXQucHJvdG90eXBlLm9uRXJyb3IgPSBmdW5jdGlvbiAoZXJyKSB7XHJcbiAgICAgIGlmIChlcnIgJiYgZXJyLmFkdmljZSkge1xyXG4gICAgICAgIGlmIChlcnIuYWR2aWNlID09PSAncmVjb25uZWN0JyAmJiAodGhpcy5jb25uZWN0ZWQgfHwgdGhpcy5jb25uZWN0aW5nKSkge1xyXG4gICAgICAgICAgdGhpcy5kaXNjb25uZWN0KCk7XHJcbiAgICAgICAgICBpZiAodGhpcy5vcHRpb25zLnJlY29ubmVjdCkge1xyXG4gICAgICAgICAgICB0aGlzLnJlY29ubmVjdCgpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG5cclxuICAgICAgdGhpcy5wdWJsaXNoKCdlcnJvcicsIGVyciAmJiBlcnIucmVhc29uID8gZXJyLnJlYXNvbiA6IGVycik7XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ2FsbGVkIHdoZW4gdGhlIHRyYW5zcG9ydCBkaXNjb25uZWN0cy5cclxuICAgICAqXHJcbiAgICAgKiBAYXBpIHByaXZhdGVcclxuICAgICAqL1xyXG5cclxuICAgIFNvY2tldC5wcm90b3R5cGUub25EaXNjb25uZWN0ID0gZnVuY3Rpb24gKHJlYXNvbikge1xyXG4gICAgICB2YXIgd2FzQ29ubmVjdGVkID0gdGhpcy5jb25uZWN0ZWRcclxuICAgICAgICAsIHdhc0Nvbm5lY3RpbmcgPSB0aGlzLmNvbm5lY3Rpbmc7XHJcblxyXG4gICAgICB0aGlzLmNvbm5lY3RlZCA9IGZhbHNlO1xyXG4gICAgICB0aGlzLmNvbm5lY3RpbmcgPSBmYWxzZTtcclxuICAgICAgdGhpcy5vcGVuID0gZmFsc2U7XHJcblxyXG4gICAgICBpZiAod2FzQ29ubmVjdGVkIHx8IHdhc0Nvbm5lY3RpbmcpIHtcclxuICAgICAgICB0aGlzLnRyYW5zcG9ydC5jbG9zZSgpO1xyXG4gICAgICAgIHRoaXMudHJhbnNwb3J0LmNsZWFyVGltZW91dHMoKTtcclxuICAgICAgICBpZiAod2FzQ29ubmVjdGVkKSB7XHJcbiAgICAgICAgICB0aGlzLnB1Ymxpc2goJ2Rpc2Nvbm5lY3QnLCByZWFzb24pO1xyXG5cclxuICAgICAgICAgIGlmICgnYm9vdGVkJyAhPSByZWFzb24gJiYgdGhpcy5vcHRpb25zLnJlY29ubmVjdCAmJiAhdGhpcy5yZWNvbm5lY3RpbmcpIHtcclxuICAgICAgICAgICAgdGhpcy5yZWNvbm5lY3QoKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDYWxsZWQgdXBvbiByZWNvbm5lY3Rpb24uXHJcbiAgICAgKlxyXG4gICAgICogQGFwaSBwcml2YXRlXHJcbiAgICAgKi9cclxuXHJcbiAgICBTb2NrZXQucHJvdG90eXBlLnJlY29ubmVjdCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgdGhpcy5yZWNvbm5lY3RpbmcgPSB0cnVlO1xyXG4gICAgICB0aGlzLnJlY29ubmVjdGlvbkF0dGVtcHRzID0gMDtcclxuICAgICAgdGhpcy5yZWNvbm5lY3Rpb25EZWxheSA9IHRoaXMub3B0aW9uc1sncmVjb25uZWN0aW9uIGRlbGF5J107XHJcblxyXG4gICAgICB2YXIgc2VsZiA9IHRoaXNcclxuICAgICAgICAsIG1heEF0dGVtcHRzID0gdGhpcy5vcHRpb25zWydtYXggcmVjb25uZWN0aW9uIGF0dGVtcHRzJ11cclxuICAgICAgICAsIHRyeU11bHRpcGxlID0gdGhpcy5vcHRpb25zWyd0cnkgbXVsdGlwbGUgdHJhbnNwb3J0cyddXHJcbiAgICAgICAgLCBsaW1pdCA9IHRoaXMub3B0aW9uc1sncmVjb25uZWN0aW9uIGxpbWl0J107XHJcblxyXG4gICAgICBmdW5jdGlvbiByZXNldCgpIHtcclxuICAgICAgICBpZiAoc2VsZi5jb25uZWN0ZWQpIHtcclxuICAgICAgICAgIGZvciAodmFyIGkgaW4gc2VsZi5uYW1lc3BhY2VzKSB7XHJcbiAgICAgICAgICAgIGlmIChzZWxmLm5hbWVzcGFjZXMuaGFzT3duUHJvcGVydHkoaSkgJiYgJycgIT09IGkpIHtcclxuICAgICAgICAgICAgICBzZWxmLm5hbWVzcGFjZXNbaV0ucGFja2V0KHsgdHlwZTogJ2Nvbm5lY3QnIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBzZWxmLnB1Ymxpc2goJ3JlY29ubmVjdCcsIHNlbGYudHJhbnNwb3J0Lm5hbWUsIHNlbGYucmVjb25uZWN0aW9uQXR0ZW1wdHMpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY2xlYXJUaW1lb3V0KHNlbGYucmVjb25uZWN0aW9uVGltZXIpO1xyXG5cclxuICAgICAgICBzZWxmLnJlbW92ZUxpc3RlbmVyKCdjb25uZWN0X2ZhaWxlZCcsIG1heWJlUmVjb25uZWN0KTtcclxuICAgICAgICBzZWxmLnJlbW92ZUxpc3RlbmVyKCdjb25uZWN0JywgbWF5YmVSZWNvbm5lY3QpO1xyXG5cclxuICAgICAgICBzZWxmLnJlY29ubmVjdGluZyA9IGZhbHNlO1xyXG5cclxuICAgICAgICBkZWxldGUgc2VsZi5yZWNvbm5lY3Rpb25BdHRlbXB0cztcclxuICAgICAgICBkZWxldGUgc2VsZi5yZWNvbm5lY3Rpb25EZWxheTtcclxuICAgICAgICBkZWxldGUgc2VsZi5yZWNvbm5lY3Rpb25UaW1lcjtcclxuICAgICAgICBkZWxldGUgc2VsZi5yZWRvVHJhbnNwb3J0cztcclxuXHJcbiAgICAgICAgc2VsZi5vcHRpb25zWyd0cnkgbXVsdGlwbGUgdHJhbnNwb3J0cyddID0gdHJ5TXVsdGlwbGU7XHJcbiAgICAgIH07XHJcblxyXG4gICAgICBmdW5jdGlvbiBtYXliZVJlY29ubmVjdCgpIHtcclxuICAgICAgICBpZiAoIXNlbGYucmVjb25uZWN0aW5nKSB7XHJcbiAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoc2VsZi5jb25uZWN0ZWQpIHtcclxuICAgICAgICAgIHJldHVybiByZXNldCgpO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIGlmIChzZWxmLmNvbm5lY3RpbmcgJiYgc2VsZi5yZWNvbm5lY3RpbmcpIHtcclxuICAgICAgICAgIHJldHVybiBzZWxmLnJlY29ubmVjdGlvblRpbWVyID0gc2V0VGltZW91dChtYXliZVJlY29ubmVjdCwgMTAwMCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoc2VsZi5yZWNvbm5lY3Rpb25BdHRlbXB0cysrID49IG1heEF0dGVtcHRzKSB7XHJcbiAgICAgICAgICBpZiAoIXNlbGYucmVkb1RyYW5zcG9ydHMpIHtcclxuICAgICAgICAgICAgc2VsZi5vbignY29ubmVjdF9mYWlsZWQnLCBtYXliZVJlY29ubmVjdCk7XHJcbiAgICAgICAgICAgIHNlbGYub3B0aW9uc1sndHJ5IG11bHRpcGxlIHRyYW5zcG9ydHMnXSA9IHRydWU7XHJcbiAgICAgICAgICAgIHNlbGYudHJhbnNwb3J0cyA9IHNlbGYub3JpZ1RyYW5zcG9ydHM7XHJcbiAgICAgICAgICAgIHNlbGYudHJhbnNwb3J0ID0gc2VsZi5nZXRUcmFuc3BvcnQoKTtcclxuICAgICAgICAgICAgc2VsZi5yZWRvVHJhbnNwb3J0cyA9IHRydWU7XHJcbiAgICAgICAgICAgIHNlbGYuY29ubmVjdCgpO1xyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgc2VsZi5wdWJsaXNoKCdyZWNvbm5lY3RfZmFpbGVkJyk7XHJcbiAgICAgICAgICAgIHJlc2V0KCk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIGlmIChzZWxmLnJlY29ubmVjdGlvbkRlbGF5IDwgbGltaXQpIHtcclxuICAgICAgICAgICAgc2VsZi5yZWNvbm5lY3Rpb25EZWxheSAqPSAyOyAvLyBleHBvbmVudGlhbCBiYWNrIG9mZlxyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIHNlbGYuY29ubmVjdCgpO1xyXG4gICAgICAgICAgc2VsZi5wdWJsaXNoKCdyZWNvbm5lY3RpbmcnLCBzZWxmLnJlY29ubmVjdGlvbkRlbGF5LCBzZWxmLnJlY29ubmVjdGlvbkF0dGVtcHRzKTtcclxuICAgICAgICAgIHNlbGYucmVjb25uZWN0aW9uVGltZXIgPSBzZXRUaW1lb3V0KG1heWJlUmVjb25uZWN0LCBzZWxmLnJlY29ubmVjdGlvbkRlbGF5KTtcclxuICAgICAgICB9XHJcbiAgICAgIH07XHJcblxyXG4gICAgICB0aGlzLm9wdGlvbnNbJ3RyeSBtdWx0aXBsZSB0cmFuc3BvcnRzJ10gPSBmYWxzZTtcclxuICAgICAgdGhpcy5yZWNvbm5lY3Rpb25UaW1lciA9IHNldFRpbWVvdXQobWF5YmVSZWNvbm5lY3QsIHRoaXMucmVjb25uZWN0aW9uRGVsYXkpO1xyXG5cclxuICAgICAgdGhpcy5vbignY29ubmVjdCcsIG1heWJlUmVjb25uZWN0KTtcclxuICAgIH07XHJcblxyXG4gIH0pKFxyXG4gICAgJ3VuZGVmaW5lZCcgIT0gdHlwZW9mIGlvID8gaW8gOiBtb2R1bGUuZXhwb3J0c1xyXG4gICAgLCAndW5kZWZpbmVkJyAhPSB0eXBlb2YgaW8gPyBpbyA6IG1vZHVsZS5wYXJlbnQuZXhwb3J0c1xyXG4gICAgLCB0aGlzXHJcbiAgICApO1xyXG5cclxuXHJcblxyXG5cclxuICAvKipcclxuICAgKiBzb2NrZXQuaW9cclxuICAgKiBDb3B5cmlnaHQoYykgMjAxNyBNYWdpYyA8NzMwMTcwMDM0QHFxLmNvbT5cclxuICAgKiBNSVQgTGljZW5zZWRcclxuICAgKi9cclxuXHJcbiAgKGZ1bmN0aW9uIChleHBvcnRzLCBpbykge1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogRXhwb3NlIGNvbnN0cnVjdG9yLlxyXG4gICAgICovXHJcblxyXG4gICAgZXhwb3J0cy5Tb2NrZXROYW1lc3BhY2UgPSBTb2NrZXROYW1lc3BhY2U7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTb2NrZXQgbmFtZXNwYWNlIGNvbnN0cnVjdG9yLlxyXG4gICAgICpcclxuICAgICAqIEBjb25zdHJ1Y3RvclxyXG4gICAgICogQGFwaSBwdWJsaWNcclxuICAgICAqL1xyXG5cclxuICAgIGZ1bmN0aW9uIFNvY2tldE5hbWVzcGFjZShzb2NrZXQsIG5hbWUpIHtcclxuICAgICAgdGhpcy5zb2NrZXQgPSBzb2NrZXQ7XHJcbiAgICAgIHRoaXMubmFtZSA9IG5hbWUgfHwgJyc7XHJcbiAgICAgIHRoaXMuZmxhZ3MgPSB7fTtcclxuICAgICAgdGhpcy5qc29uID0gbmV3IEZsYWcodGhpcywgJ2pzb24nKTtcclxuICAgICAgdGhpcy5hY2tQYWNrZXRzID0gMDtcclxuICAgICAgdGhpcy5hY2tzID0ge307XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQXBwbHkgRXZlbnRFbWl0dGVyIG1peGluLlxyXG4gICAgICovXHJcblxyXG4gICAgaW8udXRpbC5taXhpbihTb2NrZXROYW1lc3BhY2UsIGlvLkV2ZW50RW1pdHRlcik7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDb3BpZXMgZW1pdCBzaW5jZSB3ZSBvdmVycmlkZSBpdFxyXG4gICAgICpcclxuICAgICAqIEBhcGkgcHJpdmF0ZVxyXG4gICAgICovXHJcblxyXG4gICAgU29ja2V0TmFtZXNwYWNlLnByb3RvdHlwZS4kZW1pdCA9IGlvLkV2ZW50RW1pdHRlci5wcm90b3R5cGUuZW1pdDtcclxuICAgIC8vIFNvY2tldE5hbWVzcGFjZS5wcm90b3R5cGUuJGVtaXQgPSBmYWxzZTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgYSBuZXcgbmFtZXNwYWNlLCBieSBwcm94eWluZyB0aGUgcmVxdWVzdCB0byB0aGUgc29ja2V0LiBUaGlzXHJcbiAgICAgKiBhbGxvd3MgdXMgdG8gdXNlIHRoZSBzeW5heCBhcyB3ZSBkbyBvbiB0aGUgc2VydmVyLlxyXG4gICAgICpcclxuICAgICAqIEBhcGkgcHVibGljXHJcbiAgICAgKi9cclxuXHJcbiAgICBTb2NrZXROYW1lc3BhY2UucHJvdG90eXBlLm9mID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICByZXR1cm4gdGhpcy5zb2NrZXQub2YuYXBwbHkodGhpcy5zb2NrZXQsIGFyZ3VtZW50cyk7XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2VuZHMgYSBwYWNrZXQuXHJcbiAgICAgKlxyXG4gICAgICogQGFwaSBwcml2YXRlXHJcbiAgICAgKi9cclxuXHJcbiAgICBTb2NrZXROYW1lc3BhY2UucHJvdG90eXBlLnBhY2tldCA9IGZ1bmN0aW9uIChwYWNrZXQpIHtcclxuICAgICAgcGFja2V0LmVuZHBvaW50ID0gdGhpcy5uYW1lO1xyXG4gICAgICB0aGlzLnNvY2tldC5wYWNrZXQocGFja2V0KTtcclxuICAgICAgdGhpcy5mbGFncyA9IHt9O1xyXG4gICAgICByZXR1cm4gdGhpcztcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZW5kcyBhIG1lc3NhZ2VcclxuICAgICAqXHJcbiAgICAgKiBAYXBpIHB1YmxpY1xyXG4gICAgICovXHJcblxyXG4gICAgU29ja2V0TmFtZXNwYWNlLnByb3RvdHlwZS5zZW5kID0gZnVuY3Rpb24gKGRhdGEsIGZuKSB7XHJcbiAgICAgIHZhciBwYWNrZXQgPSB7XHJcbiAgICAgICAgdHlwZTogdGhpcy5mbGFncy5qc29uID8gJ2pzb24nIDogJ21lc3NhZ2UnXHJcbiAgICAgICAgLCBkYXRhOiBkYXRhXHJcbiAgICAgIH07XHJcblxyXG4gICAgICBpZiAoJ2Z1bmN0aW9uJyA9PSB0eXBlb2YgZm4pIHtcclxuICAgICAgICBwYWNrZXQuaWQgPSArK3RoaXMuYWNrUGFja2V0cztcclxuICAgICAgICBwYWNrZXQuYWNrID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLmFja3NbcGFja2V0LmlkXSA9IGZuO1xyXG4gICAgICB9XHJcblxyXG4gICAgICByZXR1cm4gdGhpcy5wYWNrZXQocGFja2V0KTtcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBFbWl0cyBhbiBldmVudFxyXG4gICAgICpcclxuICAgICAqIEBhcGkgcHVibGljXHJcbiAgICAgKi9cclxuXHJcbiAgICBTb2NrZXROYW1lc3BhY2UucHJvdG90eXBlLmVtaXQgPSBmdW5jdGlvbiAobmFtZSkge1xyXG4gICAgICB2YXIgYXJncyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMSlcclxuICAgICAgICAsIGxhc3RBcmcgPSBhcmdzW2FyZ3MubGVuZ3RoIC0gMV1cclxuICAgICAgICAsIHBhY2tldCA9IHtcclxuICAgICAgICAgIHR5cGU6ICdldmVudCdcclxuICAgICAgICAgICwgbmFtZTogbmFtZVxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICBpZiAoJ2Z1bmN0aW9uJyA9PSB0eXBlb2YgbGFzdEFyZykge1xyXG4gICAgICAgIHBhY2tldC5pZCA9ICsrdGhpcy5hY2tQYWNrZXRzO1xyXG4gICAgICAgIHBhY2tldC5hY2sgPSAnZGF0YSc7XHJcbiAgICAgICAgdGhpcy5hY2tzW3BhY2tldC5pZF0gPSBsYXN0QXJnO1xyXG4gICAgICAgIGFyZ3MgPSBhcmdzLnNsaWNlKDAsIGFyZ3MubGVuZ3RoIC0gMSk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHBhY2tldC5hcmdzID0gYXJncztcclxuXHJcbiAgICAgIHJldHVybiB0aGlzLnBhY2tldChwYWNrZXQpO1xyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIERpc2Nvbm5lY3RzIHRoZSBuYW1lc3BhY2VcclxuICAgICAqXHJcbiAgICAgKiBAYXBpIHByaXZhdGVcclxuICAgICAqL1xyXG5cclxuICAgIFNvY2tldE5hbWVzcGFjZS5wcm90b3R5cGUuZGlzY29ubmVjdCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgaWYgKHRoaXMubmFtZSA9PT0gJycpIHtcclxuICAgICAgICB0aGlzLnNvY2tldC5kaXNjb25uZWN0KCk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5wYWNrZXQoeyB0eXBlOiAnZGlzY29ubmVjdCcgfSk7XHJcbiAgICAgICAgdGhpcy4kZW1pdCgnZGlzY29ubmVjdCcpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICByZXR1cm4gdGhpcztcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBIYW5kbGVzIGEgcGFja2V0XHJcbiAgICAgKlxyXG4gICAgICogQGFwaSBwcml2YXRlXHJcbiAgICAgKi9cclxuXHJcbiAgICBTb2NrZXROYW1lc3BhY2UucHJvdG90eXBlLm9uUGFja2V0ID0gZnVuY3Rpb24gKHBhY2tldCkge1xyXG4gICAgICB2YXIgc2VsZiA9IHRoaXM7XHJcblxyXG4gICAgICBmdW5jdGlvbiBhY2soKSB7XHJcbiAgICAgICAgc2VsZi5wYWNrZXQoe1xyXG4gICAgICAgICAgdHlwZTogJ2FjaydcclxuICAgICAgICAgICwgYXJnczogaW8udXRpbC50b0FycmF5KGFyZ3VtZW50cylcclxuICAgICAgICAgICwgYWNrSWQ6IHBhY2tldC5pZFxyXG4gICAgICAgIH0pO1xyXG4gICAgICB9O1xyXG5cclxuICAgICAgc3dpdGNoIChwYWNrZXQudHlwZSkge1xyXG4gICAgICAgIGNhc2UgJ2Nvbm5lY3QnOlxyXG4gICAgICAgICAgdGhpcy4kZW1pdCgnY29ubmVjdCcpO1xyXG4gICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgIGNhc2UgJ2Rpc2Nvbm5lY3QnOlxyXG4gICAgICAgICAgaWYgKHRoaXMubmFtZSA9PT0gJycpIHtcclxuICAgICAgICAgICAgdGhpcy5zb2NrZXQub25EaXNjb25uZWN0KHBhY2tldC5yZWFzb24gfHwgJ2Jvb3RlZCcpO1xyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy4kZW1pdCgnZGlzY29ubmVjdCcsIHBhY2tldC5yZWFzb24pO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgIGNhc2UgJ21lc3NhZ2UnOlxyXG4gICAgICAgIGNhc2UgJ2pzb24nOlxyXG4gICAgICAgICAgdmFyIHBhcmFtcyA9IFsnbWVzc2FnZScsIHBhY2tldC5kYXRhXTtcclxuXHJcbiAgICAgICAgICBpZiAocGFja2V0LmFjayA9PSAnZGF0YScpIHtcclxuICAgICAgICAgICAgcGFyYW1zLnB1c2goYWNrKTtcclxuICAgICAgICAgIH0gZWxzZSBpZiAocGFja2V0LmFjaykge1xyXG4gICAgICAgICAgICB0aGlzLnBhY2tldCh7IHR5cGU6ICdhY2snLCBhY2tJZDogcGFja2V0LmlkIH0pO1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIHRoaXMuJGVtaXQuYXBwbHkodGhpcywgcGFyYW1zKTtcclxuICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgICBjYXNlICdldmVudCc6XHJcbiAgICAgICAgICB2YXIgcGFyYW1zID0gW3BhY2tldC5uYW1lXS5jb25jYXQocGFja2V0LmFyZ3MpO1xyXG5cclxuICAgICAgICAgIGlmIChwYWNrZXQuYWNrID09ICdkYXRhJylcclxuICAgICAgICAgICAgcGFyYW1zLnB1c2goYWNrKTtcclxuXHJcbiAgICAgICAgICB0aGlzLiRlbWl0LmFwcGx5KHRoaXMsIHBhcmFtcyk7XHJcbiAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgY2FzZSAnYWNrJzpcclxuICAgICAgICAgIGlmICh0aGlzLmFja3NbcGFja2V0LmFja0lkXSkge1xyXG4gICAgICAgICAgICB0aGlzLmFja3NbcGFja2V0LmFja0lkXS5hcHBseSh0aGlzLCBwYWNrZXQuYXJncyk7XHJcbiAgICAgICAgICAgIGRlbGV0ZSB0aGlzLmFja3NbcGFja2V0LmFja0lkXTtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgICBjYXNlICdlcnJvcic6XHJcbiAgICAgICAgICBpZiAocGFja2V0LmFkdmljZSkge1xyXG4gICAgICAgICAgICB0aGlzLnNvY2tldC5vbkVycm9yKHBhY2tldCk7XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBpZiAocGFja2V0LnJlYXNvbiA9PSAndW5hdXRob3JpemVkJykge1xyXG4gICAgICAgICAgICAgIHRoaXMuJGVtaXQoJ2Nvbm5lY3RfZmFpbGVkJywgcGFja2V0LnJlYXNvbik7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgdGhpcy4kZW1pdCgnZXJyb3InLCBwYWNrZXQucmVhc29uKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBGbGFnIGludGVyZmFjZS5cclxuICAgICAqXHJcbiAgICAgKiBAYXBpIHByaXZhdGVcclxuICAgICAqL1xyXG5cclxuICAgIGZ1bmN0aW9uIEZsYWcobnNwLCBuYW1lKSB7XHJcbiAgICAgIHRoaXMubmFtZXNwYWNlID0gbnNwO1xyXG4gICAgICB0aGlzLm5hbWUgPSBuYW1lO1xyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFNlbmQgYSBtZXNzYWdlXHJcbiAgICAgKlxyXG4gICAgICogQGFwaSBwdWJsaWNcclxuICAgICAqL1xyXG5cclxuICAgIEZsYWcucHJvdG90eXBlLnNlbmQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgIHRoaXMubmFtZXNwYWNlLmZsYWdzW3RoaXMubmFtZV0gPSB0cnVlO1xyXG4gICAgICB0aGlzLm5hbWVzcGFjZS5zZW5kLmFwcGx5KHRoaXMubmFtZXNwYWNlLCBhcmd1bWVudHMpO1xyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEVtaXQgYW4gZXZlbnRcclxuICAgICAqXHJcbiAgICAgKiBAYXBpIHB1YmxpY1xyXG4gICAgICovXHJcblxyXG4gICAgRmxhZy5wcm90b3R5cGUuZW1pdCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgdGhpcy5uYW1lc3BhY2UuZmxhZ3NbdGhpcy5uYW1lXSA9IHRydWU7XHJcbiAgICAgIHRoaXMubmFtZXNwYWNlLmVtaXQuYXBwbHkodGhpcy5uYW1lc3BhY2UsIGFyZ3VtZW50cyk7XHJcbiAgICB9O1xyXG5cclxuICB9KShcclxuICAgICd1bmRlZmluZWQnICE9IHR5cGVvZiBpbyA/IGlvIDogbW9kdWxlLmV4cG9ydHNcclxuICAgICwgJ3VuZGVmaW5lZCcgIT0gdHlwZW9mIGlvID8gaW8gOiBtb2R1bGUucGFyZW50LmV4cG9ydHNcclxuICAgICk7XHJcblxyXG5cclxuICAvKipcclxuICAgKiBzb2NrZXQuaW9cclxuICAgKiBDb3B5cmlnaHQoYykgMjAxNyBNYWdpYyA8NzMwMTcwMDM0QHFxLmNvbT5cclxuICAgKiBNSVQgTGljZW5zZWRcclxuICAgKi9cclxuXHJcbiAgKGZ1bmN0aW9uIChleHBvcnRzLCBpbykge1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogRXhwb3NlIGNvbnN0cnVjdG9yLlxyXG4gICAgICovXHJcblxyXG4gICAgZXhwb3J0cy5UcmFuc3BvcnQgPSBUcmFuc3BvcnQ7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGlzIGlzIHRoZSB0cmFuc3BvcnQgdGVtcGxhdGUgZm9yIGFsbCBzdXBwb3J0ZWQgdHJhbnNwb3J0IG1ldGhvZHMuXHJcbiAgICAgKlxyXG4gICAgICogQGNvbnN0cnVjdG9yXHJcbiAgICAgKiBAYXBpIHB1YmxpY1xyXG4gICAgICovXHJcblxyXG4gICAgZnVuY3Rpb24gVHJhbnNwb3J0KHNvY2tldCwgc2Vzc2lkKSB7XHJcbiAgICAgIHRoaXMuc29ja2V0ID0gc29ja2V0O1xyXG4gICAgICB0aGlzLnNlc3NpZCA9IHNlc3NpZDtcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBBcHBseSBFdmVudEVtaXR0ZXIgbWl4aW4uXHJcbiAgICAgKi9cclxuXHJcbiAgICBpby51dGlsLm1peGluKFRyYW5zcG9ydCwgaW8uRXZlbnRFbWl0dGVyKTtcclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBJbmRpY2F0ZXMgd2hldGhlciBoZWFydGJlYXRzIGlzIGVuYWJsZWQgZm9yIHRoaXMgdHJhbnNwb3J0XHJcbiAgICAgKlxyXG4gICAgICogQGFwaSBwcml2YXRlXHJcbiAgICAgKi9cclxuXHJcbiAgICBUcmFuc3BvcnQucHJvdG90eXBlLmhlYXJ0YmVhdHMgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogSGFuZGxlcyB0aGUgcmVzcG9uc2UgZnJvbSB0aGUgc2VydmVyLiBXaGVuIGEgbmV3IHJlc3BvbnNlIGlzIHJlY2VpdmVkXHJcbiAgICAgKiBpdCB3aWxsIGF1dG9tYXRpY2FsbHkgdXBkYXRlIHRoZSB0aW1lb3V0LCBkZWNvZGUgdGhlIG1lc3NhZ2UgYW5kXHJcbiAgICAgKiBmb3J3YXJkcyB0aGUgcmVzcG9uc2UgdG8gdGhlIG9uTWVzc2FnZSBmdW5jdGlvbiBmb3IgZnVydGhlciBwcm9jZXNzaW5nLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBkYXRhIFJlc3BvbnNlIGZyb20gdGhlIHNlcnZlci5cclxuICAgICAqIEBhcGkgcHJpdmF0ZVxyXG4gICAgICovXHJcblxyXG4gICAgVHJhbnNwb3J0LnByb3RvdHlwZS5vbkRhdGEgPSBmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICB0aGlzLmNsZWFyQ2xvc2VUaW1lb3V0KCk7XHJcblxyXG4gICAgICAvLyBJZiB0aGUgY29ubmVjdGlvbiBpbiBjdXJyZW50bHkgb3BlbiAob3IgaW4gYSByZW9wZW5pbmcgc3RhdGUpIHJlc2V0IHRoZSBjbG9zZVxyXG4gICAgICAvLyB0aW1lb3V0IHNpbmNlIHdlIGhhdmUganVzdCByZWNlaXZlZCBkYXRhLiBUaGlzIGNoZWNrIGlzIG5lY2Vzc2FyeSBzb1xyXG4gICAgICAvLyB0aGF0IHdlIGRvbid0IHJlc2V0IHRoZSB0aW1lb3V0IG9uIGFuIGV4cGxpY2l0bHkgZGlzY29ubmVjdGVkIGNvbm5lY3Rpb24uXHJcbiAgICAgIGlmICh0aGlzLnNvY2tldC5jb25uZWN0ZWQgfHwgdGhpcy5zb2NrZXQuY29ubmVjdGluZyB8fCB0aGlzLnNvY2tldC5yZWNvbm5lY3RpbmcpIHtcclxuICAgICAgICB0aGlzLnNldENsb3NlVGltZW91dCgpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAoZGF0YSAhPT0gJycpIHtcclxuICAgICAgICAvLyB0b2RvOiB3ZSBzaG91bGQgb25seSBkbyBkZWNvZGVQYXlsb2FkIGZvciB4aHIgdHJhbnNwb3J0c1xyXG4gICAgICAgIHZhciBtc2dzID0gaW8ucGFyc2VyLmRlY29kZVBheWxvYWQoZGF0YSk7XHJcblxyXG4gICAgICAgIGlmIChtc2dzICYmIG1zZ3MubGVuZ3RoKSB7XHJcbiAgICAgICAgICBmb3IgKHZhciBpID0gMCwgbCA9IG1zZ3MubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHRoaXMub25QYWNrZXQobXNnc1tpXSk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcblxyXG4gICAgICByZXR1cm4gdGhpcztcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBIYW5kbGVzIHBhY2tldHMuXHJcbiAgICAgKlxyXG4gICAgICogQGFwaSBwcml2YXRlXHJcbiAgICAgKi9cclxuXHJcbiAgICBUcmFuc3BvcnQucHJvdG90eXBlLm9uUGFja2V0ID0gZnVuY3Rpb24gKHBhY2tldCkge1xyXG4gICAgICB0aGlzLnNvY2tldC5zZXRIZWFydGJlYXRUaW1lb3V0KCk7XHJcblxyXG4gICAgICBpZiAocGFja2V0LnR5cGUgPT0gJ2hlYXJ0YmVhdCcpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5vbkhlYXJ0YmVhdCgpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAocGFja2V0LnR5cGUgPT0gJ2Nvbm5lY3QnICYmIHBhY2tldC5lbmRwb2ludCA9PSAnJykge1xyXG4gICAgICAgIHRoaXMub25Db25uZWN0KCk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmIChwYWNrZXQudHlwZSA9PSAnZXJyb3InICYmIHBhY2tldC5hZHZpY2UgPT0gJ3JlY29ubmVjdCcpIHtcclxuICAgICAgICB0aGlzLmlzT3BlbiA9IGZhbHNlO1xyXG4gICAgICB9XHJcblxyXG4gICAgICB0aGlzLnNvY2tldC5vblBhY2tldChwYWNrZXQpO1xyXG5cclxuICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2V0cyBjbG9zZSB0aW1lb3V0XHJcbiAgICAgKlxyXG4gICAgICogQGFwaSBwcml2YXRlXHJcbiAgICAgKi9cclxuXHJcbiAgICBUcmFuc3BvcnQucHJvdG90eXBlLnNldENsb3NlVGltZW91dCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgaWYgKCF0aGlzLmNsb3NlVGltZW91dCkge1xyXG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcclxuXHJcbiAgICAgICAgdGhpcy5jbG9zZVRpbWVvdXQgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgIHNlbGYub25EaXNjb25uZWN0KCk7XHJcbiAgICAgICAgfSwgdGhpcy5zb2NrZXQuY2xvc2VUaW1lb3V0KTtcclxuICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIENhbGxlZCB3aGVuIHRyYW5zcG9ydCBkaXNjb25uZWN0cy5cclxuICAgICAqXHJcbiAgICAgKiBAYXBpIHByaXZhdGVcclxuICAgICAqL1xyXG5cclxuICAgIFRyYW5zcG9ydC5wcm90b3R5cGUub25EaXNjb25uZWN0ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICBpZiAodGhpcy5pc09wZW4pIHRoaXMuY2xvc2UoKTtcclxuICAgICAgdGhpcy5jbGVhclRpbWVvdXRzKCk7XHJcbiAgICAgIHRoaXMuc29ja2V0Lm9uRGlzY29ubmVjdCgpO1xyXG4gICAgICByZXR1cm4gdGhpcztcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDYWxsZWQgd2hlbiB0cmFuc3BvcnQgY29ubmVjdHNcclxuICAgICAqXHJcbiAgICAgKiBAYXBpIHByaXZhdGVcclxuICAgICAqL1xyXG5cclxuICAgIFRyYW5zcG9ydC5wcm90b3R5cGUub25Db25uZWN0ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICB0aGlzLnNvY2tldC5vbkNvbm5lY3QoKTtcclxuICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDbGVhcnMgY2xvc2UgdGltZW91dFxyXG4gICAgICpcclxuICAgICAqIEBhcGkgcHJpdmF0ZVxyXG4gICAgICovXHJcblxyXG4gICAgVHJhbnNwb3J0LnByb3RvdHlwZS5jbGVhckNsb3NlVGltZW91dCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgaWYgKHRoaXMuY2xvc2VUaW1lb3V0KSB7XHJcbiAgICAgICAgY2xlYXJUaW1lb3V0KHRoaXMuY2xvc2VUaW1lb3V0KTtcclxuICAgICAgICB0aGlzLmNsb3NlVGltZW91dCA9IG51bGw7XHJcbiAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDbGVhciB0aW1lb3V0c1xyXG4gICAgICpcclxuICAgICAqIEBhcGkgcHJpdmF0ZVxyXG4gICAgICovXHJcblxyXG4gICAgVHJhbnNwb3J0LnByb3RvdHlwZS5jbGVhclRpbWVvdXRzID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICB0aGlzLmNsZWFyQ2xvc2VUaW1lb3V0KCk7XHJcblxyXG4gICAgICBpZiAodGhpcy5yZW9wZW5UaW1lb3V0KSB7XHJcbiAgICAgICAgY2xlYXJUaW1lb3V0KHRoaXMucmVvcGVuVGltZW91dCk7XHJcbiAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZW5kcyBhIHBhY2tldFxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBwYWNrZXQgb2JqZWN0LlxyXG4gICAgICogQGFwaSBwcml2YXRlXHJcbiAgICAgKi9cclxuXHJcbiAgICBUcmFuc3BvcnQucHJvdG90eXBlLnBhY2tldCA9IGZ1bmN0aW9uIChwYWNrZXQpIHtcclxuICAgICAgdGhpcy5zZW5kKGlvLnBhcnNlci5lbmNvZGVQYWNrZXQocGFja2V0KSk7XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2VuZCB0aGUgcmVjZWl2ZWQgaGVhcnRiZWF0IG1lc3NhZ2UgYmFjayB0byBzZXJ2ZXIuIFNvIHRoZSBzZXJ2ZXJcclxuICAgICAqIGtub3dzIHdlIGFyZSBzdGlsbCBjb25uZWN0ZWQuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGhlYXJ0YmVhdCBIZWFydGJlYXQgcmVzcG9uc2UgZnJvbSB0aGUgc2VydmVyLlxyXG4gICAgICogQGFwaSBwcml2YXRlXHJcbiAgICAgKi9cclxuXHJcbiAgICBUcmFuc3BvcnQucHJvdG90eXBlLm9uSGVhcnRiZWF0ID0gZnVuY3Rpb24gKGhlYXJ0YmVhdCkge1xyXG4gICAgICB0aGlzLnBhY2tldCh7IHR5cGU6ICdoZWFydGJlYXQnIH0pO1xyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIENhbGxlZCB3aGVuIHRoZSB0cmFuc3BvcnQgb3BlbnMuXHJcbiAgICAgKlxyXG4gICAgICogQGFwaSBwcml2YXRlXHJcbiAgICAgKi9cclxuXHJcbiAgICBUcmFuc3BvcnQucHJvdG90eXBlLm9uT3BlbiA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgdGhpcy5pc09wZW4gPSB0cnVlO1xyXG4gICAgICB0aGlzLmNsZWFyQ2xvc2VUaW1lb3V0KCk7XHJcbiAgICAgIHRoaXMuc29ja2V0Lm9uT3BlbigpO1xyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIE5vdGlmaWVzIHRoZSBiYXNlIHdoZW4gdGhlIGNvbm5lY3Rpb24gd2l0aCB0aGUgU29ja2V0LklPIHNlcnZlclxyXG4gICAgICogaGFzIGJlZW4gZGlzY29ubmVjdGVkLlxyXG4gICAgICpcclxuICAgICAqIEBhcGkgcHJpdmF0ZVxyXG4gICAgICovXHJcblxyXG4gICAgVHJhbnNwb3J0LnByb3RvdHlwZS5vbkNsb3NlID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICB2YXIgc2VsZiA9IHRoaXM7XHJcblxyXG4gICAgICAvKiBGSVhNRTogcmVvcGVuIGRlbGF5IGNhdXNpbmcgYSBpbmZpbml0IGxvb3BcclxuICAgICAgdGhpcy5yZW9wZW5UaW1lb3V0ID0gc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgc2VsZi5vcGVuKCk7XHJcbiAgICAgIH0sIHRoaXMuc29ja2V0Lm9wdGlvbnNbJ3Jlb3BlbiBkZWxheSddKTsqL1xyXG5cclxuICAgICAgdGhpcy5pc09wZW4gPSBmYWxzZTtcclxuICAgICAgdGhpcy5zb2NrZXQub25DbG9zZSgpO1xyXG4gICAgICB0aGlzLm9uRGlzY29ubmVjdCgpO1xyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEdlbmVyYXRlcyBhIGNvbm5lY3Rpb24gdXJsIGJhc2VkIG9uIHRoZSBTb2NrZXQuSU8gVVJMIFByb3RvY29sLlxyXG4gICAgICogU2VlIDxodHRwczovL2dpdGh1Yi5jb20vbGVhcm5ib29zdC9zb2NrZXQuaW8tbm9kZS8+IGZvciBtb3JlIGRldGFpbHMuXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybnMge1N0cmluZ30gQ29ubmVjdGlvbiB1cmxcclxuICAgICAqIEBhcGkgcHJpdmF0ZVxyXG4gICAgICovXHJcblxyXG4gICAgVHJhbnNwb3J0LnByb3RvdHlwZS5wcmVwYXJlVXJsID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICB2YXIgb3B0aW9ucyA9IHRoaXMuc29ja2V0Lm9wdGlvbnM7XHJcblxyXG4gICAgICByZXR1cm4gdGhpcy5zY2hlbWUoKSArICc6Ly8nXHJcbiAgICAgICAgKyBvcHRpb25zLmhvc3QgKyAnOicgKyBvcHRpb25zLnBvcnQgKyAnLydcclxuICAgICAgICArIG9wdGlvbnMucmVzb3VyY2UgKyAnLycgKyBpby5wcm90b2NvbFxyXG4gICAgICAgICsgJy8nICsgdGhpcy5uYW1lICsgJy8nICsgdGhpcy5zZXNzaWQ7XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ2hlY2tzIGlmIHRoZSB0cmFuc3BvcnQgaXMgcmVhZHkgdG8gc3RhcnQgYSBjb25uZWN0aW9uLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7U29ja2V0fSBzb2NrZXQgVGhlIHNvY2tldCBpbnN0YW5jZSB0aGF0IG5lZWRzIGEgdHJhbnNwb3J0XHJcbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiBUaGUgY2FsbGJhY2tcclxuICAgICAqIEBhcGkgcHJpdmF0ZVxyXG4gICAgICovXHJcblxyXG4gICAgVHJhbnNwb3J0LnByb3RvdHlwZS5yZWFkeSA9IGZ1bmN0aW9uIChzb2NrZXQsIGZuKSB7XHJcbiAgICAgIGZuLmNhbGwodGhpcyk7XHJcbiAgICB9O1xyXG4gIH0pKFxyXG4gICAgJ3VuZGVmaW5lZCcgIT0gdHlwZW9mIGlvID8gaW8gOiBtb2R1bGUuZXhwb3J0c1xyXG4gICAgLCAndW5kZWZpbmVkJyAhPSB0eXBlb2YgaW8gPyBpbyA6IG1vZHVsZS5wYXJlbnQuZXhwb3J0c1xyXG4gICAgKTtcclxuXHJcblxyXG5cclxuICAvKipcclxuICAgKiBzb2NrZXQuaW9cclxuICAgKiBDb3B5cmlnaHQoYykgMjAxNyBNYWdpYyA8NzMwMTcwMDM0QHFxLmNvbT5cclxuICAgKiBNSVQgTGljZW5zZWRcclxuICAgKi9cclxuXHJcbiAgKGZ1bmN0aW9uIChleHBvcnRzLCBpbywgZ2xvYmFsKSB7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBFeHBvc2UgY29uc3RydWN0b3IuXHJcbiAgICAgKi9cclxuXHJcbiAgICBleHBvcnRzLndlYnNvY2tldCA9IFdTO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhlIFdlYlNvY2tldCB0cmFuc3BvcnQgdXNlcyB0aGUgSFRNTDUgV2ViU29ja2V0IEFQSSB0byBlc3RhYmxpc2ggYW5cclxuICAgICAqIHBlcnNpc3RlbnQgY29ubmVjdGlvbiB3aXRoIHRoZSBTb2NrZXQuSU8gc2VydmVyLiBUaGlzIHRyYW5zcG9ydCB3aWxsIGFsc29cclxuICAgICAqIGJlIGluaGVyaXRlZCBieSB0aGUgRmxhc2hTb2NrZXQgZmFsbGJhY2sgYXMgaXQgcHJvdmlkZXMgYSBBUEkgY29tcGF0aWJsZVxyXG4gICAgICogcG9seWZpbGwgZm9yIHRoZSBXZWJTb2NrZXRzLlxyXG4gICAgICpcclxuICAgICAqIEBjb25zdHJ1Y3RvclxyXG4gICAgICogQGV4dGVuZHMge2lvLlRyYW5zcG9ydH1cclxuICAgICAqIEBhcGkgcHVibGljXHJcbiAgICAgKi9cclxuXHJcbiAgICBmdW5jdGlvbiBXUyhzb2NrZXQpIHtcclxuICAgICAgaW8uVHJhbnNwb3J0LmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogSW5oZXJpdHMgZnJvbSBUcmFuc3BvcnQuXHJcbiAgICAgKi9cclxuXHJcbiAgICBpby51dGlsLmluaGVyaXQoV1MsIGlvLlRyYW5zcG9ydCk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUcmFuc3BvcnQgbmFtZVxyXG4gICAgICpcclxuICAgICAqIEBhcGkgcHVibGljXHJcbiAgICAgKi9cclxuXHJcbiAgICBXUy5wcm90b3R5cGUubmFtZSA9ICd3ZWJzb2NrZXQnO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogSW5pdGlhbGl6ZXMgYSBuZXcgYFdlYlNvY2tldGAgY29ubmVjdGlvbiB3aXRoIHRoZSBTb2NrZXQuSU8gc2VydmVyLiBXZSBhdHRhY2hcclxuICAgICAqIGFsbCB0aGUgYXBwcm9wcmlhdGUgbGlzdGVuZXJzIHRvIGhhbmRsZSB0aGUgcmVzcG9uc2VzIGZyb20gdGhlIHNlcnZlci5cclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJucyB7VHJhbnNwb3J0fVxyXG4gICAgICogQGFwaSBwdWJsaWNcclxuICAgICAqL1xyXG5cclxuICAgIFdTLnByb3RvdHlwZS5vcGVuID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICB2YXIgcXVlcnkgPSBpby51dGlsLnF1ZXJ5KHRoaXMuc29ja2V0Lm9wdGlvbnMucXVlcnkpXHJcbiAgICAgICAgLCBzZWxmID0gdGhpc1xyXG4gICAgICAgICwgU29ja2V0XHJcblxyXG5cclxuXHJcbiAgICAgIC8v5b6u5L+hU29ja2V0XHJcbiAgICAgIFNvY2tldCA9IHd4LmNvbm5lY3RTb2NrZXQ7XHJcblxyXG5cclxuICAgICAgLy/lvIDlp4vov57mjqVcclxuICAgICAgdmFyIHVybCA9IHRoaXMucHJlcGFyZVVybCgpICsgcXVlcnk7XHJcbiAgICAgIHRoaXMud2Vic29ja2V0ID0gbmV3IFNvY2tldCh7XHJcbiAgICAgICAgdXJsOiB1cmwsXHJcbiAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgeDogJycsXHJcbiAgICAgICAgICB5OiAnJ1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgaGVhZGVyOiB7XHJcbiAgICAgICAgICAnY29udGVudC10eXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nXHJcbiAgICAgICAgfSxcclxuICAgICAgICBwcm90b2NvbHM6IFsncHJvdG9jb2wxJ10sXHJcbiAgICAgICAgbWV0aG9kOiBcIkdFVFwiXHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgd3gub25Tb2NrZXRPcGVuKGZ1bmN0aW9uIChyZXMpIHtcclxuICAgICAgICBjb25zb2xlLmxvZygnV2ViU29ja2V06L+e5o6l5bey5omT5byA77yBJylcclxuXHJcbiAgICAgICAgc2VsZi5vbk9wZW4oKTtcclxuICAgICAgICBzZWxmLnNvY2tldC5zZXRCdWZmZXIoZmFsc2UpO1xyXG4gICAgICB9KVxyXG5cclxuICAgICAgd3gub25Tb2NrZXRFcnJvcihmdW5jdGlvbiAocmVzKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ1dlYlNvY2tldOi/nuaOpeaJk+W8gOWksei0pe+8jOivt+ajgOafpe+8gScpXHJcbiAgICAgIH0pXHJcblxyXG5cclxuXHJcbiAgICAgIHd4Lm9uU29ja2V0TWVzc2FnZShmdW5jdGlvbiAocmVzKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ+aUtuWIsOacjeWKoeWZqOWGheWuue+8micgKyByZXMuZGF0YSlcclxuICAgICAgICBzZWxmLm9uRGF0YShyZXMuZGF0YSk7XHJcbiAgICAgIH0pXHJcblxyXG4gICAgICB0aGlzLndlYnNvY2tldC5zZW5kID0gZnVuY3Rpb24gKHJlcykge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwi5Y+R6YCB5LiA5qyh5raI5oGvXCIsIHJlcylcclxuICAgICAgICB3eC5zZW5kU29ja2V0TWVzc2FnZSh7XHJcbiAgICAgICAgICBkYXRhOiByZXNcclxuICAgICAgICB9KVxyXG4gICAgICB9O1xyXG5cclxuXHJcbiAgICAgIHd4Lm9uU29ja2V0Q2xvc2UoZnVuY3Rpb24gKHJlcykge1xyXG4gICAgICAgIHNlbGYub25DbG9zZSgpO1xyXG4gICAgICAgIHNlbGYuc29ja2V0LnNldEJ1ZmZlcih0cnVlKTtcclxuICAgICAgICBjb25zb2xlLmxvZygnV2ViU29ja2V0IOW3suWFs+mXre+8gScpXHJcbiAgICAgIH0pXHJcblxyXG4gICAgICB0aGlzLndlYnNvY2tldC5jbG9zZSA9IGZ1bmN0aW9uIChyZXMpIHtcclxuICAgICAgICB3eC5jbG9zZVNvY2tldCgpO1xyXG4gICAgICB9XHJcblxyXG5cclxuXHJcbiAgICAgIHRoaXMud2Vic29ja2V0Lm9ub3BlbiA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBzZWxmLm9uT3BlbigpO1xyXG4gICAgICAgIHNlbGYuc29ja2V0LnNldEJ1ZmZlcihmYWxzZSk7XHJcbiAgICAgIH07XHJcbiAgICAgIHRoaXMud2Vic29ja2V0Lm9ubWVzc2FnZSA9IGZ1bmN0aW9uIChldikge1xyXG4gICAgICAgIHNlbGYub25EYXRhKGV2LmRhdGEpO1xyXG4gICAgICB9O1xyXG4gICAgICB0aGlzLndlYnNvY2tldC5vbmNsb3NlID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHNlbGYub25DbG9zZSgpO1xyXG4gICAgICAgIHNlbGYuc29ja2V0LnNldEJ1ZmZlcih0cnVlKTtcclxuICAgICAgfTtcclxuICAgICAgdGhpcy53ZWJzb2NrZXQub25lcnJvciA9IGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgc2VsZi5vbkVycm9yKGUpO1xyXG4gICAgICB9O1xyXG5cclxuICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2VuZCBhIG1lc3NhZ2UgdG8gdGhlIFNvY2tldC5JTyBzZXJ2ZXIuIFRoZSBtZXNzYWdlIHdpbGwgYXV0b21hdGljYWxseSBiZVxyXG4gICAgICogZW5jb2RlZCBpbiB0aGUgY29ycmVjdCBtZXNzYWdlIGZvcm1hdC5cclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJucyB7VHJhbnNwb3J0fVxyXG4gICAgICogQGFwaSBwdWJsaWNcclxuICAgICAqL1xyXG5cclxuICAgIC8vIERvIHRvIGEgYnVnIGluIHRoZSBjdXJyZW50IElEZXZpY2VzIGJyb3dzZXIsIHdlIG5lZWQgdG8gd3JhcCB0aGUgc2VuZCBpbiBhXHJcbiAgICAvLyBzZXRUaW1lb3V0LCB3aGVuIHRoZXkgcmVzdW1lIGZyb20gc2xlZXBpbmcgdGhlIGJyb3dzZXIgd2lsbCBjcmFzaCBpZlxyXG4gICAgLy8gd2UgZG9uJ3QgYWxsb3cgdGhlIGJyb3dzZXIgdGltZSB0byBkZXRlY3QgdGhlIHNvY2tldCBoYXMgYmVlbiBjbG9zZWRcclxuICAgIGlmIChpby51dGlsLnVhLmlEZXZpY2UpIHtcclxuICAgICAgV1MucHJvdG90eXBlLnNlbmQgPSBmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcclxuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgIHNlbGYud2Vic29ja2V0LnNlbmQoZGF0YSk7XHJcbiAgICAgICAgfSwgMCk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICAgIH07XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBXUy5wcm90b3R5cGUuc2VuZCA9IGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgdGhpcy53ZWJzb2NrZXQuc2VuZChkYXRhKTtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFBheWxvYWRcclxuICAgICAqXHJcbiAgICAgKiBAYXBpIHByaXZhdGVcclxuICAgICAqL1xyXG5cclxuICAgIFdTLnByb3RvdHlwZS5wYXlsb2FkID0gZnVuY3Rpb24gKGFycikge1xyXG4gICAgICBmb3IgKHZhciBpID0gMCwgbCA9IGFyci5sZW5ndGg7IGkgPCBsOyBpKyspIHtcclxuICAgICAgICB0aGlzLnBhY2tldChhcnJbaV0pO1xyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIERpc2Nvbm5lY3QgdGhlIGVzdGFibGlzaGVkIGBXZWJTb2NrZXRgIGNvbm5lY3Rpb24uXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybnMge1RyYW5zcG9ydH1cclxuICAgICAqIEBhcGkgcHVibGljXHJcbiAgICAgKi9cclxuXHJcbiAgICBXUy5wcm90b3R5cGUuY2xvc2UgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgIHRoaXMud2Vic29ja2V0LmNsb3NlKCk7XHJcbiAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEhhbmRsZSB0aGUgZXJyb3JzIHRoYXQgYFdlYlNvY2tldGAgbWlnaHQgYmUgZ2l2aW5nIHdoZW4gd2VcclxuICAgICAqIGFyZSBhdHRlbXB0aW5nIHRvIGNvbm5lY3Qgb3Igc2VuZCBtZXNzYWdlcy5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge0Vycm9yfSBlIFRoZSBlcnJvci5cclxuICAgICAqIEBhcGkgcHJpdmF0ZVxyXG4gICAgICovXHJcblxyXG4gICAgV1MucHJvdG90eXBlLm9uRXJyb3IgPSBmdW5jdGlvbiAoZSkge1xyXG4gICAgICB0aGlzLnNvY2tldC5vbkVycm9yKGUpO1xyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdGhlIGFwcHJvcHJpYXRlIHNjaGVtZSBmb3IgdGhlIFVSSSBnZW5lcmF0aW9uLlxyXG4gICAgICpcclxuICAgICAqIEBhcGkgcHJpdmF0ZVxyXG4gICAgICovXHJcbiAgICBXUy5wcm90b3R5cGUuc2NoZW1lID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICByZXR1cm4gdGhpcy5zb2NrZXQub3B0aW9ucy5zZWN1cmUgPyAnd3NzJyA6ICd3c3MnO1xyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIENoZWNrcyBpZiB0aGUgYnJvd3NlciBoYXMgc3VwcG9ydCBmb3IgbmF0aXZlIGBXZWJTb2NrZXRzYCBhbmQgdGhhdFxyXG4gICAgICogaXQncyBub3QgdGhlIHBvbHlmaWxsIGNyZWF0ZWQgZm9yIHRoZSBGbGFzaFNvY2tldCB0cmFuc3BvcnQuXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybiB7Qm9vbGVhbn1cclxuICAgICAqIEBhcGkgcHVibGljXHJcbiAgICAgKi9cclxuXHJcbiAgICBXUy5jaGVjayA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgcmV0dXJuICgnV2ViU29ja2V0JyBpbiBnbG9iYWwgJiYgISgnX19hZGRUYXNrJyBpbiBXZWJTb2NrZXQpKVxyXG4gICAgICAgIHx8ICdNb3pXZWJTb2NrZXQnIGluIGdsb2JhbDtcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDaGVjayBpZiB0aGUgYFdlYlNvY2tldGAgdHJhbnNwb3J0IHN1cHBvcnQgY3Jvc3MgZG9tYWluIGNvbW11bmljYXRpb25zLlxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm5zIHtCb29sZWFufVxyXG4gICAgICogQGFwaSBwdWJsaWNcclxuICAgICAqL1xyXG5cclxuICAgIFdTLnhkb21haW5DaGVjayA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQWRkIHRoZSB0cmFuc3BvcnQgdG8geW91ciBwdWJsaWMgaW8udHJhbnNwb3J0cyBhcnJheS5cclxuICAgICAqXHJcbiAgICAgKiBAYXBpIHByaXZhdGVcclxuICAgICAqL1xyXG5cclxuICAgIGlvLnRyYW5zcG9ydHMucHVzaCgnd2Vic29ja2V0Jyk7XHJcblxyXG4gIH0pKFxyXG4gICAgJ3VuZGVmaW5lZCcgIT0gdHlwZW9mIGlvID8gaW8uVHJhbnNwb3J0IDogbW9kdWxlLmV4cG9ydHNcclxuICAgICwgJ3VuZGVmaW5lZCcgIT0gdHlwZW9mIGlvID8gaW8gOiBtb2R1bGUucGFyZW50LmV4cG9ydHNcclxuICAgICwgdGhpc1xyXG4gICAgKTtcclxuXHJcblxyXG5cclxuICAvKipcclxuICAgKiBzb2NrZXQuaW9cclxuICAgKiBDb3B5cmlnaHQoYykgMjAxNyBNYWdpYyA8NzMwMTcwMDM0QHFxLmNvbT5cclxuICAgKiBNSVQgTGljZW5zZWRcclxuICAgKi9cclxuXHJcbiAgKGZ1bmN0aW9uIChleHBvcnRzLCBpbykge1xyXG4gICAgY29uc29sZS5sb2coJzk5OTknLCBleHBvcnRzLCAnbGxsbGwnLCBpbywgJzAwMDAwMCcpO1xyXG4gICAgLyoqXHJcbiAgICAgKiBQYXJzZXIgbmFtZXNwYWNlLlxyXG4gICAgICpcclxuICAgICAqIEBuYW1lc3BhY2VcclxuICAgICAqL1xyXG5cclxuICAgIHZhciBwYXJzZXIgPSBleHBvcnRzLnBhcnNlciA9IHt9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogUGFja2V0IHR5cGVzLlxyXG4gICAgICovXHJcblxyXG4gICAgdmFyIHBhY2tldHMgPSBwYXJzZXIucGFja2V0cyA9IFtcclxuICAgICAgJ2Rpc2Nvbm5lY3QnXHJcbiAgICAgICwgJ2Nvbm5lY3QnXHJcbiAgICAgICwgJ2hlYXJ0YmVhdCdcclxuICAgICAgLCAnbWVzc2FnZSdcclxuICAgICAgLCAnanNvbidcclxuICAgICAgLCAnZXZlbnQnXHJcbiAgICAgICwgJ2FjaydcclxuICAgICAgLCAnZXJyb3InXHJcbiAgICAgICwgJ25vb3AnXHJcbiAgICBdO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogRXJyb3JzIHJlYXNvbnMuXHJcbiAgICAgKi9cclxuXHJcbiAgICB2YXIgcmVhc29ucyA9IHBhcnNlci5yZWFzb25zID0gW1xyXG4gICAgICAndHJhbnNwb3J0IG5vdCBzdXBwb3J0ZWQnXHJcbiAgICAgICwgJ2NsaWVudCBub3QgaGFuZHNoYWtlbidcclxuICAgICAgLCAndW5hdXRob3JpemVkJ1xyXG4gICAgXTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEVycm9ycyBhZHZpY2UuXHJcbiAgICAgKi9cclxuXHJcbiAgICB2YXIgYWR2aWNlID0gcGFyc2VyLmFkdmljZSA9IFtcclxuICAgICAgJ3JlY29ubmVjdCdcclxuICAgIF07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTaG9ydGN1dHMuXHJcbiAgICAgKi9cclxuXHJcbiAgICB2YXIgSlNPTiA9IGlvLkpTT05cclxuICAgICAgLCBpbmRleE9mID0gaW8udXRpbC5pbmRleE9mO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogRW5jb2RlcyBhIHBhY2tldC5cclxuICAgICAqXHJcbiAgICAgKiBAYXBpIHByaXZhdGVcclxuICAgICAqL1xyXG5cclxuICAgIHBhcnNlci5lbmNvZGVQYWNrZXQgPSBmdW5jdGlvbiAocGFja2V0KSB7XHJcbiAgICAgIHZhciB0eXBlID0gaW5kZXhPZihwYWNrZXRzLCBwYWNrZXQudHlwZSlcclxuICAgICAgICAsIGlkID0gcGFja2V0LmlkIHx8ICcnXHJcbiAgICAgICAgLCBlbmRwb2ludCA9IHBhY2tldC5lbmRwb2ludCB8fCAnJ1xyXG4gICAgICAgICwgYWNrID0gcGFja2V0LmFja1xyXG4gICAgICAgICwgZGF0YSA9IG51bGw7XHJcblxyXG4gICAgICBzd2l0Y2ggKHBhY2tldC50eXBlKSB7XHJcbiAgICAgICAgY2FzZSAnZXJyb3InOlxyXG4gICAgICAgICAgdmFyIHJlYXNvbiA9IHBhY2tldC5yZWFzb24gPyBpbmRleE9mKHJlYXNvbnMsIHBhY2tldC5yZWFzb24pIDogJydcclxuICAgICAgICAgICAgLCBhZHYgPSBwYWNrZXQuYWR2aWNlID8gaW5kZXhPZihhZHZpY2UsIHBhY2tldC5hZHZpY2UpIDogJyc7XHJcblxyXG4gICAgICAgICAgaWYgKHJlYXNvbiAhPT0gJycgfHwgYWR2ICE9PSAnJylcclxuICAgICAgICAgICAgZGF0YSA9IHJlYXNvbiArIChhZHYgIT09ICcnID8gKCcrJyArIGFkdikgOiAnJyk7XHJcblxyXG4gICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgIGNhc2UgJ21lc3NhZ2UnOlxyXG4gICAgICAgICAgaWYgKHBhY2tldC5kYXRhICE9PSAnJylcclxuICAgICAgICAgICAgZGF0YSA9IHBhY2tldC5kYXRhO1xyXG4gICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgIGNhc2UgJ2V2ZW50JzpcclxuICAgICAgICAgIHZhciBldiA9IHsgbmFtZTogcGFja2V0Lm5hbWUgfTtcclxuXHJcbiAgICAgICAgICBpZiAocGFja2V0LmFyZ3MgJiYgcGFja2V0LmFyZ3MubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIGV2LmFyZ3MgPSBwYWNrZXQuYXJncztcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICBkYXRhID0gSlNPTi5zdHJpbmdpZnkoZXYpO1xyXG4gICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgIGNhc2UgJ2pzb24nOlxyXG4gICAgICAgICAgZGF0YSA9IEpTT04uc3RyaW5naWZ5KHBhY2tldC5kYXRhKTtcclxuICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgICBjYXNlICdjb25uZWN0JzpcclxuICAgICAgICAgIGlmIChwYWNrZXQucXMpXHJcbiAgICAgICAgICAgIGRhdGEgPSBwYWNrZXQucXM7XHJcbiAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgY2FzZSAnYWNrJzpcclxuICAgICAgICAgIGRhdGEgPSBwYWNrZXQuYWNrSWRcclxuICAgICAgICAgICAgKyAocGFja2V0LmFyZ3MgJiYgcGFja2V0LmFyZ3MubGVuZ3RoXHJcbiAgICAgICAgICAgICAgPyAnKycgKyBKU09OLnN0cmluZ2lmeShwYWNrZXQuYXJncykgOiAnJyk7XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgfVxyXG5cclxuICAgICAgLy8gY29uc3RydWN0IHBhY2tldCB3aXRoIHJlcXVpcmVkIGZyYWdtZW50c1xyXG4gICAgICB2YXIgZW5jb2RlZCA9IFtcclxuICAgICAgICB0eXBlXHJcbiAgICAgICAgLCBpZCArIChhY2sgPT0gJ2RhdGEnID8gJysnIDogJycpXHJcbiAgICAgICAgLCBlbmRwb2ludFxyXG4gICAgICBdO1xyXG5cclxuICAgICAgLy8gZGF0YSBmcmFnbWVudCBpcyBvcHRpb25hbFxyXG4gICAgICBpZiAoZGF0YSAhPT0gbnVsbCAmJiBkYXRhICE9PSB1bmRlZmluZWQpXHJcbiAgICAgICAgZW5jb2RlZC5wdXNoKGRhdGEpO1xyXG5cclxuICAgICAgcmV0dXJuIGVuY29kZWQuam9pbignOicpO1xyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEVuY29kZXMgbXVsdGlwbGUgbWVzc2FnZXMgKHBheWxvYWQpLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7QXJyYXl9IG1lc3NhZ2VzXHJcbiAgICAgKiBAYXBpIHByaXZhdGVcclxuICAgICAqL1xyXG5cclxuICAgIHBhcnNlci5lbmNvZGVQYXlsb2FkID0gZnVuY3Rpb24gKHBhY2tldHMpIHtcclxuICAgICAgdmFyIGRlY29kZWQgPSAnJztcclxuXHJcbiAgICAgIGlmIChwYWNrZXRzLmxlbmd0aCA9PSAxKVxyXG4gICAgICAgIHJldHVybiBwYWNrZXRzWzBdO1xyXG5cclxuICAgICAgZm9yICh2YXIgaSA9IDAsIGwgPSBwYWNrZXRzLmxlbmd0aDsgaSA8IGw7IGkrKykge1xyXG4gICAgICAgIHZhciBwYWNrZXQgPSBwYWNrZXRzW2ldO1xyXG4gICAgICAgIGRlY29kZWQgKz0gJ1xcdWZmZmQnICsgcGFja2V0Lmxlbmd0aCArICdcXHVmZmZkJyArIHBhY2tldHNbaV07XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHJldHVybiBkZWNvZGVkO1xyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIERlY29kZXMgYSBwYWNrZXRcclxuICAgICAqXHJcbiAgICAgKiBAYXBpIHByaXZhdGVcclxuICAgICAqL1xyXG5cclxuICAgIHZhciByZWdleHAgPSAvKFteOl0rKTooWzAtOV0rKT8oXFwrKT86KFteOl0rKT86PyhbXFxzXFxTXSopPy87XHJcblxyXG4gICAgcGFyc2VyLmRlY29kZVBhY2tldCA9IGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgIHZhciBwaWVjZXMgPSBkYXRhLm1hdGNoKHJlZ2V4cCk7XHJcblxyXG4gICAgICBpZiAoIXBpZWNlcykgcmV0dXJuIHt9O1xyXG5cclxuICAgICAgdmFyIGlkID0gcGllY2VzWzJdIHx8ICcnXHJcbiAgICAgICAgLCBkYXRhID0gcGllY2VzWzVdIHx8ICcnXHJcbiAgICAgICAgLCBwYWNrZXQgPSB7XHJcbiAgICAgICAgICB0eXBlOiBwYWNrZXRzW3BpZWNlc1sxXV1cclxuICAgICAgICAgICwgZW5kcG9pbnQ6IHBpZWNlc1s0XSB8fCAnJ1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAvLyB3aGV0aGVyIHdlIG5lZWQgdG8gYWNrbm93bGVkZ2UgdGhlIHBhY2tldFxyXG4gICAgICBpZiAoaWQpIHtcclxuICAgICAgICBwYWNrZXQuaWQgPSBpZDtcclxuICAgICAgICBpZiAocGllY2VzWzNdKVxyXG4gICAgICAgICAgcGFja2V0LmFjayA9ICdkYXRhJztcclxuICAgICAgICBlbHNlXHJcbiAgICAgICAgICBwYWNrZXQuYWNrID0gdHJ1ZTtcclxuICAgICAgfVxyXG5cclxuICAgICAgLy8gaGFuZGxlIGRpZmZlcmVudCBwYWNrZXQgdHlwZXNcclxuICAgICAgc3dpdGNoIChwYWNrZXQudHlwZSkge1xyXG4gICAgICAgIGNhc2UgJ2Vycm9yJzpcclxuICAgICAgICAgIHZhciBwaWVjZXMgPSBkYXRhLnNwbGl0KCcrJyk7XHJcbiAgICAgICAgICBwYWNrZXQucmVhc29uID0gcmVhc29uc1twaWVjZXNbMF1dIHx8ICcnO1xyXG4gICAgICAgICAgcGFja2V0LmFkdmljZSA9IGFkdmljZVtwaWVjZXNbMV1dIHx8ICcnO1xyXG4gICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgIGNhc2UgJ21lc3NhZ2UnOlxyXG4gICAgICAgICAgcGFja2V0LmRhdGEgPSBkYXRhIHx8ICcnO1xyXG4gICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgIGNhc2UgJ2V2ZW50JzpcclxuICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIHZhciBvcHRzID0gSlNPTi5wYXJzZShkYXRhKTtcclxuICAgICAgICAgICAgcGFja2V0Lm5hbWUgPSBvcHRzLm5hbWU7XHJcbiAgICAgICAgICAgIHBhY2tldC5hcmdzID0gb3B0cy5hcmdzO1xyXG4gICAgICAgICAgfSBjYXRjaCAoZSkgeyB9XHJcblxyXG4gICAgICAgICAgcGFja2V0LmFyZ3MgPSBwYWNrZXQuYXJncyB8fCBbXTtcclxuICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgICBjYXNlICdqc29uJzpcclxuICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIHBhY2tldC5kYXRhID0gSlNPTi5wYXJzZShkYXRhKTtcclxuICAgICAgICAgIH0gY2F0Y2ggKGUpIHsgfVxyXG4gICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgIGNhc2UgJ2Nvbm5lY3QnOlxyXG4gICAgICAgICAgcGFja2V0LnFzID0gZGF0YSB8fCAnJztcclxuICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgICBjYXNlICdhY2snOlxyXG4gICAgICAgICAgdmFyIHBpZWNlcyA9IGRhdGEubWF0Y2goL14oWzAtOV0rKShcXCspPyguKikvKTtcclxuICAgICAgICAgIGlmIChwaWVjZXMpIHtcclxuICAgICAgICAgICAgcGFja2V0LmFja0lkID0gcGllY2VzWzFdO1xyXG4gICAgICAgICAgICBwYWNrZXQuYXJncyA9IFtdO1xyXG5cclxuICAgICAgICAgICAgaWYgKHBpZWNlc1szXSkge1xyXG4gICAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICBwYWNrZXQuYXJncyA9IHBpZWNlc1szXSA/IEpTT04ucGFyc2UocGllY2VzWzNdKSA6IFtdO1xyXG4gICAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHsgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgY2FzZSAnZGlzY29ubmVjdCc6XHJcbiAgICAgICAgY2FzZSAnaGVhcnRiZWF0JzpcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICB9O1xyXG5cclxuICAgICAgcmV0dXJuIHBhY2tldDtcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBEZWNvZGVzIGRhdGEgcGF5bG9hZC4gRGV0ZWN0cyBtdWx0aXBsZSBtZXNzYWdlc1xyXG4gICAgICpcclxuICAgICAqIEByZXR1cm4ge0FycmF5fSBtZXNzYWdlc1xyXG4gICAgICogQGFwaSBwdWJsaWNcclxuICAgICAqL1xyXG5cclxuICAgIHBhcnNlci5kZWNvZGVQYXlsb2FkID0gZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgLy8gSUUgZG9lc24ndCBsaWtlIGRhdGFbaV0gZm9yIHVuaWNvZGUgY2hhcnMsIGNoYXJBdCB3b3JrcyBmaW5lXHJcbiAgICAgIGlmIChkYXRhLmNoYXJBdCgwKSA9PSAnXFx1ZmZmZCcpIHtcclxuICAgICAgICB2YXIgcmV0ID0gW107XHJcblxyXG4gICAgICAgIGZvciAodmFyIGkgPSAxLCBsZW5ndGggPSAnJzsgaSA8IGRhdGEubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgIGlmIChkYXRhLmNoYXJBdChpKSA9PSAnXFx1ZmZmZCcpIHtcclxuICAgICAgICAgICAgcmV0LnB1c2gocGFyc2VyLmRlY29kZVBhY2tldChkYXRhLnN1YnN0cihpICsgMSkuc3Vic3RyKDAsIGxlbmd0aCkpKTtcclxuICAgICAgICAgICAgaSArPSBOdW1iZXIobGVuZ3RoKSArIDE7XHJcbiAgICAgICAgICAgIGxlbmd0aCA9ICcnO1xyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgbGVuZ3RoICs9IGRhdGEuY2hhckF0KGkpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHJldDtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICByZXR1cm4gW3BhcnNlci5kZWNvZGVQYWNrZXQoZGF0YSldO1xyXG4gICAgICB9XHJcbiAgICB9O1xyXG5cclxuICB9KShcclxuICAgICd1bmRlZmluZWQnICE9IHR5cGVvZiBpbyA/IGlvIDogbW9kdWxlLmV4cG9ydHNcclxuICAgICwgJ3VuZGVmaW5lZCcgIT0gdHlwZW9mIGlvID8gaW8gOiBtb2R1bGUucGFyZW50LmV4cG9ydHNcclxuICAgICk7XHJcblxyXG5cclxuXHJcbiAgLyoqXHJcbiAgICogc29ja2V0LmlvXHJcbiAgICogQ29weXJpZ2h0KGMpIDIwMTcgTWFnaWMgPDczMDE3MDAzNEBxcS5jb20+XHJcbiAgICogTUlUIExpY2Vuc2VkXHJcbiAgICovXHJcblxyXG5cclxuXHJcbiAgLyoqXHJcbiAqIOWIneWni+WMluaXtumcgOimgeiwg+eUqOi/meS4quWHveaVsOOAguWPr+S7peS7jkJtb2JTb2NrZXRJb+S4reiOt+WPluaJgOmcgOeahGtleVxyXG4gKlxyXG4gKiBAcGFyYW0ge1N0cmluZ30gYXBwbGljYXRpb25JZCDkvaDnmoQgQXBwbGljYXRpb24gSUQuXHJcbiAqIEBwYXJhbSB7U3RyaW5nfSBtYXN0ZXJLZXkgKG9wdGlvbmFsKSDkvaDnmoQgQm1vYlNvY2tldElvIE1hc3RlciBLZXkuXHJcbiAqL1xyXG4gIEJtb2JTb2NrZXRJby5pbml0aWFsaXplID0gZnVuY3Rpb24gKGFwcGxpY2F0aW9uSWQpIHtcclxuICAgIGlmICghYXBwbGljYXRpb25JZCkge1xyXG4gICAgICB0aHJvdyBcIkJtb2JTb2NrZXRJby5pbml0aWFsaXplKCkgbmVlZCBhIGFwcGxpY2F0aW9uSWRcIjtcclxuICAgIH1cclxuICAgIEJtb2JTb2NrZXRJby5faW5pdGlhbGl6ZShhcHBsaWNhdGlvbklkKTtcclxuICB9O1xyXG5cclxuICBCbW9iU29ja2V0SW8uc2VydmVyVVJMID0gXCJ3c3M6Ly93c3MuYm1vYi5jbi9cIjtcclxuXHJcbiAgQm1vYlNvY2tldElvLm9iaiA9IG51bGw7XHJcblxyXG4gIEJtb2JTb2NrZXRJby5pbml0ID0gZnVuY3Rpb24gKGFwcGxpY2F0aW9uSWQpIHtcclxuICAgIC8vc29ja2VpdCBvYmpcclxuICAgIEJtb2JTb2NrZXRJby5vYmogPSBpby5jb25uZWN0KEJtb2JTb2NrZXRJby5zZXJ2ZXJVUkwpO1xyXG5cclxuICAgIC8v55uR5ZCs5pyN5Yqh5Zmo55qE5ZON5bqUXHJcbiAgICBCbW9iU29ja2V0SW8ub2JqLm9uKFwic2VydmVyX3B1YlwiLCBmdW5jdGlvbiAocmVzcCkge1xyXG5cclxuICAgICAgdmFyIGRhdGEgPSBKU09OLnBhcnNlKHJlc3ApO1xyXG5cclxuICAgICAgc3dpdGNoIChkYXRhLmFjdGlvbikge1xyXG4gICAgICAgIGNhc2UgXCJ1cGRhdGVUYWJsZVwiOlxyXG4gICAgICAgICAgQm1vYlNvY2tldElvLm9uVXBkYXRlVGFibGUoZGF0YS50YWJsZU5hbWUsIGRhdGEuZGF0YSk7XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIFwidXBkYXRlUm93XCI6XHJcbiAgICAgICAgICBCbW9iU29ja2V0SW8ub25VcGRhdGVSb3coZGF0YS50YWJsZU5hbWUsIGRhdGEub2JqZWN0SWQsIGRhdGEuZGF0YSk7XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIFwiZGVsZXRlVGFibGVcIjpcclxuICAgICAgICAgIEJtb2JTb2NrZXRJby5vbkRlbGV0ZVRhYmxlKGRhdGEudGFibGVOYW1lLCBkYXRhLmRhdGEpO1xyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSBcImRlbGV0ZVJvd1wiOlxyXG4gICAgICAgICAgQm1vYlNvY2tldElvLm9uRGVsZXRlUm93KGRhdGEudGFibGVOYW1lLCBkYXRhLm9iamVjdElkLCBkYXRhLmRhdGEpO1xyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIC8vIC8v6L+e5o6l5LiKc29ja2V0Lmlv5pyN5Yqh5Zmo5ZCO6Kem5Y+R55qE5LqL5Lu2XHJcbiAgICBCbW9iU29ja2V0SW8ub2JqLm9uKFwiY2xpZW50X3NlbmRfZGF0YVwiLCBmdW5jdGlvbiAocmVzcCkge1xyXG4gICAgICBpby5CbW9iU29ja2V0SW8ub25Jbml0TGlzdGVuKCk7XHJcbiAgICB9KTtcclxuXHJcblxyXG5cclxuICAgIEJtb2JTb2NrZXRJby5vYmoub24oXCJkaXNjb25uZWN0XCIsIGZ1bmN0aW9uKCkge1xyXG4gICAgICBjb25zb2xlLmxvZyhcIllvdSBoYXZlIGRpc2Nvbm5lY3RlZCBmcm9tIHRoZSBzZXJ2ZXJcIilcclxuICAgIH0pXHJcblxyXG4gIH07XHJcblxyXG5cclxuICAvKipcclxuICAgKiBDYWxsIHRoaXMgbWV0aG9kIGZpcnN0IHRvIHNldCB1cCBhdXRoZW50aWNhdGlvbiB0b2tlbnMgZm9yIEJtb2JTb2NrZXRJby5cclxuICAgKiBUaGlzIG1ldGhvZCBpcyBmb3IgQm1vYlNvY2tldElvJ3Mgb3duIHByaXZhdGUgdXNlLlxyXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBhcHBsaWNhdGlvbklkIFlvdXIgQm1vYlNvY2tldElvIEFwcGxpY2F0aW9uIElEXHJcbiAgICovXHJcbiAgQm1vYlNvY2tldElvLl9pbml0aWFsaXplID0gZnVuY3Rpb24gKGFwcGxpY2F0aW9uSWQpIHtcclxuICAgIEJtb2JTb2NrZXRJby5hcHBsaWNhdGlvbklkID0gYXBwbGljYXRpb25JZDtcclxuXHJcbiAgICAvLyAvL3NvY2tlaXQgb2JqXHJcbiAgICAvLyBCbW9iU29ja2V0SW8ub2JqID0gaW8uY29ubmVjdChCbW9iU29ja2V0SW8uc2VydmVyVVJMKTtcclxuXHJcbiAgICAvLyAvL+ebkeWQrOacjeWKoeWZqOeahOWTjeW6lFxyXG4gICAgLy8gQm1vYlNvY2tldElvLm9iai5vbihcInNlcnZlcl9wdWJcIiwgZnVuY3Rpb24gKHJlc3ApIHtcclxuXHJcbiAgICAvLyAgIHZhciBkYXRhID0gSlNPTi5wYXJzZShyZXNwKTtcclxuXHJcbiAgICAvLyAgIHN3aXRjaCAoZGF0YS5hY3Rpb24pIHtcclxuICAgIC8vICAgICBjYXNlIFwidXBkYXRlVGFibGVcIjpcclxuICAgIC8vICAgICAgIEJtb2JTb2NrZXRJby5vblVwZGF0ZVRhYmxlKGRhdGEudGFibGVOYW1lLCBkYXRhLmRhdGEpO1xyXG4gICAgLy8gICAgICAgYnJlYWs7XHJcbiAgICAvLyAgICAgY2FzZSBcInVwZGF0ZVJvd1wiOlxyXG4gICAgLy8gICAgICAgQm1vYlNvY2tldElvLm9uVXBkYXRlUm93KGRhdGEudGFibGVOYW1lLCBkYXRhLm9iamVjdElkLCBkYXRhLmRhdGEpO1xyXG4gICAgLy8gICAgICAgYnJlYWs7XHJcbiAgICAvLyAgICAgY2FzZSBcImRlbGV0ZVRhYmxlXCI6XHJcbiAgICAvLyAgICAgICBCbW9iU29ja2V0SW8ub25EZWxldGVUYWJsZShkYXRhLnRhYmxlTmFtZSwgZGF0YS5kYXRhKTtcclxuICAgIC8vICAgICAgIGJyZWFrO1xyXG4gICAgLy8gICAgIGNhc2UgXCJkZWxldGVSb3dcIjpcclxuICAgIC8vICAgICAgIEJtb2JTb2NrZXRJby5vbkRlbGV0ZVJvdyhkYXRhLnRhYmxlTmFtZSwgZGF0YS5vYmplY3RJZCwgZGF0YS5kYXRhKTtcclxuICAgIC8vICAgICAgIGJyZWFrO1xyXG4gICAgLy8gICB9XHJcbiAgICAvLyB9KTtcclxuXHJcbiAgICAvLyAvLyAvL+i/nuaOpeS4inNvY2tldC5pb+acjeWKoeWZqOWQjuinpuWPkeeahOS6i+S7tlxyXG4gICAgLy8gQm1vYlNvY2tldElvLm9iai5vbihcImNsaWVudF9zZW5kX2RhdGFcIiwgZnVuY3Rpb24gKHJlc3ApIHtcclxuICAgIC8vICAgaW8uQm1vYlNvY2tldElvLm9uSW5pdExpc3RlbigpO1xyXG4gICAgLy8gfSk7XHJcblxyXG4gIH07XHJcblxyXG5cclxuXHJcbiAgLy9cInVuc3ViX3VwZGF0ZVRhYmxlXCIgLFwidW5zdWJfdXBkYXRlUm93XCIsIFwidW5zdWJfZGVsZXRlVGFibGVcIiwgXCJ1bnN1Yl9kZWxldGVSb3dcIlxyXG4gIC8v6K6i6ZiF5pu05paw5pWw5o2u6KGo55qE5pWw5o2uXHJcbiAgQm1vYlNvY2tldElvLnVwZGF0ZVRhYmxlID0gZnVuY3Rpb24gKHRhYmxlbmFtZSkge1xyXG5cclxuICAgIHZhciBkYXRhID0geyBcImFwcEtleVwiOiBCbW9iU29ja2V0SW8uYXBwbGljYXRpb25JZCwgXCJ0YWJsZU5hbWVcIjogdGFibGVuYW1lLCBcIm9iamVjdElkXCI6IFwiXCIsIFwiYWN0aW9uXCI6IFwidXBkYXRlVGFibGVcIiB9O1xyXG4gICAgQm1vYlNvY2tldElvLm9iai5lbWl0KFwiY2xpZW50X3N1YlwiLCBKU09OLnN0cmluZ2lmeShkYXRhKSk7XHJcblxyXG4gIH07XHJcblxyXG4gIC8v5Y+W5raI6K6i6ZiF5pu05paw5pWw5o2u6KGo55qE5pWw5o2uXHJcbiAgQm1vYlNvY2tldElvLnVuc3ViVXBkYXRlVGFibGUgPSBmdW5jdGlvbiAodGFibGVuYW1lKSB7XHJcblxyXG4gICAgdmFyIGRhdGEgPSB7IFwiYXBwS2V5XCI6IEJtb2JTb2NrZXRJby5hcHBsaWNhdGlvbklkLCBcInRhYmxlTmFtZVwiOiB0YWJsZW5hbWUsIFwib2JqZWN0SWRcIjogXCJcIiwgXCJhY3Rpb25cIjogXCJ1bnN1Yl91cGRhdGVUYWJsZVwiIH07XHJcbiAgICBCbW9iU29ja2V0SW8ub2JqLmVtaXQoXCJjbGllbnRfdW5zdWJcIiwgSlNPTi5zdHJpbmdpZnkoZGF0YSkpO1xyXG5cclxuICB9O1xyXG5cclxuXHJcbiAgLy/orqLpmIXooYzmm7TmlrDnmoTmlbDmja5cclxuICBCbW9iU29ja2V0SW8udXBkYXRlUm93ID0gZnVuY3Rpb24gKHRhYmxlbmFtZSwgb2JqZWN0SWQpIHtcclxuXHJcbiAgICB2YXIgZGF0YSA9IHsgXCJhcHBLZXlcIjogQm1vYlNvY2tldElvLmFwcGxpY2F0aW9uSWQsIFwidGFibGVOYW1lXCI6IHRhYmxlbmFtZSwgXCJvYmplY3RJZFwiOiBvYmplY3RJZCwgXCJhY3Rpb25cIjogXCJ1cGRhdGVSb3dcIiB9O1xyXG4gICAgQm1vYlNvY2tldElvLm9iai5lbWl0KFwiY2xpZW50X3N1YlwiLCBKU09OLnN0cmluZ2lmeShkYXRhKSk7XHJcblxyXG4gIH07XHJcblxyXG5cclxuICAvL+WPlua2iOiuoumYheihjOabtOaWsOeahOaVsOaNrlxyXG4gIEJtb2JTb2NrZXRJby51bnN1YlVwZGF0ZVJvdyA9IGZ1bmN0aW9uICh0YWJsZW5hbWUsIG9iamVjdElkKSB7XHJcblxyXG4gICAgdmFyIGRhdGEgPSB7IFwiYXBwS2V5XCI6IEJtb2JTb2NrZXRJby5hcHBsaWNhdGlvbklkLCBcInRhYmxlTmFtZVwiOiB0YWJsZW5hbWUsIFwib2JqZWN0SWRcIjogb2JqZWN0SWQsIFwiYWN0aW9uXCI6IFwidW5zdWJfdXBkYXRlUm93XCIgfTtcclxuICAgIEJtb2JTb2NrZXRJby5vYmouZW1pdChcImNsaWVudF91bnN1YlwiLCBKU09OLnN0cmluZ2lmeShkYXRhKSk7XHJcblxyXG4gIH07XHJcblxyXG4gIC8v6K6i6ZiF6KGo5Yig6Zmk55qE5pWw5o2uXHJcbiAgQm1vYlNvY2tldElvLmRlbGV0ZVRhYmxlID0gZnVuY3Rpb24gKHRhYmxlbmFtZSkge1xyXG5cclxuICAgIHZhciBkYXRhID0geyBcImFwcEtleVwiOiBCbW9iU29ja2V0SW8uYXBwbGljYXRpb25JZCwgXCJ0YWJsZU5hbWVcIjogdGFibGVuYW1lLCBcIm9iamVjdElkXCI6IFwiXCIsIFwiYWN0aW9uXCI6IFwiZGVsZXRlVGFibGVcIiB9O1xyXG4gICAgQm1vYlNvY2tldElvLm9iai5lbWl0KFwiY2xpZW50X3N1YlwiLCBKU09OLnN0cmluZ2lmeShkYXRhKSk7XHJcblxyXG4gIH07XHJcblxyXG4gIC8v5Y+W5raI6K6i6ZiF6KGo5Yig6Zmk55qE5pWw5o2uXHJcbiAgQm1vYlNvY2tldElvLnVuc3ViRGVsZXRlVGFibGUgPSBmdW5jdGlvbiAodGFibGVuYW1lKSB7XHJcblxyXG4gICAgdmFyIGRhdGEgPSB7IFwiYXBwS2V5XCI6IEJtb2JTb2NrZXRJby5hcHBsaWNhdGlvbklkLCBcInRhYmxlTmFtZVwiOiB0YWJsZW5hbWUsIFwib2JqZWN0SWRcIjogXCJcIiwgXCJhY3Rpb25cIjogXCJ1bnN1Yl9kZWxldGVUYWJsZVwiIH07XHJcbiAgICBCbW9iU29ja2V0SW8ub2JqLmVtaXQoXCJjbGllbnRfdW5zdWJcIiwgSlNPTi5zdHJpbmdpZnkoZGF0YSkpO1xyXG5cclxuICB9O1xyXG5cclxuICAvL+iuoumYheabtOaWsOaVsOaNruihqOeahOaVsOaNrlxyXG4gIEJtb2JTb2NrZXRJby5kZWxldGVSb3cgPSBmdW5jdGlvbiAodGFibGVuYW1lLCBvYmplY3RJZCkge1xyXG5cclxuICAgIHZhciBkYXRhID0geyBcImFwcEtleVwiOiBCbW9iU29ja2V0SW8uYXBwbGljYXRpb25JZCwgXCJ0YWJsZU5hbWVcIjogdGFibGVuYW1lLCBcIm9iamVjdElkXCI6IG9iamVjdElkLCBcImFjdGlvblwiOiBcImRlbGV0ZVJvd1wiIH07XHJcbiAgICBCbW9iU29ja2V0SW8ub2JqLmVtaXQoXCJjbGllbnRfc3ViXCIsIEpTT04uc3RyaW5naWZ5KGRhdGEpKTtcclxuXHJcbiAgfTtcclxuXHJcbiAgLy/orqLpmIXmm7TmlrDmlbDmja7ooajnmoTmlbDmja5cclxuICBCbW9iU29ja2V0SW8udW5zdWJEZWxldGVSb3cgPSBmdW5jdGlvbiAodGFibGVuYW1lLCBvYmplY3RJZCkge1xyXG5cclxuICAgIHZhciBkYXRhID0geyBcImFwcEtleVwiOiBCbW9iU29ja2V0SW8uYXBwbGljYXRpb25JZCwgXCJ0YWJsZU5hbWVcIjogdGFibGVuYW1lLCBcIm9iamVjdElkXCI6IG9iamVjdElkLCBcImFjdGlvblwiOiBcInVuc3ViX2RlbGV0ZVJvd1wiIH07XHJcbiAgICBCbW9iU29ja2V0SW8ub2JqLmVtaXQoXCJjbGllbnRfdW5zdWJcIiwgSlNPTi5zdHJpbmdpZnkoZGF0YSkpO1xyXG5cclxuICB9O1xyXG5cclxuXHJcblxyXG4gIC8v55uR5ZCs5pyN5Yqh5Zmo6L+U5Zue55qE5pu05paw5pWw5o2u6KGo55qE5pWw5o2u77yM6ZyA6KaB55So5oi36YeN5YaZXHJcbiAgQm1vYlNvY2tldElvLm9uVXBkYXRlVGFibGUgPSBmdW5jdGlvbiAodGFibGVuYW1lLCBkYXRhKSB7XHJcblxyXG4gIH07XHJcblxyXG4gIC8v55uR5ZCs5pyN5Yqh5Zmo6L+U5Zue55qE5pu05paw5pWw5o2u6KGo55qE5pWw5o2u77yM6ZyA6KaB55So5oi36YeN5YaZXHJcbiAgQm1vYlNvY2tldElvLm9uVXBkYXRlUm93ID0gZnVuY3Rpb24gKHRhYmxlbmFtZSwgb2JqZWN0SWQsIGRhdGEpIHtcclxuXHJcbiAgfTtcclxuXHJcbiAgLy/nm5HlkKzmnI3liqHlmajov5Tlm57nmoTmm7TmlrDmlbDmja7ooajnmoTmlbDmja7vvIzpnIDopoHnlKjmiLfph43lhplcclxuICBCbW9iU29ja2V0SW8ub25EZWxldGVUYWJsZSA9IGZ1bmN0aW9uICh0YWJsZW5hbWUsIGRhdGEpIHtcclxuXHJcbiAgfTtcclxuXHJcbiAgLy/nm5HlkKzmnI3liqHlmajov5Tlm57nmoTmm7TmlrDmlbDmja7ooajnmoTmlbDmja7vvIzpnIDopoHnlKjmiLfph43lhplcclxuICBCbW9iU29ja2V0SW8ub25EZWxldGVSb3cgPSBmdW5jdGlvbiAodGFibGVuYW1lLCBvYmplY3RJZCwgZGF0YSkge1xyXG5cclxuICB9O1xyXG5cclxuICAvL+WIneWni+i/nuaOpXNvY2tldC5pb+acjeWKoeWZqOWQju+8jOmcgOimgeebkeWQrOeahOS6i+S7tumDveWGmeWcqOi/meS4quWHveaVsOWGhe+8jFxyXG4gIC8v5rOo5oSP77yM5b+F6aG76KaB5oqK55uR5ZCs55qE5pWw5o2u5YaZ5Zyo6L+Z5Liq5Ye95pWw5YaF77yMXHJcbiAgLy/lvZPmtY/op4jlmajlm6DmhI/lpJbmlq3nvZHlkI7vvIzmnI3liqHlmajkuIrnmoTorqLpmIXkuovku7bkvJrlj5bmtojvvIxqc+iEmuacrOS8mumHjeaWsOi/nuaOpeacjeWKoeWZqO+8jOWGmeWcqOi/meS4quWHveaVsOWGheeahOiuoumYheS6i+S7tuS8mumHjeaWsOWcqOacjeWKoeWZqOS4iuiuoumYhVxyXG4gIEJtb2JTb2NrZXRJby5vbkluaXRMaXN0ZW4gPSBmdW5jdGlvbiAoKSB7XHJcblxyXG4gIH07XHJcblxyXG59LmNhbGwodGhpcykpOyJdfQ==