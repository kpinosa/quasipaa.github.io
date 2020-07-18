// 调试服务器
const DEV_SERVER = {
    disableHostCheck: true,
    sockHost: "localhost",
    sockPort: 8080
}

// 编译配置
const BUILD_CONFIG = {
    publicPath: "/",
    outputDir: "./dist",
    indexPath: "index.html",
    filenameHashing: true,
    productionSourceMap: false,
    assetsDir: "static"
}

// 调试配置
const DEV_CONFIG = {
    publicPath: "/",
    devServer: DEV_SERVER
}

// 当环境为build时切换到编译配置
// 其他情况使用默认配置
module.exports = process.env.BABEL_ENV === "production" ? 
    BUILD_CONFIG :
    DEV_CONFIG