CREATE TABLE Designations
(
    DesignationId SERIAL PRIMARY KEY,

    DepartmentId INT,

    DesignationName VARCHAR(100) NOT NULL,

    CONSTRAINT fk_department
    FOREIGN KEY (DepartmentId)
    REFERENCES Departments(DepartmentId)
);

INSERT INTO Designations
(
    DepartmentId,
    DesignationName
)

VALUES

-- IT
(1,' UI/UX Designer'),
(1,'Full Stack Developer'),
(1,'SQL Developer'),
(1,'QA Engineer'),

-- HR
(2,'HR Executive'),
(2,'HR Manager'),

-- Finance
(3,'Accountant'),
(3,'Finance Manager');

SELECT * FROM Designations;