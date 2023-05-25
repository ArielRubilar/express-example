export interface Logger {
    initLog: (context: string, message?: string) => void,
    endLog: (context: string, message?: string) => void,
    logError: (context: string, message?: string) => void,
    connect: (callback: (message: string) => void) => void
}