class ApiClient {
    constructor() {

    }

    get(url, params) {
        GestorPageHtml.openBlock();

        var headers = new Headers();
        headers.append("Content-Type", "application/json");

        let config = {
            method: "GET",
            headers: headers
        };

        // Fetch anidado
        let promise = new Promise((resolve, reject) => {
            fetch(url, config).then((response) => {
                response.json().then((data) => {
                     GestorPageHtml.closeBlock();
                    if (response.status >= 200 && response.status < 300) {
                        resolve(data);
                    } else {
                        reject(data);
                    }
                });
            }).catch((e) => {
                GestorPageHtml.closeBlock();
                reject(e);
            });
        });

        return promise;
    }

    post(url, data) {
        GestorPageHtml.openBlock();
    	var headers = new Headers();
        headers.append("Content-Type", "application/json");

        let config = {
            method: "POST",
            headers: headers
        };

        if(data) {
            let jsonData = JSON.stringify(data);
            config.body = jsonData;
        }

        let promise = new Promise((resolve, reject) => {
            fetch(url, config).then((response) => {                
                response.json().then((data) => {
                    GestorPageHtml.closeBlock();                     
                    if (response.status >= 200 && response.status < 300) {
                        resolve(data);
                    } else {
                        reject(data);
                    }
                });
            }).catch((e) => {
                GestorPageHtml.closeBlock();
                reject(e);
            });
        });

        return promise;
    }

    put(url, data) {
        GestorPageHtml.openBlock();
    	var headers = new Headers();
        headers.append("Content-Type", "application/json");

        let config = {
            method: "PUT",
            headers: headers
        };

        if(data) {
            let jsonData = JSON.stringify(data);
            config.body = jsonData;
        }

        // Fetch anidado
        let promise = new Promise((resolve, reject) => {
            fetch(url, config).then((response) => {
                response.json().then((data) => {
                     GestorPageHtml.closeBlock();
                    if (response.status >= 200 && response.status < 300) {
                        resolve(data);
                    } else {
                        reject(data);
                    }
                });
            }).catch((e) => {
                GestorPageHtml.closeBlock();
                reject(e);
            });
        });

        return promise;

    }

    delete(url, data) {
        GestorPageHtml.openBlock();
    	var headers = new Headers();
        headers.append("Content-Type", "application/json");

        let config = {
            method: "DELETE",
            headers: headers
        };

        if(data) {
            let jsonData = JSON.stringify(data);
            config.body = jsonData;
        }

        let promise = new Promise((resolve, reject) => {
            fetch(url, config).then((response) => {
                response.json().then((data) => {
                     GestorPageHtml.closeBlock();
                    if (response.status >= 200 && response.status < 300) {
                        resolve(data);
                    } else {
                        reject(data);
                    }
                });
            }).catch((e) => {
                GestorPageHtml.closeBlock();
                reject(e);
            });
        });

        return promise;
    }
}