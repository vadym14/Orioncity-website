/* eslint-disable import/no-anonymous-default-export */
import React from "react";

// =============== templates ===================
const CodeEditors = React.lazy(() =>
  import("./views/editors/code-editors/CodeEditors")
);
const TextEditors = React.lazy(() =>
  import("./views/editors/text-editors/TextEditors")
);

const Invoice = React.lazy(() => import("./views/apps/invoicing/Invoice"));

const AdvancedForms = React.lazy(() =>
  import("./views/forms/advanced-forms/AdvancedForms")
);
const BasicForms = React.lazy(() =>
  import("./views/forms/basic-forms/BasicForms")
);
const ValidationForms = React.lazy(() =>
  import("./views/forms/validation-forms/ValidationForms")
);
const GoogleMaps = React.lazy(() => import("./views/google-maps/GoogleMaps"));
const Toaster = React.lazy(() =>
  import("./views/notifications/toaster/Toaster")
);
const Calendar = React.lazy(() => import("./views/plugins/calendar/Calendar"));
const Draggable = React.lazy(() =>
  import("./views/plugins/draggable/Draggable")
);
const Spinners = React.lazy(() => import("./views/plugins/spinners/Spinners"));
const AdvancedTables = React.lazy(() =>
  import("./views/tables/advanced-tables/AdvancedTables")
);
const Tables = React.lazy(() => import("./views/tables/tables/Tables"));
//const LoadingButtons = React.lazy(() => import('./views/buttons/loading-buttons'));

const Breadcrumbs = React.lazy(() =>
  import("./views/base/breadcrumbs/Breadcrumbs")
);
const Cards = React.lazy(() => import("./views/base/cards/Cards"));
const Carousels = React.lazy(() => import("./views/base/carousels/Carousels"));
const Collapses = React.lazy(() => import("./views/base/collapses/Collapses"));

const Jumbotrons = React.lazy(() =>
  import("./views/base/jumbotrons/Jumbotrons")
);
const ListGroups = React.lazy(() =>
  import("./views/base/list-groups/ListGroups")
);
const Navbars = React.lazy(() => import("./views/base/navbars/Navbars"));
const Navs = React.lazy(() => import("./views/base/navs/Navs"));
const Paginations = React.lazy(() =>
  import("./views/base/paginations/Pagnations")
);
const Popovers = React.lazy(() => import("./views/base/popovers/Popovers"));
const ProgressBar = React.lazy(() =>
  import("./views/base/progress-bar/ProgressBar")
);
const Switches = React.lazy(() => import("./views/base/switches/Switches"));

const Tabs = React.lazy(() => import("./views/base/tabs/Tabs"));
const Tooltips = React.lazy(() => import("./views/base/tooltips/Tooltips"));
const BrandButtons = React.lazy(() =>
  import("./views/buttons/brand-buttons/BrandButtons")
);
const ButtonDropdowns = React.lazy(() =>
  import("./views/buttons/button-dropdowns/ButtonDropdowns")
);
const ButtonGroups = React.lazy(() =>
  import("./views/buttons/button-groups/ButtonGroups")
);
const Buttons = React.lazy(() => import("./views/buttons/buttons/Buttons"));
const Charts = React.lazy(() => import("./views/charts/Charts"));
const Dashboard = React.lazy(() => import("./views/dashboard/Dashboard"));
const CoreUIIcons = React.lazy(() =>
  import("./views/icons/coreui-icons/CoreUIIcons")
);
const Flags = React.lazy(() => import("./views/icons/flags/Flags"));
const Brands = React.lazy(() => import("./views/icons/brands/Brands"));
const Alerts = React.lazy(() => import("./views/notifications/alerts/Alerts"));
const Badges = React.lazy(() => import("./views/notifications/badges/Badges"));
const Modals = React.lazy(() => import("./views/notifications/modals/Modals"));
const Colors = React.lazy(() => import("./views/theme/colors/Colors"));
const Typography = React.lazy(() =>
  import("./views/theme/typography/Typography")
);
const Widgets = React.lazy(() => import("./views/widgets/Widgets"));
// const Users = React.lazy(() => import("./views/users/Users"));
// const User = React.lazy(() => import("./views/users/User"));

// ================ admin ==========
const AdminUsersPage = React.lazy(() => import("./containers/admin/Users"));
const AdminAddUserPage = React.lazy(() =>
  import("./containers/admin/Users/AddUser")
);
const AdminEditUser = React.lazy(() =>
  import("./containers/admin/Users/EditUser")
);
const AdminAddProject = React.lazy(() =>
  import("./containers/admin/Projects/AddProject")
);
const AdminEditProject = React.lazy(() =>
  import("./containers/admin/Projects/EditProject")
);
const AdminProjects = React.lazy(() => import("./containers/admin/Projects"));
const AdminCities = React.lazy(() => import("./containers/admin/Cities"));
const AdminAddCity = React.lazy(() =>
  import("./containers/admin/Cities/AddCity")
);
const AdminEditCity = React.lazy(() =>
  import("./containers/admin/Cities/EditCity")
);

// ================== clients ==================
const ClientLayoutPage = React.lazy(() =>
  import("./containers/clients/LayoutPage")
);
const ClientLogin = React.lazy(() => import("./containers/clients/Login"));
const ClientRegister = React.lazy(() =>
  import("./containers/clients/Register")
);
const ClientForgotPassword = React.lazy(() =>
  import("./containers/clients/ForgotPassword")
);

const ClientHome = React.lazy(() => import("./containers/clients/Home"));
const SilverLakePage = React.lazy(() =>
  import("./containers/clients/SilverLake")
);
const WestHollywoodPage = React.lazy(() =>
  import("./containers/clients/WestHollywood")
);
const DashboardPage = React.lazy(() =>
  import("./containers/clients/Dashboard")
);
const ProductDetailPage = React.lazy(() =>
  import("./containers/clients/ProductDetail")
);
const ProfilePage = React.lazy(() => import("./containers/clients/Profile"));
const MyProjectDetailPage = React.lazy(() =>
  import("./containers/clients/Dashboard/MyProjectDetail")
);
const CityDetailPage = React.lazy(() =>
  import("./containers/clients/CityDetail")
);
const NewHomePage = React.lazy(() => import("./containers/clients/NewHome"));
const ProjectsPage = React.lazy(() => import("./containers/clients/Projects"));
const ProjectDetailPage = React.lazy(() =>
  import("./containers/clients/ProjectDetail")
);

// admin routes
export const adminRoutes = [
  // { path: "/theme/colors", name: "Colors", component: Colors },
  // { path: "/theme", name: "Theme", component: Colors, exact: true },
  // { path: "/", name: "Dashboard", component: Dashboard, exact: true },

  {
    path: "/",
    exact: true,
    name: "Dashboard",
    component: Dashboard,
  },
  {
    path: "/colors",
    exact: true,
    name: "Colors",
    component: Colors,
  },
];

// clients routes
export const clientRoutes = [
  {
    path: "/newhome",
    exact: false,
    name: "Home",
    component: NewHomePage,
  },
  {
    path: "/projects/:id",
    exact: false,
    name: "Project Detail",
    component: ProjectDetailPage,
  },
  {
    path: "/projects",
    exact: false,
    name: "Projects",
    component: ProjectsPage,
  },
  {
    path: "/bio",
    exact: false,
    name: "Bio",
    component: ProjectsPage,
  },
  {
    path: "/",
    exact: false,
    name: "Home",
    component: ClientLayoutPage,
  },
];

export const homeRoutes = [
  {
    path: "/login",
    exact: true,
    name: "Login",
    component: ClientLogin,
  },
  {
    path: "/register",
    exact: true,
    name: "Register",
    component: ClientRegister,
  },
  {
    path: "/forgot-password",
    exact: true,
    name: "Forgot Password",
    component: ClientForgotPassword,
  },
  {
    path: "/west-hollywood",
    exact: true,
    name: "West Hollywood",
    component: WestHollywoodPage,
  },
  {
    path: "/silver-lake",
    exact: true,
    name: "Silver Lake",
    component: SilverLakePage,
  },
  {
    path: "/dashboard/my-projects/:id",
    exact: true,
    name: "My Project Detail",
    component: MyProjectDetailPage,
  },
  {
    path: "/dashboard",
    exact: true,
    name: "Dashboard",
    component: DashboardPage,
  },
  {
    path: "/profile",
    exact: true,
    name: "Profile",
    component: ProfilePage,
  },
  {
    path: "/products/:id",
    exact: true,
    name: "Product Detail",
    component: ProductDetailPage,
  },
  {
    path: "/cities/:id",
    exact: true,
    name: "City Detail",
    component: CityDetailPage,
  },
  {
    path: "/",
    exact: true,
    name: "Home",
    component: ClientHome,
  },
  // {
  //   path: "/",
  //   exact: true,
  //   name: "Home",
  //   component: NewHomePage,
  // },
];

// templates routes
export const routes = [
  { path: "/admin/dashboard", name: "Dashboard", component: Dashboard },
  { path: "/admin/theme", name: "Theme", component: Colors, exact: true },
  { path: "/admin/theme/colors", name: "Colors", component: Colors },
  {
    path: "/admin/theme/typography",
    name: "Typography",
    component: Typography,
  },
  { path: "/admin/base", name: "Base", component: Cards, exact: true },
  {
    path: "/admin/base/breadcrumbs",
    name: "Breadcrumbs",
    component: Breadcrumbs,
  },
  { path: "/admin/base/cards", name: "Cards", component: Cards },
  { path: "/admin/base/carousels", name: "Carousel", component: Carousels },
  { path: "/admin/base/collapses", name: "Collapse", component: Collapses },
  {
    path: "/admin/base/jumbotrons",
    name: "Jumbotrons",
    component: Jumbotrons,
  },
  {
    path: "/admin/base/list-groups",
    name: "List Groups",
    component: ListGroups,
  },
  { path: "/admin/base/navbars", name: "Navbars", component: Navbars },
  { path: "/admin/base/navs", name: "Navs", component: Navs },
  {
    path: "/admin/base/paginations",
    name: "Paginations",
    component: Paginations,
  },
  { path: "/admin/base/popovers", name: "Popovers", component: Popovers },
  {
    path: "/admin/base/progress-bar",
    name: "Progress Bar",
    component: ProgressBar,
  },
  { path: "/admin/base/switches", name: "Switches", component: Switches },
  { path: "/admin/base/tabs", name: "Tabs", component: Tabs },
  { path: "/admin/base/tooltips", name: "Tooltips", component: Tooltips },
  {
    path: "/admin/buttons",
    name: "Buttons",
    component: Buttons,
    exact: true,
  },
  { path: "/admin/buttons/buttons", name: "Buttons", component: Buttons },
  {
    path: "/admin/buttons/button-dropdowns",
    name: "Dropdowns",
    component: ButtonDropdowns,
  },
  {
    path: "/admin/buttons/button-groups",
    name: "Button Groups",
    component: ButtonGroups,
  },
  {
    path: "/admin/buttons/brand-buttons",
    name: "Brand Buttons",
    component: BrandButtons,
  },
  { path: "/admin/charts", name: "Charts", component: Charts },
  {
    path: "/admin/editors",
    name: "Editors",
    component: CodeEditors,
    exact: true,
  },
  {
    path: "/admin/editors/code-editors",
    name: "Code Editors",
    component: CodeEditors,
  },
  {
    path: "/admin/editors/text-editors",
    name: "Text Editors",
    component: TextEditors,
  },
  {
    path: "/admin/forms",
    name: "Forms",
    component: BasicForms,
    exact: true,
  },
  {
    path: "/admin/forms/advanced-forms",
    name: "Advanced Forms",
    component: AdvancedForms,
  },
  {
    path: "/admin/forms/basic-forms",
    name: "Basic Forms",
    component: BasicForms,
  },
  {
    path: "/admin/forms/validation-forms",
    name: "Form Validation",
    component: ValidationForms,
  },
  {
    path: "/admin/google-maps",
    name: "Google Maps",
    component: GoogleMaps,
  },
  {
    path: "/admin/icons",
    exact: true,
    name: "Icons",
    component: CoreUIIcons,
  },
  {
    path: "/admin/icons/coreui-icons",
    name: "CoreUI Icons",
    component: CoreUIIcons,
  },
  { path: "/admin/icons/flags", name: "Flags", component: Flags },
  { path: "/admin/icons/brands", name: "Brands", component: Brands },
  {
    path: "/admin/notifications",
    name: "Notifications",
    component: Alerts,
    exact: true,
  },
  {
    path: "/admin/notifications/alerts",
    name: "Alerts",
    component: Alerts,
  },
  {
    path: "/admin/notifications/badges",
    name: "Badges",
    component: Badges,
  },
  {
    path: "/admin/notifications/modals",
    name: "Modals",
    component: Modals,
  },
  {
    path: "/admin/notifications/toaster",
    name: "Toaster",
    component: Toaster,
  },
  {
    path: "/admin/plugins",
    name: "Plugins",
    component: Calendar,
    exact: true,
  },
  {
    path: "/admin/plugins/calendar",
    name: "Calendar",
    component: Calendar,
  },
  {
    path: "/admin/plugins/draggable",
    name: "Draggable Cards",
    component: Draggable,
  },
  {
    path: "/admin/plugins/spinners",
    name: "Spinners",
    component: Spinners,
  },
  { path: "/admin/tables", name: "Tables", component: Tables, exact: true },
  {
    path: "/admin/tables/advanced-tables",
    name: "Advanced Tables",
    component: AdvancedTables,
  },
  { path: "/admin/tables/tables", name: "Tables", component: Tables },
  { path: "/admin/widgets", name: "Widgets", component: Widgets },
  { path: "/admin/apps", name: "Apps", component: Invoice, exact: true },
  {
    path: "/admin/apps/invoicing",
    name: "Invoice",
    component: Invoice,
    exact: true,
  },
  {
    path: "/admin/apps/invoicing/invoice",
    name: "Invoice",
    component: Invoice,
  },

  { path: "/admin/apps/email/inbox", exact: true, name: "Inbox" },
  { path: "/admin/apps/email/compose", exact: true, name: "Compose" },
  { path: "/admin/apps/email/message", exact: true, name: "Message" },

  // main routes admin
  // users
  {
    path: "/admin/users",
    exact: true,
    name: "Users",
    component: AdminUsersPage,
  },
  {
    path: "/admin/users/add",
    exact: true,
    name: "Add User",
    component: AdminAddUserPage,
  },
  {
    path: "/admin/users/:id",
    exact: true,
    name: "User Details",
    component: AdminEditUser,
  },
  // cities
  {
    path: "/admin/cities",
    exact: true,
    name: "Cities",
    component: AdminCities,
  },
  {
    path: "/admin/cities/add",
    exact: true,
    name: "Add City",
    component: AdminAddCity,
  },
  {
    path: "/admin/cities/:id",
    exact: true,
    name: "City Details",
    component: AdminEditCity,
  },
  // projects
  {
    path: "/admin/projects",
    exact: true,
    name: "Projects",
    component: AdminProjects,
  },
  {
    path: "/admin/projects/add",
    exact: true,
    name: "Add Project",
    component: AdminAddProject,
  },
  {
    path: "/admin/projects/:id",
    exact: true,
    name: "Project Detail",
    component: AdminEditProject,
  },
  { path: "/admin", exact: true, name: "Home" },
];

export default {
  adminRoutes,
  clientRoutes,
  homeRoutes,
  routes,
};
