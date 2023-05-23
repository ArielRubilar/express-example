

export interface ICustomError extends Error {
  status: number
}

export class CustomError extends Error implements ICustomError {
  status: number
  constructor(message: string, status: number) {
    super(message)
    this.status = status
    this.name = 'CustomError'
  }
}

export class BusinessError extends Error implements ICustomError {
  status: number
  constructor(message: string, status: number) {
    super(message)
    this.status = status
    this.name = 'BusinessError'
  }
}

export class ParamsError extends CustomError implements ICustomError {
  constructor(message: string) {
    super(message, 400)
    this.name = 'ParamsError'
  }
}


