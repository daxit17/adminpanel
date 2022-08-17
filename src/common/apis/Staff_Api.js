import { deleteRequest, getRequest, postRequest, putRequest } from "../Request"

export const getAllStaffData = () => {
    return getRequest("staff");
}

export const postAllStaffData = (data) => {
    return postRequest("staff",data)
}

export const deleteAllStaffData = (id) => {
    return deleteRequest("staff/",id)    
}

export const putAllStaffData = (data) => {
    return putRequest("staff/",data)
}