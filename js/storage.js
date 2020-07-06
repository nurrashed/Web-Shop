localStorageKeyExist = (key) => {
    try {
        //console.log(localStorage.getItem(key));
        if(localStorage.getItem(key)!=null && localStorage.getItem(key)!=undefined)
            return true;
        return false;

    }
    catch (err) { console.log("localStorageKeyExist: ERROR", err, key); }
}
