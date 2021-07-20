import { createContext, useContext } from "react";
import { ICakeInterface } from "../interfaces/cake.interface";

export type UpdateCakeContextType = {
    cakeToUpdate: ICakeInterface | null
    setCakeToUpdate: (cake: ICakeInterface) => void
}
export const UpdateCakeContext = createContext<UpdateCakeContextType>({
    cakeToUpdate: null, // set a default value to null
    setCakeToUpdate: () => { },
})
export const useUpdateCakeContext = () => useContext(UpdateCakeContext);