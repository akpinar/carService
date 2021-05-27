// import babel from 'rollup-plugin-babel';
import buble from 'rollup-plugin-buble';
import alias from 'rollup-plugin-alias';

const path = require('path');

export default {
    entry: path.join(__dirname, '/plugins/videojs/src/videojs.streamedian.js'),
    targets: [
        {dest: path.join(__dirname, 'dist/test.videojs.bundle.js'), format: 'umd'}
    ],
    sourceMap: true,
    plugins: [
        //buble({
            //exclude: 'node_modules/**'
        //}),
        alias({
            bp_logger: path.join(__dirname,'node_modules/bp_logger/logger'),
            bp_event: path.join(__dirname,'node_modules/bp_event/event'),
            bp_statemachine: path.join(__dirname,'node_modules/bp_statemachine/statemachine'),
            jsencrypt: path.join(__dirname,'node_modules/jsencrypt/src/jsencrypt'),
            rtsp: path.join(__dirname,'node_modules/html5_rtsp_player/src'),
            streamedian: path.join(__dirname,'src')
        })
    ]

}