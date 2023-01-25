# RentX

## Requirements

## Use Cases

### List cars

#### Functional Requirements

- Must be able to list all available cars.
  - by _name_
  - by _brand_
  - by _category_

#### Business Rules

- Should NOT be authenticated to view the list.

### Register a car

#### Functional Requirements

- Must be able to list all categories.
- Must be able to register a car.

#### Non-Functional Requirements

- Should use UUID pattern to identify cars primary key.

#### Business Rules

- Must be an action performed by an _admin_ user;
- Must NOT be able to register a car with existing _license plate_.
- Must NOT be able to update the _license plate_ of a car.
- Should register a car as _available_ for default.

### Register a car specification

#### Functional Requirements

- Must be able to list all specifications.
- Must be able to list all cars.
- Must be able to add an specification to a car.

#### Non-Functional Requirements

- Should use UUID pattern to identify cars specifications primary key.

#### Business Rules

- Must be an action performed by an _admin_ user.
- Must NOT be able to add an specification to an unregistered car.
- Must NOT be able to add an specification twice to the same car.

### Publish photos of the car

#### Functional Requirements

- Must be able to save multiple photos of the car.
- Must be able to list all cars.

#### Non-Functional Requirements

- Should use UUID pattern to identify car photos primary key.
- Should use `multer` to upload files.
- Should make the photos accessible from a public URL.

#### Business Rules

- Must be an action performed by an _admin_ user.
- Must be able to upload one or more images.

### Register Car rental

#### Functional Requirements

- Must be able to register a rental.
- Must be able to list all cars.

#### Non-Functional Requirements

- Should use UUID pattern to identify car rental primary key.

#### Business Rules

- Must NOT have a duration less than 24 hours.
- Must NOT rent a car to the same user at the same period.
- Must NOT rent the same car at the same period.
