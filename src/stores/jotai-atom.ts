import { atom } from 'jotai'

export const stepRegisterAtom = atom(1)
export const stepLoginAtom = atom(0)

export const globalName = atom('')
export const globalCreateAccDate = atom(0)
export const fieldUserName= atom('')
export const fieldPhone= atom('')
export const fieldPhoneCode= atom('')
export const fieldEmail= atom('')
export const invalidField= atom('')
export const DateOfRegister= atom('')
export const moreSection = atom(false)


// global atom state Menu
export const currentMenu = atom('')

// global tweets
export const allTweet = atom('')
