export interface IShow {
    id:number,
    image:string,
    name:string,
    language:string,
    genres:Array<string>,
    premiered:string,
    rating:any,
    network:any,
    summary:string,
    schedule:ISchedule

}

interface ISchedule{
    days:Array<string>,
    time:string
}