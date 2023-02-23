import { apiFabric } from "../api"
import type { GetFilesDto } from "./dto/get-files.dto"

const URL = 'files'

const api = apiFabric(URL)

export const files = {
  uploadAvatar: (dto: any) => api.post('/upload-avatar', dto).then(d => d.data),
  uploadFiles: (dto: any) => api.post('/upload-order-files', dto).then(d => d.data),
  getFiles: (dto: GetFilesDto) => api.get('/get-files', { params: dto}).then(d => d.data),
  getOrderFiles: (dto: GetFilesDto) => api.get('/get-files-data', { params: dto}).then(d => d.data),
}
