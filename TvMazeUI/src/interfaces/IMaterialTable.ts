export interface IMaterialize <T> {
    data :Array<T>,
    headers:Array<IHeader>,
    deletecallback:CallableFunction,
    editcallback:CallableFunction,
    addcallback:CallableFunction,
    onRowClick:CallableFunction,
    iconDelete:string,
    type:string
}

export interface IHeader {
    title:string,
    field:string
}