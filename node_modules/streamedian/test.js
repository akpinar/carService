import {LogLevel, getTagged, setDefaultLogLevel} from './node_modules/bp_logger/logger';
import * as streamedian from './src/player.js';
import WebsocketTransport from './src/transport/websocket.js';
import RTSPClient from './src/client/rtsp/client.js';
import HLSClient from './src/client/hls/client.js';
import {isSafari} from "./src/core/util/browser.js";

setDefaultLogLevel(LogLevel.Debug);
getTagged("transport:ws").setLevel(LogLevel.Error);
getTagged("client:rtsp").setLevel(LogLevel.Error);

let wsTransport = {
    constructor: WebsocketTransport,
    options: {
        socket: "wss://specforge.com/ws/"
    }
};

let p = new streamedian.WSPlayer('test_video', {
    // url: `${STREAM_UNIX}${STREAM_URL}`,
    // type: wsp.StreamType.HLS,
    modules: [
        {
            client: RTSPClient,
            transport: wsTransport
        },
        {
            client: HLSClient,
            transport: wsTransport
        }
    ]
});