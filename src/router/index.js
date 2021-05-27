import Vue from 'vue'
import Router from 'vue-router'
import ProductList from "@/views/catalog/ProductList";
import Repairman from "@/views/staff/Staff";
import Staff from "@/views/staff/Staff";
import UserService from "../services/UserService"


// Containers
const TheContainer = () => import('@/containers/TheContainer')

// Views
const AdminDashboard = () => import('@/views/AdminDashboard')
const ServicemanDashboard = () => import('@/views/ServicemanDashboard')
const CustomerDashboard = () => import('@/views/CustomerDashboard')

const Colors = () => import('@/views/theme/Colors')
const Typography = () => import('@/views/theme/Typography')

const Charts = () => import('@/views/charts/Charts')
const Widgets = () => import('@/views/widgets/Widgets')

// Views - Components
const Cards = () => import('@/views/base/Cards')
const Forms = () => import('@/views/base/Forms')
const Switches = () => import('@/views/base/Switches')
const Tables = () => import('@/views/base/Tables')
const Tabs = () => import('@/views/base/Tabs')
const Breadcrumbs = () => import('@/views/base/Breadcrumbs')
const Carousels = () => import('@/views/base/Carousels')
const Collapses = () => import('@/views/base/Collapses')
const Jumbotrons = () => import('@/views/base/Jumbotrons')
const ListGroups = () => import('@/views/base/ListGroups')
const Navs = () => import('@/views/base/Navs')
const Navbars = () => import('@/views/base/Navbars')
const Paginations = () => import('@/views/base/Paginations')
const Popovers = () => import('@/views/base/Popovers')
const ProgressBars = () => import('@/views/base/ProgressBars')
const Tooltips = () => import('@/views/base/Tooltips')

// Views - Buttons
const StandardButtons = () => import('@/views/buttons/StandardButtons')
const ButtonGroups = () => import('@/views/buttons/ButtonGroups')
const Dropdowns = () => import('@/views/buttons/Dropdowns')
const BrandButtons = () => import('@/views/buttons/BrandButtons')

// Views - Icons
const CoreUIIcons = () => import('@/views/icons/CoreUIIcons')
const Brands = () => import('@/views/icons/Brands')
const Flags = () => import('@/views/icons/Flags')

// Views - Notifications
const Alerts = () => import('@/views/notifications/Alerts')
const Badges = () => import('@/views/notifications/Badges')
const Modals = () => import('@/views/notifications/Modals')

// Views - Pages
const Page404 = () => import('@/views/pages/Page404')
const Page500 = () => import('@/views/pages/Page500')
const Login = () => import('@/views/pages/Login')
const ForgotPassword = () => import('@/views/pages/ForgotPassword')
const Register = () => import('@/views/pages/Register')

// Users
const Users = () => import('@/views/users/Users')
const User = () => import('@/views/users/User')

//customer
const Customer = () => import('@/views/customer/Customer')

const Category = () => import('@/views/catalog/Category')

const Brand = () => import('@/views/catalog/Brand')


const OpenServiceCard = () => import('@/views/customer/OpenServiceCard')

const ServiceList = () => import('@/views/service/ServiceList')

const ServiceDetermination = () => import('@/views/service/ServiceDetermination')

const ServiceDetail = () => import('@/views/service/ServiceDetail')

const ServiceCustomerApprove = () => import('@/views/service/ServiceCustomerApprove')

const CheckingAccountList = () => import('@/views/checkingAccount/CheckingAccountList')

const CheckingAccountByCustomerList = () => import('@/views/checkingAccount/CheckingAccounByCustomerList')

Vue.use(Router)

export default new Router({
    mode: 'hash', // https://router.vuejs.org/api/#mode
    linkActiveClass: 'active',
    scrollBehavior: () => ({y: 0}),
    routes: configRoutes()
})

function configRoutes() {
    const user_group = UserService.getUserGroup()
    const groups = {
        admin:"Admin",
        serviceman:"Tamirci",
        customer:"Customer",
        accountant:"Muhasebe"
    }

    var dashboard_link = ""
    switch (user_group) {
        case groups.admin:
            dashboard_link = "/admin-dashboard"
            break;
        case groups.customer:
            dashboard_link = "/customer-dashboard"
            break;
        case groups.serviceman:
            dashboard_link = "/serviceman-dashboard"
            break;
        case groups.accountant:
            dashboard_link = "/accountant-dashboard"
            break;
        
        default:
            dashboard_link = "/pages/login"
            break;
    }
    return [
        {
            path: '/',
            redirect:`${dashboard_link}`,
            name: 'Home',
            component: TheContainer,
            children: [
                {
                    path: 'admin-dashboard',
                    name: 'AdminDashboard',
                    component: AdminDashboard
                },
                {
                    path: 'serviceman-dashboard',
                    name: 'ServicemanDashboard',
                    component: ServicemanDashboard
                },
                {
                    path: 'customer-dashboard',
                    name: 'CustomerDashboard',
                    component: CustomerDashboard
                },
                {
                    path: 'theme',
                    redirect: '/theme/colors',
                    name: 'Theme',
                    component: {
                        render(c) {
                            return c('router-view')
                        }
                    },
                    children: [
                        {
                            path: 'colors',
                            name: 'Colors',
                            component: Colors
                        },
                        {
                            path: 'typography',
                            name: 'Typography',
                            component: Typography
                        }
                    ]
                },
                {
                    path: 'charts',
                    name: 'Charts',
                    component: Charts
                },
                {
                    path: 'widgets',
                    name: 'Widgets',
                    component: Widgets
                },
                {
                    path: 'users',
                    meta: {
                        label: 'Users'
                    },
                    component: {
                        render(c) {
                            return c('router-view')
                        }
                    },
                    children: [
                        {
                            path: '',
                            name: 'Users',
                            component: Users
                        },
                        {
                            path: ':id',
                            meta: {
                                label: 'User Details'
                            },
                            name: 'User',
                            component: User
                        }
                    ]
                },
                {
                    path: '/customer',
                    redirect: '/customer/customer',
                    name: 'Customer',
                    component: {
                        render(c) {
                            return c('router-view')
                        }
                    },
                    children: [
                        {
                            path: 'customer',
                            name: 'Customer',
                            component: Customer
                        },

                        {
                            path: '/open-service/:carId',
                            name: 'OpenServiceCard',

                            component: OpenServiceCard
                        }

                    ]
                },
                {
                    path: '/catalog',
                    redirect: '/catalog/category',
                    name: 'Category',
                    component: {
                        render(c) {
                            return c('router-view')
                        }
                    },
                    children: [
                        {
                            path: 'category',
                            name: 'Category',
                            component: Category
                        },
                        {
                            path: 'product-list',
                            name: 'ProductList',
                            component: ProductList
                        },
                        {
                            path: 'brand',
                            name: 'Brand',
                            component: Brand
                        },

                    ]
                },
                {
                    path: '/staff',
                    redirect: '/staff/staff-operations',
                    name: 'Staff',
                    component: {
                        render(c) {
                            return c('router-view')
                        }
                    },
                    children: [
                        {
                            path: 'staff-operations',
                            name: 'Staff',
                            component: Staff
                        }

                    ]
                },
                {
                    path: '/service',
                    redirect: '/service/service-list',
                    name: 'Service',
                    component: {
                        render(c) {
                            return c('router-view')
                        }
                    },
                    children: [
                        {
                            path: 'service-list',
                            name: 'ServiceList',
                            component: ServiceList
                        },
                        {
                            path: 'service-determination/:serviceId',
                            name: 'ServiceDetermination',
                            component: ServiceDetermination
                        },
                        {
                            path: 'service-detail/:serviceId',
                            name: 'ServiceDetail',
                            component: ServiceDetail
                        },
                        {
                            path: 'service-approve/:serviceId',
                            name: 'ServiceApprove',
                            component: ServiceCustomerApprove
                        }


                    ]
                },
                {
                    path: 'base',
                    redirect: '/base/cards',
                    name: 'Base',
                    component: {
                        render(c) {
                            return c('router-view')
                        }
                    },
                    children: [
                        {
                            path: 'cards',
                            name: 'Cards',
                            component: Cards
                        },
                        {
                            path: 'forms',
                            name: 'Forms',
                            component: Forms
                        },
                        {
                            path: 'switches',
                            name: 'Switches',
                            component: Switches
                        },
                        {
                            path: 'tables',
                            name: 'Tables',
                            component: Tables
                        },
                        {
                            path: 'tabs',
                            name: 'Tabs',
                            component: Tabs
                        },
                        {
                            path: 'breadcrumbs',
                            name: 'Breadcrumbs',
                            component: Breadcrumbs
                        },
                        {
                            path: 'carousels',
                            name: 'Carousels',
                            component: Carousels
                        },
                        {
                            path: 'collapses',
                            name: 'Collapses',
                            component: Collapses
                        },
                        {
                            path: 'jumbotrons',
                            name: 'Jumbotrons',
                            component: Jumbotrons
                        },
                        {
                            path: 'list-groups',
                            name: 'List Groups',
                            component: ListGroups
                        },
                        {
                            path: 'navs',
                            name: 'Navs',
                            component: Navs
                        },
                        {
                            path: 'navbars',
                            name: 'Navbars',
                            component: Navbars
                        },
                        {
                            path: 'paginations',
                            name: 'Paginations',
                            component: Paginations
                        },
                        {
                            path: 'popovers',
                            name: 'Popovers',
                            component: Popovers
                        },
                        {
                            path: 'progress-bars',
                            name: 'Progress Bars',
                            component: ProgressBars
                        },
                        {
                            path: 'tooltips',
                            name: 'Tooltips',
                            component: Tooltips
                        }
                    ]
                },
                {
                    path: 'buttons',
                    redirect: '/buttons/standard-buttons',
                    name: 'Buttons',
                    component: {
                        render(c) {
                            return c('router-view')
                        }
                    },
                    children: [
                        {
                            path: 'standard-buttons',
                            name: 'Standard Buttons',
                            component: StandardButtons
                        },
                        {
                            path: 'button-groups',
                            name: 'Button Groups',
                            component: ButtonGroups
                        },
                        {
                            path: 'dropdowns',
                            name: 'Dropdowns',
                            component: Dropdowns
                        },
                        {
                            path: 'brand-buttons',
                            name: 'Brand Buttons',
                            component: BrandButtons
                        }
                    ]
                },
                {
                    path: 'icons',
                    redirect: '/icons/coreui-icons',
                    name: 'CoreUI Icons',
                    component: {
                        render(c) {
                            return c('router-view')
                        }
                    },
                    children: [
                        {
                            path: 'coreui-icons',
                            name: 'Icons library',
                            component: CoreUIIcons
                        },
                        {
                            path: 'brands',
                            name: 'Brands',
                            component: Brands
                        },
                        {
                            path: 'flags',
                            name: 'Flags',
                            component: Flags
                        }
                    ]
                },
                {
                    path: 'checking-account',
                    redirect: '/checking-account/checking-account-list',
                    name: 'CheckingAccount',
                    component: {
                        render(c) {
                            return c('router-view')
                        }
                    },
                    children: [
                        {
                            path: 'checking-account-list',
                            name: 'CheckingAccountList',
                            component: CheckingAccountList
                        },
                        {
                            path: 'customer/:customerId',
                            name: 'CheckingAccountByCustomer',
                            component: CheckingAccountByCustomerList
                        },

                    ]
                },
                {
                    path: 'notifications',
                    redirect: '/notifications/alerts',
                    name: 'Notifications',
                    component: {
                        render(c) {
                            return c('router-view')
                        }
                    },
                    children: [
                        {
                            path: 'alerts',
                            name: 'Alerts',
                            component: Alerts
                        },
                        {
                            path: 'badges',
                            name: 'Badges',
                            component: Badges
                        },
                        {
                            path: 'modals',
                            name: 'Modals',
                            component: Modals
                        }
                    ]
                }
            ]
        },
        {
            path: '/pages',
            redirect: '/pages/404',
            name: 'Pages',
            component: {
                render(c) {
                    return c('router-view')
                }
            },
            children: [
                {
                    path: '404',
                    name: 'Page404',
                    component: Page404
                },
                {
                    path: '500',
                    name: 'Page500',
                    component: Page500
                },
                {
                    path: 'login',
                    name: 'Login',
                    component: Login
                },
                {
                    path: 'forgot-password',
                    name: 'ForgotPassword',
                    component: ForgotPassword
                },
                {
                    path: 'register',
                    name: 'Register',
                    component: Register
                }
            ]
        }


    ]
}

