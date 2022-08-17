import { deleteRequest, getRequest, postRequest, putRequest } from "../Request"

export const getAllMedicinesData = () => {
    return getRequest("medicine");
}

export const postMedicinesData = (data) => {
    return postRequest("medicine", data);
}

export const deleteMedicinesData = (id) => {
    return deleteRequest("medicine/", id)
}

export const putMedicinesData = (data) => {
    return putRequest("medicine/", data)
}