import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { ChakraProvider } from '@chakra-ui/react';
import theme from './chakra/theme'
import { Provider as ReduxProvider } from 'react-redux'
import store from './redux/store';

// AUTH
import AdminRoutes from './auth/adminRoutes';
import CustomerRoutes from './auth/customerRoutes';
import PublicRoutes from './auth/publicRoutes';

// LAYOUT
import Layout from './components/layout'

// FREE PAGES
import Logout from './pages/logout';

// PUBLIC PAGES
import Login from './pages/login'

// PROTECTED PAGES
import Home from './pages/admin/home';
import Admins from './pages/admin/admins';
import AdminsDetails from './pages/admin/adminDetails';
import Customers from './pages/admin/customers';
import CustomerDetails from './pages/admin/customerDetails';
import Projects from './pages/admin/projects';
import ProjectDetails from './pages/admin/projectDetails';
import Messages from './pages/admin/messages';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <ReduxProvider store={store}>
      <ChakraProvider theme={theme}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navigate to="/login"/>}/>
            <Route path="/logout" element={<Logout />}/>

            <Route element={<PublicRoutes/>}>
              <Route path="/login" element={<Login />}/>
            </Route>

            <Route element={<AdminRoutes/>}>
              <Route path="/admin" element={<Layout role="admin" children={<Home />}/>}/>
              <Route path="/admin/admins" element={<Layout role="admin" children={<Admins />}/>}/>
              <Route path="/admin/admins/add" element={<Layout role="admin" children={<AdminsDetails />}/>}/>
              <Route path="/admin/admins/edit/:id" element={<Layout role="admin" children={<AdminsDetails />}/>}/>
              <Route path="/admin/customers" element={<Layout role="admin" children={<Customers />}/>}/>
              <Route path="/admin/customers/add" element={<Layout role="admin" children={<CustomerDetails />}/>}/>
              <Route path="/admin/customers/edit/:id" element={<Layout role="admin" children={<CustomerDetails />}/>}/>
              <Route path="/admin/projects" element={<Layout role="admin" children={<Projects />}/>}/>
              <Route path="/admin/projects/add/:customerId" element={<Layout role="admin" children={<ProjectDetails />}/>}/>
              <Route path="/admin/projects/edit/:customerId/:projectId" element={<Layout role="admin" children={<ProjectDetails />}/>}/>
              <Route path="/admin/messages" element={<Layout role="admin" children={<Messages />}/>}/>
            </Route>
            
            <Route element={<CustomerRoutes/>}>
              <Route path="/customer" element={<Layout role="customer" children={<Home />}/>}/>
              <Route path="/customer/projects" element={<Layout role="customer" children={<Projects />}/>}/>
              <Route path="/customer/projects/add/:customerId" element={<Layout role="customer" children={<ProjectDetails />}/>}/>
              <Route path="/customer/projects/edit/:customerId/:projectId" element={<Layout role="customer" children={<ProjectDetails />}/>}/>
              <Route path="/customer/profile/edit/:id" element={<Layout role="customer" children={<CustomerDetails />}/>}/>
              <Route path="/customer/messages" element={<Layout role="customer" children={<Messages />}/>}/>
            </Route>

          </Routes>
        </BrowserRouter>
      </ChakraProvider>
    </ReduxProvider>
  </React.StrictMode>
)