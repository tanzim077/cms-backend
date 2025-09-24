// Swagger examples and schemas for API documentation

export const loginRequestExample = {
  example1: {
    summary: 'Login Example',
    value: {
      email: 'admin@gmail.com',
      password: '12345',
    },
  },
};

export const loginResponseExample = {
  access_token:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsInN1YiI6MSwiaWF0IjoxNzU4NzEwNjY3LCJleHAiOjE3NTg3NTM4Njd9.zugDq6vCyMLgHxe046w0quoQgefdcvqfsO6tFwwNDi4',
  refresh_token:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsInN1YiI6MSwiaWF0IjoxNzU4NzEwNjY3LCJleHAiOjE3NTg3MjUwNjd9.4ssLnO1HZ4J7OErUrbQ48EKiKMh4ig9RvGR7zx17EBM',
  user: {
    id: 1,
    name: 'Tanzim Ahmed',
    email: 'admin@gmail.com',
    image: null,
    address: null,
    phone: null,
    is_verified: false,
    is_blocked: false,
    nid_no: null,
    verication_document: null,
    is_deleted: false,
    is_active: true,
    createdAt: '2025-09-21T07:09:51.533Z',
    updatedAt: '2025-09-24T08:32:59.956Z',
  },
};

export const registrationRequestExample = {
  example1: {
    summary: 'Registration Example',
    value: {
      name: 'Tanzim Ahmed',
      email: 'tanzim111@gmail.com',
      password: '123456',
    },
  },
};

export const registrationResponseExample = {
  id: 8,
  name: 'Tanzim Ahmed',
  email: 'tanzim111@gmail.com',
  image: null,
  address: null,
  phone: null,
  is_verified: false,
  is_blocked: false,
  nid_no: null,
  verication_document: null,
  is_deleted: false,
  is_active: true,
  createdAt: '2025-09-24T10:45:32.730Z',
  updatedAt: '2025-09-24T10:45:32.730Z',
};
