import {LogLevel, getTagged, setDefaultLogLevel} from 'bp_logger';
import {isSafari} from "streamedian/core/util/browser";
import {ClapprLive} from "./plugins/clappr_plugin/src/clappr";

setDefaultLogLevel(LogLevel.Debug);
getTagged("transport:ws").setLevel(LogLevel.Error);
getTagged("client:rtsp").setLevel(LogLevel.Error);

// let wsTransport = {
//     constructor: WebsocketTransport,
//     options: {
//         socket: "ws://127.0.0.1:8080/ws/"
//     }
// };
//
// let p = new wsp.WSPlayer('test_video', {
//     // url: `${STREAM_UNIX}${STREAM_URL}`,
//     // type: wsp.StreamType.HLS,
//     modules: [
//         {
//             client: RTSPClient,
//             transport: wsTransport
//         },
//         {
//             client: HLSClient,
//             transport: wsTransport
//         }
//     ]
// });
window.onload = function() {
    var player = new Clappr.Player({
        parentId: '#clappr_video',
        plugins: {
            playback: [ClapprLive]
        },
        // poster:'https://cloudfront-prod.bitmovin.com/wp-content/uploads/2015/08/apple_hls_6401.jpg',
        rtsp_config:{websocket_url:"ws://127.0.0.1:8080/ws/"},
        sources: [{source:'rtsp://192.168.10.161/H264_LOW', mimeType:'application/x-rtsp'}],
        mediacontrol: {seekbar: "#E113D3", buttons: "#66B2FF"},
        autoPlay: true
    });
}