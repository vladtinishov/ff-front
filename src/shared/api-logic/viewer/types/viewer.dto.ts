export interface ViewerDto {
  id?: number,
  name: string,
  surname: string,
  login: string,
  password: string,
  lang: string,
  about: string
  role: number
}

export interface AuthViewerDto {
  login: string,
  password: string,
}