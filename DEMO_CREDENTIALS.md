# 🔐 MOCards Demo Credentials & Test Accounts

## Multi-Role Authentication System

### 🏥 **Admin Dashboard Access**
- **Username**: `admin`
- **Password**: `admin123`
- **Features**: System management, user oversight, approve registrations, manage dentists

### 🦷 **Dentist Dashboard Access**
- **Username**: `dentist`
- **Password**: `dentist123`
- **Features**: Patient management, service redemptions, practice analytics

### 👤 **Patient Dashboard Access**
- **Username**: `patient`
- **Password**: `patient123`
- **Features**: Loyalty tracking, benefits management, service history

### 🔄 **Legacy Access**
- **Username**: `demo`
- **Password**: `password123`
- **Features**: Original patient interface (defaults to patient view)

---

## 📋 Pre-Registered Client Test Accounts

### Test Client Registration Flow
These accounts can be used to test the client registration system with existing control numbers:

### **Account 1: Derrick Nadera**
- **Full Name**: `Derrick Nadera`
- **Control Number**: `#1076`
- **Email**: `derrick.nadera@test.com`
- **Phone**: `9123456789`
- **Registration Date**: `Jan 11, 2025, 10:30 AM`
- **Status**: Available for registration

### **Account 2: Jan Vincent Sollesta**
- **Full Name**: `Jan Vincent Sollesta`
- **Control Number**: `#1075`
- **Email**: `jvsollesta@gmail.com`
- **Phone**: `922863255`
- **Registration Date**: `Dec 28, 2024, 4:06 PM`
- **Status**: Available for registration

### **Account 3: Angel Kaye Gulmatico**
- **Full Name**: `Angel Kaye tingson gulmatico`
- **Control Number**: `#1074`
- **Email**: `Kayegulmatico45@gmail.com`
- **Phone**: `9998070912`
- **Registration Date**: `Dec 28, 2024, 3:39 PM`
- **Status**: Available for registration

### **Account 4: Lorenel Panaguiton**
- **Full Name**: `Lorenel Panaguiton`
- **Control Number**: `#1073`
- **Email**: `nel_mm@yahoo.com`
- **Phone**: `9293407818`
- **Registration Date**: `Dec 28, 2024, 2:56 PM`
- **Status**: Available for registration

### **Account 5: John Michael Eyales**
- **Full Name**: `John Michael Eyales`
- **Control Number**: `#1072`
- **Email**: `jmeyales23@gmail.com`
- **Phone**: `9388369022`
- **Registration Date**: `Dec 28, 2024, 1:15 PM`
- **Status**: Available for registration

### **Account 6: Shiela Mae Marcon**
- **Full Name**: `Shiela Mae Marcon`
- **Control Number**: `#1071`
- **Email**: `shielamarcon@yahoo.com`
- **Phone**: `9126712412`
- **Registration Date**: `Dec 28, 2024, 1:13 PM`
- **Status**: Available for registration

---

## 🧪 Testing Workflows

### **1. Direct Login Testing**
Use the role-based credentials above to directly access different dashboard types.

### **2. Client Registration Testing**
1. Go to login screen
2. Click "Register with Control Number"
3. Use any of the pre-registered client details above
4. Complete registration with a password
5. Login with the new credentials

### **3. New Client Registration Testing**
1. Go to login screen
2. Click "New Client Registration"
3. Complete the 3-step registration form
4. Registration will be pending admin approval
5. Login as admin to approve/reject the registration

### **4. Admin Approval Workflow Testing**
1. Create new client registration (step 3 above)
2. Login as admin (`admin` / `admin123`)
3. Go to "New Client Registrations" section
4. Review and approve/reject pending registrations

### **5. Dentist Patient Management Testing**
1. Login as dentist (`dentist` / `dentist123`)
2. View assigned patients in "My Patients" section
3. Test CRUD operations (View, Edit patient details)
4. Process service redemptions

---

## 🔒 Security Notes

- **Demo credentials are hidden** from the login interface in production
- **All passwords are for demo purposes only** - use secure passwords in production
- **Client data is mock data** - replace with real database in production
- **Registration approval** currently updates local state - implement backend in production

---

## 🎯 Quick Test Guide

### **Recommended Testing Sequence:**

1. **Start with Patient View**: Login with `patient` / `patient123`
2. **Test Dentist Features**: Login with `dentist` / `dentist123`
3. **Explore Admin Panel**: Login with `admin` / `admin123`
4. **Test Registration**: Use Derrick Nadera's details (#1076)
5. **Test New Registration**: Create a completely new account
6. **Test Admin Approval**: Approve the new registration as admin

### **Key Features to Test:**
- ✅ Role-based dashboard routing
- ✅ Responsive design on mobile/tablet
- ✅ Form validation and error handling
- ✅ Navigation between dashboard sections
- ✅ Professional UI/UX consistency
- ✅ Developer attribution display

---

**Developed & Designed by kreativloops**