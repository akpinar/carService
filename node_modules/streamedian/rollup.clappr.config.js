// import babel from 'rollup-plugin-babel';
import buble from 'rollup-plugin-buble';
import alias from 'rollup-plugin-alias';

const path = require('path');

export default {
    entry: path.join(__dirname, 'test.clappr.js'),
    targets: [
        {dest: path.join(__dirname, 'dist/test.clappr.bundle.js'), format: 'umd'}
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
            clappr_player: path.join(__dirname,'node_modules/clappr/src'),
            streamedian: path.join(__dirname,'src')
        })
    ]

}