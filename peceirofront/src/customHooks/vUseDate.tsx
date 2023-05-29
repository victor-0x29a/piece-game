import dayjs, { Dayjs } from "dayjs"
import { response } from "./types/vdate.type"

const vUseDate = (dateIso: string): response => {
    return {
        lib: dayjs(dateIso),
        date: dayjs(dateIso).toDate()
    }
}

export default vUseDate