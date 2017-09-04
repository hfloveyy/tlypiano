'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

//     Underscore.js 1.8.3
//     http://underscorejs.org
//     (c) 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
//     Underscore may be freely distributed under the MIT license.

(function () {

    // Baseline setup
    // --------------

    // Establish the root object, `window` in the browser, or `exports` on the server.
    //var root = this;

    // Save the previous value of the `_` variable.
    //var previousUnderscore = root._;

    // Save bytes in the minified (but not gzipped) version:
    var ArrayProto = Array.prototype,
        ObjProto = Object.prototype,
        FuncProto = Function.prototype;

    // Create quick reference variables for speed access to core prototypes.
    var push = ArrayProto.push,
        slice = ArrayProto.slice,
        toString = ObjProto.toString,
        hasOwnProperty = ObjProto.hasOwnProperty;

    // All **ECMAScript 5** native function implementations that we hope to use
    // are declared here.
    var nativeIsArray = Array.isArray,
        nativeKeys = Object.keys,
        nativeBind = FuncProto.bind,
        nativeCreate = Object.create;

    // Naked function reference for surrogate-prototype-swapping.
    var Ctor = function Ctor() {};

    // Create a safe reference to the Underscore object for use below.
    var _ = function _(obj) {
        if (obj instanceof _) return obj;
        if (!(this instanceof _)) return new _(obj);
        this._wrapped = obj;
    };

    // Export the Underscore object for **Node.js**, with
    // backwards-compatibility for the old `require()` API. If we're in
    // the browser, add `_` as a global object.
    if (typeof exports !== 'undefined') {
        if (typeof module !== 'undefined' && module.exports) {
            exports = module.exports = _;
        }
        exports._ = _;
    } else {
        root._ = _;
    }

    // Current version.
    _.VERSION = '1.8.3';

    // Internal function that returns an efficient (for current engines) version
    // of the passed-in callback, to be repeatedly applied in other Underscore
    // functions.
    var optimizeCb = function optimizeCb(func, context, argCount) {
        if (context === void 0) return func;
        switch (argCount == null ? 3 : argCount) {
            case 1:
                return function (value) {
                    return func.call(context, value);
                };
            case 2:
                return function (value, other) {
                    return func.call(context, value, other);
                };
            case 3:
                return function (value, index, collection) {
                    return func.call(context, value, index, collection);
                };
            case 4:
                return function (accumulator, value, index, collection) {
                    return func.call(context, accumulator, value, index, collection);
                };
        }
        return function () {
            return func.apply(context, arguments);
        };
    };

    // A mostly-internal function to generate callbacks that can be applied
    // to each element in a collection, returning the desired result — either
    // identity, an arbitrary callback, a property matcher, or a property accessor.
    var cb = function cb(value, context, argCount) {
        if (value == null) return _.identity;
        if (_.isFunction(value)) return optimizeCb(value, context, argCount);
        if (_.isObject(value)) return _.matcher(value);
        return _.property(value);
    };
    _.iteratee = function (value, context) {
        return cb(value, context, Infinity);
    };

    // An internal function for creating assigner functions.
    var createAssigner = function createAssigner(keysFunc, undefinedOnly) {
        return function (obj) {
            var length = arguments.length;
            if (length < 2 || obj == null) return obj;
            for (var index = 1; index < length; index++) {
                var source = arguments[index],
                    keys = keysFunc(source),
                    l = keys.length;
                for (var i = 0; i < l; i++) {
                    var key = keys[i];
                    if (!undefinedOnly || obj[key] === void 0) obj[key] = source[key];
                }
            }
            return obj;
        };
    };

    // An internal function for creating a new object that inherits from another.
    var baseCreate = function baseCreate(prototype) {
        if (!_.isObject(prototype)) return {};
        if (nativeCreate) return nativeCreate(prototype);
        Ctor.prototype = prototype;
        var result = new Ctor();
        Ctor.prototype = null;
        return result;
    };

    var property = function property(key) {
        return function (obj) {
            return obj == null ? void 0 : obj[key];
        };
    };

    // Helper for collection methods to determine whether a collection
    // should be iterated as an array or as an object
    // Related: http://people.mozilla.org/~jorendorff/es6-draft.html#sec-tolength
    // Avoids a very nasty iOS 8 JIT bug on ARM-64. #2094
    var MAX_ARRAY_INDEX = Math.pow(2, 53) - 1;
    var getLength = property('length');
    var isArrayLike = function isArrayLike(collection) {
        var length = getLength(collection);
        return typeof length == 'number' && length >= 0 && length <= MAX_ARRAY_INDEX;
    };

    // Collection Functions
    // --------------------

    // The cornerstone, an `each` implementation, aka `forEach`.
    // Handles raw objects in addition to array-likes. Treats all
    // sparse array-likes as if they were dense.
    _.each = _.forEach = function (obj, iteratee, context) {
        iteratee = optimizeCb(iteratee, context);
        var i, length;
        if (isArrayLike(obj)) {
            for (i = 0, length = obj.length; i < length; i++) {
                iteratee(obj[i], i, obj);
            }
        } else {
            var keys = _.keys(obj);
            for (i = 0, length = keys.length; i < length; i++) {
                iteratee(obj[keys[i]], keys[i], obj);
            }
        }
        return obj;
    };

    // Return the results of applying the iteratee to each element.
    _.map = _.collect = function (obj, iteratee, context) {
        iteratee = cb(iteratee, context);
        var keys = !isArrayLike(obj) && _.keys(obj),
            length = (keys || obj).length,
            results = Array(length);
        for (var index = 0; index < length; index++) {
            var currentKey = keys ? keys[index] : index;
            results[index] = iteratee(obj[currentKey], currentKey, obj);
        }
        return results;
    };

    // Create a reducing function iterating left or right.
    function createReduce(dir) {
        // Optimized iterator function as using arguments.length
        // in the main function will deoptimize the, see #1991.
        function iterator(obj, iteratee, memo, keys, index, length) {
            for (; index >= 0 && index < length; index += dir) {
                var currentKey = keys ? keys[index] : index;
                memo = iteratee(memo, obj[currentKey], currentKey, obj);
            }
            return memo;
        }

        return function (obj, iteratee, memo, context) {
            iteratee = optimizeCb(iteratee, context, 4);
            var keys = !isArrayLike(obj) && _.keys(obj),
                length = (keys || obj).length,
                index = dir > 0 ? 0 : length - 1;
            // Determine the initial value if none is provided.
            if (arguments.length < 3) {
                memo = obj[keys ? keys[index] : index];
                index += dir;
            }
            return iterator(obj, iteratee, memo, keys, index, length);
        };
    }

    // **Reduce** builds up a single result from a list of values, aka `inject`,
    // or `foldl`.
    _.reduce = _.foldl = _.inject = createReduce(1);

    // The right-associative version of reduce, also known as `foldr`.
    _.reduceRight = _.foldr = createReduce(-1);

    // Return the first value which passes a truth test. Aliased as `detect`.
    _.find = _.detect = function (obj, predicate, context) {
        var key;
        if (isArrayLike(obj)) {
            key = _.findIndex(obj, predicate, context);
        } else {
            key = _.findKey(obj, predicate, context);
        }
        if (key !== void 0 && key !== -1) return obj[key];
    };

    // Return all the elements that pass a truth test.
    // Aliased as `select`.
    _.filter = _.select = function (obj, predicate, context) {
        var results = [];
        predicate = cb(predicate, context);
        _.each(obj, function (value, index, list) {
            if (predicate(value, index, list)) results.push(value);
        });
        return results;
    };

    // Return all the elements for which a truth test fails.
    _.reject = function (obj, predicate, context) {
        return _.filter(obj, _.negate(cb(predicate)), context);
    };

    // Determine whether all of the elements match a truth test.
    // Aliased as `all`.
    _.every = _.all = function (obj, predicate, context) {
        predicate = cb(predicate, context);
        var keys = !isArrayLike(obj) && _.keys(obj),
            length = (keys || obj).length;
        for (var index = 0; index < length; index++) {
            var currentKey = keys ? keys[index] : index;
            if (!predicate(obj[currentKey], currentKey, obj)) return false;
        }
        return true;
    };

    // Determine if at least one element in the object matches a truth test.
    // Aliased as `any`.
    _.some = _.any = function (obj, predicate, context) {
        predicate = cb(predicate, context);
        var keys = !isArrayLike(obj) && _.keys(obj),
            length = (keys || obj).length;
        for (var index = 0; index < length; index++) {
            var currentKey = keys ? keys[index] : index;
            if (predicate(obj[currentKey], currentKey, obj)) return true;
        }
        return false;
    };

    // Determine if the array or object contains a given item (using `===`).
    // Aliased as `includes` and `include`.
    _.contains = _.includes = _.include = function (obj, item, fromIndex, guard) {
        if (!isArrayLike(obj)) obj = _.values(obj);
        if (typeof fromIndex != 'number' || guard) fromIndex = 0;
        return _.indexOf(obj, item, fromIndex) >= 0;
    };

    // Invoke a method (with arguments) on every item in a collection.
    _.invoke = function (obj, method) {
        var args = slice.call(arguments, 2);
        var isFunc = _.isFunction(method);
        return _.map(obj, function (value) {
            var func = isFunc ? method : value[method];
            return func == null ? func : func.apply(value, args);
        });
    };

    // Convenience version of a common use case of `map`: fetching a property.
    _.pluck = function (obj, key) {
        return _.map(obj, _.property(key));
    };

    // Convenience version of a common use case of `filter`: selecting only objects
    // containing specific `key:value` pairs.
    _.where = function (obj, attrs) {
        return _.filter(obj, _.matcher(attrs));
    };

    // Convenience version of a common use case of `find`: getting the first object
    // containing specific `key:value` pairs.
    _.findWhere = function (obj, attrs) {
        return _.find(obj, _.matcher(attrs));
    };

    // Return the maximum element (or element-based computation).
    _.max = function (obj, iteratee, context) {
        var result = -Infinity,
            lastComputed = -Infinity,
            value,
            computed;
        if (iteratee == null && obj != null) {
            obj = isArrayLike(obj) ? obj : _.values(obj);
            for (var i = 0, length = obj.length; i < length; i++) {
                value = obj[i];
                if (value > result) {
                    result = value;
                }
            }
        } else {
            iteratee = cb(iteratee, context);
            _.each(obj, function (value, index, list) {
                computed = iteratee(value, index, list);
                if (computed > lastComputed || computed === -Infinity && result === -Infinity) {
                    result = value;
                    lastComputed = computed;
                }
            });
        }
        return result;
    };

    // Return the minimum element (or element-based computation).
    _.min = function (obj, iteratee, context) {
        var result = Infinity,
            lastComputed = Infinity,
            value,
            computed;
        if (iteratee == null && obj != null) {
            obj = isArrayLike(obj) ? obj : _.values(obj);
            for (var i = 0, length = obj.length; i < length; i++) {
                value = obj[i];
                if (value < result) {
                    result = value;
                }
            }
        } else {
            iteratee = cb(iteratee, context);
            _.each(obj, function (value, index, list) {
                computed = iteratee(value, index, list);
                if (computed < lastComputed || computed === Infinity && result === Infinity) {
                    result = value;
                    lastComputed = computed;
                }
            });
        }
        return result;
    };

    // Shuffle a collection, using the modern version of the
    // [Fisher-Yates shuffle](http://en.wikipedia.org/wiki/Fisher–Yates_shuffle).
    _.shuffle = function (obj) {
        var set = isArrayLike(obj) ? obj : _.values(obj);
        var length = set.length;
        var shuffled = Array(length);
        for (var index = 0, rand; index < length; index++) {
            rand = _.random(0, index);
            if (rand !== index) shuffled[index] = shuffled[rand];
            shuffled[rand] = set[index];
        }
        return shuffled;
    };

    // Sample **n** random values from a collection.
    // If **n** is not specified, returns a single random element.
    // The internal `guard` argument allows it to work with `map`.
    _.sample = function (obj, n, guard) {
        if (n == null || guard) {
            if (!isArrayLike(obj)) obj = _.values(obj);
            return obj[_.random(obj.length - 1)];
        }
        return _.shuffle(obj).slice(0, Math.max(0, n));
    };

    // Sort the object's values by a criterion produced by an iteratee.
    _.sortBy = function (obj, iteratee, context) {
        iteratee = cb(iteratee, context);
        return _.pluck(_.map(obj, function (value, index, list) {
            return {
                value: value,
                index: index,
                criteria: iteratee(value, index, list)
            };
        }).sort(function (left, right) {
            var a = left.criteria;
            var b = right.criteria;
            if (a !== b) {
                if (a > b || a === void 0) return 1;
                if (a < b || b === void 0) return -1;
            }
            return left.index - right.index;
        }), 'value');
    };

    // An internal function used for aggregate "group by" operations.
    var group = function group(behavior) {
        return function (obj, iteratee, context) {
            var result = {};
            iteratee = cb(iteratee, context);
            _.each(obj, function (value, index) {
                var key = iteratee(value, index, obj);
                behavior(result, value, key);
            });
            return result;
        };
    };

    // Groups the object's values by a criterion. Pass either a string attribute
    // to group by, or a function that returns the criterion.
    _.groupBy = group(function (result, value, key) {
        if (_.has(result, key)) result[key].push(value);else result[key] = [value];
    });

    // Indexes the object's values by a criterion, similar to `groupBy`, but for
    // when you know that your index values will be unique.
    _.indexBy = group(function (result, value, key) {
        result[key] = value;
    });

    // Counts instances of an object that group by a certain criterion. Pass
    // either a string attribute to count by, or a function that returns the
    // criterion.
    _.countBy = group(function (result, value, key) {
        if (_.has(result, key)) result[key]++;else result[key] = 1;
    });

    // Safely create a real, live array from anything iterable.
    _.toArray = function (obj) {
        if (!obj) return [];
        if (_.isArray(obj)) return slice.call(obj);
        if (isArrayLike(obj)) return _.map(obj, _.identity);
        return _.values(obj);
    };

    // Return the number of elements in an object.
    _.size = function (obj) {
        if (obj == null) return 0;
        return isArrayLike(obj) ? obj.length : _.keys(obj).length;
    };

    // Split a collection into two arrays: one whose elements all satisfy the given
    // predicate, and one whose elements all do not satisfy the predicate.
    _.partition = function (obj, predicate, context) {
        predicate = cb(predicate, context);
        var pass = [],
            fail = [];
        _.each(obj, function (value, key, obj) {
            (predicate(value, key, obj) ? pass : fail).push(value);
        });
        return [pass, fail];
    };

    // Array Functions
    // ---------------

    // Get the first element of an array. Passing **n** will return the first N
    // values in the array. Aliased as `head` and `take`. The **guard** check
    // allows it to work with `_.map`.
    _.first = _.head = _.take = function (array, n, guard) {
        if (array == null) return void 0;
        if (n == null || guard) return array[0];
        return _.initial(array, array.length - n);
    };

    // Returns everything but the last entry of the array. Especially useful on
    // the arguments object. Passing **n** will return all the values in
    // the array, excluding the last N.
    _.initial = function (array, n, guard) {
        return slice.call(array, 0, Math.max(0, array.length - (n == null || guard ? 1 : n)));
    };

    // Get the last element of an array. Passing **n** will return the last N
    // values in the array.
    _.last = function (array, n, guard) {
        if (array == null) return void 0;
        if (n == null || guard) return array[array.length - 1];
        return _.rest(array, Math.max(0, array.length - n));
    };

    // Returns everything but the first entry of the array. Aliased as `tail` and `drop`.
    // Especially useful on the arguments object. Passing an **n** will return
    // the rest N values in the array.
    _.rest = _.tail = _.drop = function (array, n, guard) {
        return slice.call(array, n == null || guard ? 1 : n);
    };

    // Trim out all falsy values from an array.
    _.compact = function (array) {
        return _.filter(array, _.identity);
    };

    // Internal implementation of a recursive `flatten` function.
    var flatten = function flatten(input, shallow, strict, startIndex) {
        var output = [],
            idx = 0;
        for (var i = startIndex || 0, length = getLength(input); i < length; i++) {
            var value = input[i];
            if (isArrayLike(value) && (_.isArray(value) || _.isArguments(value))) {
                //flatten current level of array or arguments object
                if (!shallow) value = flatten(value, shallow, strict);
                var j = 0,
                    len = value.length;
                output.length += len;
                while (j < len) {
                    output[idx++] = value[j++];
                }
            } else if (!strict) {
                output[idx++] = value;
            }
        }
        return output;
    };

    // Flatten out an array, either recursively (by default), or just one level.
    _.flatten = function (array, shallow) {
        return flatten(array, shallow, false);
    };

    // Return a version of the array that does not contain the specified value(s).
    _.without = function (array) {
        return _.difference(array, slice.call(arguments, 1));
    };

    // Produce a duplicate-free version of the array. If the array has already
    // been sorted, you have the option of using a faster algorithm.
    // Aliased as `unique`.
    _.uniq = _.unique = function (array, isSorted, iteratee, context) {
        if (!_.isBoolean(isSorted)) {
            context = iteratee;
            iteratee = isSorted;
            isSorted = false;
        }
        if (iteratee != null) iteratee = cb(iteratee, context);
        var result = [];
        var seen = [];
        for (var i = 0, length = getLength(array); i < length; i++) {
            var value = array[i],
                computed = iteratee ? iteratee(value, i, array) : value;
            if (isSorted) {
                if (!i || seen !== computed) result.push(value);
                seen = computed;
            } else if (iteratee) {
                if (!_.contains(seen, computed)) {
                    seen.push(computed);
                    result.push(value);
                }
            } else if (!_.contains(result, value)) {
                result.push(value);
            }
        }
        return result;
    };

    // Produce an array that contains the union: each distinct element from all of
    // the passed-in arrays.
    _.union = function () {
        return _.uniq(flatten(arguments, true, true));
    };

    // Produce an array that contains every item shared between all the
    // passed-in arrays.
    _.intersection = function (array) {
        var result = [];
        var argsLength = arguments.length;
        for (var i = 0, length = getLength(array); i < length; i++) {
            var item = array[i];
            if (_.contains(result, item)) continue;
            for (var j = 1; j < argsLength; j++) {
                if (!_.contains(arguments[j], item)) break;
            }
            if (j === argsLength) result.push(item);
        }
        return result;
    };

    // Take the difference between one array and a number of other arrays.
    // Only the elements present in just the first array will remain.
    _.difference = function (array) {
        var rest = flatten(arguments, true, true, 1);
        return _.filter(array, function (value) {
            return !_.contains(rest, value);
        });
    };

    // Zip together multiple lists into a single array -- elements that share
    // an index go together.
    _.zip = function () {
        return _.unzip(arguments);
    };

    // Complement of _.zip. Unzip accepts an array of arrays and groups
    // each array's elements on shared indices
    _.unzip = function (array) {
        var length = array && _.max(array, getLength).length || 0;
        var result = Array(length);

        for (var index = 0; index < length; index++) {
            result[index] = _.pluck(array, index);
        }
        return result;
    };

    // Converts lists into objects. Pass either a single array of `[key, value]`
    // pairs, or two parallel arrays of the same length -- one of keys, and one of
    // the corresponding values.
    _.object = function (list, values) {
        var result = {};
        for (var i = 0, length = getLength(list); i < length; i++) {
            if (values) {
                result[list[i]] = values[i];
            } else {
                result[list[i][0]] = list[i][1];
            }
        }
        return result;
    };

    // Generator function to create the findIndex and findLastIndex functions
    function createPredicateIndexFinder(dir) {
        return function (array, predicate, context) {
            predicate = cb(predicate, context);
            var length = getLength(array);
            var index = dir > 0 ? 0 : length - 1;
            for (; index >= 0 && index < length; index += dir) {
                if (predicate(array[index], index, array)) return index;
            }
            return -1;
        };
    }

    // Returns the first index on an array-like that passes a predicate test
    _.findIndex = createPredicateIndexFinder(1);
    _.findLastIndex = createPredicateIndexFinder(-1);

    // Use a comparator function to figure out the smallest index at which
    // an object should be inserted so as to maintain order. Uses binary search.
    _.sortedIndex = function (array, obj, iteratee, context) {
        iteratee = cb(iteratee, context, 1);
        var value = iteratee(obj);
        var low = 0,
            high = getLength(array);
        while (low < high) {
            var mid = Math.floor((low + high) / 2);
            if (iteratee(array[mid]) < value) low = mid + 1;else high = mid;
        }
        return low;
    };

    // Generator function to create the indexOf and lastIndexOf functions
    function createIndexFinder(dir, predicateFind, sortedIndex) {
        return function (array, item, idx) {
            var i = 0,
                length = getLength(array);
            if (typeof idx == 'number') {
                if (dir > 0) {
                    i = idx >= 0 ? idx : Math.max(idx + length, i);
                } else {
                    length = idx >= 0 ? Math.min(idx + 1, length) : idx + length + 1;
                }
            } else if (sortedIndex && idx && length) {
                idx = sortedIndex(array, item);
                return array[idx] === item ? idx : -1;
            }
            if (item !== item) {
                idx = predicateFind(slice.call(array, i, length), _.isNaN);
                return idx >= 0 ? idx + i : -1;
            }
            for (idx = dir > 0 ? i : length - 1; idx >= 0 && idx < length; idx += dir) {
                if (array[idx] === item) return idx;
            }
            return -1;
        };
    }

    // Return the position of the first occurrence of an item in an array,
    // or -1 if the item is not included in the array.
    // If the array is large and already in sort order, pass `true`
    // for **isSorted** to use binary search.
    _.indexOf = createIndexFinder(1, _.findIndex, _.sortedIndex);
    _.lastIndexOf = createIndexFinder(-1, _.findLastIndex);

    // Generate an integer Array containing an arithmetic progression. A port of
    // the native Python `range()` function. See
    // [the Python documentation](http://docs.python.org/library/functions.html#range).
    _.range = function (start, stop, step) {
        if (stop == null) {
            stop = start || 0;
            start = 0;
        }
        step = step || 1;

        var length = Math.max(Math.ceil((stop - start) / step), 0);
        var range = Array(length);

        for (var idx = 0; idx < length; idx++, start += step) {
            range[idx] = start;
        }

        return range;
    };

    // Function (ahem) Functions
    // ------------------

    // Determines whether to execute a function as a constructor
    // or a normal function with the provided arguments
    var executeBound = function executeBound(sourceFunc, boundFunc, context, callingContext, args) {
        if (!(callingContext instanceof boundFunc)) return sourceFunc.apply(context, args);
        var self = baseCreate(sourceFunc.prototype);
        var result = sourceFunc.apply(self, args);
        if (_.isObject(result)) return result;
        return self;
    };

    // Create a function bound to a given object (assigning `this`, and arguments,
    // optionally). Delegates to **ECMAScript 5**'s native `Function.bind` if
    // available.
    _.bind = function (func, context) {
        if (nativeBind && func.bind === nativeBind) return nativeBind.apply(func, slice.call(arguments, 1));
        if (!_.isFunction(func)) throw new TypeError('Bind must be called on a function');
        var args = slice.call(arguments, 2);
        var bound = function bound() {
            return executeBound(func, bound, context, this, args.concat(slice.call(arguments)));
        };
        return bound;
    };

    // Partially apply a function by creating a version that has had some of its
    // arguments pre-filled, without changing its dynamic `this` context. _ acts
    // as a placeholder, allowing any combination of arguments to be pre-filled.
    _.partial = function (func) {
        var boundArgs = slice.call(arguments, 1);
        var bound = function bound() {
            var position = 0,
                length = boundArgs.length;
            var args = Array(length);
            for (var i = 0; i < length; i++) {
                args[i] = boundArgs[i] === _ ? arguments[position++] : boundArgs[i];
            }
            while (position < arguments.length) {
                args.push(arguments[position++]);
            }return executeBound(func, bound, this, this, args);
        };
        return bound;
    };

    // Bind a number of an object's methods to that object. Remaining arguments
    // are the method names to be bound. Useful for ensuring that all callbacks
    // defined on an object belong to it.
    _.bindAll = function (obj) {
        var i,
            length = arguments.length,
            key;
        if (length <= 1) throw new Error('bindAll must be passed function names');
        for (i = 1; i < length; i++) {
            key = arguments[i];
            obj[key] = _.bind(obj[key], obj);
        }
        return obj;
    };

    // Memoize an expensive function by storing its results.
    _.memoize = function (func, hasher) {
        var memoize = function memoize(key) {
            var cache = memoize.cache;
            var address = '' + (hasher ? hasher.apply(this, arguments) : key);
            if (!_.has(cache, address)) cache[address] = func.apply(this, arguments);
            return cache[address];
        };
        memoize.cache = {};
        return memoize;
    };

    // Delays a function for the given number of milliseconds, and then calls
    // it with the arguments supplied.
    _.delay = function (func, wait) {
        var args = slice.call(arguments, 2);
        return setTimeout(function () {
            return func.apply(null, args);
        }, wait);
    };

    // Defers a function, scheduling it to run after the current call stack has
    // cleared.
    _.defer = _.partial(_.delay, _, 1);

    // Returns a function, that, when invoked, will only be triggered at most once
    // during a given window of time. Normally, the throttled function will run
    // as much as it can, without ever going more than once per `wait` duration;
    // but if you'd like to disable the execution on the leading edge, pass
    // `{leading: false}`. To disable execution on the trailing edge, ditto.
    _.throttle = function (func, wait, options) {
        var context, args, result;
        var timeout = null;
        var previous = 0;
        if (!options) options = {};
        var later = function later() {
            previous = options.leading === false ? 0 : _.now();
            timeout = null;
            result = func.apply(context, args);
            if (!timeout) context = args = null;
        };
        return function () {
            var now = _.now();
            if (!previous && options.leading === false) previous = now;
            var remaining = wait - (now - previous);
            context = this;
            args = arguments;
            if (remaining <= 0 || remaining > wait) {
                if (timeout) {
                    clearTimeout(timeout);
                    timeout = null;
                }
                previous = now;
                result = func.apply(context, args);
                if (!timeout) context = args = null;
            } else if (!timeout && options.trailing !== false) {
                timeout = setTimeout(later, remaining);
            }
            return result;
        };
    };

    // Returns a function, that, as long as it continues to be invoked, will not
    // be triggered. The function will be called after it stops being called for
    // N milliseconds. If `immediate` is passed, trigger the function on the
    // leading edge, instead of the trailing.
    _.debounce = function (func, wait, immediate) {
        var timeout, args, context, timestamp, result;

        var later = function later() {
            var last = _.now() - timestamp;

            if (last < wait && last >= 0) {
                timeout = setTimeout(later, wait - last);
            } else {
                timeout = null;
                if (!immediate) {
                    result = func.apply(context, args);
                    if (!timeout) context = args = null;
                }
            }
        };

        return function () {
            context = this;
            args = arguments;
            timestamp = _.now();
            var callNow = immediate && !timeout;
            if (!timeout) timeout = setTimeout(later, wait);
            if (callNow) {
                result = func.apply(context, args);
                context = args = null;
            }

            return result;
        };
    };

    // Returns the first function passed as an argument to the second,
    // allowing you to adjust arguments, run code before and after, and
    // conditionally execute the original function.
    _.wrap = function (func, wrapper) {
        return _.partial(wrapper, func);
    };

    // Returns a negated version of the passed-in predicate.
    _.negate = function (predicate) {
        return function () {
            return !predicate.apply(this, arguments);
        };
    };

    // Returns a function that is the composition of a list of functions, each
    // consuming the return value of the function that follows.
    _.compose = function () {
        var args = arguments;
        var start = args.length - 1;
        return function () {
            var i = start;
            var result = args[start].apply(this, arguments);
            while (i--) {
                result = args[i].call(this, result);
            }return result;
        };
    };

    // Returns a function that will only be executed on and after the Nth call.
    _.after = function (times, func) {
        return function () {
            if (--times < 1) {
                return func.apply(this, arguments);
            }
        };
    };

    // Returns a function that will only be executed up to (but not including) the Nth call.
    _.before = function (times, func) {
        var memo;
        return function () {
            if (--times > 0) {
                memo = func.apply(this, arguments);
            }
            if (times <= 1) func = null;
            return memo;
        };
    };

    // Returns a function that will be executed at most one time, no matter how
    // often you call it. Useful for lazy initialization.
    _.once = _.partial(_.before, 2);

    // Object Functions
    // ----------------

    // Keys in IE < 9 that won't be iterated by `for key in ...` and thus missed.
    var hasEnumBug = !{ toString: null }.propertyIsEnumerable('toString');
    var nonEnumerableProps = ['valueOf', 'isPrototypeOf', 'toString', 'propertyIsEnumerable', 'hasOwnProperty', 'toLocaleString'];

    function collectNonEnumProps(obj, keys) {
        var nonEnumIdx = nonEnumerableProps.length;
        var constructor = obj.constructor;
        var proto = _.isFunction(constructor) && constructor.prototype || ObjProto;

        // Constructor is a special case.
        var prop = 'constructor';
        if (_.has(obj, prop) && !_.contains(keys, prop)) keys.push(prop);

        while (nonEnumIdx--) {
            prop = nonEnumerableProps[nonEnumIdx];
            if (prop in obj && obj[prop] !== proto[prop] && !_.contains(keys, prop)) {
                keys.push(prop);
            }
        }
    }

    // Retrieve the names of an object's own properties.
    // Delegates to **ECMAScript 5**'s native `Object.keys`
    _.keys = function (obj) {
        if (!_.isObject(obj)) return [];
        if (nativeKeys) return nativeKeys(obj);
        var keys = [];
        for (var key in obj) {
            if (_.has(obj, key)) keys.push(key);
        } // Ahem, IE < 9.
        if (hasEnumBug) collectNonEnumProps(obj, keys);
        return keys;
    };

    // Retrieve all the property names of an object.
    _.allKeys = function (obj) {
        if (!_.isObject(obj)) return [];
        var keys = [];
        for (var key in obj) {
            keys.push(key);
        } // Ahem, IE < 9.
        if (hasEnumBug) collectNonEnumProps(obj, keys);
        return keys;
    };

    // Retrieve the values of an object's properties.
    _.values = function (obj) {
        var keys = _.keys(obj);
        var length = keys.length;
        var values = Array(length);
        for (var i = 0; i < length; i++) {
            values[i] = obj[keys[i]];
        }
        return values;
    };

    // Returns the results of applying the iteratee to each element of the object
    // In contrast to _.map it returns an object
    _.mapObject = function (obj, iteratee, context) {
        iteratee = cb(iteratee, context);
        var keys = _.keys(obj),
            length = keys.length,
            results = {},
            currentKey;
        for (var index = 0; index < length; index++) {
            currentKey = keys[index];
            results[currentKey] = iteratee(obj[currentKey], currentKey, obj);
        }
        return results;
    };

    // Convert an object into a list of `[key, value]` pairs.
    _.pairs = function (obj) {
        var keys = _.keys(obj);
        var length = keys.length;
        var pairs = Array(length);
        for (var i = 0; i < length; i++) {
            pairs[i] = [keys[i], obj[keys[i]]];
        }
        return pairs;
    };

    // Invert the keys and values of an object. The values must be serializable.
    _.invert = function (obj) {
        var result = {};
        var keys = _.keys(obj);
        for (var i = 0, length = keys.length; i < length; i++) {
            result[obj[keys[i]]] = keys[i];
        }
        return result;
    };

    // Return a sorted list of the function names available on the object.
    // Aliased as `methods`
    _.functions = _.methods = function (obj) {
        var names = [];
        for (var key in obj) {
            if (_.isFunction(obj[key])) names.push(key);
        }
        return names.sort();
    };

    // Extend a given object with all the properties in passed-in object(s).
    _.extend = createAssigner(_.allKeys);

    // Assigns a given object with all the own properties in the passed-in object(s)
    // (https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object/assign)
    _.extendOwn = _.assign = createAssigner(_.keys);

    // Returns the first key on an object that passes a predicate test
    _.findKey = function (obj, predicate, context) {
        predicate = cb(predicate, context);
        var keys = _.keys(obj),
            key;
        for (var i = 0, length = keys.length; i < length; i++) {
            key = keys[i];
            if (predicate(obj[key], key, obj)) return key;
        }
    };

    // Return a copy of the object only containing the whitelisted properties.
    _.pick = function (object, oiteratee, context) {
        var result = {},
            obj = object,
            iteratee,
            keys;
        if (obj == null) return result;
        if (_.isFunction(oiteratee)) {
            keys = _.allKeys(obj);
            iteratee = optimizeCb(oiteratee, context);
        } else {
            keys = flatten(arguments, false, false, 1);
            iteratee = function iteratee(value, key, obj) {
                return key in obj;
            };
            obj = Object(obj);
        }
        for (var i = 0, length = keys.length; i < length; i++) {
            var key = keys[i];
            var value = obj[key];
            if (iteratee(value, key, obj)) result[key] = value;
        }
        return result;
    };

    // Return a copy of the object without the blacklisted properties.
    _.omit = function (obj, iteratee, context) {
        if (_.isFunction(iteratee)) {
            iteratee = _.negate(iteratee);
        } else {
            var keys = _.map(flatten(arguments, false, false, 1), String);
            iteratee = function iteratee(value, key) {
                return !_.contains(keys, key);
            };
        }
        return _.pick(obj, iteratee, context);
    };

    // Fill in a given object with default properties.
    _.defaults = createAssigner(_.allKeys, true);

    // Creates an object that inherits from the given prototype object.
    // If additional properties are provided then they will be added to the
    // created object.
    _.create = function (prototype, props) {
        var result = baseCreate(prototype);
        if (props) _.extendOwn(result, props);
        return result;
    };

    // Create a (shallow-cloned) duplicate of an object.
    _.clone = function (obj) {
        if (!_.isObject(obj)) return obj;
        return _.isArray(obj) ? obj.slice() : _.extend({}, obj);
    };

    // Invokes interceptor with the obj, and then returns obj.
    // The primary purpose of this method is to "tap into" a method chain, in
    // order to perform operations on intermediate results within the chain.
    _.tap = function (obj, interceptor) {
        interceptor(obj);
        return obj;
    };

    // Returns whether an object has a given set of `key:value` pairs.
    _.isMatch = function (object, attrs) {
        var keys = _.keys(attrs),
            length = keys.length;
        if (object == null) return !length;
        var obj = Object(object);
        for (var i = 0; i < length; i++) {
            var key = keys[i];
            if (attrs[key] !== obj[key] || !(key in obj)) return false;
        }
        return true;
    };

    // Internal recursive comparison function for `isEqual`.
    var eq = function eq(a, b, aStack, bStack) {
        // Identical objects are equal. `0 === -0`, but they aren't identical.
        // See the [Harmony `egal` proposal](http://wiki.ecmascript.org/doku.php?id=harmony:egal).
        if (a === b) return a !== 0 || 1 / a === 1 / b;
        // A strict comparison is necessary because `null == undefined`.
        if (a == null || b == null) return a === b;
        // Unwrap any wrapped objects.
        if (a instanceof _) a = a._wrapped;
        if (b instanceof _) b = b._wrapped;
        // Compare `[[Class]]` names.
        var className = toString.call(a);
        if (className !== toString.call(b)) return false;
        switch (className) {
            // Strings, numbers, regular expressions, dates, and booleans are compared by value.
            case '[object RegExp]':
            // RegExps are coerced to strings for comparison (Note: '' + /a/i === '/a/i')
            case '[object String]':
                // Primitives and their corresponding object wrappers are equivalent; thus, `"5"` is
                // equivalent to `new String("5")`.
                return '' + a === '' + b;
            case '[object Number]':
                // `NaN`s are equivalent, but non-reflexive.
                // Object(NaN) is equivalent to NaN
                if (+a !== +a) return +b !== +b;
                // An `egal` comparison is performed for other numeric values.
                return +a === 0 ? 1 / +a === 1 / b : +a === +b;
            case '[object Date]':
            case '[object Boolean]':
                // Coerce dates and booleans to numeric primitive values. Dates are compared by their
                // millisecond representations. Note that invalid dates with millisecond representations
                // of `NaN` are not equivalent.
                return +a === +b;
        }

        var areArrays = className === '[object Array]';
        if (!areArrays) {
            if ((typeof a === 'undefined' ? 'undefined' : _typeof(a)) != 'object' || (typeof b === 'undefined' ? 'undefined' : _typeof(b)) != 'object') return false;

            // Objects with different constructors are not equivalent, but `Object`s or `Array`s
            // from different frames are.
            var aCtor = a.constructor,
                bCtor = b.constructor;
            if (aCtor !== bCtor && !(_.isFunction(aCtor) && aCtor instanceof aCtor && _.isFunction(bCtor) && bCtor instanceof bCtor) && 'constructor' in a && 'constructor' in b) {
                return false;
            }
        }
        // Assume equality for cyclic structures. The algorithm for detecting cyclic
        // structures is adapted from ES 5.1 section 15.12.3, abstract operation `JO`.

        // Initializing stack of traversed objects.
        // It's done here since we only need them for objects and arrays comparison.
        aStack = aStack || [];
        bStack = bStack || [];
        var length = aStack.length;
        while (length--) {
            // Linear search. Performance is inversely proportional to the number of
            // unique nested structures.
            if (aStack[length] === a) return bStack[length] === b;
        }

        // Add the first object to the stack of traversed objects.
        aStack.push(a);
        bStack.push(b);

        // Recursively compare objects and arrays.
        if (areArrays) {
            // Compare array lengths to determine if a deep comparison is necessary.
            length = a.length;
            if (length !== b.length) return false;
            // Deep compare the contents, ignoring non-numeric properties.
            while (length--) {
                if (!eq(a[length], b[length], aStack, bStack)) return false;
            }
        } else {
            // Deep compare objects.
            var keys = _.keys(a),
                key;
            length = keys.length;
            // Ensure that both objects contain the same number of properties before comparing deep equality.
            if (_.keys(b).length !== length) return false;
            while (length--) {
                // Deep compare each member
                key = keys[length];
                if (!(_.has(b, key) && eq(a[key], b[key], aStack, bStack))) return false;
            }
        }
        // Remove the first object from the stack of traversed objects.
        aStack.pop();
        bStack.pop();
        return true;
    };

    // Perform a deep comparison to check if two objects are equal.
    _.isEqual = function (a, b) {
        return eq(a, b);
    };

    // Is a given array, string, or object empty?
    // An "empty" object has no enumerable own-properties.
    _.isEmpty = function (obj) {
        if (obj == null) return true;
        if (isArrayLike(obj) && (_.isArray(obj) || _.isString(obj) || _.isArguments(obj))) return obj.length === 0;
        return _.keys(obj).length === 0;
    };

    // Is a given value a DOM element?
    _.isElement = function (obj) {
        return !!(obj && obj.nodeType === 1);
    };

    // Is a given value an array?
    // Delegates to ECMA5's native Array.isArray
    _.isArray = nativeIsArray || function (obj) {
        return toString.call(obj) === '[object Array]';
    };

    // Is a given variable an object?
    _.isObject = function (obj) {
        var type = typeof obj === 'undefined' ? 'undefined' : _typeof(obj);
        return type === 'function' || type === 'object' && !!obj;
    };

    // Add some isType methods: isArguments, isFunction, isString, isNumber, isDate, isRegExp, isError.
    _.each(['Arguments', 'Function', 'String', 'Number', 'Date', 'RegExp', 'Error'], function (name) {
        _['is' + name] = function (obj) {
            return toString.call(obj) === '[object ' + name + ']';
        };
    });

    // Define a fallback version of the method in browsers (ahem, IE < 9), where
    // there isn't any inspectable "Arguments" type.
    if (!_.isArguments(arguments)) {
        _.isArguments = function (obj) {
            return _.has(obj, 'callee');
        };
    }

    // Optimize `isFunction` if appropriate. Work around some typeof bugs in old v8,
    // IE 11 (#1621), and in Safari 8 (#1929).
    if (typeof /./ != 'function' && (typeof Int8Array === 'undefined' ? 'undefined' : _typeof(Int8Array)) != 'object') {
        _.isFunction = function (obj) {
            return typeof obj == 'function' || false;
        };
    }

    // Is a given object a finite number?
    _.isFinite = function (obj) {
        return isFinite(obj) && !isNaN(parseFloat(obj));
    };

    // Is the given value `NaN`? (NaN is the only number which does not equal itself).
    _.isNaN = function (obj) {
        return _.isNumber(obj) && obj !== +obj;
    };

    // Is a given value a boolean?
    _.isBoolean = function (obj) {
        return obj === true || obj === false || toString.call(obj) === '[object Boolean]';
    };

    // Is a given value equal to null?
    _.isNull = function (obj) {
        return obj === null;
    };

    // Is a given variable undefined?
    _.isUndefined = function (obj) {
        return obj === void 0;
    };

    // Shortcut function for checking if an object has a given property directly
    // on itself (in other words, not on a prototype).
    _.has = function (obj, key) {
        return obj != null && hasOwnProperty.call(obj, key);
    };

    // Utility Functions
    // -----------------

    // Run Underscore.js in *noConflict* mode, returning the `_` variable to its
    // previous owner. Returns a reference to the Underscore object.
    _.noConflict = function () {
        root._ = previousUnderscore;
        return this;
    };

    // Keep the identity function around for default iteratees.
    _.identity = function (value) {
        return value;
    };

    // Predicate-generating functions. Often useful outside of Underscore.
    _.constant = function (value) {
        return function () {
            return value;
        };
    };

    _.noop = function () {};

    _.property = property;

    // Generates a function for a given object that returns a given property.
    _.propertyOf = function (obj) {
        return obj == null ? function () {} : function (key) {
            return obj[key];
        };
    };

    // Returns a predicate for checking whether an object has a given set of
    // `key:value` pairs.
    _.matcher = _.matches = function (attrs) {
        attrs = _.extendOwn({}, attrs);
        return function (obj) {
            return _.isMatch(obj, attrs);
        };
    };

    // Run a function **n** times.
    _.times = function (n, iteratee, context) {
        var accum = Array(Math.max(0, n));
        iteratee = optimizeCb(iteratee, context, 1);
        for (var i = 0; i < n; i++) {
            accum[i] = iteratee(i);
        }return accum;
    };

    // Return a random integer between min and max (inclusive).
    _.random = function (min, max) {
        if (max == null) {
            max = min;
            min = 0;
        }
        return min + Math.floor(Math.random() * (max - min + 1));
    };

    // A (possibly faster) way to get the current timestamp as an integer.
    _.now = Date.now || function () {
        return new Date().getTime();
    };

    // List of HTML entities for escaping.
    var escapeMap = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#x27;',
        '`': '&#x60;'
    };
    var unescapeMap = _.invert(escapeMap);

    // Functions for escaping and unescaping strings to/from HTML interpolation.
    var createEscaper = function createEscaper(map) {
        var escaper = function escaper(match) {
            return map[match];
        };
        // Regexes for identifying a key that needs to be escaped
        var source = '(?:' + _.keys(map).join('|') + ')';
        var testRegexp = RegExp(source);
        var replaceRegexp = RegExp(source, 'g');
        return function (string) {
            string = string == null ? '' : '' + string;
            return testRegexp.test(string) ? string.replace(replaceRegexp, escaper) : string;
        };
    };
    _.escape = createEscaper(escapeMap);
    _.unescape = createEscaper(unescapeMap);

    // If the value of the named `property` is a function then invoke it with the
    // `object` as context; otherwise, return it.
    _.result = function (object, property, fallback) {
        var value = object == null ? void 0 : object[property];
        if (value === void 0) {
            value = fallback;
        }
        return _.isFunction(value) ? value.call(object) : value;
    };

    // Generate a unique integer id (unique within the entire client session).
    // Useful for temporary DOM ids.
    var idCounter = 0;
    _.uniqueId = function (prefix) {
        var id = ++idCounter + '';
        return prefix ? prefix + id : id;
    };

    // By default, Underscore uses ERB-style template delimiters, change the
    // following template settings to use alternative delimiters.
    _.templateSettings = {
        evaluate: /<%([\s\S]+?)%>/g,
        interpolate: /<%=([\s\S]+?)%>/g,
        escape: /<%-([\s\S]+?)%>/g
    };

    // When customizing `templateSettings`, if you don't want to define an
    // interpolation, evaluation or escaping regex, we need one that is
    // guaranteed not to match.
    var noMatch = /(.)^/;

    // Certain characters need to be escaped so that they can be put into a
    // string literal.
    var escapes = {
        "'": "'",
        '\\': '\\',
        '\r': 'r',
        '\n': 'n',
        '\u2028': 'u2028',
        '\u2029': 'u2029'
    };

    var escaper = /\\|'|\r|\n|\u2028|\u2029/g;

    var escapeChar = function escapeChar(match) {
        return '\\' + escapes[match];
    };

    // JavaScript micro-templating, similar to John Resig's implementation.
    // Underscore templating handles arbitrary delimiters, preserves whitespace,
    // and correctly escapes quotes within interpolated code.
    // NB: `oldSettings` only exists for backwards compatibility.
    _.template = function (text, settings, oldSettings) {
        if (!settings && oldSettings) settings = oldSettings;
        settings = _.defaults({}, settings, _.templateSettings);

        // Combine delimiters into one regular expression via alternation.
        var matcher = RegExp([(settings.escape || noMatch).source, (settings.interpolate || noMatch).source, (settings.evaluate || noMatch).source].join('|') + '|$', 'g');

        // Compile the template source, escaping string literals appropriately.
        var index = 0;
        var source = "__p+='";
        text.replace(matcher, function (match, escape, interpolate, evaluate, offset) {
            source += text.slice(index, offset).replace(escaper, escapeChar);
            index = offset + match.length;

            if (escape) {
                source += "'+\n((__t=(" + escape + "))==null?'':_.escape(__t))+\n'";
            } else if (interpolate) {
                source += "'+\n((__t=(" + interpolate + "))==null?'':__t)+\n'";
            } else if (evaluate) {
                source += "';\n" + evaluate + "\n__p+='";
            }

            // Adobe VMs need the match returned to produce the correct offest.
            return match;
        });
        source += "';\n";

        // If a variable is not specified, place data values in local scope.
        if (!settings.variable) source = 'with(obj||{}){\n' + source + '}\n';

        source = "var __t,__p='',__j=Array.prototype.join," + "print=function(){__p+=__j.call(arguments,'');};\n" + source + 'return __p;\n';

        try {
            var render = new Function(settings.variable || 'obj', '_', source);
        } catch (e) {
            e.source = source;
            throw e;
        }

        var template = function template(data) {
            return render.call(this, data, _);
        };

        // Provide the compiled source as a convenience for precompilation.
        var argument = settings.variable || 'obj';
        template.source = 'function(' + argument + '){\n' + source + '}';

        return template;
    };

    // Add a "chain" function. Start chaining a wrapped Underscore object.
    _.chain = function (obj) {
        var instance = _(obj);
        instance._chain = true;
        return instance;
    };

    // OOP
    // ---------------
    // If Underscore is called as a function, it returns a wrapped object that
    // can be used OO-style. This wrapper holds altered versions of all the
    // underscore functions. Wrapped objects may be chained.

    // Helper function to continue chaining intermediate results.
    var result = function result(instance, obj) {
        return instance._chain ? _(obj).chain() : obj;
    };

    // Add your own custom functions to the Underscore object.
    _.mixin = function (obj) {
        _.each(_.functions(obj), function (name) {
            var func = _[name] = obj[name];
            _.prototype[name] = function () {
                var args = [this._wrapped];
                push.apply(args, arguments);
                return result(this, func.apply(_, args));
            };
        });
    };

    // Add all of the Underscore functions to the wrapper object.
    _.mixin(_);

    // Add all mutator Array functions to the wrapper.
    _.each(['pop', 'push', 'reverse', 'shift', 'sort', 'splice', 'unshift'], function (name) {
        var method = ArrayProto[name];
        _.prototype[name] = function () {
            var obj = this._wrapped;
            method.apply(obj, arguments);
            if ((name === 'shift' || name === 'splice') && obj.length === 0) delete obj[0];
            return result(this, obj);
        };
    });

    // Add all accessor Array functions to the wrapper.
    _.each(['concat', 'join', 'slice'], function (name) {
        var method = ArrayProto[name];
        _.prototype[name] = function () {
            return result(this, method.apply(this._wrapped, arguments));
        };
    });

    // Extracts the result from a wrapped and chained object.
    _.prototype.value = function () {
        return this._wrapped;
    };

    // Provide unwrapping proxy for some methods used in engine operations
    // such as arithmetic and JSON stringification.
    _.prototype.valueOf = _.prototype.toJSON = _.prototype.value;

    _.prototype.toString = function () {
        return '' + this._wrapped;
    };

    // AMD registration happens at the end for compatibility with AMD loaders
    // that may not enforce next-turn semantics on modules. Even though general
    // practice for AMD registration is to be anonymous, underscore registers
    // as a named module because, like jQuery, it is a base library that is
    // popular enough to be bundled in a third party lib, but not be part of
    // an AMD load request. Those cases could generate an error when an
    // anonymous define() is called outside of a loader request.
    if (typeof define === 'function' && define.amd) {
        define('underscore', [], function () {
            return _;
        });
    }
}).call(undefined);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInVuZGVyc2NvcmUuanMiXSwibmFtZXMiOlsiQXJyYXlQcm90byIsIkFycmF5IiwicHJvdG90eXBlIiwiT2JqUHJvdG8iLCJPYmplY3QiLCJGdW5jUHJvdG8iLCJGdW5jdGlvbiIsInB1c2giLCJzbGljZSIsInRvU3RyaW5nIiwiaGFzT3duUHJvcGVydHkiLCJuYXRpdmVJc0FycmF5IiwiaXNBcnJheSIsIm5hdGl2ZUtleXMiLCJrZXlzIiwibmF0aXZlQmluZCIsImJpbmQiLCJuYXRpdmVDcmVhdGUiLCJjcmVhdGUiLCJDdG9yIiwiXyIsIm9iaiIsIl93cmFwcGVkIiwiZXhwb3J0cyIsIm1vZHVsZSIsInJvb3QiLCJWRVJTSU9OIiwib3B0aW1pemVDYiIsImZ1bmMiLCJjb250ZXh0IiwiYXJnQ291bnQiLCJ2YWx1ZSIsImNhbGwiLCJvdGhlciIsImluZGV4IiwiY29sbGVjdGlvbiIsImFjY3VtdWxhdG9yIiwiYXBwbHkiLCJhcmd1bWVudHMiLCJjYiIsImlkZW50aXR5IiwiaXNGdW5jdGlvbiIsImlzT2JqZWN0IiwibWF0Y2hlciIsInByb3BlcnR5IiwiaXRlcmF0ZWUiLCJJbmZpbml0eSIsImNyZWF0ZUFzc2lnbmVyIiwia2V5c0Z1bmMiLCJ1bmRlZmluZWRPbmx5IiwibGVuZ3RoIiwic291cmNlIiwibCIsImkiLCJrZXkiLCJiYXNlQ3JlYXRlIiwicmVzdWx0IiwiTUFYX0FSUkFZX0lOREVYIiwiTWF0aCIsInBvdyIsImdldExlbmd0aCIsImlzQXJyYXlMaWtlIiwiZWFjaCIsImZvckVhY2giLCJtYXAiLCJjb2xsZWN0IiwicmVzdWx0cyIsImN1cnJlbnRLZXkiLCJjcmVhdGVSZWR1Y2UiLCJkaXIiLCJpdGVyYXRvciIsIm1lbW8iLCJyZWR1Y2UiLCJmb2xkbCIsImluamVjdCIsInJlZHVjZVJpZ2h0IiwiZm9sZHIiLCJmaW5kIiwiZGV0ZWN0IiwicHJlZGljYXRlIiwiZmluZEluZGV4IiwiZmluZEtleSIsImZpbHRlciIsInNlbGVjdCIsImxpc3QiLCJyZWplY3QiLCJuZWdhdGUiLCJldmVyeSIsImFsbCIsInNvbWUiLCJhbnkiLCJjb250YWlucyIsImluY2x1ZGVzIiwiaW5jbHVkZSIsIml0ZW0iLCJmcm9tSW5kZXgiLCJndWFyZCIsInZhbHVlcyIsImluZGV4T2YiLCJpbnZva2UiLCJtZXRob2QiLCJhcmdzIiwiaXNGdW5jIiwicGx1Y2siLCJ3aGVyZSIsImF0dHJzIiwiZmluZFdoZXJlIiwibWF4IiwibGFzdENvbXB1dGVkIiwiY29tcHV0ZWQiLCJtaW4iLCJzaHVmZmxlIiwic2V0Iiwic2h1ZmZsZWQiLCJyYW5kIiwicmFuZG9tIiwic2FtcGxlIiwibiIsInNvcnRCeSIsImNyaXRlcmlhIiwic29ydCIsImxlZnQiLCJyaWdodCIsImEiLCJiIiwiZ3JvdXAiLCJiZWhhdmlvciIsImdyb3VwQnkiLCJoYXMiLCJpbmRleEJ5IiwiY291bnRCeSIsInRvQXJyYXkiLCJzaXplIiwicGFydGl0aW9uIiwicGFzcyIsImZhaWwiLCJmaXJzdCIsImhlYWQiLCJ0YWtlIiwiYXJyYXkiLCJpbml0aWFsIiwibGFzdCIsInJlc3QiLCJ0YWlsIiwiZHJvcCIsImNvbXBhY3QiLCJmbGF0dGVuIiwiaW5wdXQiLCJzaGFsbG93Iiwic3RyaWN0Iiwic3RhcnRJbmRleCIsIm91dHB1dCIsImlkeCIsImlzQXJndW1lbnRzIiwiaiIsImxlbiIsIndpdGhvdXQiLCJkaWZmZXJlbmNlIiwidW5pcSIsInVuaXF1ZSIsImlzU29ydGVkIiwiaXNCb29sZWFuIiwic2VlbiIsInVuaW9uIiwiaW50ZXJzZWN0aW9uIiwiYXJnc0xlbmd0aCIsInppcCIsInVuemlwIiwib2JqZWN0IiwiY3JlYXRlUHJlZGljYXRlSW5kZXhGaW5kZXIiLCJmaW5kTGFzdEluZGV4Iiwic29ydGVkSW5kZXgiLCJsb3ciLCJoaWdoIiwibWlkIiwiZmxvb3IiLCJjcmVhdGVJbmRleEZpbmRlciIsInByZWRpY2F0ZUZpbmQiLCJpc05hTiIsImxhc3RJbmRleE9mIiwicmFuZ2UiLCJzdGFydCIsInN0b3AiLCJzdGVwIiwiY2VpbCIsImV4ZWN1dGVCb3VuZCIsInNvdXJjZUZ1bmMiLCJib3VuZEZ1bmMiLCJjYWxsaW5nQ29udGV4dCIsInNlbGYiLCJUeXBlRXJyb3IiLCJib3VuZCIsImNvbmNhdCIsInBhcnRpYWwiLCJib3VuZEFyZ3MiLCJwb3NpdGlvbiIsImJpbmRBbGwiLCJFcnJvciIsIm1lbW9pemUiLCJoYXNoZXIiLCJjYWNoZSIsImFkZHJlc3MiLCJkZWxheSIsIndhaXQiLCJzZXRUaW1lb3V0IiwiZGVmZXIiLCJ0aHJvdHRsZSIsIm9wdGlvbnMiLCJ0aW1lb3V0IiwicHJldmlvdXMiLCJsYXRlciIsImxlYWRpbmciLCJub3ciLCJyZW1haW5pbmciLCJjbGVhclRpbWVvdXQiLCJ0cmFpbGluZyIsImRlYm91bmNlIiwiaW1tZWRpYXRlIiwidGltZXN0YW1wIiwiY2FsbE5vdyIsIndyYXAiLCJ3cmFwcGVyIiwiY29tcG9zZSIsImFmdGVyIiwidGltZXMiLCJiZWZvcmUiLCJvbmNlIiwiaGFzRW51bUJ1ZyIsInByb3BlcnR5SXNFbnVtZXJhYmxlIiwibm9uRW51bWVyYWJsZVByb3BzIiwiY29sbGVjdE5vbkVudW1Qcm9wcyIsIm5vbkVudW1JZHgiLCJjb25zdHJ1Y3RvciIsInByb3RvIiwicHJvcCIsImFsbEtleXMiLCJtYXBPYmplY3QiLCJwYWlycyIsImludmVydCIsImZ1bmN0aW9ucyIsIm1ldGhvZHMiLCJuYW1lcyIsImV4dGVuZCIsImV4dGVuZE93biIsImFzc2lnbiIsInBpY2siLCJvaXRlcmF0ZWUiLCJvbWl0IiwiU3RyaW5nIiwiZGVmYXVsdHMiLCJwcm9wcyIsImNsb25lIiwidGFwIiwiaW50ZXJjZXB0b3IiLCJpc01hdGNoIiwiZXEiLCJhU3RhY2siLCJiU3RhY2siLCJjbGFzc05hbWUiLCJhcmVBcnJheXMiLCJhQ3RvciIsImJDdG9yIiwicG9wIiwiaXNFcXVhbCIsImlzRW1wdHkiLCJpc1N0cmluZyIsImlzRWxlbWVudCIsIm5vZGVUeXBlIiwidHlwZSIsIm5hbWUiLCJJbnQ4QXJyYXkiLCJpc0Zpbml0ZSIsInBhcnNlRmxvYXQiLCJpc051bWJlciIsImlzTnVsbCIsImlzVW5kZWZpbmVkIiwibm9Db25mbGljdCIsInByZXZpb3VzVW5kZXJzY29yZSIsImNvbnN0YW50Iiwibm9vcCIsInByb3BlcnR5T2YiLCJtYXRjaGVzIiwiYWNjdW0iLCJEYXRlIiwiZ2V0VGltZSIsImVzY2FwZU1hcCIsInVuZXNjYXBlTWFwIiwiY3JlYXRlRXNjYXBlciIsImVzY2FwZXIiLCJtYXRjaCIsImpvaW4iLCJ0ZXN0UmVnZXhwIiwiUmVnRXhwIiwicmVwbGFjZVJlZ2V4cCIsInN0cmluZyIsInRlc3QiLCJyZXBsYWNlIiwiZXNjYXBlIiwidW5lc2NhcGUiLCJmYWxsYmFjayIsImlkQ291bnRlciIsInVuaXF1ZUlkIiwicHJlZml4IiwiaWQiLCJ0ZW1wbGF0ZVNldHRpbmdzIiwiZXZhbHVhdGUiLCJpbnRlcnBvbGF0ZSIsIm5vTWF0Y2giLCJlc2NhcGVzIiwiZXNjYXBlQ2hhciIsInRlbXBsYXRlIiwidGV4dCIsInNldHRpbmdzIiwib2xkU2V0dGluZ3MiLCJvZmZzZXQiLCJ2YXJpYWJsZSIsInJlbmRlciIsImUiLCJkYXRhIiwiYXJndW1lbnQiLCJjaGFpbiIsImluc3RhbmNlIiwiX2NoYWluIiwibWl4aW4iLCJ2YWx1ZU9mIiwidG9KU09OIiwiZGVmaW5lIiwiYW1kIl0sIm1hcHBpbmdzIjoiOzs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUMsYUFBVzs7QUFFUjtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLFFBQUlBLGFBQWFDLE1BQU1DLFNBQXZCO0FBQUEsUUFDSUMsV0FBV0MsT0FBT0YsU0FEdEI7QUFBQSxRQUVJRyxZQUFZQyxTQUFTSixTQUZ6Qjs7QUFJQTtBQUNBLFFBQ0lLLE9BQU9QLFdBQVdPLElBRHRCO0FBQUEsUUFFSUMsUUFBUVIsV0FBV1EsS0FGdkI7QUFBQSxRQUdJQyxXQUFXTixTQUFTTSxRQUh4QjtBQUFBLFFBSUlDLGlCQUFpQlAsU0FBU08sY0FKOUI7O0FBTUE7QUFD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NUIsQ0FBYixDQUFQO0FBQ0gsU0FGRDtBQUdILEtBTEQ7O0FBT0E7QUFDQWxCLE1BQUVsQixTQUFGLENBQVk2QixLQUFaLEdBQW9CLFlBQVc7QUFDM0IsZUFBTyxLQUFLVCxRQUFaO0FBQ0gsS0FGRDs7QUFJQTtBQUNBO0FBQ0FGLE1BQUVsQixTQUFGLENBQVlrVSxPQUFaLEdBQXNCaFQsRUFBRWxCLFNBQUYsQ0FBWW1VLE1BQVosR0FBcUJqVCxFQUFFbEIsU0FBRixDQUFZNkIsS0FBdkQ7O0FBRUFYLE1BQUVsQixTQUFGLENBQVlPLFFBQVosR0FBdUIsWUFBVztBQUM5QixlQUFPLEtBQUssS0FBS2EsUUFBakI7QUFDSCxLQUZEOztBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBSSxPQUFPZ1QsTUFBUCxLQUFrQixVQUFsQixJQUFnQ0EsT0FBT0MsR0FBM0MsRUFBZ0Q7QUFDNUNELGVBQU8sWUFBUCxFQUFxQixFQUFyQixFQUF5QixZQUFXO0FBQ2hDLG1CQUFPbFQsQ0FBUDtBQUNILFNBRkQ7QUFHSDtBQUNKLENBaGlEQSxFQWdpRENZLElBaGlERCxXQUFEIiwiZmlsZSI6InVuZGVyc2NvcmUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyAgICAgVW5kZXJzY29yZS5qcyAxLjguM1xyXG4vLyAgICAgaHR0cDovL3VuZGVyc2NvcmVqcy5vcmdcclxuLy8gICAgIChjKSAyMDA5LTIwMTUgSmVyZW15IEFzaGtlbmFzLCBEb2N1bWVudENsb3VkIGFuZCBJbnZlc3RpZ2F0aXZlIFJlcG9ydGVycyAmIEVkaXRvcnNcclxuLy8gICAgIFVuZGVyc2NvcmUgbWF5IGJlIGZyZWVseSBkaXN0cmlidXRlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UuXHJcblxyXG4oZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgLy8gQmFzZWxpbmUgc2V0dXBcclxuICAgIC8vIC0tLS0tLS0tLS0tLS0tXHJcblxyXG4gICAgLy8gRXN0YWJsaXNoIHRoZSByb290IG9iamVjdCwgYHdpbmRvd2AgaW4gdGhlIGJyb3dzZXIsIG9yIGBleHBvcnRzYCBvbiB0aGUgc2VydmVyLlxyXG4gICAgLy92YXIgcm9vdCA9IHRoaXM7XHJcblxyXG4gICAgLy8gU2F2ZSB0aGUgcHJldmlvdXMgdmFsdWUgb2YgdGhlIGBfYCB2YXJpYWJsZS5cclxuICAgIC8vdmFyIHByZXZpb3VzVW5kZXJzY29yZSA9IHJvb3QuXztcclxuXHJcbiAgICAvLyBTYXZlIGJ5dGVzIGluIHRoZSBtaW5pZmllZCAoYnV0IG5vdCBnemlwcGVkKSB2ZXJzaW9uOlxyXG4gICAgdmFyIEFycmF5UHJvdG8gPSBBcnJheS5wcm90b3R5cGUsXHJcbiAgICAgICAgT2JqUHJvdG8gPSBPYmplY3QucHJvdG90eXBlLFxyXG4gICAgICAgIEZ1bmNQcm90byA9IEZ1bmN0aW9uLnByb3RvdHlwZTtcclxuXHJcbiAgICAvLyBDcmVhdGUgcXVpY2sgcmVmZXJlbmNlIHZhcmlhYmxlcyBmb3Igc3BlZWQgYWNjZXNzIHRvIGNvcmUgcHJvdG90eXBlcy5cclxuICAgIHZhclxyXG4gICAgICAgIHB1c2ggPSBBcnJheVByb3RvLnB1c2gsXHJcbiAgICAgICAgc2xpY2UgPSBBcnJheVByb3RvLnNsaWNlLFxyXG4gICAgICAgIHRvU3RyaW5nID0gT2JqUHJvdG8udG9TdHJpbmcsXHJcbiAgICAgICAgaGFzT3duUHJvcGVydHkgPSBPYmpQcm90by5oYXNPd25Qcm9wZXJ0eTtcclxuXHJcbiAgICAvLyBBbGwgKipFQ01BU2NyaXB0IDUqKiBuYXRpdmUgZnVuY3Rpb24gaW1wbGVtZW50YXRpb25zIHRoYXQgd2UgaG9wZSB0byB1c2VcclxuICAgIC8vIGFyZSBkZWNsYXJlZCBoZXJlLlxyXG4gICAgdmFyXHJcbiAgICAgICAgbmF0aXZlSXNBcnJheSA9IEFycmF5LmlzQXJyYXksXHJcbiAgICAgICAgbmF0aXZlS2V5cyA9IE9iamVjdC5rZXlzLFxyXG4gICAgICAgIG5hdGl2ZUJpbmQgPSBGdW5jUHJvdG8uYmluZCxcclxuICAgICAgICBuYXRpdmVDcmVhdGUgPSBPYmplY3QuY3JlYXRlO1xyXG5cclxuICAgIC8vIE5ha2VkIGZ1bmN0aW9uIHJlZmVyZW5jZSBmb3Igc3Vycm9nYXRlLXByb3RvdHlwZS1zd2FwcGluZy5cclxuICAgIHZhciBDdG9yID0gZnVuY3Rpb24oKSB7fTtcclxuXHJcbiAgICAvLyBDcmVhdGUgYSBzYWZlIHJlZmVyZW5jZSB0byB0aGUgVW5kZXJzY29yZSBvYmplY3QgZm9yIHVzZSBiZWxvdy5cclxuICAgIHZhciBfID0gZnVuY3Rpb24ob2JqKSB7XHJcbiAgICAgICAgaWYgKG9iaiBpbnN0YW5jZW9mIF8pIHJldHVybiBvYmo7XHJcbiAgICAgICAgaWYgKCEodGhpcyBpbnN0YW5jZW9mIF8pKSByZXR1cm4gbmV3IF8ob2JqKTtcclxuICAgICAgICB0aGlzLl93cmFwcGVkID0gb2JqO1xyXG4gICAgfTtcclxuXHJcbiAgICAvLyBFeHBvcnQgdGhlIFVuZGVyc2NvcmUgb2JqZWN0IGZvciAqKk5vZGUuanMqKiwgd2l0aFxyXG4gICAgLy8gYmFja3dhcmRzLWNvbXBhdGliaWxpdHkgZm9yIHRoZSBvbGQgYHJlcXVpcmUoKWAgQVBJLiBJZiB3ZSdyZSBpblxyXG4gICAgLy8gdGhlIGJyb3dzZXIsIGFkZCBgX2AgYXMgYSBnbG9iYWwgb2JqZWN0LlxyXG4gICAgaWYgKHR5cGVvZiBleHBvcnRzICE9PSAndW5kZWZpbmVkJykge1xyXG4gICAgICAgIGlmICh0eXBlb2YgbW9kdWxlICE9PSAndW5kZWZpbmVkJyAmJiBtb2R1bGUuZXhwb3J0cykge1xyXG4gICAgICAgICAgICBleHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSBfO1xyXG4gICAgICAgIH1cclxuICAgICAgICBleHBvcnRzLl8gPSBfO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICByb290Ll8gPSBfO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIEN1cnJlbnQgdmVyc2lvbi5cclxuICAgIF8uVkVSU0lPTiA9ICcxLjguMyc7XHJcblxyXG4gICAgLy8gSW50ZXJuYWwgZnVuY3Rpb24gdGhhdCByZXR1cm5zIGFuIGVmZmljaWVudCAoZm9yIGN1cnJlbnQgZW5naW5lcykgdmVyc2lvblxyXG4gICAgLy8gb2YgdGhlIHBhc3NlZC1pbiBjYWxsYmFjaywgdG8gYmUgcmVwZWF0ZWRseSBhcHBsaWVkIGluIG90aGVyIFVuZGVyc2NvcmVcclxuICAgIC8vIGZ1bmN0aW9ucy5cclxuICAgIHZhciBvcHRpbWl6ZUNiID0gZnVuY3Rpb24oZnVuYywgY29udGV4dCwgYXJnQ291bnQpIHtcclxuICAgICAgICBpZiAoY29udGV4dCA9PT0gdm9pZCAwKSByZXR1cm4gZnVuYztcclxuICAgICAgICBzd2l0Y2ggKGFyZ0NvdW50ID09IG51bGwgPyAzIDogYXJnQ291bnQpIHtcclxuICAgICAgICAgICAgY2FzZSAxOlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKHZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZ1bmMuY2FsbChjb250ZXh0LCB2YWx1ZSk7XHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICBjYXNlIDI6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24odmFsdWUsIG90aGVyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZ1bmMuY2FsbChjb250ZXh0LCB2YWx1ZSwgb3RoZXIpO1xyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgY2FzZSAzOlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKHZhbHVlLCBpbmRleCwgY29sbGVjdGlvbikge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmdW5jLmNhbGwoY29udGV4dCwgdmFsdWUsIGluZGV4LCBjb2xsZWN0aW9uKTtcclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIGNhc2UgNDpcclxuICAgICAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbihhY2N1bXVsYXRvciwgdmFsdWUsIGluZGV4LCBjb2xsZWN0aW9uKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZ1bmMuY2FsbChjb250ZXh0LCBhY2N1bXVsYXRvciwgdmFsdWUsIGluZGV4LCBjb2xsZWN0aW9uKTtcclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZ1bmMuYXBwbHkoY29udGV4dCwgYXJndW1lbnRzKTtcclxuICAgICAgICB9O1xyXG4gICAgfTtcclxuXHJcbiAgICAvLyBBIG1vc3RseS1pbnRlcm5hbCBmdW5jdGlvbiB0byBnZW5lcmF0ZSBjYWxsYmFja3MgdGhhdCBjYW4gYmUgYXBwbGllZFxyXG4gICAgLy8gdG8gZWFjaCBlbGVtZW50IGluIGEgY29sbGVjdGlvbiwgcmV0dXJuaW5nIHRoZSBkZXNpcmVkIHJlc3VsdCDigJQgZWl0aGVyXHJcbiAgICAvLyBpZGVudGl0eSwgYW4gYXJiaXRyYXJ5IGNhbGxiYWNrLCBhIHByb3BlcnR5IG1hdGNoZXIsIG9yIGEgcHJvcGVydHkgYWNjZXNzb3IuXHJcbiAgICB2YXIgY2IgPSBmdW5jdGlvbih2YWx1ZSwgY29udGV4dCwgYXJnQ291bnQpIHtcclxuICAgICAgICBpZiAodmFsdWUgPT0gbnVsbCkgcmV0dXJuIF8uaWRlbnRpdHk7XHJcbiAgICAgICAgaWYgKF8uaXNGdW5jdGlvbih2YWx1ZSkpIHJldHVybiBvcHRpbWl6ZUNiKHZhbHVlLCBjb250ZXh0LCBhcmdDb3VudCk7XHJcbiAgICAgICAgaWYgKF8uaXNPYmplY3QodmFsdWUpKSByZXR1cm4gXy5tYXRjaGVyKHZhbHVlKTtcclxuICAgICAgICByZXR1cm4gXy5wcm9wZXJ0eSh2YWx1ZSk7XHJcbiAgICB9O1xyXG4gICAgXy5pdGVyYXRlZSA9IGZ1bmN0aW9uKHZhbHVlLCBjb250ZXh0KSB7XHJcbiAgICAgICAgcmV0dXJuIGNiKHZhbHVlLCBjb250ZXh0LCBJbmZpbml0eSk7XHJcbiAgICB9O1xyXG5cclxuICAgIC8vIEFuIGludGVybmFsIGZ1bmN0aW9uIGZvciBjcmVhdGluZyBhc3NpZ25lciBmdW5jdGlvbnMuXHJcbiAgICB2YXIgY3JlYXRlQXNzaWduZXIgPSBmdW5jdGlvbihrZXlzRnVuYywgdW5kZWZpbmVkT25seSkge1xyXG4gICAgICAgIHJldHVybiBmdW5jdGlvbihvYmopIHtcclxuICAgICAgICAgICAgdmFyIGxlbmd0aCA9IGFyZ3VtZW50cy5sZW5ndGg7XHJcbiAgICAgICAgICAgIGlmIChsZW5ndGggPCAyIHx8IG9iaiA9PSBudWxsKSByZXR1cm4gb2JqO1xyXG4gICAgICAgICAgICBmb3IgKHZhciBpbmRleCA9IDE7IGluZGV4IDwgbGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgc291cmNlID0gYXJndW1lbnRzW2luZGV4XSxcclxuICAgICAgICAgICAgICAgICAgICBrZXlzID0ga2V5c0Z1bmMoc291cmNlKSxcclxuICAgICAgICAgICAgICAgICAgICBsID0ga2V5cy5sZW5ndGg7XHJcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGw7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBrZXkgPSBrZXlzW2ldO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICghdW5kZWZpbmVkT25seSB8fCBvYmpba2V5XSA9PT0gdm9pZCAwKSBvYmpba2V5XSA9IHNvdXJjZVtrZXldO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBvYmo7XHJcbiAgICAgICAgfTtcclxuICAgIH07XHJcblxyXG4gICAgLy8gQW4gaW50ZXJuYWwgZnVuY3Rpb24gZm9yIGNyZWF0aW5nIGEgbmV3IG9iamVjdCB0aGF0IGluaGVyaXRzIGZyb20gYW5vdGhlci5cclxuICAgIHZhciBiYXNlQ3JlYXRlID0gZnVuY3Rpb24ocHJvdG90eXBlKSB7XHJcbiAgICAgICAgaWYgKCFfLmlzT2JqZWN0KHByb3RvdHlwZSkpIHJldHVybiB7fTtcclxuICAgICAgICBpZiAobmF0aXZlQ3JlYXRlKSByZXR1cm4gbmF0aXZlQ3JlYXRlKHByb3RvdHlwZSk7XHJcbiAgICAgICAgQ3Rvci5wcm90b3R5cGUgPSBwcm90b3R5cGU7XHJcbiAgICAgICAgdmFyIHJlc3VsdCA9IG5ldyBDdG9yO1xyXG4gICAgICAgIEN0b3IucHJvdG90eXBlID0gbnVsbDtcclxuICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgfTtcclxuXHJcbiAgICB2YXIgcHJvcGVydHkgPSBmdW5jdGlvbihrZXkpIHtcclxuICAgICAgICByZXR1cm4gZnVuY3Rpb24ob2JqKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBvYmogPT0gbnVsbCA/IHZvaWQgMCA6IG9ialtrZXldO1xyXG4gICAgICAgIH07XHJcbiAgICB9O1xyXG5cclxuICAgIC8vIEhlbHBlciBmb3IgY29sbGVjdGlvbiBtZXRob2RzIHRvIGRldGVybWluZSB3aGV0aGVyIGEgY29sbGVjdGlvblxyXG4gICAgLy8gc2hvdWxkIGJlIGl0ZXJhdGVkIGFzIGFuIGFycmF5IG9yIGFzIGFuIG9iamVjdFxyXG4gICAgLy8gUmVsYXRlZDogaHR0cDovL3Blb3BsZS5tb3ppbGxhLm9yZy9+am9yZW5kb3JmZi9lczYtZHJhZnQuaHRtbCNzZWMtdG9sZW5ndGhcclxuICAgIC8vIEF2b2lkcyBhIHZlcnkgbmFzdHkgaU9TIDggSklUIGJ1ZyBvbiBBUk0tNjQuICMyMDk0XHJcbiAgICB2YXIgTUFYX0FSUkFZX0lOREVYID0gTWF0aC5wb3coMiwgNTMpIC0gMTtcclxuICAgIHZhciBnZXRMZW5ndGggPSBwcm9wZXJ0eSgnbGVuZ3RoJyk7XHJcbiAgICB2YXIgaXNBcnJheUxpa2UgPSBmdW5jdGlvbihjb2xsZWN0aW9uKSB7XHJcbiAgICAgICAgdmFyIGxlbmd0aCA9IGdldExlbmd0aChjb2xsZWN0aW9uKTtcclxuICAgICAgICByZXR1cm4gdHlwZW9mIGxlbmd0aCA9PSAnbnVtYmVyJyAmJiBsZW5ndGggPj0gMCAmJiBsZW5ndGggPD0gTUFYX0FSUkFZX0lOREVYO1xyXG4gICAgfTtcclxuXHJcbiAgICAvLyBDb2xsZWN0aW9uIEZ1bmN0aW9uc1xyXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuXHJcbiAgICAvLyBUaGUgY29ybmVyc3RvbmUsIGFuIGBlYWNoYCBpbXBsZW1lbnRhdGlvbiwgYWthIGBmb3JFYWNoYC5cclxuICAgIC8vIEhhbmRsZXMgcmF3IG9iamVjdHMgaW4gYWRkaXRpb24gdG8gYXJyYXktbGlrZXMuIFRyZWF0cyBhbGxcclxuICAgIC8vIHNwYXJzZSBhcnJheS1saWtlcyBhcyBpZiB0aGV5IHdlcmUgZGVuc2UuXHJcbiAgICBfLmVhY2ggPSBfLmZvckVhY2ggPSBmdW5jdGlvbihvYmosIGl0ZXJhdGVlLCBjb250ZXh0KSB7XHJcbiAgICAgICAgaXRlcmF0ZWUgPSBvcHRpbWl6ZUNiKGl0ZXJhdGVlLCBjb250ZXh0KTtcclxuICAgICAgICB2YXIgaSwgbGVuZ3RoO1xyXG4gICAgICAgIGlmIChpc0FycmF5TGlrZShvYmopKSB7XHJcbiAgICAgICAgICAgIGZvciAoaSA9IDAsIGxlbmd0aCA9IG9iai5sZW5ndGg7IGkgPCBsZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgaXRlcmF0ZWUob2JqW2ldLCBpLCBvYmopO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdmFyIGtleXMgPSBfLmtleXMob2JqKTtcclxuICAgICAgICAgICAgZm9yIChpID0gMCwgbGVuZ3RoID0ga2V5cy5sZW5ndGg7IGkgPCBsZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgaXRlcmF0ZWUob2JqW2tleXNbaV1dLCBrZXlzW2ldLCBvYmopO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBvYmo7XHJcbiAgICB9O1xyXG5cclxuICAgIC8vIFJldHVybiB0aGUgcmVzdWx0cyBvZiBhcHBseWluZyB0aGUgaXRlcmF0ZWUgdG8gZWFjaCBlbGVtZW50LlxyXG4gICAgXy5tYXAgPSBfLmNvbGxlY3QgPSBmdW5jdGlvbihvYmosIGl0ZXJhdGVlLCBjb250ZXh0KSB7XHJcbiAgICAgICAgaXRlcmF0ZWUgPSBjYihpdGVyYXRlZSwgY29udGV4dCk7XHJcbiAgICAgICAgdmFyIGtleXMgPSAhaXNBcnJheUxpa2Uob2JqKSAmJiBfLmtleXMob2JqKSxcclxuICAgICAgICAgICAgbGVuZ3RoID0gKGtleXMgfHwgb2JqKS5sZW5ndGgsXHJcbiAgICAgICAgICAgIHJlc3VsdHMgPSBBcnJheShsZW5ndGgpO1xyXG4gICAgICAgIGZvciAodmFyIGluZGV4ID0gMDsgaW5kZXggPCBsZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICAgICAgdmFyIGN1cnJlbnRLZXkgPSBrZXlzID8ga2V5c1tpbmRleF0gOiBpbmRleDtcclxuICAgICAgICAgICAgcmVzdWx0c1tpbmRleF0gPSBpdGVyYXRlZShvYmpbY3VycmVudEtleV0sIGN1cnJlbnRLZXksIG9iaik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiByZXN1bHRzO1xyXG4gICAgfTtcclxuXHJcbiAgICAvLyBDcmVhdGUgYSByZWR1Y2luZyBmdW5jdGlvbiBpdGVyYXRpbmcgbGVmdCBvciByaWdodC5cclxuICAgIGZ1bmN0aW9uIGNyZWF0ZVJlZHVjZShkaXIpIHtcclxuICAgICAgICAvLyBPcHRpbWl6ZWQgaXRlcmF0b3IgZnVuY3Rpb24gYXMgdXNpbmcgYXJndW1lbnRzLmxlbmd0aFxyXG4gICAgICAgIC8vIGluIHRoZSBtYWluIGZ1bmN0aW9uIHdpbGwgZGVvcHRpbWl6ZSB0aGUsIHNlZSAjMTk5MS5cclxuICAgICAgICBmdW5jdGlvbiBpdGVyYXRvcihvYmosIGl0ZXJhdGVlLCBtZW1vLCBrZXlzLCBpbmRleCwgbGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIGZvciAoOyBpbmRleCA+PSAwICYmIGluZGV4IDwgbGVuZ3RoOyBpbmRleCArPSBkaXIpIHtcclxuICAgICAgICAgICAgICAgIHZhciBjdXJyZW50S2V5ID0ga2V5cyA/IGtleXNbaW5kZXhdIDogaW5kZXg7XHJcbiAgICAgICAgICAgICAgICBtZW1vID0gaXRlcmF0ZWUobWVtbywgb2JqW2N1cnJlbnRLZXldLCBjdXJyZW50S2V5LCBvYmopO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBtZW1vO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKG9iaiwgaXRlcmF0ZWUsIG1lbW8sIGNvbnRleHQpIHtcclxuICAgICAgICAgICAgaXRlcmF0ZWUgPSBvcHRpbWl6ZUNiKGl0ZXJhdGVlLCBjb250ZXh0LCA0KTtcclxuICAgICAgICAgICAgdmFyIGtleXMgPSAhaXNBcnJheUxpa2Uob2JqKSAmJiBfLmtleXMob2JqKSxcclxuICAgICAgICAgICAgICAgIGxlbmd0aCA9IChrZXlzIHx8IG9iaikubGVuZ3RoLFxyXG4gICAgICAgICAgICAgICAgaW5kZXggPSBkaXIgPiAwID8gMCA6IGxlbmd0aCAtIDE7XHJcbiAgICAgICAgICAgIC8vIERldGVybWluZSB0aGUgaW5pdGlhbCB2YWx1ZSBpZiBub25lIGlzIHByb3ZpZGVkLlxyXG4gICAgICAgICAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA8IDMpIHtcclxuICAgICAgICAgICAgICAgIG1lbW8gPSBvYmpba2V5cyA/IGtleXNbaW5kZXhdIDogaW5kZXhdO1xyXG4gICAgICAgICAgICAgICAgaW5kZXggKz0gZGlyO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBpdGVyYXRvcihvYmosIGl0ZXJhdGVlLCBtZW1vLCBrZXlzLCBpbmRleCwgbGVuZ3RoKTtcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIC8vICoqUmVkdWNlKiogYnVpbGRzIHVwIGEgc2luZ2xlIHJlc3VsdCBmcm9tIGEgbGlzdCBvZiB2YWx1ZXMsIGFrYSBgaW5qZWN0YCxcclxuICAgIC8vIG9yIGBmb2xkbGAuXHJcbiAgICBfLnJlZHVjZSA9IF8uZm9sZGwgPSBfLmluamVjdCA9IGNyZWF0ZVJlZHVjZSgxKTtcclxuXHJcbiAgICAvLyBUaGUgcmlnaHQtYXNzb2NpYXRpdmUgdmVyc2lvbiBvZiByZWR1Y2UsIGFsc28ga25vd24gYXMgYGZvbGRyYC5cclxuICAgIF8ucmVkdWNlUmlnaHQgPSBfLmZvbGRyID0gY3JlYXRlUmVkdWNlKC0xKTtcclxuXHJcbiAgICAvLyBSZXR1cm4gdGhlIGZpcnN0IHZhbHVlIHdoaWNoIHBhc3NlcyBhIHRydXRoIHRlc3QuIEFsaWFzZWQgYXMgYGRldGVjdGAuXHJcbiAgICBfLmZpbmQgPSBfLmRldGVjdCA9IGZ1bmN0aW9uKG9iaiwgcHJlZGljYXRlLCBjb250ZXh0KSB7XHJcbiAgICAgICAgdmFyIGtleTtcclxuICAgICAgICBpZiAoaXNBcnJheUxpa2Uob2JqKSkge1xyXG4gICAgICAgICAgICBrZXkgPSBfLmZpbmRJbmRleChvYmosIHByZWRpY2F0ZSwgY29udGV4dCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAga2V5ID0gXy5maW5kS2V5KG9iaiwgcHJlZGljYXRlLCBjb250ZXh0KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGtleSAhPT0gdm9pZCAwICYmIGtleSAhPT0gLTEpIHJldHVybiBvYmpba2V5XTtcclxuICAgIH07XHJcblxyXG4gICAgLy8gUmV0dXJuIGFsbCB0aGUgZWxlbWVudHMgdGhhdCBwYXNzIGEgdHJ1dGggdGVzdC5cclxuICAgIC8vIEFsaWFzZWQgYXMgYHNlbGVjdGAuXHJcbiAgICBfLmZpbHRlciA9IF8uc2VsZWN0ID0gZnVuY3Rpb24ob2JqLCBwcmVkaWNhdGUsIGNvbnRleHQpIHtcclxuICAgICAgICB2YXIgcmVzdWx0cyA9IFtdO1xyXG4gICAgICAgIHByZWRpY2F0ZSA9IGNiKHByZWRpY2F0ZSwgY29udGV4dCk7XHJcbiAgICAgICAgXy5lYWNoKG9iaiwgZnVuY3Rpb24odmFsdWUsIGluZGV4LCBsaXN0KSB7XHJcbiAgICAgICAgICAgIGlmIChwcmVkaWNhdGUodmFsdWUsIGluZGV4LCBsaXN0KSkgcmVzdWx0cy5wdXNoKHZhbHVlKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4gcmVzdWx0cztcclxuICAgIH07XHJcblxyXG4gICAgLy8gUmV0dXJuIGFsbCB0aGUgZWxlbWVudHMgZm9yIHdoaWNoIGEgdHJ1dGggdGVzdCBmYWlscy5cclxuICAgIF8ucmVqZWN0ID0gZnVuY3Rpb24ob2JqLCBwcmVkaWNhdGUsIGNvbnRleHQpIHtcclxuICAgICAgICByZXR1cm4gXy5maWx0ZXIob2JqLCBfLm5lZ2F0ZShjYihwcmVkaWNhdGUpKSwgY29udGV4dCk7XHJcbiAgICB9O1xyXG5cclxuICAgIC8vIERldGVybWluZSB3aGV0aGVyIGFsbCBvZiB0aGUgZWxlbWVudHMgbWF0Y2ggYSB0cnV0aCB0ZXN0LlxyXG4gICAgLy8gQWxpYXNlZCBhcyBgYWxsYC5cclxuICAgIF8uZXZlcnkgPSBfLmFsbCA9IGZ1bmN0aW9uKG9iaiwgcHJlZGljYXRlLCBjb250ZXh0KSB7XHJcbiAgICAgICAgcHJlZGljYXRlID0gY2IocHJlZGljYXRlLCBjb250ZXh0KTtcclxuICAgICAgICB2YXIga2V5cyA9ICFpc0FycmF5TGlrZShvYmopICYmIF8ua2V5cyhvYmopLFxyXG4gICAgICAgICAgICBsZW5ndGggPSAoa2V5cyB8fCBvYmopLmxlbmd0aDtcclxuICAgICAgICBmb3IgKHZhciBpbmRleCA9IDA7IGluZGV4IDwgbGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgICAgIHZhciBjdXJyZW50S2V5ID0ga2V5cyA/IGtleXNbaW5kZXhdIDogaW5kZXg7XHJcbiAgICAgICAgICAgIGlmICghcHJlZGljYXRlKG9ialtjdXJyZW50S2V5XSwgY3VycmVudEtleSwgb2JqKSkgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH07XHJcblxyXG4gICAgLy8gRGV0ZXJtaW5lIGlmIGF0IGxlYXN0IG9uZSBlbGVtZW50IGluIHRoZSBvYmplY3QgbWF0Y2hlcyBhIHRydXRoIHRlc3QuXHJcbiAgICAvLyBBbGlhc2VkIGFzIGBhbnlgLlxyXG4gICAgXy5zb21lID0gXy5hbnkgPSBmdW5jdGlvbihvYmosIHByZWRpY2F0ZSwgY29udGV4dCkge1xyXG4gICAgICAgIHByZWRpY2F0ZSA9IGNiKHByZWRpY2F0ZSwgY29udGV4dCk7XHJcbiAgICAgICAgdmFyIGtleXMgPSAhaXNBcnJheUxpa2Uob2JqKSAmJiBfLmtleXMob2JqKSxcclxuICAgICAgICAgICAgbGVuZ3RoID0gKGtleXMgfHwgb2JqKS5sZW5ndGg7XHJcbiAgICAgICAgZm9yICh2YXIgaW5kZXggPSAwOyBpbmRleCA8IGxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICAgICAgICB2YXIgY3VycmVudEtleSA9IGtleXMgPyBrZXlzW2luZGV4XSA6IGluZGV4O1xyXG4gICAgICAgICAgICBpZiAocHJlZGljYXRlKG9ialtjdXJyZW50S2V5XSwgY3VycmVudEtleSwgb2JqKSkgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH07XHJcblxyXG4gICAgLy8gRGV0ZXJtaW5lIGlmIHRoZSBhcnJheSBvciBvYmplY3QgY29udGFpbnMgYSBnaXZlbiBpdGVtICh1c2luZyBgPT09YCkuXHJcbiAgICAvLyBBbGlhc2VkIGFzIGBpbmNsdWRlc2AgYW5kIGBpbmNsdWRlYC5cclxuICAgIF8uY29udGFpbnMgPSBfLmluY2x1ZGVzID0gXy5pbmNsdWRlID0gZnVuY3Rpb24ob2JqLCBpdGVtLCBmcm9tSW5kZXgsIGd1YXJkKSB7XHJcbiAgICAgICAgaWYgKCFpc0FycmF5TGlrZShvYmopKSBvYmogPSBfLnZhbHVlcyhvYmopO1xyXG4gICAgICAgIGlmICh0eXBlb2YgZnJvbUluZGV4ICE9ICdudW1iZXInIHx8IGd1YXJkKSBmcm9tSW5kZXggPSAwO1xyXG4gICAgICAgIHJldHVybiBfLmluZGV4T2Yob2JqLCBpdGVtLCBmcm9tSW5kZXgpID49IDA7XHJcbiAgICB9O1xyXG5cclxuICAgIC8vIEludm9rZSBhIG1ldGhvZCAod2l0aCBhcmd1bWVudHMpIG9uIGV2ZXJ5IGl0ZW0gaW4gYSBjb2xsZWN0aW9uLlxyXG4gICAgXy5pbnZva2UgPSBmdW5jdGlvbihvYmosIG1ldGhvZCkge1xyXG4gICAgICAgIHZhciBhcmdzID0gc2xpY2UuY2FsbChhcmd1bWVudHMsIDIpO1xyXG4gICAgICAgIHZhciBpc0Z1bmMgPSBfLmlzRnVuY3Rpb24obWV0aG9kKTtcclxuICAgICAgICByZXR1cm4gXy5tYXAob2JqLCBmdW5jdGlvbih2YWx1ZSkge1xyXG4gICAgICAgICAgICB2YXIgZnVuYyA9IGlzRnVuYyA/IG1ldGhvZCA6IHZhbHVlW21ldGhvZF07XHJcbiAgICAgICAgICAgIHJldHVybiBmdW5jID09IG51bGwgPyBmdW5jIDogZnVuYy5hcHBseSh2YWx1ZSwgYXJncyk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9O1xyXG5cclxuICAgIC8vIENvbnZlbmllbmNlIHZlcnNpb24gb2YgYSBjb21tb24gdXNlIGNhc2Ugb2YgYG1hcGA6IGZldGNoaW5nIGEgcHJvcGVydHkuXHJcbiAgICBfLnBsdWNrID0gZnVuY3Rpb24ob2JqLCBrZXkpIHtcclxuICAgICAgICByZXR1cm4gXy5tYXAob2JqLCBfLnByb3BlcnR5KGtleSkpO1xyXG4gICAgfTtcclxuXHJcbiAgICAvLyBDb252ZW5pZW5jZSB2ZXJzaW9uIG9mIGEgY29tbW9uIHVzZSBjYXNlIG9mIGBmaWx0ZXJgOiBzZWxlY3Rpbmcgb25seSBvYmplY3RzXHJcbiAgICAvLyBjb250YWluaW5nIHNwZWNpZmljIGBrZXk6dmFsdWVgIHBhaXJzLlxyXG4gICAgXy53aGVyZSA9IGZ1bmN0aW9uKG9iaiwgYXR0cnMpIHtcclxuICAgICAgICByZXR1cm4gXy5maWx0ZXIob2JqLCBfLm1hdGNoZXIoYXR0cnMpKTtcclxuICAgIH07XHJcblxyXG4gICAgLy8gQ29udmVuaWVuY2UgdmVyc2lvbiBvZiBhIGNvbW1vbiB1c2UgY2FzZSBvZiBgZmluZGA6IGdldHRpbmcgdGhlIGZpcnN0IG9iamVjdFxyXG4gICAgLy8gY29udGFpbmluZyBzcGVjaWZpYyBga2V5OnZhbHVlYCBwYWlycy5cclxuICAgIF8uZmluZFdoZXJlID0gZnVuY3Rpb24ob2JqLCBhdHRycykge1xyXG4gICAgICAgIHJldHVybiBfLmZpbmQob2JqLCBfLm1hdGNoZXIoYXR0cnMpKTtcclxuICAgIH07XHJcblxyXG4gICAgLy8gUmV0dXJuIHRoZSBtYXhpbXVtIGVsZW1lbnQgKG9yIGVsZW1lbnQtYmFzZWQgY29tcHV0YXRpb24pLlxyXG4gICAgXy5tYXggPSBmdW5jdGlvbihvYmosIGl0ZXJhdGVlLCBjb250ZXh0KSB7XHJcbiAgICAgICAgdmFyIHJlc3VsdCA9IC1JbmZpbml0eSxcclxuICAgICAgICAgICAgbGFzdENvbXB1dGVkID0gLUluZmluaXR5LFxyXG4gICAgICAgICAgICB2YWx1ZSwgY29tcHV0ZWQ7XHJcbiAgICAgICAgaWYgKGl0ZXJhdGVlID09IG51bGwgJiYgb2JqICE9IG51bGwpIHtcclxuICAgICAgICAgICAgb2JqID0gaXNBcnJheUxpa2Uob2JqKSA/IG9iaiA6IF8udmFsdWVzKG9iaik7XHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwLCBsZW5ndGggPSBvYmoubGVuZ3RoOyBpIDwgbGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIHZhbHVlID0gb2JqW2ldO1xyXG4gICAgICAgICAgICAgICAgaWYgKHZhbHVlID4gcmVzdWx0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0ID0gdmFsdWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBpdGVyYXRlZSA9IGNiKGl0ZXJhdGVlLCBjb250ZXh0KTtcclxuICAgICAgICAgICAgXy5lYWNoKG9iaiwgZnVuY3Rpb24odmFsdWUsIGluZGV4LCBsaXN0KSB7XHJcbiAgICAgICAgICAgICAgICBjb21wdXRlZCA9IGl0ZXJhdGVlKHZhbHVlLCBpbmRleCwgbGlzdCk7XHJcbiAgICAgICAgICAgICAgICBpZiAoY29tcHV0ZWQgPiBsYXN0Q29tcHV0ZWQgfHwgY29tcHV0ZWQgPT09IC1JbmZpbml0eSAmJiByZXN1bHQgPT09IC1JbmZpbml0eSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdCA9IHZhbHVlO1xyXG4gICAgICAgICAgICAgICAgICAgIGxhc3RDb21wdXRlZCA9IGNvbXB1dGVkO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgIH07XHJcblxyXG4gICAgLy8gUmV0dXJuIHRoZSBtaW5pbXVtIGVsZW1lbnQgKG9yIGVsZW1lbnQtYmFzZWQgY29tcHV0YXRpb24pLlxyXG4gICAgXy5taW4gPSBmdW5jdGlvbihvYmosIGl0ZXJhdGVlLCBjb250ZXh0KSB7XHJcbiAgICAgICAgdmFyIHJlc3VsdCA9IEluZmluaXR5LFxyXG4gICAgICAgICAgICBsYXN0Q29tcHV0ZWQgPSBJbmZpbml0eSxcclxuICAgICAgICAgICAgdmFsdWUsIGNvbXB1dGVkO1xyXG4gICAgICAgIGlmIChpdGVyYXRlZSA9PSBudWxsICYmIG9iaiAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgIG9iaiA9IGlzQXJyYXlMaWtlKG9iaikgPyBvYmogOiBfLnZhbHVlcyhvYmopO1xyXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMCwgbGVuZ3RoID0gb2JqLmxlbmd0aDsgaSA8IGxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICB2YWx1ZSA9IG9ialtpXTtcclxuICAgICAgICAgICAgICAgIGlmICh2YWx1ZSA8IHJlc3VsdCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdCA9IHZhbHVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgaXRlcmF0ZWUgPSBjYihpdGVyYXRlZSwgY29udGV4dCk7XHJcbiAgICAgICAgICAgIF8uZWFjaChvYmosIGZ1bmN0aW9uKHZhbHVlLCBpbmRleCwgbGlzdCkge1xyXG4gICAgICAgICAgICAgICAgY29tcHV0ZWQgPSBpdGVyYXRlZSh2YWx1ZSwgaW5kZXgsIGxpc3QpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGNvbXB1dGVkIDwgbGFzdENvbXB1dGVkIHx8IGNvbXB1dGVkID09PSBJbmZpbml0eSAmJiByZXN1bHQgPT09IEluZmluaXR5KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0ID0gdmFsdWU7XHJcbiAgICAgICAgICAgICAgICAgICAgbGFzdENvbXB1dGVkID0gY29tcHV0ZWQ7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgfTtcclxuXHJcbiAgICAvLyBTaHVmZmxlIGEgY29sbGVjdGlvbiwgdXNpbmcgdGhlIG1vZGVybiB2ZXJzaW9uIG9mIHRoZVxyXG4gICAgLy8gW0Zpc2hlci1ZYXRlcyBzaHVmZmxlXShodHRwOi8vZW4ud2lraXBlZGlhLm9yZy93aWtpL0Zpc2hlcuKAk1lhdGVzX3NodWZmbGUpLlxyXG4gICAgXy5zaHVmZmxlID0gZnVuY3Rpb24ob2JqKSB7XHJcbiAgICAgICAgdmFyIHNldCA9IGlzQXJyYXlMaWtlKG9iaikgPyBvYmogOiBfLnZhbHVlcyhvYmopO1xyXG4gICAgICAgIHZhciBsZW5ndGggPSBzZXQubGVuZ3RoO1xyXG4gICAgICAgIHZhciBzaHVmZmxlZCA9IEFycmF5KGxlbmd0aCk7XHJcbiAgICAgICAgZm9yICh2YXIgaW5kZXggPSAwLCByYW5kOyBpbmRleCA8IGxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICAgICAgICByYW5kID0gXy5yYW5kb20oMCwgaW5kZXgpO1xyXG4gICAgICAgICAgICBpZiAocmFuZCAhPT0gaW5kZXgpIHNodWZmbGVkW2luZGV4XSA9IHNodWZmbGVkW3JhbmRdO1xyXG4gICAgICAgICAgICBzaHVmZmxlZFtyYW5kXSA9IHNldFtpbmRleF07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBzaHVmZmxlZDtcclxuICAgIH07XHJcblxyXG4gICAgLy8gU2FtcGxlICoqbioqIHJhbmRvbSB2YWx1ZXMgZnJvbSBhIGNvbGxlY3Rpb24uXHJcbiAgICAvLyBJZiAqKm4qKiBpcyBub3Qgc3BlY2lmaWVkLCByZXR1cm5zIGEgc2luZ2xlIHJhbmRvbSBlbGVtZW50LlxyXG4gICAgLy8gVGhlIGludGVybmFsIGBndWFyZGAgYXJndW1lbnQgYWxsb3dzIGl0IHRvIHdvcmsgd2l0aCBgbWFwYC5cclxuICAgIF8uc2FtcGxlID0gZnVuY3Rpb24ob2JqLCBuLCBndWFyZCkge1xyXG4gICAgICAgIGlmIChuID09IG51bGwgfHwgZ3VhcmQpIHtcclxuICAgICAgICAgICAgaWYgKCFpc0FycmF5TGlrZShvYmopKSBvYmogPSBfLnZhbHVlcyhvYmopO1xyXG4gICAgICAgICAgICByZXR1cm4gb2JqW18ucmFuZG9tKG9iai5sZW5ndGggLSAxKV07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBfLnNodWZmbGUob2JqKS5zbGljZSgwLCBNYXRoLm1heCgwLCBuKSk7XHJcbiAgICB9O1xyXG5cclxuICAgIC8vIFNvcnQgdGhlIG9iamVjdCdzIHZhbHVlcyBieSBhIGNyaXRlcmlvbiBwcm9kdWNlZCBieSBhbiBpdGVyYXRlZS5cclxuICAgIF8uc29ydEJ5ID0gZnVuY3Rpb24ob2JqLCBpdGVyYXRlZSwgY29udGV4dCkge1xyXG4gICAgICAgIGl0ZXJhdGVlID0gY2IoaXRlcmF0ZWUsIGNvbnRleHQpO1xyXG4gICAgICAgIHJldHVybiBfLnBsdWNrKF8ubWFwKG9iaiwgZnVuY3Rpb24odmFsdWUsIGluZGV4LCBsaXN0KSB7XHJcbiAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICB2YWx1ZTogdmFsdWUsXHJcbiAgICAgICAgICAgICAgICBpbmRleDogaW5kZXgsXHJcbiAgICAgICAgICAgICAgICBjcml0ZXJpYTogaXRlcmF0ZWUodmFsdWUsIGluZGV4LCBsaXN0KVxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH0pLnNvcnQoZnVuY3Rpb24obGVmdCwgcmlnaHQpIHtcclxuICAgICAgICAgICAgdmFyIGEgPSBsZWZ0LmNyaXRlcmlhO1xyXG4gICAgICAgICAgICB2YXIgYiA9IHJpZ2h0LmNyaXRlcmlhO1xyXG4gICAgICAgICAgICBpZiAoYSAhPT0gYikge1xyXG4gICAgICAgICAgICAgICAgaWYgKGEgPiBiIHx8IGEgPT09IHZvaWQgMCkgcmV0dXJuIDE7XHJcbiAgICAgICAgICAgICAgICBpZiAoYSA8IGIgfHwgYiA9PT0gdm9pZCAwKSByZXR1cm4gLTE7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIGxlZnQuaW5kZXggLSByaWdodC5pbmRleDtcclxuICAgICAgICB9KSwgJ3ZhbHVlJyk7XHJcbiAgICB9O1xyXG5cclxuICAgIC8vIEFuIGludGVybmFsIGZ1bmN0aW9uIHVzZWQgZm9yIGFnZ3JlZ2F0ZSBcImdyb3VwIGJ5XCIgb3BlcmF0aW9ucy5cclxuICAgIHZhciBncm91cCA9IGZ1bmN0aW9uKGJlaGF2aW9yKSB7XHJcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKG9iaiwgaXRlcmF0ZWUsIGNvbnRleHQpIHtcclxuICAgICAgICAgICAgdmFyIHJlc3VsdCA9IHt9O1xyXG4gICAgICAgICAgICBpdGVyYXRlZSA9IGNiKGl0ZXJhdGVlLCBjb250ZXh0KTtcclxuICAgICAgICAgICAgXy5lYWNoKG9iaiwgZnVuY3Rpb24odmFsdWUsIGluZGV4KSB7XHJcbiAgICAgICAgICAgICAgICB2YXIga2V5ID0gaXRlcmF0ZWUodmFsdWUsIGluZGV4LCBvYmopO1xyXG4gICAgICAgICAgICAgICAgYmVoYXZpb3IocmVzdWx0LCB2YWx1ZSwga2V5KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICAgICAgfTtcclxuICAgIH07XHJcblxyXG4gICAgLy8gR3JvdXBzIHRoZSBvYmplY3QncyB2YWx1ZXMgYnkgYSBjcml0ZXJpb24uIFBhc3MgZWl0aGVyIGEgc3RyaW5nIGF0dHJpYnV0ZVxyXG4gICAgLy8gdG8gZ3JvdXAgYnksIG9yIGEgZnVuY3Rpb24gdGhhdCByZXR1cm5zIHRoZSBjcml0ZXJpb24uXHJcbiAgICBfLmdyb3VwQnkgPSBncm91cChmdW5jdGlvbihyZXN1bHQsIHZhbHVlLCBrZXkpIHtcclxuICAgICAgICBpZiAoXy5oYXMocmVzdWx0LCBrZXkpKSByZXN1bHRba2V5XS5wdXNoKHZhbHVlKTtcclxuICAgICAgICBlbHNlIHJlc3VsdFtrZXldID0gW3ZhbHVlXTtcclxuICAgIH0pO1xyXG5cclxuICAgIC8vIEluZGV4ZXMgdGhlIG9iamVjdCdzIHZhbHVlcyBieSBhIGNyaXRlcmlvbiwgc2ltaWxhciB0byBgZ3JvdXBCeWAsIGJ1dCBmb3JcclxuICAgIC8vIHdoZW4geW91IGtub3cgdGhhdCB5b3VyIGluZGV4IHZhbHVlcyB3aWxsIGJlIHVuaXF1ZS5cclxuICAgIF8uaW5kZXhCeSA9IGdyb3VwKGZ1bmN0aW9uKHJlc3VsdCwgdmFsdWUsIGtleSkge1xyXG4gICAgICAgIHJlc3VsdFtrZXldID0gdmFsdWU7XHJcbiAgICB9KTtcclxuXHJcbiAgICAvLyBDb3VudHMgaW5zdGFuY2VzIG9mIGFuIG9iamVjdCB0aGF0IGdyb3VwIGJ5IGEgY2VydGFpbiBjcml0ZXJpb24uIFBhc3NcclxuICAgIC8vIGVpdGhlciBhIHN0cmluZyBhdHRyaWJ1dGUgdG8gY291bnQgYnksIG9yIGEgZnVuY3Rpb24gdGhhdCByZXR1cm5zIHRoZVxyXG4gICAgLy8gY3JpdGVyaW9uLlxyXG4gICAgXy5jb3VudEJ5ID0gZ3JvdXAoZnVuY3Rpb24ocmVzdWx0LCB2YWx1ZSwga2V5KSB7XHJcbiAgICAgICAgaWYgKF8uaGFzKHJlc3VsdCwga2V5KSkgcmVzdWx0W2tleV0rKztcclxuICAgICAgICBlbHNlIHJlc3VsdFtrZXldID0gMTtcclxuICAgIH0pO1xyXG5cclxuICAgIC8vIFNhZmVseSBjcmVhdGUgYSByZWFsLCBsaXZlIGFycmF5IGZyb20gYW55dGhpbmcgaXRlcmFibGUuXHJcbiAgICBfLnRvQXJyYXkgPSBmdW5jdGlvbihvYmopIHtcclxuICAgICAgICBpZiAoIW9iaikgcmV0dXJuIFtdO1xyXG4gICAgICAgIGlmIChfLmlzQXJyYXkob2JqKSkgcmV0dXJuIHNsaWNlLmNhbGwob2JqKTtcclxuICAgICAgICBpZiAoaXNBcnJheUxpa2Uob2JqKSkgcmV0dXJuIF8ubWFwKG9iaiwgXy5pZGVudGl0eSk7XHJcbiAgICAgICAgcmV0dXJuIF8udmFsdWVzKG9iaik7XHJcbiAgICB9O1xyXG5cclxuICAgIC8vIFJldHVybiB0aGUgbnVtYmVyIG9mIGVsZW1lbnRzIGluIGFuIG9iamVjdC5cclxuICAgIF8uc2l6ZSA9IGZ1bmN0aW9uKG9iaikge1xyXG4gICAgICAgIGlmIChvYmogPT0gbnVsbCkgcmV0dXJuIDA7XHJcbiAgICAgICAgcmV0dXJuIGlzQXJyYXlMaWtlKG9iaikgPyBvYmoubGVuZ3RoIDogXy5rZXlzKG9iaikubGVuZ3RoO1xyXG4gICAgfTtcclxuXHJcbiAgICAvLyBTcGxpdCBhIGNvbGxlY3Rpb24gaW50byB0d28gYXJyYXlzOiBvbmUgd2hvc2UgZWxlbWVudHMgYWxsIHNhdGlzZnkgdGhlIGdpdmVuXHJcbiAgICAvLyBwcmVkaWNhdGUsIGFuZCBvbmUgd2hvc2UgZWxlbWVudHMgYWxsIGRvIG5vdCBzYXRpc2Z5IHRoZSBwcmVkaWNhdGUuXHJcbiAgICBfLnBhcnRpdGlvbiA9IGZ1bmN0aW9uKG9iaiwgcHJlZGljYXRlLCBjb250ZXh0KSB7XHJcbiAgICAgICAgcHJlZGljYXRlID0gY2IocHJlZGljYXRlLCBjb250ZXh0KTtcclxuICAgICAgICB2YXIgcGFzcyA9IFtdLFxyXG4gICAgICAgICAgICBmYWlsID0gW107XHJcbiAgICAgICAgXy5lYWNoKG9iaiwgZnVuY3Rpb24odmFsdWUsIGtleSwgb2JqKSB7XHJcbiAgICAgICAgICAgIChwcmVkaWNhdGUodmFsdWUsIGtleSwgb2JqKSA/IHBhc3MgOiBmYWlsKS5wdXNoKHZhbHVlKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4gW3Bhc3MsIGZhaWxdO1xyXG4gICAgfTtcclxuXHJcbiAgICAvLyBBcnJheSBGdW5jdGlvbnNcclxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLVxyXG5cclxuICAgIC8vIEdldCB0aGUgZmlyc3QgZWxlbWVudCBvZiBhbiBhcnJheS4gUGFzc2luZyAqKm4qKiB3aWxsIHJldHVybiB0aGUgZmlyc3QgTlxyXG4gICAgLy8gdmFsdWVzIGluIHRoZSBhcnJheS4gQWxpYXNlZCBhcyBgaGVhZGAgYW5kIGB0YWtlYC4gVGhlICoqZ3VhcmQqKiBjaGVja1xyXG4gICAgLy8gYWxsb3dzIGl0IHRvIHdvcmsgd2l0aCBgXy5tYXBgLlxyXG4gICAgXy5maXJzdCA9IF8uaGVhZCA9IF8udGFrZSA9IGZ1bmN0aW9uKGFycmF5LCBuLCBndWFyZCkge1xyXG4gICAgICAgIGlmIChhcnJheSA9PSBudWxsKSByZXR1cm4gdm9pZCAwO1xyXG4gICAgICAgIGlmIChuID09IG51bGwgfHwgZ3VhcmQpIHJldHVybiBhcnJheVswXTtcclxuICAgICAgICByZXR1cm4gXy5pbml0aWFsKGFycmF5LCBhcnJheS5sZW5ndGggLSBuKTtcclxuICAgIH07XHJcblxyXG4gICAgLy8gUmV0dXJucyBldmVyeXRoaW5nIGJ1dCB0aGUgbGFzdCBlbnRyeSBvZiB0aGUgYXJyYXkuIEVzcGVjaWFsbHkgdXNlZnVsIG9uXHJcbiAgICAvLyB0aGUgYXJndW1lbnRzIG9iamVjdC4gUGFzc2luZyAqKm4qKiB3aWxsIHJldHVybiBhbGwgdGhlIHZhbHVlcyBpblxyXG4gICAgLy8gdGhlIGFycmF5LCBleGNsdWRpbmcgdGhlIGxhc3QgTi5cclxuICAgIF8uaW5pdGlhbCA9IGZ1bmN0aW9uKGFycmF5LCBuLCBndWFyZCkge1xyXG4gICAgICAgIHJldHVybiBzbGljZS5jYWxsKGFycmF5LCAwLCBNYXRoLm1heCgwLCBhcnJheS5sZW5ndGggLSAobiA9PSBudWxsIHx8IGd1YXJkID8gMSA6IG4pKSk7XHJcbiAgICB9O1xyXG5cclxuICAgIC8vIEdldCB0aGUgbGFzdCBlbGVtZW50IG9mIGFuIGFycmF5LiBQYXNzaW5nICoqbioqIHdpbGwgcmV0dXJuIHRoZSBsYXN0IE5cclxuICAgIC8vIHZhbHVlcyBpbiB0aGUgYXJyYXkuXHJcbiAgICBfLmxhc3QgPSBmdW5jdGlvbihhcnJheSwgbiwgZ3VhcmQpIHtcclxuICAgICAgICBpZiAoYXJyYXkgPT0gbnVsbCkgcmV0dXJuIHZvaWQgMDtcclxuICAgICAgICBpZiAobiA9PSBudWxsIHx8IGd1YXJkKSByZXR1cm4gYXJyYXlbYXJyYXkubGVuZ3RoIC0gMV07XHJcbiAgICAgICAgcmV0dXJuIF8ucmVzdChhcnJheSwgTWF0aC5tYXgoMCwgYXJyYXkubGVuZ3RoIC0gbikpO1xyXG4gICAgfTtcclxuXHJcbiAgICAvLyBSZXR1cm5zIGV2ZXJ5dGhpbmcgYnV0IHRoZSBmaXJzdCBlbnRyeSBvZiB0aGUgYXJyYXkuIEFsaWFzZWQgYXMgYHRhaWxgIGFuZCBgZHJvcGAuXHJcbiAgICAvLyBFc3BlY2lhbGx5IHVzZWZ1bCBvbiB0aGUgYXJndW1lbnRzIG9iamVjdC4gUGFzc2luZyBhbiAqKm4qKiB3aWxsIHJldHVyblxyXG4gICAgLy8gdGhlIHJlc3QgTiB2YWx1ZXMgaW4gdGhlIGFycmF5LlxyXG4gICAgXy5yZXN0ID0gXy50YWlsID0gXy5kcm9wID0gZnVuY3Rpb24oYXJyYXksIG4sIGd1YXJkKSB7XHJcbiAgICAgICAgcmV0dXJuIHNsaWNlLmNhbGwoYXJyYXksIG4gPT0gbnVsbCB8fCBndWFyZCA/IDEgOiBuKTtcclxuICAgIH07XHJcblxyXG4gICAgLy8gVHJpbSBvdXQgYWxsIGZhbHN5IHZhbHVlcyBmcm9tIGFuIGFycmF5LlxyXG4gICAgXy5jb21wYWN0ID0gZnVuY3Rpb24oYXJyYXkpIHtcclxuICAgICAgICByZXR1cm4gXy5maWx0ZXIoYXJyYXksIF8uaWRlbnRpdHkpO1xyXG4gICAgfTtcclxuXHJcbiAgICAvLyBJbnRlcm5hbCBpbXBsZW1lbnRhdGlvbiBvZiBhIHJlY3Vyc2l2ZSBgZmxhdHRlbmAgZnVuY3Rpb24uXHJcbiAgICB2YXIgZmxhdHRlbiA9IGZ1bmN0aW9uKGlucHV0LCBzaGFsbG93LCBzdHJpY3QsIHN0YXJ0SW5kZXgpIHtcclxuICAgICAgICB2YXIgb3V0cHV0ID0gW10sXHJcbiAgICAgICAgICAgIGlkeCA9IDA7XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IHN0YXJ0SW5kZXggfHwgMCwgbGVuZ3RoID0gZ2V0TGVuZ3RoKGlucHV0KTsgaSA8IGxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHZhciB2YWx1ZSA9IGlucHV0W2ldO1xyXG4gICAgICAgICAgICBpZiAoaXNBcnJheUxpa2UodmFsdWUpICYmIChfLmlzQXJyYXkodmFsdWUpIHx8IF8uaXNBcmd1bWVudHModmFsdWUpKSkge1xyXG4gICAgICAgICAgICAgICAgLy9mbGF0dGVuIGN1cnJlbnQgbGV2ZWwgb2YgYXJyYXkgb3IgYXJndW1lbnRzIG9iamVjdFxyXG4gICAgICAgICAgICAgICAgaWYgKCFzaGFsbG93KSB2YWx1ZSA9IGZsYXR0ZW4odmFsdWUsIHNoYWxsb3csIHN0cmljdCk7XHJcbiAgICAgICAgICAgICAgICB2YXIgaiA9IDAsXHJcbiAgICAgICAgICAgICAgICAgICAgbGVuID0gdmFsdWUubGVuZ3RoO1xyXG4gICAgICAgICAgICAgICAgb3V0cHV0Lmxlbmd0aCArPSBsZW47XHJcbiAgICAgICAgICAgICAgICB3aGlsZSAoaiA8IGxlbikge1xyXG4gICAgICAgICAgICAgICAgICAgIG91dHB1dFtpZHgrK10gPSB2YWx1ZVtqKytdO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKCFzdHJpY3QpIHtcclxuICAgICAgICAgICAgICAgIG91dHB1dFtpZHgrK10gPSB2YWx1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gb3V0cHV0O1xyXG4gICAgfTtcclxuXHJcbiAgICAvLyBGbGF0dGVuIG91dCBhbiBhcnJheSwgZWl0aGVyIHJlY3Vyc2l2ZWx5IChieSBkZWZhdWx0KSwgb3IganVzdCBvbmUgbGV2ZWwuXHJcbiAgICBfLmZsYXR0ZW4gPSBmdW5jdGlvbihhcnJheSwgc2hhbGxvdykge1xyXG4gICAgICAgIHJldHVybiBmbGF0dGVuKGFycmF5LCBzaGFsbG93LCBmYWxzZSk7XHJcbiAgICB9O1xyXG5cclxuICAgIC8vIFJldHVybiBhIHZlcnNpb24gb2YgdGhlIGFycmF5IHRoYXQgZG9lcyBub3QgY29udGFpbiB0aGUgc3BlY2lmaWVkIHZhbHVlKHMpLlxyXG4gICAgXy53aXRob3V0ID0gZnVuY3Rpb24oYXJyYXkpIHtcclxuICAgICAgICByZXR1cm4gXy5kaWZmZXJlbmNlKGFycmF5LCBzbGljZS5jYWxsKGFyZ3VtZW50cywgMSkpO1xyXG4gICAgfTtcclxuXHJcbiAgICAvLyBQcm9kdWNlIGEgZHVwbGljYXRlLWZyZWUgdmVyc2lvbiBvZiB0aGUgYXJyYXkuIElmIHRoZSBhcnJheSBoYXMgYWxyZWFkeVxyXG4gICAgLy8gYmVlbiBzb3J0ZWQsIHlvdSBoYXZlIHRoZSBvcHRpb24gb2YgdXNpbmcgYSBmYXN0ZXIgYWxnb3JpdGhtLlxyXG4gICAgLy8gQWxpYXNlZCBhcyBgdW5pcXVlYC5cclxuICAgIF8udW5pcSA9IF8udW5pcXVlID0gZnVuY3Rpb24oYXJyYXksIGlzU29ydGVkLCBpdGVyYXRlZSwgY29udGV4dCkge1xyXG4gICAgICAgIGlmICghXy5pc0Jvb2xlYW4oaXNTb3J0ZWQpKSB7XHJcbiAgICAgICAgICAgIGNvbnRleHQgPSBpdGVyYXRlZTtcclxuICAgICAgICAgICAgaXRlcmF0ZWUgPSBpc1NvcnRlZDtcclxuICAgICAgICAgICAgaXNTb3J0ZWQgPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGl0ZXJhdGVlICE9IG51bGwpIGl0ZXJhdGVlID0gY2IoaXRlcmF0ZWUsIGNvbnRleHQpO1xyXG4gICAgICAgIHZhciByZXN1bHQgPSBbXTtcclxuICAgICAgICB2YXIgc2VlbiA9IFtdO1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAwLCBsZW5ndGggPSBnZXRMZW5ndGgoYXJyYXkpOyBpIDwgbGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgdmFyIHZhbHVlID0gYXJyYXlbaV0sXHJcbiAgICAgICAgICAgICAgICBjb21wdXRlZCA9IGl0ZXJhdGVlID8gaXRlcmF0ZWUodmFsdWUsIGksIGFycmF5KSA6IHZhbHVlO1xyXG4gICAgICAgICAgICBpZiAoaXNTb3J0ZWQpIHtcclxuICAgICAgICAgICAgICAgIGlmICghaSB8fCBzZWVuICE9PSBjb21wdXRlZCkgcmVzdWx0LnB1c2godmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgc2VlbiA9IGNvbXB1dGVkO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGl0ZXJhdGVlKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoIV8uY29udGFpbnMoc2VlbiwgY29tcHV0ZWQpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2Vlbi5wdXNoKGNvbXB1dGVkKTtcclxuICAgICAgICAgICAgICAgICAgICByZXN1bHQucHVzaCh2YWx1ZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoIV8uY29udGFpbnMocmVzdWx0LCB2YWx1ZSkpIHtcclxuICAgICAgICAgICAgICAgIHJlc3VsdC5wdXNoKHZhbHVlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgfTtcclxuXHJcbiAgICAvLyBQcm9kdWNlIGFuIGFycmF5IHRoYXQgY29udGFpbnMgdGhlIHVuaW9uOiBlYWNoIGRpc3RpbmN0IGVsZW1lbnQgZnJvbSBhbGwgb2ZcclxuICAgIC8vIHRoZSBwYXNzZWQtaW4gYXJyYXlzLlxyXG4gICAgXy51bmlvbiA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHJldHVybiBfLnVuaXEoZmxhdHRlbihhcmd1bWVudHMsIHRydWUsIHRydWUpKTtcclxuICAgIH07XHJcblxyXG4gICAgLy8gUHJvZHVjZSBhbiBhcnJheSB0aGF0IGNvbnRhaW5zIGV2ZXJ5IGl0ZW0gc2hhcmVkIGJldHdlZW4gYWxsIHRoZVxyXG4gICAgLy8gcGFzc2VkLWluIGFycmF5cy5cclxuICAgIF8uaW50ZXJzZWN0aW9uID0gZnVuY3Rpb24oYXJyYXkpIHtcclxuICAgICAgICB2YXIgcmVzdWx0ID0gW107XHJcbiAgICAgICAgdmFyIGFyZ3NMZW5ndGggPSBhcmd1bWVudHMubGVuZ3RoO1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAwLCBsZW5ndGggPSBnZXRMZW5ndGgoYXJyYXkpOyBpIDwgbGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgdmFyIGl0ZW0gPSBhcnJheVtpXTtcclxuICAgICAgICAgICAgaWYgKF8uY29udGFpbnMocmVzdWx0LCBpdGVtKSkgY29udGludWU7XHJcbiAgICAgICAgICAgIGZvciAodmFyIGogPSAxOyBqIDwgYXJnc0xlbmd0aDsgaisrKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoIV8uY29udGFpbnMoYXJndW1lbnRzW2pdLCBpdGVtKSkgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGogPT09IGFyZ3NMZW5ndGgpIHJlc3VsdC5wdXNoKGl0ZW0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgfTtcclxuXHJcbiAgICAvLyBUYWtlIHRoZSBkaWZmZXJlbmNlIGJldHdlZW4gb25lIGFycmF5IGFuZCBhIG51bWJlciBvZiBvdGhlciBhcnJheXMuXHJcbiAgICAvLyBPbmx5IHRoZSBlbGVtZW50cyBwcmVzZW50IGluIGp1c3QgdGhlIGZpcnN0IGFycmF5IHdpbGwgcmVtYWluLlxyXG4gICAgXy5kaWZmZXJlbmNlID0gZnVuY3Rpb24oYXJyYXkpIHtcclxuICAgICAgICB2YXIgcmVzdCA9IGZsYXR0ZW4oYXJndW1lbnRzLCB0cnVlLCB0cnVlLCAxKTtcclxuICAgICAgICByZXR1cm4gXy5maWx0ZXIoYXJyYXksIGZ1bmN0aW9uKHZhbHVlKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAhXy5jb250YWlucyhyZXN0LCB2YWx1ZSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9O1xyXG5cclxuICAgIC8vIFppcCB0b2dldGhlciBtdWx0aXBsZSBsaXN0cyBpbnRvIGEgc2luZ2xlIGFycmF5IC0tIGVsZW1lbnRzIHRoYXQgc2hhcmVcclxuICAgIC8vIGFuIGluZGV4IGdvIHRvZ2V0aGVyLlxyXG4gICAgXy56aXAgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICByZXR1cm4gXy51bnppcChhcmd1bWVudHMpO1xyXG4gICAgfTtcclxuXHJcbiAgICAvLyBDb21wbGVtZW50IG9mIF8uemlwLiBVbnppcCBhY2NlcHRzIGFuIGFycmF5IG9mIGFycmF5cyBhbmQgZ3JvdXBzXHJcbiAgICAvLyBlYWNoIGFycmF5J3MgZWxlbWVudHMgb24gc2hhcmVkIGluZGljZXNcclxuICAgIF8udW56aXAgPSBmdW5jdGlvbihhcnJheSkge1xyXG4gICAgICAgIHZhciBsZW5ndGggPSBhcnJheSAmJiBfLm1heChhcnJheSwgZ2V0TGVuZ3RoKS5sZW5ndGggfHwgMDtcclxuICAgICAgICB2YXIgcmVzdWx0ID0gQXJyYXkobGVuZ3RoKTtcclxuXHJcbiAgICAgICAgZm9yICh2YXIgaW5kZXggPSAwOyBpbmRleCA8IGxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICAgICAgICByZXN1bHRbaW5kZXhdID0gXy5wbHVjayhhcnJheSwgaW5kZXgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgfTtcclxuXHJcbiAgICAvLyBDb252ZXJ0cyBsaXN0cyBpbnRvIG9iamVjdHMuIFBhc3MgZWl0aGVyIGEgc2luZ2xlIGFycmF5IG9mIGBba2V5LCB2YWx1ZV1gXHJcbiAgICAvLyBwYWlycywgb3IgdHdvIHBhcmFsbGVsIGFycmF5cyBvZiB0aGUgc2FtZSBsZW5ndGggLS0gb25lIG9mIGtleXMsIGFuZCBvbmUgb2ZcclxuICAgIC8vIHRoZSBjb3JyZXNwb25kaW5nIHZhbHVlcy5cclxuICAgIF8ub2JqZWN0ID0gZnVuY3Rpb24obGlzdCwgdmFsdWVzKSB7XHJcbiAgICAgICAgdmFyIHJlc3VsdCA9IHt9O1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAwLCBsZW5ndGggPSBnZXRMZW5ndGgobGlzdCk7IGkgPCBsZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAodmFsdWVzKSB7XHJcbiAgICAgICAgICAgICAgICByZXN1bHRbbGlzdFtpXV0gPSB2YWx1ZXNbaV07XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICByZXN1bHRbbGlzdFtpXVswXV0gPSBsaXN0W2ldWzFdO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICB9O1xyXG5cclxuICAgIC8vIEdlbmVyYXRvciBmdW5jdGlvbiB0byBjcmVhdGUgdGhlIGZpbmRJbmRleCBhbmQgZmluZExhc3RJbmRleCBmdW5jdGlvbnNcclxuICAgIGZ1bmN0aW9uIGNyZWF0ZVByZWRpY2F0ZUluZGV4RmluZGVyKGRpcikge1xyXG4gICAgICAgIHJldHVybiBmdW5jdGlvbihhcnJheSwgcHJlZGljYXRlLCBjb250ZXh0KSB7XHJcbiAgICAgICAgICAgIHByZWRpY2F0ZSA9IGNiKHByZWRpY2F0ZSwgY29udGV4dCk7XHJcbiAgICAgICAgICAgIHZhciBsZW5ndGggPSBnZXRMZW5ndGgoYXJyYXkpO1xyXG4gICAgICAgICAgICB2YXIgaW5kZXggPSBkaXIgPiAwID8gMCA6IGxlbmd0aCAtIDE7XHJcbiAgICAgICAgICAgIGZvciAoOyBpbmRleCA+PSAwICYmIGluZGV4IDwgbGVuZ3RoOyBpbmRleCArPSBkaXIpIHtcclxuICAgICAgICAgICAgICAgIGlmIChwcmVkaWNhdGUoYXJyYXlbaW5kZXhdLCBpbmRleCwgYXJyYXkpKSByZXR1cm4gaW5kZXg7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIC0xO1xyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgLy8gUmV0dXJucyB0aGUgZmlyc3QgaW5kZXggb24gYW4gYXJyYXktbGlrZSB0aGF0IHBhc3NlcyBhIHByZWRpY2F0ZSB0ZXN0XHJcbiAgICBfLmZpbmRJbmRleCA9IGNyZWF0ZVByZWRpY2F0ZUluZGV4RmluZGVyKDEpO1xyXG4gICAgXy5maW5kTGFzdEluZGV4ID0gY3JlYXRlUHJlZGljYXRlSW5kZXhGaW5kZXIoLTEpO1xyXG5cclxuICAgIC8vIFVzZSBhIGNvbXBhcmF0b3IgZnVuY3Rpb24gdG8gZmlndXJlIG91dCB0aGUgc21hbGxlc3QgaW5kZXggYXQgd2hpY2hcclxuICAgIC8vIGFuIG9iamVjdCBzaG91bGQgYmUgaW5zZXJ0ZWQgc28gYXMgdG8gbWFpbnRhaW4gb3JkZXIuIFVzZXMgYmluYXJ5IHNlYXJjaC5cclxuICAgIF8uc29ydGVkSW5kZXggPSBmdW5jdGlvbihhcnJheSwgb2JqLCBpdGVyYXRlZSwgY29udGV4dCkge1xyXG4gICAgICAgIGl0ZXJhdGVlID0gY2IoaXRlcmF0ZWUsIGNvbnRleHQsIDEpO1xyXG4gICAgICAgIHZhciB2YWx1ZSA9IGl0ZXJhdGVlKG9iaik7XHJcbiAgICAgICAgdmFyIGxvdyA9IDAsXHJcbiAgICAgICAgICAgIGhpZ2ggPSBnZXRMZW5ndGgoYXJyYXkpO1xyXG4gICAgICAgIHdoaWxlIChsb3cgPCBoaWdoKSB7XHJcbiAgICAgICAgICAgIHZhciBtaWQgPSBNYXRoLmZsb29yKChsb3cgKyBoaWdoKSAvIDIpO1xyXG4gICAgICAgICAgICBpZiAoaXRlcmF0ZWUoYXJyYXlbbWlkXSkgPCB2YWx1ZSkgbG93ID0gbWlkICsgMTtcclxuICAgICAgICAgICAgZWxzZSBoaWdoID0gbWlkO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbG93O1xyXG4gICAgfTtcclxuXHJcbiAgICAvLyBHZW5lcmF0b3IgZnVuY3Rpb24gdG8gY3JlYXRlIHRoZSBpbmRleE9mIGFuZCBsYXN0SW5kZXhPZiBmdW5jdGlvbnNcclxuICAgIGZ1bmN0aW9uIGNyZWF0ZUluZGV4RmluZGVyKGRpciwgcHJlZGljYXRlRmluZCwgc29ydGVkSW5kZXgpIHtcclxuICAgICAgICByZXR1cm4gZnVuY3Rpb24oYXJyYXksIGl0ZW0sIGlkeCkge1xyXG4gICAgICAgICAgICB2YXIgaSA9IDAsXHJcbiAgICAgICAgICAgICAgICBsZW5ndGggPSBnZXRMZW5ndGgoYXJyYXkpO1xyXG4gICAgICAgICAgICBpZiAodHlwZW9mIGlkeCA9PSAnbnVtYmVyJykge1xyXG4gICAgICAgICAgICAgICAgaWYgKGRpciA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICBpID0gaWR4ID49IDAgPyBpZHggOiBNYXRoLm1heChpZHggKyBsZW5ndGgsIGkpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBsZW5ndGggPSBpZHggPj0gMCA/IE1hdGgubWluKGlkeCArIDEsIGxlbmd0aCkgOiBpZHggKyBsZW5ndGggKyAxO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHNvcnRlZEluZGV4ICYmIGlkeCAmJiBsZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgIGlkeCA9IHNvcnRlZEluZGV4KGFycmF5LCBpdGVtKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBhcnJheVtpZHhdID09PSBpdGVtID8gaWR4IDogLTE7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGl0ZW0gIT09IGl0ZW0pIHtcclxuICAgICAgICAgICAgICAgIGlkeCA9IHByZWRpY2F0ZUZpbmQoc2xpY2UuY2FsbChhcnJheSwgaSwgbGVuZ3RoKSwgXy5pc05hTik7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gaWR4ID49IDAgPyBpZHggKyBpIDogLTE7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZm9yIChpZHggPSBkaXIgPiAwID8gaSA6IGxlbmd0aCAtIDE7IGlkeCA+PSAwICYmIGlkeCA8IGxlbmd0aDsgaWR4ICs9IGRpcikge1xyXG4gICAgICAgICAgICAgICAgaWYgKGFycmF5W2lkeF0gPT09IGl0ZW0pIHJldHVybiBpZHg7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIC0xO1xyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgLy8gUmV0dXJuIHRoZSBwb3NpdGlvbiBvZiB0aGUgZmlyc3Qgb2NjdXJyZW5jZSBvZiBhbiBpdGVtIGluIGFuIGFycmF5LFxyXG4gICAgLy8gb3IgLTEgaWYgdGhlIGl0ZW0gaXMgbm90IGluY2x1ZGVkIGluIHRoZSBhcnJheS5cclxuICAgIC8vIElmIHRoZSBhcnJheSBpcyBsYXJnZSBhbmQgYWxyZWFkeSBpbiBzb3J0IG9yZGVyLCBwYXNzIGB0cnVlYFxyXG4gICAgLy8gZm9yICoqaXNTb3J0ZWQqKiB0byB1c2UgYmluYXJ5IHNlYXJjaC5cclxuICAgIF8uaW5kZXhPZiA9IGNyZWF0ZUluZGV4RmluZGVyKDEsIF8uZmluZEluZGV4LCBfLnNvcnRlZEluZGV4KTtcclxuICAgIF8ubGFzdEluZGV4T2YgPSBjcmVhdGVJbmRleEZpbmRlcigtMSwgXy5maW5kTGFzdEluZGV4KTtcclxuXHJcbiAgICAvLyBHZW5lcmF0ZSBhbiBpbnRlZ2VyIEFycmF5IGNvbnRhaW5pbmcgYW4gYXJpdGhtZXRpYyBwcm9ncmVzc2lvbi4gQSBwb3J0IG9mXHJcbiAgICAvLyB0aGUgbmF0aXZlIFB5dGhvbiBgcmFuZ2UoKWAgZnVuY3Rpb24uIFNlZVxyXG4gICAgLy8gW3RoZSBQeXRob24gZG9jdW1lbnRhdGlvbl0oaHR0cDovL2RvY3MucHl0aG9uLm9yZy9saWJyYXJ5L2Z1bmN0aW9ucy5odG1sI3JhbmdlKS5cclxuICAgIF8ucmFuZ2UgPSBmdW5jdGlvbihzdGFydCwgc3RvcCwgc3RlcCkge1xyXG4gICAgICAgIGlmIChzdG9wID09IG51bGwpIHtcclxuICAgICAgICAgICAgc3RvcCA9IHN0YXJ0IHx8IDA7XHJcbiAgICAgICAgICAgIHN0YXJ0ID0gMDtcclxuICAgICAgICB9XHJcbiAgICAgICAgc3RlcCA9IHN0ZXAgfHwgMTtcclxuXHJcbiAgICAgICAgdmFyIGxlbmd0aCA9IE1hdGgubWF4KE1hdGguY2VpbCgoc3RvcCAtIHN0YXJ0KSAvIHN0ZXApLCAwKTtcclxuICAgICAgICB2YXIgcmFuZ2UgPSBBcnJheShsZW5ndGgpO1xyXG5cclxuICAgICAgICBmb3IgKHZhciBpZHggPSAwOyBpZHggPCBsZW5ndGg7IGlkeCsrLCBzdGFydCArPSBzdGVwKSB7XHJcbiAgICAgICAgICAgIHJhbmdlW2lkeF0gPSBzdGFydDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiByYW5nZTtcclxuICAgIH07XHJcblxyXG4gICAgLy8gRnVuY3Rpb24gKGFoZW0pIEZ1bmN0aW9uc1xyXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tXHJcblxyXG4gICAgLy8gRGV0ZXJtaW5lcyB3aGV0aGVyIHRvIGV4ZWN1dGUgYSBmdW5jdGlvbiBhcyBhIGNvbnN0cnVjdG9yXHJcbiAgICAvLyBvciBhIG5vcm1hbCBmdW5jdGlvbiB3aXRoIHRoZSBwcm92aWRlZCBhcmd1bWVudHNcclxuICAgIHZhciBleGVjdXRlQm91bmQgPSBmdW5jdGlvbihzb3VyY2VGdW5jLCBib3VuZEZ1bmMsIGNvbnRleHQsIGNhbGxpbmdDb250ZXh0LCBhcmdzKSB7XHJcbiAgICAgICAgaWYgKCEoY2FsbGluZ0NvbnRleHQgaW5zdGFuY2VvZiBib3VuZEZ1bmMpKSByZXR1cm4gc291cmNlRnVuYy5hcHBseShjb250ZXh0LCBhcmdzKTtcclxuICAgICAgICB2YXIgc2VsZiA9IGJhc2VDcmVhdGUoc291cmNlRnVuYy5wcm90b3R5cGUpO1xyXG4gICAgICAgIHZhciByZXN1bHQgPSBzb3VyY2VGdW5jLmFwcGx5KHNlbGYsIGFyZ3MpO1xyXG4gICAgICAgIGlmIChfLmlzT2JqZWN0KHJlc3VsdCkpIHJldHVybiByZXN1bHQ7XHJcbiAgICAgICAgcmV0dXJuIHNlbGY7XHJcbiAgICB9O1xyXG5cclxuICAgIC8vIENyZWF0ZSBhIGZ1bmN0aW9uIGJvdW5kIHRvIGEgZ2l2ZW4gb2JqZWN0IChhc3NpZ25pbmcgYHRoaXNgLCBhbmQgYXJndW1lbnRzLFxyXG4gICAgLy8gb3B0aW9uYWxseSkuIERlbGVnYXRlcyB0byAqKkVDTUFTY3JpcHQgNSoqJ3MgbmF0aXZlIGBGdW5jdGlvbi5iaW5kYCBpZlxyXG4gICAgLy8gYXZhaWxhYmxlLlxyXG4gICAgXy5iaW5kID0gZnVuY3Rpb24oZnVuYywgY29udGV4dCkge1xyXG4gICAgICAgIGlmIChuYXRpdmVCaW5kICYmIGZ1bmMuYmluZCA9PT0gbmF0aXZlQmluZCkgcmV0dXJuIG5hdGl2ZUJpbmQuYXBwbHkoZnVuYywgc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpKTtcclxuICAgICAgICBpZiAoIV8uaXNGdW5jdGlvbihmdW5jKSkgdGhyb3cgbmV3IFR5cGVFcnJvcignQmluZCBtdXN0IGJlIGNhbGxlZCBvbiBhIGZ1bmN0aW9uJyk7XHJcbiAgICAgICAgdmFyIGFyZ3MgPSBzbGljZS5jYWxsKGFyZ3VtZW50cywgMik7XHJcbiAgICAgICAgdmFyIGJvdW5kID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBleGVjdXRlQm91bmQoZnVuYywgYm91bmQsIGNvbnRleHQsIHRoaXMsIGFyZ3MuY29uY2F0KHNsaWNlLmNhbGwoYXJndW1lbnRzKSkpO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgcmV0dXJuIGJvdW5kO1xyXG4gICAgfTtcclxuXHJcbiAgICAvLyBQYXJ0aWFsbHkgYXBwbHkgYSBmdW5jdGlvbiBieSBjcmVhdGluZyBhIHZlcnNpb24gdGhhdCBoYXMgaGFkIHNvbWUgb2YgaXRzXHJcbiAgICAvLyBhcmd1bWVudHMgcHJlLWZpbGxlZCwgd2l0aG91dCBjaGFuZ2luZyBpdHMgZHluYW1pYyBgdGhpc2AgY29udGV4dC4gXyBhY3RzXHJcbiAgICAvLyBhcyBhIHBsYWNlaG9sZGVyLCBhbGxvd2luZyBhbnkgY29tYmluYXRpb24gb2YgYXJndW1lbnRzIHRvIGJlIHByZS1maWxsZWQuXHJcbiAgICBfLnBhcnRpYWwgPSBmdW5jdGlvbihmdW5jKSB7XHJcbiAgICAgICAgdmFyIGJvdW5kQXJncyA9IHNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKTtcclxuICAgICAgICB2YXIgYm91bmQgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgdmFyIHBvc2l0aW9uID0gMCxcclxuICAgICAgICAgICAgICAgIGxlbmd0aCA9IGJvdW5kQXJncy5sZW5ndGg7XHJcbiAgICAgICAgICAgIHZhciBhcmdzID0gQXJyYXkobGVuZ3RoKTtcclxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgYXJnc1tpXSA9IGJvdW5kQXJnc1tpXSA9PT0gXyA/IGFyZ3VtZW50c1twb3NpdGlvbisrXSA6IGJvdW5kQXJnc1tpXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB3aGlsZSAocG9zaXRpb24gPCBhcmd1bWVudHMubGVuZ3RoKSBhcmdzLnB1c2goYXJndW1lbnRzW3Bvc2l0aW9uKytdKTtcclxuICAgICAgICAgICAgcmV0dXJuIGV4ZWN1dGVCb3VuZChmdW5jLCBib3VuZCwgdGhpcywgdGhpcywgYXJncyk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICByZXR1cm4gYm91bmQ7XHJcbiAgICB9O1xyXG5cclxuICAgIC8vIEJpbmQgYSBudW1iZXIgb2YgYW4gb2JqZWN0J3MgbWV0aG9kcyB0byB0aGF0IG9iamVjdC4gUmVtYWluaW5nIGFyZ3VtZW50c1xyXG4gICAgLy8gYXJlIHRoZSBtZXRob2QgbmFtZXMgdG8gYmUgYm91bmQuIFVzZWZ1bCBmb3IgZW5zdXJpbmcgdGhhdCBhbGwgY2FsbGJhY2tzXHJcbiAgICAvLyBkZWZpbmVkIG9uIGFuIG9iamVjdCBiZWxvbmcgdG8gaXQuXHJcbiAgICBfLmJpbmRBbGwgPSBmdW5jdGlvbihvYmopIHtcclxuICAgICAgICB2YXIgaSwgbGVuZ3RoID0gYXJndW1lbnRzLmxlbmd0aCxcclxuICAgICAgICAgICAga2V5O1xyXG4gICAgICAgIGlmIChsZW5ndGggPD0gMSkgdGhyb3cgbmV3IEVycm9yKCdiaW5kQWxsIG11c3QgYmUgcGFzc2VkIGZ1bmN0aW9uIG5hbWVzJyk7XHJcbiAgICAgICAgZm9yIChpID0gMTsgaSA8IGxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGtleSA9IGFyZ3VtZW50c1tpXTtcclxuICAgICAgICAgICAgb2JqW2tleV0gPSBfLmJpbmQob2JqW2tleV0sIG9iaik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBvYmo7XHJcbiAgICB9O1xyXG5cclxuICAgIC8vIE1lbW9pemUgYW4gZXhwZW5zaXZlIGZ1bmN0aW9uIGJ5IHN0b3JpbmcgaXRzIHJlc3VsdHMuXHJcbiAgICBfLm1lbW9pemUgPSBmdW5jdGlvbihmdW5jLCBoYXNoZXIpIHtcclxuICAgICAgICB2YXIgbWVtb2l6ZSA9IGZ1bmN0aW9uKGtleSkge1xyXG4gICAgICAgICAgICB2YXIgY2FjaGUgPSBtZW1vaXplLmNhY2hlO1xyXG4gICAgICAgICAgICB2YXIgYWRkcmVzcyA9ICcnICsgKGhhc2hlciA/IGhhc2hlci5hcHBseSh0aGlzLCBhcmd1bWVudHMpIDoga2V5KTtcclxuICAgICAgICAgICAgaWYgKCFfLmhhcyhjYWNoZSwgYWRkcmVzcykpIGNhY2hlW2FkZHJlc3NdID0gZnVuYy5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xyXG4gICAgICAgICAgICByZXR1cm4gY2FjaGVbYWRkcmVzc107XHJcbiAgICAgICAgfTtcclxuICAgICAgICBtZW1vaXplLmNhY2hlID0ge307XHJcbiAgICAgICAgcmV0dXJuIG1lbW9pemU7XHJcbiAgICB9O1xyXG5cclxuICAgIC8vIERlbGF5cyBhIGZ1bmN0aW9uIGZvciB0aGUgZ2l2ZW4gbnVtYmVyIG9mIG1pbGxpc2Vjb25kcywgYW5kIHRoZW4gY2FsbHNcclxuICAgIC8vIGl0IHdpdGggdGhlIGFyZ3VtZW50cyBzdXBwbGllZC5cclxuICAgIF8uZGVsYXkgPSBmdW5jdGlvbihmdW5jLCB3YWl0KSB7XHJcbiAgICAgICAgdmFyIGFyZ3MgPSBzbGljZS5jYWxsKGFyZ3VtZW50cywgMik7XHJcbiAgICAgICAgcmV0dXJuIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmdW5jLmFwcGx5KG51bGwsIGFyZ3MpO1xyXG4gICAgICAgIH0sIHdhaXQpO1xyXG4gICAgfTtcclxuXHJcbiAgICAvLyBEZWZlcnMgYSBmdW5jdGlvbiwgc2NoZWR1bGluZyBpdCB0byBydW4gYWZ0ZXIgdGhlIGN1cnJlbnQgY2FsbCBzdGFjayBoYXNcclxuICAgIC8vIGNsZWFyZWQuXHJcbiAgICBfLmRlZmVyID0gXy5wYXJ0aWFsKF8uZGVsYXksIF8sIDEpO1xyXG5cclxuICAgIC8vIFJldHVybnMgYSBmdW5jdGlvbiwgdGhhdCwgd2hlbiBpbnZva2VkLCB3aWxsIG9ubHkgYmUgdHJpZ2dlcmVkIGF0IG1vc3Qgb25jZVxyXG4gICAgLy8gZHVyaW5nIGEgZ2l2ZW4gd2luZG93IG9mIHRpbWUuIE5vcm1hbGx5LCB0aGUgdGhyb3R0bGVkIGZ1bmN0aW9uIHdpbGwgcnVuXHJcbiAgICAvLyBhcyBtdWNoIGFzIGl0IGNhbiwgd2l0aG91dCBldmVyIGdvaW5nIG1vcmUgdGhhbiBvbmNlIHBlciBgd2FpdGAgZHVyYXRpb247XHJcbiAgICAvLyBidXQgaWYgeW91J2QgbGlrZSB0byBkaXNhYmxlIHRoZSBleGVjdXRpb24gb24gdGhlIGxlYWRpbmcgZWRnZSwgcGFzc1xyXG4gICAgLy8gYHtsZWFkaW5nOiBmYWxzZX1gLiBUbyBkaXNhYmxlIGV4ZWN1dGlvbiBvbiB0aGUgdHJhaWxpbmcgZWRnZSwgZGl0dG8uXHJcbiAgICBfLnRocm90dGxlID0gZnVuY3Rpb24oZnVuYywgd2FpdCwgb3B0aW9ucykge1xyXG4gICAgICAgIHZhciBjb250ZXh0LCBhcmdzLCByZXN1bHQ7XHJcbiAgICAgICAgdmFyIHRpbWVvdXQgPSBudWxsO1xyXG4gICAgICAgIHZhciBwcmV2aW91cyA9IDA7XHJcbiAgICAgICAgaWYgKCFvcHRpb25zKSBvcHRpb25zID0ge307XHJcbiAgICAgICAgdmFyIGxhdGVyID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHByZXZpb3VzID0gb3B0aW9ucy5sZWFkaW5nID09PSBmYWxzZSA/IDAgOiBfLm5vdygpO1xyXG4gICAgICAgICAgICB0aW1lb3V0ID0gbnVsbDtcclxuICAgICAgICAgICAgcmVzdWx0ID0gZnVuYy5hcHBseShjb250ZXh0LCBhcmdzKTtcclxuICAgICAgICAgICAgaWYgKCF0aW1lb3V0KSBjb250ZXh0ID0gYXJncyA9IG51bGw7XHJcbiAgICAgICAgfTtcclxuICAgICAgICByZXR1cm4gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHZhciBub3cgPSBfLm5vdygpO1xyXG4gICAgICAgICAgICBpZiAoIXByZXZpb3VzICYmIG9wdGlvbnMubGVhZGluZyA9PT0gZmFsc2UpIHByZXZpb3VzID0gbm93O1xyXG4gICAgICAgICAgICB2YXIgcmVtYWluaW5nID0gd2FpdCAtIChub3cgLSBwcmV2aW91cyk7XHJcbiAgICAgICAgICAgIGNvbnRleHQgPSB0aGlzO1xyXG4gICAgICAgICAgICBhcmdzID0gYXJndW1lbnRzO1xyXG4gICAgICAgICAgICBpZiAocmVtYWluaW5nIDw9IDAgfHwgcmVtYWluaW5nID4gd2FpdCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRpbWVvdXQpIHtcclxuICAgICAgICAgICAgICAgICAgICBjbGVhclRpbWVvdXQodGltZW91dCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGltZW91dCA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBwcmV2aW91cyA9IG5vdztcclxuICAgICAgICAgICAgICAgIHJlc3VsdCA9IGZ1bmMuYXBwbHkoY29udGV4dCwgYXJncyk7XHJcbiAgICAgICAgICAgICAgICBpZiAoIXRpbWVvdXQpIGNvbnRleHQgPSBhcmdzID0gbnVsbDtcclxuICAgICAgICAgICAgfSBlbHNlIGlmICghdGltZW91dCAmJiBvcHRpb25zLnRyYWlsaW5nICE9PSBmYWxzZSkge1xyXG4gICAgICAgICAgICAgICAgdGltZW91dCA9IHNldFRpbWVvdXQobGF0ZXIsIHJlbWFpbmluZyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgICAgICB9O1xyXG4gICAgfTtcclxuXHJcbiAgICAvLyBSZXR1cm5zIGEgZnVuY3Rpb24sIHRoYXQsIGFzIGxvbmcgYXMgaXQgY29udGludWVzIHRvIGJlIGludm9rZWQsIHdpbGwgbm90XHJcbiAgICAvLyBiZSB0cmlnZ2VyZWQuIFRoZSBmdW5jdGlvbiB3aWxsIGJlIGNhbGxlZCBhZnRlciBpdCBzdG9wcyBiZWluZyBjYWxsZWQgZm9yXHJcbiAgICAvLyBOIG1pbGxpc2Vjb25kcy4gSWYgYGltbWVkaWF0ZWAgaXMgcGFzc2VkLCB0cmlnZ2VyIHRoZSBmdW5jdGlvbiBvbiB0aGVcclxuICAgIC8vIGxlYWRpbmcgZWRnZSwgaW5zdGVhZCBvZiB0aGUgdHJhaWxpbmcuXHJcbiAgICBfLmRlYm91bmNlID0gZnVuY3Rpb24oZnVuYywgd2FpdCwgaW1tZWRpYXRlKSB7XHJcbiAgICAgICAgdmFyIHRpbWVvdXQsIGFyZ3MsIGNvbnRleHQsIHRpbWVzdGFtcCwgcmVzdWx0O1xyXG5cclxuICAgICAgICB2YXIgbGF0ZXIgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgdmFyIGxhc3QgPSBfLm5vdygpIC0gdGltZXN0YW1wO1xyXG5cclxuICAgICAgICAgICAgaWYgKGxhc3QgPCB3YWl0ICYmIGxhc3QgPj0gMCkge1xyXG4gICAgICAgICAgICAgICAgdGltZW91dCA9IHNldFRpbWVvdXQobGF0ZXIsIHdhaXQgLSBsYXN0KTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRpbWVvdXQgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgaWYgKCFpbW1lZGlhdGUpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXN1bHQgPSBmdW5jLmFwcGx5KGNvbnRleHQsIGFyZ3MpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICghdGltZW91dCkgY29udGV4dCA9IGFyZ3MgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBjb250ZXh0ID0gdGhpcztcclxuICAgICAgICAgICAgYXJncyA9IGFyZ3VtZW50cztcclxuICAgICAgICAgICAgdGltZXN0YW1wID0gXy5ub3coKTtcclxuICAgICAgICAgICAgdmFyIGNhbGxOb3cgPSBpbW1lZGlhdGUgJiYgIXRpbWVvdXQ7XHJcbiAgICAgICAgICAgIGlmICghdGltZW91dCkgdGltZW91dCA9IHNldFRpbWVvdXQobGF0ZXIsIHdhaXQpO1xyXG4gICAgICAgICAgICBpZiAoY2FsbE5vdykge1xyXG4gICAgICAgICAgICAgICAgcmVzdWx0ID0gZnVuYy5hcHBseShjb250ZXh0LCBhcmdzKTtcclxuICAgICAgICAgICAgICAgIGNvbnRleHQgPSBhcmdzID0gbnVsbDtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgICAgICB9O1xyXG4gICAgfTtcclxuXHJcbiAgICAvLyBSZXR1cm5zIHRoZSBmaXJzdCBmdW5jdGlvbiBwYXNzZWQgYXMgYW4gYXJndW1lbnQgdG8gdGhlIHNlY29uZCxcclxuICAgIC8vIGFsbG93aW5nIHlvdSB0byBhZGp1c3QgYXJndW1lbnRzLCBydW4gY29kZSBiZWZvcmUgYW5kIGFmdGVyLCBhbmRcclxuICAgIC8vIGNvbmRpdGlvbmFsbHkgZXhlY3V0ZSB0aGUgb3JpZ2luYWwgZnVuY3Rpb24uXHJcbiAgICBfLndyYXAgPSBmdW5jdGlvbihmdW5jLCB3cmFwcGVyKSB7XHJcbiAgICAgICAgcmV0dXJuIF8ucGFydGlhbCh3cmFwcGVyLCBmdW5jKTtcclxuICAgIH07XHJcblxyXG4gICAgLy8gUmV0dXJucyBhIG5lZ2F0ZWQgdmVyc2lvbiBvZiB0aGUgcGFzc2VkLWluIHByZWRpY2F0ZS5cclxuICAgIF8ubmVnYXRlID0gZnVuY3Rpb24ocHJlZGljYXRlKSB7XHJcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gIXByZWRpY2F0ZS5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xyXG4gICAgICAgIH07XHJcbiAgICB9O1xyXG5cclxuICAgIC8vIFJldHVybnMgYSBmdW5jdGlvbiB0aGF0IGlzIHRoZSBjb21wb3NpdGlvbiBvZiBhIGxpc3Qgb2YgZnVuY3Rpb25zLCBlYWNoXHJcbiAgICAvLyBjb25zdW1pbmcgdGhlIHJldHVybiB2YWx1ZSBvZiB0aGUgZnVuY3Rpb24gdGhhdCBmb2xsb3dzLlxyXG4gICAgXy5jb21wb3NlID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgdmFyIGFyZ3MgPSBhcmd1bWVudHM7XHJcbiAgICAgICAgdmFyIHN0YXJ0ID0gYXJncy5sZW5ndGggLSAxO1xyXG4gICAgICAgIHJldHVybiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgdmFyIGkgPSBzdGFydDtcclxuICAgICAgICAgICAgdmFyIHJlc3VsdCA9IGFyZ3Nbc3RhcnRdLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XHJcbiAgICAgICAgICAgIHdoaWxlIChpLS0pIHJlc3VsdCA9IGFyZ3NbaV0uY2FsbCh0aGlzLCByZXN1bHQpO1xyXG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgICAgIH07XHJcbiAgICB9O1xyXG5cclxuICAgIC8vIFJldHVybnMgYSBmdW5jdGlvbiB0aGF0IHdpbGwgb25seSBiZSBleGVjdXRlZCBvbiBhbmQgYWZ0ZXIgdGhlIE50aCBjYWxsLlxyXG4gICAgXy5hZnRlciA9IGZ1bmN0aW9uKHRpbWVzLCBmdW5jKSB7XHJcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBpZiAoLS10aW1lcyA8IDEpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmdW5jLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgfTtcclxuXHJcbiAgICAvLyBSZXR1cm5zIGEgZnVuY3Rpb24gdGhhdCB3aWxsIG9ubHkgYmUgZXhlY3V0ZWQgdXAgdG8gKGJ1dCBub3QgaW5jbHVkaW5nKSB0aGUgTnRoIGNhbGwuXHJcbiAgICBfLmJlZm9yZSA9IGZ1bmN0aW9uKHRpbWVzLCBmdW5jKSB7XHJcbiAgICAgICAgdmFyIG1lbW87XHJcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBpZiAoLS10aW1lcyA+IDApIHtcclxuICAgICAgICAgICAgICAgIG1lbW8gPSBmdW5jLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHRpbWVzIDw9IDEpIGZ1bmMgPSBudWxsO1xyXG4gICAgICAgICAgICByZXR1cm4gbWVtbztcclxuICAgICAgICB9O1xyXG4gICAgfTtcclxuXHJcbiAgICAvLyBSZXR1cm5zIGEgZnVuY3Rpb24gdGhhdCB3aWxsIGJlIGV4ZWN1dGVkIGF0IG1vc3Qgb25lIHRpbWUsIG5vIG1hdHRlciBob3dcclxuICAgIC8vIG9mdGVuIHlvdSBjYWxsIGl0LiBVc2VmdWwgZm9yIGxhenkgaW5pdGlhbGl6YXRpb24uXHJcbiAgICBfLm9uY2UgPSBfLnBhcnRpYWwoXy5iZWZvcmUsIDIpO1xyXG5cclxuICAgIC8vIE9iamVjdCBGdW5jdGlvbnNcclxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS1cclxuXHJcbiAgICAvLyBLZXlzIGluIElFIDwgOSB0aGF0IHdvbid0IGJlIGl0ZXJhdGVkIGJ5IGBmb3Iga2V5IGluIC4uLmAgYW5kIHRodXMgbWlzc2VkLlxyXG4gICAgdmFyIGhhc0VudW1CdWcgPSAheyB0b1N0cmluZzogbnVsbCB9LnByb3BlcnR5SXNFbnVtZXJhYmxlKCd0b1N0cmluZycpO1xyXG4gICAgdmFyIG5vbkVudW1lcmFibGVQcm9wcyA9IFsndmFsdWVPZicsICdpc1Byb3RvdHlwZU9mJywgJ3RvU3RyaW5nJyxcclxuICAgICAgICAncHJvcGVydHlJc0VudW1lcmFibGUnLCAnaGFzT3duUHJvcGVydHknLCAndG9Mb2NhbGVTdHJpbmcnXHJcbiAgICBdO1xyXG5cclxuICAgIGZ1bmN0aW9uIGNvbGxlY3ROb25FbnVtUHJvcHMob2JqLCBrZXlzKSB7XHJcbiAgICAgICAgdmFyIG5vbkVudW1JZHggPSBub25FbnVtZXJhYmxlUHJvcHMubGVuZ3RoO1xyXG4gICAgICAgIHZhciBjb25zdHJ1Y3RvciA9IG9iai5jb25zdHJ1Y3RvcjtcclxuICAgICAgICB2YXIgcHJvdG8gPSAoXy5pc0Z1bmN0aW9uKGNvbnN0cnVjdG9yKSAmJiBjb25zdHJ1Y3Rvci5wcm90b3R5cGUpIHx8IE9ialByb3RvO1xyXG5cclxuICAgICAgICAvLyBDb25zdHJ1Y3RvciBpcyBhIHNwZWNpYWwgY2FzZS5cclxuICAgICAgICB2YXIgcHJvcCA9ICdjb25zdHJ1Y3Rvcic7XHJcbiAgICAgICAgaWYgKF8uaGFzKG9iaiwgcHJvcCkgJiYgIV8uY29udGFpbnMoa2V5cywgcHJvcCkpIGtleXMucHVzaChwcm9wKTtcclxuXHJcbiAgICAgICAgd2hpbGUgKG5vbkVudW1JZHgtLSkge1xyXG4gICAgICAgICAgICBwcm9wID0gbm9uRW51bWVyYWJsZVByb3BzW25vbkVudW1JZHhdO1xyXG4gICAgICAgICAgICBpZiAocHJvcCBpbiBvYmogJiYgb2JqW3Byb3BdICE9PSBwcm90b1twcm9wXSAmJiAhXy5jb250YWlucyhrZXlzLCBwcm9wKSkge1xyXG4gICAgICAgICAgICAgICAga2V5cy5wdXNoKHByb3ApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vIFJldHJpZXZlIHRoZSBuYW1lcyBvZiBhbiBvYmplY3QncyBvd24gcHJvcGVydGllcy5cclxuICAgIC8vIERlbGVnYXRlcyB0byAqKkVDTUFTY3JpcHQgNSoqJ3MgbmF0aXZlIGBPYmplY3Qua2V5c2BcclxuICAgIF8ua2V5cyA9IGZ1bmN0aW9uKG9iaikge1xyXG4gICAgICAgIGlmICghXy5pc09iamVjdChvYmopKSByZXR1cm4gW107XHJcbiAgICAgICAgaWYgKG5hdGl2ZUtleXMpIHJldHVybiBuYXRpdmVLZXlzKG9iaik7XHJcbiAgICAgICAgdmFyIGtleXMgPSBbXTtcclxuICAgICAgICBmb3IgKHZhciBrZXkgaW4gb2JqKVxyXG4gICAgICAgICAgICBpZiAoXy5oYXMob2JqLCBrZXkpKSBrZXlzLnB1c2goa2V5KTtcclxuICAgICAgICAgICAgLy8gQWhlbSwgSUUgPCA5LlxyXG4gICAgICAgIGlmIChoYXNFbnVtQnVnKSBjb2xsZWN0Tm9uRW51bVByb3BzKG9iaiwga2V5cyk7XHJcbiAgICAgICAgcmV0dXJuIGtleXM7XHJcbiAgICB9O1xyXG5cclxuICAgIC8vIFJldHJpZXZlIGFsbCB0aGUgcHJvcGVydHkgbmFtZXMgb2YgYW4gb2JqZWN0LlxyXG4gICAgXy5hbGxLZXlzID0gZnVuY3Rpb24ob2JqKSB7XHJcbiAgICAgICAgaWYgKCFfLmlzT2JqZWN0KG9iaikpIHJldHVybiBbXTtcclxuICAgICAgICB2YXIga2V5cyA9IFtdO1xyXG4gICAgICAgIGZvciAodmFyIGtleSBpbiBvYmopIGtleXMucHVzaChrZXkpO1xyXG4gICAgICAgIC8vIEFoZW0sIElFIDwgOS5cclxuICAgICAgICBpZiAoaGFzRW51bUJ1ZykgY29sbGVjdE5vbkVudW1Qcm9wcyhvYmosIGtleXMpO1xyXG4gICAgICAgIHJldHVybiBrZXlzO1xyXG4gICAgfTtcclxuXHJcbiAgICAvLyBSZXRyaWV2ZSB0aGUgdmFsdWVzIG9mIGFuIG9iamVjdCdzIHByb3BlcnRpZXMuXHJcbiAgICBfLnZhbHVlcyA9IGZ1bmN0aW9uKG9iaikge1xyXG4gICAgICAgIHZhciBrZXlzID0gXy5rZXlzKG9iaik7XHJcbiAgICAgICAgdmFyIGxlbmd0aCA9IGtleXMubGVuZ3RoO1xyXG4gICAgICAgIHZhciB2YWx1ZXMgPSBBcnJheShsZW5ndGgpO1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgdmFsdWVzW2ldID0gb2JqW2tleXNbaV1dO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdmFsdWVzO1xyXG4gICAgfTtcclxuXHJcbiAgICAvLyBSZXR1cm5zIHRoZSByZXN1bHRzIG9mIGFwcGx5aW5nIHRoZSBpdGVyYXRlZSB0byBlYWNoIGVsZW1lbnQgb2YgdGhlIG9iamVjdFxyXG4gICAgLy8gSW4gY29udHJhc3QgdG8gXy5tYXAgaXQgcmV0dXJucyBhbiBvYmplY3RcclxuICAgIF8ubWFwT2JqZWN0ID0gZnVuY3Rpb24ob2JqLCBpdGVyYXRlZSwgY29udGV4dCkge1xyXG4gICAgICAgIGl0ZXJhdGVlID0gY2IoaXRlcmF0ZWUsIGNvbnRleHQpO1xyXG4gICAgICAgIHZhciBrZXlzID0gXy5rZXlzKG9iaiksXHJcbiAgICAgICAgICAgIGxlbmd0aCA9IGtleXMubGVuZ3RoLFxyXG4gICAgICAgICAgICByZXN1bHRzID0ge30sXHJcbiAgICAgICAgICAgIGN1cnJlbnRLZXk7XHJcbiAgICAgICAgZm9yICh2YXIgaW5kZXggPSAwOyBpbmRleCA8IGxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICAgICAgICBjdXJyZW50S2V5ID0ga2V5c1tpbmRleF07XHJcbiAgICAgICAgICAgIHJlc3VsdHNbY3VycmVudEtleV0gPSBpdGVyYXRlZShvYmpbY3VycmVudEtleV0sIGN1cnJlbnRLZXksIG9iaik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiByZXN1bHRzO1xyXG4gICAgfTtcclxuXHJcbiAgICAvLyBDb252ZXJ0IGFuIG9iamVjdCBpbnRvIGEgbGlzdCBvZiBgW2tleSwgdmFsdWVdYCBwYWlycy5cclxuICAgIF8ucGFpcnMgPSBmdW5jdGlvbihvYmopIHtcclxuICAgICAgICB2YXIga2V5cyA9IF8ua2V5cyhvYmopO1xyXG4gICAgICAgIHZhciBsZW5ndGggPSBrZXlzLmxlbmd0aDtcclxuICAgICAgICB2YXIgcGFpcnMgPSBBcnJheShsZW5ndGgpO1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgcGFpcnNbaV0gPSBba2V5c1tpXSwgb2JqW2tleXNbaV1dXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHBhaXJzO1xyXG4gICAgfTtcclxuXHJcbiAgICAvLyBJbnZlcnQgdGhlIGtleXMgYW5kIHZhbHVlcyBvZiBhbiBvYmplY3QuIFRoZSB2YWx1ZXMgbXVzdCBiZSBzZXJpYWxpemFibGUuXHJcbiAgICBfLmludmVydCA9IGZ1bmN0aW9uKG9iaikge1xyXG4gICAgICAgIHZhciByZXN1bHQgPSB7fTtcclxuICAgICAgICB2YXIga2V5cyA9IF8ua2V5cyhvYmopO1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAwLCBsZW5ndGggPSBrZXlzLmxlbmd0aDsgaSA8IGxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHJlc3VsdFtvYmpba2V5c1tpXV1dID0ga2V5c1tpXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgIH07XHJcblxyXG4gICAgLy8gUmV0dXJuIGEgc29ydGVkIGxpc3Qgb2YgdGhlIGZ1bmN0aW9uIG5hbWVzIGF2YWlsYWJsZSBvbiB0aGUgb2JqZWN0LlxyXG4gICAgLy8gQWxpYXNlZCBhcyBgbWV0aG9kc2BcclxuICAgIF8uZnVuY3Rpb25zID0gXy5tZXRob2RzID0gZnVuY3Rpb24ob2JqKSB7XHJcbiAgICAgICAgdmFyIG5hbWVzID0gW107XHJcbiAgICAgICAgZm9yICh2YXIga2V5IGluIG9iaikge1xyXG4gICAgICAgICAgICBpZiAoXy5pc0Z1bmN0aW9uKG9ialtrZXldKSkgbmFtZXMucHVzaChrZXkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbmFtZXMuc29ydCgpO1xyXG4gICAgfTtcclxuXHJcbiAgICAvLyBFeHRlbmQgYSBnaXZlbiBvYmplY3Qgd2l0aCBhbGwgdGhlIHByb3BlcnRpZXMgaW4gcGFzc2VkLWluIG9iamVjdChzKS5cclxuICAgIF8uZXh0ZW5kID0gY3JlYXRlQXNzaWduZXIoXy5hbGxLZXlzKTtcclxuXHJcbiAgICAvLyBBc3NpZ25zIGEgZ2l2ZW4gb2JqZWN0IHdpdGggYWxsIHRoZSBvd24gcHJvcGVydGllcyBpbiB0aGUgcGFzc2VkLWluIG9iamVjdChzKVxyXG4gICAgLy8gKGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2RvY3MvV2ViL0phdmFTY3JpcHQvUmVmZXJlbmNlL0dsb2JhbF9PYmplY3RzL09iamVjdC9hc3NpZ24pXHJcbiAgICBfLmV4dGVuZE93biA9IF8uYXNzaWduID0gY3JlYXRlQXNzaWduZXIoXy5rZXlzKTtcclxuXHJcbiAgICAvLyBSZXR1cm5zIHRoZSBmaXJzdCBrZXkgb24gYW4gb2JqZWN0IHRoYXQgcGFzc2VzIGEgcHJlZGljYXRlIHRlc3RcclxuICAgIF8uZmluZEtleSA9IGZ1bmN0aW9uKG9iaiwgcHJlZGljYXRlLCBjb250ZXh0KSB7XHJcbiAgICAgICAgcHJlZGljYXRlID0gY2IocHJlZGljYXRlLCBjb250ZXh0KTtcclxuICAgICAgICB2YXIga2V5cyA9IF8ua2V5cyhvYmopLFxyXG4gICAgICAgICAgICBrZXk7XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDAsIGxlbmd0aCA9IGtleXMubGVuZ3RoOyBpIDwgbGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAga2V5ID0ga2V5c1tpXTtcclxuICAgICAgICAgICAgaWYgKHByZWRpY2F0ZShvYmpba2V5XSwga2V5LCBvYmopKSByZXR1cm4ga2V5O1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgLy8gUmV0dXJuIGEgY29weSBvZiB0aGUgb2JqZWN0IG9ubHkgY29udGFpbmluZyB0aGUgd2hpdGVsaXN0ZWQgcHJvcGVydGllcy5cclxuICAgIF8ucGljayA9IGZ1bmN0aW9uKG9iamVjdCwgb2l0ZXJhdGVlLCBjb250ZXh0KSB7XHJcbiAgICAgICAgdmFyIHJlc3VsdCA9IHt9LFxyXG4gICAgICAgICAgICBvYmogPSBvYmplY3QsXHJcbiAgICAgICAgICAgIGl0ZXJhdGVlLCBrZXlzO1xyXG4gICAgICAgIGlmIChvYmogPT0gbnVsbCkgcmV0dXJuIHJlc3VsdDtcclxuICAgICAgICBpZiAoXy5pc0Z1bmN0aW9uKG9pdGVyYXRlZSkpIHtcclxuICAgICAgICAgICAga2V5cyA9IF8uYWxsS2V5cyhvYmopO1xyXG4gICAgICAgICAgICBpdGVyYXRlZSA9IG9wdGltaXplQ2Iob2l0ZXJhdGVlLCBjb250ZXh0KTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBrZXlzID0gZmxhdHRlbihhcmd1bWVudHMsIGZhbHNlLCBmYWxzZSwgMSk7XHJcbiAgICAgICAgICAgIGl0ZXJhdGVlID0gZnVuY3Rpb24odmFsdWUsIGtleSwgb2JqKSB7IHJldHVybiBrZXkgaW4gb2JqOyB9O1xyXG4gICAgICAgICAgICBvYmogPSBPYmplY3Qob2JqKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDAsIGxlbmd0aCA9IGtleXMubGVuZ3RoOyBpIDwgbGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgdmFyIGtleSA9IGtleXNbaV07XHJcbiAgICAgICAgICAgIHZhciB2YWx1ZSA9IG9ialtrZXldO1xyXG4gICAgICAgICAgICBpZiAoaXRlcmF0ZWUodmFsdWUsIGtleSwgb2JqKSkgcmVzdWx0W2tleV0gPSB2YWx1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgIH07XHJcblxyXG4gICAgLy8gUmV0dXJuIGEgY29weSBvZiB0aGUgb2JqZWN0IHdpdGhvdXQgdGhlIGJsYWNrbGlzdGVkIHByb3BlcnRpZXMuXHJcbiAgICBfLm9taXQgPSBmdW5jdGlvbihvYmosIGl0ZXJhdGVlLCBjb250ZXh0KSB7XHJcbiAgICAgICAgaWYgKF8uaXNGdW5jdGlvbihpdGVyYXRlZSkpIHtcclxuICAgICAgICAgICAgaXRlcmF0ZWUgPSBfLm5lZ2F0ZShpdGVyYXRlZSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdmFyIGtleXMgPSBfLm1hcChmbGF0dGVuKGFyZ3VtZW50cywgZmFsc2UsIGZhbHNlLCAxKSwgU3RyaW5nKTtcclxuICAgICAgICAgICAgaXRlcmF0ZWUgPSBmdW5jdGlvbih2YWx1ZSwga2V5KSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gIV8uY29udGFpbnMoa2V5cywga2V5KTtcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIF8ucGljayhvYmosIGl0ZXJhdGVlLCBjb250ZXh0KTtcclxuICAgIH07XHJcblxyXG4gICAgLy8gRmlsbCBpbiBhIGdpdmVuIG9iamVjdCB3aXRoIGRlZmF1bHQgcHJvcGVydGllcy5cclxuICAgIF8uZGVmYXVsdHMgPSBjcmVhdGVBc3NpZ25lcihfLmFsbEtleXMsIHRydWUpO1xyXG5cclxuICAgIC8vIENyZWF0ZXMgYW4gb2JqZWN0IHRoYXQgaW5oZXJpdHMgZnJvbSB0aGUgZ2l2ZW4gcHJvdG90eXBlIG9iamVjdC5cclxuICAgIC8vIElmIGFkZGl0aW9uYWwgcHJvcGVydGllcyBhcmUgcHJvdmlkZWQgdGhlbiB0aGV5IHdpbGwgYmUgYWRkZWQgdG8gdGhlXHJcbiAgICAvLyBjcmVhdGVkIG9iamVjdC5cclxuICAgIF8uY3JlYXRlID0gZnVuY3Rpb24ocHJvdG90eXBlLCBwcm9wcykge1xyXG4gICAgICAgIHZhciByZXN1bHQgPSBiYXNlQ3JlYXRlKHByb3RvdHlwZSk7XHJcbiAgICAgICAgaWYgKHByb3BzKSBfLmV4dGVuZE93bihyZXN1bHQsIHByb3BzKTtcclxuICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgfTtcclxuXHJcbiAgICAvLyBDcmVhdGUgYSAoc2hhbGxvdy1jbG9uZWQpIGR1cGxpY2F0ZSBvZiBhbiBvYmplY3QuXHJcbiAgICBfLmNsb25lID0gZnVuY3Rpb24ob2JqKSB7XHJcbiAgICAgICAgaWYgKCFfLmlzT2JqZWN0KG9iaikpIHJldHVybiBvYmo7XHJcbiAgICAgICAgcmV0dXJuIF8uaXNBcnJheShvYmopID8gb2JqLnNsaWNlKCkgOiBfLmV4dGVuZCh7fSwgb2JqKTtcclxuICAgIH07XHJcblxyXG4gICAgLy8gSW52b2tlcyBpbnRlcmNlcHRvciB3aXRoIHRoZSBvYmosIGFuZCB0aGVuIHJldHVybnMgb2JqLlxyXG4gICAgLy8gVGhlIHByaW1hcnkgcHVycG9zZSBvZiB0aGlzIG1ldGhvZCBpcyB0byBcInRhcCBpbnRvXCIgYSBtZXRob2QgY2hhaW4sIGluXHJcbiAgICAvLyBvcmRlciB0byBwZXJmb3JtIG9wZXJhdGlvbnMgb24gaW50ZXJtZWRpYXRlIHJlc3VsdHMgd2l0aGluIHRoZSBjaGFpbi5cclxuICAgIF8udGFwID0gZnVuY3Rpb24ob2JqLCBpbnRlcmNlcHRvcikge1xyXG4gICAgICAgIGludGVyY2VwdG9yKG9iaik7XHJcbiAgICAgICAgcmV0dXJuIG9iajtcclxuICAgIH07XHJcblxyXG4gICAgLy8gUmV0dXJucyB3aGV0aGVyIGFuIG9iamVjdCBoYXMgYSBnaXZlbiBzZXQgb2YgYGtleTp2YWx1ZWAgcGFpcnMuXHJcbiAgICBfLmlzTWF0Y2ggPSBmdW5jdGlvbihvYmplY3QsIGF0dHJzKSB7XHJcbiAgICAgICAgdmFyIGtleXMgPSBfLmtleXMoYXR0cnMpLFxyXG4gICAgICAgICAgICBsZW5ndGggPSBrZXlzLmxlbmd0aDtcclxuICAgICAgICBpZiAob2JqZWN0ID09IG51bGwpIHJldHVybiAhbGVuZ3RoO1xyXG4gICAgICAgIHZhciBvYmogPSBPYmplY3Qob2JqZWN0KTtcclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHZhciBrZXkgPSBrZXlzW2ldO1xyXG4gICAgICAgICAgICBpZiAoYXR0cnNba2V5XSAhPT0gb2JqW2tleV0gfHwgIShrZXkgaW4gb2JqKSkgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH07XHJcblxyXG5cclxuICAgIC8vIEludGVybmFsIHJlY3Vyc2l2ZSBjb21wYXJpc29uIGZ1bmN0aW9uIGZvciBgaXNFcXVhbGAuXHJcbiAgICB2YXIgZXEgPSBmdW5jdGlvbihhLCBiLCBhU3RhY2ssIGJTdGFjaykge1xyXG4gICAgICAgIC8vIElkZW50aWNhbCBvYmplY3RzIGFyZSBlcXVhbC4gYDAgPT09IC0wYCwgYnV0IHRoZXkgYXJlbid0IGlkZW50aWNhbC5cclxuICAgICAgICAvLyBTZWUgdGhlIFtIYXJtb255IGBlZ2FsYCBwcm9wb3NhbF0oaHR0cDovL3dpa2kuZWNtYXNjcmlwdC5vcmcvZG9rdS5waHA/aWQ9aGFybW9ueTplZ2FsKS5cclxuICAgICAgICBpZiAoYSA9PT0gYikgcmV0dXJuIGEgIT09IDAgfHwgMSAvIGEgPT09IDEgLyBiO1xyXG4gICAgICAgIC8vIEEgc3RyaWN0IGNvbXBhcmlzb24gaXMgbmVjZXNzYXJ5IGJlY2F1c2UgYG51bGwgPT0gdW5kZWZpbmVkYC5cclxuICAgICAgICBpZiAoYSA9PSBudWxsIHx8IGIgPT0gbnVsbCkgcmV0dXJuIGEgPT09IGI7XHJcbiAgICAgICAgLy8gVW53cmFwIGFueSB3cmFwcGVkIG9iamVjdHMuXHJcbiAgICAgICAgaWYgKGEgaW5zdGFuY2VvZiBfKSBhID0gYS5fd3JhcHBlZDtcclxuICAgICAgICBpZiAoYiBpbnN0YW5jZW9mIF8pIGIgPSBiLl93cmFwcGVkO1xyXG4gICAgICAgIC8vIENvbXBhcmUgYFtbQ2xhc3NdXWAgbmFtZXMuXHJcbiAgICAgICAgdmFyIGNsYXNzTmFtZSA9IHRvU3RyaW5nLmNhbGwoYSk7XHJcbiAgICAgICAgaWYgKGNsYXNzTmFtZSAhPT0gdG9TdHJpbmcuY2FsbChiKSkgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIHN3aXRjaCAoY2xhc3NOYW1lKSB7XHJcbiAgICAgICAgICAgIC8vIFN0cmluZ3MsIG51bWJlcnMsIHJlZ3VsYXIgZXhwcmVzc2lvbnMsIGRhdGVzLCBhbmQgYm9vbGVhbnMgYXJlIGNvbXBhcmVkIGJ5IHZhbHVlLlxyXG4gICAgICAgICAgICBjYXNlICdbb2JqZWN0IFJlZ0V4cF0nOlxyXG4gICAgICAgICAgICAgICAgLy8gUmVnRXhwcyBhcmUgY29lcmNlZCB0byBzdHJpbmdzIGZvciBjb21wYXJpc29uIChOb3RlOiAnJyArIC9hL2kgPT09ICcvYS9pJylcclxuICAgICAgICAgICAgY2FzZSAnW29iamVjdCBTdHJpbmddJzpcclxuICAgICAgICAgICAgICAgIC8vIFByaW1pdGl2ZXMgYW5kIHRoZWlyIGNvcnJlc3BvbmRpbmcgb2JqZWN0IHdyYXBwZXJzIGFyZSBlcXVpdmFsZW50OyB0aHVzLCBgXCI1XCJgIGlzXHJcbiAgICAgICAgICAgICAgICAvLyBlcXVpdmFsZW50IHRvIGBuZXcgU3RyaW5nKFwiNVwiKWAuXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gJycgKyBhID09PSAnJyArIGI7XHJcbiAgICAgICAgICAgIGNhc2UgJ1tvYmplY3QgTnVtYmVyXSc6XHJcbiAgICAgICAgICAgICAgICAvLyBgTmFOYHMgYXJlIGVxdWl2YWxlbnQsIGJ1dCBub24tcmVmbGV4aXZlLlxyXG4gICAgICAgICAgICAgICAgLy8gT2JqZWN0KE5hTikgaXMgZXF1aXZhbGVudCB0byBOYU5cclxuICAgICAgICAgICAgICAgIGlmICgrYSAhPT0gK2EpIHJldHVybiArYiAhPT0gK2I7XHJcbiAgICAgICAgICAgICAgICAvLyBBbiBgZWdhbGAgY29tcGFyaXNvbiBpcyBwZXJmb3JtZWQgZm9yIG90aGVyIG51bWVyaWMgdmFsdWVzLlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuICthID09PSAwID8gMSAvICthID09PSAxIC8gYiA6ICthID09PSArYjtcclxuICAgICAgICAgICAgY2FzZSAnW29iamVjdCBEYXRlXSc6XHJcbiAgICAgICAgICAgIGNhc2UgJ1tvYmplY3QgQm9vbGVhbl0nOlxyXG4gICAgICAgICAgICAgICAgLy8gQ29lcmNlIGRhdGVzIGFuZCBib29sZWFucyB0byBudW1lcmljIHByaW1pdGl2ZSB2YWx1ZXMuIERhdGVzIGFyZSBjb21wYXJlZCBieSB0aGVpclxyXG4gICAgICAgICAgICAgICAgLy8gbWlsbGlzZWNvbmQgcmVwcmVzZW50YXRpb25zLiBOb3RlIHRoYXQgaW52YWxpZCBkYXRlcyB3aXRoIG1pbGxpc2Vjb25kIHJlcHJlc2VudGF0aW9uc1xyXG4gICAgICAgICAgICAgICAgLy8gb2YgYE5hTmAgYXJlIG5vdCBlcXVpdmFsZW50LlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuICthID09PSArYjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHZhciBhcmVBcnJheXMgPSBjbGFzc05hbWUgPT09ICdbb2JqZWN0IEFycmF5XSc7XHJcbiAgICAgICAgaWYgKCFhcmVBcnJheXMpIHtcclxuICAgICAgICAgICAgaWYgKHR5cGVvZiBhICE9ICdvYmplY3QnIHx8IHR5cGVvZiBiICE9ICdvYmplY3QnKSByZXR1cm4gZmFsc2U7XHJcblxyXG4gICAgICAgICAgICAvLyBPYmplY3RzIHdpdGggZGlmZmVyZW50IGNvbnN0cnVjdG9ycyBhcmUgbm90IGVxdWl2YWxlbnQsIGJ1dCBgT2JqZWN0YHMgb3IgYEFycmF5YHNcclxuICAgICAgICAgICAgLy8gZnJvbSBkaWZmZXJlbnQgZnJhbWVzIGFyZS5cclxuICAgICAgICAgICAgdmFyIGFDdG9yID0gYS5jb25zdHJ1Y3RvcixcclxuICAgICAgICAgICAgICAgIGJDdG9yID0gYi5jb25zdHJ1Y3RvcjtcclxuICAgICAgICAgICAgaWYgKGFDdG9yICE9PSBiQ3RvciAmJiAhKF8uaXNGdW5jdGlvbihhQ3RvcikgJiYgYUN0b3IgaW5zdGFuY2VvZiBhQ3RvciAmJlxyXG4gICAgICAgICAgICAgICAgICAgIF8uaXNGdW5jdGlvbihiQ3RvcikgJiYgYkN0b3IgaW5zdGFuY2VvZiBiQ3RvcikgJiZcclxuICAgICAgICAgICAgICAgICgnY29uc3RydWN0b3InIGluIGEgJiYgJ2NvbnN0cnVjdG9yJyBpbiBiKSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIEFzc3VtZSBlcXVhbGl0eSBmb3IgY3ljbGljIHN0cnVjdHVyZXMuIFRoZSBhbGdvcml0aG0gZm9yIGRldGVjdGluZyBjeWNsaWNcclxuICAgICAgICAvLyBzdHJ1Y3R1cmVzIGlzIGFkYXB0ZWQgZnJvbSBFUyA1LjEgc2VjdGlvbiAxNS4xMi4zLCBhYnN0cmFjdCBvcGVyYXRpb24gYEpPYC5cclxuXHJcbiAgICAgICAgLy8gSW5pdGlhbGl6aW5nIHN0YWNrIG9mIHRyYXZlcnNlZCBvYmplY3RzLlxyXG4gICAgICAgIC8vIEl0J3MgZG9uZSBoZXJlIHNpbmNlIHdlIG9ubHkgbmVlZCB0aGVtIGZvciBvYmplY3RzIGFuZCBhcnJheXMgY29tcGFyaXNvbi5cclxuICAgICAgICBhU3RhY2sgPSBhU3RhY2sgfHwgW107XHJcbiAgICAgICAgYlN0YWNrID0gYlN0YWNrIHx8IFtdO1xyXG4gICAgICAgIHZhciBsZW5ndGggPSBhU3RhY2subGVuZ3RoO1xyXG4gICAgICAgIHdoaWxlIChsZW5ndGgtLSkge1xyXG4gICAgICAgICAgICAvLyBMaW5lYXIgc2VhcmNoLiBQZXJmb3JtYW5jZSBpcyBpbnZlcnNlbHkgcHJvcG9ydGlvbmFsIHRvIHRoZSBudW1iZXIgb2ZcclxuICAgICAgICAgICAgLy8gdW5pcXVlIG5lc3RlZCBzdHJ1Y3R1cmVzLlxyXG4gICAgICAgICAgICBpZiAoYVN0YWNrW2xlbmd0aF0gPT09IGEpIHJldHVybiBiU3RhY2tbbGVuZ3RoXSA9PT0gYjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIEFkZCB0aGUgZmlyc3Qgb2JqZWN0IHRvIHRoZSBzdGFjayBvZiB0cmF2ZXJzZWQgb2JqZWN0cy5cclxuICAgICAgICBhU3RhY2sucHVzaChhKTtcclxuICAgICAgICBiU3RhY2sucHVzaChiKTtcclxuXHJcbiAgICAgICAgLy8gUmVjdXJzaXZlbHkgY29tcGFyZSBvYmplY3RzIGFuZCBhcnJheXMuXHJcbiAgICAgICAgaWYgKGFyZUFycmF5cykge1xyXG4gICAgICAgICAgICAvLyBDb21wYXJlIGFycmF5IGxlbmd0aHMgdG8gZGV0ZXJtaW5lIGlmIGEgZGVlcCBjb21wYXJpc29uIGlzIG5lY2Vzc2FyeS5cclxuICAgICAgICAgICAgbGVuZ3RoID0gYS5sZW5ndGg7XHJcbiAgICAgICAgICAgIGlmIChsZW5ndGggIT09IGIubGVuZ3RoKSByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIC8vIERlZXAgY29tcGFyZSB0aGUgY29udGVudHMsIGlnbm9yaW5nIG5vbi1udW1lcmljIHByb3BlcnRpZXMuXHJcbiAgICAgICAgICAgIHdoaWxlIChsZW5ndGgtLSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKCFlcShhW2xlbmd0aF0sIGJbbGVuZ3RoXSwgYVN0YWNrLCBiU3RhY2spKSByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAvLyBEZWVwIGNvbXBhcmUgb2JqZWN0cy5cclxuICAgICAgICAgICAgdmFyIGtleXMgPSBfLmtleXMoYSksXHJcbiAgICAgICAgICAgICAgICBrZXk7XHJcbiAgICAgICAgICAgIGxlbmd0aCA9IGtleXMubGVuZ3RoO1xyXG4gICAgICAgICAgICAvLyBFbnN1cmUgdGhhdCBib3RoIG9iamVjdHMgY29udGFpbiB0aGUgc2FtZSBudW1iZXIgb2YgcHJvcGVydGllcyBiZWZvcmUgY29tcGFyaW5nIGRlZXAgZXF1YWxpdHkuXHJcbiAgICAgICAgICAgIGlmIChfLmtleXMoYikubGVuZ3RoICE9PSBsZW5ndGgpIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgd2hpbGUgKGxlbmd0aC0tKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBEZWVwIGNvbXBhcmUgZWFjaCBtZW1iZXJcclxuICAgICAgICAgICAgICAgIGtleSA9IGtleXNbbGVuZ3RoXTtcclxuICAgICAgICAgICAgICAgIGlmICghKF8uaGFzKGIsIGtleSkgJiYgZXEoYVtrZXldLCBiW2tleV0sIGFTdGFjaywgYlN0YWNrKSkpIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBSZW1vdmUgdGhlIGZpcnN0IG9iamVjdCBmcm9tIHRoZSBzdGFjayBvZiB0cmF2ZXJzZWQgb2JqZWN0cy5cclxuICAgICAgICBhU3RhY2sucG9wKCk7XHJcbiAgICAgICAgYlN0YWNrLnBvcCgpO1xyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfTtcclxuXHJcbiAgICAvLyBQZXJmb3JtIGEgZGVlcCBjb21wYXJpc29uIHRvIGNoZWNrIGlmIHR3byBvYmplY3RzIGFyZSBlcXVhbC5cclxuICAgIF8uaXNFcXVhbCA9IGZ1bmN0aW9uKGEsIGIpIHtcclxuICAgICAgICByZXR1cm4gZXEoYSwgYik7XHJcbiAgICB9O1xyXG5cclxuICAgIC8vIElzIGEgZ2l2ZW4gYXJyYXksIHN0cmluZywgb3Igb2JqZWN0IGVtcHR5P1xyXG4gICAgLy8gQW4gXCJlbXB0eVwiIG9iamVjdCBoYXMgbm8gZW51bWVyYWJsZSBvd24tcHJvcGVydGllcy5cclxuICAgIF8uaXNFbXB0eSA9IGZ1bmN0aW9uKG9iaikge1xyXG4gICAgICAgIGlmIChvYmogPT0gbnVsbCkgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgaWYgKGlzQXJyYXlMaWtlKG9iaikgJiYgKF8uaXNBcnJheShvYmopIHx8IF8uaXNTdHJpbmcob2JqKSB8fCBfLmlzQXJndW1lbnRzKG9iaikpKSByZXR1cm4gb2JqLmxlbmd0aCA9PT0gMDtcclxuICAgICAgICByZXR1cm4gXy5rZXlzKG9iaikubGVuZ3RoID09PSAwO1xyXG4gICAgfTtcclxuXHJcbiAgICAvLyBJcyBhIGdpdmVuIHZhbHVlIGEgRE9NIGVsZW1lbnQ/XHJcbiAgICBfLmlzRWxlbWVudCA9IGZ1bmN0aW9uKG9iaikge1xyXG4gICAgICAgIHJldHVybiAhIShvYmogJiYgb2JqLm5vZGVUeXBlID09PSAxKTtcclxuICAgIH07XHJcblxyXG4gICAgLy8gSXMgYSBnaXZlbiB2YWx1ZSBhbiBhcnJheT9cclxuICAgIC8vIERlbGVnYXRlcyB0byBFQ01BNSdzIG5hdGl2ZSBBcnJheS5pc0FycmF5XHJcbiAgICBfLmlzQXJyYXkgPSBuYXRpdmVJc0FycmF5IHx8IGZ1bmN0aW9uKG9iaikge1xyXG4gICAgICAgIHJldHVybiB0b1N0cmluZy5jYWxsKG9iaikgPT09ICdbb2JqZWN0IEFycmF5XSc7XHJcbiAgICB9O1xyXG5cclxuICAgIC8vIElzIGEgZ2l2ZW4gdmFyaWFibGUgYW4gb2JqZWN0P1xyXG4gICAgXy5pc09iamVjdCA9IGZ1bmN0aW9uKG9iaikge1xyXG4gICAgICAgIHZhciB0eXBlID0gdHlwZW9mIG9iajtcclxuICAgICAgICByZXR1cm4gdHlwZSA9PT0gJ2Z1bmN0aW9uJyB8fCB0eXBlID09PSAnb2JqZWN0JyAmJiAhIW9iajtcclxuICAgIH07XHJcblxyXG4gICAgLy8gQWRkIHNvbWUgaXNUeXBlIG1ldGhvZHM6IGlzQXJndW1lbnRzLCBpc0Z1bmN0aW9uLCBpc1N0cmluZywgaXNOdW1iZXIsIGlzRGF0ZSwgaXNSZWdFeHAsIGlzRXJyb3IuXHJcbiAgICBfLmVhY2goWydBcmd1bWVudHMnLCAnRnVuY3Rpb24nLCAnU3RyaW5nJywgJ051bWJlcicsICdEYXRlJywgJ1JlZ0V4cCcsICdFcnJvciddLCBmdW5jdGlvbihuYW1lKSB7XHJcbiAgICAgICAgX1snaXMnICsgbmFtZV0gPSBmdW5jdGlvbihvYmopIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRvU3RyaW5nLmNhbGwob2JqKSA9PT0gJ1tvYmplY3QgJyArIG5hbWUgKyAnXSc7XHJcbiAgICAgICAgfTtcclxuICAgIH0pO1xyXG5cclxuICAgIC8vIERlZmluZSBhIGZhbGxiYWNrIHZlcnNpb24gb2YgdGhlIG1ldGhvZCBpbiBicm93c2VycyAoYWhlbSwgSUUgPCA5KSwgd2hlcmVcclxuICAgIC8vIHRoZXJlIGlzbid0IGFueSBpbnNwZWN0YWJsZSBcIkFyZ3VtZW50c1wiIHR5cGUuXHJcbiAgICBpZiAoIV8uaXNBcmd1bWVudHMoYXJndW1lbnRzKSkge1xyXG4gICAgICAgIF8uaXNBcmd1bWVudHMgPSBmdW5jdGlvbihvYmopIHtcclxuICAgICAgICAgICAgcmV0dXJuIF8uaGFzKG9iaiwgJ2NhbGxlZScpO1xyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgLy8gT3B0aW1pemUgYGlzRnVuY3Rpb25gIGlmIGFwcHJvcHJpYXRlLiBXb3JrIGFyb3VuZCBzb21lIHR5cGVvZiBidWdzIGluIG9sZCB2OCxcclxuICAgIC8vIElFIDExICgjMTYyMSksIGFuZCBpbiBTYWZhcmkgOCAoIzE5MjkpLlxyXG4gICAgaWYgKHR5cGVvZiAvLi8gIT0gJ2Z1bmN0aW9uJyAmJiB0eXBlb2YgSW50OEFycmF5ICE9ICdvYmplY3QnKSB7XHJcbiAgICAgICAgXy5pc0Z1bmN0aW9uID0gZnVuY3Rpb24ob2JqKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0eXBlb2Ygb2JqID09ICdmdW5jdGlvbicgfHwgZmFsc2U7XHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBJcyBhIGdpdmVuIG9iamVjdCBhIGZpbml0ZSBudW1iZXI/XHJcbiAgICBfLmlzRmluaXRlID0gZnVuY3Rpb24ob2JqKSB7XHJcbiAgICAgICAgcmV0dXJuIGlzRmluaXRlKG9iaikgJiYgIWlzTmFOKHBhcnNlRmxvYXQob2JqKSk7XHJcbiAgICB9O1xyXG5cclxuICAgIC8vIElzIHRoZSBnaXZlbiB2YWx1ZSBgTmFOYD8gKE5hTiBpcyB0aGUgb25seSBudW1iZXIgd2hpY2ggZG9lcyBub3QgZXF1YWwgaXRzZWxmKS5cclxuICAgIF8uaXNOYU4gPSBmdW5jdGlvbihvYmopIHtcclxuICAgICAgICByZXR1cm4gXy5pc051bWJlcihvYmopICYmIG9iaiAhPT0gK29iajtcclxuICAgIH07XHJcblxyXG4gICAgLy8gSXMgYSBnaXZlbiB2YWx1ZSBhIGJvb2xlYW4/XHJcbiAgICBfLmlzQm9vbGVhbiA9IGZ1bmN0aW9uKG9iaikge1xyXG4gICAgICAgIHJldHVybiBvYmogPT09IHRydWUgfHwgb2JqID09PSBmYWxzZSB8fCB0b1N0cmluZy5jYWxsKG9iaikgPT09ICdbb2JqZWN0IEJvb2xlYW5dJztcclxuICAgIH07XHJcblxyXG4gICAgLy8gSXMgYSBnaXZlbiB2YWx1ZSBlcXVhbCB0byBudWxsP1xyXG4gICAgXy5pc051bGwgPSBmdW5jdGlvbihvYmopIHtcclxuICAgICAgICByZXR1cm4gb2JqID09PSBudWxsO1xyXG4gICAgfTtcclxuXHJcbiAgICAvLyBJcyBhIGdpdmVuIHZhcmlhYmxlIHVuZGVmaW5lZD9cclxuICAgIF8uaXNVbmRlZmluZWQgPSBmdW5jdGlvbihvYmopIHtcclxuICAgICAgICByZXR1cm4gb2JqID09PSB2b2lkIDA7XHJcbiAgICB9O1xyXG5cclxuICAgIC8vIFNob3J0Y3V0IGZ1bmN0aW9uIGZvciBjaGVja2luZyBpZiBhbiBvYmplY3QgaGFzIGEgZ2l2ZW4gcHJvcGVydHkgZGlyZWN0bHlcclxuICAgIC8vIG9uIGl0c2VsZiAoaW4gb3RoZXIgd29yZHMsIG5vdCBvbiBhIHByb3RvdHlwZSkuXHJcbiAgICBfLmhhcyA9IGZ1bmN0aW9uKG9iaiwga2V5KSB7XHJcbiAgICAgICAgcmV0dXJuIG9iaiAhPSBudWxsICYmIGhhc093blByb3BlcnR5LmNhbGwob2JqLCBrZXkpO1xyXG4gICAgfTtcclxuXHJcbiAgICAvLyBVdGlsaXR5IEZ1bmN0aW9uc1xyXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS1cclxuXHJcbiAgICAvLyBSdW4gVW5kZXJzY29yZS5qcyBpbiAqbm9Db25mbGljdCogbW9kZSwgcmV0dXJuaW5nIHRoZSBgX2AgdmFyaWFibGUgdG8gaXRzXHJcbiAgICAvLyBwcmV2aW91cyBvd25lci4gUmV0dXJucyBhIHJlZmVyZW5jZSB0byB0aGUgVW5kZXJzY29yZSBvYmplY3QuXHJcbiAgICBfLm5vQ29uZmxpY3QgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICByb290Ll8gPSBwcmV2aW91c1VuZGVyc2NvcmU7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9O1xyXG5cclxuICAgIC8vIEtlZXAgdGhlIGlkZW50aXR5IGZ1bmN0aW9uIGFyb3VuZCBmb3IgZGVmYXVsdCBpdGVyYXRlZXMuXHJcbiAgICBfLmlkZW50aXR5ID0gZnVuY3Rpb24odmFsdWUpIHtcclxuICAgICAgICByZXR1cm4gdmFsdWU7XHJcbiAgICB9O1xyXG5cclxuICAgIC8vIFByZWRpY2F0ZS1nZW5lcmF0aW5nIGZ1bmN0aW9ucy4gT2Z0ZW4gdXNlZnVsIG91dHNpZGUgb2YgVW5kZXJzY29yZS5cclxuICAgIF8uY29uc3RhbnQgPSBmdW5jdGlvbih2YWx1ZSkge1xyXG4gICAgICAgIHJldHVybiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHZhbHVlO1xyXG4gICAgICAgIH07XHJcbiAgICB9O1xyXG5cclxuICAgIF8ubm9vcCA9IGZ1bmN0aW9uKCkge307XHJcblxyXG4gICAgXy5wcm9wZXJ0eSA9IHByb3BlcnR5O1xyXG5cclxuICAgIC8vIEdlbmVyYXRlcyBhIGZ1bmN0aW9uIGZvciBhIGdpdmVuIG9iamVjdCB0aGF0IHJldHVybnMgYSBnaXZlbiBwcm9wZXJ0eS5cclxuICAgIF8ucHJvcGVydHlPZiA9IGZ1bmN0aW9uKG9iaikge1xyXG4gICAgICAgIHJldHVybiBvYmogPT0gbnVsbCA/IGZ1bmN0aW9uKCkge30gOiBmdW5jdGlvbihrZXkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG9ialtrZXldO1xyXG4gICAgICAgIH07XHJcbiAgICB9O1xyXG5cclxuICAgIC8vIFJldHVybnMgYSBwcmVkaWNhdGUgZm9yIGNoZWNraW5nIHdoZXRoZXIgYW4gb2JqZWN0IGhhcyBhIGdpdmVuIHNldCBvZlxyXG4gICAgLy8gYGtleTp2YWx1ZWAgcGFpcnMuXHJcbiAgICBfLm1hdGNoZXIgPSBfLm1hdGNoZXMgPSBmdW5jdGlvbihhdHRycykge1xyXG4gICAgICAgIGF0dHJzID0gXy5leHRlbmRPd24oe30sIGF0dHJzKTtcclxuICAgICAgICByZXR1cm4gZnVuY3Rpb24ob2JqKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBfLmlzTWF0Y2gob2JqLCBhdHRycyk7XHJcbiAgICAgICAgfTtcclxuICAgIH07XHJcblxyXG4gICAgLy8gUnVuIGEgZnVuY3Rpb24gKipuKiogdGltZXMuXHJcbiAgICBfLnRpbWVzID0gZnVuY3Rpb24obiwgaXRlcmF0ZWUsIGNvbnRleHQpIHtcclxuICAgICAgICB2YXIgYWNjdW0gPSBBcnJheShNYXRoLm1heCgwLCBuKSk7XHJcbiAgICAgICAgaXRlcmF0ZWUgPSBvcHRpbWl6ZUNiKGl0ZXJhdGVlLCBjb250ZXh0LCAxKTtcclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IG47IGkrKykgYWNjdW1baV0gPSBpdGVyYXRlZShpKTtcclxuICAgICAgICByZXR1cm4gYWNjdW07XHJcbiAgICB9O1xyXG5cclxuICAgIC8vIFJldHVybiBhIHJhbmRvbSBpbnRlZ2VyIGJldHdlZW4gbWluIGFuZCBtYXggKGluY2x1c2l2ZSkuXHJcbiAgICBfLnJhbmRvbSA9IGZ1bmN0aW9uKG1pbiwgbWF4KSB7XHJcbiAgICAgICAgaWYgKG1heCA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIG1heCA9IG1pbjtcclxuICAgICAgICAgICAgbWluID0gMDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG1pbiArIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIChtYXggLSBtaW4gKyAxKSk7XHJcbiAgICB9O1xyXG5cclxuICAgIC8vIEEgKHBvc3NpYmx5IGZhc3Rlcikgd2F5IHRvIGdldCB0aGUgY3VycmVudCB0aW1lc3RhbXAgYXMgYW4gaW50ZWdlci5cclxuICAgIF8ubm93ID0gRGF0ZS5ub3cgfHwgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xyXG4gICAgfTtcclxuXHJcbiAgICAvLyBMaXN0IG9mIEhUTUwgZW50aXRpZXMgZm9yIGVzY2FwaW5nLlxyXG4gICAgdmFyIGVzY2FwZU1hcCA9IHtcclxuICAgICAgICAnJic6ICcmYW1wOycsXHJcbiAgICAgICAgJzwnOiAnJmx0OycsXHJcbiAgICAgICAgJz4nOiAnJmd0OycsXHJcbiAgICAgICAgJ1wiJzogJyZxdW90OycsXHJcbiAgICAgICAgXCInXCI6ICcmI3gyNzsnLFxyXG4gICAgICAgICdgJzogJyYjeDYwOydcclxuICAgIH07XHJcbiAgICB2YXIgdW5lc2NhcGVNYXAgPSBfLmludmVydChlc2NhcGVNYXApO1xyXG5cclxuICAgIC8vIEZ1bmN0aW9ucyBmb3IgZXNjYXBpbmcgYW5kIHVuZXNjYXBpbmcgc3RyaW5ncyB0by9mcm9tIEhUTUwgaW50ZXJwb2xhdGlvbi5cclxuICAgIHZhciBjcmVhdGVFc2NhcGVyID0gZnVuY3Rpb24obWFwKSB7XHJcbiAgICAgICAgdmFyIGVzY2FwZXIgPSBmdW5jdGlvbihtYXRjaCkge1xyXG4gICAgICAgICAgICByZXR1cm4gbWFwW21hdGNoXTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIC8vIFJlZ2V4ZXMgZm9yIGlkZW50aWZ5aW5nIGEga2V5IHRoYXQgbmVlZHMgdG8gYmUgZXNjYXBlZFxyXG4gICAgICAgIHZhciBzb3VyY2UgPSAnKD86JyArIF8ua2V5cyhtYXApLmpvaW4oJ3wnKSArICcpJztcclxuICAgICAgICB2YXIgdGVzdFJlZ2V4cCA9IFJlZ0V4cChzb3VyY2UpO1xyXG4gICAgICAgIHZhciByZXBsYWNlUmVnZXhwID0gUmVnRXhwKHNvdXJjZSwgJ2cnKTtcclxuICAgICAgICByZXR1cm4gZnVuY3Rpb24oc3RyaW5nKSB7XHJcbiAgICAgICAgICAgIHN0cmluZyA9IHN0cmluZyA9PSBudWxsID8gJycgOiAnJyArIHN0cmluZztcclxuICAgICAgICAgICAgcmV0dXJuIHRlc3RSZWdleHAudGVzdChzdHJpbmcpID8gc3RyaW5nLnJlcGxhY2UocmVwbGFjZVJlZ2V4cCwgZXNjYXBlcikgOiBzdHJpbmc7XHJcbiAgICAgICAgfTtcclxuICAgIH07XHJcbiAgICBfLmVzY2FwZSA9IGNyZWF0ZUVzY2FwZXIoZXNjYXBlTWFwKTtcclxuICAgIF8udW5lc2NhcGUgPSBjcmVhdGVFc2NhcGVyKHVuZXNjYXBlTWFwKTtcclxuXHJcbiAgICAvLyBJZiB0aGUgdmFsdWUgb2YgdGhlIG5hbWVkIGBwcm9wZXJ0eWAgaXMgYSBmdW5jdGlvbiB0aGVuIGludm9rZSBpdCB3aXRoIHRoZVxyXG4gICAgLy8gYG9iamVjdGAgYXMgY29udGV4dDsgb3RoZXJ3aXNlLCByZXR1cm4gaXQuXHJcbiAgICBfLnJlc3VsdCA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHksIGZhbGxiYWNrKSB7XHJcbiAgICAgICAgdmFyIHZhbHVlID0gb2JqZWN0ID09IG51bGwgPyB2b2lkIDAgOiBvYmplY3RbcHJvcGVydHldO1xyXG4gICAgICAgIGlmICh2YWx1ZSA9PT0gdm9pZCAwKSB7XHJcbiAgICAgICAgICAgIHZhbHVlID0gZmFsbGJhY2s7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBfLmlzRnVuY3Rpb24odmFsdWUpID8gdmFsdWUuY2FsbChvYmplY3QpIDogdmFsdWU7XHJcbiAgICB9O1xyXG5cclxuICAgIC8vIEdlbmVyYXRlIGEgdW5pcXVlIGludGVnZXIgaWQgKHVuaXF1ZSB3aXRoaW4gdGhlIGVudGlyZSBjbGllbnQgc2Vzc2lvbikuXHJcbiAgICAvLyBVc2VmdWwgZm9yIHRlbXBvcmFyeSBET00gaWRzLlxyXG4gICAgdmFyIGlkQ291bnRlciA9IDA7XHJcbiAgICBfLnVuaXF1ZUlkID0gZnVuY3Rpb24ocHJlZml4KSB7XHJcbiAgICAgICAgdmFyIGlkID0gKytpZENvdW50ZXIgKyAnJztcclxuICAgICAgICByZXR1cm4gcHJlZml4ID8gcHJlZml4ICsgaWQgOiBpZDtcclxuICAgIH07XHJcblxyXG4gICAgLy8gQnkgZGVmYXVsdCwgVW5kZXJzY29yZSB1c2VzIEVSQi1zdHlsZSB0ZW1wbGF0ZSBkZWxpbWl0ZXJzLCBjaGFuZ2UgdGhlXHJcbiAgICAvLyBmb2xsb3dpbmcgdGVtcGxhdGUgc2V0dGluZ3MgdG8gdXNlIGFsdGVybmF0aXZlIGRlbGltaXRlcnMuXHJcbiAgICBfLnRlbXBsYXRlU2V0dGluZ3MgPSB7XHJcbiAgICAgICAgZXZhbHVhdGU6IC88JShbXFxzXFxTXSs/KSU+L2csXHJcbiAgICAgICAgaW50ZXJwb2xhdGU6IC88JT0oW1xcc1xcU10rPyklPi9nLFxyXG4gICAgICAgIGVzY2FwZTogLzwlLShbXFxzXFxTXSs/KSU+L2dcclxuICAgIH07XHJcblxyXG4gICAgLy8gV2hlbiBjdXN0b21pemluZyBgdGVtcGxhdGVTZXR0aW5nc2AsIGlmIHlvdSBkb24ndCB3YW50IHRvIGRlZmluZSBhblxyXG4gICAgLy8gaW50ZXJwb2xhdGlvbiwgZXZhbHVhdGlvbiBvciBlc2NhcGluZyByZWdleCwgd2UgbmVlZCBvbmUgdGhhdCBpc1xyXG4gICAgLy8gZ3VhcmFudGVlZCBub3QgdG8gbWF0Y2guXHJcbiAgICB2YXIgbm9NYXRjaCA9IC8oLileLztcclxuXHJcbiAgICAvLyBDZXJ0YWluIGNoYXJhY3RlcnMgbmVlZCB0byBiZSBlc2NhcGVkIHNvIHRoYXQgdGhleSBjYW4gYmUgcHV0IGludG8gYVxyXG4gICAgLy8gc3RyaW5nIGxpdGVyYWwuXHJcbiAgICB2YXIgZXNjYXBlcyA9IHtcclxuICAgICAgICBcIidcIjogXCInXCIsXHJcbiAgICAgICAgJ1xcXFwnOiAnXFxcXCcsXHJcbiAgICAgICAgJ1xccic6ICdyJyxcclxuICAgICAgICAnXFxuJzogJ24nLFxyXG4gICAgICAgICdcXHUyMDI4JzogJ3UyMDI4JyxcclxuICAgICAgICAnXFx1MjAyOSc6ICd1MjAyOSdcclxuICAgIH07XHJcblxyXG4gICAgdmFyIGVzY2FwZXIgPSAvXFxcXHwnfFxccnxcXG58XFx1MjAyOHxcXHUyMDI5L2c7XHJcblxyXG4gICAgdmFyIGVzY2FwZUNoYXIgPSBmdW5jdGlvbihtYXRjaCkge1xyXG4gICAgICAgIHJldHVybiAnXFxcXCcgKyBlc2NhcGVzW21hdGNoXTtcclxuICAgIH07XHJcblxyXG4gICAgLy8gSmF2YVNjcmlwdCBtaWNyby10ZW1wbGF0aW5nLCBzaW1pbGFyIHRvIEpvaG4gUmVzaWcncyBpbXBsZW1lbnRhdGlvbi5cclxuICAgIC8vIFVuZGVyc2NvcmUgdGVtcGxhdGluZyBoYW5kbGVzIGFyYml0cmFyeSBkZWxpbWl0ZXJzLCBwcmVzZXJ2ZXMgd2hpdGVzcGFjZSxcclxuICAgIC8vIGFuZCBjb3JyZWN0bHkgZXNjYXBlcyBxdW90ZXMgd2l0aGluIGludGVycG9sYXRlZCBjb2RlLlxyXG4gICAgLy8gTkI6IGBvbGRTZXR0aW5nc2Agb25seSBleGlzdHMgZm9yIGJhY2t3YXJkcyBjb21wYXRpYmlsaXR5LlxyXG4gICAgXy50ZW1wbGF0ZSA9IGZ1bmN0aW9uKHRleHQsIHNldHRpbmdzLCBvbGRTZXR0aW5ncykge1xyXG4gICAgICAgIGlmICghc2V0dGluZ3MgJiYgb2xkU2V0dGluZ3MpIHNldHRpbmdzID0gb2xkU2V0dGluZ3M7XHJcbiAgICAgICAgc2V0dGluZ3MgPSBfLmRlZmF1bHRzKHt9LCBzZXR0aW5ncywgXy50ZW1wbGF0ZVNldHRpbmdzKTtcclxuXHJcbiAgICAgICAgLy8gQ29tYmluZSBkZWxpbWl0ZXJzIGludG8gb25lIHJlZ3VsYXIgZXhwcmVzc2lvbiB2aWEgYWx0ZXJuYXRpb24uXHJcbiAgICAgICAgdmFyIG1hdGNoZXIgPSBSZWdFeHAoW1xyXG4gICAgICAgICAgICAoc2V0dGluZ3MuZXNjYXBlIHx8IG5vTWF0Y2gpLnNvdXJjZSxcclxuICAgICAgICAgICAgKHNldHRpbmdzLmludGVycG9sYXRlIHx8IG5vTWF0Y2gpLnNvdXJjZSxcclxuICAgICAgICAgICAgKHNldHRpbmdzLmV2YWx1YXRlIHx8IG5vTWF0Y2gpLnNvdXJjZVxyXG4gICAgICAgIF0uam9pbignfCcpICsgJ3wkJywgJ2cnKTtcclxuXHJcbiAgICAgICAgLy8gQ29tcGlsZSB0aGUgdGVtcGxhdGUgc291cmNlLCBlc2NhcGluZyBzdHJpbmcgbGl0ZXJhbHMgYXBwcm9wcmlhdGVseS5cclxuICAgICAgICB2YXIgaW5kZXggPSAwO1xyXG4gICAgICAgIHZhciBzb3VyY2UgPSBcIl9fcCs9J1wiO1xyXG4gICAgICAgIHRleHQucmVwbGFjZShtYXRjaGVyLCBmdW5jdGlvbihtYXRjaCwgZXNjYXBlLCBpbnRlcnBvbGF0ZSwgZXZhbHVhdGUsIG9mZnNldCkge1xyXG4gICAgICAgICAgICBzb3VyY2UgKz0gdGV4dC5zbGljZShpbmRleCwgb2Zmc2V0KS5yZXBsYWNlKGVzY2FwZXIsIGVzY2FwZUNoYXIpO1xyXG4gICAgICAgICAgICBpbmRleCA9IG9mZnNldCArIG1hdGNoLmxlbmd0aDtcclxuXHJcbiAgICAgICAgICAgIGlmIChlc2NhcGUpIHtcclxuICAgICAgICAgICAgICAgIHNvdXJjZSArPSBcIicrXFxuKChfX3Q9KFwiICsgZXNjYXBlICsgXCIpKT09bnVsbD8nJzpfLmVzY2FwZShfX3QpKStcXG4nXCI7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoaW50ZXJwb2xhdGUpIHtcclxuICAgICAgICAgICAgICAgIHNvdXJjZSArPSBcIicrXFxuKChfX3Q9KFwiICsgaW50ZXJwb2xhdGUgKyBcIikpPT1udWxsPycnOl9fdCkrXFxuJ1wiO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGV2YWx1YXRlKSB7XHJcbiAgICAgICAgICAgICAgICBzb3VyY2UgKz0gXCInO1xcblwiICsgZXZhbHVhdGUgKyBcIlxcbl9fcCs9J1wiO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyBBZG9iZSBWTXMgbmVlZCB0aGUgbWF0Y2ggcmV0dXJuZWQgdG8gcHJvZHVjZSB0aGUgY29ycmVjdCBvZmZlc3QuXHJcbiAgICAgICAgICAgIHJldHVybiBtYXRjaDtcclxuICAgICAgICB9KTtcclxuICAgICAgICBzb3VyY2UgKz0gXCInO1xcblwiO1xyXG5cclxuICAgICAgICAvLyBJZiBhIHZhcmlhYmxlIGlzIG5vdCBzcGVjaWZpZWQsIHBsYWNlIGRhdGEgdmFsdWVzIGluIGxvY2FsIHNjb3BlLlxyXG4gICAgICAgIGlmICghc2V0dGluZ3MudmFyaWFibGUpIHNvdXJjZSA9ICd3aXRoKG9ianx8e30pe1xcbicgKyBzb3VyY2UgKyAnfVxcbic7XHJcblxyXG4gICAgICAgIHNvdXJjZSA9IFwidmFyIF9fdCxfX3A9JycsX19qPUFycmF5LnByb3RvdHlwZS5qb2luLFwiICtcclxuICAgICAgICAgICAgXCJwcmludD1mdW5jdGlvbigpe19fcCs9X19qLmNhbGwoYXJndW1lbnRzLCcnKTt9O1xcblwiICtcclxuICAgICAgICAgICAgc291cmNlICsgJ3JldHVybiBfX3A7XFxuJztcclxuXHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgdmFyIHJlbmRlciA9IG5ldyBGdW5jdGlvbihzZXR0aW5ncy52YXJpYWJsZSB8fCAnb2JqJywgJ18nLCBzb3VyY2UpO1xyXG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgICAgICAgZS5zb3VyY2UgPSBzb3VyY2U7XHJcbiAgICAgICAgICAgIHRocm93IGU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB2YXIgdGVtcGxhdGUgPSBmdW5jdGlvbihkYXRhKSB7XHJcbiAgICAgICAgICAgIHJldHVybiByZW5kZXIuY2FsbCh0aGlzLCBkYXRhLCBfKTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAvLyBQcm92aWRlIHRoZSBjb21waWxlZCBzb3VyY2UgYXMgYSBjb252ZW5pZW5jZSBmb3IgcHJlY29tcGlsYXRpb24uXHJcbiAgICAgICAgdmFyIGFyZ3VtZW50ID0gc2V0dGluZ3MudmFyaWFibGUgfHwgJ29iaic7XHJcbiAgICAgICAgdGVtcGxhdGUuc291cmNlID0gJ2Z1bmN0aW9uKCcgKyBhcmd1bWVudCArICcpe1xcbicgKyBzb3VyY2UgKyAnfSc7XHJcblxyXG4gICAgICAgIHJldHVybiB0ZW1wbGF0ZTtcclxuICAgIH07XHJcblxyXG4gICAgLy8gQWRkIGEgXCJjaGFpblwiIGZ1bmN0aW9uLiBTdGFydCBjaGFpbmluZyBhIHdyYXBwZWQgVW5kZXJzY29yZSBvYmplY3QuXHJcbiAgICBfLmNoYWluID0gZnVuY3Rpb24ob2JqKSB7XHJcbiAgICAgICAgdmFyIGluc3RhbmNlID0gXyhvYmopO1xyXG4gICAgICAgIGluc3RhbmNlLl9jaGFpbiA9IHRydWU7XHJcbiAgICAgICAgcmV0dXJuIGluc3RhbmNlO1xyXG4gICAgfTtcclxuXHJcbiAgICAvLyBPT1BcclxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLVxyXG4gICAgLy8gSWYgVW5kZXJzY29yZSBpcyBjYWxsZWQgYXMgYSBmdW5jdGlvbiwgaXQgcmV0dXJucyBhIHdyYXBwZWQgb2JqZWN0IHRoYXRcclxuICAgIC8vIGNhbiBiZSB1c2VkIE9PLXN0eWxlLiBUaGlzIHdyYXBwZXIgaG9sZHMgYWx0ZXJlZCB2ZXJzaW9ucyBvZiBhbGwgdGhlXHJcbiAgICAvLyB1bmRlcnNjb3JlIGZ1bmN0aW9ucy4gV3JhcHBlZCBvYmplY3RzIG1heSBiZSBjaGFpbmVkLlxyXG5cclxuICAgIC8vIEhlbHBlciBmdW5jdGlvbiB0byBjb250aW51ZSBjaGFpbmluZyBpbnRlcm1lZGlhdGUgcmVzdWx0cy5cclxuICAgIHZhciByZXN1bHQgPSBmdW5jdGlvbihpbnN0YW5jZSwgb2JqKSB7XHJcbiAgICAgICAgcmV0dXJuIGluc3RhbmNlLl9jaGFpbiA/IF8ob2JqKS5jaGFpbigpIDogb2JqO1xyXG4gICAgfTtcclxuXHJcbiAgICAvLyBBZGQgeW91ciBvd24gY3VzdG9tIGZ1bmN0aW9ucyB0byB0aGUgVW5kZXJzY29yZSBvYmplY3QuXHJcbiAgICBfLm1peGluID0gZnVuY3Rpb24ob2JqKSB7XHJcbiAgICAgICAgXy5lYWNoKF8uZnVuY3Rpb25zKG9iaiksIGZ1bmN0aW9uKG5hbWUpIHtcclxuICAgICAgICAgICAgdmFyIGZ1bmMgPSBfW25hbWVdID0gb2JqW25hbWVdO1xyXG4gICAgICAgICAgICBfLnByb3RvdHlwZVtuYW1lXSA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIGFyZ3MgPSBbdGhpcy5fd3JhcHBlZF07XHJcbiAgICAgICAgICAgICAgICBwdXNoLmFwcGx5KGFyZ3MsIGFyZ3VtZW50cyk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0KHRoaXMsIGZ1bmMuYXBwbHkoXywgYXJncykpO1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxuXHJcbiAgICAvLyBBZGQgYWxsIG9mIHRoZSBVbmRlcnNjb3JlIGZ1bmN0aW9ucyB0byB0aGUgd3JhcHBlciBvYmplY3QuXHJcbiAgICBfLm1peGluKF8pO1xyXG5cclxuICAgIC8vIEFkZCBhbGwgbXV0YXRvciBBcnJheSBmdW5jdGlvbnMgdG8gdGhlIHdyYXBwZXIuXHJcbiAgICBfLmVhY2goWydwb3AnLCAncHVzaCcsICdyZXZlcnNlJywgJ3NoaWZ0JywgJ3NvcnQnLCAnc3BsaWNlJywgJ3Vuc2hpZnQnXSwgZnVuY3Rpb24obmFtZSkge1xyXG4gICAgICAgIHZhciBtZXRob2QgPSBBcnJheVByb3RvW25hbWVdO1xyXG4gICAgICAgIF8ucHJvdG90eXBlW25hbWVdID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHZhciBvYmogPSB0aGlzLl93cmFwcGVkO1xyXG4gICAgICAgICAgICBtZXRob2QuYXBwbHkob2JqLCBhcmd1bWVudHMpO1xyXG4gICAgICAgICAgICBpZiAoKG5hbWUgPT09ICdzaGlmdCcgfHwgbmFtZSA9PT0gJ3NwbGljZScpICYmIG9iai5sZW5ndGggPT09IDApIGRlbGV0ZSBvYmpbMF07XHJcbiAgICAgICAgICAgIHJldHVybiByZXN1bHQodGhpcywgb2JqKTtcclxuICAgICAgICB9O1xyXG4gICAgfSk7XHJcblxyXG4gICAgLy8gQWRkIGFsbCBhY2Nlc3NvciBBcnJheSBmdW5jdGlvbnMgdG8gdGhlIHdyYXBwZXIuXHJcbiAgICBfLmVhY2goWydjb25jYXQnLCAnam9pbicsICdzbGljZSddLCBmdW5jdGlvbihuYW1lKSB7XHJcbiAgICAgICAgdmFyIG1ldGhvZCA9IEFycmF5UHJvdG9bbmFtZV07XHJcbiAgICAgICAgXy5wcm90b3R5cGVbbmFtZV0gPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdCh0aGlzLCBtZXRob2QuYXBwbHkodGhpcy5fd3JhcHBlZCwgYXJndW1lbnRzKSk7XHJcbiAgICAgICAgfTtcclxuICAgIH0pO1xyXG5cclxuICAgIC8vIEV4dHJhY3RzIHRoZSByZXN1bHQgZnJvbSBhIHdyYXBwZWQgYW5kIGNoYWluZWQgb2JqZWN0LlxyXG4gICAgXy5wcm90b3R5cGUudmFsdWUgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fd3JhcHBlZDtcclxuICAgIH07XHJcblxyXG4gICAgLy8gUHJvdmlkZSB1bndyYXBwaW5nIHByb3h5IGZvciBzb21lIG1ldGhvZHMgdXNlZCBpbiBlbmdpbmUgb3BlcmF0aW9uc1xyXG4gICAgLy8gc3VjaCBhcyBhcml0aG1ldGljIGFuZCBKU09OIHN0cmluZ2lmaWNhdGlvbi5cclxuICAgIF8ucHJvdG90eXBlLnZhbHVlT2YgPSBfLnByb3RvdHlwZS50b0pTT04gPSBfLnByb3RvdHlwZS52YWx1ZTtcclxuXHJcbiAgICBfLnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHJldHVybiAnJyArIHRoaXMuX3dyYXBwZWQ7XHJcbiAgICB9O1xyXG5cclxuICAgIC8vIEFNRCByZWdpc3RyYXRpb24gaGFwcGVucyBhdCB0aGUgZW5kIGZvciBjb21wYXRpYmlsaXR5IHdpdGggQU1EIGxvYWRlcnNcclxuICAgIC8vIHRoYXQgbWF5IG5vdCBlbmZvcmNlIG5leHQtdHVybiBzZW1hbnRpY3Mgb24gbW9kdWxlcy4gRXZlbiB0aG91Z2ggZ2VuZXJhbFxyXG4gICAgLy8gcHJhY3RpY2UgZm9yIEFNRCByZWdpc3RyYXRpb24gaXMgdG8gYmUgYW5vbnltb3VzLCB1bmRlcnNjb3JlIHJlZ2lzdGVyc1xyXG4gICAgLy8gYXMgYSBuYW1lZCBtb2R1bGUgYmVjYXVzZSwgbGlrZSBqUXVlcnksIGl0IGlzIGEgYmFzZSBsaWJyYXJ5IHRoYXQgaXNcclxuICAgIC8vIHBvcHVsYXIgZW5vdWdoIHRvIGJlIGJ1bmRsZWQgaW4gYSB0aGlyZCBwYXJ0eSBsaWIsIGJ1dCBub3QgYmUgcGFydCBvZlxyXG4gICAgLy8gYW4gQU1EIGxvYWQgcmVxdWVzdC4gVGhvc2UgY2FzZXMgY291bGQgZ2VuZXJhdGUgYW4gZXJyb3Igd2hlbiBhblxyXG4gICAgLy8gYW5vbnltb3VzIGRlZmluZSgpIGlzIGNhbGxlZCBvdXRzaWRlIG9mIGEgbG9hZGVyIHJlcXVlc3QuXHJcbiAgICBpZiAodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKSB7XHJcbiAgICAgICAgZGVmaW5lKCd1bmRlcnNjb3JlJywgW10sIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gXztcclxuICAgICAgICB9KTtcclxuICAgIH1cclxufS5jYWxsKHRoaXMpKTsiXX0=