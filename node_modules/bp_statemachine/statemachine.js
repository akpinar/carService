class State {
    constructor(name, stateMachine) {
        this.stateMachine = stateMachine;
        this.transitions = new Set();
        this.name = name;
    }


    activate() {
        return Promise.resolve(null);
    }

    finishTransition() {}

    failHandler() {}

    deactivate() {
        return Promise.resolve(null);
    }
}

export class StateMachine {
    constructor() {
        this.storage = {};
        this.currentState = null;
        this.states = new Map();
    }

    addState(name, {activate, finishTransition, deactivate}) {
        let state = new State(name, this);
        if (activate) state.activate = activate;
        if (finishTransition) state.finishTransition = finishTransition;
        if (deactivate) state.deactivate = deactivate;
        this.states.set(name, state);
        return this;
    }

    addTransition(fromName, toName){
        if (!this.states.has(fromName)) {
            throw ReferenceError(`No such state: ${fromName} while connecting to ${toName}`);
        }
        if (!this.states.has(toName)) {
            throw ReferenceError(`No such state: ${toName} while connecting from ${fromName}`);
        }
        this.states.get(fromName).transitions.add(toName);
        return this;
    }

    _promisify(res) {
        let promise;
        try {
            promise = res;
            if (!promise.then) {
                promise = Promise.resolve(promise);
            }
        } catch (e) {
            promise = Promise.reject(e);
        }
        return promise;
    }

    transitionTo(stateName) {
        if (this.currentState == null) {
            let state = this.states.get(stateName);
            return this._promisify(state.activate.call(this))
                .then((data)=> {
                    this.currentState = state;
                    return data;
                }).then(state.finishTransition.bind(this)).catch((e)=>{
                    state.failHandler();
                    throw e;
                });
        }
        if (this.currentState.name == stateName) return Promise.resolve();
        if (this.currentState.transitions.has(stateName)) {
            let state = this.states.get(stateName);
            return this._promisify(state.deactivate.call(this))
                .then(state.activate.bind(this)).then((data)=> {
                    this.currentState = state;
                    return data;
                }).then(state.finishTransition.bind(this)).catch((e)=>{
                    state.failHandler();
                    throw e;
                });
        } else {
            return Promise.reject(`No such transition: ${this.currentState.name} to ${stateName}`);
        }
    }

}
