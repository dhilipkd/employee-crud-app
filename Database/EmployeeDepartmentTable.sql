CREATE TABLE Departments
(
    DepartmentId SERIAL PRIMARY KEY,

    DepartmentName VARCHAR(100) NOT NULL
);

INSERT INTO Departments
(
    DepartmentName
)

VALUES
('IT'),
('HR'),
('Finance');

SELECT * FROM Departments;