const getHeader = (token, multipart=false) => {
    let header = {
        headers: {
            'Authorization': 'Bearer '+token,
        }
    }

    if(multipart) {
        header = {
            headers: {
                'Authorization': 'Bearer '+token,
                "Content-Type": "multipart/form-data", 
            } 
        }   
    }

    return header;
}

export default getHeader;