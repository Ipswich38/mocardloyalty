import { ClientData } from '../types'

// Parse CSV data from the clients file
export const parseClientCSV = (csvText: string): ClientData[] => {
  const lines = csvText.split('\n')
  // const headers = lines[0].split(',')
  
  return lines.slice(1)
    .filter(line => line.trim())
    .map(line => {
      const values = line.split(',')
      return {
        orderNumber: values[0]?.trim() || '',
        email: values[1]?.trim() || '',
        billingName: values[2]?.trim() || '',
        billingPhone: values[3]?.trim() || '',
        created: values[4]?.trim() || '',
        hasRegistered: false,
        password: undefined
      }
    })
    .filter(client => client.orderNumber && client.billingName)
}

// Mock client data for development (based on the CSV)
export const MOCK_CLIENTS: ClientData[] = [
  {
    orderNumber: '#1076',
    email: 'derrick.nadera@test.com',
    billingName: 'Derrick Nadera',
    billingPhone: '9123456789',
    created: 'Jan 11, 2025, 10:30 AM',
    hasRegistered: false
  },
  {
    orderNumber: '#1075',
    email: 'jvsollesta@gmail.com',
    billingName: 'Jan Vincent Sollesta',
    billingPhone: '922863255',
    created: 'Dec 28, 2024, 4:06 PM',
    hasRegistered: false
  },
  {
    orderNumber: '#1074',
    email: 'Kayegulmatico45@gmail.com',
    billingName: 'Angel Kaye tingson gulmatico',
    billingPhone: '9998070912',
    created: 'Dec 28, 2024, 3:39 PM',
    hasRegistered: false
  },
  {
    orderNumber: '#1073',
    email: 'nel_mm@yahoo.com',
    billingName: 'Lorenel Panaguiton',
    billingPhone: '9293407818',
    created: 'Dec 28, 2024, 2:56 PM',
    hasRegistered: false
  },
  {
    orderNumber: '#1072',
    email: 'jmeyales23@gmail.com',
    billingName: 'John Michael Eyales',
    billingPhone: '9388369022',
    created: 'Dec 28, 2024, 1:15 PM',
    hasRegistered: false
  },
  {
    orderNumber: '#1071',
    email: 'shielamarcon@yahoo.com',
    billingName: 'Shiela Mae Marcon',
    billingPhone: '9126712412',
    created: 'Dec 28, 2024, 1:13 PM',
    hasRegistered: false
  }
]

// Find client by control number and name
export const findClientByCredentials = (fullName: string, controlNumber: string): ClientData | null => {
  const client = MOCK_CLIENTS.find(c => 
    c.orderNumber.toLowerCase() === controlNumber.toLowerCase() &&
    c.billingName.toLowerCase().includes(fullName.toLowerCase().split(' ')[0]) // Match first name at least
  )
  return client || null
}

// Create patient data from client data
export const createPatientFromClient = (client: ClientData): any => {
  return {
    id: `client_${client.orderNumber.replace('#', '')}`,
    name: client.billingName,
    phone: client.billingPhone,
    email: client.email,
    emergencyContact: 'Not provided',
    emergencyPhone: 'Not provided',
    membershipId: client.orderNumber,
    loyaltyPoints: Math.floor(Math.random() * 500) + 100, // Random points between 100-600
    level: 1,
    membershipTier: 'Bronze' as const,
    pointsToNextTier: 500,
    dentalBenefits: {
      oralProphylaxis: { used: false, remaining: 2, total: 2 },
      toothExtraction: { used: false, remaining: 1, total: 1 },
      lightCureFilling: { used: false, remaining: 3, total: 3 },
      fluorideTreatment: { used: false, remaining: 2, total: 2 }
    },
    services: [],
    memberSince: client.created,
    isActive: true,
    lastVisit: undefined
  }
}