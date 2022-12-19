import { defineConfig } from "vite";

export default defineConfig( ( {
    command,
    mode,
} ) => {

    switch ( command ) {

        case "serve":
            return createDevelopmentEnvironment();

        case "build":
            return createProductionEnvironment();

        default:
            throw new Error( "Unknow type" );

    }

    function createDevelopmentEnvironment () {

        return {
            base: "/",
            publicDir: "public",
            server: {
                host: "localhost",
                port: 8080,
                open: true,
                https: false,     // 使用@vitejs/plugin-basic-ssl来创建一个自签名的证书，详见https://cn.vitejs.dev/config/server-options.html#server-https
                strictPort: true, // 若端口已被占用，则会直接退出
                cors: true,       // 允许访问跨域资源
            }
        };

    }

    function createProductionEnvironment () {

        return {
            base: "/",
            publicDir: "public",
            build: {
                outDir: "build",
                assetsInlineLimit: 4096,     // 体积小于该值的资源将被转译为base64数据
                chunkSizeWarningLimit: 1000, // chunk体积报警的触发阈值
                // lib: undefined,           // 构建为库，详见https://cn.vitejs.dev/config/build-options.html#build-lib
            },
        };

    }

} );
