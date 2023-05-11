import { FormikProps } from "formik"
import { account } from "../../../store/types/state.type"

export type propsLogin = {
    formik: FormikProps<any>
}

export type propsIndex = {
    account: account
    setAccount: any
}