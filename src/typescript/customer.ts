export interface InterfaceCustomer {
  _id?: string,
  name?: string,
  email?: string,
  password?: string,
  projects?: InterfaceProject[],
  messages?: string[],
}

export interface InterfaceProject {
  _id?: string,
  name?: string
  description?: string
  status?: TypeProjectStatus
}

export type TypeProjectStatus = 0 | 1 | 2

export const projectStatusData:InterfaceProjectStatus[] = [
  {
    id: 0,
    name: "Not Started",
    color: "gray"
  },
  {
    id: 1,
    name: "In Progress",
    color: "#0066a5"
  },
  {
    id: 2,
    name: "Completed",
    color: "green"
  }
]

export interface InterfaceProjectStatus {
  id: number,
  name: string,
  color: string
}

export function projectStatus(statusNumber?: 0 | 1 | 2){

  return projectStatusData.find((status) => status.id === statusNumber)
  
}

export interface InterfaceProjectApi {
  _id?: string,
  project: {
    _id?: string,
    name?: string
    description?: string
    status?: TypeProjectStatus
  }
}