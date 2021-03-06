CREATE TABLE IF NOT EXISTS projects(
    id integer primary key generated by default as identity,
    name text not null check (name <> ''),
    priority integer not null,
    description text,
    deliverydate date not null
);

CREATE TABLE IF NOT EXISTS tasks(
    id integer primary key generated by default as identity,
    name text not null check (name <> ''),
    done boolean,
    projectId integer references projects(id)
);

--INSERT PROJECTS DATA
INSERT INTO projects(name, priority, description, deliverydate) values
('Make a Web App', 1, 'Using Javascript', '2019-05-12');

INSERT INTO projects(name, priority, description, deliverydate) values
('Make an App', 1, 'Using Dart', '2019-05-13');

INSERT INTO projects(name, priority, description, deliverydate) values
('Make a Desktop App', 2, 'Using C++', '2019-05-14');

--INSERT TASKS DATA
INSERT INTO tasks(name, done, projectId) values
('Download Vuejs', false, '1');

INSERT INTO tasks(name, done, projectId) values
('Create UI Web', false, '1');

INSERT INTO tasks(name, done, projectId) values
('Download Flutter', false, '2');

INSERT INTO tasks(name, done, projectId) values
('Design UI', false, '12');