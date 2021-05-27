import {LogLevel, getTagged, setDefaultLogLevel} from 'bp_logger';
import * as wsp from 'wsp/player';
import WebsocketTransport from 'wsp/transport/websocket';
import RTSPClient from 'wsp/client/rtsp/client';
import {isSafari} from "wsp/core/util/browser";

setDefaultLogLevel(LogLevel.Debug);
getTagged("transport:ws").setLevel(LogLevel.Error);
getTagged("client:rtsp").setLevel(LogLevel.Error);

let wsTransport = {
    constructor: WebsocketTransport,
    options: {
        socket: "ws://127.0.0.1:8080/ws/"
    }
};

let p = new wsp.WSPlayer('test_video', {
    // url: `${STREAM_UNIX}${STREAM_URL}`,
    // type: wsp.StreamType.HLS,
    modules: [
        {
            client: RTSPClient,
            transport: wsTransport
        },
    ]
});
