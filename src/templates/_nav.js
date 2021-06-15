import React from "react";
import CIcon from "@coreui/icons-react";

const _nav = [
  {
    _tag: "CSidebarNavItem",
    name: "Dashboard",
    to: "/admin/dashboard",
    icon: <CIcon name="cil-speedometer" customClasses="c-sidebar-nav-icon" />,
    // badge: {
    //   color: "info",
    //   text: "NEW",
    // },
  },
  // users
  {
    _tag: "CSidebarNavTitle",
    _children: ["Users Manager"],
  },
  {
    _tag: "CSidebarNavItem",
    name: "Add User",
    to: "/admin/users/add",
    icon: "cil-user",
  },
  {
    _tag: "CSidebarNavItem",
    name: "Users",
    to: "/admin/users",
    icon: "cil-user",
  },
  // cities
  {
    _tag: "CSidebarNavTitle",
    _children: ["Cities Manager"],
  },
  {
    _tag: "CSidebarNavItem",
    name: "Add City",
    to: "/admin/cities/add",
    icon: "cil-location-pin",
  },
  {
    _tag: "CSidebarNavItem",
    name: "Cities",
    to: "/admin/cities",
    icon: "cil-location-pin",
  },
  // projects
  {
    _tag: "CSidebarNavTitle",
    _children: ["Projects Manager"],
  },
  {
    _tag: "CSidebarNavItem",
    name: "Add Project",
    to: "/admin/projects/add",
    icon: "cil-paperclip",
  },
  {
    _tag: "CSidebarNavItem",
    name: "Projects",
    to: "/admin/projects",
    icon: "cil-paperclip",
  },

  // // theme
  // {
  //   _tag: "CSidebarNavTitle",
  //   _children: ["Theme"],
  // },
  // {
  //   _tag: "CSidebarNavItem",
  //   name: "Colors",
  //   to: "/admin/theme/colors",
  //   icon: "cil-drop",
  // },
  // {
  //   _tag: "CSidebarNavItem",
  //   name: "Typography",
  //   to: "/admin/theme/typography",
  //   icon: "cil-pencil",
  // },
  // {
  //   _tag: "CSidebarNavTitle",
  //   _children: ["Components"],
  // },
  // {
  //   _tag: "CSidebarNavDropdown",
  //   name: "Base",
  //   route: "/admin/base",
  //   icon: "cil-puzzle",
  //   _children: [
  //     {
  //       _tag: "CSidebarNavItem",
  //       name: "Breadcrumb",
  //       to: "/admin/base/breadcrumbs",
  //     },
  //     {
  //       _tag: "CSidebarNavItem",
  //       name: "Cards",
  //       to: "/admin/base/cards",
  //     },
  //     {
  //       _tag: "CSidebarNavItem",
  //       name: "Carousel",
  //       to: "/admin/base/carousels",
  //     },
  //     {
  //       _tag: "CSidebarNavItem",
  //       name: "Collapse",
  //       to: "/admin/base/collapses",
  //     },
  //     /*
  //     {
  //       name: 'Dropdowns',
  //       to: '/base/dropdowns',
  //     },*/
  //     {
  //       _tag: "CSidebarNavItem",
  //       name: "Jumbotron",
  //       to: "/admin/base/jumbotrons",
  //     },
  //     {
  //       _tag: "CSidebarNavItem",
  //       name: "List group",
  //       to: "/admin/base/list-groups",
  //     },
  //     {
  //       _tag: "CSidebarNavItem",
  //       name: "Navs",
  //       to: "/admin/base/navs",
  //     },
  //     {
  //       _tag: "CSidebarNavItem",
  //       name: "Navbars",
  //       to: "/admin/base/navbars",
  //     },
  //     {
  //       _tag: "CSidebarNavItem",
  //       name: "Pagination",
  //       to: "/admin/base/paginations",
  //     },
  //     {
  //       _tag: "CSidebarNavItem",
  //       name: "Popovers",
  //       to: "/admin/base/popovers",
  //     },
  //     {
  //       _tag: "CSidebarNavItem",
  //       name: "Progress",
  //       to: "/admin/base/progress-bar",
  //     },
  //     {
  //       _tag: "CSidebarNavItem",
  //       name: "Switches",
  //       to: "/admin/base/switches",
  //     },
  //     {
  //       _tag: "CSidebarNavItem",
  //       name: "Tabs",
  //       to: "/admin/base/tabs",
  //     },
  //     {
  //       _tag: "CSidebarNavItem",
  //       name: "Tooltips",
  //       to: "/admin/base/tooltips",
  //     },
  //   ],
  // },
  // {
  //   _tag: "CSidebarNavDropdown",
  //   name: "Buttons",
  //   route: "/admin/buttons",
  //   icon: "cil-cursor",
  //   _children: [
  //     {
  //       _tag: "CSidebarNavItem",
  //       name: "Buttons",
  //       to: "/admin/buttons/buttons",
  //     },
  //     {
  //       _tag: "CSidebarNavItem",
  //       name: "Brand buttons",
  //       to: "/admin/buttons/brand-buttons",
  //     },
  //     {
  //       _tag: "CSidebarNavItem",
  //       name: "Buttons groups",
  //       to: "/admin/buttons/button-groups",
  //     },
  //     {
  //       _tag: "CSidebarNavItem",
  //       name: "Dropdowns",
  //       to: "/admin/buttons/button-dropdowns",
  //     },
  //   ],
  // },
  // {
  //   _tag: "CSidebarNavItem",
  //   name: "Charts",
  //   to: "/admin/charts",
  //   icon: "cil-chart-pie",
  // },
  // {
  //   _tag: "CSidebarNavDropdown",
  //   name: "Editors",
  //   route: "/admin/editors",
  //   icon: "cil-code",
  //   _children: [
  //     {
  //       _tag: "CSidebarNavItem",
  //       name: "Code Editors",
  //       to: "/admin/editors/code-editors",
  //       badge: {
  //         color: "danger",
  //         text: "PRO",
  //       },
  //     },
  //     {
  //       _tag: "CSidebarNavItem",
  //       name: "Rich Text Editor",
  //       to: "/admin/editors/text-editors",
  //       badge: {
  //         color: "danger",
  //         text: "PRO",
  //       },
  //     },
  //   ],
  // },
  // {
  //   _tag: "CSidebarNavDropdown",
  //   name: "Forms",
  //   route: "/admin/forms",
  //   icon: "cil-notes",
  //   _children: [
  //     {
  //       _tag: "CSidebarNavItem",
  //       name: "Basic Forms",
  //       to: "/admin/forms/basic-forms",
  //     },
  //     {
  //       _tag: "CSidebarNavItem",
  //       name: "Advanced Forms",
  //       to: "/admin/forms/advanced-forms",
  //       badge: {
  //         color: "danger",
  //         text: "PRO",
  //       },
  //     },
  //     {
  //       _tag: "CSidebarNavItem",
  //       name: "Validation",
  //       to: "/admin/forms/validation-forms",
  //       badge: {
  //         color: "danger",
  //         text: "PRO",
  //       },
  //     },
  //   ],
  // },
  // {
  //   _tag: "CSidebarNavItem",
  //   name: "Google Maps",
  //   to: "/admin/google-maps",
  //   icon: "cil-map",
  //   badge: {
  //     color: "danger",
  //     text: "PRO",
  //   },
  // },
  // {
  //   _tag: "CSidebarNavDropdown",
  //   name: "Icons",
  //   route: "/admin/icons",
  //   icon: "cil-star",
  //   _children: [
  //     {
  //       _tag: "CSidebarNavItem",
  //       name: "CoreUI Free",
  //       to: "/admin/icons/coreui-icons",
  //       badge: {
  //         color: "success",
  //         text: "NEW",
  //       },
  //     },
  //     {
  //       _tag: "CSidebarNavItem",
  //       name: "CoreUI Flags",
  //       to: "/admin/icons/flags",
  //     },
  //     {
  //       _tag: "CSidebarNavItem",
  //       name: "CoreUI Brands",
  //       to: "/admin/icons/brands",
  //     },
  //   ],
  // },
  // {
  //   _tag: "CSidebarNavDropdown",
  //   name: "Notifications",
  //   route: "/admin/notifications",
  //   icon: "cil-bell",
  //   _children: [
  //     {
  //       _tag: "CSidebarNavItem",
  //       name: "Alerts",
  //       to: "/admin/notifications/alerts",
  //     },
  //     {
  //       _tag: "CSidebarNavItem",
  //       name: "Badges",
  //       to: "/admin/notifications/badges",
  //     },
  //     {
  //       _tag: "CSidebarNavItem",
  //       name: "Modal",
  //       to: "/admin/notifications/modals",
  //     },
  //     {
  //       _tag: "CSidebarNavItem",
  //       name: "Toaster",
  //       to: "/admin/notifications/toaster",
  //     },
  //   ],
  // },
  // {
  //   _tag: "CSidebarNavDropdown",
  //   name: "Plugins",
  //   route: "/admin/plugins",
  //   icon: "cil-input-power",
  //   _children: [
  //     {
  //       _tag: "CSidebarNavItem",
  //       name: "Calendar",
  //       to: "/admin/plugins/calendar",
  //       badge: {
  //         color: "danger",
  //         text: "PRO",
  //       },
  //     },
  //     {
  //       _tag: "CSidebarNavItem",
  //       name: "Draggable",
  //       to: "/admin/plugins/draggable",
  //       badge: {
  //         color: "danger",
  //         text: "PRO",
  //       },
  //     },
  //     {
  //       _tag: "CSidebarNavItem",
  //       name: "Spinners",
  //       to: "/admin/plugins/spinners",
  //       badge: {
  //         color: "danger",
  //         text: "PRO",
  //       },
  //     },
  //   ],
  // },
  // {
  //   _tag: "CSidebarNavDropdown",
  //   name: "Tables",
  //   route: "/admin/tables",
  //   icon: "cil-list",
  //   _children: [
  //     {
  //       _tag: "CSidebarNavItem",
  //       name: "Basic Tables",
  //       to: "/admin/tables/tables",
  //     },
  //     {
  //       _tag: "CSidebarNavItem",
  //       name: "Advanced Tables",
  //       to: "/admin/tables/advanced-tables",
  //     },
  //   ],
  // },
  // {
  //   _tag: "CSidebarNavItem",
  //   name: "Widgets",
  //   to: "/admin/widgets",
  //   icon: "cil-calculator",
  //   badge: {
  //     color: "info",
  //     text: "NEW",
  //   },
  // },
  // {
  //   _tag: "CSidebarNavDivider",
  // },
  // {
  //   _tag: "CSidebarNavTitle",
  //   _children: ["Extras"],
  // },
  // {
  //   _tag: "CSidebarNavDropdown",
  //   name: "Pages",
  //   route: "/admin/pages",
  //   icon: "cil-star",
  //   _children: [
  //     {
  //       _tag: "CSidebarNavItem",
  //       name: "Login",
  //       to: "/login",
  //     },
  //     {
  //       _tag: "CSidebarNavItem",
  //       name: "Register",
  //       to: "/register",
  //     },
  //     {
  //       _tag: "CSidebarNavItem",
  //       name: "Error 404",
  //       to: "/404",
  //     },
  //     {
  //       _tag: "CSidebarNavItem",
  //       name: "Error 500",
  //       to: "/500",
  //     },
  //   ],
  // },
  // {
  //   _tag: "CSidebarNavItem",
  //   name: "Disabled",
  //   icon: "cil-ban",
  //   badge: {
  //     color: "secondary",
  //     text: "NEW",
  //   },
  //   addLinkClass: "c-disabled",
  //   disabled: true,
  // },
  // {
  //   _tag: "CSidebarNavDropdown",
  //   name: "Apps",
  //   route: "/admin/apps",
  //   icon: "cil-layers",
  //   _children: [
  //     {
  //       _tag: "CSidebarNavDropdown",
  //       name: "Invoicing",
  //       route: "/admin/apps/invoicing",
  //       icon: "cil-spreadsheet",
  //       _children: [
  //         {
  //           _tag: "CSidebarNavItem",
  //           name: "Invoice",
  //           to: "/admin/apps/invoicing/invoice",
  //           badge: {
  //             color: "danger",
  //             text: "PRO",
  //           },
  //         },
  //       ],
  //     },
  //     {
  //       _tag: "CSidebarNavDropdown",
  //       name: "Email",
  //       route: "/admin/apps/email",
  //       icon: "cil-envelope-open",
  //       _children: [
  //         {
  //           _tag: "CSidebarNavItem",
  //           name: "Inbox",
  //           to: "/admin/apps/email/inbox",
  //           badge: {
  //             color: "danger",
  //             text: "PRO",
  //           },
  //         },
  //         {
  //           _tag: "CSidebarNavItem",
  //           name: "Message",
  //           to: "/admin/apps/email/message",
  //           badge: {
  //             color: "danger",
  //             text: "PRO",
  //           },
  //         },
  //         {
  //           _tag: "CSidebarNavItem",
  //           name: "Compose",
  //           to: "/admin/apps/email/compose",
  //           badge: {
  //             color: "danger",
  //             text: "PRO",
  //           },
  //         },
  //       ],
  //     },
  //   ],
  // },
  // {
  //   _tag: "CSidebarNavDivider",
  //   className: "m-2",
  // },
  // {
  //   _tag: "CSidebarNavTitle",
  //   _children: ["Labels"],
  // },
  // {
  //   _tag: "CSidebarNavItem",
  //   name: "Label danger",
  //   to: "",
  //   icon: {
  //     name: "cil-star",
  //     className: "text-danger",
  //   },
  //   label: true,
  // },
  // {
  //   _tag: "CSidebarNavItem",
  //   name: "Label info",
  //   to: "",
  //   icon: {
  //     name: "cil-star",
  //     className: "text-info",
  //   },
  //   label: true,
  // },
  // {
  //   _tag: "CSidebarNavItem",
  //   name: "Label warning",
  //   to: "",
  //   icon: {
  //     name: "cil-star",
  //     className: "text-warning",
  //   },
  //   label: true,
  // },
  {
    _tag: "CSidebarNavDivider",
    className: "m-2",
  },
];

export default _nav;
