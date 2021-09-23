
// google api key AIzaSyAzeQqNFTLBoPMhCZs-XtGilERftHfwhYM
// ow api         3f79f896e97cfe497c0497941dc7a42f
// giphy          NED7Fs9BkMnoSDtRqDvQC2t9HdIwHQGw



async function getJSON(api){
    try{
        const get = await fetch(api, {mode: 'cors'});
        let response = await get.json(api);
        return response;
    }catch(e){
        return e;
    }

}


export default getJSON;

