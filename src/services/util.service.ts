import { Section } from "../interfaces/dynamic-element"

export function makeId(blockSize = 5, blockCount = 2) {
    const CHARS = 'abcdefghojklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0987654321'
    let id = ''
    for (let i = 0; i < blockCount; i++) {
        if (i) id += '-'
        for (let j = 0; j < blockSize; j++) {
            const idx = getRandomInt(CHARS.length)
            id += CHARS.charAt(idx)
        }
    }
    return id
}

export function getRandomInt(max: number, min = 0, isInclusive = false) {
    return Math.floor(Math.random() * (Math.floor(max) - Math.ceil(min) + (isInclusive ? 1 : 0)) + Math.ceil(min))
}

export function getVerticalHalf(ev: MouseEvent, el: HTMLElement){
    const { offsetY } = ev
        if (offsetY < el.offsetHeight / 2) return 'top'
        else return 'bottom'
}

export function calcTotalHeight(sections: Section[], media: 'large' | 'medium' | 'small') {
    let height = 0
    for (let section of sections) {
        height += extractCSSValue(section.styles[media as keyof typeof section.styles].height || '400')
    }
    return height
}

export function extractCSSValue(value: string) {
    const num = value.match(/\d+(\.\d+)?/)
    return parseInt(num ? num[0] : '0')
}

// export function getCSS(styles: { [key: string]: string | number }) {
//     const css = {} as { [key: string]: string }
//     for (let key in styles){
//         switch (key) {
//             case 'width':
//             case 'height':
//             case 'top':
//             case 'bottom':

//         }
//     }
// }

// export function getElementCorners(el: HTMLElement) {
//     const tl = {
//         x: el.offsetLeft,
//         y: el.offsetTop
//     }
//     const tr = {
//         x: tl.x + el.offsetWidth,
//         y: tl.y
//     }
//     const bl = {
//         x: tl.x,
//         y: tl.y + el.offsetHeight
//     }
//     const br = {
//         x: tr.x,
//         y: bl.y
//     }
//     return { tl, tr, bl, br }
// }

export function rotateElement(el: HTMLElement, ev: MouseEvent) {
    const { clientX: x, clientY: y } = ev
    return getRotationAngle(getElementCenter(el), { x, y })
}

function getElementCenter(el: HTMLElement) {
    const { top, left, width, height } = el.getBoundingClientRect()
    const x = left + width / 2
    const y = top + height / 2
    return { x, y }
}

function getRotationAngle(center: { x: number, y: number }, mouse: { x: number, y: number }) {
    const diffY = mouse.y - center.y
    const diffX = mouse.x - center.x
    return Math.atan2(diffY, diffX) / Math.PI * 180
}


export function resizeElement(el: HTMLElement, ev: MouseEvent, dir: string) {
    let { top, bottom, left, right, height, width } = el.getBoundingClientRect()
    top += window.scrollY
    bottom += window.scrollY
    left += window.scrollX
    right += window.scrollX
    let diff: number
    switch (dir) {
        case 'top':
            diff = bottom - ev.pageY
            if (diff < 4) diff = 4
            return { height: diff, top: el.offsetTop + height - diff }
        case 'bottom':
            diff = ev.pageY - top
            if (diff < 4) diff = 4
            return { height: diff }
        case 'left':
            diff = right - ev.pageX
            if (diff < 4) diff = 4
            return { width: diff, left: el.offsetLeft + width - diff }
        case 'right':
            diff = ev.pageX - left
            if (diff < 4) diff = 4
            return { width: diff }
        default:
            return {}
    }

    // let startX = 0;
    // let startY = 0;
    // let startWidth = 0;
    // let startHeight = 0;
    // let originalX = 0;
    // let originalY = 0;
    // startX = ev.pageX;
    // startY = ev.pageY;
    // startWidth = parseInt(window.getComputedStyle(el).getPropertyValue('width'), 10);
    // startHeight = parseInt(window.getComputedStyle(el).getPropertyValue('height'), 10);
    // originalX = el.getBoundingClientRect().left;
    // originalY = el.getBoundingClientRect().top;

    // const rect = el.getBoundingClientRect()
    // const centerX = rect.left + rect.width / 2;
    // const centerY = rect.top + rect.height / 2;
    // const currentX = ev.pageX;
    // const currentY = ev.pageY;
    // const angle = Math.atan2(currentY - centerY, currentX - centerX);
    // const radius = Math.sqrt(Math.pow(currentX - centerX, 2) + Math.pow(currentY - centerY, 2));
    // const xDiff = radius * Math.cos(angle);
    // const yDiff = radius * Math.sin(angle);

    // let newWidth, newHeight, newX, newY;
    // switch (dir) {
    //     case 'top':
    //         newHeight = startHeight - yDiff;
    //         newY = originalY + yDiff;
    //         newX = originalX;
    //         newWidth = startWidth;
    //         return {height:newHeight, top: newY, width: newWidth}
    //     case 'bottom':
    //         newHeight = startHeight + yDiff;
    //         newY = originalY;
    //         newX = originalX;
    //         newWidth = startWidth;
    //         return {height: newHeight, width: newWidth}
    //     case 'left':
    //         newWidth = startWidth - xDiff;
    //         newX = originalX + xDiff;
    //         newY = originalY;
    //         return {width: newWidth, left:newX}
    //     case 'right':
    //         newWidth = startWidth + xDiff;
    //         newX = originalX;
    //         newY = originalY;
    //         newHeight = startHeight;
    //         return {width:newWidth,height:newHeight}
    //     default:
    //         return {}
    // }
}