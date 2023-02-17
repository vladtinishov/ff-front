import axios from "axios";

export const API = axios.create({
})

// rename
export const apiFabric = (url: string) => {
  return axios.create({
    baseURL: 'http://localhost:3000/' + url
  })
}