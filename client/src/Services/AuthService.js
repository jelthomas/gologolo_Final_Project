export default {
    login: user =>{
        console.log("Made it");
        return fetch('users/login',{
            method: "post",
            body: JSON.stringify(user),
            headers:{
                'Content-Type' : 'application/json'
            }
        }).then(res => res.json())
          .then(data => data);
    },
    register: user =>{
        return fetch('users/register',{
            method: "post",
            body: JSON.stringify(user),
            headers:{
                'Content-Type' : 'application/json'
            }
        }).then(res => res.json())
          .then(data => data);
    },
    logout : ()=>{
        return fetch('/users/logout')
                .then(res => res.json())
                .then(data => data);
    },
    isAuthenticated : () => {
        return fetch('/users/authenticated')
                .then(res =>{
                    if(res.status !== 401){
                        return res.json().then(data => data);
                    }
                    else{
                        return {isAuthenticated: false, user: {username: "", email: ""}};
                    }
                });
    }
}