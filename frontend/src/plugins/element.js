import Vue from 'vue'
import {
  Container,
  Header,
  Main,
  Button,
  Input,
  Slider,
  Notification,
  Aside,
  Form,
  FormItem,
  Message,
  Loading,
  MessageBox,
  Rate,


  Menu,
  Submenu,
  MenuItemGroup,
  MenuItem,
  Breadcrumb,
  BreadcrumbItem,
  Card,
  Row,
  Col,
  Table,
  TableColumn,
  Switch,
  Tooltip,
  Pagination,
  Dialog,

  Tag,
  Carousel,
  CarouselItem,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Badge,
  Select,
  Upload,
  Option,
  Divider,
  Collapse,
  CollapseItem,
  Popover,

  Tabs,
  TabPane,
  Footer,
  Avatar,
  Backtop,
  Empty,
  DatePicker
} from 'element-ui'

Vue.use(Container)
Vue.use(Header)
Vue.use(Main)
Vue.use(Button)
Vue.use(Input)
Vue.use(Slider)
Vue.use(Aside)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Rate)

Vue.prototype.$message = Message
Vue.prototype.$notify = Notification
Vue.prototype.$loading = Loading.service
Vue.prototype.$confirm = MessageBox.confirm

Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItemGroup)
Vue.use(MenuItem)
Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)
Vue.use(Card)
Vue.use(Row)
Vue.use(Col)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Switch)
Vue.use(Tooltip)
Vue.use(Pagination)
Vue.use(Dialog)
Vue.use(Tag)
Vue.use(Carousel)
Vue.use(CarouselItem)
Vue.use(Dropdown)
Vue.use(DropdownMenu)
Vue.use(DropdownItem)
Vue.use(Badge)
Vue.use(Select)
Vue.use(Upload)
Vue.use(Option)
Vue.use(Divider)
Vue.use(Collapse)
Vue.use(CollapseItem)
Vue.use(Popover)
Vue.use(Tabs)
Vue.use(TabPane)
Vue.use(Footer)
Vue.use(Avatar)
Vue.use(Backtop)
Vue.use(Empty)
Vue.use(DatePicker)
Vue.use(Loading.directive)


// Vue.prototype.$loading = Loading.service
// Vue.prototype.$confirm = MessageBox.confirm
