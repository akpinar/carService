const listener = Symbol("event_listener");
const listeners = Symbol("event_listeners");

export class DestructibleEventListener {
    constructor(eventListener) {
        this[listener] = eventListener;
        this[listeners] = new Map();
    }

    clear() {
        if (this[listeners]) {
            for (let entry of this[listeners]) {
                for (let fn of entry[1]) {
                    this[listener].removeEventListener(entry[0], fn);
                }
            };
        }
        this[listeners].clear();
    }

    destroy() {
        this.clear();
        this[listeners] = null;
    }

    on(event, selector, fn) {
        if (fn == undefined) {
            fn = selector;
            selector = null;
        }
        if (selector) {
            return this.addEventListener(event, (e) => {
                if (e.target.matches(selector)) {
                    fn(e)
                }
            });
        } else {
            return this.addEventListener(event, fn);
        }
    }

    addEventListener(event, fn) {
        if (!this[listeners].has(event)) {
            this[listeners].set(event, new Set());
        }
        this[listeners].get(event).add(fn);
        this[listener].addEventListener(event, fn, false);
        return fn;
    }

    removeEventListener(event, fn) {
        this[listener].removeEventListener(event, fn, false);
        if (this[listeners].has(event)) {
            //this[listeners].set(event, new Set());
            let ev = this[listeners].get(event);
            ev.delete(fn);
            if (!ev.size) {
                this[listeners].delete(event);
            }
        }
    }

    dispatchEvent(event) {
        if (this[listener]) {
            this[listener].dispatchEvent(event);
        }
    }
}

export class EventEmitter {
    constructor(element=null) {
        this[listener] = new DestructibleEventListener(element || document.createElement('div'));
    }

    clear() {
        if (this[listener]) {
            this[listener].clear();
        }
    }

    destroy() {
        if (this[listener]) {
            this[listener].destroy();
            this[listener] = null;
        }
    }

    on(event, selector, fn) {
        if (this[listener]) {
            return this[listener].on(event, selector, fn);
        }
        return null;
    }

    addEventListener(event, fn) {
        if (this[listener]) {
            return this[listener].addEventListener(event, fn, false);
        }
        return null;
    }

    removeEventListener(event, fn) {
        if (this[listener]) {
            this[listener].removeEventListener(event, fn, false);
        }
    }

    dispatchEvent(event, data) {
        if (this[listener]) {
            this[listener].dispatchEvent(new CustomEvent(event, {detail: data}));
        }
    }
}

export class EventSourceWrapper {
    constructor(eventSource) {
        this.eventSource = eventSource;
        this[listeners] = new Map();
    }

    on(event, selector, fn) {
        if (!this[listeners].has(event)) {
            this[listeners].set(event, new Set());
        }
        let listener = this.eventSource.on(event, selector, fn);
        if (listener) {
            this[listeners].get(event).add(listener);
        }
    }

    off(event, fn){
        this.eventSource.removeEventListener(event, fn);
    }

    clear() {
        this.eventSource.clear();
        this[listeners].clear();
    }

    destroy() {
        this.eventSource.clear();
        this[listeners] = null;
        this.eventSource = null;
    }
}
