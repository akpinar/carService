import UserService from "../services/UserService"
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
        dashboard_link = "admin-dashboard"
        break;
    case groups.customer:
        dashboard_link = "customer-dashboard"
        break;
    case groups.serviceman:
        dashboard_link = "serviceman-dashboard"
        break;
    case groups.accountant:
        dashboard_link = "accountant-dashboard"
        break;
    
    default:
        break;
}

const home = {
    _name: 'CSidebarNavItem',
    name: 'Anasayfa',
    to: `/${dashboard_link}`,
    icon: 'cil-speedometer',
}
const actions = {
    _name: 'CSidebarNavTitle',
    _children: ['İşlemler']
}
const customer ={
    _name: 'CSidebarNavDropdown',
    name: 'Müşteri',
    route: '/customer',
    icon: 'cil-user',
    items: [
        {
            name: 'Müşteri',
            to: '/customer/customer'
        }
    ]
}
const catalog ={
    _name: 'CSidebarNavDropdown',
    name: 'Katalog',
    route: '/category',
    icon: 'cil-playlist-add',
    items: [
        {
            name: 'Kategori',
            to: '/catalog/category'
        },
        {
            name: 'Ürünler',
            to: '/catalog/product-list'
        },
        {
            name: 'Marka',
            to: '/catalog/brand'
        }
    ]
}
const services = {
    _name: 'CSidebarNavDropdown',
    name: 'Servis',
    route: '/service',
    icon: 'cil-file',
    items: [
        {
            name: 'Servis Listesi',
            to: '/service/service-list'
        }
    ]
}

var items =[]
items.push(home)
items.push(actions)
if(user_group === groups.admin || user_group === groups.accountant || user_group===groups.customer)
{
    items.push(customer)
}
if(user_group === groups.admin || user_group === groups.serviceman)
{
    items.push(catalog)
}
if(user_group === groups.admin || user_group === groups.serviceman || user_group===groups.customer)
{
    items.push(services)
}
export default [
    {
        _name: 'CSidebarNav',
        _children: items
    }
]