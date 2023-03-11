
import { storageService } from './async.local.storage.service'
// import { httpService } from './http.service.js'
// import { userService } from './user.service.js'
// import { makeId } from './util.service.js'
import { Wap } from '../interfaces/wap'
import { Cmp, Kind } from '../interfaces/dynamic-element'


const STORAGE_KEY = 'wap'

export const wapService = {
    query,
    getById,
    save,
    remove,
    getEmptyWap,
    getElementsStock
}


async function query(filterBy = { txt: '' }) {
    // return httpService.get(STORAGE_KEY, filterBy)

    var waps = await storageService.query(STORAGE_KEY)
    if (filterBy.txt) {
        const regex = new RegExp(filterBy.txt, 'i')
        waps = waps.filter((wap: Wap) => regex.test(wap.name))
    }
    return waps

}
function getById(wapId: string) {
    return storageService.get(STORAGE_KEY, wapId)
    // return httpService.get(`car/${carId}`)
}

async function remove(wapId: string) {
    await storageService.remove(STORAGE_KEY, wapId)
    // return httpService.delete(`car/${carId}`)
}
async function save(wap: Wap) {
    var savedWap
    if (wap.id) {
        savedWap = await storageService.put(STORAGE_KEY, wap)
        // savedCar = await httpService.put(`car/${car._id}`, car)

    } else {
        // Later, owner is set by the backend
        // car.owner = userService.getLoggedinUser()
        savedWap = await storageService.post(STORAGE_KEY, wap)
        // savedCar = await httpService.post('car', car)
    }
    return savedWap
}

// async function addCarMsg(carId, txt) {
//     const savedMsg = await httpService.post(`car/${carId}/msg`, {txt})
//     return savedMsg
// }


function getEmptyWap() {
    return {
        id: '',
        name: '',
        imgUrl: '',
        cmps: []
    }
}

function getElementsStock() {
    return [
        {
            title: 'Text',
            categories: [
                {
                    title: 'Themed Text',
                    items: [
                        {
                            id: 'sdvjf-4fCCk',
                            txt: 'Add Heading 1',
                            name: 'header',
                            tag: 'h1' as keyof JSX.IntrinsicElements,
                            styles: {
                                small: {} as { [key: string]: string },
                                medium: {} as { [key: string]: string },
                                large: {} as { [key: string]: string },
                            },
                        }
                    ] as Cmp[]
                },
                {
                    title: 'Titles',
                    items: [
                        {
                            id: 'fwd8C-Cc9Dv',
                            txt: 'Big Title',
                            name: 'title',
                            tag: 'h1' as keyof JSX.IntrinsicElements,
                            styles: {
                                small: {} as { [key: string]: string },
                                medium: {} as { [key: string]: string },
                                large: {} as { [key: string]: string },
                            },
                        }
                    ] as Cmp[]
                },
                {
                    title: 'Paragraphs',
                    items: [
                        {
                            id: '34fjD-jD6dK',
                            txt: 'Helvetica Light is an easy-to-read font, with tall and narrow letters, that works well on almost every site.',
                            name: 'paragraph',
                            tag: 'p' as keyof JSX.IntrinsicElements,
                            styles: {
                                small: {} as { [key: string]: string },
                                medium: {} as { [key: string]: string },
                                large: {} as { [key: string]: string },
                            },
                        }
                    ] as Cmp[]
                },
            ]
        }
    ] as Kind[]
}





