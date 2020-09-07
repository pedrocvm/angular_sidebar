(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('angular'), require('tslib'), require('reflect-metadata')) :
    typeof define === 'function' && define.amd ? define(['exports', 'angular', 'tslib', 'reflect-metadata'], factory) :
    (global = global || self, factory(global['angular-ts-decorators'] = {}, global.angular, global.tslib_1));
}(this, function (exports, angular, tslib_1) { 'use strict';

    const platformBrowserDynamic = () => PlatformRef;
    class PlatformRef {
        static bootstrapModule(moduleType, compilerOptions = { strictDi: false }) {
            let moduleName;
            switch (typeof moduleType) {
                case 'string': // module name string
                    moduleName = moduleType;
                    break;
                case 'object': // angular.module object
                    moduleName = moduleType.name;
                    break;
                case 'function': // NgModule class
                default:
                    const module = moduleType.module;
                    if (!module) {
                        throw Error('Argument moduleType should be NgModule class, angular.module object or module name string');
                    }
                    moduleName = module.name;
            }
            const strictDi = (compilerOptions.strictDi === true);
            angular.element(document).ready(() => {
                angular.bootstrap(document.body, [moduleName], { strictDi });
            });
        }
    }

    /**
     * @license
     * Copyright Google Inc. All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    /**
     * A wrapper around a native element inside of a View.
     * @stable
     */
    class ElementRef {
        constructor($element) {
            $element['nativeElement'] = $element[0];
            return $element;
        }
    }

    (function (Declaration) {
        Declaration["Component"] = "Component";
        Declaration["Directive"] = "Directive";
        Declaration["Pipe"] = "Pipe";
    })(exports.Declaration || (exports.Declaration = {}));
    /** @internal */
    const metadataKeys = {
        declaration: 'custom:declaration',
        name: 'custom:name',
        bindings: 'custom:bindings',
        require: 'custom:require',
        options: 'custom:options',
        listeners: 'custom:listeners',
        viewChildren: 'custom:viewChildren',
    };
    function kebabToCamel(input) {
        return input.replace(/(-\w)/g, (m) => m[1].toUpperCase());
    }
    function camelToKebab(str) {
        return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
    }
    /** @internal */
    function getAttributeName(selector) {
        return selector.substr(1, selector.length - 2);
    }
    /** @internal */
    function isAttributeSelector(selector) {
        return /^[\[].*[\]]$/g.test(selector);
    }
    /** @internal */
    function getMetadata(metadataKey, target) {
        return Reflect.getMetadata(metadataKey, target);
    }
    /** @internal */
    function defineMetadata(metadataKey, metadataValue, target) {
        Reflect.defineMetadata(metadataKey, metadataValue, target);
    }
    function getTypeName(target) {
        return getMetadata(metadataKeys.name, target);
    }
    function getTypeDeclaration(target) {
        return getMetadata(metadataKeys.declaration, target);
    }

    /**
     * @internal
     * @desc Mapping between angular and angularjs LifecycleHooks
     */
    const ngLifecycleHooksMap = {
        ngOnInit: '$onInit',
        ngOnDestroy: '$onDestroy',
        ngDoCheck: '$doCheck',
        ngOnChanges: '$onChanges',
        ngAfterViewInit: '$postLink'
    };

    function Component(_a) {
        var { selector } = _a, options = tslib_1.__rest(_a, ["selector"]);
        return (ctrl) => {
            options.controller = ctrl;
            const isAttrSelector = isAttributeSelector(selector);
            const bindings = getMetadata(metadataKeys.bindings, ctrl);
            if (bindings) {
                if (isAttrSelector) {
                    options['bindToController'] = bindings;
                    options['controllerAs'] = options['controllerAs'] || '$ctrl';
                }
                else
                    options['bindings'] = bindings;
            }
            const require = getMetadata(metadataKeys.require, ctrl);
            if (require) {
                options.require = require;
            }
            if (isAttrSelector) {
                options.restrict = 'A';
            }
            replaceLifecycleHooks(ctrl);
            const selectorName = isAttrSelector ? getAttributeName(selector) : selector;
            defineMetadata(metadataKeys.name, kebabToCamel(selectorName), ctrl);
            defineMetadata(metadataKeys.declaration, isAttrSelector ? exports.Declaration.Directive : exports.Declaration.Component, ctrl);
            defineMetadata(metadataKeys.options, options, ctrl);
        };
    }
    /** @internal */
    function registerComponent(module, component) {
        const name = getMetadata(metadataKeys.name, component);
        const options = getMetadata(metadataKeys.options, component);
        const listeners = getMetadata(metadataKeys.listeners, options.controller);
        const viewChildren = getMetadata(metadataKeys.viewChildren, component);
        if (listeners || viewChildren) {
            options.controller = extendWithHostListenersAndChildren(options.controller, listeners, viewChildren);
        }
        module.component(name, options);
    }
    /** @internal */
    function extendWithHostListenersAndChildren(ctrl, listeners = {}, viewChildren = {}) {
        const handlers = Object.keys(listeners);
        const namespace = '.HostListener';
        const properties = Object.keys(viewChildren);
        class NewCtrl extends ctrl {
            constructor($element, ...args) {
                super(...args);
                this.$element = $element;
            }
            _updateViewChildren() {
                properties.forEach(property => {
                    const child = viewChildren[property];
                    let selector;
                    if (typeof child.selector !== 'string') {
                        const type = getTypeDeclaration(child.selector);
                        if (type !== exports.Declaration.Component && type !== exports.Declaration.Directive) {
                            console.error(`No valid selector was provided for ViewChild${child.first ? '' :
                            'ren'} decorator, it should be type or selector of component/directive`);
                            return;
                        }
                        selector = camelToKebab(getTypeName(child.selector));
                    }
                    else
                        selector = `#${child.selector}`;
                    const viewChildEls = Array.prototype.slice.call(this.$element[0].querySelectorAll(selector))
                        .map((viewChild) => {
                        // if ViewChild selector is type use selector derived from type
                        // otherwise (i.e. id of the element), get it's element name (localName)
                        const componentName = typeof child.selector === 'string' ? viewChild.localName : selector;
                        const el = angular.element(viewChild);
                        const $ctrl = el && el.controller(kebabToCamel(componentName));
                        return child.read ? new ElementRef(el) : ($ctrl || new ElementRef(el));
                    })
                        .filter(el => !!el);
                    if (viewChildEls.length) {
                        this[property] = child.first ? viewChildEls[0] : viewChildEls;
                    }
                    else {
                        this[property] = undefined;
                    }
                });
            }
            $postLink() {
                if (super.$postLink) {
                    super.$postLink();
                }
                handlers.forEach(handler => {
                    const { eventName } = listeners[handler];
                    this.$element.on(eventName + namespace, this[handler].bind(this));
                });
                this._updateViewChildren();
            }
            $onChanges(changes) {
                if (super.$onChanges) {
                    super.$onChanges(changes);
                }
                this._updateViewChildren();
            }
            $onDestroy() {
                if (super.$onDestroy) {
                    super.$onDestroy();
                }
                if (handlers.length) {
                    this.$element.off(namespace);
                }
            }
        }
        NewCtrl.$inject = ['$element', ...ctrl.$inject || []];
        return NewCtrl;
    }
    /** @internal */
    function replaceLifecycleHooks(ctrl) {
        const ctrlClass = ctrl.prototype;
        const ngHooksFound = getHooksOnCtrlClass(ctrlClass);
        ngHooksFound.forEach((ngHook) => {
            const angularJsHook = ngLifecycleHooksMap[ngHook];
            ctrlClass[angularJsHook] = ctrlClass[ngHook];
        });
    }
    /** @internal */
    function getHooksOnCtrlClass(ctrlClass) {
        return Object.keys(ngLifecycleHooksMap)
            .filter((hook) => angular.isFunction(ctrlClass[hook]));
    }

    function Directive(_a) {
        var { selector } = _a, options = tslib_1.__rest(_a, ["selector"]);
        return (ctrl) => {
            const bindings = getMetadata(metadataKeys.bindings, ctrl);
            if (bindings) {
                options.bindToController = bindings;
            }
            const require = getMetadata(metadataKeys.require, ctrl);
            if (require) {
                options.require = require;
                if (!options.bindToController)
                    options.bindToController = true;
            }
            options.restrict = options.restrict || 'A';
            const selectorName = isAttributeSelector(selector) ? getAttributeName(selector) : selector;
            defineMetadata(metadataKeys.name, kebabToCamel(selectorName), ctrl);
            defineMetadata(metadataKeys.declaration, exports.Declaration.Directive, ctrl);
            defineMetadata(metadataKeys.options, options, ctrl);
        };
    }
    /** @internal */
    function registerDirective(module, ctrl) {
        let directiveFunc;
        const name = getMetadata(metadataKeys.name, ctrl);
        const options = getMetadata(metadataKeys.options, ctrl);
        replaceLifecycleHooks(ctrl);
        const listeners = getMetadata(metadataKeys.listeners, ctrl);
        const viewChildren = getMetadata(metadataKeys.viewChildren, ctrl);
        options.controller = listeners || viewChildren ?
            extendWithHostListenersAndChildren(ctrl, listeners, viewChildren) : ctrl;
        directiveFunc = () => options;
        module.directive(name, directiveFunc);
    }

    function Injectable(name) {
        return (Class) => {
            if (name) {
                defineMetadata(metadataKeys.name, name, Class);
            }
        };
    }
    function Inject(name) {
        return (target, propertyKey, parameterIndex) => {
            // if @Inject decorator is on target's method
            if (propertyKey && Array.isArray(target[propertyKey])) {
                target[propertyKey][parameterIndex] = name;
                return; // exit, don't change injection on target's constructor
            }
            // if @Inject decorator is on target's constructor
            if (target.$inject) {
                target.$inject[parameterIndex] = name;
            }
            else {
                console.error(`Annotations should be provided as static $inject property in order to use @Inject decorator`);
            }
        };
    }
    /** @internal */
    function registerProviders(module, providers) {
        providers.forEach((provider) => {
            // providers registered using { provide, useClass/useFactory/useValue } syntax
            if (provider.provide) {
                const name = provider.provide;
                if (provider.useClass && provider.useClass instanceof Function) {
                    module.service(name, provider.useClass);
                }
                else if (provider.useFactory && provider.useFactory instanceof Function) {
                    provider.useFactory.$inject = provider.deps || provider.useFactory.$inject;
                    module.factory(name, provider.useFactory);
                }
                else if (provider.useValue) {
                    module.constant(name, provider.useValue);
                }
            }
            // providers registered as classes
            else {
                const name = getMetadata(metadataKeys.name, provider);
                if (!name) {
                    console.error(`${provider.name} was not registered as angular service:
        Provide explicit name in @Injectable when using class syntax or register it using object provider syntax:
        { provide: '${provider.name}', useClass: ${provider.name} }`);
                }
                else {
                    module.service(name, provider);
                }
            }
        });
    }

    function Pipe(options) {
        return (Class) => {
            defineMetadata(metadataKeys.name, options.name, Class);
            defineMetadata(metadataKeys.declaration, exports.Declaration.Pipe, Class);
        };
    }
    /** @internal */
    function registerPipe(module, filter) {
        const name = getMetadata(metadataKeys.name, filter);
        const filterFactory = (...args) => {
            const injector = args[0]; // reference to $injector
            const instance = injector.instantiate(filter);
            return instance.transform.bind(instance);
        };
        filterFactory.$inject = ['$injector', ...filter.$inject || []];
        module.filter(name, filterFactory);
    }

    function Input(alias) {
        return (target, key) => addBindingToMetadata(target, key, '<?', alias);
    }
    function Output(alias) {
        return (target, key) => addBindingToMetadata(target, key, '&', alias);
    }
    function ViewParent(controller) {
        return (target, key) => addRequireToMetadata(target, key, controller);
    }
    /** @internal */
    function addBindingToMetadata(target, key, direction, alias) {
        const targetConstructor = target.constructor;
        const bindings = getMetadata(metadataKeys.bindings, targetConstructor) || {};
        bindings[key] = alias || direction;
        defineMetadata(metadataKeys.bindings, bindings, targetConstructor);
    }
    /** @internal */
    function addRequireToMetadata(target, key, controller) {
        const targetConstructor = target.constructor;
        const require = getMetadata(metadataKeys.require, targetConstructor) || {};
        require[key] = controller;
        defineMetadata(metadataKeys.require, require, targetConstructor);
    }

    function NgModule({ id, bootstrap = [], declarations = [], imports = [], providers = [] }) {
        return (Class) => {
            // module registration
            const deps = imports.map(mod => typeof mod === 'string' ? mod : mod.module.name);
            if (!id) {
                console.warn('You are not providing ngModule id, be careful this code won\'t work when uglified.');
                id = Class.name;
            }
            const module = angular.module(id, deps);
            // components, directives and filters registration
            declarations.forEach((declaration) => {
                const declarationType = getMetadata(metadataKeys.declaration, declaration);
                switch (declarationType) {
                    case exports.Declaration.Component:
                        registerComponent(module, declaration);
                        break;
                    case exports.Declaration.Directive:
                        registerDirective(module, declaration);
                        break;
                    case exports.Declaration.Pipe:
                        registerPipe(module, declaration);
                        break;
                    default:
                        console.error(`Can't find type metadata on ${declaration.name} declaration, did you forget to decorate it?
            Decorate your declarations using @Component, @Directive or @Pipe decorator.`);
                }
            });
            // services registration
            if (providers) {
                registerProviders(module, providers);
            }
            // config and run blocks registration
            const { config, run } = Class;
            if (config) {
                module.config(config);
            }
            if (run) {
                module.run(run);
            }
            // expose angular module as static property
            Class.module = module;
        };
    }

    function HostListener(eventName, args) {
        return (target, propertyKey, descriptor) => {
            const listener = descriptor.value;
            if (typeof listener !== 'function') {
                throw new Error(`@HostListener decorator can only be applied to methods not: ${typeof listener}`);
            }
            const targetConstructor = target.constructor;
            /**
             * listeners = { onMouseEnter: { eventName: 'mouseenter mouseover', args: [] } }
             */
            const listeners = getMetadata(metadataKeys.listeners, targetConstructor) || {};
            listeners[propertyKey] = { eventName, args };
            defineMetadata(metadataKeys.listeners, listeners, targetConstructor);
        };
    }

    function ViewChild(selector, opts = {}) {
        return (target, key) => addBindingToMetadata$1(target, key, selector, opts.read, true);
    }
    function ViewChildren(selector, opts = {}) {
        return (target, key) => addBindingToMetadata$1(target, key, selector, opts.read, false);
    }
    /** @internal */
    function addBindingToMetadata$1(target, key, selector, read, first) {
        const targetConstructor = target.constructor;
        const viewChildren = getMetadata(metadataKeys.viewChildren, targetConstructor) || {};
        viewChildren[key] = { first, selector, read };
        defineMetadata(metadataKeys.viewChildren, viewChildren, targetConstructor);
    }

    /**
     * @license
     * Copyright Google Inc. All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    /**
     * @whatItDoes Represents a type that a Component or other object is instances of.
     *
     * @description
     *
     * An example of a `Type` is `MyCustomComponent` class, which in JavaScript is be represented by
     * the `MyCustomComponent` constructor function.
     *
     * @stable
     */
    const Type = Function;
    function isType(v) {
        return typeof v === 'function';
    }

    exports.Component = Component;
    exports.Directive = Directive;
    exports.ElementRef = ElementRef;
    exports.HostListener = HostListener;
    exports.Inject = Inject;
    exports.Injectable = Injectable;
    exports.Input = Input;
    exports.NgModule = NgModule;
    exports.Output = Output;
    exports.Pipe = Pipe;
    exports.Type = Type;
    exports.ViewChild = ViewChild;
    exports.ViewChildren = ViewChildren;
    exports.ViewParent = ViewParent;
    exports.camelToKebab = camelToKebab;
    exports.defineMetadata = defineMetadata;
    exports.getAttributeName = getAttributeName;
    exports.getMetadata = getMetadata;
    exports.getTypeDeclaration = getTypeDeclaration;
    exports.getTypeName = getTypeName;
    exports.isAttributeSelector = isAttributeSelector;
    exports.isType = isType;
    exports.kebabToCamel = kebabToCamel;
    exports.metadataKeys = metadataKeys;
    exports.ngLifecycleHooksMap = ngLifecycleHooksMap;
    exports.platformBrowserDynamic = platformBrowserDynamic;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
