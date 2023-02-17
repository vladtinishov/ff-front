export interface ViewerDto {
    id?: number
    name: string
    surname: string
    role: number
    login: string
    password: string
    lang: Langs
    about: string
}

type Langs = 'ru' | 'en' | 'kz'