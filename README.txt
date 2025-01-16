

CREATE TABLE objects(
 	object_id INT primary key not null AUTO_INCREMENT,
 	object_name VARCHAR(255),
 	test_1 INT,
    test_2 INT,
    laborator INT,
    seminar INT,
    current_evaluation INT,
    exam INT,
    user_id int,
    FOREIGN KEY(user_id) REFERENCES users(user_id)
)