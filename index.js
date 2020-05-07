let request = require('request-promise')
let assert = require('assert')

let auth = {
    optionsLogin: {
        method: 'POST',
        url: 'https://devtracker.itdevsrv.pro/api/auth/login',
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        },
        json: true,
    },

    optionsRegister: {
        method: "POST",
        url: "https://devtracker.itdevsrv.pro/api/auth/register", 
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        },
        json: true,
    },

    counter: 0,

    test: function(){
        auth.login.positive();
        auth.login.wrongPass();
        auth.login.wrongEmail();
        auth.login.emptyEmail();
        auth.login.emptyPass();
        auth.login.empty();

        auth.register.positive();
        auth.register.emptyFirstName();
        auth.register.emptyLastName();
        auth.register.emptyEmail();
        auth.register.emptyPass();
        auth.register.emptyRole();
        auth.register.notAvaliableMail();
        auth.register.invalidMail();
        auth.register.empty();
    },

    login: {
        positive: function() {
            let options = auth.optionsLogin
            options.body = {
                "email": "dev@mail.com",
                "password": "1",
            }

            request(options)
                .then(function (response) {
                //console.log(response.data.token);
                assert.equal(response.status, true);

            })

            .catch(function (err) {
                console.error(err);
            })

            
        },

        wrongPass: function(){
            let options = auth.optionsLogin
            options.body = {
                "email": "dev@mail.com",
                "password": "2",
            }

            request(options)
                .then(function (response) {
                    //console.log(response);
                    assert.equal(2, 10);
                })

                .catch(function (err) {
                    //console.log(err["message"].message);
                    assert.equal(err.message, '401 - {"status":false,"message":"Login or password incorrect","data":null}');
                })
        },

        wrongEmail: function(){
            let options = auth.optionsLogin
            options.body = {
                "email": "dev1000@mail.com",
                "password": "1",
            }

            request(options)
                .then(function (response) {
                    //console.log(response);
                    assert.equal(2, 10);
                })

                .catch(function (err) {
                    //console.log(err["message"]);
                    assert.equal(err.message, '401 - {"status":false,"message":"Login or password incorrect","data":null}')
                })
        },

        emptyEmail: function(){
            let options = auth.optionsLogin
            options.body = {
                "email": "",
                "password": "1",
            }

            request(options)
                .then(function (response) {
                    //console.log(response);
                    assert.equal(response.message, 'email is not allowed to be empty');
                })

                .catch(function (err) {
                    console.log(err["message"]);
                })
        },

        emptyPass: function(){
            let options = auth.optionsLogin
            options.body = {
                "email": "dev@mail.com",
                "password": "",
            }

            request(options)
                .then(function (response) {
                    //console.log(response);
                    assert.equal(response.message, 'password is not allowed to be empty');
                })

                .catch(function (err) {
                    console.log(err["message"]);
                })
        },

        empty: function(){
            let options = auth.optionsLogin
            options.body = {
                "email": "",
                "password": "",
            }

            request(options)
                .then(function (response) {
                    //console.log(response);
                    assert.equal(response.status, false);
                })

                .catch(function (err) {
                    console.log(err["message"]);
                })
        },        
    },

    register: {
        positive: function() {
            let options = auth.optionsRegister
            options.body = {
                "firstname": "Teest",
                "lastname": "Test",
                "email": `test22${Math.random()}@mail.com`,
                "password": "1",
                "role": "2"
            },
            request(options)
                .then(function(response) {
                    //console.log(response);
                    assert.equal(response.message, "success")
                })

                .catch(function(err){
                    console.error(err);
                })   
        },
        
        emptyFirstName: function() {
            let options = auth.optionsRegister
            options.body = {
                "firstname": "",
                "lastname": "Test",
                "email": `test22${Math.random()}@mail.com`,
                "password": "1",
                "role": "2"
            },
            request(options)
                .then(function(response) {
                    //console.log(response);
                    assert.equal(response.message,'firstname is not allowed to be empty')
                })

                .catch(function(err){
                    console.error(err);
                })  
        }, 
        
        emptyLastName: function() {
            let options = auth.optionsRegister
            options.body = {
                "firstname": "Test",
                "lastname": "",
                "email": `test22${Math.random()}@mail.com`,
                "password": "1",
                "role": "2"
            },
            request(options)
                .then(function(response) {
                    //console.log(response);
                    assert.equal(response.message,'lastname is not allowed to be empty')
                })

                .catch(function(err){
                    console.error(err);
                })  
        }, 
        
        emptyEmail: function() {
            let options = auth.optionsRegister
            options.body = {
                "firstname": "Test",
                "lastname": "Test",
                "email": ``,
                "password": "1",
                "role": "2"
            },
            request(options)
                .then(function(response) {
                    //console.log(response);
                    assert.equal(response.message,'email is not allowed to be empty')
                })

                .catch(function(err){
                    console.error(err);
                })  
        }, 

        emptyPass: function() {
            let options = auth.optionsRegister
            options.body = {
                "firstname": "Test",
                "lastname": "Test",
                "email": `test22${Math.random()}@mail.com`,
                "password": "",
                "role": "2"
            },
            request(options)
                .then(function(response) {
                    //console.log(response);
                    assert.equal(response.message,'password is not allowed to be empty')
                })

                .catch(function(err){
                    console.error(err);
                })  
        }, 

        emptyRole: function() {
            let options = auth.optionsRegister
            options.body = {
                "firstname": "Test",
                "lastname": "Test",
                "email": `test22${Math.random()}@mail.com`,
                "password": "1",
                "role": ""
            },
            request(options)
                .then(function(response) {
                    //console.log(response);
                    assert.equal(response.message,'role must be a number')
                })

                .catch(function(err){
                    console.error(err);
                })  
        }, 

        notAvaliableMail: function() {
            let options = auth.optionsRegister
            options.body = {
                "firstname": "Test",
                "lastname": "Test",
                "email": `test@mail.com`,
                "password": "1",
                "role": "2"
            },
            request(options)
                .then(function(response) {
                    //console.log(response);
                    assert.equal(response.message,'Email is not available')
                })

                .catch(function(err){
                    console.error(err);
                })  
        }, 

        invalidMail: function() {
            let options = auth.optionsRegister
            options.body = {
                "firstname": "Test",
                "lastname": "Test",
                "email": `test@mail`,
                "password": "1",
                "role": "2"
            },
            request(options)
                .then(function(response) {
                    //console.log(response);
                    assert.equal(response.message,'email must be a valid email')
                })

                .catch(function(err){
                    console.error(err);
                })  
        }, 

        empty: function() {
            let options = auth.optionsRegister
            options.body = {
                "firstname": "",
                "lastname": "",
                "email": ``,
                "password": "",
                "role": ""
            },
            request(options)
                .then(function(response) {
                    //console.log(response);
                    assert.equal(response.status,false)
                })

                .catch(function(err){
                    console.error(err);
                })  
        },
    },

};

let freelance = {
    options: {
        headers: {
            "Content-type": "application/json",
            "authorization": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJkZXZAbWFpbC5jb20iLCJyb2xlX2lkIjoxLCJpYXQiOjE1ODg3NTMwNjB9.VlGJ0ypDknU2f0HO9Jbd_m3Q0uEOMh0doAWvwXr1E3M",
        },    
        json: true,
    },

    test: function(){
        freelance.getMembers();
        //freelance.approveProject(8);
        freelance.archiveProject(1);
        freelance.getProjects();
        freelance.getProjectById(1);
        freelance.getReports(2020-04-01, 2020-05-07);
        freelance.getReportPDF(2020-04-01, 2020-05-07);
        freelance.getActivities(2020-04-01, 2020-05-07);
        freelance.getActivitiesById(1, 2020-04-01, 2020-05-07);
        freelance.getActivitiesByTaskId(1);
        freelance.delActivityById(4);
        freelance.getTasks(1);
        freelance.createTask(1);
        freelance.getTaskById(1);
        freelance.delTaskById(4);

    },

    getMembers: function(){
        
        let options = freelance.options;
        options.method = 'GET';
        options.url = 'https://devtracker.itdevsrv.pro/api/freelance/project-member/1/members';
        
        request(options)
            .then(function(response){
                //console.log(response)
                //console.log(response.data)
                assert.equal(response.status, true);
            })
    },

    approveProject: function(projectId){
        
        let options = freelance.options;
        options.method = 'PATCH';
        options.url = `https://devtracker.itdevsrv.pro/api/freelance/project-member/${projectId}/approve`;
        
        request(options)
            .then(function(response){
                //console.log(response);
                assert.equal(response.status, true);
            })
    },

    archiveProject: function(projectId){
        
        let options = freelance.options;
        options.method = 'PATCH';
        options.url = `https://devtracker.itdevsrv.pro/api/freelance/project-member/${projectId}/archive`;
        options.body = {
                is_archive: 1,
            };

        request(options)
            .then(function(response){
                //console.log(response);
                assert.equal(response.status, true);
            })
    },

    getProjects: function(){
        
        let options = freelance.options;
        options.method = 'GET';
        options.url = 'https://devtracker.itdevsrv.pro/api/freelance/project';
        options.body = {
                is_approve: 1,
                is_archive: 0,
            };           


        request(options)
            .then(function(response){
                //console.log(response);
                assert.equal(response.status, true);
            });
    },

    getProjectById: function(projectId){
        
        let options = freelance.options;
        options.method = 'GET';
        options.url = `https://devtracker.itdevsrv.pro/api/freelance/project/by/${projectId}`;
        options.body = {
                is_approve: 1,
                is_archive: 0,
            };           

        request(options)
            .then(function(response){                
                //console.log(response);
                assert.equal(response.status, true);
            })
    },

    getReports: function(dateBegin, dateEnd){
        
        let options = freelance.options;
        options.method = 'GET';
        options.url = `https://devtracker.itdevsrv.pro/api/freelance/reports?date_begin=${dateBegin}&date_end=${dateEnd}`;

        request(options)
            .then(function(response){                
                //console.log(response);
                assert.equal(response.status, true);
            })
    },

    getReportPDF: function(dateBegin, dateEnd){
        
        let options = freelance.options;
        options.method = 'GET';
        options.url = `https://devtracker.itdevsrv.pro/api/freelance/reports/pdf/generate?date_begin=${dateBegin}&date_end=${dateEnd}`;

        request(options)
            .then(function(response){                
                //console.log(response);
                assert.equal(response.status, true);
            })
    },

    getActivities: function(dateBegin, dateEnd){
        
        let options = freelance.options;
        options.method = 'GET';
        options.url = `https://devtracker.itdevsrv.pro/api/freelance/task-activity?date_begin=${dateBegin}&date_end=${dateEnd}`;


        request(options)
            .then(function(response){                
                //console.log(response);
                assert.equal(response.status, true);
            })
    },

    getActivitiesById: function(id, dateBegin, dateEnd){
        
        let options = freelance.options;
        options.method = 'GET';
        options.url = `https://devtracker.itdevsrv.pro/api/freelance/task-activity/byid/${id}?date_begin=${dateBegin}&date_end=${dateEnd}`;


        request(options)
            .then(function(response){                
                //console.log(response);
                assert.equal(response.status, true);
            })
    },

    getActivitiesByTaskId: function(taskId){
        
        let options = freelance.options;
        options.method = 'GET';
        options.url = `https://devtracker.itdevsrv.pro/api/freelance/task-activity/bytask/${taskId}`;

        request(options)
            .then(function(response){                
                //console.log(response);
                assert.equal(response.status, true);
            })
    },

    delActivityById: function(taskId){
        
        let options = freelance.options;
        options.method = 'DELETE';
        options.url = `https://devtracker.itdevsrv.pro/api/freelance/task-activity/${taskId}`;

        request(options)
            .then(function(response){                
                //console.log(response);
                assert.equal(response.status, true);
            })
    },

    getTasks: function(projectId){
        
        let options = freelance.options;
        options.method = 'GET';
        options.url = `https://devtracker.itdevsrv.pro/api/freelance/task?project_id=${projectId}`;


        request(options)
            .then(function(response){                
                //console.log(response);
                assert.equal(response.status, true);
            })
    },

    createTask: function(projectId){
        
        let options = freelance.options
        options.method = 'POST';
        options.url = `https://devtracker.itdevsrv.pro/api/freelance/task`;
        options.body = {
                "project_id": projectId,
                "name": "testAPI"
            };            


        request(options)
            .then(function(response){                
                //console.log(response);
                assert.equal(response.status, true);
            })
    },

    getTaskById: function(taskId){
        
        let options = freelance.options;
        options.method = 'GET';
        options.url = `https://devtracker.itdevsrv.pro/api/freelance/task/by/${taskId}`;

        request(options)
            .then(function(response){
                //console.log(response);
                assert.equal(response.status, true);
            })
    },

    delTaskById: function(taskId){
        
        let options = freelance.options;
        options.method = 'DELETE';
        options.url = `https://devtracker.itdevsrv.pro/api/freelance/task/by/${taskId}`;

        request(options)
            .then(function(response){
                //console.log(response);
                assert.equal(response.status, true);
            })
    }
}

auth.test();
freelance.test();