export const blurhash =
  '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';


 export const getRoomId=(userId1,userId2)=>{
    const sortId=[userId1,userId2].sort();
    const roomId=sortId.join("-");
    return roomId;
  }

  export const formateDate=date=>{
    var day=date.getDate();
    var monthNames=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
    var month=monthNames[date.getMonth()];

    var formateDate=day+' '+month;
    return formateDate;
  }