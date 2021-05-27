import babel from 'rollup-plugin-babel';
import buble from 'rollup-plugin-buble';
import alias from 'rollup-plugin-alias';
import async from 'rollup-plugin-async';
import uglify from 'rollup-plugin-uglify';

const path = require('path');

// export default {
//     entry: path.join(__dirname, 'example.js'),
//     targets: [
//         {dest: path.join(__dirname, 'example/streamedian.js'), format: 'es'}
//     ],
//     sourceMap: true,
//     plugins: [
//         // buble({
//         //     exclude: 'node_modules/**',
//         //     transforms: {forOf: false}
//         // }),
//         async(),
//         babel({
//             // exclude: 'node_modules/**',
//             // presets: [
//             //     'es2015-rollup', "stage-0"
//             // ]
//         }),
//         uglify({
//             mangle: false
//         }),
//         alias({
//             bp_logger: path.join(__dirname,'node_modules/bp_logger/logger.js'),
//             bp_event: path.join(__dirname,'node_modules/bp_event/event.js'),
//             bp_statemachine: path.join(__dirname,'node_modules/bp_statemachine/statemachine.js'),
//             jsencrypt: path.join(__dirname,'node_modules/jsencrypt/src/jsencrypt.js'),
//             rtsp: path.join(__dirname,'node_modules/html5_rtsp_player/src'),
//             streamedian: path.join(__dirname,'src'),
//         })
//     ]
//
// }
export default {
    entry: path.join(__dirname, 'streamedian.js'),
    targets: [
        {
            dest: path.join(__dirname, 'example/streamedian.min.js'),
            format: 'iife',
            moduleName: 'Streamedian'
        }
    ],
    sourceMap: true,
    plugins: [
        // buble({
        //     exclude: 'node_modules/**',
        //     transforms: {forOf: false}
        // }),
        // async(),
        // babel({
        //     // exclude: 'node_modules/**',
        //     // presets: [
        //     //     'es2015-rollup', "stage-0"
        //     // ]
        // }),
        // uglify({
        //     mangle: false
        // }),
        alias({
            bp_logger: path.join(__dirname,'node_modules/bp_logger/logger.js'),
            bp_event: path.join(__dirname,'node_modules/bp_event/event.js'),
            bp_statemachine: path.join(__dirname,'node_modules/bp_statemachine/statemachine.js'),
            jsencrypt: path.join(__dirname,'node_modules/jsencrypt/src/jsencrypt.js'),
            rtsp: path.join(__dirname,'node_modules/html5_rtsp_player/src'),
            streamedian: path.join(__dirname,'src'),
        })
    ]

}