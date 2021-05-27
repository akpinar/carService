import videojs from 'video.js';
import * as streamedian from '../../../src/player';
import WebsocketTransport from '../../../src//transport/websocket';
import RTSPClient from '../../../src//client/rtsp/client';
import HLSClient from '../../../src//client/hls/client';

class StreamedianVideojs{

    constructor(source, tech, techOptions){

        var player = videojs.getPlayer(techOptions.playerId);
        this.playerOptions = player.options_;
        this.tech    = tech;

        this.transport = {
            constructor: WebsocketTransport,
            options: {
                socket: this.playerOptions.rtsp_config.websocket_url
            }
        };
        this.player = new streamedian.WSPlayer(tech.el(), {
            modules: [
                {
                    client: RTSPClient,
                    transport: this.transport
                },
                {
                    client: HLSClient,
                    transport: this.transport
                }
            ]
        });
    }
}

var StreamedianSourceHandler = {
    canHandleSource: function (source) {
        return this.canPlayType(source.type);
    },
    handleSource: function (source, tech, options) {
        return new StreamedianVideojs(source, tech, options);
    },
    canPlayType: function (type) {
        var canPlayType = '';
        if (streamedian.WSPlayer.canPlayWithModules(type,[
                {
                    client: RTSPClient,
                    transport: WebsocketTransport
                },
                {
                    client: HLSClient,
                    transport: WebsocketTransport
                }
            ])) {
            canPlayType = 'probably';
        }
        return canPlayType;
    }
};

videojs.getTech('Html5').registerSourceHandler(StreamedianSourceHandler, 0);