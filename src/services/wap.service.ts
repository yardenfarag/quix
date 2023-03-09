
import { storageService } from './async.local.storage.service.js'
// import { httpService } from './http.service.js'
// import { userService } from './user.service.js'
// import { makeId } from './util.service.js'
import { Wap } from '../interfaces/wap.js'


const STORAGE_KEY = 'wap'

export const carService = {
    query,
    getById,
    save,
    remove,
    getEmptyWap
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





