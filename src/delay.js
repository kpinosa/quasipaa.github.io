import ImgAvatar from "@/assets/avatar.jpg"
import ImgLeft from "@/assets/left.svg"
import ImgLogo from "@/assets/logo.png"
import ImgPlay from "@/assets/play.svg"
import ImgRight from "@/assets/right.svg"
import ImgUser from "@/assets/user.jpg"

// 加载图片
// @param {String} path
function load(path, context = new Image()) {
    return new Promise(resolve => {
        context.onerror = resolve
        context.onload = resolve
        context.src = path
    })
}

// 加载所有图片
// @returns {Promise<void>}
export default function() {
    return Promise.all([
        load(ImgAvatar),
        load(ImgLeft),
        load(ImgLogo),
        load(ImgPlay),
        load(ImgRight),
        load(ImgUser)
    ])
}