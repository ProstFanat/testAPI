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
        freelance.getMembers('test');
        freelance.getMembers(-1);
        freelance.getMembers(1);

        freelance.approveProject();
        freelance.approveProject('test');
        freelance.approveProject(-1);

        freelance.archiveProject();
        freelance.archiveProject('test');
        freelance.archiveProject(-1);
        freelance.archiveProject(1);

        freelance.getProjects();
        
        freelance.getProjectById();
        freelance.getProjectById('test');
        freelance.getProjectById(-1);
        freelance.getProjectById(1);

        freelance.getReports();
        freelance.getReports(2020-04-01);
        freelance.getReports('test', 2020-05-07);
        freelance.getReports(2020-04-01, 'test');
        freelance.getReports('test', 'test');
        freelance.getReports(2020-04-01, 2019-05-07);
        freelance.getReports(2020-04-01, 2020-05-07);

        freelance.getReportPDF();
        freelance.getReportPDF(2020-04-01);
        freelance.getReportPDF('test', 2020-05-07);
        freelance.getReportPDF(2020-04-01, 'test');
        freelance.getReportPDF('test', 'test');
        freelance.getReportPDF(2020-04-01, 2019-05-07);
        freelance.getReportPDF(2020-05-07, 2020-04-01);

        freelance.getActivities();
        freelance.getActivities(2020-04-01);
        freelance.getActivities('test', 2020-05-07);
        freelance.getActivities(2020-04-01, 'test');
        freelance.getActivities('test', 'test');
        freelance.getActivities(2020-02-02, 2020-01-01);
        freelance.getActivities(2001-01-01, 2020-02-02);

        freelance.getActivitiesById();
        freelance.getActivitiesById(0, 2001-02-02, 2020-01-01);
        freelance.getActivitiesById(-1, 2001-02-02, 2020-01-01);
        freelance.getActivitiesById('test', 2001-02-02, 2020-01-01);
        freelance.getActivitiesById(1);
        freelance.getActivitiesById(1, 2001-02-02, 2020-01-01);
        freelance.getActivitiesById(1, 2001-02-02);
        freelance.getActivitiesById(1, 'test', 2020-01-01);
        freelance.getActivitiesById(1, 2001-02-02, 'test');
        freelance.getActivitiesById(1, 'test', 'test');
        freelance.getActivitiesById(1, 2020-02-02, 2020-01-01);
        freelance.getActivitiesById(1, 2020-01-01, 2020-02-02);

        freelance.getActivitiesByTaskId(1);
        freelance.getActivitiesById(1);
        freelance.getActivitiesByTaskId();
        freelance.getActivitiesByTaskId(0);
        freelance.getActivitiesByTaskId(-1);
        freelance.getActivitiesByTaskId('test');
        freelance.getActivitiesByTaskId(1);

        freelance.delActivityById();
        freelance.delActivityById(-1);
        freelance.delActivityById('test');
        //freelance.delActivityById(1);

        freelance.getTasks();
        freelance.getTasks(-1);
        freelance.getTasks('test');
        freelance.getTasks(4);

        freelance.createTask();
        freelance.createTask(-1);
        freelance.createTask('test');
        freelance.createTask(1000);

        freelance.getTaskById();
        freelance.getTaskById(-1);
        freelance.getTaskById('test');
        freelance.getTaskById(1000);

        freelance.delTaskById();
        freelance.delTaskById(-1);
        freelance.delTaskById('test');
        freelance.delTaskById(1000);
    },

    getMembers: function(projectId){
        
        let options = freelance.options;
        options.method = 'GET';
        options.url = `https://devtracker.itdevsrv.pro/api/freelance/project-member/${projectId}/members`;
        
        if (projectId == undefined) {
            request(options)
                .then(function(response){
                    //console.log(response)
                    assert.equal(response.message, 'project_id must be a number');
                })    
        } else if (typeof projectId == 'string') {
            request(options)
                .then(function(response){
                    //console.log(response) 
                })  
                .catch(function(err){
                    assert.equal(err.message, '404 - {"status":false,"error":"","message":"Page not found!"}')
                }) 
        } else if (projectId < 0) {
            request(options)
                .then(function(response){
                    //console.log(response)
                    assert.equal(response.message, 'project_id must be larger than or equal to 0');
                })  
        } else {
            request(options)
                .then(function(response){
                    //console.log(response)
                    //console.log(response.data)
                    assert.equal(response.message, 'success');
                })
                .catch(function(err){
                    console.error(err);
                })
        }
    },

    approveProject: function(projectId){
        
        let options = freelance.options;
        options.method = 'PATCH';
        options.url = `https://devtracker.itdevsrv.pro/api/freelance/project-member/${projectId}/approve`;
        
        if (projectId == undefined) {
            request(options)
                .then(function(response){
                    //console.log(response)
                    assert.equal(response.message, 'project_id must be a number');
                })    
        } else if (typeof projectId == "string") {
            request(options)
                .then(function(response){
                    //console.log(response)
                })  
                .catch(function(err){
                    assert.equal(err.message, '404 - {"status":false,"error":"","message":"Page not found!"}')
                }) 
        } else if (projectId < 0) {
            request(options)
                .then(function(response){
                    //console.log(response)
                    assert.equal(response.message, 'project_id must be larger than or equal to 0');
                })  
        } else {
            request(options)
                .then(function(response){
                    //console.log(response)
                    assert.equal(response.message, 'success');
                })
                .catch(function(err){
                    console.error(err);
                })
        }
    },

    archiveProject: function(projectId){
        
        let options = freelance.options;
        options.method = 'PATCH';
        options.url = `https://devtracker.itdevsrv.pro/api/freelance/project-member/${projectId}/archive`;
        options.body = {
                is_archive: 1,
            };

        if (projectId == undefined) {
            request(options)
                .then(function(response){
                    //console.log(response)
                    assert.equal(response.message, 'project_id must be a number');
                })    
        } else if (typeof projectId == 'string') {
            request(options)
                .then(function(response){
                    //console.log(response) 
                })  
                .catch(function(err){
                    assert.equal(err.message, '404 - {"status":false,"error":"","message":"Page not found!"}')
                }) 
        } else if (projectId < 0) {
            request(options)
                .then(function(response){
                    //console.log(response)
                    assert.equal(response.message, 'project_id must be larger than or equal to 0');
                })  
        } else {
            request(options)
                .then(function(response){
                    //console.log(response)
                    //console.log(response.data)
                    assert.equal(response.status, true);
                })
                .catch(function(err){
                    console.error(err);
                })
        }
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
                assert.equal(response.message, 'success');
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
            
        if (projectId == undefined) {
            request(options)
                .then(function(response){
                    //console.log(response)
                    assert.equal(response.message, 'id must be a number');
                })    
        } else if (typeof projectId == 'string') {
            request(options)
                .then(function(response){
                    //console.log(response) 
                })  
                .catch(function(err){
                    assert.equal(err.message, '404 - {"status":false,"error":"","message":"Page not found!"}')
                }) 
        } else if (projectId < 0) {
            request(options)
                .then(function(response){
                    //console.log(response)
                    assert.equal(response.message, 'id must be larger than or equal to 0');
                })  
        } else {
            request(options)
                .then(function(response){
                    //console.log(response)
                    //console.log(response.data)
                    assert.equal(response.status, true);
                })
                .catch(function(err){
                    console.error(err);
                })
        }    
    },

    getReports: function(dateBegin, dateEnd){
        
        let options = freelance.options;
        options.method = 'GET';
        options.url = `https://devtracker.itdevsrv.pro/api/freelance/reports?date_begin=${dateBegin}&date_end=${dateEnd}`;

        if (dateBegin == undefined) {
            request(options)
                .then(function(response){
                    //console.log(response)
                    assert.equal(response.message, 'date_begin must be in YYYY-MM-DD format');
                })    
        } else if (dateEnd == undefined) {
            request(options)
                .then(function(response){
                    //console.log(response)
                    assert.equal(response.message, 'date_end must be in YYYY-MM-DD format');
                }) 
        } else if (typeof dateBegin == 'string') {
            request(options)
                .then(function(response){
                    //console.log(response)
                    assert.equal(response.message, 'date_begin must be in YYYY-MM-DD format') 
                })  
        } else if (typeof dateEnd == 'string') {
            request(options)
                .then(function(response){
                    //console.log(response)
                    assert.equal(response.message, 'date_end must be in YYYY-MM-DD format') 
                })  
        } else if ( new Date(dateEnd) < new Date(dateBegin) ) {
            request(options)
                .then(function(response){
                    //console.log(response)
                    assert.equal(response.status, false);
                })
                .catch(function(err){
                    //console.error(err);
                })  
        } else {
            request(options)
                .then(function(response){
                    //console.log(response)
                    //console.log(response.data)
                    assert.equal(response.message, 'success');
                })
                .catch(function(err){
                    console.error(err);
                })
        }   
    },

    getReportPDF: function(dateBegin, dateEnd){
        
        let options = freelance.options;
        options.method = 'GET';
        options.url = `https://devtracker.itdevsrv.pro/api/freelance/reports/pdf/generate?date_begin=${dateBegin}&date_end=${dateEnd}`;

        if (dateBegin == undefined) {
            request(options)
                .then(function(response){
                    //console.log(response)
                    assert.equal(response.message, 'date_begin must be in YYYY-MM-DD format');
                })    
        } else if (dateEnd == undefined) {
            request(options)
                .then(function(response){
                    //console.log(response)
                    assert.equal(response.message, 'date_end must be in YYYY-MM-DD format');
                }) 
        } else if (typeof dateBegin == 'string') {
            request(options)
                .then(function(response){
                    //console.log(response)
                    assert.equal(response.message, 'date_begin must be in YYYY-MM-DD format') 
                })  
        } else if (typeof dateEnd == 'string') {
            request(options)
                .then(function(response){
                    //console.log(response)
                    assert.equal(response.message, 'date_end must be in YYYY-MM-DD format') 
                })  
        } else if ( new Date(dateBegin) > new Date(dateEnd) ) {
            request(options)
                .then(function(response){
                    //console.log(response)
                    assert.equal(response.status, false);
                })  
        } else {
            request(options)
                .then(function(response){
                    //console.log(response)
                    //console.log(response.data)
                    assert.equal(response.message, 'success');
                })
                .catch(function(err){
                    console.error(err);
                })
        }
    },

    getActivities: function(dateBegin, dateEnd){
        
        let options = freelance.options;
        options.method = 'GET';
        options.url = `https://devtracker.itdevsrv.pro/api/freelance/task-activity?date_begin=${dateBegin}&date_end=${dateEnd}`;

        if (dateBegin == undefined) {
            request(options)
                .then(function(response){
                    //console.log(response)
                    assert.equal(response.message, 'date_begin must be in YYYY-MM-DD format');
                })    
        } else if (dateEnd == undefined) {
            request(options)
                .then(function(response){
                    //console.log(response)
                    assert.equal(response.message, 'date_end must be in YYYY-MM-DD format');
                }) 
        } else if (typeof dateBegin == 'string') {
            request(options)
                .then(function(response){
                    //console.log(response)
                    assert.equal(response.message, 'date_begin must be in YYYY-MM-DD format') 
                })  
        } else if (typeof dateEnd == 'string') {
            request(options)
                .then(function(response){
                    //console.log(response)
                    assert.equal(response.message, 'date_end must be in YYYY-MM-DD format') 
                })  
        } else if ( new Date(dateBegin) > new Date(dateEnd) ) {
            request(options)
                .then(function(response){
                    //console.log(response)
                    assert.equal(response.status, false);
                })  
        } else {
            request(options)
                .then(function(response){
                    //console.log(response)
                    //console.log(response.data)
                    assert.equal(response.message, 'success');
                })
                .catch(function(err){
                    console.error(err);
                })
        }
    },

    getActivitiesById: function(id, dateBegin, dateEnd){
        
        let options = freelance.options;
        options.method = 'GET';
        options.url = `https://devtracker.itdevsrv.pro/api/freelance/task-activity/byid/${id}?date_begin=${dateBegin}&date_end=${dateEnd}`;

        if (id == undefined) {
            request(options)
                .then(function(response){
                    //console.log(response)
                    assert.equal(response.message, 'id must be a number');
                })    
        } else if (typeof id == 'string') {
            request(options)
                .then(function(response){
                    //console.log(response) 
                })  
                .catch(function(err){
                    assert.equal(err.message, '404 - {"status":false,"error":"","message":"Page not found!"}')
                }) 
        } else if (id < 0) {
            request(options)
                .then(function(response){
                    //console.log(response)
                    assert.equal(response.message, 'id must be larger than or equal to 0');
                })  
        } else if (dateBegin == undefined) {
            request(options)
                .then(function(response){
                    //console.log(response)
                    assert.equal(response.message, 'date_begin must be in YYYY-MM-DD format');
                })    
        } else if (dateEnd == undefined) {
            request(options)
                .then(function(response){
                    //console.log(response)
                    assert.equal(response.message, 'date_end must be in YYYY-MM-DD format');
                }) 
        } else if (typeof dateBegin == 'string') {
            request(options)
                .then(function(response){
                    //console.log(response)
                    assert.equal(response.message, 'date_begin must be in YYYY-MM-DD format') 
                })  
        } else if (typeof dateEnd == 'string') {
            request(options)
                .then(function(response){
                    //console.log(response)
                    assert.equal(response.message, 'date_end must be in YYYY-MM-DD format') 
                })  
        } else if ( new Date(dateBegin) > new Date(dateEnd) ) {
            request(options)
                .then(function(response){
                    //console.log(response)
                    assert.equal(response.status, false);
                })  
        } else {
            request(options)
                .then(function(response){
                    //console.log(response)
                    //console.log(response.data)
                    assert.equal(response.message, "success");
                })
                .catch(function(err){
                    console.error(err);
            })
        }
    },

    getActivitiesByTaskId: function(id){
        
        let options = freelance.options;
        options.method = 'GET';
        options.url = `https://devtracker.itdevsrv.pro/api/freelance/task-activity/bytask/${id}`;

        if (id == undefined) {
            request(options)
                .then(function(response){
                    //console.log(response)
                    assert.equal(response.message, 'id must be a number');
                })    
        } else if (typeof id == 'string') {
            request(options)
                .then(function(response){
                    //console.log(response) 
                })  
                .catch(function(err){
                    assert.equal(err.message, '404 - {"status":false,"error":"","message":"Page not found!"}')
                }) 
        } else if (id < 0) {
            request(options)
                .then(function(response){
                    //console.log(response)
                    assert.equal(response.message, 'id must be larger than or equal to 0');
                }) 
        } else {
            request(options)
                .then(function(response){
                    //console.log(response)
                    //console.log(response.data)
                    assert.equal(response.message, "success");
                })
                .catch(function(err){
                    console.error(err);
            })
        }
    },

    delActivityById: function(id){
        
        let options = freelance.options;
        options.method = 'DELETE';
        options.url = `https://devtracker.itdevsrv.pro/api/freelance/task-activity/${id}`;

        if (id == undefined) {
            request(options)
                .then(function(response){
                    //console.log(response)
                    assert.equal(response.message, 'id must be a number');
                })    
        } else if (typeof id == 'string') {
            request(options)
                .then(function(response){
                    //console.log(response) 
                })  
                .catch(function(err){
                    assert.equal(err.message, '404 - {"status":false,"error":"","message":"Page not found!"}')
                }) 
        } else if (id < 0) {
            request(options)
                .then(function(response){
                    //console.log(response)
                    assert.equal(response.message, 'id must be larger than or equal to 0');
                }) 
        } else {
            request(options)
                .then(function(response){
                    //console.log(response)
                    //console.log(response.data)
                    assert.equal(response.message, "success");
                })
                .catch(function(err){
                    console.error(err);
            })
        }
    },

    getTasks: function(id){
        
        let options = freelance.options;
        options.method = 'GET';
        options.url = `https://devtracker.itdevsrv.pro/api/freelance/task?project_id=${id}`;

        if (id == undefined) {
            request(options)
                .then(function(response){
                    //console.log(response)
                    assert.equal(response.message, 'project_id must be a number');
                })    
        } else if (typeof id == 'string') {
            request(options)
                .then(function(response){
                    //console.log(response) 
                })  
                .catch(function(err){
                    assert.equal(err.message, '404 - {"status":false,"error":"","message":"Page not found!"}')
                }) 
        } else if (id < 0) {
            request(options)
                .then(function(response){
                    //console.log(response)
                    assert.equal(response.message, 'project_id must be larger than or equal to 0');
                }) 
        } else {
            request(options)
                .then(function(response){
                    //console.log(response)
                    //console.log(response.data)
                    assert.equal(response.message, "success");
                })
                .catch(function(err){
                    //console.error(err);
            })
        }
    },

    createTask: function(id){
        
        let options = freelance.options
        options.method = 'POST';
        options.url = `https://devtracker.itdevsrv.pro/api/freelance/task`;
        options.body = {
                "project_id": id,
                "name": "testAPI"
            };            

        if (id == undefined) {
            request(options)
                .then(function(response){
                    //console.log(response)
                    assert.equal(response.message, 'project_id is required');
                })    
        } else if (typeof id == 'string') {
            request(options)
                .then(function(response){
                    //console.log(response) 
                })  
                .catch(function(err){
                    assert.equal(err.message, '404 - {"status":false,"error":"","message":"Page not found!"}')
                }) 
        } else if (id < 0) {
            request(options)
                .then(function(response){
                    //console.log(response)
                    assert.equal(response.message, 'project_id must be larger than or equal to 0');
                }) 
        } else {
            request(options)
                .then(function(response){
                    //console.log(response)
                    //console.log(response.data)
                    assert.equal(response.message, "success");
                })
                .catch(function(err){
                    //console.error(err);
            })
        }
    },

    getTaskById: function(id){
        
        let options = freelance.options;
        options.method = 'GET';
        options.url = `https://devtracker.itdevsrv.pro/api/freelance/task/by/${id}`;

        if (id == undefined) {
            request(options)
                .then(function(response){
                    //console.log(response)
                    assert.equal(response.message, 'id must be a number');
                })    
        } else if (typeof id == 'string') {
            request(options)
                .then(function(response){
                    //console.log(response) 
                })  
                .catch(function(err){
                    assert.equal(err.message, '404 - {"status":false,"error":"","message":"Page not found!"}')
                }) 
        } else if (id < 0) {
            request(options)
                .then(function(response){
                    //console.log(response)
                    assert.equal(response.message, 'id must be larger than or equal to 0');
                }) 
        } else {
            request(options)
                .then(function(response){
                    //console.log(response)
                    //console.log(response.data)
                    assert.equal(response.message, "success");
                })
                .catch(function(err){
                    //console.error(err);
            })
        }
    },

    delTaskById: function(id){
        
        let options = freelance.options;
        options.method = 'DELETE';
        options.url = `https://devtracker.itdevsrv.pro/api/freelance/task/by/${id}`;

        if (id == undefined) {
            request(options)
                .then(function(response){
                    //console.log(response)
                    assert.equal(response.message, 'id must be a number');
                })    
        } else if (typeof id == 'string') {
            request(options)
                .then(function(response){
                    //console.log(response) 
                })  
                .catch(function(err){
                    assert.equal(err.message, '404 - {"status":false,"error":"","message":"Page not found!"}')
                }) 
        } else if (id < 0) {
            request(options)
                .then(function(response){
                    //console.log(response)
                    assert.equal(response.message, 'id must be larger than or equal to 0');
                }) 
        } else {
            request(options)
                .then(function(response){
                    //console.log(response)
                    //console.log(response.data)
                    assert.equal(response.message, "success");
                })
                .catch(function(err){
                    //console.error(err);
            })
        }
    }
}

auth.test();
freelance.test()