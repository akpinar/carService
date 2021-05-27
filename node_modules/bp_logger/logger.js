// ERROR=0, WARN=1, LOG=2, DEBUG=3
export const LogLevel = {
    Error: 0,
    Warn: 1,
    Log: 2,
    Debug: 3
};

let DEFAULT_LOG_LEVEL = LogLevel.Debug;

export function setDefaultLogLevel(level) {
    DEFAULT_LOG_LEVEL = level;
}
export class Logger {
    constructor(level = DEFAULT_LOG_LEVEL, tag) {
        this.tag = tag;
        this.setLevel(level);
    }
    
    setLevel(level) {
        this.level = level;
    }
    
    static get level_map() { return {
        [LogLevel.Debug]:'log',
        [LogLevel.Log]:'log',
        [LogLevel.Warn]:'warn',
        [LogLevel.Error]:'error'
    }};

    _log(lvl, args) {
        args = Array.prototype.slice.call(args);
        if (this.tag) {
            args.unshift(`[${this.tag}]`);
        }
        if (this.level>=lvl) console[Logger.level_map[lvl]].apply(console, args);
    }
    log(){
        this._log(LogLevel.Log, arguments)
    }
    debug(){
        this._log(LogLevel.Debug, arguments)
    }
    error(){
        this._log(LogLevel.Error, arguments)
    }
    warn(){
        this._log(LogLevel.Warn, arguments)
    }
}

const taggedLoggers = new Map();
export function getTagged(tag) {
    if (!taggedLoggers.has(tag)) {
        taggedLoggers.set(tag, new Logger(DEFAULT_LOG_LEVEL, tag));
    }
    return taggedLoggers.get(tag);
}
export const Log = new Logger();
