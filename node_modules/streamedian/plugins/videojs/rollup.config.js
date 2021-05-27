import butternut from 'rollup-plugin-butternut';

export default
{
    input: "src/videojs.streamedian.js",
    output: {
        file: "example/videojs.streamedian.bundle.js"
    },
    format: "umd",
    sourceMap: true,
    plugins: [ butternut() ]
}
