import { User } from '@/domain/user'

export const users: User[] = [
  {
    id: 'user-1',
    email: 'manager@employee.test',
    name: 'James',
    lastname: 'Miller',
    profileImageUrl: 'profile.png',
    employeeId: 'E001',
    workdayId: null,
    status: 'active',
    orgId: 'ORG1',
    jobId: 'JOB1',
  },
  {
    id: 'user-2',
    email: 'ic@employee.test',
    name: 'Sarah',
    lastname: 'Miller',
    profileImageUrl: 'lars-van-der-zee.png',
    employeeId: 'E002',
    workdayId: null,
    status: 'active',
    orgId: 'ORG1',
    jobId: 'JOB2',
  },
]

export default users
