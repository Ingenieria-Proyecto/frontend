export interface Login{
    id?: number
    email: string
    password: string
}

export interface validateCode{
    email: string
    code_auth: string
}