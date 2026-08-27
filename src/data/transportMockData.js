// Mock Data for Transport Management Module

export const mockBuses = [
  { id: 'BUS-01', vehicleNo: 'OD 02 AB 4587', driver: 'Ramesh Das', driverPhone: '9876543210', attendant: 'Sita Behera', route: 'Patia Route', capacity: 42, students: 38, status: 'On Route', location: 'Infocity', nextStop: 'Chandrasekharpur', eta: '12 mins', speed: '32 km/h' },
  { id: 'BUS-02', vehicleNo: 'OD 33 X 9123', driver: 'Suresh Rout', driverPhone: '9876543211', attendant: 'Anita Nayak', route: 'Chandrasekharpur Route', capacity: 40, students: 35, status: 'Reached School', location: 'School', nextStop: '-', eta: '-', speed: '0 km/h' },
  { id: 'BUS-03', vehicleNo: 'OD 02 CD 1122', driver: 'Manoj Singh', driverPhone: '9876543212', attendant: 'Gita Pradhan', route: 'Khandagiri Route', capacity: 50, students: 48, status: 'Delayed', location: 'Fire Station Square', nextStop: 'Khandagiri Square', eta: '25 mins', speed: '15 km/h', delayReason: 'Heavy Traffic' },
  { id: 'BUS-04', vehicleNo: 'OD 02 EF 3344', driver: 'Ajay Kumar', driverPhone: '9876543213', attendant: 'Reena Sahoo', route: 'Rasulgarh Route', capacity: 42, students: 40, status: 'Boarding', location: 'Vani Vihar', nextStop: 'Rasulgarh Square', eta: '5 mins', speed: '0 km/h' },
  { id: 'BUS-05', vehicleNo: 'OD 02 GH 5566', driver: 'Prakash Sethy', driverPhone: '9876543214', attendant: 'Sunita Das', route: 'Baramunda Route', capacity: 35, students: 30, status: 'On Route', location: 'CRP Square', nextStop: 'Baramunda Bus Stand', eta: '8 mins', speed: '40 km/h' },
  { id: 'BUS-06', vehicleNo: 'OD 02 IJ 7788', driver: 'Kailash Patra', driverPhone: '9876543215', attendant: 'Puspa Majhi', route: 'Nayapalli Route', capacity: 42, students: 39, status: 'Maintenance', location: 'Garage', nextStop: '-', eta: '-', speed: '-' },
  { id: 'BUS-07', vehicleNo: 'OD 02 KL 9900', driver: 'Bikash Mahapatra', driverPhone: '9876543216', attendant: 'Lata Munda', route: 'Saheed Nagar Route', capacity: 50, students: 45, status: 'On Route', location: 'Rupali Square', nextStop: 'Saheed Nagar', eta: '10 mins', speed: '35 km/h' },
  { id: 'BUS-08', vehicleNo: 'OD 02 MN 1234', driver: 'Unassigned', driverPhone: '-', attendant: 'Rina Jena', route: 'Jagamara Route', capacity: 40, students: 38, status: 'Driver Absent', location: 'Depot', nextStop: '-', eta: '-', speed: '-' },
  // Adding more mock buses to reach 14 routes
  ...Array.from({ length: 6 }).map((_, i) => ({
    id: `BUS-0${i + 9}`,
    vehicleNo: `OD 02 XX ${1000 + i}`,
    driver: `Driver ${i + 9}`,
    driverPhone: `98765432${20 + i}`,
    attendant: `Attendant ${i + 9}`,
    route: `Route ${i + 9}`,
    capacity: 40,
    students: 30 + i,
    status: 'On Route',
    location: `Stop A${i}`,
    nextStop: `Stop B${i}`,
    eta: `${10 + i} mins`,
    speed: '30 km/h'
  }))
];

export const mockRoutes = [
  { id: 'RT-01', name: 'Patia Route', bus: 'BUS-01', stopsCount: 6, distance: '18 km', students: 38, status: 'Active' },
  { id: 'RT-02', name: 'Chandrasekharpur Route', bus: 'BUS-02', stopsCount: 5, distance: '15 km', students: 35, status: 'Completed' },
  { id: 'RT-03', name: 'Khandagiri Route', bus: 'BUS-03', stopsCount: 8, distance: '22 km', students: 48, status: 'Delayed' },
  { id: 'RT-04', name: 'Rasulgarh Route', bus: 'BUS-04', stopsCount: 4, distance: '12 km', students: 40, status: 'Active' },
  { id: 'RT-05', name: 'Baramunda Route', bus: 'BUS-05', stopsCount: 5, distance: '16 km', students: 30, status: 'Active' },
  { id: 'RT-06', name: 'Nayapalli Route', bus: 'BUS-06', stopsCount: 6, distance: '14 km', students: 39, status: 'Inactive' },
  { id: 'RT-07', name: 'Saheed Nagar Route', bus: 'BUS-07', stopsCount: 7, distance: '10 km', students: 45, status: 'Active' },
  { id: 'RT-08', name: 'Jagamara Route', bus: 'BUS-08', stopsCount: 5, distance: '18 km', students: 38, status: 'Issue' },
];

export const mockStops_PatiaRoute = [
  { id: 'STP-1', name: 'Patia Square', time: '7:05 AM', students: 8, lat: 20.355, lng: 85.818 },
  { id: 'STP-2', name: 'KIIT Square', time: '7:15 AM', students: 12, lat: 20.350, lng: 85.815 },
  { id: 'STP-3', name: 'Infocity', time: '7:28 AM', students: 9, lat: 20.345, lng: 85.810 }, // Current Location
  { id: 'STP-4', name: 'Chandrasekharpur', time: '7:40 AM', students: 5, lat: 20.335, lng: 85.812 },
  { id: 'STP-5', name: 'Nandankanan Road', time: '7:52 AM', students: 4, lat: 20.325, lng: 85.815 },
  { id: 'STP-6', name: 'School Campus', time: '8:00 AM', students: 0, lat: 20.300, lng: 85.820 },
];

export const mockStudents_BUS01 = [
  { id: 'ST-001', name: 'Aarav Sharma', class: 'VIII-A', roll: '05', stop: 'KIIT Square', parent: 'Rajesh Sharma', phone: '9876543210', pickupTime: '7:15 AM', status: 'Boarded', time: '7:16 AM' },
  { id: 'ST-002', name: 'Priya Das', class: 'IX-B', roll: '12', stop: 'Patia Square', parent: 'Sanjay Das', phone: '9876543211', pickupTime: '7:05 AM', status: 'Boarded', time: '7:06 AM' },
  { id: 'ST-003', name: 'Rahul Jain', class: 'X-A', roll: '22', stop: 'Infocity', parent: 'Manish Jain', phone: '9876543212', pickupTime: '7:28 AM', status: 'Not Boarded', time: '-' },
  { id: 'ST-004', name: 'Sneha Patel', class: 'VII-C', roll: '18', stop: 'KIIT Square', parent: 'Rakesh Patel', phone: '9876543213', pickupTime: '7:15 AM', status: 'Boarded', time: '7:14 AM' },
  { id: 'ST-005', name: 'Vikram Singh', class: 'VIII-A', roll: '30', stop: 'Chandrasekharpur', parent: 'Anil Singh', phone: '9876543214', pickupTime: '7:40 AM', status: 'Pending', time: '-' },
  { id: 'ST-006', name: 'Ananya Mishra', class: 'IX-A', roll: '08', stop: 'Patia Square', parent: 'Dev Mishra', phone: '9876543215', pickupTime: '7:05 AM', status: 'Absent', time: '-' },
];

export const mockDrivers = [
  { name: 'Ramesh Das', license: 'ODDL-928374', phone: '9876543210', bus: 'BUS-01', experience: '12 Years', status: 'Present' },
  { name: 'Suresh Rout', license: 'ODDL-112233', phone: '9876543211', bus: 'BUS-02', experience: '8 Years', status: 'Present' },
  { name: 'Manoj Singh', license: 'ODDL-445566', phone: '9876543212', bus: 'BUS-03', experience: '15 Years', status: 'Present' },
  { name: 'Ajay Kumar', license: 'ODDL-778899', phone: '9876543213', bus: 'BUS-04', experience: '5 Years', status: 'Present' },
  { name: 'Prakash Sethy', license: 'ODDL-990011', phone: '9876543214', bus: 'BUS-05', experience: '10 Years', status: 'Present' },
  { name: 'Kailash Patra', license: 'ODDL-223344', phone: '9876543215', bus: 'BUS-06', experience: '20 Years', status: 'Present' },
  { name: 'Bikash Mahapatra', license: 'ODDL-556677', phone: '9876543216', bus: 'BUS-07', experience: '7 Years', status: 'Present' },
  // Driver absent for BUS-08
];
