import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import AdminBookingsPage from './pages/admin/AdminBookingsPage.jsx';
import AdminDashboardPage from './pages/admin/AdminDashboardPage.jsx';
import AdminNotificationsPage from './pages/admin/AdminNotificationsPage.jsx';
import AdminPartnerEarningsPage from './pages/admin/AdminPartnerEarningsPage.jsx';
import AdminPartnersPage from './pages/admin/AdminPartnersPage.jsx';
import AdminPaymentsPage from './pages/admin/AdminPaymentsPage.jsx';
import AdminReportsPage from './pages/admin/AdminReportsPage.jsx';
import AdminReviewsPage from './pages/admin/AdminReviewsPage.jsx';
import AdminRidesPage from './pages/admin/AdminRidesPage.jsx';
import AdminSettingsPage from './pages/admin/AdminSettingsPage.jsx';
import AdminToursPage from './pages/admin/AdminToursPage.jsx';
import AdminUsersPage from './pages/admin/AdminUsersPage.jsx';
import AdminVehiclesPage from './pages/admin/AdminVehiclesPage.jsx';
import BookingStatusPage from './pages/public/BookingStatusPage.jsx';
import BookingPage from './pages/public/BookingPage.jsx';
import CustomerDashboardPage from './pages/public/CustomerDashboardPage.jsx';
import ContactPage from './pages/public/ContactPage.jsx';
import ForgotPasswordPage from './pages/public/ForgotPasswordPage.jsx';
import GoogleAccountTypePage from './pages/public/GoogleAccountTypePage.jsx';
import GoogleSuccessPage from './pages/public/GoogleSuccessPage.jsx';
import LoginPage from './pages/public/LoginPage.jsx';
import PartnerAddVehiclePage from './pages/partner/PartnerAddVehiclePage.jsx';
import PartnerBookingsPage from './pages/partner/PartnerBookingsPage.jsx';
import PartnerCustomersPage from './pages/partner/PartnerCustomersPage.jsx';
import PartnerEarningsPage from './pages/partner/PartnerEarningsPage.jsx';
import PartnerDashboardPage from './pages/partner/PartnerDashboardPage.jsx';
import PartnerNotificationsPage from './pages/partner/PartnerNotificationsPage.jsx';
import PartnerProfilePage from './pages/partner/PartnerProfilePage.jsx';
import PartnerReviewsPage from './pages/partner/PartnerReviewsPage.jsx';
import PartnerSettingsPage from './pages/partner/PartnerSettingsPage.jsx';
import PartnerVehiclesPage from './pages/partner/PartnerVehiclesPage.jsx';
import RegisterPage from './pages/public/RegisterPage.jsx';
import ResetPasswordPage from './pages/public/ResetPasswordPage.jsx';
import HomePage from './pages/public/HomePage.jsx';
import VehicleListPage from './pages/public/VehicleListPage.jsx';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/user/" element={<HomePage />} />
        <Route path="/user/index.html" element={<HomePage />} />
        <Route path="/index.html" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/login.html" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/register.html" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/forgot-password.html" element={<ForgotPasswordPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        <Route path="/reset-password.html" element={<ResetPasswordPage />} />
        <Route path="/google-account-type" element={<GoogleAccountTypePage />} />
        <Route path="/google-account-type.html" element={<GoogleAccountTypePage />} />
        <Route path="/google-success" element={<GoogleSuccessPage />} />
        <Route path="/google-success.html" element={<GoogleSuccessPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/contact.html" element={<ContactPage />} />
        <Route path="/vehicles" element={<VehicleListPage />} />
        <Route path="/vehicle-list.html" element={<VehicleListPage />} />
        <Route path="/booking" element={<ProtectedRoute roles={["customer", "traveller"]}><BookingPage /></ProtectedRoute>} />
        <Route path="/booking.html" element={<ProtectedRoute roles={["customer", "traveller"]}><BookingPage /></ProtectedRoute>} />
        <Route path="/booking-status" element={<ProtectedRoute roles={["customer", "traveller"]}><BookingStatusPage /></ProtectedRoute>} />
        <Route path="/booking-status.html" element={<ProtectedRoute roles={["customer", "traveller"]}><BookingStatusPage /></ProtectedRoute>} />
        <Route path="/dashboard" element={<ProtectedRoute roles={["customer", "traveller"]}><CustomerDashboardPage /></ProtectedRoute>} />
        <Route path="/customer-dashboard.html" element={<ProtectedRoute roles={["customer", "traveller"]}><CustomerDashboardPage /></ProtectedRoute>} />
        <Route path="/admin/" element={<ProtectedRoute roles={["admin"]}><AdminDashboardPage /></ProtectedRoute>} />
        <Route path="/admin/index.html" element={<ProtectedRoute roles={["admin"]}><AdminDashboardPage /></ProtectedRoute>} />
        <Route path="/admin/users" element={<ProtectedRoute roles={["admin"]}><AdminUsersPage /></ProtectedRoute>} />
        <Route path="/admin/users.html" element={<ProtectedRoute roles={["admin"]}><AdminUsersPage /></ProtectedRoute>} />
        <Route path="/admin/partners" element={<ProtectedRoute roles={["admin"]}><AdminPartnersPage /></ProtectedRoute>} />
        <Route path="/admin/partners.html" element={<ProtectedRoute roles={["admin"]}><AdminPartnersPage /></ProtectedRoute>} />
        <Route path="/admin/vehicles" element={<ProtectedRoute roles={["admin"]}><AdminVehiclesPage /></ProtectedRoute>} />
        <Route path="/admin/vehicles.html" element={<ProtectedRoute roles={["admin"]}><AdminVehiclesPage /></ProtectedRoute>} />
        <Route path="/admin/bookings" element={<ProtectedRoute roles={["admin"]}><AdminBookingsPage /></ProtectedRoute>} />
        <Route path="/admin/bookings.html" element={<ProtectedRoute roles={["admin"]}><AdminBookingsPage /></ProtectedRoute>} />
        <Route path="/admin/tours" element={<ProtectedRoute roles={["admin"]}><AdminToursPage /></ProtectedRoute>} />
        <Route path="/admin/tours.html" element={<ProtectedRoute roles={["admin"]}><AdminToursPage /></ProtectedRoute>} />
        <Route path="/admin/rides" element={<ProtectedRoute roles={["admin"]}><AdminRidesPage /></ProtectedRoute>} />
        <Route path="/admin/rides.html" element={<ProtectedRoute roles={["admin"]}><AdminRidesPage /></ProtectedRoute>} />
        <Route path="/admin/payments" element={<ProtectedRoute roles={["admin"]}><AdminPaymentsPage /></ProtectedRoute>} />
        <Route path="/admin/payments.html" element={<ProtectedRoute roles={["admin"]}><AdminPaymentsPage /></ProtectedRoute>} />
        <Route path="/admin/partner-earnings" element={<ProtectedRoute roles={["admin"]}><AdminPartnerEarningsPage /></ProtectedRoute>} />
        <Route path="/admin/partner-earnings.html" element={<ProtectedRoute roles={["admin"]}><AdminPartnerEarningsPage /></ProtectedRoute>} />
        <Route path="/admin/reports" element={<ProtectedRoute roles={["admin"]}><AdminReportsPage /></ProtectedRoute>} />
        <Route path="/admin/reports.html" element={<ProtectedRoute roles={["admin"]}><AdminReportsPage /></ProtectedRoute>} />
        <Route path="/admin/reviews" element={<ProtectedRoute roles={["admin"]}><AdminReviewsPage /></ProtectedRoute>} />
        <Route path="/admin/reviews.html" element={<ProtectedRoute roles={["admin"]}><AdminReviewsPage /></ProtectedRoute>} />
        <Route path="/admin/notifications" element={<ProtectedRoute roles={["admin"]}><AdminNotificationsPage /></ProtectedRoute>} />
        <Route path="/admin/notifications.html" element={<ProtectedRoute roles={["admin"]}><AdminNotificationsPage /></ProtectedRoute>} />
        <Route path="/admin/settings" element={<ProtectedRoute roles={["admin"]}><AdminSettingsPage /></ProtectedRoute>} />
        <Route path="/admin/settings.html" element={<ProtectedRoute roles={["admin"]}><AdminSettingsPage /></ProtectedRoute>} />
        <Route path="/admin/partner-requests.html" element={<ProtectedRoute roles={["admin"]}><AdminPartnersPage /></ProtectedRoute>} />
        <Route path="/admin/partner-requests" element={<ProtectedRoute roles={["admin"]}><AdminPartnersPage /></ProtectedRoute>} />
        <Route path="/partner/" element={<ProtectedRoute roles={["partner"]}><PartnerDashboardPage /></ProtectedRoute>} />
        <Route path="/partner/index.html" element={<ProtectedRoute roles={["partner"]}><PartnerDashboardPage /></ProtectedRoute>} />
        <Route path="/partner/bookings" element={<ProtectedRoute roles={["partner"]}><PartnerBookingsPage /></ProtectedRoute>} />
        <Route path="/partner/bookings.html" element={<ProtectedRoute roles={["partner"]}><PartnerBookingsPage /></ProtectedRoute>} />
        <Route path="/partner/vehicles" element={<ProtectedRoute roles={["partner"]}><PartnerVehiclesPage /></ProtectedRoute>} />
        <Route path="/partner/vehicles.html" element={<ProtectedRoute roles={["partner"]}><PartnerVehiclesPage /></ProtectedRoute>} />
        <Route path="/partner/add-vehicle" element={<ProtectedRoute roles={["partner"]}><PartnerAddVehiclePage /></ProtectedRoute>} />
        <Route path="/partner/add-vehicle.html" element={<ProtectedRoute roles={["partner"]}><PartnerAddVehiclePage /></ProtectedRoute>} />
        <Route path="/partner/customers" element={<ProtectedRoute roles={["partner"]}><PartnerCustomersPage /></ProtectedRoute>} />
        <Route path="/partner/customers.html" element={<ProtectedRoute roles={["partner"]}><PartnerCustomersPage /></ProtectedRoute>} />
        <Route path="/partner/earnings" element={<ProtectedRoute roles={["partner"]}><PartnerEarningsPage /></ProtectedRoute>} />
        <Route path="/partner/earnings.html" element={<ProtectedRoute roles={["partner"]}><PartnerEarningsPage /></ProtectedRoute>} />
        <Route path="/partner/profile" element={<ProtectedRoute roles={["partner"]}><PartnerProfilePage /></ProtectedRoute>} />
        <Route path="/partner/profile.html" element={<ProtectedRoute roles={["partner"]}><PartnerProfilePage /></ProtectedRoute>} />
        <Route path="/partner/notifications" element={<ProtectedRoute roles={["partner"]}><PartnerNotificationsPage /></ProtectedRoute>} />
        <Route path="/partner/notifications.html" element={<ProtectedRoute roles={["partner"]}><PartnerNotificationsPage /></ProtectedRoute>} />
        <Route path="/partner/reviews" element={<ProtectedRoute roles={["partner"]}><PartnerReviewsPage /></ProtectedRoute>} />
        <Route path="/partner/reviews.html" element={<ProtectedRoute roles={["partner"]}><PartnerReviewsPage /></ProtectedRoute>} />
        <Route path="/partner/settings" element={<ProtectedRoute roles={["partner"]}><PartnerSettingsPage /></ProtectedRoute>} />
        <Route path="/partner/settings.html" element={<ProtectedRoute roles={["partner"]}><PartnerSettingsPage /></ProtectedRoute>} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
