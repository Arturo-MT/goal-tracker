import { NewGoalEntry } from './types'
import { Status } from './enums'

const parseId = (idFromRequest: any): string => {
  if (!isString(idFromRequest)) {
    throw new Error('Incorrect or missing Id')
  }
  return idFromRequest
}

const parseName = (nameFromRequest: any): string => {
  if (!isString(nameFromRequest)) {
    throw new Error('Incorrect or missing Name')
  }
  return nameFromRequest
}

const parseDescription = (descriptionFromRequest: any): string => {
  if (!isString(descriptionFromRequest)) {
    throw new Error('Incorrect or missing Description')
  }
  return descriptionFromRequest
}

const parseDate = (dateFromRequest: any): string => {
  if (!isString(dateFromRequest) || !isDate(dateFromRequest)) {
    throw new Error('Incorrect or missing Date')
  }
  return dateFromRequest
}

const parseStatus = (statusFromRequest: any): Status => {
  if (!isString(statusFromRequest) || !isStatus(statusFromRequest)) {
    throw new Error('Incorrect or missing Status')
  }
  return statusFromRequest
}

const parseOwner = (ownerFromRequest: any): string => {
  if (!isString(ownerFromRequest)) {
    throw new Error('Incorrect or missing Owner')
  }
  return ownerFromRequest
}

const isString = (string: string): boolean => {
  return typeof string === 'string'
}

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date))
}

const isStatus = (status: any): boolean => {
  return Object.values(Status).includes(status)
}

const toNewGoalEntry = (object: any): NewGoalEntry => {
  const newGoalEntry: NewGoalEntry = {
    id: parseId(object.id),
    name: parseName(object.name),
    description: parseDescription(object.description),
    date: parseDate(object.date),
    status: parseStatus(object.status),
    owner: parseOwner(object.owner),
    progress: object.progress
  }
  return newGoalEntry
}

export default toNewGoalEntry
