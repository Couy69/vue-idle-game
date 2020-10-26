import fabricObj from 'fabric'
/*
 * fabric.js Controls Extension
 * for fabric.js current build
 * Simon Kunz 09.02.2016 for pixolith
 * Licensed under the MIT license.
 */
var fabric = fabricObj.fabric,
    minExtCompat = '1.6.0',
    isVML = function () {
        return typeof G_vmlCanvasManager !== 'undefined';
    },
    degreesToRadians = fabric.util.degreesToRadians,
    cursorOffset = {
        mt: 0, // n
        tr: 1, // ne
        mr: 2, // e
        br: 3, // se
        mb: 4, // s
        bl: 5, // sw
        ml: 6, // w
        tl: 7, // nw
    };

if (minExtCompat.localeCompare(fabric.version) > -1) {
    console.warn('this extension might not be fully compatible with your version ' +
        'of fabric.js (' + fabric.version + ').' +
        'Consider using the latest compatible build of fabric.js (> ' + minExtCompat + ')'
    );
}

fabric.util.object.extend(fabric.Object.prototype, {

    /**
     * When true, image icons are loaded via the drawImage method
     * @type Boolean
     * @default false
     */

    useCustomIcons: false,

    /**
     * Sets a background-color for drawImage operations with transparency
     * @type string
     * @default transparent
     */

    cornerBackgroundColor: 'transparent',

    /**
     * Sets the shape of the background for drawImage operations with transparency
     * @type string
     * @default rect
     */

    cornerShape: '',

    /**
     * Inner Padding between Shape Background and drawn Image
     * @type int
     * @default rect
     */

    cornerPadding: 0,

    /**
     * Set a custom corner icon
     * @param {Object} obj settings and icon url.
     * @param callback function
     */

    customiseCornerIcons: function (obj, callback) {
        var setting,
            cornerConfig;

        for (setting in obj) {
            if (obj.hasOwnProperty(setting)) {

                cornerConfig = {};

                if (obj[setting].cornerShape !== undefined) {
                    this.cornerShape = obj[setting].cornerShape;
                }

                if (obj[setting].cornerBackgroundColor !== undefined) {
                    this.cornerBackgroundColor = obj[setting].cornerBackgroundColor;
                }

                if (obj[setting].borderColor !== undefined) {
                    this.borderColor = obj[setting].borderColor;
                }

                if (obj[setting].cornerSize !== undefined) {
                    this.cornerSize = obj[setting].cornerSize;
                }

                if (obj[setting].cornerPadding !== undefined) {
                    this.cornerPadding = obj[setting].cornerPadding;
                }

                if (obj[setting].icon !== undefined || Object.keys(obj)[0] === 'settings') {
                    this.useCustomIcons = true;

                    if (obj[setting].settings !== undefined) {
                        cornerConfig.settings = obj[setting].settings;
                    }

                    if (obj[setting].icon !== undefined) {
                        cornerConfig.icon = obj[setting].icon;

                        this.loadIcon(setting, cornerConfig, function () {
                            if (callback && typeof (callback) === 'function') {
                                callback();
                            }
                        });
                    }
                }
            }
        }
    },

    /**
     * loads the icon image as an image src.
     * @param {Object} corner to load an icon.
     * @param cornerConfig as object containing icon url and corner specific settings
     * @param callback function.
     */

    loadIcon: function (corner, cornerConfig, callback) {
        var self = this,
            icon = new Image();

        icon.onload = function () {
            self[corner + 'Icon'] = this;

            if (cornerConfig.settings) {
                self[corner + 'Settings'] = cornerConfig.settings;
            }

            if (callback && typeof (callback) === 'function') {
                callback();
            }
        };

        icon.onerror = function () {
            fabric.warn(this.src + ' icon is not an image');
        };

        if (cornerConfig.icon.match(/^http[s]?:\/\//) || cornerConfig.icon.substring(0, 2) === '//') {
            icon.crossOrigin = 'Anonymous';
        }

        icon.src = cornerConfig.icon;
    },

    /**
     * copy of the setter method for our american friends.
     * @param {Object} obj containing corner icon urls and settings.
     */

    customizeCornerIcons: function (obj) {
        this.customiseCornerIcons(obj);
    },

    /**
     * Draws corners of an object's bounding box.
     * Requires public properties: width, height
     * Requires public options: cornerSize, padding
     * @param {CanvasRenderingContext2D} ctx Context to draw on
     * @return {fabric.Object} thisArg
     * @chainable
     */

    drawControls: function (ctx) {

        if (!this.hasControls) {
            return this;
        }

        var wh = this._calculateCurrentDimensions(),
            width = wh.x,
            height = wh.y,
            scaleOffset = this.cornerSize,
            left = -(width + scaleOffset) / 2,
            top = -(height + scaleOffset) / 2,
            methodName;

        if (!this.useCustomIcons) {
            ctx.lineWidth = 1;
            ctx.globalAlpha = this.isMoving ? this.borderOpacityWhenMoving : 1;
            ctx.strokeStyle = ctx.fillStyle = this.cornerColor;

            if (!this.transparentCorners) {
                ctx.strokeStyle = this.cornerStrokeColor;
            }

            methodName = this.transparentCorners ? 'stroke' : 'fill';
        } else {
            methodName = 'drawImage';
        }

        ctx.save();
        this._setLineDash(ctx, this.cornerDashArray, null);

        // top-left
        this._drawControl('tl', ctx, methodName,
            left,
            top,
            this.tlIcon,
            this.tlSettings
        );

        // top-right
        this._drawControl('tr', ctx, methodName,
            left + width,
            top,
            this.trIcon,
            this.trSettings
        );

        // bottom-left
        this._drawControl('bl', ctx, methodName,
            left,
            top + height,
            this.blIcon,
            this.blSettings
        );

        // bottom-right
        this._drawControl('br', ctx, methodName,
            left + width,
            top + height,
            this.brIcon,
            this.brSettings
        );

        if (!this.get('lockUniScaling')) {

            // middle-top
            this._drawControl('mt', ctx, methodName,
                left + width / 2,
                top,
                this.mtIcon,
                this.mtSettings
            );

            // middle-bottom
            this._drawControl('mb', ctx, methodName,
                left + width / 2,
                top + height,
                this.mbIcon,
                this.mbSettings
            );

            // middle-right
            this._drawControl('mr', ctx, methodName,
                left + width,
                top + height / 2,
                this.mrIcon,
                this.mrSettings
            );

            // middle-left
            this._drawControl('ml', ctx, methodName,
                left,
                top + height / 2,
                this.mlIcon,
                this.mlSettings
            );
        }

        // middle-top-rotate
        if (this.hasRotatingPoint) {
            this._drawControl('mtr', ctx, methodName,
                left + width / 2,
                top - this.rotatingPointOffset,
                this.mtrIcon,
                this.mtrSettings
            );
        }

        ctx.restore();

        return this;
    },

    /** Draw controls either with background-shape and color (transparency) or plain image (modified core method)
     * @private
     * {string} icon url of the control
     */

    _drawControl: function (control, ctx, methodName, left, top, icon, settings) {
        if (!this.isControlVisible(control)) {
            return;
        }

        var size = this.cornerSize,
            cornerStroke = this.cornerStrokeColor || 'transparent',
            cornerBG = this.cornerBackgroundColor || 'black',
            cornerShape = this.cornerShape || 'rect',
            cornerPadding = typeof this.cornerPadding === 'number' ? this.cornerPadding : 10;

        if (settings) {
            if (settings.cornerSize) {
                // Set the size, and also recalc left and top
                left = left + size / 2 - settings.cornerSize / 2;
                top = top + size / 2 - settings.cornerSize / 2;
                size = settings.cornerSize;
            }
            cornerShape = settings.cornerShape || cornerShape;
            cornerBG = settings.cornerBackgroundColor || cornerBG;
            cornerPadding = typeof settings.cornerPadding === 'number' ? settings.cornerPadding : cornerPadding;
            cornerStroke = settings.cornerStrokeColor || cornerStroke;
        }

        if (this.useCustomIcons) {
            if (cornerShape) {
                ctx.globalAlpha = 1;
                ctx.fillStyle = cornerBG;
                ctx.lineWidth = 1;
                ctx.strokeStyle = cornerStroke;
                switch (cornerShape) {
                    case 'rect':
                        ctx.fillRect(left, top, size, size);

                        if (cornerStroke) {
                            ctx.strokeRect(left, top, size, size);
                        }

                        break;
                    case 'circle':
                        ctx.beginPath();
                        ctx.arc(left + size / 2, top + size / 2, size / 2, 0, 2 * Math.PI);
                        ctx.fill();

                        if (cornerStroke) {
                            ctx.stroke();
                        }

                        ctx.closePath();
                        break;
                }

                if (icon !== undefined) {
                    ctx[methodName](
                        icon,
                        left + cornerPadding / 2,
                        top + cornerPadding / 2,
                        size - cornerPadding,
                        size - cornerPadding
                    );
                }

            } else {
                if (icon !== undefined) {
                    ctx[methodName](
                        icon,
                        left,
                        top,
                        size,
                        size
                    );
                }
            }
        } else {
            isVML() || this.transparentCorners || ctx.clearRect(left, top, size, size);
            ctx[methodName + 'Rect'](left, top, size, size);
            if (!this.transparentCorners && cornerStroke) {
                ctx.strokeRect(left, top, size, size);
            }
        }

    },
});

fabric.util.object.extend(fabric.Canvas.prototype, {
    /**
     * When true, actions can be overwritten
     * @type Boolean
     * @default false
     */

    overwriteActions: false,

    /**
     * When true, cursors are fixed
     * @type Boolean
     * @default false
     */

    fixedCursors: false,

    /**
     * setter Method for actions and cursors.
     * @param {Object} obj containing corner action and cursor url/type.
     */

    customiseControls: function (obj) {
        var setting;
        for (setting in obj) {
            if (obj.hasOwnProperty(setting)) {
                if (obj[setting].action !== undefined) {
                    this.overwriteActions = true;
                    this.setCustomAction(setting, obj[setting].action);
                }

                if (obj[setting].cursor !== undefined) {
                    this.fixedCursors = true;
                    this.setCustomCursor(setting, obj[setting].cursor);
                }
            }
        }
    },

    /**
     * loads the icon image as an image src.
     * @param {Object} corner to load an icon.
     * @param action as a string.
     */

    setCustomAction: function (corner, action) {
        this[corner + 'Action'] = action;
    },

    /**
     * loads the icon image as an image src.
     * @param {Object} corner to load an icon.
     * @param cursorUrl as a string.
     */

    setCustomCursor: function (corner, cursorUrl) {
        this[corner + 'cursorIcon'] = cursorUrl;
    },

    /**
     * copy of the setter method for our american friends.
     * @param {Object} obj containing corner action and cursor url/type.
     */

    customizeControls: function (obj) {
        this.customiseControls(obj);
    },

    /**
     * @private
     */

    _getActionFromCorner: function (target, corner, e) {
        if (!corner) {
            return 'drag';
        }

        if (corner) {
            if (this[corner + 'Action'] && this.overwriteActions) {
                switch (corner) {
                    case 'mtr':
                        return this[corner + 'Action'] || 'rotate';
                    case 'ml':
                    case 'mr':
                        if (e[this.altActionKey]) {
                            return e[this.altActionKey] ? 'skewY' : 'scaleX';
                        }
                        return this[corner + 'Action'];
                    case 'mt':
                    case 'mb':
                        if (e[this.altActionKey]) {
                            return e[this.altActionKey] ? 'skewY' : 'scaleY';
                        }
                        return this[corner + 'Action'];
                    default:
                        return this[corner + 'Action'] || 'scale';
                }
            } else {
                switch (corner) {
                    case 'mtr':
                        return 'rotate';
                    case 'ml':
                    case 'mr':
                        return e[this.altActionKey] ? 'skewY' : 'scaleX';
                    case 'mt':
                    case 'mb':
                        return e[this.altActionKey] ? 'skewX' : 'scaleY';
                    default:
                        return 'scale';
                }
            }
        }

        return false;
    },

    /**
     * @private
     * @param {Event} e Event object
     * @param {fabric.Object} target
     */
    _setupCurrentTransform: function (e, target) {
        if (!target) {
            return;
        }

        var pointer = this.getPointer(e),
            corner = target._findTargetCorner(this.getPointer(e, true)),
            action = this._getActionFromCorner(target, corner, e),
            origin = this._getOriginFromCorner(target, corner);

        if (typeof action === 'function') {
            action.call(this, e, target);

            // as of fabric 1.7.11 object cache will try to slice the action to check for scale so we need to convert this to a string
            action = 'void';
        }

        this._currentTransform = {
            target: target,
            action: action,
            corner: corner,
            scaleX: target.scaleX,
            scaleY: target.scaleY,
            skewX: target.skewX,
            skewY: target.skewY,
            offsetX: pointer.x - target.left,
            offsetY: pointer.y - target.top,
            originX: origin.x,
            originY: origin.y,
            ex: pointer.x,
            ey: pointer.y,
            lastX: pointer.x,
            lastY: pointer.y,
            left: target.left,
            top: target.top,
            theta: degreesToRadians(target.angle),
            width: target.width * target.scaleX,
            mouseXSign: 1,
            mouseYSign: 1,
            shiftKey: e.shiftKey,
            altKey: e[this.centeredKey],
        };

        this._currentTransform.original = {
            left: target.left,
            top: target.top,
            scaleX: target.scaleX,
            scaleY: target.scaleY,
            skewX: target.skewX,
            skewY: target.skewY,
            originX: origin.x,
            originY: origin.y,
        };

        if (action === 'remove') {
            this._removeAction(e, target);
        }

        if (action === 'moveUp') {
            this._moveLayerUpAction(e, target);
        }

        if (action === 'moveDown') {
            this._moveLayerDownAction(e, target);
        }

        if (typeof action === 'object') {
            if (Object.keys(action)[0] === 'rotateByDegrees') {
                this._rotateByDegrees(e, target, action.rotateByDegrees);
            }
        }

        this._resetCurrentTransform();
    },

    /**
     * Custom remove object action
     * @private
     * @param {Event} e Event object
     * @param {fabric.Object} target
     */

    _removeAction: function (e, target) {
        var _this = this;
        if (this.getActiveGroup() && this.getActiveGroup() !== 'undefined') {
            this.getActiveGroup().forEachObject(function (o) {
                o.off();
                o.remove();
            });
            this.discardActiveGroup();

            // as of fabric 1.6.3 necessary for reasons..
            setTimeout(function () {
                _this.deactivateAll();
            }, 0);

        } else {
            target.off();
            target.remove();

            setTimeout(function () {
                _this.deactivateAll();
            }, 0);
        }
    },

    /**
     * Custom move up object action
     * @private
     * @param {Event} e Event object
     * @param {fabric.Object} target
     */

    _moveLayerUpAction: function (e, target) {
        if (this.getActiveGroup() && this.getActiveGroup() !== 'undefined') {
            this.getActiveGroup().forEachObject(function (o) {
                o.bringForward();
            });
        } else {
            target.bringForward();
        }
    },

    /**
     * Custom move down object action
     * @private
     * @param {Event} e Event object
     * @param {fabric.Object} target
     */

    _moveLayerDownAction: function (e, target) {
        if (this.getActiveGroup() && this.getActiveGroup() !== 'undefined') {
            this.getActiveGroup().forEachObject(function (o) {
                o.sendBackwards();
            });
        } else {
            target.sendBackwards();
        }
    },

    /**
     * Custom move down object action
     * @private
     * @param {Event} e Event object
     * @param {fabric.Object} target
     * @param {Integer} value of rotation
     */

    _rotateByDegrees: function (e, target, value) {
        var angle = parseInt(target.getAngle()) + value,
            needsOriginRestore = false;

        if ((target.originX !== 'center' || target.originY !== 'center') && target.centeredRotation) {
            this._setOriginToCenter(target);
            needsOriginRestore = true;
        }

        angle = angle > 360 ? angle - 360 : angle;

        if (this.getActiveGroup() && this.getActiveGroup() !== 'undefined') {
            this.getActiveGroup().forEachObject(function (obj) {
                obj
                    .setAngle(angle)
                    .setCoords();
            });
        } else {
            target
                .setAngle(angle)
                .setCoords();
        }

        if (needsOriginRestore) {
            this._setCenterToOrigin(target);
        }

        this.renderAll();
    },

    /**
     * Sets either the standard behaviour cursors or if fixedCursors is true, tries to set a custom cursor
     * either by using an icon or a build-in cursor. Cursor icon extensions are matched with a regular expression.
     * @private
     * {string} corner name
     * {target} event handler of the hovered corner
     */
    _setCornerCursor: function (corner, target, e) {
        var iconUrlPattern = /\.(?:jpe?g|png|gif|jpg|jpeg|svg)$/;

        if (this.fixedCursors && this[corner + 'cursorIcon']) {
            if (this[corner + 'cursorIcon'].match(iconUrlPattern)) {
                this.setCursor('url(' + this[corner + 'cursorIcon'] + '), auto');
            } else {
                if (this[corner + 'cursorIcon'] === 'resize') {
                    this.setCursor(this._getRotatedCornerCursor(corner, target, e));
                } else {
                    this.setCursor(this[corner + 'cursorIcon']);
                }
            }
        } else {
            if (corner in cursorOffset) {
                this.setCursor(this._getRotatedCornerCursor(corner, target, e));
            } else if (corner === 'mtr' && target.hasRotatingPoint) {
                this.setCursor(this.rotationCursor);
            } else {
                this.setCursor(this.defaultCursor);
                return false;
            }
        }

        return false;
    },
});

export default fabric;