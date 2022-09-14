create table employee(
    id int  primary key AUTO_INCREMENT, 
    name varchar(250),
    contactNumber varchar(20),
    email varchar(50),
    password varchar(250),
    status varchar(250),
    role varchar(20),
    UNIQUE (email) 
);

insert into employee(name, contactNumber, email, password, status, role) 
values('Admin', '9089765476', 'admin@gmail.com', 'admin', 'true', 'admin');

create table project(
    id int NOT NULL AUTO_INCREMENT,
    name varchar(255) NOT NULL,
    primary key(id)
)

create table task(
    id int NOT NULL AUTO_INCREMENT,
    name varchar(255) NOT NULL,
    projectId integer NOT NULL,
    startTime TIMESTAMP NOT NULL,
    endTime TIMESTAMP NOT NULL,
    primary key(id)
)

insert into task(name, projectId, startTime, endTime)
values('vinod', 1, '2022-02-09 07:00:00', '2022-02-10 08:10:00');

create table timeEntries(
    id int NOT NULL AUTO_INCREMENT,
    name varchar(255) NOT NULL,
    projectId integer NOT NULL,
    comment varchar(255),
    date DATE NOT NULL ,
    StartTime TIMESTAMP NOT NULL,
    EndTime TIMESTAMP NOT NULL,
    status varchar(20),
    primary key(id)
);

insert into timeEntries(name, projectId, comment, date, StartTime, EndTime)
values('vinod', 1, 'nice project', '2022-05-12', '2022-02-09 07:00:00', '2022-02-10 08:10:00');

